# 引路 · 改代码 → 验证 → 提交 GitHub 完整流程

> 这篇讲的是**动手改代码之后**的完整闭环。
> 如果你是第一次配置环境、第一次 clone 仓库，请先看 `01_GitHub分支协作实操手册.md` 的第 1–3 章。
> 这篇假设你已经能把代码拉到本地、能打开网站了。

---

## 全景图：改一行代码要经历几步

```
① 开工前：拉取最新代码（同步队友的改动）
        ↓
② 改代码：只改自己认领的文件
        ↓
③ 本地验证：浏览器打开看效果 + F12 看有没有报错
        ↓
④ 跑构建脚本：重新生成 index.html（如果加了文件）
        ↓
⑤ 提交到本地：写清楚"改了什么"
        ↓
⑥ 推送到 GitHub：推到自己的分支
        ↓
⑦ 提 PR：请求合并到 main
        ↓
⑧ 队长审查 + 合并
        ↓
⑨ 全组同步：下次开工各自拉取
        ↓
⑩ 需要演示时：生成单文件版
```

下面每一步都拆开讲。

---

## 第 ① 步：开工前必做（30 秒）

**每天写代码前第一件事：拉取最新代码。**

### GitHub Desktop 操作

1. 打开 GitHub Desktop
2. 左上角 **Current branch** 确认是你自己的分支（比如 `feat/zhangsan-pet`）
3. 点顶部菜单 **Branch → Update from main**（从主分支更新）
   - 如果按钮是灰的，说明你已经是最新
4. 或者更简单：点右上角 **Fetch origin**，如果有更新就点 **Pull origin**

### 命令行（想学的）

```bash
git checkout feat/zhangsan-pet    # 切到自己的分支
git pull origin main              # 把 main 的最新代码合并进来
```

### 为什么不拉会出事

假设昨天队友改了 `js/03-config-constants.js` 加了个变量，你今天改 `js/10` 时用到了——
你本地是旧版本，浏览器打开会报 `xxx is not defined`，你会以为是自己的 bug，浪费一小时。

**养成习惯：开工第一件事就是拉取。**

---

## 第 ② 步：改代码

### 三条铁律

| 铁律 | 说明 |
|---|---|
| **只改自己认领的文件** | 分工见 `02_9人分工与文件认领表.md`。看到别人的文件有 bug，**在群里说，别自己改** |
| **不要手改 `index.html`** | 它是自动生成的，改了会被覆盖 |
| **一次只做一件事** | 改宠物就只改宠物，别顺手改个颜色。不然出问题不知道是谁引起的 |

### 怎么知道自己该改哪个文件

查 `05_切分文件逐项详细说明.md` 的第 7 节"常见改法速查表"。

### 用什么编辑器

推荐 **VS Code**（免费）。必装插件：
- **Live Server**（右键 HTML 一键起服务，改完自动刷新）
- **Chinese (Simplified)** 中文语言包（如果要）
- **Prettier**（自动格式化，全队统一风格，避免无意义的代码差异）

---

## 第 ③ 步：本地验证（最重要，别跳过）

### 3.1 怎么打开网站

**方式一：直接双击（最省事）**

打开 `引路网站_v3/index.html` —— 因为没用 ES Module，**双击就能跑**，不需要服务器。

> ⚠️ 但有个前提：路径里有中文（"小挑"文件夹）在某些情况下可能出问题。
> 如果双击打开是空白页，改用方式二。

**方式二：用 VS Code 的 Live Server（推荐）**

1. 装好 Live Server 插件
2. 在 VS Code 里右键 `index.html`
3. 选 **Open with Live Server**
4. 浏览器自动打开 `http://127.0.0.1:5500`
5. **改代码保存后浏览器自动刷新**——效率提升巨大

**方式三：命令行起服务**

```bash
cd 引路网站_v3
python -m http.server 8000
# 然后浏览器打开 http://127.0.0.1:8000
```

### 3.2 必须看控制台（F12）

**改完代码不只看"看起来对不对"，必须看有没有报错。**

1. 按 **F12** 打开开发者工具
2. 点 **Console**（控制台）标签
3. 按 **Ctrl + R** 刷新页面
4. 看有没有**红色**的错误信息

**常见的红字和含义**：

| 报错 | 意思 | 怎么查 |
|---|---|---|
| `Uncaught ReferenceError: xxx is not defined` | 用了没定义的变量/函数 | 大概率是**加载顺序**问题，或者名字拼错 |
| `Uncaught TypeError: Cannot read properties of null` | 对 null 调用了方法 | `$("#xxx")` 没找到元素，检查 id 拼没拼错 |
| `Uncaught SyntaxError: Unexpected token` | **语法错误** | 括号/引号没闭合，去报错提示的行号看 |
| `Failed to load resource: 404` | 文件没找到 | 文件命名或路径错了 |

