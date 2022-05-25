[TOC]

# Windows

## 一、资源

### 1.1 官网windows下载

#### 1.1.1 windows10

https://www.microsoft.com/zh-cn/software-download/windows10ISO

#### 1.1.2 windows8

https://www.microsoft.com/zh-cn/software-download/windows8ISO

#### 1.1.3 Windows7

https://www.microsoft.com/zh-cn/software-download/windows7

#### 1.1.4 WindowsXP

### 1.2 一个全面的官网资源整合网站

https://msdn.itellyou.cn/

## 二、快捷键

win+r:打开运行





## 三、其他

### 3.1 运行命令列表

cmd:打开终端

regedit:打开注册表

### 3.2 管理Windows凭证

同事共享给我2个文件夹,分别用两套账号密码控制,我登录了第一个文件夹成功后开始登录第二个文件夹,会默认使用第一个文件夹的账号密码进行登录。

1. 打开控制面板-用户账户和家庭安全-用户账户-管理您的凭据

![image-20211101084534097](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846078.png)

![image-20211101084551763](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846079.png) 

2. 编辑

![image-20211101084603099](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846080.png) 

### 3.3 windows10安装net3.5

1.0x800f0950错误

mac m1芯片 使用parallels安装windows arm版本时无法安装.net3.5

解决方法:

(1)这么棘手的问题估计是一些系统文件出问题了，所以第一步就是修复系统：按“Windows+X”点击“命令提示符管理员”，输入“SFC /scannow”回车（该操作可能需要一段时间，please wait a minute...），再输入“dism /online /cleanup-image /restorehealth”回车。然后，估计还得等一会儿。

(2)解压iso镜像文件(必须时与安装的系统相同版本),进去，找到sxs文件夹，把它弄到D盘、E盘...随便哪个盘根目录下，记住，是根目录。我的是C盘。

![image-20210418134634408](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846081.png)

![image-20210418134540122](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846082.png)

5、然后按“Windows+X”点击“命令提示符管理员”，进入dos界面，键入（直接粘贴就行，复制粘贴的话，一定要把那个H换成你存储sxs文件夹的盘）dism.exe /online /enable-feature /featurename:NetFX3 /Source:C:\sxs。然后会出来一个进度条，几分钟就可以了。

如果是以下提示很可能是windows版本不一致导致的

![image-20210418134750833](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846083.png)

如果是以下提示则安装成功

![image-20210418134816529](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846084.png)

### 3.4 添加字体

1.下载所需字体

![1603157885239](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846085.png)

2. 进入电脑的：C:\Windows\Fonts文件夹，这个文件夹专门用来存放系统字体的

![1603157936720](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846086.png)

3. 把刚才下载的字体集文件复制到这个文件夹下，系统会自动安装

![1603158005743](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846087.png)

4. 安装完成后就可以点击文件，选择预览，就可以看到了，在使用Word或其他工具时就可以选择这个字体啦

### 3.5服务器启用或关闭Windows功能

打开控制面板->查看方式"类别"->程序(启用或关闭windows功能)

![1602740757894](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846088.png)



![1602740792172](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846089.png)

![1602740809211](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846090.png)

![1602740851057](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846092.png)

![1602740902069](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010846093.png)

### 3.6 WTG(移动系统)

http://www.360doc.com/content/19/0717/20/860_849425063.shtml

### 3.7 注册与删除服务

1.注册服务

https://blog.csdn.net/woshiwangdaye/article/details/90482972

https://www.cnblogs.com/yepei/p/6218887.html

```bash
sc create ServiceName binPath= 路径 start= auto
```

2.删除服务

```bash
sc delete serverName
```

3.启动服务

```bash
sc start serverName
```

4.停止服务

```bash
sc stop serverName
```



管理员权限下的cmd 命令，格式：instsrv.exe 服务名 remove
例如：D:\gateway\Bat2Server\instsrv.exe Sentinel remove 

