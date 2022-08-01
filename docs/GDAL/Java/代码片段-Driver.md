# 代码片段-Driver

## 驱动类型

```java
    public static String ESRI_Shapefile = "ESRI Shapefile";
    public static String GTiff = "GTiff";//: GeoTIFF
    public static String VRT = "VRT";//: Virtual Raster
    public static String NITF = "NITF";//: National Imagery Transmission Format
    public static String HFA = "HFA";//: Erdas Imagine Images (.img)
    public static String ELAS = "ELAS";//: ELAS
    public static String AAIGrid = "AAIGrid";//: Arc/Info ASCII Grid
    public static String DTED = "DTED";//: DTED Elevation Raster
    public static String PNG = "PNG";//: Portable Network Graphics
    public static String JPEG = "JPEG";//: JPEG JFIF
    public static String MEM = "MEM";//: In Memory Raster
    public static String GIF = "GIF";//: Graphics Interchange Format (.gif)
    public static String BSB = "BSB";//: Maptech BSB Nautical Charts
    public static String XPM = "XPM";//: X11 PixMap Format
    public static String BMP = "BMP";//: MS Windows Device Independent Bitmap
    public static String PCIDSK = "PCIDSK";//: PCIDSK Database File
    public static String HDF4Image = "HDF4Image";//: HDF4 Dataset
    public static String PNM = "PNM";//: Portable Pixmap Format (netpbm)
    public static String ENVI = "ENVI";//: ENVI .hdr Labelled
    public static String EHdr = "EHdr";//: ESRI .hdr Labelled
    public static String PAux = "PAux";//: PCI .aux Labelled
    public static String MFF = "MFF";//: Atlantis MFF Raster
    public static String MFF2 = "MFF2";//: Atlantis MFF2 (HKV) Raster
    public static String BT = "BT";//: VTP .bt (Binary Terrain) 1.3 Format
    public static String FIT = "FIT";//: FIT Image
    public static String OTHER = "OTHER";
	public static String POSTGRESQL = "PostgreSQL";
	public static String FILEGDB = "FileGDB";
	public static String SDE = "SDE";
```

## 根据驱动名称获取驱动

```java
        String DriverName = "ESRI Shapefile";
        Driver driver = ogr.GetDriverByName(DriverName);
```

