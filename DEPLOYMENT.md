# 部署指南

本指南将帮助你将沉浸式工作台应用部署到 Vercel，让其他人可以通过网址访问。

## 前置要求

- GitHub 账号（如果没有，请先注册：https://github.com）
- Vercel 账号（可以用 GitHub 账号直接登录）

## 步骤 1: 准备代码并推送到 GitHub

### 1.1 检查 Git 状态

首先确认代码已经保存，然后检查 Git 状态：

```bash
cd /Users/jingjing/1
git status
```

### 1.2 如果还没有提交代码

```bash
# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: 沉浸式工作台应用"
```

### 1.3 在 GitHub 创建仓库

1. 访问 https://github.com/new
2. 填写仓库名称（例如：`immersive-workspace`）
3. 选择 **Public**（公开）或 **Private**（私有）
4. **不要**勾选 "Initialize this repository with a README"（因为我们已经有了）
5. 点击 "Create repository"

### 1.4 推送代码到 GitHub

GitHub 创建仓库后会显示推送命令，复制并执行：

```bash
# 添加远程仓库（替换成你的仓库地址）
git remote add origin https://github.com/你的用户名/仓库名.git

# 如果已经存在，先删除再添加
git remote remove origin
git remote add origin https://github.com/你的用户名/仓库名.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

如果提示需要登录，按照提示输入 GitHub 用户名和密码（或 Personal Access Token）。

## 步骤 2: 在 Vercel 部署

### 2.1 登录 Vercel

1. 访问 https://vercel.com
2. 点击 "Sign Up" 或 "Log In"
3. 选择 "Continue with GitHub"
4. 授权 Vercel 访问你的 GitHub 账号

### 2.2 导入项目

1. 登录后，点击 "Add New Project" 或 "Import Project"
2. 在项目列表中找到你刚才创建的 GitHub 仓库
3. 点击 "Import"

### 2.3 配置项目

Vercel 会自动检测到这是一个 Vite 项目，配置如下：

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

通常不需要修改，直接使用默认配置即可。

### 2.4 部署

1. 点击 "Deploy" 按钮
2. 等待构建完成（通常 1-2 分钟）
3. 部署成功后，你会看到一个绿色的 "Success" 提示

### 2.5 访问应用

部署完成后，你会获得一个网址，格式类似：
- `https://your-project-name.vercel.app`

点击这个网址即可访问你的应用！

## 步骤 3: 后续更新

每次更新代码后：

1. 提交更改到 Git：
   ```bash
   git add .
   git commit -m "更新说明"
   git push
   ```

2. Vercel 会自动检测到 GitHub 的更新并重新部署
3. 几分钟后，新版本就会上线了

## 常见问题

### Q: 部署失败怎么办？

A: 检查以下几点：
- 确保 `package.json` 中的构建脚本正确
- 检查 Vercel 的构建日志，查看具体错误信息
- 确保所有依赖都已正确安装

### Q: 可以绑定自定义域名吗？

A: 可以！在 Vercel 项目设置中：
1. 进入 "Settings" > "Domains"
2. 输入你的域名
3. 按照提示配置 DNS 记录

### Q: 部署后文件上传功能正常吗？

A: 是的！文件上传使用浏览器本地存储，不需要后端服务器，部署后完全正常。

### Q: 如何查看部署日志？

A: 在 Vercel 项目页面，点击 "Deployments" 标签，可以看到所有部署历史和日志。

## 需要帮助？

如果遇到问题，可以：
1. 查看 Vercel 的构建日志
2. 检查 GitHub 仓库是否正确推送
3. 确认所有配置文件（`vercel.json`, `package.json`）正确

祝你部署顺利！🎉