## 四、CMD

### 4.1 命令

#### 4.1.1 ping: 测试网络连接情况

- `-n`：要发送的回显请求数
- `-t`：ping 主机直到中断
- `-i`：生存时间ttl
- `-6`：IPv6

```
$ ping 192.168.20.8 -n 3
Pinging 192.168.20.8 with 32 bytes of data:
Reply from 192.168.20.8: bytes=32 time<1ms TTL=64
Reply from 192.168.20.8: bytes=32 time<1ms TTL=64
Reply from 192.168.20.8: bytes=32 time<1ms TTL=64

Ping statistics for 192.168.20.8: 
Packets: Sent = 3, Received = 3, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds: 
Minimum = 0ms, Maximum = 0ms, Average = 0ms
```

#### 4.1.2 netstat: 协议统计和当前 TCP/IP 网络连接



- `-t` 列出所有tcp连接
- `-a`：显示所有连接和侦听端口
- `-n`：以数字形式显示地址和端口号
- `-o`：显示进程 ID
- `-p proto`：显示指定的协议的连接，TCP、UDP、TCPv6 或 UDPv6
- `-s`：显示每个协议的统计。默认情况下，显示IP、IPv6、ICMP、ICMPv6、TCP、TCPv6、UDP 和 UDPv6的统计信息，可使用`-p` 选项指定协议。
- `-e`：显示以太网统计。此选项可以与 -s 选项结合使用。
- `-r`：显示路由信息

```bash
Z:\PZYDemo\GZOL_Tool>netstat -t

活动连接

  协议  本地地址          外部地址        状态           卸载状态

  TCP    127.0.0.1:1116         DESKTOP-DSSD7C4:1120   ESTABLISHED     InHost
  TCP    127.0.0.1:1117         DESKTOP-DSSD7C4:1119   ESTABLISHED     InHost
  TCP    127.0.0.1:1119         DESKTOP-DSSD7C4:1117   ESTABLISHED     InHost
  TCP    127.0.0.1:1120         DESKTOP-DSSD7C4:1116   ESTABLISHED     InHost
  TCP    127.0.0.1:1333         DESKTOP-DSSD7C4:44244  ESTABLISHED     InHost
  TCP    127.0.0.1:1815         DESKTOP-DSSD7C4:44244  ESTABLISHED     InHost
  TCP    127.0.0.1:3300         DESKTOP-DSSD7C4:44244  ESTABLISHED     InHost
  TCP    127.0.0.1:5042         DESKTOP-DSSD7C4:24801  ESTABLISHED     InHost
  TCP    127.0.0.1:14807        DESKTOP-DSSD7C4:14817  ESTABLISHED     InHost
  TCP    127.0.0.1:14808        DESKTOP-DSSD7C4:14820  ESTABLISHED     InHost
  TCP    127.0.0.1:14817        DESKTOP-DSSD7C4:14807  ESTABLISHED     InHost
  TCP    127.0.0.1:14820        DESKTOP-DSSD7C4:14808  ESTABLISHED     InHost
  
```

#### 4.1.3 ipconfig:网卡信息

```bash
$ ipconfig
$ ipconfig /all
$ netsh interface ipv4 show config
$ netsh interface ipv6 show config
$ wmic nic list brief
```

#### 4.1.4路由配置

```bash
route add [Destination] mask [netmask] [gw] metric [测量值]
```

- -p：添加永久路由
- Destination： 指定该路由的网络目标。
- mask：当添加一个网络路由时，需要使用网络掩码。
- gw：路由数据包通过网关。注意，你指定的网关必须能够达到。
- metric：设置路由跳数。

```bash
# ipv4
$ route -p add 23.23.23.0 mask 255.255.255.0 192.168.97.60
route delete 23.23.23.0# ipv6
$ netsh interface ipv6 add/del route 2001::/64 "Local Area Connection 2" 2001::2
```

