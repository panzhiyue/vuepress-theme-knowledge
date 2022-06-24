## WCF

### 简介

 Windows Communication Foundation (WCF) 是一个框架，用于生成面向服务的应用程序。它取代了较旧的进程间通信技术，例如 ASMX Web 服务、.NET 远程处理、企业服务 (DCOM) 和 MSMQ。 WCF 将所有这些技术的功能汇集在一个统一的编程模型下，简化了开发分散式应用程序的体验。 使用 WCF，可以将数据作为异步消息从一个服务终结点发送到另一个服务终结点。 服务终结点可以是由 IIS 承载的持续可用的服务的一部分，也可以是应用程序中承载的服务。 终结点可以是从服务终结点请求数据的服务客户端。 简单消息可以是作为 XML 发送的单个字符或单个单词，复杂消息可以是二进制数据流。 

### 创建WCF服务

 如果发现找不到wcf项目，这时你需要去安装Visual Studio 的**Windows Communication Foundation**组件 

1.创建过程如下

![1625557744199](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210911173.png)

![1625560968492](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210911175.png)

![1625561024155](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210911176.png)



2.项目创建成功后，会自动生成的一些演示文件 

![1625561055185](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210911176.png)

 IService1.cs 

```c#
namespace WcfService1
{
    // 注意: 使用“重构”菜单上的“重命名”命令，可以同时更改代码和配置文件中的接口名“IService1”。
    [ServiceContract]
    public interface IService1
    {

        [OperationContract]
        string GetData(int value);

        [OperationContract]
        CompositeType GetDataUsingDataContract(CompositeType composite);

        // TODO: 在此添加您的服务操作
    }


    // 使用下面示例中说明的数据约定将复合类型添加到服务操作。
    [DataContract]
    public class CompositeType
    {
        bool boolValue = true;
        string stringValue = "Hello ";

        [DataMember]
        public bool BoolValue
        {
            get { return boolValue; }
            set { boolValue = value; }
        }

        [DataMember]
        public string StringValue
        {
            get { return stringValue; }
            set { stringValue = value; }
        }
    }
}
```

 Service1.cs 

```c#
namespace WcfService1
{
    // 注意: 使用“重构”菜单上的“重命名”命令，可以同时更改代码、svc 和配置文件中的类名“Service1”。
    // 注意: 为了启动 WCF 测试客户端以测试此服务，请在解决方案资源管理器中选择 Service1.svc 或 Service1.svc.cs，然后开始调试。
    public class Service1 : IService1
    {
        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }
    }
}
```

### 测试服务

 按 F5 运行该服务。 WCF 测试客户端 窗体随即出现并加载服务。

在“WCF 测试客户端”窗体中，双击 IService1 下的 GetData() 方法。 此时会显示 "工作" 选项卡。

![image-20220623092223470](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206230922517.png)

 

 在“请求”框中，选择“值”字段，并键入 1314。

![image-20220623092235342](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206230922377.png)

 

 如上所示，我们的服务没有问题，然后在浏览器输入服务地址http://192.168.43.219/SchoolService(配置文件中的baseAddress)查看服务，我们可以点击查看服务的wsdl文档，wsdl详细展示了服务的方法、数据类型、服务地址等信息。

![image-20220623092243782](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206230922819.png)

 

### 使用http访问

https://blog.csdn.net/xunbaogang/article/details/82388145

（1）给方法添加说明

![1625561256753](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210911271.png)

```c#
[WebGet(UriTemplate = "/GetData/{value}", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
```

（2）修改WebConfig，`system.serviceModel`节点

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>

  <appSettings>
    <add key="aspnet:UseTaskFriendlySynchronizationContext" value="true" />
  </appSettings>
  <system.web>
    <compilation debug="true" targetFramework="4.7.2" />
    <httpRuntime targetFramework="4.7.2"/>
  </system.web>
  <system.serviceModel>
	  <bindings>
		  <webHttpBinding>
			  <binding name="webBinding"/>
		  </webHttpBinding>
	  </bindings>
	  <services>
		  <service name="WcfService1.Service1" behaviorConfiguration="serviceBehavior">
			  <endpoint address="" behaviorConfiguration="webBehavior" binding="webHttpBinding" bindingConfiguration="webBinding" contract="WcfService1.IService1"/>
		  </service>
	  </services>
    <behaviors>
		<endpointBehaviors>
			<behavior name="webBehavior">
				<!--这里必须设置-->
				<webHttp/>
			</behavior>
		</endpointBehaviors>
		<serviceBehaviors>
			<behavior name="serviceBehavior">
				<!-- 为避免泄漏元数据信息，请在部署前将以下值设置为 false -->
				<serviceMetadata httpGetEnabled="true"/>
				<!-- 要接收故障异常详细信息以进行调试，请将以下值设置为 true。在部署前设置为 false 以避免泄漏异常信息 -->
				<serviceDebug includeExceptionDetailInFaults="false"/>
			</behavior>
		</serviceBehaviors>
    </behaviors>
    <protocolMapping>
        <add binding="basicHttpsBinding" scheme="https" />
    </protocolMapping>    
    <serviceHostingEnvironment aspNetCompatibilityEnabled="true" multipleSiteBindingsEnabled="true" />
  </system.serviceModel>
  <system.webServer>
    <modules runAllManagedModulesForAllRequests="true"/>
    <!--
        若要在调试过程中浏览 Web 应用程序根目录，请将下面的值设置为 True。
        在部署之前将该值设置为 False 可避免泄露 Web 应用程序文件夹信息。
      -->
    <directoryBrowse enabled="true"/>
  </system.webServer>

</configuration>

```

（3）参数必须使用字符串类型

使用其他类型会报如下错误

![1625561186720](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210911288.png)

![1625562991753](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210911834.png)

（4）访问结果

