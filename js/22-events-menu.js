/**
 * 菜单外部点击关闭
 * 原 app.js 第 3437-3457 行（机械切分，内容未改动）
 * 建议维护：G1 前端组
 */
document.addEventListener("click", (event) => { if (!event.target.closest(".theme-control")) setThemeMenu(false); });
document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest("#cyberPetAvatarMenu") && !event.target.closest("#cyberPetToggle")) setCyberPetAvatarMenu(false);
});
const sameSchoolToggle = $("#sameSchoolToggle"); if (sameSchoolToggle) sameSchoolToggle.addEventListener("change", renderExperiences);
const submitQuestionBtn = $("#submitQuestion"); if (submitQuestionBtn) submitQuestionBtn.addEventListener("click", submitQuestion);
const inviteFamilyBtn = $("#inviteFamily"); if (inviteFamilyBtn) inviteFamilyBtn.addEventListener("click", generateFamilyInvite);
const submitPreviewQuestion = $("#submitPreviewQuestion"); if (submitPreviewQuestion) submitPreviewQuestion.addEventListener("click", submitInlineQuestion);
const loginFormEl = $("#loginForm"); if (loginFormEl) loginFormEl.addEventListener("submit", login);
const registerFormEl = $("#registerForm"); if (registerFormEl) registerFormEl.addEventListener("submit", register);
const profileFormEl = $("#profileForm"); if (profileFormEl) profileFormEl.addEventListener("submit", saveProfile);
const profileAvatarInput = $("#profileAvatarInput"); if (profileAvatarInput) profileAvatarInput.addEventListener("change", changeProfileAvatar);
const profileAvatarButton = $("#profileAvatarButton"); if (profileAvatarButton) profileAvatarButton.addEventListener("click", () => profileAvatarInput?.click());
const profileAvatarUpload = $("#profileAvatarUpload"); if (profileAvatarUpload) profileAvatarUpload.addEventListener("click", () => profileAvatarInput?.click());
const profileAvatarRemove = $("#profileAvatarRemove"); if (profileAvatarRemove) profileAvatarRemove.addEventListener("click", removeProfileAvatar);
const profileProvinceInput = $("#profileProvinceInput"); if (profileProvinceInput) profileProvinceInput.addEventListener("change", () => setRegionOptions(profileProvinceInput.value));
const profileBirthDateInput = $("#profileBirthDateInput"); if (profileBirthDateInput) profileBirthDateInput.addEventListener("change", updateProfileAge);
const logoutButton = $("#logoutButton"); if (logoutButton) logoutButton.addEventListener("click", () => { localStorage.removeItem(STORE.session); closeModal("accountModal"); updateAccountHeader(); showToast("已退出当前账号，可继续访客浏览"); });
const continueGuestBtn = $("#continueGuest"); if (continueGuestBtn) continueGuestBtn.addEventListener("click", () => { localStorage.setItem("yinlu_guest_seen", "1"); closeModal("accountModal"); showToast("已进入访客试用，可随时注册保存数据"); });

// stage & init
