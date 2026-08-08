const experiences = [
  { id: "fjnu-cs", school: "福建师范大学", city: "福州 · 计算机科学与技术", level: "已认证 · 2023级", source: "student", consensus: { recommend: 9, total: 12 }, text: "课程强调理论与工程实践的结合，作业量中等偏上，适合喜欢系统性学习的同学。", tags: ["课程", "作业", "实践"], filters: ["school", "major"] },
  { id: "fzu-econ", school: "福州大学", city: "福州 · 经济学", level: "已认证 · 2022级", source: "student", consensus: { recommend: 8, total: 9 }, text: "考研氛围浓，建议提前准备数学与专业课，社团与实践机会较多。", tags: ["考研", "生活"], filters: ["school", "major"] },
  { id: "xmu-news", school: "厦门大学", city: "厦门 · 新闻传播学", level: "已认证 · 2024级", source: "student", consensus: { recommend: 14, total: 17 }, text: "课程里有不少实战项目，适合想做媒体与内容生产的同学，实习机会较多。", tags: ["实习", "项目"], filters: ["school", "major"] },
  { id: "hqu-med", school: "华侨大学", city: "泉州 · 临床医学", level: "已认证 · 2021级", source: "student", consensus: { recommend: 2, total: 2 }, text: "专业学习周期长，临床实践密集，对体力与耐心要求高。", tags: ["临床", "实践"], filters: ["school", "major"] },
  { id: "fafu-land", school: "福建农林大学", city: "福州 · 风景园林", level: "已认证 · 2023级", source: "student", consensus: { recommend: 6, total: 8 }, text: "项目制作业较多，利于作品集准备，适合偏向设计/景观方向的同学。", tags: ["设计", "作品集"], filters: ["school", "major"] },
  { id: "jmu-nautical", school: "集美大学", city: "厦门 · 航海技术", level: "已认证 · 2022级", source: "student", consensus: { recommend: 1, total: 1 }, text: "专业路径比较明确，但需要适应海上实训与体能训练。", tags: ["实训", "体能"], filters: ["school", "major"] }
];

const demoQuestions = [
  { title: "计算机专业每天都要写代码吗？", topic: "课程学习", status: "已回答", meta: "2 个认证回答 · 3 天前" },
  { title: "福州读研的生活成本大概怎么样？", topic: "城市环境", status: "等待回答", meta: "已匹配 1 位学长 · 昨天", waiting: true },
  { title: "这个专业毕业后真的只能考公吗？", topic: "就业去向", status: "已回答", meta: "4 个认证回答 · 6 天前" }
];

const stageNames = { gaokao: "高考志愿", graduate: "考研择校", career: "职业选择", adapt: "大学适应" };
const STORE = { users: "yinlu_users", session: "yinlu_session", questions: "yinlu_questions", favorites: "yinlu_favorites", family: "yinlu_family", verification: "yinlu_verification" };
let currentStage = "gaokao";
let currentFilter = "all";
let currentSearch = "";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const read = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } };
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const uid = (prefix = "id") => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const currentUser = () => { const id = localStorage.getItem(STORE.session); return read(STORE.users, []).find((user) => user.id === id) || null; };
const userFavorites = () => { const user = currentUser(); return user ? read(STORE.favorites, {})[user.id] || [] : []; };
const initials = (name = "访客") => name.trim().slice(0, 1) || "访";

function hydrateIcons() { if (window.lucide) window.lucide.createIcons(); }

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  $("span", toast).textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function openModal(id) { const modal = $(`#${id}`); if (!modal) return; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); window.setTimeout(() => $("#questionInput")?.focus?.(), 300); }
function closeModal(id) { const modal = $(`#${id}`); if (!modal) return; modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); }

function switchView(name) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === `view-${name}`));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  const active = $(`.nav-item[data-view="${name}"]`);
  $("#breadcrumbTitle").textContent = active?.querySelector("span")?.textContent || "发现经验";
  $("#sidebar")?.classList.remove("open");
  if (name === "questions") renderQuestions();
  if (name === "compare") renderCompare();
  if (name === "family") renderFamily();
  if (name === "trust") renderTrust();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setStage(stage) {
  currentStage = stage;
  const buttons = $$(".stage-option");
  buttons.forEach((button) => button.classList.toggle("active", button.dataset.stage === stage));
  const activeIndex = buttons.findIndex((button) => button.dataset.stage === stage) + 1;
  $("#stageIndex").textContent = String(activeIndex).padStart(2, "0");
  $("#heroSearch").placeholder = stage === "gaokao" ? "搜索学校、专业或你关心的问题" : `${stageNames[stage]}：搜索学校、方向或你关心的问题`;
}

