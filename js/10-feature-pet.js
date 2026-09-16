/**
 * 电子宠物助手
 * 原 app.js 第 808-1188 行（机械切分，内容未改动）
 * 建议维护：G1 前端组
 */
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

