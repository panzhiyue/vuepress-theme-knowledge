# Setup

## Script Setup

```javascript
<script setup>

</script>
```

### props属性

**定义**

```javascript
<script setup>
    import {defineProps} from "vue"
	let props=defineProps(["type","name"])
    
    let props = defineProps<{
  		modelValue: string
	}>()
</script>
```



### emit

**定义**

```

<script setup>
    import {defineEmits} from "vue"
	let emits=defineEmits(["change"])
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

