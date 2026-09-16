/**
 * 键盘与滚动监听
 * 原 app.js 第 3605-3635 行（机械切分，内容未改动）
 * 建议维护：G1 前端组
 */
document.addEventListener("keydown", (event) => {
  const onboardingOverlay = $("#onboardingOverlay");
  if (onboardingIndex >= 0 || (onboardingOverlay && !onboardingOverlay.hidden)) {
    if (event.key === "Escape") {
      event.preventDefault();
      finishOnboarding({ showComplete: false });
    } else if (["Enter", "ArrowRight"].includes(event.key) && !event.target.closest("button")) {
      event.preventDefault();
      advanceOnboarding();
    }
    return;
  }
  if (event.key === "Escape") {
    currentInstitutionRegionOpen = false;
    currentExperienceRegionOpen = false;
    renderLibraryRegionPicker("institution");
    renderLibraryRegionPicker("experience");
    closeModal("questionModal");
    closeModal("accountModal");
    closeModal("decisionCalendarModal");
    setCyberPetOpen(false);
    setCyberPetAvatarMenu(false);
    setThemeMenu(false);
  }
});
window.addEventListener("resize", refreshOnboardingPosition);
window.addEventListener("scroll", refreshOnboardingPosition, true);
window.addEventListener("scroll", scheduleBackToTopUpdate, { passive: true });
window.addEventListener("resize", scheduleBackToTopUpdate);
$("#backToTopButton")?.addEventListener("click", scrollCurrentPageToTop);

