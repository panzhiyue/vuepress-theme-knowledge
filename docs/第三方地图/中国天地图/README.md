# 中国天地图

## 资源

1.官网: https://www.tianditu.gov.cn/

2.申请tk: https://console.tianditu.gov.cn/api/key

3.服务地址: http://lbs.tianditu.gov.cn/server/MapService.html

## 地图服务

http://lbs.tianditu.gov.cn/server/MapService.html

### 服务地址模板

**经纬度投影**

```javascript
http://t0.tianditu.gov.cn/${layer}_c/wmts?layer=${layer}&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${tk}
```

**墨卡托投影**

```javascript
http://t0.tianditu.gov.cn/${layer}_w/wmts?layer=${layer}&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${tk}
```

**参数**

- layer：矢量地图:vec,矢量注记:cva,矢量英文注记:eva,影像地图:img,影像注记:cia,影像英文注记:eia,地形地图:ter,地形注记:cta,全球境界:ibo
- tk：秘钥

### 3.地理编码解析
::: demo

第三方地图/examples/中国天地图/geocoder

:::