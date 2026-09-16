/**
 * 主题与展示布局
 * 原 app.js 第 558-628 行（机械切分，内容未改动）
 * 建议维护：G1 前端组
 */
function hydrateIcons() { if (window.lucide) window.lucide.createIcons(); }

function applyExperienceLayout(layout, { persist = true, notify = false } = {}) {
  const nextLayout = layout === "vertical" ? "vertical" : "horizontal";
  const view = $("#view-experience");
  if (!view) return;
  view.classList.toggle("experience-layout-horizontal", nextLayout === "horizontal");
  view.classList.toggle("experience-layout-vertical", nextLayout === "vertical");
  $$('[data-experience-layout]').forEach((button) => {
    const active = button.dataset.experienceLayout === nextLayout;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (persist) localStorage.setItem(STORE.experienceLayout, nextLayout);
  if (notify) showToast(`已切换为${nextLayout === "vertical" ? "竖版" : "横版"}布局`);
}

function switchExperienceContentTab(tab, { focusSearch = false } = {}) {
  const nextTab = tab === "experience" ? "experience" : "institution";
  currentExperienceContentTab = nextTab;
  currentInstitutionRegionOpen = false;
  currentExperienceRegionOpen = false;
  currentInstitutionMajorOpen = false;
  currentExperienceMajorOpen = false;
  $$('[data-experience-content-tab]').forEach((button) => {
    const active = button.dataset.experienceContentTab === nextTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  $$('[data-experience-content-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.experienceContentPanel !== nextTab;
  });
  if (nextTab === "institution") {
    const advancedFilters = $("#advancedExperienceFilters");
    if (advancedFilters) advancedFilters.hidden = true;
    $("#toggleAdvancedFilters")?.classList.remove("open");
  }
  renderExperiences();
  if (focusSearch) {
    const input = nextTab === "institution" ? $("#institutionSchoolSearch") : $("#experienceSchoolSearch");
    input?.focus();
  }
}

function updateThemeControls(theme) {
  const label = THEME_NAMES[theme] || THEME_NAMES.apple;
  const button = $("#themeButton");
  if (button) button.setAttribute("aria-label", `切换主题，当前为${escapeHtml(label)}`);
  $$('[data-theme-option]').forEach((option) => {
    const active = option.dataset.themeOption === theme;
    option.classList.toggle("active", active);
    option.setAttribute("aria-checked", String(active));
  });
}

function applyTheme(theme, { persist = false, notify = false } = {}) {
  const nextTheme = Object.hasOwn(THEME_NAMES, theme) ? theme : "apple";
  document.documentElement.dataset.theme = nextTheme;
  if (persist) localStorage.setItem(STORE.theme, nextTheme);
  updateThemeControls(nextTheme);
  if (notify) showToast(`已切换为${THEME_NAMES[nextTheme]}主题`);
}

function setThemeMenu(open) {
  const button = $("#themeButton");
  const menu = $("#themeMenu");
  if (!button || !menu) return;
  menu.hidden = !open;
  button.setAttribute("aria-expanded", String(open));
}

