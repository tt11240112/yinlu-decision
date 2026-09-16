/**
 * 用户资料与头像
 * 原 app.js 第 438-557 行（机械切分，内容未改动）
 * 建议维护：G1 前端组
 */
function saveHistory(id) {
  const user = currentUser();
  if (!user || !id) return;
  const all = read(STORE.history, {});
  const existing = Array.isArray(all[user.id]) ? all[user.id] : [];
  all[user.id] = [String(id), ...existing.filter((item) => item !== String(id))].slice(0, 5);
  write(STORE.history, all);
}
const initials = (name = "访客") => name.trim().slice(0, 1) || "访";
const AVATAR_MAX_FILE_SIZE = 5 * 1024 * 1024;

function userCreatedAt(user) {
  const storedDate = user?.createdAt ? new Date(user.createdAt) : null;
  if (storedDate && !Number.isNaN(storedDate.getTime())) return storedDate;
  const idTimestamp = Number(String(user?.id || "").split("_")[1]);
  const inferredDate = new Date(idTimestamp);
  return Number.isNaN(inferredDate.getTime()) ? new Date() : inferredDate;
}

function formatProfileDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function todayDateValue() {
  return formatProfileDate(new Date());
}

function ageFromBirthDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;
  const [year, month, day] = value.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  if (Number.isNaN(birthDate.getTime()) || birthDate > today || birthDate.getFullYear() !== year || birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) return null;
  let age = today.getFullYear() - year;
  if (today.getMonth() < month - 1 || (today.getMonth() === month - 1 && today.getDate() < day)) age -= 1;
  return age >= 0 && age <= 130 ? age : null;
}

function userRegionParts(user) {
  const storedRegion = String(user?.region || "").trim();
  const province = user?.regionProvince || Object.keys(REGION_CITIES).find((item) => storedRegion === item || storedRegion.startsWith(`${item} `)) || "";
  const city = user?.regionCity || (province ? storedRegion.slice(province.length).trim() : "");
  return { province, city };
}

function setRegionOptions(province = "", city = "") {
  const provinceSelect = $("#profileProvinceInput");
  const citySelect = $("#profileCityInput");
  if (!provinceSelect || !citySelect) return;
  provinceSelect.replaceChildren(new Option("请选择省份 / 地区", ""));
  Object.keys(REGION_CITIES).forEach((item) => provinceSelect.add(new Option(item, item)));
  provinceSelect.value = Object.hasOwn(REGION_CITIES, province) ? province : "";
  citySelect.replaceChildren(new Option(provinceSelect.value ? "请选择城市 / 地区" : "请先选择省份 / 地区", ""));
  const cities = REGION_CITIES[provinceSelect.value] || [];
  cities.forEach((item) => citySelect.add(new Option(item, item)));
  if (city && !cities.includes(city)) citySelect.add(new Option(city, city));
  citySelect.value = city;
  citySelect.disabled = !provinceSelect.value;
}

function updateProfileAge() {
  const birthDate = $("#profileBirthDateInput")?.value || "";
  const age = ageFromBirthDate(birthDate);
  const ageInput = $("#profileAgeInput");
  if (ageInput) ageInput.value = age === null ? "未设置" : `${age} 岁`;
  return age;
}

function setUserAvatar(element, user) {
  if (!element) return;
  const avatar = typeof user?.avatarDataUrl === "string" && user.avatarDataUrl.startsWith("data:image/") ? user.avatarDataUrl : "";
  element.classList.toggle("has-image", Boolean(avatar));
  element.style.backgroundImage = avatar ? `url(${avatar})` : "";
  element.style.backgroundPosition = avatar ? "center" : "";
  element.style.backgroundSize = avatar ? "cover" : "";
  element.textContent = avatar ? "" : initials(user?.nickname);
}

function updateCurrentUser(updates) {
  const id = localStorage.getItem(STORE.session);
  if (!id) return null;
  let updatedUser = null;
  const users = read(STORE.users, []).map((user) => {
    if (user.id !== id) return user;
    updatedUser = { ...user, ...updates, updatedAt: new Date().toISOString() };
    return updatedUser;
  });
  if (updatedUser) write(STORE.users, users);
  return updatedUser;
}

function avatarDataUrl(file) {
  return new Promise((resolve, reject) => {
    const source = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const cropSize = Math.min(image.naturalWidth, image.naturalHeight);
      const sourceX = Math.max(0, (image.naturalWidth - cropSize) / 2);
      const sourceY = Math.max(0, (image.naturalHeight - cropSize) / 2);
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, sourceX, sourceY, cropSize, cropSize, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(source);
      resolve(canvas.toDataURL("image/webp", .86));
    };
    image.onerror = () => {
      URL.revokeObjectURL(source);
      reject(new Error("无法读取图片"));
    };
    image.src = source;
  });
}

