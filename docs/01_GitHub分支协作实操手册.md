# GitHub 分支协作实操手册

> 目标：把你们现在的「群里发代码 → 一个人用 AI 合并」改成
> **「每人一个分支 → 提 PR → 组长合并」**，9 个人同时改代码不打架。
>
> 本手册用 **GitHub Desktop（图形界面）** 为主，不用背命令行。
> 命令行版本放在最后一章，想学的可以学。

---

## 第 0 章：先搞懂四个词

用**写小组作业**来类比：

| 词 | 是什么 | 类比 |
|---|---|---|
| **仓库 Repository** | 存放项目所有文件的云端文件夹 | 共享的腾讯文档 |
| **分支 Branch** | 从主线复制出来的一份独立草稿 | 你复制一份文档自己改，改的过程不影响别人 |
| **提交 Commit** | 保存一个版本快照（附一句说明） | 文档的历史版本记录 |
| **PR（Pull Request）** | 请求把你的分支合并回主线 | "组长，我改好了，你看下能不能合并进去" |

**核心流程就一句话**：
> 每个人在**自己的分支**上改 → 改完**提交** → **提 PR** → 组长**审核合并**。

**为什么这样就不打架**：
因为每个人都只在自己的分支上改，而且**只改自己认领的文件**（见分工表），
两个人几乎不可能同时改同一个文件——冲突概率接近 0。

---

## 第 1 章：环境准备（每人做一次，约 15 分钟）

### 1.1 装三个东西

1. **Git**（必须）
   - 打开 https://git-scm.com/download/win 下载，一路 Next 装完
2. **GitHub Desktop**（强烈推荐，图形界面）
   - 打开 https://desktop.github.com/ 下载安装
   - 装完用 GitHub 账号登录
3. **VS Code**（写代码用）
   - https://code.visualstudio.com/ 下载安装

### 1.2 检查是否装好

打开**命令提示符**（Win+R 输入 `cmd` 回车），输入：

```bash
git --version
```

看到 `git version 2.x.x` 就成功了。如果提示"不是内部或外部命令"，重启电脑再试。

---

## 第 2 章：组长做一次（建仓库、传代码）

> 这章只有组长（G0）需要做，其他成员跳过到第 3 章。

### 2.1 在 GitHub 上创建仓库

1. 登录 https://github.com ，右上角 `+` → `New repository`
2. 填写：
   - **Repository name**：`yinlu`（或者你们想好的名字）
   - **Description**：`引路 · 教育决策可信信息平台`
   - 选 **Public**（公开，这样 GitHub Pages 才能免费用）
   - ✅ 勾上 `Add a README file`
   - **Add .gitignore**：选 `Node`
3. 点 `Create repository`

### 2.2 把本地代码传上去

打开 GitHub Desktop：

1. 菜单 `File` → `Add Local Repository`
2. 选择文件夹：`C:\Users\TT\Desktop\小挑\引路网站_v3`
3. 如果提示"不是一个 git 仓库"，点 `Create a repository`，直接确认
4. 左侧会列出所有改动，底部填：
   - **Summary**：`初始化：拆分后的 v3 版本`
5. 点蓝色按钮 **Commit to main**
6. 点顶部 **Publish repository**
   - Name 填 `yinlu`，取消勾选 `Keep this code private`
   - 点 `Publish Repository`

等几秒，去 GitHub 网页刷新，代码就上去了。

### 2.3 邀请其他 8 个人

1. 仓库页面 → `Settings` → `Collaborators`（左侧栏）→ `Add people`
2. 输入队友的 GitHub 用户名或注册邮箱，发送邀请
3. **队友必须去邮箱点"接受邀请"**，否则没有 push 权限

> ⚠️ 如果队友收不到邀请邮件，检查垃圾邮箱。

### 2.4 保护主分支（重要，防止有人直接乱改）

1. 仓库页面 → `Settings` → `Branches`
2. 点 `Add branch ruleset`（或 `Add rule`）
3. **Branch name pattern** 填 `main`
4. 勾选：
   - ✅ `Require a pull request before merging`
   - ✅ `Require approvals`（审批人数选 1）
5. 保存

**效果**：以后谁都不能直接往 main 上推代码，必须走 PR——这就是我们要的秩序。

---

## 第 3 章：每个成员做一次（把代码拉到自己电脑）

1. 打开 GitHub Desktop，登录你的账号
2. `File` → `Clone Repository`
3. 选 `GitHub.com` 标签，找到 `yinlu`，点 `Clone`
4. **本地路径**选一个好记的地方，比如 `D:\yinlu`（不要放在桌面同步盘里）
5. 点 `Clone`

完成后，你的电脑上就有完整代码了。

