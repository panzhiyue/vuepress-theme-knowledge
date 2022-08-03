# Echarts



## 学习资料

菜鸟教程:https://www.runoob.com/echarts/echarts-events.html

官网:https://echarts.apache.org/zh/option.html
社区:https://www.makeapie.cn/echarts


## 配置

### 标题

```json
var option = {
        //标题
        title : {
            show:true,//显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '主标题',//主标题文本，'\n'指定换行
            link:'',//主标题文本超链接,默认值true
            target: null,//指定窗口打开主标题超链接，支持'self' | 'blank'，不指定等同为'blank'（新窗口）
            subtext: '副标题',//副标题文本，'\n'指定换行
            sublink: '',//副标题文本超链接
            subtarget: null,//指定窗口打开副标题超链接，支持'self' | 'blank'，不指定等同为'blank'（新窗口）
            x:'center'//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: 'top',//垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
            textAlign: null,//水平对齐方式，默认根据x设置自动调整，可选为： left' | 'right' | 'center
            backgroundColor: 'rgba(0,0,0,0)',//标题背景颜色，默认'rgba(0,0,0,0)'透明
            borderColor: '#ccc',//标题边框颜色,默认'#ccc'
            borderWidth: 0,//标题边框线宽，单位px，默认为0（无边框）
            padding: 5,//标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
            itemGap: 10,//主副标题纵向间隔，单位px，默认为10
            textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                fontFamily: 'Arial, Verdana, sans...',
                fontSize: 12,
                fontStyle: 'normal',
                fontWeight: 'normal',
            },
            subtextStyle: {//副标题文本样式{"color": "#aaa"}
                fontFamily: 'Arial, Verdana, sans...',
                fontSize: 12,
                fontStyle: 'normal',
                fontWeight: 'normal',
            },
            zlevel: 0,//一级层叠控制。默认0,每一个不同的zlevel将产生一个独立的canvas，相同zlevel的组件或图标将在同一个canvas上渲染。zlevel越高越靠顶层，canvas对象增多会消耗更多的内存和性能，并不建议设置过多的zlevel，大部分情况可以通过二级层叠控制z实现层叠控制。
            z: 6,//二级层叠控制，默认6,同一个canvas（相同zlevel）上z越高约靠顶层。
        },
```



## 事件处理

ECharts 中我们可以通过监听用户的操作行为来回调对应的函数。

ECharts 通过 **on** 方法来监听用户的行为，例如监控用户的点击行为。

ECharts 中事件分为两种类型:

用户鼠标操作点击，如 **'click'、'dblclick'、'mousedown'、'mousemove'、'mouseup'、'mouseover'、'mouseout'、'globalout'、'contextmenu'** 事件。

还有一种是用户在使用可以交互的组件后触发的行为事件，例如在切换图例开关时触发的 'legendselectchanged' 事件），数据区域缩放时触发的 'datazoom' 事件等等。

```javascript
myChart.on('click', function (params) {
    // 在用户点击后控制台打印数据的名称
    console.log(params);
});

myChart.on('legendselectchanged', function (params) {
    console.log(params);
});

chart.on('click', 'series.line', function (params) {
    console.log(params);
});

chart.on('mouseover', {seriesIndex: 1, name: 'xx'}, function (params) {
    console.log(params);
});
```

## 鼠标事件

ECharts 支持的鼠标事件类型，包括 'click'、'dblclick'、'mousedown'、'mousemove'、'mouseup'、'mouseover'、'mouseout'、'globalout'、'contextmenu' 事件。

以下实例在点击柱形图时会弹出对话框：

```javascript
// 基于准备好的dom，初始化ECharts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
// 处理点击事件并且弹出数据名称
myChart.on('click', function (params) {
    alert(params.name);
});
```

所有的鼠标事件包含参数 params，这是一个包含点击图形的数据信息的对象，格式如下：

