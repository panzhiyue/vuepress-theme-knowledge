## tsconfig.json详解

### tsconfig.json文件说明

一般在 `typescript` 的项目中，我们都能看到 `tsconfig.json` 这个文件，它指定了此项目的编译选项，也指定了此项目的根目录，因此这个文件一般也是在项目的根目录下。既然如此，就单单 `typescript` 项目而言，它的编译一般有以下几种方式：

- 命令行直接输入 `tsc` 命令不带任何参数进行编译：

  此时编译器会从当前目录开始查找 `tsconfig.json` 文件，如果当前目录没有发现该文件，则逐级向父级目录搜索。如果一直没有检索到该文件，编译器会给出使用提示。

- 命令行调用 `tsc` 带参数 `--project(或 -p)` 而指定一个目录：

  编译器直接在该目录下查找 `tsconfig.json` 文件，如果没找到则报错。

- 命令行调用 `tsc` 后直接指定文件：

  直接编译指定的文件。

#### 1. files

数组类型，用于表示由 `ts` 管理的 **文件** 的具体路径，可以是相对或绝对路径。这些文件内部有依赖的模块(或者引入了哪些模块)，编译器也会搜索到依赖模块进行编译。如果某些模块并没有在项目中引入，虽然在项目目录中也不会被编译。需要注意的是，`files` 中不支持 `glob` 匹配模式的路径。

#### 2. include 与 exclude

数组类型，`include` 用于表示 `ts` 管理的文件。`exclude`用于表示 `ts` 排除的文件(即不被编译的文件)。其中的文件列表可以使用 `glob` 匹配模式列表，支持的glob通配符有：

- `*` 匹配0或多个字符（不包括目录分隔符）
- `?` 匹配一个任意字符（不包括目录分隔符）
- `**/` 递归匹配任意子目录

**注意**，这三者的优先级是这样的：`files > exclude > include` 。如果不指定 `files` ，项目目录下的所有文件都会被编译器编译。如果同一个文件在三者中均指定，此文件一定会被编译器编译。而 `files` 中不指定而在 `exclude`、`include` 中同时指定的文件也会被编译，因为优先级是这样的 `exclude > include` 。另外，`exclude`默认情况下会排除`node_modules`，`bower_components`，`jspm_packages` 和 `outDir` 目录。

#### 3. compileOnSave

布尔类型，可以让 `IDE` 在保存文件的时候根据 `tsconfig.json` 重新生成编译后的文件。

#### 4. extends

字符串类型，该值是一个路径，指定另一个配置文件用于继承 `tsconfig.json` 中的配置。在原文件里的配置最先被加载，原文件里的配置被继承文件里的同名配置所重写。 如果发现循环引用，则会报错。

#### 5. typeAcquisition

对象类型，设置自动引入库类型定义文件。`acquisition` 翻译过来是 “获得物、获得” 的意思。在整个项目中，如果存在用`JavaScript`写的库，`ts` 会自动去 `compilerOptions.typeRoots` 指定的目录中寻找对应的类型声明文件。这个行为被称为 `typeAcquisition` (类型获得)。这个行为可以通过`enable`来开启或关闭，且以库级别来指定应用的范围。但我在实践中，通过指定 `enable` 的值去控制这个行为并未有明显的感官，即使使用 `vscode` 修改配置后重启也并未生效。

当我使用 `jquery` 做测试的时候，将 `enable` 设为 `false` 且下载了 `@types/jquery` 的时候，`vscode` 并未提示无法找到该声明，也无任何报错。但当我将其设为 `true`，且删除 `@types/jquery`时，`vscode` 仍未提示无法找到该声明，鼠标悬浮引入的 `jquery` 提示在全局的 `typescript/3.8/node_modules/@types/` 目录下找到了该声明。

这个配置项在平时的开发中并不常用，大家也不必深究。

#### 6. watchOptions

对象类型，`typescript3.8` 以上新增加的配置，用来配置使用哪种监听策略来跟踪文件和目录。由于 `tsc` 的监听文件机制依赖于 `node` 的 `fs.watch/fs.watchFile`。这两种方法的实现并不相同，前者是采用文件系统的事件做到通知，而后者使用轮询的机制。更多可以查阅 `node` 官方文档。

