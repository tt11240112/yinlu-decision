/**
 * 经验/问答/院校详情渲染
 * 原 app.js 第 1984-2205 行（机械切分，内容未改动）
 * 建议维护：G2 业务组
 */
function renderExperienceInstitutionSummary(item) {
  const institution = institutions.find((school) => school.school === item.school);
  if (!institution) {
    return `<div class="experience-institution-summary pending"><div class="experience-institution-heading"><span><i data-lucide="landmark"></i>院校摘要</span><strong>${escapeHtml(item.school || "未命名学校")}</strong></div><div class="experience-institution-meta"><span><i data-lucide="map-pin"></i>${escapeHtml(item.city || "地区待补充")}</span><span class="experience-institution-pending">院校资料待补充</span></div></div>`;
  }
  const identityTags = Array.isArray(institution.identityTags) ? institution.identityTags.map((tag) => `<span class="experience-institution-tag">${escapeHtml(tag)}</span>`).join("") : "";
  return `<div class="experience-institution-summary"><div class="experience-institution-heading"><span><i data-lucide="landmark"></i>院校摘要</span><strong>${escapeHtml(institution.school)}</strong></div><div class="experience-institution-meta"><span><i data-lucide="map-pin"></i>${escapeHtml(institution.city || item.city || "地区待补充")}</span><span>${escapeHtml(institution.type || "院校类型待补充")}</span></div>${identityTags ? `<div class="experience-institution-tags">${identityTags}</div>` : ""}</div>`;
}