```javascript
{
    // 当前点击的图形元素所属的组件名称，
    // 其值如 'series'、'markLine'、'markPoint'、'timeLine' 等。
    componentType: string,
    // 系列类型。值可能为：'line'、'bar'、'pie' 等。当 componentType 为 'series' 时有意义。
    seriesType: string,
    // 系列在传入的 option.series 中的 index。当 componentType 为 'series' 时有意义。
    seriesIndex: number,
    // 系列名称。当 componentType 为 'series' 时有意义。
    seriesName: string,
    // 数据名，类目名
    name: string,
    // 数据在传入的 data 数组中的 index
    dataIndex: number,
    // 传入的原始数据项
    data: Object,
    // sankey、graph 等图表同时含有 nodeData 和 edgeData 两种 data，
    // dataType 的值会是 'node' 或者 'edge'，表示当前点击在 node 还是 edge 上。
    // 其他大部分图表中只有一种 data，dataType 无意义。
    dataType: string,
    // 传入的数据值
    value: number|Array
    // 数据图形的颜色。当 componentType 为 'series' 时有意义。
    color: string
}
```

如何区分鼠标点击到了哪里：

```javascript
myChart.on('click', function (params) {
    if (params.componentType === 'markPoint') {
        // 点击到了 markPoint 上
        if (params.seriesIndex === 5) {
            // 点击到了 index 为 5 的 series 的 markPoint 上。
        }
    }
    else if (params.componentType === 'series') {
        if (params.seriesType === 'graph') {
            if (params.dataType === 'edge') {
                // 点击到了 graph 的 edge（边）上。
            }
            else {
                // 点击到了 graph 的 node（节点）上。
            }
        }
    }
});
```

使用 query 只对指定的组件的图形元素的触发回调：

```
chart.on(eventName, query, handler);
```

query 可为 string 或者 Object。

如果为 string 表示组件类型。格式可以是 'mainType' 或者 'mainType.subType'。例如：

```
chart.on('click', 'series', function () {...});
chart.on('click', 'series.line', function () {...});
chart.on('click', 'dataZoom', function () {...});
chart.on('click', 'xAxis.category', function () {...});
```

如果为 Object，可以包含以下一个或多个属性，每个属性都是可选的：

```
{
    <mainType>Index: number // 组件 index
    <mainType>Name: string // 组件 name
    <mainType>Id: string // 组件 id
    dataIndex: number // 数据项 index
    name: string // 数据项 name
    dataType: string // 数据项 type，如关系图中的 'node', 'edge'
    element: string // 自定义系列中的 el 的 name
}
```

例如：

```
chart.setOption({
    // ...
    series: [{
        name: 'uuu'
        // ...
    }]
});
chart.on('mouseover', {seriesName: 'uuu'}, function () {
    // series name 为 'uuu' 的系列中的图形元素被 'mouseover' 时，此方法被回调。
});
```

例如：

```
chart.setOption({
    // ...
    series: [{
        // ...
    }, {
        // ...
        data: [
            {name: 'xx', value: 121},
            {name: 'yy', value: 33}
        ]
    }]
});
chart.on('mouseover', {seriesIndex: 1, name: 'xx'}, function () {
    // series index 1 的系列中的 name 为 'xx' 的元素被 'mouseover' 时，此方法被回调。
});
```

例如：

```
chart.setOption({
    // ...
    series: [{
        type: 'graph',
        nodes: [{name: 'a', value: 10}, {name: 'b', value: 20}],
        edges: [{source: 0, target: 1}]
    }]
});
chart.on('click', {dataType: 'node'}, function () {
    // 关系图的节点被点击时此方法被回调。
});
chart.on('click', {dataType: 'edge'}, function () {
    // 关系图的边被点击时此方法被回调。
});
```

例如：

```
chart.setOption({
    // ...
    series: {
        // ...
        type: 'custom',
        renderItem: function (params, api) {
            return {
                type: 'group',
                children: [{
                    type: 'circle',
                    name: 'my_el',
                    // ...
                }, {
                    // ...
                }]
            }
        },
        data: [[12, 33]]
    }
})
chart.on('mouseup', {element: 'my_el'}, function () {
    // name 为 'my_el' 的元素被 'mouseup' 时，此方法被回调。
});
```

你可以在回调函数中获得这个对象中的数据名、系列名称后在自己的数据仓库中索引得到其它的信息候更新图表，显示浮层等等，如下示例代码：

```
myChart.on('click', function (parmas) {
    $.get('detail?q=' + params.name, function (detail) {
        myChart.setOption({
            series: [{
                name: 'pie',
                // 通过饼图表现单个柱子中的数据分布
                data: [detail.data]
            }]
        });
    });
});
```

### 组件交互的行为事件

