# nginx

## 安装

### windows

#### 1.下载nginx

下载地址http://nginx.org/en/download.html

下载后解压，解压后如下

![image-20220106083529026](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271123456.png)

#### 2.启动nginx

有很多种方法启动nginx

(1)直接双击nginx.exe，双击后一个黑色的弹窗一闪而过

(2)打开cmd命令窗口，切换到nginx解压目录下，输入命令 nginx.exe 或者 start nginx ，回车即可

#### 3.检查nginx是否启动成功

直接在浏览器地址栏输入网址 http://localhost:80，回车，出现以下页面说明启动成功



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271123387.png)

也可以在cmd命令窗口输入命令 tasklist /fi "imagename eq nginx.exe" ，出现如下结果说明启动成功

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271123520.png)

 

nginx的配置文件是conf目录下的nginx.conf，默认配置的nginx监听的端口为80，如果80端口被占用可以修改为未被占用的端口即可

 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271123388.png)

检查80端口是否被占用的命令是： netstat -ano | findstr 0.0.0.0:80 或 netstat -ano | findstr "80"

当我们修改了nginx的配置文件nginx.conf 时，不需要关闭nginx后重新启动nginx，只需要执行命令 nginx -s reload 即可让改动生效

#### 4.关闭nginx

如果使用cmd命令窗口启动nginx，关闭cmd窗口是不能结束nginx进程的，可使用两种方法关闭nginx

(1)输入nginx命令  nginx -s stop(快速停止nginx)  或  nginx -s quit(完整有序的停止nginx)

(2)使用taskkill  taskkill /f /t /im nginx.exe

#### 5.使用nginx代理服务器做负载均衡

我们可以修改nginx的配置文件nginx.conf 达到访问nginx代理服务器时跳转到指定服务器的目的，即通过proxy_pass 配置请求转发地址，即当我们依然输入http://localhost:80 时，请求会跳转到我们配置的服务器

 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271123375.png)

同理，我们可以配置多个目标服务器，当一台服务器出现故障时，nginx能将请求自动转向另一台服务器，例如配置如下：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271123385.png)

当服务器 localhost:8080 挂掉时，nginxnginx能将请求自动转向服务器 192.168.101.9:8080 。上面还加了一个weight属性，此属性表示各服务器被访问到的权重，weight

越高被访问到的几率越高。

#### 6.nginx配置静态资源

 将静态资源（如jpg|png|css|js等）放在如下配置的f:/nginx-1.12.2/static目录下，然后在nginx配置文件中做如下配置(注意：静态资源配置只能放在 location / 中)，浏览器中访问 http://localhost:80/1.png 即可访问到 f:/nginx-1.12.2/static目录下的 1.png图片

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271123973.png)

## 部署vue项目

### 1.打包项目

首先找到自己的vue的项目然后输入命令 npm run build 他会在你的vue目录下生成一个dist文件夹里面就是你的vue的项目

然后打开这个dist文件夹把里面的内容复制下来里面会有两个文件一个是index.html是主目录还有一个是static文件夹

![这里写图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271123938.png)

把他们复制下来然后打开你的nginx的目录下的html文件里面会有两个默认文件直接删掉不要留，然后把你刚刚复制的文件粘贴进去

![这里写图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271123105.png)

然后打开浏览器输入最开始改的端口号localhost:你所改的端口号回车；你就会看到自己的vue的项目跑起来了我的打开就是这样的咯：

![这里写图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271123955.png)

## 部署多个前端项目

### 1.把项目文件放到nginx目录下

![image-20220106085756401](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271123979.png)

### 2.打开nginx.conf

添加一个server指向前端项目，有多少个项目就加多少个server

![image-20220106085922743](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271123942.png)

- listen:监听的端口号
- server_name 域名
- localtion/root:项目目录
- localtion/index:首页