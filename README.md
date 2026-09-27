# 引路网站 v3 — 9 人协作版

> 🔒 **本文件是全队基准文件（baseline）。**
> 无论是队员还是 AI 助手，修改前请先在群里说明改什么、为什么。
> 2026-09-16 曾发生另一个 AI 未经确认覆盖本文件、写入 16 个不存在文件名的事件，已修复。
> 文件名正确性以本文件 + `docs/13_九人分工明细表_终版.md` 为准。

> **这是全队的开发主目录。** 演示给别人看请用根目录的 `引路网站_单文件版.html`（双击即开）。
>
> 本 README 于 2026-09-16 22:45 重写。
> 原因：此前一份版本把目录结构写成了 `js/app.js`、`css/styles.css`、`js/home.js` 等
> **16 个不存在的文件名**，并遗漏了 `template/`、构建命令、死代码警告等关键信息。
> 以下所有文件名均已逐个核对存在。

---

## 一、三样东西的区别（先看这个，别搞混）

## 零、仓库与分支结构（2026-09-16 定稿）

我们**没有新建仓库**，而是在原有仓库里加了一个独立分支：

| 仓库 | `https://github.com/tt11240112/yinlu-decision` |
|---|---|
| **`main` 分支** | 旧版 —— 14 个文件，停在 `debab34`（2026-08-15 23:09）。**冻结，勿改勿推** |
| **`v3` 分支** ← 我们在这里 | 新版 —— 78 个文件，26 个 JS + 15 个 CSS + 18 份文档 |

两个分支**互不相通**（`v3` 是孤儿分支，没有 main 的历史），好处是：

- 旧版在线、能打开，**随时可以当保底演示**
- 新版在一个全新干净的起点上开发，不受旧提交干扰
- 一个仓库管两份东西，不用记两个网址

> **⚠️ 切换分支时鼠标要点左上角，确认当前是 `v3` 而不是 `main`。**
> 在 main 上改代码 = 改的是旧版，白干。

| 东西 | 位置 | 什么时候用 |
|---|---|---|
| **开发版（本仓库 v3 分支）** | `C:\Users\TT\Documents\GitHub\yinlu-decision\` | 9 个人日常改代码 |
| **单文件演示版** | `C:\Users\TT\Documents\GitHub\引路网站_单文件版.html`（537 KB） | 答辩、发微信、拷 U 盘，**双击就能开** |
| 原始未切分版 | `C:\Users\TT\Desktop\小挑\yinlu-merged-mvp-2026-08-15\` | 只读保底，**不要改** |

三者是同一个网站，功能界面一致。

### 拆分保真度（2026-09-16 晚逐字节复核结果）

> ⚠️ 此前本文件写的是「MD5 逐字节校验无差异」，**这个说法不准确，已更正**。

| 检查项 | 结果 |
|---|---|
| 15 个 CSS 拼回 vs 原始 `styles.css` | 忽略空行后 **3517 行逐行完全相同** ✅ |
| 26 个 JS 拼回 vs 原始 `app.js` | 差异仅两类，见下 ✅ |
| 20 个空行 | 切分边界 trim 掉的，**无语义影响** |
| 原 `app.js` 第 3657–3739 行（83 行） | `renderFamily` 整段被 `26-family-override.js` **有意替换**（新版带邀请码 `YL-XXXXXXXX` 校验） |

**结论：除上面这一处有意替换外，拆分是零改动的机械切分，功能等价。**

---

## 二、怎么跑起来

**改代码时**（推荐用这个，避免 file:// 的怪问题）：

```bash
cd 引路网站_v3
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

直接双击 `index.html` 也能开（用的是普通 `<script src>`，不是 ES Module，所以 file:// 下没问题）。

---

## 三、⚠️ 改完代码必须跑这两条命令

```bash
node tools/build-index.js        # 重新生成 index.html
node tools/build-standalone.js   # 重新生成上级目录的单文件演示版
```

**为什么**：`index.html` 是**脚本自动生成**的。
你在 `js/` 里新建文件（比如 `27-about.js`），脚本会自动扫描并按文件名排序插进 `index.html`。

> **⛔ 绝对不要手改 `index.html`** —— 下次跑脚本，你的改动会被覆盖，白干。
>
> **要改页面结构、导航、文案** → 改 **`template/index.html`**（它是 HTML 源文件）。
> 里面只有 `app.js` 和 `styles.css` 两行是占位符会被替换，其余内容原样保留。

---

## 四、真实目录结构

