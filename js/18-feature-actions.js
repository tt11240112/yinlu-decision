/**
 * 注册登录/提问/收藏/邀请码
 * 原 app.js 第 2847-3146 行（机械切分，内容未改动）
 * 建议维护：G2 业务组
 */
async function register(event) {
  event.preventDefault();
  const name = $("#registerName")?.value.trim() || "";
  const email = $("#registerEmail").value.trim().toLowerCase();
  const password = $("#registerPassword").value;
  const users = read(STORE.users, []);
  if (users.some((user) => user.email === email)) {
    showToast("这个邮箱已经注册，请直接登录");
    $("[data-auth-tab=login]")?.click();
    $("#loginEmail").value = email;
    return;
  }
  // ✅ 使用SHA-256哈希存储密码
  const passwordRecord = await createPasswordRecord(password);
  const user = {
    id: uid("user"),
    nickname: name || `用户${Date.now()}`,
    email,
    passwordSalt: passwordRecord.passwordSalt,
    passwordHash: passwordRecord.passwordHash,
    role: $("#registerRole")?.value || "学生",
    stage: $("#registerStage")?.value || "高考志愿",
    createdAt: new Date().toISOString()
  };
  write(STORE.users, [...users, user]);
  localStorage.setItem(STORE.session, user.id);
  $("#registerForm")?.reset();
  closeModal("accountModal");
  updateAccountHeader();
  showToast(`欢迎加入引路，${user.nickname}`);
}

async function login(event) {
  event.preventDefault();
  const email = $("#loginEmail").value.trim().toLowerCase();
  const password = $("#loginPassword").value;
  const users = read(STORE.users, []);
  const user = users.find((item) => item.email === email);

  if (!user) {
    showToast("邮箱或密码不正确，请检查后重试");
    return;
  }

  // ✅ 兼容旧版明文密码和新版哈希密码
  let isValidPassword = false;
  if (user.passwordHash && user.passwordSalt) {
    // 新版：使用SHA-256验证
    isValidPassword = await passwordMatches(user, password);
  } else if (user.password) {
    // 旧版：明文密码（兼容性）
    isValidPassword = user.password === password;
    // 自动升级为哈希密码
    if (isValidPassword) {
      const passwordRecord = await createPasswordRecord(password);
      const updatedUsers = users.map(u => u.id === user.id ? {
        ...u,
        passwordSalt: passwordRecord.passwordSalt,
        passwordHash: passwordRecord.passwordHash,
        password: undefined
      } : u);
      write(STORE.users, updatedUsers);
    }
  }

  if (!isValidPassword) {
    showToast("邮箱或密码不正确，请检查后重试");
    return;
  }

  localStorage.setItem(STORE.session, user.id);
  closeModal("accountModal");
  updateAccountHeader();
  showToast(`欢迎回来，${user.nickname}`);
}

function saveProfile(event) {
  event.preventDefault();
  const user = currentUser();
  if (!user) return;
  const nicknameInput = $("#profileNameInput");
  const nickname = nicknameInput?.value.trim() || "";
  if (!nickname) {
    showToast("昵称不能为空");
    nicknameInput?.focus();
    return;
  }
  const province = $("#profileProvinceInput")?.value || "";
  const city = $("#profileCityInput")?.value || "";
  const birthDateInput = $("#profileBirthDateInput");
  const birthDate = birthDateInput?.value || "";
  if (birthDate && ageFromBirthDate(birthDate) === null) {
    showToast("请填写有效的出生日期");
    birthDateInput?.focus();
    return;
  }
  const updatedUser = updateCurrentUser({
    nickname,
    role: $("#profileRoleInput")?.value || user.role,
    region: [province, city].filter(Boolean).join(" "),
    regionProvince: province,
    regionCity: city,
    birthDate,
    stage: $("#profileStageInput")?.value || user.stage,
    createdAt: user.createdAt || userCreatedAt(user).toISOString()
  });
  if (!updatedUser) return;
  updateAccountHeader();
  populateProfile(updatedUser);
  showToast("个人资料已保存");
}

async function changeProfileAvatar(event) {
  const input = event.currentTarget;
  const file = input.files?.[0];
  if (!file) return;
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
    showToast("请选择 JPG、PNG 或 WebP 图片");
    input.value = "";
    return;
  }
  if (file.size > AVATAR_MAX_FILE_SIZE) {
    showToast("头像图片不能超过 5 MB");
    input.value = "";
    return;
  }
  try {
    const dataUrl = await avatarDataUrl(file);
    const updatedUser = updateCurrentUser({ avatarDataUrl: dataUrl });
    if (updatedUser) {
      updateAccountHeader();
      setUserAvatar($("#profileAvatarLarge"), updatedUser);
      $("#profileAvatarRemove")?.classList.remove("hidden");
      showToast("头像已更新");
    }
  } catch (error) {
    showToast("头像读取失败，请换一张图片重试");
  } finally {
    input.value = "";
  }
}

function removeProfileAvatar() {
  const updatedUser = updateCurrentUser({ avatarDataUrl: "" });
  if (!updatedUser) return;
  updateAccountHeader();
  setUserAvatar($("#profileAvatarLarge"), updatedUser);
  $("#profileAvatarRemove")?.classList.add("hidden");
  showToast("已恢复默认头像");
}

