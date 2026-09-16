# 00 照着做：GitHub 七天上手 + 分工开工顺序

> 给完全没用过 Git 的人写的。**按顺序往下做，每一步做完再走下一步。**
> 预计：Part 0–2 你要花约 40 分钟，队友各花 20 分钟。
>
> 更新时间：2026-09-16

---

## Part 0 · 先装两个软件（你和队友都要装）

| 软件 | 下载地址 | 干什么用 |
|---|---|---|
| **GitHub Desktop** | `desktop.github.com` | 图形界面，点点鼠标就能传代码，**不用背命令** |
| **VS Code** | `code.visualstudio.com` | 写代码用 |

装完打开 GitHub Desktop，用 GitHub 账号登录。

> ⚠️ **队友也要各自注册 GitHub 账号**，把用户名发给你（Part 2 要用）。

---

## Part 1 · 你（队长）要做的：把代码传到 GitHub

### 📋 先确认：你的 GitHub 现状（已查证）

我查了这台电脑，**你已经有 GitHub，环境是齐的**：

| 项目 | 实际值 |
|---|---|
| GitHub 用户名 | **`tt11240112`** |
| 绑定邮箱 | `tiant1124@outlook.com` |
| 已有仓库 | **`https://github.com/tt11240112/yinlu-decision`** |
| Git 版本 | 2.55.0 ✅ 已安装 |
| GitHub Desktop | ✅ 已安装（`C:\Users\TT\AppData\Local\GitHubDesktop`） |
| SSH 密钥 | ❌ 没有（不影响，用 HTTPS 就够了） |
| gh 命令行工具 | ❌ 没装（不影响，用图形界面） |

**这个 `yinlu-decision` 仓库是个坑，别往它上面推。**

它的状态：
- 只追踪了 **14 个文件**
- 最后一次提交 `debab34`「清理过期的整合说明文档」，时间 **2026-08-15 23:09**
- 分支：`main`、`fix/appjs-defensive`、`revert-1-fix/appjs-defensive`

而你本地文件夹里的新版（8 月 15 日 21:52 那份)**根本没合并进去**——你自己说过"最后一次没有合并"。

> **所以结论：新建一个干净的仓库，不要复用 `yinlu-decision`。**
> 理由有三个：
> 1. 直接推会把 14 个文件的旧版覆盖掉，而那个仓库目前**在线上 GitHub Pages 是能打开的**，是你们的保底
> 2. 9 个人一起协作，旧仓库那些 `fix/` `revert-` 试验分支会让人分不清哪个是主线
> 3. 旧仓库留着当"历史归档"，答辩前万一新版出问题，还能切回去演示
>
> **旧仓库原地不动，不要删，不要推，不要合并。**

---

### 第 1 步：在网页上建一个空仓库（3 分钟）

1. 打开 `github.com`，登录
2. 右上角点 **＋** → **New repository**
3. 按这个填：

| 项目 | 填什么 |
|---|---|
| Repository name | `yinlu-decision-v3` |
| 权限 | **Public（公开）** ← 见下方说明 |
| Add a README file | **❌ 不要勾**（空仓库才不会一上来就冲突） |
| Add .gitignore | ❌ 不要勾（我已经给你建好了） |

4. 点 **Create repository**

> **为什么推荐 Public？**
> 我用官方政策核实过：**分支保护（禁止直接改主分支）在免费账号下只有公开仓库才有**，
> 私有仓库要 Pro/Team 才给。
> 而且公开仓库还有个额外好处——Git 提交记录是公开的，
> **正好可以作为"谁干了多少"的客观证据**（你们定署名顺序时用得上）。
> 这个项目没有商业机密，公开没风险。

### 第 2 步：把本地文件夹变成仓库（2 分钟）

1. 打开 **GitHub Desktop**
2. 菜单 **File** → **Add local repository**
3. 点 **Choose…**，选 `C:\Users\TT\Desktop\小挑\引路网站_v3`
4. 它会提示"这不是 Git 仓库" → 点 **create a repository**（蓝色链接）
5. 弹出框里 **Name** 填 `yinlu-decision-v3`，其他不动 → **Create repository**

### 第 3 步：第一次提交（2 分钟）

1. 左下角会列出所有文件
2. **Summary（标题）** 填：`chore: 初始化项目 - 引路网站 v3`
3. 点 **Commit to main**
4. 顶部出现蓝色 **Publish repository** 按钮 → 点它
5. 弹窗里**取消勾选** `Keep this code private`（因为我们要 Public）
6. 点 **Publish repository**

> ✅ 到这里，代码已经在 GitHub 上了。刷新网页能看到 26 个 js 文件。

### 第 4 步：保护主分支（2 分钟，很重要）

不做这步，谁都能直接改主分支，前面白忙。

1. 网页打开你的仓库 → **Settings**（右上角）
2. 左边菜单 **Branches**
3. **Add classic branch rule**（如果看到的是 Rulesets，页面里也有入口）
4. **Branch name pattern** 填 `main`
5. 勾选 ✅ **Require a pull request before merging**
6. **Required approvals** 选 `1`
7. 拉到最下面点 **Create**

