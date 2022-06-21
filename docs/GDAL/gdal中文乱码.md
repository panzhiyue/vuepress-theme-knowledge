# 中文乱码



### 1.读取中文乱码

全局环境设置

```c#
gdal.SetConfigOption("GDAL_FILENAME_IS_UTF8", "YES");  //中文路径
gdal.SetConfigOption("SHAPE_ENCODING", "");//读取时使用文件默认编码
```

读取属性(`IdentifyEncoding`是根据字节数组判断编码名称的类)

```c#
        [DllImport("gdal204.dll", EntryPoint = "OGR_F_GetFieldAsString", CallingConvention = CallingConvention.Cdecl)]
        public extern static System.IntPtr OGR_F_GetFieldAsString(HandleRef handle, int i);

        [DllImport("gdal204.dll", EntryPoint = "OGR_F_GetFieldAsBinary", CallingConvention = CallingConvention.Cdecl)]
        public extern static System.IntPtr OGR_F_GetFieldAsBinary(HandleRef handle, int index, out int byteCount);


        
        /// <summary>
        /// 读取属性
        /// </summary>
        /// <param name="poFeature">要素</param>
        /// <param name="fieldIndex">字段索引</param>
        /// <param name="encodingName">编码名称</param>
        /// <returns>属性值</returns>
        public static object GetFieldValue(Feature poFeature, int fieldIndex, string encodingName = "")
        {
            FieldType Ftype = poFeature.GetFieldType(fieldIndex);
            object fieldValue;
            switch (Ftype)
            {
                case FieldType.OFTString:

                    int byteCount = 0;
                    IntPtr pIntPtr = OGR_F_GetFieldAsBinary(OSGeo.OGR.Feature.getCPtr(poFeature), fieldIndex, out byteCount);
                    if (byteCount == 0)
                    {
                        return "";
                    }
                    byte[] byteArray = new byte[byteCount];
                    Marshal.Copy(pIntPtr, byteArray, 0, byteCount);

                    //当没有指定编码名称时根据文件流判断编码名称
                    if (string.IsNullOrEmpty(encodingName))
                    {
                        sbyte[] sbytes = new sbyte[byteCount];
                        for (int i = 0; i < byteCount; i++)
                        {
                            sbytes[i] = (sbyte)byteArray[i];
                        }
                        encodingName = new IdentifyEncoding().GetEncodingName(sbytes);
                    }
                    fieldValue = System.Text.Encoding.GetEncoding(encodingName).GetString(byteArray);


                    break;
                case FieldType.OFTReal:
                    fieldValue = poFeature.GetFieldAsDouble(fieldIndex);
                    break;
                case FieldType.OFTInteger:
                    fieldValue = poFeature.GetFieldAsInteger(fieldIndex);
                    break;
                default:
                    fieldValue = poFeature.GetFieldAsString(fieldIndex);
                    break;
            }

            return fieldValue;
        }
```





### 2.写入中文乱码

全局环境设置

```sql
gdal.SetConfigOption("GDAL_FILENAME_IS_UTF8", "YES");  //中文路径
gdal.SetConfigOption("SHAPE_ENCODING", "CP936");//中文属性
```