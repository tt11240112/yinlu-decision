# GitHub 初始化完全教程（Windows 用户专用）

> 目标：把本地项目上传到 GitHub，配置分支保护和团队权限  
> 时间：15 分钟  
> 难度：新手友好

---

## 第一步：创建 GitHub 仓库（5 分钟）

### 1.1 登录 GitHub

1. 打开 https://github.com
2. 如果没账号，点 **Sign up**（邮箱注册）
3. 如果有账号，点 **Sign in** 登录

### 1.2 创建新仓库

1. 点右上角头像 → **Your repositories**（你的仓库）
2. 点绿色 **New** 按钮
3. 填写信息：

| 字段 | 填什么 | 注意 |
|------|--------|------|
| Repository name | `yinlu-decision` | 和本地文件夹名一致 |
| Description | 引路 - 可信的教育决策信息平台 | 可选，用来描述项目 |
| Public / Private | **Private**（私有） | 不要选 Public，避免代码泄露 |
| Initialize with README | ❌ 不勾 | 我们已经有 README.md 了 |
| .gitignore | 不选 | 我们已经有 .gitignore 了 |
| License | 不选 | 暂时不需要 |

4. 点 **Create repository**

✅ 完成！你会看到一个空仓库的页面，上面有一堆命令。**先别急着复制，继续往下看。**

---

## 第二步：本地 Git 初始化（3 分钟）

打开 **PowerShell**（Windows 用户）或 **Git Bash**：

### 2.1 进入项目目录

```powershell
cd "C:\Users\TT\Desktop\小挑\引路网站_v3"
```

### 2.2 初始化 Git 仓库

```bash
git init
git config user.name "你的名字"
git config user.email "你的邮箱@qq.com"
```

> ⚠️ **邮箱必须和你注册 GitHub 的邮箱一致**，否则 GitHub 上看不到你的头像

检查一下配置成功没：

```bash
git config --list | grep user
```

看到 `user.name=...` 和 `user.email=...` 就对了。

### 2.3 创建分支

```bash
# 重命名主分支为 main
git branch -M main
```

### 2.4 第一次提交

```bash
# 把所有文件加入
git add .

# 提交
git commit -m "初始化项目结构"
```

✅ 完成！本地 Git 准备好了。

---

## 第三步：连接 GitHub（2 分钟）

### 3.1 添加远程仓库地址

打开你刚才创建的 GitHub 仓库页面，找到绿色的 **Code** 按钮。

点开后，选择 **HTTPS** 标签，复制链接，看起来像：

```
https://github.com/你的用户名/yinlu-decision.git
```

在 PowerShell 里执行：

```bash
# 把 <你的链接> 替换成真实的链接
git remote add origin https://github.com/你的用户名/yinlu-decision.git

# 验证
git remote -v
```

看到 `origin https://github.com/...` 就对了。

### 3.2 推送到 GitHub

```bash
# 推送 main 分支
git push -u origin main
```

等待上传完成（可能需要输入 GitHub 账号密码，按提示输入）。

✅ 完成！打开 GitHub 仓库页面刷新一下，你应该能看到代码了。

---

## 第四步：配置分支保护（3 分钟）—— 重要！

这一步是为了防止有人直接往 main 乱改代码。

### 4.1 进入仓库设置

1. 打开你的 GitHub 仓库
2. 点 **Settings**（设置）
3. 左侧菜单点 **Branches**

### 4.2 保护 main 分支

1. 点 **Add rule** 按钮
2. 填写：

| 字段 | 填什么 |
|------|--------|
| Branch name pattern | `main` |

3. 勾选以下选项：
   - ✅ **Require a pull request before merging**（合并前必须提 PR）
   - ✅ **Require approvals**（必须有人 Approve）
   - 设置为 **1**（只需要 1 人 Approve）

4. 点 **Create** 保存

✅ 完成！从现在开始，任何人都不能直接往 main 或 develop 推代码，必须开分支、提 PR、有人 review。

---

## 第五步：添加团队成员（可选，但建议做）

### 5.1 邀请 9 人加入仓库

1. 打开仓库首页
2. 点 **Settings** → **Collaborators**
3. 点 **Add people** 按钮
4. 输入队友的 GitHub 用户名，一个一个邀请

> 队友会收到邮件邀请，他们点击接受就能访问仓库了。

---

## 第六步：本地克隆（只有需要拿代码的人才做）

如果你的队友还没有代码，他们需要这样做：

### 6.1 克隆仓库

```bash
# 进入想放项目的目录，比如桌面
cd ~\Desktop

# 克隆仓库
git clone https://github.com/你的用户名/引路网站-v3.git

# 进入项目
cd 引路网站-v3
```

### 6.2 安装依赖并启动

```bash
npm install
npm run dev
```

浏览器会自动打开 `http://localhost:5173`。

✅ 完成！现在每个队友都可以本地开发了。

---

## 常见问题

### Q: 推送时显示 "Permission denied"？

A: 这通常是因为 SSH 密钥没配置。改用 HTTPS 试试：

```bash
git remote set-url origin https://github.com/你的用户名/引路网站-v3.git
```

### Q: 推送时要求输入用户名和密码？

A: 正常现象。输入你的 GitHub 用户名，密码改用 GitHub Token：
1. 打开 https://github.com/settings/tokens
2. 点 **Generate new token** → **Generate new token (classic)**
3. 勾选 `repo` 权限
4. 点 **Generate token**，复制长字符串
5. 粘贴到密码框

### Q: 怎么修改已经推送的代码？

A: 不用改 remote，直接在本地改，然后：

```bash
git add .
git commit -m "fix: 修复 xxx"
git push
```

### Q: 怎么让所有人都能 push？

A: 默认就能 push 到自己的分支（feat/xxx），只是 main 和 develop 受保护。

### Q: 怎么删除错误提交？

A: 如果还没 push：

```bash
git reset --soft HEAD~1
```

如果已经 push 了，用 revert：

```bash
git revert HEAD
```

**永远别用 `git push -f`！**

---

## 打卡清单

完成这些步骤后，在群里打卡：

- [ ] 创建了 GitHub 仓库
- [ ] 配置了 Git 用户名和邮箱
- [ ] 第一次 push 成功
- [ ] 配置了分支保护规则
- [ ] 可以看到 GitHub 上有代码了
- [ ] 所有队友都克隆了一份到本地
- [ ] 所有队友都 `npm install && npm run dev` 成功

都完成了？恭喜，GitHub 准备好了！现在可以开始真正的团队开发了。

---

## 快速参考

```bash
# 第一次设置
git config user.name "名字"
git config user.email "邮箱"
git init
git branch -M main
git branch develop
git add .
git commit -m "初始化"
git remote add origin <URL>
git push -u origin main
git push -u origin develop

# 日常工作
git switch develop
git pull
git switch -c feat/你的分支
# ... 改代码 ...
git add .
git commit -m "类型(范围): 说明"
git push -u origin feat/你的分支
# 然后去 GitHub 提 PR
```

---

**如果卡住了，截图发给 G0 或找最近的人问。**
