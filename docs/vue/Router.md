# Router



## 一、什么是路由

Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得非常简单。 通过根据不同的请求路径，切换显示不同组件进行渲染页面。

## 二、基本路由使用

### 1.安装路由

注意：要安装 vue 模块

```bash
https://unpkg.com/vue-router@4
https://unpkg.com/vue-router@4.0.5/dist/vue-router.global.js
npm install vue-router@next
yarn add vue-router@next
```

### 2.配置路由

添加路由配置页`router/index.js`

```typescript
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "@/views/Home.vue"

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: import("@/views/About.vue") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


export default router
```

修改`main.ts`

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

createApp(App).use(router).mount('#app')
```

### 3.使用路由

使用路由一般需要用到以下2个HTML标签

#### `router-link`

请注意，我们没有使用常规的 `a` 标签，而是使用一个自定义组件 `router-link` 来创建链接。这使得 Vue Router 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码。我们将在后面看到如何从这些功能中获益。

#### `router-view`

`router-view` 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。

#### HTML

我们修改`App.vue`中的代码

```vue
<template>
  <p>
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
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

![image-20220210091445664](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270850851.png)

### 4.路由对象

通过调用 `app.use(router)`，我们可以在任意组件中以 `this.$router` 的形式访问它，并且以 `this.$route` 的形式访问当前路由：

```vue
<template>
  <h4>Home</h4>
  <div>username:{{username}}</div>
  <button @click="goToAbout">about</button>
</template>
<script>
export default {
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.query.username;
    },
  },
  methods: {
    goToAbout() {
      this.$router.push({
          path:"/about",
          query:{username:"testHome"}
      });
    },
  },
};
</script>
```