> 以后谁想改代码，都必须提 PR、经过 1 个人点头才能合并。

### 第 5 步：邀请 8 个队友（5 分钟）

1. 仓库页面 → **Settings** → **Collaborators**（左边）
2. 点 **Add people**
3. 输入队友的 GitHub 用户名或邮箱 → 发送
4. **通知队友去邮箱点接受邀请**（不接受的话他们推不了代码）

### 第 6 步：确认删干净了垃圾文件

打开 GitHub 网页，看看有没有这些——**有的话说明 .gitignore 没生效**：

- `node_modules/`、`dist/`、`.DS_Store`、`Thumbs.db`

如果有，告诉我，我来处理。

---

## Part 2 · 队友要做的（发给每个人）

把这 5 步直接复制到群里：

```
大家好，仓库建好了，按下面做一遍：

1. 装 GitHub Desktop：desktop.github.com
2. 装 VS Code：code.visualstudio.com
3. 去邮箱点接受 GitHub 的协作邀请（不点这一步后面全卡住）
4. 打开 GitHub Desktop → File → Clone repository
   → 选 yinlu-decision-v3 → Local path 选桌面 → Clone
5. 打开 docs/分组说明/ 里你那一组的文档，只看自己的那份

做完在群里回一句"好了"。
```

---

## Part 3 · 第 2 天：全队练一次（1 小时，别跳过）

**9 个人都不练 Git 就直接开工，第一周必出事故。**

练习内容：每人做一遍完整流程，内容不重要，走通流程就行。

```
1. 打开 GitHub Desktop，确认当前分支是 main
2. 点 Create branch，名字填：feat/你的名字-test
3. 用 VS Code 打开项目，在根目录新建文件 hello-你的名字.txt
   内容随便写一句
4. 回 GitHub Desktop，Summary 填 test: 练习提交
5. 点 Commit to feat/你的名字-test
6. 点 Push origin
7. 点 Create Pull Request（右上角蓝色）
8. 在群里说"我提 PR 了"，让别人去 Approve
9. 你（队长）去 GitHub 网页点 Merge pull request
```

**验收标准：9 个人全部成功合并过至少 1 个 PR。**

---

## Part 4 · 每天干活的顺序（背下来，就 5 步）

```
早上：
1. 打开 GitHub Desktop → 切到 main → 点 Fetch origin / Pull origin
   （把别人昨晚的改动拉下来）

开工：
2. 点 Create branch，名字：feat/你的名字-今天做什么
   例：feat/zhangsan-gaokao-filter

写代码：
3. 只改自己认领的文件！改完跑一次：
   node tools/build-index.js
   然后双击 index.html 检查效果

收工：
4. Commit to feat/xxx → Push origin → Create Pull Request

等：
5. 队长审 PR → 合并 → 第二天大家 Pull
```

**三条铁律**：

- ⛔ 不在 `main` 上直接改
- ⛔ 不改别人认领的文件
- ⛔ 不用 `git add .`（会误加文件）

---

## Part 5 · 分工的开工顺序（重点：不是 9 个人同时开工）

**这是最容易被忽略的事。** 有些人的活依赖别人的产出，乱开工等于白干。

```
第 0 步（你一个人，第 1 天）
  └─ 建仓库 + 邀请队友  ← 这一步卡住，全队都动不了

第 1 步（全体，第 2 天）
  └─ Git 练习，每人合并 1 个 PR

第 2 步（第 3 天起，真正开工）

  G0 项目组（你）
    ├─ 去学院下载那两个文件、联系指导老师
    ├─ 定署名顺序（关系到保研）
    └─ 每周五审 PR、记进度

  ─── 下面这几组可以立刻开工 ───

  G1 前端交互组（2 人）
    └─ 立刻能干：移动端适配、空状态、加载动画
       不依赖任何人

  G3 安全可信组（2 人）
    └─ 立刻能干：安全测试报告（找出 XSS/越权/localStorage 篡改）
       不依赖任何人，且是你们的护城河

  ─── 下面这几组必须先出"需求文档"再动手 ───

  G2 业务逻辑组（2 人）
    └─ 第 1 周先写《院校数据字段需求清单》
       （要哪些字段：学校名、省份、批次、专业、最低分、最低位次…）

  G4 数据与后端组（2 人）
    └─ 等 G2 的字段清单 → 才设计数据库表 → 才录数据
       ⚠️ 如果 G2 没给清单，G4 别先动手造表

  ─── 关键交汇点 ───

  第 2 周末：G2 的字段清单 + G4 的表结构 都对上了
             → G4 开始录福师大的真实数据
             → G2 才能做真正的"位次查询""录取概率"
```

**一句话记住**：

> **G0 开路 → 全员练 Git → G1/G3 立刻干 → G2 先出需求 → G4 按需求造表 → 第 2 周末合流**

