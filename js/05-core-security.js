/**
 * 令牌与密码处理
 * 原 app.js 第 388-437 行（机械切分，内容未改动）
 * 建议维护：G3 安全组
 */
function secureRandomToken(length = 8) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  if (!window.crypto?.getRandomValues) {
    return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  }
  const bytes = new Uint8Array(length);
  window.crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => alphabet[byte % alphabet.length]).join("");
}

function safeExternalHref(value) {
  try {
    const url = new URL(String(value || ""), window.location.origin);
    return ["http:", "https:"].includes(url.protocol) ? escapeHtml(url.href) : "#";
  } catch {
    return "#";
  }
}

const isStudentRole = (role) => ["\u5b66\u751f", "\u9ad8\u4e2d\u751f", "\u5927\u5b66\u751f"].includes(role);
const isParentRole = (role) => role === "\u5bb6\u957f";

// ✅ 密码安全 - SHA-256哈希（从修正版集成）
async function createPasswordRecord(password) {
  const salt = secureRandomToken(24);
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return { passwordSalt: salt, passwordHash: hashHex };
}

async function passwordMatches(user, password) {
  if (!user.passwordSalt || !user.passwordHash) return false;
  const encoder = new TextEncoder();
  const data = encoder.encode(user.passwordSalt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex === user.passwordHash;
}

const uid = (prefix = "id") => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const majorCandidateId = (schoolId, major) => `major-${schoolId}-${encodeURIComponent(major)}`;
const majorDecisionKey = (school, major) => encodeURIComponent(`${school}::${escapeHtml(major)}`);
const candidateStatuses = ["待了解", "正在比较", "已倾向", "暂不考虑"];
const currentUser = () => { const id = localStorage.getItem(STORE.session); return read(STORE.users, []).find((user) => user.id === id) || null; };
const userFavorites = () => { const user = currentUser(); return user ? read(STORE.favorites, {})[user.id] || [] : []; };


// ============================================================
// P6 新增 · 内容哈希存证（追加到 js/05-core-security.js 文件末尾）
// 仅使用浏览器原生 Web Crypto API，无任何第三方依赖
// 用途：发帖时把内容哈希后存证，可证明"内容没被改过"
// 注意：本段代码不修改任何已有函数，追加到末尾即可，不影响其他功能
// ============================================================

/**
 * 计算内容的 SHA-256 哈希（十六进制字符串）
 * @param {string} content 任意文本内容
 * @returns {Promise<string>} 64 位十六进制哈希
 */
async function computeContentHash(content) {
  const encoder = new TextEncoder();
  const data = encoder.encode(String(content ?? ""));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * 生成一条内容存证记录（发帖时调用）
 * @param {string} content 帖子内容
 * @param {string} [authorId] 作者 ID，不传则自动取当前登录用户
 * @returns {Promise<{contentHash: string, authorId: string|null, createdAt: string, algo: string}>}
 */
async function createContentAttestation(content, authorId) {
  const contentHash = await computeContentHash(content);
  const user = currentUser();
  return {
    contentHash,
    authorId: authorId || (user ? user.id : null),
    createdAt: new Date().toISOString(),
    algo: "SHA-256",
  };
}

/**
 * 校验内容是否被篡改：把当前内容重新哈希，与存证记录比对
 * @param {string} content 待校验的内容
 * @param {{contentHash: string, algo: string}} attestation 当初存的存证记录
 * @returns {Promise<boolean>} true = 内容与发布时完全一致
 */
async function verifyContentAttestation(content, attestation) {
  if (!attestation || attestation.algo !== "SHA-256" || !attestation.contentHash) return false;
  const currentHash = await computeContentHash(content);
  return currentHash === attestation.contentHash;
}