**用 VS Code 打开这个文件夹**，以后就在这里改代码。

---

## 第 4 章：每天的工作流程（背下来，每天照做）

### 开工前（必做 2 步）

**第 1 步：切到主分支，拉取最新代码**

GitHub Desktop 顶部：
```
Current branch: main        ← 如果不是 main，点一下切换到 main
```

然后点 **Fetch origin**（或 `Repository` → `Pull`）。
看到 "Last fetched just now" 就 OK。

> ⚠️ **不拉最新就直接改，100% 会冲突。** 这是新手最常犯的错。

**第 2 步：新建今天的分支**

点 `Current branch` → `New Branch`，命名格式：

```
feat/你的名字-做什么
```

示例：
```
feat/zhangsan-gaokao-filter     （张三做高考筛选）
fix/lisi-login-bug              （李四修登录 bug）
docs/wangwu-report              （王五写文档）
```

点 `Create Branch`。

### 干活中

在 VS Code 里改你负责的文件。

> 🔴 **铁律：只改自己认领的文件。**
> 要改别人的文件，先在群里说一声，让别人改，或者等他改完。

### 改完提交（可以多次）

1. 回到 GitHub Desktop，左侧列出你改过的文件
2. **只勾选你真的要提交的文件**（别全选，容易把临时文件带进去）
3. 左下角 **Summary** 填一句人话，说明这次改了啥：

   好的写法：
   ```
   新增高考位次查询输入框
   修复登录弹窗在手机上看不见的问题
   ```

   坏的写法：
   ```
   改了点东西
   update
   aaa
   ```

4. 点 **Commit to feat/xxx**

> 小建议：**每完成一个小功能就 commit 一次**，不要攒一天最后一次性提交。
> 这样出问题能精确回退。

### 收工前（推送 + 提 PR）

1. 点顶部 **Push origin**，把分支传到云端
2. 点 **Create Pull Request**（GitHub Desktop 会弹出按钮）
3. 浏览器自动打开 GitHub 的 PR 页面，填写：
   - **标题**：和你的 commit 说明一致
   - **描述**（正文），照抄这个模板：

```markdown
## 我改了什么
- 新增了院校位次查询功能
- 修改了 js/13-feature-filters.js

## 怎么验证
打开首页 → 高考板块 → 能看到位次输入框 → 输入 12000 能出结果

## 我自己检查过
- [x] 本地打开没有报错（F12 控制台是干净的）
- [x] 没有改别人的文件
```

4. 点 **Create Pull Request**

然后在群里发一句：「PR 提了，编号 #12，组长看下」。

---

## 第 5 章：组长怎么合并 PR

1. 打开仓库页面 → `Pull requests`
2. 点进某个 PR
3. 点 `Files changed`，看改动了哪些文件
4. 检查三件事：
   - ✅ 只改了他自己认领的文件？
   - ✅ 代码里没有 `console.log` 调试残留、没有密码/密钥？
   - ✅ 描述里的"怎么验证"写得清楚？
5. 没问题就点 `Review changes` → `Approve` → `Merge pull request` → `Confirm merge`
6. 合并完在群里说一声：「#12 已合并，大家 pull 一下」

> ⚠️ 组长**不要**自己改代码然后直接 push 到 main。
> 组长也要走 PR，让另一个人审核（或者至少自己 review 一遍）。

---

## 第 6 章：冲突了怎么办（必看）

### 为什么我们几乎不会冲突

因为**每人只改自己认领的文件**。两个人改同一个文件才会冲突。

会冲突的例外情况：
- 几个人都要改 `index.html`（已改成自动生成，别手改）
- 有人改了不属于自己的文件

### 出现冲突时的现象

GitHub 的 PR 页面显示：

```
⚠️ This branch has conflicts that must be resolved
```

### 用 GitHub Desktop 解决

1. 切回 `main`，点 `Fetch origin` → `Pull`
2. 切回你的分支
3. 菜单 `Branch` → `Update from main`（把 main 的最新代码合并到你的分支）
4. 如果有冲突，会弹出提示，点 **Open in VS Code**
5. VS Code 里会看到这样的标记：

```javascript
<<<<<<< HEAD
你写的代码
=======
别人写的代码
>>>>>>> main
```

6. **和对方沟通**，决定保留哪段（或者两段都要），然后**删掉** `<<<<<<<`、`=======`、`>>>>>>>` 这三个标记行
7. 保存，回到 GitHub Desktop，填 `解决冲突` 提交
8. 再点 `Push origin`，PR 就自动更新了

> 💡 **如果看不懂冲突内容**：别硬来，在群里 @ 对方，两个人一起看 5 分钟就懂了。
> 千万不要直接点 GitHub 上的 "Resolve conflict" 随便选一边，会丢代码。

