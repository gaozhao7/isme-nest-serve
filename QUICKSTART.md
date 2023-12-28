## 快速开始

### 项目结构
![img](https://easyimage.lovelala.top:14443/i/2023/12/26/xhc41f-2.png)

### 环境准备
node：版本不小于 16，推荐 18 或 以上，不建议使用 19

包管理工具：推荐 pnpm，如果还没有安装可执行以下指令安装

npm i -g pnpm
mysql：如果不熟悉后端，建议对齐本项目使用的 5.7 版本

redis：版本不低于 6

mysql 和 redis 可本地安装，也可以直接使用云服务器安装好的服务，自行选择

### 工具准备
git: 开发必备，无需多说

ide: 建议 vscode

插件: 如果你用的是 vscode，可使用项目代码里的推荐的插件列表快速安装

### 本地运行

#### 一、 安装依赖
`npm i`

#### 二、创建数据库，数据库名 isme，也可自定义

#### 三、在新创建的数据库下执行初始化sql脚本，项目根目录下的 init.sql 文件

#### 四、将根目录下 .env 文件的数据库连接配置修改成自己的

#### 五、启动

`npm run start:dev`

### 开发模块
#### 1.进入具体目录下执行命令
```shell
superstar@MacBookProM1 modules % nest g res sysdict
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? Yes