1. watchFile

   字符串类型，配置单个文件的监听策略，必须为一下几个值：

   - useFsEvents(默认)：采用系统的文件系统的原生事件机制监听文件更改
   - useFsEventsOnParentDirectory：采用系统的文件系统的原生事件机制监听修改文件所在的目录，这样修改一个文件实际上监听的是此文件所在的目录都被监听了，如此整个项目的文件监听器将显著减少，但可能导致监听并不准确。
   - dynamicPriorityPolling：创建一个动态队列去监听文件，修改频率较低的文件将被减少轮询监听的频率。
   - fixedPollingInterval：固定间隔的检查每个文件是否发生变化。
   - priorityPollingInterval：固定间隔的检查每个文件是否发生变化，但使用启发式监听的文件的检查频率要低于非启发式监听的文件。

2. watchDirectory

   字符串类型，配置监听目录的策略，必须为以下几个值：

   - useFsEvents(默认)
   - dynamicPriorityPolling
   - fixedPollingInterval

   以上三个和 `watchFile` 中相差不多

3. fallbackPolling

   当采用系统的文件系统中原生事件机制监听文件时，此选项指定本机的文件监听器被耗尽或者不支持本机文件监听器是编译器采用的轮询策略，可以设置为以下几个值：

   - fixedPollingInterval
   - dynamicPriorityPolling
   - priorityPollingInterval
   - synchronousWatchDirectory：禁用对目录的延迟监听。如果有大量的文件更改，比如在 `npm install` 时 `node_modules` 目录发生的变化，延迟监听是非常有用的。但总有些不常见的场景需要禁用延迟监听。

4. synchronousWatchDirectory

   布尔类型，是否对目录延迟监听。如果配置为 `true` ，当文件发生修改时同步的调用回调并更新目录监听器。

5. excludeFiles

   字符串数组，用于指定不需要被监听变化的文件

6. excludeDirectories

   字符串数组，用于指定不需要被监听变化的目录

#### 7. reference

> 项目引用是 `TypeScript` 3.0的新特性，它支持将 `TypeScript` 程序的结构分割成更小的组成部分。

这是 `typescript` 官网中的描述，那怎么理解这句话呢。我们通过一个场景认识新出这种的 `reference` 特性。

假设我们要开发一个类似于 `lodash` 的工具库，并在项目中使用，而且后期很有可能还要在业界推广。为了保证这个工具的顺利开发及推广，我们必须要做相应的单元测试。那这个工具库可以看做一个项目，对其中的每个功能的测试也可作为一个独立的项目。但整个过程中，工具库的开发和测试应该是属于同一个项目下 “分项目” 的。那这种情况下 `reference` 就很棒了。首先我们搭一个目录出来：

```jboss-cli
|---- src/
    |---- index.ts    // 整个工具库的入口
    |---- copyDeep.ts // 其中定义了copyDeep方法
|---- test/
    |---- copyDeep.test.ts // copyDeep的单元测试
|---- package.json
|---- tsconfig.json
```

在 `copyDeep.test.ts` 中肯定要引用 `src/copyDeep`，也就是说 `test` 的项目是依赖于 `src` 的。如果 `src` 中的代码发生了变化，整个工具库项目应该重新编译，而 `test` 项目不应该再被编译，这本来就是合理的。如果 `test` 项目中的代码发生了变化，那 `test` 项目应该被重新编译，而 `src` 项目不应该再被编译。如何在一个项目中配置而做到分别编译相应的子项目呢？首先最先想到的应该是在 `tsconfig.json` 文件中引入 `include` 字段配置，我们先尝试一下下面的配置：

```json
{
    "files": [
        "./src/index.ts"
    ],
    "include": [
        "./test/**/*.test.ts"
    ],
    "compilerOptions": {
        "outDir": "./dist/"
    }
}
```

我们来分析这样配置的会有哪些问题：

1. 首先，从整个项目层面，确实做到了修改任意文件重新编译的功能。但注意，编译的是全量的 `ts` 文件。
2. 随着日后项目的增大，在 `*.test.ts` 文件中引入也将逐渐变大。
3. 修改了 `src//**/*.ts` 的内容，`test/**/*.ts` 也将作为输出，这是我们不希望看到的。

此时，`reference` 将解决上述的每一个问题，我们修改项目结构如下：

