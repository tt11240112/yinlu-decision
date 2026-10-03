/**
 * 地区与专业选择器
 * 原 app.js 第 1732-1983 行（机械切分，内容未改动）
 * 建议维护：G2 业务组
 */
function runStageTask(task) {
  const questionTasks = ["ask", "ask-student"];
  if (questionTasks.includes(task)) {
    switchView("questions");
    switchQaTab("ask");
    const stageSelect = $("#questionStagePreview");
    if (stageSelect) stageSelect.value = stageNames[currentStage];
    $("#questionInputPreview")?.focus();
    return;
  }
  const institutionTasks = ["school", "major", "admission", "progression"];
  const taskFilters = {
    course: { dimension: "课程学习" },
    career: { dimension: "就业去向" },
    expert: { source: "expert" },
    dorm: { dimension: "宿舍生活" },
    city: { dimension: "城市环境" }
  };
  currentSearch = "";
  currentSchoolSearch = "";
  currentMajorSearch = "";
  if (institutionTasks.includes(task)) {
    currentInstitutionSchoolSearch = "";
    currentInstitutionMajorSearch = "";
    currentInstitutionMajorCategory = "";
    currentInstitutionMajorOpen = false;
    resetP4InstitutionFilters();
    const schoolInput = $("#institutionSchoolSearch");
    if (schoolInput) schoolInput.value = "";
    currentInstitutionRegion = "all";
    currentInstitutionRegionSearch = "";
    currentInstitutionRegionLetter = "";
    currentInstitutionRegionOpen = false;
  } else {
    currentExperienceMajorCategory = "";
    currentExperienceMajorOpen = false;
    currentExperienceRegion = "all";
    currentExperienceRegionSearch = "";
    currentExperienceRegionLetter = "";
    currentExperienceRegionOpen = false;
  }
  setExperienceFilters(taskFilters[task] || {});
  switchView("experience");
  switchExperienceContentTab(institutionTasks.includes(task) ? "institution" : "experience");
  if (task === "school") $("#institutionSchoolSearch")?.focus();
  if (task === "major") $("#institutionMajorSearch")?.focus();
}

function makeRegionSelection(province = "", city = "") {
  if (city) return `city:${province}|${city}`;
  return province ? `province:${province}` : "all";
}

function parseRegionSelection(selection) {
  if (!selection || selection === "all") return { province: "", city: "" };
  if (selection.startsWith("city:")) {
    const [province = "", city = ""] = selection.slice(5).split("|");
    return { province, city };
  }
  return { province: selection.startsWith("province:") ? selection.slice(9) : selection, city: "" };
}

function regionSelectionLabel(selection) {
  const { province, city } = parseRegionSelection(selection);
  return city ? `${province} / ${city}` : province;
}

function majorCategoryForName(name = "") {
  const program = institutions.flatMap((item) => p4Programs(item)).find((item) => item.name === name);
  return program?.category || MAJOR_CATEGORY_BY_NAME[name] || "";
}

function libraryMajorOptions(library) {
  const entries = library === "institution"
    ? institutions.flatMap((institution) => p4Programs(institution).map((program) => ({ name: program.name, category: program.category || majorCategoryForName(program.name), school: institution.school })))
    : experiences.filter((item) => (item.source === "student" || item.source === "expert") && item.major).map((item) => ({ name: item.major, category: majorCategoryForName(item.major), school: item.school }));
  const grouped = new Map();
  entries.forEach((item) => {
    if (!item.name) return;
    if (!grouped.has(item.name)) grouped.set(item.name, { name: item.name, category: item.category, schools: new Set(), count: 0 });
    const option = grouped.get(item.name);
    option.count += 1;
    if (item.school) option.schools.add(item.school);
  });
  return [...grouped.values()].sort((a, b) => a.category.localeCompare(b.category, "zh-CN") || a.name.localeCompare(b.name, "zh-CN"));
}

function libraryMajorUi(library) {
  if (library === "institution") return { query: currentInstitutionMajorSearch, category: currentInstitutionMajorCategory, open: currentInstitutionMajorOpen };
  return { query: currentMajorSearch, category: currentExperienceMajorCategory, open: currentExperienceMajorOpen };
}