---

## 第 7 章：九个绝对不能犯的错

| # | 错误 | 后果 | 正确做法 |
|---|---|---|---|
| 1 | 不 pull 就改代码 | 冲突、覆盖队友代码 | 每次开工先 `Fetch origin` |
| 2 | 在 `main` 分支上直接改 | 主分支被污染 | 一定先 `New Branch` |
| 3 | 改别人认领的文件 | 冲突、互相覆盖 | 只改自己的，需要改动就群里说 |
| 4 | 手动编辑 `index.html` | 下次跑脚本被覆盖 | `index.html` 是自动生成的 |
| 5 | commit 时"全选" | 把 `node_modules` 等垃圾传上去 | 只勾自己改的文件 |
| 6 | 把密码/密钥写进代码 | 泄露 | 用配置文件，且加进 `.gitignore` |
| 7 | 一天只 commit 一次 | 出问题无法回退 | 完成一个小功能就 commit |
| 8 | 提交说明写"改了点东西" | 没人看得懂 | 写清楚改了什么 |
| 9 | 长期不开分支，攒一周 | 冲突爆炸 | 每天一个分支，每天提 PR |

---

## 第 8 章：命令行速查表（想学的看这里）

不想用图形界面的，这些是等价命令：

```bash
# 第一次：把代码拉到本地
git clone https://github.com/你的用户名/yinlu.git
cd yinlu

# 每天开工
git checkout main          # 切到主分支
git pull                   # 拉最新代码
git checkout -b feat/zhangsan-xxx   # 新建分支

# 改完代码后
git status                 # 看看改了哪些文件
git add js/13-feature-filters.js    # 只加自己改的文件
git commit -m "新增高考位次查询输入框"

# 推送 + 提 PR
git push -u origin feat/zhangsan-xxx
# 然后去 GitHub 网页手动点 Create Pull Request

# 同步主分支到自己的分支（解决冲突用）
git checkout main
git pull
git checkout feat/zhangsan-xxx
git merge main             # 有冲突就打开 VS Code 处理

# 出错了想重来
git checkout .              # 丢弃所有未提交的改动（慎用！）
git reset --hard HEAD       # 回退到上一次提交（慎用！）
```

---

## 第 9 章：开启 GitHub Pages（让网站有公开网址）

代码推上去之后：

1. 仓库页面 → `Settings` → `Pages`（左侧栏）
2. **Source** 下拉选择 **`GitHub Actions`**

   > ⚠️ 不是 "Deploy from a branch"！选错就白等。

3. 需要一份自动部署配置。在仓库里新建文件
   `.github/workflows/deploy.yml`，内容如下（**因为我们的代码是纯静态的，不需要打包**）：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - id: deployment
        uses: actions/deploy-pages@v4
```

4. 提交这个文件，等 1-2 分钟，访问：
   `https://你的用户名.github.io/yinlu/`

**以后每次合并 PR，网站自动更新。**

---

## 第 10 章：第一周练习（全组必做，1 小时）

别跳过这步。9 个人不练 Git 就直接开工，第一周必出事故。

### 练习任务

每个人按顺序做完：

1. clone 仓库到本地 ✅
2. 新建分支 `feat/你的名字-test` ✅
3. 在 `docs/` 下新建文件 `test-你的名字.md`，随便写三行字 ✅
4. commit，说明写 `练习：新增个人测试文件` ✅
5. push，提 PR ✅
6. 组长合并这个 PR ✅
7. 所有人 pull，确认能看到 9 个测试文件 ✅

### 验收标准

- GitHub 仓库的 `docs/` 下有 9 个 `test-*.md` 文件
- 仓库的 `Insights` → `Network` 能看到多条分支线（说明大家都在用分支）

做完这个练习，Git 就入门了。之后再遇到 90% 的问题都能自己解决。

---

## 附录：出问题了怎么自救

| 症状 | 原因 | 解决 |
|---|---|---|
| `Permission denied` | 没接受协作邀请 | 去邮箱点邀请链接 |
| `Failed to push` | 本地不是最新 | 先 `Fetch origin`，再 push |
| 找不到 `Create Pull Request` 按钮 | 还没 push | 先点 `Push origin` |
| 网站 404 | Pages 没开或选错源 | Settings → Pages → 选 GitHub Actions |
| 改了代码但网站没变 | 浏览器缓存 | Ctrl+F5 强制刷新 |
| 网页样式全乱了 | CSS 加载失败 | 检查 `index.html` 是否由脚本生成 |
| 控制台报 `xxx is not defined` | 加载顺序错了 | 检查是否有人改了 `index.html` 的 script 顺序 |
