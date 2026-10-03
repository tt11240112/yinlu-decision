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
  $$('[data-time-filter]').forEach((item) => item.classList.toggle("active", item.dataset.timeFilter === currentTimeFilter));
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
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return date >= cutoff && date <= today;
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


// P4 院校筛选状态：与经验库独立，避免互相污染。
const p4InstitutionFilters = { level: "all", subject: "all", batch: "all", province: "all", year: "all", sort: "relevance" };

function resetP4InstitutionFilters() {
  Object.assign(p4InstitutionFilters, { level: "all", subject: "all", batch: "all", province: "all", year: "all", sort: "relevance" });
}

function p4Array(value) { return Array.isArray(value) ? value.filter((item) => item != null) : []; }
function p4Text(value) { return String(value ?? "").trim(); }
function p4Programs(item) {
  const programs = p4Array(item.majorPrograms).filter((program) => program && typeof program === "object" && p4Text(program.name));
  const known = new Set(programs.map((program) => program.name));
  return [...programs, ...p4Array(item.majors).filter((name) => typeof name === "string" && name.trim() && !known.has(name)).map((name) => ({ name, category: MAJOR_CATEGORY_BY_NAME[name] || "" }))];
}

function p4AdmissionRecords(item) {
  // admissionSubjects 等旧字段仅是演示下拉选项，不能当作真实招生条件。
  return p4Array(item.admissionRecords).filter((row) => row && typeof row === "object"
    && Number.isInteger(row.year) && row.year >= 1900 && row.year <= 2100
    && p4Text(row.province) && p4Text(row.subjectType) && p4Text(row.batch)
    && /^https?:\/\//i.test(p4Text(row.sourceUrl)));
}

function p4HasAdmissionFilter(filters = p4InstitutionFilters) {
  return [filters.subject, filters.batch, filters.province, filters.year].some((value) => value && value !== "all");
}

function p4MatchesAdmission(row, filters = p4InstitutionFilters) {
  return (filters.subject === "all" || row.subjectType === filters.subject)
    && (filters.batch === "all" || row.batch === filters.batch)
    && (filters.province === "all" || normalizeProvinceName(row.province) === normalizeProvinceName(filters.province))
    && (filters.year === "all" || String(row.year) === filters.year);
}

function p4MatchesInstitution(item) {
  const schoolQuery = p4Text(currentInstitutionSchoolSearch).toLowerCase();
  const majorQuery = p4Text(currentInstitutionMajorSearch).toLowerCase();
  const programs = p4Programs(item);
  const category = currentInstitutionMajorCategory;
  // 门类与专业必须由同一个专业条目满足，不能分别命中两个专业。
  const majorMatches = (!majorQuery && !category) || programs.some((program) =>
    (!majorQuery || p4Text(program.name).toLowerCase().includes(majorQuery))
    && (!category || (program.category || MAJOR_CATEGORY_BY_NAME[program.name]) === category));
  const levels = p4Array(item.levels).length ? item.levels : p4Text(item.educationLevel).split(/[ /、]+/u);
  const levelMatches = p4InstitutionFilters.level === "all" || levels.some((level) => p4Text(level) === p4InstitutionFilters.level);
  return (!schoolQuery || p4Text(item.school).toLowerCase().includes(schoolQuery))
    && majorMatches && matchesRegionSelection(item, currentInstitutionRegion) && levelMatches
    && (!p4HasAdmissionFilter() || p4AdmissionRecords(item).some((row) => p4MatchesAdmission(row)));
}

function p4OrderedInstitutions(items) {
  const query = p4Text(currentInstitutionSchoolSearch).toLowerCase();
  const priority = (item) => {
    const name = p4Text(item.school).toLowerCase();
    return !query ? 0 : name === query ? 2 : name.startsWith(query) ? 1 : 0;
  };
  const date = (item) => {
    const parsed = Date.parse(item.updatedAtISO || "");
    return Number.isNaN(parsed) ? 0 : parsed;
  };
  return [...items].sort((a, b) => {
    if (p4InstitutionFilters.sort === "newest") return date(b) - date(a) || p4Text(a.school).localeCompare(p4Text(b.school), "zh-CN");
    if (p4InstitutionFilters.sort === "name") return p4Text(a.school).localeCompare(p4Text(b.school), "zh-CN");
    return priority(b) - priority(a); // 同分保留数据原顺序，不暗示院校排名。
  });
}

function ensureP4InstitutionFilters() {
  const bar = $(".institution-filter-bar");
  if (!bar) return;
  let panel = $("#p4InstitutionFilters");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "p4InstitutionFilters";
    panel.className = "p4-institution-filters";
    bar.append(panel);
    panel.addEventListener("change", (event) => {
      const key = event.target.dataset.p4Filter;
      if (!Object.prototype.hasOwnProperty.call(p4InstitutionFilters, key)) return;
      p4InstitutionFilters[key] = event.target.value;
      renderExperiences();
    });
    // 在已有清空按钮处理器执行之前重置本模块状态。
    $("#clearInstitutionFilters")?.addEventListener("click", resetP4InstitutionFilters, true);
  }
  const records = institutions.flatMap(p4AdmissionRecords);
  const unique = (values) => [...new Set(values.map(p4Text).filter(Boolean))];
  const controls = [
    ["level", "办学层次", ["本科", "专科", ...institutions.flatMap((item) => p4Array(item.levels))]],
    ["subject", "招生科类", ["物理类", "历史类", "理科", "文科", ...records.map((row) => row.subjectType)]],
    ["batch", "录取批次", ["本科批", "本科一批", "本科二批", "专科批", "本科提前批", ...records.map((row) => row.batch)]],
    ["province", "生源省份", records.map((row) => normalizeProvinceName(row.province))],
    ["year", "录取年份", unique(records.map((row) => row.year)).sort().reverse()]
  ];
  if (!panel.children.length) {
    panel.innerHTML = controls.map(([key, label]) => `<label><span>${label}</span><select id="p4-filter-${key}" data-p4-filter="${key}"></select></label>`).join("")
      + `<label><span>院校排序</span><select id="p4-filter-sort" data-p4-filter="sort"><option value="relevance">相关度</option><option value="name">校名排序</option><option value="newest">最近更新</option></select></label><p id="p4InstitutionDataNote" class="p4-filter-note" role="status"></p>`;
  }
  controls.forEach(([key, , values]) => {
    const select = $(`#p4-filter-${key}`);
    const options = unique(values);
    if (p4InstitutionFilters[key] !== "all" && !options.includes(p4InstitutionFilters[key])) p4InstitutionFilters[key] = "all";
    const markup = `<option value="all">不限</option>` + options.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
    if (select.innerHTML !== markup) select.innerHTML = markup;
    select.value = p4InstitutionFilters[key];
  });
  $("#p4-filter-sort").value = p4InstitutionFilters.sort;
  $("#p4InstitutionDataNote").textContent = records.length
    ? "地区指学校所在地，生源省份指考生报考省份。科类、批次、年份按同一条录取记录组合匹配；查询结果不代表录取承诺。"
    : "当前为院校示例资料，尚未接入可核验的录取记录。学校、专业、所在地和办学层次可筛选；选择科类或批次后将提示录取数据待补充。";
}

