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

