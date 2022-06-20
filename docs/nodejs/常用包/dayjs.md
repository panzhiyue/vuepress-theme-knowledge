# dayjs

## 安装

::: code-group

::: code-group-item npm

```bash
npm i dayjs
```

:::



::: code-group-item yarn

```bash
yarn add dayjs
```

:::



::: code-group-item pnpm

```bash
pnpm i dayjs
```

:::

:::

## 解析时间

```javascript
dayjs('2018-08-08')
dayjs('2018-08-08 12:30:01' )
dayjs()  //当前时间
```

::: demo

nodejs/examples/常用包/dayjs/解析

:::

## 时间戳

```
dayjs().unix()   //秒
dayjs().valueOf(); //毫秒
```



## 格式化

```
let endTime = dayjs().format('YYYY-MM-DD')
```

## 计算前一段时间

```
let startTime = dayjs().subtract(14,'day').format('YYYY-MM-DD')   //获取14天前的时间
```



## 计算后一段时间

```
dayjs().add(7, 'day')  //获取7天后的时间
```



## 其他

```
//获取一月/一周等的开始时间
dayjs().startOf('week')   //获取本周第一天的时间(星期一)
//获取一月/一周等的末尾时间
dayjs().endOf('month')
//计算时间差，获取两个不同时间的差，如2020-09-25和2020-06-05相差112天：
const date1 = dayjs('2020-09-25');
date1.diff('2020-06-05', 'day'); // 112
//获取月份天数
dayjs().daysInMonth() //30，（2020年9月共30天）

//距离当前时刻,我们经常看到显示“1分钟前”、“3小时内”等时间转换后显示效果，dayjs也可以轻松实现：
dayjs('2020-09-27 18:22:32').fromNow(); //3小时前
dayjs('2020-09-26 10:22:32').toNow(); //1天内

//fromNow()表示距离当前时刻，toNow()表示相对当前时刻，其实感觉意思差不多。
//不过要想fromNow()和toNow()生效，需要使用插件 RelativeTime，方法是先引入插件，再执行调用方法：
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
```

