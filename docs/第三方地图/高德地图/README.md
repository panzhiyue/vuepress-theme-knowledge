# 快速入门

## 1.注册账号并申请token

https://lbs.amap.com/api/jsapi-v2/guide/abc/prepare

## 2.加载JSAPI

```bash
npm i @amap/amap-jsapi-loader
```

```javascript
import AMapLoader from "@alife/amap-jsapi-loader";

AMapLoader.load({
  key: "", //首次load必填
  version: "2.0",
  plugins: ["AMap.Scale"],
})
  .then((AMap) => {
    map = new AMap.Map("container");
  })
  .catch((e) => {
    console.log(e);
  });
```

## 3.简单地图

::: demo

第三方地图/examples/高德地图/basic

:::

## 4.地址编码

::: demo

第三方地图/examples/高德地图/geocoder

:::









## 参考资料

https://lbs.amap.com/api/javascript-api/summary