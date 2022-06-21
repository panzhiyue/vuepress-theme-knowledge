# 边框

[ol/style/Stroke](https://openlayers.org/en/latest/apidoc/module-ol_style_Stroke-Stroke.html)

```javascript
 stroke: new style.Stroke({
   color: "#3399CC",  //边框色
   width: 1.25,  //宽度
   lineCap:"butt", //线帽样式：butt、round或square.
   lineJoin:"bevel",  //线连接样式：bevel、round或miter.
   lineDash:[10,10],  //线条虚线图案。
   lineDashOffset:3,  //线划线偏移。
   miterLimit:10,  //斜接限制。
 }),
```



## 基础边框

::: demo 
openlayers/examples/样式/Stroke/basic
:::

## 虚线

::: demo 
openlayers/examples/样式/Stroke/dash
:::



## 线帽与连接样式

::: demo 
openlayers/examples/样式/Stroke/other
:::