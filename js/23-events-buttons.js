/**
 * 各按钮直接绑定
 * 原 app.js 第 3458-3604 行（机械切分，内容未改动）
 * 建议维护：G1 前端组
 */
$("#previousStage")?.addEventListener("click", () => moveStage(-1));
$("#nextStage")?.addEventListener("click", () => moveStage(1));
$$("[data-stage-dot]").forEach((button) => button.addEventListener("click", () => setStage(button.dataset.stageDot)));
$$("[data-stage-search-submit]").forEach((button) => button.addEventListener("click", () => runStageSearch(button.closest(".stage-slide"))));
$$("[data-stage-search]").forEach((input) => input.addEventListener("keydown", (event) => { if (event.key === "Enter") runStageSearch(input.closest(".stage-slide")); }));
$$("[data-stage-task]").forEach((button) => button.addEventListener("click", () => runStageTask(button.dataset.stageTask)));
const stageCarousel = $("#stageCarousel");
if (stageCarousel) {
  stageCarousel.addEventListener("keydown", (event) => {
    if (event.target.matches("input, button")) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); moveStage(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); moveStage(1); }
  });
  let touchStartX = 0;
  stageCarousel.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0]?.clientX || 0; }, { passive: true });
  stageCarousel.addEventListener("touchend", (event) => {
    const distance = (event.changedTouches[0]?.clientX || 0) - touchStartX;
    if (Math.abs(distance) < 45) return;
    moveStage(distance > 0 ? -1 : 1);
  }, { passive: true });
}
$$('[data-dimension-filter]').forEach((button) => button.addEventListener("click", () => {
  const dimension = button.dataset.dimensionFilter;
  if (dimension === "all") currentDimensionFilters.clear();
  else if (currentDimensionFilters.has(dimension)) currentDimensionFilters.delete(dimension);
  else currentDimensionFilters.add(dimension);
  updateDimensionFilterButtons();
  renderExperiences();
}));
$$('[data-source-filter]').forEach((button) => button.addEventListener("click", () => {
  currentSourceFilter = button.dataset.sourceFilter;
  const availableDimensions = EXPERIENCE_DIMENSIONS_BY_SOURCE[currentSourceFilter] || EXPERIENCE_DIMENSIONS_BY_SOURCE.all;
  [...currentDimensionFilters].filter((dimension) => !availableDimensions.includes(dimension)).forEach((dimension) => currentDimensionFilters.delete(dimension));
  if (currentSourceFilter === "official") currentTimeFilter = "all";
  $$('[data-source-filter]').forEach((item) => item.classList.toggle("active", item === button));
  updateDimensionFilterButtons();
  $$('[data-time-filter]').forEach((item) => item.classList.toggle("active", item.dataset.timeFilter === currentTimeFilter));
  renderExperiences();
}));
$$('[data-time-filter]').forEach((button) => button.addEventListener("click", () => {
  currentTimeFilter = button.dataset.timeFilter;
  $$('[data-time-filter]').forEach((item) => item.classList.toggle("active", item === button));
  renderExperiences();
}));
const experienceSchoolSearch = $("#experienceSchoolSearch"); if (experienceSchoolSearch) experienceSchoolSearch.addEventListener("input", (event) => { currentSchoolSearch = event.target.value; renderExperiences(); });
const experienceMajorSearch = $("#experienceMajorSearch"); if (experienceMajorSearch) {
  experienceMajorSearch.addEventListener("focus", () => { currentExperienceMajorOpen = true; currentExperienceRegionOpen = false; renderLibraryMajorPicker("experience"); renderLibraryRegionPicker("experience"); });
  experienceMajorSearch.addEventListener("input", (event) => { currentMajorSearch = event.target.value; currentExperienceMajorCategory = ""; currentExperienceMajorOpen = true; renderExperiences(); });
  experienceMajorSearch.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); $("#experienceMajorOptions [data-major-option]")?.click(); } });
}
const institutionSchoolSearch = $("#institutionSchoolSearch"); if (institutionSchoolSearch) institutionSchoolSearch.addEventListener("input", (event) => { currentInstitutionSchoolSearch = event.target.value; renderExperiences(); });
const institutionMajorSearch = $("#institutionMajorSearch"); if (institutionMajorSearch) {
  institutionMajorSearch.addEventListener("focus", () => { currentInstitutionMajorOpen = true; currentInstitutionRegionOpen = false; renderLibraryMajorPicker("institution"); renderLibraryRegionPicker("institution"); });
  institutionMajorSearch.addEventListener("input", (event) => { currentInstitutionMajorSearch = event.target.value; currentInstitutionMajorCategory = ""; currentInstitutionMajorOpen = true; renderExperiences(); });
  institutionMajorSearch.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); $("#institutionMajorOptions [data-major-option]")?.click(); } });
}
const institutionRegionSearch = $("#institutionRegionSearch"); if (institutionRegionSearch) {
  institutionRegionSearch.addEventListener("focus", () => {
    currentInstitutionRegionOpen = true;
    currentInstitutionMajorOpen = false;
    renderLibraryRegionPicker("institution");
    renderLibraryMajorPicker("institution");
    if (currentInstitutionRegion !== "all") window.setTimeout(() => institutionRegionSearch.select(), 0);
  });
  institutionRegionSearch.addEventListener("input", (event) => {
    currentInstitutionRegionSearch = event.target.value;
    currentInstitutionRegion = "all";
    currentInstitutionRegionLetter = "";
    currentInstitutionRegionOpen = true;
    renderExperiences();
  });
  institutionRegionSearch.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    $("#institutionRegionOptions [data-library-region]")?.click();
  });
}
const experienceRegionSearch = $("#experienceRegionSearch"); if (experienceRegionSearch) {
  experienceRegionSearch.addEventListener("focus", () => {
    currentExperienceRegionOpen = true;
    currentExperienceMajorOpen = false;
    renderLibraryRegionPicker("experience");
    renderLibraryMajorPicker("experience");
    if (currentExperienceRegion !== "all") window.setTimeout(() => experienceRegionSearch.select(), 0);
  });
  experienceRegionSearch.addEventListener("input", (event) => {
    currentExperienceRegionSearch = event.target.value;
    currentExperienceRegion = "all";
    currentExperienceRegionLetter = "";
    currentExperienceRegionOpen = true;
    renderExperiences();
  });
  experienceRegionSearch.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    $("#experienceRegionOptions [data-library-region]")?.click();
  });
}
const clearInstitutionFilters = $("#clearInstitutionFilters"); if (clearInstitutionFilters) clearInstitutionFilters.addEventListener("click", () => {
  currentInstitutionSchoolSearch = "";
  currentInstitutionMajorSearch = "";
  currentInstitutionRegion = "all";
  currentInstitutionRegionSearch = "";
  currentInstitutionRegionLetter = "";
  currentInstitutionRegionOpen = false;
  currentInstitutionMajorCategory = "";
  currentInstitutionMajorOpen = false;
  if (institutionSchoolSearch) institutionSchoolSearch.value = "";
  if (institutionMajorSearch) institutionMajorSearch.value = "";
  renderExperiences();
});
const experienceSort = $("#experienceSort"); if (experienceSort) experienceSort.addEventListener("change", (event) => { currentExperienceSort = event.target.value; renderExperiences(); });
$$('[data-filter-section]').forEach((button) => button.addEventListener("click", () => toggleAdvancedExperienceFilters(button.dataset.filterSection)));
const experienceSelectedFilters = $("#experienceSelectedFilters"); if (experienceSelectedFilters) experienceSelectedFilters.addEventListener("click", (event) => {
  const tag = event.target.closest("[data-clear-filter-key]");
  if (!tag) return;
  const key = tag.dataset.clearFilterKey;
  if (key === "keyword") { currentSearch = ""; $$('[data-stage-search]').forEach((input) => { input.value = ""; }); }
  if (key === "school") { currentSchoolSearch = ""; if (experienceSchoolSearch) experienceSchoolSearch.value = ""; }
  if (key === "major") { currentMajorSearch = ""; currentExperienceMajorCategory = ""; if (experienceMajorSearch) experienceMajorSearch.value = ""; }
  if (key === "region") currentExperienceRegion = "all";
  if (key === "dimension") currentDimensionFilters.delete(tag.dataset.filterValue);
  if (key === "source") currentSourceFilter = "all";
  if (key === "time") currentTimeFilter = "all";
  if (key === "sort") currentExperienceSort = "relevance";
  if (key === "same-school" && sameSchoolToggle) sameSchoolToggle.checked = false;
  setExperienceFilters({ dimensions: [...currentDimensionFilters], source: currentSourceFilter, time: currentTimeFilter, sort: currentExperienceSort });
  renderExperiences();
});
const clearExperienceFilters = $("#clearExperienceFilters"); if (clearExperienceFilters) clearExperienceFilters.addEventListener("click", () => {
  currentSearch = "";
  currentSchoolSearch = "";
  currentMajorSearch = "";
  currentExperienceRegion = "all";
  currentExperienceRegionSearch = "";
  currentExperienceRegionLetter = "";
  currentExperienceRegionOpen = false;
  currentExperienceMajorCategory = "";
  currentExperienceMajorOpen = false;
  $$('[data-stage-search]').forEach((input) => { input.value = ""; });
  if (experienceSchoolSearch) experienceSchoolSearch.value = "";
  if (experienceMajorSearch) experienceMajorSearch.value = "";
  if (sameSchoolToggle) sameSchoolToggle.checked = false;
  setExperienceFilters();
  renderExperiences();
});

