---
layout: ../../layouts/ArticleLayout.astro
title: 从Pipeline到ReAct：构建Redis告警根因定位Agent的实践与思考
date: "2026.04"
tags: ["AI Agent", "ReAct", "Redis", "LLM"]
description: 从Pipeline硬编排到ReAct Agent的演进历程，详解工具集设计、Prompt注入领域经验、ReAct循环实现，以及真实告警分析案例。
---

## 凌晨三点的告警风暴

凌晨三点，手机疯狂震动。打开一看，告警群里已经刷了上百条消息——某个Redis集群的内存使用率突破90%，连带着触发了连接数告警、慢查询告警、主从同步延迟告警……

如果你运维过大规模Redis集群，一定对这个场景不陌生。一个根因问题往往会像多米诺骨牌一样，触发一连串的"告警风暴"。而值班工程师要做的，就是在这一堆告警里抽丝剥茧，找到那个真正的根因。

问题是：人会累，人会慌，人在凌晨三点的判断力也没那么靠谱。

所以我开始想——能不能造一个Agent，让它帮我干这件事？

这篇文章记录的，就是从最初的"Pipeline硬编排"到最终落地"ReAct Agent"的整个历程，包括中间踩过的坑、做过的妥协、以及一些至今仍在思考的问题。

---

## 一、先搞清楚：根因定位到底在定位什么？

在展开技术方案之前，得先把问题定义清楚。

一个典型的Redis告警根因定位流程，在工程师的脑子里大概是这样的：

1. **看告警本身**：哪个集群？什么指标？当前值多少？阈值多少？
2. **拉关联指标**：内存高了？那看看是不是有大Key。连接数飙了？查查是不是某个业务方突然加了新连接池。QPS涨了？看看是不是有人在跑全量扫描。
3. **交叉验证**：把多个维度的信息拼在一起，做推理。比如"内存涨了 + 有个300MB的大Key是10分钟前写入的 + 对应业务方刚上线了新功能"——那大概率就是这个大Key导致的。
4. **给出结论和建议**：根因是什么，建议怎么处理。

看起来不复杂对吧？但魔鬼在细节里。

**维度多**：一个Redis集群的观测维度少说有几十个——内存、CPU、连接数、QPS、命中率、慢查询、大Key、热Key、主从延迟、网络流量、持久化状态……每个维度还分主节点和从节点。

**链路长**：从告警触发到最终定位，中间可能要调四五个不同的API，查两三个不同的监控系统，甚至还要去翻变更记录。

**判断难**：同一个现象（比如内存飙升），根因可能完全不同——可能是大Key、可能是内存碎片、可能是数据量自然增长、可能是fork导致的COW……区分它们需要经验，也需要多维度交叉分析。

这就是为什么简单的规则引擎搞不定这件事——场景太多，规则写不完。

---

## 二、第一版：Pipeline硬编排，能用但不够聪明

### 2.1 思路

最开始的想法很直觉：既然工程师的排查流程是相对固定的，那就把这个流程写死呗。

```
告警进来 → 解析告警类型 → 根据类型拉对应指标 → 把所有指标喂给LLM → LLM输出分析结论
```

这就是典型的Pipeline（流水线）架构。每一步做什么、调什么接口、拉什么数据，全部预先编排好。LLM在这里的角色比较被动——它只是最后一步的"总结器"，前面所有的数据采集和编排逻辑都是hardcode的。

### 2.2 实现

大致的代码结构长这样（简化版）：

```go
func AnalyzeAlert(alert *Alert) (*Analysis, error) {
    // Step 1: 解析告警类型
    alertType := classifyAlert(alert)
    
    // Step 2: 根据类型拉对应的指标数据
    var metrics map[string]interface{}
    switch alertType {
    case "memory_high":
        metrics = fetchMemoryMetrics(alert.ClusterID)
        metrics["big_keys"] = fetchBigKeys(alert.ClusterID)
        metrics["memory_fragmentation"] = fetchFragRatio(alert.ClusterID)
    case "connection_spike":
        metrics = fetchConnectionMetrics(alert.ClusterID)
        metrics["client_list"] = fetchClientList(alert.ClusterID)
    case "slow_query":
        metrics = fetchSlowLog(alert.ClusterID)
        metrics["qps_trend"] = fetchQPSTrend(alert.ClusterID)
    // ... 还有十几个case
    }
    
    // Step 3: 拼prompt，调LLM
    prompt := buildPrompt(alert, alertType, metrics)
    result := callLLM(prompt)
    
    return parseAnalysis(result), nil
}
```