function renderExperiences() {
  const grid = $("#experienceGrid");
  if (!grid) return;
  const experienceSectionCopy = {
    all: { kicker: "经验与职业视角", heading: "来自学生、教师与从业者的真实补充", empty: "当前筛选下暂无匹配的经验或职业视角内容" },
    student: { kicker: "学生经验", heading: "来自在读学生的真实经历", empty: "当前筛选下暂无匹配的在读学生经验" },
    expert: { kicker: "专业与职业视角", heading: "来自教师与从业者的经验判断", empty: "当前筛选下暂无匹配的教师或从业者内容" }
  };
  const sectionCopy = experienceSectionCopy[currentSourceFilter] || experienceSectionCopy.all;
  const experienceSectionKicker = $("#experienceSectionKicker");
  const experienceHeading = $("#experienceHeading");
  if (experienceSectionKicker) experienceSectionKicker.textContent = sectionCopy.kicker;
  if (experienceHeading) experienceHeading.textContent = sectionCopy.heading;
  const query = currentSearch.trim().toLowerCase();
  const schoolQuery = currentSchoolSearch.trim().toLowerCase();
  const majorQuery = currentMajorSearch.trim().toLowerCase();
  const institutionSchoolQuery = currentInstitutionSchoolSearch.trim().toLowerCase();
  const institutionMajorQuery = currentInstitutionMajorSearch.trim().toLowerCase();
  const experienceItems = experiences.filter((item) => item.source === "student" || item.source === "expert");
  renderLibraryMajorPicker("institution");
  renderLibraryMajorPicker("experience");
  renderLibraryRegionPicker("institution");
  renderLibraryRegionPicker("experience");
  const sameSchool = $("#sameSchoolToggle")?.checked;
  const matchesFilters = (item) => {
    const dimensions = Array.isArray(item.dimensions) ? item.dimensions : [];
    const itemTags = Array.isArray(item.tags) ? item.tags.join("") : "";
    const schoolText = (item.school || "").toLowerCase();
    const majorText = (item.major || "").toLowerCase();
    const schoolMatches = !schoolQuery || schoolText.includes(schoolQuery);
    const majorMatches = !majorQuery || majorText.includes(majorQuery);
    const matchesDimension = currentDimensionFilters.size === 0 || dimensions.some((dimension) => currentDimensionFilters.has(dimension));
    const matchesSource = currentSourceFilter === "all" || item.source === currentSourceFilter;
    const matchesSearch = !query || `${escapeHtml(item.school || "")}${escapeHtml(item.major || "")}${escapeHtml(item.city || "")}${escapeHtml(item.text || "")}${itemTags}${dimensions.join("")}`.toLowerCase().includes(query);
    const regionMatches = matchesRegionSelection(item, currentExperienceRegion);
    return schoolMatches && majorMatches && regionMatches && matchesDimension && matchesSource && matchesSearch && matchesContentTime(item.publishedAt);
  };
  const filtered = experienceItems.filter(matchesFilters);
  const filteredInstitutions = institutions.filter((item) => {
    const schoolText = (item.school || "").toLowerCase();
    const majorText = [...(item.majors || []), ...(item.majorPrograms || []).map((program) => program.name)].join("").toLowerCase();
    const schoolMatches = !institutionSchoolQuery || schoolText.includes(institutionSchoolQuery);
    const majorMatches = !institutionMajorQuery || majorText.includes(institutionMajorQuery);
    const regionMatches = matchesRegionSelection(item, currentInstitutionRegion);
    return schoolMatches && majorMatches && regionMatches;
  });
  const institutionGrid = $("#institutionGrid");
  if (institutionGrid) {
    const institutionEmptyText = currentInstitutionRegion === "all" ? "当前筛选下暂无匹配的院校信息" : `${regionSelectionLabel(currentInstitutionRegion)}暂无匹配的院校信息`;
    institutionGrid.innerHTML = filteredInstitutions.length ? filteredInstitutions.map(renderInstitutionCard).join("") : `<div class="empty-state institution-empty"><i data-lucide="building-2"></i><p>${escapeHtml(institutionEmptyText)}</p></div>`;
    $("#institutionResultNote") && ($("#institutionResultNote").textContent = `${filteredInstitutions.length} 所学校`);
  }
  const clearInstitutionFilters = $("#clearInstitutionFilters");
  if (clearInstitutionFilters) clearInstitutionFilters.disabled = !currentInstitutionSchoolSearch.trim() && !currentInstitutionMajorSearch.trim() && !currentInstitutionRegionSearch.trim() && currentInstitutionRegion === "all";
  $("#experienceResultNote") && ($("#experienceResultNote").textContent = `${filtered.length} 条内容`);
  const ordered = [...filtered].sort((a, b) => {
    if (sameSchool) {
      const schoolPriority = Number((b.school || "").includes("师范")) - Number((a.school || "").includes("师范"));
      if (schoolPriority) return schoolPriority;
    }
    return currentExperienceSort === "newest" ? String(b.publishedAt || "").localeCompare(String(a.publishedAt || "")) : 0;
  });
  const favorites = userFavorites();
  const sourceLabels = { student: { cls: "level-student", icon: "user-check", text: "在读认证" }, official: { cls: "level-official", icon: "landmark", text: "官方信息" }, data: { cls: "level-data", icon: "database", text: "客观数据" }, expert: { cls: "level-expert", icon: "users", text: "教师/从业者" } };
  const experienceEmptyText = currentExperienceRegion === "all" ? sectionCopy.empty : `${regionSelectionLabel(currentExperienceRegion)}暂无匹配的经验内容`;
  grid.innerHTML = ordered.length ? ordered.map((item) => {
    const src = sourceLabels[item.source] || sourceLabels.student;
    const saved = favorites.includes(item.id);
    const tagsHtml = Array.isArray(item.tags) ? item.tags.map((tag) => `<span class="content-tag">${escapeHtml(tag)}</span>`).join("") : "";
    const dimensionsHtml = Array.isArray(item.dimensions) ? item.dimensions.map((dimension) => `<span class="content-tag">${escapeHtml(dimension)}</span>`).join("") : "";
    const sourceDetail = item.sourceUrl ? `<a class="source-link" href="${safeExternalHref(item.sourceUrl)}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link"></i>查看来源 · ${escapeHtml(item.sourceName)}</a>` : `<span class="source-link source-link-muted"><i data-lucide="shield-check"></i>平台认证记录 · ${escapeHtml(item.level || "身份已核验")}</span>`;
    const publishedAt = `<time class="experience-published-at" datetime="${escapeHtml(item.publishedAt || "")}"><i data-lucide="clock-3"></i>发布于 ${escapeHtml(formatContentDate(item.publishedAt))}</time>`;
    const valueHtml = item.value ? `<div class="source-value"><strong>${escapeHtml(item.value)}</strong><small>来源内容摘要</small></div>` : "";
    const titleHtml = item.title ? `<h3 class="experience-card-title">${escapeHtml(item.title)}</h3>` : "";
    const institutionSummary = renderExperienceInstitutionSummary(item);
    return `<article class="experience-card" data-experience-id="${escapeHtml(item.id)}">
      <div class="experience-top"><span class="school-avatar">${escapeHtml((item.school || "").slice(0, 1))}</span><div class="experience-school"><strong>${escapeHtml(item.school || "未命名学校")}</strong><small>${escapeHtml(item.major || "未分类专业")} · ${escapeHtml(item.city || "未标注城市")}</small></div><span class="source-level-tag ${escapeHtml(src.cls)}">${escapeHtml(src.text)}</span></div>
      <div class="experience-divider"></div>
      ${institutionSummary}${valueHtml}${titleHtml}
      <p>${escapeHtml(item.text || "")}</p>
      <div class="tag-row">${dimensionsHtml}${tagsHtml}</div>
      <div class="experience-card-footer"><div class="experience-source-meta">${sourceDetail}${publishedAt}</div><div class="experience-card-actions"><button class="save-experience ${saved ? "saved" : ""}" data-favorite="${escapeHtml(item.id)}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入我的候选"}</button></div></div>
    </article>`;
  }).join("") : `<div class="empty-state"><i data-lucide="search-x"></i><p>${escapeHtml(experienceEmptyText)}</p><button class="quiet-button" data-clear-search>清空筛选</button></div>`;
  updateExperienceFilterUi();
  hydrateIcons();
}

