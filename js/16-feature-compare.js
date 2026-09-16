/**
 * 候选与对比
 * 原 app.js 第 2206-2730 行（机械切分，内容未改动）
 * 建议维护：G2 业务组
 */
function candidateStatusFor(type, key) {
  const user = currentUser();
  if (!user) return candidateStatuses[0];
  const value = read(STORE.candidateStatus, {})[user.id]?.[`${type}:${key}`];
  return candidateStatuses.includes(value) ? value : candidateStatuses[0];
}

function renderCandidateStatusControl(type, key, user) {
  const status = candidateStatusFor(type, key);
  if (!user) return `<span class="candidate-demo-status"><i data-lucide="circle-dashed"></i>示例状态 · ${status}</span>`;
  const options = candidateStatuses.map((item) => `<option${item === status ? " selected" : ""}>${item}</option>`).join("");
  return `<label class="candidate-status-control"><span>判断状态</span><select data-candidate-status data-candidate-status-type="${type}" data-candidate-status-key="${key}" aria-label="修改候选判断状态">${options}</select></label>`;
}

function updateCandidateStatus(type, key, status) {
  const user = currentUser();
  if (!user || !candidateStatuses.includes(status)) return;
  const all = read(STORE.candidateStatus, {});
  all[user.id] = { ...(all[user.id] || {}), [`${type}:${key}`]: status };
  write(STORE.candidateStatus, all);
  renderCompare();
  showToast(`候选状态已更新为“${status}”`);
}

function clearCandidateStatus(type, key) {
  const user = currentUser();
  if (!user) return;
  const all = read(STORE.candidateStatus, {});
  if (!all[user.id]) return;
  delete all[user.id][`${type}:${key}`];
  write(STORE.candidateStatus, all);
}

function toggleSchoolCandidateSelection(id, checked) {
  if (checked && !selectedSchoolCandidateIds.has(id) && selectedSchoolCandidateIds.size >= 3) {
    showToast("一次最多对比 3 所院校");
    renderCompare();
    return;
  }
  if (checked) selectedSchoolCandidateIds.add(id);
  else selectedSchoolCandidateIds.delete(id);
  renderCompare();
}

function toggleMajorCandidateSelection(key, major, checked) {
  if (checked && selectedMajorName && selectedMajorName !== major) {
    showToast("专业优先只能比较同一个专业");
    renderCompare();
    return;
  }
  if (checked && !selectedMajorCandidateKeys.has(key) && selectedMajorCandidateKeys.size >= 3) {
    showToast("一次最多对比 3 个专业组合");
    renderCompare();
    return;
  }
  if (checked) {
    selectedMajorName = major;
    selectedMajorCandidateKeys.add(key);
  } else {
    selectedMajorCandidateKeys.delete(key);
    if (!selectedMajorCandidateKeys.size) selectedMajorName = "";
  }
  renderCompare();
}