// 复用其他组已有的委托事件：等其更新门类状态后再刷新结果。
document.addEventListener("click", (event) => {
  const category = event.target.closest("[data-major-category]");
  if (category) window.setTimeout(() => {
    if (category.dataset.majorLibrary === "institution") currentInstitutionMajorSearch = "";
    else currentMajorSearch = "";
    renderExperiences();
  });
  if (event.target.closest("[data-p4-clear-institutions]")) $("#clearInstitutionFilters")?.click();
});
document.addEventListener("change", (event) => {
  if (["admissionYear", "admissionProvince", "admissionSubject"].includes(event.target.id)) renderP4AdmissionResults();
});

// 详情专业搜索由 P4 自有输入框处理；旧 P5 处理器使用原始数组，缺字段时会报错。
document.addEventListener("input", (event) => {
  if (event.target.id !== "p4SchoolMajorSearch") return;
  const raw = institutions.find((item) => item.id === currentSchoolDetail);
  if (!raw) return;
  const item = p4InstitutionView(raw);
  const query = event.target.value;
  const list = $("#majorProgramList");
  if (list) {
    list.innerHTML = renderMajorPrograms(item, query);
    const count = $("#majorProgramCount");
    if (count) count.textContent = `${list.querySelectorAll(".major-program-item").length} 个匹配专业`;
  }
  hydrateIcons();
});