##### 查看路由表

```bash
$ netstat -r
$ route print
$ route print -4
$ route print -6
$ netsh interface ipv4 show route
$ netsh interface ipv6 show route
```

##### 禁用启用网卡

```bash
$ netsh interface set interface eth0 disabled # 禁用网卡
$ netsh interface set interface name="接口名称" admin=DISABLE
$ netsh interface set interface eth0 enabled #启用网卡
$ netsh interface set interface name="接口名称" admin=ENABLE
$ netsh interface ipv6 set interface name="接口名称" disable/enable
$ netsh interface show interface #显示接口
```

通过python脚本自动化控制：

```bash
import osos.popen('netsh interface set interface name="接口名称" admin=DISABLE')
```

##### 释放、更新地址

```bash
# ipv4
$ ipconfig /release
$ ipconfig /renew
# ipv6
$ ipconfig /release6
$ ipconfig /renew6
```

##### 添加、删除IP地址

```bash
# ipv4
$ netsh interface ip add address "本地连接" 192.168.1.100 255.255.255.0
$ netsh interface ip delete address "本地连接" 192.168.1.100## 设置静态IP地址
$ netsh interface ip set address name="eth1" source=static address=192.168.5.125 mask=255.255.255.0
# ipv6
$ netsh interface ipv6 delete address 本地连接 2001::1
$ netsh interface ipv6 add/del address 本地连接 2001::1
```

#### 4.1.5 日期

##### 1.获取日期

**语法**

```bash
%date% 
```

**示例**

```bash
echo %date%
```

![1606361251524](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010847319.png)

##### 2.日期截取

**语法**

```bash
%date:~x,y%

```

**参数说明**

- **x**是开始位置(从0开始)

- **y**是取得字符数 

**示例**

```bash
echo 年:%date:~0,4%,月%date:~5,2%,日%date:~8,2%

```

![1606366029086](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010847321.png)

#### 4.1.6时间

##### 1.获取时间

**语法**

```bash
%time% 

```

**示例**

```bash
echo %time% 

```

![1606361323044](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010847322.png)

##### 2.时间截取

**语法**

```bash
%time:~x,y%

```

**参数说明**

- **x**是开始位置(从0开始)

- **y**是取得字符数 

**示例**

```bash
echo 时%time:~0,2%,分%time:~3,2%,秒%time:~6,2%

```

![1606366189877](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010847323.png)

#### 4.1.7 文件夹

##### 1.创建文件夹

```bash
md [盘符:\][路径\]新目录名

```

#### 4.1.8 用户

##### 1.创建用户

```bash
net user 用户名 密码 /add

```

#### 4.1.9 echo打印信息

**语法**

```bash
echo

```

**示例**

```bash
echo "测试"

```

![1606365644884](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010847324.png)

#### 4.1.10 路径

##### 1.获取当前盘符

**语法**

```bash
%~d0

```

**示例**

```bash
echo 当前盘符:%~d0
pause

```

![1606132579470](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010847325.png)



##### 2.获取当前路径

**语法**

```bash
%cd%

```

**示例**

```bash
echo 当前路径:%cd%
pause

```

![1606132737110](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010847326.png)

##### 3.当前执行命令行

**语法**

```bash
%0

```

**示例**

```bash
echo 当前执行命令行:%0
pause
```

![1606132952218](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010847327.png)

##### 4.当前bat文件路径

**语法**

```bash
%~dp0
```

**示例**

```bash
echo 当前bat文件路径：%~dp0
pause
```

![1606133094975](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010847328.png)

##### 5.当前bat文件短路径

**语法**

```bash
%~sdp0
```

**示例**

```bash
echo 当前bat文件短路径：%~sdp0
pause
```

![1606133213178](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111010847329.png)

### 4.2 bat

#### 1.执行结束不关闭窗口

**语法**

```bash
pause
```