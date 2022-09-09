## Badge

- Props:
  - type
    - 类型： `'tip' | 'warning' | 'danger'`
    - 默认值： `'tip'`
  - text
    - 类型： `string`
    - 默认值： `''`
  - vertical
    - 类型： `'top' | 'middle' | 'bottom' | undefined`
    - 默认值： `undefined`
- 示例：

**输入**

```
- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />
```

**输出**

- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />

## CodeGroupItem

- Props:

  - title
    - 类型： `string`
    - 是否必需： `true`
  - active
    - 类型： `boolean`
    - 默认值： `false`

- 详情：

  该组件必须放置在 [CodeGroup](https://v2.vuepress.vuejs.org/zh/reference/default-theme/components.html#codegroup) 组件的内部。

  可以通过 `active` Prop 来设置初始激活的元素。如果不设置，默认激活第一个元素。

- 示例：

**输入**

````
<CodeGroup>
  <CodeGroupItem title="YARN">

	```bash:no-line-numbers
	yarn
	```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

	```bash:no-line-numbers
	npm install
	```

  </CodeGroupItem>
</CodeGroup>
````

**输出**

<CodeGroup>
  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install
```

  </CodeGroupItem>
</CodeGroup>



## 自定义容器

- 使用：

  ```
  ::: <type> [title]
  [content]
  :::
  ```

  `type` 是必需的， `title` 和 `content` 是可选的。

  支持的 `type` 有：

  - `tip`
  - `warning`
  - `danger`
  - `details`
  - CodeGroup和CodeGroupItem的别名：
    - `code-group`
    - `code-group-item`

- 示例 1 （默认标题）：

**输入**

```
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签
:::
```

**输出**

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签
:::

- 示例 2 （自定义标题）：

**输入**

````
::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码
```js
console.log('你好，VuePress！')
```
:::
````

**输出**

::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码
```js
console.log('你好，VuePress！')
```
:::

- 示例 3 （Code Group 别名）：

**输入**

````
:::: code-group
::: code-group-item FOO
```js
const foo = 'foo'
```
:::
::: code-group-item BAR
```js
const bar = 'bar'
```
:::
::::
````

**输出**

:::: code-group
::: code-group-item FOO
```js
const foo = 'foo'
```
:::
::: code-group-item BAR
```js
const bar = 'bar'
```
:::
::::



## 引用示例

```
::: demo 
openlayers/examples/样式/Fill/basic
:::
```

