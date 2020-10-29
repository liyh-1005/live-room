## 1. 依赖安装，本地开发，构建发布

### 1.1 安装依赖

```
npm install
```

## 1.2 本地开发

```
npm run dev
```


## 1.3 构建发布

```
npm run build
```

## 2. 工程结构介绍

```
├── .babelrc   // babel配置文件
├── .eslintignore  // eslint忽略配置文件
├── .eslintrc.js // eslint配置文件
├── .gitignore // git忽略配置文件
├── .vscode // vscode开发工具工作区配置文件夹
|  └── settings.json vscode开发工具工作区配置文件
├── dist  //  项目构建后的目录
├── package-lock.json // 项目的配置文件-锁定依赖项版本号
├── package.json // 项目的配置文件
├── README.md //
├── src // 源码文件
|  ├── assets // 资源文件夹
|  |  ├── css // css文件
|  |  |  ├── edu-tic.css
|  |  |  ├── img 
|  |  |  |  └── slice
|  |  |  ├── import
|  |  |  |  ├── boardtool.css
|  |  |  |  ├── chatapp.css
|  |  |  |  ├── form.css
|  |  |  |  ├── header.css
|  |  |  |  ├── icon.css
|  |  |  |  ├── layout.css
|  |  |  |  └── reset.css
|  |  |  └── style.less
|  |  └── images // 图片
|  |     ├── arrow-left.png
|  |     └── arrow-right.png
|  ├── component 组件文件夹
|  |  ├── common-vue-component // 公共组件，可供web端课中页和移动端课中页通过弹窗方式调用
|  |  |  └── dialog-component
|  |  |     ├── Dialog.js
|  |  |     └── Dialog.vue
|  |  ├── core // 核心组件
|  |  |  ├── BaseComponent.js // 课中页组件的基类
|  |  |  ├── DialogComponent.js // 弹窗类组件的基类
|  |  |  └── EventBus.js // 通信组件
|  |  └── vue-component 课中页组件
|  |     ├── app-component // 课中页入口组件
|  |     |  ├── App.js
|  |     |  └── App.vue
|  |     ├── board-component // 白板页组件
|  |     |  ├── Board.js
|  |     |  └── Board.vue
|  |     ├── boardfilelist-component // 白板文件切换组件
|  |     |  ├── BoardFileList.js
|  |     |  └── BoardFileList.vue
|  |     ├── boardtool-component // 白板工具组件
|  |     |  ├── BoardTool.js
|  |     |  └── BoardTool.vue
|  |     ├── header-component // 课中页头部组件
|  |     |  ├── Header.js
|  |     |  └── Header.vue
|  |     ├── im-component // im组件
|  |     |  ├── Msg.vue
|  |     |  ├── TIM.js
|  |     |  └── TIM.vue
|  |     ├── layout-component // 布局组件
|  |     |  ├── Layout.js
|  |     |  └── Layout.vue
|  |     └── trtc-component // trtc组件
|  |        ├── TrtcComponent.js
|  |        └── TrtcComponent.vue
|  ├── config // 配置文件夹
|  |  └── Constant.js // 常量配置
|  ├── pages // 入口页面
|  |  ├── main // 课中页
|  |  |  ├── index.html
|  |  |  └── index.js
|  |  └── webview // 弹窗
|  |     ├── index.html
|  |     └── index.js
|  └── util // 常用工具类
|     └── Util.js
├── webpack.config.base.js  // webpack基础配置
├── webpack.config.build.js // webpack生产环境构建配置
└── webpack.config.dev.js // webpack本地开发环境构建配置
```