在 ECharts 中基本上所有的组件交互行为都会触发相应的事件，常用的事件和事件对应参数在 events 文档中有列出。

下面是监听一个图例开关的示例：

```
// 图例开关的行为只会触发 legendselectchanged 事件
myChart.on('legendselectchanged', function (params) {
    // 获取点击图例的选中状态
    var isSelected = params.selected[params.name];
    // 在控制台中打印
    console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
    // 打印所有图例的状态
    console.log(params.selected);
});
```

### 代码触发 ECharts 中组件的行为

上面我们只说明了用户的交互操作，但有时候我们也会需要在程序里调用方法并触发图表的行为，比如显示 tooltip。

ECharts 通过 dispatchAction({ type: '' }) 来触发图表行为，统一管理了所有动作，也可以根据需要去记录用户的行为路径。

以上实例用于轮播饼图中的 tooltip：

```
setInterval(function () {
    var dataLen = option.series[0].data.length;
    // 取消之前高亮的图形
    myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: app.currentIndex
    });
    app.currentIndex = (app.currentIndex + 1) % dataLen;
    // 高亮当前图形
    myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: app.currentIndex
    });
    // 显示 tooltip
    myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: app.currentIndex
    });
}, 1000);
```



## 示例代码

### echarts柱状图y轴数据添加单位的三种方式（vue项目）

## 方式一 所有数据共用一个单位（通过yAxis中的name属性设置）

**效果图如下：**

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203181658156.webp)

**代码如下：**

```html
<template>
  <div>
    <div class="echartsBox" id="main"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xData: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      yData: [115, 198, 88, 77, 99, 123, 176],
      grid: {
        // 网格线配置
        show: true,
        lineStyle: {
          color: ["#e9e9e9"],
          width: 1,
          type: "solid",
        },
      },
    };
  },
  watch: {
    xData() {
      this.echartsInit();
    },
    yData() {
      this.echartsInit();
    },
  },
  mounted() {
    // 在通过mounted调用让echarts渲染
    this.echartsInit();
  },
  methods: {
    echartsInit() {
      let main = document.getElementById("main"); // 获取dom元素作为eacharts的容器
      console.log("是否有echarts", this.$echarts);
      this.$echarts.init(main).setOption({
        // 调用echarts方法去绘制echarts图
        xAxis: {
          type: "category", // 类别
          data: this.xData, // x轴类别对应的值
          axisTick: {
            // 刻度线控制在柱状图居中
            alignWithLabel: true,
          },
        },
        grid: {
          show: true,
        },
        yAxis: {
          type: "value",
          // 看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，
          // ----------------------通过name属性加单位，也可以通过nameTextStyle设置对应单位文字样式-----------------------
          name: "单位（万元）",
          nameTextStyle: {
            color: "#aaa",
            nameLocation: "start",
          },
        },
        series: [
          {
            name: "kkk",
            data: this.yData,
            type: "bar", // 类型为柱状图
            barWidth: 40, // 柱状图的宽度
          },
        ],
      });
    },
  },
};
</script>
<style lang="less" scoped>
.echartsBox {
  width: 600px;
  height: 600px;
}
</style>
```

## 方式二 所有数据共用一个单位（通过title中的subtext属性设置）

**代码如下：**

```js
yAxis: {
  type: "value",
},
// 看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里
title: {
  // title为标题部分，有一级标题text，二级标题subtext。这里我们使用二级标题，再修改一下这个二级标题的位置即可出现我们想要的效果了，当然样式也可以通过title.subtextStyle去配置
  subtext: "单位（万元）",
  left: 24,// 距离左边位置
  top: 16,// 距离上面位置
  subtextStyle:{ // 设置二级标题的样式
    color:"#baf"
  }
},
series:[......]
```

> 最终效果图，和方式一的最终效果是一致的

## 方式三 每个数据都带有单位（通过yAxis中的axisLabel属性设置）

**效果图如下：**

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203181658157.webp)

**代码如下：**

```js
grid: {
  show: true,
},
yAxis: {
  type: "value",
 // 看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里，看这里
  axisLabel: {
    //这种做法就是在y轴的数据的值旁边拼接单位，貌似也挺方便的
    formatter: "{value} 万元",
  },
},
series: [......]
```

x轴的也类似，这里就不赘述了