function renderExperiences() {
  const grid = $("#experienceGrid");
  if (!grid) return;
  const query = currentSearch.trim().toLowerCase();
  const sameSchool = $("#sameSchoolToggle")?.checked;
  const filtered = experiences.filter((item) => {
    const itemFilters = Array.isArray(item.filters) ? item.filters : [];
    const itemTags = Array.isArray(item.tags) ? item.tags.join("") : "";
    const matchesFilter = currentFilter === "all" || itemFilters.includes(currentFilter);
    const matchesSearch = !query || `${item.school || ""}${item.city || ""}${item.text || ""}${itemTags}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
  const ordered = sameSchool ? [...filtered].sort((a, b) => ((a.school || "").includes("师范") ? -1 : 0) - ((b.school || "").includes("师范") ? -1 : 0)) : filtered;
  const favorites = userFavorites();
  const sourceLabels = { student: { cls: "source-badge-student", icon: "user-check", text: "在读认证" }, official: { cls: "source-badge-official", icon: "landmark", text: "官方信息" }, data: { cls: "source-badge-data", icon: "database", text: "客观数据" }, expert: { cls: "source-badge-expert", icon: "users", text: "教师/从业者" } };
  grid.innerHTML = ordered.length ? ordered.map((item) => {
    const src = sourceLabels[item.source] || sourceLabels.student;
    const total = item.consensus?.total || 0;
    const recommend = item.consensus?.recommend || 0;
    const pct = total ? Math.round(recommend / total * 100) : 0;
    const lowSample = total > 0 && total < 3;
    const saved = favorites.includes(item.id);
    const tagsHtml = Array.isArray(item.tags) ? item.tags.map((tag) => `<span class="content-tag">${tag}</span>`).join("") : "";
    return `<article class="experience-card">
      <div class="experience-top"><span class="school-avatar">${(item.school || "").slice(0, 1)}</span><div class="experience-school"><strong>${item.school || "未命名学校"}</strong><small>${item.city || ""}</small></div><span class="source-level-tag ${src.cls}">${src.text}</span></div>
      <div class="experience-divider"></div>
      <div class="consensus-row"><span class="consensus-label">共识度</span><div class="consensus-bar-wrap"><div class="consensus-bar"><div class="consensus-fill" style="width:${pct}%"></div></div><span class="consensus-label">${pct}%</span></div></div>
      ${lowSample ? `<div class="low-sample-tip"><i data-lucide="alert-circle"></i>当前仅 ${total} 条评价，建议补充更多信源</div>` : ""}
      <p>${item.text || ""}</p>
      <div class="tag-row">${tagsHtml}</div>
      <button class="save-experience ${saved ? "saved" : ""}" data-favorite="${item.id}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入我的候选"}</button>
    </article>`;
  }).join("") : `<div class="empty-state"><i data-lucide="search-x"></i><p>暂时没有找到匹配的认证经验</p><button class="quiet-button" data-clear-search>清空筛选</button></div>`;
  hydrateIcons();
}

function renderQuestions() {
  const user = currentUser();
  const list = $("#questionList");
  if (!list) return;
  if (!user) {
    list.innerHTML = demoQuestions.map((item) => `<article class="question-list-item"><header><strong>${item.title}</strong><span class="question-status ${item.waiting ? "waiting" : ""}">${item.status}</span></header><p>${item.meta}</p></article>`).join("");
  } else {
    const mine = read(STORE.questions, []).filter((item) => item.userId === user.id);
    list.innerHTML = mine.length ? mine.map((item) => `<article class="question-list-item"><header><strong>${item.title}</strong><span class="question-status waiting">${item.status}</span></header><p>${item.meta}</p></article>`).join("") : `<p>你还没有发布问题</p>`;
  }
  $("#questionsCount") && ($("#questionsCount").textContent = user ? read(STORE.questions, []).filter((item) => item.userId === user.id).length : "示例");
  hydrateIcons();
}

function renderCompare() {
  const panel = $("#compareContent");
  if (!panel) return;
  const saved = experiences.filter((item) => userFavorites().includes(item.id));
  if (!currentUser()) {
    panel.innerHTML = `<div class="compare-empty"><i data-lucide="bookmark"></i><strong>登录后保存你的候选清单</strong><p>先浏览经验，遇到值得比较的学校或专业再登录保存。</p></div>`;
  } else {
    panel.innerHTML = saved.length ? `<div class="compare-toolbar"><div><strong>我的候选</strong><span>已收藏 ${saved.length} 项</span></div><button class="icon-button" data-share-candidates>分享候选</button></div><div class="compare-list">${saved.map(s=>`<div class="compare-item"><strong>${s.school}</strong><small>${s.city}</small></div>`).join("")}</div>` : `<div class="compare-empty"><i data-lucide="bookmark"></i><strong>你还没有收藏任何候选</strong><p>去发现页面收藏感兴趣的学校和专业。</p></div>`;
  }
  hydrateIcons();
}

function renderFamily() {
  const user = currentUser();
  const main = $("#familyMainContent");
  if (!main) return;
  if (!user) {
    main.innerHTML = `<div class="family-empty"><i data-lucide="link-2"></i><strong>登录后生成家庭邀请码</strong><span>家庭协作只共享你主动授权的候选内容。</span></div>`;
  } else {
    const family = read(STORE.family, {})[user.id];
    main.innerHTML = family ? `<div class="family-linked"><div class="linked-code"><span>家庭邀请码</span><strong>${family.code}</strong><button class="icon-button" data-copy-code="${family.code}">复制</button></div></div>` : `<div class="family-empty"><p>还未创建家庭邀请码，点击生成。</p><button class="cyan-button" data-family-invite>生成邀请码</button></div>`;
  }
  hydrateIcons();
}

function renderTrust() {
  const user = currentUser();
  const status = user ? (read(STORE.verification, {})[user.id] || {}).status : null;
  const card = $("#verificationContent");
  if (!card) return;
  card.innerHTML = `<div class="verification-status"><span class="status-icon"><i data-lucide="shield-check"></i></span><div><span>当前身份</span><strong>${user ? `${user.role} · ${status ? status : "未认证"}` : "未登录"}</strong></div></div>`;
  hydrateIcons();
}

function updateAccountHeader() {
  const user = currentUser();
  const accountButton = $("#accountButton");
  if (accountButton) accountButton.textContent = initials(user?.nickname);
  const profileNameEl = $("#profileName");
  if (profileNameEl) profileNameEl.textContent = user ? user.nickname : "访客浏览";
  renderQuestions(); renderExperiences(); renderCompare(); renderFamily(); renderTrust();
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
    $("#profileSummaryName") && ($("#profileSummaryName").textContent = user.nickname);
    $("#profileSummaryMeta") && ($("#profileSummaryMeta").textContent = `${user.role} · ${user.email}`);
    $("#profileAvatarLarge") && ($("#profileAvatarLarge").textContent = initials(user.nickname));
    $("#profileNameInput") && ($("#profileNameInput").value = user.nickname);
    $("#profileRoleInput") && ($("#profileRoleInput").value = user.role);
    $("#profileStageInput") && ($("#profileStageInput").value = user.stage);
    $("#profileQuestionCount") && ($("#profileQuestionCount").textContent = read(STORE.questions, []).filter((item) => item.userId === user.id).length);
    $("#profileFavoriteCount") && ($("#profileFavoriteCount").textContent = userFavorites().length);
    $("#profileFamilyCode") && ($("#profileFamilyCode").textContent = read(STORE.family, {})[user.id]?.code || "未生成");
  }
  openModal("accountModal"); hydrateIcons();
}

function requireAuth(message = "登录后才能使用这个功能") { if (currentUser()) return true; showAccount(); showToast(message); return false; }

function register(event) {
  event.preventDefault(); const name = $("#registerName")?.value.trim() || ""; const email = $("#registerEmail").value.trim().toLowerCase(); const password = $("#registerPassword").value;
  const users = read(STORE.users, []);
  if (users.some((user) => user.email === email)) { showToast("这个邮箱已经注册，请直接登录"); $("[data-auth-tab=login]")?.click(); $("#loginEmail").value = email; return; }
  const user = { id: uid("user"), nickname: name || `用户${Date.now()}`, email, password, role: $("#registerRole")?.value || "学生", stage: $("#registerStage")?.value || "高考志愿", createdAt: new Date().toISOString() };
  write(STORE.users, [...users, user]); localStorage.setItem(STORE.session, user.id); $("#registerForm")?.reset(); closeModal("accountModal"); updateAccountHeader(); showToast(`欢迎加入引路，${user.nickname}`);
}

function login(event) {
  event.preventDefault(); const email = $("#loginEmail").value.trim().toLowerCase(); const password = $("#loginPassword").value; const user = read(STORE.users, []).find((item) => item.email === email && item.password === password);
  if (!user) { showToast("邮箱或密码不正确，请检查后重试"); return; }
  localStorage.setItem(STORE.session, user.id); closeModal("accountModal"); updateAccountHeader(); showToast(`欢迎回来，${user.nickname}`);
}

function submitQuestion() {
  if (!requireAuth("登录后才能发布匿名问题")) return;
  const input = $("#questionInput"); const value = input?.value.trim() || ""; if (value.length < 8) { showToast("请把问题写得再具体一点"); input?.focus(); return; }
  const user = currentUser(); const all = read(STORE.questions, []); all.unshift({ id: uid("question"), userId: user.id, title: value, topic: $("#questionTopic")?.value || "未分类", stage: $("#questionStage")?.value || "高考志愿", status: "等待回答", createdAt: new Date().toISOString() }); write(STORE.questions, all);
  input.value = ""; closeModal("questionModal"); renderQuestions(); showToast("匿名问题已发布，正在匹配认证回答者");
}

function toggleFavorite(id) {
  if (!requireAuth("登录后才能保存候选")) return;
  const user = currentUser(); const all = read(STORE.favorites, {}); const list = all[user.id] || []; all[user.id] = list.includes(id) ? list.filter((item) => item !== id) : [...list, id]; write(STORE.favorites, all); renderExperiences(); renderCompare(); showToast(all[user.id].includes(id) ? "已加入候选" : "已从候选移除");
}

function generateFamilyInvite() {
  if (!requireAuth("登录后才能创建家庭关联")) return;
  const user = currentUser(); const all = read(STORE.family, {}); if (!all[user.id]) all[user.id] = { code: `YL-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}` , createdAt: new Date().toISOString() }; write(STORE.family, all); renderFamily(); showToast("家庭邀请码已生成");
}

function requestVerification() {
  if (!requireAuth("登录后才能提交认证申请")) return;
  const user = currentUser(); const all = read(STORE.verification, {}); if (!all[user.id]) all[user.id] = { status: "申请中", submittedAt: new Date().toISOString() }; write(STORE.verification, all); renderTrust(); showToast("认证申请已提交");
}

function copyText(value) { navigator.clipboard?.writeText(value).then(() => showToast("邀请码已复制")).catch(() => showToast(`邀请码：${value}`)); }

// 事件委托保留，但同时安全绑定核心按钮以避免空引用错误
document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-view]"); if (nav) { switchView(nav.dataset.view); return; }
  const targetView = event.target.closest("[data-view-target]"); if (targetView) { switchView(targetView.dataset.viewTarget); return; }
  const scrollTarget = event.target.closest("[data-scroll-to]"); if (scrollTarget) { $("#experienceSection")?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
  const modalTrigger = event.target.closest("[data-open-modal]"); if (modalTrigger) { openModal(modalTrigger.dataset.openModal); return; }
  if (event.target.closest("[data-open-account]")) { showAccount(); return; }
  const modalCloser = event.target.closest("[data-close-modal]"); if (modalCloser) { closeModal(modalCloser.dataset.closeModal); return; }
  if (event.target.classList.contains("modal-backdrop")) closeModal(event.target.id);
  const favorite = event.target.closest("[data-favorite]"); if (favorite) { toggleFavorite(favorite.dataset.favorite); return; }
  if (event.target.closest("[data-family-invite]")) { generateFamilyInvite(); return; }
  const code = event.target.closest("[data-copy-code]"); if (code) { copyText(code.dataset.copyCode); return; }
  if (event.target.closest("[data-start-verify]")) { requestVerification(); return; }
  if (event.target.closest("[data-share-candidates]")) { showToast("候选清单分享功能将在正式后端版本开放"); return; }
  if (event.target.closest("[data-clear-search]")) { currentSearch = ""; $("#heroSearch").value = ""; renderExperiences(); return; }
  const authTab = event.target.closest("[data-auth-tab]"); if (authTab) { $$(".auth-tab").forEach((tab) => tab.classList.toggle("active", tab === authTab)); $("#loginForm").classList.toggle("hidden"); $("#registerForm").classList.toggle("hidden"); return; }
});

// 安全绑定核心交互（检查元素存在后绑定）
const menuButton = $("#menuButton"); if (menuButton) menuButton.addEventListener("click", () => $("#sidebar").classList.toggle("open"));
const accountButton = $("#accountButton"); if (accountButton) accountButton.addEventListener("click", showAccount);
const notifyButton = $("#notifyButton"); if (notifyButton) notifyButton.addEventListener("click", () => showToast(currentUser() ? "暂无新的认证回答" : "登录后可查看你的通知"));
const heroSearchButton = $("#heroSearchButton"); if (heroSearchButton) heroSearchButton.addEventListener("click", () => { currentSearch = $("#heroSearch")?.value || ""; renderExperiences(); $("#experienceSection")?.scrollIntoView({ behavior: "smooth", block: "start" }); });
const heroSearch = $("#heroSearch"); if (heroSearch) { heroSearch.addEventListener("keydown", (event) => { if (event.key === "Enter") heroSearchButton?.click(); }); heroSearch.addEventListener("input", (event) => { currentSearch = event.target.value; renderExperiences(); }); }
const sameSchoolToggle = $("#sameSchoolToggle"); if (sameSchoolToggle) sameSchoolToggle.addEventListener("change", renderExperiences);
const submitQuestionBtn = $("#submitQuestion"); if (submitQuestionBtn) submitQuestionBtn.addEventListener("click", submitQuestion);
const inviteFamilyBtn = $("#inviteFamily"); if (inviteFamilyBtn) inviteFamilyBtn.addEventListener("click", generateFamilyInvite);
const loginFormEl = $("#loginForm"); if (loginFormEl) loginFormEl.addEventListener("submit", login);
const registerFormEl = $("#registerForm"); if (registerFormEl) registerFormEl.addEventListener("submit", register);
const profileFormEl = $("#profileForm"); if (profileFormEl) profileFormEl.addEventListener("submit", (event) => { event.preventDefault(); const users = read(STORE.users, []); const id = localStorage.getItem(STORE.session); const updated = users.map((u) => u.id === id ? { ...u, nickname: $("#profileNameInput")?.value || u.nickname, role: $("#profileRoleInput")?.value || u.role, stage: $("#profileStageInput")?.value || u.stage } : u); write(STORE.users, updated); showToast("已保存个人信息"); updateAccountHeader(); });
const logoutButton = $("#logoutButton"); if (logoutButton) logoutButton.addEventListener("click", () => { localStorage.removeItem(STORE.session); closeModal("accountModal"); updateAccountHeader(); showToast("已退出当前账号，可继续访客浏览"); });
const continueGuestBtn = $("#continueGuest"); if (continueGuestBtn) continueGuestBtn.addEventListener("click", () => { localStorage.setItem("yinlu_guest_seen", "1"); closeModal("accountModal"); showToast("已进入访客试用，可随时注册保存数据"); });

// stage & init
$$('.stage-option').forEach((button) => button.addEventListener("click", () => setStage(button.dataset.stage)));
$$('.filter-pill').forEach((button) => button.addEventListener("click", () => { currentFilter = button.dataset.filter; $$('.filter-pill').forEach((item) => item.classList.toggle("active", item === button)); renderExperiences(); }));

document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeModal("questionModal"); closeModal("accountModal"); } });

setStage(currentStage); updateAccountHeader(); hydrateIcons();
if (!currentUser() && !localStorage.getItem("yinlu_guest_seen")) window.setTimeout(showAccount, 500);
