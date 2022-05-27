# Java



## Maven

### 资源

https://blog.csdn.net/zflovecf/article/details/80831467

### 安装

   在安装maven之前必须保证计算机已经安装和配置好了jdk环境，然后从官网上下载想要安装的maven版本 http://maven.apache.org/download.cgi，这里我安装的maven 3.3.9。然后根据自己的安装路径配置环境变量，具体的新建系统变量MAVEN_HOME，并设置为安装的maven路径，如下图：

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271137516.png) 

最后，在系统变量Path加上 ;%MAVEN_HOME%\bin。之后，在命令行中输入mvn -version 判断是否安装成功，如果出现如下界面证明安装成功。

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271137906.png) 

   上述步骤完成后就可以开始使用maven了，但是maven默认将仓库放在用户的临时文件夹下的 /m2/repository下，但是为了方便管理可以通过设置conf 文件 夹 下的setting.xml文件下`<localRepository></localRepository>`节点来自定义本地仓库内容。我再E盘重新建立本地仓库文件夹E:/m2/repository,并设置了setting.xml文件：`<localRepository>E:/m2/repository</localRepository>`。

   这样，我们就完成了maven的安装配置及自定义本地仓库的位置，在命令行中输入mvn help:system，可以看到本地maven为我们从中央仓库中下载了一些文件到本地仓库中。



###  eclipse中配置maven 

eclipse是我们熟悉的IDE，可以直接通过下载m2eclipse插件来完成maven的安装及配置，这种方式不便利maven的管理及使用。本人推荐使用本地安装maven后在eclipse中进行配置。具体的完成（1）中所有操作确定maven安装配置正确后，首先在eclipse->Window->Preferences->Maven->Installations中添加maven，如 下图：

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271138006.png)

然后在eclipse->Window->Preferences->Maven->User Settings中设置本地仓库及对应setting.xml文件位置，具体如下（我拷贝一份了setting.xml文件到本地仓库m2文件夹下，用来说明这是针对该仓库的设置，也可以直接使用maven安装文件下的setting.xml文件）：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271138025.png)





以上就完成了eclipse配置本地安装的maven环境，如果在eclipse中Window->Preferences没有出现maven插件选项，可以参考博客http://blog.csdn.net/truong/article/details/37834053 来解决问题。

###  maven常用命令 

 本节介绍几个maven常用的命令，以备遗忘时可以查看。

mvn -version         查看maven的版本及配置信息

mvn archetype:create  -DgroupId=   DartifactId=   构建java项目

mvn archetype:create  -DgroupId=   DartifactId=   -DarchetypeArtifactId=maven-archetype-webapp 创建web项目

mvn compile         编译项目代码

mvn package        打包项目

mvn package -Dmaven.test.skip=true  打包项目时跳过单元测试

mvn test            运行单元测试

mvn clean           清除编译产生的target文件夹内容，可以配合相应命令一起使用，如mvn clean package， mvn clean test

mvn install          打包后将其安装在本地仓库

mvn deploy          打包后将其安装到pom文件中配置的远程仓库

mvn eclipse:eclipse    将maven生成eclipse项目结构

mvn eclipse:clean     清除maven项目中eclipse的项目结构

mvn site            生成站点目录

mvn dependency:list    显示所有已经解析的所有依赖

mvn dependency:tree   以树的结构展示项目中的依赖

mvn dependency:analyze  对项目中的依赖进行分析，依赖未使用，使用单未引入

mvn tomcat:run        启动tomcat



###  **maven中pom文件** 

pom文件是maven中最重要的文件，以上命令的也需要根据pom文件进行运行。一般在构建完maven项目后需要修改pom文件添加诸如依赖关系，打包机制及一些项目的详细信息。一般的pom包含如下一些基本的信息：

groupId:项目或者组织的唯一标志

artifactId:项目的名称

version:项目的版本

packaging:打包机制

name:用户描述项目的名称

url:应该是只是写明开发团队的网站

其中groupId,artfactId及version是所有的pom文件必须拥有的。除了这些基本信息外就是pom的依赖，集成，合成关系，插件，构建信息的一些声明，这里不进行详细介绍，下面给出一个简单的pom文件示例如下：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271138952.png)

   以上



## JAVA新版腾讯短信Demo-API3.0

转自:https://blog.csdn.net/helloWorld_ma/article/details/106058548

### 通知升级

![20200511172300279](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271136710.png)

### maven依赖

```xml
<dependency>
    <groupId>com.tencentcloudapi</groupId>
    <artifactId>tencentcloud-sdk-java</artifactId>
    <version>3.1.48</version>
</dependency>
```

### 工具类

