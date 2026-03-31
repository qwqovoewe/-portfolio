// ============================================
// 网站内容配置文件 - 修改这里的文字即可更新网站
// ============================================

// ========== Hero 区域 ==========
export const hero = {
  welcome: "Welcome",
  title: "Hi, I'm {name}",
  name: "Ruixuan Wang",
  subtitle: "AI全栈开发 / 后端工程师 / 华中农业大学 / 沸点工作室",
  buttons: {
    projects: "查看作品",
    about: "了解更多",
  },
};

// ========== 项目经历 ==========
export const projects = [
  { 
    id: 'slow-sql',
    title: '慢SQL治理平台', 
    description: '小红书核心项目。设计聚合+告警+持久化流水线，聚合耗时下降60%，并发QPS提升2.1倍，覆盖900+集群。', 
    tags: ['Java', 'Kafka', 'ClickHouse', 'Redis'], 
    highlight: true,
    details: {
      role: '项目主导',
      time: '2025.09 - 2026.03',
      company: '小红书 - 关系型数据库平台研发组',
      overview: '设计并落地聚合+告警+持久化流水线，补齐告警订阅与巡检功能，形成优化闭环。',
      achievements: [
        '高性能聚合器：基于时间窗口轮转实现分层聚合结构，优化并发模型降低热点Key锁竞争，聚合耗时下降60%（830ms→340ms），并发QPS提升2.1倍',
        'Kafka消费一致性：采用Hash分片与Sticky+StaticMember消费策略，保障多Pod场景下聚合一致性，降低数据抖动与重复告警',
        '平台能力闭环：实现动态通知、静默、白名单、自定义配置、跳转详情，集成索引推荐与根因定位',
        '整体规模：Binlog采集链路覆盖900+集群，Kafka写入流量100+MB/s，单实例峰值7K+ Event QPS'
      ],
      tech: ['Java', 'Kafka', 'ClickHouse', 'Redis', 'Spring Boot']
    }
  },
  { 
    id: 'full-sql',
    title: '全量SQL分析系统', 
    description: 'Binlog实时采集与持久化，单Pod吞吐提升2倍，峰值7K+ Event QPS，端到端延迟<1min。', 
    tags: ['Java', 'Protobuf', 'LZ4', 'ClickHouse'], 
    highlight: true,
    details: {
      role: '负责人',
      time: '2025.10 - 2026.02',
      company: '小红书 - 关系型数据库平台研发组',
      overview: '负责Binlog SQL实时采集与持久化，提供TOP SQL定位、表级流量分析等能力，实现SQL写入可观测。',
      achievements: [
        '消费链路调优：通过PProf定位瓶颈，采用池化复用、列式插入等优化，单Pod吞吐提升2倍（12→25MB/s），端到端延迟<1min',
        'MQ发送优化：采用Protobuf序列化+LZ4压缩降低网络开销，环形缓冲区+令牌桶优化文件读取，单分片稳定处理4K+ Event QPS',
        '整体架构设计：Reader/Sender架构，采集解析与聚合发送解耦，消费侧多Worker并发消费+批量写入，全链路支持水平扩展',
        '异步聚合+核查：降低数据噪声1/3+，增量/日报双轨告警接入IM触达到人，增量收口效率显著提升'
      ],
      tech: ['Java', 'Protobuf', 'LZ4', 'ClickHouse', 'Kafka']
    }
  },
  { 
    id: 'shishan-health',
    title: '狮山健康小程序', 
    description: 'AI健康管理小程序，集成Qwen实现健康问答，WebSocket流式输出TTFT≈490ms，获校级认证。', 
    tags: ['Spring Boot', 'WebSocket', 'Qwen', 'Redis'], 
    highlight: false,
    details: {
      role: '独立开发',
      time: '2024.10 - 2025.03',
      company: '华中农业大学认证项目',
      overview: '基于微信生态的AI健康管理程序，提供健康建议、饮食评分、运动打卡、排行榜等功能，生成个性化建议，激励健康习惯养成。',
      achievements: [
        '集成Qwen+菜品识别API实现健康问答与营养分析，通过Prompt+样本微调，问答准确率70%→80%，菜品分析准确率提升15%',
        'WebSocket实现AI回答流式输出，TTFT≈490ms（30轮），用写时删除与TTL控制策略，降低大模型调用频率',
        'Redis缓存架构：实现排行榜(ZSet)/浏览量(Hash)/点赞(延迟双删)，Canal+binlog保障缓存一致性',
        '微信生态对接：ThreadLocal传递用户信息，实现微信快捷登录，获取用户步数、定位与跑步速率等运动数据'
      ],
      tech: ['Spring Boot', 'Spring Security', 'WebSocket', 'Qwen', 'Redis', 'MySQL']
    }
  },
  { 
    id: 'code-knowledge',
    title: '代码知识库平台', 
    description: 'TB级代码存储库平台，ES双索引多维检索，160W行CSV导出<3min，性能提升百倍。', 
    tags: ['Spring Boot', 'Elasticsearch', 'Redis', 'NIO'], 
    highlight: false,
    details: {
      role: '独立开发',
      time: '2025.05 - 2025.07',
      company: '个人项目',
      overview: '面向TB级代码项目的代码存储库平台，提供大数据导入导出、多维检索、自动化标签等功能。',
      achievements: [
        '基于ES双索引（project/code）满足项目与代码双重检索，实现多维度检索和关键词查询',
        '用Scroll API优化深度分页导出性能，基于Redis Bitmap/Hash实现异步任务进度条和导入导出断点续传',
        '用LRU Cache实现导出数据去重避免OOM风险，用NIO零拷贝优化文件下载，CPU与IO负载分别降低10%和8%',
        '双线程池优化导出，160W行CSV碎片化导出<3min，分块LOAD+Bulk API提升入库效率（相比批处理百倍提升）'
      ],
      tech: ['Spring Boot', 'Elasticsearch', 'Redis', 'MySQL', 'NIO']
    }
  },
];

