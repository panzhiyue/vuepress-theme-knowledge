# Blob

## 参考资料

https://www.cnblogs.com/fps2tao/p/9267034.html

https://developer.mozilla.org/zh-CN/docs/Web/API/Blob

## 什么是Blob

Blob 是什么？ 这里说的是一种Javascript的对象类型。

oracle 中也有类似的栏位类型。

在 [[JS进阶\] HTML5 之文件操作(file)](http://blog.csdn.net/oscar999/article/details/37499743)

这一篇中用到了File对象，而实际上 file 对象只是 blob 对象的一个更具体的版本，blob 存储着大量的二进制数据，并且 blob 的 size 和 type 属性，都会被 file 对象所继承。

所以， 在大多数情况下，blob 对象和 file 对象可以用在同一个地方，例如，可以使用 FileReader 借口从 blob 读取数据，也可以使用 URL.createObjectURL() 从 blob 创建一个新的 URL 对象。

## 如何创建Blob

### 1.使用旧方法创建 Blob 对象。

旧的方法使用 BlobBuilder 来创建一个Blob 实例，并且使用一个 append() 方法，将字符串（或者 ArrayBuffer 或者 Blob，此处用 string 举例）插入，一旦数据插入成功，就可以使用 getBlob() 方法设置一个 mime 。

```javascript
  <script>
    var builder = new BolbBuilder();
    builder.append("Hello World!");
    var blob = builder.getBlob("text/plain");
  </script>
```

### 2.新方法创建Blob 对象

在新的方法中直接可以通过 Blob() 的构造函数来创建了。
构造函数，接受两个参数，第一个为一个数据序列，可以是任意格式的值，例如，任意数量的字符串，Blobs 以及 ArrayBuffers。第二个参数，是一个包含了两个属性的对象，其两个属性分别是：

type -- MIME 的类型。

endings -- 决定 append() 的数据格式，（数据中的 \n 如何被转换）可以取值为 "transparent" 或者 "native"（t* 的话不变，n* 的话按操作系统转换；t* 为默认） 。

```javascript
  <script>
    var blob = new Blob(["Hello World!"],{type:"text/plain"});
  </script>
```

## Blob的应用

### 1.大文件分割 (slice() 方法)

slice() 方法接受三个参数，起始偏移量，结束偏移量，还有可选的 mime 类型。如果 mime 类型，没有设置，那么新的 Blob 对象的 mime 类型和父级一样。

当要上传大文件的时候，此方法非常有用，可以将大文件分割分段，然后各自上传，因为分割之后的 Blob 对象和原始的是独立存在的。

 

不过目前浏览器实现此方法还没有统一，火狐使用的是 mozSlice() ，Chrome 使用的是 webkitSlice() ，其他浏览器则正常的方式 slice() 

可以写一个兼容各浏览器的方法：

```javascript
    function sliceBlob(blob, start, end, type) {
      type = type || blob.type;
      if (blob.mozSlice) {
          return blob.mozSlice(start, end, type);
      } else if (blob.webkitSlice) {
          return blob.webkitSlice(start, end type);
      } else {
          throw new Error("This doesn't work!");
      }
    }
```
### 2.在Chrome 中指定下载的文件名；

具体可以参考：*[Web 端 js 导出csv文件(使用a标签)](http://blog.csdn.net/oscar999/article/details/16342699)*

### 3.下载为文件

```javascript
          let blob = new Blob([buffer], {
            type: "application/vnd.ms-excel;charset=utf-8",
          });
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob); // 创建下载的链接
          downloadElement.href = href;
          downloadElement.download = "矢量数据.xlsx"; // 下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); // 点击下载
          document.body.removeChild(downloadElement); // 下载完成移除元素
          window.URL.revokeObjectURL(href); // 释放掉blob对象
```



## type类型

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

| 扩展名         | 文档类型                                                     | MIME 类型                                                    |
| :------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `.aac`         | AAC audio                                                    | `audio/aac`                                                  |
| `.abw`         | [AbiWord](https://en.wikipedia.org/wiki/AbiWord) document    | `application/x-abiword`                                      |
| `.arc`         | Archive document (multiple files embedded)                   | `application/x-freearc`                                      |
| `.avi`         | AVI: Audio Video Interleave                                  | `video/x-msvideo`                                            |
| `.azw`         | Amazon Kindle eBook format                                   | `application/vnd.amazon.ebook`                               |
| `.bin`         | Any kind of binary data                                      | `application/octet-stream`                                   |
| `.bmp`         | Windows OS/2 Bitmap Graphics                                 | `image/bmp`                                                  |
| `.bz`          | BZip archive                                                 | `application/x-bzip`                                         |
| `.bz2`         | BZip2 archive                                                | `application/x-bzip2`                                        |
| `.csh`         | C-Shell script                                               | `application/x-csh`                                          |
| `.css`         | Cascading Style Sheets (CSS)                                 | `text/css`                                                   |
| `.csv`         | Comma-separated values (CSV)                                 | `text/csv`                                                   |
| `.doc`         | Microsoft Word                                               | `application/msword`                                         |
| `.docx`        | Microsoft Word (OpenXML)                                     | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
| `.eot`         | MS Embedded OpenType fonts                                   | `application/vnd.ms-fontobject`                              |
| `.epub`        | Electronic publication (EPUB)                                | `application/epub+zip`                                       |
| `.gif`         | Graphics Interchange Format (GIF)                            | `image/gif`                                                  |
| `.htm.html`    | HyperText Markup Language (HTML)                             | `text/html`                                                  |
| `.ico`         | Icon format                                                  | `image/vnd.microsoft.icon`                                   |
| `.ics`         | iCalendar format                                             | `text/calendar`                                              |
| `.jar`         | Java Archive (JAR)                                           | `application/java-archive`                                   |
| `.jpeg` `.jpg` | JPEG images                                                  | `image/jpeg`                                                 |
| `.js`          | JavaScript                                                   | `text/javascript`                                            |
| `.json`        | JSON format                                                  | `application/json`                                           |
| `.jsonld`      | JSON-LD format                                               | `application/ld+json`                                        |
| `.mid` `.midi` | Musical Instrument Digital Interface (MIDI)                  | `audio/midi` `audio/x-midi`                                  |
| `.mjs`         | JavaScript module                                            | `text/javascript`                                            |
| `.mp3`         | MP3 audio                                                    | `audio/mpeg`                                                 |
| `.mpeg`        | MPEG Video                                                   | `video/mpeg`                                                 |
| `.mpkg`        | Apple Installer Package                                      | `application/vnd.apple.installer+xml`                        |
| `.odp`         | OpenDocument presentation document                           | `application/vnd.oasis.opendocument.presentation`            |
| `.ods`         | OpenDocument spreadsheet document                            | `application/vnd.oasis.opendocument.spreadsheet`             |
| `.odt`         | OpenDocument text document                                   | `application/vnd.oasis.opendocument.text`                    |
| `.oga`         | OGG audio                                                    | `audio/ogg`                                                  |
| `.ogv`         | OGG video                                                    | `video/ogg`                                                  |
| `.ogx`         | OGG                                                          | `application/ogg`                                            |
| `.otf`         | OpenType font                                                | `font/otf`                                                   |
| `.png`         | Portable Network Graphics                                    | `image/png`                                                  |
| `.pdf`         | Adobe [Portable Document Format](https://acrobat.adobe.com/us/en/why-adobe/about-adobe-pdf.html) (PDF) | `application/pdf`                                            |
| `.ppt`         | Microsoft PowerPoint                                         | `application/vnd.ms-powerpoint`                              |
| `.pptx`        | Microsoft PowerPoint (OpenXML)                               | `application/vnd.openxmlformats-officedocument.presentationml.presentation` |
| `.rar`         | RAR archive                                                  | `application/x-rar-compressed`                               |
| `.rtf`         | Rich Text Format (RTF)                                       | `application/rtf`                                            |
| `.sh`          | Bourne shell script                                          | `application/x-sh`                                           |
| `.svg`         | Scalable Vector Graphics (SVG)                               | `image/svg+xml`                                              |
| `.swf`         | [Small web format](https://en.wikipedia.org/wiki/SWF) (SWF) or Adobe Flash document | `application/x-shockwave-flash`                              |
| `.tar`         | Tape Archive (TAR)                                           | `application/x-tar`                                          |
| `.tif.tiff`    | Tagged Image File Format (TIFF)                              | `image/tiff`                                                 |
| `.ttf`         | TrueType Font                                                | `font/ttf`                                                   |
| `.txt`         | Text, (generally ASCII or ISO 8859-*n*)                      | `text/plain`                                                 |
| `.vsd`         | Microsoft Visio                                              | `application/vnd.visio`                                      |
| `.wav`         | Waveform Audio Format                                        | `audio/wav`                                                  |
| `.weba`        | WEBM audio                                                   | `audio/webm`                                                 |
| `.webm`        | WEBM video                                                   | `video/webm`                                                 |
| `.webp`        | WEBP image                                                   | `image/webp`                                                 |
| `.woff`        | Web Open Font Format (WOFF)                                  | `font/woff`                                                  |
| `.woff2`       | Web Open Font Format (WOFF)                                  | `font/woff2`                                                 |
| `.xhtml`       | XHTML                                                        | `application/xhtml+xml`                                      |
| `.xls`         | Microsoft Excel                                              | `application/vnd.ms-excel`                                   |
| `.xlsx`        | Microsoft Excel (OpenXML)                                    | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
| `.xml`         | `XML`                                                        | `application/xml` 代码对普通用户来说不可读 ([RFC 3023](https://tools.ietf.org/html/rfc3023#section-3), section 3) `text/xml` 代码对普通用户来说可读 ([RFC 3023](https://tools.ietf.org/html/rfc3023#section-3), section 3) |
| `.xul`         | XUL                                                          | `application/vnd.mozilla.xul+xml`                            |
| `.zip`         | ZIP archive                                                  | `application/zip`                                            |
| `.3gp`         | [3GPP](https://en.wikipedia.org/wiki/3GP_and_3G2) audio/video container | `video/3gpp` `audio/3gpp`（若不含视频）                      |
| `.3g2`         | [3GPP2](https://en.wikipedia.org/wiki/3GP_and_3G2) audio/video container | `video/3gpp2` `audio/3gpp2`（若不含视频）                    |
| `.7z`          | [7-zip](https://en.wikipedia.org/wiki/7-Zip) archive         | `application/x-7z-compressed`                                |