[English](README.md) | 简体中文

<h1 align="center">
  <br>
<img src="public/chameleon.ico" width="150"/></a>
  <br>
  Chameleon
  <br>
</h1>
<h4 align="center">自动化，可定制地从API接口或必应壁纸源更新桌面背景</h4>

![Static Badge](https://img.shields.io/badge/build-passing-Chartreuse)

![Alt text](chameleon.gif)

## :sparkles: 特性 
**:computer: 支持平台**

 - Window :ballot_box_with_check:
   MacOS :black_medium_square:
   Linux :black_medium_square:

**:robot: 更新方式**

 - 间隔固定时间
 - 选定多个时刻
 - 文件夹 :information_source:

**:framed_picture: 壁纸来源**
* Bing Wallpaper

  :ballot_box_with_check:获取无水印必应壁纸

  :ballot_box_with_check:浏览近期壁纸

* API接口

  :ballot_box_with_check:从任意API中获取并下载

  :black_medium_square:保存指定数量
  
* 与其他软件交互 :jigsaw: 

  :black_medium_square:Wallpaper Engine( 新建文件夹:trollface: )

## :unicorn: 使用
Chameleon 既简洁又纯粹，无需复杂的设置，下载对应平台即可


## :gear: 构建

自行构建前需要 `node.js` 等环境。

#### 克隆代码

```shell
git clone --recurse-submodules https://github.com/Epxir/Chameleon.git
```

#### 安装依赖模块

```shell
npm install && npm run dev
```



#### 编译项目

```shell
npm run build
```

## :alembic: 技术栈

* [Electron](https://www.electronjs.org/) + [Vite](https://vitejs.dev/) + [Vue3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/) + [element plus](https://element-plus.org/)


## :scroll: 许可证

MIT