/**
 * 新手指引
 * 原 app.js 第 1306-1566 行（机械切分，内容未改动）
 * 建议维护：G1 前端组
 */
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

