/**
 * Toast 与弹窗
 * 原 app.js 第 629-650 行（机械切分，内容未改动）
 * 建议维护：G1 前端组
 */
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

