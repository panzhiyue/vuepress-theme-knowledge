# vue-property-decorator

## 1.Vue class 组件介绍

在 Vue 的 V2.X 版本中使用 TypeScript 时，推荐使用 基于类的注解装饰器 进行开发。Vue 官方推荐 [Vue Class Component](https://class-component.vuejs.org/guide/class-component.html#data)，但是它的装饰器可能存在一点小问题，业界普遍推荐使用 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)，它是基于 [vue-class-component](https://github.com/vuejs/vue-class-component) 开发而成，但是性能上有一些改进，下面主要介绍基于 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) 的 Vue class 组件的基本使用。

Vue class 类组件的基本结构：@Component 装饰器可以使类成为 Vue 组件



```javascript
import Vue from 'vue'
import Component from 'vue-class-component'    //推荐 vue-property-decorator 
 
// HelloWorld class will be a Vue component
@Component
export default class HelloWorld extends Vue {}
```

## 2.Vue class 组件基本使用

回想一下使用 JS 对象的普通 vue 组件的基本结构是，再看一下基于 JS 或 TS 的类组件的写法：

```javascript
export default { data, props, methods, created, ...}    // 使用 JS 对象的普通 vue 组件
 
@Component
export default class XXX extends Vue {    // 用 TS 类 <script lang="ts">
    xxx: string = 'hi';                   // 直接声明 data 变量即可，需要给变量指定类型
    selectType(type: string){...};        // 直接写 methods 方法即可，需要给参数指定类型
    @Prop(Number) xxx: number | undefined;// Number表示变量xxx的运行时类型，number|undefined表示变量xxx的编译时类型
    //@Prop 是告诉 Vue xxx 不是 data 是 prop
    //Number 是告诉 Vue xxx 运行时是个 Number 类型
    //number | undefined 是告诉 TS xxx 的编译时类型
}
 
@Component
export default class XXX extends Vue {    // 用 JS 类 <script lang="js">
    xxx = 'hi';                           // 如果你不想使用 ts 类，可以使用这种
}                                         // 但是优先推荐使用 ts 类组件，它可以指定变量类型，编译时就报错
```

上面涉及到 data、methods、props 的基本使用方式，剩下的一些 Vue options 选项可以参考文档，这里就不赘述了。



## 3.vue-property-decorator装饰器和Mixin函数：

- @Component
- @Prop
- @PropSync
- @Model
- @Watch
- @Emit
- @Ref
- mixins

### 1. @Component(options:ComponentOptions = {}) 装饰器

@Component装饰器可以创建一个Class组件，它接受一个对象作为参数

```javascript
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"; //导入Component装饰器
import HomeComponent from "@/components/HomeComponent.vue"; // 引入组件
import { NavigationGuardNext, Route } from "vue-router";

@Component({
  components: {
    HomeComponent,
  },
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    next((vm: any) => {
      console.log(vm); // vm就是当前组件的实例
    });
  },
  beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext) {
    next();
  },
  beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
})
export default class Home extends Vue {
  private title = "HomeTitle";
}
</script>
```

 **registerHooks:

**  除了上面介绍的将beforeRouteLeave放在Component中之外,还可以全局注册,就是registerHooks

```vue
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
 
Component.registerHooks([
  'beforeRouteLeave',
  'beforeRouteEnter',
]);
 
@Component
export default class App extends Vue {
  beforeRouteLeave(to: any, from: any, next: any) {
    console.log('beforeRouteLeave');
    next();
  }
 
  beforeRouteEnter(to: any, from: any, next: any) {
    console.log('beforeRouteLeave');
    next();
  }
}
</script>
```



### 2. @Prop(options: (PropOptions | Constructor[] | Constructor) = {})装饰器

@Prop装饰器接收一个参数，这个参数可以有三种写法：

- Constructor，例如String，Number，Boolean等，指定 prop 的类型；
- Constructor[]，指定 prop 的可选类型；
- PropOptions，可以使用以下选项：type，required，default，validator。

**注意:属性的ts类型后面需要加上`undefined`类型；或者在属性名后面加上!，表示`非null` 和 `非undefined`
的断言，否则编译器会给出错误提示；**

父组件

```vue
<template>
  <div>
    <PropComponent height="175" sex="boy" age="26" />
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import PropComponent from "@/components/PropComponent.vue";

@Component({
  components: {
    PropComponent,
  },
})
export default class PropPage extends Vue {}
</script>
<style scoped>
</style>
```

子组件

```vue
<template>
  <div>我是一个{{ sex }}，身高有{{ height }}公分，{{ age }}岁了</div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class PropComponent extends Vue {
  @Prop(String)
  //   参数类型的写法
  //   private height!: string;
  //   private height?: string;
  //   private height = "175";
  private height: string | undefined;
  @Prop({ type: String, required: true, default: "boy" })
  private sex!: string;
  @Prop([String, Number])
  private age!: string | number;
}
</script>
<style scoped>
</style>
```

### 3. @PropSync(propName: string, options: (PropOptions | Constructor[] | Constructor) = {})装饰器

@PropSync装饰器与@prop用法差不多，区别在于：

- @PropSync 装饰器接收两个参数：

- propName: string 表示父组件传递过来的属性名；
- options: Constructor | Constructor[] | PropOptions 与@Prop的参数一致；

@PropSync 会生成一个新计算属性的 getter 和 setter.

注意：父组件要结合.sync来使用



父组件

```vue
<template>
  <div>
    <PropSyncComponent :title.sync="title" />
    <br />
    <button @click="onChangeTitle">父组件按钮</button>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import PropSyncComponent from "@/components/PropSyncComponent.vue";

@Component({
  components: {
    PropSyncComponent,
  },
})
export default class PropSyncPage extends Vue {
  private title = "这是父组件传给子组件的一个title";
  private onChangeTitle(): void {
    this.title = "这是一个父组件改变的title";
  }
}
</script>
<style scoped>
</style>
```

子组件

```vue
<template>
  <div>
    <h1>{{ syncTitle }}</h1>
    <button @click="onChangeTitle">子组件按钮</button>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, PropSync } from "vue-property-decorator";

@Component
export default class PropSyncComponent extends Vue {
  @PropSync("title", { type: String }) syncTitle!: string;
  private onChangeTitle(): void {
    this.syncTitle = "这是一个子组件改变的title";
  }
}
</script>
<style scoped>
</style>
```

### 4. @Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {})装饰器

@Model装饰器允许我们在一个组件上自定义v-model，接收两个参数：

- event: string 事件名。
- options: Constructor | Constructor[] | PropOptions 与@Prop的参数一致。

父组件

```vue
<template>
  <div>
    <ModelComponent
      v-model="title"
      @changeInput="onChangeInput"
    />
    <div>父组件title：{{ title }}</div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import ModelComponent from "@/components/ModelComponent.vue";
@Component({
  components: {
    ModelComponent,
  },
})
export default class ModelPage extends Vue {
  private title = "通过v-model实现子父组件数据双向绑定";
  private onChangeInput(evt: any) {
    console.log(evt);
    this.title = evt;
  }
}
</script>
<style scoped>
</style>
```

子组件

```vue
<template>
  <div>
    <div>子组件title：{{ title }}</div>
    <input
      style="width: 50%"
      type="text"
      :value="title"
      @input="onInputHandle($event)"
    />
  </div>
</template>
<script lang='ts'>
import { Component, Model, Vue, Emit, Prop } from "vue-property-decorator";

@Component
export default class ModelComponent extends Vue {
  //@Model第一个参数changeInput可以随便写，实际上只是规定了子组件要更新父组件值需要注册的方法
  //即@Emit第一个参数名，不同也不影响什么
  @Model("changeInput", String) readonly title!: string;
  @Emit("changeInput")
  private onChangeInput(evt: string) {
    // console.log(evt);
  }
  // 监听输入
  private onInputHandle(evt: any) {
    this.onChangeInput(evt.target.value);
  }
}
</script>
<style scoped>
</style>
```

### 5. @Watch(path: string, options: WatchOptions = {})装饰器

@Watch 装饰器接收两个参数：

- path: string 被侦听的属性名；
- options?: WatchOptions={} options可以包含两个属性 ：

- immediate?:boolean 侦听开始之后是否立即调用该回调函数；
- deep?:boolean 被侦听的对象的属性被改变时，是否调用该回调函数；

发生在`beforeCreate`勾子之后，`created`勾子之前

下面的代码中用了不同的方法介绍了@Watch的使用：[[ JS用法参考](https://blog.51cto.com/u_15127583/2781723)]

父组件

```vue
<template>
  <div>
    <WathcComponent :enscore="enscore" :score="score" />
    <p>语文分数：{{ score.cnscore }}</p>
    <br />
    <button @click="onChangeScore">changeScore</button>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import WathcComponent from "@/components/WatchComponent.vue";
@Component({
  components: {
    WathcComponent,
  },
})
export default class WatchPage extends Vue {
  private enscore = 80;
  private score = { cnscore: 80, name: "中文分数" };
  private onChangeScore() {
    this.enscore = 90;
    this.score.cnscore++;
    // this.score = { cnscore: 90, name: "中文分数" };
    // this.score.name = "语文分数";
  }

}
</script>
<style scoped>
</style>
```

子组件

```vue
<template>
  <div>
    <h1>一个{{ age }}岁的学生，<br />期末考试总分是{{ total }}</h1>
    <button @click="age = age + 1">addAge</button>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class WatchComponent extends Vue {
  @Prop(Number)
  private enscore!: number;
  @Prop()
  private score!: any;
  private age = 17;
  private total = 0;
  //1.常用方法
  //特定：当值第一次绑定的时候，不会触发监听函数，只有值发生改变才会执行。
  @Watch("age")
  onAgeChanged(newValue: number, oldValue: number) {
    console.log("age", newValue, oldValue);
  }
  //2.立即执行(immediate)属性
  //当需要在绑定值的时候也触发函数，监听值的变化，就需要用到immediate属性。
  @Watch("enscore", { immediate: false })
  onEnscoreChanged(newValue: object, oldValue: object) {
    console.log(
      "绑定时触发enscore",
      newValue,
      oldValue,
      this.score,
      this.enscore
    );
    this.total = this.score.cnscore + this.enscore;
    console.log(
      "注意这里，当immediate为false进入页面时，没有执行监听函数",
      this.total
    );
  }
  //3.深度监听
  //当需要监听复杂数据类型(对象)的改变时，上述两个方法无法监听到对象内部属性的改变，
  //只有score中的数据才能够监听到变化，此时就需要deep属性对对象进行深度监听。
  @Watch("score", { deep: false }) //无法监听到变化
  //   @Watch("score.cnscore", {  deep: false })//可以监听到变化
  onscoreChanged(newValue: number, oldValue: number) {
    console.log(
      "深度监听cnscore",
      newValue,
      oldValue,
      this.score.cnscore,
      this.score.name,
      this.enscore
    );
    this.total = this.score.cnscore + this.enscore;
    console.log(
      "注意这里，当deep为false时，没有执行监听函数，total没有变化",
      this.total
    );
  }
}
</script>
<style scoped>
</style>
```

### 6.@Emit(event?: string)装饰器

@Emit 装饰器接收一个可选参数，作为事件名称。

- 如果没有提供这个参数，@Emit会将回调函数名的camelCase转为kebab-case，作为事件名称；
- @Emit会将回调函数的返回值作为第二个参数，如果返回值是一个Promise对象，则会在触发前达到完成状态.
- @Emit的回调函数的参数，会放在其返回值之后作为参数被使用。



父组件

```vue
<template>
  <div>
    <!-- <EmitComponent :title="title" @change-title1="onChangeTitle" /> -->
    <!-- <EmitComponent :title="title" @change-title2="onChangeTitle" /> -->
    <EmitComponent
      :title="title"
      :time="time"
      :site="site"
      @change-title="onChangeTitle"
      @change-site="onChangeSite"
      @change-time="onChangeTime"
    />
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import EmitComponent from "@/components/EmitComponent.vue";
@Component({
  components: {
    EmitComponent,
  },
})
export default class EmitPage extends Vue {
  private title = "EmitTitle";
  private time = "2021年1月3日12点";
  private site = "湖南长沙";
  private onChangeTitle() {
    this.title = "通过@Emit装饰器改变父组件的值";
  }
  private onChangeTime(data: string) {
    console.log(data);
    //接受子组件传过来的参数直接赋值
    this.time = data;
  }
  private onChangeSite(data: string, evt: any) {
    console.log(data, evt);
    //接受回调函数参数赋值
    this.site = evt.target.value;
  }
}
</script>
<style scoped>
</style>
```

子组件

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <h1>{{ time }}</h1>
    <h1>{{ site }}</h1>
    <button @click="onChangeTitle">改变标题</button>
    <br />
    <br />
    <button @click="onChangeTime">改变时间</button>
    <br />
    <br />
    <input
      type="text"
      @input="changeSite($event)"
    />
  </div>
</template>
<script lang='ts'>
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class EmitComponent extends Vue {
  @Prop(String)
  private title!: string
  @Prop(String)
  private time!: string
  @Prop(String)
  private site!: string
  //第一个参数是事件名称
  @Emit('change-title')
  private changeTitle() {
    console.log('change-title')
  }
  //如果未传事件名称，@Emit会将回调函数名changeTitle2的camelCase转为kebab-case，并将其作为事件名；
  @Emit()
  private changeTime() {
    console.log('change-time')
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const min = date.getMinutes()
    const second = date.getSeconds()
    return (
      String(year) + '年' + String(month) + '月' + String(day) + '日' + String(hour) + '点'
    )
  }
  @Emit()
  private changeSite(evt: any) {
    console.log('change-site')
    return 'change-site'
  }
  private onChangeTitle() {
    //这样直接改变props里面的值会报警告
    // this.title = "emit-component-title";
    this.changeTitle()
  }
  private onChangeTime() {
    this.changeTime()
  }
}
</script>
<style scoped>
</style>
```

### 7. @Ref(refKey?: string)装饰器

@Ref 装饰器接收一个可选参数，用来指向元素或子组件的引用。没有提供参数，会使用装饰器后面的属性名充当参数。

父组件

```vue
<template>
  <div>
    <RefComponent ref="refcomponent" />
    <button @click="onChangeChildText">change</button>
  </div>
</template>
<script lang='ts'>
import { Component, Ref, Vue } from 'vue-property-decorator'
import RefComponent from '@/components/RefComponent.vue'
@Component({
  components: {
    RefComponent,
  },
})
export default class RefPage extends Vue {
  @Ref('refcomponent') readonly refcomponent!: RefComponent
  private onChangeChildText() {
    this.refcomponent.p.innerHTML = '通过父组件改变子组件元素值'
  }
}
</script>
<style scoped>
</style>
```

子组件

```vue
<template>
  <div>
    <p ref="p">{{text}}</p>
  </div>
</template>
<script lang='ts'>
import { Component, Ref, Vue } from 'vue-property-decorator'

@Component
export default class RefComponent extends Vue {
  private text = '@Ref(refKey?: string)装饰器的使用'
  @Ref() readonly p!: HTMLParagraphElement
}
</script>
<style scoped>
</style>
```

### 8.Provide/Inject   ProvideReactive/InjectReactive

@Provide(key?: string | symbol) / @Inject(options?: { from?: InjectKey, default?: any } | InjectKey) decorator
@ProvideReactive(key?: string | symbol) / @InjectReactive(options?: { from?: InjectKey, default?: any } | InjectKey) decorator
提供/注入装饰器,
key可以为string或者symbol类型,

相同点:Provide/ProvideReactive提供的数据,在内部组件使用Inject/InjectReactive都可取到
不同点:如果提供(ProvideReactive)的值被父组件修改，则子组件可以使用InjectReactive捕获此修改。



```vue
// 最外层组件
<template>
  <div class="">
    <H3>ProvideInjectPage页面</H3>
    <div>
      在ProvideInjectPage页面使用Provide,ProvideReactive定义数据,不需要props传递数据
      然后爷爷套父母,父母套儿子,儿子套孙子,最后在孙子组件里面获取ProvideInjectPage
      里面的信息
    </div>
    <hr/>
    <provideGrandpa></provideGrandpa> <!--爷爷组件-->
  </div>
</template>
 
<script lang="ts">
import {
  Vue, Component, Provide, ProvideReactive,
} from 'vue-property-decorator';
import provideGrandpa from '@/components/ProvideGParentComponent.vue';
 
@Component({
  components: { provideGrandpa },
})
export default class ProvideInjectPage extends Vue {
  @Provide() foo = Symbol('fooaaa');
 
  @ProvideReactive() fooReactive = 'fooReactive';
 
  @ProvideReactive('1') fooReactiveKey1 = 'fooReactiveKey1';
 
  @ProvideReactive('2') fooReactiveKey2 = 'fooReactiveKey2';
 
  created() {
    this.foo = Symbol('fooaaa111');
    this.fooReactive = 'fooReactive111';
    this.fooReactiveKey1 = 'fooReactiveKey111';
    this.fooReactiveKey2 = 'fooReactiveKey222';
  }
}
</script>
 
// ...provideGrandpa调用父母组件
<template>
  <div class="hello">
    <ProvideParentComponent></ProvideParentComponent>
  </div>
</template>
 
// ...ProvideParentComponent调用儿子组件
<template>
  <div class="hello">
    <ProvideSonComponent></ProvideSonComponent>
  </div>
</template>
 
// ...ProvideSonComponent调用孙子组件
<template>
  <div class="hello">
    <ProvideGSonComponent></ProvideGSonComponent>
  </div>
</template>
 
 
// 孙子组件<ProvideGSonComponent>,经过多层引用后,在孙子组件使用Inject可以得到最外层组件provide的数据哦
<template>
  <div class="hello">
    <h3>孙子的组件</h3>
    爷爷组件里面的foo:{{foo.description}}<br/>
    爷爷组件里面的fooReactive:{{fooReactive}}<br/>
    爷爷组件里面的fooReactiveKey1:{{fooReactiveKey1}}<br/>
    爷爷组件里面的fooReactiveKey2:{{fooReactiveKey2}}
    <span style="padding-left:30px;">=> fooReactiveKey2没有些key所以取不到哦</span>
  </div>
</template>
 
<script lang="ts">
import {
  Component, Vue, Inject, InjectReactive,
} from 'vue-property-decorator';
 
@Component
export default class ProvideGSonComponent extends Vue {
  @Inject() readonly foo!: string;
 
  @InjectReactive() fooReactive!: string;
 
  @InjectReactive('1') fooReactiveKey1!: string;
 
  @InjectReactive() fooReactiveKey2!: string;
}
</script>
```



### 9. mixins的使用

mixins有两种使用方法，扩展和混合：

- 将现有的类组件扩展为本机类继承，使用本机类继承语法对其进行扩展：

mymixins.ts

```javascript
import { Vue, Component } from 'vue-property-decorator';

declare module 'vue/types/vue' {
    interface Vue {
        methodFromMixins(value: number | string): void;  // 记得声明一下，要不然会报错 Property 'methodFromMixins' does not exist on type 'App'.
    }
}

@Component
export default class MyMixins extends Vue {
    public text = 'method from mixins,';
    public methodFromMixins(value: number | string): string {
        console.log(this.text, value);
        return this.text + value;
    }
    created() {
        console.log('init data,method from mixins,');
    }
}
```

```vue
<template>
  <div>{{methodFromMixins('hello mixins')}}</div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import mymixins from '@/components/mixins/mymixins'
@Component({
  mixins: [mymixins],
})
export default class MixinPage extends Vue {
  created() {
      this.methodFromMixins('hi');
    console.log('father init data,method from mixins,');
  }
}
</script>
<style scoped>
</style>
```

- Vue类组件提供了mixins辅助功能，以类样式方式使用mixins。通过使用mixins帮助程序，TypeScript可以推断混合类型并在组件类型上继承它们。

声明HelloMixins和HiMixins：

mixins.ts

```javascript
import { Vue, Component } from "vue-property-decorator";

@Component // 一定要用Component修饰
export class HelloMixins extends Vue {
    public hello = 'hello mixins';
}
@Component // 一定要用Component修饰
export class HiMixins extends Vue {
    public hi = 'hi mixins';
}
```

在类样式组件中使用它们：

```vue
<template>
  <div>{{hello}} | {{hi}}</div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { HelloMixins, HiMixins } from '@/components/mixins/Mixins'
import { mixins } from 'vue-class-component'
@Component
export default class MixinPage extends mixins(HelloMixins, HiMixins) {
  created() {
    console.log(this.hello + this.hi)
  }
}
</script>
<style scoped>
</style>
```

注意：每个超类都必须是一个类组件。它需要继承Vue构造函数作为祖先并由@Component装饰器进行装饰。



## 4.component name 无法定义

使用普通写法写 vue 组件的时候, 通常使用 name 字段声明组件名称

```javascript
export default {
	name: 'MyComponet'
}
```

而使用 `vue-property-decorator` 时, 通常会直接定义 `class name`

```javascript
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MyComponent extends Vue {}
```

看起来好像是没有问题, 定义了一个 name 为 MyComponent 的组件, class 的名称就是组件的名称, 但实际不是.

### 第一个很坑的点

在代码中 import 这个组件让后打印组件的名称, 确实会打印出 MyComponent.
就算用 MyComponet.name 去注册组件也是可以的

例如:

```vue
import Vue from 'vue';
import MyComponent from 'MyComponent';

console.log(MyComponent.name) // MyComponent
Vue.component(MyComponent.name, MyComponent);
```

上面的代码都是可以得到预期结果的, 但是实际上 MyComponent 这个组件的 name 并没有被定义.

为什么这么说呢? 如果你使用过组件递归就知道, 使用递归的组件必须定义组件的name, 而上面使用 vue-property-decorator 定义的组件, 无法被递归.



### 第二个很坑的点

当你在本地运行项目时, 递归是成功的, 但是一旦打包发布之后, 线上的结果就坑爹了.
在 @component({name: string})定义也不行

```javascript
import { Vue, Component } from 'vue-property-decorator';

@Component({
	name: 'MyComponent',
})
export default class MyComponent extends Vue {}
```