function renderQuestions() {
  const user = currentUser();
  const list = $("#questionList");
  if (!list) return;
  if (!user) {
    list.innerHTML = demoQuestions.map((item) => `<article class="question-list-item"><header><strong>${escapeHtml(item.title)}</strong><span class="question-status ${item.waiting ? "waiting" : ""}">${escapeHtml(item.status)}</span></header><p>${escapeHtml(item.meta)}</p></article>`).join("");
  } else {
    const mine = read(STORE.questions, []).filter((item) => item.userId === user.id);
    list.innerHTML = mine.length ? mine.map((item) => `<article class="question-list-item"><header><strong>${escapeHtml(item.title)}</strong><span class="question-status ${item.status === "已回答" ? "" : "waiting"}">${escapeHtml(item.status)}</span></header><p>${escapeHtml(item.meta || `${item.topic || "未分类"} · 发布于 ${new Date(item.createdAt).toLocaleDateString("zh-CN")}`)}</p></article>`).join("") : `<p>你还没有发布问题</p>`;
  }
  $("#questionsCount") && ($("#questionsCount").textContent = user ? read(STORE.questions, []).filter((item) => item.userId === user.id).length : "示例");
  hydrateIcons();
}

function renderInstitutionCard(item) {
  const saved = userFavorites().includes(`school-${item.id}`);
  const majorHtml = item.majors.map((major) => `<span class="content-tag">${escapeHtml(major)}</span>`).join("");
  const highlightHtml = item.highlights.map((highlight) => `<span class="institution-highlight">${escapeHtml(highlight)}</span>`).join("");
  return `<article class="institution-card">
    <div class="institution-card-top"><div class="institution-mark">${escapeHtml(item.school.slice(0, 1))}</div><div><span class="source-level-tag level-institution">院校信息</span><h3>${escapeHtml(item.school)}</h3><p>${escapeHtml(item.city)} · ${escapeHtml(item.type)}</p></div></div>
    <p class="institution-intro">${escapeHtml(item.intro)}</p>
    <div class="institution-highlights">${highlightHtml}</div>
    <div class="institution-card-block"><span>重点关注专业</span><div class="tag-row">${majorHtml}</div></div>
    <div class="institution-evidence"><span><i data-lucide="database"></i>客观数据已整理</span><span><i data-lucide="landmark"></i>官方资料已整理</span></div>
    <div class="institution-card-footer"><span class="institution-note"><i data-lucide="clock-3"></i>资料更新于 ${escapeHtml(item.updatedAt || "时间待补充")} · 来源可核验</span><div class="institution-card-actions"><button class="text-button" data-school-detail="${escapeHtml(item.id)}">全面了解 <i data-lucide="arrow-up-right"></i></button><button class="save-experience ${saved ? "saved" : ""}" data-favorite="school-${escapeHtml(item.id)}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入候选"}</button></div></div>
  </article>`;
}