```java
import com.tencentcloudapi.common.Credential;
import com.tencentcloudapi.common.profile.ClientProfile;
import com.tencentcloudapi.common.profile.HttpProfile;
import com.tencentcloudapi.sms.v20190711.SmsClient;
import com.tencentcloudapi.sms.v20190711.models.SendSmsRequest;
import com.tencentcloudapi.sms.v20190711.models.SendSmsResponse;

public class TencentSmsUtil {
	// 在 账号中心--访问管理 -- 访问密钥 -- API密钥管理
    final static String secretId = "1111111111111111111111111111";
    final static String secretKey = "1111111111111111111111111111";

    public static void sendSms(SendSmsRequest req){
        try {
            /* 必要步骤：
             * 实例化一个认证对象，入参需要传入腾讯云账户密钥对secretId，secretKey。
             * 这里采用的是从环境变量读取的方式，需要在环境变量中先设置这两个值。
             * 你也可以直接在代码中写死密钥对，但是小心不要将代码复制、上传或者分享给他人，
             * 以免泄露密钥对危及你的财产安全。
             * CAM密匙查询: https://console.cloud.tencent.com/cam/capi*/
            Credential cred = new Credential(secretId, secretKey);
            // 实例化一个http选项，可选，没有特殊需求可以跳过
//            HttpProfile httpProfile = new HttpProfile();
//             设置代理
//            httpProfile.setProxyHost("host");
//            httpProfile.setProxyPort(port);
//            /* SDK默认使用POST方法。
//             * 如果你一定要使用GET方法，可以在这里设置。GET方法无法处理一些较大的请求 */
//            httpProfile.setReqMethod("POST");
//            /* SDK有默认的超时时间，非必要请不要进行调整
//             * 如有需要请在代码中查阅以获取最新的默认值 */
//            httpProfile.setConnTimeout(60);
//            /* SDK会自动指定域名。通常是不需要特地指定域名的，但是如果你访问的是金融区的服务
//             * 则必须手动指定域名，例如sms的上海金融区域名： sms.ap-shanghai-fsi.tencentcloudapi.com */
//            httpProfile.setEndpoint("sms.tencentcloudapi.com");

            /* 非必要步骤:
             * 实例化一个客户端配置对象，可以指定超时时间等配置 */
            ClientProfile clientProfile = new ClientProfile();
            /* SDK默认用TC3-HMAC-SHA256进行签名
             * 非必要请不要修改这个字段 */
            clientProfile.setSignMethod("HmacSHA256");
//            clientProfile.setHttpProfile(httpProfile);
            /* 实例化要请求产品(以sms为例)的client对象
             * 第二个参数是地域信息，可以直接填写字符串ap-guangzhou，或者引用预设的常量 */
            SmsClient client = new SmsClient(cred, "",clientProfile);
            /* 实例化一个请求对象，根据调用的接口和实际情况，可以进一步设置请求参数
             * 你可以直接查询SDK源码确定接口有哪些属性可以设置
             * 属性可能是基本类型，也可能引用了另一个数据结构
             * 推荐使用IDE进行开发，可以方便的跳转查阅各个接口和数据结构的文档说明 */

            SendSmsResponse res = client.SendSms(req);

            // 输出json格式的字符串回包
            System.out.println(SendSmsResponse.toJsonString(res));

            // 也可以取出单个值，你可以通过官网接口文档或跳转到response对象的定义处查看返回字段的定义
            System.out.println(res.getRequestId());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### 调用

```java
			 SendSmsRequest req = new SendSmsRequest();
            /* 填充请求参数,这里request对象的成员变量即对应接口的入参
             * 你可以通过官网接口文档或跳转到request对象的定义处查看请求参数的定义
             * 基本类型的设置:
             * 帮助链接：
             * 短信控制台: https://console.cloud.tencent.com/sms/smslist
             * sms helper: https://cloud.tencent.com/document/product/382/3773 */

            /* 短信应用ID: 短信SdkAppid在 [短信控制台] 添加应用后生成的实际SdkAppid，示例如1400006666 */
            String appid = "11111111";
            req.setSmsSdkAppid(appid);

            /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，签名信息可登录 [短信控制台] 查看 */
            String sign = "签名内容";
            req.setSign(sign);

            /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
            String senderid = "xxx";
            req.setSenderId(senderid);

            /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
            String session = "xxx";
            req.setSessionContext(session);

            /* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
            String extendcode = "xxx";
            req.setExtendCode(extendcode);

            /* 模板 ID: 必须填写已审核通过的模板 ID。模板ID可登录 [短信控制台] 查看 */
            String templateID = "400000";
            req.setTemplateID(templateID);

            /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
             * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
            String[] phoneNumbers = {"+8621212313123", "+8612345678902", "+8612345678903"};
            req.setPhoneNumberSet(phoneNumbers);

            /* 模板参数: 若无模板参数，则设置为空*/
            String[] templateParams = {"5678"};
            req.setTemplateParamSet(templateParams);

            /* 通过 client 对象调用 SendSms 方法发起请求。注意请求方法名与请求对象是对应的
             * 返回的 res 是一个 SendSmsResponse 类的实例，与请求对象对应 */

			//调用发送
            TencentSmsUtil.sendSms(req);
```