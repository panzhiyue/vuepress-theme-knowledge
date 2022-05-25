# mdb获取图层要素类型与坐标系

![image-20220228194412742](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203010827842.png)

mdb图层相关信息存储在表`gdb_items`中

- Name:图层名称
- Definition:图层信息

**查询指定图层信息**

```sql
select Definition from gbd_items where Name='图层名称'
```



**Definition示例数据如下**

```xml
<DEFeatureClassInfo xsi:type='typens:DEFeatureClassInfo'
    xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
    xmlns:xs='http://www.w3.org/2001/XMLSchema'
    xmlns:typens='http://www.esri.com/schemas/ArcGIS/10.4'>
    <CatalogPath>\jzq_d</CatalogPath>
    <Name>jzq_d</Name>
    <ChildrenExpanded>false</ChildrenExpanded>
    <DatasetType>esriDTFeatureClass</DatasetType>
    <DSID>3</DSID>
    <Versioned>false</Versioned>
    <CanVersion>false</CanVersion>
    <ConfigurationKeyword></ConfigurationKeyword>
    <RequiredGeodatabaseClientVersion>10.0</RequiredGeodatabaseClientVersion>
    <HasOID>true</HasOID>
    <OIDFieldName>OBJECTID</OIDFieldName>
    <GPFieldInfoExs xsi:type='typens:ArrayOfGPFieldInfoEx'>
        <GPFieldInfoEx xsi:type='typens:GPFieldInfoEx'>
            <Name>OBJECTID</Name>
            <FieldType>esriFieldTypeOID</FieldType>
            <IsNullable>false</IsNullable>
            <Required>true</Required>
            <Editable>false</Editable>
        </GPFieldInfoEx>
        <GPFieldInfoEx xsi:type='typens:GPFieldInfoEx'>
            <Name>Shape</Name>
            <FieldType>esriFieldTypeGeometry</FieldType>
            <IsNullable>true</IsNullable>
            <Required>true</Required>
        </GPFieldInfoEx>
    </GPFieldInfoExs>
    <CLSID>{52353152-891A-11D0-BEC6-00805F7C4268}</CLSID>
    <EXTCLSID></EXTCLSID>
    <RelationshipClassNames xsi:type='typens:Names'></RelationshipClassNames>
    <AliasName></AliasName>
    <ModelName></ModelName>
    <HasGlobalID>false</HasGlobalID>
    <GlobalIDFieldName></GlobalIDFieldName>
    <RasterFieldName></RasterFieldName>
    <ExtensionProperties xsi:type='typens:PropertySet'>
        <PropertyArray xsi:type='typens:ArrayOfPropertySetProperty'></PropertyArray>
    </ExtensionProperties>
    <ControllerMemberships xsi:type='typens:ArrayOfControllerMembership'></ControllerMemberships>
    <EditorTrackingEnabled>false</EditorTrackingEnabled>
    <CreatorFieldName></CreatorFieldName>
    <CreatedAtFieldName></CreatedAtFieldName>
    <EditorFieldName></EditorFieldName>
    <EditedAtFieldName></EditedAtFieldName>
    <IsTimeInUTC>true</IsTimeInUTC>
    <FeatureType>esriFTSimple</FeatureType>
    <ShapeType>esriGeometryPoint</ShapeType>
    <ShapeFieldName>Shape</ShapeFieldName>
    <HasM>false</HasM>
    <HasZ>false</HasZ>
    <HasSpatialIndex>true</HasSpatialIndex>
    <AreaFieldName></AreaFieldName>
    <LengthFieldName></LengthFieldName>
    <Extent xsi:nil='true'/>
    <SpatialReference xsi:type='typens:GeographicCoordinateSystem'>	<WKT>GEOGCS[&quot;GCS_China_Geodetic_Coordinate_System_2000&quot;,DATUM[&quot;D_China_2000&quot;,SPHEROID[&quot;CGCS2000&quot;,6378137.0,298.257222101]],PRIMEM[&quot;Greenwich&quot;,0.0],UNIT[&quot;Degree&quot;,0.0174532925199433],AUTHORITY[&quot;EPSG&quot;,4490]]</WKT>
        <XOrigin>-400</XOrigin>
        <YOrigin>-400</YOrigin>
        <XYScale>1111948722.2222221</XYScale>
        <ZOrigin>-100000</ZOrigin>
        <ZScale>10000</ZScale>
        <MOrigin>-100000</MOrigin>
        <MScale>10000</MScale>
        <XYTolerance>8.9831528411952133e-009</XYTolerance>
        <ZTolerance>0.001</ZTolerance>
        <MTolerance>0.001</MTolerance>
        <HighPrecision>true</HighPrecision>
        <LeftLongitude>-180</LeftLongitude>
        <WKID>4490</WKID>
        <LatestWKID>4490</LatestWKID>
    </SpatialReference>
    <ChangeTracked>false</ChangeTracked>
    <FieldFilteringEnabled>false</FieldFilteringEnabled>
    <FilteredFieldNames xsi:type='typens:Names'></FilteredFieldNames>
</DEFeatureClassInfo>
```

- ShapeType:图层几何类型
  - esriGeometryPoint：点
  - esriGeometryPolyline:线
  - esriGeometryPolygon:面
- SpatialReference：坐标系信息
  - wkt:坐标系wkt格式（完整描述了一个坐标系）
  - wkid:坐标系id（可以在https://epsg.io/通过id查询坐标系相关信息，https://epsg.io/4490.wkt?download可以下载.prj文件）