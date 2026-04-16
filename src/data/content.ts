// ============================================
// 个人信息配置文件
// ============================================

// ========== 导航菜单 ==========
export const navItems = [
  { name: "首页", href: "#hero" },
  { name: "作品集", href: "#projects" },
  { name: "时间线", href: "#timeline" },
  { name: "文章", href: "#articles" },
  { name: "关于", href: "#about" },
];

export const profile = {
  // ========== 基本信息 ==========
  name: "王睿轩",
  nameEn: "Ruixuan Wang",
  title: "AI 时代的全栈开发 / 后端工程师 / 华中农业大学 / 沸点工作室",
  
  // ========== 联系方式 ==========
  contact: {
    github: {
      username: "qwqovoewe",
      url: "https://github.com/qwqovoewe",
    },
    email: "qq1729524191@163.com",
  },

  // ========== 教育背景 ==========
  education: {
    school: "华中农业大学",
    schoolEn: "Huazhong Agricultural University",
    level: "211 / 双一流",
    major: "计算机科学与技术",
    period: "2023.09 - 2027.06",
  },

  // ========== 个人简介 ==========
  bio: [
    "你好！我是王睿轩，华中农业大学计算机科学与技术专业本科生，曾在小红书担任后端开发实习生。",
    "我专注于高并发架构设计与性能优化。在实习期间，我主导了慢SQL治理、全量SQL分析系统和出海链路DTS冲突告警的设计与落地，通过多轮优化将系统性能提升数倍，支撑日均百万级数据处理。",
    "技术栈方面，我熟练掌握 Java、MySQL、Redis、Kafka 等后端技术，有大规模系统设计与落地经验。同时基于 LangChain/ReAct 构建了 Redis 告警根因定位 Agent 系统，累计完成 300+ 根因定位，熟悉 AI 工程化开发。",
    "工作之余，我担任沸点工作室总负责人，负责技术人才培养和项目对接，享受分享技术知识和帮助他人成长的过程。"
  ],

  // ========== 荣誉奖项 ==========
  awards: [
    { name: "中国计算机设计大赛", level: "中南赛区一等奖", icon: "🏆" },
    { name: "华中农业大学计算机设计大赛", level: "第十一届二等奖", icon: "🏆" },
    { name: "小红书 1024 AI Coding", level: "二等奖", icon: "🏆" },
    { name: "大学英语四级 CET-4", level: "通过", icon: "✅" },
  ],
};


// ============================================
// 项目经历
// ============================================

// 截图命名规范：
//   public/screenshots/{slug}/{序号}-{功能描述}.{ext}
//   序号从 01 开始，两位数字，例如：
//     01-overview.png      总览/首页
//     02-dashboard.png     仪表盘
//     03-detail.png        详情页
//   支持格式：png / jpg / webp（推荐 png 或 webp）
//   建议宽度：1280px 或 750px（小程序截图）