---

## Part 6 · 三个必然会犯的错

### 错 1：直接在 main 上改了

**现象**：GitHub Desktop 左上角显示 `Current branch: main`，然后你写了半天。

**怎么办**：别慌。
1. **Fetch origin** 把远程最新的拉下来
2. 对着你改的内容，先在别的记事本里备份一份
3. `Branch` 菜单 → `Discard changes`（会丢改动，所以先备份）
4. 重新 `Create branch`，把备份的代码粘回来

> 预防：每次写代码前，**先看左上角是不是你的分支**。养成习惯。

### 错 2：提 PR 时显示冲突（Conflict）

**现象**：PR 页面红色警告 "This branch has conflicts"。

**怎么办**（GitHub 网页上就能解）：
1. 点 **Resolve conflicts**
2. 找到带标记的地方：
   ```
   <<<<<<< feat/zhangsan-xxx
   你的代码
   =======
   别人的代码
   >>>>>>> main
   ```
3. **删掉 `<<<<<<<`、`=======`、`>>>>>>>` 这三行**，保留正确的代码
4. 点 **Mark as resolved** → **Commit merge**

> 预防：每天开工前 Pull 一次，别攒一周。

### 错 3：改了别人的文件

**现象**：PR 里出现了不属于你的文件。

**怎么办**：直接在 PR 里说明，让队长只合并你自己那部分，或者你撤回重来。

> 预防：Commit 前看一眼左下角文件列表，**只勾自己那几个**。

---

## Part 7 · 你今天的清单

照这个顺序做，做完打勾：

- [ ] 装 GitHub Desktop 并登录
- [ ] 网页新建仓库 `yinlu-decision-v3`（Public，不勾 README）
- [ ] 用 Desktop 把 `引路网站_v3` 变成仓库并 Publish
- [ ] Settings → Branches → 保护 `main`（Require pull request）
- [ ] Settings → Collaborators → 邀请 8 个人
- [ ] 把 Part 2 的 5 步发到群里
- [ ] 在 GitHub 网页上确认没有 `node_modules`、`dist` 等垃圾文件

**明天**：带全队做 Part 3 的 Git 练习。

---

## 还有问题？

- Git 操作细节 → `docs/01_GitHub分支协作实操手册.md`
- 分工认领 → `docs/02_9人分工与文件认领表.md`
- 改完代码怎么提 → `docs/06_改代码到提交GitHub完整流程.md`
- G0 建仓库的完整图文 → `docs/09_GitHub初始化详细教程_Windows用户.md`
- 每组的活 → `docs/分组说明/`（发给队友的就是这些）

---

## 附：AI 助手能不能替你操作 GitHub？

**直接答：不能登录，但可以代劳——前提是你要给它一把"钥匙"。**

### 为什么不能自动登录

我读得到你电脑上的 Git 配置（所以查到了用户名 `tt11240112`），
但**没有你的密码，也没有访问令牌**。GitHub 不会因为"AI 想帮忙"就放行——这是好事，不然任何人都能操作你的仓库。

### 想让我帮你操作，给你一把钥匙（5 分钟）

这把钥匙叫 **Personal Access Token（个人访问令牌）**，本质是一串字符密码，好处是**随时能吊销**、**权限能精确控制**。

**怎么拿：**

1. GitHub 网页 → 右上角头像 → **Settings**
2. 左侧最下面 **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token (classic)**
4. 名字填 `claude-assist`，过期选 **30 days**
5. 勾选这些权限（**不要全选**）：

   | 勾这个 | 用途 |
   |---|---|
   | ✅ `repo` | 读写仓库、推送代码 |
   | ✅ `workflow` | 管理 GitHub Actions（以后做自动部署） |
   | ✅ `read:org` | 看团队成员 |
   | ❌ 其余全部 **不要勾** | 尤其 `delete_repo`、`admin:*` |

6. 点 **Generate token**
7. **立刻复制那一串 `ghp_xxxx...`**（关掉网页就再也看不到了）

**然后把它存到环境变量里**（一次性，以后每次都能用）：

```powershell
setx GITHUB_TOKEN "ghp_你的那串token"
```

关掉重开终端后，我就能直接执行这些操作：

```bash
git push                          # 推代码
gh repo create yinlu-decision-v3  # 建仓库
gh pr list                        # 看队友提的 PR
gh api ...                        # 设置分支保护、拉贡献统计
```

### 三条安全提醒

1. **Token 等同于密码**，别贴聊天记录、别发群里、别提交到代码里
2. **用完就吊销**：Settings → Developer settings → Delete
3. **最小权限**：上面表格里勾的三个够用了，多勾一个都不必要

### 如果你不想给 token

完全没问题。**GitHub Desktop 的图形界面本来就比命令行省事**，
上面 Part 1~Part 6 的全部操作都是点点鼠标能完成的，不需要我介入。
我只是帮你把每一步写清楚、把坑标出来——这个价值其实更大。