**⚠️ 提交前必须做到：控制台零报错。** 有红字就不要提 PR。

### 3.3 快速语法检查（可选但推荐）

在 `引路网站_v3` 目录下运行：

```bash
node --check js/10-feature-pet.js
```

- 没输出 = 语法正确
- 有输出 = 报错，会告诉你第几行有问题

想一次性检查全部：

```bash
for f in js/*.js; do node --check "$f" || echo "❌ $f 有语法错误"; done
```

（Windows 的 Git Bash 里可直接跑；PowerShell 用 `Get-ChildItem js\*.js | ForEach-Object { node --check $_ }`）

### 3.4 自查清单（每次提交前过一遍）

- [ ] 控制台**零红色报错**
- [ ] 我改的功能**实际点过了**，不是只看代码
- [ ] **没有**顺手改别人的文件
- [ ] **没有**手改 `index.html`
- [ ] 如果加了新文件，跑过 `node tools/build-index.js`
- [ ] 改的地方在手机上也能用（按 F12 → Ctrl+Shift+M 切手机视图）

---

## 第 ④ 步：跑构建脚本

### 什么情况要跑

| 情况 | 要跑的命令 |
|---|---|
| **只改了已有文件的内容** | **不用跑**，直接提交 |
| **新增了 js 文件**（如 `27-xxx.js`） | `node tools/build-index.js` |
| **新增了 css 文件** | `node tools/build-index.js` |
| **需要给评委/老师演示** | `node tools/build-standalone.js` |

### 怎么跑

在项目根目录（`引路网站_v3/`）打开终端：

```bash
node tools/build-index.js
```

看到这样的输出就是成功：

```
[OK] 已生成：C:\Users\...\引路网站_v3\index.html
     引入模块数：26
     剩余外部资源：
       - src="./lib/lucide-lite.js"
       - href="./css/01-base.css"
       ...
```

### 为什么新增文件必须跑这个

`index.html` 里的 26 行 `<script src>` 是脚本扫描 `js/` 目录自动生成的。
你不跑脚本，`index.html` 里就没有你的新文件——**你的代码根本不会被加载**，你会以为"写了没效果"。

### 生成演示用的单文件版

```bash
node tools/build-standalone.js
```

会在**上级目录**生成 `引路网站_单文件版.html`（约 537 KB），CSS/JS/图片全部内联。

**什么时候用**：
- 发给老师/评委看
- 拷 U 盘备着（答辩断网也不怕）
- 微信传给别人（对方不用装任何东西，双击就开）

**要不要提交到 GitHub**：建议**不要**（537KB 的大文件会让仓库变臃肿，而且每次都变）。
在 `.gitignore` 里加一行：

```
引路网站_单文件版.html
```

---

## 第 ⑤ 步：提交到本地（Commit）

### GitHub Desktop 操作

1. 左侧 **Changes** 标签会列出你改过的文件
2. **勾选**要提交的文件（**只勾自己的**，别勾 `index.html` 除非你跑过脚本）
3. 左下角 **Summary** 填一句话说明
4. 点 **Commit to feat/xxx**

### 提交信息怎么写（重要）

团队统一用这个格式：

```
类型: 简短描述（不超过 20 字）
```

**类型只有 6 种**：

| 类型 | 什么时候用 | 例子 |
|---|---|---|
| `feat` | 新功能 | `feat: 宠物支持长按拖动` |
| `fix` | 修 bug | `fix: 修复日历选日期不刷新` |
| `style` | 改样式，不改功能 | `style: 调整卡片间距` |
| `docs` | 改文档 | `docs: 补充切分说明` |
| `refactor` | 重构（改结构不改功能） | `refactor: 拆分宠物拖动逻辑` |
| `chore` | 杂事（构建、配置） | `chore: 新增 27 号模块` |

**反面教材**（不要这么写）：
- ❌ `改了一下`
- ❌ `update`
- ❌ `asdfasdf`
- ❌ `修复了那个问题（你懂的）`

**为什么在意这个**：两个月后你们要写技术报告、要复盘，翻提交记录能快速找出"哪天做了什么"。写"改了一下"等于没写。

### 命令行写法

```bash
git add js/10-feature-pet.js
git commit -m "fix: 修复宠物拖动后位置不保存"
```

---

## 第 ⑥ 步：推送到 GitHub（Push）

### GitHub Desktop

点右上角 **Push origin**（第一次可能是 **Publish branch**）。

