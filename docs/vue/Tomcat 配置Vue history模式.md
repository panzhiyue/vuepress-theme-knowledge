# Tomcat 配置Vue history模式

转自:https://www.cnblogs.com/pongyc/p/11395420.html

Tomcat 配置Vue history模式 

近日 , 在使用 Tomcat 部署Vue项目时 , 刷新项目出现404的异常 . 

原因是 Vue使用了history模式 , 而tomcat没有相关配置 

 

1.Vue项目添加文件夹 WEB-INF , 在此文件夹中添加文件: web.xml 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270952887.png)



2.web.xml文件内容如下:

```
<?xml version="1.0" encoding="ISO-8859-1"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
                      http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
  version="3.0"
  metadata-complete="true">

  <display-name>webapp</display-name>
  <description>
     webapp
  </description>
  <error-page>  
   <error-code>404</error-code>  
   <location>/</location>  
</error-page>  
</web-app>
```

 3.配置前端 , 在 route -->index.js配置中 修改配置

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270952878.png)