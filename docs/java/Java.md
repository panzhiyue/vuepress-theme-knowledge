[TOC]

# Java

## 其他

### 各种数据库连接

https://www.cnblogs.com/otomedaybreak/articles/2330135.html

#### 1.MySQL

```java
String Driver="com.mysql.jdbc.Driver"; //驱动程序
String URL="jdbc:mysql://localhost:3306/db_name"; //连接的URL,db_name为数据库名
String Username="username"; //用户名
String Password="password"; //密码
Class.forName(Driver).new Instance();
Connection con=DriverManager.getConnection(URL,Username,Password);
```

#### 2.Microsoft SQL Server 2.0驱动(3个jar的那个)

```java
String Driver="com.microsoft.jdbc.sqlserver.SQLServerDriver"; //连接SQL数据库的方法
String URL="jdbc:microsoft:sqlserver://localhost:1433;DatabaseName=db_name"; //db_name为数据库名
String Username="username"; //用户名
String Password="password"; //密码
Class.forName(Driver).new Instance(); //加载数据可驱动
Connection con=DriverManager.getConnection(URL,UserName,Password); //
```

#### 3.Microsoft SQL Server 3.0驱动(1个jar的那个): // 老紫竹完善

```java
String Driver="com.microsoft.sqlserver.jdbc.SQLServerDriver"; //连接SQL数据库的方法
String URL="jdbc:microsoft:sqlserver://localhost:1433;DatabaseName=db_name"; //db_name为数据库名
String Username="username"; //用户名
String Password="password"; //密码
Class.forName(Driver).new Instance(); //加载数据可驱动
Connection con=DriverManager.getConnection(URL,UserName,Password); //
```

#### 4. Sysbase 

```java
String Driver="com.sybase.jdbc.SybDriver"; //驱动程序
String URL="jdbc:Sysbase://localhost:5007/db_name"; //db_name为数据可名
String Username="username"; //用户名
String Password="password"; //密码
Class.forName(Driver).newInstance();
Connection con=DriverManager.getConnection(URL,Username,Password);
```

#### 5. Oracle(用thin模式)

```java
String Driver="oracle.jdbc.driver.OracleDriver"; //连接数据库的方法
String URL="jdbc:oracle:thin:@loaclhost:1521:orcl"; //orcl为数据库的SID
String Username="username"; //用户名
String Password="password"; //密码
Class.forName(Driver).newInstance(); //加载数据库驱动
Connection con=DriverManager.getConnection(URL,Username,Password); 
```

#### 6. PostgreSQL 

```java
String Driver="org.postgresql.Driver"; //连接数据库的方法
String URL="jdbc:postgresql://localhost/db_name"; //db_name为数据可名
String Username="username"; //用户名
String Password="password"; //密码
Class.forName(Driver).newInstance();
Connection con=DriverManager.getConnection(URL,Username,Password);
```

#### 7.DB2

```java
String Driver="com.ibm.db2.jdbc.app.DB2.Driver"; //连接具有DB2客户端的Provider实例
//String Driver="com.ibm.db2.jdbc.net.DB2.Driver"; //连接不具有DB2客户端的Provider实例
String URL="jdbc:db2://localhost:5000/db_name"; //db_name为数据可名
String Username="username"; //用户名
String Password="password"; //密码
Class.forName(Driver).newInstance();
Connection con=DriverManager.getConnection(URL,Username,Password);
```

#### 8. Informix 

```java
String Driver="com.informix.jdbc.IfxDriver"; 
String URL="jdbc:Informix-sqli://localhost:1533/db_name:INFORMIXSER=myserver"; //db_name为数据可名
String Username="username"; //用户名
String Password="password"; //密码
Class.forName(Driver).newInstance();
Connection con=DriverManager.getConnection(URL,Username,Password);
```

#### 9. JDBC-ODBC 

```java
String Driver="sun.jdbc.odbc.JdbcOdbcDriver";
String URL="jdbc:odbc:dbsource"; //dbsource为数据源名
String Username="username"; //用户名
String Password="password"; //密码
Class.forName(Driver).newInstance();
Connection con=DriverManager.getConnection(URL,Username,Password);
```

#### 9. 连接Excel文件 

```java
Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
String url = "jdbc:odbc:driver={Microsoft Excel Driver (*.xls)};DBQ=D:\\myDB.xls"; // 不设置数据源
String user="myuser";
String password="mypassword";
Connection conn= DriverManager.getConnection(url,user,password);
Statement stmtNew=conn.createStatement();
```