function renderSchoolComment(comment) {
  return `<article class="school-comment">
    <header><span class="comment-avatar"><i data-lucide="user-round-check"></i></span><div><strong>本校认证学生</strong><small>${escapeHtml(comment.grade || "年级已核验")} · ${escapeHtml(comment.major || "专业已核验")}</small></div><button class="icon-button comment-report" data-report-comment aria-label="举报评论" title="举报评论"><i data-lucide="flag"></i></button></header>
    <p>${escapeHtml(comment.text)}</p>
    <footer><span class="content-tag">${escapeHtml(comment.dimension || "校园体验")}</span><time>${escapeHtml(comment.date || "近期")}</time></footer>
  </article>`;
}

const schoolCommentExamples = {
  fjnu: [
    { id: "fjnu-campus-route", major: "地理科学", grade: "2023级", dimension: "校园环境", text: "不同学院上课地点可能分布在不同教学楼，排课出来后可以先确认楼栋位置，再估算课间通行时间。", date: "示例内容" },
    { id: "fjnu-dorm-detail", major: "汉语言文学", grade: "2022级", dimension: "宿舍生活", text: "宿舍条件会因校区和楼栋不同而变化，了解时最好同时确认住宿校区、楼栋设施和当年分配通知。", date: "示例内容" },
    { id: "fjnu-practice-detail", major: "教育学", grade: "2022级", dimension: "培养安排", text: "关注师范方向时，除了课程名称，还可以向学院确认教育见习、实习学期和合作学校的具体安排。", date: "示例内容" }
  ],
  fzu: [
    { id: "fzu-campus-route", major: "经济学", grade: "2022级", dimension: "校园环境", text: "查看校区信息时要继续确认学院所在区域和常用教学楼，只看学校总地址不一定能判断每天的通行安排。", date: "示例内容" },
    { id: "fzu-lab-detail", major: "机械设计制造及其自动化", grade: "2023级", dimension: "培养安排", text: "了解工科专业时可以进一步确认实验课、课程设计和实训场地分别安排在哪些学期与校区。", date: "示例内容" },
    { id: "fzu-dorm-detail", major: "计算机科学与技术", grade: "2023级", dimension: "宿舍生活", text: "宿舍设施与分配安排可能按年份调整，报考前可以把官方住宿通知和在校生当年的实际补充放在一起看。", date: "示例内容" }
  ],
  fafu: [
    { id: "fafu-studio-detail", major: "风景园林", grade: "2023级", dimension: "课程学习", text: "设计课程通常需要连续完成图纸、模型与软件表达，了解专业时可以进一步确认工作室安排和不同学期的项目强度。", date: "示例内容" },
    { id: "fafu-campus-detail", major: "风景园林", grade: "2023级", dimension: "校园环境", text: "课程使用的教室、实验空间和宿舍位置可能影响日常通行，建议结合学院所在区域确认真实距离。", date: "示例内容" },
    { id: "fafu-practice-detail", major: "食品科学与工程", grade: "2022级", dimension: "培养安排", text: "了解专业时除了课程名称，还可以关注实验课、实习基地和实践学期分别怎样安排。", date: "示例内容" }
  ]
};

