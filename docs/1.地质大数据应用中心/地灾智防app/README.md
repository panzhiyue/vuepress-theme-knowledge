# 地灾智防app
## 地图列表

| 序号 | 模块     |          |
| ---- | -------- | -------- |
| 1    | 等级预报 | grade    |
| 2    | 实时预警 | RealTime |
| 3    | 专业监测 | monitor  |
| 4    | 台风路径 | 第三方   |
| 5    | 地灾巡查 | disaster |
| 6    | 驻县进乡 | county   |
| 7    | 切坡建房 | h5       |

省级用户token:234034a92f0e490b8fcac061954f7752






## 1.等级预报



### 地址

本地测试：

 http://192.168.21.188:9998/#/grade?startTime=1631552400&areaId=1437&token=234034a92f0e490b8fcac061954f7752&isZG=true&areaCode=330000

服务器:

https://dzzfh5.zjgeobigdata.com:6083/#/grade?startTime=1631552400&areaId=1437&token=234034a92f0e490b8fcac061954f7752&areaCode=330000

**参数**

**startTime**:时间戳

**areaId**:地区主键

**areaCode**:地区编码

**token:**请求后台接口所需的token值

### APP接口

| 序号 | 接口      | 说明       | 示例 |
| ---- | --------- | ---------- | ---- |
| 1    | loading() | 显示加载中 |      |
| 2    | loadEnd() | 加载完毕   |      |



### 网页接口

| 序号 | 接口                                 | 说明           | 示例                                |
| ---- | ------------------------------------ | -------------- | ----------------------------------- |
| 1    | reset(startTime,areaId,areaCode)     | 重置到最新状态 | reset('1631552400','1427','330100') |
| 2    | setCurrentLocation(lon,lat,showIcon) | 设置中心点     | setCurrentLocation(120,28,true)     |





## 2.实时预警地图



### 地址

本地测试

http://192.168.21.188:9998//#/RealTime?startTime=1632376800&areaId=1437&token=234034a92f0e490b8fcac061954f7752&isZG=true

服务器

https://dzzfh5.zjgeobigdata.com:6083/#/RealTime?startTime=1632376800&areaId=1437&token=234034a92f0e490b8fcac061954f7752&isZG=true

**参数**

**startTime**:时间戳

**areaId**:地区编码

**token:**请求后台接口所需的token值

### 逻辑

#### 1.点击省气泡

放大到指定市，然后显示县聚合

#### 2.点击市级气泡

放大到指定县，然后显示个体，显示风险区列表

#### 3.点击详细点位

显示风险区，避险路线，避险点，列表改为点击的风险区信息

........

### APP接口

| 序号 | 接口                                      | 描述                 | 示例 |
| ---- | ----------------------------------------- | -------------------- | ---- |
| 1    | loading()                                 | 显示加载中           |      |
| 2    | loadEnd()                                 | 加载完毕             |      |
| 3    | getNextLevelData(areaId, startTime)       | 显示下级行政区统计表 |      |
| 4    | reset()                                   | app重置到最初状态    |      |
| 5    | requestLocation()                         | 显示点位详情         |      |
| 6    | getRiskPointList(areaId, startTime,level) | 显示风险区列表       |      |
| 7    | getDetail(num)                            | 显示点位详情         |      |



### 网页接口

| 序号 | 接口                                       | 描述                | 示例                                       |
| ---- | ------------------------------------------ | ------------------- | ------------------------------------------ |
| 1    | reset(startTime,areaId)                    | 重置到最初状态      | reset(1632376800,1427)                     |
| 2    | back(level)                                | 选择不同预警等级    | back(5);                                   |
| 3    | backToCity()                               | 返回市层级,刷新图层 |                                            |
| 4    | backToPoint()                              | 返回点位            |                                            |
| 5    | backFromLocation()                         | 从定位返回,刷新图层 |                                            |
| 6    | getDetail(longitude,latitude,num)          | 定位到点位详情      | getDetail(120.19 ,27.5193, '330327FF0059') |
| 7    | getNearRiskPoint(longitude, latitude)      | 获取5公里风险区     | getNearRiskPoint(, )                       |
| 8    | setCity(areaId, type, longitude, latitude) | 设置行政区          | setCity(1379, 3, 120.539124, 29.076408)    |



