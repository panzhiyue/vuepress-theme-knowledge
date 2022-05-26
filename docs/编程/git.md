


# git
## 命令大全

### **代理**

#### 1.设置http代理

```
git config --global http.proxy 192.168.1.1:8083
```

#### 2.设置https代理

```
git config --global https.proxy 192.168.1.1:8083
```

#### 3.查询http代理

```
git config --global http.proxy
```

#### 4.查询https代理

```
git config --global https.proxy
```

#### 5.取消http代理

```
git config --global --unset http.proxy
```

#### 6.取消https代理

```
git config --global --unset https.proxy
```

### remote

#### 显示所有远程仓库

```bash
git remote -v
```

**例如**

```bash
$ git remote -v
origin  https://github.com/tianqixin/runoob-git-test (fetch)
origin  https://github.com/tianqixin/runoob-git-test (push)
```

#### 显示某个远程仓库的信息

```bash
git remote show [remote]
```

**例如**

```bash
$ git remote show https://github.com/tianqixin/runoob-git-test
* remote https://github.com/tianqixin/runoob-git-test
  Fetch URL: https://github.com/tianqixin/runoob-git-test
  Push  URL: https://github.com/tianqixin/runoob-git-test
  HEAD branch: master
  Local ref configured for 'git push':
    master pushes to master (local out of date)
```

#### 添加远程版本库

```bash
git remote add [shortname] [url]
```

#### 删除远程仓库

```bash
git remote rm name
```

#### 修改仓库名

```bash
git remote rename old_name new_name
```