export const projects = [
  {
    slug: "slow-sql",
    name: "慢SQL治理平台",
    type: "实习项目",
    company: "小红书 · 关系型数据库平台研发组",
    period: "2025.09 - 2025.11",
    role: "项目主导",
    description: "设计聚合+告警+持久化流水线，聚合耗时下降60%，并发QPS提升2.1倍，覆盖900+集群。",
    // 截图放 public/screenshots/slow-sql/ 目录下，按命名规范添加到下方数组
    screenshots: [] as { src: string; caption: string }[],
    overview: "设计并落地聚合+告警+持久化流水线，补齐告警订阅与巡检功能，形成优化闭环。覆盖 900+ 集群，支撑日均百万级慢查询数据处理。",
    highlights: [
      "高性能聚合器：基于时间窗口轮转实现分层聚合结构，优化并发模型降低热点Key锁竞争，聚合耗时下降60%（830ms→340ms），并发QPS提升2.1倍",
      "Kafka消费一致性：采用Hash分片与Sticky+StaticMember消费策略，保障多Pod场景下聚合一致性，降低数据抖动与重复告警",
      "平台能力闭环：实现动态通知、静默、白名单、自定义配置、跳转详情，集成索引推荐与根因定位",
      "整体规模：Binlog采集链路覆盖900+集群，Kafka写入流量100+MB/s，单实例峰值7K+ Event QPS",
      "存储云平台：实现工单审批接入IM平台，通过二次路由转发解决多泳道回调寻址，稳定支撑日均8k PV审批链路",
    ],
    techStack: ["Java", "Kafka", "ClickHouse", "Redis", "Spring Boot"],
  },
  {
    slug: "binlog-sql",
    // 截图放 public/screenshots/binlog-sql/ 目录下
    name: "全量SQL分析系统",
    type: "实习项目",
    company: "小红书 · 关系型数据库平台研发组",
    period: "2025.10 - 2025.12",
    role: "负责人",
    description: "Binlog实时采集与持久化，单Pod吞吐提升2倍，峰值7K+ Event QPS，端到端延迟<1min。",
    overview: "负责Binlog SQL实时采集与持久化，提供TOP SQL定位、表级流量分析等能力，实现SQL写入可观测。",
    highlights: [
      "消费链路调优：通过PProf定位瓶颈，采用池化复用、列式插入等优化，单Pod吞吐提升2倍（12→25MB/s），端到端延迟<1min",
      "MQ发送优化：采用Protobuf序列化+LZ4压缩降低网络开销，环形缓冲区+令牌桶优化文件读取，单分片稳定处理4K+ Event QPS",
      "整体架构设计：Reader/Sender架构，采集解析与聚合发送解耦，消费侧多Worker并发消费+批量写入，全链路支持水平扩展",
      "异步聚合+核查：降低数据噪声1/3+，增量/日报双轨告警接入IM触达到人，增量收口效率显著提升",
    ],
    techStack: ["Java", "Kafka", "Protobuf", "LZ4", "ClickHouse"],
    screenshots: [] as { src: string; caption: string }[],
  },
  {
    slug: "redis-agent",
    name: "Redis/RedKV 告警根因定位Agent",
    type: "实习项目",
    company: "小红书 · 关系型数据库平台研发组",
    period: "2026.01 - 2026.03",
    role: "负责人",
    description: "ReAct模式Agent根因定位系统，覆盖5类告警场景，累计300+定位，平均耗时提升约8倍。",
    overview: "将原有Pipeline串行架构重构为ReAct模式的Agent根因定位系统，实现从告警触发到根因输出的全自动闭环。",
    highlights: [
      "设计ReAct模式Agent，基于Tool Calling实现多轮自主推导与工具调度，覆盖Redis/RedKV共5类告警场景",
      "设计基线-当前对比压缩算法，采集指标从千级数据点压缩至百级token，信息密度提升约10倍",
      "将SOP编码为结构化提示词，设计分层过滤与R值判定，实现大key/hotkey等7类根因量化判定",
      "设计Tool/Collector/DataSource三层采集架构，Step/Turn/Message三级持久化，支持诊断全链路观测",
      "累计完成300+根因定位，新版平均耗时48.6s（提升约8倍），DBA反馈准确性显著提升",
    ],
    techStack: ["Python", "LangChain", "ReAct Agent", "Prometheus", "PQL"],
    screenshots: [] as { src: string; caption: string }[],
  },
  {
    slug: "dts-conflict",
    name: "出海链路DTS冲突告警",
    type: "实习项目",
    company: "小红书 · 关系型数据库平台研发组",
    period: "2025.12 - 2026.03",
    role: "负责人",
    description: "DTS同步数据冲突实时观测与告警，三层线程池支撑百万级数据聚合核查，增量收口效率提升50%+。",
    overview: "负责小红书出海链路DTS同步数据冲突告警，实时观测与告警，辅助业务纠偏，保障出海链路的稳定性与安全性。",
    highlights: [
      "三层线程池并发，支撑百万级数据聚合/核查（聚合1.68w条/2.9s，核查58条/s），保障小时级告警/存量清洗时效",
      "主键分段+滑动窗口解决OOM问题，连接池缓存复用+容量调优保障7×24小时稳定运行",
      "异步聚合+核查降低数据曝光1/3+，增量/日报双轨告警接入IM触达到人",
      "提供差异详情数据与修复SQL导出，增量收口效率提升50%+",
    ],
    techStack: ["Java", "Kafka", "MySQL", "IM"],
    screenshots: [] as { src: string; caption: string }[],
  },
  {
    slug: "health-miniapp",
    name: "狮山健康小程序",
    type: "独立项目",
    company: "华中农业大学认证项目",
    period: "2024.10 - 2025.03",
    role: "独立开发",
    description: "AI健康管理小程序，集成Qwen实现健康问答，WebSocket流式输出TTFT≈490ms，获校级认证。",
    overview: "基于微信生态的AI健康管理程序，提供健康建议、饮食评分、运动打卡、排行榜等功能，生成个性化建议，激励健康习惽养成。",
    highlights: [
      "集成Qwen+菜品识别API实现健康问答与营养分析，通过Prompt+样本微调，问答准确率70%→80%，菜品分析准确率提升15%",
      "WebSocket实现AI回答流式输出，TTFT≈490ms（30轮），用写时删除与TTL控制策略，降低大模型调用频率",
      "Redis缓存架构：实现排行榜(ZSet)/浏览量(Hash)/点赞(延迟双删)，Canal+binlog保障缓存一致性",
      "微信生态对接：ThreadLocal传递用户信息，实现微信快捷登录，获取用户步数、定位与跑步速率等运动数据",
    ],
    techStack: ["Spring Boot", "WebSocket", "Qwen", "Redis", "MySQL"],
    // 截图放 public/screenshots/health-miniapp/ 目录下
    // 小程序截图建议宽度 750px（iPhone 标准）
    screenshots: [] as { src: string; caption: string }[],
  },
  {
    slug: "code-knowledge",
    name: "代码知识库平台",
    type: "独立项目",
    company: "个人项目",
    period: "2025.05 - 2025.07",
    role: "独立开发",
    description: "TB级代码存储库平台，ES双索引多维检索，160W行CSV导出<3min，性能提升百倍。",
    overview: "面向TB级代码项目的代码存储库平台，提供大数据导入导出、多维检索、自动化标签等功能。",
    highlights: [
      "基于ES双索引（project/code）满足项目与代码双重检索，实现多维度检索和关键词查询",
      "用Scroll API优化深度分页导出性能，基于Redis Bitmap/Hash实现异步任务进度条和导入导出断点续传",
      "用LRU Cache实现导出数据去重避免OOM风险，用NIO零拷贝优化文件下载，CPU与IO负载分别降低10%和8%",
      "双线程池优化导出，160W行CSV碎片化导出<3min，分块LOAD+Bulk API提升入库效率（相比批处理百倍提升）",
    ],
    techStack: ["Spring Boot", "Elasticsearch", "Redis", "NIO"],
    // 截图放 public/screenshots/code-knowledge/ 目录下
    screenshots: [] as { src: string; caption: string }[],
  },
];


