# src/ol：源码目录

## control：控件目录

### Attribution.js：显示与层源关联的所有属性，一般显示在右下角

![image-20221101161928015](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221101161928015.webp)

### Control.js：控件基类

### FullScreen.js：全屏控件

![image-20221101162125879](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221101162125879.webp)

### MousePosition.js：鼠标坐标信息

![image-20221101162148216](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221101162148216.webp)

### OverviewMap.js：鹰眼

![image-20221101162226806](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221101162226806.webp)

### Rotate.js：地图旋转复原

![image-20221101162328387](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221101162328387.webp)

### ScaleLine.js：比例尺控件

![image-20221101162356168](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221101162356168.webp)

### Zoom.js：地图放大缩小

![image-20221101162428713](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221101162428713.webp)

### ZoomSlider.js：地图缩放滑条

![image-20221101162457324](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221101162457324.webp)

### ZoomToExtent.js

## events

### condition.js

### Event.js

### EventType.js

### KeyCode.js：键码对应表

### Target.js

## extent

### Corner.js：四至方位角枚举

### Relationship.js：与某个extent的关系枚举

## format

### filter

#### And.js

#### Bbox.js

#### Comparison.js

#### ComparisonBinary.js

#### Contains.js

#### Disjoint.js

#### During.js

#### DWithin.js

#### EqualTo.js

#### Filter.js

#### GreaterThan.js

#### GreaterThanOrEqualTo.js

#### Intersects.js

#### IsBetween.js

#### IsLike.js

#### IsNull.js

#### LessThan.js

#### LessThanOrEqualTo.js

#### LogicalNary.js

#### Not.js

#### NotEqualTo.js

#### Or.js

#### ResourceId.js

#### Spatial.js

#### Within.js

### EsriJSON.js

### Feature.js

### filter.js

### FormatType.js

### GeoJSON.js

### GML.js

### GML2.js

### GML3.js

### GML32.js

### GMLBase.js

### GPX.js

### IGC.js

### IIIFInfo.js

### JSONFeature.js

### KML.js

### MVT.js

### OSMXML.js

### OWS.js

### Polyline.js

### TextFeature.js

### TopoJSON.js

### WFS.js

### WKB.js

### WKT.js

### WMSCapabilities.js

### WMSGetFeatureInfo.js

### WMTSCapabilities.js

### xlink.js

### XML.js

### XMLFeature.js

### xsd.js

## geom

### flat

#### area.js

#### center.js

#### closest.js

#### contains.js

#### deflate.js

#### flip.js

#### geodesic.js

#### inflate.js

#### interiorpoint.js

#### interpolate.js

#### intersectsextent.js

#### length.js

#### orient.js

#### reverse.js

#### segments.js

#### simplify.js

#### straightchunk.js

#### textpath.js

#### topology.js

#### transform.js

### Circle.js

### Geometry.js：几何图形基类

### GeometryCollection.js

### GeometryLayout.js：几何图形维度枚举

### GeometryType.js：几何类型枚举

### LinearRing.js：几何环

### LineString.js：几何线

### MultiLineString.js：几何多线

### MultiPoint.js：几何多点

### MultiPolygon.js：几何多面

### Point.js：几何点

### Polygon.js：几何面

### SimpleGeometry.js：几何基类

## interaction：地图交互目录

### DoubleClickZoom.js：双击缩放交互

### DragAndDrop.js：通过拖放处  理矢量数据的输入。

### DragBox.js：

### DragPan.js：

### DragRotate.js：

### DragRotateAndZoom.js：

### DragZoom.js：

### Draw.js：

### Extent.js

### Interaction.js：交互基类

### KeyboardPan.js：键盘移动

### KeyboardZoom.js：键盘缩放

### Modify.js：修改几何

### MouseWheelZoom.js：鼠标滚轮缩放

### PinchRotate.js：手势选装

### PinchZoom.js：手势缩放

### Pointer.js：

### Property.js：

### Select.js

### Snap.js：

### Translate.js

## layer

### Base.js

### BaseImage.js

### BaseTile.js

### BaseVector.js

### Graticule.js

### Group.js

### Heatmap.js

### Image.js

### Layer.js

### MapboxVector.js

### Property.js

### Tile.js

### TileProperty.js

### Vector.js

### VectorImage.js

### VectorTile.js

### VectorTileRenderType.js

### WebGLPoints.js

### WebGLTile.js

## pointer

### EventType.js

## proj

### epsg3857.js：3857坐标系定义

### epsg4326.js：4326坐标系定义

### proj4.js：实现了通过proj4.js自定义坐标系的功能

```javascript
import proj4 from "proj4"
import olProj4 from "ol/proj/proj4"
let projs=[
    {
        srid:4490,
        proj4text:'+proj=longlat +ellps=GRS80 +no_defs +type=crs'
    },
    {
        srid:4549,
        proj4text:'+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs +type=crs'
    },
]

for (let i = 0; i < projs.length; i++) {
  let item = projs[i];
  if (item.srid && item.proj4text) {
    proj4.defs("EPSG:" + item.srid, item.proj4text);
  }
}
olProj4.register(proj4);

```



