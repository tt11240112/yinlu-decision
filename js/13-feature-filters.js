/**
 * 阶段与筛选器
 * 原 app.js 第 1567-1731 行（机械切分，内容未改动）
 * 建议维护：G2 业务组
 */
function setStage(stage) {
  if (!stageOrder.includes(stage)) return;
  currentStage = stage;
  const activeIndex = stageOrder.indexOf(stage);
  const previousIndex = (activeIndex - 1 + stageOrder.length) % stageOrder.length;
  const nextIndex = (activeIndex + 1) % stageOrder.length;
  $$(".stage-slide").forEach((slide) => {
    const slideIndex = stageOrder.indexOf(slide.dataset.stage);
    slide.classList.toggle("active", slideIndex === activeIndex);
    slide.classList.toggle("previous", slideIndex === previousIndex);
    slide.classList.toggle("next", slideIndex === nextIndex);
    slide.classList.toggle("hidden-stage", ![activeIndex, previousIndex, nextIndex].includes(slideIndex));
    slide.setAttribute("aria-hidden", slideIndex === activeIndex ? "false" : "true");
    slide.inert = slideIndex !== activeIndex;
  });
  $$("[data-stage-dot]").forEach((button) => {
    const active = button.dataset.stageDot === stage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  const position = $("#stagePosition");
  if (position) position.textContent = `${activeIndex + 1} / ${stageOrder.length}`;
  renderCyberPetContext();
}

function moveStage(direction) {
  const currentIndex = stageOrder.indexOf(currentStage);
  setStage(stageOrder[(currentIndex + direction + stageOrder.length) % stageOrder.length]);
}

function setExperienceFilters({ dimension = "all", dimensions = null, source = "all", time = "all", sort = "relevance" } = {}) {
  currentSourceFilter = source;
  const availableDimensions = EXPERIENCE_DIMENSIONS_BY_SOURCE[source] || EXPERIENCE_DIMENSIONS_BY_SOURCE.all;
  const requestedDimensions = Array.isArray(dimensions) ? dimensions : dimension === "all" ? [] : [dimension];
  currentDimensionFilters.clear();
  requestedDimensions.filter((item) => availableDimensions.includes(item)).forEach((item) => currentDimensionFilters.add(item));
  currentTimeFilter = source === "official" ? "all" : time;
  currentExperienceSort = sort;
  updateDimensionFilterButtons();
  $$('[data-source-filter]').forEach((item) => item.classList.toggle("active", item.dataset.sourceFilter === source));
  $$('[data-time-filter]').forEach((item) => item.classList.toggle("active", item.dataset.timeFilter === time));
  const sortSelect = $("#experienceSort");
  if (sortSelect) sortSelect.value = sort;
  updateExperienceFilterUi();
}

function formatContentDate(value) {
  if (!value) return "时间待补充";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function matchesContentTime(value) {
  if (currentTimeFilter === "all") return true;
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  if (currentTimeFilter === "6m") cutoff.setMonth(cutoff.getMonth() - 6);
  if (currentTimeFilter === "1y") cutoff.setFullYear(cutoff.getFullYear() - 1);
  if (currentTimeFilter === "3y") cutoff.setFullYear(cutoff.getFullYear() - 3);
  return date >= cutoff;
}

function updateExperienceFilterUi() {
  const dimensionLabels = { all: "全部", "课程学习": "课程学习", "宿舍生活": "宿舍生活", "设施布局": "设施布局", "社团活动": "社团活动", "校园氛围": "校园氛围", "城市环境": "城市环境", "就业去向": "就业去向" };
  const sourceLabels = { all: "全部", official: "官方信息", student: "在读学生", expert: "教师 / 从业者" };
  const timeLabels = { all: "不限", "6m": "近半年", "1y": "近一年", "3y": "近三年" };
  const dimensionSummary = $("#dimensionFilterSummary");
  const sourceSummary = $("#sourceFilterSummary");
  const timeSummary = $("#timeFilterSummary");
  if (dimensionSummary) {
    const selectedDimensions = [...currentDimensionFilters];
    dimensionSummary.textContent = selectedDimensions.length === 0 ? "全部" : selectedDimensions.length === 1 ? dimensionLabels[selectedDimensions[0]] : `已选 ${selectedDimensions.length} 项`;
  }
  if (sourceSummary) sourceSummary.textContent = sourceLabels[currentSourceFilter] || "全部";
  if (timeSummary) timeSummary.textContent = currentSourceFilter === "official" ? "不适用" : timeLabels[currentTimeFilter] || "不限";
  const timeFilterTrigger = $("#timeFilterTrigger");
  if (timeFilterTrigger) {
    timeFilterTrigger.disabled = currentSourceFilter === "official";
    timeFilterTrigger.setAttribute("aria-disabled", String(currentSourceFilter === "official"));
  }
  syncDimensionFilterAvailability();

  const selected = [];
  if (currentSearch.trim()) selected.push({ key: "keyword", label: `关键词：${currentSearch.trim()}` });
  if (currentSchoolSearch.trim()) selected.push({ key: "school", label: `学校：${currentSchoolSearch.trim()}` });
  if (currentMajorSearch.trim()) selected.push({ key: "major", label: `专业：${currentMajorSearch.trim()}` });
  if (currentExperienceRegion !== "all") selected.push({ key: "region", label: `地区：${regionSelectionLabel(currentExperienceRegion)}` });
  currentDimensionFilters.forEach((dimension) => selected.push({ key: "dimension", value: dimension, label: dimensionLabels[dimension] }));
  if (currentSourceFilter !== "all") selected.push({ key: "source", label: sourceLabels[currentSourceFilter] });
  if (currentTimeFilter !== "all") selected.push({ key: "time", label: timeLabels[currentTimeFilter] });
  if (currentExperienceSort === "newest") selected.push({ key: "sort", label: "最新发布" });
  if ($("#sameSchoolToggle")?.checked) selected.push({ key: "same-school", label: "同高中优先" });
  const selectedFilters = $("#experienceSelectedFilters");
  if (selectedFilters) {
    selectedFilters.innerHTML = selected.length
      ? selected.map((item) => `<button class="filter-selected-tag" type="button" data-clear-filter-key="${escapeHtml(item.key)}"${item.value ? ` data-filter-value="${escapeHtml(item.value)}"` : ""} title="移除${escapeHtml(item.label)}">${escapeHtml(item.label)}<i data-lucide="x"></i></button>`).join("")
      : `<span class="filter-empty-label">当前未添加筛选条件</span>`;
  }
  const activeFilterCount = $("#activeFilterCount");
  if (activeFilterCount) activeFilterCount.textContent = String(selected.length);
  const clearButton = $("#clearExperienceFilters");
  if (clearButton) clearButton.disabled = selected.length === 0;
  syncAdvancedExperienceFilterPanels();
  hydrateIcons();
}

function syncDimensionFilterAvailability() {
  const availableDimensions = EXPERIENCE_DIMENSIONS_BY_SOURCE[currentSourceFilter] || EXPERIENCE_DIMENSIONS_BY_SOURCE.all;
  $$('[data-dimension-filter]').forEach((button) => {
    const dimension = button.dataset.dimensionFilter;
    button.hidden = dimension !== "all" && !availableDimensions.includes(dimension);
  });
}

function updateDimensionFilterButtons() {
  $$('[data-dimension-filter]').forEach((button) => {
    const dimension = button.dataset.dimensionFilter;
    const active = dimension === "all" ? currentDimensionFilters.size === 0 : currentDimensionFilters.has(dimension);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function syncAdvancedExperienceFilterPanels() {
  const panel = $("#advancedExperienceFilters");
  if (!panel || panel.hidden) return;
  const activeSection = panel.dataset.activeSection || "all";
  $$('[data-filter-section-panel]').forEach((sectionPanel) => {
    const isTimePanel = sectionPanel.dataset.filterSectionPanel === "time";
    const matchesSection = activeSection === "all" || sectionPanel.dataset.filterSectionPanel === activeSection;
    sectionPanel.hidden = !matchesSection || (isTimePanel && currentSourceFilter === "official");
  });
}

function toggleAdvancedExperienceFilters(section) {
  const panel = $("#advancedExperienceFilters");
  if (!panel || (section === "time" && currentSourceFilter === "official")) return;
  const shouldOpen = panel.hidden || panel.dataset.activeSection !== section;
  panel.hidden = !shouldOpen;
  panel.dataset.activeSection = shouldOpen ? section : "";
  $$('[data-filter-section]').forEach((button) => {
    button.setAttribute("aria-expanded", String(shouldOpen && button.dataset.filterSection === section));
  });
  $("#toggleAdvancedFilters")?.classList.toggle("open", shouldOpen);
  syncAdvancedExperienceFilterPanels();
}

function runStageSearch(slide) {
  const input = $("[data-stage-search]", slide);
  currentSearch = input?.value.trim() || "";
  currentSchoolSearch = "";
  currentMajorSearch = "";
  currentExperienceRegion = "all";
  currentExperienceRegionSearch = "";
  currentExperienceRegionLetter = "";
  currentExperienceRegionOpen = false;
  setExperienceFilters();
  switchView("experience");
  switchExperienceContentTab("experience");
}

