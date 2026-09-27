# 17 · GitHub 从零到队友能改 · 图解教程

> **这份是 Day 1（9 月 28 日）晚上你要照着做的操作手册。**
> 目标只有一个：**让 9 个人都能在 GitHub 上改代码，不再往群里发文件让你手动合并。**
>
> 全程预计 60–90 分钟，**必须全员在场**（线上会议也行，各自开着自己的电脑）。
> 建议：[腾讯会议] 开屏幕共享，大家跟着你一步一步来。

---

## 零、先搞懂四件事（看比喻就行，不用背概念）

### 仓库 = 一个共享的项目文件夹

```
以前：队友改完 → 微信发给你 → 你手动粘到自己的文件夹 → 容易漏、容易冲突
以后：大家改的都放同一个网上文件夹（仓库）→ 谁改了什么一目了然
```

### 分支 = 同一份文件的平行草稿

```
main（主干）= 已经对外承诺的版本，比如"能演示的版本"
分支         = 你自己抄一份出去改，改坏了不影响主干
```

打个比方：**主干是正式发的课本，分支是你在草稿纸上改。改好了，才申请把草稿合进课本。**

### PR（Pull Request）= "请把我的草稿合进去"的申请

```
你改完 → 发一个 PR → 队长/搭档看到 → 检查 → 点 Merge（合并）→ 改动进主干
```

**这一步是关键。** 有了 PR，就不再是"9 个人发 9 份文件给你手动粘贴"了。

### CODEOWNERS = 每个文件的"户主"登记

```
js/13-feature-filters.js  → 户主是 P4
别人改了 P4 的文件        → GitHub 自动通知 P4 来审
P4 不点头                 → 这个 PR 合不进去
```

这就是防止"别人乱改你的东西"的机制，也是防止"你一个人闷头合并"的机制。

---

## 一、Day 1 晚上流程总览

```
Step 0  备份整个文件夹                        5 分钟  ⚠️ 别跳
Step 1  GitHub Desktop 找到仓库，确认是 v3     2 分钟
Step 2  Publish branch（把 v3 推到网上）       5 分钟  🔴 可能失败，见常见问题
Step 3  网页核对：2 个分支 / 26 js / 15 css    3 分钟
Step 4  把默认分支改成 v3                      2 分钟  🔴 忘做这一步队友会拉到旧版
Step 5  给 v3 加保护规则                       5 分钟  🔴 必勾 Code Owners
Step 6  给 main 加保护规则（冻住）             3 分钟
Step 7  邀请 8 位队友进仓库                    10 分钟
Step 8  收 GitHub 用户名，填 CODEOWNERS        10 分钟
Step 9  教队友 clone 仓库（或直接网页改）       20 分钟
Step 10 验收：每人改一个小文件提 PR            20 分钟  🔴 这一步不做等于白来
```

> **Step 10 绝对不能省。** 只有亲眼看着每个人走完一次完整流程，
> 你才能确定国庆假期里他们真的能自己提交。否则 10 月 1 日之后你会被
> "我不会用 GitHub"的消息淹没。

---

## Step 0 · 备份（5 分钟，别跳）

这是唯一一步出错会有真实损失的。

