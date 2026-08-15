const experiences = [
  { id: "fjnu-cs", school: "福建师范大学", major: "计算机科学与技术", city: "福州", level: "已认证 · 2023级", source: "student", publishedAt: "2026-08-10", consensus: { recommend: 9, total: 12 }, text: "课程强调理论与工程实践的结合，作业量中等偏上，适合喜欢系统性学习的同学。", tags: ["作业", "实践"], dimensions: ["课程学习"] },
  { id: "fzu-econ", school: "福州大学", major: "经济学", city: "福州", level: "已认证 · 2022级", source: "student", publishedAt: "2026-07-24", consensus: { recommend: 8, total: 9 }, text: "考研氛围浓，建议提前准备数学与专业课，社团与实践机会较多。", tags: ["考研", "生活"], dimensions: ["课程学习", "校园氛围", "城市环境", "社团活动"] },
  { id: "xmu-news", school: "厦门大学", major: "新闻传播学", city: "厦门", level: "已认证 · 2024级", source: "student", publishedAt: "2026-06-18", consensus: { recommend: 14, total: 17 }, text: "课程里有不少实战项目，适合想做媒体与内容生产的同学，实习机会较多。", tags: ["实习", "项目"], dimensions: ["课程学习", "就业去向"] },
  { id: "hqu-med", school: "华侨大学", major: "临床医学", city: "泉州", level: "已认证 · 2021级", source: "student", publishedAt: "2026-05-09", consensus: { recommend: 2, total: 2 }, text: "专业学习周期长，临床实践密集，对体力与耐心要求高。", tags: ["临床", "实践"], dimensions: ["课程学习"] },
  { id: "fafu-land", school: "福建农林大学", major: "风景园林", city: "福州", level: "已认证 · 2023级", source: "student", publishedAt: "2026-04-16", consensus: { recommend: 6, total: 8 }, text: "项目制作业较多，利于作品集准备，适合偏向设计/景观方向的同学。", tags: ["设计", "作品集"], dimensions: ["课程学习", "就业去向"] },
  { id: "jmu-nautical", school: "集美大学", major: "航海技术", city: "厦门", level: "已认证 · 2022级", source: "student", publishedAt: "2026-02-11", consensus: { recommend: 1, total: 1 }, text: "专业路径比较明确，但需要适应海上实训与体能训练。", tags: ["实训", "体能"], dimensions: ["课程学习", "城市环境"] },
  { id: "fjnu-cs-campus", school: "福建师范大学", major: "计算机科学与技术", city: "福州", level: "已认证 · 2023级", source: "student", publishedAt: "2026-01-22", consensus: { recommend: 7, total: 10 }, text: "宿舍条件和校区安排需要结合具体学院确认，公共学习空间比较方便，建议提前了解宿舍分配规则。", tags: ["宿舍", "校区"], dimensions: ["宿舍生活"] },
  { id: "fjnu-education", school: "福建师范大学", major: "教育学", city: "福州", level: "已认证 · 2022级", source: "student", publishedAt: "2025-12-02", consensus: { recommend: 10, total: 13 }, text: "课程阅读和课堂讨论占比不低，想走教师教育方向的同学可以关注实习安排和教育实践机会。", tags: ["阅读", "教育实践"], dimensions: ["课程学习", "就业去向"] },
  { id: "fjnu-city", school: "福建师范大学", major: "汉语言文学", city: "福州", level: "已认证 · 2021级", source: "student", publishedAt: "2025-10-18", consensus: { recommend: 8, total: 11 }, text: "福州生活节奏适中，学校周边日常配套较完整，通勤和生活成本仍要按校区与个人习惯估算。", tags: ["生活成本", "通勤"], dimensions: ["城市环境"] },
  { id: "fzu-econ-campus", school: "福州大学", major: "经济学", city: "福州", level: "已认证 · 2022级", source: "student", publishedAt: "2025-08-26", consensus: { recommend: 6, total: 9 }, text: "课程中需要持续阅读和整理案例，期末阶段任务集中，平时做好笔记会比临时突击轻松。", tags: ["案例", "期末"], dimensions: ["课程学习"] },
  { id: "fzu-engineering", school: "福州大学", major: "机械设计制造及其自动化", city: "福州", level: "已认证 · 2023级", source: "student", publishedAt: "2025-06-12", consensus: { recommend: 5, total: 7 }, text: "实验和课程设计需要投入连续时间，喜欢动手和工程实践的同学更容易找到学习节奏。", tags: ["实验", "工程实践"], dimensions: ["课程学习", "就业去向"] },
  { id: "fzu-career", school: "福州大学", major: "经济学", city: "福州", level: "已认证 · 2021级", source: "student", publishedAt: "2025-02-03", consensus: { recommend: 7, total: 8 }, text: "实习和考研是比较常见的选择，最好在大二前后确定更偏向数据分析、金融或公共部门的方向。", tags: ["实习", "考研"], dimensions: ["就业去向"] },
  { id: "xmu-news-campus", school: "厦门大学", major: "新闻传播学", city: "厦门", level: "已认证 · 2024级", source: "student", publishedAt: "2024-11-28", consensus: { recommend: 12, total: 15 }, text: "课程展示和小组项目较多，宿舍与课堂之间的安排需要留出机动时间，适合愿意主动表达和协作的同学。", tags: ["小组项目", "表达"], dimensions: ["宿舍生活", "课程学习"] },
  { id: "hqu-med-career", school: "华侨大学", major: "临床医学", city: "泉州", level: "已认证 · 2021级", source: "student", publishedAt: "2024-06-14", consensus: { recommend: 2, total: 3 }, text: "后续升学和规培规划需要较早了解，专业学习投入时间长，不能只用本科阶段的课程数量来判断压力。", tags: ["升学", "规培"], dimensions: ["就业去向"] },
  { id: "fafu-land-campus", school: "福建农林大学", major: "风景园林", city: "福州", level: "已认证 · 2023级", source: "student", publishedAt: "2023-12-08", consensus: { recommend: 5, total: 7 }, text: "图纸、模型和软件练习可能集中在同一阶段，宿舍里需要注意桌面空间和作息安排。", tags: ["模型", "作息"], dimensions: ["宿舍生活", "课程学习"] },
  { id: "jmu-nautical-career", school: "集美大学", major: "航海技术", city: "厦门", level: "已认证 · 2022级", source: "student", publishedAt: "2023-04-20", consensus: { recommend: 2, total: 3 }, text: "行业路径相对明确，但工作地点和轮班方式与普通办公室岗位不同，报考前应把职业生活方式一起考虑。", tags: ["行业路径", "轮班"], dimensions: ["就业去向"] },
  { id: "fjnu-campus-route", school: "福建师范大学", major: "地理科学", city: "福州", level: "已认证 · 2023级", source: "student", publishedAt: "2026-08-06", text: "旗山校区不同宿舍区到食堂、快递站和教学楼的步行时间差异较大，选宿舍与校区信息时最好把日常动线一起确认。", tags: ["食堂", "快递站", "步行动线"], dimensions: ["设施布局"] },
  { id: "fafu-campus-culture", school: "福建农林大学", major: "风景园林", city: "福州", level: "已认证 · 2023级", source: "student", publishedAt: "2026-07-12", text: "学院项目协作较多，同学之间常会交流软件、模型和作品集经验，但不同年级与工作室的节奏可能不一样。", tags: ["同学互助", "项目协作"], dimensions: ["校园氛围"] },
  { id: "fjnu-data", school: "福建师范大学", major: "计算机科学与技术", city: "福州", source: "data", title: "招生与录取数据入口", value: "录取位次 · 招生计划 · 专业目录", text: "用于查看公开招生计划、历年录取信息和专业目录，具体数据以当年度发布页面为准。", tags: ["公开数据", "年度更新"], dimensions: ["录取信息"], sourceName: "阳光高考信息平台", sourceUrl: "https://gaokao.chsi.com.cn/" },
  { id: "fjnu-official", school: "福建师范大学", major: "计算机科学与技术", city: "福州", source: "official", title: "学校官方招生与培养信息", value: "招生简章 · 培养方案 · 校方通知", text: "学校官网提供招生政策、院系介绍和培养相关信息，适合与学生经验对照阅读。", tags: ["官方发布", "学校信息"], dimensions: ["课程学习", "录取信息"], sourceName: "福建师范大学官网", sourceUrl: "https://www.fjnu.edu.cn/" },
  { id: "fzu-official", school: "福州大学", major: "经济学", city: "福州", source: "official", title: "学校官方招生信息", value: "招生政策 · 院校介绍 · 官方通知", text: "优先查看学校公开发布的招生与院校信息，具体专业要求以当年度官方页面为准。", tags: ["官方发布", "招生信息"], dimensions: ["录取信息"], sourceName: "福州大学官网", sourceUrl: "https://www.fzu.edu.cn/" },
  { id: "career-expert", school: "福建师范大学", major: "计算机科学与技术", city: "福州", source: "expert", publishedAt: "2026-07-05", title: "计算机专业就业能力从哪里开始积累？", value: "课程基础 · 项目实践 · 岗位要求", text: "从业视角更关注技能如何对应真实岗位，建议把课程、项目和实习经历放在一起判断。", tags: ["职业路径", "技能要求"], dimensions: ["就业去向"], sourceName: "人力资源和社会保障部", sourceUrl: "https://www.mohrss.gov.cn/" },
  { id: "fjnu-teacher-culture", school: "福建师范大学", major: "教育学", city: "福州", level: "教师身份已核验", source: "expert", publishedAt: "2026-06-26", title: "如何判断学院的学习与交流氛围？", text: "可以观察课堂讨论、导师交流、学生组织与跨年级互助是否稳定，不要只根据一次活动或宣传材料判断整个学院。", tags: ["师生交流", "学习氛围"], dimensions: ["校园氛围"] }
];

const institutions = [
  {
    id: "fjnu",
    school: "福建师范大学",
    englishName: "Fujian Normal University",
    city: "福州",
    type: "公办本科 · 师范类院校",
    identityTags: ["非985", "非211", "非双一流"],
    identityNote: "当前不属于985、211或第二轮双一流建设高校",
    academicProfile: "教师教育与师范类培养特色突出，同时覆盖文、理、工、经、管等学科方向。",
    admissionReference: { value: "近三年录取位次待接入", note: "需按省份、年份、选科和专业组比较，不能只看最低分" },
    founded: "1907年",
    educationLevel: "本科 / 研究生教育",
    campuses: "旗山校区、仓山校区",
    updatedAt: "2026年8月",
    updatedAtISO: "2026-08-01",
    intro: "学校以教师教育为特色，同时覆盖文、理、工、经、管等多个学科方向。平台先把学校概况、招生线索和专业培养信息整理成摘要，方便你建立整体认识。",
    majors: ["计算机科学与技术", "汉语言文学", "教育学"],
    majorPrograms: [
      { name: "计算机科学与技术", school: "计算机与网络空间安全学院", category: "工学", level: "本科", note: "关注计算机基础、软件开发与工程实践。", officialUrl: "http://ccs.fjnu.edu.cn/" },
      { name: "汉语言文学", school: "文学院", category: "文学", level: "本科", note: "关注语言文学基础、阅读研究与表达能力。", officialUrl: "http://wxy.fjnu.edu.cn/" },
      { name: "教育学", school: "教育学院", category: "教育学", level: "本科", note: "关注教育理论、教育研究与实践能力。", officialUrl: "http://jyxy.fjnu.edu.cn/" },
      { name: "数学与应用数学", school: "数学与统计学院", category: "理学", level: "本科", note: "关注数学基础、逻辑训练与应用分析。", officialUrl: "http://math.fjnu.edu.cn/" },
      { name: "地理科学", school: "地理科学学院", category: "理学", level: "本科", note: "关注自然与人文地理、空间分析和教学实践。", officialUrl: "http://geo.fjnu.edu.cn/" }
    ],
    highlights: ["教师教育特色", "多学科协同", "福州城市环境"],
    dataSummary: "可查招生计划、专业目录与历年录取位次等公开数据，具体批次和分数以当年度发布内容为准。",
    admissionBrief: "招生信息需要结合年份、省份、科类与专业组查看。平台将学校官方章程与公开录取数据分开标注，避免不同统计口径混用。",
    admissionYears: ["2026", "2025", "2024"],
    admissionProvinces: ["福建", "全国"],
    admissionSubjects: ["物理类", "历史类", "不限科类"],
    admissionResources: [
      { icon: "clipboard-list", title: "招生计划", description: "分省、分科类和分专业的招生名额", sourceType: "学校官方发布", sourceName: "福建师范大学官网", year: "2026", status: "待接入", url: "https://www.fjnu.edu.cn/" },
      { icon: "chart-no-axes-column-increasing", title: "历年分数与位次", description: "按省份、批次和专业查看公开录取信息", sourceType: "公开数据平台", sourceName: "阳光高考信息平台", year: "近三年", status: "待接入", url: "https://gaokao.chsi.com.cn/" },
      { icon: "file-text", title: "招生章程", description: "查看报考条件、录取规则与专业要求", sourceType: "学校官方发布", sourceName: "福建师范大学官网", year: "2026", status: "查看来源", url: "https://www.fjnu.edu.cn/" }
    ],
    latestUpdates: [
      { type: "招生政策", title: "年度招生政策与章程", summary: "关注报考条件、选考科目、录取规则和专业限制是否发生变化。", date: "发布日期待接入", publisher: "福建师范大学官方发布", status: "原文待接入", url: "https://www.fjnu.edu.cn/" },
      { type: "专业调整", title: "招生专业与培养方向调整", summary: "关注新增、停招、合并专业及培养方向变化，具体信息以当年度目录为准。", date: "发布日期待接入", publisher: "福建师范大学官方发布", status: "原文待接入", url: "https://www.fjnu.edu.cn/" },
      { type: "培养政策", title: "转专业与培养安排通知", summary: "关注转专业条件、培养方案、实践学期和校区安排等最新通知。", date: "发布日期待接入", publisher: "福建师范大学官方发布", status: "原文待接入", url: "https://www.fjnu.edu.cn/" }
    ],
    postgraduateRecommendation: { value: "待接入可靠数据", year: "待确认", recommendedCount: "待接入", graduateScope: "待接入", methodology: "推免人数 ÷ 对应届本科毕业生统计范围；以学校公示口径为准", source: "学校推免公示及年度就业质量报告", updatedAt: "待确认" },
    officialSummary: "可查学校简介、招生简章、院系介绍和培养方案等官方资料。",
    campusSummary: "校区位于福州，城市生活与教育资源较集中，具体校园安排需结合校区和专业确认。",
    campusDetails: [
      { name: "旗山校区", location: "福州市大学城片区", colleges: "学院分布待接入学校官方资料", transport: "公交、地铁及校内交通信息待核实", status: "主要校区" },
      { name: "仓山校区", location: "福州市仓山区", colleges: "学院分布待接入学校官方资料", transport: "周边公共交通信息待核实", status: "历史校区" }
    ],
    cityReferences: [
      { icon: "train-front", label: "跨城交通", value: "高铁、机场等城市交通信息", note: "具体通勤时间待接入地图数据" },
      { icon: "cloud-sun", label: "气候环境", value: "亚热带季风气候", note: "生活体验结合本校评论查看" },
      { icon: "briefcase-business", label: "实习环境", value: "省会城市就业与实习资源", note: "岗位数量和行业分布待可靠来源" },
      { icon: "wallet-cards", label: "生活费用", value: "待接入可靠数据", note: "不使用未经核实的费用估算" }
    ],
    campusMedia: [
      { icon: "circle-play", title: "官方视频", description: "校园宣传片、校区介绍与官方讲座", status: "待接入官方素材", url: "https://www.fjnu.edu.cn/" },
      { icon: "images", title: "校园相册", description: "教学楼、图书馆、宿舍与公共空间", status: "待接入官方素材", url: "https://www.fjnu.edu.cn/" },
      { icon: "map", title: "校区地图", description: "查看校区位置、学院分布与交通入口", status: "待接入地图数据", url: "https://www.fjnu.edu.cn/" }
    ],
    careerSummary: "不同专业的升学、教师教育和行业就业路径差异较大，建议结合专业课程与认证经验一起判断。",
    officialSource: "福建师范大学官网",
    officialUrl: "https://www.fjnu.edu.cn/",
    dataSource: "阳光高考信息平台",
    dataUrl: "https://gaokao.chsi.com.cn/",
    dimensions: ["课程学习", "录取信息", "设施布局", "城市环境"]
  },
  {
    id: "fzu",
    school: "福州大学",
    englishName: "Fuzhou University",
    city: "福州",
    type: "公办本科 · 综合类院校",
    identityTags: ["非985", "211", "双一流"],
    identityNote: "211工程高校、第二轮双一流建设高校",
    academicProfile: "以工为主、理工结合，经济、管理及人文等学科协同发展。",
    admissionReference: { value: "近三年录取位次待接入", note: "需按省份、年份、选科和专业组比较，不能只看最低分" },
    founded: "1958年",
    educationLevel: "本科 / 研究生教育",
    campuses: "旗山校区等",
    updatedAt: "2026年8月",
    updatedAtISO: "2026-08-01",
    intro: "学校是一所以工为主、理工结合，兼有经济、管理、人文等学科的综合性大学。平台将院校层面的基本信息与具体专业经验分开呈现，避免只看到一个官网入口。",
    majors: ["经济学", "机械设计制造及其自动化", "计算机科学与技术"],
    majorPrograms: [
      { name: "经济学", school: "经济与管理学院", category: "经济学", level: "本科", note: "关注经济理论、数据分析与社会经济问题。", officialUrl: "https://www.fzu.edu.cn/system/resource/link.jsp?bmmc=jgxy&type=w" },
      { name: "机械设计制造及其自动化", school: "机械工程及自动化学院", category: "工学", level: "本科", note: "关注机械设计、制造技术与工程实践。", officialUrl: "https://www.fzu.edu.cn/system/resource/link.jsp?bmmc=jxxy&type=w" },
      { name: "计算机科学与技术", school: "计算机与大数据学院", category: "工学", level: "本科", note: "关注计算机系统、程序设计与应用开发。", officialUrl: "https://www.fzu.edu.cn/system/resource/link.jsp?bmmc=ccds&type=w" },
      { name: "电气工程及其自动化", school: "电气工程与自动化学院", category: "工学", level: "本科", note: "关注电力系统、控制技术与工程应用。", officialUrl: "https://www.fzu.edu.cn/system/resource/link.jsp?bmmc=dqxy&type=w" },
      { name: "化学工程与工艺", school: "化工学院", category: "工学", level: "本科", note: "关注化工原理、工艺设计与实验实践。", officialUrl: "https://www.fzu.edu.cn/system/resource/link.jsp?bmmc=che&type=w" }
    ],
    highlights: ["理工特色明显", "综合学科布局", "福州城市环境"],
    dataSummary: "可查招生政策、招生计划、专业目录和公开录取信息，年份、地区与专业口径需要在查询时进一步确认。",
    admissionBrief: "招生计划和录取结果会因省份、科类与专业组而变化。平台只在来源与统计口径明确时展示具体数值。",
    admissionYears: ["2026", "2025", "2024"],
    admissionProvinces: ["福建", "全国"],
    admissionSubjects: ["物理类", "历史类", "不限科类"],
    admissionResources: [
      { icon: "clipboard-list", title: "招生计划", description: "分省、分科类和分专业的招生名额", sourceType: "学校官方发布", sourceName: "福州大学官网", year: "2026", status: "待接入", url: "https://www.fzu.edu.cn/" },
      { icon: "chart-no-axes-column-increasing", title: "历年分数与位次", description: "按省份、批次和专业查看公开录取信息", sourceType: "公开数据平台", sourceName: "阳光高考信息平台", year: "近三年", status: "待接入", url: "https://gaokao.chsi.com.cn/" },
      { icon: "file-text", title: "招生章程", description: "查看报考条件、录取规则与专业要求", sourceType: "学校官方发布", sourceName: "福州大学官网", year: "2026", status: "查看来源", url: "https://www.fzu.edu.cn/" }
    ],
    latestUpdates: [
      { type: "招生政策", title: "年度招生政策与章程", summary: "关注报考条件、选考科目、录取规则和专业限制是否发生变化。", date: "发布日期待接入", publisher: "福州大学官方发布", status: "原文待接入", url: "https://www.fzu.edu.cn/" },
      { type: "专业调整", title: "招生专业与培养方向调整", summary: "关注新增、停招、合并专业及培养方向变化，具体信息以当年度目录为准。", date: "发布日期待接入", publisher: "福州大学官方发布", status: "原文待接入", url: "https://www.fzu.edu.cn/" },
      { type: "培养政策", title: "转专业与培养安排通知", summary: "关注转专业条件、培养方案、实践学期和校区安排等最新通知。", date: "发布日期待接入", publisher: "福州大学官方发布", status: "原文待接入", url: "https://www.fzu.edu.cn/" }
    ],
    postgraduateRecommendation: { value: "待接入可靠数据", year: "待确认", recommendedCount: "待接入", graduateScope: "待接入", methodology: "推免人数 ÷ 对应届本科毕业生统计范围；以学校公示口径为准", source: "学校推免公示及年度就业质量报告", updatedAt: "待确认" },
    officialSummary: "可查学校概况、招生简章、院系通知和专业培养相关资料。",
    campusSummary: "学校位于福州，校园与城市生活信息会因校区和专业不同而变化，平台后续可继续补充认证经验。",
    campusDetails: [
      { name: "旗山校区", location: "福州市大学城片区", colleges: "学院分布待接入学校官方资料", transport: "公交、地铁及校内交通信息待核实", status: "主要校区" },
      { name: "其他校区", location: "具体校区信息以学校官方发布为准", colleges: "学院分布待接入学校官方资料", transport: "交通信息待核实", status: "待完善" }
    ],
    cityReferences: [
      { icon: "train-front", label: "跨城交通", value: "高铁、机场等城市交通信息", note: "具体通勤时间待接入地图数据" },
      { icon: "cloud-sun", label: "气候环境", value: "亚热带季风气候", note: "生活体验结合本校评论查看" },
      { icon: "briefcase-business", label: "实习环境", value: "省会城市就业与实习资源", note: "岗位数量和行业分布待可靠来源" },
      { icon: "wallet-cards", label: "生活费用", value: "待接入可靠数据", note: "不使用未经核实的费用估算" }
    ],
    campusMedia: [
      { icon: "circle-play", title: "官方视频", description: "校园宣传片、校区介绍与官方讲座", status: "待接入官方素材", url: "https://www.fzu.edu.cn/" },
      { icon: "images", title: "校园相册", description: "教学楼、图书馆、宿舍与公共空间", status: "待接入官方素材", url: "https://www.fzu.edu.cn/" },
      { icon: "map", title: "校区地图", description: "查看校区位置、学院分布与交通入口", status: "待接入地图数据", url: "https://www.fzu.edu.cn/" }
    ],
    careerSummary: "经济、工科和计算机等专业的课程结构及就业方向不同，应结合目标专业的培养方案和行业信息比较。",
    officialSource: "福州大学官网",
    officialUrl: "https://www.fzu.edu.cn/",
    dataSource: "阳光高考信息平台",
    dataUrl: "https://gaokao.chsi.com.cn/",
    dimensions: ["课程学习", "录取信息", "设施布局", "城市环境"]
  },
  {
    id: "fafu",
    school: "福建农林大学",
    englishName: "Fujian Agriculture and Forestry University",
    city: "福州",
    type: "公办本科 · 农林类院校",
    identityTags: ["非985", "非211", "非双一流"],
    identityNote: "当前不属于985、211或第二轮双一流建设高校",
    academicProfile: "农林、生命科学与生态相关方向特色明显，同时覆盖工、理、经、管等学科。",
    admissionReference: { value: "近三年录取位次待接入", note: "需按省份、年份、选科和专业组比较，不能只看最低分" },
    founded: "1936年",
    educationLevel: "本科 / 研究生教育",
    campuses: "金山校区等",
    updatedAt: "2026年8月",
    updatedAtISO: "2026-08-01",
    intro: "学校以农林学科和生命科学为特色，同时覆盖工、理、经、管、文、法、艺等学科方向。平台将学校概况、专业培养、招生资料和校园体验分开整理，便于进一步核对不同专业所在学院与培养安排。",
    majors: ["风景园林", "食品科学与工程", "植物保护"],
    majorPrograms: [
      { name: "风景园林", school: "风景园林与艺术学院", category: "工学", level: "本科", note: "关注景观设计、生态规划、制图表达与项目实践。", officialUrl: "https://www.fafu.edu.cn/" },
      { name: "食品科学与工程", school: "食品科学学院", category: "工学", level: "本科", note: "关注食品加工、质量安全、工程基础与实验实践。", officialUrl: "https://www.fafu.edu.cn/" },
      { name: "植物保护", school: "植物保护学院", category: "农学", level: "本科", note: "关注植物病虫害、农业生态与绿色防控技术。", officialUrl: "https://www.fafu.edu.cn/" },
      { name: "农学", school: "农学院", category: "农学", level: "本科", note: "关注作物生产、遗传育种与现代农业技术。", officialUrl: "https://www.fafu.edu.cn/" },
      { name: "计算机科学与技术", school: "计算机与信息学院", category: "工学", level: "本科", note: "关注计算机基础、软件开发及信息技术应用。", officialUrl: "https://www.fafu.edu.cn/" }
    ],
    highlights: ["农林学科特色", "生命科学方向", "福州城市环境"],
    dataSummary: "可查招生章程、招生计划、专业目录和公开录取信息。涉及年份、省份与专业组的具体数据时，应以学校和公开招生平台当年度发布内容为准。",
    admissionBrief: "招生计划与录取条件会因省份、科类和专业组发生变化。平台先呈现查询结构与官方来源入口，不使用未经核实的分数或录取概率。",
    admissionYears: ["2026", "2025", "2024"],
    admissionProvinces: ["福建", "全国"],
    admissionSubjects: ["物理类", "历史类", "不限科类"],
    admissionResources: [
      { icon: "clipboard-list", title: "招生计划", description: "分省、分科类和分专业查看招生名额", sourceType: "学校官方发布", sourceName: "福建农林大学官网", year: "2026", status: "待接入", url: "https://www.fafu.edu.cn/" },
      { icon: "chart-no-axes-column-increasing", title: "历年分数与位次", description: "按省份、批次和专业查看公开录取资料", sourceType: "公开数据平台", sourceName: "阳光高考信息平台", year: "近三年", status: "待接入", url: "https://gaokao.chsi.com.cn/" },
      { icon: "file-text", title: "招生章程", description: "查看报考条件、录取规则和专业要求", sourceType: "学校官方发布", sourceName: "福建农林大学官网", year: "2026", status: "查看来源", url: "https://www.fafu.edu.cn/" }
    ],
    latestUpdates: [
      { type: "招生政策", title: "年度招生政策与章程", summary: "关注报考条件、选考科目、录取规则和专业限制是否调整。", date: "发布日期待接入", publisher: "福建农林大学官方发布", status: "原文待接入", url: "https://www.fafu.edu.cn/" },
      { type: "专业调整", title: "招生专业与培养方向调整", summary: "关注农林、工科和生命科学相关专业的招生目录与培养方向变化。", date: "发布日期待接入", publisher: "福建农林大学官方发布", status: "原文待接入", url: "https://www.fafu.edu.cn/" },
      { type: "培养政策", title: "转专业与培养安排通知", summary: "关注转专业条件、实践教学、实验安排和校区分布等最新通知。", date: "发布日期待接入", publisher: "福建农林大学官方发布", status: "原文待接入", url: "https://www.fafu.edu.cn/" }
    ],
    postgraduateRecommendation: { value: "待接入可靠数据", year: "待确认", recommendedCount: "待接入", graduateScope: "待接入", methodology: "推免人数 ÷ 对应届本科毕业生统计范围；以学校公示口径为准", source: "学校推免公示及年度就业质量报告", updatedAt: "待确认" },
    officialSummary: "可查学校概况、学院设置、招生简章、专业介绍和培养相关通知。",
    campusSummary: "学校主要办学地点位于福州。校园体验、学院位置和住宿安排需结合具体校区、专业及当年通知确认。",
    campusDetails: [
      { name: "金山校区", location: "福州市仓山区", colleges: "具体学院分布待接入学校官方资料", transport: "公共交通和校内通行信息待核实", status: "主要校区" },
      { name: "其他办学地点", location: "具体信息以学校官方发布为准", colleges: "专业与学院分布待接入学校官方资料", transport: "交通与住宿安排待核实", status: "待完善" }
    ],
    cityReferences: [
      { icon: "train-front", label: "跨城交通", value: "高铁、机场等城市交通信息", note: "具体通勤时间待接入地图数据" },
      { icon: "cloud-sun", label: "气候环境", value: "亚热带季风气候", note: "生活体验结合本校评论查看" },
      { icon: "briefcase-business", label: "实践环境", value: "农业、生态、食品与设计相关实践方向", note: "具体合作单位与岗位信息待可靠来源" },
      { icon: "wallet-cards", label: "生活费用", value: "待接入可靠数据", note: "不使用未经核实的费用估算" }
    ],
    campusMedia: [
      { icon: "circle-play", title: "官方视频", description: "校园宣传片、校区介绍与学校公开讲座", status: "待接入官方素材", url: "https://www.fafu.edu.cn/" },
      { icon: "images", title: "校园相册", description: "教学空间、实验场地、宿舍与公共区域", status: "待接入官方素材", url: "https://www.fafu.edu.cn/" },
      { icon: "map", title: "校区地图", description: "查看校区位置、学院分布与交通入口", status: "待接入地图数据", url: "https://www.fafu.edu.cn/" }
    ],
    careerSummary: "农林、食品、生态、景观和信息技术等专业的培养路径差异较大，应结合目标专业的培养方案、实践安排与行业信息比较。",
    officialSource: "福建农林大学官网",
    officialUrl: "https://www.fafu.edu.cn/",
    dataSource: "阳光高考信息平台",
    dataUrl: "https://gaokao.chsi.com.cn/",
    dimensions: ["课程学习", "录取信息", "设施布局", "城市环境"]
  }
];