要在 `setup` 函数中访问路由，请调用 `useRouter` 和 `useRoute` 函数。我们将在 [Composition API](https://router.vuejs.org/zh/guide/advanced/composition-api.html#在-setup-中访问路由和当前路由) 中了解更多信息。

```vue
<template>
  <h4>About</h4>
  <div>username:{{ username }}</div>
  <button @click="goToHome">home</button>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    //route是一个跳转的路由对象，每一个路由都会有一个route对象，是一个局部的对象，可以获取对应的name,path,params,query等
    const route = useRoute();
    //router是VueRouter的一个对象，通过Vue.use(VueRouter)和VueRouter构造函数得到一个router的实例对象，这个对象中是一个全局的对象，他包含了所有的路由包含了许多关键的对象和属性。
    const router = useRouter();
    const username = route.query.username;
    const goToHome = () => {
      router.push({ path: "/", query: { username: "testAbout" } });
    };
    return { goToHome, username };
  },
});
</script>
```

在整个文档中，我们会经常使用 `router` 实例，请记住，`this.$router` 与直接使用通过 `createRouter` 创建的 `router` 实例完全相同。我们使用 `this.$router` 的原因是，我们不想在每个需要操作路由的组件中都导入路由。

## 三、路由对象Router与Route

### 1.router路由管理

`router`是`VueRouter`的一个对象，通过[Vue](https://so.csdn.net/so/search?q=Vue&spm=1001.2101.3001.7020).use(VueRouter)和VueRouter构造函数得到一个router的实例对象，这个对象中是一个全局的对象，他包含了所有的路由包含了许多关键的对象和属性。

**属性**

- $router.app ：配置了router的Vue根实例
- $router.mode：路由模式，这里是hash
- $router.currentRoute：当前路由的路由信息对象，包含了当前匹配路由的信息

**方法**

- router.addRoutes(routes)：动态添加路由规则，参数为符合routes选项要求的数组。

- router.beforeEach(to,from,next) ：全局前置守卫

  ```javascript
  router.beforeEach((to,from,next)=>{
       //... 
  })
  ```

  当路由改变时，全局前置守卫执行，接受三个参数，to，from，next，分别代表即将要进入的目标路由，当前要离开的路由，和回调函数next()。next的执行效果依赖于参数。next()，执行下一个钩子，若钩子执行完毕，导航状态是confirm；next(false)中断当前导航，回到from路由对应的地址；next({path:’/‘}),跳转到自定义路由地址。next(error)，如果传入一个error实例，则导航终止并将错误传递给router.onError()注册过的回调。

- router.beforeResolve()：全局解析守卫 , 在导航被确认之前，且在锁头组件内守卫和异步路由组件被解析之后调用，参数和全局前置守卫相同；

- router.afterEach()：全局后置守卫

  ```javascript
  router.afterEach((to,from)=>{
      //....没有next()函数参数，也不会改变导航本身
  })
  ```

- router.go(n)：接受一个整数作为参数，类似window.history.go(n)，在浏览器历史记录中前进或后退几步

- router.push( location )：跳转导航的方法，这种方法会向history栈添加一个新的记录

- router.replace( location )：和router.push()类似，但是它会替换掉当前的history记录，不会添加新的记录

- router.back()：相当于router.go(-1)

- router.forward()：相当于router.go(1)

- router.resolve(location)：解析目标路由，接受一个地址参数，返回location,route,href等属性信息，还可以接受当前默认路由current和当前路由上附加路径append　两个参数

- router.onReady(callback,[errorCallback]){}：把一个回调排队，在路由完成初始导航时调用。

- router.onError(callback)：注册一个回调，该回调会在路由导航过程中出错的时候被调用，但是对被调用的错误情形有要求：

　　1、错误在一个路由守卫函数中被同步抛出

　　2、错误在一个路由守卫函数中通过调用next(error)的方式异步捕获并处理

　　3、渲染一个路由的过程中，需要尝试解析一个异步组件时发生错误

#### router.push方法详解

在`Vue`路由跳转中，除了使用 `<router-link>` 创建 `a` 标签来定义导航链接，我们还可以借助 `router` 实例方法，通过编写代码来实现。

```javascript
router.push(location)
```

想要导航到不同的 URL，使用 router.push 方法。这个方法会向 history 栈添加一个新记录，所以，当用户点击浏览器后退按钮时，可以返回到之前的 URL。

当你点击 `<router-link>` 时， router.push 方法会在内部调用，所以说，点击`<router-link :to="...">` 等同于调用 router.push(…)。

- 声明式：`<router-link :to="...">`
- 编程式：`router.push(...)`

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。

```vue
<template>
  <h4>Router</h4>
  <button @click="push">push</button>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const push = () => {
      //路由name或者路由path属性
      router.push("route");
      //指定路由name属性
      router.push({
        name: "route",
      });
      //指定路由path属性
      router.push({
        path: "/route",
      });
      //#region传入参数

      //变成/route?name=test1
      router.push({
        path: "/route",
        query: { name: "test1" },
      });

      //传入params参数必须使用name,并且刷新后丢失
      router.push({
        name: "route",
        params: { name: "test2" },
      });
      //#endregion
    };
    return { push };
  },
});
</script>
```

### 2.route当前激活的路由信息对象

route是路由信息对象，包含了当前路由的各种信息。路由对象是不可更改的，每次路由导航成功后都会产生一个新的对象。router.match（location）的返回值也是一个路由信息对象，导航守卫的参数to，from也是路由信息对象。

**属性：**

$route.fullPath ：完成解析后的url，包含查询参数和hash的完整路径

$route.path：路径，字符串类型，解析为绝对路径

$route.hash： 当前路由的hash值（带#号的），如果没有hash值则为空字符串

$route.name：当前路由的名称，如果有的话（用于命名路由）

$route.params：一个键值对对象，路由参数

$route.query：一个键值对对象，表示url查询参数

$route.matched：一个包含了当前路由的所有嵌套路径片段的路由记录（routes配置数组中的对象副本）

$route.redirectedFrom：重定向来源的路由的名字，如果存在重定向的话。

在浏览器中打印出route

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270850855.png)

## 四、路由传参的几种基本方式

### 一、动态路由（页面刷新数据不丢失）

```javascript
methods：{
  insurance(id) {
     //直接调用$router.push 实现携带参数的跳转
     this.$router.push({
       path: `/particulars/${id}`,
     })
}
```

路由配置

```javascript
{
     path: '/particulars/:id',
     name: 'particulars',
     component: particulars
}
```

接收页面通过 `this.$route.params.id` 接收

### 二、路由 name 匹配，通过 params 传参

```javascript
methods：{
  insurance(id) {
     this.$router.push({
        name: 'particulars',
        params: {
          id: id
        }
      })
  }
```

路由配置

```javascript
 {
   path: '/particulars',
   name: 'particulars',
   component: particulars
 }
```

也是通过 `this.$route.params.id` 接收参数

### 三、路由 path 路径匹配，通过 query 传参

通过`query`来传递参数，这种情况下 `query`传递的参数会显示在`url`后面以`?id=？`形式展示。

```javascript
methods：{
  insurance(id) {
    this.$router.push({
      path: '/particulars',
      query: {
        id: id
      }
   })
 }
```

路由配置

```javascript
 {
   path: '/particulars',
   name: 'particulars',
   component: particulars
 }
```

通过 `this.$route.query.id` 接收参数

再次梳理下`params`传参和`query`传参的差别：

**1. 用法上**

刚才已经说了，`query`要用`path`来引入，`params`要用`name`来引入，接收参数都是类似的，分别是`this.$route.query.name`和`this.$route.params.name`。

> PS:注意接收参数的时候，已经是`$route`而不是`$router`！

**2. 展示上**

`query`更加类似于`ajax`中`get`传参，`params`则类似于`post`，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示。

## 实例属性

| 名称                  | 类型         | 描述                                                         |
| --------------------- | ------------ | ------------------------------------------------------------ |
| router.app            | Vue instance | 配置了 `router` 的 Vue 根实例。                              |
| router.mode           | string       | 路由使用的[模式](https://router.vuejs.org/zh/api/#mode)。    |
| router.currentRoute   | Route        | 当前路由对应的[路由信息对象](https://router.vuejs.org/zh/api/#路由对象)。 |
| router.START_LOCATION | Route        | 以[路由对象](https://router.vuejs.org/zh/api/#路由对象)的格式展示初始路由地址，即路由开始的地方。可用在导航守卫中以区分初始导航。 |



## 实例方法

| 名称                        | 描述 | 示例 |
| --------------------------- | ---- | ---- |
| router.beforeEach           |      |      |
| router.beforeResolve        |      |      |
| router.afterEach            |      |      |
| router.push                 |      |      |
| router.replace              |      |      |
| router.go                   |      |      |
| router.back                 |      |      |
| router.forward              |      |      |
| router.getMatchedComponents |      |      |
| router.resolve              |      |      |
| router.addRoutes            |      |      |
| router.addRoute             |      |      |
| router.addRoute             |      |      |
| router.getRoutes            |      |      |
| router.onReady              |      |      |
| router.onError              |      |      |



