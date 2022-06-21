# Flutter

## 学习资料

[Flutter中文网](https://flutterchina.club/)

[Flutter包查询](https://pub.dev/)

### 实例项目

https://github.com/flutter/flutter/tree/master/examples
https://github.com/flutter/samples
https://github.com/nisrulz/flutter-examples
https://github.com/iampawan/FlutterExampleApps

## 命令

| 序号 | 命令            | 描述   |
| ---- | --------------- | ------ |
| 1    | flutter pub get | 下载包 |
|      |                 |        |
|      |                 |        |

## Flutter插件

### path_provider

地址:https://pub.dev/packages/path_provider

示例
```dart
Directory tempDir = await getTemporaryDirectory();
String tempPath = tempDir.path;

Directory appDocDir = await getApplicationDocumentsDirectory();
String appDocPath = appDocDir.path;
```

### flutter_webview_plugin

### cupertino_icons

### page_view_indicator

### flutter_swiper

### http

### flutter_staggered_grid_view

### flutter_statusbar_manager





## 组件

### Icons

Flutter Icons 内置图标库

https://fonts.google.com/icons?selected=Material+Icons
https://www.fluttericon.com/

全套Material图标，方便开发时查找



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935634.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935942.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935665.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935584.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935618.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935638.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935224.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935502.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935015.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935969.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935157.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935333.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935275.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210935351.png)

### fluttertoast

https://pub.dev/packages/fluttertoast

如何使用：

1. 添加依赖库：
   `fluttertoast: ^8.0.8`
2. 导入：
   `import 'package:fluttertoast/fluttertoast.dart';`

3.示例
```dart
	Fluttertoast.showToast(
        msg: "This is Center Short Toast",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0
    );
```

### AspectRadio

```dart
AspectRadio(
	aspectRadio:16/9,   //设置子元素宽高比为16比9
	child:Widget
)
```

### 导航

- Navigator
- MaterialPageRoute
- PageRouteBuilder

### 列表

- ListView
- GridView
- ExpansionTile

#### ExpansionTile

##### 示例
```dart
const ExpansionTile(
            title: const Text("ExpansionTile示例"),
            children: <Widget>[
              Text("子项1"),
              Text("子项2"),
              Text("子项3"),
            ])
```

##### 完整代码
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: const ExpansionTile(
            title: const Text("ExpansionTile示例"),
            children: <Widget>[
              Text("子项1"),
              Text("子项2"),
              Text("子项3"),
            ])
        // This trailing comma makes auto-formatting nicer for build methods.
        );
  }
}

```

##### 显示结果

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210937465.png)

### Image

- new Image():用于从ImagePrivider中获取图形
- new Image.asset():使用key从AssetBuildle获取图形
- new Image.network() 从网络url获取图形
- new Image.file():从本地文件中获取图片
- new Image.memory()  用于从Unit8List获取图形

### PageView

PageView是一个可以完成页面之间滚动的widget

## 动画

1.Animation:是Flutter动画库中的一个核心类，它生成指导动画的值
2.CurvedAnimation:Animation的一个子类，将过程抽象为一个非线性曲线
3.AnimationController:Animation的一个子类，用来管理Animation
4.Tween:在正在执行动画的对象所使用的s数据范围之间生成值。例如Tween可以生成从红到蓝之间的色值



## 启动示例

```dart
//导入包
//此行代码的作用是导入了Material UI组件库,Material是一种标注的移动端和web端的视觉设计语音，Flutter默认提供了一套丰富的Material风格的UI组件
import 'package:flutter/material.dart';

//应用入口
//与C/C++,Java类似,Flutter应用中main函数作为应用程序的入口。main函数中调用了runApp方法,它的功能是启动Flutter应用。runApp它接受一个Widget参数,在本示例中它是一个MyApp对象,MyApp()是Flutter应用的根组件
void main() {
  runApp(const MyApp());
}

//MyApp类代表Flutter应用,它继承了StatelessWidget类，这也就意味着应用本身也是一个widget
//在Flutter中，大多数东西都是widget(组件/部件)，包括对齐方式（align）,填充（padding），手势处理（GestureDetector）等，她们都是以widget的形式提供。

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

//Flutter在构建页面时,会调用组件的build方法，widget的主要工作是提供一个build()方法来描述如何构建UI界面（通常是通过组合，拼装其他基础widget）
  @override
  Widget build(BuildContext context) {
    //MaterialApp是Material库中提供的Flutter APP框架，通过它可以设置应用的名称，主题，语音，首页及路由列表等。MaterialApp也是一个widget。
    return MaterialApp(
      title: 'Flutter Demo',
      //应用的主题
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      //home为Flutter应用的首页，它也是一个widget
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

//MyHomePage是应用的首页，它继承自StatefulWidget类，表示它是一个有状态的组件（Statefulwidget）。
//Stateful widget可以拥有状态，这些状态在widget生命周期中是可以变得，而Stateless widget是不可变得。
//Stateful widget至少由两个类组成
//一个StatefulWidget类
//一个State类，StatefulWidget类本身是不变的，但是State类中持有的状态在widget生命周期中可能会发变化
class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

//_MyHomePageState类是MyHomePage类对应的状态类
class _MyHomePageState extends State<MyHomePage> {
  //用于记录按钮点击的总次数
  int _counter = 0;

  //自增函数
  //当按钮点击时会调用此函数，该函数的作用是先自增_counter,然后调用setState方法
  void _incrementCounter() {
    //setState方法的作用是通知Flutter框架，有状态发生了改变，Flutter框架收到通知后，会执行build方法来根据新的状态重新构建界面，Flutter对此方法做了优化，使重新执行变得很快，所以你可以重新构建任何需要更新的东西，而无需分别去修改各个widget
    setState(() {
      _counter++;
    });
  }

  //构建UI界面
  //当MyHomePage第一次创建时，_MyHomePageState类会被创建，当初始化完成后，Flutter框架会调用widget的build方法来构建widget树，最终将widget树渲染到设备屏幕上
  @override
  Widget build(BuildContext context) {
    //Sacffold是Material库中提供的页面脚手架，它提供了默认的导航栏，标题和包含主屏幕widget树的body属性。路由默认都是通过Sacffold创建。
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      //页面右下角的带+的悬浮按钮，它的onPressed属性接受一个回调函数，代表它被点击后的处理器
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

```