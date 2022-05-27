# Redis

## Windows 下安装

**下载地址：**https://github.com/tporadowski/redis/releases。

Redis 支持 32 位和 64 位。这个需要根据你系统平台的实际情况选择，这里我们下载 **Redis-x64-xxx.msi**,双击安装







## Redis问题——Error: 磁盘在使用中，或被另一个进程锁定。

Redis出于对数据保护，默认只能本地客户端连接。远程连接就会出现以上错误。如何解决这一问题，看下：

修改server-A的redis.conf:注释掉本地绑定；

bind 127.0.0.1 表示指定绑定本机IP，为了保护数据，也可以绑定指定IP

bind 127.0.0.1 10.140.116.20

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271135745.png)

关闭保护模式：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271135572.png)

重启Redis服务。