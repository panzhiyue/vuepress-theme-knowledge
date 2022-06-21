## backgroundWorker

BackgroundWorker 组件用来执行诸如数据库事务、文件下载等耗时的异步操作

**语法**

```c#
BackgroundWorker bgw=new BackgroundWorker();
```

### 1.事件

该控件有三个事件

- **DoWork:**在程序中调用RunWorkerAsync方法则会启动DoWork事件的事件处理

- **ProgressChanged:**当在事件处理过程中，调用 ReportProgress方法则会启动ProgressChanged事件的事件处理

- **RunWorkerCompleted:**而当DoWork事件处理完成时，则会触发RunWorkerCompleted事件。

您必须非常小心，确保在 DoWork 事件处理程序中不操作任何用户界面对象（否则仍会停止响应）。而应该通过 ProgressChanged和 RunWorkerCompleted 事件与用户界面进行通信。

**绑定事件**

```c#
bgw.DoWork += new DoWorkEventHandler(bgw_DoWork);
bgw.ProgressChanged += new ProgressChangedEventHandler(bgw_ProgressChanged);
bgw.RunWorkerCompleted+=new RunWorkerCompletedEventHandler(bgw_RunWorkerCompleted);
```



#### 1.1DoWork 事件 （RunWorkerAsync触发）

**语法**

```c#
/// <summary>
/// 
/// </summary>
/// <param name="sender">句柄sender指向的就是该BackgroundWorker控件。</param>
/// <param name="e">第二个参数e有三个属性，Argument,Cancel和Result。
/// Argument:
///     大家应该还记得如何触发DoWork事件吧？对了，就是在程序中调用RunWorkerAsync方法，RunWorkerAsync方法有两种重载，
///     第一种是无参形式，第二种是有一个指向Object^类型的参数，如果你调用的是有参类型的RunWorkerAsync,
///     则DoWork事件处理程序的第二个参数e的Argment属性将会返回一个指向你传递过来的这个参数。
/// Cancel:
///     DoWork 事件处理程序中的代码应定期检查 CancellationPending属性值，并在该值为true时中止操作。
///     出现这种情况时，可以将 System.ComponentModel.DoWorkEventArgs 的 Cancel标志设置为true，
///     同时将 RunWorkerCompleted 事件处理程序中的 System.ComponentModel.RunWorkerCompletedEventArgs的 Cancelled 标志设置为true。
/// Result:
///     等下面讲到RunWorkerCompleted事件时再细说。
/// </param>
private void bgw_DoWork(object sender,DoWorkEventArgs e);
```

**参数说明**

- **sender:**句柄sender指向的就是该BackgroundWorker控件。

- **e:**第二个参数e有三个属性，Argument,Cancel和Result。

  1. **Argument**:

     大家应该还记得如何触发DoWork事件吧？对了，就是在程序中调用RunWorkerAsync方法，RunWorkerAsync方法有两种重载，

     第一种是无参形式，

     第二种是有一个指向Object类型的参数，如果你调用的是有参类型的RunWorkerAsync,则DoWork事件处理程序的第二个参数e的Argment属性将会返回一个指向你传递过来的这个参数。

  2. **Cancel:**

     DoWork 事件处理程序中的代码应定期检查 CancellationPending属性值，并在该值为true时中止操作。出现这种情况时，可以将 System.ComponentModel.DoWorkEventArgs 的 Cancel标志设置为true，同时将 RunWorkerCompleted 事件处理程序中的 System.ComponentModel.RunWorkerCompletedEventArgs的 Cancelled 标志设置为true。

  3. **Result:**

     传递给完成函数的参数

  

**示例**

```c#
public static ManualResetEvent mre = new ManualResetEvent(true);  //暂停
private void bgw_DoWork(object sender,DoWorkEventArgs e)
{
    for(int i=0;i<=100;i++)
    {
        bgw.ReportProgress(i,"传递了更多信息");   //触发ProgressChanged事件
        mre.WaitOne();
        Thread.Sleep(100);
        label1.Text = i.ToString();
        e.Result = i;
        if (bgw.CancellationPending)
        {
            e.Cancel = true;
            return;
        }
    }
}

```



#### 1.2ProgressChanged事件（ReportProgress触发）

在DoWork事件的处理过程中，如果调用ReportProgress则会发生该事件。