1. 打开 `C:\Users\TT\Documents\GitHub\`
2. 右键 `yinlu-decision` 文件夹 → **复制**
3. 在同一空白处右键 → **粘贴**
4. 会得到一个 `yinlu-decision - 副本`，改名成：
   ```
   yinlu-decision_备份_20260928
   ```

**确认**：打开这个副本，里面应该能看到 `js`、`css`、`index.html` 等文件夹。

> 这一步做完后，就算后面全搞砸了，把副本复制回来就能恢复。
> 放心大胆往下做了。

---

## Step 1 · 打开 GitHub Desktop，确认分支

1. 双击桌面 **GitHub Desktop** 图标
2. 左上角看它显示的仓库名是不是 **`yinlu-decision`**
   - 不是的话：菜单栏 `File` → `Add local repository` →
     `Choose...` → 选 `C:\Users\TT\Documents\GitHub\yinlu-decision`
3. 看顶部中间的分支按钮（像个分叉符号），应该显示 **`v3`**

   ```
   如果显示 main —— 点它，在下拉里选 v3
   ```

4. 看左侧有没有未提交的改动。正常应该显示 **No local changes**（干净）

> ⚠️ **必须是 v3。** main 是 8 月 15 日的旧版（只有 14 个文件），
> 推那个上去等于把过去十天的工作全废了。

---

## Step 2 · Publish branch（把 v3 推到网上）

这是"把本地的 v3 分支上传到 GitHub"的动作。

1. 看 GitHub Desktop 顶部/中间，应该有一个蓝色按钮写着 **`Publish branch`**
   （如果写的是 `Push origin`，说明已经推过了，跳过本步骤）
2. **点它**
3. 等进度条走完，按钮会变成 `Fetch origin`

### 去网页确认真推上去了

1. 浏览器打开：`https://github.com/tt11240112/yinlu-decision`
2. 点页面上方的 **`branches`**（分支标签，在 `Code` 右边一点）
   - 或者直接在地址栏加后缀：`https://github.com/tt11240112/yinlu-decision/branches`
3. 应该能看到 **两个**分支：`main` 和 `v3`
4. 点 **`v3`** 进去，看文件列表
   - 应该看到 `js/` `css/` `template/` `tools/` `docs/` 等文件夹
   - 点开 `js/`，应该看到 **26 个** `.js` 文件
   - 点开 `css/`，应该看到 **15 个** `.css` 文件

```
✅ 看到 26 个 js + 15 个 css → 推送成功
❌ 只看到 pixel-sign-dog.svg / app.js / index.html 等几个文件 → 推的是 main，回去检查 Step 1
```

---

## Step 4 · 把默认分支改成 v3（🔴 最关键的一步）

**为什么要做**：队友 clone 仓库时，拿到的默认就是"默认分支"。
默认是 `main` 的话，9 个人 clone 下来全是 8 月的旧版，然后一脸懵地问你"代码呢"。

**怎么做**：

1. 在仓库网页点右上角 **`Settings`**（设置）
   - 找不到？地址栏直接敲：`https://github.com/tt11240112/yinlu-decision/settings`
2. 左侧菜单点 **`Branches`**（在 General 下面）
3. 看到 `Default branch` 这一栏，右边显示 `main`，后面有个 **双向箭头图标**
4. **点那个双向箭头**
5. 下拉里选 **`v3`**
6. 点 **`Update`**
7. 会弹一个红字警告框，问确不确定 → 点 **`I understand, update the default branch`**

```
验证：回到仓库首页（点左上角的仓库名）
     左上角分支按钮应该已经显示 v3
     文件列表里应该有 js/ 文件夹
```

---

## Step 5 · 给 v3 加保护规则（🔴 必勾一项）

**为什么要做**：防止任何人（包括你）直接往 v3 上推代码，强制走 PR 流程。

1. 仍在 `Settings` → `Branches` 页面
2. 右侧 `Branch protection rules` 区域，点 **`Add branch rule`**
   （老版界面叫 `Add rule`）
3. **Branch name pattern** 填：`v3`
4. 勾选以下几项：

| 勾什么 | 作用 | 必须？ |
|---|---|---|
| ✅ **`Require a pull request before merging`** | 禁止直接推，必须走 PR | 🔴 必勾 |
| 　　↳ 子项 **`Require approvals`** | 需要几个人审核，填 `1` | 🔴 勾上，填 1 |
| 　　↳ 子项 **`Require review from Code Owners`** | **让 CODEOWNERS 生效** | 🔴🔴 **必勾，最容易漏** |
| ✅ **`Restrict who can push to matching branches`** | 限制能直推的人 | 🟡 可选（勾了只留你自己） |

> ⚠️⚠️ **`Require review from Code Owners` 这一项绝对不能漏！**
> 漏了它，`.github/CODEOWNERS` 文件就只是一堆普通文字，完全不起作用，
> 整套"防止队长一个人合并"的机制就白做了。

