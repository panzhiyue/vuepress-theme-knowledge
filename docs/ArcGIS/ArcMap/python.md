1.pythonAPI：https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/python/using-environment-settings.htm



### 常见问题

#### 1.不支持中文路径

 今天在使用arcmap python处理mxd文件时报如下错误 

 ![玖涯博客](http://localhost:4000/images/pasted-60.png) 

原因:中文问题
解决办法:设置编码为utf-8 

```python
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
```