/**
 * 问答 Tab
 * 原 app.js 第 3147-3156 行（机械切分，内容未改动）
 * 建议维护：G2 业务组
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

