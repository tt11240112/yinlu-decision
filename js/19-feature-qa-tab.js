/*
 * 问答 Tab
 * 原 app.js 第 3147-3156 行(机械切分,内容未改动)
 * 建议维护:G2 业务组
 * —— P5 增强:回答功能(2026-09-28)
 */
function switchQaTab(name) {
  const ask = $("#qaAskSection");
  const answer = $("#qaAnswerSection");
  const active = name === "answer" ? "answer" : "ask";
  ask?.classList.toggle("hidden", active !== "ask");
  answer?.classList.toggle("hidden", active !== "answer");
  $$(".auth-tab[data-qa-tab]").forEach((button) => button.classList.toggle("active", button.dataset.qaTab === name));
  if (active === "answer") renderAnswerHistory();
}

/* ===== 以下为 P5 新增:回答功能(js/19 后加载,覆盖 js/15 中的同名函数)===== */

function renderAnswerHistory() {
  const list = $("#answerList");
  if (!list) return;
  const user = currentUser();
  const questions = read(STORE.questions, []);
  const pool = questions.filter((q) => q.status !== "已回答");
  const history = user ? read(STORE.answers, []).filter((item) => item.userId === user.id) : demoAnswers;

  const poolHtml = user
    ? (pool.length
        ? `<div style="font-weight:800;color:#162d43;margin-bottom:10px;">问题池 · 选你真正经历过的</div>` +
          pool.map((q) => `<article class="question-list-item" style="margin-bottom:10px;">
              <header><strong>${escapeHtml(q.title || "未命名问题")}</strong><span class="question-status waiting">等待回答</span></header>
              <p>${escapeHtml(q.topic || "未分类")}${q.stage ? " · " + escapeHtml(q.stage) : ""}</p>
              <textarea data-answer-input="${q.id}" placeholder="写下你的真实经历与感受…" style="width:100%;min-height:70px;box-sizing:border-box;padding:9px;border:1px solid #d5e2ea;border-radius:8px;font:inherit;margin:8px 0;"></textarea>
              <button class="primary-button full-button" data-answer-submit="${q.id}">提交回答</button>
            </article>`).join("")
        : `<div class="qa-empty"><i data-lucide="message-square-off"></i><p>问题池暂时没有等待回答的问题</p></div>`)
    : `<div class="qa-empty"><i data-lucide="lock-keyhole"></i><p>登录后即可回答问题</p></div>`;

  const historyHtml = history.length
    ? history.map((item) => `<article class="question-list-item">
        <header><strong>${escapeHtml(item.title)}</strong><span class="question-status">${escapeHtml(item.status || "已回答")}</span></header>
        <p>${escapeHtml(item.content || item.meta || (item.topic ? `${item.topic} · 已完成回答` : "已完成回答"))}</p>
      </article>`).join("")
    : `<div class="qa-empty"><i data-lucide="message-square-off"></i><p>你还没有回答过问题</p><span>完成认证后，可以从问题池选择自己真正经历过的问题。</span></div>`;

  list.innerHTML = poolHtml +
    (user && pool.length ? `<div style="height:1px;background:#d5e2ea;margin:18px 0;"></div>` : "") +
    `<div style="font-weight:800;color:#162d43;margin-bottom:10px;">我的回答</div>` + historyHtml;
  hydrateIcons();
}

function submitAnswer(questionId) {
  if (!currentUser()) { showToast("登录后才能回答问题"); return; }
  const input = document.querySelector(`[data-answer-input="${questionId}"]`);
  const content = (input?.value || "").trim();
  if (content.length < 5) { showToast("回答内容请写具体一点(至少 5 个字)"); input?.focus(); return; }
  const question = read(STORE.questions, []).find((q) => q.id === questionId);
  const user = currentUser();
  const all = read(STORE.answers, []);
  all.unshift({
    id: uid("answer"),
    userId: user.id,
    questionId,
    title: question?.title || "已回答问题",
    content,
    topic: question?.topic || "未分类",
    status: "已回答",
    createdAt: new Date().toISOString()
  });
  write(STORE.answers, all);
  write(STORE.questions, read(STORE.questions, []).map((q) => q.id === questionId ? { ...q, status: "已回答" } : q));
  renderAnswerHistory();
  showToast("回答已发布");
}

document.addEventListener("click", (event) => {
  const submit = event.target.closest("[data-answer-submit]");
  if (submit) submitAnswer(submit.dataset.answerSubmit);
});

