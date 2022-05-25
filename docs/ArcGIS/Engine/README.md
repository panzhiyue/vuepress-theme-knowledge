# ArcGIS Engine

## 其他

### 1.2019支持ArcGIS10.4.1

环境:

window10 664位

ArcGIS 10.4.1 Desktop

VS2019



ArcGIS For Engine 10.4.1目前只支持vs2013与vs2015,如果没有安装这2个版本的vs会出现如下提示

![1600311010347](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032040222.png)



打开注册表,在HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\VisualStudio\

14.0,新建InstallDir字符串

```c
C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\Common7\IDE\
```

与ShellFolder

```c
C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\
```

增加这个注册表值是因为这安装程序必须要能够读到vs2015的安装路径……只好手工改注册表迎合ESRI了。

重新安装SDK

## 常用代码

### 1.判断图层要素是否有Z,M值

```c#
int index = features[0].Fields.FindField("Shape");
IGeometryDef pGeometryDef;
pGeometryDef = features[0].Fields.get_Field(index).GeometryDef as IGeometryDef;
if (pGeometryDef.HasZ)
{

}
else if (pGeometryDef.HasM)
{ 
    
}
```

### 2.添加指北针（IMarkerSymbol）

```c#
private void AddNorthArrow()
{
    IGraphicsContainer graphicsContainer = (IGraphicsContainer)this.axPageLayoutControl1.ActiveView;


    double xMin;
    double xMax;
    double yMin;
    double yMax;
    IMapFrame frame = (IMapFrame)graphicsContainer.FindFrame(axPageLayoutControl1.ActiveView.FocusMap);
    IElement element = (IElement)frame;
    element.Geometry.Envelope.QueryCoords(out xMin, out yMin, out xMax, out yMax);



    //指北针
    //先删除原本的指北针 northElement
    IElement northElement = axPageLayoutControl1.FindElementByName("NorthArrow");
    if (northElement != null)
    {
        axPageLayoutControl1.ActiveView.GraphicsContainer.DeleteElement(northElement);
    }
    IPoint pointNorthArrow = new PointClass();

    pointNorthArrow.X = xMax - 1.5;
    pointNorthArrow.Y = yMax - 2;

    IEnvelope pEnvelope = new EnvelopeClass();
    IMarkerSymbol pMarkerSymbol = new ArrowMarkerSymbolClass();
    pMarkerSymbol.Size = 2.5;

    pEnvelope.PutCoords(pointNorthArrow.X, pointNorthArrow.Y, pointNorthArrow.X + pMarkerSymbol.Size, pointNorthArrow.Y + pMarkerSymbol.Size);

    IMapSurroundFrame pMapSurroundFrame;
    IMapFrame pMapFrame;
    IElement pElement;
    UID pID = new UIDClass();
    pID.Value = "esriCarto.MarkerNorthArrow";

    pMapFrame = graphicsContainer.FindFrame(this.axPageLayoutControl1.ActiveView.FocusMap) as IMapFrame;
    pMapSurroundFrame = pMapFrame.CreateSurroundFrame(pID, null);

    IMapSurround mapSurround = pMapSurroundFrame.MapSurround;

    IMarkerNorthArrow markerNorthArrow = mapSurround as IMarkerNorthArrow;


    IMarkerSymbol markerSymbol = markerNorthArrow.MarkerSymbol;
    ICharacterMarkerSymbol characterMarkerSymbol = markerSymbol as ICharacterMarkerSymbol;
    characterMarkerSymbol.CharacterIndex = 175;
    markerNorthArrow.MarkerSymbol = characterMarkerSymbol;
    pMapSurroundFrame.MapSurround.Name = "NorthArrow";
    IColor pColor = new RgbColor();
    pColor.RGB = 120 + 244 * 256 + 255 * 65536;
    markerSymbol.Color = pColor;


    pElement = pMapSurroundFrame as IElement;
    pElement.Geometry = pEnvelope;
    IActiveView pActiveView = axPageLayoutControl1.ActiveView as IActiveView;
    pElement.Activate(pActiveView.ScreenDisplay);
    pElement.Draw(pActiveView.ScreenDisplay, new CancelTrackerClass());
    graphicsContainer.AddElement(pElement, 0);
    pGroupElement.AddElement(pElement);
}
```

