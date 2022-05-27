# japidocs生成接口文档

## 1.添加依赖

```xml
<dependency>
    <groupId>io.github.yedaxia</groupId>
    <artifactId>japidocs</artifactId>
    <version>1.4.3</version>
</dependency>
```

## 2.添加一个类

![null](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271133550.png)

## 3.代码

```java
public class japidocs {
    public static void main(String[] args) {
        DocsConfig config = new DocsConfig();
        // 项目根目录
        config.setProjectPath("F:\\gdalutils");
        // 项目名称
        config.setProjectName("GDALUtils");
        // 声明该API的版本
        config.setApiVersion("V1.1");
        // 生成API 文档所在目录
        config.setDocsPath("dist/apidoc");
        // 配置自动生成
        config.setAutoGenerate(Boolean.TRUE);
        // 执行生成文档
        Docs.buildHtmlDocs(config);
    }
}
```

## 4.运行

![null](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271133595.png)

![null](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271133560.png)