function renderSchoolComparison(candidates) {
  const cell = (content) => candidates.map((item) => `<td>${content(item)}</td>`).join("");
  const experienceSummary = (item) => {
    const related = experiences.filter((experience) => experience.school === item.school && experience.source === "student");
    const dimensions = [...new Set(related.flatMap((experience) => experience.dimensions || []))];
    return `<strong>${related.length} 条学生经验</strong><small>${dimensions.length ? dimensions.join(" · ") : "暂无经验维度"}</small>`;
  };
  return `<div class="school-compare-view">
    <div class="school-compare-heading"><div><span class="subsection-kicker"><i data-lucide="columns-3"></i>院校对比</span><h2>${candidates.length} 所候选院校并列查看</h2><p>只呈现已有资料与来源状态，不生成综合评分或推荐结论。</p></div><button class="quiet-button" type="button" data-exit-school-compare><i data-lucide="arrow-left"></i>返回候选列表</button></div>
    <div class="school-compare-table-wrap">
      <table class="school-compare-table">
        <thead><tr><th scope="col">比较维度</th>${candidates.map((item) => `<th scope="col"><span class="compare-school-mark">${escapeHtml(item.school.slice(0, 1))}</span><strong>${escapeHtml(item.school)}</strong><small>${escapeHtml(item.city)}</small></th>`).join("")}</tr></thead>
        <tbody>
          <tr><th scope="row">我的状态</th>${cell((item) => `<span class="compare-status">${candidateStatusFor("school", item.id)}</span>`)}</tr>
          <tr><th scope="row">院校身份</th>${cell((item) => `<div class="compare-tag-list identity-tags">${(item.identityTags || ["身份标签待更新"]).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div><strong>${escapeHtml(item.type)}</strong><small>${escapeHtml(item.identityNote || "重新发起对比后显示最新院校身份")}</small>`)}</tr>
          <tr><th scope="row">城市与校区</th>${cell((item) => `<strong>${escapeHtml(item.city)} · ${escapeHtml(item.campuses)}</strong><small>${item.campusDetails.map((campus) => `${escapeHtml(campus.name)}（${escapeHtml(campus.location)}）`).join(" · ")}</small>`)}</tr>
          <tr><th scope="row">学科与培养</th>${cell((item) => `<strong>${escapeHtml(item.academicProfile || item.intro)}</strong><div class="compare-tag-list">${item.majors.slice(0, 3).map((major) => `<span>${escapeHtml(major)}</span>`).join("")}</div><button class="compare-inline-action" type="button" data-school-detail="${escapeHtml(item.id)}">查看学校专业<i data-lucide="arrow-up-right"></i></button>`)}</tr>
          <tr><th scope="row">保研与升学</th>${cell((item) => `<strong>保研率：${escapeHtml(item.postgraduateRecommendation.value)}</strong><small>数据年份：${escapeHtml(item.postgraduateRecommendation.year)} · ${escapeHtml(item.postgraduateRecommendation.methodology)}</small>`)}</tr>
          <tr><th scope="row">录取参考</th>${cell((item) => `<strong>${escapeHtml(item.admissionReference?.value || "近三年录取位次待接入")}</strong><small>${escapeHtml(item.admissionReference?.note || "需按省份、年份、选科和专业组比较")}</small><a class="compare-inline-action" href="${safeExternalHref(item.dataUrl)}" target="_blank" rel="noopener noreferrer">核验公开数据<i data-lucide="external-link"></i></a>`)}</tr>
          <tr><th scope="row">校园与体验</th>${cell((item) => `<strong>${escapeHtml(item.campusSummary)}</strong>${experienceSummary(item)}`)}</tr>
        </tbody>
      </table>
    </div>
    <div class="compare-disclaimer"><i data-lucide="info"></i><span>“待接入”与“待确认”代表当前样本没有可靠数据，不用估算值补齐。</span></div>
    <div class="compare-next-step school-choice-next"><div><strong>确定一所院校后，继续比较校内专业</strong><span>先选择你想深入了解的学校，再比较这所学校的 2–3 个专业。</span></div><div class="compare-next-school-actions">${candidates.map((item) => `<button class="quiet-button" type="button" data-continue-school-major="${escapeHtml(item.id)}"><span>${escapeHtml(item.school)}</span><i data-lucide="arrow-right"></i></button>`).join("")}</div></div>
  </div>`;
}

function majorCombinationFor(school, majorName) {
  const program = school?.majorPrograms.find((item) => item.name === majorName);
  if (!school || !program) return null;
  const relatedExperiences = experiences.filter((item) => item.school === school.school && item.major === program.name);
  return {
    key: majorDecisionKey(school.school, program.name),
    school: school.school,
    schoolId: school.id,
    major: program.name,
    city: school.city,
    academy: program.school,
    category: program.category,
    level: program.level,
    note: program.note,
    officialUrl: program.officialUrl,
    experienceCount: relatedExperiences.length,
    experienceDimensions: [...new Set(relatedExperiences.flatMap((item) => item.dimensions || []))]
  };
}

function renderSchoolMajorSelection(school) {
  const selectedCount = selectedSchoolMajorNames.size;
  return `<div class="school-major-selection-view">
    <div class="school-compare-heading"><div><span class="subsection-kicker"><i data-lucide="list-tree"></i>院校优先 · 第二步</span><h2>比较 ${escapeHtml(school.school)} 的不同专业</h2><p>学校条件保持不变，只比较该校专业之间的培养与发展差异。</p></div><button class="quiet-button" type="button" data-back-school-comparison><i data-lucide="arrow-left"></i>返回院校对比</button></div>
    <header class="within-school-heading"><span class="candidate-mark">${school.school.slice(0, 1)}</span><div><strong>${escapeHtml(school.school)}</strong><small>${escapeHtml(school.city)} · ${school.identityTags.join(" · ")}</small></div></header>
    <div class="school-major-choice-list">${school.majorPrograms.map((program) => `<article class="school-major-choice"><label class="school-major-checkbox"><input type="checkbox" data-select-school-major="${escapeHtml(program.name)}"${selectedSchoolMajorNames.has(program.name) ? " checked" : ""}><span></span></label><div class="school-major-choice-name"><strong>${escapeHtml(program.name)}</strong><small>${escapeHtml(program.school)}</small></div><div class="school-major-choice-detail"><p>${escapeHtml(program.note)}</p><div><span>${escapeHtml(program.category)}</span><span>${escapeHtml(program.level)}</span><a href="${safeExternalHref(program.officialUrl)}" target="_blank" rel="noopener noreferrer">专业官方信息<i data-lucide="external-link"></i></a></div></div></article>`).join("")}</div>
    <div class="school-major-selection-actions"><div><strong>已选择 ${selectedCount} / 3</strong><span>请选择 2–3 个专业进行校内比较。</span></div><button class="primary-button" type="button" data-start-school-major-compare${selectedCount < 2 ? " disabled" : ""}><i data-lucide="columns-3"></i>开始校内专业对比</button></div>
  </div>`;
}

function renderMajorComparison(candidates, mode = "same-major") {
  const withinSchool = mode === "within-school";
  const cell = (content) => candidates.map((item) => `<td>${content(item)}</td>`).join("");
  const institutionFor = (item) => institutions.find((school) => school.id === item.schoolId || school.school === item.school);
  const experienceFor = (item) => {
    const related = experiences.filter((experience) => experience.school === item.school && experience.major === item.major && experience.source === "student");
    const signals = [...new Set(related.flatMap((experience) => [...(experience.dimensions || []), ...(experience.tags || [])]))];
    return { related, signals };
  };
  const experienceSignals = (item) => {
    const { related, signals } = experienceFor(item);
    return related.length ? `<div class="compare-tag-list">${signals.slice(0, 5).map((signal) => `<span>${escapeHtml(signal)}</span>`).join("")}</div><small>${related.length} 条相关学生经验</small>` : `<strong>暂无相关学生经验</strong><small>当前不使用其他专业经验代替</small>`;
  };
  const experienceExcerpt = (item) => {
    const { related } = experienceFor(item);
    return related.length ? `<strong>${escapeHtml(related[0].text)}</strong><small>${related.length > 1 ? `另有 ${related.length - 1} 条经验可继续查看` : "当前仅收录 1 条经验"}</small>` : `<strong>经验摘要待补充</strong><small>可前往问答中心追问该专业在读体验</small>`;
  };
  const trainingFocus = (item) => `<strong>${escapeHtml(item.note || "培养重点待核验")}</strong>${item.officialUrl ? `<a class="compare-inline-action" href="${safeExternalHref(item.officialUrl)}" target="_blank" rel="noopener noreferrer">核对专业官方信息<i data-lucide="external-link"></i></a>` : ""}`;
  const rows = withinSchool ? `
          <tr><th scope="row">我的状态</th>${cell((item) => `<span class="compare-status">${candidateStatusFor("major", item.key)}</span>`)}</tr>
          <tr><th scope="row">所属学院</th>${cell((item) => `<strong>${escapeHtml(item.academy || "所属学院待确认")}</strong>`)}</tr>
          <tr><th scope="row">学科门类</th>${cell((item) => `<strong>${item.category || "学科门类待确认"}</strong>`)}</tr>
          <tr><th scope="row">培养重点</th>${cell(trainingFocus)}</tr>
          <tr><th scope="row">学习与实践线索</th>${cell(experienceSignals)}</tr>
          <tr><th scope="row">学生经验摘要</th>${cell(experienceExcerpt)}</tr>` : `
          <tr><th scope="row">我的状态</th>${cell((item) => `<span class="compare-status">${candidateStatusFor("major", item.key)}</span>`)}</tr>
          <tr><th scope="row">学校与学院</th>${cell((item) => `<strong>${escapeHtml(item.school)}</strong><small>${escapeHtml(item.academy || "所属学院待确认")}</small>`)}</tr>
          <tr><th scope="row">院校学科背景</th>${cell((item) => { const school = institutionFor(item); return school ? `<div class="compare-tag-list identity-tags">${school.identityTags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div><strong>${escapeHtml(school.academicProfile)}</strong>` : `<strong>院校背景待确认</strong>`; })}</tr>
          <tr><th scope="row">培养方向差异</th>${cell(trainingFocus)}</tr>
          <tr><th scope="row">城市与校区</th>${cell((item) => { const school = institutionFor(item); return school ? `<strong>${escapeHtml(school.city)} · ${escapeHtml(school.campuses)}</strong><small>具体专业所在校区需继续核验</small>` : `<strong>${escapeHtml(item.city)}</strong>`; })}</tr>
          <tr><th scope="row">学生经验差异</th>${cell((item) => `${experienceSignals(item)}${experienceExcerpt(item)}`)}</tr>`;
  return `<div class="school-compare-view major-compare-view">
    <div class="school-compare-heading"><div><span class="subsection-kicker"><i data-lucide="book-copy"></i>${withinSchool ? "院校优先 · 校内专业" : "专业优先 · 同专业跨校"}</span><h2>${withinSchool ? `${candidates[0].school} · ${candidates.length} 个专业` : `${candidates.length} 个学校专业组合`}并列查看</h2><p>${withinSchool ? "在同一所学校内比较不同专业，不混入院校层面的重复差异。" : "同一个专业放到不同学校中比较，不生成专业排名或推荐分数。"}</p></div><button class="quiet-button" type="button" data-exit-major-compare><i data-lucide="arrow-left"></i>${withinSchool ? "返回专业选择" : "返回专业列表"}</button></div>
    <div class="school-compare-table-wrap">
      <table class="school-compare-table major-compare-table">
        <thead><tr><th scope="col">比较维度</th>${candidates.map((item) => `<th scope="col"><span class="compare-school-mark major-mark"><i data-lucide="book-open"></i></span><strong>${escapeHtml(item.major)}</strong><small>${escapeHtml(item.school)}</small></th>`).join("")}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="compare-disclaimer"><i data-lucide="info"></i><span>${withinSchool ? "学校和城市条件相同，因此不重复占用比较行。" : "培养层次等完全相同的信息不重复占用比较行。"} 核心课程、升学方向和典型岗位将在可靠培养方案与就业资料接入后展示。</span></div>
  </div>`;
}

function comparisonHistoryScope() {
  return currentUser()?.id || "guest";
}

function comparisonHistory() {
  return (read(STORE.compareHistory, {})[comparisonHistoryScope()] || []).filter((item) => item.type !== "school-major");
}

function recordComparison(type, candidates, origin) {
  if (candidates.length < 2) return;
  const all = read(STORE.compareHistory, {});
  const scope = comparisonHistoryScope();
  const history = all[scope] || [];
  const itemKeys = candidates.map((item) => type === "school" ? item.id : item.key).sort();
  const signature = `${type}:${itemKeys.join("|")}`;
  const entry = {
    id: history.find((item) => item.signature === signature)?.id || uid("compare"),
    signature,
    type,
    origin,
    viewedAt: new Date().toISOString(),
    items: JSON.parse(JSON.stringify(candidates))
  };
  all[scope] = [entry, ...history.filter((item) => item.signature !== signature)].slice(0, 12);
  write(STORE.compareHistory, all);
}

function formatComparisonTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "时间待确认";
  return date.toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function renderComparisonHistory() {
  const panel = $("#compareHistoryList");
  if (!panel) return;
  const history = comparisonHistory();
  panel.innerHTML = history.length ? history.map((entry) => {
    const isSchool = entry.type === "school";
    const isWithinSchool = entry.type === "within-school-major";
    const names = entry.items.map((item) => isSchool ? item.school : `${escapeHtml(item.school)} · ${escapeHtml(item.major)}`);
    const label = isSchool ? "院校对比" : (isWithinSchool ? "校内专业对比" : "同专业跨校对比");
    return `<article class="compare-history-item"><div class="compare-history-icon"><i data-lucide="${isSchool ? "school" : "book-open"}"></i></div><div><header><strong>${escapeHtml(label)}</strong><span>${escapeHtml(formatComparisonTime(entry.viewedAt))}</span></header><p>${escapeHtml(names.join(" / "))}</p><small>${escapeHtml(entry.origin || (isSchool ? "院校优先" : "专业优先"))}</small></div><div class="compare-history-actions"><button class="text-button" type="button" data-restore-comparison="${escapeHtml(entry.id)}">重新查看<i data-lucide="arrow-up-right"></i></button><button class="icon-button" type="button" data-delete-comparison="${escapeHtml(entry.id)}" aria-label="删除这条对比记录"><i data-lucide="trash-2"></i></button></div></article>`;
  }).join("") : `<div class="compare-empty compact"><i data-lucide="history"></i><strong>还没有历史对比</strong><p>真正打开院校或专业对比后，记录会自动出现在这里。</p></div>`;
  hydrateIcons();
}

function openComparisonHistory() {
  renderComparisonHistory();
  openModal("compareHistoryModal");
}

function restoreComparison(id) {
  const entry = comparisonHistory().find((item) => item.id === id);
  if (!entry) return;
  activeHistoryComparison = entry;
  currentCandidateTab = entry.type === "major" ? "major" : "school";
  schoolCompareMode = entry.type === "school";
  schoolMajorSelectionMode = false;
  schoolMajorCompareMode = entry.type === "within-school-major";
  if (entry.type === "within-school-major") {
    schoolMajorTargetSchoolId = entry.items[0]?.schoolId || "";
    selectedSchoolMajorNames.clear();
    entry.items.forEach((item) => selectedSchoolMajorNames.add(item.major));
    currentSchoolMajorResults = entry.items;
  }
  majorCompareMode = entry.type === "major";
  closeModal("compareHistoryModal");
  renderCompare();
}

function deleteComparisonHistory(id) {
  const all = read(STORE.compareHistory, {});
  const scope = comparisonHistoryScope();
  all[scope] = (all[scope] || []).filter((item) => item.id !== id);
  write(STORE.compareHistory, all);
  if (activeHistoryComparison?.id === id) activeHistoryComparison = null;
  renderComparisonHistory();
  showToast("这条历史对比已删除");
}

function renderCompare() {
  const panel = $("#compareContent");
  if (!panel) return;
  const user = currentUser();
  const savedIds = userFavorites();
  const savedExperiences = experiences.filter((item) => savedIds.includes(item.id));
  const savedInstitutions = institutions.filter((item) => savedIds.includes(`school-${escapeHtml(item.id)}`));
  const majorMap = new Map();
  institutions.forEach((school) => (school.majorPrograms || []).forEach((program) => {
    const favoriteId = majorCandidateId(school.id, program.name);
    if (!savedIds.includes(favoriteId)) return;
    majorMap.set(`${escapeHtml(school.school)}::${escapeHtml(program.name)}`, {
      key: majorDecisionKey(school.school, program.name),
      school: school.school,
      schoolId: school.id,
      major: program.name,
      city: school.city,
      academy: program.school,
      category: program.category,
      level: program.level,
      note: program.note,
      officialUrl: program.officialUrl,
      experienceCount: 0,
      experienceDimensions: new Set(),
      dimensions: new Set([program.category, program.level])
    });
  }));
  savedExperiences.forEach((item) => {
    const key = `${escapeHtml(item.school)}::${escapeHtml(item.major)}`;
    const school = institutions.find((institution) => institution.school === item.school);
    const program = school?.majorPrograms.find((candidate) => candidate.name === item.major);
    const existing = majorMap.get(key) || {
      key: majorDecisionKey(item.school, item.major),
      school: item.school,
      schoolId: school?.id || "",
      major: item.major,
      city: item.city,
      academy: program?.school || "",
      category: program?.category || "",
      level: program?.level || "",
      note: program?.note || "",
      officialUrl: program?.officialUrl || school?.officialUrl || "",
      experienceCount: 0,
      experienceDimensions: new Set(),
      dimensions: new Set(program ? [program.category, program.level] : [])
    };
    existing.experienceCount += 1;
    (item.dimensions || []).forEach((dimension) => {
      existing.experienceDimensions.add(dimension);
      existing.dimensions.add(dimension);
    });
    majorMap.set(key, existing);
  });
  const savedMajors = [...majorMap.values()].map((item) => ({
    ...item,
    favoriteId: item.schoolId ? majorCandidateId(item.schoolId, item.major) : "",
    saved: true,
    experienceDimensions: [...item.experienceDimensions],
    dimensions: [...item.dimensions]
  }));
  const demoSchools = institutions.slice(0, 3);
  const demoMajors = institutions.slice(0, 3).map((school) => {
    const program = school.majorPrograms.find((item) => item.name === "计算机科学与技术") || school.majorPrograms[0];
    const relatedExperiences = experiences.filter((item) => item.school === school.school && item.major === program.name);
    return {
      key: majorDecisionKey(school.school, program.name),
      school: school.school,
      schoolId: school.id,
      major: program.name,
      city: school.city,
      academy: program.school,
      category: program.category,
      level: program.level,
      note: program.note,
      officialUrl: program.officialUrl,
      favoriteId: majorCandidateId(school.id, program.name),
      saved: false,
      experienceCount: relatedExperiences.length,
      experienceDimensions: [...new Set(relatedExperiences.flatMap((item) => item.dimensions || []))],
      dimensions: [program.category, program.level]
    };
  });
  const schoolCandidates = user ? savedInstitutions : demoSchools;
  const baseMajorCandidates = user ? savedMajors : demoMajors;
  const scopedInstitutions = institutions;
  const allProgramCandidates = scopedInstitutions.flatMap((school) => school.majorPrograms.map((program) => {
    const relatedExperiences = (user ? savedExperiences : experiences).filter((item) => item.school === school.school && item.major === program.name);
    const favoriteId = majorCandidateId(school.id, program.name);
    return {
      key: majorDecisionKey(school.school, program.name),
      school: school.school,
      schoolId: school.id,
      major: program.name,
      city: school.city,
      academy: program.school,
      category: program.category,
      level: program.level,
      note: program.note,
      officialUrl: program.officialUrl,
      favoriteId,
      saved: savedIds.includes(favoriteId),
      experienceCount: relatedExperiences.length,
      experienceDimensions: [...new Set(relatedExperiences.flatMap((item) => item.dimensions || []))],
      dimensions: [program.category, program.level]
    };
  }));
  const availableMajorNames = [...new Set(allProgramCandidates.map((item) => item.major))];
  const normalizedMajorSearch = candidateMajorSearchQuery.trim().toLowerCase();
  const matchingMajorNames = normalizedMajorSearch ? availableMajorNames.filter((name) => name.toLowerCase().includes(normalizedMajorSearch)) : [];
  const activeMajorName = availableMajorNames.find((name) => name.toLowerCase() === normalizedMajorSearch) || (matchingMajorNames.length === 1 ? matchingMajorNames[0] : "");
  const majorCandidates = activeMajorName ? allProgramCandidates.filter((item) => item.major === activeMajorName) : (normalizedMajorSearch ? [] : baseMajorCandidates);
  currentSchoolCandidateResults = schoolCandidates;
  currentMajorCandidateResults = majorCandidates;

  $("#schoolCandidateCount") && ($("#schoolCandidateCount").textContent = schoolCandidates.length);
  $("#majorCandidateCount") && ($("#majorCandidateCount").textContent = baseMajorCandidates.length);
  $$("[data-candidate-tab]").forEach((button) => {
    const active = button.dataset.candidateTab === currentCandidateTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  const activeHistoryMatches = activeHistoryComparison && (activeHistoryComparison.type === currentCandidateTab || (activeHistoryComparison.type === "within-school-major" && currentCandidateTab === "school"));
  if (activeHistoryMatches) {
    panel.innerHTML = activeHistoryComparison.type === "school"
      ? renderSchoolComparison(activeHistoryComparison.items)
      : renderMajorComparison(activeHistoryComparison.items, activeHistoryComparison.type === "within-school-major" ? "within-school" : "same-major");
    hydrateIcons();
    return;
  }

  if (currentCandidateTab === "school") {
    const selectedCandidates = schoolCandidates.filter((item) => selectedSchoolCandidateIds.has(item.id));
    const schoolMajorTarget = institutions.find((item) => item.id === schoolMajorTargetSchoolId);
    if (schoolMajorCompareMode && currentSchoolMajorResults.length >= 2) panel.innerHTML = renderMajorComparison(currentSchoolMajorResults, "within-school");
    else if (schoolMajorSelectionMode && schoolMajorTarget) panel.innerHTML = renderSchoolMajorSelection(schoolMajorTarget);
    else if (schoolCompareMode && selectedCandidates.length >= 2) panel.innerHTML = renderSchoolComparison(selectedCandidates);
    else {
      schoolCompareMode = false;
      schoolMajorSelectionMode = false;
      schoolMajorCompareMode = false;
      panel.innerHTML = schoolCandidates.length ? `<div class="candidate-list-heading"><div><strong>候选院校</strong><span>${user ? `已收藏 ${schoolCandidates.length} 所学校` : "访客示例,登录后保存自己的候选"}</span></div><div class="candidate-compare-toolbar"><span>已选择 <strong>${selectedCandidates.length}</strong> / 3</span><button class="primary-button" type="button" data-start-school-compare${selectedCandidates.length < 2 ? " disabled" : ""}><i data-lucide="columns-3"></i>开始对比</button></div></div><div class="candidate-list">${schoolCandidates.map((item) => `<article class="candidate-row"><label class="candidate-select" aria-label="选择${escapeHtml(item.school)}进行对比"><input type="checkbox" data-select-school-candidate="${escapeHtml(item.id)}"${selectedSchoolCandidateIds.has(item.id) ? " checked" : ""}><span></span></label><div class="candidate-identity"><span class="candidate-mark">${escapeHtml(item.school.slice(0, 1))}</span><div><strong>${escapeHtml(item.school)}</strong><small>${escapeHtml(item.city)} · ${escapeHtml(item.type)}</small></div></div><div class="candidate-summary"><span>重点专业</span><p>${escapeHtml(item.majors.slice(0, 3).join(" · "))}</p><div>${item.highlights.slice(0, 3).map((highlight) => `<span class="content-tag">${escapeHtml(highlight)}</span>`).join("")}</div></div><div class="candidate-actions">${renderCandidateStatusControl("school", item.id, user)}<button class="text-button" type="button" data-school-detail="${escapeHtml(item.id)}">查看详情<i data-lucide="arrow-up-right"></i></button>${user ? `<button class="remove-candidate" type="button" data-remove-school-candidate="${escapeHtml(item.id)}"><i data-lucide="trash-2"></i>移出候选</button>` : `<button class="remove-candidate" type="button" data-open-account><i data-lucide="log-in"></i>登录后保存</button>`}</div></article>`).join("")}</div>` : `<div class="compare-empty"><i data-lucide="school"></i><strong>你还没有收藏学校</strong><p>前往院校与经验页面,将感兴趣的学校加入候选。</p><button class="quiet-button" data-view-target="experience">去查找院校</button></div>`;
    }
  } else {
    const selectedCandidates = majorCandidates.filter((item) => selectedMajorCandidateKeys.has(item.key));
    if (majorCompareMode && selectedCandidates.length >= 2) panel.innerHTML = renderMajorComparison(selectedCandidates);
    else {
      majorCompareMode = false;
      const majorCounts = availableMajorNames.map((name) => ({ name, count: allProgramCandidates.filter((item) => item.major === name).length }));
      const suggestedMajorNames = (normalizedMajorSearch && !activeMajorName ? matchingMajorNames : majorCounts.filter((item) => item.count >= 2).sort((a, b) => b.count - a.count).map((item) => item.name)).slice(0, 6);
      const majorGroups = [...majorCandidates.reduce((groups, item) => {
        if (!groups.has(item.major)) groups.set(item.major, []);
        groups.get(item.major).push(item);
        return groups;
      }, new Map()).entries()];
      const searchSuggestions = suggestedMajorNames.length ? `<div class="major-search-suggestions"><span>${normalizedMajorSearch && !activeMajorName ? "请选择准确专业" : "可比较的同名专业"}</span>${suggestedMajorNames.map((name) => `<button type="button" data-search-major="${escapeHtml(name)}">${escapeHtml(name)}<small>${majorCounts.find((item) => item.name === name)?.count || 0} 所</small></button>`).join("")}</div>` : "";
      const searchPanel = `<section class="major-search-panel"><div><span class="subsection-kicker"><i data-lucide="search"></i>专业优先</span><h2>先确定专业，再比较不同学校</h2><p>输入一个专业名称，结果不会混入其他专业。</p></div><form class="major-search-form" id="candidateMajorSearchForm"><label for="candidateMajorSearch"><i data-lucide="search"></i><input id="candidateMajorSearch" name="major" type="search" value="${escapeHtml(candidateMajorSearchQuery)}" list="candidateMajorOptions" placeholder="例如：计算机科学与技术" autocomplete="off"></label><datalist id="candidateMajorOptions">${availableMajorNames.map((name) => `<option value="${escapeHtml(name)}"></option>`).join("")}</datalist><button class="primary-button" type="submit">查找专业</button>${normalizedMajorSearch ? `<button class="quiet-button" type="button" data-clear-major-search aria-label="清空专业搜索"><i data-lucide="x"></i>清空</button>` : ""}</form>${searchSuggestions}</section>`;
      let majorContent = "";
      if (normalizedMajorSearch && !activeMajorName) {
        majorContent = `<div class="compare-empty compact"><i data-lucide="search-x"></i><strong>${matchingMajorNames.length ? "请选择一个准确的专业名称" : "当前样本没有找到这个专业"}</strong><p>${matchingMajorNames.length ? "上方列出了匹配专业，选择后再比较学校。" : "可以更换关键词，或取消院校范围后重新查找。"}</p></div>`;
      } else if (majorCandidates.length) {
        majorContent = `<div class="candidate-list-heading"><div><strong>${activeMajorName ? `${escapeHtml(activeMajorName)} · 学校对比范围` : "我的专业候选"}</strong><span>${activeMajorName ? `当前样本收录 ${majorCandidates.length} 所学校` : (user ? `已归入 ${majorCandidates.length} 个学校专业组合` : "访客示例，同一专业下比较不同学校")}</span></div><div class="candidate-compare-toolbar"><span>已选择 <strong>${selectedCandidates.length}</strong> / 3</span><button class="primary-button" type="button" data-start-major-compare${selectedCandidates.length < 2 ? " disabled" : ""}><i data-lucide="columns-3"></i>开始对比</button></div></div>${activeMajorName && majorCandidates.length < 2 ? `<div class="major-result-notice"><i data-lucide="info"></i>当前范围只收录 1 所学校，暂时不能形成同专业对比。</div>` : ""}<div class="major-priority-groups">${majorGroups.map(([major, items]) => `<section class="major-priority-group"><header><div><span class="candidate-mark major-mark"><i data-lucide="book-open"></i></span><div><h3>${escapeHtml(major)}</h3><p>${items.length} 个学校专业组合</p></div></div><span>官方信息与经验并列查看</span></header><div class="candidate-list">${items.map((item) => `<article class="candidate-row"><label class="candidate-select" aria-label="选择${escapeHtml(item.school)}${escapeHtml(item.major)}进行对比"><input type="checkbox" data-select-major-candidate="${escapeHtml(item.key)}" data-major-name="${escapeHtml(item.major)}"${selectedMajorCandidateKeys.has(item.key) ? " checked" : ""}><span></span></label><div class="candidate-identity"><span class="candidate-mark">${escapeHtml(item.school.slice(0, 1))}</span><div><strong>${escapeHtml(item.school)}</strong><small>${escapeHtml(item.academy || "所属学院待确认")} · ${escapeHtml(item.city)}</small></div></div><div class="candidate-summary"><span>专业参考</span><p>${escapeHtml(item.note || "培养方向待接入")}</p><div>${[item.category, item.level, ...item.experienceDimensions].filter(Boolean).slice(0, 3).map((dimension) => `<span class="content-tag">${escapeHtml(dimension)}</span>`).join("")}</div></div><div class="candidate-actions">${renderCandidateStatusControl("major", item.key, user)}${item.schoolId ? `<button class="text-button" type="button" data-school-detail="${escapeHtml(item.schoolId)}">查看学校<i data-lucide="arrow-up-right"></i></button>` : ""}${user ? (item.saved ? `<button class="remove-candidate" type="button" data-remove-major-school="${escapeHtml(item.school)}" data-remove-major-name="${escapeHtml(item.major)}"><i data-lucide="trash-2"></i>移出候选</button>` : `<button class="save-experience" type="button" data-favorite="${escapeHtml(item.favoriteId)}"><i data-lucide="bookmark-plus"></i>加入候选</button>`) : `<button class="remove-candidate" type="button" data-open-account><i data-lucide="log-in"></i>登录后保存</button>`}</div></article>`).join("")}</div></section>`).join("")}</div>`;
      } else {
        majorContent = `<div class="compare-empty"><i data-lucide="book-open"></i><strong>你还没有专业候选</strong><p>可以在上方直接搜索专业，或前往学校详情收藏专业。</p><button class="quiet-button" data-view-target="experience">去查找专业</button></div>`;
      }
      panel.innerHTML = `${searchPanel}${majorContent}`;
    }
  }
  hydrateIcons();
}

function switchCandidateTab(name) {
  if (!["school", "major"].includes(name)) return;
  activeHistoryComparison = null;
  currentCandidateTab = name;
  if (name !== "school") {
    schoolCompareMode = false;
    schoolMajorSelectionMode = false;
    schoolMajorCompareMode = false;
  }
  if (name !== "major") majorCompareMode = false;
  renderCompare();
}

function applyMajorSearch(value) {
  candidateMajorSearchQuery = value.trim();
  selectedMajorCandidateKeys.clear();
  selectedMajorName = "";
  majorCompareMode = false;
  activeHistoryComparison = null;
  renderCompare();
}

function continueSchoolComparisonToMajors(schoolId) {
  const school = institutions.find((item) => item.id === schoolId);
  if (!school) return;
  schoolMajorTargetSchoolId = school.id;
  selectedSchoolMajorNames.clear();
  currentSchoolMajorResults = [];
  schoolCompareMode = false;
  schoolMajorSelectionMode = true;
  schoolMajorCompareMode = false;
  activeHistoryComparison = null;
  currentCandidateTab = "school";
  renderCompare();
}

function toggleSchoolMajorSelection(majorName, checked) {
  if (checked && !selectedSchoolMajorNames.has(majorName) && selectedSchoolMajorNames.size >= 3) {
    showToast("一次最多比较 3 个校内专业");
    renderCompare();
    return;
  }
  if (checked) selectedSchoolMajorNames.add(majorName);
  else selectedSchoolMajorNames.delete(majorName);
  renderCompare();
}

function startSchoolMajorComparison() {
  const school = institutions.find((item) => item.id === schoolMajorTargetSchoolId);
  if (!school || selectedSchoolMajorNames.size < 2) {
    showToast("请先选择至少 2 个校内专业");
    return;
  }
  const combinations = [...selectedSchoolMajorNames].map((major) => majorCombinationFor(school, major)).filter(Boolean);
  if (combinations.length < 2) return;
  currentSchoolMajorResults = combinations;
  schoolMajorSelectionMode = false;
  schoolMajorCompareMode = true;
  recordComparison("within-school-major", combinations, `院校优先 · ${escapeHtml(school.school)}校内专业`);
  renderCompare();
}

function removeSchoolCandidate(id) {
  const user = currentUser();
  if (!user) return;
  const all = read(STORE.favorites, {});
  all[user.id] = (all[user.id] || []).filter((item) => item !== `school-${id}`);
  write(STORE.favorites, all);
  selectedSchoolCandidateIds.delete(id);
  clearCandidateStatus("school", id);
  renderCompare();
  renderExperiences();
  showToast("已从候选院校中移除");
}

function removeMajorCandidate(school, major) {
  const user = currentUser();
  if (!user) return;
  const matchingIds = new Set(experiences.filter((item) => item.school === school && item.major === major).map((item) => item.id));
  const schoolId = institutions.find((item) => item.school === school)?.id;
  const explicitId = schoolId ? majorCandidateId(schoolId, major) : "";
  const all = read(STORE.favorites, {});
  all[user.id] = (all[user.id] || []).filter((item) => item !== explicitId && !matchingIds.has(item));
  write(STORE.favorites, all);
  const decisionKey = majorDecisionKey(school, major);
  selectedMajorCandidateKeys.delete(decisionKey);
  clearCandidateStatus("major", decisionKey);
  renderCompare();
  renderExperiences();
  showToast("已从候选专业中移除");
}

function renderFamily() {
  const user = currentUser();
  const main = $("#familyMainContent");
  if (!main) return;
  if (!user) {
    main.innerHTML = `<div class="family-compact-status"><span class="linked-status inactive"><span></span>未关联</span><small>登录后创建家庭关联</small></div><button class="primary-button" type="button" data-open-account><i data-lucide="log-in"></i>登录后关联</button>`;
  } else {
    const family = read(STORE.family, {})[user.id];
    main.innerHTML = family
      ? `<div class="family-compact-status"><span class="linked-status"><span></span>已创建关联</span><small>邀请码 ${escapeHtml(family.code)}</small></div><button class="quiet-button" type="button" data-copy-code="${escapeHtml(family.code)}"><i data-lucide="copy"></i>复制邀请码</button>`
      : `<div class="family-compact-status"><span class="linked-status inactive"><span></span>未关联</span><small>尚未向家庭成员共享候选</small></div><button class="primary-button" type="button" data-family-invite><i data-lucide="user-plus"></i>创建关联</button>`;
  }
  hydrateIcons();
}