### 2.3 问题

这个方案上线后，确实能处理一些简单场景。但很快就暴露出几个致命问题：

**第一，"switch-case地狱"。** 告警类型有几十种，每种的排查路径不同，而且很多告警需要交叉分析。用switch-case穷举所有组合，代码膨胀得飞快。

**第二，"信息要么不够、要么太多"。** Pipeline是预先编排的，它不知道对于具体这次告警，哪些信息真正有用。

**第三，没有"追问"能力。** 人类工程师在排查时，看到一个线索会顺着往下追。Pipeline做不到这种动态探索。

用一个比喻来说：Pipeline就像是给医生写了一个checklist。但真正的好医生是会根据症状动态调整检查方案的。

---

## 三、转折点：为什么选择ReAct？

### 3.1 方案对比

| 方案 | 核心思路 | 优点 | 缺点 |
|------|----------|------|------|
| **CoT** | 让LLM一步步推理 | 推理质量高 | 没有工具调用能力 |
| **Function Calling** | LLM选择调用哪个函数 | 简单直接 | 单轮调用，缺乏多步推理 |
| **Plan-and-Execute** | 先做完整计划，再逐步执行 | 有全局视角 | 计划容易过时 |
| **ReAct** | Reasoning + Acting交替进行 | 动态适应 | 推理链可能过长 |

最终选了**ReAct**，因为它最接近人类工程师的真实排查过程——看到一个现象，想一想可能的原因，去查一个数据验证，根据结果再想下一步查什么。

### 3.2 ReAct是什么？

ReAct的全称是**Reasoning and Acting**，来自2022年Yao等人的论文。核心思想：让LLM在每一步交替进行**思考（Thought）**和**行动（Action）**，并根据**观察（Observation）**决定下一步。

```
循环：
  Thought: 我现在知道什么？我还需要什么信息？
  Action:  调用某个工具获取信息
  Observation: 工具返回了什么结果？
  → 回到Thought，直到有足够信息得出结论
```

---

## 四、ReAct Agent的设计与实现

### 4.1 整体架构

```
                    ┌─────────────────────┐
                    │    告警输入          │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │    ReAct Agent Core  │
                    │  ┌───────────────┐  │
                    │  │   Thought     │  │
                    │  │   (推理)       │──┼──→ 是否有足够信息？
                    │  └───────┬───────┘  │         │
                    │          │          │    Yes  │  No
                    │  ┌───────▼───────┐  │         │
                    │  │   Action      │  │    ┌────▼────┐
                    │  │   (行动)       │◄─┼────┤ 继续循环 │
                    │  └───────┬───────┘  │    └─────────┘
                    │          │          │
                    │  ┌───────▼───────┐  │
                    │  │  Observation  │  │
                    │  │  (观察)        │  │
                    │  └───────────────┘  │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   根因分析报告       │
                    └─────────────────────┘
                    
           ┌──────────────────────────────────┐
           │          工具集 (Tools)           │
           ├──────────┬──────────┬────────────┤
           │ 指标查询  │ 大Key扫描 │ 慢查询日志  │
           ├──────────┼──────────┼────────────┤
           │ 拓扑信息  │ 客户端分析│ 变更记录    │
           ├──────────┼──────────┼────────────┤
           │ 热Key分析 │ 配置查询  │ 容量预测    │
           └──────────┴──────────┴────────────┘
```

### 4.2 工具集设计

工具设计是整个Agent最核心的部分之一。几个关键原则：

**原则一：工具粒度要适中。** 太粗了LLM没有选择空间；太细了选择太多LLM反而会懵。