const demoQuestions = [
  { title: "计算机专业每天都要写代码吗？", topic: "课程学习", status: "已回答", meta: "2 个认证回答 · 3 天前", answers: [{ author: "福建师范大学 · 软件工程 · 2023级", text: "大一主要学习Java、数据结构等基础课程，真正大量写项目一般从后续课程开始。" }, { author: "福州大学 · 计算机专业 · 2022级", text: "代码量会逐渐增加，建议早点培养工程实践能力。" }] },
  { title: "福州读研的生活成本大概怎么样？", topic: "城市环境", status: "等待回答", meta: "已匹配 1 位学长 · 昨天", waiting: true, answers: [] },
  { title: "这个专业毕业后真的只能考公吗？", topic: "就业去向", status: "已回答", meta: "4 个认证回答 · 6 天前", answers: [{ author: "上海财经大学 · 金融学 · 2021级", text: "不是的，商业银行、证券公司、四大会计师事务所都需要金融类专业。" }, { author: "厦门大学 · 金融工程 · 2020级", text: "就业面很广，我身边同学有去银行、券商、基金公司、互联网金融的。" }] }
];

const demoAnswers = [
  { title: "转专业需要提前准备哪些课程？", topic: "课程学习", status: "已发布", meta: "收到 2 次感谢 · 5 天前" },
  { title: "大学宿舍生活和高中想象差别大吗？", topic: "宿舍生活", status: "已发布", meta: "收到 1 次追问 · 2 周前" }
];
const stageNames = { gaokao: "高考志愿", graduate: "考研择校", career: "职业选择", adapt: "大学适应" };
const stageOrder = ["gaokao", "graduate", "career", "adapt"];
const STORE = { users: "yinlu_users", session: "yinlu_session", questions: "yinlu_questions", answers: "yinlu_answers", favorites: "yinlu_favorites", candidateStatus: "yinlu_candidate_status", compareHistory: "yinlu_compare_history", family: "yinlu_family", verification: "yinlu_verification", theme: "yinlu_theme", experienceLayout: "yinlu_experience_layout", history: "yinlu_history", decisionEvents: "yinlu_decision_events", petPosition: "yinlu_pet_position_v2", petAvatar: "yinlu_pet_avatar", petMotion: "yinlu_pet_reduce_motion", pageFeedback: "yinlu_page_feedback", onboarding: "yinlu_onboarding_complete_v1" };
const CYBER_PET_AVATARS = {
  egret: { name: "鹭小引", src: "./pet-t-egret-guide.svg?v=20260815" },
  deer: { name: "不迷鹿", src: "./pet-s-never-lost-deer.svg?v=20260815" },
  koi: { name: "小引鲤", src: "./pet-v-lucky-koi.svg?v=20260815" },
  sheep: { name: "帆帆羊", src: "./pet-w-sailing-sheep.svg?v=20260815" },
  turtle: { name: "归途龟", src: "./pet-z-homebound-turtle.svg?v=20260815" }
};
const CYBER_PET_GUIDANCE = {
  experience: { context: "院校与经验", status: "经验对照中", stage: "经验筛选 · 核实信息", reminder: "先看信息来源和发布时间，再把个人体验与客观事实分开记录。", title: "把相同问题放在一起比较", text: "同一所学校的体验可能因专业、校区和年份不同而变化。优先寻找与你情况接近的经验。" },
  questions: { context: "问答中心", status: "问题梳理中", stage: "提出问题 · 补充细节", reminder: "说明你的地区、阶段和已经了解的内容，更容易获得真正有用的回答。", title: "把问题问得更具体一点", text: "与其问“这所学校好吗”，不如说明你在意的专业、城市、住宿或就业方向。" },
  compare: { context: "我的候选", status: "候选比较中", stage: "候选比较 · 聚焦差异", reminder: "一次先比较两个最重要的维度，避免信息太多反而难以判断。", title: "先找出真正影响选择的差异", text: "相似条件可以暂时收起，把注意力放在专业实力、城市机会和录取把握等关键差异上。" },
  trust: { context: "信任与认证", status: "来源确认中", stage: "信息核验 · 查看来源", reminder: "优先查看认证经历、回答时间和信息来源，过期内容需要再次确认。", title: "先确认这条经验是否适合你", text: "真实经历很重要，但不同年份、专业和校区也会影响结论。把经验放回具体背景里判断。" },
  "school-detail": { context: "学校详情", status: "资料查看中", stage: "学校详情 · 补齐信息", reminder: "把学校优势、专业情况和录取条件放在一起看，不要只依赖单一排名。", title: "记录一个优点和一个疑问", text: "先写下吸引你的地方，再记录仍需确认的问题，之后比较候选会更清楚。" }
};
const THEME_NAMES = {
  spring: "春野同行",
  milestone: "金鱼气泡水",
  coast: "芭乐花径",
  sunroad: "晴日路标",
  ember: "薄荷曼波",
  night: "夜航星光",
  apple: "苹果爱丽丝",
  pearl: "御苑粉黛",
  buzz: "巴斯光年",
  iceglass: "碎冰琉璃",
  retro: "美式复古",
  orange: "布丁暖阳"
};
const REGION_CITIES = {
  "北京市": ["东城区", "西城区", "朝阳区", "海淀区", "丰台区", "石景山区", "通州区", "昌平区", "大兴区", "顺义区", "房山区", "门头沟区", "怀柔区", "平谷区", "密云区", "延庆区"],
  "天津市": ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "滨海新区", "宁河区", "静海区", "蓟州区"],
  "河北省": ["石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市"],
  "山西省": ["太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市"],
  "内蒙古自治区": ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "兴安盟", "锡林郭勒盟", "阿拉善盟"],
  "辽宁省": ["沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛市"],
  "吉林省": ["长春市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市", "延边朝鲜族自治州"],
  "黑龙江省": ["哈尔滨市", "齐齐哈尔市", "鸡西市", "鹤岗市", "双鸭山市", "大庆市", "伊春市", "佳木斯市", "七台河市", "牡丹江市", "黑河市", "绥化市", "大兴安岭地区"],
  "上海市": ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明区"],
  "江苏省": ["南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"],
  "浙江省": ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "丽水市"],
  "安徽省": ["合肥市", "芜湖市", "蚌埠市", "淮南市", "马鞍山市", "淮北市", "铜陵市", "安庆市", "黄山市", "滁州市", "阜阳市", "宿州市", "六安市", "亳州市", "池州市", "宣城市"],
  "福建省": ["福州市", "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市", "平潭综合实验区"],
  "江西省": ["南昌市", "景德镇市", "萍乡市", "九江市", "新余市", "鹰潭市", "赣州市", "吉安市", "宜春市", "抚州市", "上饶市"],
  "山东省": ["济南市", "青岛市", "淄博市", "枣庄市", "东营市", "烟台市", "潍坊市", "济宁市", "泰安市", "威海市", "日照市", "临沂市", "德州市", "聊城市", "滨州市", "菏泽市"],
  "河南省": ["郑州市", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市", "濮阳市", "许昌市", "漯河市", "三门峡市", "南阳市", "商丘市", "信阳市", "周口市", "驻马店市", "济源市"],
  "湖北省": ["武汉市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市", "恩施土家族苗族自治州", "仙桃市", "潜江市", "天门市", "神农架林区"],
  "湖南省": ["长沙市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市", "永州市", "怀化市", "娄底市", "湘西土家族苗族自治州"],
  "广东省": ["广州市", "韶关市", "深圳市", "珠海市", "汕头市", "佛山市", "江门市", "湛江市", "茂名市", "肇庆市", "惠州市", "梅州市", "汕尾市", "河源市", "阳江市", "清远市", "东莞市", "中山市", "潮州市", "揭阳市", "云浮市"],
  "广西壮族自治区": ["南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市", "贺州市", "河池市", "来宾市", "崇左市"],
  "海南省": ["海口市", "三亚市", "三沙市", "儋州市", "五指山市", "琼海市", "文昌市", "万宁市", "东方市", "定安县", "屯昌县", "澄迈县", "临高县", "白沙黎族自治县", "昌江黎族自治县", "乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县"],
  "重庆市": ["渝中区", "江北区", "南岸区", "九龙坡区", "沙坪坝区", "大渡口区", "北碚区", "渝北区", "巴南区", "万州区", "涪陵区", "黔江区", "长寿区", "江津区", "合川区", "永川区", "南川区", "綦江区", "大足区", "璧山区", "铜梁区", "潼南区", "荣昌区", "开州区", "梁平区", "武隆区", "城口县", "丰都县", "垫江县", "忠县", "云阳县", "奉节县", "巫山县", "巫溪县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县"],
  "四川省": ["成都市", "自贡市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "内江市", "乐山市", "南充市", "眉山市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市", "资阳市", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"],
  "贵州省": ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节市", "铜仁市", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "黔南布依族苗族自治州"],
  "云南省": ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市", "临沧市", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州"],
  "西藏自治区": ["拉萨市", "日喀则市", "昌都市", "林芝市", "山南市", "那曲市", "阿里地区"],
  "陕西省": ["西安市", "铜川市", "宝鸡市", "咸阳市", "渭南市", "延安市", "汉中市", "榆林市", "安康市", "商洛市"],
  "甘肃省": ["兰州市", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "张掖市", "平凉市", "酒泉市", "庆阳市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州"],
  "青海省": ["西宁市", "海东市", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"],
  "宁夏回族自治区": ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"],
  "新疆维吾尔自治区": ["乌鲁木齐市", "克拉玛依市", "吐鲁番市", "哈密市", "昌吉回族自治州", "博尔塔拉蒙古自治州", "巴音郭楞蒙古自治州", "阿克苏地区", "克孜勒苏柯尔克孜自治州", "喀什地区", "和田地区", "伊犁哈萨克自治州", "塔城地区", "阿勒泰地区", "石河子市", "阿拉尔市", "图木舒克市", "五家渠市", "北屯市", "铁门关市", "双河市", "可克达拉市", "昆玉市", "胡杨河市", "新星市"],
  "香港特别行政区": ["香港岛", "九龙", "新界"],
  "澳门特别行政区": ["澳门半岛", "氹仔", "路环", "路氹城"],
  "台湾省": ["台北市", "新北市", "桃园市", "台中市", "台南市", "高雄市", "基隆市", "新竹市", "嘉义市", "新竹县", "苗栗县", "彰化县", "南投县", "云林县", "嘉义县", "屏东县", "宜兰县", "花莲县", "台东县", "澎湖县", "金门县", "连江县"],
  "海外": ["亚洲其他地区", "欧洲", "北美洲", "南美洲", "大洋洲", "非洲", "其他海外地区"]
};
const REGION_INITIAL_BY_PROVINCE = {
  "北京市": "B", "天津市": "T", "河北省": "H", "山西省": "S", "内蒙古自治区": "N",
  "辽宁省": "L", "吉林省": "J", "黑龙江省": "H", "上海市": "S", "江苏省": "J",
  "浙江省": "Z", "安徽省": "A", "福建省": "F", "江西省": "J", "山东省": "S",
  "河南省": "H", "湖北省": "H", "湖南省": "H", "广东省": "G", "广西壮族自治区": "G",
  "海南省": "H", "重庆市": "C", "四川省": "S", "贵州省": "G", "云南省": "Y",
  "西藏自治区": "X", "陕西省": "S", "甘肃省": "G", "青海省": "Q", "宁夏回族自治区": "N",
  "新疆维吾尔自治区": "X", "香港特别行政区": "X", "澳门特别行政区": "A", "台湾省": "T", "海外": "H"
};
const REGION_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const POPULAR_REGIONS = [
  { label: "北京", province: "北京市", city: "" }, { label: "上海", province: "上海市", city: "" },
  { label: "广州", province: "广东省", city: "广州市" }, { label: "深圳", province: "广东省", city: "深圳市" },
  { label: "杭州", province: "浙江省", city: "杭州市" }, { label: "武汉", province: "湖北省", city: "武汉市" },
  { label: "厦门", province: "福建省", city: "厦门市" }, { label: "西安", province: "陕西省", city: "西安市" },
  { label: "成都", province: "四川省", city: "成都市" }, { label: "重庆", province: "重庆市", city: "" }
];
const MUNICIPALITIES = new Set(["北京市", "上海市", "天津市", "重庆市"]);
const MAJOR_CATEGORIES = ["工学", "理学", "文学", "教育学", "经济学", "管理学", "农学", "医学", "法学", "艺术学"];
const MAJOR_CATEGORY_BY_NAME = {
  "计算机科学与技术": "工学", "机械设计制造及其自动化": "工学", "电气工程及其自动化": "工学",
  "化学工程与工艺": "工学", "食品科学与工程": "工学", "风景园林": "工学", "航海技术": "工学",
  "数学与应用数学": "理学", "地理科学": "理学", "汉语言文学": "文学", "新闻传播学": "文学",
  "教育学": "教育学", "经济学": "经济学", "农学": "农学", "植物保护": "农学", "临床医学": "医学"
};
let currentStage = "gaokao";
let currentSchoolSearch = "";
let currentMajorSearch = "";
let currentInstitutionSchoolSearch = "";
let currentInstitutionMajorSearch = "";
let currentInstitutionRegion = "all";
let currentExperienceRegion = "all";
let currentInstitutionRegionSearch = "";
let currentExperienceRegionSearch = "";
let currentInstitutionRegionLetter = "";
let currentExperienceRegionLetter = "";
let currentInstitutionRegionOpen = false;
let currentExperienceRegionOpen = false;
let currentInstitutionMajorCategory = "";
let currentExperienceMajorCategory = "";
let currentInstitutionMajorOpen = false;
let currentExperienceMajorOpen = false;
let currentExperienceContentTab = "institution";
const currentDimensionFilters = new Set();
let currentSourceFilter = "all";
let currentTimeFilter = "all";
let currentExperienceSort = "relevance";
let currentSearch = "";
let currentSchoolDetail = "fjnu";
let currentCandidateTab = "school";
let currentSchoolReturnView = "experience";
let schoolCompareMode = false;
const selectedSchoolCandidateIds = new Set();
let schoolMajorSelectionMode = false;
let schoolMajorCompareMode = false;
let schoolMajorTargetSchoolId = "";
const selectedSchoolMajorNames = new Set();
let currentSchoolMajorResults = [];
let majorCompareMode = false;
const selectedMajorCandidateKeys = new Set();
let selectedMajorName = "";
let candidateMajorSearchQuery = "";
let activeHistoryComparison = null;
let currentSchoolCandidateResults = [];
let currentMajorCandidateResults = [];
let decisionCalendarView = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let selectedDecisionDate = "";

const EXPERIENCE_DIMENSIONS_BY_SOURCE = {
  all: ["课程学习", "宿舍生活", "设施布局", "社团活动", "校园氛围", "城市环境", "就业去向"],
  student: ["课程学习", "宿舍生活", "设施布局", "社团活动", "校园氛围", "城市环境", "就业去向"],
  official: ["课程学习", "设施布局", "城市环境"],
  expert: ["课程学习", "校园氛围", "城市环境", "就业去向"]
};
let cyberPetSuppressClick = false;
let cyberPetExpressionTimer = 0;
let cyberPetLongPressTimer = 0;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const read = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } };
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

// ✅ 密码安全 - SHA-256哈希（从修正版集成）
async function createPasswordRecord(password) {
  const salt = Array.from({ length: 16 }, () => Math.random().toString(36).charAt(2)).join('');
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return { passwordSalt: salt, passwordHash: hashHex };
}

async function passwordMatches(user, password) {
  if (!user.passwordSalt || !user.passwordHash) return false;
  const encoder = new TextEncoder();
  const data = encoder.encode(user.passwordSalt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex === user.passwordHash;
}

const uid = (prefix = "id") => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const majorCandidateId = (schoolId, major) => `major-${schoolId}-${encodeURIComponent(major)}`;
const majorDecisionKey = (school, major) => encodeURIComponent(`${school}::${major}`);
const candidateStatuses = ["待了解", "正在比较", "已倾向", "暂不考虑"];
const currentUser = () => { const id = localStorage.getItem(STORE.session); return read(STORE.users, []).find((user) => user.id === id) || null; };
const userFavorites = () => { const user = currentUser(); return user ? read(STORE.favorites, {})[user.id] || [] : []; };

function saveHistory(id) {
  const user = currentUser();
  if (!user) return;
  const all = read(STORE.history, {});
  all[user.id] = [id, ...(all[user.id] || []).filter((itemId) => itemId !== id)].slice(0, 5);
  write(STORE.history, all);
}

const initials = (name = "访客") => name.trim().slice(0, 1) || "访";
const AVATAR_MAX_FILE_SIZE = 5 * 1024 * 1024;

function userCreatedAt(user) {
  const storedDate = user?.createdAt ? new Date(user.createdAt) : null;
  if (storedDate && !Number.isNaN(storedDate.getTime())) return storedDate;
  const idTimestamp = Number(String(user?.id || "").split("_")[1]);
  const inferredDate = new Date(idTimestamp);
  return Number.isNaN(inferredDate.getTime()) ? new Date() : inferredDate;
}

function formatProfileDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function todayDateValue() {
  return formatProfileDate(new Date());
}

function ageFromBirthDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;
  const [year, month, day] = value.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  if (Number.isNaN(birthDate.getTime()) || birthDate > today || birthDate.getFullYear() !== year || birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) return null;
  let age = today.getFullYear() - year;
  if (today.getMonth() < month - 1 || (today.getMonth() === month - 1 && today.getDate() < day)) age -= 1;
  return age >= 0 && age <= 130 ? age : null;
}

function userRegionParts(user) {
  const storedRegion = String(user?.region || "").trim();
  const province = user?.regionProvince || Object.keys(REGION_CITIES).find((item) => storedRegion === item || storedRegion.startsWith(`${item} `)) || "";
  const city = user?.regionCity || (province ? storedRegion.slice(province.length).trim() : "");
  return { province, city };
}

function setRegionOptions(province = "", city = "") {
  const provinceSelect = $("#profileProvinceInput");
  const citySelect = $("#profileCityInput");
  if (!provinceSelect || !citySelect) return;
  provinceSelect.replaceChildren(new Option("请选择省份 / 地区", ""));
  Object.keys(REGION_CITIES).forEach((item) => provinceSelect.add(new Option(item, item)));
  provinceSelect.value = Object.hasOwn(REGION_CITIES, province) ? province : "";
  citySelect.replaceChildren(new Option(provinceSelect.value ? "请选择城市 / 地区" : "请先选择省份 / 地区", ""));
  const cities = REGION_CITIES[provinceSelect.value] || [];
  cities.forEach((item) => citySelect.add(new Option(item, item)));
  if (city && !cities.includes(city)) citySelect.add(new Option(city, city));
  citySelect.value = city;
  citySelect.disabled = !provinceSelect.value;
}

function updateProfileAge() {
  const birthDate = $("#profileBirthDateInput")?.value || "";
  const age = ageFromBirthDate(birthDate);
  const ageInput = $("#profileAgeInput");
  if (ageInput) ageInput.value = age === null ? "未设置" : `${age} 岁`;
  return age;
}

function setUserAvatar(element, user) {
  if (!element) return;
  const avatar = typeof user?.avatarDataUrl === "string" && user.avatarDataUrl.startsWith("data:image/") ? user.avatarDataUrl : "";
  element.classList.toggle("has-image", Boolean(avatar));
  element.style.backgroundImage = avatar ? `url(${avatar})` : "";
  element.style.backgroundPosition = avatar ? "center" : "";
  element.style.backgroundSize = avatar ? "cover" : "";
  element.textContent = avatar ? "" : initials(user?.nickname);
}

function updateCurrentUser(updates) {
  const id = localStorage.getItem(STORE.session);
  if (!id) return null;
  let updatedUser = null;
  const users = read(STORE.users, []).map((user) => {
    if (user.id !== id) return user;
    updatedUser = { ...user, ...updates, updatedAt: new Date().toISOString() };
    return updatedUser;
  });
  if (updatedUser) write(STORE.users, users);
  return updatedUser;
}

function avatarDataUrl(file) {
  return new Promise((resolve, reject) => {
    const source = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const cropSize = Math.min(image.naturalWidth, image.naturalHeight);
      const sourceX = Math.max(0, (image.naturalWidth - cropSize) / 2);
      const sourceY = Math.max(0, (image.naturalHeight - cropSize) / 2);
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, sourceX, sourceY, cropSize, cropSize, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(source);
      resolve(canvas.toDataURL("image/webp", .86));
    };
    image.onerror = () => {
      URL.revokeObjectURL(source);
      reject(new Error("无法读取图片"));
    };
    image.src = source;
  });
}

function hydrateIcons() { if (window.lucide) window.lucide.createIcons(); }