### 命令行

```bash
git push origin feat/zhangsan-pet
```

### 关键认知：Push 不等于合并

**Push 只是把你的代码传到你自己的分支上，网站（main 分支）还没变。**
要让它进入主分支，必须提 PR（第 ⑦ 步）。

---

## 第 ⑦ 步：提 PR（Pull Request）

### 什么是 PR

"我改完了，请队长审查并合并到主分支"——这就是 PR。

### 操作步骤

**GitHub Desktop**：点顶部 **Branch → Create Pull Request**，会自动打开 GitHub 网页。

**或者直接在网页上**：
1. 打开仓库页面
2. 会看到黄色提示条 `feat/zhangsan-pet had recent pushes` → 点 **Compare & pull request**
3. 填写 PR 内容（见下面的模板）
4. 点 **Create pull request**

### PR 描述模板（照抄）

```markdown
## 我改了什么
- 修复了电子宠物拖动后刷新页面位置丢失的问题
- 改动文件：js/10-feature-pet.js

## 怎么验证
1. 打开首页
2. 拖动右下角的宠物到屏幕中间
3. 按 F5 刷新
4. 宠物应该还在刚才的位置（之前会回到右下角）

## 我自己检查过
- [x] 控制台零报错
- [x] 只改了自己认领的文件
- [x] 手机上试过（F12 手机视图）
- [x] 没有手改 index.html
```

**"怎么验证"这一栏最重要**——队长照着你写的步骤走一遍就能确认，不用猜你做了什么。

### PR 的三个规矩

1. **一个 PR 只做一件事**（修 3 个 bug 就提 3 个 PR）
2. **描述里必须写"怎么验证"**
3. **不要自己合并自己的 PR**（除非你是队长）

---

## 第 ⑧ 步：队长审查 + 合并

### 队长要做的

1. 打开 PR，点 **Files changed** 看改了哪些文件
2. 检查：
   - [ ] 只改了他认领的文件？
   - [ ] 没有动 `index.html`（或者动了但有合理理由）？
   - [ ] 代码能看懂吗（有没有奇怪的大段删除）？
3. 按 PR 里"怎么验证"的步骤**本地实测一遍**
4. 没问题 → **Merge pull request** → **Confirm merge**
5. 删掉已合并的分支（GitHub 会提示 Delete branch，点一下）

### 审查不是挑刺，是兜底

9 个人改同一份代码，审查是唯一能保证"网站不会突然崩"的机制。
**但不要卡 PR**——小改动 2 小时内必须处理完，不然队员会阻塞。

---

## 第 ⑨ 步：全组同步

合并后，其他人下次开工前：

```bash
git checkout feat/lisi-xxx
git pull origin main
```

GitHub Desktop：**Branch → Update from main**

**建议**：队长合并完在群里喊一声"main 更新了，大家拉取一下"。

---

## 第 ⑩ 步：需要演示时生成单文件版

```bash
node tools/build-standalone.js
```

生成 `../引路网站_单文件版.html`，双击即开。

**建议时机**：
- 每周五演示验收前
- 提交比赛材料前
- 答辩前一天（**一定要提前生成并测试，别当天做**）

---

## 实战：三个完整例子

### 例子 A：我要改一下按钮颜色

**场景**：首页的"开始规划"按钮太淡了，想加深一点。

**步骤**：

1. **找到按钮的 class**
   - 浏览器里右键按钮 → **检查**
   - 看 HTML 里的 class，比如 `class="btn btn-primary"`

2. **找到对应的 CSS 文件**
   ```bash
   grep -rn "btn-primary" css/
   ```
   假设输出 `css/06-buttons-nav.css:15:.btn-primary {`

3. **改颜色**
   用编辑器打开 `css/06-buttons-nav.css`，改 `background` 那行

4. **验证**
   - 回到浏览器（Live Server 会自动刷新）
   - 看颜色变了没，**F12 看控制台有没有报错**

5. **提交**
   - GitHub Desktop 勾选 `css/06-buttons-nav.css`
   - Summary 填：`style: 加深首页主按钮颜色`
   - Commit → Push → 提 PR

**这个例子不需要跑构建脚本**（只是改了已有文件的内容）。

---

### 例子 B：我要加一个新页面"关于我们"

**场景**：需要一个介绍团队的页面。

**步骤**：

1. **加 HTML —— 改模板，不是改 index.html**

   ⚠️ **关键**：`index.html` 是生成物，改了会被覆盖。
   **要改的是 `template/index.html`**（HTML 源文件，已在本仓库内）。

   在 `template/index.html` 里找到其他 `<div class="view">`，照着加一个：
   ```html
   <div class="view" id="view-about">
     <h1>关于我们</h1>
     <p>我们是计算机与网络空间安全学院的 9 人团队……</p>
   </div>
   ```

