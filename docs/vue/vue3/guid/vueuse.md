# vueuse

VueUse是一个基于 Composition [API](https://so.csdn.net/so/search?q=API&spm=1001.2101.3001.7020) 实现的基本 Vue 组合实用函数的集合。

VueUse可能是受到了react-use的启发，可以看做是vue版的hook，Vue Compostion API支持了更好的逻辑分离，让这些常用的工具可以被复用，能够让你快速地构建丰富的应用，大大地提高你的开发效率在，避免自己去封装一些常用的功能函数，比如：防抖，节流，定时器等。

几天前，一个偶然的机会发现看到Element-plus组件库的源码中已经大量的使用了VueUse，所以可以大胆地在项目中使用了。
官网地址：https://vueuse.org/



## 一、特征

无缝迁移：同时支持Vue2和Vue3
支持按需引入：只取你想要的
强类型：用 TypeScript 编写，带有 TS Docs
灵活：可配置的事件过滤器
无需打包：支持CDN方式引入使用
功能丰富：截止目前180+功能任你选择
友好的SSR：与服务器端渲染/生成完美配合
互动演示：功能文档还附带互动演示
附加插件：支持Router、Firebase、RxJS等多种插件



## 二、安装

**npm**

```
npm i @vueuse/core
```

**yarn**

```
yarn add @vueuse/core
```

**CDN引入**

```
<script src="https://unpkg.com/@vueuse/shared"></script>
<script src="https://unpkg.com/@vueuse/core"></script>
```

作为 window.VueUse 暴露给全局。



## 三、使用

### useVModel

v-model 绑定的简写



#### 用法

```javascript
import { useVModel } from '@vueuse/core'

export default {
  setup(props, { emit }) {
    const data = useVModel(props, 'data', emit)

    console.log(data.value) // props.data
    data.value = 'foo' // emit('update:data', 'foo')
  },
}
```



#### `<script setup>`

```vue
<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)
</script>
```



## 参考资料

https://blog.csdn.net/qq_39327418/article/details/122527337