function renderSchoolCommentSection(item) {
  const seedComments = schoolCommentExamples[item.id] || [];
  const composer = `<form class="school-comment-form" id="schoolCommentForm"><label for="schoolCommentInput">补充你的本校经历</label><textarea id="schoolCommentInput" maxlength="300" placeholder="写下具体事实，例如课程安排、宿舍生活或实习准备。"></textarea><div><select id="schoolCommentDimension" aria-label="评论维度"><option>课程学习</option><option>宿舍生活</option><option>城市环境</option><option>就业去向</option></select><button class="primary-button" type="submit"><i data-lucide="send"></i>匿名发布</button></div><small>仅本校认证学生可发布，正式版本由后端校验校园身份。</small></form>`;
  return `<section class="detail-experience-panel school-comment-panel school-detail-anchor" id="school-comments"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="messages-square"></i>本校学生补充</span><h2>院校细节补充</h2></div><span class="comment-count">${seedComments.length} 条</span></div><p class="school-comment-intro">用于补充官方资料难以覆盖的具体体验，院校信息仍以学校发布内容为准。</p>${composer}<div class="school-comment-list">${seedComments.length ? seedComments.map(renderSchoolComment).join("") : `<div class="detail-empty">暂时还没有本校学生补充</div>`}</div></section>`;
}

function renderMajorPrograms(item, query = "") {
  const list = Array.isArray(item.majorPrograms) ? item.majorPrograms : [];
  const keyword = query.trim().toLowerCase();
  const filtered = list.filter((program) => !keyword || `${program.name}${program.school}${program.category}${program.note}`.toLowerCase().includes(keyword));
  return filtered.length ? filtered.map((program) => {
    const favoriteId = majorCandidateId(item.id, program.name);
    const saved = userFavorites().includes(favoriteId);
    const sourceLink = program.officialUrl ? `<a class="major-program-source-link" href="${safeExternalHref(program.officialUrl)}" target="_blank" rel="noopener noreferrer" aria-label="查看${escapeHtml(item.school)}${escapeHtml(program.school)}官网：${escapeHtml(program.name)}"><i data-lucide="landmark"></i>查看学院官网<i data-lucide="external-link"></i></a>` : `<span class="major-program-source-link pending-source"><i data-lucide="landmark"></i>官方链接待补充</span>`;
    const content = `<div class="major-program-title"><span class="major-program-icon"><i data-lucide="book-open"></i></span><div><strong>${escapeHtml(program.name)}</strong><small>${escapeHtml(program.school)}</small></div></div><div class="major-program-meta"><span>${escapeHtml(program.level)}</span><span>${escapeHtml(program.category)}</span></div><p>${escapeHtml(program.note)}</p><div class="major-program-actions">${sourceLink}<button class="save-experience ${saved ? "saved" : ""}" type="button" data-favorite="${escapeHtml(favoriteId)}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入候选专业"}</button></div>`;
    return `<article class="major-program-item${program.officialUrl ? "" : " pending"}" aria-label="${escapeHtml(item.school)} ${escapeHtml(program.name)}">${content}</article>`;
  }).join("") : `<div class="major-program-empty"><i data-lucide="search-x"></i><p>没有找到匹配的专业</p></div>`;
}

function renderAdmissionResources(item) {
  return item.admissionResources.map((resource) => `<a class="admission-resource-card" href="${safeExternalHref(resource.url)}" target="_blank" rel="noopener noreferrer"><span class="admission-resource-icon"><i data-lucide="${escapeHtml(resource.icon)}"></i></span><div><span class="admission-resource-type">${escapeHtml(resource.sourceType)}</span><strong>${escapeHtml(resource.title)}</strong><p>${escapeHtml(resource.description)}</p><small>${escapeHtml(resource.year)} · ${escapeHtml(resource.sourceName)}</small></div><span class="admission-resource-status ${resource.status === "待接入" ? "pending" : ""}">${escapeHtml(resource.status)}</span><i data-lucide="arrow-up-right"></i></a>`).join("");
}