```
引路网站_v3/
├── index.html              ← 【自动生成，别手改】网站入口
├── template/
│   └── index.html          ← 【改页面结构改这里】HTML 源文件
├── js/                     ← 26 个 JS（按文件名顺序加载，顺序不能乱）
├── css/                    ← 15 个 CSS（按文件名顺序加载）
├── lib/
│   └── lucide-lite.js      ← 第三方图标库，别改
├── tools/                  ← 4 个构建脚本，G0 用，其他人别动
│   ├── split-legacy.js     切分旧代码（已跑完，平时不用）
│   ├── split-css.js        切分旧 CSS（已跑完，平时不用）
│   ├── build-index.js      ← 常用：生成 index.html
│   └── build-standalone.js ← 常用：生成单文件演示版
├── legacy/
│   └── styles.css          ← 拆分前的原始 CSS，只读对照用
├── docs/                   ← 团队文档
└── *.svg                   ← 9 个插画素材（电子宠物、引导图标）
```

### js/ 的 26 个文件（按加载顺序，分 6 层）

| 层 | 文件 | 内容 |
|---|---|---|
| 数据 | `01-data-experiences.js`、`02-data-institutions.js` | 经验、院校等静态数据 |
| 配置 | `03-config-constants.js` | 全局常量 |
| 工具 | `04-core-utils.js`、`05-core-security.js` | 工具函数、XSS 防护 |
| 功能 | `06-feature-profile.js` … `19-feature-qa-tab.js` | 各功能模块 |
| 事件 | `20-events-click.js` … `24-events-keyboard.js` | 事件绑定 |
| 启动 | `25-bootstrap.js` | 初始化入口 |
| 覆盖 | `26-family-override.js` | **最后加载，会覆盖前面的同名函数** |

### css/ 的 15 个文件

`01-base` `02-account` `03-filters` `04-theme-core` `05-theme-palettes` `06-buttons-nav` `07-pet` `08-calendar` `09-card-layout` `10-onboarding` `11-qa` `12-login` `13-answer` `14-trust` `15-float`

---

## 五、⚠️ 三个必踩的坑

### 坑 1：有三个函数是死代码，改了没反应

`26-family-override.js` 最后加载，覆盖了前面三个同名函数：

| 函数 | ❌ 死代码（改了没用） | ✅ 真正生效 |
|---|---|---|
| `renderFamily` | `16-feature-compare.js:516` | `26-family-override.js` |
| `generateFamilyInvite` | `18-feature-actions.js` | `26-family-override.js` |
| `joinFamilyInvite` | `18-feature-actions.js` | `26-family-override.js` |

**改家庭/邀请码功能，必须改 26 号文件。**

### 坑 2：index.html 不能手改

见第三节。加页面/改导航改 `template/index.html`。

### 坑 3：变量是全局共享的

26 个文件不用 `import`，靠`<script>`顺序共享全局变量。
好处是零改动迁移；代价是**别随手新建全局变量**——比如你在自己的文件里写 `const data = ...`，可能把别人的覆盖了。

几个被依赖最多的函数，改之前想清楚：

| 函数 | 全站调用次数 | 位置 |
|---|---|---|
| `escapeHtml` | 270+ 次（`15-feature-render.js` 一个文件 138 次） | `04-core-utils.js` |
| `showToast` | 60+ 次（被 10 个文件调用） | `08-core-ui.js` |
| `switchView` | 多处 | `11-core-router.js` |

---

## 六、9 人分工

> 📋 **终版分工请看 `docs/13_九人分工明细表_终版.md`（P1–P9 编号 + 按专业匹配）**

| 编号 | 组 | 人数 | 专业 | 职责 |
|---|---|---|---|---|
| P1 | **G0 项目组** | 1 | 计科 | 材料 + 仓库管理 + 审跨组 PR + **数据库设计结对** |
| P2 P3 | **G1 前端交互组** | 2 | 计科 | 页面、交互、视觉、移动端 |
| P4 P5 | **G2 业务逻辑组** | 2 | 计科 | 高考/考研/就业/问答功能 |
| **P6 P7** | **G3 安全可信组** | 2 | **网安** | 凭证、防篡改、风控、安全测试 —— **全队护城河，不可削减** |
| P8 P9 | **G4 数据与后端组** | 2 | 计科 | 院校真实数据 + 服务端 |

**文件地契是强制的**：`.github/CODEOWNERS` 写死了每个文件归谁，
配合分支保护的 `Require review from Code Owners`，别人改你的文件你不同意就合不进去。

> ⚠️ 如果看到别的地方写的是 `G5 认证+安全 1 人`、`js/trust.js`、`js/home.js` 之类，
> **那是错的**（那些文件名根本不存在）。一切以本 README + `docs/13` 为准。
>
> 🗑️ `docs/02_9人分工与文件认领表.md` 已被取代，仅作历史保留。

---

## 七、日常流程（5 步）

```bash
# 1. 拉最新代码（主线是 v3，不是 main！）
git checkout v3 && git pull

# 2. 开自己的分支（分支命名规范：feat/名字-做什么）
git checkout -b feat/zhangsan-gaokao-filter

# 3. 改代码 —— 只改自己认领的文件
# 4. 本地验证 + 跑构建
node tools/build-index.js

# 5. 提交 + 提 PR
git add js/你改的文件.js
git commit -m "feat(gaokao): 新增院校筛选"
git push -u origin feat/zhangsan-gaokao-filter
```

