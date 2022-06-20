# Circle

[ol/style/Circle](https://openlayers.org/en/latest/apidoc/module-ol_style_Circle-CircleStyle.html)

```javascript
style: new Style({
  image: new Cirlce({
    radius: 2, //圆半径
    fill: new Fill({
      color: "blue",
    }),
    stroke: new Stroke({
      color: "white",
      width: 1,
    }),
    displacement: [0, 0], // 位移
    scale: 1, //1,[2,2]  //比例，二维比例生成椭圆
    rotation: 0, //弧度为单位的旋转
    rotateWithView: false, //是否随视图旋转形状（仅在与二维比例结合使用时才有意义）。
  }),
}),
```

## 基础样式

::: demo 
openlayers/examples/样式/Circle/basic
:::



## 椭圆

::: demo 
openlayers/examples/样式/Circle/ellipse
:::