# Vue3

### props

**自定义类型**

```vue
<template>
  <h1></h1>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
export interface ColumnProps {
  id: number;
  title: string;
  avatar: string;
  description: string;
}
export default defineComponent({
  name: "ColumnList",
  props: {
    title: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
});
</script>
```





## watch

`watch` 有两种写法

```javascript
// 侦听一个 getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// 直接侦听一个 ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

如果我们想侦听 `props` 上的属性变化，需要采用**第一种**写法

```javascript
// 假设 props 上有个 name 属性
// 下面的写法会生效
watch(
  () => props.name,
  (count, prevCount) => {
    /* ... */
  }
)

// 下面的写法不会被触发
watch(props.name, (count, prevCount) => {
  /* ... */
})
```



### v-model

modelValue
update:modelValue

```javascript
<template>
  <div class="validate-input-container pb-3">
    <input
      type="email"
      class="form-control"
      :class="{'is-invalid':inputRef.error}"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType } from "vue";
const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
interface RuleProp {
  type: "required" | "email";
  message: string;
}
export type RulesProp = RuleProp[];
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue:String
  },
  setup(props,context) {
    const inputRef = reactive({
      val:props.modelValue|| "",
      error: false,
      message: "",
    });
    const updateValue=(e:KeyboardEvent)=>{
        const targetValue=(e.target as HTMLInputElement).value;
        inputRef.val=targetValue;
        context.emit('update:modelValue',targetValue);
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
      }
    };
    return {
        inputRef: inputRef,
        validateInput: validateInput,
        updateValue
    }
  },
});
</script>

```

### ref

ref="dropdownRef"的元素节点会自动绑定到dropdownRef上

```html
<template>
  <div class="drowdown" ref="dropdownRef">
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,onUnmounted,ref } from "vue";

export default defineComponent({
    name:'Dropdown',
    props:{
        title:{
            type:String
        }
    },
    setup(props,context){
        const dropdownRef=ref<null|HTMLElement>(null);
        return {
            dropdownRef
        }
    }
})
</script>
<style>
</style>
```