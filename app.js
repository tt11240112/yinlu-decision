const experiences = [
  { id: "fjnu-cs", school: "福建师范大学", city: "福州 · 计算机科学与技术", level: "已认证 · 2023级", source: "student", consensus: { recommend: 9, total: 12 }, text: "课程强度中等，实践课比较多；宿舍生活便利，适合想在福州长期发展的同学。", tags: ["课程", "宿舍", "学习氛围"], filters: ["school", "major", "course", "housing"] },
  { id: "fzu-econ", school: "福州大学", city: "福州 · 经济学", level: "已认证 · 2022级", source: "student", consensus: { recommend: 8, total: 9 }, text: "考研氛围浓，建议提前了解导师与培养方案；城市机会多，但学习节奏会更快。", tags: ["考研", "导师", "城市"], filters: ["school", "major", "career"] },
  { id: "xmu-news", school: "厦门大学", city: "厦门 · 新闻传播学", level: "已认证 · 2024级", source: "student", consensus: { recommend: 14, total: 17 }, text: "课程里有不少真实项目，适合主动找实践的人；专业方向差异比学校名气更值得关注。", tags: ["课程", "专业", "就业"], filters: ["school", "major", "course", "career"] },
  { id: "hqu-med", school: "华侨大学", city: "泉州 · 临床医学", level: "已认证 · 2021级", source: "student", consensus: { recommend: 2, total: 2 }, text: "专业学习周期长，实习安排要问清楚；如果在意生活成本和离家距离，可以重点比较。", tags: ["学习强度", "城市", "生活"], filters: ["school", "course", "housing"] },
  { id: "fafu-land", school: "福建农林大学", city: "福州 · 风景园林", level: "已认证 · 2023级", source: "student", consensus: { recommend: 6, total: 8 }, text: "项目制作业较多，真实体验取决于方向和导师；毕业去向需要尽早积累作品。", tags: ["课程", "导师", "就业"], filters: ["school", "major", "career"] },
  { id: "jmu-nautical", school: "集美大学", city: "厦门 · 航海技术", level: "已认证 · 2022级", source: "student", consensus: { recommend: 1, total: 1 }, text: "专业路径比较明确，但工作地点和生活方式差异较大，建议先问在岗前辈。", tags: ["职业路径", "城市", "前辈问答"], filters: ["school", "career"] }
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
  $("span", toast).textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function openModal(id) { const modal = $(`#${id}`); if (!modal) return; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); window.setTimeout(() => $("#questionInput")?.focus(), 30); }
function closeModal(id) { const modal = $(`#${id}`); if (!modal) return; modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); }