### 其他

level:1红2橙3黄5无预警

type:1:省级气泡,2:市级气泡,3:详细点位,4:点位信息

### BUG

1.点击市级气泡没有显示风险区列表

2.缺少显示详情的接口

3.公里内列表关闭按钮无效

4.选择时间没有刷新地图

## 3.专业监测



### 地址

本地测试

http://192.168.21.188:9998/#/monitor?startTime=1632376800&areaCode=330100&token=234034a92f0e490b8fcac061954f7752

本地发布

https://dzzfh5.zjgeobigdata.com:6083/#/monitor?startTime=1632376800&areaCode=330100&token=234034a92f0e490b8fcac061954f7752

**参数**

**startTime**:时间戳

**areaCode**:地区编码，空值表示浙江省

**token:**请求后台接口所需的token值

### 逻辑

1.地图初始化

地图初始化时显示每个市的站点统计信息

2.点击市统计气泡框

点击市统计气泡框，则显示该市下所有县的统计信息

3.点击县统计气泡框

点击县统计气泡框显示该县所有监测站点位

4.点击监测站点位

点击监测站点位显示该监测站所有设备信息

### APP接口

| 序号 | 接口                                      | 描述                 | 示例 |
| ---- | ----------------------------------------- | -------------------- | ---- |
| 1    | loading()                                 | 显示加载中           |      |
| 2    | loadEnd()                                 | 加载完毕             |      |
| 3    | getNextLevelData(areaId, startTime)       | 显示下级行政区统计表 |      |
| 4    | reset()                                   | app重置到最初状态    |      |
| 5    | requestLocation()                         | 显示点位详情         |      |
| 6    | getRiskPointList(areaId, startTime,level) | 显示风险区列表       |      |



### 网页接口

| 序号 | 接口                                       | 描述                | 示例                                       |
| ---- | ------------------------------------------ | ------------------- | ------------------------------------------ |
| 1    | rest(startTime,areaId)                     | 重置到最初状态      |                                            |
| 2    | back(level)                                | 选择不同预警等级    | back(5);                                   |
| 3    | backToCity()                               | 返回市层级,刷新图层 |                                            |
| 4    | backToPoint()                              | 返回点位            |                                            |
| 5    | backFromLocation()                         | 从定位返回,刷新图层 |                                            |
| 6    | getDetail(longitude,latitude,num)          | 定位到点位详情      | getDetail(120.19 ,27.5193, '330327FF0059') |
| 7    | getNearRiskPoint(longitude, latitude)      | 获取5公里风险区     | getNearRiskPoint(, )                       |
| 8    | setCity(areaId, type, longitude, latitude) | 设置行政区          | setCity(1379, 3, 120.539124, 29.076408)    |



### 其他

level:1红2橙3黄5无预警

type:1:省级气泡,2:市级气泡,3:详细点位,4:点位信息

### BUG

1.点击市级气泡没有显示风险区列表

2.缺少显示详情的接口

3.公里内列表关闭按钮无效

4.选择时间没有刷新地图

## 5.地灾巡查

### 地址

本地测试

http://192.168.21.188:9998/#/disaster?areaId=1437&lng=120&lat=29&zoom=7&startDate=&finishDate=&token=234034a92f0e490b8fcac061954f7752

服务器

https://dzzfh5.zjgeobigdata.com:6083/#/disaster?areaId=1437&lng=120&lat=29&zoom=7&startDate=&finishDate=&token=234034a92f0e490b8fcac061954f7752

### 网页接口

| 序号 | 接口                                                       | 描述     | 示例                        |
| ---- | ---------------------------------------------------------- | -------- | --------------------------- |
| 1    | reset(zoom, areaId, startDate, finishDate,token, lng, lat) | 重置地图 | reset(7,1437,0,0,'',120,29) |

## 6.驻县进乡

### 地址

本地测试

http://192.168.21.188:9998/#/county?areaId=1437&token=234034a92f0e490b8fcac061954f7752

本地发布

