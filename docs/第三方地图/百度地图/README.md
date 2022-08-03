



# 百度坐标转换

 国际经纬度坐标标准为WGS-84,国内要求使用国测局使用的GCJ-02对地理坐标进行加密。百度坐标在此基础上进行了BD-09二次加密措施。

以下是百度API提供的接口

URL:http://api.map.baidu.com/geoconv/v1/?coords=114.21892734521,29.575429778924&from=1&to=5&ak=你的密钥

请求参数

| 参数名称 |                             含义                             |  类型  |              举例               | 默认值 | 是否必须 |
| :------: | :----------------------------------------------------------: | :----: | :-----------------------------: | :----: | :------: |
|  coords  |  需转换的源坐标，多组坐标以“；”分隔  		（经度，纬度）  | float  | 114.21892734521,29.575429778924 |   无   |    是    |
|    ak    | 开发者密钥,用户申请注册的key [申请ak](http://lbsyun.baidu.com/apiconsole/key/create) | string |                                 |   无   |    是    |
|   from   | 源坐标类型： 		 			1：GPS设备获取的角度坐标，wgs84坐标; 			2：GPS获取的米制坐标、sogou地图所用坐标; 			3：google地图、soso地图、aliyun地图、mapabc地图和amap地图所用坐标，国测局（gcj02）坐标; 			4：3中列表地图坐标对应的米制坐标; 			5：百度地图采用的经纬度坐标; 			6：百度地图采用的米制坐标; 			7：mapbar地图坐标; 			8：51地图坐标 |  int   |                1                |   1    |    否    |
|    to    | 目标坐标类型： 		 			5：bd09ll(百度经纬度坐标), 			6：bd09mc(百度米制经纬度坐标); |  int   |                5                |   5    |    否    |
|    sn    | 若用户所用ak的校验方式为sn校验时该参数必须 [sn生成](http://lbsyun.baidu.com/index.php?title=webapi/appendix) | string |                                 |   无   |    否    |
|  output  |                         返回结果格式                         | string |              json               |  json  |    否    |



## 

## 返回结果参数

|  名称  |      类型       |                         说明                         |      |
| :----: | :-------------: | :--------------------------------------------------: | ---- |
| status |       Int       | 本次API访问状态，如果成功返回0，如果失败返回其他数字 |      |
| result | json或者xml数组 |                       转换结果                       |      |
|        |        x        |                        float                         | 经度 |
|        |        y        |                        float                         | 纬度 |

状态码说明

|        |          |                          |                                                              |
| :----: | :------: | :----------------------: | :----------------------------------------------------------: |
| 返回码 | 英文描述 |           定义           |                           常见原因                           |
|   0    |    ok    |           正常           |                       服务请求正常召回                       |
|   1    |          |         内部错误         |                                                              |
|   4    |          |         转换失败         | X→GPS时必现，根据法律规定，不支持将任何类型的坐标转换为GPS坐标 |
|   21   |          |         from非法         |                                                              |
|   22   |          |          to非法          |                                                              |
|   24   |          |      coords格式非法      |                                                              |
|   25   |          | coords个数非法，超过限制 |                                                              |
|   26   |          |         参数错误         |                                                              |

 以上可以参照[百度web服务API服务文档](http://lbsyun.baidu.com/index.php?title=webapi/guide/changeposition)

## GPS转百度坐标

### c#

```csharp
        public static string GPS_To_BD(string lng, string lat)
        {
            try
            {
                string apiUrl = "http://api.map.baidu.com/geoconv/v1/?coords=" + lng + "," + lat + "&from=1&to=5&ak=d48dRYg4j4K81puarHtLXBheW40bG1HW";
                string res = ResponseGet(apiUrl);
                BDResult bdResult = Deserialize<BDResult>(res);//json解析
                if (bdResult != null && bdResult.status == 0)
                {
                    double x = bdResult.result[0].x;
                    double y = bdResult.result[0].y;
                    return x + "," + y;
                }
            }
            catch (Exception ex)
            {

            }
            return string.Empty;
        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

```csharp
        public class BDResult
        {
            public int status;
            public Point[] result;
        }

        public class Point
        {
            public double x;
            public double y;
        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

```csharp
public static string SendDataByGET(string Url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url);

            request.Method = "GET";
            request.ContentType = "text/html;charset=UTF-8";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream myResponseStream = response.GetResponseStream();
            StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
            string retString = myStreamReader.ReadToEnd();
            myStreamReader.Close();
            myResponseStream.Close();
            return retString;
        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)



百度地图2.0



```javascript
 translateToBD: function (pointArr, translateCallback) {
        var convertor = new BMap.Convertor();
        convertor.translate(pointArr, 1, 5, translateCallback);
    }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### 百度坐标转GPS(还是有误差)



```javascript
//判断坐标是否在中国
    outOfChina: function (point) {
        var lat = point.lat;
        var lng = point.lng;
        if (lng < 72.004 || lng > 137.8347) {
            return true;
        }
        if (lat < 0.8293 || lat > 55.8271) {
            return true;
        }
        if ((lng < 121.750 && lng > 119.962) && (lat < 25.463 && lat > 21.586)) {
            return true;
        }
        return false;
    },
    translateBDToWGS84: function (point) {
        if (this.outOfChina(point)) {
            return point;
        }
        var x = point.lng - 0.0065;
        var y = point.lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
        var lng = z * Math.cos(theta);
        var lat= z * Math.sin(theta);
        return new BMap.Point(lng,lat);
    }
```