**原则二：工具描述要站在"使用者"角度写。** 不是写API文档，而是写"什么时候你需要用这个工具"。

核心工具集：

```go
var tools = []Tool{
    {
        Name:        "get_cluster_metrics",
        Description: "获取Redis集群的关键运行指标。当你需要了解集群当前或历史的运行状态时使用。" +
                     "返回数据包括：内存使用率、CPU使用率、连接数、QPS、命中率、网络带宽等。",
        Parameters: map[string]interface{}{
            "cluster_id": "集群ID",
            "metrics":    "指标列表，如 ['memory_used', 'cpu_usage', 'connections', 'qps']",
            "time_range": "时间范围，如 '30m', '1h', '6h'",
        },
    },
    {
        Name:        "scan_big_keys",
        Description: "扫描集群中的大Key。当怀疑内存问题可能由大Key导致时使用。",
    },
    {
        Name:        "get_slow_log",
        Description: "获取慢查询日志。当出现延迟升高或慢查询告警时使用。",
    },
    {
        Name:        "get_hotkey_analysis",
        Description: "分析热Key分布。当怀疑存在热点Key导致单节点压力过大时使用。",
    },
    {
        Name:        "get_client_connections",
        Description: "获取客户端连接详情。当连接数异常或需要排查是哪个业务方导致问题时使用。",
    },
    {
        Name:        "get_recent_changes",
        Description: "获取集群最近的变更记录。当怀疑问题可能由配置变更、扩缩容等操作引起时使用。",
    },
    {
        Name:        "get_node_topology",
        Description: "获取集群拓扑信息。当需要了解集群架构或排查节点级别问题时使用。",
    },
    {
        Name:        "finish_analysis",
        Description: "完成分析并输出最终报告。当你已经收集了足够的信息并得出结论时调用此工具。",
    },
}
```

### 4.3 System Prompt：给Agent注入"老运维"的灵魂

```
你是一个资深的Redis运维专家，负责分析Redis集群的告警并定位根因。

## 你的工作流程

1. **理解告警**：先仔细理解告警的含义
2. **提出假设**：根据告警类型和你的经验，列出最可能的2-3个根因假设
3. **逐一验证**：使用工具获取数据来验证或排除每个假设
4. **交叉验证**：多个维度的数据互相印证
5. **得出结论**：当你有足够信心时，给出根因和处理建议

## 重要原则

- **优先检查最常见的根因**：80%的Redis内存告警是大Key导致的，先查大Key
- **关注时间线**：如果内存在14:30突然涨了，那就重点看14:30前后发生了什么
- **区分因果**：QPS上涨和延迟上涨可能同时出现，但要分清谁是因谁是果
- **不要过度猜测**：如果数据不足以支撑结论，老实说"无法确定"

## 常见根因知识库

| 告警类型 | 常见根因 | 排查优先级 |
|---------|---------|-----------|
| 内存使用率高 | 大Key写入、数据量自然增长、内存碎片 | 大Key > 增长趋势 > 碎片率 |
| 连接数飙升 | 业务方连接池配置、短连接泛滥、连接泄漏 | 客户端分布 > 连接趋势 |
| QPS突增 | 业务上线、批处理任务、缓存击穿 | QPS趋势 > 热Key > 变更记录 |
```

这个Prompt里有几个关键设计点：

1. **注入领域经验作为先验知识**。"80%的内存告警是大Key导致的"——这种经验性判断能显著减少Agent的无效探索。
2. **强调时间线分析**。根因定位本质上是因果推断，而因果关系在时间上有先后。
3. **设定"老实说不知道"的边界**。不让Agent在信息不足时瞎编。

### 4.4 ReAct循环的核心实现