// ========== 项目区域标题 ==========
export const projectsSection = {
  title: "项目经历",
  subtitle: "过往实习经历及独立开发的项目，涵盖高并发架构、性能优化与AI应用。",
  highlightBadge: "实习项目",
};

// ========== 成长历程 ==========
export const milestones = [
  { date: '2023.09', title: '进入华中农业大学', description: '计算机科学与技术专业，开始系统学习计算机基础课程。', icon: '🎓' },
  { date: '2024.03', title: '担任沸点工作室总负责人', description: '负责技术人才培养、项目对接与团队管理。', icon: '👥' },
  { date: '2024.10', title: '狮山健康小程序立项', description: '获得华中农业大学认证，集成AI健康管理功能。', icon: '💡' },
  { date: '2025.05', title: '代码知识库平台开发', description: '独立完成TB级代码存储库平台，性能优化成果显著。', icon: '🚀' },
  { date: '2025.09', title: '入职小红书', description: '加入关系型数据库平台研发组，参与核心基础设施建设。', icon: '💼' },
  { date: '2026.03', title: '实习成果总结', description: '主导慢SQL治理与全量SQL分析，支撑日均百万级数据处理。', icon: '✨' },
];

// ========== 成长历程区域标题 ==========
export const timelineSection = {
  title: "成长历程",
  subtitle: "从校园到职场的成长路径与关键里程碑。",
};

// ========== 关于我 ==========
export const aboutSection = {
  title: "关于我",
  subtitle: "了解更多关于我的信息。",
  intro: [
    "你好！我是王睿轩，华中农业大学计算机科学与技术专业本科生，目前在小米红书担任后端开发实习生。",
    "我专注于高并发架构设计与性能优化。在实习期间，我主导了慢SQL治理和全量SQL分析系统的设计与落地，通过多轮优化将系统性能提升 2-3 倍，支撑日均百万级数据处理。",
    "技术栈方面，我熟练掌握 Java、MySQL、Redis、Kafka 等后端技术，有丰富的大规模系统设计与落地经验。同时也在学习 Go 语言和云原生技术。",
    "工作之余，我担任沸点工作室总负责人，负责技术人才培养和项目对接，享受分享技术知识和帮助他人成长的过程。"
  ],
  skillsTitle: "技术栈",
  awardsTitle: "荣誉奖项",
  contactTitle: "联系我",
};