function applyExperienceLayout(layout, { persist = true, notify = false } = {}) {
  const nextLayout = layout === "vertical" ? "vertical" : "horizontal";
  const view = $("#view-experience");
  if (!view) return;
  view.classList.toggle("experience-layout-horizontal", nextLayout === "horizontal");
  view.classList.toggle("experience-layout-vertical", nextLayout === "vertical");
  $$('[data-experience-layout]').forEach((button) => {
    const active = button.dataset.experienceLayout === nextLayout;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (persist) localStorage.setItem(STORE.experienceLayout, nextLayout);
  if (notify) showToast(`已切换为${nextLayout === "vertical" ? "竖版" : "横版"}布局`);
}

function switchExperienceContentTab(tab, { focusSearch = false } = {}) {
  const nextTab = tab === "experience" ? "experience" : "institution";
  currentExperienceContentTab = nextTab;
  currentInstitutionRegionOpen = false;
  currentExperienceRegionOpen = false;
  currentInstitutionMajorOpen = false;
  currentExperienceMajorOpen = false;
  $$('[data-experience-content-tab]').forEach((button) => {
    const active = button.dataset.experienceContentTab === nextTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  $$('[data-experience-content-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.experienceContentPanel !== nextTab;
  });
  if (nextTab === "institution") {
    const advancedFilters = $("#advancedExperienceFilters");
    if (advancedFilters) advancedFilters.hidden = true;
    $("#toggleAdvancedFilters")?.classList.remove("open");
  }
  renderExperiences();
  if (focusSearch) {
    const input = nextTab === "institution" ? $("#institutionSchoolSearch") : $("#experienceSchoolSearch");
    input?.focus();
  }
}

function updateThemeControls(theme) {
  const label = THEME_NAMES[theme] || THEME_NAMES.apple;
  const button = $("#themeButton");
  if (button) button.setAttribute("aria-label", `切换主题，当前为${label}`);
  $$('[data-theme-option]').forEach((option) => {
    const active = option.dataset.themeOption === theme;
    option.classList.toggle("active", active);
    option.setAttribute("aria-checked", String(active));
  });
}

function applyTheme(theme, { persist = false, notify = false } = {}) {
  const nextTheme = Object.hasOwn(THEME_NAMES, theme) ? theme : "apple";
  document.documentElement.dataset.theme = nextTheme;
  if (persist) localStorage.setItem(STORE.theme, nextTheme);
  updateThemeControls(nextTheme);
  if (notify) showToast(`已切换为${THEME_NAMES[nextTheme]}主题`);
}

function setThemeMenu(open) {
  const button = $("#themeButton");
  const menu = $("#themeMenu");
  if (!button || !menu) return;
  menu.hidden = !open;
  button.setAttribute("aria-expanded", String(open));
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  $("span", toast).textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function openModal(id) { const modal = $(`#${id}`); if (!modal) return; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); window.setTimeout(() => $("textarea, input, select, button", modal)?.focus?.(), 300); }
function closeModal(id) {
  const modal = $(`#${id}`);
  if (!modal) return;
  const wasOpen = modal.classList.contains("open");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  if (id === "accountModal" && wasOpen) {
    if (!currentUser()) localStorage.setItem("yinlu_guest_seen", "1");
    scheduleOnboarding(420);
  }
}

function parseDecisionDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!match) return null;
  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText) - 1;
  const day = Number(dayText);
  const date = new Date(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day ? date : null;
}

function decisionDateValue(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function daysUntilDecision(value) {
  const date = parseDecisionDate(value);
  if (!date) return Number.POSITIVE_INFINITY;
  const today = new Date();
  const targetUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((targetUtc - todayUtc) / 86400000);
}

function formatDecisionDate(value) {
  const date = parseDecisionDate(value);
  if (!date) return "日期未设置";
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return `${date.getMonth() + 1}月${date.getDate()}日 · ${weekdays[date.getDay()]}`;
}

function decisionEvents() {
  return read(STORE.decisionEvents, [])
    .filter((item) => item && item.id && String(item.title || "").trim() && parseDecisionDate(item.date))
    .sort((a, b) => a.date.localeCompare(b.date) || String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
}

function decisionDistanceText(distance) {
  if (distance === 0) return "就是今天";
  if (distance > 0) return `还有 ${distance} 天`;
  return `已过 ${Math.abs(distance)} 天`;
}

function renderDecisionCountdown() {
  const container = $("#decisionCountdown");
  const trigger = $("#decisionCalendarButton");
  const label = $("#decisionCountdownLabel");
  const value = $("#decisionCountdownValue");
  if (!container || !trigger || !label || !value) return;
  const nextEvent = decisionEvents().find((item) => daysUntilDecision(item.date) >= 0);
  container.classList.toggle("empty", !nextEvent);
  if (!nextEvent) {
    label.textContent = "设置决策时间";
    value.textContent = "添加时间点";
    trigger.setAttribute("aria-label", "打开决策日历设置时间点");
    return;
  }
  const distance = daysUntilDecision(nextEvent.date);
  label.textContent = `距${nextEvent.title}`;
  value.textContent = decisionDistanceText(distance);
  trigger.setAttribute("aria-label", `${label.textContent}${value.textContent}，打开决策日历`);
}

function renderDecisionEventList() {
  const list = $("#decisionEventList");
  const count = $("#decisionEventCount");
  if (!list || !count) return;
  const events = decisionEvents();
  count.textContent = `${events.length} 项`;
  list.innerHTML = events.length ? events.map((item) => {
    const distance = daysUntilDecision(item.date);
    return `<article class="decision-event-item ${distance < 0 ? "past" : ""}"><span class="decision-event-date"><strong>${escapeHtml(String(parseDecisionDate(item.date).getDate()).padStart(2, "0"))}</strong><small>${escapeHtml(`${parseDecisionDate(item.date).getMonth() + 1}月`)}</small></span><div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(formatDecisionDate(item.date))}</small></div><span class="decision-event-distance">${escapeHtml(decisionDistanceText(distance))}</span><button class="icon-button" type="button" data-delete-decision-event="${escapeHtml(item.id)}" aria-label="删除${escapeHtml(item.title)}"><i data-lucide="trash-2"></i></button></article>`;
  }).join("") : `<div class="decision-event-empty"><i data-lucide="calendar-plus"></i><strong>还没有时间点</strong><span>选择日期后添加第一项</span></div>`;
  hydrateIcons();
}

function renderDecisionCalendar() {
  const monthTitle = $("#decisionCalendarMonth");
  const grid = $("#decisionCalendarGrid");
  const dateInput = $("#decisionEventDate");
  if (!monthTitle || !grid || !dateInput) return;
  const year = decisionCalendarView.getFullYear();
  const month = decisionCalendarView.getMonth();
  monthTitle.textContent = `${year}年${month + 1}月`;
  const firstDay = new Date(year, month, 1);
  const gridStart = new Date(year, month, 1 - firstDay.getDay());
  const today = decisionDateValue(new Date());
  const eventDates = new Set(decisionEvents().map((item) => item.date));
  grid.replaceChildren();
  for (let index = 0; index < 42; index += 1) {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
    const value = decisionDateValue(date);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "decision-calendar-day";
    button.textContent = date.getDate();
    button.dataset.calendarDate = value;
    button.setAttribute("aria-label", `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`);
    button.classList.toggle("other-month", date.getMonth() !== month);
    button.classList.toggle("today", value === today);
    button.classList.toggle("selected", value === selectedDecisionDate);
    button.classList.toggle("has-event", eventDates.has(value));
    grid.appendChild(button);
  }
  dateInput.min = today;
  dateInput.value = selectedDecisionDate;
  renderDecisionEventList();
}

function selectDecisionDate(value) {
  const date = parseDecisionDate(value);
  if (!date) return;
  selectedDecisionDate = value;
  decisionCalendarView = new Date(date.getFullYear(), date.getMonth(), 1);
  renderDecisionCalendar();
}

function shiftDecisionCalendar(months) {
  decisionCalendarView = new Date(decisionCalendarView.getFullYear(), decisionCalendarView.getMonth() + months, 1);
  renderDecisionCalendar();
}

function openDecisionCalendar() {
  const nextEvent = decisionEvents().find((item) => daysUntilDecision(item.date) >= 0);
  const initialDate = nextEvent?.date || decisionDateValue(new Date());
  selectDecisionDate(initialDate);
  openModal("decisionCalendarModal");
}

function addDecisionEvent(event) {
  event.preventDefault();
  const title = $("#decisionEventName")?.value.trim() || "";
  const date = $("#decisionEventDate")?.value || "";
  if (!title) { showToast("请填写时间点名称"); return; }
  if (!parseDecisionDate(date) || daysUntilDecision(date) < 0) { showToast("请选择今天或之后的日期"); return; }
  const events = decisionEvents();
  if (events.some((item) => item.title === title && item.date === date)) { showToast("这个时间点已经添加过了"); return; }
  events.push({ id: uid("decision"), title, date, createdAt: new Date().toISOString() });
  write(STORE.decisionEvents, events);
  $("#decisionEventName").value = "";
  selectedDecisionDate = date;
  renderDecisionCalendar();
  renderDecisionCountdown();
  showToast(`已添加${title}`);
}

function deleteDecisionEvent(id) {
  const events = decisionEvents();
  const target = events.find((item) => item.id === id);
  if (!target) return;
  write(STORE.decisionEvents, events.filter((item) => item.id !== id));
  renderDecisionCalendar();
  renderDecisionCountdown();
  showToast(`已删除${target.title}`);
}

function cyberPetContextLabel() {
  const activeView = $(".view.active")?.id.replace("view-", "") || "home";
  if (activeView === "school-detail") return institutions.find((item) => item.id === currentSchoolDetail)?.school || "学校详情";
  return ({ home: "首页", experience: "院校与经验", questions: "问答中心", compare: "我的候选", trust: "信任与认证" })[activeView] || "当前页面";
}

function cyberPetGuidance() {
  const activeView = $(".view.active")?.id.replace("view-", "") || "home";
  if (activeView === "home") {
    const guidance = {
      gaokao: { context: "高考志愿", status: "信息收集中", stage: "志愿填报 · 初选候选", reminder: "先核对分数位次和地区范围，再收集学校与专业。", title: "先确定你最在意什么", text: "城市、专业实力和录取把握很难同时最大化。先选出两个最重要的维度。" },
      graduate: { context: "考研择校", status: "院校筛选中", stage: "考研择校 · 收集信息", reminder: "先确认专业方向和考试科目，再比较院校难度与培养特点。", title: "先划定适合自己的选择范围", text: "把专业方向、地区偏好和备考基础放在一起考虑，再逐步缩小候选院校。" },
      career: { context: "职业选择", status: "方向比较中", stage: "职业选择 · 梳理方向", reminder: "先记录感兴趣的工作内容，再核对岗位要求和真实从业体验。", title: "从喜欢做什么开始判断", text: "不要只看职位名称。比较日常工作、成长空间和生活方式，判断哪种方向更适合你。" },
      adapt: { context: "大学适应", status: "问题梳理中", stage: "大学适应 · 寻找方法", reminder: "把最困扰你的具体场景写下来，再寻找有相似经历的同学。", title: "先处理最影响当下的一件事", text: "课程、社交和生活节奏不必同时解决。先选一个最需要改善的问题，从小行动开始。" }
    };
    return guidance[currentStage] || guidance.gaokao;
  }
  const guidance = { ...(CYBER_PET_GUIDANCE[activeView] || CYBER_PET_GUIDANCE.experience) };
  if (activeView === "school-detail") guidance.context = institutions.find((item) => item.id === currentSchoolDetail)?.school || guidance.context;
  return guidance;
}

function renderCyberPetContext() {
  const guidance = cyberPetGuidance();
  const context = $("#cyberPetContext");
  const status = $("#cyberPetContextStatus");
  const stage = $("#cyberPetStageName");
  const reminder = $("#cyberPetStageReminder");
  const title = $("#cyberPetSuggestionTitle");
  const text = $("#cyberPetSuggestionText");
  if (context) context.textContent = guidance.context;
  if (status) status.textContent = guidance.status;
  if (stage) stage.textContent = guidance.stage;
  if (reminder) reminder.textContent = guidance.reminder;
  if (title) title.textContent = guidance.title;
  if (text) text.textContent = guidance.text;
}

function setCyberPetAvatar(id, { persist = true, notify = false } = {}) {
  const avatarId = CYBER_PET_AVATARS[id] ? id : "egret";
  const avatar = CYBER_PET_AVATARS[avatarId];
  $$('[data-pet-avatar-image]').forEach((image) => { image.src = avatar.src; });
  const pet = $("#cyberPet");
  if (pet) {
    pet.dataset.petAvatar = avatarId;
    pet.classList.remove("avatar-changing");
    window.requestAnimationFrame(() => pet.classList.add("avatar-changing"));
    window.setTimeout(() => pet.classList.remove("avatar-changing"), 420);
  }
  const name = $("#cyberPetAvatarName");
  if (name) name.textContent = avatar.name;
  const toggle = $("#cyberPetToggle");
  if (toggle) toggle.setAttribute("aria-label", "打开" + avatar.name + "助手");
  $$("#cyberPetAvatarMenu [data-pet-avatar]").forEach((button) => {
    const selected = button.dataset.petAvatar === avatarId;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-checked", String(selected));
  });
  if (persist) write(STORE.petAvatar, avatarId);
  if (notify) showToast("已切换为" + avatar.name);
}

function setCyberPetAvatarMenu(open, point = null, { focus = false } = {}) {
  const menu = $("#cyberPetAvatarMenu");
  const pet = $("#cyberPet");
  if (!menu || !pet) return;
  if (!open) {
    menu.hidden = true;
    return;
  }
  menu.hidden = false;
  menu.style.visibility = "hidden";
  const petRect = pet.getBoundingClientRect();
  const width = menu.offsetWidth;
  const height = menu.offsetHeight;
  let left = Number(point?.x ?? petRect.left);
  let top = Number(point?.y ?? (petRect.top - height - 10));
  if (top < 10) top = petRect.bottom + 10;
  left = Math.max(10, Math.min(left, window.innerWidth - width - 10));
  top = Math.max(10, Math.min(top, window.innerHeight - height - 10));
  menu.style.left = left + "px";
  menu.style.top = top + "px";
  menu.style.visibility = "";
  if (focus) window.requestAnimationFrame(() => menu.querySelector(".active")?.focus());
}

function setCyberPetTab(tab, { focus = false } = {}) {
  const next = ["tools", "chat", "plan"].includes(tab) ? tab : "tools";
  $$("[data-pet-tab]").forEach((button) => {
    const active = button.dataset.petTab === next;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
    if (active && focus) button.focus();
  });
  $$("[data-pet-tab-panel]").forEach((panel) => {
    const active = panel.dataset.petTabPanel === next;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
  if (next === "chat") {
    const messages = $("#cyberPetMessages");
    if (messages) messages.scrollTop = messages.scrollHeight;
  }
}

function setCyberPetMotionReduced(reduced, { persist = true } = {}) {
  const next = Boolean(reduced);
  $("#cyberPet")?.classList.toggle("motion-reduced", next);
  const checkbox = $("#cyberPetReduceMotion");
  if (checkbox) checkbox.checked = next;
  if (persist) write(STORE.petMotion, next);
  scheduleCyberPetExpression();
}

function scheduleCyberPetExpression() {
  window.clearTimeout(cyberPetExpressionTimer);
  const pet = $("#cyberPet");
  if (!pet || pet.classList.contains("motion-reduced")) return;
  cyberPetExpressionTimer = window.setTimeout(() => {
    if (!document.hidden && !pet.classList.contains("dragging")) {
      pet.classList.add("pet-expressing");
      window.setTimeout(() => pet.classList.remove("pet-expressing"), 950);
    }
    scheduleCyberPetExpression();
  }, 6000 + Math.random() * 6000);
}


function appendCyberPetMessage(role, text) {
  const messages = $("#cyberPetMessages");
  if (!messages) return;
  const message = document.createElement("div");
  message.className = `cyber-pet-message ${role === "user" ? "user" : "assistant"}`;
  message.textContent = text;
  messages.appendChild(message);
  while (messages.children.length > 8) messages.firstElementChild?.remove();
  messages.scrollTop = messages.scrollHeight;
}

function positionCyberPetPanel() {
  const pet = $("#cyberPet");
  const panel = $("#cyberPetPanel");
  if (!pet || !panel || panel.hidden) return;
  const petRect = pet.getBoundingClientRect();
  const panelWidth = panel.offsetWidth;
  const panelHeight = panel.offsetHeight;
  let left = petRect.left < window.innerWidth / 2 ? petRect.right + 14 : petRect.left - panelWidth - 14;
  let top = petRect.top - panelHeight - 12;
  if (top < 12) top = petRect.bottom + 12;
  left = Math.max(12, Math.min(left, window.innerWidth - panelWidth - 12));
  top = Math.max(12, Math.min(top, window.innerHeight - panelHeight - 12));
  panel.style.left = `${left}px`;
  panel.style.top = `${top}px`;
  panel.style.right = "auto";
  panel.style.bottom = "auto";
}

function setCyberPetOpen(open) {
  const panel = $("#cyberPetPanel");
  const toggle = $("#cyberPetToggle");
  const pet = $("#cyberPet");
  if (!panel || !toggle) return;
  panel.hidden = !open;
  pet?.classList.toggle("panel-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "收起小引助手" : "打开" + (CYBER_PET_AVATARS[pet?.dataset.petAvatar]?.name || "鹭小引") + "助手");
  if (!open) {
    setCyberPetAvatarMenu(false);
    const report = $("#cyberPetReport");
    if (report) report.hidden = true;
  }
  if (open) setCyberPetTab("tools");
  renderCyberPetContext();
  if (open) window.requestAnimationFrame(positionCyberPetPanel);
}

function clampCyberPetPosition(x, y) {
  const pet = $("#cyberPet");
  const width = pet?.offsetWidth || 64;
  const height = pet?.offsetHeight || 64;
  return {
    x: Math.max(8, Math.min(x, window.innerWidth - width - 8)),
    y: Math.max(8, Math.min(y, window.innerHeight - height - 8))
  };
}

function setCyberPetPosition(x, y, persist = false) {
  const pet = $("#cyberPet");
  if (!pet) return;
  const next = clampCyberPetPosition(x, y);
  pet.style.left = `${next.x}px`;
  pet.style.top = `${next.y}px`;
  pet.style.right = "auto";
  pet.style.bottom = "auto";
  if (persist) write(STORE.petPosition, next);
  positionCyberPetPanel();
}

function restoreCyberPetPosition() {
  const pet = $("#cyberPet");
  const saved = read(STORE.petPosition, null);
  const mobile = window.matchMedia("(max-width: 540px)").matches;
  const fallback = {
    x: mobile ? 14 : 24,
    y: window.innerHeight - (pet?.offsetHeight || 92) - (mobile ? 42 : 44)
  };
  setCyberPetPosition(Number(saved?.x ?? fallback.x), Number(saved?.y ?? fallback.y));
}

function initializeCyberPetDrag() {
  const toggle = $("#cyberPetToggle");
  const header = $(".cyber-pet-header");
  const pet = $("#cyberPet");
  if (!toggle || !header || !pet) return;
  let drag = null;

  const startDrag = (event) => {
    if (event.button !== 0) return;
    if (event.currentTarget === header && event.target.closest("button, input, textarea, select, a")) return;
    const rect = pet.getBoundingClientRect();
    drag = { handle: event.currentTarget, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, left: rect.left, top: rect.top, moved: false };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    pet.classList.add("dragging");
  };

  const moveDrag = (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(deltaX, deltaY) < 5) return;
    drag.moved = true;
    event.preventDefault();
    setCyberPetPosition(drag.left + deltaX, drag.top + deltaY);
  };

  const finishDrag = (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    if (drag.moved) {
      if (drag.handle === toggle) {
        cyberPetSuppressClick = true;
        window.setTimeout(() => { cyberPetSuppressClick = false; }, 250);
      }
      const rect = pet.getBoundingClientRect();
      write(STORE.petPosition, { x: Math.round(rect.left), y: Math.round(rect.top) });
    }
    drag.handle.releasePointerCapture?.(event.pointerId);
    drag = null;
    pet.classList.remove("dragging");
  };

  [toggle, header].forEach((handle) => {
    handle.addEventListener("pointerdown", startDrag);
    handle.addEventListener("pointermove", moveDrag);
    handle.addEventListener("pointerup", finishDrag);
    handle.addEventListener("pointercancel", finishDrag);
  });
}

function initializeCyberPetAvatarInteractions() {
  const toggle = $("#cyberPetToggle");
  const menu = $("#cyberPetAvatarMenu");
  if (!toggle || !menu) return;
  const openFromPointer = (event) => {
    event.preventDefault();
    setCyberPetOpen(false);
    setCyberPetAvatarMenu(true, { x: event.clientX, y: event.clientY });
  };
  toggle.addEventListener("contextmenu", openFromPointer);
  toggle.addEventListener("keydown", (event) => {
    if (event.key !== "ContextMenu" && !(event.shiftKey && event.key === "F10")) return;
    event.preventDefault();
    setCyberPetOpen(false);
    setCyberPetAvatarMenu(true, null, { focus: true });
  });

  let longPressPoint = null;
  toggle.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") return;
    longPressPoint = { x: event.clientX, y: event.clientY };
    window.clearTimeout(cyberPetLongPressTimer);
    cyberPetLongPressTimer = window.setTimeout(() => {
      cyberPetSuppressClick = true;
      setCyberPetOpen(false);
      setCyberPetAvatarMenu(true, longPressPoint);
    }, 620);
  });
  toggle.addEventListener("pointermove", (event) => {
    if (!longPressPoint || Math.hypot(event.clientX - longPressPoint.x, event.clientY - longPressPoint.y) > 8) {
      window.clearTimeout(cyberPetLongPressTimer);
      longPressPoint = null;
    }
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((type) => toggle.addEventListener(type, () => {
    window.clearTimeout(cyberPetLongPressTimer);
    longPressPoint = null;
  }));

  menu.addEventListener("keydown", (event) => {
    const items = $$('[role="menuitemradio"]', menu);
    const current = items.indexOf(document.activeElement);
    if (event.key === "Escape") {
      event.preventDefault();
      setCyberPetAvatarMenu(false);
      toggle.focus();
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : (current + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
    items[next]?.focus();
  });
  $$("[data-pet-tab]").forEach((button) => {
    button.addEventListener("click", () => setCyberPetTab(button.dataset.petTab));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const tabs = $$("[data-pet-tab]");
      const current = tabs.indexOf(button);
      const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      setCyberPetTab(tabs[next].dataset.petTab, { focus: true });
    });
  });
}

function handleCyberPetAction(action) {
  const report = $("#cyberPetReport");
  const input = $("#cyberPetInput");
  if (action === "ask-current") {
    setCyberPetTab("chat");
    appendCyberPetMessage("assistant", `已带入${cyberPetContextLabel()}。你想先问哪一部分？`);
    input?.focus();
    return;
  }
  if (action === "anonymous") {
    const questionInput = $("#questionInput");
    if (questionInput && input?.value.trim()) questionInput.value = input.value.trim();
    openModal("questionModal");
    window.setTimeout(() => questionInput?.focus(), 320);
    return;
  }
  if (action === "compare") { switchView("compare"); return; }
  if (action === "calendar") { openDecisionCalendar(); return; }
  if (action === "report") {
    if (report) report.hidden = false;
    $("#cyberPetReportInput")?.focus();
    positionCyberPetPanel();
    return;
  }
  if (action === "cancel-report") {
    if (report) report.hidden = true;
    positionCyberPetPanel();
  }
}

function submitCyberPetQuestion(event) {
  event.preventDefault();
  const input = $("#cyberPetInput");
  const question = input?.value.trim() || "";
  if (!question) return;
  setCyberPetTab("chat");
  appendCyberPetMessage("user", question);
  input.value = "";
  appendCyberPetMessage("assistant", "这个问题已准备好。可以继续补充，或通过匿名提问发布到问答中心。");
}

function submitCyberPetReport(event) {
  event.preventDefault();
  const input = $("#cyberPetReportInput");
  const description = input?.value.trim() || "";
  if (!description) { showToast("请描述遇到的页面问题"); return; }
  const feedback = read(STORE.pageFeedback, []);
  feedback.unshift({ id: uid("feedback"), page: cyberPetContextLabel(), description, createdAt: new Date().toISOString() });
  write(STORE.pageFeedback, feedback.slice(0, 20));
  event.target.reset();
  event.target.hidden = true;
  setCyberPetTab("chat");
  appendCyberPetMessage("assistant", "已记录当前页面的问题。");
  positionCyberPetPanel();
  showToast("页面问题已记录在本机");
}

function switchView(name) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === `view-${name}`));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  const active = $(`.nav-item[data-view="${name}"]`);
  $("#breadcrumbTitle").textContent = name === "school-detail" ? `${institutions.find((item) => item.id === currentSchoolDetail)?.school || "学校详情"}` : active?.querySelector("span")?.textContent || "首页";
  $("#sidebar")?.classList.remove("open");
  if (name === "experience") renderExperiences();
  if (name === "questions") renderQuestions();
  if (name === "compare") { renderCompare(); renderFamily(); }
  if (name === "trust") renderTrust();
  if (name === "school-detail") renderSchoolDetail();
  renderCyberPetContext();
  suppressBackToTopDuringViewChange();
  window.scrollTo({ top: 0, behavior: document.body.classList.contains("onboarding-active") ? "auto" : "smooth" });
}

const BACK_TO_TOP_VIEWS = new Set(["view-experience", "view-compare"]);
let backToTopFrame = 0;
let backToTopHiddenUntil = 0;

function updateBackToTopButton() {
  const button = $("#backToTopButton");
  if (!button) return;
  const activeView = $(".view.active");
  const shouldShow = BACK_TO_TOP_VIEWS.has(activeView?.id)
    && (activeView?.id === "view-compare" || window.scrollY > 420)
    && !document.body.classList.contains("onboarding-active")
    && performance.now() >= backToTopHiddenUntil;
  button.classList.toggle("is-visible", shouldShow);
  button.setAttribute("aria-hidden", String(!shouldShow));
  button.tabIndex = shouldShow ? 0 : -1;
}

function scheduleBackToTopUpdate() {
  if (backToTopFrame) return;
  backToTopFrame = window.requestAnimationFrame(() => {
    backToTopFrame = 0;
    updateBackToTopButton();
  });
}

function suppressBackToTopDuringViewChange() {
  backToTopHiddenUntil = performance.now() + 500;
  updateBackToTopButton();
  window.setTimeout(scheduleBackToTopUpdate, 520);
}

function scrollCurrentPageToTop() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
}

const ONBOARDING_STEPS = [
  {
    view: "home",
    selector: "#stageCarousel",
    placement: "bottom",
    title: "先认识你的决策路径",
    copy: "切换人生阶段，快速查学校、专业、政策或真实经验。"
  },
  {
    view: "home",
    selector: "#themeButton",
    placement: "bottom",
    title: "选择你喜欢的界面主题",
    copy: "点击调色图标，可以在 12 套主题之间自由切换。"
  },
  {
    view: "home",
    selector: "#accountButton",
    placement: "bottom",
    title: "管理账户与个人资料",
    copy: "登录后可以修改头像、昵称、出生日期和地区，并保存你的使用记录。"
  },
  {
    view: "home",
    selector: ".sidebar-nav",
    placement: "right",
    mobileSidebar: true,
    title: "核心功能都在侧栏",
    copy: "从院校经验到问答、候选与认证，使用这里随时切换。"
  },
  {
    view: "experience",
    selector: "#experienceSection .filter-bar",
    placement: "bottom",
    title: "先筛选，再比较信息",
    copy: "按学校、专业、关注维度和信息来源筛选，减少无关内容。"
  },
  {
    view: "questions",
    selector: "#qaAskLayout",
    placement: "top",
    title: "把具体问题交给经历过的人",
    copy: "匿名发布问题，也可以切换到“我要回答”分享真实经历。"
  },
  {
    view: "compare",
    selector: ".candidate-tabs",
    placement: "bottom",
    title: "整理和比较你的候选",
    copy: "分别从院校和专业视角管理候选，也可以邀请家长共同查看。"
  },
  {
    view: "trust",
    selector: ".trust-dashboard",
    placement: "top",
    title: "查看经验背后的可信来源",
    copy: "在这里了解认证规则并申请身份认证，让回答更有依据。"
  }
];

let onboardingIndex = -1;
let onboardingTimer = 0;
let onboardingPositionFrame = 0;
let onboardingRenderToken = 0;

function onboardingIsComplete() {
  return localStorage.getItem(STORE.onboarding) === "1";
}

function updateOnboardingReplayButton(announce = false) {
  const button = $("#onboardingReplayButton");
  if (!button) return;
  const visible = onboardingIsComplete();
  button.hidden = !visible;
  button.classList.remove("is-new");
  if (visible && announce) {
    window.requestAnimationFrame(() => button.classList.add("is-new"));
    window.setTimeout(() => button.classList.remove("is-new"), 2800);
  }
}

function onboardingStepCardMarkup() {
  return `
    <button class="onboarding-close" type="button" data-onboarding-skip aria-label="跳过新手指引">×</button>
    <div class="onboarding-label"><span></span><b id="onboardingProgress"></b></div>
    <h2 id="onboardingTitle"></h2>
    <p id="onboardingCopy"></p>
    <div class="onboarding-footer">
      <span id="onboardingHint">点击页面空白处继续</span>
      <button type="button" data-onboarding-next aria-label="下一步">›</button>
    </div>`;
}

function createOnboardingOverlay() {
  let overlay = $("#onboardingOverlay");
  if (overlay) return overlay;
  overlay = document.createElement("div");
  overlay.id = "onboardingOverlay";
  overlay.className = "onboarding-overlay";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="onboarding-focus" aria-hidden="true"></div>
    <div class="onboarding-arrow" aria-hidden="true"></div>
    <section class="onboarding-card" role="dialog" aria-modal="true" aria-live="polite" tabindex="-1">${onboardingStepCardMarkup()}</section>`;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (event) => {
    if (event.target.closest("[data-onboarding-skip]")) {
      finishOnboarding({ showComplete: false });
      return;
    }
    if (event.target.closest("[data-onboarding-finish]")) {
      dismissOnboarding();
      return;
    }
    if (event.target.closest("[data-onboarding-next]")) {
      advanceOnboarding();
      return;
    }
    if (event.target.closest(".onboarding-card")) return;
    if (overlay.classList.contains("is-complete")) dismissOnboarding();
    else advanceOnboarding();
  });
  return overlay;
}

function scheduleOnboarding(delay = 700) {
  window.clearTimeout(onboardingTimer);
  if (onboardingIsComplete() || onboardingIndex >= 0) return;
  onboardingTimer = window.setTimeout(() => {
    if ($(".modal-backdrop.open")) {
      scheduleOnboarding(500);
      return;
    }
    startOnboarding();
  }, delay);
}

function startOnboarding({ force = false } = {}) {
  if ((!force && onboardingIsComplete()) || onboardingIndex >= 0) return;
  onboardingIndex = 0;
  document.body.classList.add("onboarding-active");
  showOnboardingStep();
}

function advanceOnboarding() {
  if (onboardingIndex < 0) return;
  if (onboardingIndex >= ONBOARDING_STEPS.length - 1) {
    finishOnboarding({ showComplete: true });
    return;
  }
  onboardingIndex += 1;
  showOnboardingStep();
}

function showOnboardingStep() {
  const step = ONBOARDING_STEPS[onboardingIndex];
  if (!step) return;
  const token = ++onboardingRenderToken;
  const overlay = createOnboardingOverlay();
  overlay.hidden = false;
  overlay.classList.remove("is-complete");
  overlay.classList.add("is-moving");
  const card = $(".onboarding-card", overlay);
  if (card && !$("#onboardingProgress", card)) card.innerHTML = onboardingStepCardMarkup();
  $("#sidebar")?.classList.toggle("onboarding-open", Boolean(step.mobileSidebar));
  switchView(step.view);
  window.scrollTo({ top: 0, behavior: "auto" });
  $("#onboardingProgress").textContent = `${String(onboardingIndex + 1).padStart(2, "0")} / ${String(ONBOARDING_STEPS.length).padStart(2, "0")}`;
  $("#onboardingTitle").textContent = step.title;
  $("#onboardingCopy").textContent = step.copy;
  $("#onboardingHint").textContent = "点击页面空白处继续";
  window.requestAnimationFrame(() => {
    if (token !== onboardingRenderToken || onboardingIndex < 0) return;
    const target = $(step.selector);
    if (!target) {
      advanceOnboarding();
      return;
    }
    const initialRect = target.getBoundingClientRect();
    if (initialRect.top < 92 || initialRect.bottom > window.innerHeight - 48) {
      target.scrollIntoView({ block: "center", behavior: "auto" });
    }
    window.requestAnimationFrame(() => {
      if (token !== onboardingRenderToken || onboardingIndex < 0) return;
      positionOnboarding(step, target);
      overlay.classList.remove("is-moving");
      $(".onboarding-card", overlay)?.focus({ preventScroll: true });
    });
  });
}

function positionOnboarding(step, target) {
  const overlay = $("#onboardingOverlay");
  const focus = $(".onboarding-focus", overlay);
  const card = $(".onboarding-card", overlay);
  const arrow = $(".onboarding-arrow", overlay);
  if (!overlay || !focus || !card || !arrow || !target) return;
  const rect = target.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const focusPadding = window.innerWidth <= 540 ? 5 : 8;
  const focusLeft = Math.max(5, rect.left - focusPadding);
  const focusTop = Math.max(5, rect.top - focusPadding);
  const focusRight = Math.min(window.innerWidth - 5, rect.right + focusPadding);
  const focusBottom = Math.min(window.innerHeight - 5, rect.bottom + focusPadding);
  Object.assign(focus.style, {
    left: `${focusLeft}px`,
    top: `${focusTop}px`,
    width: `${Math.max(1, focusRight - focusLeft)}px`,
    height: `${Math.max(1, focusBottom - focusTop)}px`
  });

  card.style.left = "16px";
  card.style.top = "16px";
  card.style.visibility = "hidden";
  const cardRect = card.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const margin = 16;
  const gap = 54;
  const spaces = {
    bottom: viewportHeight - focusBottom,
    top: focusTop,
    right: viewportWidth - focusRight,
    left: focusLeft
  };
  const allowed = viewportWidth <= 700 ? ["bottom", "top"] : ["bottom", "top", "right", "left"];
  const ordered = [step.placement, ...allowed].filter((value, index, values) => allowed.includes(value) && values.indexOf(value) === index);
  const fits = (placement) => ["bottom", "top"].includes(placement)
    ? spaces[placement] >= cardRect.height + gap
    : spaces[placement] >= cardRect.width + gap;
  const placement = ordered.find(fits) || allowed.reduce((best, value) => spaces[value] > spaces[best] ? value : best, allowed[0]);
  let cardLeft = margin;
  let cardTop = margin;
  if (placement === "bottom" || placement === "top") {
    cardLeft = (rect.left + rect.right - cardRect.width) / 2;
    cardTop = placement === "bottom" ? focusBottom + gap : focusTop - gap - cardRect.height;
  } else {
    cardLeft = placement === "right" ? focusRight + gap : focusLeft - gap - cardRect.width;
    cardTop = (rect.top + rect.bottom - cardRect.height) / 2;
  }
  cardLeft = Math.min(Math.max(margin, cardLeft), viewportWidth - cardRect.width - margin);
  cardTop = Math.min(Math.max(margin, cardTop), viewportHeight - cardRect.height - margin);
  Object.assign(card.style, { left: `${cardLeft}px`, top: `${cardTop}px`, visibility: "visible" });
  positionOnboardingArrow(arrow, placement, rect, { left: cardLeft, top: cardTop, width: cardRect.width, height: cardRect.height });
}

function positionOnboardingArrow(arrow, placement, target, card) {
  arrow.dataset.direction = placement === "bottom" ? "up" : placement === "top" ? "down" : placement === "right" ? "left" : "right";
  if (placement === "bottom" || placement === "top") {
    const targetEdge = placement === "bottom" ? target.bottom + 5 : target.top - 5;
    const cardEdge = placement === "bottom" ? card.top : card.top + card.height;
    Object.assign(arrow.style, {
      left: `${(target.left + target.right) / 2 - 6}px`,
      top: `${Math.min(targetEdge, cardEdge)}px`,
      width: "12px",
      height: `${Math.max(14, Math.abs(cardEdge - targetEdge))}px`
    });
  } else {
    const targetEdge = placement === "right" ? target.right + 5 : target.left - 5;
    const cardEdge = placement === "right" ? card.left : card.left + card.width;
    Object.assign(arrow.style, {
      left: `${Math.min(targetEdge, cardEdge)}px`,
      top: `${(target.top + target.bottom) / 2 - 6}px`,
      width: `${Math.max(14, Math.abs(cardEdge - targetEdge))}px`,
      height: "12px"
    });
  }
}

function finishOnboarding({ showComplete }) {
  localStorage.setItem(STORE.onboarding, "1");
  updateOnboardingReplayButton(false);
  onboardingIndex = -1;
  $("#sidebar")?.classList.remove("onboarding-open");
  if (!showComplete) {
    dismissOnboarding();
    return;
  }
  const overlay = createOnboardingOverlay();
  overlay.hidden = false;
  overlay.classList.remove("is-moving");
  overlay.classList.add("is-complete");
  $(".onboarding-focus", overlay).removeAttribute("style");
  $(".onboarding-arrow", overlay).removeAttribute("style");
  $(".onboarding-card", overlay).innerHTML = `
    <div class="onboarding-complete-mark" aria-hidden="true">✓</div>
    <div class="onboarding-label"><span></span><b>指引完成</b></div>
    <h2>现在可以开始探索了</h2>
    <p>我们的新手指引到这里就结束啦，感谢使用我们网站！</p>
    <p class="onboarding-replay-note">忘记怎么操作的话，可以来右上角的指引按钮这里找到我哟！</p>
    <button class="onboarding-finish-button" type="button" data-onboarding-finish>开始探索</button>`;
  $(".onboarding-card", overlay)?.focus({ preventScroll: true });
}

function dismissOnboarding() {
  const overlay = $("#onboardingOverlay");
  if (overlay) {
    overlay.hidden = true;
    overlay.classList.remove("is-complete");
  }
  onboardingIndex = -1;
  onboardingRenderToken += 1;
  $("#sidebar")?.classList.remove("onboarding-open");
  updateOnboardingReplayButton(true);
  switchView("home");
  document.body.classList.remove("onboarding-active");
  const resetScroll = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  resetScroll();
  window.requestAnimationFrame(resetScroll);
  $(".view.active")?.getAnimations().forEach((animation) => animation.cancel());
}

function refreshOnboardingPosition() {
  if (onboardingIndex < 0) return;
  window.cancelAnimationFrame(onboardingPositionFrame);
  onboardingPositionFrame = window.requestAnimationFrame(() => {
    const step = ONBOARDING_STEPS[onboardingIndex];
    const target = step ? $(step.selector) : null;
    if (step && target) positionOnboarding(step, target);
  });
}

function setStage(stage) {
  if (!stageOrder.includes(stage)) return;
  currentStage = stage;
  const activeIndex = stageOrder.indexOf(stage);
  const previousIndex = (activeIndex - 1 + stageOrder.length) % stageOrder.length;
  const nextIndex = (activeIndex + 1) % stageOrder.length;
  $$(".stage-slide").forEach((slide) => {
    const slideIndex = stageOrder.indexOf(slide.dataset.stage);
    slide.classList.toggle("active", slideIndex === activeIndex);
    slide.classList.toggle("previous", slideIndex === previousIndex);
    slide.classList.toggle("next", slideIndex === nextIndex);
    slide.classList.toggle("hidden-stage", ![activeIndex, previousIndex, nextIndex].includes(slideIndex));
    slide.setAttribute("aria-hidden", slideIndex === activeIndex ? "false" : "true");
    slide.inert = slideIndex !== activeIndex;
  });
  $$("[data-stage-dot]").forEach((button) => {
    const active = button.dataset.stageDot === stage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  const position = $("#stagePosition");
  if (position) position.textContent = `${activeIndex + 1} / ${stageOrder.length}`;
  renderCyberPetContext();
}

function moveStage(direction) {
  const currentIndex = stageOrder.indexOf(currentStage);
  setStage(stageOrder[(currentIndex + direction + stageOrder.length) % stageOrder.length]);
}

function setExperienceFilters({ dimension = "all", dimensions = null, source = "all", time = "all", sort = "relevance" } = {}) {
  currentSourceFilter = source;
  const availableDimensions = EXPERIENCE_DIMENSIONS_BY_SOURCE[source] || EXPERIENCE_DIMENSIONS_BY_SOURCE.all;
  const requestedDimensions = Array.isArray(dimensions) ? dimensions : dimension === "all" ? [] : [dimension];
  currentDimensionFilters.clear();
  requestedDimensions.filter((item) => availableDimensions.includes(item)).forEach((item) => currentDimensionFilters.add(item));
  currentTimeFilter = source === "official" ? "all" : time;
  currentExperienceSort = sort;
  updateDimensionFilterButtons();
  $$('[data-source-filter]').forEach((item) => item.classList.toggle("active", item.dataset.sourceFilter === source));
  $$('[data-time-filter]').forEach((item) => item.classList.toggle("active", item.dataset.timeFilter === time));
  const sortSelect = $("#experienceSort");
  if (sortSelect) sortSelect.value = sort;
  updateExperienceFilterUi();
}

function formatContentDate(value) {
  if (!value) return "时间待补充";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function matchesContentTime(value) {
  if (currentTimeFilter === "all") return true;
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  if (currentTimeFilter === "6m") cutoff.setMonth(cutoff.getMonth() - 6);
  if (currentTimeFilter === "1y") cutoff.setFullYear(cutoff.getFullYear() - 1);
  if (currentTimeFilter === "3y") cutoff.setFullYear(cutoff.getFullYear() - 3);
  return date >= cutoff;
}

function updateExperienceFilterUi() {
  const dimensionLabels = { all: "全部", "课程学习": "课程学习", "宿舍生活": "宿舍生活", "设施布局": "设施布局", "社团活动": "社团活动", "校园氛围": "校园氛围", "城市环境": "城市环境", "就业去向": "就业去向" };
  const sourceLabels = { all: "全部", official: "官方信息", student: "在读学生", expert: "教师 / 从业者" };
  const timeLabels = { all: "不限", "6m": "近半年", "1y": "近一年", "3y": "近三年" };
  const dimensionSummary = $("#dimensionFilterSummary");
  const sourceSummary = $("#sourceFilterSummary");
  const timeSummary = $("#timeFilterSummary");
  if (dimensionSummary) {
    const selectedDimensions = [...currentDimensionFilters];
    dimensionSummary.textContent = selectedDimensions.length === 0 ? "全部" : selectedDimensions.length === 1 ? dimensionLabels[selectedDimensions[0]] : `已选 ${selectedDimensions.length} 项`;
  }
  if (sourceSummary) sourceSummary.textContent = sourceLabels[currentSourceFilter] || "全部";
  if (timeSummary) timeSummary.textContent = currentSourceFilter === "official" ? "不适用" : timeLabels[currentTimeFilter] || "不限";
  const timeFilterTrigger = $("#timeFilterTrigger");
  if (timeFilterTrigger) {
    timeFilterTrigger.disabled = currentSourceFilter === "official";
    timeFilterTrigger.setAttribute("aria-disabled", String(currentSourceFilter === "official"));
  }
  syncDimensionFilterAvailability();

  const selected = [];
  if (currentSearch.trim()) selected.push({ key: "keyword", label: `关键词：${currentSearch.trim()}` });
  if (currentSchoolSearch.trim()) selected.push({ key: "school", label: `学校：${currentSchoolSearch.trim()}` });
  if (currentMajorSearch.trim()) selected.push({ key: "major", label: `专业：${currentMajorSearch.trim()}` });
  if (currentExperienceRegion !== "all") selected.push({ key: "region", label: `地区：${regionSelectionLabel(currentExperienceRegion)}` });
  currentDimensionFilters.forEach((dimension) => selected.push({ key: "dimension", value: dimension, label: dimensionLabels[dimension] }));
  if (currentSourceFilter !== "all") selected.push({ key: "source", label: sourceLabels[currentSourceFilter] });
  if (currentTimeFilter !== "all") selected.push({ key: "time", label: timeLabels[currentTimeFilter] });
  if (currentExperienceSort === "newest") selected.push({ key: "sort", label: "最新发布" });
  if ($("#sameSchoolToggle")?.checked) selected.push({ key: "same-school", label: "同高中优先" });
  const selectedFilters = $("#experienceSelectedFilters");
  if (selectedFilters) {
    selectedFilters.innerHTML = selected.length
      ? selected.map((item) => `<button class="filter-selected-tag" type="button" data-clear-filter-key="${item.key}"${item.value ? ` data-filter-value="${escapeHtml(item.value)}"` : ""} title="移除${escapeHtml(item.label)}">${escapeHtml(item.label)}<i data-lucide="x"></i></button>`).join("")
      : `<span class="filter-empty-label">当前未添加筛选条件</span>`;
  }
  const activeFilterCount = $("#activeFilterCount");
  if (activeFilterCount) activeFilterCount.textContent = String(selected.length);
  const clearButton = $("#clearExperienceFilters");
  if (clearButton) clearButton.disabled = selected.length === 0;
  syncAdvancedExperienceFilterPanels();
  hydrateIcons();
}

function syncDimensionFilterAvailability() {
  const availableDimensions = EXPERIENCE_DIMENSIONS_BY_SOURCE[currentSourceFilter] || EXPERIENCE_DIMENSIONS_BY_SOURCE.all;
  $$('[data-dimension-filter]').forEach((button) => {
    const dimension = button.dataset.dimensionFilter;
    button.hidden = dimension !== "all" && !availableDimensions.includes(dimension);
  });
}

function updateDimensionFilterButtons() {
  $$('[data-dimension-filter]').forEach((button) => {
    const dimension = button.dataset.dimensionFilter;
    const active = dimension === "all" ? currentDimensionFilters.size === 0 : currentDimensionFilters.has(dimension);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function syncAdvancedExperienceFilterPanels() {
  const panel = $("#advancedExperienceFilters");
  if (!panel || panel.hidden) return;
  const activeSection = panel.dataset.activeSection || "all";
  $$('[data-filter-section-panel]').forEach((sectionPanel) => {
    const isTimePanel = sectionPanel.dataset.filterSectionPanel === "time";
    const matchesSection = activeSection === "all" || sectionPanel.dataset.filterSectionPanel === activeSection;
    sectionPanel.hidden = !matchesSection || (isTimePanel && currentSourceFilter === "official");
  });
}

function toggleAdvancedExperienceFilters(section) {
  const panel = $("#advancedExperienceFilters");
  if (!panel || (section === "time" && currentSourceFilter === "official")) return;
  const shouldOpen = panel.hidden || panel.dataset.activeSection !== section;
  panel.hidden = !shouldOpen;
  panel.dataset.activeSection = shouldOpen ? section : "";
  $$('[data-filter-section]').forEach((button) => {
    button.setAttribute("aria-expanded", String(shouldOpen && button.dataset.filterSection === section));
  });
  $("#toggleAdvancedFilters")?.classList.toggle("open", shouldOpen);
  syncAdvancedExperienceFilterPanels();
}

function runStageSearch(slide) {
  const input = $("[data-stage-search]", slide);
  currentSearch = input?.value.trim() || "";
  currentSchoolSearch = "";
  currentMajorSearch = "";
  currentExperienceRegion = "all";
  currentExperienceRegionSearch = "";
  currentExperienceRegionLetter = "";
  currentExperienceRegionOpen = false;
  setExperienceFilters();
  switchView("experience");
  switchExperienceContentTab("experience");
}

function runStageTask(task) {
  const questionTasks = ["ask", "ask-student"];
  if (questionTasks.includes(task)) {
    switchView("questions");
    switchQaTab("ask");
    const stageSelect = $("#questionStagePreview");
    if (stageSelect) stageSelect.value = stageNames[currentStage];
    $("#questionInputPreview")?.focus();
    return;
  }
  const institutionTasks = ["school", "major", "admission", "progression"];
  const taskFilters = {
    course: { dimension: "课程学习" },
    career: { dimension: "就业去向" },
    expert: { source: "expert" },
    dorm: { dimension: "宿舍生活" },
    city: { dimension: "城市环境" }
  };
  currentSearch = "";
  currentSchoolSearch = "";
  currentMajorSearch = "";
  if (institutionTasks.includes(task)) {
    currentInstitutionRegion = "all";
    currentInstitutionRegionSearch = "";
    currentInstitutionRegionLetter = "";
    currentInstitutionRegionOpen = false;
  } else {
    currentExperienceRegion = "all";
    currentExperienceRegionSearch = "";
    currentExperienceRegionLetter = "";
    currentExperienceRegionOpen = false;
  }
  setExperienceFilters(taskFilters[task] || {});
  switchView("experience");
  switchExperienceContentTab(institutionTasks.includes(task) ? "institution" : "experience");
  if (task === "school") $("#institutionSchoolSearch")?.focus();
  if (task === "major") $("#institutionMajorSearch")?.focus();
}

function makeRegionSelection(province = "", city = "") {
  if (city) return `city:${province}|${city}`;
  return province ? `province:${province}` : "all";
}

function parseRegionSelection(selection) {
  if (!selection || selection === "all") return { province: "", city: "" };
  if (selection.startsWith("city:")) {
    const [province = "", city = ""] = selection.slice(5).split("|");
    return { province, city };
  }
  return { province: selection.startsWith("province:") ? selection.slice(9) : selection, city: "" };
}

function regionSelectionLabel(selection) {
  const { province, city } = parseRegionSelection(selection);
  return city ? `${province} / ${city}` : province;
}

function majorCategoryForName(name = "") {
  const program = institutions.flatMap((item) => item.majorPrograms || []).find((item) => item.name === name);
  return program?.category || MAJOR_CATEGORY_BY_NAME[name] || "";
}

function libraryMajorOptions(library) {
  const entries = library === "institution"
    ? institutions.flatMap((institution) => (institution.majorPrograms || []).map((program) => ({ name: program.name, category: program.category || majorCategoryForName(program.name), school: institution.school })))
    : experiences.filter((item) => (item.source === "student" || item.source === "expert") && item.major).map((item) => ({ name: item.major, category: majorCategoryForName(item.major), school: item.school }));
  const grouped = new Map();
  entries.forEach((item) => {
    if (!grouped.has(item.name)) grouped.set(item.name, { name: item.name, category: item.category, schools: new Set(), count: 0 });
    const option = grouped.get(item.name);
    option.count += 1;
    if (item.school) option.schools.add(item.school);
  });
  return [...grouped.values()].sort((a, b) => a.category.localeCompare(b.category, "zh-CN") || a.name.localeCompare(b.name, "zh-CN"));
}

function libraryMajorUi(library) {
  if (library === "institution") return { query: currentInstitutionMajorSearch, category: currentInstitutionMajorCategory, open: currentInstitutionMajorOpen };
  return { query: currentMajorSearch, category: currentExperienceMajorCategory, open: currentExperienceMajorOpen };
}

function renderLibraryMajorPicker(library) {
  const prefix = library === "institution" ? "institution" : "experience";
  const panel = $(`#${prefix}MajorPanel`);
  const categoriesContainer = $(`#${prefix}MajorCategories`);
  const optionsContainer = $(`#${prefix}MajorOptions`);
  const input = $(`#${prefix}MajorSearch`);
  const toggle = $(`[data-major-toggle="${library}"]`);
  const picker = $(`[data-major-picker="${library}"]`);
  if (!panel || !categoriesContainer || !optionsContainer || !input || !toggle || !picker) return;
  const { query, category, open } = libraryMajorUi(library);
  const options = libraryMajorOptions(library);
  const categoryCounts = new Map(MAJOR_CATEGORIES.map((item) => [item, options.filter((option) => option.category === item).length]));
  const keyword = query.trim().toLowerCase();
  const visibleOptions = options.filter((option) => (!category || option.category === category) && (!keyword || option.name.toLowerCase().includes(keyword)));
  panel.hidden = !open;
  picker.classList.toggle("open", open);
  toggle.classList.toggle("open", open);
  input.setAttribute("aria-expanded", String(open));
  if (input.value !== query) input.value = query;
  categoriesContainer.innerHTML = MAJOR_CATEGORIES.map((item) => {
    const active = category === item;
    return `<button class="major-category-button${active ? " active" : ""}" type="button" data-major-category="${escapeHtml(item)}" data-major-library="${library}" aria-pressed="${active}"><span>${escapeHtml(item)}</span><small>${categoryCounts.get(item) || 0}</small></button>`;
  }).join("");
  const emptyText = category ? `${category}在当前${library === "institution" ? "院校样本" : "经验样本"}中暂无数据` : "未找到匹配的专业";
  optionsContainer.innerHTML = visibleOptions.length ? visibleOptions.map((option) => {
    const meta = library === "institution" ? `${option.schools.size} 所样本院校开设` : `${option.count} 条相关经验`;
    return `<button class="major-option-button" type="button" data-major-option="${escapeHtml(option.name)}" data-major-library="${library}"><span><strong>${escapeHtml(option.name)}</strong><small>${escapeHtml(option.category || "门类待补充")}</small></span><em>${meta}</em></button>`;
  }).join("") : `<div class="major-picker-empty"><strong>${escapeHtml(emptyText)}</strong><span>更多专业数据将在接入可靠资料后补充</span></div>`;
}

function normalizeProvinceName(value = "") {
  return String(value).replace(/(壮族自治区|回族自治区|维吾尔自治区|特别行政区|自治区|省|市)$/u, "");
}

function normalizeCityName(value = "") {
  return String(value).replace(/(自治州|综合实验区|地区|新区|市|盟|区|县)$/u, "");
}

function provinceForCity(city = "") {
  const normalizedCity = normalizeCityName(city);
  return Object.keys(REGION_CITIES).find((province) => {
    if (normalizeProvinceName(province) === normalizedCity) return true;
    return REGION_CITIES[province].some((item) => normalizeCityName(item) === normalizedCity);
  }) || "";
}

function isCityLevelRegion(value = "") {
  return /(市|自治州|地区|盟)$/u.test(value);
}

function isMunicipality(value = "") {
  return MUNICIPALITIES.has(value);
}

function matchesRegionSelection(item, selection) {
  if (!selection || selection === "all") return true;
  const selected = parseRegionSelection(selection);
  const itemCity = item.city || "";
  if (selected.city) return normalizeCityName(itemCity) === normalizeCityName(selected.city);
  const itemProvince = item.province || provinceForCity(itemCity);
  return itemProvince === selected.province || normalizeProvinceName(itemCity) === normalizeProvinceName(selected.province);
}

function regionTypeLabel(province, city = "") {
  if (city) {
    if (city.endsWith("自治州")) return "州";
    if (city.endsWith("地区")) return "地";
    if (city.endsWith("盟")) return "盟";
    if (city.endsWith("区") || city.endsWith("县")) return "区";
    return "市";
  }
  if (province === "海外") return "外";
  if (province.endsWith("特别行政区")) return "特";
  if (province.endsWith("自治区")) return "区";
  if (province.endsWith("市")) return "直";
  return "省";
}

function regionWholeAreaLabel(province = "") {
  if (province.endsWith("特别行政区")) return "全特别行政区";
  if (province.endsWith("自治区")) return "全自治区";
  if (province.endsWith("市")) return "全市";
  if (province === "海外") return "全部海外地区";
  return "全省";
}

function libraryRegionUi(library) {
  if (library === "institution") {
    return { selection: currentInstitutionRegion, query: currentInstitutionRegionSearch, letter: currentInstitutionRegionLetter, open: currentInstitutionRegionOpen };
  }
  return { selection: currentExperienceRegion, query: currentExperienceRegionSearch, letter: currentExperienceRegionLetter, open: currentExperienceRegionOpen };
}

function renderLibraryRegionPicker(library) {
  const isInstitution = library === "institution";
  const prefix = isInstitution ? "institution" : "experience";
  const lettersContainer = $(`#${prefix}RegionLetters`);
  const optionsContainer = $(`#${prefix}RegionOptions`);
  const searchInput = $(`#${prefix}RegionSearch`);
  const panel = $(`#${prefix}RegionPanel`);
  const toggle = $(`[data-region-toggle="${library}"]`);
  const allButton = $(`[data-library-region="${library}"][data-region-province=""][data-region-city=""]`);
  if (!lettersContainer || !optionsContainer || !panel || !toggle) return;
  const { selection, query, letter, open } = libraryRegionUi(library);
  const selected = parseRegionSelection(selection);
  const availableLetters = new Set(Object.values(REGION_INITIAL_BY_PROVINCE));
  panel.hidden = !open;
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  if (searchInput) {
    const displayValue = query || regionSelectionLabel(selection);
    if (searchInput.value !== displayValue) searchInput.value = displayValue;
    searchInput.setAttribute("aria-expanded", String(open));
  }
  if (allButton) {
    const active = selection === "all";
    allButton.classList.toggle("active", active);
    allButton.setAttribute("aria-pressed", String(active));
  }
  lettersContainer.innerHTML = REGION_LETTERS.map((item) => {
    const disabled = !availableLetters.has(item);
    const active = letter === item;
    return `<button class="region-letter-button${active ? " active" : ""}" type="button" data-region-letter="${item}" data-region-library="${library}" aria-pressed="${active}"${disabled ? " disabled" : ""}>${item}</button>`;
  }).join("");

  const keyword = query.trim();
  let results = [];
  if (keyword) {
    Object.entries(REGION_CITIES).forEach(([province, cities]) => {
      if (province.includes(keyword)) results.push({ province, city: "" });
      cities.filter((city) => isCityLevelRegion(city) && city.includes(keyword)).forEach((city) => results.push({ province, city }));
    });
    results = results.slice(0, 24);
  } else if (letter) {
    results = Object.keys(REGION_CITIES)
      .filter((province) => REGION_INITIAL_BY_PROVINCE[province] === letter)
      .map((province) => ({ province, city: "" }));
  } else {
    results = Object.keys(REGION_CITIES)
      .sort((a, b) => REGION_INITIAL_BY_PROVINCE[a].localeCompare(REGION_INITIAL_BY_PROVINCE[b]) || a.localeCompare(b, "zh-CN"))
      .map((province) => ({ province, city: "" }));
  }

  const resultButton = ({ province, city }, compact = false) => {
    const value = makeRegionSelection(province, city);
    const active = selection === value;
    return `<button class="region-result-button${compact ? " compact" : ""}${active ? " active" : ""}" type="button" data-library-region="${library}" data-region-province="${escapeHtml(province)}" data-region-city="${escapeHtml(city)}" aria-pressed="${active}"><strong>${escapeHtml(city || province)}</strong>${city ? `<small>${escapeHtml(province)}</small>` : ""}</button>`;
  };
  let resultButtons = "";
  if (keyword) {
    resultButtons = `<div class="region-search-results">${results.map((item) => resultButton(item)).join("")}</div>`;
  } else {
    const groupedResults = REGION_LETTERS.map((initial) => {
      const provinces = results.filter((item) => REGION_INITIAL_BY_PROVINCE[item.province] === initial);
      if (!provinces.length) return "";
      return `<section class="region-province-group"><b>${initial}</b><div>${provinces.map((item) => resultButton(item, true)).join("")}</div></section>`;
    }).join("");
    const popularCities = !letter ? `<section class="region-popular-section"><span>热门城市</span><div>${POPULAR_REGIONS.map((item) => {
      const active = selection === makeRegionSelection(item.province, item.city);
      return `<button class="region-popular-button${active ? " active" : ""}" type="button" data-library-region="${library}" data-region-province="${escapeHtml(item.province)}" data-region-city="${escapeHtml(item.city)}"${item.city ? "" : " data-region-scope-all"} aria-pressed="${active}">${escapeHtml(item.label)}</button>`;
    }).join("")}</div></section>` : "";
    resultButtons = `${popularCities}<div class="region-province-groups">${groupedResults}</div>`;
  }

  const showSelectedProvinceCities = selected.province && !isMunicipality(selected.province) && !keyword && (!letter || REGION_INITIAL_BY_PROVINCE[selected.province] === letter);
  const cityOptions = showSelectedProvinceCities ? `<div class="region-city-panel"><div class="region-city-heading"><strong>${escapeHtml(selected.province)}</strong><span>城市</span></div><div class="region-city-options"><button class="region-city-button${selected.city ? "" : " active"}" type="button" data-library-region="${library}" data-region-province="${escapeHtml(selected.province)}" data-region-city="" data-region-scope-all aria-pressed="${String(!selected.city)}">${escapeHtml(regionWholeAreaLabel(selected.province))}</button>${(REGION_CITIES[selected.province] || []).filter(isCityLevelRegion).map((city) => `<button class="region-city-button${selected.city === city ? " active" : ""}" type="button" data-library-region="${library}" data-region-province="${escapeHtml(selected.province)}" data-region-city="${escapeHtml(city)}" aria-pressed="${String(selected.city === city)}">${escapeHtml(city)}</button>`).join("")}</div></div>` : "";
  optionsContainer.hidden = false;
  optionsContainer.innerHTML = `${results.length ? resultButtons : `<div class="region-no-results">未找到匹配地区</div>`}${cityOptions}`;
}

function renderExperienceInstitutionSummary(item) {
  const institution = institutions.find((school) => school.school === item.school);
  if (!institution) {
    return `<div class="experience-institution-summary pending"><div class="experience-institution-heading"><span><i data-lucide="landmark"></i>院校摘要</span><strong>${escapeHtml(item.school || "未命名学校")}</strong></div><div class="experience-institution-meta"><span><i data-lucide="map-pin"></i>${escapeHtml(item.city || "地区待补充")}</span><span class="experience-institution-pending">院校资料待补充</span></div></div>`;
  }
  const identityTags = Array.isArray(institution.identityTags) ? institution.identityTags.map((tag) => `<span class="experience-institution-tag">${escapeHtml(tag)}</span>`).join("") : "";
  return `<div class="experience-institution-summary"><div class="experience-institution-heading"><span><i data-lucide="landmark"></i>院校摘要</span><strong>${escapeHtml(institution.school)}</strong></div><div class="experience-institution-meta"><span><i data-lucide="map-pin"></i>${escapeHtml(institution.city || item.city || "地区待补充")}</span><span>${escapeHtml(institution.type || "院校类型待补充")}</span></div>${identityTags ? `<div class="experience-institution-tags">${identityTags}</div>` : ""}</div>`;
}

function renderExperiences() {
  const grid = $("#experienceGrid");
  if (!grid) return;
  const experienceSectionCopy = {
    all: { kicker: "经验与职业视角", heading: "来自学生、教师与从业者的真实补充", empty: "当前筛选下暂无匹配的经验或职业视角内容" },
    student: { kicker: "学生经验", heading: "来自在读学生的真实经历", empty: "当前筛选下暂无匹配的在读学生经验" },
    expert: { kicker: "专业与职业视角", heading: "来自教师与从业者的经验判断", empty: "当前筛选下暂无匹配的教师或从业者内容" }
  };
  const sectionCopy = experienceSectionCopy[currentSourceFilter] || experienceSectionCopy.all;
  const experienceSectionKicker = $("#experienceSectionKicker");
  const experienceHeading = $("#experienceHeading");
  if (experienceSectionKicker) experienceSectionKicker.textContent = sectionCopy.kicker;
  if (experienceHeading) experienceHeading.textContent = sectionCopy.heading;
  const query = currentSearch.trim().toLowerCase();
  const schoolQuery = currentSchoolSearch.trim().toLowerCase();
  const majorQuery = currentMajorSearch.trim().toLowerCase();
  const institutionSchoolQuery = currentInstitutionSchoolSearch.trim().toLowerCase();
  const institutionMajorQuery = currentInstitutionMajorSearch.trim().toLowerCase();
  const experienceItems = experiences.filter((item) => item.source === "student" || item.source === "expert");
  renderLibraryMajorPicker("institution");
  renderLibraryMajorPicker("experience");
  renderLibraryRegionPicker("institution");
  renderLibraryRegionPicker("experience");
  const sameSchool = $("#sameSchoolToggle")?.checked;
  const matchesFilters = (item) => {
    const dimensions = Array.isArray(item.dimensions) ? item.dimensions : [];
    const itemTags = Array.isArray(item.tags) ? item.tags.join("") : "";
    const schoolText = (item.school || "").toLowerCase();
    const majorText = (item.major || "").toLowerCase();
    const schoolMatches = !schoolQuery || schoolText.includes(schoolQuery);
    const majorMatches = !majorQuery || majorText.includes(majorQuery);
    const matchesDimension = currentDimensionFilters.size === 0 || dimensions.some((dimension) => currentDimensionFilters.has(dimension));
    const matchesSource = currentSourceFilter === "all" || item.source === currentSourceFilter;
    const matchesSearch = !query || `${item.school || ""}${item.major || ""}${item.city || ""}${item.text || ""}${itemTags}${dimensions.join("")}`.toLowerCase().includes(query);
    const regionMatches = matchesRegionSelection(item, currentExperienceRegion);
    return schoolMatches && majorMatches && regionMatches && matchesDimension && matchesSource && matchesSearch && matchesContentTime(item.publishedAt);
  };
  const filtered = experienceItems.filter(matchesFilters);
  const filteredInstitutions = institutions.filter((item) => {
    const schoolText = (item.school || "").toLowerCase();
    const majorText = [...(item.majors || []), ...(item.majorPrograms || []).map((program) => program.name)].join("").toLowerCase();
    const schoolMatches = !institutionSchoolQuery || schoolText.includes(institutionSchoolQuery);
    const majorMatches = !institutionMajorQuery || majorText.includes(institutionMajorQuery);
    const regionMatches = matchesRegionSelection(item, currentInstitutionRegion);
    return schoolMatches && majorMatches && regionMatches;
  });
  const institutionGrid = $("#institutionGrid");
  if (institutionGrid) {
    const institutionEmptyText = currentInstitutionRegion === "all" ? "当前筛选下暂无匹配的院校信息" : `${regionSelectionLabel(currentInstitutionRegion)}暂无匹配的院校信息`;
    institutionGrid.innerHTML = filteredInstitutions.length ? filteredInstitutions.map(renderInstitutionCard).join("") : `<div class="empty-state institution-empty"><i data-lucide="building-2"></i><p>${escapeHtml(institutionEmptyText)}</p></div>`;
    $("#institutionResultNote") && ($("#institutionResultNote").textContent = `${filteredInstitutions.length} 所学校`);
  }
  const clearInstitutionFilters = $("#clearInstitutionFilters");
  if (clearInstitutionFilters) clearInstitutionFilters.disabled = !currentInstitutionSchoolSearch.trim() && !currentInstitutionMajorSearch.trim() && !currentInstitutionRegionSearch.trim() && currentInstitutionRegion === "all";
  $("#experienceResultNote") && ($("#experienceResultNote").textContent = `${filtered.length} 条内容`);
  const ordered = [...filtered].sort((a, b) => {
    if (sameSchool) {
      const schoolPriority = Number((b.school || "").includes("师范")) - Number((a.school || "").includes("师范"));
      if (schoolPriority) return schoolPriority;
    }
    return currentExperienceSort === "newest" ? String(b.publishedAt || "").localeCompare(String(a.publishedAt || "")) : 0;
  });
  const favorites = userFavorites();
  const sourceLabels = { student: { cls: "level-student", icon: "user-check", text: "在读认证" }, official: { cls: "level-official", icon: "landmark", text: "官方信息" }, data: { cls: "level-data", icon: "database", text: "客观数据" }, expert: { cls: "level-expert", icon: "users", text: "教师/从业者" } };
  const experienceEmptyText = currentExperienceRegion === "all" ? sectionCopy.empty : `${regionSelectionLabel(currentExperienceRegion)}暂无匹配的经验内容`;
  grid.innerHTML = ordered.length ? ordered.map((item) => {
    const src = sourceLabels[item.source] || sourceLabels.student;
    const saved = favorites.includes(item.id);
    const tagsHtml = Array.isArray(item.tags) ? item.tags.map((tag) => `<span class="content-tag">${tag}</span>`).join("") : "";
    const dimensionsHtml = Array.isArray(item.dimensions) ? item.dimensions.map((dimension) => `<span class="content-tag">${dimension}</span>`).join("") : "";
    const sourceDetail = item.sourceUrl ? `<a class="source-link" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link"></i>查看来源 · ${item.sourceName}</a>` : `<span class="source-link source-link-muted"><i data-lucide="shield-check"></i>平台认证记录 · ${item.level || "身份已核验"}</span>`;
    const publishedAt = `<time class="experience-published-at" datetime="${item.publishedAt || ""}"><i data-lucide="clock-3"></i>发布于 ${formatContentDate(item.publishedAt)}</time>`;
    const valueHtml = item.value ? `<div class="source-value"><strong>${item.value}</strong><small>来源内容摘要</small></div>` : "";
    const titleHtml = item.title ? `<h3 class="experience-card-title">${item.title}</h3>` : "";
    const institutionSummary = renderExperienceInstitutionSummary(item);
    return `<article class="experience-card" onclick="saveHistory('${item.id}')">
      <div class="experience-top"><span class="school-avatar">${(item.school || "").slice(0, 1)}</span><div class="experience-school"><strong>${item.school || "未命名学校"}</strong><small>${item.major || "未分类专业"} · ${item.city || "未标注城市"}</small></div><span class="source-level-tag ${src.cls}">${src.text}</span></div>
      <div class="experience-divider"></div>
      ${institutionSummary}${valueHtml}${titleHtml}
      <p>${item.text || ""}</p>
      <div class="tag-row">${dimensionsHtml}${tagsHtml}</div>
      <div class="experience-card-footer"><div class="experience-source-meta">${sourceDetail}${publishedAt}</div><div class="experience-card-actions"><button class="save-experience ${saved ? "saved" : ""}" data-favorite="${item.id}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入我的候选"}</button></div></div>
    </article>`;
  }).join("") : `<div class="empty-state"><i data-lucide="search-x"></i><p>${escapeHtml(experienceEmptyText)}</p><button class="quiet-button" data-clear-search>清空筛选</button></div>`;
  updateExperienceFilterUi();
  hydrateIcons();
}

function renderQuestionAnswers(item) {
  const answers = Array.isArray(item.answers) ? item.answers : [];
  if (!answers.length) return "";
  return `<div class="question-answers">${answers.map((answer) => `<div class="answer-card"><div class="answer-author">${escapeHtml(answer.author || "")}</div><div class="answer-content">${escapeHtml(answer.text || "")}</div></div>`).join("")}</div>`;
}

function renderQuestions() {
  const user = currentUser();
  const list = $("#questionList");
  if (!list) return;
  if (!user) {
    list.innerHTML = demoQuestions.map((item) => `<article class="question-list-item"><header><strong>${escapeHtml(item.title)}</strong><span class="question-status ${item.waiting ? "waiting" : ""}">${escapeHtml(item.status)}</span></header><p>${escapeHtml(item.meta)}</p>${renderQuestionAnswers(item)}</article>`).join("");
  } else {
    const mine = read(STORE.questions, []).filter((item) => item.userId === user.id);
    list.innerHTML = mine.length ? mine.map((item) => `<article class="question-list-item"><header><strong>${escapeHtml(item.title)}</strong><span class="question-status ${item.status === "已回答" ? "" : "waiting"}">${escapeHtml(item.status)}</span></header><p>${escapeHtml(item.meta || `${item.topic || "未分类"} · 发布于 ${new Date(item.createdAt).toLocaleDateString("zh-CN")}`)}</p>${renderQuestionAnswers(item)}</article>`).join("") : `<p>你还没有发布问题</p>`;
  }
  $("#questionsCount") && ($("#questionsCount").textContent = user ? read(STORE.questions, []).filter((item) => item.userId === user.id).length : "示例");
  hydrateIcons();
}

function renderInstitutionCard(item) {
  const saved = userFavorites().includes(`school-${item.id}`);
  const majorHtml = item.majors.map((major) => `<span class="content-tag">${major}</span>`).join("");
  const highlightHtml = item.highlights.map((highlight) => `<span class="institution-highlight">${highlight}</span>`).join("");
  return `<article class="institution-card">
    <div class="institution-card-top"><div class="institution-mark">${item.school.slice(0, 1)}</div><div><span class="source-level-tag level-institution">院校信息</span><h3>${item.school}</h3><p>${item.city} · ${item.type}</p></div></div>
    <p class="institution-intro">${item.intro}</p>
    <div class="institution-highlights">${highlightHtml}</div>
    <div class="institution-card-block"><span>重点关注专业</span><div class="tag-row">${majorHtml}</div></div>
    <div class="institution-evidence"><span><i data-lucide="database"></i>客观数据已整理</span><span><i data-lucide="landmark"></i>官方资料已整理</span></div>
    <div class="institution-card-footer"><span class="institution-note"><i data-lucide="clock-3"></i>资料更新于 ${item.updatedAt || "时间待补充"} · 来源可核验</span><div class="institution-card-actions"><button class="text-button" data-school-detail="${item.id}">全面了解 <i data-lucide="arrow-up-right"></i></button><button class="save-experience ${saved ? "saved" : ""}" data-favorite="school-${item.id}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入候选"}</button></div></div>
  </article>`;
}

function renderSchoolComment(comment) {
  return `<article class="school-comment">
    <header><span class="comment-avatar"><i data-lucide="user-round-check"></i></span><div><strong>本校认证学生</strong><small>${comment.grade || "年级已核验"} · ${comment.major || "专业已核验"}</small></div><button class="icon-button comment-report" data-report-comment aria-label="举报评论" title="举报评论"><i data-lucide="flag"></i></button></header>
    <p>${comment.text}</p>
    <footer><span class="content-tag">${comment.dimension || "校园体验"}</span><time>${comment.date || "近期"}</time></footer>
  </article>`;
}

const schoolCommentExamples = {
  fjnu: [
    { id: "fjnu-campus-route", major: "地理科学", grade: "2023级", dimension: "校园环境", text: "不同学院上课地点可能分布在不同教学楼，排课出来后可以先确认楼栋位置，再估算课间通行时间。", date: "示例内容" },
    { id: "fjnu-dorm-detail", major: "汉语言文学", grade: "2022级", dimension: "宿舍生活", text: "宿舍条件会因校区和楼栋不同而变化，了解时最好同时确认住宿校区、楼栋设施和当年分配通知。", date: "示例内容" },
    { id: "fjnu-practice-detail", major: "教育学", grade: "2022级", dimension: "培养安排", text: "关注师范方向时，除了课程名称，还可以向学院确认教育见习、实习学期和合作学校的具体安排。", date: "示例内容" }
  ],
  fzu: [
    { id: "fzu-campus-route", major: "经济学", grade: "2022级", dimension: "校园环境", text: "查看校区信息时要继续确认学院所在区域和常用教学楼，只看学校总地址不一定能判断每天的通行安排。", date: "示例内容" },
    { id: "fzu-lab-detail", major: "机械设计制造及其自动化", grade: "2023级", dimension: "培养安排", text: "了解工科专业时可以进一步确认实验课、课程设计和实训场地分别安排在哪些学期与校区。", date: "示例内容" },
    { id: "fzu-dorm-detail", major: "计算机科学与技术", grade: "2023级", dimension: "宿舍生活", text: "宿舍设施与分配安排可能按年份调整，报考前可以把官方住宿通知和在校生当年的实际补充放在一起看。", date: "示例内容" }
  ],
  fafu: [
    { id: "fafu-studio-detail", major: "风景园林", grade: "2023级", dimension: "课程学习", text: "设计课程通常需要连续完成图纸、模型与软件表达，了解专业时可以进一步确认工作室安排和不同学期的项目强度。", date: "示例内容" },
    { id: "fafu-campus-detail", major: "风景园林", grade: "2023级", dimension: "校园环境", text: "课程使用的教室、实验空间和宿舍位置可能影响日常通行，建议结合学院所在区域确认真实距离。", date: "示例内容" },
    { id: "fafu-practice-detail", major: "食品科学与工程", grade: "2022级", dimension: "培养安排", text: "了解专业时除了课程名称，还可以关注实验课、实习基地和实践学期分别怎样安排。", date: "示例内容" }
  ]
};

function renderSchoolCommentSection(item) {
  const seedComments = schoolCommentExamples[item.id] || [];
  const composer = `<form class="school-comment-form" id="schoolCommentForm"><label for="schoolCommentInput">补充你的本校经历</label><textarea id="schoolCommentInput" maxlength="300" placeholder="写下具体事实，例如课程安排、宿舍生活或实习准备。"></textarea><div><select id="schoolCommentDimension" aria-label="评论维度"><option>课程学习</option><option>宿舍生活</option><option>城市环境</option><option>就业去向</option></select><button class="primary-button" type="submit"><i data-lucide="send"></i>匿名发布</button></div><small>仅本校认证学生可发布，正式版本由后端校验校园身份。</small></form>`;
  return `<section class="detail-experience-panel school-comment-panel school-detail-anchor" id="school-comments"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="messages-square"></i>本校学生补充</span><h2>院校细节补充</h2></div><span class="comment-count">${seedComments.length} 条</span></div><p class="school-comment-intro">用于补充官方资料难以覆盖的具体体验，院校信息仍以学校发布内容为准。</p>${composer}<div class="school-comment-list">${seedComments.length ? seedComments.map(renderSchoolComment).join("") : `<div class="detail-empty">暂时还没有本校学生补充</div>`}</div></section>`;
}

function renderMajorPrograms(item, query = "") {
  const list = Array.isArray(item.majorPrograms) ? item.majorPrograms : [];
  const keyword = query.trim().toLowerCase();
  const filtered = list.filter((program) => !keyword || `${program.name}${program.school}${program.category}${program.note}`.toLowerCase().includes(keyword));
  return filtered.length ? filtered.map((program) => {
    const favoriteId = majorCandidateId(item.id, program.name);
    const saved = userFavorites().includes(favoriteId);
    const sourceLink = program.officialUrl ? `<a class="major-program-source-link" href="${program.officialUrl}" target="_blank" rel="noopener noreferrer" aria-label="查看${item.school}${program.school}官网：${program.name}"><i data-lucide="landmark"></i>查看学院官网<i data-lucide="external-link"></i></a>` : `<span class="major-program-source-link pending-source"><i data-lucide="landmark"></i>官方链接待补充</span>`;
    const content = `<div class="major-program-title"><span class="major-program-icon"><i data-lucide="book-open"></i></span><div><strong>${program.name}</strong><small>${program.school}</small></div></div><div class="major-program-meta"><span>${program.level}</span><span>${program.category}</span></div><p>${program.note}</p><div class="major-program-actions">${sourceLink}<button class="save-experience ${saved ? "saved" : ""}" type="button" data-favorite="${favoriteId}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入候选专业"}</button></div>`;
    return `<article class="major-program-item${program.officialUrl ? "" : " pending"}" aria-label="${item.school} ${program.name}">${content}</article>`;
  }).join("") : `<div class="major-program-empty"><i data-lucide="search-x"></i><p>没有找到匹配的专业</p></div>`;
}

function renderAdmissionResources(item) {
  return item.admissionResources.map((resource) => `<a class="admission-resource-card" href="${resource.url}" target="_blank" rel="noopener noreferrer"><span class="admission-resource-icon"><i data-lucide="${resource.icon}"></i></span><div><span class="admission-resource-type">${resource.sourceType}</span><strong>${resource.title}</strong><p>${resource.description}</p><small>${resource.year} · ${resource.sourceName}</small></div><span class="admission-resource-status ${resource.status === "待接入" ? "pending" : ""}">${resource.status}</span><i data-lucide="arrow-up-right"></i></a>`).join("");
}

function renderLatestUpdates(item) {
  const updates = Array.isArray(item.latestUpdates) ? item.latestUpdates : [];
  const updateCards = updates.map((update) => `<article class="latest-update-card"><div class="latest-update-meta"><span>${update.type}</span><time>${update.date}</time></div><h3>${update.title}</h3><p>${update.summary}</p><footer><div><span>${update.publisher}</span><small>${update.status}</small></div><a href="${update.url}" target="_blank" rel="noopener noreferrer" aria-label="前往${update.publisher}核验${update.title}">前往官网核验<i data-lucide="arrow-up-right"></i></a></footer></article>`).join("");
  return `<article class="detail-panel latest-updates-panel school-detail-anchor" id="school-updates"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="newspaper"></i>最新资讯</span><h2>政策变化先核对发布时间</h2></div><span class="source-level-tag level-official">官方发布入口</span></div><p>集中查看可能随年份变化的学校政策。当前为前端结构示例，接入具体通知前不展示未经核验的发布日期和政策结论。</p><div class="latest-update-list">${updateCards}</div><div class="latest-update-note"><i data-lucide="history"></i><span>正式接入后，每条资讯保留发布单位、发布日期与原始页面，旧政策不覆盖，便于比较历年变化。</span></div></article>`;
}

function renderCampusSection(item) {
  const campusCards = item.campusDetails.map((campus) => `<article class="campus-card"><header><span class="campus-icon"><i data-lucide="school"></i></span><div><strong>${campus.name}</strong><small>${campus.location}</small></div><span>${campus.status}</span></header><dl><div><dt>学院分布</dt><dd>${campus.colleges}</dd></div><div><dt>交通参考</dt><dd>${campus.transport}</dd></div></dl></article>`).join("");
  const cityCards = item.cityReferences.map((reference) => `<article class="city-reference-card"><i data-lucide="${reference.icon}"></i><span>${reference.label}</span><strong>${reference.value}</strong><small>${reference.note}</small></article>`).join("");
  const mediaCards = item.campusMedia.map((media) => `<a class="campus-media-card" href="${media.url}" target="_blank" rel="noopener noreferrer"><span class="campus-media-preview"><i data-lucide="${media.icon}"></i></span><div><strong>${media.title}</strong><p>${media.description}</p><span>${media.status}</span></div><i data-lucide="arrow-up-right"></i></a>`).join("");
  return `<article class="detail-panel campus-panel school-detail-anchor" id="school-campus"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="map-pin"></i>校园与城市</span><h2>先确认校区，再判断生活环境</h2></div><span class="source-level-tag level-institution">平台整理</span></div><p>${item.campusSummary}</p><section class="campus-subsection"><div class="campus-subsection-heading"><div><strong>校区概览</strong><small>学院和交通安排以学校最新发布为准</small></div><span>${item.campusDetails.length} 个校区条目</span></div><div class="campus-grid">${campusCards}</div></section><section class="campus-subsection"><div class="campus-subsection-heading"><div><strong>${item.city}城市参考</strong><small>不填写未经核实的时间和费用数字</small></div></div><div class="city-reference-grid">${cityCards}</div></section><section class="campus-subsection"><div class="campus-subsection-heading"><div><strong>校园媒体</strong><small>仅接入学校官方或明确授权的素材</small></div><span>来源：${item.officialSource}</span></div><div class="campus-media-grid">${mediaCards}</div></section><div class="admission-disclaimer"><i data-lucide="clock-3"></i><span>校园资料更新：${item.updatedAt}。具体校区、宿舍和交通安排需按专业及当年通知确认。</span></div></article>`;
}

function renderSchoolDetail() {
  const panel = $("#schoolDetailContent");
  const item = institutions.find((school) => school.id === currentSchoolDetail) || institutions[0];
  if (!panel || !item) return;
  const saved = userFavorites().includes(`school-${item.id}`);
  const returnCopy = currentSchoolReturnView === "compare" ? "返回我的候选" : "返回院校与经验";
  const schoolCommentSection = renderSchoolCommentSection(item);
  const latestUpdatesSection = renderLatestUpdates(item);
  const campusSection = renderCampusSection(item);
  panel.innerHTML = `<div class="school-detail-topbar"><button class="quiet-button" data-view-target="${currentSchoolReturnView}"><i data-lucide="arrow-left"></i>${escapeHtml(returnCopy)}</button><div class="school-detail-top-actions"><a class="quiet-button" href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link"></i>学校官网</a><button class="primary-button" data-favorite="school-${escapeHtml(item.id)}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入我的候选"}</button></div></div>
    <header class="school-profile-header"><div class="institution-mark school-profile-mark">${escapeHtml(item.school.slice(0, 1))}</div><div class="school-profile-copy"><span class="section-kicker">学校详情 · 平台整理</span><h1>${escapeHtml(item.school)}</h1><p class="school-english-name">${escapeHtml(item.englishName)}</p><div class="school-profile-tags"><span><i data-lucide="map-pin"></i>${escapeHtml(item.city)}</span><span><i data-lucide="landmark"></i>${escapeHtml(item.type)}</span>${item.highlights.map((highlight) => `<span>${escapeHtml(highlight)}</span>`).join("")}</div></div></header>
    <nav class="school-section-nav" aria-label="学校详情目录"><button data-school-anchor="school-overview" class="active">学校概况</button><button data-school-anchor="school-updates">最新资讯</button><button data-school-anchor="school-majors">专业列表</button><button data-school-anchor="school-admission">招生录取</button><button data-school-anchor="school-campus">校园与城市</button><button data-school-anchor="school-progression">升学参考</button><button data-school-anchor="school-comments">本校评论</button></nav>
    <div class="school-detail-grid">
      <section class="school-detail-main">
        <article class="detail-panel detail-overview school-detail-anchor" id="school-overview"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="notebook-tabs"></i>学校概况</span><h2>先建立整体认识</h2></div><span class="source-level-tag level-institution">平台整理</span></div><p>${escapeHtml(item.intro)}</p><dl class="school-facts"><div><dt>中文名称</dt><dd>${escapeHtml(item.school)}</dd></div><div><dt>英文名称</dt><dd>${escapeHtml(item.englishName)}</dd></div><div><dt>办学类型</dt><dd>${escapeHtml(item.type)}</dd></div><div><dt>办学层次</dt><dd>${escapeHtml(item.educationLevel)}</dd></div><div><dt>创办时间</dt><dd>${escapeHtml(item.founded)}</dd></div><div><dt>主要校区</dt><dd>${escapeHtml(item.campuses)}</dd></div></dl><div class="school-source-note"><span><i data-lucide="clock-3"></i>资料更新：${escapeHtml(item.updatedAt)}</span><a href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noopener noreferrer">来源：${escapeHtml(item.officialSource)}<i data-lucide="external-link"></i></a></div></article>
        ${latestUpdatesSection}
        <article class="detail-panel major-program-panel school-detail-anchor" id="school-majors"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="book-open"></i>专业列表</span><h2>查看专业与培养方向</h2></div><span class="source-level-tag level-official">官方信息</span></div><p>${escapeHtml(item.officialSummary)}</p><div class="major-program-search"><i data-lucide="search"></i><input id="schoolMajorSearch" type="search" placeholder="搜索专业名称、学院或学科门类" autocomplete="off"><span id="majorProgramCount">${item.majorPrograms.length} 个示例专业</span></div><div class="major-program-list" id="majorProgramList">${renderMajorPrograms(item)}</div><div class="major-program-foot"><span>当前为页面结构示例,完整目录以学校官方发布为准。</span><a class="source-link" href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link"></i>查看 ${escapeHtml(item.officialSource)}</a></div></article>
        <article class="detail-panel admission-panel school-detail-anchor" id="school-admission"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="graduation-cap"></i>招生与录取</span><h2>按年份和报考条件查资料</h2></div><span class="source-level-tag level-data">公开资料</span></div><p>${escapeHtml(item.admissionBrief)}</p><div class="admission-filter-bar"><label><span>年份</span><select id="admissionYear">${item.admissionYears.map((year) => `<option>${escapeHtml(year)}</option>`).join("")}</select></label><label><span>省份</span><select id="admissionProvince">${item.admissionProvinces.map((province) => `<option>${escapeHtml(province)}</option>`).join("")}</select></label><label><span>科类</span><select id="admissionSubject">${item.admissionSubjects.map((subject) => `<option>${escapeHtml(subject)}</option>`).join("")}</select></label></div><div class="admission-selection-note"><i data-lucide="filter"></i><span id="admissionSelectionNote">当前条件：${escapeHtml(item.admissionYears[0])} · ${escapeHtml(item.admissionProvinces[0])} · ${escapeHtml(item.admissionSubjects[0])}</span><small>前端结构示例,真实查询待数据接口接入</small></div><div class="admission-resource-list">${renderAdmissionResources(item)}</div><div class="admission-disclaimer"><i data-lucide="info"></i><span>${escapeHtml(item.dataSummary)}</span></div></article>
        ${campusSection}
        <article class="detail-panel progression-panel school-detail-anchor" id="school-progression"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="trending-up"></i>升学参考</span><h2>保研率先看统计口径</h2></div><span class="source-level-tag level-data">待核验数据</span></div><p>${escapeHtml(item.careerSummary)}</p><div class="recommendation-summary"><div><span>保研率</span><strong>${escapeHtml(item.postgraduateRecommendation.value)}</strong><small>数据年份：${escapeHtml(item.postgraduateRecommendation.year)}</small></div><div><span>推免人数</span><strong>${escapeHtml(item.postgraduateRecommendation.recommendedCount)}</strong><small>需对应学校公示名单</small></div><div><span>毕业生统计范围</span><strong>${escapeHtml(item.postgraduateRecommendation.graduateScope)}</strong><small>需明确分母范围</small></div></div><dl class="recommendation-method"><div><dt>建议计算口径</dt><dd>${escapeHtml(item.postgraduateRecommendation.methodology)}</dd></div><div><dt>建议来源</dt><dd>${escapeHtml(item.postgraduateRecommendation.source)}</dd></div><div><dt>更新时间</dt><dd>${escapeHtml(item.postgraduateRecommendation.updatedAt)}</dd></div></dl><div class="admission-disclaimer warning"><i data-lucide="triangle-alert"></i><span>不同学院、专业和年份的推免情况可能不同,正式展示时必须保留原始来源与统计范围。</span></div></article>
      </section>
      <aside class="school-detail-side"><section class="detail-source-panel"><span class="subsection-kicker"><i data-lucide="shield-check"></i>信息凭证</span><h2>每条摘要都有来源入口</h2><p>平台负责整理和解释,官方页面与公开数据用于核验具体细节。</p><a class="detail-source-row" href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noopener noreferrer"><span class="source-icon official-icon"><i data-lucide="landmark"></i></span><span><strong>${escapeHtml(item.officialSource)}</strong><small>学校简介 · 招生简章 · 培养信息</small></span><i data-lucide="external-link"></i></a><a class="detail-source-row" href="${escapeHtml(item.dataUrl)}" target="_blank" rel="noopener noreferrer"><span class="source-icon data-icon"><i data-lucide="database"></i></span><span><strong>${escapeHtml(item.dataSource)}</strong><small>招生计划 · 专业目录 · 公开录取信息</small></span><i data-lucide="external-link"></i></a></section>${schoolCommentSection}</aside>
    </div>`;
  hydrateIcons();
}

function renderAnswerHistory() {
  const list = $("#answerList");
  if (!list) return;
  const user = currentUser();
  const history = user ? read(STORE.answers, []).filter((item) => item.userId === user.id) : demoAnswers;
  list.innerHTML = history.length ? history.map((item) => `<article class="question-list-item"><header><strong>${escapeHtml(item.title)}</strong><span class="question-status">${escapeHtml(item.status)}</span></header><p>${escapeHtml(item.meta || `${item.topic || "未分类"} · 已完成回答`)}</p></article>`).join("") : `<div class="qa-empty"><i data-lucide="message-square-off"></i><p>你还没有回答过问题</p><span>完成认证后，可以从左侧问题池选择自己真正经历过的问题。</span></div>`;
  hydrateIcons();
}

function candidateStatusFor(type, key) {
  const user = currentUser();
  if (!user) return candidateStatuses[0];
  return read(STORE.candidateStatus, {})[user.id]?.[`${type}:${key}`] || candidateStatuses[0];
}

function renderCandidateStatusControl(type, key, user) {
  const status = candidateStatusFor(type, key);
  if (!user) return `<span class="candidate-demo-status"><i data-lucide="circle-dashed"></i>示例状态 · ${status}</span>`;
  const options = candidateStatuses.map((item) => `<option${item === status ? " selected" : ""}>${item}</option>`).join("");
  return `<label class="candidate-status-control"><span>判断状态</span><select data-candidate-status data-candidate-status-type="${type}" data-candidate-status-key="${key}" aria-label="修改候选判断状态">${options}</select></label>`;
}

function updateCandidateStatus(type, key, status) {
  const user = currentUser();
  if (!user || !candidateStatuses.includes(status)) return;
  const all = read(STORE.candidateStatus, {});
  all[user.id] = { ...(all[user.id] || {}), [`${type}:${key}`]: status };
  write(STORE.candidateStatus, all);
  renderCompare();
  showToast(`候选状态已更新为“${status}”`);
}

function clearCandidateStatus(type, key) {
  const user = currentUser();
  if (!user) return;
  const all = read(STORE.candidateStatus, {});
  if (!all[user.id]) return;
  delete all[user.id][`${type}:${key}`];
  write(STORE.candidateStatus, all);
}

function toggleSchoolCandidateSelection(id, checked) {
  if (checked && !selectedSchoolCandidateIds.has(id) && selectedSchoolCandidateIds.size >= 3) {
    showToast("一次最多对比 3 所院校");
    renderCompare();
    return;
  }
  if (checked) selectedSchoolCandidateIds.add(id);
  else selectedSchoolCandidateIds.delete(id);
  renderCompare();
}

function toggleMajorCandidateSelection(key, major, checked) {
  if (checked && selectedMajorName && selectedMajorName !== major) {
    showToast("专业优先只能比较同一个专业");
    renderCompare();
    return;
  }
  if (checked && !selectedMajorCandidateKeys.has(key) && selectedMajorCandidateKeys.size >= 3) {
    showToast("一次最多对比 3 个专业组合");
    renderCompare();
    return;
  }
  if (checked) {
    selectedMajorName = major;
    selectedMajorCandidateKeys.add(key);
  } else {
    selectedMajorCandidateKeys.delete(key);
    if (!selectedMajorCandidateKeys.size) selectedMajorName = "";
  }
  renderCompare();
}

function renderSchoolComparison(candidates) {
  const cell = (content) => candidates.map((item) => `<td>${content(item)}</td>`).join("");
  const experienceSummary = (item) => {
    const related = experiences.filter((experience) => experience.school === item.school && experience.source === "student");
    const dimensions = [...new Set(related.flatMap((experience) => experience.dimensions || []))];
    return `<strong>${related.length} 条学生经验</strong><small>${dimensions.length ? dimensions.join(" · ") : "暂无经验维度"}</small>`;
  };
  return `<div class="school-compare-view">
    <div class="school-compare-heading"><div><span class="subsection-kicker"><i data-lucide="columns-3"></i>院校对比</span><h2>${candidates.length} 所候选院校并列查看</h2><p>只呈现已有资料与来源状态，不生成综合评分或推荐结论。</p></div><button class="quiet-button" type="button" data-exit-school-compare><i data-lucide="arrow-left"></i>返回候选列表</button></div>
    <div class="school-compare-table-wrap">
      <table class="school-compare-table">
        <thead><tr><th scope="col">比较维度</th>${candidates.map((item) => `<th scope="col"><span class="compare-school-mark">${item.school.slice(0, 1)}</span><strong>${item.school}</strong><small>${item.city}</small></th>`).join("")}</tr></thead>
        <tbody>
          <tr><th scope="row">我的状态</th>${cell((item) => `<span class="compare-status">${candidateStatusFor("school", item.id)}</span>`)}</tr>
          <tr><th scope="row">院校身份</th>${cell((item) => `<div class="compare-tag-list identity-tags">${(item.identityTags || ["身份标签待更新"]).map((tag) => `<span>${tag}</span>`).join("")}</div><strong>${item.type}</strong><small>${item.identityNote || "重新发起对比后显示最新院校身份"}</small>`)}</tr>
          <tr><th scope="row">城市与校区</th>${cell((item) => `<strong>${item.city} · ${item.campuses}</strong><small>${item.campusDetails.map((campus) => `${campus.name}（${campus.location}）`).join(" · ")}</small>`)}</tr>
          <tr><th scope="row">学科与培养</th>${cell((item) => `<strong>${item.academicProfile || item.intro}</strong><div class="compare-tag-list">${item.majors.slice(0, 3).map((major) => `<span>${major}</span>`).join("")}</div><button class="compare-inline-action" type="button" data-school-detail="${item.id}">查看学校专业<i data-lucide="arrow-up-right"></i></button>`)}</tr>
          <tr><th scope="row">保研与升学</th>${cell((item) => `<strong>保研率：${item.postgraduateRecommendation.value}</strong><small>数据年份：${item.postgraduateRecommendation.year} · ${item.postgraduateRecommendation.methodology}</small>`)}</tr>
          <tr><th scope="row">录取参考</th>${cell((item) => `<strong>${item.admissionReference?.value || "近三年录取位次待接入"}</strong><small>${item.admissionReference?.note || "需按省份、年份、选科和专业组比较"}</small><a class="compare-inline-action" href="${item.dataUrl}" target="_blank" rel="noopener noreferrer">核验公开数据<i data-lucide="external-link"></i></a>`)}</tr>
          <tr><th scope="row">校园与体验</th>${cell((item) => `<strong>${item.campusSummary}</strong>${experienceSummary(item)}`)}</tr>
        </tbody>
      </table>
    </div>
    <div class="compare-disclaimer"><i data-lucide="info"></i><span>“待接入”与“待确认”代表当前样本没有可靠数据，不用估算值补齐。</span></div>
    <div class="compare-next-step school-choice-next"><div><strong>确定一所院校后，继续比较校内专业</strong><span>先选择你想深入了解的学校，再比较这所学校的 2–3 个专业。</span></div><div class="compare-next-school-actions">${candidates.map((item) => `<button class="quiet-button" type="button" data-continue-school-major="${item.id}"><span>${item.school}</span><i data-lucide="arrow-right"></i></button>`).join("")}</div></div>
  </div>`;
}

function majorCombinationFor(school, majorName) {
  const program = school?.majorPrograms.find((item) => item.name === majorName);
  if (!school || !program) return null;
  const relatedExperiences = experiences.filter((item) => item.school === school.school && item.major === program.name);
  return {
    key: majorDecisionKey(school.school, program.name),
    school: school.school,
    schoolId: school.id,
    major: program.name,
    city: school.city,
    academy: program.school,
    category: program.category,
    level: program.level,
    note: program.note,
    officialUrl: program.officialUrl,
    experienceCount: relatedExperiences.length,
    experienceDimensions: [...new Set(relatedExperiences.flatMap((item) => item.dimensions || []))]
  };
}

function renderSchoolMajorSelection(school) {
  const selectedCount = selectedSchoolMajorNames.size;
  return `<div class="school-major-selection-view">
    <div class="school-compare-heading"><div><span class="subsection-kicker"><i data-lucide="list-tree"></i>院校优先 · 第二步</span><h2>比较 ${school.school} 的不同专业</h2><p>学校条件保持不变，只比较该校专业之间的培养与发展差异。</p></div><button class="quiet-button" type="button" data-back-school-comparison><i data-lucide="arrow-left"></i>返回院校对比</button></div>
    <header class="within-school-heading"><span class="candidate-mark">${school.school.slice(0, 1)}</span><div><strong>${school.school}</strong><small>${school.city} · ${school.identityTags.join(" · ")}</small></div></header>
    <div class="school-major-choice-list">${school.majorPrograms.map((program) => `<article class="school-major-choice"><label class="school-major-checkbox"><input type="checkbox" data-select-school-major="${escapeHtml(program.name)}"${selectedSchoolMajorNames.has(program.name) ? " checked" : ""}><span></span></label><div class="school-major-choice-name"><strong>${program.name}</strong><small>${program.school}</small></div><div class="school-major-choice-detail"><p>${program.note}</p><div><span>${program.category}</span><span>${program.level}</span><a href="${program.officialUrl}" target="_blank" rel="noopener noreferrer">专业官方信息<i data-lucide="external-link"></i></a></div></div></article>`).join("")}</div>
    <div class="school-major-selection-actions"><div><strong>已选择 ${selectedCount} / 3</strong><span>请选择 2–3 个专业进行校内比较。</span></div><button class="primary-button" type="button" data-start-school-major-compare${selectedCount < 2 ? " disabled" : ""}><i data-lucide="columns-3"></i>开始校内专业对比</button></div>
  </div>`;
}

function renderMajorComparison(candidates, mode = "same-major") {
  const withinSchool = mode === "within-school";
  const cell = (content) => candidates.map((item) => `<td>${content(item)}</td>`).join("");
  const institutionFor = (item) => institutions.find((school) => school.id === item.schoolId || school.school === item.school);
  const experienceFor = (item) => {
    const related = experiences.filter((experience) => experience.school === item.school && experience.major === item.major && experience.source === "student");
    const signals = [...new Set(related.flatMap((experience) => [...(experience.dimensions || []), ...(experience.tags || [])]))];
    return { related, signals };
  };
  const experienceSignals = (item) => {
    const { related, signals } = experienceFor(item);
    return related.length ? `<div class="compare-tag-list">${signals.slice(0, 5).map((signal) => `<span>${signal}</span>`).join("")}</div><small>${related.length} 条相关学生经验</small>` : `<strong>暂无相关学生经验</strong><small>当前不使用其他专业经验代替</small>`;
  };
  const experienceExcerpt = (item) => {
    const { related } = experienceFor(item);
    return related.length ? `<strong>${related[0].text}</strong><small>${related.length > 1 ? `另有 ${related.length - 1} 条经验可继续查看` : "当前仅收录 1 条经验"}</small>` : `<strong>经验摘要待补充</strong><small>可前往问答中心追问该专业在读体验</small>`;
  };
  const trainingFocus = (item) => `<strong>${item.note || "培养重点待核验"}</strong>${item.officialUrl ? `<a class="compare-inline-action" href="${item.officialUrl}" target="_blank" rel="noopener noreferrer">核对专业官方信息<i data-lucide="external-link"></i></a>` : ""}`;
  const rows = withinSchool ? `
          <tr><th scope="row">我的状态</th>${cell((item) => `<span class="compare-status">${candidateStatusFor("major", item.key)}</span>`)}</tr>
          <tr><th scope="row">所属学院</th>${cell((item) => `<strong>${item.academy || "所属学院待确认"}</strong>`)}</tr>
          <tr><th scope="row">学科门类</th>${cell((item) => `<strong>${item.category || "学科门类待确认"}</strong>`)}</tr>
          <tr><th scope="row">培养重点</th>${cell(trainingFocus)}</tr>
          <tr><th scope="row">学习与实践线索</th>${cell(experienceSignals)}</tr>
          <tr><th scope="row">学生经验摘要</th>${cell(experienceExcerpt)}</tr>` : `
          <tr><th scope="row">我的状态</th>${cell((item) => `<span class="compare-status">${candidateStatusFor("major", item.key)}</span>`)}</tr>
          <tr><th scope="row">学校与学院</th>${cell((item) => `<strong>${item.school}</strong><small>${item.academy || "所属学院待确认"}</small>`)}</tr>
          <tr><th scope="row">院校学科背景</th>${cell((item) => { const school = institutionFor(item); return school ? `<div class="compare-tag-list identity-tags">${school.identityTags.map((tag) => `<span>${tag}</span>`).join("")}</div><strong>${school.academicProfile}</strong>` : `<strong>院校背景待确认</strong>`; })}</tr>
          <tr><th scope="row">培养方向差异</th>${cell(trainingFocus)}</tr>
          <tr><th scope="row">城市与校区</th>${cell((item) => { const school = institutionFor(item); return school ? `<strong>${school.city} · ${school.campuses}</strong><small>具体专业所在校区需继续核验</small>` : `<strong>${item.city}</strong>`; })}</tr>
          <tr><th scope="row">学生经验差异</th>${cell((item) => `${experienceSignals(item)}${experienceExcerpt(item)}`)}</tr>`;
  return `<div class="school-compare-view major-compare-view">
    <div class="school-compare-heading"><div><span class="subsection-kicker"><i data-lucide="book-copy"></i>${withinSchool ? "院校优先 · 校内专业" : "专业优先 · 同专业跨校"}</span><h2>${withinSchool ? `${candidates[0].school} · ${candidates.length} 个专业` : `${candidates.length} 个学校专业组合`}并列查看</h2><p>${withinSchool ? "在同一所学校内比较不同专业，不混入院校层面的重复差异。" : "同一个专业放到不同学校中比较，不生成专业排名或推荐分数。"}</p></div><button class="quiet-button" type="button" data-exit-major-compare><i data-lucide="arrow-left"></i>${withinSchool ? "返回专业选择" : "返回专业列表"}</button></div>
    <div class="school-compare-table-wrap">
      <table class="school-compare-table major-compare-table">
        <thead><tr><th scope="col">比较维度</th>${candidates.map((item) => `<th scope="col"><span class="compare-school-mark major-mark"><i data-lucide="book-open"></i></span><strong>${item.major}</strong><small>${item.school}</small></th>`).join("")}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="compare-disclaimer"><i data-lucide="info"></i><span>${withinSchool ? "学校和城市条件相同，因此不重复占用比较行。" : "培养层次等完全相同的信息不重复占用比较行。"} 核心课程、升学方向和典型岗位将在可靠培养方案与就业资料接入后展示。</span></div>
  </div>`;
}

function comparisonHistoryScope() {
  return currentUser()?.id || "guest";
}

function comparisonHistory() {
  return (read(STORE.compareHistory, {})[comparisonHistoryScope()] || []).filter((item) => item.type !== "school-major");
}

function recordComparison(type, candidates, origin) {
  if (candidates.length < 2) return;
  const all = read(STORE.compareHistory, {});
  const scope = comparisonHistoryScope();
  const history = all[scope] || [];
  const itemKeys = candidates.map((item) => type === "school" ? item.id : item.key).sort();
  const signature = `${type}:${itemKeys.join("|")}`;
  const entry = {
    id: history.find((item) => item.signature === signature)?.id || uid("compare"),
    signature,
    type,
    origin,
    viewedAt: new Date().toISOString(),
    items: JSON.parse(JSON.stringify(candidates))
  };
  all[scope] = [entry, ...history.filter((item) => item.signature !== signature)].slice(0, 12);
  write(STORE.compareHistory, all);
}

function formatComparisonTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "时间待确认";
  return date.toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function renderComparisonHistory() {
  const panel = $("#compareHistoryList");
  if (!panel) return;
  const history = comparisonHistory();
  panel.innerHTML = history.length ? history.map((entry) => {
    const isSchool = entry.type === "school";
    const isWithinSchool = entry.type === "within-school-major";
    const names = entry.items.map((item) => isSchool ? item.school : `${item.school} · ${item.major}`);
    const label = isSchool ? "院校对比" : (isWithinSchool ? "校内专业对比" : "同专业跨校对比");
    return `<article class="compare-history-item"><div class="compare-history-icon"><i data-lucide="${isSchool ? "school" : "book-open"}"></i></div><div><header><strong>${label}</strong><span>${formatComparisonTime(entry.viewedAt)}</span></header><p>${names.join(" / ")}</p><small>${entry.origin || (isSchool ? "院校优先" : "专业优先")}</small></div><div class="compare-history-actions"><button class="text-button" type="button" data-restore-comparison="${entry.id}">重新查看<i data-lucide="arrow-up-right"></i></button><button class="icon-button" type="button" data-delete-comparison="${entry.id}" aria-label="删除这条对比记录"><i data-lucide="trash-2"></i></button></div></article>`;
  }).join("") : `<div class="compare-empty compact"><i data-lucide="history"></i><strong>还没有历史对比</strong><p>真正打开院校或专业对比后，记录会自动出现在这里。</p></div>`;
  hydrateIcons();
}

function openComparisonHistory() {
  renderComparisonHistory();
  openModal("compareHistoryModal");
}

function restoreComparison(id) {
  const entry = comparisonHistory().find((item) => item.id === id);
  if (!entry) return;
  activeHistoryComparison = entry;
  currentCandidateTab = entry.type === "major" ? "major" : "school";
  schoolCompareMode = entry.type === "school";
  schoolMajorSelectionMode = false;
  schoolMajorCompareMode = entry.type === "within-school-major";
  if (entry.type === "within-school-major") {
    schoolMajorTargetSchoolId = entry.items[0]?.schoolId || "";
    selectedSchoolMajorNames.clear();
    entry.items.forEach((item) => selectedSchoolMajorNames.add(item.major));
    currentSchoolMajorResults = entry.items;
  }
  majorCompareMode = entry.type === "major";
  closeModal("compareHistoryModal");
  renderCompare();
}

function deleteComparisonHistory(id) {
  const all = read(STORE.compareHistory, {});
  const scope = comparisonHistoryScope();
  all[scope] = (all[scope] || []).filter((item) => item.id !== id);
  write(STORE.compareHistory, all);
  if (activeHistoryComparison?.id === id) activeHistoryComparison = null;
  renderComparisonHistory();
  showToast("这条历史对比已删除");
}

function renderCompare() {
  const panel = $("#compareContent");
  if (!panel) return;
  const user = currentUser();
  const savedIds = userFavorites();
  const savedExperiences = experiences.filter((item) => savedIds.includes(item.id));
  const savedInstitutions = institutions.filter((item) => savedIds.includes(`school-${item.id}`));
  const majorMap = new Map();
  institutions.forEach((school) => (school.majorPrograms || []).forEach((program) => {
    const favoriteId = majorCandidateId(school.id, program.name);
    if (!savedIds.includes(favoriteId)) return;
    majorMap.set(`${school.school}::${program.name}`, {
      key: majorDecisionKey(school.school, program.name),
      school: school.school,
      schoolId: school.id,
      major: program.name,
      city: school.city,
      academy: program.school,
      category: program.category,
      level: program.level,
      note: program.note,
      officialUrl: program.officialUrl,
      experienceCount: 0,
      experienceDimensions: new Set(),
      dimensions: new Set([program.category, program.level])
    });
  }));
  savedExperiences.forEach((item) => {
    const key = `${item.school}::${item.major}`;
    const school = institutions.find((institution) => institution.school === item.school);
    const program = school?.majorPrograms.find((candidate) => candidate.name === item.major);
    const existing = majorMap.get(key) || {
      key: majorDecisionKey(item.school, item.major),
      school: item.school,
      schoolId: school?.id || "",
      major: item.major,
      city: item.city,
      academy: program?.school || "",
      category: program?.category || "",
      level: program?.level || "",
      note: program?.note || "",
      officialUrl: program?.officialUrl || school?.officialUrl || "",
      experienceCount: 0,
      experienceDimensions: new Set(),
      dimensions: new Set(program ? [program.category, program.level] : [])
    };
    existing.experienceCount += 1;
    (item.dimensions || []).forEach((dimension) => {
      existing.experienceDimensions.add(dimension);
      existing.dimensions.add(dimension);
    });
    majorMap.set(key, existing);
  });
  const savedMajors = [...majorMap.values()].map((item) => ({
    ...item,
    favoriteId: item.schoolId ? majorCandidateId(item.schoolId, item.major) : "",
    saved: true,
    experienceDimensions: [...item.experienceDimensions],
    dimensions: [...item.dimensions]
  }));
  const demoSchools = institutions.slice(0, 3);
  const demoMajors = institutions.slice(0, 3).map((school) => {
    const program = school.majorPrograms.find((item) => item.name === "计算机科学与技术") || school.majorPrograms[0];
    const relatedExperiences = experiences.filter((item) => item.school === school.school && item.major === program.name);
    return {
      key: majorDecisionKey(school.school, program.name),
      school: school.school,
      schoolId: school.id,
      major: program.name,
      city: school.city,
      academy: program.school,
      category: program.category,
      level: program.level,
      note: program.note,
      officialUrl: program.officialUrl,
      favoriteId: majorCandidateId(school.id, program.name),
      saved: false,
      experienceCount: relatedExperiences.length,
      experienceDimensions: [...new Set(relatedExperiences.flatMap((item) => item.dimensions || []))],
      dimensions: [program.category, program.level]
    };
  });
  const schoolCandidates = user ? savedInstitutions : demoSchools;
  const baseMajorCandidates = user ? savedMajors : demoMajors;
  const scopedInstitutions = institutions;
  const allProgramCandidates = scopedInstitutions.flatMap((school) => school.majorPrograms.map((program) => {
    const relatedExperiences = (user ? savedExperiences : experiences).filter((item) => item.school === school.school && item.major === program.name);
    const favoriteId = majorCandidateId(school.id, program.name);
    return {
      key: majorDecisionKey(school.school, program.name),
      school: school.school,
      schoolId: school.id,
      major: program.name,
      city: school.city,
      academy: program.school,
      category: program.category,
      level: program.level,
      note: program.note,
      officialUrl: program.officialUrl,
      favoriteId,
      saved: savedIds.includes(favoriteId),
      experienceCount: relatedExperiences.length,
      experienceDimensions: [...new Set(relatedExperiences.flatMap((item) => item.dimensions || []))],
      dimensions: [program.category, program.level]
    };
  }));
  const availableMajorNames = [...new Set(allProgramCandidates.map((item) => item.major))];
  const normalizedMajorSearch = candidateMajorSearchQuery.trim().toLowerCase();
  const matchingMajorNames = normalizedMajorSearch ? availableMajorNames.filter((name) => name.toLowerCase().includes(normalizedMajorSearch)) : [];
  const activeMajorName = availableMajorNames.find((name) => name.toLowerCase() === normalizedMajorSearch) || (matchingMajorNames.length === 1 ? matchingMajorNames[0] : "");
  const majorCandidates = activeMajorName ? allProgramCandidates.filter((item) => item.major === activeMajorName) : (normalizedMajorSearch ? [] : baseMajorCandidates);
  currentSchoolCandidateResults = schoolCandidates;
  currentMajorCandidateResults = majorCandidates;

  $("#schoolCandidateCount") && ($("#schoolCandidateCount").textContent = schoolCandidates.length);
  $("#majorCandidateCount") && ($("#majorCandidateCount").textContent = baseMajorCandidates.length);
  $$("[data-candidate-tab]").forEach((button) => {
    const active = button.dataset.candidateTab === currentCandidateTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  const activeHistoryMatches = activeHistoryComparison && (activeHistoryComparison.type === currentCandidateTab || (activeHistoryComparison.type === "within-school-major" && currentCandidateTab === "school"));
  if (activeHistoryMatches) {
    panel.innerHTML = activeHistoryComparison.type === "school"
      ? renderSchoolComparison(activeHistoryComparison.items)
      : renderMajorComparison(activeHistoryComparison.items, activeHistoryComparison.type === "within-school-major" ? "within-school" : "same-major");
    hydrateIcons();
    return;
  }

  if (currentCandidateTab === "school") {
    const selectedCandidates = schoolCandidates.filter((item) => selectedSchoolCandidateIds.has(item.id));
    const schoolMajorTarget = institutions.find((item) => item.id === schoolMajorTargetSchoolId);
    if (schoolMajorCompareMode && currentSchoolMajorResults.length >= 2) panel.innerHTML = renderMajorComparison(currentSchoolMajorResults, "within-school");
    else if (schoolMajorSelectionMode && schoolMajorTarget) panel.innerHTML = renderSchoolMajorSelection(schoolMajorTarget);
    else if (schoolCompareMode && selectedCandidates.length >= 2) panel.innerHTML = renderSchoolComparison(selectedCandidates);
    else {
      schoolCompareMode = false;
      schoolMajorSelectionMode = false;
      schoolMajorCompareMode = false;
      panel.innerHTML = schoolCandidates.length ? `<div class="candidate-list-heading"><div><strong>候选院校</strong><span>${user ? `已收藏 ${schoolCandidates.length} 所学校` : "访客示例,登录后保存自己的候选"}</span></div><div class="candidate-compare-toolbar"><span>已选择 <strong>${selectedCandidates.length}</strong> / 3</span><button class="primary-button" type="button" data-start-school-compare${selectedCandidates.length < 2 ? " disabled" : ""}><i data-lucide="columns-3"></i>开始对比</button></div></div><div class="candidate-list">${schoolCandidates.map((item) => `<article class="candidate-row"><label class="candidate-select" aria-label="选择${escapeHtml(item.school)}进行对比"><input type="checkbox" data-select-school-candidate="${escapeHtml(item.id)}"${selectedSchoolCandidateIds.has(item.id) ? " checked" : ""}><span></span></label><div class="candidate-identity"><span class="candidate-mark">${escapeHtml(item.school.slice(0, 1))}</span><div><strong>${escapeHtml(item.school)}</strong><small>${escapeHtml(item.city)} · ${escapeHtml(item.type)}</small></div></div><div class="candidate-summary"><span>重点专业</span><p>${escapeHtml(item.majors.slice(0, 3).join(" · "))}</p><div>${item.highlights.slice(0, 3).map((highlight) => `<span class="content-tag">${escapeHtml(highlight)}</span>`).join("")}</div></div><div class="candidate-actions">${renderCandidateStatusControl("school", item.id, user)}<button class="text-button" type="button" data-school-detail="${escapeHtml(item.id)}">查看详情<i data-lucide="arrow-up-right"></i></button>${user ? `<button class="remove-candidate" type="button" data-remove-school-candidate="${escapeHtml(item.id)}"><i data-lucide="trash-2"></i>移出候选</button>` : `<button class="remove-candidate" type="button" data-open-account><i data-lucide="log-in"></i>登录后保存</button>`}</div></article>`).join("")}</div>` : `<div class="compare-empty"><i data-lucide="school"></i><strong>你还没有收藏学校</strong><p>前往院校与经验页面,将感兴趣的学校加入候选。</p><button class="quiet-button" data-view-target="experience">去查找院校</button></div>`;
    }
  } else {
    const selectedCandidates = majorCandidates.filter((item) => selectedMajorCandidateKeys.has(item.key));
    if (majorCompareMode && selectedCandidates.length >= 2) panel.innerHTML = renderMajorComparison(selectedCandidates);
    else {
      majorCompareMode = false;
      const majorCounts = availableMajorNames.map((name) => ({ name, count: allProgramCandidates.filter((item) => item.major === name).length }));
      const suggestedMajorNames = (normalizedMajorSearch && !activeMajorName ? matchingMajorNames : majorCounts.filter((item) => item.count >= 2).sort((a, b) => b.count - a.count).map((item) => item.name)).slice(0, 6);
      const majorGroups = [...majorCandidates.reduce((groups, item) => {
        if (!groups.has(item.major)) groups.set(item.major, []);
        groups.get(item.major).push(item);
        return groups;
      }, new Map()).entries()];
      const searchSuggestions = suggestedMajorNames.length ? `<div class="major-search-suggestions"><span>${normalizedMajorSearch && !activeMajorName ? "请选择准确专业" : "可比较的同名专业"}</span>${suggestedMajorNames.map((name) => `<button type="button" data-search-major="${escapeHtml(name)}">${escapeHtml(name)}<small>${majorCounts.find((item) => item.name === name)?.count || 0} 所</small></button>`).join("")}</div>` : "";
      const searchPanel = `<section class="major-search-panel"><div><span class="subsection-kicker"><i data-lucide="search"></i>专业优先</span><h2>先确定专业，再比较不同学校</h2><p>输入一个专业名称，结果不会混入其他专业。</p></div><form class="major-search-form" id="candidateMajorSearchForm"><label for="candidateMajorSearch"><i data-lucide="search"></i><input id="candidateMajorSearch" name="major" type="search" value="${escapeHtml(candidateMajorSearchQuery)}" list="candidateMajorOptions" placeholder="例如：计算机科学与技术" autocomplete="off"></label><datalist id="candidateMajorOptions">${availableMajorNames.map((name) => `<option value="${escapeHtml(name)}"></option>`).join("")}</datalist><button class="primary-button" type="submit">查找专业</button>${normalizedMajorSearch ? `<button class="quiet-button" type="button" data-clear-major-search aria-label="清空专业搜索"><i data-lucide="x"></i>清空</button>` : ""}</form>${searchSuggestions}</section>`;
      let majorContent = "";
      if (normalizedMajorSearch && !activeMajorName) {
        majorContent = `<div class="compare-empty compact"><i data-lucide="search-x"></i><strong>${matchingMajorNames.length ? "请选择一个准确的专业名称" : "当前样本没有找到这个专业"}</strong><p>${matchingMajorNames.length ? "上方列出了匹配专业，选择后再比较学校。" : "可以更换关键词，或取消院校范围后重新查找。"}</p></div>`;
      } else if (majorCandidates.length) {
        majorContent = `<div class="candidate-list-heading"><div><strong>${activeMajorName ? `${activeMajorName} · 学校对比范围` : "我的专业候选"}</strong><span>${activeMajorName ? `当前样本收录 ${majorCandidates.length} 所学校` : (user ? `已归入 ${majorCandidates.length} 个学校专业组合` : "访客示例，同一专业下比较不同学校")}</span></div><div class="candidate-compare-toolbar"><span>已选择 <strong>${selectedCandidates.length}</strong> / 3</span><button class="primary-button" type="button" data-start-major-compare${selectedCandidates.length < 2 ? " disabled" : ""}><i data-lucide="columns-3"></i>开始对比</button></div></div>${activeMajorName && majorCandidates.length < 2 ? `<div class="major-result-notice"><i data-lucide="info"></i>当前范围只收录 1 所学校，暂时不能形成同专业对比。</div>` : ""}<div class="major-priority-groups">${majorGroups.map(([major, items]) => `<section class="major-priority-group"><header><div><span class="candidate-mark major-mark"><i data-lucide="book-open"></i></span><div><h3>${major}</h3><p>${items.length} 个学校专业组合</p></div></div><span>官方信息与经验并列查看</span></header><div class="candidate-list">${items.map((item) => `<article class="candidate-row"><label class="candidate-select" aria-label="选择${item.school}${item.major}进行对比"><input type="checkbox" data-select-major-candidate="${item.key}" data-major-name="${escapeHtml(item.major)}"${selectedMajorCandidateKeys.has(item.key) ? " checked" : ""}><span></span></label><div class="candidate-identity"><span class="candidate-mark">${item.school.slice(0, 1)}</span><div><strong>${item.school}</strong><small>${item.academy || "所属学院待确认"} · ${item.city}</small></div></div><div class="candidate-summary"><span>专业参考</span><p>${item.note || "培养方向待接入"}</p><div>${[item.category, item.level, ...item.experienceDimensions].filter(Boolean).slice(0, 3).map((dimension) => `<span class="content-tag">${dimension}</span>`).join("")}</div></div><div class="candidate-actions">${renderCandidateStatusControl("major", item.key, user)}${item.schoolId ? `<button class="text-button" type="button" data-school-detail="${item.schoolId}">查看学校<i data-lucide="arrow-up-right"></i></button>` : ""}${user ? (item.saved ? `<button class="remove-candidate" type="button" data-remove-major-school="${item.school}" data-remove-major-name="${item.major}"><i data-lucide="trash-2"></i>移出候选</button>` : `<button class="save-experience" type="button" data-favorite="${item.favoriteId}"><i data-lucide="bookmark-plus"></i>加入候选</button>`) : `<button class="remove-candidate" type="button" data-open-account><i data-lucide="log-in"></i>登录后保存</button>`}</div></article>`).join("")}</div></section>`).join("")}</div>`;
      } else {
        majorContent = `<div class="compare-empty"><i data-lucide="book-open"></i><strong>你还没有专业候选</strong><p>可以在上方直接搜索专业，或前往学校详情收藏专业。</p><button class="quiet-button" data-view-target="experience">去查找专业</button></div>`;
      }
      panel.innerHTML = `${searchPanel}${majorContent}`;
    }
  }
  hydrateIcons();
}

function switchCandidateTab(name) {
  if (!["school", "major"].includes(name)) return;
  activeHistoryComparison = null;
  currentCandidateTab = name;
  if (name !== "school") {
    schoolCompareMode = false;
    schoolMajorSelectionMode = false;
    schoolMajorCompareMode = false;
  }
  if (name !== "major") majorCompareMode = false;
  renderCompare();
}

function applyMajorSearch(value) {
  candidateMajorSearchQuery = value.trim();
  selectedMajorCandidateKeys.clear();
  selectedMajorName = "";
  majorCompareMode = false;
  activeHistoryComparison = null;
  renderCompare();
}

function continueSchoolComparisonToMajors(schoolId) {
  const school = institutions.find((item) => item.id === schoolId);
  if (!school) return;
  schoolMajorTargetSchoolId = school.id;
  selectedSchoolMajorNames.clear();
  currentSchoolMajorResults = [];
  schoolCompareMode = false;
  schoolMajorSelectionMode = true;
  schoolMajorCompareMode = false;
  activeHistoryComparison = null;
  currentCandidateTab = "school";
  renderCompare();
}

function toggleSchoolMajorSelection(majorName, checked) {
  if (checked && !selectedSchoolMajorNames.has(majorName) && selectedSchoolMajorNames.size >= 3) {
    showToast("一次最多比较 3 个校内专业");
    renderCompare();
    return;
  }
  if (checked) selectedSchoolMajorNames.add(majorName);
  else selectedSchoolMajorNames.delete(majorName);
  renderCompare();
}

function startSchoolMajorComparison() {
  const school = institutions.find((item) => item.id === schoolMajorTargetSchoolId);
  if (!school || selectedSchoolMajorNames.size < 2) {
    showToast("请先选择至少 2 个校内专业");
    return;
  }
  const combinations = [...selectedSchoolMajorNames].map((major) => majorCombinationFor(school, major)).filter(Boolean);
  if (combinations.length < 2) return;
  currentSchoolMajorResults = combinations;
  schoolMajorSelectionMode = false;
  schoolMajorCompareMode = true;
  recordComparison("within-school-major", combinations, `院校优先 · ${school.school}校内专业`);
  renderCompare();
}

function removeSchoolCandidate(id) {
  const user = currentUser();
  if (!user) return;
  const all = read(STORE.favorites, {});
  all[user.id] = (all[user.id] || []).filter((item) => item !== `school-${id}`);
  write(STORE.favorites, all);
  selectedSchoolCandidateIds.delete(id);
  clearCandidateStatus("school", id);
  renderCompare();
  renderExperiences();
  showToast("已从候选院校中移除");
}

function removeMajorCandidate(school, major) {
  const user = currentUser();
  if (!user) return;
  const matchingIds = new Set(experiences.filter((item) => item.school === school && item.major === major).map((item) => item.id));
  const schoolId = institutions.find((item) => item.school === school)?.id;
  const explicitId = schoolId ? majorCandidateId(schoolId, major) : "";
  const all = read(STORE.favorites, {});
  all[user.id] = (all[user.id] || []).filter((item) => item !== explicitId && !matchingIds.has(item));
  write(STORE.favorites, all);
  const decisionKey = majorDecisionKey(school, major);
  selectedMajorCandidateKeys.delete(decisionKey);
  clearCandidateStatus("major", decisionKey);
  renderCompare();
  renderExperiences();
  showToast("已从候选专业中移除");
}

function renderFamily() {
  const user = currentUser();
  const main = $("#familyMainContent");
  if (!main) return;
  if (!user) {
    main.innerHTML = `<div class="family-compact-status"><span class="linked-status inactive"><span></span>未关联</span><small>登录后创建家庭关联</small></div><button class="primary-button" type="button" data-open-account><i data-lucide="log-in"></i>登录后关联</button>`;
  } else {
    const family = read(STORE.family, {})[user.id];
    main.innerHTML = family
      ? `<div class="family-compact-status"><span class="linked-status"><span></span>已创建关联</span><small>邀请码 ${family.code}</small></div><button class="quiet-button" type="button" data-copy-code="${family.code}"><i data-lucide="copy"></i>复制邀请码</button>`
      : `<div class="family-compact-status"><span class="linked-status inactive"><span></span>未关联</span><small>尚未向家庭成员共享候选</small></div><button class="primary-button" type="button" data-family-invite><i data-lucide="user-plus"></i>创建关联</button>`;
  }
  hydrateIcons();
}

function renderTrust() {
  const user = currentUser();
  const card = $("#verificationContent");
  if (!card) return;
  const verification = user ? (read(STORE.verification, {})[user.id] || {}) : {};
  const status = verification.status || "未认证";
  const isVerified = ["已认证", "认证通过"].includes(status);
  const isPending = status === "申请中";
  const completedSteps = !user ? 0 : (isVerified ? 3 : (isPending ? 2 : 1));
  const progress = [0, 34, 67, 100][completedSteps];
  const stateClass = isVerified ? "is-verified" : (isPending ? "is-pending" : "");
  const stateLabel = !user ? "未登录" : (isVerified ? "认证有效" : (isPending ? "审核中" : "待开始"));
  const publicLabel = isVerified
    ? (verification.publicLabel || verification.label || [user.school, user.major, user.graduationYear].filter(Boolean).join(" · ") || `${user.role} · 身份已核验`)
    : "认证后显示学校 · 专业 · 年份";
  const currentIdentity = user ? `${user.role} · ${isVerified ? "已认证" : status}` : "访客 · 未登录";
  const step = (index, label) => `<span class="${completedSteps >= index ? "done" : ""}"><i data-lucide="${completedSteps >= index ? "check" : "circle"}"></i>${label}</span>`;
  let action = `<button class="primary-button full-button verification-action" type="button" data-start-verify><i data-lucide="badge-check"></i>开始认证</button>`;
  let footnote = `<p class="verify-footnote"><i data-lucide="lock-keyhole"></i>后台实名，前台匿名；材料不会在前台公开</p>`;

  if (!user) {
    action = `<button class="primary-button full-button verification-action" type="button" data-open-account><i data-lucide="log-in"></i>登录后认证</button>`;
  } else if (isPending) {
    action = `<div class="verify-notice pending"><span><i data-lucide="circle"></i></span><div><strong>认证申请审核中</strong><small>审核完成前继续保持未认证状态</small></div></div>`;
    footnote = `<p class="verify-footnote"><i data-lucide="lock-keyhole"></i>提交于 ${escapeHtml(formatProfileDate(verification.submittedAt || new Date()))} · 材料仅用于后台核验</p>`;
  } else if (isVerified) {
    action = `<div class="verify-notice"><span><i data-lucide="shield-check"></i></span><div><strong>认证标签已生效</strong><small>现在可以发布带有认证来源的回答</small></div></div>`;
    footnote = `<p class="verify-footnote"><i data-lucide="lock-keyhole"></i>完成认证于 ${escapeHtml(formatProfileDate(verification.verifiedAt || verification.submittedAt || new Date()))} · 前台保持匿名</p>`;
  }

  card.classList.toggle("is-unverified-card", !isVerified && !isPending);
  card.classList.toggle("is-pending-card", isPending);
  card.classList.toggle("is-verified-card", isVerified);
  card.style.setProperty("--verification-progress", `${progress}%`);
  card.innerHTML = `
    <div class="credential-top">
      <div><span>YINLU VERIFIED ID</span><h2>引路可信身份卡</h2></div>
      <span class="status-icon"><i data-lucide="badge-check"></i></span>
    </div>
    <div class="credential-status ${stateClass}">
      <span>当前状态</span><strong>${escapeHtml(currentIdentity)}</strong><b><i data-lucide="${isVerified ? "check" : "circle"}"></i>${escapeHtml(stateLabel)}</b>
    </div>
    <div class="credential-fields">
      <div><span>${isVerified ? "前台认证标签" : "前台显示"}</span><strong>${escapeHtml(publicLabel)}</strong></div>
      <div><span>${isVerified ? "隐私状态" : "后台核验"}</span><strong>${isVerified ? "实名信息仅后台可见" : "实名材料 · 身份证明"}</strong></div>
    </div>
    <div class="verify-progress">
      <div class="progress-title"><span>认证进度</span><strong>${completedSteps} / 3</strong></div>
      <div class="progress-track"><span></span></div>
      <div class="verify-steps">${step(1, "确认身份")}${step(2, "提交材料")}${step(3, "等待核验")}</div>
    </div>
    ${action}
    ${footnote}`;
  hydrateIcons();
}

function updateAccountHeader() {
  const user = currentUser();
  const accountButton = $("#accountButton");
  setUserAvatar(accountButton, user);
  const profileNameEl = $("#profileName");
  if (profileNameEl) profileNameEl.textContent = user ? user.nickname : "访客浏览";
  renderQuestions(); renderAnswerHistory(); renderExperiences(); renderCompare(); renderFamily(); renderTrust();
}

function populateProfile(user) {
  if (!user) return;
  const createdAt = userCreatedAt(user);
  const createdDate = formatProfileDate(createdAt);
  const { province, city } = userRegionParts(user);
  const region = [province, city].filter(Boolean).join(" ") || String(user.region || "").trim();
  const birthDate = String(user.birthDate || "");
  const age = ageFromBirthDate(birthDate);
  $("#profileSummaryName") && ($("#profileSummaryName").textContent = user.nickname);
  $("#profileSummaryMeta") && ($("#profileSummaryMeta").textContent = `${user.role} · ${user.email}`);
  $("#profileSummaryRegion") && ($("#profileSummaryRegion").textContent = region || "地域未设置");
  $("#profileSummaryAge") && ($("#profileSummaryAge").textContent = age === null ? "年龄未设置" : `${age} 岁`);
  $("#profileCreatedAt") && ($("#profileCreatedAt").textContent = createdDate);
  setUserAvatar($("#profileAvatarLarge"), user);
  $("#profileAvatarRemove")?.classList.toggle("hidden", !user.avatarDataUrl);
  $("#profileNameInput") && ($("#profileNameInput").value = user.nickname);
  $("#profileRoleInput") && ($("#profileRoleInput").value = user.role);
  setRegionOptions(province, city);
  const birthDateInput = $("#profileBirthDateInput");
  if (birthDateInput) {
    birthDateInput.max = todayDateValue();
    birthDateInput.value = birthDate;
  }
  updateProfileAge();
  $("#profileCreatedAtInput") && ($("#profileCreatedAtInput").value = createdDate);
  $("#profileEmailInput") && ($("#profileEmailInput").value = user.email);
  $("#profileStageInput") && ($("#profileStageInput").value = user.stage);
  $("#profileQuestionCount") && ($("#profileQuestionCount").textContent = read(STORE.questions, []).filter((item) => item.userId === user.id).length);
  $("#profileFavoriteCount") && ($("#profileFavoriteCount").textContent = userFavorites().length);
  $("#profileFamilyCode") && ($("#profileFamilyCode").textContent = read(STORE.family, {})[user.id]?.code || "未生成");
}

function showAccount() {
  const user = currentUser();
  const authPanel = $("#authPanel");
  const profilePanel = $("#profilePanel");
  if (authPanel) authPanel.classList.toggle("hidden", Boolean(user));
  if (profilePanel) profilePanel.classList.toggle("hidden", !user);
  if (!user) {
    $$(".auth-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.authTab === "login"));
    $("#loginForm")?.classList.remove("hidden");
    $("#registerForm")?.classList.add("hidden");
  }
  if (user) {
    populateProfile(user);
  }
  openModal("accountModal"); hydrateIcons();
}

function requireAuth(message = "登录后才能使用这个功能") { if (currentUser()) return true; showAccount(); showToast(message); return false; }

async function register(event) {
  event.preventDefault();
  const name = $("#registerName")?.value.trim() || "";
  const email = $("#registerEmail").value.trim().toLowerCase();
  const password = $("#registerPassword").value;
  const users = read(STORE.users, []);
  if (users.some((user) => user.email === email)) {
    showToast("这个邮箱已经注册，请直接登录");
    $("[data-auth-tab=login]")?.click();
    $("#loginEmail").value = email;
    return;
  }
  // ✅ 使用SHA-256哈希存储密码
  const passwordRecord = await createPasswordRecord(password);
  const user = {
    id: uid("user"),
    nickname: name || `用户${Date.now()}`,
    email,
    passwordSalt: passwordRecord.passwordSalt,
    passwordHash: passwordRecord.passwordHash,
    role: $("#registerRole")?.value || "学生",
    stage: $("#registerStage")?.value || "高考志愿",
    createdAt: new Date().toISOString()
  };
  write(STORE.users, [...users, user]);
  localStorage.setItem(STORE.session, user.id);
  $("#registerForm")?.reset();
  closeModal("accountModal");
  updateAccountHeader();
  showToast(`欢迎加入引路，${user.nickname}`);
}

async function login(event) {
  event.preventDefault();
  const email = $("#loginEmail").value.trim().toLowerCase();
  const password = $("#loginPassword").value;
  const users = read(STORE.users, []);
  const user = users.find((item) => item.email === email);

  if (!user) {
    showToast("邮箱或密码不正确，请检查后重试");
    return;
  }

  // ✅ 兼容旧版明文密码和新版哈希密码
  let isValidPassword = false;
  if (user.passwordHash && user.passwordSalt) {
    // 新版：使用SHA-256验证
    isValidPassword = await passwordMatches(user, password);
  } else if (user.password) {
    // 旧版：明文密码（兼容性）
    isValidPassword = user.password === password;
    // 自动升级为哈希密码
    if (isValidPassword) {
      const passwordRecord = await createPasswordRecord(password);
      const updatedUsers = users.map(u => u.id === user.id ? {
        ...u,
        passwordSalt: passwordRecord.passwordSalt,
        passwordHash: passwordRecord.passwordHash,
        password: undefined
      } : u);
      write(STORE.users, updatedUsers);
    }
  }

  if (!isValidPassword) {
    showToast("邮箱或密码不正确，请检查后重试");
    return;
  }

  localStorage.setItem(STORE.session, user.id);
  closeModal("accountModal");
  updateAccountHeader();
  showToast(`欢迎回来，${user.nickname}`);
}

function saveProfile(event) {
  event.preventDefault();
  const user = currentUser();
  if (!user) return;
  const nicknameInput = $("#profileNameInput");
  const nickname = nicknameInput?.value.trim() || "";
  if (!nickname) {
    showToast("昵称不能为空");
    nicknameInput?.focus();
    return;
  }
  const province = $("#profileProvinceInput")?.value || "";
  const city = $("#profileCityInput")?.value || "";
  const birthDateInput = $("#profileBirthDateInput");
  const birthDate = birthDateInput?.value || "";
  if (birthDate && ageFromBirthDate(birthDate) === null) {
    showToast("请填写有效的出生日期");
    birthDateInput?.focus();
    return;
  }
  const updatedUser = updateCurrentUser({
    nickname,
    role: $("#profileRoleInput")?.value || user.role,
    region: [province, city].filter(Boolean).join(" "),
    regionProvince: province,
    regionCity: city,
    birthDate,
    stage: $("#profileStageInput")?.value || user.stage,
    createdAt: user.createdAt || userCreatedAt(user).toISOString()
  });
  if (!updatedUser) return;
  updateAccountHeader();
  populateProfile(updatedUser);
  showToast("个人资料已保存");
}

async function changeProfileAvatar(event) {
  const input = event.currentTarget;
  const file = input.files?.[0];
  if (!file) return;
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
    showToast("请选择 JPG、PNG 或 WebP 图片");
    input.value = "";
    return;
  }
  if (file.size > AVATAR_MAX_FILE_SIZE) {
    showToast("头像图片不能超过 5 MB");
    input.value = "";
    return;
  }
  try {
    const dataUrl = await avatarDataUrl(file);
    const updatedUser = updateCurrentUser({ avatarDataUrl: dataUrl });
    if (updatedUser) {
      updateAccountHeader();
      setUserAvatar($("#profileAvatarLarge"), updatedUser);
      $("#profileAvatarRemove")?.classList.remove("hidden");
      showToast("头像已更新");
    }
  } catch (error) {
    showToast("头像读取失败，请换一张图片重试");
  } finally {
    input.value = "";
  }
}

function removeProfileAvatar() {
  const updatedUser = updateCurrentUser({ avatarDataUrl: "" });
  if (!updatedUser) return;
  updateAccountHeader();
  setUserAvatar($("#profileAvatarLarge"), updatedUser);
  $("#profileAvatarRemove")?.classList.add("hidden");
  showToast("已恢复默认头像");
}

function submitQuestion() {
  if (!requireAuth("登录后才能发布匿名问题")) return;
  const input = $("#questionInput"); const value = input?.value.trim() || ""; if (value.length < 8) { showToast("请把问题写得再具体一点"); input?.focus(); return; }
  const user = currentUser(); const all = read(STORE.questions, []); all.unshift({ id: uid("question"), userId: user.id, title: value, topic: $("#questionTopic")?.value || "未分类", stage: $("#questionStage")?.value || "高考志愿", status: "等待回答", createdAt: new Date().toISOString(), answers: [] }); write(STORE.questions, all);
  input.value = ""; closeModal("questionModal"); renderQuestions(); showToast("匿名问题已发布，正在匹配认证回答者");
}

function submitInlineQuestion() {
  if (!requireAuth("登录后才能发布匿名问题")) return;
  const input = $("#questionInputPreview");
  const value = input?.value.trim() || "";
  if (value.length < 8) {
    showToast("请把问题写得再具体一点");
    input?.focus();
    return;
  }
  const user = currentUser();
  const all = read(STORE.questions, []);
  all.unshift({
    id: uid("question"),
    userId: user.id,
    title: value,
    topic: $("#questionTopicPreview")?.value || "未分类",
    stage: $("#questionStagePreview")?.value || "高考志愿",
    status: "等待回答",
    createdAt: new Date().toISOString(),
    answers: []
  });
  write(STORE.questions, all);
  input.value = "";
  renderQuestions();
  switchQaTab("ask");
  showToast("匿名问题已发布，正在匹配认证回答者");
}

function toggleFavorite(id) {
  if (!requireAuth("登录后才能保存候选")) return;
  const user = currentUser(); const all = read(STORE.favorites, {}); const list = all[user.id] || []; all[user.id] = list.includes(id) ? list.filter((item) => item !== id) : [...list, id]; write(STORE.favorites, all); renderExperiences(); renderCompare(); if ($("#view-school-detail")?.classList.contains("active")) renderSchoolDetail(); showToast(all[user.id].includes(id) ? "已加入候选" : "已从候选移除");
}

// ✅ 完整的家庭功能（从第三组集成）
function generateFamilyInvite() {
  if (!requireAuth("登录后才能创建家庭关联")) return;
  const user = currentUser();
  const all = read(STORE.family, {});

  // 只有学生可以生成邀请码
  if (user.role !== "学生") {
    showToast("只有学生可以生成家庭邀请码");
    return;
  }

  if (!all[user.id]) {
    // 使用8位随机字符，更安全
    const code = `YL-${Array.from({ length: 8 }, () =>
      Math.random().toString(36).charAt(2).toUpperCase()
    ).join('')}`;

    all[user.id] = {
      code,
      owner: user.id,
      parents: [],
      status: "waiting",
      createdAt: new Date().toISOString()
    };
  }

  write(STORE.family, all);
  renderFamily();
  showToast("家庭邀请码已生成");
}

function joinFamilyInvite(code) {
  if (!requireAuth("登录后才能加入家庭")) return;

  const user = currentUser();

  // 只有家长可以加入
  if (user.role !== "家长") {
    showToast("只有家长可以使用邀请码加入家庭");
    return;
  }

  if (!code || code.trim().length === 0) {
    showToast("请输入邀请码");
    return;
  }

  const all = read(STORE.family, {});
  let targetUserId = null;

  // 查找匹配的邀请码
  Object.keys(all).forEach(userId => {
    if (all[userId].code === code.trim().toUpperCase()) {
      targetUserId = userId;
    }
  });

  if (!targetUserId) {
    showToast("邀请码不存在或已过期");
    return;
  }

  const family = all[targetUserId];

  // 检查是否已经加入
  if (family.parents && family.parents.includes(user.id)) {
    showToast("您已经加入了这个家庭");
    return;
  }

  // 添加家长到家庭
  if (!family.parents) family.parents = [];
  family.parents.push(user.id);
  family.status = "linked";
  family.linkedAt = new Date().toISOString();

  write(STORE.family, all);
  renderFamily();
  showToast("家庭关联成功");
}

function requestVerification() {
  if (!requireAuth("登录后才能提交认证申请")) return;
  const user = currentUser(); const all = read(STORE.verification, {}); if (!all[user.id]) all[user.id] = { status: "申请中", submittedAt: new Date().toISOString() }; write(STORE.verification, all); renderTrust(); showToast("认证申请已提交");
}

function submitSchoolComment(event) {
  event.preventDefault();
  showToast("正式版本将由后端校验本校身份后发布评论");
}

function copyText(value) { navigator.clipboard?.writeText(value).then(() => showToast("邀请码已复制")).catch(() => showToast(`邀请码：${value}`)); }

function scrollToAnchor(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function switchQaTab(name) {
  const ask = $("#qaAskSection");
  const answer = $("#qaAnswerSection");
  const active = name === "answer" ? "answer" : "ask";
  ask?.classList.toggle("hidden", active !== "ask");
  answer?.classList.toggle("hidden", active !== "answer");
  $$(".auth-tab[data-qa-tab]").forEach((button) => button.classList.toggle("active", button.dataset.qaTab === name));
  if (active === "answer") renderAnswerHistory();
}

// 事件委托保留，但同时安全绑定核心按钮以避免空引用错误
document.addEventListener("click", (event) => {
  const petAvatar = event.target.closest("#cyberPetAvatarMenu [data-pet-avatar]");
  if (petAvatar) {
    setCyberPetAvatar(petAvatar.dataset.petAvatar, { notify: true });
    setCyberPetAvatarMenu(false);
    if (event.detail === 0) $("#cyberPetToggle")?.focus();
    return;
  }
  const petAction = event.target.closest("[data-pet-action]");
  if (petAction) { handleCyberPetAction(petAction.dataset.petAction); return; }
  const experienceLayout = event.target.closest("[data-experience-layout]");
  if (experienceLayout) { applyExperienceLayout(experienceLayout.dataset.experienceLayout, { notify: true }); return; }
  const experienceContentTab = event.target.closest("[data-experience-content-tab]");
  if (experienceContentTab) { switchExperienceContentTab(experienceContentTab.dataset.experienceContentTab); return; }
  const regionToggle = event.target.closest("[data-region-toggle]");
  if (regionToggle) {
    const library = regionToggle.dataset.regionToggle;
    if (library === "institution") {
      currentInstitutionRegionOpen = !currentInstitutionRegionOpen;
      currentInstitutionMajorOpen = false;
    } else {
      currentExperienceRegionOpen = !currentExperienceRegionOpen;
      currentExperienceMajorOpen = false;
    }
    renderLibraryRegionPicker(library);
    renderLibraryMajorPicker(library);
    if ((library === "institution" ? currentInstitutionRegionOpen : currentExperienceRegionOpen)) {
      window.setTimeout(() => $(`#${library}RegionSearch`)?.focus(), 0);
    }
    return;
  }
  const regionLetter = event.target.closest("[data-region-letter]");
  if (regionLetter) {
    const library = regionLetter.dataset.regionLibrary;
    if (library === "institution") {
      currentInstitutionRegionLetter = regionLetter.dataset.regionLetter;
      currentInstitutionRegionSearch = "";
      currentInstitutionRegionOpen = true;
    } else {
      currentExperienceRegionLetter = regionLetter.dataset.regionLetter;
      currentExperienceRegionSearch = "";
      currentExperienceRegionOpen = true;
    }
    renderLibraryRegionPicker(library);
    return;
  }
  const libraryRegion = event.target.closest("[data-library-region]");
  if (libraryRegion) {
    const library = libraryRegion.dataset.libraryRegion;
    const province = libraryRegion.dataset.regionProvince || "";
    const city = libraryRegion.dataset.regionCity || "";
    const selection = makeRegionSelection(province, city);
    const shouldClose = Boolean(city || isMunicipality(province) || libraryRegion.hasAttribute("data-region-scope-all") || !province);
    if (library === "institution") {
      currentInstitutionRegion = selection;
      currentInstitutionRegionSearch = "";
      currentInstitutionRegionLetter = province ? REGION_INITIAL_BY_PROVINCE[province] || "" : "";
      currentInstitutionRegionOpen = !shouldClose;
    } else {
      currentExperienceRegion = selection;
      currentExperienceRegionSearch = "";
      currentExperienceRegionLetter = province ? REGION_INITIAL_BY_PROVINCE[province] || "" : "";
      currentExperienceRegionOpen = !shouldClose;
    }
    renderExperiences();
    return;
  }
  const majorToggle = event.target.closest("[data-major-toggle]");
  if (majorToggle) {
    const library = majorToggle.dataset.majorToggle;
    if (library === "institution") {
      currentInstitutionMajorOpen = !currentInstitutionMajorOpen;
      currentInstitutionRegionOpen = false;
    } else {
      currentExperienceMajorOpen = !currentExperienceMajorOpen;
      currentExperienceRegionOpen = false;
    }
    renderLibraryMajorPicker(library);
    renderLibraryRegionPicker(library);
    if (library === "institution" ? currentInstitutionMajorOpen : currentExperienceMajorOpen) window.setTimeout(() => $(`#${library}MajorSearch`)?.focus(), 0);
    return;
  }
  const majorCategory = event.target.closest("[data-major-category]");
  if (majorCategory) {
    const library = majorCategory.dataset.majorLibrary;
    const category = majorCategory.dataset.majorCategory;
    if (library === "institution") {
      currentInstitutionMajorCategory = currentInstitutionMajorCategory === category ? "" : category;
      currentInstitutionMajorOpen = true;
    } else {
      currentExperienceMajorCategory = currentExperienceMajorCategory === category ? "" : category;
      currentExperienceMajorOpen = true;
    }
    renderLibraryMajorPicker(library);
    return;
  }
  const majorOption = event.target.closest("[data-major-option]");
  if (majorOption) {
    const library = majorOption.dataset.majorLibrary;
    const value = majorOption.dataset.majorOption;
    if (library === "institution") {
      currentInstitutionMajorSearch = value;
      currentInstitutionMajorOpen = false;
      currentInstitutionMajorCategory = majorCategoryForName(value);
    } else {
      currentMajorSearch = value;
      currentExperienceMajorOpen = false;
      currentExperienceMajorCategory = majorCategoryForName(value);
    }
    renderExperiences();
    return;
  }
  if ((currentInstitutionRegionOpen || currentExperienceRegionOpen || currentInstitutionMajorOpen || currentExperienceMajorOpen) && !event.target.closest(".library-region-index") && !event.target.closest(".library-major-picker")) {
    currentInstitutionRegionOpen = false;
    currentExperienceRegionOpen = false;
    currentInstitutionMajorOpen = false;
    currentExperienceMajorOpen = false;
    renderLibraryRegionPicker("institution");
    renderLibraryRegionPicker("experience");
    renderLibraryMajorPicker("institution");
    renderLibraryMajorPicker("experience");
  }
  const calendarShift = event.target.closest("[data-calendar-shift]");
  if (calendarShift) { shiftDecisionCalendar(Number(calendarShift.dataset.calendarShift)); return; }
  const calendarDate = event.target.closest("[data-calendar-date]");
  if (calendarDate) { selectDecisionDate(calendarDate.dataset.calendarDate); return; }
  const deleteDecision = event.target.closest("[data-delete-decision-event]");
  if (deleteDecision) { deleteDecisionEvent(deleteDecision.dataset.deleteDecisionEvent); return; }
  const nav = event.target.closest("[data-view]"); if (nav) { switchView(nav.dataset.view); return; }
  const targetView = event.target.closest("[data-view-target]"); if (targetView) { switchView(targetView.dataset.viewTarget); return; }
  const schoolDetail = event.target.closest("[data-school-detail]"); if (schoolDetail) {
    const activeView = $(".view.active")?.id.replace("view-", "");
    if (activeView && activeView !== "school-detail") currentSchoolReturnView = activeView;
    currentSchoolDetail = schoolDetail.dataset.schoolDetail;
    switchView("school-detail");
    return;
  }
  const schoolAnchor = event.target.closest("[data-school-anchor]"); if (schoolAnchor) { scrollToAnchor(schoolAnchor.dataset.schoolAnchor); $$("[data-school-anchor]").forEach((button) => button.classList.toggle("active", button === schoolAnchor)); return; }
  const modalTrigger = event.target.closest("[data-open-modal]"); if (modalTrigger) { openModal(modalTrigger.dataset.openModal); return; }
  if (event.target.closest("[data-open-account]")) { showAccount(); return; }
  const candidateTab = event.target.closest("[data-candidate-tab]"); if (candidateTab) { switchCandidateTab(candidateTab.dataset.candidateTab); return; }
  if (event.target.closest("[data-open-compare-history]")) { openComparisonHistory(); return; }
  const restoreComparisonButton = event.target.closest("[data-restore-comparison]"); if (restoreComparisonButton) { restoreComparison(restoreComparisonButton.dataset.restoreComparison); return; }
  const deleteComparisonButton = event.target.closest("[data-delete-comparison]"); if (deleteComparisonButton) { deleteComparisonHistory(deleteComparisonButton.dataset.deleteComparison); return; }
  if (event.target.closest("[data-start-school-compare]")) {
    const candidates = currentSchoolCandidateResults.filter((item) => selectedSchoolCandidateIds.has(item.id));
    if (candidates.length < 2) { showToast("请至少选择 2 所院校"); return; }
    activeHistoryComparison = null;
    recordComparison("school", candidates, "院校优先");
    schoolCompareMode = true;
    renderCompare();
    return;
  }
  if (event.target.closest("[data-exit-school-compare]")) { activeHistoryComparison = null; schoolCompareMode = false; renderCompare(); return; }
  const continueSchoolMajor = event.target.closest("[data-continue-school-major]"); if (continueSchoolMajor) { continueSchoolComparisonToMajors(continueSchoolMajor.dataset.continueSchoolMajor); return; }
  if (event.target.closest("[data-back-school-comparison]")) { schoolMajorSelectionMode = false; schoolMajorCompareMode = false; schoolCompareMode = true; renderCompare(); return; }
  if (event.target.closest("[data-start-school-major-compare]")) { startSchoolMajorComparison(); return; }
  if (event.target.closest("[data-start-major-compare]")) {
    const candidates = currentMajorCandidateResults.filter((item) => selectedMajorCandidateKeys.has(item.key));
    if (candidates.length < 2) { showToast("请至少选择 2 个专业组合"); return; }
    activeHistoryComparison = null;
    recordComparison("major", candidates, "专业优先搜索");
    majorCompareMode = true;
    renderCompare();
    return;
  }
  if (event.target.closest("[data-exit-major-compare]")) {
    activeHistoryComparison = null;
    if (currentCandidateTab === "school") {
      schoolMajorCompareMode = false;
      schoolMajorSelectionMode = true;
    } else {
      majorCompareMode = false;
    }
    renderCompare();
    return;
  }
  const majorSearchSuggestion = event.target.closest("[data-search-major]"); if (majorSearchSuggestion) { applyMajorSearch(majorSearchSuggestion.dataset.searchMajor); return; }
  if (event.target.closest("[data-clear-major-search]")) { applyMajorSearch(""); return; }
  const removeSchool = event.target.closest("[data-remove-school-candidate]"); if (removeSchool) { removeSchoolCandidate(removeSchool.dataset.removeSchoolCandidate); return; }
  const removeMajor = event.target.closest("[data-remove-major-school]"); if (removeMajor) { removeMajorCandidate(removeMajor.dataset.removeMajorSchool, removeMajor.dataset.removeMajorName); return; }
  const modalCloser = event.target.closest("[data-close-modal]"); if (modalCloser) { closeModal(modalCloser.dataset.closeModal); return; }
  if (event.target.classList.contains("modal-backdrop")) closeModal(event.target.id);
  const favorite = event.target.closest("[data-favorite]"); if (favorite) { toggleFavorite(favorite.dataset.favorite); return; }
  if (event.target.closest("[data-family-invite]")) { generateFamilyInvite(); return; }
  const joinFamily = event.target.closest("#joinFamily");
  if (joinFamily) {
    const code = document.querySelector("#familyCodeInput")?.value.trim();
    joinFamilyInvite(code);
    return;
  }
  const code = event.target.closest("[data-copy-code]"); if (code) { copyText(code.dataset.copyCode); return; }
  if (event.target.closest("[data-start-verify]")) { requestVerification(); return; }
  if (event.target.closest("[data-report-comment]")) { showToast("已记录举报，正式版本将进入内容审核流程"); return; }
  if (event.target.closest("[data-share-candidates]")) { showToast("候选清单分享功能将在正式后端版本开放"); return; }
  if (event.target.closest("[data-clear-search]")) { $("#clearExperienceFilters")?.click(); return; }
  const authTab = event.target.closest("[data-auth-tab]"); if (authTab) { $$(".auth-tab").forEach((tab) => tab.classList.toggle("active", tab === authTab)); $("#loginForm").classList.toggle("hidden"); $("#registerForm").classList.toggle("hidden"); return; }
  const qaTab = event.target.closest("[data-qa-tab]"); if (qaTab) { switchQaTab(qaTab.dataset.qaTab); return; }
});

document.addEventListener("input", (event) => {
  if (event.target.id !== "schoolMajorSearch") return;
  const item = institutions.find((school) => school.id === currentSchoolDetail);
  if (!item) return;
  const query = event.target.value;
  const list = $("#majorProgramList");
  const count = $("#majorProgramCount");
  const matches = item.majorPrograms.filter((program) => !query.trim() || `${program.name}${program.school}${program.category}${program.note}`.toLowerCase().includes(query.trim().toLowerCase()));
  if (list) list.innerHTML = renderMajorPrograms(item, query);
  if (count) count.textContent = `${matches.length} 个匹配专业`;
  hydrateIcons();
});

document.addEventListener("change", (event) => {
  if (event.target.id === "cyberPetReduceMotion") {
    setCyberPetMotionReduced(event.target.checked);
    showToast(event.target.checked ? "已减少宠物动态效果" : "已恢复宠物动态效果");
    return;
  }
  if (event.target.id === "decisionEventDate") {
    selectDecisionDate(event.target.value);
    return;
  }
  if (event.target.matches("[data-select-school-candidate]")) {
    toggleSchoolCandidateSelection(event.target.dataset.selectSchoolCandidate, event.target.checked);
    return;
  }
  if (event.target.matches("[data-select-major-candidate]")) {
    toggleMajorCandidateSelection(event.target.dataset.selectMajorCandidate, event.target.dataset.majorName, event.target.checked);
    return;
  }
  if (event.target.matches("[data-select-school-major]")) {
    toggleSchoolMajorSelection(event.target.dataset.selectSchoolMajor, event.target.checked);
    return;
  }
  if (event.target.matches("[data-candidate-status]")) {
    updateCandidateStatus(event.target.dataset.candidateStatusType, event.target.dataset.candidateStatusKey, event.target.value);
    return;
  }
  if (!["admissionYear", "admissionProvince", "admissionSubject"].includes(event.target.id)) return;
  const note = $("#admissionSelectionNote");
  if (note) note.textContent = `当前条件：${$("#admissionYear")?.value || "年份"} · ${$("#admissionProvince")?.value || "省份"} · ${$("#admissionSubject")?.value || "科类"}`;
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "cyberPetComposer") {
    submitCyberPetQuestion(event);
    return;
  }
  if (event.target.id === "cyberPetReport") {
    submitCyberPetReport(event);
    return;
  }
  if (event.target.id === "decisionEventForm") {
    addDecisionEvent(event);
    return;
  }
  if (event.target.id === "candidateMajorSearchForm") {
    event.preventDefault();
    applyMajorSearch(new FormData(event.target).get("major") || "");
    return;
  }
  if (event.target.id === "schoolCommentForm") submitSchoolComment(event);
});

// 安全绑定核心交互（检查元素存在后绑定）
const menuButton = $("#menuButton"); if (menuButton) menuButton.addEventListener("click", () => $("#sidebar").classList.toggle("open"));
const accountButton = $("#accountButton"); if (accountButton) accountButton.addEventListener("click", showAccount);
const onboardingReplayButton = $("#onboardingReplayButton"); if (onboardingReplayButton) onboardingReplayButton.addEventListener("click", () => startOnboarding({ force: true }));
const notifyButton = $("#notifyButton"); if (notifyButton) notifyButton.addEventListener("click", () => showToast(currentUser() ? "暂无新的认证回答" : "登录后可查看你的通知"));
const decisionCalendarButton = $("#decisionCalendarButton"); if (decisionCalendarButton) decisionCalendarButton.addEventListener("click", openDecisionCalendar);
const cyberPetToggle = $("#cyberPetToggle"); if (cyberPetToggle) cyberPetToggle.addEventListener("click", () => {
  if (cyberPetSuppressClick) { cyberPetSuppressClick = false; return; }
  setCyberPetAvatarMenu(false);
  setCyberPetOpen($("#cyberPetPanel")?.hidden !== false);
});
const cyberPetClose = $("#cyberPetClose"); if (cyberPetClose) cyberPetClose.addEventListener("click", () => setCyberPetOpen(false));
const themeButton = $("#themeButton"); if (themeButton) themeButton.addEventListener("click", (event) => { event.stopPropagation(); setThemeMenu(themeButton.getAttribute("aria-expanded") !== "true"); });
$$('[data-theme-option]').forEach((button) => button.addEventListener("click", () => { applyTheme(button.dataset.themeOption, { persist: true, notify: true }); setThemeMenu(false); }));
document.addEventListener("click", (event) => { if (!event.target.closest(".theme-control")) setThemeMenu(false); });
document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest("#cyberPetAvatarMenu") && !event.target.closest("#cyberPetToggle")) setCyberPetAvatarMenu(false);
});
const sameSchoolToggle = $("#sameSchoolToggle"); if (sameSchoolToggle) sameSchoolToggle.addEventListener("change", renderExperiences);
const submitQuestionBtn = $("#submitQuestion"); if (submitQuestionBtn) submitQuestionBtn.addEventListener("click", submitQuestion);
const inviteFamilyBtn = $("#inviteFamily"); if (inviteFamilyBtn) inviteFamilyBtn.addEventListener("click", generateFamilyInvite);
const submitPreviewQuestion = $("#submitPreviewQuestion"); if (submitPreviewQuestion) submitPreviewQuestion.addEventListener("click", submitInlineQuestion);
const loginFormEl = $("#loginForm"); if (loginFormEl) loginFormEl.addEventListener("submit", login);
const registerFormEl = $("#registerForm"); if (registerFormEl) registerFormEl.addEventListener("submit", register);
const profileFormEl = $("#profileForm"); if (profileFormEl) profileFormEl.addEventListener("submit", saveProfile);
const profileAvatarInput = $("#profileAvatarInput"); if (profileAvatarInput) profileAvatarInput.addEventListener("change", changeProfileAvatar);
const profileAvatarButton = $("#profileAvatarButton"); if (profileAvatarButton) profileAvatarButton.addEventListener("click", () => profileAvatarInput?.click());
const profileAvatarUpload = $("#profileAvatarUpload"); if (profileAvatarUpload) profileAvatarUpload.addEventListener("click", () => profileAvatarInput?.click());
const profileAvatarRemove = $("#profileAvatarRemove"); if (profileAvatarRemove) profileAvatarRemove.addEventListener("click", removeProfileAvatar);
const profileProvinceInput = $("#profileProvinceInput"); if (profileProvinceInput) profileProvinceInput.addEventListener("change", () => setRegionOptions(profileProvinceInput.value));
const profileBirthDateInput = $("#profileBirthDateInput"); if (profileBirthDateInput) profileBirthDateInput.addEventListener("change", updateProfileAge);
const logoutButton = $("#logoutButton"); if (logoutButton) logoutButton.addEventListener("click", () => { localStorage.removeItem(STORE.session); closeModal("accountModal"); updateAccountHeader(); showToast("已退出当前账号，可继续访客浏览"); });
const continueGuestBtn = $("#continueGuest"); if (continueGuestBtn) continueGuestBtn.addEventListener("click", () => { localStorage.setItem("yinlu_guest_seen", "1"); closeModal("accountModal"); showToast("已进入访客试用，可随时注册保存数据"); });

