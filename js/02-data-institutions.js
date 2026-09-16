/**
 * 院校示例数据
 * 原 app.js 第 27-237 行（机械切分，内容未改动）
 * 建议维护：G4 数据组
 */
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
  { title: "计算机专业每天都要写代码吗？", topic: "课程学习", status: "已回答", meta: "2 个认证回答 · 3 天前" },
  { title: "福州读研的生活成本大概怎么样？", topic: "城市环境", status: "等待回答", meta: "已匹配 1 位学长 · 昨天", waiting: true },
  { title: "这个专业毕业后真的只能考公吗？", topic: "就业去向", status: "已回答", meta: "4 个认证回答 · 6 天前" }
];

const demoAnswers = [
  { title: "转专业需要提前准备哪些课程？", topic: "课程学习", status: "已发布", meta: "收到 2 次感谢 · 5 天前" },
  { title: "大学宿舍生活和高中想象差别大吗？", topic: "宿舍生活", status: "已发布", meta: "收到 1 次追问 · 2 周前" }
];

const stageNames = { gaokao: "高考志愿", graduate: "考研择校", career: "职业选择", adapt: "大学适应" };
const stageOrder = ["gaokao", "graduate", "career", "adapt"];