```c#
void ReportProgress(int percentProgress)
void ReportProgress(int percentProgress,Object userState)
```

**语法**

```c#
private void bgw_ProgressChanged(object sender, ProgressChangedEventArgs e)
{
}
```

**参数说明**

- **sender:**句柄sender指向的就是该BackgroundWorker控件。

- **e:**
  1. **ProgressPercentage**:它就由ReportProgress的第一个参数percentProgress来提供。这个参数一般用来报告该后台操作完成的进度
  2. **userState**:如果用户还想传递更多的信息，可以使用ReportProgress的第二种重载，它的第二个参数userState将会传递给ProgressChanged事件的参数e的UserState属性。

**示例**

```c#
private void bgw_ProgressChanged(object sender, ProgressChangedEventArgs e)
{
    progressBar1.Value =  e.ProgressPercentage;
    MessageBox.Show(e.UserState.ToString());
}
```



#### 1.3RunWorkerCompleted事件

当DoWork事件处理完成之后，将会触发该事件。

**语法**

```c#
private void bgw_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
{
}
```

**参数说明**

- **sender:**句柄sender指向的就是该BackgroundWorker控件。
- **e:**
  1. Result:在DoWork事件中，你将Result设置成什么，这里的Result就返回什么。

**示例**

```c#
private void bgw_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
{
    MessageBox.Show(e.Result.ToString());
}
```





### 2.示例代码

#### 2.1.winForm页面

![1606380535485](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210924035.png)

#### 2.2.简单调用

```c#
/// <summary>
/// 开始按钮
/// </summary>
/// <param name="sender"></param>
/// <param name="e"></param>
private void btnStart_Click(object sender, EventArgs e)
{
	bgw.RunWorkerAsync(); //触发DoWork事件
}

private void bgw_DoWork(object sender,DoWorkEventArgs e)
{
	for(int i=0;i<=100;i++)
	{
		bgw.ReportProgress(i); //触发ProgressChanged事件
		Thread.Sleep(500);
		label1.Text = i.ToString();
	}
}

private void bgw_ProgressChanged(object sender, ProgressChangedEventArgs e)
{
	progressBar1.Value = e.ProgressPercentage;
}

private void bgw_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
{
	if(e.Cancelled)
	{
		MessageBox.Show("Operation Cancelled");
	}
	else
	{
		MessageBox.Show("OperationCompleted");
	}
}
```



#### 2.3.解决错误

**错误一**

![1606381013996](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210924042.png)

设置bgw.WorkerReportsProgress = true;

**错误二**

![1606381028608](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210924041.png)

设置Control.CheckForIllegalCrossThreadCalls = false;

#### 2.4.运行效果

![1606381038264](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210924043.png)

#### 2.5.暂停与继续

##### 2.5.1.修改DoWork函数

```c#
public static ManualResetEvent mre = new ManualResetEvent(true); //暂停

private void bgw_DoWork(object sender,DoWorkEventArgs e)
{
	for(int i=0;i<=100;i++)
	{
		bgw.ReportProgress(i); //触发ProgressChanged事件
		mre.WaitOne();
		Thread.Sleep(500);
		label1.Text = i.ToString();
	}
}
```



##### 2.5.2.暂停与继续代码

```c#
private void btnZhanT_Click(object sender, EventArgs e)
{
	if(btnZhanT.Text=="暂停")
	{
		mre.Reset();
		btnZhanT.Text = "继续";
	}
	else
	{
		mre.Set();
		btnZhanT.Text = "暂停";
	}
}
```



#### 2.6.取消操作

##### 2.6.1.设置属性bgw.WorkerSupportsCancellation = true;

##### 2.6.2.修改DoWork函数

```c#
public static ManualResetEvent mre = new ManualResetEvent(true); //暂停
private void bgw_DoWork(object sender,DoWorkEventArgs e)
{
	for(int i=0;i<=100;i++)
	{
		bgw.ReportProgress(i); //触发ProgressChanged事件
		mre.WaitOne();
		Thread.Sleep(500);
		label1.Text = i.ToString();
		if (bgw.CancellationPending)
		{
			e.Cancel = true;
			return;
		}
	}
}
```



##### 2.6.3取消按钮

```c#
private void btnCanel_Click(object sender, EventArgs e)
{
	bgw.CancelAsync();
}
```



#### 2.7.通过Result给RunWorkerCompleted传递参数

