/**
 * 信任页与账户头部
 * 原 app.js 第 2731-2846 行（机械切分，内容未改动）
 * 建议维护：G3 安全组
 */
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
  const step = (index, label) => `<span class="${completedSteps >= index ? "done" : ""}"><i data-lucide="${completedSteps >= index ? "check" : "circle"}"></i>${escapeHtml(label)}</span>`;
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