// stage & init
$("#previousStage")?.addEventListener("click", () => moveStage(-1));
$("#nextStage")?.addEventListener("click", () => moveStage(1));
$$("[data-stage-dot]").forEach((button) => button.addEventListener("click", () => setStage(button.dataset.stageDot)));
$$("[data-stage-search-submit]").forEach((button) => button.addEventListener("click", () => runStageSearch(button.closest(".stage-slide"))));
$$("[data-stage-search]").forEach((input) => input.addEventListener("keydown", (event) => { if (event.key === "Enter") runStageSearch(input.closest(".stage-slide")); }));
$$("[data-stage-task]").forEach((button) => button.addEventListener("click", () => runStageTask(button.dataset.stageTask)));
const stageCarousel = $("#stageCarousel");
if (stageCarousel) {
  stageCarousel.addEventListener("keydown", (event) => {
    if (event.target.matches("input, button")) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); moveStage(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); moveStage(1); }
  });
  let touchStartX = 0;
  stageCarousel.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0]?.clientX || 0; }, { passive: true });
  stageCarousel.addEventListener("touchend", (event) => {
    const distance = (event.changedTouches[0]?.clientX || 0) - touchStartX;
    if (Math.abs(distance) < 45) return;
    moveStage(distance > 0 ? -1 : 1);
  }, { passive: true });
}
$$('[data-dimension-filter]').forEach((button) => button.addEventListener("click", () => {
  const dimension = button.dataset.dimensionFilter;
  if (dimension === "all") currentDimensionFilters.clear();
  else if (currentDimensionFilters.has(dimension)) currentDimensionFilters.delete(dimension);
  else currentDimensionFilters.add(dimension);
  updateDimensionFilterButtons();
  renderExperiences();
}));
$$('[data-source-filter]').forEach((button) => button.addEventListener("click", () => {
  currentSourceFilter = button.dataset.sourceFilter;
  const availableDimensions = EXPERIENCE_DIMENSIONS_BY_SOURCE[currentSourceFilter] || EXPERIENCE_DIMENSIONS_BY_SOURCE.all;
  [...currentDimensionFilters].filter((dimension) => !availableDimensions.includes(dimension)).forEach((dimension) => currentDimensionFilters.delete(dimension));
  if (currentSourceFilter === "official") currentTimeFilter = "all";
  $$('[data-source-filter]').forEach((item) => item.classList.toggle("active", item === button));
  updateDimensionFilterButtons();
  $$('[data-time-filter]').forEach((item) => item.classList.toggle("active", item.dataset.timeFilter === currentTimeFilter));
  renderExperiences();
}));
$$('[data-time-filter]').forEach((button) => button.addEventListener("click", () => {
  currentTimeFilter = button.dataset.timeFilter;
  $$('[data-time-filter]').forEach((item) => item.classList.toggle("active", item === button));
  renderExperiences();
}));
const experienceSchoolSearch = $("#experienceSchoolSearch"); if (experienceSchoolSearch) experienceSchoolSearch.addEventListener("input", (event) => { currentSchoolSearch = event.target.value; renderExperiences(); });
const experienceMajorSearch = $("#experienceMajorSearch"); if (experienceMajorSearch) {
  experienceMajorSearch.addEventListener("focus", () => { currentExperienceMajorOpen = true; currentExperienceRegionOpen = false; renderLibraryMajorPicker("experience"); renderLibraryRegionPicker("experience"); });
  experienceMajorSearch.addEventListener("input", (event) => { currentMajorSearch = event.target.value; currentExperienceMajorCategory = ""; currentExperienceMajorOpen = true; renderExperiences(); });
  experienceMajorSearch.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); $("#experienceMajorOptions [data-major-option]")?.click(); } });
}
const institutionSchoolSearch = $("#institutionSchoolSearch"); if (institutionSchoolSearch) institutionSchoolSearch.addEventListener("input", (event) => { currentInstitutionSchoolSearch = event.target.value; renderExperiences(); });
const institutionMajorSearch = $("#institutionMajorSearch"); if (institutionMajorSearch) {
  institutionMajorSearch.addEventListener("focus", () => { currentInstitutionMajorOpen = true; currentInstitutionRegionOpen = false; renderLibraryMajorPicker("institution"); renderLibraryRegionPicker("institution"); });
  institutionMajorSearch.addEventListener("input", (event) => { currentInstitutionMajorSearch = event.target.value; currentInstitutionMajorCategory = ""; currentInstitutionMajorOpen = true; renderExperiences(); });
  institutionMajorSearch.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); $("#institutionMajorOptions [data-major-option]")?.click(); } });
}
const institutionRegionSearch = $("#institutionRegionSearch"); if (institutionRegionSearch) {
  institutionRegionSearch.addEventListener("focus", () => {
    currentInstitutionRegionOpen = true;
    currentInstitutionMajorOpen = false;
    renderLibraryRegionPicker("institution");
    renderLibraryMajorPicker("institution");
    if (currentInstitutionRegion !== "all") window.setTimeout(() => institutionRegionSearch.select(), 0);
  });
  institutionRegionSearch.addEventListener("input", (event) => {
    currentInstitutionRegionSearch = event.target.value;
    currentInstitutionRegion = "all";
    currentInstitutionRegionLetter = "";
    currentInstitutionRegionOpen = true;
    renderExperiences();
  });
  institutionRegionSearch.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    $("#institutionRegionOptions [data-library-region]")?.click();
  });
}
const experienceRegionSearch = $("#experienceRegionSearch"); if (experienceRegionSearch) {
  experienceRegionSearch.addEventListener("focus", () => {
    currentExperienceRegionOpen = true;
    currentExperienceMajorOpen = false;
    renderLibraryRegionPicker("experience");
    renderLibraryMajorPicker("experience");
    if (currentExperienceRegion !== "all") window.setTimeout(() => experienceRegionSearch.select(), 0);
  });
  experienceRegionSearch.addEventListener("input", (event) => {
    currentExperienceRegionSearch = event.target.value;
    currentExperienceRegion = "all";
    currentExperienceRegionLetter = "";
    currentExperienceRegionOpen = true;
    renderExperiences();
  });
  experienceRegionSearch.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    $("#experienceRegionOptions [data-library-region]")?.click();
  });
}
const clearInstitutionFilters = $("#clearInstitutionFilters"); if (clearInstitutionFilters) clearInstitutionFilters.addEventListener("click", () => {
  currentInstitutionSchoolSearch = "";
  currentInstitutionMajorSearch = "";
  currentInstitutionRegion = "all";
  currentInstitutionRegionSearch = "";
  currentInstitutionRegionLetter = "";
  currentInstitutionRegionOpen = false;
  currentInstitutionMajorCategory = "";
  currentInstitutionMajorOpen = false;
  if (institutionSchoolSearch) institutionSchoolSearch.value = "";
  if (institutionMajorSearch) institutionMajorSearch.value = "";
  renderExperiences();
});
const experienceSort = $("#experienceSort"); if (experienceSort) experienceSort.addEventListener("change", (event) => { currentExperienceSort = event.target.value; renderExperiences(); });
$$('[data-filter-section]').forEach((button) => button.addEventListener("click", () => toggleAdvancedExperienceFilters(button.dataset.filterSection)));
const experienceSelectedFilters = $("#experienceSelectedFilters"); if (experienceSelectedFilters) experienceSelectedFilters.addEventListener("click", (event) => {
  const tag = event.target.closest("[data-clear-filter-key]");
  if (!tag) return;
  const key = tag.dataset.clearFilterKey;
  if (key === "keyword") { currentSearch = ""; $$('[data-stage-search]').forEach((input) => { input.value = ""; }); }
  if (key === "school") { currentSchoolSearch = ""; if (experienceSchoolSearch) experienceSchoolSearch.value = ""; }
  if (key === "major") { currentMajorSearch = ""; currentExperienceMajorCategory = ""; if (experienceMajorSearch) experienceMajorSearch.value = ""; }
  if (key === "region") currentExperienceRegion = "all";
  if (key === "dimension") currentDimensionFilters.delete(tag.dataset.filterValue);
  if (key === "source") currentSourceFilter = "all";
  if (key === "time") currentTimeFilter = "all";
  if (key === "sort") currentExperienceSort = "relevance";
  if (key === "same-school" && sameSchoolToggle) sameSchoolToggle.checked = false;
  setExperienceFilters({ dimensions: [...currentDimensionFilters], source: currentSourceFilter, time: currentTimeFilter, sort: currentExperienceSort });
  renderExperiences();
});
const clearExperienceFilters = $("#clearExperienceFilters"); if (clearExperienceFilters) clearExperienceFilters.addEventListener("click", () => {
  currentSearch = "";
  currentSchoolSearch = "";
  currentMajorSearch = "";
  currentExperienceRegion = "all";
  currentExperienceRegionSearch = "";
  currentExperienceRegionLetter = "";
  currentExperienceRegionOpen = false;
  currentExperienceMajorCategory = "";
  currentExperienceMajorOpen = false;
  $$('[data-stage-search]').forEach((input) => { input.value = ""; });
  if (experienceSchoolSearch) experienceSchoolSearch.value = "";
  if (experienceMajorSearch) experienceMajorSearch.value = "";
  if (sameSchoolToggle) sameSchoolToggle.checked = false;
  setExperienceFilters();
  renderExperiences();
});