// ========== 技能 ==========
export const skills = [
  { 
    id: 'java-go',
    category: 'Java/Go', 
    items: ['Java基础', 'JVM调优', 'JUC并发', 'Go pprof'],
    description: '熟练掌握 Java 核心技术栈，包括集合框架、并发编程、JVM 调优等。了解 Go 语言并发模型。',
    details: [
      { title: 'Java 基础', content: '熟练掌握面向对象编程、反射机制、异常处理、IO/NIO、泛型等核心特性' },
      { title: 'JVM 调优', content: '熟悉内存结构（堆、栈、方法区）、垃圾回收算法、GC 日志分析、性能调优实践' },
      { title: 'JUC 并发', content: '深入理解 CAS、AQS、线程池原理、锁机制、并发容器、ThreadLocal 等' },
      { title: 'Go pprof', content: '了解 Go 并发模型，掌握 pprof 性能分析工具，有实际服务调优经验' },
    ]
  },
  { 
    id: 'database',
    category: '数据库', 
    items: ['MySQL', 'Redis', 'ClickHouse', 'Kafka'],
    description: '精通关系型数据库与 NoSQL，熟悉分布式存储与消息队列。',
    details: [
      { title: 'MySQL', content: '熟悉事务原理、锁机制、MVCC、索引优化、慢 SQL 分析、主从复制' },
      { title: 'Redis', content: '熟练使用各种数据结构，了解持久化、哨兵、集群、缓存穿透/雪崩解决方案' },
      { title: 'ClickHouse', content: '有实际使用经验，了解列式存储、聚合查询优化、分区策略' },
      { title: 'Kafka', content: '熟悉消息队列模型、分区副本、消费者组、高吞吐读写实践' },
    ]
  },
  { 
    id: 'frameworks',
    category: '框架', 
    items: ['Spring Boot', 'Spring Security', 'MyBatis', 'gRPC'],
    description: '熟练使用主流 Java 框架，理解核心原理与最佳实践。',
    details: [
      { title: 'Spring Boot', content: '熟练使用 IOC、AOP、自动配置，理解 Bean 生命周期、循环依赖解决机制' },
      { title: 'Spring Security', content: '掌握认证授权流程、JWT、OAuth2、权限控制实现' },
      { title: 'MyBatis', content: '熟悉动态 SQL、缓存机制、插件扩展、批量操作优化' },
      { title: 'gRPC', content: '了解 RPC 框架、Protocol Buffers、服务治理' },
    ]
  },
  { 
    id: 'middleware',
    category: '中间件', 
    items: ['Kafka', 'Canal', 'Elasticsearch', 'WebSocket'],
    description: '有丰富中间件使用经验，参与过大规模系统架构设计。',
    details: [
      { title: 'Kafka', content: '高吞吐消息队列实践，消费者组管理、消息可靠性保障' },
      { title: 'Canal', content: 'MySQL binlog 解析、数据同步、缓存一致性保障' },
      { title: 'Elasticsearch', content: '全文检索、聚合查询、索引设计、性能优化' },
      { title: 'WebSocket', content: '实时通信、流式输出、长连接管理' },
    ]
  },
  { 
    id: 'design-patterns',
    category: '设计模式', 
    items: ['单例', '工厂', '策略', '责任链', '模板方法'],
    description: '熟悉常见设计模式，在实际项目中灵活运用。',
    details: [
      { title: '单例模式', content: '双重检查锁、枚举实现、应用场景' },
      { title: '工厂模式', content: '简单工厂、工厂方法、抽象工厂' },
      { title: '策略模式', content: '算法族封装、运行时切换、消除条件语句' },
      { title: '责任链模式', content: '请求处理链、拦截器、过滤器' },
      { title: '模板方法', content: '算法骨架、扩展点设计、代码复用' },
    ]
  },
  { 
    id: 'engineering',
    category: '工程实践', 
    items: ['性能优化', '高并发架构', '分布式系统', '监控告警'],
    description: '有大流量系统设计与优化经验，注重工程质量与可观测性。',
    details: [
      { title: '性能优化', content: '系统瓶颈分析、JVM 调优、数据库优化、缓存策略' },
      { title: '高并发架构', content: '限流、降级、熔断、异步处理、读写分离' },
      { title: '分布式系统', content: '分布式事务、一致性保障、服务拆分、CAP 权衡' },
      { title: '监控告警', content: 'Prometheus、Grafana、链路追踪、日志分析' },
    ]
  },
];

// ========== 荣誉奖项 ==========
export const awards = [
  { icon: "🏆", title: "中国计算机设计大赛", subtitle: "中南赛区一等奖" },
  { icon: "🏆", title: "华中农业大学计算机设计大赛", subtitle: "第十一届二等奖" },
  { icon: "🏆", title: "小红书 1024 AI Coding", subtitle: "二等奖" },
  { icon: "📜", title: "CET-4", subtitle: "大学英语四级" },
];

// ========== 联系方式 ==========
export const contacts = {
  github: {
    label: "GitHub",
    url: "https://github.com/qwqovoewe",
    display: "github.com/qwqovoewe",
  },
  email: {
    label: "Email",
    value: "qq1729524191@163.com",
  },
  phone: {
    label: "电话",
    value: "18004909721",
    display: "180-0490-9721",
  },
  wechat: {
    label: "微信",
    display: "180-0490-9721（同号）",
    value: "18004909721",
  },
};

// ========== Footer ==========
export const footer = {
  copyright: "© 2026 Ruixuan. Built All with OpenClaw + Astro + Tailwind + Pretext.",
  disclaimer: "💡 本站内容由个人 OpenClaw 基于个人知识库生成，详情请以简历为准",
};

// ========== 导航菜单 ==========
export const navItems = [
  { name: "首页", href: "#hero" },
  { name: "作品集", href: "#projects" },
  { name: "时间线", href: "#timeline" },
  { name: "关于", href: "#about" },
];