// ============================================
// 成长历程
// ============================================

export const milestones = [
  {
    date: "2023.09",
    icon: "🌱",
    title: "进入华中农业大学",
    description: "计算机科学与技术专业，开始系统学习计算机基础课程。",
  },
  {
    date: "2024.03",
    icon: "🔥",
    title: "加入沸点工作室",
    description: "加入校级技术组织沸点工作室，开始系统学习后端技术栈。",
  },
  {
    date: "2024.09",
    icon: "⭐",
    title: "完成转正答辩，担任沸点工作室总负责人",
    description: "负责团队管理、学习路线制定、项目需求对接与交付统筹、招新面试等日常事务。",
  },
  {
    date: "2024.10",
    icon: "🏆",
    title: "狮山健康小程序立项",
    description: "获得华中农业大学认证，集成AI健康管理功能，设计大赛中南赛区省赛一等奖。",
  },
  {
    date: "2025.05",
    icon: "💡",
    title: "代码知识库平台开发",
    description: "TB级代码存储库平台开发检索与导入导出功能，性能优化成果显著。",
  },
  {
    date: "2025.09",
    icon: "🚀",
    title: "入职小红书",
    description: "加入关系型数据库平台研发组，参与数据自治系统采集等核心基础设施建设，DTS告警，openClaw的skills开发等工作。",
  },
  {
    date: "2026.01",
    icon: "🤖",
    title: "Redis Agent 根因定位系统",
    description: "基于LangChain/ReAct构建告警根因定位Agent，覆盖5类告警场景，累计300+定位，耗时提升约8倍。",
  },
  {
    date: "2026.03",
    icon: "✨",
    title: "实习成果总结",
    description: "主导慢SQL治理二期与全量SQL分析，支撑日均百万级数据处理。dts1.0与2.0冲突告警与复查链路落地。构建Redis告警根因定位Agent，累计300+定位。",
  },
  {
    date: "2026.04",
    icon: "🎓",
    title: "告别小红书",
    description: "圆满完成实习，离开小红书关系型数据库平台研发组，带着高并发系统设计与大规模数据处理的实战经验继续前行。",
  },
];


