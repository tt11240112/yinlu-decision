/**
 * 启动初始化
 * 原 app.js 第 3636-3657 行（机械切分，内容未改动）
 * 建议维护：G0 项目组
 */
applyTheme(localStorage.getItem(STORE.theme) || document.documentElement.dataset.theme || "apple");
applyExperienceLayout(localStorage.getItem(STORE.experienceLayout) || "horizontal", { persist: false });
renderDecisionCountdown(); renderDecisionCalendar();
setCyberPetAvatar(read(STORE.petAvatar, "egret"), { persist: true });
setCyberPetMotionReduced(read(STORE.petMotion, window.matchMedia("(prefers-reduced-motion: reduce)").matches), { persist: false });
restoreCyberPetPosition(); initializeCyberPetDrag(); initializeCyberPetAvatarInteractions(); setCyberPetTab("tools"); renderCyberPetContext();
window.addEventListener("resize", () => {
  const pet = $("#cyberPet");
  if (pet) setCyberPetPosition(pet.getBoundingClientRect().left, pet.getBoundingClientRect().top);
});
setStage(currentStage); updateAccountHeader(); updateOnboardingReplayButton(); hydrateIcons();
switchQaTab("ask");
updateBackToTopButton();
if (!currentUser() && !localStorage.getItem("yinlu_guest_seen")) window.setTimeout(showAccount, 500);
else scheduleOnboarding(900);

document.addEventListener("click", (event) => {
  const card = event.target.closest("[data-experience-id]");
  if (!card || event.target.closest("button, a, input, select, textarea")) return;
  saveHistory(card.dataset.experienceId);
});

