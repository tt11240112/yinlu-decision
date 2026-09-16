/**
 * 家庭功能覆盖版（必须最后加载）
 * 原 app.js 第 3658-3739 行（机械切分，内容未改动）
 * 建议维护：G3 安全组
 */
// Family rendering override for the static MVP.
function renderFamily() {
  const user = currentUser();
  const main = $("#familyMainContent");
  if (!main) return;
  if (!user) {
    main.innerHTML = `<div class="family-compact-status"><span class="linked-status inactive"><span></span>\u672a\u767b\u5f55</span><small>\u767b\u5f55\u540e\u521b\u5efa\u5bb6\u5ead\u5171\u4eab</small></div><button class="primary-button" type="button" data-open-account><i data-lucide="log-in"></i>\u767b\u5f55\u540e\u7ee7\u7eed</button>`;
    hydrateIcons();
    return;
  }
  const families = read(STORE.family, {});
  const ownedFamily = families[user.id];
  const linkedFamily = Object.values(families).find((family) => Array.isArray(family?.parents) && family.parents.includes(user.id));
  if (isParentRole(user.role)) {
    if (linkedFamily) {
      const code = escapeHtml(linkedFamily.code || "");
      main.innerHTML = `<div class="family-compact-status"><span class="linked-status"><span></span>\u5df2\u52a0\u5165\u5bb6\u5ead</span><small>\u9080\u8bf7\u7801 ${code}</small></div><button class="quiet-button" type="button" data-copy-code="${code}"><i data-lucide="copy"></i>\u590d\u5236\u9080\u8bf7\u7801</button>`;
    } else {
      main.innerHTML = `<div class="family-join-panel"><i data-lucide="shield-check"></i><strong>\u8f93\u5165\u5b66\u751f\u7684\u9080\u8bf7\u7801</strong><div class="family-code-input-group"><input type="text" id="familyCodeInput" placeholder="YL-ABCDEFGH" maxlength="11" autocomplete="off"><button id="joinFamily" class="primary-button" type="button">\u52a0\u5165\u5bb6\u5ead</button></div></div>`;
    }
  } else if (isStudentRole(user.role)) {
    const code = ownedFamily?.code ? escapeHtml(ownedFamily.code) : "";
    main.innerHTML = ownedFamily
      ? `<div class="family-compact-status"><span class="linked-status"><span></span>${ownedFamily.status === "linked" ? "\u5bb6\u5ead\u5df2\u5173\u8054" : "\u5df2\u521b\u5efa\u9080\u8bf7"}</span><small>\u9080\u8bf7\u7801 ${code}</small></div><button class="quiet-button" type="button" data-copy-code="${code}"><i data-lucide="copy"></i>\u590d\u5236\u9080\u8bf7\u7801</button>`
      : `<div class="family-compact-status"><span class="linked-status inactive"><span></span>\u672a\u5173\u8054</span><small>\u5c1a\u672a\u4e0e\u5bb6\u5ead\u6210\u5458\u5171\u4eab\u5019\u9009</small></div><button class="primary-button" type="button" data-family-invite><i data-lucide="user-plus"></i>\u751f\u6210\u9080\u8bf7\u7801</button>`;
  } else {
    main.innerHTML = `<div class="family-compact-status"><span class="linked-status inactive"><span></span>\u4e0d\u53ef\u64cd\u4f5c</span><small>\u5bb6\u5ead\u534f\u540c\u4ec5\u5f00\u653e\u7ed9\u5b66\u751f\u548c\u5bb6\u957f\u89d2\u8272</small></div>`;
  }
  hydrateIcons();
}

function generateFamilyInvite() {
  if (!requireAuth("\u767b\u5f55\u540e\u624d\u80fd\u521b\u5efa\u5bb6\u5ead\u5171\u4eab")) return;
  const user = currentUser();
  if (!isStudentRole(user.role)) {
    showToast("\u53ea\u6709\u5b66\u751f\u89d2\u8272\u53ef\u4ee5\u751f\u6210\u5bb6\u5ead\u9080\u8bf7\u7801");
    return;
  }
  const families = read(STORE.family, {});
  if (!families[user.id]) {
    let code = "";
    do code = `YL-${secureRandomToken(8)}`;
    while (Object.values(families).some((family) => family?.code === code));
    families[user.id] = { code, owner: user.id, parents: [], status: "waiting", createdAt: new Date().toISOString() };
    write(STORE.family, families);
  }
  renderFamily();
  showToast("\u5bb6\u5ead\u9080\u8bf7\u7801\u5df2\u751f\u6210");
}

function joinFamilyInvite(code) {
  if (!requireAuth("\u767b\u5f55\u540e\u624d\u80fd\u52a0\u5165\u5bb6\u5ead")) return;
  const user = currentUser();
  if (!isParentRole(user.role)) {
    showToast("\u53ea\u6709\u5bb6\u957f\u89d2\u8272\u53ef\u4ee5\u4f7f\u7528\u9080\u8bf7\u7801\u52a0\u5165\u5bb6\u5ead");
    return;
  }
  const normalizedCode = String(code || "").trim().toUpperCase();
  if (!/^YL-[A-Z2-9]{8}$/.test(normalizedCode)) {
    showToast("\u8bf7\u8f93\u5165\u6b63\u786e\u7684 8 \u4f4d\u5bb6\u5ead\u9080\u8bf7\u7801");
    return;
  }
  const families = read(STORE.family, {});
  const targetEntry = Object.entries(families).find(([, family]) => family?.code === normalizedCode);
  if (!targetEntry) {
    showToast("\u9080\u8bf7\u7801\u4e0d\u5b58\u5728\u6216\u5df2\u8fc7\u671f");
    return;
  }
  const [targetUserId, targetFamily] = targetEntry;
  const joinedEntry = Object.entries(families).find(([, family]) => Array.isArray(family?.parents) && family.parents.includes(user.id));
  if (joinedEntry && joinedEntry[0] !== targetUserId) {
    showToast("\u5f53\u524d\u5bb6\u957f\u8d26\u53f7\u5df2\u52a0\u5165\u5176\u4ed6\u5bb6\u5ead");
    return;
  }
  targetFamily.parents = Array.isArray(targetFamily.parents) ? targetFamily.parents : [];
  if (!targetFamily.parents.includes(user.id)) targetFamily.parents.push(user.id);
  targetFamily.status = "linked";
  targetFamily.linkedAt = new Date().toISOString();
  write(STORE.family, families);
  renderFamily();
  showToast("\u5bb6\u5ead\u5173\u8054\u6210\u529f");
}
