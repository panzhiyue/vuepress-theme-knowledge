```bash
#1.安装node.js，在node.js官网下载，直接安装稳定版本。
https://nodejs.org/en/

#2.检测 node.js 是否安装成功
npm -v

#3.安装 gitboot 和命令行工具 -g 代表全局安装
sudo npm install -g gitbook-cli

#4.检测是否安装成功 v 大写
gitbook -V
gitbook -version

#更新 gitbook 命令行工具
sudo npm update gitbook-cli -g

#卸载 GitBook 命令
sudo npm uninstall gitbook-cli -g

#查看安装位置
which gitbook

#5.安装 gitboot editor,方便编辑书籍
https://legacy.gitbook.com/editor/osx

#6.安装calibre,calibre是一款非常方便的开源电子书转换软件
https://calibre-ebook.com/download

#7.将安装的calibre放在应用程序中,执行
sudo ln -s /Applications/calibre.app/Contents/MacOS/ebook-convert /usr/local/bin
```

