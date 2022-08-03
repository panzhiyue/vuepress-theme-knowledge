### 1.Key验证模块

`authkey`GeoServer的模块允许为OGC客户端设计一个非常简单的身份验证协议，该协议不能处理任何类型的安全协议，甚至不能处理HTTP基本身份验证。

对于这些客户端，该模块通过在URL中附加用作唯一身份验证令牌的唯一密钥，从而允许进行最小程度的身份验证。显然，这种方法对安全令牌嗅探是开放的，并且必须始终与HTTPS连接的使用相关联。

经过身份验证的请求示例如下所示：

```
http://localhost:8080/geoserver/topp/wms?service=WMS&version=1.3.0&request=GetCapabilities&authkey=ef18d7e7-963b-470f-9230-c7f9de166888
```

凡`authkey=ef18d7e7-963b-470f-9230-c7f9de166888`被（后面有更多此）关联到一个特定的用户。功能文档包含到服务器本身的反向链接，链接到可用于执行GetMap，GetFeatureInfo等的URL。当`authkey`设置参数的反向链接将包含身份验证密钥，以及，让任何兼容WMS客户端访问受保护的资源。

#### 1.1.局限性

该`authkey`模块旨在与OGC服务一起使用。它不能与管理GUI或RESTConfig一起正常使用。

#### 1.2.主要供应商

 密钥提供者负责将身份验证密钥映射到用户。身份验证密钥本身是UUID（通用唯一标识符）。密钥提供者需要用户/组服务，并且它负责将身份验证密钥与该服务中包含的用户进行同步。 

#### 1.3.使用用户属性主要提供商

该密钥提供者使用用户属性`UUID`将身份验证密钥映射到用户。用户属性存储在用户/组服务中。同步很简单，因为逻辑必须搜索不具有该属性的用户`UUID`并将其添加。该属性值是生成的UUID。

> UUID = b52d2068-0a9b-45d7-aacc-144d16322018

如果用户/组服务是只读的，则必须从外部添加该属性，因此无法进行同步。

#### 1.4.使用属性文件主要提供商

此密钥提供者使用名为的属性文件`authkeys.properties`。默认的用户/组服务名为`default`。在`authkeys.properties`这项服务将设在

```
$GEOSERVER_DATA_DIR/security/usergroup/default/authkeys.propeties
```

示例文件如下所示：

```
# Format is authkey=username
b52d2068-0a9b-45d7-aacc-144d16322018=admin
1825efd3-20e1-4c18-9648-62c97d3ee5cb=sf
ef18d7e7-963b-470f-9230-c7f9de166888=topp
```

该密钥提供程序还适用于只读用户/组服务。同步将添加在此文件中没有条目的新用户，并删除在用户/组服务中删除的用户的条目。

#### 1.5.使用外部Web服务的密钥提供者

该密钥提供者调用外部URL，以将身份验证密钥映射到用户。这使GeoServer可以集成到现有的安全基础架构中，其中会话令牌在应用程序之间共享并通过专用的Web服务进行管理。

可以指定Web服务URL和其他一些参数来详细配置映射器：

| **选项**                                              | **描述**                                                     |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| `Web Service URL, with key placeholder`               | 密钥映射Web服务的完整URL，带有特殊的占位符（{key}），该占位符将被当前的身份验证密钥替换 |
| `Web Service Response User Search Regular Expression` | 用于从网络服务响应中提取用户名的正则表达式；正则表达式中的第一个匹配组（括号中的部分）将用作用户名；默认（^ \ s *（。*）\ s * $）接受所有响应文本，在两端修剪空格 |
| `Connection Timeout`                                  | 连接到Web服务超时                                            |
| `Read Timeout`                                        | 从Web服务读取数据的超时                                      |

映射器将使用HTTP GET请求调用Web服务（尚不支持要求POST的Web服务），将配置的URL中的{key}占位符替换为实际的身份验证密钥。

如果收到响应，则使用配置的正则表达式对其进行解析，以从中提取用户名。新行将自动从响应中删除。可以使用的一些正则表达式示例如下：