```go
type AgentState struct {
    Alert        *Alert
    History      []Message
    MaxSteps     int
    CurrentStep  int
}

func (agent *Agent) Run(alert *Alert) (*AnalysisReport, error) {
    state := &AgentState{
        Alert:    alert,
        History:  []Message{agent.buildSystemPrompt()},
        MaxSteps: 10,  // 安全阀：最多10步
    }
    
    state.History = append(state.History, Message{
        Role:    "user",
        Content: formatAlertAsMessage(alert),
    })
    
    for state.CurrentStep < state.MaxSteps {
        state.CurrentStep++
        
        response, err := agent.llm.Chat(state.History, agent.tools)
        if err != nil {
            return nil, fmt.Errorf("LLM调用失败: %w", err)
        }
        
        state.History = append(state.History, response)
        
        if response.ToolCall != nil && response.ToolCall.Name == "finish_analysis" {
            return parseReport(response.ToolCall.Arguments), nil
        }
        
        if response.ToolCall != nil {
            result, err := agent.executeTool(response.ToolCall)
            if err != nil {
                result = fmt.Sprintf("工具调用失败: %s", err.Error())
            }
            
            state.History = append(state.History, Message{
                Role:       "tool",
                Content:    result,
                ToolCallID: response.ToolCall.ID,
            })
        }
    }
    
    return agent.forceConclusion(state)
}
```

几个值得说的设计决策：

1. **MaxSteps安全阀**：LLM有时候会陷入"无限探索"，10步在实践中够用，绝大多数告警在3-5步内就能定位。
2. **工具失败也是信息**：把错误信息也喂给LLM，好的Agent能据此调整策略。
3. **强制收敛机制**：超过最大步数时，追加一条"请根据已有信息给出你的最佳判断"。

### 4.5 一个真实的ReAct推理链

**告警信息**：集群 `cache-prod-037` 内存使用率达到 92%，阈值 85%。

```
=== Step 1 ===

Thought: 内存使用率92%，超出阈值7个百分点。最常见的根因是：
(1)大Key写入 (2)数据量自然增长 (3)内存碎片率高。先查大Key。

Action: scan_big_keys(cluster_id="cache-prod-037", top_n=10)

Observation: 
  1. user:profile:batch_20260415 | Hash | 328MB | TTL: -1 (永不过期)
  2. feed:recommend:hot_v2       | ZSet | 45MB  | TTL: 3600s
  3. session:pool:overflow       | Set  | 12MB  | TTL: 7200s

=== Step 2 ===

Thought: 发现一个328MB的大Key，没有设置TTL。但我需要验证：
内存上涨的时间线是否吻合。先看下内存趋势。

Action: get_cluster_metrics(
    cluster_id="cache-prod-037",
    metrics=["memory_used_bytes", "memory_rss"],
    time_range="6h"
)

Observation:
  - 14:00  6.2GB (72%)
  - 14:30  6.5GB (76%)  ← 开始上涨
  - 15:00  7.2GB (84%)
  - 15:15  7.9GB (92%)  ← 触发告警
  - mem_fragmentation_ratio: 1.08 (正常)

=== Step 3 ===

Thought: 内存从14:30开始快速上涨，1小时内涨了约1.7GB。
而那个大Key是328MB，不足以解释1.7GB的涨幅。
碎片率1.08正常，排除碎片问题。查一下最近的变更记录。

Action: get_recent_changes(cluster_id="cache-prod-037", hours=6)

Observation:
  - 14:25 [变更] 业务方 "user-profile-service" 执行了批量数据导入任务
  - 14:20 [配置] maxmemory-policy 从 allkeys-lru 改为 noeviction
  
=== Step 4 ===

Thought: 找到了！这是一个组合根因：
1. 14:20 有人把淘汰策略从 allkeys-lru 改成了 noeviction
2. 14:25 紧接着就来了一波批量数据导入
3. 由于淘汰策略已关闭，新数据无法触发旧数据的自动淘汰

Action: finish_analysis(
    root_cause="maxmemory-policy配置变更导致淘汰机制失效，叠加批量数据导入",
    confidence=0.92,
    evidence=[
        "14:20 maxmemory-policy 从 allkeys-lru 改为 noeviction",
        "14:25 批量数据导入任务启动",
        "14:30起内存持续上涨至92%",
        "内存碎片率正常(1.08)，排除碎片原因"
    ],
    recommendation="1. 立即将maxmemory-policy恢复为allkeys-lru；" +
                   "2. 确认noeviction的变更是否为误操作；" +
                   "3. 审查批量导入任务的数据量评估流程"
)
```