### 3.添加指北针（serverstyle）

```c#
private void AddNorthArrow()
    {
        IGraphicsContainer graphicsContainer = (IGraphicsContainer)this.axPageLayoutControl1.ActiveView;


        double xMin;
        double xMax;
        double yMin;
        double yMax;
        IMapFrame frame = (IMapFrame)graphicsContainer.FindFrame(axPageLayoutControl1.ActiveView.FocusMap);
        IElement element = (IElement)frame;
        element.Geometry.Envelope.QueryCoords(out xMin, out yMin, out xMax, out yMax);



        //指北针
        //先删除原本的指北针 northElement
        IElement northElement = axPageLayoutControl1.FindElementByName("NorthArrow");
        if (northElement != null)
        {
            axPageLayoutControl1.ActiveView.GraphicsContainer.DeleteElement(northElement);
        }

        #region  读取指北针
        INorthArrow pNorthArrow = null;
        IStyleGallery tStyleGallery = new ServerStyleGalleryClass();
        IStyleGalleryStorage tStyleGalleryStorage = tStyleGallery as IStyleGalleryStorage;
        tStyleGalleryStorage.AddFile("ESRI.ServerStyle");
        IEnumStyleGalleryItem tStyleGalleryItems = tStyleGallery.get_Items("North Arrows", "ESRI.ServerStyle", "");
        tStyleGalleryItems.Reset();
        IStyleGalleryItem pStyleGalleryItem = null;
        while ((pStyleGalleryItem = tStyleGalleryItems.Next()) != null)
        {
            if (pStyleGalleryItem.Name == "ESRI North 3")
            {
                // markerNorthArrow.MarkerSymbol = pStyleGalleryItem as IMarkerSymbol;
                pNorthArrow = pStyleGalleryItem.Item as INorthArrow;
                break;
            }
        }
        RgbColor pColor = new RgbColor();
        pColor.Red = 120;
        pColor.Green = 244;
        pColor.Blue = 255;
        pNorthArrow.Color = pColor as IColor;

        #endregion

        IPoint pointNorthArrow = new PointClass();

        pointNorthArrow.X = xMax - 1.5;
        pointNorthArrow.Y = yMax - 2;

        IEnvelope pEnvelope = new EnvelopeClass();
        IMarkerSymbol pMarkerSymbol = new ArrowMarkerSymbolClass();
        pMarkerSymbol.Size = 2.5;

        pEnvelope.PutCoords(pointNorthArrow.X, pointNorthArrow.Y, pointNorthArrow.X + pMarkerSymbol.Size, pointNorthArrow.Y + pMarkerSymbol.Size);

        IMapSurroundFrame pMapSurroundFrame;
        IMapFrame pMapFrame;
        IElement pElement;
        UID pID = new UIDClass();
        //pID.Value = "esriCarto.MarkerNorthArrow";
        pID.Value = "esriCarto.NorthArrowStyleGalleryClass";
        pMapFrame = graphicsContainer.FindFrame(this.axPageLayoutControl1.ActiveView.FocusMap) as IMapFrame;
        pMapSurroundFrame = new MapSurroundFrame() as IMapSurroundFrame;
        pMapSurroundFrame.MapFrame = pMapFrame;
        pMapSurroundFrame.MapSurround = pNorthArrow as IMapSurround;


        pElement = pMapSurroundFrame as IElement;
        pElement.Geometry = pEnvelope;
        IActiveView pActiveView = axPageLayoutControl1.ActiveView as IActiveView;
        pElement.Activate(pActiveView.ScreenDisplay);
        pElement.Draw(pActiveView.ScreenDisplay, new CancelTrackerClass());
        graphicsContainer.AddElement(pElement, 0);
        pGroupElement.AddElement(pElement);
    }
```