## Web

### SpringBoot搭建Web项目

https://blog.csdn.net/sou_time/article/details/79641476

https://blog.csdn.net/m0_38001814/article/details/87976967

https://www.cnblogs.com/renlywen/p/13524183.html

https://www.cnblogs.com/vitasyuan/p/8765329.html

#### 1.文件->新建->项目

![1629246675925](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917357.png)

![1629246690575](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917352.png)

![1629246718757](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917404.png)

![1629246739156](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917366.png)

![1629246778247](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917355.png)

#### 2.删除3个无用的文件

![1629246841075](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917347.png)

#### 3.新建一个HelloWord

![1629247077799](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917123.png)

```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController@RequestMapping("/hello")
public class HelloController {
    @RequestMapping("/say")
    public String sayHello () {
        return "hello world";
    }
}
```

#### 4.运行程序

![1629247117507](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917163.png)

![1629247182991](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917213.png)

![1629247198288](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917128.png)

#### 5.实现一个稍微复杂一点的程序

新建`Response`,`UserController`

![1629247391158](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917139.png)

`Response`代码如下

```java
package com.example.demo;

public class Response<T> {

    /**
     * 接口响应代码
     */
    private int code = 200;

    /**
     * 接口访问信息
     */
    private String message = "Success";

    private T data;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Response{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}
```

`UserController`代码如下

```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Response;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    //http://localhost:8080/demo/user/getInfo?age=2
    @RequestMapping(method = RequestMethod.GET,value="/getInfo")
    public Response<Map<String, Object>> get(String age){
        Response<Map<String, Object>> response = new Response<>();
        Map<String, Object> user = new HashMap<>();
        user.put("name", "demo");
        user.put("age", age);
        response.setData(user);
        return  response;
    }
}

```

重启服务器

![1629247712404](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917095.png)

#### 6.访问HTML页面

##### （1）新建html文件`resources/static/pages/index.html`

