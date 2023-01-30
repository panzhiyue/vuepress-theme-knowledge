# Setup

## Script Setup

```javascript
<script setup>

</script>
```

### defineProps

子组件接收父组件中传来的props

**父组件代码**

```vue
<template>
	<my-component @click="func" :numb="numb"></my-component>
</template>
<script lang="ts" setup>
	import {ref} from 'vue';
	import myComponent from '@/components/myComponent.vue';
	const numb = ref(0);
	let func = ()=>{
		numb.value++;
	}
</script>
```

**子组件代码**

```vue
<template>
	<div>{{numb}}</div>
</template>
<script lang="ts" setup>
	import {defineProps} from 'vue';
	defineProps({
		numb:{
			type:Number,
			default:NaN
		}
	})
</script>
```
**TypeScript支持**

```javascript
//仅限类型声明
const props = defineProps<{
  foo: string
  bar?: number
}>()

//默认值
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```





### defineEmits

子组件调用父组件中的方法

**子组件代码**

```vue
<template>
	<div>{{numb}}</div>
	<button @click="onClickButton">数值加1</button>
</template>
<script lang="ts" setup>
	import {defineProps,defineEmits} from 'vue';
	defineProps({
		numb:{
			type:Number,
			default:NaN
		}
	})
	const emit = defineEmits(['addNumb']);
	const onClickButton = ()=>{
		//emit(父组件中的自定义方法,参数一,参数二,...)
		emit("addNumb");
	}
</script>
```


**父组件代码**

```vue
<template>
	<my-component @addNumb="func" :numb="numb"></my-component>
</template>
<script lang="ts" setup>
	import {ref} from 'vue';
	import myComponent from '@/components/myComponent.vue';
	const numb = ref(0);
	let func = ()=>{
		numb.value++;
	}
</script>
```





### defineExpose

子组件暴露属性，可以在父组件中拿到

子组件代码

```vue
<template>
	<div>子组件中的值{{numb}}</div>
	<button @click="onClickButton">数值加1</button>
</template>
<script lang="ts" setup>
	import {ref,defineExpose} from 'vue';
	let numb = ref(0);
	function onClickButton(){
		numb.value++;	
	}
	//暴露出子组件中的属性
	defineExpose({
		numb 
	})
</script>
```

父组件代码

```vue
<template>
	<my-comp ref="myComponent"></my-comp>
	<button @click="onClickButton">获取子组件中暴露的值</button>
</template>
<script lang="ts" setup>
	import {ref} from 'vue';
	import myComp from '@/components/myComponent.vue';
	//注册ref，获取组件
	const myComponent = ref();
	function onClickButton(){
		//在组件的value属性中获取暴露的值
		console.log(myComponent.value.numb)  //0
	}
	//注意：在生命周期中使用或事件中使用都可以获取到值，
	//但在setup中立即使用为undefined
	console.log(myComponent.value.numb)  //undefined
	const init = ()=>{
		console.log(myComponent.value.numb)  //undefined
	}
	init()
	onMounted(()=>{
		console.log(myComponent.value.numb)  //0
	})
</script>
```







### **计算属性**

```javascript
<script setup>
	import {defineProps,computed} from "vue"
	let name=computed(()=>{
        return 'name';
    })
</script>
```



### 路由

```javascript
<script setup>
	import {useRouter,useRoute} from "vue-router"
    let route=useRoute();
    let router=useRouter();
</script>
```



### defineOptions

**安装依赖**

```bash
npm i unplugin-vue-define-options -D
```

**配置依赖**

```javascript
// vite.config.ts
import DefineOptions from 'unplugin-vue-define-options/vite'
export default defineConfig({
  plugins: [DefineOptions()],
})
```

**ts支持**

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["unplugin-vue-define-options/macros-global" /* ... */]
  }
}
```

**基础用法**

```vue
<script setup lang="ts">
import { useSlots } from 'vue'
defineOptions({
  name: 'Foo',
  inheritAttrs: false,
})
const slots = useSlots()
</script>
```

**JSX in `<script setup>`**

```vue
<script setup lang="tsx">
defineOptions({
  render() {
    return <h1>Hello World</h1>
  },
})
</script>
```

**更多使用细节请看文档**

[https://vue-macros.sxzz.moe/macros/define-options.html](https://links.jianshu.com/go?to=https%3A%2F%2Fvue-macros.sxzz.moe%2Fmacros%2Fdefine-options.html)



### getCurrentInstance

Vue3中，在setup中无法通过this获取组件实例，console.log(this)打印出来的值是undefined。

在Vue3中，getCurrentInstance()可以用来获取**当前组件实例** 

```javascript
import {getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
```

