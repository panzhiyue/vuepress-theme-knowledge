# TOC

[toc](https://www.npmjs.com/package/gitbook-plugin-toc) 插件可以将让书籍使用`<!-- toc -->`自动生成目录

## 安装及配置

和安装其它插件一样，执行以下命令：

```bash
$ npm install gitbook-plugin-toc -g
```

然后编辑 `book.json` 添加 multipart 到 plugins 中：

```json
 {
    "plugins": ["toc"],
    "pluginsConfig": {
        "toc": {
            "addClass": true,
            "className": "toc"
        }
    }
}
```

