# 沉浸式工作台

一个功能丰富的沉浸式工作台应用，支持文本编辑和PDF查看，具有可自定义的背景、音乐和毛玻璃效果。

## 功能特性

- ✨ **可调整工作区尺寸**：小、中、大三种尺寸可选
- 📝 **文本编辑器**：支持多行文本编辑，自动保存到本地存储
- 📄 **PDF查看器**：支持PDF文件上传和查看，带缩放和翻页功能
- 🎨 **自定义背景**：支持上传图片或视频作为背景
- 🎵 **背景音乐**：支持上传音频文件，带播放控制和音量调节
- 🎚️ **毛玻璃效果**：可调节透明度和毛玻璃效果开关
- ⏱️ **计时器**：可设置工作时间的倒计时器
- 🌐 **多语言支持**：支持中文（简体/繁体）、英文、日文、韩文
- 📱 **响应式设计**：适配不同屏幕尺寸

## 技术栈

- **React 18** - UI框架
- **TypeScript** - 类型安全
- **Material-UI (MUI) v5** - UI组件库
- **react-pdf** - PDF查看
- **Vite** - 构建工具

## 安装和运行

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

## 部署到 Vercel

### 快速部署

1. **准备 GitHub 仓库**
   ```bash
   # 如果还没有初始化 Git
   git init
   git add .
   git commit -m "Initial commit"
   
   # 在 GitHub 创建新仓库，然后推送
   git remote add origin https://github.com/你的用户名/仓库名.git
   git branch -M main
   git push -u origin main
   ```

2. **在 Vercel 部署**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "Add New Project"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测 Vite 项目并配置
   - 点击 "Deploy" 即可

3. **访问应用**
   - 部署完成后，Vercel 会提供一个 `your-project.vercel.app` 的网址
   - 可以绑定自定义域名（在项目设置中）

### 自动部署

每次推送到 GitHub 主分支，Vercel 会自动重新部署。

详细部署说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 项目结构

```
src/
├── components/
│   ├── Workspace/          # 工作区组件
│   │   ├── WorkspaceContainer.tsx
│   │   ├── WorkspaceEditor.tsx
│   │   └── PDFViewer.tsx
│   ├── Settings/           # 设置面板组件
│   │   ├── SettingsPanel.tsx
│   │   ├── SizeSelector.tsx
│   │   ├── BackgroundUpload.tsx
│   │   ├── MusicUpload.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── TransparencySlider.tsx
│   │   ├── VolumeSlider.tsx
│   │   ├── TimerSettings.tsx
│   │   └── TimerDisplay.tsx
│   └── Layout/             # 布局组件
│       └── ImmersiveLayout.tsx
├── context/                # React Context状态管理
│   ├── WorkspaceContext.tsx
│   └── SettingsContext.tsx
├── utils/                  # 工具函数
│   ├── constants.ts
│   └── fileHandlers.ts
├── App.tsx
└── main.tsx
```

## 使用说明

1. **调整工作区尺寸**：点击右上角设置按钮，在设置面板中选择工作区尺寸（小/中/大）

2. **编辑文本**：在工作区中直接输入文本，内容会自动保存到浏览器本地存储

3. **查看PDF**：在工作区编辑器底部点击上传按钮，选择PDF文件即可查看

4. **自定义背景**：在设置面板中点击"上传图片/视频"按钮，选择背景文件

5. **播放音乐**：在设置面板中上传音频文件，点击播放按钮控制播放/暂停

6. **调节透明度**：使用设置面板中的透明度滑块调节工作区的透明度

7. **设置计时器**：在设置面板中选择工作时间，点击右上角的计时器开始/暂停倒计时

## 注意事项

- PDF查看需要PDF.js支持，已配置CDN加载
- 上传的文件仅存储在浏览器内存中，刷新页面后会清除
- 音频自动播放需要用户交互（浏览器策略限制）
- 建议使用现代浏览器以获得最佳体验

## 许可证

MIT License