在DoWork事件中，你将Result设置成什么，RunWorkerCompleted的Result就返回什么。

##### 2.7.1.修改DoWork函数

```c#
public static ManualResetEvent mre = new ManualResetEvent(true); //暂停

private void bgw_DoWork(object sender,DoWorkEventArgs e)
{
	for(int i=0;i<=100;i++)
	{
		bgw.ReportProgress(i); //触发ProgressChanged事件
		mre.WaitOne();
		Thread.Sleep(500);
		label1.Text = i.ToString();
		e.Result = i;
		if (bgw.CancellationPending)
		{
			e.Cancel = true;
			return;
		}
	}
}
```



##### 2.7.2.修改RunWorkerCompleted函数

```c#
private void bgw_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
{
	MessageBox.Show(e.Result.ToString());
}
```



#### 2.8.给bgw_ProgressChanged传递更多信息

##### 2.8.1.修改DoWork代码

```c#
public static ManualResetEvent mre = new ManualResetEvent(true); //暂停

private void bgw_DoWork(object sender,DoWorkEventArgs e)
{
	for(int i=0;i<=100;i++)
	{
		bgw.ReportProgress(i,"传递了更多信息"); //触发ProgressChanged事件
		mre.WaitOne();
		Thread.Sleep(100);
		label1.Text = i.ToString();
		e.Result = i;
		if (bgw.CancellationPending)
		{
			e.Cancel = true;
			return;
		}
	}
}
```



##### 2.8.2.修改ProgressChanged代码

```c#
private void bgw_ProgressChanged(object sender, ProgressChangedEventArgs e)
{
	progressBar1.Value = e.ProgressPercentage;
	MessageBox.Show(e.UserState.ToString());
}
```



#### 2.9.完整代码

```c#
BackgroundWorker bgw = new BackgroundWorker();
private void Form1_Load(object sender, EventArgs e)
{
    bgw.DoWork += new DoWorkEventHandler(bgw_DoWork);
    bgw.ProgressChanged += new ProgressChangedEventHandler(bgw_ProgressChanged);
    bgw.RunWorkerCompleted += new RunWorkerCompletedEventHandler(bgw_RunWorkerCompleted);
    bgw.WorkerReportsProgress = true;
    Control.CheckForIllegalCrossThreadCalls = false;
    bgw.WorkerSupportsCancellation = true;
}


/// <summary>
/// 
/// </summary>
public static ManualResetEvent mre = new ManualResetEvent(true);  //暂停
private void bgw_DoWork(object sender,DoWorkEventArgs e)
{
    for(int i=0;i<=100;i++)
    {
        bgw.ReportProgress(i,"传递了更多信息");   //触发ProgressChanged事件
        mre.WaitOne();
        Thread.Sleep(100);
        label1.Text = i.ToString();
        e.Result = i;
        if (bgw.CancellationPending)
        {
            e.Cancel = true;
            return;
        }
    }
}


/// <summary>
/// 在DoWork事件的处理过程中，如果调用ReportProgress则会发生该事件。
/// </summary>
private void bgw_ProgressChanged(object sender, ProgressChangedEventArgs e)
{
    progressBar1.Value =  e.ProgressPercentage;
    MessageBox.Show(e.UserState.ToString());
}
/// <summary>
/// 当DoWork事件处理完成之后，将会触发该事件。
/// </summary>
private void bgw_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
{
    MessageBox.Show(e.Result.ToString());
}


/// <summary>
/// 开始按钮
/// </summary>
/// <param name="sender"></param>
/// <param name="e"></param>
private void btnStart_Click(object sender, EventArgs e)
{
   bgw.RunWorkerAsync();  //触发DoWork事件
}


/// <summary>
/// 暂停/继续
/// </summary>
/// <param name="sender"></param>
/// <param name="e"></param>
private void btnZhanT_Click(object sender, EventArgs e)
{
    if(btnZhanT.Text=="暂停")
    {
        mre.Reset();
        btnZhanT.Text = "继续";
    }
    else
    {
        mre.Set();
        btnZhanT.Text = "暂停";
    }
}


/// <summary>
/// 取消按钮
/// </summary>
/// <param name="sender"></param>
/// <param name="e"></param>
private void btnCanel_Click(object sender, EventArgs e)
{
    bgw.CancelAsync();
}

```

