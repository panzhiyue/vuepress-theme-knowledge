WMS服务

https://enterprise.arcgis.com/zh-cn/server/10.3/publish-services/windows/wms-services.htm







### layerDefs

https://enterprise.arcgis.com/zh-cn/server/10.3/publish-services/windows/filtering-features-using-the-layerdefs-parameter-in-wms-requests.htm

过滤要素

**语法**

```
{
	layerName1:filter1,
	layerName2:filter2,
	.............
	layerNameN:filterN,
}
```

**示例**

```
http://gisserver.domain.com:6080/arcgis/services/MyMapService/MapServer/WmsServer?VERSION=1.3.0&REQUEST=GetFeatureInfo&CRS=CRS:84&BBOX=-180,-90,180,83.604158999999996&WIDTH=660&HEIGHT=318&LAYERS=country,rivers&STYLES=default,default&EXCEPTIONS=xml&FORMAT=image/png&BGCOLOR=0xFEFFFF&TRANSPARENT=TRUE&QUERY_LAYERS=country,rivers&INFO_FORMAT=text/html&I=50&J=50&layerDefs={"country":"POP_CNTRY>100000000","rivers":"NAME LIKE 'Amazon'"}
```