

# Yarn

## 1.学习资料

官网:https://pnpm.io/installation/

## 1.安装

```
npm i -g pnpm
```

### 设置源

```
//查看源
pnpm config get registry 
//切换淘宝源
pnpm config set registry http://registry.npm.taobao.org 
```



### 使用

```
pnpm install 包  // 
pnpm i 包
pnpm add 包    // -S  默认写入dependencies
pnpm add -D    // -D devDependencies
pnpm add -g    // 全局安装
```

### 移除

```
pnpm remove 包                            //移除包
pnpm remove 包 --global                   //移除全局包
```

### 更新

```
pnpm up                //更新所有依赖项
pnpm upgrade 包        //更新包
pnpm upgrade 包 --global   //更新全局包
```

### 设置存储路径

```
pnpm config set store-dir /path/to/.pnpm-store
```



### 3.其他

#### 3.1. VSCode无法运行pnpm

1. 在Windows系统搜索powershell，以管理员运行：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202204291050615.png)

 

2. 在命令框输入： **set-ExecutionPolicy RemoteSigned**， 然后输入**A**

 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202204291050356.png)