// ============================================
// 技术栈
// ============================================

export const techSkills = {
  "AI工程化": {
    items: ["LangChain/ReAct", "Agent Skills", "Claude Code", "Copilot"],
    details: {
      "LangChain/ReAct": "基于LangChain构建ReAct模式Agent系统，Tool Calling多轮自主推导与工具调度",
      "Agent Skills": "熟悉MCP Server与Agent Skills开发，设计Tool/Collector/DataSource三层采集架构",
      "Claude Code": "熟练使用Claude Code辅助开发，基于OpenClaw构建个人开发工作流",
      "Copilot": "日常开发中使用AI辅助编程，提升开发效率",
    }
  },
  "编程语言": {
    items: ["Java基础", "JVM调优", "JUC并发", "Go pprof"],
    details: {
      "Java基础": "熟练掌握面向对象编程、反射机制、异常处理、IO/NIO、泛型等核心特性",
      "JVM调优": "熟悉内存结构、垃圾回收算法、GC日志分析、性能调优实践",
      "JUC并发": "深入理解CAS、AQS、线程池原理、锁机制、并发容器、ThreadLocal等",
      "Go pprof": "了解Go并发模型，掌握pprof性能分析工具",
    }
  },
  "数据库": {
    items: ["MySQL", "Redis", "ClickHouse", "Elasticsearch"],
    details: {
      "MySQL": "熟悉事务原理、锁机制、MVCC、索引优化、慢SQL分析、主从复制",
      "Redis": "熟练使用各种数据结构，了解持久化、哨兵、集群、缓存穿透/雪崩解决方案",
      "ClickHouse": "有实际使用经验，了解列式存储、聚合查询优化、分区策略",
      "Elasticsearch": "全文检索、聚合查询、索引设计、性能优化",
    }
  },
  "框架": {
    items: ["Spring Boot", "Spring Security", "MyBatis", "gRPC"],
    details: {
      "Spring Boot": "熟练使用IOC、AOP、自动配置，理解Bean生命周期、循环依赖解决机制",
      "Spring Security": "掌握认证授权流程、JWT、OAuth2、权限控制实现",
      "MyBatis": "熟悉动态SQL、缓存机制、插件扩展、批量操作优化",
      "gRPC": "了解RPC框架、Protocol Buffers、服务治理",
    }
  },
  "消息队列 & 中间件": {
    items: ["Kafka", "Canal", "WebSocket", "Protobuf"],
    details: {
      "Kafka": "高吞吐消息队列实践，消费者组管理、消息可靠性保障、Sticky+StaticMember策略",
      "Canal": "MySQL binlog解析、数据同步、缓存一致性保障",
      "WebSocket": "实时通信、流式输出、长连接管理",
      "Protobuf": "高效序列化、配合LZ4压缩降低网络开销",
    }
  },
  "设计模式": {
    items: ["单例", "工厂", "策略", "责任链", "模板方法"],
    details: {
      "单例模式": "双重检查锁、枚举实现、应用场景",
      "工厂模式": "简单工厂、工厂方法、抽象工厂",
      "策略模式": "算法族封装、运行时切换、消除条件语句",
      "责任链模式": "请求处理链、拦截器、过滤器",
      "模板方法": "算法骨架、扩展点设计、代码复用",
    }
  },
  "工程实践": {
    items: ["性能优化", "高并发架构", "分布式系统", "监控告警"],
    details: {
      "性能优化": "系统瓶颈分析、JVM调优、数据库优化、缓存策略",
      "高并发架构": "限流、降级、熔断、异步处理、读写分离",
      "分布式系统": "分布式事务、一致性保障、服务拆分、CAP权衡",
      "监控告警": "Prometheus、Grafana、链路追踪、日志分析",
    }
  },
};


// ============================================
// 文章列表
// ============================================

export const articles = [
  {
    label: "写给沸点同学的",
    title: "AI 时代，你的学习路线该变了",
    platform: "飞书文档",
    url: "https://qwqovoewe.feishu.cn/wiki/CfS5wdUIui5PIfklWsjcEf8lnRh",
    date: "2026.04",
    description: "AI 每周层出不穷，校内与企业开发差距越来越大。从技术栈、开发模式到学习渠道，全面梳理 AI 时代同学的升级方向。",
    tags: ["AI", "学习路线", "沸点工作室"],
  },
];