http://192.168.22.142:8080/#/county?areaId=1437&token=234034a92f0e490b8fcac061954f7752

**参数**

**token:**请求后台接口所需的token值

**areaId**:地区编码

### 逻辑





### app接口

| 接口      | 描述                                 | 示例 |
| --------- | ------------------------------------ | ---- |
| loading() | 显示加载中                           |      |
| loadEnd() | 加载结束                             |      |
|           | 进入签到页面                         |      |
|           | 进入设备列表                         |      |
|           | 点击省级气泡，显示该市进乡人员统计表 |      |
|           | 点击市级气泡，显示街道人员列表       |      |
| reset()   | 重置到最初状态                       |      |



### 网页接口

| 接口                                       | 描述                           | 示例                                     |
| ------------------------------------------ | ------------------------------ | ---------------------------------------- |
| reset(areaId, type, level)                 | 重置地图                       | reset(1437,1,1)                          |
| getDeviceStatisData(areaId,level)          | 获取并显示设备统计信息         | getDeviceStatisData(1437,1)              |
| getCountrysideStatisticsList(areaId,level) | 获取并显示进乡人员统计信息     | getCountrysideStatisticsList(1437,1)     |
| getCountrysideStatisticsDetailList(areaId) | 获取街道级别的进乡人员点位信息 | getCountrysideStatisticsDetailList(1437) |



## 7.切坡建房

### 地址

本地测试

http://192.168.21.188:9998/#/home?token=234034a92f0e490b8fcac061954f7752

本地发布

http://192.168.22.142:8080/#/home?token=234034a92f0e490b8fcac061954f7752

测试地址

https://dzzfh5.zjgeobigdata.com:6083/#/home?token=234034a92f0e490b8fcac061954f7752

**参数**

**token:**请求后台接口所需的token值

### app接口

| 接口              | 描述                             | 示例 |
| ----------------- | -------------------------------- | ---- |
| back()            | 页面退回                         |      |
| requestLocation() | 当前位置(逻辑与实时预警一模一样) |      |

### 网页接口

|      |      |      |
| ---- | ---- | ---- |
|      |      |      |

## 8.首页雨量数据

### 地址

本地测试

http://192.168.22.142:9998/#/rainfallData?startTime=1641699492&endTime=1646797093&token=15a191262c5b4354949eac0cb9bcdf7e

**参数**

**startTime:**开始时间戳

**endTime:**结束时间戳

**token:**请求后台接口所需的token值

### app接口

| 接口             | 描述         | 示例 |
| ---------------- | ------------ | ---- |
| showTimePicker() | 显示时间选择 |      |

### 网页接口

| 接口                                        | 描述                                                       | 示例 |
| ------------------------------------------- | ---------------------------------------------------------- | ---- |
| updateTime(startTime:Number,endTime:Number) | 更新时间<br />startTime:开始时间戳<br />endTime:结束时间戳 |      |

## 9.实时预警(地区查询)

根据areaid与level显示风险区信息

**参数**

**startTime**:时间戳（不传表示当前时间）

**areaCode**:地区编码

**level:**预警等级（0表示全部显示）

**token:**请求后台接口所需的token值

### 地址

本地测试

http://192.168.21.188:9998/#/realTime_area?areaCode=330000&level=0&token=234034a92f0e490b8fcac061954f7752&isZG=true&startTime=1632376800

### app接口

| 接口           | 描述     | 示例 |
| -------------- | -------- | ---- |
| loading()      | 显示加载 |      |
| loadEnd()      | 隐藏加载 |      |
| getDetail(num) | 显示详情 |      |

### 网页接口

| 接口                                    | 描述     | 示例 |
| --------------------------------------- | -------- | ---- |
| reset(areaCode,level,startTime?)        | 重置     |      |
| getDetail(longitude,latitude,num,level) | 显示详情 |      |




## 10.实时雨量


**参数**

**startTime**:开始时间,yyyy-MM-dd HH:mm:ss
**endTime**:结束时间,yyyy-MM-dd HH:mm:ss
**aging**:雨量时效 (默认为1可不用)

### 地址

