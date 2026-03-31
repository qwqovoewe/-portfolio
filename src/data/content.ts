// ============================================
// 个人信息配置文件
// ============================================

// ========== 导航菜单 ==========
export const navItems = [
  { name: "首页", href: "#hero" },
  { name: "作品集", href: "#projects" },
  { name: "时间线", href: "#timeline" },
  { name: "关于", href: "#about" },
];

export const profile = {
  // ========== 基本信息 ==========
  name: "王睿轩",
  nameEn: "Ruixuan Wang",
  title: "AI全栈开发 / 后端工程师 / 华中农业大学 / 沸点工作室",
  
  // ========== 联系方式 ==========
  contact: {
    github: {
      username: "qwqovoewe",
      url: "https://github.com/qwqovoewe",
    },
    email: "qq1729524191@163.com",
    phone: "18004909721",
    wechat: "18004909721", // 同手机号
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
    "你好！我是王睿轩，华中农业大学计算机科学与技术专业本科生，目前在小米红书担任后端开发实习生。",
    "我专注于高并发架构设计与性能优化。在实习期间，我主导了慢SQL治理和全量SQL分析系统的设计与落地，通过多轮优化将系统性能提升 2-3 倍，支撑日均百万级数据处理。",
    "技术栈方面，我熟练掌握 Java、MySQL、Redis、Kafka 等后端技术，有丰富的大规模系统设计与落地经验。同时也在学习 Go 语言和云原生技术。",
    "工作之余，我担任沸点工作室总负责人，负责技术人才培养和项目对接，享受分享技术知识和帮助他人成长的过程。"
  ],

  // ========== 荣誉奖项 ==========
  awards: [
    { name: "中国计算机设计大赛", level: "中南赛区一等奖" },
    { name: "华中农业大学计算机设计大赛", level: "第十一届二等奖" },
    { name: "小红书 1024 AI Coding", level: "二等奖" },
    { name: "CET-4", level: "大学英语四级" },
  ],
};


// ============================================
// 项目经历
// ============================================

export const projects = [
  {
    name: "慢SQL治理平台",
    type: "实习项目",
    company: "小红书",
    period: "2025.09 - 2026.03",
    role: "项目主导",
    description: "设计聚合+告警+持久化流水线，聚合耗时下降60%，并发QPS提升2.1倍，覆盖900+集群。",
    highlights: [
      "高性能聚合器：基于时间窗口轮转实现分层聚合结构，聚合耗时下降60%（830ms→340ms）",
      "Kafka消费一致性：采用Hash分片与Sticky+StaticMember消费策略，保障多Pod聚合一致性",
      "平台能力闭环：实现动态通知、静默、白名单，集成索引推荐与根因定位",
      "整体规模：覆盖900+集群，Kafka写入流量100+MB/s，峰值7K+ Event QPS"
    ],
    techStack: ["Java", "Kafka", "ClickHouse", "Redis"],
  },
  {
    name: "全量SQL分析系统",
    type: "实习项目",
    company: "小红书",
    period: "2025.10 - 2026.02",
    role: "负责人",
    description: "Binlog实时采集与持久化，单Pod吞吐提升2倍，峰值7K+ Event QPS，端到端延迟<1min。",
    highlights: [
      "消费链路调优：通过PProf定位瓶颈，单Pod吞吐提升2倍（12→25MB/s），端到端延迟<1min",
      "MQ发送优化：Protobuf序列化+LZ4压缩，单分片稳定处理4K+ Event QPS",
      "架构设计：Reader/Sender架构，全链路支持水平扩展",
      "数据降噪：降低数据噪声1/3+，增量/日报双轨告警接入IM触达到人"
    ],
    techStack: ["Java", "Protobuf", "LZ4", "ClickHouse"],
  },
  {
    name: "狮山健康小程序",
    type: "独立项目",
    period: "2024.10 - 2025.03",
    role: "独立开发",
    description: "AI健康管理小程序，集成Qwen实现健康问答，WebSocket流式输出TTFT≈490ms，获校级认证。",
    highlights: [
      "AI问答：集成Qwen+菜品识别API，问答准确率70%→80%，菜品分析准确率提升15%",
      "流式输出：WebSocket实现AI回答流式输出，TTFT≈490ms（30轮）",
      "缓存架构：实现排行榜/浏览量/点赞，Canal+binlog保障缓存一致性",
      "微信对接：实现微信快捷登录，获取用户步数、定位与跑步速率"
    ],
    techStack: ["Spring Boot", "WebSocket", "Qwen", "Redis"],
  },
  {
    name: "代码知识库平台",
    type: "独立项目",
    period: "2025.05 - 2025.07",
    role: "独立开发",
    description: "TB级代码存储库平台，ES双索引多维检索，160W行CSV导出<3min，性能提升百倍。",
    highlights: [
      "ES双索引：满足项目与代码双重检索，实现多维度检索和关键词查询",
      "断点续传：基于Redis Bitmap/Hash实现异步任务进度条和断点续传",
      "性能优化：NIO零拷贝优化文件下载，CPU与IO负载分别降低10%和8%",
      "批量导入：160W行CSV导出<3min，相比批处理百倍提升"
    ],
    techStack: ["Spring Boot", "Elasticsearch", "Redis", "NIO"],
  },
];


// ============================================
// 成长历程
// ============================================

export const milestones = [
  {
    date: "2023.09",
    title: "进入华中农业大学",
    description: "计算机科学与技术专业，开始系统学习计算机基础课程。",
  },
  {
    date: "2024.03",
    title: "担任沸点工作室总负责人",
    description: "负责技术人才培养、项目对接与团队管理。",
  },
  {
    date: "2024.10",
    title: "狮山健康小程序立项",
    description: "获得华中农业大学认证，集成AI健康管理功能。",
  },
  {
    date: "2025.05",
    title: "代码知识库平台开发",
    description: "独立完成TB级代码存储库平台，性能优化成果显著。",
  },
  {
    date: "2025.09",
    title: "入职小红书",
    description: "加入关系型数据库平台研发组，参与核心基础设施建设。",
  },
  {
    date: "2026.03",
    title: "实习成果总结",
    description: "主导慢SQL治理与全量SQL分析，支撑日均百万级数据处理。",
  },
];


// ============================================
// 技术栈
// ============================================

export const techSkills = {
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
    items: ["MySQL", "Redis", "ClickHouse", "Kafka"],
    details: {
      "MySQL": "熟悉事务原理、锁机制、MVCC、索引优化、慢SQL分析、主从复制",
      "Redis": "熟练使用各种数据结构，了解持久化、哨兵、集群、缓存穿透/雪崩解决方案",
      "ClickHouse": "有实际使用经验，了解列式存储、聚合查询优化、分区策略",
      "Kafka": "熟悉消息队列模型、分区副本、消费者组、高吞吐读写实践",
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
  "中间件": {
    items: ["Kafka", "Canal", "Elasticsearch", "WebSocket"],
    details: {
      "Kafka": "高吞吐消息队列实践，消费者组管理、消息可靠性保障",
      "Canal": "MySQL binlog解析、数据同步、缓存一致性保障",
      "Elasticsearch": "全文检索、聚合查询、索引设计、性能优化",
      "WebSocket": "实时通信、流式输出、长连接管理",
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
