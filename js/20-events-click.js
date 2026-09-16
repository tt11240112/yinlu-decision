/**
 * 全局点击事件委托
 * 原 app.js 第 3157-3357 行（机械切分，内容未改动）
 * 建议维护：G1 前端组
 */
// 事件委托保留，但同时安全绑定核心按钮以避免空引用错误
document.addEventListener("click", (event) => {
  const petAvatar = event.target.closest("#cyberPetAvatarMenu [data-pet-avatar]");
  if (petAvatar) {
    setCyberPetAvatar(petAvatar.dataset.petAvatar, { notify: true });
    setCyberPetAvatarMenu(false);
    if (event.detail === 0) $("#cyberPetToggle")?.focus();
    return;
  }
  const petAction = event.target.closest("[data-pet-action]");
  if (petAction) { handleCyberPetAction(petAction.dataset.petAction); return; }
  const experienceLayout = event.target.closest("[data-experience-layout]");
  if (experienceLayout) { applyExperienceLayout(experienceLayout.dataset.experienceLayout, { notify: true }); return; }
  const experienceContentTab = event.target.closest("[data-experience-content-tab]");
  if (experienceContentTab) { switchExperienceContentTab(experienceContentTab.dataset.experienceContentTab); return; }
  const regionToggle = event.target.closest("[data-region-toggle]");
  if (regionToggle) {
    const library = regionToggle.dataset.regionToggle;
    if (library === "institution") {
      currentInstitutionRegionOpen = !currentInstitutionRegionOpen;
      currentInstitutionMajorOpen = false;
    } else {
      currentExperienceRegionOpen = !currentExperienceRegionOpen;
      currentExperienceMajorOpen = false;
    }
    renderLibraryRegionPicker(library);
    renderLibraryMajorPicker(library);
    if ((library === "institution" ? currentInstitutionRegionOpen : currentExperienceRegionOpen)) {
      window.setTimeout(() => $(`#${library}RegionSearch`)?.focus(), 0);
    }
    return;
  }
  const regionLetter = event.target.closest("[data-region-letter]");
  if (regionLetter) {
    const library = regionLetter.dataset.regionLibrary;
    if (library === "institution") {
      currentInstitutionRegionLetter = regionLetter.dataset.regionLetter;
      currentInstitutionRegionSearch = "";
      currentInstitutionRegionOpen = true;
    } else {
      currentExperienceRegionLetter = regionLetter.dataset.regionLetter;
      currentExperienceRegionSearch = "";
      currentExperienceRegionOpen = true;
    }
    renderLibraryRegionPicker(library);
    return;
  }
  const libraryRegion = event.target.closest("[data-library-region]");
  if (libraryRegion) {
    const library = libraryRegion.dataset.libraryRegion;
    const province = libraryRegion.dataset.regionProvince || "";
    const city = libraryRegion.dataset.regionCity || "";
    const selection = makeRegionSelection(province, city);
    const shouldClose = Boolean(city || isMunicipality(province) || libraryRegion.hasAttribute("data-region-scope-all") || !province);
    if (library === "institution") {
      currentInstitutionRegion = selection;
      currentInstitutionRegionSearch = "";
      currentInstitutionRegionLetter = province ? REGION_INITIAL_BY_PROVINCE[province] || "" : "";
      currentInstitutionRegionOpen = !shouldClose;
    } else {
      currentExperienceRegion = selection;
      currentExperienceRegionSearch = "";
      currentExperienceRegionLetter = province ? REGION_INITIAL_BY_PROVINCE[province] || "" : "";
      currentExperienceRegionOpen = !shouldClose;
    }
    renderExperiences();
    return;
  }
  const majorToggle = event.target.closest("[data-major-toggle]");
  if (majorToggle) {
    const library = majorToggle.dataset.majorToggle;
    if (library === "institution") {
      currentInstitutionMajorOpen = !currentInstitutionMajorOpen;
      currentInstitutionRegionOpen = false;
    } else {
      currentExperienceMajorOpen = !currentExperienceMajorOpen;
      currentExperienceRegionOpen = false;
    }
    renderLibraryMajorPicker(library);
    renderLibraryRegionPicker(library);
    if (library === "institution" ? currentInstitutionMajorOpen : currentExperienceMajorOpen) window.setTimeout(() => $(`#${library}MajorSearch`)?.focus(), 0);
    return;
  }
  const majorCategory = event.target.closest("[data-major-category]");
  if (majorCategory) {
    const library = majorCategory.dataset.majorLibrary;
    const category = majorCategory.dataset.majorCategory;
    if (library === "institution") {
      currentInstitutionMajorCategory = currentInstitutionMajorCategory === category ? "" : category;
      currentInstitutionMajorOpen = true;
    } else {
      currentExperienceMajorCategory = currentExperienceMajorCategory === category ? "" : category;
      currentExperienceMajorOpen = true;
    }
    renderLibraryMajorPicker(library);
    return;
  }
  const majorOption = event.target.closest("[data-major-option]");
  if (majorOption) {
    const library = majorOption.dataset.majorLibrary;
    const value = majorOption.dataset.majorOption;
    if (library === "institution") {
      currentInstitutionMajorSearch = value;
      currentInstitutionMajorOpen = false;
      currentInstitutionMajorCategory = majorCategoryForName(value);
    } else {
      currentMajorSearch = value;
      currentExperienceMajorOpen = false;
      currentExperienceMajorCategory = majorCategoryForName(value);
    }
    renderExperiences();
    return;
  }
  if ((currentInstitutionRegionOpen || currentExperienceRegionOpen || currentInstitutionMajorOpen || currentExperienceMajorOpen) && !event.target.closest(".library-region-index") && !event.target.closest(".library-major-picker")) {
    currentInstitutionRegionOpen = false;
    currentExperienceRegionOpen = false;
    currentInstitutionMajorOpen = false;
    currentExperienceMajorOpen = false;
    renderLibraryRegionPicker("institution");
    renderLibraryRegionPicker("experience");
    renderLibraryMajorPicker("institution");
    renderLibraryMajorPicker("experience");
  }
  const calendarShift = event.target.closest("[data-calendar-shift]");
  if (calendarShift) { shiftDecisionCalendar(Number(calendarShift.dataset.calendarShift)); return; }
  const calendarDate = event.target.closest("[data-calendar-date]");
  if (calendarDate) { selectDecisionDate(calendarDate.dataset.calendarDate); return; }
  const deleteDecision = event.target.closest("[data-delete-decision-event]");
  if (deleteDecision) { deleteDecisionEvent(deleteDecision.dataset.deleteDecisionEvent); return; }
  const nav = event.target.closest("[data-view]"); if (nav) { switchView(nav.dataset.view); return; }
  const targetView = event.target.closest("[data-view-target]"); if (targetView) { switchView(targetView.dataset.viewTarget); return; }
  const schoolDetail = event.target.closest("[data-school-detail]"); if (schoolDetail) {
    const activeView = $(".view.active")?.id.replace("view-", "");
    if (activeView && activeView !== "school-detail") currentSchoolReturnView = activeView;
    currentSchoolDetail = schoolDetail.dataset.schoolDetail;
    switchView("school-detail");
    return;
  }
  const schoolAnchor = event.target.closest("[data-school-anchor]"); if (schoolAnchor) { scrollToAnchor(schoolAnchor.dataset.schoolAnchor); $$("[data-school-anchor]").forEach((button) => button.classList.toggle("active", button === schoolAnchor)); return; }
  const modalTrigger = event.target.closest("[data-open-modal]"); if (modalTrigger) { openModal(modalTrigger.dataset.openModal); return; }
  if (event.target.closest("[data-open-account]")) { showAccount(); return; }
  const candidateTab = event.target.closest("[data-candidate-tab]"); if (candidateTab) { switchCandidateTab(candidateTab.dataset.candidateTab); return; }
  if (event.target.closest("[data-open-compare-history]")) { openComparisonHistory(); return; }
  const restoreComparisonButton = event.target.closest("[data-restore-comparison]"); if (restoreComparisonButton) { restoreComparison(restoreComparisonButton.dataset.restoreComparison); return; }
  const deleteComparisonButton = event.target.closest("[data-delete-comparison]"); if (deleteComparisonButton) { deleteComparisonHistory(deleteComparisonButton.dataset.deleteComparison); return; }
  if (event.target.closest("[data-start-school-compare]")) {
    const candidates = currentSchoolCandidateResults.filter((item) => selectedSchoolCandidateIds.has(item.id));
    if (candidates.length < 2) { showToast("请至少选择 2 所院校"); return; }
    activeHistoryComparison = null;
    recordComparison("school", candidates, "院校优先");
    schoolCompareMode = true;
    renderCompare();
    return;
  }
  if (event.target.closest("[data-exit-school-compare]")) { activeHistoryComparison = null; schoolCompareMode = false; renderCompare(); return; }
  const continueSchoolMajor = event.target.closest("[data-continue-school-major]"); if (continueSchoolMajor) { continueSchoolComparisonToMajors(continueSchoolMajor.dataset.continueSchoolMajor); return; }
  if (event.target.closest("[data-back-school-comparison]")) { schoolMajorSelectionMode = false; schoolMajorCompareMode = false; schoolCompareMode = true; renderCompare(); return; }
  if (event.target.closest("[data-start-school-major-compare]")) { startSchoolMajorComparison(); return; }
  if (event.target.closest("[data-start-major-compare]")) {
    const candidates = currentMajorCandidateResults.filter((item) => selectedMajorCandidateKeys.has(item.key));
    if (candidates.length < 2) { showToast("请至少选择 2 个专业组合"); return; }
    activeHistoryComparison = null;
    recordComparison("major", candidates, "专业优先搜索");
    majorCompareMode = true;
    renderCompare();
    return;
  }
  if (event.target.closest("[data-exit-major-compare]")) {
    activeHistoryComparison = null;
    if (currentCandidateTab === "school") {
      schoolMajorCompareMode = false;
      schoolMajorSelectionMode = true;
    } else {
      majorCompareMode = false;
    }
    renderCompare();
    return;
  }
  const majorSearchSuggestion = event.target.closest("[data-search-major]"); if (majorSearchSuggestion) { applyMajorSearch(majorSearchSuggestion.dataset.searchMajor); return; }
  if (event.target.closest("[data-clear-major-search]")) { applyMajorSearch(""); return; }
  const removeSchool = event.target.closest("[data-remove-school-candidate]"); if (removeSchool) { removeSchoolCandidate(removeSchool.dataset.removeSchoolCandidate); return; }
  const removeMajor = event.target.closest("[data-remove-major-school]"); if (removeMajor) { removeMajorCandidate(removeMajor.dataset.removeMajorSchool, removeMajor.dataset.removeMajorName); return; }
  const modalCloser = event.target.closest("[data-close-modal]"); if (modalCloser) { closeModal(modalCloser.dataset.closeModal); return; }
  if (event.target.classList.contains("modal-backdrop")) closeModal(event.target.id);
  const favorite = event.target.closest("[data-favorite]"); if (favorite) { toggleFavorite(favorite.dataset.favorite); return; }
  if (event.target.closest("[data-family-invite]")) { generateFamilyInvite(); return; }
  const joinFamily = event.target.closest("#joinFamily");
  if (joinFamily) {
    const code = document.querySelector("#familyCodeInput")?.value.trim();
    joinFamilyInvite(code);
    return;
  }
  const code = event.target.closest("[data-copy-code]"); if (code) { copyText(code.dataset.copyCode); return; }
  if (event.target.closest("[data-start-verify]")) { requestVerification(); return; }
  if (event.target.closest("[data-report-comment]")) { showToast("已记录举报，正式版本将进入内容审核流程"); return; }
  if (event.target.closest("[data-share-candidates]")) { showToast("候选清单分享功能将在正式后端版本开放"); return; }
  if (event.target.closest("[data-clear-search]")) { $("#clearExperienceFilters")?.click(); return; }
  const authTab = event.target.closest("[data-auth-tab]"); if (authTab) { $$(".auth-tab").forEach((tab) => tab.classList.toggle("active", tab === authTab)); $("#loginForm").classList.toggle("hidden"); $("#registerForm").classList.toggle("hidden"); return; }
  const qaTab = event.target.closest("[data-qa-tab]"); if (qaTab) { switchQaTab(qaTab.dataset.qaTab); return; }
});