5. 🚫 **千万不要勾** `Require status checks to pass before merging`
   - 我们**没有配 CI（自动测试）**
   - 勾了之后所有 PR 都会卡在一个永远过不了的检查上，**全队都合不了代码**

6. 拉到最下面点 **`Create`**（或 `Save changes`）

---

## Step 6 · 顺便把 main 冻住（3 分钟）

main 是 8 月 15 日的保底版本，留着它就是为了出事能回滚。**别让人误改它。**

1. 同样 `Settings` → `Branches` → `Add branch rule`
2. **Branch name pattern** 填：`main`
3. 勾 `Require a pull request before merging`
4. 勾 `Restrict who can push to matching branches`，只把你（`tt11240112`）加进去
5. 点 `Create`

> 以后万一有人在 v3 上把网站改崩了，切回 main 就是完全没坏过的版本。

---

## Step 7 · 邀请 8 位队友进仓库

> 你说已经把他们都拉进来了 —— 这步很可能已经做完了。
> 快速确认一下：如果他们在自己的 GitHub 里能看到这个仓库，跳过本步骤。

**确认方法**：
```
Settings → Collaborators and teams
看下面有没有他们的头像/用户名
```

**如果还没有**：
1. `Settings` → **`Collaborators`** → 右侧绿色按钮 **`Add people`**
2. 输入队友的** GitHub 用户名或注册邮箱**，搜出来后点他
3. 角色（Role）选 **`Write`**（能改代码）
   - ❌ 不要选 `Admin`，会给你带来麻烦（他们能删仓库）
   - ⚠️ 不要选 `Read`，那样他们只能看不能改
4. 点 `Add xxx to this repository`
5. **队友会收到邮件或站内通知，必须点邮件里的链接接受邀请**
   —— 不接受的话等于没邀请

> 💡 **这一步的坑**：很多人邀请了但队友没去点邮件接受。
> **让他们在你面前当场接受**，你在页面上刷新确认他们的状态变成 Collaborator。

---

## Step 8 · 收用户名，填 CODEOWNERS

### 先收齐 8 个人的 GitHub 用户名

> GitHub 用户名 ≠ 昵称 ≠ 邮箱。是登录后在个人主页 URL 里那一串。
>
> 例如 `https://github.com/zhangsan123` → 用户名就是 `zhangsan123`
>
> **让他们自己进 github.com 看右上角头像旁边写的名字发给你，最准。**

### 然后填 CODEOWNERS

1. 用 VS Code（或记事本）打开：
   ```
   C:\Users\TT\Documents\GitHub\yinlu-decision\.github\CODEOWNERS
   ```
2. 按 **Ctrl + H** 打开替换，逐个替换：

| 占位符 | 换成谁的名字 | 替换成什么（示例） |
|---|---|---|
| `<USER_G1A>` | P2 前端 A | `@zhangsan123` |
| `<USER_G1B>` | P3 前端 B | `@lisi456` |
| `<USER_G2A>` | P4 业务 A | `@wangwu789` |
| `<USER_G2B>` | P5 业务 B | `@zhaoliu000` |
| `<USER_G3A>` | P6 安全 A（**必须网安**） | `@sunqi111` |
| `<USER_G3B>` | P7 安全 B（**必须网安**） | `@zhouba222` |
| `<USER_G4A>` | P8 数据 A | `@wujiu333` |
| `<USER_G4B>` | P9 数据 B | `@zhengshi444` |

> ⚠️ **重点提醒**：用户名后面**一定要带 `@` 符号**。
> 写成 `zhangsan123` 是不生效的，必须是 `@zhangsan123`。

3. 全部替换完后，**搜索 `<USER_` 确认一个都不剩**（应该搜不到）
4. 保存文件

### 提交这个改动

回到 GitHub Desktop：
1. 左下角 `Summary`（摘要）填：
   ```
   chore: 填入全队 CODEOWNERS 用户名
   ```
2. 点 **`Commit to v3`**
3. 右上角点 **`Push origin`**

