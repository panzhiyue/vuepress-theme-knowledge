

# Vue2

## 学习资源

官网:https://cn.vuejs.org/

菜鸟教程:https://www.runoob.com/vue3/vue3-tutorial.html

http://vuejs-templates.github.io/webpack/

 [Element UI](https://cloud.tencent.com/developer/doc/1270) ：https://cloud.tencent.com/developer/section/1489884



腾讯云开发者手册:https://cloud.tencent.com/developer/doc/1121

自定义指令文档:https://cn.vuejs.org/v2/guide/custom-directive.html



## 全局配置

| 名称                                                         | 类型                                       | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------ |
| [silent](https://cn.vuejs.org/v2/api/#silent)                | boolean                                    | 是否取消 Vue 所有的日志与警告。                              |
| [optionMergeStrategies](https://cn.vuejs.org/v2/api/#optionMergeStrategies) | { [key: string]: Function }                | 自定义合并策略的选项。                                       |
| [devtools](https://cn.vuejs.org/v2/api/#devtools)            | boolean                                    | 配置是否允许 [vue-devtools](https://github.com/vuejs/vue-devtools) 检查代码。开发版本默认为 `true`，生产版本默认为 `false`。生产版本设为 `true` 可以启用检查。 |
| [errorHandler](https://cn.vuejs.org/v2/api/#errorHandler)    | Function                                   | 指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例。 |
| [warnHandler](https://cn.vuejs.org/v2/api/#warnHandler)      | Function                                   | 为 Vue 的运行时警告赋予一个自定义处理函数。注意这只会在开发者环境下生效，在生产环境下它会被忽略。 |
| [ignoredElements](https://cn.vuejs.org/v2/api/#ignoredElements) | `Array<string|RegExp>`                     | 须使 Vue 忽略在 Vue 之外的自定义元素                         |
| [keyCodes](https://cn.vuejs.org/v2/api/#keyCodes)            | { [key: string]: number\|`Array<number>` } | 给 `v-on` 自定义键位别名                                     |
| [performance](https://cn.vuejs.org/v2/api/#performance)      | boolean                                    | 设置为 `true` 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪。只适用于开发模式和支持 [`performance.mark`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API 的浏览器上。 |
| [productionTip](https://cn.vuejs.org/v2/api/#productionTip)  | boolean                                    | 设置为 `false` 以阻止 vue 在启动时生成生产提示。             |

### 全局API

| 名称                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Vue.extend( options )](https://cn.vuejs.org/v2/api/#Vue-extend) | 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。`data` 选项是特例，需要注意 - 在 `Vue.extend()` 中它必须是函数 |
| [Vue.nextTick( [callback, context\] )](https://cn.vuejs.org/v2/api/#Vue-nextTick) | 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。 |
| [Vue.set( target, propertyName/index, value )](https://cn.vuejs.org/v2/api/#Vue-set) | 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`) |
| [Vue.delete( target, propertyName/index )](https://cn.vuejs.org/v2/api/#Vue-delete) | 删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。 |
| [Vue.directive( id, [definition\] )](https://cn.vuejs.org/v2/api/#Vue-directive) | 注册或获取全局指令。                                         |
| [Vue.filter( id, [definition\] )](https://cn.vuejs.org/v2/api/#Vue-filter) | 注册或获取全局过滤器。                                       |
| [Vue.component( id, [definition\] )](https://cn.vuejs.org/v2/api/#Vue-component) | 注册或获取全局组件。注册还会自动使用给定的 `id` 设置组件的名称 |
| [Vue.use( plugin )](https://cn.vuejs.org/v2/api/#Vue-use)    | 安装 Vue.js 插件。如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。该方法需要在调用 `new Vue()` 之前被调用。 |
| [Vue.mixin( mixin )](https://cn.vuejs.org/v2/api/#Vue-mixin) | 全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为。**不推荐在应用代码中使用**。 |
| [Vue.compile( template )](https://cn.vuejs.org/v2/api/#Vue-compile) | 将一个模板字符串编译成 render 函数。**只在完整版时可用**。   |
| [Vue.observable( object )](https://cn.vuejs.org/v2/api/#Vue-observable) | 让一个对象可响应。Vue 内部会用它来处理 `data` 函数返回的对象。 |
| [Vue.version](https://cn.vuejs.org/v2/api/#Vue-version)      | 提供字符串形式的 Vue 安装版本号。这对社区的插件和组件来说非常有用，你可以根据不同的版本号采取不同的策略。 |
|                                                              |                                                              |
|                                                              |                                                              |

## 构造函数

```javascript
new Vue({
    //#region DOM
    el:'#app',   
    template:'<div></div>',
    render(h){},
    renderError(h, err){},
    //#endregion DOM
    //#region 数据
    data(){},
    props: ['size', 'myMessage'],
    propsData: {},   //只用于 new 创建的实例中。
    //计算属性
    computed:{},
    //方法
    methods:{},
    //遍历 watch 对象的每一个 property
    watch:{},
    //#endregion 数据
    //#region 生命周期钩子
    beforeCreate:{},
    created:{},
    beforeMount:{},
    mounted:{},
    beforeUpdate(){},
    updated(){},
    activated(){},
    deactivated(){},
    beforeDestroy(){},
    destroyed(){},
    errorCaptured(){},
    //#endregion 生命周期钩子
    //#region 资源
    directives:{},
    filters:{},
    components:{},
    //#endregion 资源
    
    //#region 组合
    parent:{},
    mixins:[],
    extends:{},
    provide:{},
    inject:[],
    //#endregion 组合
    //#region 其他
    name:'',
    delimiters:["{{", "}}"],
    functional:false,
    model:{
    	prop: 'checked',
    	event: 'change'
  	},
    inheritAttrs:true,
    comments:false
    //#endregion 其他
})
```



### 数据选项

| 名称                                                | 类型                                                         | 描述                                                         |
| --------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [data](https://cn.vuejs.org/v2/api/#data)           | Object\|Function,组件的定义只接受 `function`。               | Vue 实例的数据对象。实例创建之后，可以通过 `vm.$data` 访问原始数据对象。 |
| [props](https://cn.vuejs.org/v2/api/#props)         | Array<`string`>                                              | Objectprops 可以是数组或对象，用于接收来自父组件的数据。     |
| [propsData](https://cn.vuejs.org/v2/api/#propsData) | { [key: string]: any }                                       | 只用于 `new` 创建的实例中。创建实例时传递 props。主要作用是方便测试。 |
| [computed](https://cn.vuejs.org/v2/api/#computed)   | { [key: string]: Function\|{ get: Function, set: Function } } | 计算属性。                                                   |
| [methods](https://cn.vuejs.org/v2/api/#methods)     | { [key: string]: Function }                                  | 方法                                                         |
| [watch](https://cn.vuejs.org/v2/api/#watch)         | { [key: string]: string\|Function\|Object\|Array }           | 监听属性变化                                                 |

### DOM选项

| 名称                                                    | 类型                                                | 描述                                                         |
| ------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| [el](https://cn.vuejs.org/v2/api/#el)                   | string\|Element                                     | 提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。 |
| [template](https://cn.vuejs.org/v2/api/#template)       | string                                              | 一个字符串模板作为 Vue 实例的标识使用。模板将会**替换**挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。 |
| [render](https://cn.vuejs.org/v2/api/#render)           | (createElement: () => VNode) => VNode               | 字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。该渲染函数接收一个 `createElement` 方法作为第一个参数用来创建 `VNode`。 |
| [renderError](https://cn.vuejs.org/v2/api/#renderError) | (createElement: () => VNode, error: Error) => VNode | 当 `render` 函数遭遇错误时，提供另外一种渲染输出。其错误将会作为第二个参数传递到 `renderError`。这个功能配合 hot-reload 非常实用。 |



### 生命周期选项

| 名称                                                        | 描述                                                         |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| [beforeCreate](https://cn.vuejs.org/v2/api/#beforeCreate)   | 实例创建前：数据和模板均未获取到                             |
| [created](https://cn.vuejs.org/v2/api/#created)             | 实例创建后: 最早可访问到 data 数据，但模板未获取到           |
| [beforeMount](https://cn.vuejs.org/v2/api/#beforeMount)     | 数据挂载前：模板已获取到，但是数据未挂载到模板上。           |
| [mounted](https://cn.vuejs.org/v2/api/#mounted)             | 数据挂载后： 数据已挂载到模板中                              |
| [beforeUpdate](https://cn.vuejs.org/v2/api/#beforeUpdate)   | 模板更新前：data 改变后，更新数据模板前调用                  |
| [updated](https://cn.vuejs.org/v2/api/#updated)             | 模板更新后：将 data 渲染到数据模板中                         |
| [activated](https://cn.vuejs.org/v2/api/#activated)         | 被 keep-alive 缓存的组件激活时调用。                         |
| [deactivated](https://cn.vuejs.org/v2/api/#deactivated)     | 被 keep-alive 缓存的组件停用时调用。                         |
| [beforeDestroy](https://cn.vuejs.org/v2/api/#beforeDestroy) | 实例销毁之前调用。在这一步，实例仍然完全可用。               |
| [destroyed](https://cn.vuejs.org/v2/api/#destroyed)         | 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。 |
| [errorCaptured](https://cn.vuejs.org/v2/api/#errorCaptured) | 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 `false` 以阻止该错误继续向上传播。 |



### 资源选项

| 名称                                                  | 类型   | 描述                              |
| ----------------------------------------------------- | ------ | --------------------------------- |
| [directives](https://cn.vuejs.org/v2/api/#directives) | Object | 包含 Vue 实例可用指令的哈希表。   |
| [filters](https://cn.vuejs.org/v2/api/#filters)       | Object | 包含 Vue 实例可用过滤器的哈希表。 |
| [components](https://cn.vuejs.org/v2/api/#components) | Object | 包含 Vue 实例可用组件的哈希表。   |

### 组合选项

| 名称                                                         | 类型             | 描述                                                         |
| ------------------------------------------------------------ | ---------------- | ------------------------------------------------------------ |
| [parent](https://cn.vuejs.org/v2/api/#parent)                | Vue instance     | 指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 `this.$parent` 访问父实例，子实例被推入父实例的 `$children` 数组中。 |
| [mixins](https://cn.vuejs.org/v2/api/#mixins)                | `Array<Object>`  | `mixins` 选项接收一个混入对象的数组。这些混入对象可以像正常的实例对象一样包含实例选项，这些选项将会被合并到最终的选项中，使用的是和 `Vue.extend()` 一样的选项合并逻辑。也就是说，如果你的混入包含一个 created 钩子，而创建组件本身也有一个，那么两个函数都会被调用。Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。 |
| [extends](https://cn.vuejs.org/v2/api/#extends)              | Object\|Function | 允许声明扩展另一个组件 (可以是一个简单的选项对象或构造函数)，而无需使用 `Vue.extend`。这主要是为了便于扩展单文件组件。这和 `mixins` 类似。 |
| [provide / inject](https://cn.vuejs.org/v2/api/#provide-inject) |                  |                                                              |

### 其他选项

| 名称                                                      | 类型                              | 描述                                                         |
| --------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| [name](https://cn.vuejs.org/v2/api/#name)                 | string                            | 允许组件模板递归地调用自身。注意，组件在全局用 `Vue.component()` 注册时，全局 ID 自动作为组件的 name。 |
| [delimiters](https://cn.vuejs.org/v2/api/#delimiters)     | `Array<string>`                   | 改变纯文本插入分隔符。                                       |
| [functional](https://cn.vuejs.org/v2/api/#functional)     | boolean                           | 使组件无状态 (没有 `data`) 和无实例 (没有 `this` 上下文)。他们用一个简单的 `render` 函数返回虚拟节点使它们渲染的代价更小。 |
| [model](https://cn.vuejs.org/v2/api/#model)               | { prop?: string, event?: string } | 允许一个自定义组件在使用 `v-model` 时定制 prop 和 event。默认情况下，一个组件上的 `v-model` 会把 `value` 用作 prop 且把 `input` 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 `value` prop 来达到不同的目的。使用 `model` 选项可以回避这些情况产生的冲突。 |
| [inheritAttrs](https://cn.vuejs.org/v2/api/#inheritAttrs) | boolean                           | 默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。 |
| [comments](https://cn.vuejs.org/v2/api/#comments)         | boolean                           | 当设为 `true` 时，将会保留且渲染模板中的 HTML 注释。默认行为是舍弃它们。 |





## 指令



| 名称      | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| v-html    | 内容按普通HTML插入,可防止XSS攻击                             |
| v-show    | 根据表达式的真假值,切换元素displayCSS属性来显示隐藏元素      |
| v-if      | 根据表达式的真假值,来渲染元素                                |
| v-else    | 前面必须有`v-if`或`v-else-if`                                |
| v-else-if | 前面必须有`v-if`或`v-else-if`                                |
| v-for     | 遍历数组或对象                                               |
| v-on      | 绑定事件监听器                                               |
| v-bind    | 用于绑定元素属性                                             |
| v-model   | 在表单控件或者组件上创建双向绑定                             |
| v-once    | 一次性插值,当后面数据更新后视图数据不会更新                  |
| v-pre     | 可以用来显示原始插入值标签`双大括号`,并跳过这个元素和它的子元素的编译过程,加快编译。例如:网页中的一篇文章,文章内容不需要被Vue管理渲染,则可以在此元素上添加`v-pre`忽略文章编译提高性能 |
| v-text    | 等价于双大括号,不过不会闪烁                                  |
| v-cloak   | 如果想用双大括号`{{}}`又不想有闪烁问题,则使用v-cloak来处理   |
|           |                                                              |

## 事件修饰符





| 名称      | 描述 |
| --------- | ---- |
| .stop     |      |
| .prevent  |      |
| .capture  |      |
| .self     |      |
| .once     |      |
| .passive` |      |



常用按键

| 名称    | 描述 |
| ------- | ---- |
| .enter  |      |
| .tab    |      |
| .delete |      |
| .esc    |      |
| .space  |      |
| .up     |      |
| .down   |      |
| .left   |      |
| .right  |      |



系统修饰键

| 名称   |                                                              |
| ------ | ------------------------------------------------------------ |
| .ctrl  |                                                              |
| .alt   |                                                              |
| .shift |                                                              |
| .meta  | 在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。在 Sun 操作系统键盘上，meta 对应实心宝石键 (◆)。在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”。 |

鼠标修饰符

| 名称    | 描述 |
| ------- | ---- |
| .left   |      |
| .right  |      |
| .middle |      |

## v-model修饰符

| 名称    | 描述                               |                |
| ------- | ---------------------------------- | -------------- |
| .lazy   | 转为在 `change` 事件_之后_进行同步 | v-model.lazy   |
| .number | 自动将用户的输入值转为数值类型     | v-model.number |
| trim    | 自动过滤用户输入的首尾空白字符     | v-model.trim   |



## 模板代码

```html
<!--  -->
<template>
  <div class=''>设备情况统计</div>
</template>

<script>
  //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
  //例如：import 《组件名称》 from '《组件路径》';

  export default {
  //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
    //这里存放数据
      return {

      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
    
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>
```

## this.$xx的属性详解

转自：https://www.cnblogs.com/huayang1995/p/13828071.html

![image-20211018100401610](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261653051.png)

| 序号 | 名称           | 描述                                                         |
| :--- | :------------- | :----------------------------------------------------------- |
| 1    | $attr          |                                                              |
| 2    | $children      |                                                              |
| 3    | $createElement |                                                              |
| 4    | $el            | 获取Vue实例关联的DOM元素                                     |
| 5    | $listeners     |                                                              |
| 6    | $options       | 获取Vue实例的自定义属性（如this.$options.methods,获取Vue实例的自定义属性methods） |
| 7    | $parent        |                                                              |
| 8    | $refs          | 获取页面中所有含有ref属性的DOM元素                           |
| 9    | $root          |                                                              |
| 10   | $scopedSlots   |                                                              |
| 11   | $slots         |                                                              |
| 12   | $store         |                                                              |
| 13   | $vnode         |                                                              |
| 14   | $data          | 获取Vue实例的data选项                                        |
| 15   | $isServer      |                                                              |
| 16   | $props         |                                                              |
| 17   | $route         |                                                              |
| 18   | $router        |                                                              |
| 19   | $ssrContext    |                                                              |

**this.$el**

获取Vue实例关联的DOM元素；vue中也是允许进行dom操作的（但是不建议）

注意this.$el关联的是真实Dom，所以需要在mounted渲染真实Dom之后才可以使用了

**this.$refs**

获取页面中所有含有ref属性的DOM元素（如vm.$refs.hello，获取页面中含有属性ref = “hello”的DOM元素，如果有多个元素，那么只返回最后一个）

**this.$options**

获取Vue实例的自定义属性（如this.$options.methods,获取Vue实例的自定义属性methods）

**this.$data**

获取Vue实例的data选项（对象）

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261653021.png)](https://img2020.cnblogs.com/blog/1519360/202010/1519360-20201016180806120-726195985.png)

**this.$parent**

可以访问到父组件 上所有的 data(){ 里的数据信息和生命周期方法，methods里的方法 }！

**this.$listeners**

console.log(app.$el);

返回Vue实例的关联DOM元素，在这里是#container

console.log(app.$data);

返回Vue实例的数据对象data，在这里就是对象{msg：”hello，2018“}

console.log(app.$options.address);

返回Vue实例的自定义属性address，在这里是自定义属性address

console.log(app.$refs.hello)

返回含有属性ref = hello的DOM元素（如果多个元素都含有这样的属性，只返回最后一个）

测试{{msg}}

## this.$xx方法详解

| 序号 | 名称      | 描述 |
| ---- | --------- | ---- |
| 1    | $nextTick |      |
|      |           |      |
|      |           |      |

this.$nextTick

```javascript
this.dialogFormVisible = true;
      this.$nextTick(() => {
        //this.$nextTick()它是一个异步事件
        //弹出窗口之后,需要加载Dom,就需要一点事件,我们就应该等待它加载完dom之后,再进行
        //调用resetFields方法,重置表单和清除样式
        this.$refs["pojoForm"].resetFields();
        this.pojo.id = null;
      });
```







## 自定义组件的v-model

```html
<template>
  <input type="checkbox" :checked="checked" @change="updateValue" />
</template>
<script>
export default {
  props: {
    checked: Boolean,
  },
  model: {
    prop: "checked", //绑定的属性名
    event: "change", //绑定的事件
  },
  methods: {
    updateInput(e) {
      this.$emit("change", e.target.checked);
    },
  },
};
</script>
```

## vue.config.js配置

一、常用配置 

```javascript
const path = require("path");
const UglifyPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  // 基本路径
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "./",
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  //   compiler: false,
  runtimeCompiler: true, //关键点在这
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
      // 将每个依赖包打包成单独的js文件
      var optimization = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace("@", "")}`;
              }
            }
          }
        },
        minimizer: [
          new UglifyPlugin({
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_console: true, // console
                drop_debugger: false,
                pure_funcs: ["console.log"] // 移除console
              }
            }
          })
        ]
      };
      Object.assign(config, {
        optimization
      });
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
      var optimization2 = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace("@", "")}`;
              }
            }
          }
        }
      };
    }
    Object.assign(config, {
      // 开发生产共同配置
 
      // externals: {
      //   'vue': 'Vue',
      //   'element-ui': 'ELEMENT',
      //   'vue-router': 'VueRouter',
      //   'vuex': 'Vuex'
      // } // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(用于csdn引入)
      resolve: {
        extensions: [".js", ".vue", ".json"], //文件优先解析后缀名顺序
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          "@v": path.resolve(__dirname, "./src/views"),
          "@u": path.resolve(__dirname, "./src/utils"),
          "@s": path.resolve(__dirname, "./src/service")
        }, // 别名配置
        plugins: []
      },
      optimization: optimization2
    });
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true, //注释css热更新生效
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    /* 自动打开浏览器 */
    open: false,
    // host: "192.168.0.137",
    host: "0.0.0.0", //局域网和本地访问
    //host: "192.168.1.137",
    port: 8080,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      "/api": {
        /* 目标代理服务器地址 */
        // target: "http://192.168.0.106:8080/",
        target: "http://192.168.1.126:8080/", //阳洋
        /* 允许跨域 */
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    before: () => {}
  },
  // 第三方插件配置
  pluginOptions: {}
};
```



## vue-cli3全面配置

转自:https://segmentfault.com/a/1190000017008697


### 配置环境变量

  通过在package.json里的scripts配置项中添加--mode xxx来选择不同环境

  在项目根目录中新建.env, .env.production, .env.analyz等文件

  只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中，代码中可以通过process.env.VUE_APP_BASE_API访问

NODE_ENV 和 BASE_URL 是两个特殊变量，在代码中始终可用

.env serve默认的环境变量

```ini
NODE_ENV = 'development'
VUE_APP_BASE_API = 'https://demo.cn/api'
VUE_APP_SRC = 'https://wechat-timg.oss-cn-hangzhou.aliyuncs.com/demo'
```

.env.production build默认的环境变量

```ini
NODE_ENV = 'production'

VUE_APP_BASE_API = 'https://demo.com/api'
VUE_APP_SRC = 'https://img-wechat.oss-cn-hangzhou.aliyuncs.com/demo'
```

.env.analyz 用于webpack-bundle-analyzer打包分析

```ini
NODE_ENV = 'production'
IS_ANALYZ = 'analyz'

VUE_APP_BASE_API = 'https://demo.com/api'
VUE_APP_SRC = 'https://img-wechat.oss-cn-hangzhou.aliyuncs.com/demo'
```

修改package.json

```json
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "analyz": "vue-cli-service build --mode analyz",
  "lint": "vue-cli-service lint"
}
```

### 配置vue.config.js

```awk
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

module.exports = {
  baseUrl: './', // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: '',  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false,  // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {}
};
```

### 配置proxy跨域

```yaml
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
module.exports = {
    devServer: {
        // overlay: {
        //   warnings: true,
        //   errors: true
        // },
        open: IS_PROD,
        host: '0.0.0.0',
        port: 8000,
        https: false,
        hotOnly: false,
        proxy: {
          '/api': {
            target: process.env.VUE_APP_BASE_API || 'http://127.0.0.1:8080',
            changeOrigin: true
          }
        }
    }
}
```

### 修复HMR(热更新)失效

```arduino
module.exports = {
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
    }
}
```

### 添加别名

```sas
const path =  require('path');
const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

module.exports = {
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
          .set('@', resolve('src'))
          .set('assets', resolve('src/assets'))
          .set('components', resolve('src/components'))
          .set('layout', resolve('src/layout'))
          .set('base', resolve('src/base'))
          .set('static', resolve('src/static'));
    }
}
```

### 添加打包分析

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    chainWebpack: config => {
        // 打包分析
        if (process.env.IS_ANALYZ) {
          config.plugin('webpack-report')
            .use(BundleAnalyzerPlugin, [{
              analyzerMode: 'static',
            }]);
        }
    }
}
```

### 配置externals

  防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖

```lua
module.exports = {
    configureWebpack: config => {
        config.externals = {
          'vue': 'Vue',
          'element-ui': 'ELEMENT',
          'vue-router': 'VueRouter',
          'vuex': 'Vuex',
          'axios': 'axios'
        }
    }
}
```

### 去掉console.log

#### 方法一：

```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    configureWebpack: config => {
        if (IS_PROD) {
            const plugins = [];
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log']//移除console
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            );
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
        }
    }
}
```

#### 方法二：使用babel-plugin-transform-remove-console插件

```css
npm i --save-dev babel-plugin-transform-remove-console
```

在babel.config.js中配置

```javascript
const plugins = [];
if(['production', 'prod'].includes(process.env.NODE_ENV)) {  
  plugins.push("transform-remove-console")
}

module.exports = {
  presets: [["@vue/app",{"useBuiltIns": "entry"}]],
  plugins: plugins
};
```

### 开启gzip压缩

```bash
npm i --save-dev compression-webpack-plugin
```

```javascript
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
    configureWebpack: config => {
        if (IS_PROD) {
            const plugins = [];
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
        }
    }
}
```

还可以开启比gzip体验更好的Zopfli压缩详见[https://webpack.js.org/plugins/compression-webpack-plugin](https://link.segmentfault.com/?enc=lGzNLLrbFUvDPQbOiRvTBg%3D%3D.RWXhhPFByjoVJj64t0A2O5YMuijgF76buoKr6KicMeMHzfoIv7MHJQWNz2fY6YBOpntpboZLF9rG%2BQs1BXXXOg%3D%3D)

```css
npm i --save-dev @gfx/zopfli brotli-webpack-plugin
```

```javascript
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const zopfli = require("@gfx/zopfli");
const BrotliPlugin = require("brotli-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
    configureWebpack: config => {
        if (IS_PROD) {
            const plugins = [];
            plugins.push(
                new CompressionWebpackPlugin({
                    algorithm(input, compressionOptions, callback) {
                      return zopfli.gzip(input, compressionOptions, callback);
                    },
                    compressionOptions: {
                      numiterations: 15
                    },
                    minRatio: 0.99,
                    test: productionGzipExtensions
                })
            );
            plugins.push(
                new BrotliPlugin({
                    test: productionGzipExtensions,
                    minRatio: 0.99
                })
            );
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
        }
    }
}
```

#### 为sass提供全局样式，以及全局变量

  可以通过在main.js中Vue.prototype.$src = process.env.VUE_APP_SRC;挂载环境变量中的配置信息，然后在js中使用$src访问。

  css中可以使用注入sass变量访问环境变量中的配置信息

		css中可以使用注入sass变量访问环境变量中的配置信息

```javascript
module.exports = {
    css: {
        modules: false,
        extract: IS_PROD,
        sourceMap: false,
        loaderOptions: {
          sass: {
            // 向全局sass样式传入共享的全局变量
            data: `@import "~assets/scss/variables.scss";$src: "${process.env.VUE_APP_SRC}";`
          }
        }
    }
}
```

在scss中引用

```css
.home {
    background: url($src + '/images/500.png');
}
```

### 添加IE兼容

```css
npm i --save @babel/polyfill
```

  在main.js中添加

```nginx
import '@babel/polyfill';
```

配置babel.config.js

```javascript
const plugins = [];

module.exports = {
  presets: [["@vue/app",{"useBuiltIns": "entry"}]],
  plugins: plugins
};
```





# 创建vue2组件库

## 创建项目

```
cd i:
cd I:\PZYDemo\VueComponents
vue create vuecomponents
```

### 目录结构

![image-20211101092943897](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261653635.png)

### 删除App.Vue,main.js,public

### 添加src/index.js

```js
import HelloWorld from "./components/HelloWorld.vue"

const components={
    HelloWorld
};

const install = function(Vue) {
    if (install.installed) return;

    Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION,
    install,
    ...components
}

export default API;
```

### package.json添加script

```
"build-lib": "vue-cli-service build --target lib --name vuecomponents ./src/index.js"
```

### package.json添加main

```
  "main": "./src/index.js",
```



### 执行build-lib

![image-20211101093737188](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261653584.png)

### 示例

./examples/index.js

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title></title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <link href="../dist/vuecomponents.css" rel="stylesheet" type="text/css" />
    <script src="../dist/vuecomponents.umd.js"></script>

    <style>
        html,
        body,
        #app {
            width: 100%;
            height: 100%;
            padding: 0px;
            margin: 0px;
        }

        #app {
            font-family: Avenir, Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-align: center;
            color: #2c3e50;
            margin-top: 60px;
        }

        
    </style>

</head>

<body>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <hello-world></hello-world>
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data() {
                return {}
            },

            methods: {

            }
        })
    </script>
</body>

</html>
```

![image-20211101111802443](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261653688.png)

## 发布npm包

这里不介绍npm账号的注册之类，主要演示发布成npm包形式使用

```
npm login

//需要把package.js 里面的private值改为false
//包名重复就改个没被人用过的
npm publish

(非要用这个报名则加作用域)
npm init --scope=@panzhiyue -y
//公共发布
npm publish --access public
```



## 创建测试项目

```
vue create vuecomponentsexample
cd vuecomponentsexample
```

### 下载npm包

```
npm i @panzhiyue/vuecomponents
```

### 修改main.js

```js
import Vue from 'vue'
import App from './App.vue'
import vuecomponents from '../node_modules/@panzhiyue/vuecomponents/src/index.js'
Vue.use(vuecomponents);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

```

### 修改App.vue

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

### 运行

```
npm run serve
```

![image-20211101112054243](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261653689.png)

## 代码

包:https://gitee.com/panzhiyue/vuecomponents

示例:https://gitee.com/panzhiyue/vuecomponentsexample







# vue-styleguidist

## 学习资料

文档:https://vue-styleguidist.github.io/docs/GettingStarted.html#_1-install

博客教程:https://www.cnblogs.com/mfyngu/p/13050392.html

# 小知识

1.

今天遇到了在mounted中无法读取到props值的问题，测试了很久最后发现props中的属性名不能`大写`,使用的vue版本是`2.6.11`