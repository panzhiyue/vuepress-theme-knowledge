

# Maven配置本地包

## 一、在根目录下新建lib文件夹,在把jar包放到目录下

![image-20210901090604554](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010919160.png)

## 二、右键lib->添加为库

![image-20210901090637619](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010919209.png)

## 三、配置pom.xml

```xml
        <dependency>
            <groupId>org.gdal</groupId>
            <artifactId>gdal</artifactId>
            <version>3.0.0</version>
            <scope>system</scope>
            <systemPath>${project.basedir}/lib/gdal.jar</systemPath>
        </dependency>
```