function submitQuestion() {
  if (!requireAuth("登录后才能发布匿名问题")) return;
  const input = $("#questionInput"); const value = input?.value.trim() || ""; if (value.length < 8) { showToast("请把问题写得再具体一点"); input?.focus(); return; }
  const user = currentUser(); const all = read(STORE.questions, []); all.unshift({ id: uid("question"), userId: user.id, title: value, topic: $("#questionTopic")?.value || "未分类", stage: $("#questionStage")?.value || "高考志愿", status: "等待回答", createdAt: new Date().toISOString() }); write(STORE.questions, all);
  input.value = ""; closeModal("questionModal"); renderQuestions(); showToast("匿名问题已发布，正在匹配认证回答者");
}

function submitInlineQuestion() {
  if (!requireAuth("登录后才能发布匿名问题")) return;
  const input = $("#questionInputPreview");
  const value = input?.value.trim() || "";
  if (value.length < 8) {
    showToast("请把问题写得再具体一点");
    input?.focus();
    return;
  }
  const user = currentUser();
  const all = read(STORE.questions, []);
  all.unshift({
    id: uid("question"),
    userId: user.id,
    title: value,
    topic: $("#questionTopicPreview")?.value || "未分类",
    stage: $("#questionStagePreview")?.value || "高考志愿",
    status: "等待回答",
    createdAt: new Date().toISOString()
  });
  write(STORE.questions, all);
  input.value = "";
  renderQuestions();
  switchQaTab("ask");
  showToast("匿名问题已发布，正在匹配认证回答者");
}

function toggleFavorite(id) {
  if (!requireAuth("登录后才能保存候选")) return;
  const user = currentUser(); const all = read(STORE.favorites, {}); const list = all[user.id] || []; all[user.id] = list.includes(id) ? list.filter((item) => item !== id) : [...list, id]; write(STORE.favorites, all); renderExperiences(); renderCompare(); if ($("#view-school-detail")?.classList.contains("active")) renderSchoolDetail(); showToast(all[user.id].includes(id) ? "已加入候选" : "已从候选移除");
}

// ✅ 完整的家庭功能（从第三组集成）
function generateFamilyInvite() {
  if (!requireAuth("登录后才能创建家庭关联")) return;
  const user = currentUser();
  const all = read(STORE.family, {});

  // 只有学生可以生成邀请码
  if (user.role !== "学生") {
    showToast("只有学生可以生成家庭邀请码");
    return;
  }

  if (!all[user.id]) {
    // 使用8位随机字符，更安全
    let code = "";
    do code = `YL-${secureRandomToken(8)}`;
    while (Object.values(all).some((family) => family?.code === code));

    all[user.id] = {
      code,
      owner: user.id,
      parents: [],
      status: "waiting",
      createdAt: new Date().toISOString()
    };
  }

  write(STORE.family, all);
  renderFamily();
  showToast("家庭邀请码已生成");
}

function joinFamilyInvite(code) {
  if (!requireAuth("登录后才能加入家庭")) return;

  const user = currentUser();

  // 只有家长可以加入
  if (user.role !== "家长") {
    showToast("只有家长可以使用邀请码加入家庭");
    return;
  }

  if (!code || code.trim().length === 0) {
    showToast("请输入邀请码");
    return;
  }

  const all = read(STORE.family, {});
  const existingFamily = Object.values(all).find((family) => Array.isArray(family?.parents) && family.parents.includes(user.id));
  if (existingFamily) {
    showToast("\u5f53\u524d\u5bb6\u957f\u8d26\u53f7\u5df2\u52a0\u5165\u5bb6\u5ead");
    return;
  }
  let targetUserId = null;

  // 查找匹配的邀请码
  Object.keys(all).forEach(userId => {
    if (all[userId].code === code.trim().toUpperCase()) {
      targetUserId = userId;
    }
  });

  if (!targetUserId) {
    showToast("邀请码不存在或已过期");
    return;
  }

  const family = all[targetUserId];

  // 检查是否已经加入
  if (family.parents && family.parents.includes(user.id)) {
    showToast("您已经加入了这个家庭");
    return;
  }

  // 添加家长到家庭
  if (!family.parents) family.parents = [];
  family.parents.push(user.id);
  family.status = "linked";
  family.linkedAt = new Date().toISOString();

  write(STORE.family, all);
  renderFamily();
  showToast("家庭关联成功");
}

function requestVerification() {
  if (!requireAuth("登录后才能提交认证申请")) return;
  const user = currentUser(); const all = read(STORE.verification, {}); if (!all[user.id]) all[user.id] = { status: "申请中", submittedAt: new Date().toISOString() }; write(STORE.verification, all); renderTrust(); showToast("认证申请已提交");
}

function submitSchoolComment(event) {
  event.preventDefault();
  showToast("正式版本将由后端校验本校身份后发布评论");
}

function copyText(value) {
  const text = String(value || "");
  if (!navigator.clipboard?.writeText) { showToast(`\u9080\u8bf7\u7801\uff1a${text}`); return; }
  navigator.clipboard.writeText(text)
    .then(() => showToast("\u9080\u8bf7\u7801\u5df2\u590d\u5236"))
    .catch(() => showToast(`\u9080\u8bf7\u7801\uff1a${text}`));
}

function scrollToAnchor(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