| **正则表达式**                       | **用法**                                          |
| ------------------------------------ | ------------------------------------------------- |
| `^\s*(.*)\s*$`                       | 两端的所有文本修剪空格                            |
| `^.*?\"user\"\s*:\s*\"([^\"]+)\".*$` | json响应，其中用户名包含在名为**user**的属性中    |
| `^.*?(.*?).*$`                       | xml响应，其中用户名包含在名为**username**的标记中 |

 该映射器不支持将用户与用户/组服务同步。 

#### 1.6.AuthKEY WebService正文响应用户组服务

当使用外部Web服务获取Auth详细信息时，可以定义一个自定义程序，该自定义程序可以从HTTP正文响应中获取Authorities（也称为用户的Roles）。`GeoServer UserGroup Service`

基本原理基本相同。为了获取可用权限列表，这种方法将对主体响应应用“角色正则表达式”（可以是XML，JSON或纯文本/ HTML）。`GeoServer UserGroup Service``rolesRegex`

为此，可以配置**AuthKEY WebService主体响应**用户组服务的实例。

首先要做的是：

1. 作为登录 `Administrator`

2. 移到`Security`> ，并选择从`Users, Groups, Roles``Add new``User Group Services`

   ![../../_images/001_user_group_service.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021038488.png)

3. 点击 `AuthKEY WebService Body Response`

   ![../../_images/002_user_group_service.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021038490.png)

4. 提供一个，`Name`然后从中选择所需的任何内容`Passwords`-该服务不会使用这些内容，但对于GeoServer仍然是必选的-

   ![../../_images/003_user_group_service.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021038491.png)

5. 提供适用于您的Web服务响应的信息`Roles Regex`

   笔记:这是唯一要提供的实际强制性值。其他是可选的，将允许您自定义用户组服务行为（请参见下文）

   ![../../_images/004_user_group_service.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021038492.png)

新配置完成后，可以轻松地将其链接到。`GeoServer UserGroup Service``Key Provider Web Service Mapper`

1. 从`Authentication`> ，选择-或添加新-使用的关键映射器`Authentication Filters``AuthKEY``Web Service`

2. 选择新定义并保存`UserGroup Service`

   ![../../_images/005_user_group_service.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021038493.png)

**其他选项**

1. *Web服务响应中可用组的可选静态逗号分隔列表*

   值得注意的是，这将**始终**以以下形式转换获取的角色`UserGroup Service``ROLE_`

   例如，如果将匹配以下内容：`Roles Regular Expression`

   ```
   my_user_role1, another_custom_user_role, role_External_Role_X
   ```

   这将转换为**3个**不同的名称，分别为：`GeoServer User Roles`

   ```
   ROLE_MY_USER_ROLE1
   ROLE_ANOTHER_CUSTOM_USER_ROLE
   ROLE_EXTERNAL_ROLE_X
   ```

   当然，角色名称仅在运行时才知道；但是，可以**静态**指定关联，以便稍后映射到其他内部对象。`GeoServer User Groups``GeoServer User Roles`

   这是什么意思？阿可以在GeoServer的目录来定义，并且可以通过将活性被映射到一个或多个特定。`GeoServer User Group``Role Services``GeoServer User Roles`

   这主要取决于您使用。默认情况下，内部人员可以通过存储在GeoServer Data Dir上的静态配置来映射角色和组。这可以通过在面板中编辑详细信息来实现`GeoServer Role Service``GeoServer Role Service``GeoServer User Group``Users, Groups, and Roles`

   ![../../_images/006_user_group_service.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021038494.png)

   ![../../_images/007_user_group_service.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021038495.png)

   现在，这个自定义动态映射到如下：`UserGroup Service``GeoServer User Role``GeoServer User Group`

   ```
   ROLE_MY_USER_ROLE1              <> GROUP_MY_USER_ROLE1
   ROLE_ANOTHER_CUSTOM_USER_ROLE   <> GROUP_ANOTHER_CUSTOM_USER_ROLE
   ROLE_EXTERNAL_ROLE_X            <> GROUP_EXTERNAL_ROLE_X
   ```

   为了能够将任何内容分配给其他内部对象，因为它们仅在运行时才知道，因此允许我们**静态地**指定Web服务可以使用的内部对象；可以通过设置以下选项来实现：`GeoServer User Group``GeoServer User Roles``UserGroup Service``GeoServer User Groups``Optional static comma-separated list of available Groups from the Web Service response`

   ![../../_images/008_user_group_service.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021038496.png)

   一旦正确配置，就可以使用标准方法来编辑和分配给组`GeoServer User Roles`

   ![../../_images/009_user_group_service.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021038497.png)