> 你可能会发现被保护规则拦住（因为 v3 禁止直推）。
> 如果 Push 失败，说明保护规则生效了 —— 这是**好消息**。
> 这时自己给自己提个 PR：新建一个分支推上去再合并。具体见 Step 10 的流程。

---

## Step 9 · 教队友拿到代码（两条路线）

### 路线 A：GitHub Desktop（推荐，能用就让他用这个）

**队友要做的事**：

1. 装 GitHub Desktop：去 `desktop.github.com` 下载，一路下一步
2. 用他自己的 GitHub 账号登录
3. `File` → **`Clone repository`**
4. 选 **`GitHub.com`** 标签页
5. 应该能看到 `tt11240112/yinlu-decision`（**前提是 Step 7 他接受了邀请**）
   - 看不到 → 让他先去邮箱点邀请链接，或点击你发的邀请 URL
6. `Local path` 选个地方存，建议桌面
7. 点 **`Clone`**

```
✅ 成功标志：本地文件夹里能看到 js/ 文件夹，点进去有 26 个文件
❌ 只看到 app.js / index.html 等几个 → 说明 Step 4 默认分支没改成 v3
   → 让他在 Desktop 顶部把分支从 main 切到 v3
```

### 路线 B：网页直接改（不会装软件就用这个，国庆也能用）

**这是给完全零基础队友的兜底方案**，优点是：不用装任何东西，有网就能改。

1. 打开 `https://github.com/tt11240112/yinlu-decision`
2. **确认左上角分支显示的是 `v3`**（不是就点它切换）
3. 一路点进去找到要改的文件，比如 `js/13-feature-filters.js`
4. 点文件右上角的 **铅笔图标**（Edit this file）
5. 直接改文件内容
6. 拉到页面最下面，会看到 `Commit changes` 区域：
   - 第一行填改动说明，比如 `feat(filters): 增加按位次筛选`
   - **选第二个选项：`Create a new branch for this commit and start a pull request`**
     （🔴 因为 v3 被保护了，不能直接提交）
   - 分支名会自动填好，比如 `username-patch-1`，**保持默认就行**
7. 点绿色的 **`Propose changes`**
8. 下一页点 **`Create pull request`**
9. 完成！你会收到通知去审核

```
✅ 这条路线的好处：
   - 不用装软件
   - 不用记命令
   - 国庆回家只有手机也能改（虽然手机上改代码体验很差，但应急够用）

⚠️ 缺点：
   - 看不到页面效果，容易写错
   - 适合改文档 / 小段文字，不建议改大段代码
```

> 💡 **给队长的话**：9 个人里大概会有 2–3 个人装不明白 Desktop。
> **别在装软件上耗时间** —— 直接让他走路线 B，先把活干起来。
> 等过了 10 月 3 日再慢慢教 Desktop。

---

## Step 10 · 验收：每人走一遍完整流程（🔴 不能省）

**这一步的目的是提前暴露问题。** 国庆期间再来排查就晚了。

### 验收任务（让每人做一遍）

> "各位，现在做一件小事当练习：
> 新建一个文件 `docs/练手/你的名字.txt`，里面随便写一句话，
> 然后按刚才的步骤提交上来。"

**具体路径（路线 A Desktop 版）**：

```
1. 打开 Desktop，确认当前分支是 v3
2. 点顶部菜单 Branch → New branch
   分支名填：feat/你的名字-练手     例如：feat/zhangsan-lianxi
3. 在资源管理器里打开本地仓库文件夹
4. 进 docs/，新建文件夹 练手/
5. 在里面新建文本文档，改名成 你的名字.txt
6. 写一句话进去，比如"张三第一次提交成功"
7. 回到 Desktop，左下角 Summary 填：docs: 张三练手
8. 点 Commit to 你的分支名
9. 点 Publish branch
10. 打开 GitHub 网页，会看到黄色提示条 "Compare & pull request"
    → 点击它
11. 标题填：docs: 张三练手
12. 正文打勾 self-check（如果模板自动填出来了）
13. 点 Create pull request
```