```jboss-cli
|---- src/
    |---- index.ts        // 整个工具库的入口
    |---- copyDeep.ts     // 其中定义了copyDeep方法
    |---- tsconfig.json // 工具库的编译配置文件
|---- test/
    |---- copyDeep.test.ts     // copyDeep的单元测试
    |---- tsconfig.json     // 测试的编译配置文件
|---- package.json
|---- tsconfig.json
```

并修改为以下配置：

```json
// 根目录下的 /tsconfig.json
{
      "compilerOptions": {
        "declaration": true, // 为子项目生成.d.ts声明文件
        "outDir": "./dist",
      }
}

// src目录下的 /src/tsconfig.json
{
    "extends": "../tsconfig",
    "compilerOptions": {
        "composite": true // 必须设置为true，表明该文件夹为一个子项目
    }
}

// test目录下的 /src/tsconfig.json
{
    "extends": "../tsconfig",
    "references": [
        { "path": "../src" } // 表示引用了工具库项目
    ]
}
```

这样配置后，如果 `src` 项目已经编译完成并且输出了编译后的文件， 那在 `test` 项目中，实际加载的是 `src` 项目声明的 `.d.ts` 文件，而且这个声明文件是对 `test` 项目可见的。另外，如果开启了 `watch` 模式，修改了内容只会编译相应的项目而不会全量编译。这会显著的加速类型检查和编译，减少编辑器的内存占用。而且在代码结构层命有了一个很清晰的规划。

总结来讲，`refrence` 的作用是将两个项目关联起来作为一个项目开发，当某个项目代码修改后还能单独编译相应的项目而不是整个项目。再说的简单点，就是实现了关联项目间的懒编译。

#### 总结

本篇文章先到这里，总结一下：`tsconfig.json` 这个文件是用来界定 `ts` 项目的根目录，也用来配置 `tsc` 在编译 `ts` 文件时的一些选项。`files、exclude、include` 用来配置需要编译哪些文件；`compilerOnSave` 是指定 `IDE` 保存后是否重新编译的；`extends` 用来扩展当前的配置；扩展配置文件中的字段会覆盖当前文件的相同字段；`typeAcquisition` 用来指定某些库的类型声明文件，如：

```json
"typeAcquisition": {
  "jquery": "@/types/jquery"
}
```

`watchOptions` 用来配置 `tsc` 的监听策略；`reference` 指定关联项目，从而提高编译速度。





### **1、与文件相关的选项**

如果 tsconfig.json 中没有任何配置，编译器就会按照默认的配置编译当前目录下的所有 ts 文件，包括三种类型 ts, d.ts, tsx

```json
// tsconfig.json

{
  "files": [ // 数组，表示编译器需要编译的单个文件的列表
    "src/a.ts"  // 运行 tsc 命令时，只有 a.ts 被编译了
  ],
  "include": [ // 数组，表示编译器需要编译的文件或目录
    "src", // 会编译 src 目录下所有的 ts 文件
    "src/*", // 只会编译 src 一级目录下的 ts 文件
    "src/*/*", // 只会编译 src 二级目录下的 ts 文件
  ],
  "exclude": [ // 数组，表示编译器需要排除的文件或目录，默认会排除 node_modules 下的所有文件和所有的声明文件
    "src/lib", // 表示不会编译src下的lib目录
  ]
}
```

配置文件之间是可以继承的，可以把一些基础的配置抽离出来方便复用，然后通过 extends 选项来导入基础配置

```json
// tsconfig.base.json

{
  "files": [ // 数组，表示编译器需要编译的单个文件的列表
    "src/a.ts"  // 运行 tsc 命令时，只有 a.ts 被编译了
  ],
  "include": [ // 数组，表示编译器需要编译的文件或目录
    "src", // 会编译 src 目录下所有的 ts 文件
    "src/*", // 只会编译 src 一级目录下的 ts 文件
    "src/*/*", // 只会编译 src 二级目录下的 ts 文件
  ],
  "exclude": [ // 数组，表示编译器需要排除的文件或目录，默认会排除 node_modules 下的所有文件和所有的声明文件
    "src/lib", // 表示不会编译src下的lib目录
  ]
}
```

```json
// tsconfig.json

{
  "extends": "./tsconfig.base.json",
  // 还可以覆盖 tsconfig.base.json 中的配置
  "exclude": [], // 指定不排除任何目录
  "compileOnSave": true, // 保存文件时让编译器自动编译，vscode暂不支持
}
```



### **2、与编译相关的选项**

