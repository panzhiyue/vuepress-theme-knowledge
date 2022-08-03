#### 高级搜索

去除默认的search搜索和lunr，在搜索结果中，关键字会高亮；自带的 search 插件，关键字不会高亮

```json
"plugins": [
          "-lunr", 
          "-search", 
          "search-pro"
    ]
```

原生搜索效果：

![image-20200720144425681](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA3UzhaSWxseTFnZ3hmb3R6NnMwajMxeWUwamdncm8uanBn.webp)

高级搜索：

![image-20200720144917280](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA3UzhaSWxseTFnZ3hmdHdpdTBrajMyMHMwcmkxMnouanBn.webp)

搜索关键字高亮，支持中文、拼音和英文