2. *使用的角色服务*

   默认情况下，如果未指定，则将使用来从-解析-如上所指定-`Role Service``UserGroup Service``GeoServer Active Role Service``GeoServer User Roles``GeoServer User Groups`

   ![../../_images/010_user_group_service.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021038498.png)

   可以定义a代替使用，来替代；只需在选项中选择即可使用`Custom Role Service``GeoServer User Roles``Role Service``Role Service to use`

   ![../../_images/011_user_group_service.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021038499.png)

#### 1.7.配置

可以使用管理员GUI进行配置。有一种名为**authkey**的新型身份验证过滤器，提供以下选项。

1. URL参数名称。这是客户端HTTP请求中使用的URL参数的名称。默认值为`authkey`。
2. 密钥提供者。GeoServer提供上述提供商。
3. 要使用的用户/组服务。

一些关键提供程序可能需要其他配置参数。当选择其中的一个，这些将主要供应商组合框下出现。

配置过滤器后，有必要将此过滤器放在身份验证过滤器链上。

笔记:该过滤器的管理员GUI具有“**同步”**按钮。单击此按钮将保存当前配置并触发同步。如果在后备用户/组服务中添加/删除了用户，则应触发同步逻辑。

#### 1.8.提供者可插拔性

使用某些Java编程，可以以编程方式创建和注册新的密钥到使用不同逻辑的用户名映射器。例如，您可能有每日令牌，令牌生成器等。

为了提供您的自定义映射器，您必须实现`org.geoserver.security.AuthenticationKeyMapper` 接口，然后在Spring应用程序上下文中注册所述bean。另外，也可以从继承子类`org.geoserver.security.AbstractAuthenticationKeyMapper`。映射器（密钥提供者）必须实现

```java
/**
 *
 * Maps a unique authentication key to a username. Since usernames are
 * unique within a {@link GeoServerUserGroupService} an individual mapper
 * is needed for each service offering this feature.
 *
 * @author Andrea Aime - GeoSolution
 */
public interface AuthenticationKeyMapper extends BeanNameAware {

    /**
     * Maps the key provided in the request to the {@link GeoServerUser} object
     * of the corresponding user, or returns null
     * if no corresponding user is found
     *
     * Returns <code>null</code> if the user is disabled
     *
     * @param key
     * @return
     */
    GeoServerUser getUser(String key) throws IOException;

    /**
     * Assures that each user in the corresponding {@link GeoServerUserGroupService} has
     * an authentication key.
     *
     * returns the number of added authentication keys
     *
     * @throws IOException
     */
    int synchronize() throws IOException;

    /**
     * Returns <code>true</code> it the mapper can deal with read only u
     * user/group services
     *
     * @return
     */
    boolean supportsReadOnlyUserGroupService();

    String getBeanName();

    void setUserGroupServiceName(String serviceName);
    String getUserGroupServiceName();

    public GeoServerSecurityManager getSecurityManager();
    public void setSecurityManager(GeoServerSecurityManager securityManager);

 }
```

映射器必须在Spring应用程序上下文中的`applicationContext.xml` jar根目录中的文件中注册。名为的实现示例`com.mycompany.security.SuperpowersMapper`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE beans PUBLIC "-//SPRING//DTD BEAN//EN" "http://www.springframework.org/dtd/spring-beans.dtd">
<beans>
  <bean id="superpowersMapper" class="com.mycompany.security.SuperpowersMapper"/>
</beans>
```

此时，您可以将`authkey`jar和您的自定义映射器jar放在一起，并在身份验证密钥过滤器的管理员GUI中使用它。