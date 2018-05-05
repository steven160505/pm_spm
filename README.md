# pet grooming环境配置
## 安装nvm及node.js


```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

设置环境变量

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

检查nvm是否安装成功

```bash
nvm --version #输出0.33.2即安装成功
```

安装node.js

```bash
nvm install v8.11.1
```

检查node.js是否安装成功

```bash
node -v # 输出v8.11.1即安装成功
```

## 使用homebrew安装MongoDB

```bash
brew upate
brew install mongodb
```
检查mongodb是否安装成功

```bash
brew services list
```
命令行提示以下信息即成功：

| Name | Status | User | Plist |
| :--- | :--- | :--- | :--- |
| mongodb | stopped |  |  |


使用homebrew启动MongoDB：

```bash
brew services start mongodb
```

## 下载项目

```bash
git init
git pull https://github.com/steven160505/pm_spm.git
```

## 安装工具包

进入项目目录，运行

```bash
npm install
```
## 启动

```bash 
node app.js
```

## 访问
打开浏览器，访问

```
http://localhost:8080
```