function renderLibraryMajorPicker(library) {
  const prefix = library === "institution" ? "institution" : "experience";
  const panel = $(`#${prefix}MajorPanel`);
  const categoriesContainer = $(`#${prefix}MajorCategories`);
  const optionsContainer = $(`#${prefix}MajorOptions`);
  const input = $(`#${prefix}MajorSearch`);
  const toggle = $(`[data-major-toggle="${library}"]`);
  const picker = $(`[data-major-picker="${library}"]`);
  if (!panel || !categoriesContainer || !optionsContainer || !input || !toggle || !picker) return;
  const { query, category, open } = libraryMajorUi(library);
  const options = libraryMajorOptions(library);
  const categoryCounts = new Map(MAJOR_CATEGORIES.map((item) => [item, options.filter((option) => option.category === item).length]));
  const keyword = query.trim().toLowerCase();
  const visibleOptions = options.filter((option) => (!category || option.category === category) && (!keyword || option.name.toLowerCase().includes(keyword)));
  panel.hidden = !open;
  picker.classList.toggle("open", open);
  toggle.classList.toggle("open", open);
  input.setAttribute("aria-expanded", String(open));
  if (input.value !== query) input.value = query;
  categoriesContainer.innerHTML = MAJOR_CATEGORIES.map((item) => {
    const active = category === item;
    return `<button class="major-category-button${active ? " active" : ""}" type="button" data-major-category="${escapeHtml(item)}" data-major-library="${library}" aria-pressed="${active}"><span>${escapeHtml(item)}</span><small>${categoryCounts.get(item) || 0}</small></button>`;
  }).join("");
  const emptyText = category ? `${category}在当前${library === "institution" ? "院校样本" : "经验样本"}中暂无数据` : "未找到匹配的专业";
  optionsContainer.innerHTML = visibleOptions.length ? visibleOptions.map((option) => {
    const meta = library === "institution" ? `${option.schools.size} 所样本院校开设` : `${option.count} 条相关经验`;
    return `<button class="major-option-button" type="button" data-major-option="${escapeHtml(option.name)}" data-major-library="${library}"><span><strong>${escapeHtml(option.name)}</strong><small>${escapeHtml(option.category || "门类待补充")}</small></span><em>${meta}</em></button>`;
  }).join("") : `<div class="major-picker-empty"><strong>${escapeHtml(emptyText)}</strong><span>更多专业数据将在接入可靠资料后补充</span></div>`;
}

function normalizeProvinceName(value = "") {
  return String(value || "").trim().replace(/(壮族自治区|回族自治区|维吾尔自治区|特别行政区|自治区|省|市)$/u, "");
}

function normalizeCityName(value = "") {
  return String(value || "").trim().replace(/(自治州|综合实验区|地区|新区|市|盟|区|县)$/u, "");
}

function provinceForCity(city = "") {
  const normalizedCity = normalizeCityName(city);
  if (!normalizedCity) return "";
  // 只从省级名称或地级/省直管条目推断，避免将辽宁朝阳市误归到北京朝阳区。
  const provinces = Object.keys(REGION_CITIES).filter((province) => {
    if (normalizeProvinceName(province) === normalizedCity) return true;
    return !isMunicipality(province) && REGION_CITIES[province].some((item) => normalizeCityName(item) === normalizedCity);
  });
  return provinces.length === 1 ? provinces[0] : "";
}

function isCityLevelRegion(value = "") {
  return Boolean(String(value || "").trim());
}

function isMunicipality(value = "") {
  return [...MUNICIPALITIES].some((name) => normalizeProvinceName(name) === normalizeProvinceName(value));
}

function matchesRegionSelection(item, selection) {
  if (!selection || selection === "all") return true;
  const selected = parseRegionSelection(selection);
  const itemCity = String(item.city || "").trim();
  const itemProvince = String(item.province || provinceForCity(itemCity)).trim();
  const provinceMatches = !selected.province || normalizeProvinceName(itemProvince) === normalizeProvinceName(selected.province);
  if (!provinceMatches) return false;
  return !selected.city || normalizeCityName(itemCity) === normalizeCityName(selected.city);
}

function regionTypeLabel(province, city = "") {
  if (city) {
    if (city.endsWith("自治州")) return "州";
    if (city.endsWith("地区")) return "地";
    if (city.endsWith("盟")) return "盟";
    if (city.endsWith("区") || city.endsWith("县")) return "区";
    return "市";
  }
  if (province === "海外") return "外";
  if (province.endsWith("特别行政区")) return "特";
  if (province.endsWith("自治区")) return "区";
  if (province.endsWith("市")) return "直";
  return "省";
}

function regionWholeAreaLabel(province = "") {
  if (province.endsWith("特别行政区")) return "全特别行政区";
  if (province.endsWith("自治区")) return "全自治区";
  if (province.endsWith("市")) return "全市";
  if (province === "海外") return "全部海外地区";
  return "全省";
}

function libraryRegionUi(library) {
  if (library === "institution") {
    return { selection: currentInstitutionRegion, query: currentInstitutionRegionSearch, letter: currentInstitutionRegionLetter, open: currentInstitutionRegionOpen };
  }
  return { selection: currentExperienceRegion, query: currentExperienceRegionSearch, letter: currentExperienceRegionLetter, open: currentExperienceRegionOpen };
}

