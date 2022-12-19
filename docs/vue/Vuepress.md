# Vuepress

## 一、学习资料

官网:https://vuepress.vuejs.org/zh/guide/

## 插件

| 名称                                                         | 描述               |      |
| ------------------------------------------------------------ | ------------------ | ---- |
| [vuepress-plugin-*code*-*switcher*](https://github.com/padarom/vuepress-plugin-code-switcher) | 多语言代码切换展示 |      |
|                                                              |                    |      |
|                                                              |                    |      |



## 常见错误

### 1.打包错误

在vuepress打包时经常会出现`window is not define`等错误

经查询vuepress github issuse 得到的答案是，vuepress是服务端渲染的，浏览器的 API 访问限制。在页面加载第三方组件的时候，可能出现找不到的情况，建议在当前页面使用时再引入。 

![image-20221031084609552](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221031084609552.webp)

## 原理解析

### 代码高亮

prismjs