```json
// tsconfig.json

{
  "compilerOptions": {
    "incremental": true, // 增量编译，ts 编译器可以在第一次编译后生成一个可以存储编译信息的文件，
    // 在二次编译时会根据这个文件做增量编译，这样就可以提高编译的速度
    "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
    "diagnostics": false, // 打印诊断信息

    "target": "es5", // 目标语言的版本
    "module": "commonjs", // 生成代码的模块标准
    "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在 AMD 模块中
    // 指定 moudle 为 amd ，编译时会将多个 ts 文件合并打包成一个 js 文件

    "lib": [], // ts 需要引用的库，即声明文件。就算没有引用任何类库，当目标语言的版本是 es5 时
    // 也会默认引用 "dom", "es5", "scripthost"
    
    "allowJs": true, // 允许编译 JS 文件（js、jsx）
    "checkJs": true, // 允许指出在 JS 文件中的报错信息，通常与 allowJs 一起使用
    "outDir": "./out", // 指定输出目录（所有编译后的文件会存放于此目录中）
    "rootDir": "./", // 用来控制输出的目录结构（指定输入文件目录）

    "declaration": true, // 用于生成声明文件，如 index.ts -> index.d.ts
    "declarationDir": "./d", // 声明文件的路径
    "emitDeclarationOnly": true, // 只生成声明文件（不会生成 js 文件）
    "sourceMap": true, // 生成目标文件的 sourceMap，如 index.ts -> index.js.map
    "inlineSourceMap": true, // 生成目标文件的 inline sourceMap（包含在生成的 js 文件之中）
    "declarationMap": true, // 生成声明文件的 sourceMap，如 index.ts -> index.d.ts 和 index.d.ts.map
    "typeRoots": [], // 声明文件目录，默认 node_modules/@types
    "types": [], // 指定需要加载的声明文件的包，如果指定了某一个包，就会只加载这个包的声明文件

    "removeComments": true, // 删除注释

    "noEmit": true, // 不输出任何文件
    "noEmitOnError": true, // 发生错误时，不输出文件

    "noEmitHelpers": true, // 不生成 helper 函数，需额外安装 ts-helpers
    "importHelpers": true, // 通过 tslib 引入 helper 函数，文件必须是模块

    "downlevelIteration": true, // 降级遍历器的实现（es3/es5）

    "strict": true, // 开启所有严格的类型检查，为 true 时，下面类型检查相关的取值也都为 true
    "alwaysStrict": true, // 在代码中注入 "use strict"
    "noImplicitAny": true, // 不允许隐式的 any 类型
    "strictNullChecks": true, // 不允许把 null、undefined 赋值给其它类型变量
    "strictFunctionTypes": true, // 不允许函数参数双向协变
    "strictPropertyInitialization": true, // 类的实例属性必须初始化
    "strictBindCallApply": true, // 严格的 bind、call、apply 检查
    "noImplicitThis": true, // 不允许 this 有隐式的 any 类型

    "noUnusedLocals": true, // 检查只声明，未使用的局部变量
    "noUnusedParameters": true, // 检查未使用的函数参数
    "noFallthroughCasesInSwitch": true, // 防止 switch 语句贯穿（如果某一个分支没有 break，下面的分支将会依次执行）
    "noImplicitReturns": true, // 每个分支都要有返回值，如 if else 中都要有返回值

    "esModuleInterop": true, // 如果一个模块用 export = 导出， 既可以用 import from 导入，也可以用 import = 导入
    "allowUmdGlobalAccess": true, // 允许在模块中以全局变量的方式访问 UMD模块 
    "moduleResolution": "node", // 模块解析策略，默认 node，还可以用 classic
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { // 路径映射，相对于 baseUrl
      "jquery": ["node_modules/jquery/dist/jquery.slim.min.js"]
    },
    "rootDirs": ["src", "out"], // 将多个目录放在一个虚拟目录下，用于运行时

    "listEmittedFiles": true, // 打印输出的文件
    "listFiles": true, // 打印编译的文件（包括引用的声明文件）
  }
}
```

### classic 模块策略：



### node 模块策略：







### 配置文件

#### 常用配置