### Projection.js：坐标系基类

### projections.js

### transforms.js

### Units.js：坐标系单位相关

## render

### canvas

#### Builder.js

#### BuilderGroup.js

#### BuilderType.js

#### Executor.js

#### ExecutorGroup.js

#### hitdetect.js

#### ImageBuilder.js

#### Immediate.js

#### Instruction.js

#### LineStringBuilder.js

#### PolygonBuilder.js

#### TextBuilder.js

### Box.js

### canvas.js

### Event.js

### EventType.js

### Feature.js

### VectorContext.js

## renderer

### canvas

#### common.js

#### ImageLayer.js

#### Layer.js

#### TileLayer.js

#### VectorImageLayer.js

#### VectorLayer.js

#### VectorTileLayer.js

### webgl

#### Layer.js

#### PointsLayer.js

#### TileLayer.js

### Composite.js

### Layer.js

### Map.js

### vector.js

## reproj

### common.js

### Image.js

### Tile.js

### Triangulation.js

## source：源文件夹

### BingMaps.js

### CartoDB.js

### Cluster.js

### common.js

### DataTile.js

### GeoTIFF.js

### IIIF.js

### Image.js

### ImageArcGISRest.js

### ImageCanvas.js

### ImageMapGuide.js

### ImageStatic.js

### ImageWMS.js

### OGCMapTile.js

### ogcTileUtil.js

### OGCVectorTile.js

### OSM.js

### Raster.js

### Source.js

### Stamen.js

### State.js

### Tile.js

### TileArcGISRest.js

### TileDebug.js

### TileEventType.js

### TileImage.js

### TileJSON.js

### TileWMS.js

### UrlTile.js

### UTFGrid.js

### Vector.js

### VectorEventType.js

### VectorTile.js

### WMSServerType.js

### WMTS.js

### WMTSRequestEncoding.js

### XYZ.js

### Zoomify.js

## structs

### LinkedList.js

### LRUCache.js

### PriorityQueue.js

### RBush.js

## style：样式文件夹

### Circle.js：圆样式定义

### expressions.js

### Fill.js：填充样式定义

### Icon.js

### IconAnchorUnits.js

### IconImage.js

### IconImageCache.js

### IconOrigin.js

### Image.js

### literal.js

### RegularShape.js

### Stroke.js：线样式定义

### Style.js：

### Text.js：文本样式定义

### TextPlacement.js

## tilegrid

### common.js

### TileGrid.js

### WMTS.js

## vec

### mat4.js

## webgl

### Buffer.js

### ContextEventType.js

### Helper.js

### PaletteTexture.js

### PostProcessingPass.js

### RenderTarget.js

### ShaderBuilder.js

### TileTexture.js

## worker

### version.js

### webgl.js

## array.js

## AssertionError.js

## asserts.js

## centerconstraint.js

## Collection.js

## CollectionEventType.js

## color.js

## colorlike.js

## control.js

## coordinate.js

## css.js

## DataTile.js

## Disposable.js

## dom.js

## easing.js

## events.js

## extent.js

## Feature.js

## featureloader.js

## format.js

## functions.js

## Geolocation.js

## geom.js

## has.js

## Image.js

## ImageBase.js

## ImageCanvas.js

## ImageState.js

## ImageTile.js

## index.js

## interaction.js

## Kinetic.js

## layer.js

## loadingstrategy.js

## Map.js

## MapBrowserEvent.js

## MapBrowserEventHandler.js

## MapBrowserEventType.js

## MapEvent.js

## MapEventType.js

## MapProperty.js

## math.js

## net.js

## obj.js

## Object.js

## ObjectEventType.js

## Observable.js

## ol.css

## Overlay.js

## OverlayPositioning.js

## pixel.js

## PluggableMap.js

## proj.js

## render.js

## reproj.js

## resolutionconstraint.js

## rotationconstraint.js

## size.js

## source.js

## sphere.js

## string.js

## style.js

## Tile.js

## TileCache.js

## tilecoord.js

## tilegrid.js

## TileQueue.js

## TileRange.js

## TileState.js

## tileurlfunction.js

## transform.js

## uri.js

## util.js

## VectorRenderTile.js

## VectorTile.js

## View.js

## ViewHint.js

## ViewProperty.js

## webgl.js

## xml.js

# task：打包任务相关

## .eslintrc

## changelog.sh：从合并提交生成Markdown格式的更改日志。

## generate-index.js

## generate-info.js

## next-dev-version.js

## prepare-package.js

## publish.sh

## serialize-workers.cjs

# test：测试文件夹

# .editorconfig

# .eslintignore

# .gitignore

# .nvmrc

# CODE_OF_CONDUCT.md

# CONTRIBUTING.md

# DEVELOPING.md

# LICENSE.md

# package-lock.json

# package.json

# README.md

# tsconfig.json