function renderLibraryRegionPicker(library) {
  const isInstitution = library === "institution";
  const prefix = isInstitution ? "institution" : "experience";
  const lettersContainer = $(`#${prefix}RegionLetters`);
  const optionsContainer = $(`#${prefix}RegionOptions`);
  const searchInput = $(`#${prefix}RegionSearch`);
  const panel = $(`#${prefix}RegionPanel`);
  const toggle = $(`[data-region-toggle="${library}"]`);
  const allButton = $(`[data-library-region="${library}"][data-region-province=""][data-region-city=""]`);
  if (!lettersContainer || !optionsContainer || !panel || !toggle) return;
  const { selection, query, letter, open } = libraryRegionUi(library);
  const selected = parseRegionSelection(selection);
  const availableLetters = new Set(Object.values(REGION_INITIAL_BY_PROVINCE));
  panel.hidden = !open;
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  if (searchInput) {
    const displayValue = open ? query : query || regionSelectionLabel(selection);
    if (searchInput.value !== displayValue) searchInput.value = displayValue;
    searchInput.setAttribute("aria-expanded", String(open));
  }
  if (allButton) {
    const active = selection === "all";
    allButton.classList.toggle("active", active);
    allButton.setAttribute("aria-pressed", String(active));
  }
  lettersContainer.innerHTML = REGION_LETTERS.map((item) => {
    const disabled = !availableLetters.has(item);
    const active = letter === item;
    return `<button class="region-letter-button${active ? " active" : ""}" type="button" data-region-letter="${item}" data-region-library="${library}" aria-pressed="${active}"${disabled ? " disabled" : ""}>${item}</button>`;
  }).join("");

  const keyword = query.trim();
  let results = [];
  if (keyword) {
    Object.entries(REGION_CITIES).forEach(([province, cities]) => {
      if (province.includes(keyword)) results.push({ province, city: "" });
      cities.filter((city) => isCityLevelRegion(city) && city.includes(keyword)).forEach((city) => results.push({ province, city }));
    });
    // 保留全部匹配项，由面板滚动承载，避免后面的地区无法被选中。
  } else if (letter) {
    results = Object.keys(REGION_CITIES)
      .filter((province) => REGION_INITIAL_BY_PROVINCE[province] === letter)
      .map((province) => ({ province, city: "" }));
  } else {
    results = Object.keys(REGION_CITIES)
      .sort((a, b) => REGION_INITIAL_BY_PROVINCE[a].localeCompare(REGION_INITIAL_BY_PROVINCE[b]) || a.localeCompare(b, "zh-CN"))
      .map((province) => ({ province, city: "" }));
  }

  const resultButton = ({ province, city }, compact = false) => {
    const value = makeRegionSelection(province, city);
    const active = selection === value;
    return `<button class="region-result-button${compact ? " compact" : ""}${active ? " active" : ""}" type="button" data-library-region="${library}" data-region-province="${escapeHtml(province)}" data-region-city="${escapeHtml(city)}" aria-pressed="${active}"><strong>${escapeHtml(city || province)}</strong>${city ? `<small>${escapeHtml(province)}</small>` : ""}</button>`;
  };
  let resultButtons = "";
  if (keyword) {
    resultButtons = `<div class="region-search-results">${results.map((item) => resultButton(item)).join("")}</div>`;
  } else {
    const groupedResults = REGION_LETTERS.map((initial) => {
      const provinces = results.filter((item) => REGION_INITIAL_BY_PROVINCE[item.province] === initial);
      if (!provinces.length) return "";
      return `<section class="region-province-group"><b>${initial}</b><div>${provinces.map((item) => resultButton(item, true)).join("")}</div></section>`;
    }).join("");
    const popularCities = !letter ? `<section class="region-popular-section"><span>热门城市</span><div>${POPULAR_REGIONS.map((item) => {
      const active = selection === makeRegionSelection(item.province, item.city);
      return `<button class="region-popular-button${active ? " active" : ""}" type="button" data-library-region="${library}" data-region-province="${escapeHtml(item.province)}" data-region-city="${escapeHtml(item.city)}"${item.city ? "" : " data-region-scope-all"} aria-pressed="${active}">${escapeHtml(item.label)}</button>`;
    }).join("")}</div></section>` : "";
    resultButtons = `${popularCities}<div class="region-province-groups">${groupedResults}</div>`;
  }

  const showSelectedProvinceCities = selected.province && !isMunicipality(selected.province) && !keyword && (!letter || REGION_INITIAL_BY_PROVINCE[selected.province] === letter);
  const cityOptions = showSelectedProvinceCities ? `<div class="region-city-panel"><div class="region-city-heading"><strong>${escapeHtml(selected.province)}</strong><span>城市</span></div><div class="region-city-options"><button class="region-city-button${selected.city ? "" : " active"}" type="button" data-library-region="${library}" data-region-province="${escapeHtml(selected.province)}" data-region-city="" data-region-scope-all aria-pressed="${String(!selected.city)}">${escapeHtml(regionWholeAreaLabel(selected.province))}</button>${(REGION_CITIES[selected.province] || []).filter(isCityLevelRegion).map((city) => `<button class="region-city-button${selected.city === city ? " active" : ""}" type="button" data-library-region="${library}" data-region-province="${escapeHtml(selected.province)}" data-region-city="${escapeHtml(city)}" aria-pressed="${String(selected.city === city)}">${escapeHtml(city)}</button>`).join("")}</div></div>` : "";
  optionsContainer.hidden = false;
  optionsContainer.innerHTML = `${results.length ? resultButtons : `<div class="region-no-results">未找到匹配地区</div>`}${cityOptions}`;
}