本地测试
http://192.168.21.188:9998/#/RealTimeRain?startTime=2022-01-06 19:00:38&endTime=2022-04-16 19:00:38&aging=1

http://192.168.21.188:9998/#/RealTimeRain?startTime=2021-07-24%2023%3A00%3A00&endTime=2021-07-25%2023%3A00%3A00&aging=1

### 网页接口

| 接口                           | 描述 | 示例                                                  |
| ------------------------------ | ---- | ----------------------------------------------------- |
| reset(startTime,endTime,aging) | 重置 | reset('2022-01-06 19:00:38','2022-04-16 19:00:38',24) |




## 11.预报雨量


**参数**

**time**:查询雨量时间点（当前支持时间点为08时和20时），必填,yyyy-MM-dd HH:mm:ss
**aging**:雨量时效（目前提供24小时时效雨量），必填

### 地址

本地测试
http://192.168.21.188:9998/#/ForecastRain?time=2021-07-25 08:00:00&aging=24

### 网页接口

| 接口              | 描述 | 示例                            |
| ----------------- | ---- | ------------------------------- |
| reset(time,aging) | 重置 | reset('2021-07-25 08:00:00',24) |









## 12.一张图

目前已有数据:风险防范区，切坡建房，隐患点，地灾易发区，年度灾险情

**参数**

- areaCode:行政区代码


**地址**

本地测试

http://192.168.21.188:9998/#/aPicture?areaCore=330225000

## 13.极值雨量

https://dzzfh5.zjgeobigdata.com:6083/#/riskDetail/rainfallData?id=56417

## 14.风险区地图详情

https://dzzfh5.zjgeobigdata.com:6083/#/RealTimeDetail?num=330226FF0233&token=234034a92f0e490b8fcac061954f7752

### 图层类型枚举

```javascript
 const LayerTypeEnum = {
     RiskZone: 1, //风险防范区
     CutSlopeBuilding: 2, //切坡建房
     HiddenPoint: 3, //隐患点
     RiskInvestigation: 4, //风险调查
     ProneArea: 5, //地灾易发区
     SlopeElement: 6, //斜坡单元
     TyphoonReplay: 7, //台风复盘
     DisasterRiskYear: 8 //年度灾险情
 }
```



### 跳转详情

```javascript
    /**
     * 跳转详情
     * @param {any} id  主键)
     * @param {any} num 编号
     * @param {Number} type 图层类型
     * @param {Object} properties 属性集
     */
    app_goDetail(id, num, type, properties) {
      console.log(id,num, type, properties);
      if (window.dzdd) {
        window.dzdd.goDetail(id, num, type, properties);
      } else if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.goDetail.postMessage([
          id,
          num,
          type,
          properties,
        ]);
      }
    },
```

风险防范区:

```
24564 '330212FF0038' 1 '{"id":24564,"name":"横溪镇横溪村中街周乾国屋后边坡风险点风险防范区","num":"330212FF0038","szqx":"鄞州区","szz":"横溪镇","dz":"宁波市鄞州区横溪镇","datatype":"一般防范区","level":"低","affectedFamily":1,"affectedPeople":3,"affectedAsset":8,"hazardAffectedBody":"风险点","stability":"较稳定","lng":121.594,"lat":29.7215}'
```

切坡建房

```

```

隐患点

