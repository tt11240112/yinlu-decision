/**
 * 表单 input/change/submit 事件
 * 原 app.js 第 3358-3436 行（机械切分，内容未改动）
 * 建议维护：G2 业务组
 */
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