整个分析过程只用了4步，约15秒。**Step 3是关键转折点**——Pipeline架构大概率会在发现大Key后就停下来，但ReAct Agent通过推理发现"328MB不够解释1.7GB的涨幅"，进而继续挖掘，最终找到了真正的根因。

---

## 五、踩过的坑和优化

### 5.1 LLM的"话痨"问题

最初版本的Agent，Thought部分经常写得又臭又长。解决方案：在System Prompt里加了"每次Thought不超过100字"的硬约束，token消耗下降约40%。

### 5.2 工具调用参数的"幻觉"

LLM有时候会编造不存在的参数值。解决方案：工具参数尽量用枚举而不是自由文本，工具执行层做严格的参数校验并返回清晰的错误提示。

### 5.3 Agent"绕圈"

偶尔Agent会陷入循环：查了指标A→觉得不够→查指标B→又回去查指标A。解决方案：每次Thought之前注入"你已经查询过以下信息"的提醒，消除了90%以上的循环。

### 5.4 延迟与成本的平衡

```go
func (agent *Agent) selectModel(alert *Alert) string {
    complexity := estimateComplexity(alert)
    switch {
    case complexity <= 3:
        return "fast-model"     // 简单告警
    case complexity <= 7:
        return "balanced-model" // 中等复杂度
    default:
        return "powerful-model" // 复杂告警
    }
}
```

配合告警聚合和结果缓存，有效控制成本。

### 5.5 输出格式不稳定

使用`finish_analysis`工具来强制结构化输出，比在Prompt里要求"请按以下格式输出"靠谱得多。

---

## 六、效果与数据

| 指标 | Pipeline方案 | ReAct Agent | 变化 |
|------|-------------|-------------|------|
| 根因定位准确率 | 约58% | 约82% | +24pp |
| 平均分析耗时 | 4.2s | 11.5s | +7.3s |
| 可处理的告警类型 | 15种（hardcode） | 40+种（动态适配） | 2.6x |
| 需要人工介入的比例 | 约42% | 约18% | -24pp |

---

## 七、一些更深层的思考

### 7.1 Pipeline和ReAct不是非此即彼

最好的方案往往是**混合式的**：简单告警走Pipeline快速通道，复杂告警走ReAct Agent深度分析通道。

```
告警输入 → 复杂度评估 → ┬ 简单 → Pipeline快速通道 → 结果
                        └ 复杂 → ReAct Agent     → 结果
```

### 7.2 Prompt Engineering的重要性被低估了

在整个项目中，调Prompt花的时间比写代码还多。特别是**领域知识的注入**——"80%的内存告警是大Key导致的"这种先验知识，是Agent能高效工作的基础。

**先把领域专家的排查经验结构化地写下来，再去想技术实现。**

### 7.3 可观测性是Agent的生命线

Agent的执行路径是不确定的，出了问题很难复现。我们做了：完整记录每次分析的ReAct链、关键指标监控、Agent步数超过7步时自动标记异常让人工review。

### 7.4 未来方向：Multi-Agent协作

下一步想探索**Multi-Agent协作**——一个"指挥官Agent"分析告警关联并分配任务，多个"专家Agent"并行分析，最后汇总全局根因。

---

## 八、写在最后

从Pipeline到ReAct，本质上是一个从**确定性编排**到**自主推理**的转变。不管用什么架构，有几个原则是通用的：

1. **先把问题搞清楚，再想技术方案**。
2. **工具设计比模型选择更重要**。Agent的天花板是工具集决定的。
3. **领域知识是最好的"提示工程"**。把专家经验结构化地注入Prompt。
4. **要留退路**。Agent不是银弹，设计好人工介入的机制。

---

*本文中的代码示例已做简化和脱敏处理，旨在说明设计思路，不代表生产环境的完整实现。*