```
15123 undefined 3 '{"id":15123,"name":"裘村镇岭下村李能华家屋后","areacode":"330283106","uuid":null,"szs":"宁波市","szqx":"奉化区","szz":"裘村镇","dz":"裘村镇岭下村李能华家屋后","ggid":null,"yzbm":null,"geo":"AAAAAAEBAAAAVOOlm8RmXkDcV6bBqZ49QA==","geotype":null,"iId":null,"layerFilesId":null,"status":18,"bstype":null,"createDate":"2022-04-02 01:03:30","creatorId":null,"editorId":null,"editDate":null,"editMemo":null,"deleteDate":null,"deleterId":null,"commitDate":null,"committerId":null,"commitMemo":null,"checkDate":null,"checkerId":null,"checkResult":null,"checkResultMemo":null,"checkerEditxyDate":null,"editxyUserid":null,"checkerEditxyMemo":null,"publishDate":null,"publisherId":null,"publishResult":null,"publishResultMemo":null,"revokeApplyDate":null,"revokeApplicantId":null,"revokeApplyReason":null,"revokeCheckDate":null,"revokeCheckerId":null,"revokeCkResult":null,"revokeCkResultMemo":null,"revokePubDate":null,"revokePublisherId":null,"revokePubResult":null,"revokePubResultMemo":null,"updateApplyDate":null,"updateApplicantId":null,"updateApplyReason":null,"updateCheckDate":null,"updateCheckerId":null,"updateCkResult":null,"updateCkResultMemo":null,"updatePubDate":null,"updatePublisherId":null,"updatePubResult":null,"updatePubResultMemo":null,"operationDate":null,"operatorId":null,"operationResult":null,"operationMemo":null,"filereportId":null,"collectorId":null,"firstSubmitDate":null,"field1":null,"field2":null,"field3":null,"reason":null,"isreturn":-1,"isdel":"0","tybh":"330283010010","discovertime":"2015-07-11 00:00:00","threathouse":2,"scaletype":"一般级","threatperson":7,"triggerfactor":"自然因素","threatassets":10,"jtreason":null,"trend":null,"streetliable":null,"gtsliable":null,"monitorper":null,"streetliabletel":null,"gtsliabletel":null,"monitorpertel":null,"clearreason":null,"cleardate":null,"fillman":null,"reviewman":null,"remark":null,"village":null,"realAreacode":null,"x1":"121","x2":"36","x3":"21","y1":"29","y2":"37","y3":"11","yhtype":null,"province":null,"houserperson":7,"projectStarttime":null,"isimplement":false,"projectnum":"3302832017gc010194","fzcs":"工程治理","planfinishdate":"2017年","yhgm":"10","brbqnum":"","brbqstatus":"","projectstatus":null,"threatobj":"居民","gmdjtype":"小型","yhdstability":"差","wxqfw":null,"snxdyear":null,"ismajoryhd":null,"hxyhgm":null,"hxhouse":null,"hxrperson":null,"issupervisionyhd":null,"outbendi":0,"projectname":"裘村镇岭下村李能华屋后","protectpeople":null,"protectfamily":null,"hxtype":null,"hxapplicant":null,"hxreviewer":null,"reduceThreathouse":null,"reduceThreatperson":null,"familysG":null,"peopleG":null,"comfirmhistory":null,"manualEditDate":null,"projecttype2":null,"projectlczt":"7","finishyear":null,"approvaldate":null,"publicitystartdate":null,"publicityenddate":null,"publicitymodality":null,"dispatchdate":null,"identifyingdate":null,"hxrs2":null,"hxhs2":null}'
```

年度灾险情

```
2455 null 8 {"id":"2455","areacode":"330283100","name":"溪口镇下跸驻村江拔线32号对面","zqgm":"10","fssj":"2021-07-26 08:20:24","injuredpeople":0,"diepeople":0,"economicloss":0,"ruinhouse":0,"ruinfield":0,"threathouse":0,"threatporson":0,"threatassets":0,"jd":121.40444444444445,"wd":29.679444444444446}
```



## app调用网页方法无效bug调试步骤

（1）网页方法是否已经绑定到window,浏览器与app可能不一致

（2）判断是否进入hook方法

（3）判断hook方法是否执行完毕

（4）判断函数名，参数是否正确

- 参数如果类型为字符串，则必须使用`''`包裹起来，否则会报错或转为其他类型
- ios只能传递一个参数，所以把多个参数作为数组传递

网页调用

（5）app方法是否为public,private无法访问





## 环境地址

试运行环境:

后端地址:http://115.236.184.59:8092 

h5地址:https://dzzfh5.zjgeobigdata.com:6083/





正式环境:
后端地址:https://app.zjgem.cn 

h5地址:https://appH5.zjgem.cn





韩琛本地

地灾App(/disaster/app/):http://192.168.21.11:8092/  

一体化(/report/):http://192.168.21.11:8082/

## 接口问题

1.需要出了省账号之外其他账号的永久token
2.需要