> 🖱️ **用 GitHub Desktop 的话不用背命令**：切到 `v3` → Fetch origin → Create branch
> → 改代码 → Commit → Push origin → Create Pull Request。全程点鼠标。

然后去 GitHub 提 PR。**审核人由 `.github/CODEOWNERS` 自动指派**——
改了谁的文件，就必须谁点头。只改自己文件的，**同组搭档互审即可**，不必等队长。

**铁律**：
- ⛔ 不在 `v3` 主线分支上直接写代码（必须开自己的分支）
- ⛔ 不改 CODEOWNERS 里不是你的文件（要改先在群里说）
- ⛔ 不手改 `index.html`（改 `template/index.html` 后跑构建）
- ⛔ 不用 `git add .`（会误加别人的文件）
- ⛔ 不引入 npm / Vite / Webpack

---

## 八、文档导航

### 🚨 国庆冲刺专用（2026-09-28 → 10-03）

> **院赛材料 10 月 3 日截止。** 之前所有基于"10 月中下旬"的计划全部作废。

| 顺序 | 文档 | 什么时候看 |
|---|---|---|
| 1️⃣ | **`docs/16_10月3日冲刺_总览与倒计时.md`** | **先看这份**：6 天日程 + 材料清单 + 优先级 |
| 2️⃣ | **`docs/21_把切分完整版放进GitHub_两条路任选.md`** | ⭐ **今晚就照这个做**：A 路软件推送 / B 路网页上传 |
| 3️⃣ | **`docs/20_做到哪算哪_实现边界与材料口径.md`** | ⭐ **哪些能写"已实现"、哪些只能写"设计中"** |
| 4️⃣ | **`docs/17_GitHub从零到队友能改_图解教程.md`** | 更详细的 GitHub 说明（含网页改文件 / 命令行备选） |
| 5️⃣ | **`docs/18_参赛材料_四样东西怎么填怎么合.md`** | Day 2 起：申报书 / 汇总表 / 说明书 / 佐证 PDF |
| 6️⃣ | **`docs/任务书/PX_你的编号_国庆6天任务书.md`** | **每人只看自己那份**，发群里时只发对应的 |

> ⛔ `docs/11`、`docs/12`（"明天作战手册"）**已过期作废**——
> 它们说的"明天"是 9 月 17 日，早已过去。**别再看。**

### 分工与协作（长期有效）

| 文档 | 用途 |
|---|---|
| **`docs/13_九人分工明细表_终版.md`** | **分工的权威文件**（P1–P9 编号） |
| **`docs/14_文件夹地图_每个目录干什么谁能动.md`** | 每个目录的用途与权限 |
| `docs/15_今晚全部决策与产出总结.md` | 9-16 夜的决策记录，交接用 |

**还没看过代码的新人（按顺序）**：

1. **`docs/14_文件夹地图_每个目录干什么谁能动.md`** ← **每个文件夹的用途与权限，先看这个**
2. `docs/分组说明/GX_你的组_使用说明.md` ← 然后只看自己那份
3. `docs/01_GitHub分支协作实操手册.md` ← GitHub Desktop 图形界面，不用背命令
4. `docs/06_改代码到提交GitHub完整流程.md` ← 从改一行到推上去

**参考**：
- `docs/05_切分文件逐项详细说明.md` —— 41 个文件逐个说明 + 切分原理
- `docs/08_Git规范白皮书_9人协作.md` —— 完整 Git 规范、PR 模板、冲突解法
- `docs/00_照着做_GitHub七天与分工顺序.md` —— ⚠️ **Part 1 建仓部分已作废**，Part 3–6 仍有效

**参赛相关**：
- `docs/03_大挑参赛方案_科技发明类.md`
- `docs/04_参赛硬性条件与软著申请.md`（🔴 软著本周必须提交）
- `docs/07_福师大赛情与针对性策略.md`

---

## 九、常见问题

**Q：为什么不引入 npm / Vite？**
9 个人都是新手，构建工具会显著增加出错概率。现在这套**双击能开、传 GitHub 也能开**，每人只需会 Git 三五个命令。

**Q：为什么切成 41 个文件？**
原来 `app.js` 一个文件 3739 行。9 个人同时改必然冲突。切完每人只碰自己的几个文件，冲突概率接近 0。
拆分是纯机械按行切的，**除 `renderFamily` 一段被有意替换外，其余内容零改动**
（详见上面的保真度复核表）。

**Q：怎么加新功能？**
在 `js/` 里新建 `27-你的功能.js`（CSS 同理 `16-你的功能.css`），写完跑 `node tools/build-index.js`，脚本会自动把它加进 `index.html`。**不用手改 index.html。**

**Q：部署到公网？**
GitHub Pages：Settings → Pages → Source 选 **GitHub Actions**（不是 Deploy from a branch）。或者直接把整个文件夹传静态托管。

---

**下一步：打开 `docs/分组说明/`，找到你那一组的说明文档。**
