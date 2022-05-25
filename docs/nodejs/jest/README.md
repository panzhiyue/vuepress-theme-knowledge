[TOC]

# Jest 写前端单元测试入门

转自:https://developer.51cto.com/article/685432.html

写测试能减少 bug，提高代码质量。同时，重构测试覆盖率高的代码，不担心改坏以前的功能。前端的测试可以分为 3 类：单元测试，集成测试 和 UI 测试。

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202204291145180.jpeg)](https://s3.51cto.com/oss/202110/12/17d0c615dfee2d8dd029b2d11a81d6ec.jpg)

本文转载自微信公众号「前端GoGoGo」，作者Joel 。转载本文请联系前端GoGoGo公众号。

写测试能减少 bug，提高代码质量。同时，重构测试覆盖率高的代码，不担心改坏以前的功能。

前端的测试可以分为 3 类：单元测试，集成测试 和 UI 测试。

- 单元测试是对软件的最小单元进行测试。比如：一个函数，一个组件。
- 集成测试，也叫组装测试或联合测试。在单元测试的基础上，将所有模块按照设计要求组装成为子系统或系统，进行测试。
- UI 测试是对 UI 的呈现效果和交互进行测试。

本文主要介绍用 Jest[1] 来写单元测试。Jest 是一款优雅、简洁的 JavaScript 测试框架。下面的是用 Jest 写的单元测试：

复制

```
import sum from './sum'; 
 
test('sum', () => { 
  expect(sum(1, 2)).toBe(3); 
  expect(sum(-1, -2)).toBe(-3); 
}); 
1.2.3.4.5.6.
```

sum 是要测试的函数。test(...) 是包裹了要测试的一个特性。expect(...) 是断言：期望 sum(1, 2) 的值是 3，如果 sum(1, 2) 的值不是 3，则该测试会失败。

Jest 主要包含 3 块内容：

- 安装。
- 运行。
- Jest API。

## 1 安装

Jest 是依赖 Node.js[2] 的。安装好 Node 后，初始化 node 项目:

复制

```
npm init -y 
1.
```

### **安装 Jest**

复制

```
npm install --save-dev jest 
1.
```

### 支持 Babel

需要支持 ES6, ES7 等语法，则安装 Babel 相关依赖:

复制

```
yarn add --dev babel-jest @babel/core @babel/preset-env 
1.
```

在项目根目录下创建 Babel 配置文件：babel.config.js 来配置与当前 Node 版本兼容的 Babel：

复制

```
module.exports = { 
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]], 
}; 
1.2.3.
```

**支持 TypeScript**

复制

```
yarn add --dev @babel/preset-typescript 
1.
```

在项目根目录下创建 TypeScript 配置文件：tsconfig.json 。内容类似：

复制

```
{ 
  "compilerOptions": { 
      "module": "commonjs", 
      "noImplicitAny": true, 
      "removeComments": true, 
      "preserveConstEnums": true, 
      "sourceMap": true, 
      "esModuleInterop": true 
  }, 
  "include": [ 
    "src/**/*" 
  ], 
  "exclude": [ 
    "node_modules" 
  ] 
} 
1.2.3.4.5.6.7.8.9.10.11.12.13.14.15.16.
```

## 2 运行

运行项目里的所有测试用例

需要在 package.json 中加如下内容：

复制

```
{ 
  "scripts": { 
    "test": "jest" 
  } 
} 
1.2.3.4.5.
```

测试用例要写在单独的文件，而不是放在要测试的文件里。测试用例的文件名需要带 .spec.[js|ts] 或 .test.[js|ts]。比如，一个文件叫 sum.js，对其进行测试，一般在该文件的相同目录下，创建个测试用例文件 sum.spec.js。

执行 npm run test 即可运行项目中，就会运行所有的测试用例。

**运行特定的一个测试用例文件**

在项目根目录行执行 yarn jest 测试用例文件路径 或 npm run test 测试用例文件路径。

**运行特定的一个测试用例**

只需将要运行用例的 test(...) 改成 test.only(...)，然后再运行该测试用例文件。类似的，运行一组用例，把 describe(...) 改成 describe.only(...)。

**获取测试覆盖率**

测试覆盖率(test coverage) 衡量的是功能代码被测试用例覆盖的比率。对代码质量要求高的项目，会要求测试覆盖率在 90% 以上。

获取测试覆盖率的命令:

复制

```
jest --coverage 
1.
```

## 3 Jest API

**断言 API**

编写测试时，我们总是会做出一些假设，断言就是用于在代码中捕捉这些假设。比如：

复制

```
expect(2 + 2).toBe(4) 
1.
```

Jest 支持主要断言API如下：

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202204291145125.jpeg)](https://s4.51cto.com/oss/202110/12/3c9d9a9fcff0f3724b1379ccfb6a874c.jpg)

所有的断言API见：这里[3]。

**Jest 场景**

**测试异步代码**

处理异步一般有 3 种方式：回调， Promise 和 Async/Await。

**回调**

业务代码:

复制

```
function fetchNameCallback(cb: (name: string) => void) { 
    setTimeout(() => { 
      cb('Joel'); 
    }, 1000) 
} 
1.2.3.4.5.
```

用例代码如下：

复制

```
test('async: callback', done => { 
  fetchNameCallback(name => { 
    expect(name).toBe('Joel'); 
    done(); // 通知 Jest，回调结束了 
  }); 
}); 
1.2.3.4.5.6.
```

注意：异步回调结束后，需要调用参数 done。以此来通知 Jest，回调结束了。

**Promise**

业务代码:

复制

```
function fetchName(throwError?: boolean) { 
  return new Promise((resolve, reject) => { 
    setTimeout(() => { 
      if(!throwError) { 
        resolve('Joel') 
      } else { 
        reject('error happened') 
      } 
    }, 1000) 
  }); 
} 
1.2.3.4.5.6.7.8.9.10.11.
```

用例代码如下：

复制

```
test('async: Promise', () => { 
  fetchName().then(name => { 
    expect(name).toBe('Joel'); 
  }); 
  //  异常处理 
  fetchName(true).catch(e => { 
    expect(e).toMatch('error'); 
  }); 
}); 
1.2.3.4.5.6.7.8.9.
```

**Async/Await**

业务代码和上面的 Promise 的相同。

用例代码如下：

复制

```
test.only('Async/Await', async () => { 
  const name = await fetchName(); 
  expect(name).toBe('Joel'); 
  // 异常处理 
  try { 
    fetchName(true); 
  } catch(e) { 
    expect(e).toMatch('error'); 
  } 
}); 
1.2.3.4.5.6.7.8.9.10.
```

**测试前的准备操作和测试后的整理操作**

写测试的时候可能需要在测试前做一些准备工作。运行测试后，需要做进行一些整理工作。用 Jest 这么写：

**每次用例的前后都执行**

复制

```
// 前 
beforeEach(() => { 
}); 
 
// 后 
afterEach(() => { 
}); 
1.2.3.4.5.6.7.
```

**所有用例的前后执行**

复制

```
beforeAll(() => { 
}); 
 
afterAll(() => { 
}); 
1.2.3.4.5.
```

只会被执行一次。

**Mock 外部依赖**

我们在测试模块功能时，如果模块对外部的依赖的是有问题的，也会导致测试的不通过。为规避这种问题，会 Mock外部依赖：用一个不出错的实现来代替外部依赖。

**Mock 第三方包的部分 api**

这边以 Mock axios[4] 为例,业务代码:

复制

```
axiosFetchUser = () => { 
  return axios.get('/user'); 
} 
1.2.3.
```

测试代码:

复制

```
test('fetch user', () => { 
  axios.get.mockImplementation(url => { 
    if(/^\/user$/.test(url)) { 
      return Promise.resolve({name: 'Joel'}) 
    } 
    return Promise.resolve('other') 
  }) 
 
  axiosFetchUser().then(({ name }) => { 
    expect(name).toBe('Joel'); 
  }) 
}); 
1.2.3.4.5.6.7.8.9.10.11.12.
```

其中 axios.get.mockImplementation(...) Mock了 axios.get 的实现。

**Mock 某个文件的部分内容**

我们有个工具函数文件 utils.ts，内容如下:

复制

```
const guid = () => ...; 
export default guid; 
 
export const getYear = () => ...; 
export const getMonth = () => ...; 
1.2.3.4.5.
```

我们只 Mock 上面文件中的 guid 和 getYear，其他部分保持原状。这么写：

复制

```
jest.mock('./util', () => { 
  const originalModule = jest.requireActual('./util'); 
  return { 
    __esModule: true, 
    ...originalModule, 
    default: () => 'abc', // mock guid 
    getYear: () => 2021, 
  }; 
}); 
1.2.3.4.5.6.7.8.9.
```

### Mock 完整的第三方包和文件

Mock 完整的第三方包和文件只需做 2 步。

在 __mocks__/ 下建 Mock 的文件。

通知 Jest 用 Mock 的实现：jest.mock('./moduleName') 或 jest.mock('module_name')。

详细介绍见: 这里[5]。

## 最后

行动起来，开始练习写单元测试吧~

参考资料

[1]Jest: https://jestjs.io/

[2]Node.js: https://nodejs.org/en/

[3]这里: https://jestjs.io/zh-Hans/docs/expect

[4]axios: https://axios-http.com/

[5]这里: https://jestjs.io/zh-Hans/docs/manual-mocks