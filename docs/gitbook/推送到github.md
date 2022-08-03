```bash
#注册 GitHub.com 账号,并新建一个项目。在“Setting（设置）”页面获取到“Git URL（Git 链接）”

#在本地安装 git

#在本地新建一个文件夹，并通过 Git 命令把刚才新建的远程项目抓取到本地
$ mkdir MyFirstBook-Git
$ cd MyFirstBook-Git
$ git init
$ git pull https://git.gitbook.com/kindlefere/myfirstbook.git

#然后把本地项目“MyFirstBook”中的所有内容拷贝到刚才新建的文件夹中，如上面的“MyFirstBook-Git”。然后使用 Git 命令把本地的项目上传到远程
$ git add -A
$ git commit -m "提交说明"
$ git remote add gitbook https://git.gitbook.com/kindlefere/myfirstbook.git
$ git push -u gitbook master

#修改内容后只需要输入以下 Git 命令即可
$ git add [修改的文件]
$ git commit -m "提交说明"
$ git push -u gitbook master
```