2. **加导航按钮**
   在同一个文件（`template/index.html`）的导航栏加：
   ```html
   <button onclick="switchView('about')">关于我们</button>
   ```

   > 💡 `template/index.html` 里只有两个占位标签是"会被替换"的：
   > `<script src="./app.js">` 和 `<link href="styles.css">`。
   > 脚本会把它们换成 26 个 JS + 15 个 CSS。**其余内容原样保留**，所以你的页面会完整出现在生成的 index.html 里。

3. **加样式**
   新建 `css/16-about.css`，写样式，然后跑 `node tools/build-index.js`

4. **如果需要 JS 逻辑**
   新建 `js/27-about.js`，然后跑 `node tools/build-index.js`

5. **跑脚本生成 index.html**（必须，否则页面不会出现）
   ```bash
   node tools/build-index.js
   ```

6. **验证**
   - 打开 `index.html`（不是 template 里的）
   - 点导航能切过去
   - F12 控制台零报错

7. **提交**
   - 勾选：`template/index.html` + `css/16-about.css` + `js/27-about.js` + **重新生成的 `index.html`**
   - Summary：`feat: 新增关于我们页面`
   - ⚠️ 四个文件都要勾。漏了 `index.html` 别人拉下来看不到页面；漏了 `template/` 下次跑脚本页面就没了

---

### 例子 C：我要修一个 bug——点了没反应

**场景**：点"加入候选"按钮没反应。

**排查步骤**：

1. **F12 看控制台**
   - 如果有红字 → 按报错信息查（通常是 id 拼错或函数没定义）
   - 如果没红字 → 继续第 2 步

2. **确认事件绑定方式**
   ```bash
   grep -rn "加入候选\|addCandidate\|candidate" js/20-events-click.js
   ```
   看有没有对应的 `data-` 属性判断

3. **检查 HTML 里的 data 属性**
   右键按钮 → 检查，看有没有 `data-xxx` 属性，名字和 JS 里写的一不一致

   **常见坑**：HTML 写 `data-add-candidate`，JS 里写成 `dataset.addCandidate` ✅ 正确
   如果写成 `dataset.add-candidate` ❌ 错误（连字符要转驼峰）

4. **加一行 console.log 调试**
   ```javascript
   const btn = event.target.closest("[data-add-candidate]");
   if (btn) {
     console.log("点到了！", btn.dataset.addCandidate);  // ← 临时加这行
     // ...
   }
   ```
   F12 看有没有输出。**有输出 = 事件触发了，问题在后面；没输出 = 选择器没匹配上**

5. **修好后删掉 console.log**（别留在代码里）

6. **提交**：`fix: 修复加入候选按钮无响应`

---

## 出问题怎么回滚

### 我改错了，还没 commit

GitHub Desktop：左侧 Changes 里右键文件 → **Discard Changes**（丢弃改动）

命令行：
```bash
git checkout -- js/10-feature-pet.js
```

### 我 commit 了，但还没 push

```bash
git reset --soft HEAD~1     # 撤销最后一次 commit，改动保留
```

### 我已经 push 了，而且合并了，网站崩了

**最稳妥的办法：再提一个"撤销 PR"**

1. 在 GitHub 网页找到那个 PR
2. 点 **Revert**（回滚）
3. 这会创建一个新的 PR，内容是"把之前的改动反向操作一遍"
4. 合并它，网站就恢复成改动前的样子

**不要用 `git reset --hard` + `git push -f`**（强制推送），那会抹掉历史记录，9 个人的仓库会乱套。

---

## 一张图总结

```
        ┌─ 只改内容 ──────────────→ 直接提交
改代码 ─┤
        └─ 新增文件 ──→ 跑 build-index.js ──→ 提交（含 index.html）

提交 → Push 到自己的分支 → 提 PR（写清楚怎么验证）→ 队长审查合并 → 全组拉取

演示时 → 跑 build-standalone.js → 得到单文件版 HTML
```

---

## 每日速查（打印贴显示器）

```bash
# 开工
git checkout 你的分支
git pull origin main

# 【如果新增了文件】
node tools/build-index.js

# 改完
git add 你改的文件
git commit -m "fix: 简短描述"
git push origin 你的分支
# 然后去 GitHub 网页提 PR
```

**提交前必查**：F12 控制台零红字 ✓ 只改了认领的文件 ✓ 没手改 index.html ✓

---

*文档版本：2026-09-16*
