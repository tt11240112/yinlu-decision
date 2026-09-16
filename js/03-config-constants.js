/**
 * STORE 键名与静态常量
 * 原 app.js 第 238-379 行（机械切分，内容未改动）
 * 建议维护：G0 项目组
 */
const STORE = { users: "yinlu_users", session: "yinlu_session", questions: "yinlu_questions", answers: "yinlu_answers", favorites: "yinlu_favorites", history: "yinlu_history", candidateStatus: "yinlu_candidate_status", compareHistory: "yinlu_compare_history", family: "yinlu_family", verification: "yinlu_verification", theme: "yinlu_theme", experienceLayout: "yinlu_experience_layout", decisionEvents: "yinlu_decision_events", petPosition: "yinlu_pet_position_v2", petAvatar: "yinlu_pet_avatar", petMotion: "yinlu_pet_reduce_motion", pageFeedback: "yinlu_page_feedback", onboarding: "yinlu_onboarding_complete_v1" };
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