![1629247922150](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917748.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div>我是一个html</div>
</body>
</html>
```



##### （2）新建PagesController

![1629248118777](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917751.png)



```java
package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pages")
public class PagesController {
    @RequestMapping("/index")
    public String index () {
        return "index";
    }
}
```

需要注意的是`@RestController`需要改为`@Controller`

##### （3）配置application.properties

![1629248335897](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917753.png)

```
#html页面在static下的路径
spring.mvc.view.prefix=/pages/
#html后缀
spring.mvc.view.suffix=.html
```

##### （4）重启服务器后访问网页

![1629248392973](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917688.png)

#### 7.配置端口和服务环境路径

还是在application.properties里面配置

```
#端口号
server.port=8080
#服务环境路径
server.servlet.context-path=/demo

```

![1629248699974](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917675.png)

![1629248715968](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917770.png)

#### 8.实现HTML与后端交互

##### （1）添加`static/pages/user/showInfo.html`页面

![1629249977146](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917214.png)



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>用户信息</title>
</head>
<body>
<label>姓名：</label><label id="name"></label><br/>
<label>年龄：</label><label id="age"></label>
<script>
    var xhr=new XMLHttpRequest();
    xhr.open("GET","../../user/getInfo?age=2",true);
    xhr.onload=function(){
        if(xhr.status==200)
        {
            result=JSON.parse(xhr.responseText);
            document.getElementById("name").innerHTML=result.data.name;
            document.getElementById("age").innerHTML=result.data.age;
        }else{
            alert("获取用户信息失败！");
        }
    }
    xhr.onerror=function(){
        alert("获取用户信息失败！");
    }
    xhr.send();
</script>
</body>
</html>

```

##### （2）在PageController中添加新路径

![1629250025289](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917333.png)

```java
    @RequestMapping("/user/showInfo")
    public String showInfo () {
        return "user/showInfo";
    }

```

##### （3）重启服务器访问网址

![1629250225807](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917183.png)

### 项目打包发布

https://www.cnblogs.com/sanjay/p/11828081.html

https://blog.csdn.net/qq_35526165/article/details/112203197

https://blog.csdn.net/weixin_37778823/article/details/84560894

https://www.cnblogs.com/hellxz/p/8767841.html

https://blog.csdn.net/qq_44241551/article/details/106329723

https://www.cnblogs.com/sanjay/p/11828081.html

https://blog.csdn.net/sunxj1222/article/details/90376447

#### 1.打开项目结构

![1629251737256](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917095.png)



#### 2.添加构件

![1629251766227](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917297.png)

![1629251789842](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917319.png)

![1629251797575](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917800.png)

![1629251825374](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917787.png)

![1629251847989](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917880.png)

  然后一路点击ok，返回代码编辑后，左边的项目目录会出现一个名为：META-INF的文件夹，里面的文件，就是你的项目依赖的第三方包的路径 

![1629251874835](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917812.png)



#### 3.打包

![1629252385463](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917833.png)





![1629252401511](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917465.png)



![1629252428767](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917335.png)

#### 4.运行



### maven打包



#### 1.在pom.xml中添加插件

![1629250630441](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917731.png)

```xml
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-resources-plugin</artifactId>
                <version>3.0.2</version>
            </plugin>

```

#### 2.maven->package

![1629250687130](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917363.png)

![1629250715425](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917584.png)

#### 3.修改为war包

![1629250824319](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917805.png)



```xml
  <packaging>war</packaging>
  <!-- 默认是jar -->
  <packaging>jar</packaging>

```

#### 4.执行package

![1629250909071](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917000.png)

#### 5.运行

![1629253156015](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917997.png)

![1629253164514](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917240.png)

![1629253219923](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917255.png)

#### 6.部署到tomcat

https://blog.csdn.net/h_xiao_x/article/details/107012738



部署到tomcat会报404错误

 ![image-20200628154955707](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917427.png) 

##### （1）排除 spring的tomcat 

![1629255288122](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917485.png)



```xml
            <exclusions>
                <exclusion>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-tomcat</artifactId>
                </exclusion>
            </exclusions>

```

##### （2） Application继承 SpringBootServletInitializer 

![1629255347228](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917729.png)

##### （3）添加SpringBootServletInitializer 的引用

```java
        <!-- https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>

```

##### （4）重新打包部署到tomcat

## 应用程序

### javaFX搭建项目

https://www.bootwiki.com/javafx/javafx-tutorial-for-beginners.html

#### 1.文件->新建->项目

![1629273361022](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917726.png)

![1629273413191](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917818.png)

#### 2.运行

![1629273477237](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917954.png)

![1629273490078](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917260.png)

#### 3.配置Scene Builder

https://blog.csdn.net/u011781521/article/details/86632482

##### （1）下载安装

 https://www.oracle.com/technetwork/java/javase/downloads/javafxscenebuilder-1x-archive-2199384.html  

##### （2）右键fxml->在SceneBuilder中打开

![1629273608655](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917352.png)

##### （3）配置SceneBuilder.exe路径

#### 4.图形化界面设计

![1629273697629](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917369.png)

#### 5.再次运行

![1629273725300](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917456.png)



### spring+javafx

#### 1.文件->新建->项目

![1629276906320](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917439.png)

![1629276929961](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917661.png)

![1629276940041](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917829.png)

![1629276956192](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917803.png)

![1629277016673](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917037.png)

#### 2.添加jar引用

```xml
        <!-- https://mvnrepository.com/artifact/de.roskenet/springboot-javafx-support -->
        <dependency>
            <groupId>de.roskenet</groupId>
            <artifactId>springboot-javafx-support</artifactId>
            <version>2.1.6</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/de.roskenet/springboot-javafx-test -->
        <dependency>
            <groupId>de.roskenet</groupId>
            <artifactId>springboot-javafx-test</artifactId>
            <version>1.3.0</version>
        </dependency>

```

#### 3.新建fxml文件

![1629277447569](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917030.png)



```xml
<?xml version="1.0" encoding="UTF-8"?>

<?import java.lang.*?>
<?import java.util.*?>
<?import javafx.scene.*?>
<?import javafx.scene.control.*?>
<?import javafx.scene.layout.*?>

<AnchorPane xmlns="http://javafx.com/javafx"
            xmlns:fx="http://javafx.com/fxml"
            fx:controller="com.example.demo.controller.MainLoginController"
            prefHeight="400.0" prefWidth="600.0">

</AnchorPane>


```

views.MainLogin改为com.example.demo.controller.MainLoginController

#### 4.新建MainLoginController文件

```java
package com.example.demo.controller;

import de.felixroske.jfxsupport.FXMLController;
import javafx.fxml.Initializable;

import java.net.URL;
import java.util.ResourceBundle;

@FXMLController
public class MainLoginController implements Initializable {
    @Override
    public void initialize(URL location, ResourceBundle resources) {

    }
}

```

#### 5.新建views.MainLogin.java文件

![1629277785646](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010918081.png)



```java
package com.example.demo.view;

import de.felixroske.jfxsupport.AbstractFxmlView;
import de.felixroske.jfxsupport.FXMLView;

@FXMLView(value = "/views/MainLogin.fxml")
public class MainLogin extends AbstractFxmlView {
}

```

这样一个窗体的3个文件都创建完毕了，依赖顺序是 views.MainLogin.java->views.MainLogin.fxml->controller.MainLoginController.java

#### 6.启动窗口

修改DemoApplication代码

```java
package com.example.demo;

import com.example.demo.views.MainLogin;
import de.felixroske.jfxsupport.AbstractJavaFxApplicationSupport;
import javafx.stage.Stage;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication extends AbstractJavaFxApplicationSupport {
    public static void main(String[] args) {
        launch(DemoApplication.class, MainLogin.class, args);
    }

    @Override
    public void start(Stage stage) throws Exception {
        super.start(stage);
    }
}

```

#### 7.运行程序

![1629278069115](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917269.png)

#### 8.界面布局并绑定事件

MainLogin.fxml

```xml
<?xml version="1.0" encoding="UTF-8"?>

<?import java.lang.*?>
<?import java.util.*?>
<?import javafx.scene.*?>
<?import javafx.scene.control.*?>
<?import javafx.scene.layout.*?>


<AnchorPane prefHeight="400.0" prefWidth="600.0" xmlns="http://javafx.com/javafx/8" xmlns:fx="http://javafx.com/fxml/1" fx:controller="com.example.demo.controller.MainLoginController">
    <children>
        <TextField id="userNameField" layoutX="190.0" layoutY="69.0" />
        <TextField id="passwordField" layoutX="190.0" layoutY="124.0" />
        <Button id="registerBut" layoutX="153.0" layoutY="200.0" mnemonicParsing="false" text="注册" onAction="#register" />
        <Button id="loginBut" layoutX="273.0" layoutY="200.0" mnemonicParsing="false" text="登录" onAction="#login" />
        <Label layoutX="122.0" layoutY="73.0" text="用户名" />
        <Label layoutX="122.0" layoutY="128.0" text="密码" />
    </children>
</AnchorPane>

```

MainLoginController

```java
package com.example.demo.controller;

import de.felixroske.jfxsupport.FXMLController;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

import java.net.URL;
import java.util.ResourceBundle;

@FXMLController
public class MainLoginController implements Initializable {
    @FXML
    private TextField userNameField;
    @FXML
    private Button registerBut;
    @FXML
    private Button loginBut;
    @FXML
    private PasswordField passwordField;

    @FXML
    void login(ActionEvent event) {
        System.out.println("login");
        //这里编写业务逻辑
    }

    @FXML
    void register(ActionEvent event) {
        System.out.println("register");
        //这里编写业务逻辑
    }

    @Override
    public void initialize(URL location, ResourceBundle resources) {

    }
}

```

#### 9.重新运行程序点击登录



![1629278323993](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917403.png)

#### 10.打包运行jar

![1629278492138](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917609.png)



```
H:
cd H:\Java学习\demo\target
java -jar demo-0.0.1-SNAPSHOT.jar
```

![1629278509916](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917520.png)

#### 11.打包成exe

https://blog.csdn.net/sd4015700/article/details/29176905

https://blog.csdn.net/chujie1920/article/details/100674439

https://www.cnblogs.com/cherylwu/p/8642307.html

https://github.com/lukaszlenart/launch4j-maven-plugin/blob/master/src/main/resources/README.adoc

java.lang.NoClassDefFoundError错误

##### https://blog.csdn.net/zhuimeng_by/article/details/88952026



### 设置图标，标题

```java
    public void start(Stage stage) throws Exception {
        StackPane root = new StackPane();

        // set icon
        stage.getIcons().add(new Image("/path/to/stackoverflow.jpg"));
        stage.setTitle("Wow!! Stackoverflow Icon");
        stage.setScene(new Scene(root, 300, 250));
        stage.show();
    }
```



## 控制台程序

### spring

#### 1.文件-新建-项目

![1629789193860](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917952.png)

![1629789207668](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917063.png)

![1629789223599](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917909.png)

![1629789233142](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917427.png)

![1629789249445](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010917499.png)

#### 2.修改DemoApplication

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

改为

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);

        for(int i=0;i<args.length;i++)
        {
            System.out.println(args[i]);
        }
    }
}
```