function switchView(name) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === `view-${name}`));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  const active = $(`.nav-item[data-view="${name}"]`);
  $("#breadcrumbTitle").textContent = active?.querySelector("span")?.textContent || "发现经验";
  $("#sidebar").classList.remove("open");
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
  const query = currentSearch.trim().toLowerCase();
  const sameSchool = $("#sameSchoolToggle")?.checked;
  const filtered = experiences.filter((item) => {
    const matchesFilter = currentFilter === "all" || item.filters.includes(currentFilter);
    const matchesSearch = !query || `${item.school}${item.city}${item.text}${item.tags.join("")}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
  const ordered = sameSchool ? [...filtered].sort((a, b) => (a.school.includes("师范") ? -1 : 0) - (b.school.includes("师范") ? -1 : 0)) : filtered;
  const favorites = userFavorites();
  const sourceLabels = { student: { cls: "source-badge-student", icon: "user-check", text: "在读认证" }, official: { cls: "source-badge-official", icon: "landmark", text: "官方信息" }, data: { cls: "source-badge-data", icon: "database", text: "客观数据" }, expert: { cls: "source-badge-expert", icon: "briefcase", text: "教师/从业者" } };
  grid.innerHTML = ordered.length ? ordered.map((item) => {
    const src = sourceLabels[item.source] || sourceLabels.student;
    const pct = Math.round(item.consensus.recommend / item.consensus.total * 100);
    const lowSample = item.consensus.total < 3;
    const saved = favorites.includes(item.id);
    return `<article class="experience-card">
      <div class="experience-top"><span class="school-avatar">${item.school.slice(0, 1)}</span><div class="experience-school"><strong>${item.school}</strong><small>${item.city}</small></div><span class="source-badge ${src.cls}"><i data-lucide="${src.icon}"></i>${src.text}</span></div>
      <div class="experience-divider"></div><div class="consensus-row"><span class="consensus-label">共识度</span><div class="consensus-bar-wrap"><div class="consensus-bar" style="width:${pct}%"></div></div><span class="consensus-stat">${item.consensus.total} 条评价中 ${item.consensus.recommend} 人推荐（${pct}%）</span></div>
      ${lowSample ? `<div class="low-sample-tip"><i data-lucide="alert-circle"></i>当前仅 ${item.consensus.total} 条评价，建议补充更多信源</div>` : ""}
      <p>${item.text}</p><div class="tag-row">${item.tags.map((tag) => `<span class="content-tag">${tag}</span>`).join("")}</div>
      <button class="save-experience ${saved ? "saved" : ""}" data-favorite="${item.id}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入我的候选"}</button>
    </article>`;
  }).join("") : `<div class="empty-state"><i data-lucide="search-x"></i><p>暂时没有找到匹配的认证经验</p><button class="quiet-button" data-clear-search>清空筛选</button></div>`;
  hydrateIcons();
}

function renderQuestions() {
  const user = currentUser();
  const list = $("#questionList");
  if (!user) {
    list.innerHTML = demoQuestions.map((item) => `<article class="question-list-item"><header><strong>${item.title}</strong><span class="question-status ${item.waiting ? "waiting" : ""}">${item.status}</span></header><p>关注维度：${item.topic}</p><div class="question-meta"><span>${item.meta}</span><span>匿名示例</span></div></article>`).join("");
  } else {
    const mine = read(STORE.questions, []).filter((item) => item.userId === user.id);
    list.innerHTML = mine.length ? mine.map((item) => `<article class="question-list-item"><header><strong>${item.title}</strong><span class="question-status waiting">${item.status}</span></header><p>关注维度：${item.topic} · ${item.stage}</p><div class="question-meta"><span>${item.meta}</span><span>匿名发布</span></div></article>`).join("") : `<div class="empty-state"><i data-lucide="message-square-plus"></i><p>你还没有发布问题</p><button class="primary-button" data-open-modal="questionModal"><i data-lucide="plus"></i>发起第一个问题</button></div>`;
  }
  $("#questionsCount").textContent = user ? read(STORE.questions, []).filter((item) => item.userId === user.id).length : "示例";
  hydrateIcons();
}

function renderCompare() {
  const panel = $("#compareContent");
  if (!panel) return;
  const saved = experiences.filter((item) => userFavorites().includes(item.id));
  if (!currentUser()) { panel.innerHTML = `<div class="compare-empty"><i data-lucide="bookmark"></i><strong>登录后保存你的候选清单</strong><p>先浏览经验，遇到值得比较的学校和专业，点击“加入我的候选”。</p><button class="primary-button" data-open-account><i data-lucide="log-in"></i>登录试用</button></div>`; hydrateIcons(); return; }
  panel.innerHTML = saved.length ? `<div class="compare-toolbar"><div><strong>我的候选</strong><span>已收藏 ${saved.length} 项</span></div><button class="icon-button" data-share-candidates aria-label="分享候选清单"><i data-lucide="share-2"></i></button></div><div class="compare-table"><div class="compare-row compare-head"><span>维度</span>${saved.map((item) => `<span>${item.school}</span>`).join("")}</div><div class="compare-row"><span>专业方向</span>${saved.map((item) => `<span>${item.city.split(" · ")[1]}</span>`).join("")}</div><div class="compare-row"><span>综合体验</span>${saved.map((item) => `<strong class="score-${saved.indexOf(item) % 2 ? "teal" : "blue"}">${(4.1 + item.consensus.recommend / 100).toFixed(1)} / 5.0</strong>`).join("")}</div><div class="compare-row"><span>经验共识</span>${saved.map((item) => `<span>${item.consensus.total} 条评价<br><small>${Math.round(item.consensus.recommend / item.consensus.total * 100)}% 推荐</small></span>`).join("")}</div><div class="compare-row"><span>操作</span>${saved.map((item) => `<button class="remove-candidate" data-favorite="${item.id}"><i data-lucide="x"></i>移出候选</button>`).join("")}</div></div><div class="compare-footnote"><i data-lucide="info"></i>平台只呈现信息与分歧，不输出“应该选哪个”的结论。</div>` : `<div class="compare-empty"><i data-lucide="square-kanban"></i><strong>候选清单还是空的</strong><p>回到“发现经验”，把学校和专业加入这里集中比较。</p><button class="quiet-button" data-view-target="home"><i data-lucide="arrow-left"></i>返回发现经验</button></div>`;
  hydrateIcons();
}

function renderFamily() {
  const user = currentUser();
  const main = $("#familyMainContent");
  if (!main) return;
  if (!user) { main.innerHTML = `<div class="family-empty"><i data-lucide="link-2"></i><strong>登录后生成家庭邀请码</strong><span>家庭协作只共享你主动授权的候选内容。</span><button class="cyan-button" data-open-account>登录并生成邀请码</button></div>`; hydrateIcons(); return; }
  const family = read(STORE.family, {})[user.id];
  main.innerHTML = family ? `<div class="family-linked"><div class="linked-code"><span>家庭邀请码</span><strong>${family.code}</strong><button class="icon-button" data-copy-code="${family.code}" aria-label="复制邀请码"><i data-lucide="copy"></i></button></div><p>把邀请码发给家长，后续正式版本可在授权后共享候选清单。</p><span class="linked-pill"><i data-lucide="clock-3"></i>等待家庭成员加入</span></div>` : `<div class="family-empty"><i data-lucide="link-2"></i><strong>还没有家庭成员加入</strong><span>生成邀请码后，家长可以在自己的端查看共享候选清单。</span><button class="cyan-button" data-family-invite>生成关联邀请</button></div>`;
  hydrateIcons();
}

function renderTrust() {
  const user = currentUser();
  const status = user ? (read(STORE.verification, {})[user.id] || {}).status : null;
  const card = $("#verificationContent");
  if (!card) return;
  card.innerHTML = `<div class="verification-status"><span class="status-icon"><i data-lucide="shield-check"></i></span><div><span>当前身份</span><strong>${user ? `${user.role} · ${status ? "认证申请中" : "未认证回答者"}` : "访客 · 未登录"}</strong></div><span class="status-label">${status || "浏览中"}</span></div><div class="verify-progress"><div class="progress-title"><span>试用版认证进度</span><strong>${status ? "2 / 3" : "1 / 3"}</strong></div><div class="progress-track"><span style="width:${status ? "66%" : "34%"}"></span></div><div class="verify-steps"><span class="done"><i data-lucide="check"></i>手机号</span><span class="${status ? "done" : ""}"><i data-lucide="${status ? "check" : "circle"}"></i>校园身份</span><span><i data-lucide="circle"></i>回答权限</span></div></div><button class="primary-button full-button" data-start-verify><i data-lucide="arrow-right"></i>${status ? "查看认证申请状态" : "开始校园身份认证"}</button>`;
  hydrateIcons();
}

function updateAccountHeader() {
  const user = currentUser();
  $("#accountButton").textContent = initials(user?.nickname);
  $("#profileName").textContent = user ? user.nickname : "访客浏览";
  renderQuestions(); renderExperiences(); renderCompare(); renderFamily(); renderTrust();
}

function showAccount() {
  const user = currentUser();
  $("#authPanel").classList.toggle("hidden", Boolean(user));
  $("#profilePanel").classList.toggle("hidden", !user);
  if (!user) {
    $$(".auth-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.authTab === "login"));
    $("#loginForm").classList.remove("hidden");
    $("#registerForm").classList.add("hidden");
  }
  if (user) {
    $("#profileSummaryName").textContent = user.nickname;
    $("#profileSummaryMeta").textContent = `${user.role} · ${user.email}`;
    $("#profileAvatarLarge").textContent = initials(user.nickname);
    $("#profileNameInput").value = user.nickname;
    $("#profileRoleInput").value = user.role;
    $("#profileStageInput").value = user.stage;
    $("#profileQuestionCount").textContent = read(STORE.questions, []).filter((item) => item.userId === user.id).length;
    $("#profileFavoriteCount").textContent = userFavorites().length;
    $("#profileFamilyCode").textContent = read(STORE.family, {})[user.id]?.code || "未生成";
  }
  openModal("accountModal"); hydrateIcons();
}

function requireAuth(message = "登录后才能使用这个功能") { if (currentUser()) return true; showAccount(); showToast(message); return false; }

function register(event) {
  event.preventDefault();
  const name = $("#registerName").value.trim(); const email = $("#registerEmail").value.trim().toLowerCase(); const password = $("#registerPassword").value;
  const users = read(STORE.users, []);
  if (users.some((user) => user.email === email)) { showToast("这个邮箱已经注册，请直接登录"); $("[data-auth-tab=login]").click(); $("#loginEmail").value = email; return; }
  const user = { id: uid("user"), nickname: name, email, password, role: $("#registerRole").value, stage: $("#registerStage").value, createdAt: new Date().toISOString() };
  write(STORE.users, [...users, user]); localStorage.setItem(STORE.session, user.id); $("#registerForm").reset(); closeModal("accountModal"); updateAccountHeader(); showToast(`欢迎加入引路，${user.nickname}`);
}

function login(event) {
  event.preventDefault(); const email = $("#loginEmail").value.trim().toLowerCase(); const password = $("#loginPassword").value; const user = read(STORE.users, []).find((item) => item.email === email && item.password === password);
  if (!user) { showToast("邮箱或密码不正确，请检查后重试"); return; }
  localStorage.setItem(STORE.session, user.id); closeModal("accountModal"); updateAccountHeader(); showToast(`欢迎回来，${user.nickname}`);
}

function submitQuestion() {
  if (!requireAuth("登录后才能发布匿名问题")) return;
  const input = $("#questionInput"); const value = input.value.trim(); if (value.length < 8) { showToast("请把问题写得再具体一点"); input.focus(); return; }
  const user = currentUser(); const all = read(STORE.questions, []); all.unshift({ id: uid("question"), userId: user.id, title: value, topic: $("#questionTopic").value, stage: $("#questionStage").value, status: "等待回答", meta: "刚刚发布 · 匹配中", createdAt: new Date().toISOString() }); write(STORE.questions, all);
  input.value = ""; closeModal("questionModal"); renderQuestions(); showToast("匿名问题已发布，正在匹配认证回答者");
}

function toggleFavorite(id) {
  if (!requireAuth("登录后才能保存候选")) return;
  const user = currentUser(); const all = read(STORE.favorites, {}); const list = all[user.id] || []; all[user.id] = list.includes(id) ? list.filter((item) => item !== id) : [...list, id]; write(STORE.favorites, all); renderExperiences(); renderCompare(); showToast(list.includes(id) ? "已移出候选" : "已加入我的候选");
}

function generateFamilyInvite() {
  if (!requireAuth("登录后才能创建家庭关联")) return;
  const user = currentUser(); const all = read(STORE.family, {}); if (!all[user.id]) all[user.id] = { code: `YL-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`, createdAt: new Date().toISOString() }; write(STORE.family, all); renderFamily(); showToast("家庭邀请码已生成");
}

function requestVerification() {
  if (!requireAuth("登录后才能提交认证申请")) return;
  const user = currentUser(); const all = read(STORE.verification, {}); if (!all[user.id]) all[user.id] = { status: "申请中", submittedAt: new Date().toISOString() }; write(STORE.verification, all); renderTrust(); showToast("认证申请已记录，试用版暂不连接真实审核服务");
}

function copyText(value) { navigator.clipboard?.writeText(value).then(() => showToast("邀请码已复制")).catch(() => showToast(`邀请码：${value}`)); }

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
  const authTab = event.target.closest("[data-auth-tab]"); if (authTab) { $$(".auth-tab").forEach((tab) => tab.classList.toggle("active", tab === authTab)); $("#loginForm").classList.toggle("hidden", authTab.dataset.authTab !== "login"); $("#registerForm").classList.toggle("hidden", authTab.dataset.authTab !== "register"); return; }
});

$("#menuButton").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
$("#accountButton").addEventListener("click", showAccount);
$("#notifyButton").addEventListener("click", () => showToast(currentUser() ? "暂无新的认证回答" : "登录后可查看你的通知"));
$("#heroSearchButton").addEventListener("click", () => { currentSearch = $("#heroSearch").value; renderExperiences(); $("#experienceSection").scrollIntoView({ behavior: "smooth", block: "start" }); });
$("#heroSearch").addEventListener("keydown", (event) => { if (event.key === "Enter") $("#heroSearchButton").click(); });
$("#heroSearch").addEventListener("input", (event) => { currentSearch = event.target.value; renderExperiences(); });
$("#sameSchoolToggle").addEventListener("change", renderExperiences);
$("#submitQuestion").addEventListener("click", submitQuestion);
$("#inviteFamily").addEventListener("click", generateFamilyInvite);
$("#loginForm").addEventListener("submit", login);
$("#registerForm").addEventListener("submit", register);
$("#profileForm").addEventListener("submit", (event) => { event.preventDefault(); const users = read(STORE.users, []); const id = localStorage.getItem(STORE.session); const updated = users.map((user) => user.id === id ? { ...user, nickname: $("#profileNameInput").value.trim(), role: $("#profileRoleInput").value, stage: $("#profileStageInput").value } : user); write(STORE.users, updated); closeModal("accountModal"); updateAccountHeader(); showToast("个人资料已保存"); });
$("#logoutButton").addEventListener("click", () => { localStorage.removeItem(STORE.session); closeModal("accountModal"); updateAccountHeader(); showToast("已退出当前账号，可继续访客浏览"); });
$("#continueGuest").addEventListener("click", () => { localStorage.setItem("yinlu_guest_seen", "1"); closeModal("accountModal"); showToast("已进入访客试用，可随时注册保存数据"); });
$$('.stage-option').forEach((button) => button.addEventListener("click", () => setStage(button.dataset.stage)));
$$('.filter-pill').forEach((button) => button.addEventListener("click", () => { currentFilter = button.dataset.filter; $$('.filter-pill').forEach((item) => item.classList.toggle("active", item === button)); renderExperiences(); }));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeModal("questionModal"); closeModal("accountModal"); } });

setStage(currentStage); updateAccountHeader(); hydrateIcons();
if (!currentUser() && !localStorage.getItem("yinlu_guest_seen")) window.setTimeout(showAccount, 500);
