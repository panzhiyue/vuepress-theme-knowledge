# Tomcat

## Tomcat绑定域名

### 1.打开server.xml文件

![1621236614719](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014396.png)

### 2.修改engine

![1621236660523](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014025.png)

```xml
<Engine name="Catalina" defaultHost="localhost">
改为
<Engine name="Catalina" defaultHost="域名">
```



### 3.修改host

![1621238808473](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014963.png)

## Tomcat设置账号密码

打开tomcat-users文件

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014422.jpeg) 

我们将”`<user username="admin" password="1234" roles="manager-gui"/>`“添加到上图中的相应位置，具体如下图：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014402.jpeg)