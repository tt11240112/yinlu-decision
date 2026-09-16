# 引路网站 v3 — 9 人协作版

> 🔒 **本文件是全队基准文件（baseline）。**
> 无论是队员还是 AI 助手，修改前请先在群里说明改什么、为什么。
> 2026-09-16 曾发生另一个 AI 未经确认覆盖本文件、写入 16 个不存在文件名的事件，已修复。
> 文件名正确性以本文件 + `docs/02_9人分工与文件认领表.md` 为准。

> **这是全队的开发主目录。** 演示给别人看请用根目录的 `引路网站_单文件版.html`（双击即开）。
>
> 本 README 于 2026-09-16 22:45 重写。
> 原因：此前一份版本把目录结构写成了 `js/app.js`、`css/styles.css`、`js/home.js` 等
> **16 个不存在的文件名**，并遗漏了 `template/`、构建命令、死代码警告等关键信息。
> 以下所有文件名均已逐个核对存在。

---

## 一、三样东西的区别（先看这个，别搞混）

| 东西 | 位置 | 什么时候用 |
|---|---|---|
| **开发版（这里）** | `引路网站_v3/` | 9 个人日常改代码 |
| **单文件演示版** | 上级目录 `引路网站_单文件版.html`（537 KB） | 答辩、发微信、拷 U 盘，**双击就能开** |
| 原始未切分版 | 上级目录 `yinlu-merged-mvp-2026-08-15/` | 只读保底，**不要改** |

三者是**同一个网站**，功能界面完全一样。切分经 MD5 逐字节校验（247,674 字节，diff 无差异），**拆分本身零风险**。

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

## 六、9 人分工（以此表为准）

| 组 | 人数 | 职责 |
|---|---|---|
| **G0 项目组** | 1 | 材料 + 仓库管理 + 审 PR。**产出是秩序，不写代码** |
| **G1 前端交互组** | 2 | 页面、交互、视觉、移动端 |
| **G2 业务逻辑组** | 2 | 高考/考研/就业/问答功能 |
| **G3 安全可信组** | 2 | 凭证、防篡改、风控、安全测试 —— **网安专业的护城河** |
| **G4 数据与后端组** | 2 | 院校真实数据 + 服务端 |

**每个 JS/CSS 精确到人的认领表：`docs/02_9人分工与文件认领表.md`**
**每组的独立使用说明：`docs/分组说明/`（G0~G4 各一份，各看各的）**

> ⚠️ 如果看到别的地方写的是 `G5 认证+安全 1 人`、`js/trust.js`、`js/home.js` 之类，
> **那是错的**（那些文件名根本不存在）。一切以本 README + `docs/02` 为准。

---

## 七、日常流程（5 步）

```bash
# 1. 拉最新代码
git checkout main && git pull

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

然后去 GitHub 提 PR，**等 G0 审核合并**。

**铁律**：
- ⛔ 不改 `main` 分支
- ⛔ 不改别人认领的文件
- ⛔ 不用 `git add .`（会误加文件）
- ⛔ 不引入 npm / Vite / Webpack

---

## 八、文档导航

**新人先看**（按顺序）：
1. **`docs/00_照着做_GitHub七天与分工顺序.md`** ← **啥也不会就从这里开始**
2. `docs/分组说明/GX_你的组_使用说明.md` ← **每人只看自己那份**
3. `docs/01_GitHub分支协作实操手册.md` ← GitHub Desktop 图形界面，不用背命令
4. `docs/分组说明/00_总览_我生成了什么.md`

**参考**：
- `docs/02_9人分工与文件认领表.md` —— 文件认领权威表
- `docs/05_切分文件逐项详细说明.md` —— 41 个文件逐个说明 + 切分原理
- `docs/06_改代码到提交GitHub完整流程.md` —— 从改一行到推上去
- `docs/08_Git规范白皮书_9人协作.md` —— 完整 Git 规范、PR 模板、冲突解法
- `docs/09_GitHub初始化详细教程_Windows用户.md` —— **G0 建仓库看这个**

**参赛相关**：
- `docs/03_大挑参赛方案_科技发明类.md`
- `docs/04_参赛硬性条件与软著申请.md`（🔴 软著本周必须提交）
- `docs/07_福师大赛情与针对性策略.md`

---

## 九、常见问题

**Q：为什么不引入 npm / Vite？**
9 个人都是新手，构建工具会显著增加出错概率。现在这套**双击能开、传 GitHub 也能开**，每人只需会 Git 三五个命令。

**Q：为什么切成 41 个文件？**
原来 `app.js` 一个文件 3739 行。9 个人同时改必然冲突。切完每人只碰自己的几个文件，冲突概率接近 0。而且拆分是纯机械按行切的，**一个字符都没改**。

**Q：怎么加新功能？**
在 `js/` 里新建 `27-你的功能.js`（CSS 同理 `16-你的功能.css`），写完跑 `node tools/build-index.js`，脚本会自动把它加进 `index.html`。**不用手改 index.html。**

**Q：部署到公网？**
GitHub Pages：Settings → Pages → Source 选 **GitHub Actions**（不是 Deploy from a branch）。或者直接把整个文件夹传静态托管。

---

**下一步：打开 `docs/分组说明/`，找到你那一组的说明文档。**