### 你在另一台设备上会看到什么

1. 仓库 `Pull requests` 标签页出现一个新的 PR
2. 点进去 → `Files changed` 能看到改了哪个文件
3. 右边 `Reviewers` 那里，**GitHub 已经自动按 CODEOWNERS 配好了审核人**
4. 审核通过 → 点 `Merge pull request` → `Confirm merge` → `Delete branch`

```
🎯 验收通过的标准（写下来逐个确认）：
□ P2 的 PR 合并了 —— 且自动指定了 P3 当审核人
□ P3 的 PR 合并了 —— 且自动指定了 P2 当审核人
□ P4 的 PR 合并了
□ P5 的 PR 合并了
□ P6 的 PR 合并了
□ P7 的 PR 合并了
□ P8 的 PR 合并了
□ P9 的 PR 合并了

这 8 个勾打完，国庆就可以放他们回去自己干了。
```

> **注意**：你是 P1，你自己的练手 PR 删掉就行（你是兜底审核人，没人能审你）。

### 练手做完后要清理

让每人删掉自己的练手文件（或者你统一删），避免垃圾文件混进 repo：
```bash
git rm -r docs/练手
```

---

## 常见问题速查

### Q1：Publish branch 失败了（连不上 GitHub）

**先试这四个**：
1. 再点一次（临时抽风很常见）
2. 关掉 Desktop 重开
3. 手机开热点给电脑连，再试
4. 换个时间（晚上 9–11 点是高峰期，早上 8 点前通常很顺）

**如果都失败**：
- 🔴 **不要卡在这里**。Step 4–8 全是**网页端操作**，不需要先推送。
  打开 github.com 照样能改默认分支、加保护规则、邀请队友。
- 推送可以在 Day 2 / Day 3 用早上的时间再试。
- **但是 Step 9 和 Step 10 依赖推送**——这两步推迟，别勉强。

### Q2：队友说 clone 下来是旧版（只有 14 个文件）

**原因**：Step 4 没做，默认分支还是 `main`。
**解决**：队友在 Desktop 顶部把分支切成 `v3` 即可，然后你补做 Step 4。

### Q3：Push 被拒绝了

```
remote: error: GH006: Protected branch update failed
```

**解决方法**：这是保护规则生效了，**说明你配对了**。
按 Step 10 的流程自己给自己提 PR，然后自己合并。

### Q4：CODEOWNERS 没自动指定审核人

挨个查：
- [ ] 用户名前有没有加 `@`？
- [ ] 用户名拼错了？（就是 GitHub 个人主页 URL 里那串）
- [ ] **Step 5 有没有勾 `Require review from Code Owners`？**（最常见原因）
- [ ] 这个人有没有**接受邀请**成为 Collaborator？（只看热闹的不算）

### Q5：队友说他看到了 Branch protection，但找不到 Add branch rule

新版 GitHub 界面把这个入口改到了 `Settings` → `Rules` → `Rulesets`。
功能一样，在里面新建 Ruleset，Target 选 `v3`，勾一样的选项。

### Q6：国庆在家想改代码但没有电脑怎么办

走**路线 B**（网页直接改）。手机浏览器访问 github.com，
点铅笔图标就能改。**改文档、填表这类文字活完全够用。**

---

## Day 1 结束的检查清单

```
□ 备份做了
□ v3 推送成功（网页上能看到 26 个 js + 15 个 css）
□ 默认分支改成了 v3
□ v3 保护规则加了，且勾了 Require review from Code Owners
□ main 保护规则加了
□ 8 位队友全部显示为 Collaborator（已接受邀请）
□ CODEOWNERS 的 8 个占位符全部替换，搜不到 <USER_
□ 至少 6 人完成了练手 PR 并被合并
□ 每人知道自己的编号（P2–P9）和认领的文件
□ 每人都拿到了自己的任务书（docs/任务书/ 里那份）
```

> **全部打完勾，国庆就可以安心放他们回去了。**
> 有任何一个没打勾，Day 2 早上立刻补，别拖。
