/**
 * 决策日历
 * 原 app.js 第 651-807 行（机械切分，内容未改动）
 * 建议维护：G1 前端组
 */
function parseDecisionDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!match) return null;
  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText) - 1;
  const day = Number(dayText);
  const date = new Date(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day ? date : null;
}

function decisionDateValue(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function daysUntilDecision(value) {
  const date = parseDecisionDate(value);
  if (!date) return Number.POSITIVE_INFINITY;
  const today = new Date();
  const targetUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((targetUtc - todayUtc) / 86400000);
}

function formatDecisionDate(value) {
  const date = parseDecisionDate(value);
  if (!date) return "日期未设置";
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return `${date.getMonth() + 1}月${date.getDate()}日 · ${weekdays[date.getDay()]}`;
}

function decisionEvents() {
  return read(STORE.decisionEvents, [])
    .filter((item) => item && item.id && String(item.title || "").trim() && parseDecisionDate(item.date))
    .sort((a, b) => a.date.localeCompare(b.date) || String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
}

function decisionDistanceText(distance) {
  if (distance === 0) return "就是今天";
  if (distance > 0) return `还有 ${distance} 天`;
  return `已过 ${Math.abs(distance)} 天`;
}

function renderDecisionCountdown() {
  const container = $("#decisionCountdown");
  const trigger = $("#decisionCalendarButton");
  const label = $("#decisionCountdownLabel");
  const value = $("#decisionCountdownValue");
  if (!container || !trigger || !label || !value) return;
  const nextEvent = decisionEvents().find((item) => daysUntilDecision(item.date) >= 0);
  container.classList.toggle("empty", !nextEvent);
  if (!nextEvent) {
    label.textContent = "设置决策时间";
    value.textContent = "添加时间点";
    trigger.setAttribute("aria-label", "打开决策日历设置时间点");
    return;
  }
  const distance = daysUntilDecision(nextEvent.date);
  label.textContent = `距${nextEvent.title}`;
  value.textContent = decisionDistanceText(distance);
  trigger.setAttribute("aria-label", `${label.textContent}${value.textContent}，打开决策日历`);
}

function renderDecisionEventList() {
  const list = $("#decisionEventList");
  const count = $("#decisionEventCount");
  if (!list || !count) return;
  const events = decisionEvents();
  count.textContent = `${events.length} 项`;
  list.innerHTML = events.length ? events.map((item) => {
    const distance = daysUntilDecision(item.date);
    return `<article class="decision-event-item ${distance < 0 ? "past" : ""}"><span class="decision-event-date"><strong>${escapeHtml(String(parseDecisionDate(item.date).getDate()).padStart(2, "0"))}</strong><small>${escapeHtml(`${parseDecisionDate(item.date).getMonth() + 1}月`)}</small></span><div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(formatDecisionDate(item.date))}</small></div><span class="decision-event-distance">${escapeHtml(decisionDistanceText(distance))}</span><button class="icon-button" type="button" data-delete-decision-event="${escapeHtml(item.id)}" aria-label="删除${escapeHtml(item.title)}"><i data-lucide="trash-2"></i></button></article>`;
  }).join("") : `<div class="decision-event-empty"><i data-lucide="calendar-plus"></i><strong>还没有时间点</strong><span>选择日期后添加第一项</span></div>`;
  hydrateIcons();
}

function renderDecisionCalendar() {
  const monthTitle = $("#decisionCalendarMonth");
  const grid = $("#decisionCalendarGrid");
  const dateInput = $("#decisionEventDate");
  if (!monthTitle || !grid || !dateInput) return;
  const year = decisionCalendarView.getFullYear();
  const month = decisionCalendarView.getMonth();
  monthTitle.textContent = `${year}年${month + 1}月`;
  const firstDay = new Date(year, month, 1);
  const gridStart = new Date(year, month, 1 - firstDay.getDay());
  const today = decisionDateValue(new Date());
  const eventDates = new Set(decisionEvents().map((item) => item.date));
  grid.replaceChildren();
  for (let index = 0; index < 42; index += 1) {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
    const value = decisionDateValue(date);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "decision-calendar-day";
    button.textContent = date.getDate();
    button.dataset.calendarDate = value;
    button.setAttribute("aria-label", `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`);
    button.classList.toggle("other-month", date.getMonth() !== month);
    button.classList.toggle("today", value === today);
    button.classList.toggle("selected", value === selectedDecisionDate);
    button.classList.toggle("has-event", eventDates.has(value));
    grid.appendChild(button);
  }
  dateInput.min = today;
  dateInput.value = selectedDecisionDate;
  renderDecisionEventList();
}

function selectDecisionDate(value) {
  const date = parseDecisionDate(value);
  if (!date) return;
  selectedDecisionDate = value;
  decisionCalendarView = new Date(date.getFullYear(), date.getMonth(), 1);
  renderDecisionCalendar();
}

function shiftDecisionCalendar(months) {
  decisionCalendarView = new Date(decisionCalendarView.getFullYear(), decisionCalendarView.getMonth() + months, 1);
  renderDecisionCalendar();
}

function openDecisionCalendar() {
  const nextEvent = decisionEvents().find((item) => daysUntilDecision(item.date) >= 0);
  const initialDate = nextEvent?.date || decisionDateValue(new Date());
  selectDecisionDate(initialDate);
  openModal("decisionCalendarModal");
}

function addDecisionEvent(event) {
  event.preventDefault();
  const title = $("#decisionEventName")?.value.trim() || "";
  const date = $("#decisionEventDate")?.value || "";
  if (!title) { showToast("请填写时间点名称"); return; }
  if (!parseDecisionDate(date) || daysUntilDecision(date) < 0) { showToast("请选择今天或之后的日期"); return; }
  const events = decisionEvents();
  if (events.some((item) => item.title === title && item.date === date)) { showToast("这个时间点已经添加过了"); return; }
  events.push({ id: uid("decision"), title, date, createdAt: new Date().toISOString() });
  write(STORE.decisionEvents, events);
  $("#decisionEventName").value = "";
  selectedDecisionDate = date;
  renderDecisionCalendar();
  renderDecisionCountdown();
  showToast(`已添加${title}`);
}

function deleteDecisionEvent(id) {
  const events = decisionEvents();
  const target = events.find((item) => item.id === id);
  if (!target) return;
  write(STORE.decisionEvents, events.filter((item) => item.id !== id));
  renderDecisionCalendar();
  renderDecisionCountdown();
  showToast(`已删除${target.title}`);
}

