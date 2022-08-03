### 1.REST安全性

除了提供保护OWS样式服务的功能外，GeoServer还支持保护RESTful服务。

与层和服务安全性一样，RESTful安全性配置也基于`security_roles`。请求URI到角色的映射是在GeoServer数据目录`rest.properties`的`security`目录下名为的文件中定义的。

#### 1.1.语法

以下语法定义了RESTful服务的访问控制规则（括号[]中的参数是可选的）：

```
uriPattern;method[,method,...]=role[,role,...]
```

参数为：

- **uriPattern** —与一组请求URI匹配的[ant模式](https://docs.geoserver.org/stable/en/user/security/rest.html#security-rest-ant-patterns)
- **方法**-HTTP请求的方法，中的一个`GET`，`POST`，`PUT`，`POST`，`DELETE`，或`HEAD`
- **角色**-预定义角色的名称。通配符“ *”用于指示权限已应用于所有用户，包括匿名用户。

笔记

- URI模式应占其余路径的第一成分，通常`rest`或`api`
- 方法和角色列表应该**不**包含任何空格

#### 1.2.蚂蚁模式

 Ant模式通常用于模式匹配目录和文件路径。该[示例](https://docs.geoserver.org/stable/en/user/security/rest.html#security-rest-examples)部分包含了一些基本的说明。Apache ant[用户手册](http://ant.apache.org/manual/dirtasks.html)包含更复杂的用例。 

#### 1.3.例子

 本节中的大多数示例都是特定于GeoServer [REST的，](https://docs.geoserver.org/stable/en/user/rest/index.html#rest)但是可以以相同的方式配置任何RESTful GeoServer服务。 

#### 1.3.1.只允许认证访问

最安全的配置是强制对任何请求进行身份验证的配置。以下示例锁定对所有请求的访问：

```
/**;GET,POST,PUT,DELETE=ROLE_ADMINISTRATOR
```

较少限制的配置将锁定对路径下操作的访问`/rest`，但将允许匿名访问其他路径下的请求（例如`/api`）：

```
/rest/**;GET,POST,PUT,DELETE=ROLE_ADMINISTRATOR
```

以下配置与上一个配置类似，不同之处在于它授予对特定角色（而非管理员）的访问权限：

```
/**;GET,POST,PUT,DELETE=ROLE_TRUSTED
```

 `ROLE_TRUSTED`是在中定义的角色`users.properties`。 

#### 1.3.2.提供了匿名的只读访问

下面的配置允许当匿名访问`GET`被使用（读出）方法为一个，但力认证`POST`，`PUT`或`DELETE`（写）：

```
/**;GET=IS_AUTHENTICATED_ANONYMOUSLY
/**;POST,PUT,DELETE=TRUSTED_ROLE
```

#### 1.3.3.保护特定资源

以下配置强制进行身份验证以访问特定资源（在这种情况下为功能类型）：

```
/rest/**/states*;GET=TRUSTED_ROLE
/rest/**;POST,PUT,DELETE=TRUSTED_ROLE
```

以下内容可确保对一组资源（在本例中为所有数据存储）的访问：

```
/rest/**/datastores/*;GET=TRUSTED_ROLE
/rest/**/datastores/*.*;GET=TRUSTED_ROLE
/rest/**;POST,PUT,DELETE=TRUSTED_ROLE
```