document.addEventListener("keydown", (event) => {
  const onboardingOverlay = $("#onboardingOverlay");
  if (onboardingIndex >= 0 || (onboardingOverlay && !onboardingOverlay.hidden)) {
    if (event.key === "Escape") {
      event.preventDefault();
      finishOnboarding({ showComplete: false });
    } else if (["Enter", "ArrowRight"].includes(event.key) && !event.target.closest("button")) {
      event.preventDefault();
      advanceOnboarding();
    }
    return;
  }
  if (event.key === "Escape") {
    currentInstitutionRegionOpen = false;
    currentExperienceRegionOpen = false;
    renderLibraryRegionPicker("institution");
    renderLibraryRegionPicker("experience");
    closeModal("questionModal");
    closeModal("accountModal");
    closeModal("decisionCalendarModal");
    setCyberPetOpen(false);
    setCyberPetAvatarMenu(false);
    setThemeMenu(false);
  }
});
window.addEventListener("resize", refreshOnboardingPosition);
window.addEventListener("scroll", refreshOnboardingPosition, true);
window.addEventListener("scroll", scheduleBackToTopUpdate, { passive: true });
window.addEventListener("resize", scheduleBackToTopUpdate);
$("#backToTopButton")?.addEventListener("click", scrollCurrentPageToTop);

applyTheme(localStorage.getItem(STORE.theme) || document.documentElement.dataset.theme || "apple");
applyExperienceLayout(localStorage.getItem(STORE.experienceLayout) || "horizontal", { persist: false });
renderDecisionCountdown(); renderDecisionCalendar();
setCyberPetAvatar(read(STORE.petAvatar, "egret"), { persist: true });
setCyberPetMotionReduced(read(STORE.petMotion, window.matchMedia("(prefers-reduced-motion: reduce)").matches), { persist: false });
restoreCyberPetPosition(); initializeCyberPetDrag(); initializeCyberPetAvatarInteractions(); setCyberPetTab("tools"); renderCyberPetContext();
window.addEventListener("resize", () => {
  const pet = $("#cyberPet");
  if (pet) setCyberPetPosition(pet.getBoundingClientRect().left, pet.getBoundingClientRect().top);
});
setStage(currentStage); updateAccountHeader(); updateOnboardingReplayButton(); hydrateIcons();
switchQaTab("ask");
updateBackToTopButton();
if (!currentUser() && !localStorage.getItem("yinlu_guest_seen")) window.setTimeout(showAccount, 500);
else scheduleOnboarding(900);