function renderLatestUpdates(item) {
  const updates = Array.isArray(item.latestUpdates) ? item.latestUpdates : [];
  const updateCards = updates.map((update) => `<article class="latest-update-card"><div class="latest-update-meta"><span>${escapeHtml(update.type)}</span><time>${escapeHtml(update.date)}</time></div><h3>${escapeHtml(update.title)}</h3><p>${escapeHtml(update.summary)}</p><footer><div><span>${escapeHtml(update.publisher)}</span><small>${escapeHtml(update.status)}</small></div><a href="${safeExternalHref(update.url)}" target="_blank" rel="noopener noreferrer" aria-label="前往${escapeHtml(update.publisher)}核验${escapeHtml(update.title)}">前往官网核验<i data-lucide="arrow-up-right"></i></a></footer></article>`).join("");
  return `<article class="detail-panel latest-updates-panel school-detail-anchor" id="school-updates"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="newspaper"></i>最新资讯</span><h2>政策变化先核对发布时间</h2></div><span class="source-level-tag level-official">官方发布入口</span></div><p>集中查看可能随年份变化的学校政策。当前为前端结构示例，接入具体通知前不展示未经核验的发布日期和政策结论。</p><div class="latest-update-list">${updateCards}</div><div class="latest-update-note"><i data-lucide="history"></i><span>正式接入后，每条资讯保留发布单位、发布日期与原始页面，旧政策不覆盖，便于比较历年变化。</span></div></article>`;
}

function renderCampusSection(item) {
  const campusCards = item.campusDetails.map((campus) => `<article class="campus-card"><header><span class="campus-icon"><i data-lucide="school"></i></span><div><strong>${escapeHtml(campus.name)}</strong><small>${escapeHtml(campus.location)}</small></div><span>${escapeHtml(campus.status)}</span></header><dl><div><dt>学院分布</dt><dd>${escapeHtml(campus.colleges)}</dd></div><div><dt>交通参考</dt><dd>${escapeHtml(campus.transport)}</dd></div></dl></article>`).join("");
  const cityCards = item.cityReferences.map((reference) => `<article class="city-reference-card"><i data-lucide="${escapeHtml(reference.icon)}"></i><span>${escapeHtml(reference.label)}</span><strong>${escapeHtml(reference.value)}</strong><small>${escapeHtml(reference.note)}</small></article>`).join("");
  const mediaCards = item.campusMedia.map((media) => `<a class="campus-media-card" href="${safeExternalHref(media.url)}" target="_blank" rel="noopener noreferrer"><span class="campus-media-preview"><i data-lucide="${escapeHtml(media.icon)}"></i></span><div><strong>${escapeHtml(media.title)}</strong><p>${escapeHtml(media.description)}</p><span>${escapeHtml(media.status)}</span></div><i data-lucide="arrow-up-right"></i></a>`).join("");
  return `<article class="detail-panel campus-panel school-detail-anchor" id="school-campus"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="map-pin"></i>校园与城市</span><h2>先确认校区，再判断生活环境</h2></div><span class="source-level-tag level-institution">平台整理</span></div><p>${escapeHtml(item.campusSummary)}</p><section class="campus-subsection"><div class="campus-subsection-heading"><div><strong>校区概览</strong><small>学院和交通安排以学校最新发布为准</small></div><span>${item.campusDetails.length} 个校区条目</span></div><div class="campus-grid">${campusCards}</div></section><section class="campus-subsection"><div class="campus-subsection-heading"><div><strong>${escapeHtml(item.city)}城市参考</strong><small>不填写未经核实的时间和费用数字</small></div></div><div class="city-reference-grid">${cityCards}</div></section><section class="campus-subsection"><div class="campus-subsection-heading"><div><strong>校园媒体</strong><small>仅接入学校官方或明确授权的素材</small></div><span>来源：${escapeHtml(item.officialSource)}</span></div><div class="campus-media-grid">${mediaCards}</div></section><div class="admission-disclaimer"><i data-lucide="clock-3"></i><span>校园资料更新：${item.updatedAt}。具体校区、宿舍和交通安排需按专业及当年通知确认。</span></div></article>`;
}

