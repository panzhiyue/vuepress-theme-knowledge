# fetch

https://www.npmjs.com/package/node-fetch

## 语法

```javascript
const response = await fetch(url);
const body = await response.text();
```

## 示例
### 解析文本或html
::: demo
nodejs/examples/fetch/text
:::

### 解析json数据
::: demo
nodejs/examples/fetch/json
:::

### 简单POST请求
::: demo
nodejs/examples/fetch/simplePost
:::

### POST请求传入json
::: demo
nodejs/examples/fetch/jsonPost
:::

### 使用表单URLSearchParams
::: demo
nodejs/examples/fetch/URLSearchParams
:::

### 访问标头和其他元数据
::: demo
nodejs/examples/fetch/metadata
:::