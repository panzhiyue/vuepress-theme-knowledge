# NVM

## 安装

点击跳转([nvm项目的github地址](https://github.com/creationix/nvm)) ，找到install script的地方，然后复制，在终端粘贴运行。

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

## nvm 常用命令

● nvm install stable 安装最新稳定版 node

● nvm install `version` 安装指定版本，如：安装v4.4.0，nvm install v4.4.0

● nvm uninstall `version` 删除已安装的指定版本，语法与install类似

● nvm use `version` 切换使用指定的版本node

● nvm ls 列出所有安装的版本

● nvm alias default `version` 如： nvm alias default v11.1.0