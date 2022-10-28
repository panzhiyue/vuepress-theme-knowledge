## 验证Props类型

### 基础

#### 原始类型

验证基本类型比较简单，这里我们不过多的介绍，直接看下面例子：

```javascript
export default {
  props: {
    // Basic type check
    //  ("null "和 "undefined "值允许任何类型)
    propA: Number,
    // 多种可能的类型
    propB: [String, Number],
    // 必传的参数
    propC: {
      type: String,
      required: true
    },
    // 默认值
    propD: {
      type: Number,
      default: 100
    },
  }
}
```

#### 复杂类型

复杂类型也可以用同样的方式进行验证。

```javascript
export default {
  props: {
    // 默认值的对象
    propE: {
      type: Object,
      // 对象或数组的默认值必须从
      // 一个工厂函数返回。该函数接收原始
      // 元素作为参数。
      default(rawProps) {
        return { message: 'hello' }
      }
    },
    // 数组默认值
    propF: {
      type: Array,
      default() {
        return []
      }
    },
    // 函数默认值
    propG: {
      type: Function,
       // 不像对象或数组的默认值。
      // 这不是一个工厂函数 
      // - 这是一个作为默认值的函数
      default() {
        return 'Default function'
      }
    }
  }
}
```

`type` 可以是以下之一：

- Number
- String
- Boolean
- Array
- Object
- Date
- Function
- Symbol

此外，`type` 也可以是一个自定义的类或构造函数，然后使用 `instanceof` 进行检查。例如，给定下面的类：

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

我们可以把 `Person` 作为一个类型传递给 `prop` 类型:

```
export default {
  props: {
    author: Person
  }
}
```

### 高级验证

#### validator 方法

Props  支持使用一个 `validator` 函数。这个函数接受 prop 原始值，并且必须返回一个布尔值来确定这个 prop 是否有效。

```javascript
prop: {
      validator(value) {
        // The value must match one of these strings
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
```

#### 使用枚举

有时我们想把值缩小到一个特定的集合，这可以通过枚举来实现：

```javascript
export const Position = Object.freeze({
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left"
});
```

它可以导入 `validator` 中使用，也可以作为默认值:

```vue
<template>
  <span :class="`arrow-position--${position}`">
    {{ position }}
  </span>
</template>

<script>
import { Position } from "./types";
export default {
  props: {
    position: {
      validator(value) {
        return Object.values(Position).includes(value);
      },
      default: Position.BOTTOM,
    },
  },
};
</script>
```

最后，父级组件也可以导入并使用这个枚举，它消除了我们应用程序中对魔法字符串的使用:

```vue
<template>
  <DropDownComponent :position="Position.BOTTOM" />
</template>

<script>
import DropDownComponent from "./components/DropDownComponent.vue";
import { Position } from "./components/types";
export default {
  components: {
    DropDownComponent,
  },
  data() {
    return {
      Position,
    };
  },
};
</script>
```

### 布尔映射

布尔类有独特的行为。属性的存在或不存在可以决定 prop 的值。

```vue
<!-- 等价于 :disabled="true" -->
<MyComponent disabled />

<!-- 价于 :disabled="false" -->
<MyComponent />
```

### TypeScript

将Vue的内置 prop 验证与 TypeScript相结合，可以让我们对这一机制有更多的控制，因为TypeScript原生支持接口和枚举。

#### Interface

我们可以使用一个接口和 `PropType` 来注解复杂的 prop 类型。这确保了传递的对象将有一个特定的结构。

```vue
<script lang="ts">
import Vue, { PropType } from 'vue'
interface Book {
  title: string
  author: string
  year: number
}
const Component = Vue.extend({
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true,
      validator (book: Book) {
        return !!book.title;
      }
    }
  }
})
</script>
```

#### 枚举

我们已经探讨了如何在 JS 中伪造一个枚举。这对于TypeScript来说是不需要的，它本向就支持了：

```vue
<script lang="ts">
import Vue, { PropType } from 'vue'
enum Position {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}
export default {
  props: {
    position: {
      type: String as PropType<Position>,
      default: Position.BOTTOM,
    },
  },
};
</script>
```

### Vue3

上述所有内容在使用 Vue 3与 选项API 或 组合API 时都有效。区别在于使用 `<script setup>`时。props 必须使用 `defineProps()` 宏来声明，如下所示：

```vue
<script setup>
const props = defineProps(['foo'])
console.log(props.foo)
</script>


<script setup>
defineProps({
  title: String,
  likes: Number
})
</script>
```

或者在使用 TypeScript 的 `<script setup>` 时，可以使用纯类型注解来声明 prop:

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

或者使用一个接口:

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}
const props = defineProps<Props>()
</script>
```

最后，在使用基于类型的声明时，声明默认值。

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}


const { foo, bar = 100 } = defineProps<Props>()
</script>
```