function renderSchoolDetail() {
  const panel = $("#schoolDetailContent");
  const item = institutions.find((school) => school.id === currentSchoolDetail) || institutions[0];
  if (!panel || !item) return;
  const saved = userFavorites().includes(`school-${item.id}`);
  const returnCopy = currentSchoolReturnView === "compare" ? "返回我的候选" : "返回院校与经验";
  const schoolCommentSection = renderSchoolCommentSection(item);
  const latestUpdatesSection = renderLatestUpdates(item);
  const campusSection = renderCampusSection(item);
  panel.innerHTML = `<div class="school-detail-topbar"><button class="quiet-button" data-view-target="${escapeHtml(currentSchoolReturnView)}"><i data-lucide="arrow-left"></i>${escapeHtml(returnCopy)}</button><div class="school-detail-top-actions"><a class="quiet-button" href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link"></i>学校官网</a><button class="primary-button" data-favorite="school-${escapeHtml(item.id)}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入我的候选"}</button></div></div>
    <header class="school-profile-header"><div class="institution-mark school-profile-mark">${escapeHtml(item.school.slice(0, 1))}</div><div class="school-profile-copy"><span class="section-kicker">学校详情 · 平台整理</span><h1>${escapeHtml(item.school)}</h1><p class="school-english-name">${escapeHtml(item.englishName)}</p><div class="school-profile-tags"><span><i data-lucide="map-pin"></i>${escapeHtml(item.city)}</span><span><i data-lucide="landmark"></i>${escapeHtml(item.type)}</span>${item.highlights.map((highlight) => `<span>${escapeHtml(highlight)}</span>`).join("")}</div></div></header>
    <nav class="school-section-nav" aria-label="学校详情目录"><button data-school-anchor="school-overview" class="active">学校概况</button><button data-school-anchor="school-updates">最新资讯</button><button data-school-anchor="school-majors">专业列表</button><button data-school-anchor="school-admission">招生录取</button><button data-school-anchor="school-campus">校园与城市</button><button data-school-anchor="school-progression">升学参考</button><button data-school-anchor="school-comments">本校评论</button></nav>
    <div class="school-detail-grid">
      <section class="school-detail-main">
        <article class="detail-panel detail-overview school-detail-anchor" id="school-overview"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="notebook-tabs"></i>学校概况</span><h2>先建立整体认识</h2></div><span class="source-level-tag level-institution">平台整理</span></div><p>${escapeHtml(item.intro)}</p><dl class="school-facts"><div><dt>中文名称</dt><dd>${escapeHtml(item.school)}</dd></div><div><dt>英文名称</dt><dd>${escapeHtml(item.englishName)}</dd></div><div><dt>办学类型</dt><dd>${escapeHtml(item.type)}</dd></div><div><dt>办学层次</dt><dd>${escapeHtml(item.educationLevel)}</dd></div><div><dt>创办时间</dt><dd>${escapeHtml(item.founded)}</dd></div><div><dt>主要校区</dt><dd>${escapeHtml(item.campuses)}</dd></div></dl><div class="school-source-note"><span><i data-lucide="clock-3"></i>资料更新：${escapeHtml(item.updatedAt)}</span><a href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noopener noreferrer">来源：${escapeHtml(item.officialSource)}<i data-lucide="external-link"></i></a></div></article>
        ${latestUpdatesSection}
        <article class="detail-panel major-program-panel school-detail-anchor" id="school-majors"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="book-open"></i>专业列表</span><h2>查看专业与培养方向</h2></div><span class="source-level-tag level-official">官方信息</span></div><p>${escapeHtml(item.officialSummary)}</p><div class="major-program-search"><i data-lucide="search"></i><input id="schoolMajorSearch" type="search" placeholder="搜索专业名称、学院或学科门类" autocomplete="off"><span id="majorProgramCount">${item.majorPrograms.length} 个示例专业</span></div><div class="major-program-list" id="majorProgramList">${renderMajorPrograms(item)}</div><div class="major-program-foot"><span>当前为页面结构示例,完整目录以学校官方发布为准。</span><a class="source-link" href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link"></i>查看 ${escapeHtml(item.officialSource)}</a></div></article>
        <article class="detail-panel admission-panel school-detail-anchor" id="school-admission"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="graduation-cap"></i>招生与录取</span><h2>按年份和报考条件查资料</h2></div><span class="source-level-tag level-data">公开资料</span></div><p>${escapeHtml(item.admissionBrief)}</p><div class="admission-filter-bar"><label><span>年份</span><select id="admissionYear">${item.admissionYears.map((year) => `<option>${escapeHtml(year)}</option>`).join("")}</select></label><label><span>省份</span><select id="admissionProvince">${item.admissionProvinces.map((province) => `<option>${escapeHtml(province)}</option>`).join("")}</select></label><label><span>科类</span><select id="admissionSubject">${item.admissionSubjects.map((subject) => `<option>${escapeHtml(subject)}</option>`).join("")}</select></label></div><div class="admission-selection-note"><i data-lucide="filter"></i><span id="admissionSelectionNote">当前条件：${escapeHtml(item.admissionYears[0])} · ${escapeHtml(item.admissionProvinces[0])} · ${escapeHtml(item.admissionSubjects[0])}</span><small>前端结构示例,真实查询待数据接口接入</small></div><div class="admission-resource-list">${renderAdmissionResources(item)}</div><div class="admission-disclaimer"><i data-lucide="info"></i><span>${escapeHtml(item.dataSummary)}</span></div></article>
        ${campusSection}
        <article class="detail-panel progression-panel school-detail-anchor" id="school-progression"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="trending-up"></i>升学参考</span><h2>保研率先看统计口径</h2></div><span class="source-level-tag level-data">待核验数据</span></div><p>${escapeHtml(item.careerSummary)}</p><div class="recommendation-summary"><div><span>保研率</span><strong>${escapeHtml(item.postgraduateRecommendation.value)}</strong><small>数据年份：${escapeHtml(item.postgraduateRecommendation.year)}</small></div><div><span>推免人数</span><strong>${escapeHtml(item.postgraduateRecommendation.recommendedCount)}</strong><small>需对应学校公示名单</small></div><div><span>毕业生统计范围</span><strong>${escapeHtml(item.postgraduateRecommendation.graduateScope)}</strong><small>需明确分母范围</small></div></div><dl class="recommendation-method"><div><dt>建议计算口径</dt><dd>${escapeHtml(item.postgraduateRecommendation.methodology)}</dd></div><div><dt>建议来源</dt><dd>${escapeHtml(item.postgraduateRecommendation.source)}</dd></div><div><dt>更新时间</dt><dd>${escapeHtml(item.postgraduateRecommendation.updatedAt)}</dd></div></dl><div class="admission-disclaimer warning"><i data-lucide="triangle-alert"></i><span>不同学院、专业和年份的推免情况可能不同,正式展示时必须保留原始来源与统计范围。</span></div></article>
      </section>
      <aside class="school-detail-side"><section class="detail-source-panel"><span class="subsection-kicker"><i data-lucide="shield-check"></i>信息凭证</span><h2>每条摘要都有来源入口</h2><p>平台负责整理和解释,官方页面与公开数据用于核验具体细节。</p><a class="detail-source-row" href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noopener noreferrer"><span class="source-icon official-icon"><i data-lucide="landmark"></i></span><span><strong>${escapeHtml(item.officialSource)}</strong><small>学校简介 · 招生简章 · 培养信息</small></span><i data-lucide="external-link"></i></a><a class="detail-source-row" href="${escapeHtml(item.dataUrl)}" target="_blank" rel="noopener noreferrer"><span class="source-icon data-icon"><i data-lucide="database"></i></span><span><strong>${escapeHtml(item.dataSource)}</strong><small>招生计划 · 专业目录 · 公开录取信息</small></span><i data-lucide="external-link"></i></a></section>${schoolCommentSection}</aside>
    </div>`;
  hydrateIcons();
}

function renderAnswerHistory() {
  const list = $("#answerList");
  if (!list) return;
  const user = currentUser();
  const history = user ? read(STORE.answers, []).filter((item) => item.userId === user.id) : demoAnswers;
  list.innerHTML = history.length ? history.map((item) => `<article class="question-list-item"><header><strong>${escapeHtml(item.title)}</strong><span class="question-status">${escapeHtml(item.status)}</span></header><p>${escapeHtml(item.meta || `${item.topic || "未分类"} · 已完成回答`)}</p></article>`).join("") : `<div class="qa-empty"><i data-lucide="message-square-off"></i><p>你还没有回答过问题</p><span>完成认证后，可以从左侧问题池选择自己真正经历过的问题。</span></div>`;
  hydrateIcons();
}

