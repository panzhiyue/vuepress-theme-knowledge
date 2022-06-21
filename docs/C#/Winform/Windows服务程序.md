本文介绍了如何用C#创建、安装、启动、监控、卸载简单的Windows Service 的内容步骤和注意事项。

# 一、创建一个Windows Service

 

## 1）创建Windows Service项目

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210928991.jpg)

## 2）对Service重命名

将Service1重命名为你服务名称，这里我们命名为ServiceTest。

# 二、创建服务安装程序

## 1）添加安装程序

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210928988.jpg)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210928997.jpg)

之后我们可以看到上图，自动为我们创建了ProjectInstaller.cs以及2个安装的组件

## 2）修改安装服务名

右键serviceInsraller1，选择属性，将ServiceName的值改为ServiceTest。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210928998.jpg)

## 3）修改安装权限

右键serviceProcessInsraller1，选择属性，将Account的值改为LocalSystem。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210928000.jpg)

# 三、写入服务代码

## 1）打开ServiceTest代码

右键ServiceTest，选择查看代码。

## 2）写入Service逻辑

```c#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Data.SqlClient;

namespace DataBaseService
{
public partial class DataBakService : ServiceBase
{
public DataBakService()
{
InitializeComponent();
}

//定时器
System.Timers.Timer tmBak = new System.Timers.Timer();
//服务器启动时写日志、开启定时器
protected override void OnStart(string[] args)
{
using (System.IO.StreamWriter sw = new System.IO.StreamWriter("D:\\log.txt", true))
{
sw.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " DATABASENAME Service Start.");
}

//到时间的时候执行事件

tmBak.Interval = 60000;//一分钟执行一次
tmBak.AutoReset = true;//执行一次 false，一直执行true
//是否执行System.Timers.Timer.Elapsed事件
tmBak.Enabled = true;
tmBak.Start();
tmBak.Elapsed += new System.Timers.ElapsedEventHandler(SQLBak);

}

private void SQLBak(object source, System.Timers.ElapsedEventArgs e)
{
//如果当前时间是10点30分
if (DateTime.Now.Hour == 9 && DateTime.Now.Minute == 50)
{
string sql = string.Format(@"
BACKUP DATABASE DATABASENAME 
TO DISK = N'E:\DBBak\DATABASENAME {0}{1}{2}.bak'--目录一定要存在
WITH INIT , NOUNLOAD ,
NAME = N'数据库备份', --名字随便取
NOSKIP ,
STATS = 10,
NOFORMAT", DateTime.Now.Year,DateTime.Now.Month,DateTime.Now.Day);
try
{
using (System.IO.StreamWriter sw = new System.IO.StreamWriter("D:\\log.txt", true))
{
sw.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " 正在备份DATABASENAME 数据库......");
}

SqlConnection conn = new SqlConnection("server=127.0.0.1;uid=sa;pwd=44545454;database=DATABASENAME ");
conn.Open();
SqlCommand cmd = new SqlCommand(sql, conn);
cmd.CommandTimeout = 0;
cmd.ExecuteNonQuery();
conn.Close();


}
catch (Exception ex)
{
using (System.IO.StreamWriter sw = new System.IO.StreamWriter("D:\\log.txt", true))
{
sw.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " 备份DATABASENAME 数据库出现异常：" + ex.Message);
return;
}
}

using (System.IO.StreamWriter sw = new System.IO.StreamWriter("D:\\log.txt", true))
{
sw.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " 备份DATABASENAME 数据库成功！");
}


}

}


//服务停止时写日志
protected override void OnStop()
{
using (System.IO.StreamWriter sw = new System.IO.StreamWriter("D:\\log.txt", true))
{
sw.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " DATABASENAME 

Service Stop.");
}
}

}
}
```

这是一个备份数据库的服务，逻辑很简单，就是通过定时器实现在特定的时间执行SQL语句备份数据库，并将每一步操作的情况写入日志文件。

 

# 四、创建安装脚本

在项目中添加2个文件如下(必须是ANSI或者UTF-8无BOM格式)：

## 1）安装脚本Install.bat

```bash
%SystemRoot%\Microsoft.NET\Framework\v4.0.30319\installutil.exe D:\dbback\EFNETSYSDBBAK\DataBaseService.exe
Net Start ServiceEFNETSYS
sc config ServiceEFNETSYS start= auto
pause
```



## 2）卸载脚本Uninstall.bat

```bash
%SystemRoot%\Microsoft.NET\Framework\v4.0.30319\installutil.exe /u D:\dbback\EFNETSYSDBBAK\DataBaseService.exe
pause
```



## 3）安装脚本说明

第二行为启动服务。

第三行为设置服务为自动运行。

这2行视服务形式自行选择。

 

## 4）脚本调试

如果需要查看脚本运行状况，在脚本最后一行加入pause

 

# 五、在C#中对服务进行控制

## 0）配置目录结构

建立一个新WPF项目，叫WindowsServiceTestUI，添加对System.ServiceProcess的引用。

在WindowsServiceTestUI的bin\Debug目录下建立Service目录。

将WindowsServiceTest的生成目录设置为上面创建的Service目录。

生成后目录结构如下图

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210928001.jpg)

## 1）安装

安装时会产生目录问题，所以安装代码如下：

| 12345678 | string CurrentDirectory = System.Environment.CurrentDirectory;System.Environment.CurrentDirectory = CurrentDirectory + "\\Service";Process process = new Process();process.StartInfo.UseShellExecute = false;process.StartInfo.FileName = "Install.bat";process.StartInfo.CreateNoWindow = true;process.Start();System.Environment.CurrentDirectory = CurrentDirectory; |
| -------- | ------------------------------------------------------------ |
|          |                                                              |

## 2）卸载

卸载时也会产生目录问题，所以卸载代码如下：

| 12345678 | string CurrentDirectory = System.Environment.CurrentDirectory;System.Environment.CurrentDirectory = CurrentDirectory + "\\Service";Process process = new Process();process.StartInfo.UseShellExecute = false;process.StartInfo.FileName = "Uninstall.bat";process.StartInfo.CreateNoWindow = true;process.Start();System.Environment.CurrentDirectory = CurrentDirectory; |
| -------- | ------------------------------------------------------------ |
|          |                                                              |

## 3）启动

代码如下：

| 12345 | using System.ServiceProcess; ServiceController serviceController = new ServiceController("ServiceTest");serviceController.Start(); |
| ----- | ------------------------------------------------------------ |
|       |                                                              |

## 4）停止

| 123  | ServiceController serviceController = new ServiceController("ServiceTest");if (serviceController.CanStop)  serviceController.Stop(); |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

## 5）暂停/继续

| 12345678 | ServiceController serviceController = new ServiceController("ServiceTest");if (serviceController.CanPauseAndContinue){  if (serviceController.Status == ServiceControllerStatus.Running)    serviceController.Pause();  else if (serviceController.Status == ServiceControllerStatus.Paused)    serviceController.Continue();} |
| -------- | ------------------------------------------------------------ |
|          |                                                              |

## 6）检查状态

| 12   | ServiceController serviceController = new ServiceController("ServiceTest");string Status = serviceController.Status.ToString(); |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

# 六、调试Windows Service

## 1）安装并运行服务

## 2）附加进程

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210928423.jpg)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210928433.jpg)

## 3）在代码中加入断点进行调试

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210928441.jpg)

# 七、总结

本文对Windows service的上述配置都未做详细解释，但是按上述步骤就可以制作可运行的Windows Service，从而达到了工作的需求。

 