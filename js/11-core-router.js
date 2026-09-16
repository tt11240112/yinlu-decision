/**
 * 视图切换与滚动
 * 原 app.js 第 1189-1305 行（机械切分，内容未改动）
 * 建议维护：G1 前端组
 */
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