```json
tsconfig.json常用配置，tsconfig.json最全配置

// 常用配置

{

  /*

      tsconfig.json是ts编译器的配置文件，ts可以根据它的信息来对待吗进行编译 可以再tsconfig中写注释

      include : 用来指定哪些文件需要被编译

      exclude : 用来指定哪些文件不需要被编译 ：默认node_module

      extends : 用来指定继承的配置文件

      files   : 用来指定被编译的文件列表，只有编译少量文件才使用

      compilerOptions : 编译器的选项是配置文件中非常重要也是非常复杂的配置选项

  */

  "include":[

    // ** : 任意目录 ， * : 任意文件

    "./src/**/*"

  ],

  "exclude": [

    "./src/hello/**/*"

  ],

  // "extends": "./configs/base",

  "files": [

    "1.ts",

    // "2.ts"

  ],

  "compilerOptions": {

    // 用来指定 ES 版本 ESNext : 最新版。 'ES3', 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ESNext'

    "target": "ES2020",

    // 指定要使用模块化的规范 : 'None', 'CommonJS', 'AMD', 'System', 'UMD', 'ES6'/'ES2015', 'ES2020' or 'ESNext'

    "module": "ESNext",

    // 用来指定项目中要使用的库 'ES5', 'ES6', 'ES2015', 'ES7', 'ES2016', 'ES2017', 'ES2018', 'ESNext', 'DOM', 'DOM.Iterable',

    //                          'WebWorker', 'ScriptHost', 'ES2015.Core', 'ES2015.Collection', 'ES2015.Generator', 'ES2015.Iterable', 

    //                          'ES2015.Promise', 'ES2015.Proxy', 'ES2015.Reflect', 'ES2015.Symbol', 'ES2015.Symbol.WellKnown', 

    //                          'ES2016.Array.Include', 'ES2017.object', 'ES2017.Intl', 'ES2017.SharedMemory', 'ES2017.String', 

    //                          'ES2017.TypedArrays', 'ES2018.Intl', 'ES2018.Promise', 'ES2018.RegExp', 'ESNext.AsyncIterable', 

    //                          'ESNext.Array', 'ESNext.Intl', 'ESNext.Symbol'

    // 运行在浏览器中不用设置，运行在node或其他中才需要设置

    // "lib":[]，

    // 用来指定编译后文件的存放位置

    "outDir":"./dist",

    // 将代码合并为一个文件,设置之后所有的全局作用域中的代码会合并到同一个文件中 但是只能在  'amd' and 'system' 中才能使用

    // "outFile": "./dist/app.js",

    // 是否对js文件进行编译，默认false

    "allowJs": false,

    // 是否检查js代码是否符合语法规范，默认false

    "checkJs": false,

    // 是否移除注释，默认false

    "removeComments":false,

    // 是否不生成编译后文件，默认false

    "noEmit": false,

    // 当有错误时是否生成文件，默认false

    "noEmitOnError": false,

    // 是否生成sourceMap，默认false  这个文件里保存的，是转换后代码的位置，和对应的转换前的位置。有了它，出错的时候，通过断点工具可以直接显示原始代码，而不是转换后的代码。

    "sourceMap":false,

    // 所有的严格检查的总开关，默认false

    "strict": false,

    // 编译后的文件是否开启严格模式，默认false

    "alwaysStrict": false,

    // 不允许隐式的any，默认false(允许)

    "noImplicitAny": false,

    // 不允许隐式的this，默认false(允许)

    "noImplicitThis": false,

    // 是否严格的检查空值，默认false 检查有可能为null的地方

    "strictNullChecks": true,

    // 是否严格检查bind、call和apply的参数列表，默认false  检查是否有多余参数

    "strictBindCallApply":false,

    // 是否严格检查函数的类型，

    "strictFunctionTypes":false,

    // 是否严格检查属性是否初始化，默认false

    "strictPropertyInitialization":false,

    // 是否检查switch语句包含正确的break，默认false

    "noFallthroughCasesInSwitch":false,

    // 检查函数没有隐式的返回值，默认false

    "noImplicitReturns":false,

    // 是否检查检查未使用的局部变量，默认false

    "noUnusedLocals":false,

    // 是否检查未使用的参数，默认false

    "noUnusedParameters":false,

    // 是否检查不可达代码报错，默认false   true，忽略不可达代码 false，不可达代码将引起错误

    "allowUnreachableCode":false

  }
}

```

#### 最全配置

https://www.tslang.cn/docs/handbook/compiler-options.html



### 参考资料

https://www.cnblogs.com/crack4/p/15189254.html

