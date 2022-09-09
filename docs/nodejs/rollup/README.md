

| 名称               | 描述          |      |
| ------------------ | ------------- | ---- |
| rollup-plugin-less | 打包.less文件 |      |
| rollup-plugin-copy | 拷贝文件      |      |
|                    |               |      |



```javascript
import nodeResolve from "rollup-plugin-node-resolve";
import vue from "rollup-plugin-vue";
import pkg from "./package.json";
import less from "rollup-plugin-less";
import externals from "rollup-plugin-node-externals";
// 入口
const input = "src/index.js";
// 插件
const plugins = [
  // 顺序无严格要求，目前观察buble需要放在vue下面
  externals({
    deps: true,
  }),
  nodeResolve(),
  vue(),
  less({
    output: "dist/styles/index.css",
  }),
];

// 外链 - 外部依赖的名称，放在该处的npm包不会参与打包
const external = Object.keys(pkg.dependencies || {});

export default [
  {
    input,
    // 出口
    output: [
      {
        file: "dist/index.js",
        format: "umd",
        name: "myui", // 此处修改为希望包挂在window上的名称
        exports: "auto",
      },
      {
        file: "dist/index.mjs",
        format: "es",
        name: "myui", // 此处修改为希望包挂在window上的名称
        exports: "auto",
      },
    ],
    plugins,
    external,
  },
];

```

