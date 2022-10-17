

# NodeJS

## 学习资料

英文网：https://nodejs.org/en/download/ 

中文网：http://nodejs.cn/download/

## 命令

| 名称    | 描述             |      |
| ------- | ---------------- | ---- |
| node -v | 查看nodejs版本号 |      |
|         |                  |      |
|         |                  |      |



## 全局模块

定义:何时何地都能访问,不需要引用

| 名称           | 描述                                                         | 示例 |
| -------------- | ------------------------------------------------------------ | ---- |
| **__dirname**  | 表示当前执行脚本所在的目录。                                 |      |
| **__filename** | 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。 |      |
| process        | 是一个全局变量，即 global 对象的属性。提供了一个与操作系统的简单接口 |      |

### process

process 是一个全局变量，即 global 对象的属性。

它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要 和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。

| 序号 | 事件 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **exit** 当进程准备退出时触发。                              |
| 2    | **beforeExit** 当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行。 |
| 3    | **uncaughtException** 当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生。 |
| 4    | **Signal 事件** 当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等。 |

#### 实例

创建文件 main.js ，代码如下所示：

```
process.on('exit', function(code) {

  // 以下代码永远不会执行
  setTimeout(function() {
    console.log("该代码不会执行");
  }, 0);
  
  console.log('退出码为:', code);
});
console.log("程序执行结束");
```

执行 main.js 文件，代码如下所示:

```
$ node main.js
程序执行结束
退出码为: 0
```

#### 退出状态码

退出状态码如下所示：

| 状态码 | 名称 & 描述                                                  |
| :----- | :----------------------------------------------------------- |
| 1      | **Uncaught Fatal Exception** 有未捕获异常，并且没有被域或 uncaughtException 处理函数处理。 |
| 2      | **Unused** 保留                                              |
| 3      | **Internal JavaScript Parse Error** JavaScript的源码启动 Node 进程时引起解析错误。非常罕见，仅会在开发 Node 时才会有。 |
| 4      | **Internal JavaScript Evaluation Failure** JavaScript 的源码启动 Node 进程，评估时返回函数失败。非常罕见，仅会在开发 Node 时才会有。 |
| 5      | **Fatal Error** V8 里致命的不可恢复的错误。通常会打印到 stderr ，内容为： FATAL ERROR |
| 6      | **Non-function Internal Exception Handler** 未捕获异常，内部异常处理函数不知为何设置为on-function，并且不能被调用。 |
| 7      | **Internal Exception Handler Run-Time Failure** 未捕获的异常， 并且异常处理函数处理时自己抛出了异常。例如，如果 process.on('uncaughtException') 或 domain.on('error') 抛出了异常。 |
| 8      | **Unused** 保留                                              |
| 9      | **Invalid Argument** 可能是给了未知的参数，或者给的参数没有值。 |
| 10     | **Internal JavaScript Run-Time Failure** JavaScript的源码启动 Node 进程时抛出错误，非常罕见，仅会在开发 Node 时才会有。 |
| 12     | **Invalid Debug Argument** 设置了参数--debug 和/或 --debug-brk，但是选择了错误端口。 |
| 128    | **Signal Exits** 如果 Node 接收到致命信号，比如SIGKILL 或 SIGHUP，那么退出代码就是128 加信号代码。这是标准的 Unix 做法，退出信号代码放在高位。 |

#### Process 属性

Process 提供了很多有用的属性，便于我们更好的控制系统的交互：

| 序号. | 属性 & 描述                                                  |
| :---- | :----------------------------------------------------------- |
| 1     | **stdout** 标准输出流。                                      |
| 2     | **stderr** 标准错误流。                                      |
| 3     | **stdin** 标准输入流。                                       |
| 4     | **argv** argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。 |
| 5     | **execPath** 返回执行当前脚本的 Node 二进制文件的绝对路径。  |
| 6     | **execArgv** 返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数。 |
| 7     | **env** 返回一个对象，成员为当前 shell 的环境变量            |
| 8     | **exitCode** 进程退出时的代码，如果进程优通过 process.exit() 退出，不需要指定退出码。 |
| 9     | **version** Node 的版本，比如v0.10.18。                      |
| 10    | **versions** 一个属性，包含了 node 的版本和依赖.             |
| 11    | **config** 一个包含用来编译当前 node 执行文件的 javascript 配置选项的对象。它与运行 ./configure 脚本生成的 "config.gypi" 文件相同。 |
| 12    | **pid** 当前进程的进程号。                                   |
| 13    | **title** 进程名，默认值为"node"，可以自定义该值。           |
| 14    | **arch** 当前 CPU 的架构：'arm'、'ia32' 或者 'x64'。         |
| 15    | **platform** 运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32' |
| 16    | **mainModule** require.main 的备选方法。不同点，如果主模块在运行时改变，require.main可能会继续返回老的模块。可以认为，这两者引用了同一个模块。 |

#### 实例

创建文件 main.js ，代码如下所示：

```
// 输出到终端
process.stdout.write("Hello World!" + "\n");

// 通过参数读取
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
});

// 获取执行路径
console.log(process.execPath);


// 平台信息
console.log(process.platform);
```

执行 main.js 文件，代码如下所示:

```
$ node main.js
Hello World!
0: node
1: /web/www/node/main.js
/usr/local/node/0.10.36/bin/node
darwin
```

#### 方法参考手册

Process 提供了很多有用的方法，便于我们更好的控制系统的交互：

| 序号 | 方法 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **abort()** 这将导致 node 触发 abort 事件。会让 node 退出并生成一个核心文件。 |
| 2    | **chdir(directory)** 改变当前工作进程的目录，如果操作失败抛出异常。 |
| 3    | **cwd()** 返回当前进程的工作目录                             |
| 4    | **exit([code])** 使用指定的 code 结束进程。如果忽略，将会使用 code 0。 |
| 5    | **getgid()** 获取进程的群组标识（参见 getgid(2)）。获取到得时群组的数字 id，而不是名字。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 6    | **setgid(id)** 设置进程的群组标识（参见 setgid(2)）。可以接收数字 ID 或者群组名。如果指定了群组名，会阻塞等待解析为数字 ID 。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 7    | **getuid()** 获取进程的用户标识(参见 getuid(2))。这是数字的用户 id，不是用户名。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 8    | **setuid(id)** 设置进程的用户标识（参见setuid(2)）。接收数字 ID或字符串名字。果指定了群组名，会阻塞等待解析为数字 ID 。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 9    | **getgroups()** 返回进程的群组 iD 数组。POSIX 系统没有保证一定有，但是 node.js 保证有。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 10   | **setgroups(groups)** 设置进程的群组 ID。这是授权操作，所以你需要有 root 权限，或者有 CAP_SETGID 能力。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 11   | **initgroups(user, extra_group)** 读取 /etc/group ，并初始化群组访问列表，使用成员所在的所有群组。这是授权操作，所以你需要有 root 权限，或者有 CAP_SETGID 能力。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 12   | **kill(pid[, signal])** 发送信号给进程. pid 是进程id，并且 signal 是发送的信号的字符串描述。信号名是字符串，比如 'SIGINT' 或 'SIGHUP'。如果忽略，信号会是 'SIGTERM'。 |
| 13   | **memoryUsage()** 返回一个对象，描述了 Node 进程所用的内存状况，单位为字节。 |
| 14   | **nextTick(callback)** 一旦当前事件循环结束，调用回调函数。  |
| 15   | **umask([mask])** 设置或读取进程文件的掩码。子进程从父进程继承掩码。如果mask 参数有效，返回旧的掩码。否则，返回当前掩码。 |
| 16   | **uptime()** 返回 Node 已经运行的秒数。                      |
| 17   | **hrtime()** 返回当前进程的高分辨时间，形式为 [seconds, nanoseconds]数组。它是相对于过去的任意事件。该值与日期无关，因此不受时钟漂移的影响。主要用途是可以通过精确的时间间隔，来衡量程序的性能。 你可以将之前的结果传递给当前的 process.hrtime() ，会返回两者间的时间差，用来基准和测量时间间隔。 |

#### 实例

创建文件 main.js ，代码如下所示：

```
// 输出当前目录
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());
```

执行 main.js 文件，代码如下所示:

```
$ node main.js
当前目录: /web/com/runoob/nodejs
当前版本: v0.10.36
{ rss: 12541952, heapTotal: 4083456, heapUsed: 2157056 }
```

#### 输出实例

```json
process {
  version: 'v14.19.3',
  versions: {
    node: '14.19.3',
    v8: '8.4.371.23-node.87',
    uv: '1.42.0',
    zlib: '1.2.11',
    brotli: '1.0.9',
    ares: '1.18.1',
    modules: '83',
    nghttp2: '1.42.0',
    napi: '8',
    llhttp: '2.1.4',
    openssl: '1.1.1o',
    cldr: '40.0',
    icu: '70.1',
    tz: '2021a3',
    unicode: '14.0'
  },
  arch: 'x64',
  platform: 'linux',
  release: {
    name: 'node',
    lts: 'Fermium',
    sourceUrl: 'https://nodejs.org/download/release/v14.19.3/node-v14.19.3.tar.gz',
    headersUrl: 'https://nodejs.org/download/release/v14.19.3/node-v14.19.3-headers.tar.gz'
  },
  _rawDebug: [Function: _rawDebug],
  moduleLoadList: [
    'Internal Binding native_module',
    'Internal Binding errors',
    'NativeModule internal/errors',
    'Internal Binding config',
    'Internal Binding url',
    'Internal Binding constants',
    'Internal Binding util',
    'Internal Binding types',
    'NativeModule internal/util',
    'NativeModule internal/util/types',
    'NativeModule internal/assert',
    'Internal Binding icu',
    'NativeModule internal/util/inspect',
    'NativeModule internal/validators',
    'NativeModule events',
    'Internal Binding buffer',
    'Internal Binding string_decoder',
    'NativeModule internal/buffer',
    'NativeModule internal/encoding',
    'Internal Binding symbols',
    'Internal Binding messaging',
    'NativeModule internal/worker/js_transferable',
    'NativeModule internal/blob',
    'NativeModule buffer',
    'NativeModule internal/modules/esm/handle_process_exit',
    'NativeModule internal/process/per_thread',
    'Internal Binding process_methods',
    'Internal Binding credentials',
    'Internal Binding async_wrap',
    'Internal Binding task_queue',
    'NativeModule internal/async_hooks',
    'NativeModule internal/process/promises',
    'NativeModule internal/fixed_queue',
    'NativeModule async_hooks',
    'NativeModule internal/process/task_queues',
    'Internal Binding trace_events',
    'NativeModule internal/constants',
    'NativeModule internal/console/constructor',
    'NativeModule internal/console/global',
    'NativeModule internal/util/inspector',
    'Internal Binding inspector',
    'NativeModule internal/querystring',
    'NativeModule path',
    'NativeModule internal/url',
    'Internal Binding timers',
    'NativeModule internal/linkedlist',
    'NativeModule internal/priority_queue',
    'NativeModule internal/util/debuglog',
    'NativeModule internal/timers',
    'NativeModule timers',
    'NativeModule internal/process/execution',
    'NativeModule internal/process/warning',
    'NativeModule internal/process/signal',
    'Internal Binding options',
    'NativeModule internal/options',
    'NativeModule internal/bootstrap/pre_execution',
    'NativeModule internal/inspector_async_hook',
    'Internal Binding report',
    'NativeModule internal/process/report',
    'Internal Binding fs',
    'NativeModule internal/fs/utils',
    'Internal Binding fs_dir',
    'NativeModule internal/fs/dir',
    'NativeModule fs',
    'NativeModule internal/util/iterable_weak_map',
    'NativeModule internal/modules/cjs/helpers',
    'NativeModule internal/source_map/source_map_cache',
    'Internal Binding contextify',
    'NativeModule vm',
    'NativeModule internal/idna',
    'NativeModule url',
    'NativeModule internal/modules/package_json_reader',
    'Internal Binding module_wrap',
    'NativeModule internal/modules/esm/module_job',
    'NativeModule internal/modules/esm/module_map',
    'NativeModule internal/modules/esm/get_format',
    'NativeModule internal/modules/esm/resolve',
    'NativeModule internal/fs/rimraf',
    'Internal Binding fs_event_wrap',
    'Internal Binding uv',
    'NativeModule internal/fs/watchers',
    'NativeModule internal/streams/utils',
    'NativeModule internal/fs/promises',
    'NativeModule internal/modules/esm/get_source',
    'NativeModule internal/modules/esm/transform_source',
    'NativeModule internal/modules/esm/create_dynamic_module',
    'NativeModule internal/modules/esm/translators',
    'NativeModule internal/modules/esm/loader',
    'NativeModule internal/vm/module',
    'NativeModule internal/process/esm_loader',
    'NativeModule internal/modules/cjs/loader',
    'NativeModule internal/modules/run_main',
    'NativeModule internal/streams/destroy',
    'NativeModule internal/streams/pipeline',
    'NativeModule internal/streams/end-of-stream',
    'NativeModule internal/streams/legacy',
    'NativeModule internal/streams/buffer_list',
    'NativeModule internal/streams/state',
    'NativeModule internal/streams/readable',
    'NativeModule internal/streams/writable',
    ... 15 more items
  ],
  binding: [Function: binding],
  _linkedBinding: [Function: _linkedBinding],
  _events: [Object: null prototype] {
    newListener: [Function: startListeningIfSignal],
    removeListener: [Function: stopListeningIfSignal],
    warning: [Function: onWarning],
    SIGWINCH: [Function (anonymous)]
  },
  _eventsCount: 4,
  _maxListeners: undefined,
  domain: null,
  _exiting: false,
  config: {
    target_defaults: {
      cflags: [],
      default_configuration: 'Release',
      defines: [],
      include_dirs: [],
      libraries: []
    },
    variables: {
      asan: 0,
      build_v8_with_gn: false,
      coverage: false,
      dcheck_always_on: 0,
      debug_nghttp2: false,
      debug_node: false,
      enable_lto: false,
      enable_pgo_generate: false,
      enable_pgo_use: false,
      error_on_warn: false,
      force_dynamic_crt: 0,
      gas_version: '2.30',
      host_arch: 'x64',
      icu_data_in: '../../deps/icu-tmp/icudt70l.dat',
      icu_endianness: 'l',
      icu_gyp_path: 'tools/icu/icu-generic.gyp',
      icu_path: 'deps/icu-small',
      icu_small: false,
      icu_ver_major: '70',
      is_debug: 0,
      llvm_version: '0.0',
      napi_build_version: '8',
      node_byteorder: 'little',
      node_debug_lib: false,
      node_enable_d8: false,
      node_install_corepack: true,
      node_install_npm: true,
      node_library_files: [Array],
      node_module_version: 83,
      node_no_browser_globals: false,
      node_prefix: '/',
      node_release_urlbase: 'https://nodejs.org/download/release/',
      node_section_ordering_info: '',
      node_shared: false,
      node_shared_brotli: false,
      node_shared_cares: false,
      node_shared_http_parser: false,
      node_shared_libuv: false,
      node_shared_nghttp2: false,
      node_shared_openssl: false,
      node_shared_zlib: false,
      node_tag: '',
      node_target_type: 'executable',
      node_use_bundled_v8: true,
      node_use_dtrace: false,
      node_use_etw: false,
      node_use_node_code_cache: true,
      node_use_node_snapshot: true,
      node_use_openssl: true,
      node_use_v8_platform: true,
      node_with_ltcg: false,
      node_without_node_options: false,
      openssl_fips: '',
      openssl_is_fips: false,
      ossfuzz: false,
      shlib_suffix: 'so.83',
      target_arch: 'x64',
      v8_enable_31bit_smis_on_64bit_arch: 0,
      v8_enable_gdbjit: 0,
      v8_enable_i18n_support: 1,
      v8_enable_inspector: 1,
      v8_enable_lite_mode: 0,
      v8_enable_object_print: 1,
      v8_enable_pointer_compression: 0,
      v8_no_strict_aliasing: 1,
      v8_optimized_debug: 1,
      v8_promise_internal_field_count: 1,
      v8_random_seed: 0,
      v8_trace_maps: 0,
      v8_use_siphash: 1,
      want_separate_host_toolset: 0
    }
  },
  dlopen: [Function: dlopen],
  uptime: [Function: uptime],
  _getActiveRequests: [Function: _getActiveRequests],
  _getActiveHandles: [Function: _getActiveHandles],
  reallyExit: [Function: reallyExit],
  _kill: [Function: _kill],
  hrtime: [Function: hrtime] { bigint: [Function: hrtimeBigInt] },
  cpuUsage: [Function: cpuUsage],
  resourceUsage: [Function: resourceUsage],
  memoryUsage: [Function: memoryUsage] { rss: [Function: rss] },
  kill: [Function: kill],
  exit: [Function: exit],
  openStdin: [Function (anonymous)],
  getuid: [Function: getuid],
  geteuid: [Function: geteuid],
  getgid: [Function: getgid],
  getegid: [Function: getegid],
  getgroups: [Function: getgroups],
  allowedNodeEnvironmentFlags: [Getter/Setter],
  assert: [Function: deprecated],
  features: {
    inspector: true,
    debug: false,
    uv: true,
    ipv6: true,
    tls_alpn: true,
    tls_sni: true,
    tls_ocsp: true,
    tls: true,
    cached_builtins: true
  },
  _fatalException: [Function (anonymous)],
  setUncaughtExceptionCaptureCallback: [Function: setUncaughtExceptionCaptureCallback],
  hasUncaughtExceptionCaptureCallback: [Function: hasUncaughtExceptionCaptureCallback],
  emitWarning: [Function: emitWarning],
  nextTick: [Function: nextTick],
  _tickCallback: [Function: runNextTicks],
  _debugProcess: [Function: _debugProcess],
  _debugEnd: [Function: _debugEnd],
  _startProfilerIdleNotifier: [Function (anonymous)],
  _stopProfilerIdleNotifier: [Function (anonymous)],
  stdout: [Getter],
  stdin: [Getter],
  stderr: [Getter],
  abort: [Function: abort],
  umask: [Function: wrappedUmask],
  chdir: [Function: wrappedChdir],
  cwd: [Function: wrappedCwd],
  initgroups: [Function: initgroups],
  setgroups: [Function: setgroups],
  setegid: [Function (anonymous)],
  seteuid: [Function (anonymous)],
  setgid: [Function (anonymous)],
  setuid: [Function (anonymous)],
  env: {
    KUBERNETES_SERVICE_PORT_HTTPS: '443',
    KUBERNETES_SERVICE_PORT: '443',
    NVM_INC: '/home/sandbox/.nvm/versions/node/v14.19.3/include/node',
    NODE_14_VERSION: '14.19.3',
    HOSTNAME: 'sse-sandbox-u7ne3c',
    YARN_VERSION: '1.22.5',
    PWD: '/sandbox',
    SSE_MANAGER_SERVICE_PORT: '80',
    HOME: '/home/sandbox',
    KUBERNETES_PORT_443_TCP: 'tcp://10.96.0.1:443',
    LS_COLORS: 'rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:',
    SSE_MANAGER_SERVICE_HOST: '10.96.5.221',
    NODE_16_VERSION: '16.15.1',
    NODE_12_VERSION: '12.22.12',
    NVM_DIR: '/home/sandbox/.nvm',
    SSE_MANAGER_PORT_80_TCP: 'tcp://10.96.5.221:80',
    TERM: 'xterm',
    SSE_MANAGER_PORT_80_TCP_ADDR: '10.96.5.221',
    SHLVL: '1',
    NVM_CD_FLAGS: '',
    KUBERNETES_PORT_443_TCP_PROTO: 'tcp',
    SSE_MANAGER_PORT_80_TCP_PROTO: 'tcp',
    KUBERNETES_PORT_443_TCP_ADDR: '10.96.0.1',
    KUBERNETES_SERVICE_HOST: '10.96.0.1',
    KUBERNETES_PORT: 'tcp://10.96.0.1:443',
    KUBERNETES_PORT_443_TCP_PORT: '443',
    NODE_18_VERSION: '18.3.0',
    SSE_MANAGER_PORT: 'tcp://10.96.5.221:80',
    PATH: '/home/sandbox/.nvm/versions/node/v14.19.3/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games',
    NVM_BIN: '/home/sandbox/.nvm/versions/node/v14.19.3/bin',
    NODE_VERSION: '14',
    SSE_MANAGER_PORT_80_TCP_PORT: '80',
    _: '/home/sandbox/.nvm/versions/node/v14.19.3/bin/node'
  },
  title: 'node',
  argv: [
    '/home/sandbox/.nvm/versions/node/v14.19.3/bin/node',
    '/sandbox/src/global.js'
  ],
  execArgv: [],
  pid: 2318,
  ppid: 1526,
  execPath: '/home/sandbox/.nvm/versions/node/v14.19.3/bin/node',
  debugPort: 9229,
  argv0: 'node',
  _preload_modules: [],
  setSourceMapsEnabled: [Function: setSourceMapsEnabled],
  mainModule: Module {
    id: '.',
    path: '/sandbox/src',
    exports: {},
    parent: null,
    filename: '/sandbox/src/global.js',
    loaded: false,
    children: [],
    paths: [
      '/sandbox/src/node_modules',
      '/sandbox/node_modules',
      '/node_modules'
    ]
  },
  [Symbol(kCapture)]: false
}
```



## 系统模块

定义:需要requird(),但不需要单独下载

| 名称 | 描述                                 |
| ---- | ------------------------------------ |
| path | 用于处理文件路径和目录路径的实用工具 |
| fs   |                                      |
|      |                                      |

### http

```
let http=require('http')

http.createServer(()=>{
console.log('我来了');
}).listen(9090);
```

```
let http=require('http')

http.createServer((req,res)=>{
res.write('index');
res.end('结束了');
}).listen(9090);

```



```
let http=require('http')
let fs=require('fs');
http.createServer((req,res)=>{
fs.readFile(req.url,(err,data)=>{
if(err){
res.writeHead("404");
res.end("404 not found");
}else{
res.end(data);
}

});
}).listen(9090);
```



### querystring
api:http://nodejs.cn/api/querystring.html

`querystring` 模块提供用于解析和格式化 URL 查询字符串的实用工具。 可以使用以下方式访问它：

```js
const querystring = require('querystring');
```

| 方法                                     | 描述                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| `decode()`                               | `parse()` 的别名。                                           |
| `encode()`                               | `stringify()` 的别名。                                       |
| `escape(str)`                            | 方法以对 URL 查询字符串的特定要求进行了优化的方式对给定的 `str` 执行 URL 百分比编码。 |
| `parse(str[, sep[, eq[, options]]])`     | 将 URL 查询字符串 `str` 解析为键值对的集合。                 |
| `stringify(obj[, sep[, eq[, options]]])` | 通过遍历对象的自身属性从给定的 `obj` 生成 URL 查询字符串。   |
| `unescape(str)`                          | 方法在给定的 `str` 上执行 URL 百分比编码字符的解码。         |

#### decode()

新增于: v0.1.99

`querystring.decode()` 函数是 `querystring.parse()` 的别名。

#### encode()

新增于: v0.1.99

`querystring.encode()` 函数是 `querystring.stringify()` 的别名。

#### escape(str)

新增于: v0.1.25

- `str` 

`querystring.escape()` 方法以对 URL 查询字符串的特定要求进行了优化的方式对给定的 `str` 执行 URL 百分比编码。

`querystring.escape()` 方法由 `querystring.stringify()` 使用，通常不会被直接地使用。 它的导出主要是为了允许应用程序代码在需要时通过将 `querystring.escape` 赋值给替代函数来提供替换的百分比编码实现。

#### parse(str[, sep[, eq[, options]]])

版本历史

- `str`要解析的 URL 查询字符串。
- `sep` 用于在查询字符串中分隔键值对的子字符串。**默认值:** `'&'`。
- `eq` 用于在查询字符串中分隔键和值的子字符串。**默认值:** `'='`。
- options
  - `decodeURIComponent` 当解码查询字符串中的百分比编码字符时使用的函数。**默认值:** `querystring.unescape()`。
  - `maxKeys` 指定要解析的键的最大数量。指定 `0` 可移除键的计数限制。**默认值:** `1000`。

`querystring.parse()` 方法将 URL 查询字符串 `str` 解析为键值对的集合。

例如，查询字符串 `'foo=bar&abc=xyz&abc=123'` 会被解析为：

```js
{
  foo: 'bar',
  abc: ['xyz', '123']
}
```

`querystring.parse()` 方法返回的对象不是原型地继承自 JavaScript 的 `Object`。 这意味着典型的 `Object` 方法如 `obj.toString()`、 `obj.hasOwnProperty()` 等都没有被定义并且不起作用。

默认情况下，会假定查询字符串中的百分比编码字符使用 UTF-8 编码。 如果使用其他的字符编码，则需要指定其他的 `decodeURIComponent` 选项：

```js
// 假设 gbkDecodeURIComponent 函数已存在。

querystring.parse('w=%D6%D0%CE%C4&foo=bar', null, null,
                  { decodeURIComponent: gbkDecodeURIComponent });
```

#### stringify(obj[, sep[, eq[, options]]])

新增于: v0.1.25

- `obj`要序列化为 URL 查询字符串的对象。
- `sep` 用于在查询字符串中分隔键值对的子字符串。**默认值:** `'&'`。
- `eq`用于在查询字符串中分隔键和值的子字符串。**默认值:** `'='`。
- options
  - `encodeURIComponent`当将查询字符串中不安全的 URL 字符转换为百分比编码时使用的函数。**默认值:** `querystring.escape()`。

`querystring.stringify()` 方法通过遍历对象的自身属性从给定的 `obj` 生成 URL 查询字符串。

它会序列化传入的 `obj` 中以下类型的值：string| number| boolean| string[]|number[]| boolean[]。 任何其他的输入值都将会被强制转换为空字符串。

```js
querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
// 返回 'foo=bar&baz=qux&baz=quux&corge='

querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':');
// 返回 'foo:bar;baz:qux'
```

默认情况下，查询字符串中需要进行百分比编码的字符将会被编码为 UTF-8。 如果需要其他的编码，则需要指定其他的 `encodeURIComponent` 选项：

```js
// 假设 gbkEncodeURIComponent 函数已存在。

querystring.stringify({ w: '中文', foo: 'bar' }, null, null,
                      { encodeURIComponent: gbkEncodeURIComponent });
```

#### unescape(str)

新增于: v0.1.25

- `str` 

`querystring.unescape()` 方法在给定的 `str` 上执行 URL 百分比编码字符的解码。

`querystring.unescape()` 方法由 `querystring.parse()` 使用，通常不会被直接地使用。 它的导出主要是为了允许应用程序代码在需要时通过将 `querystring.unescape` 赋值给替代函数来提供替换的解码实现。

默认情况下， `querystring.unescape()` 方法将会尝试使用 JavaScript 内置的 `decodeURIComponent()` 方法进行解码。 如果失败，则将会使用更保险的不会因格式错误的 URL 而抛出异常的同类方法。



#### 示例

```javascript
let querystring = require('querystring')

console.log(querystring);

let str1 = "username=panzhiyue&password=123456";
let str2 = "username%3Dpanzhiyue%26password%3D123456";
let obj = { username: 'panzhiyue', password: '123456' };

//将 URL 查询字符串 `str` 解析为键值对的集合。
console.log(querystring.decode(str1));
console.log(querystring.parse(str2));

//通过遍历对象的自身属性从给定的 `obj` 生成 URL 查询字符串。
console.log(querystring.encode(obj));
console.log(querystring.stringify(obj));

//方法以对 URL 查询字符串的特定要求进行了优化的方式对给定的 `str` 执行 URL 百分比编码。
console.log(querystring.escape(str2));
//方法在给定的 `str` 上执行 URL 百分比编码字符的解码。
console.log(querystring.unescape(str1));

//把str转为Buffer
console.log(querystring.unescapeBuffer(str1));


{
  unescapeBuffer: [Function: unescapeBuffer],
  unescape: [Function: qsUnescape],
  escape: [Function: qsEscape],
  stringify: [Function: stringify],
  encode: [Function: stringify],
  parse: [Function: parse],
  decode: [Function: parse]
}
[Object: null prototype] { username: 'panzhiyue', password: '123456' }
[Object: null prototype] { 'username=panzhiyue&password=123456': '' }
username=panzhiyue&password=123456
username=panzhiyue&password=123456
username%253Dpanzhiyue%2526password%253D123456
username=panzhiyue&password=123456
<Buffer 75 73 65 72 6e 61 6d 65 3d 70 61 6e 7a 68 69 79 75 65 26 70 61 73 73 77 6f 72 64 3d 31 32 33 34 35 36>
```



### fs

| 序号 | 方法 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **fs.rename(oldPath, newPath, callback)** 异步 rename().回调函数没有参数，但可能抛出异常。 |
| 2    | **fs.ftruncate(fd, len, callback)** 异步 ftruncate().回调函数没有参数，但可能抛出异常。 |
| 3    | **fs.ftruncateSync(fd, len)** 同步 ftruncate()               |
| 4    | **fs.truncate(path, len, callback)** 异步 truncate().回调函数没有参数，但可能抛出异常。 |
| 5    | **fs.truncateSync(path, len)** 同步 truncate()               |
| 6    | **fs.chown(path, uid, gid, callback)** 异步 chown().回调函数没有参数，但可能抛出异常。 |
| 7    | **fs.chownSync(path, uid, gid)** 同步 chown()                |
| 8    | **fs.fchown(fd, uid, gid, callback)** 异步 fchown().回调函数没有参数，但可能抛出异常。 |
| 9    | **fs.fchownSync(fd, uid, gid)** 同步 fchown()                |
| 10   | **fs.lchown(path, uid, gid, callback)** 异步 lchown().回调函数没有参数，但可能抛出异常。 |
| 11   | **fs.lchownSync(path, uid, gid)** 同步 lchown()              |
| 12   | **fs.chmod(path, mode, callback)** 异步 chmod().回调函数没有参数，但可能抛出异常。 |
| 13   | **fs.chmodSync(path, mode)** 同步 chmod().                   |
| 14   | **fs.fchmod(fd, mode, callback)** 异步 fchmod().回调函数没有参数，但可能抛出异常。 |
| 15   | **fs.fchmodSync(fd, mode)** 同步 fchmod().                   |
| 16   | **fs.lchmod(path, mode, callback)** 异步 lchmod().回调函数没有参数，但可能抛出异常。Only available on Mac OS X. |
| 17   | **fs.lchmodSync(path, mode)** 同步 lchmod().                 |
| 18   | **fs.stat(path, callback)** 异步 stat(). 回调函数有两个参数 err, stats，stats 是 fs.Stats 对象。 |
| 19   | **fs.lstat(path, callback)** 异步 lstat(). 回调函数有两个参数 err, stats，stats 是 fs.Stats 对象。 |
| 20   | **fs.fstat(fd, callback)** 异步 fstat(). 回调函数有两个参数 err, stats，stats 是 fs.Stats 对象。 |
| 21   | **fs.statSync(path)** 同步 stat(). 返回 fs.Stats 的实例。    |
| 22   | **fs.lstatSync(path)** 同步 lstat(). 返回 fs.Stats 的实例。  |
| 23   | **fs.fstatSync(fd)** 同步 fstat(). 返回 fs.Stats 的实例。    |
| 24   | **fs.link(srcpath, dstpath, callback)** 异步 link().回调函数没有参数，但可能抛出异常。 |
| 25   | **fs.linkSync(srcpath, dstpath)** 同步 link().               |
| 26   | **fs.symlink(srcpath, dstpath[, type], callback)** 异步 symlink().回调函数没有参数，但可能抛出异常。 type 参数可以设置为 'dir', 'file', 或 'junction' (默认为 'file') 。 |
| 27   | **fs.symlinkSync(srcpath, dstpath[, type])** 同步 symlink(). |
| 28   | **fs.readlink(path, callback)** 异步 readlink(). 回调函数有两个参数 err, linkString。 |
| 29   | **fs.realpath(path[, cache], callback)** 异步 realpath(). 回调函数有两个参数 err, resolvedPath。 |
| 30   | **fs.realpathSync(path[, cache])** 同步 realpath()。返回绝对路径。 |
| 31   | **fs.unlink(path, callback)** 异步 unlink().回调函数没有参数，但可能抛出异常。 |
| 32   | **fs.unlinkSync(path)** 同步 unlink().                       |
| 33   | **fs.rmdir(path, callback)** 异步 rmdir().回调函数没有参数，但可能抛出异常。 |
| 34   | **fs.rmdirSync(path)** 同步 rmdir().                         |
| 35   | **fs.mkdir(path[, mode], callback)** S异步 mkdir(2).回调函数没有参数，但可能抛出异常。 访问权限默认为 0777。 |
| 36   | **fs.mkdirSync(path[, mode])** 同步 mkdir().                 |
| 37   | **fs.readdir(path, callback)** 异步 readdir(3). 读取目录的内容。 |
| 38   | **fs.readdirSync(path)** 同步 readdir().返回文件数组列表。   |
| 39   | **fs.close(fd, callback)** 异步 close().回调函数没有参数，但可能抛出异常。 |
| 40   | **fs.closeSync(fd)** 同步 close().                           |
| 41   | **fs.open(path, flags[, mode], callback)** 异步打开文件。    |
| 42   | **fs.openSync(path, flags[, mode])** 同步 version of fs.open(). |
| 43   | **fs.utimes(path, atime, mtime, callback)**                  |
| 44   | **fs.utimesSync(path, atime, mtime)** 修改文件时间戳，文件通过指定的文件路径。 |
| 45   | **fs.futimes(fd, atime, mtime, callback)**                   |
| 46   | **fs.futimesSync(fd, atime, mtime)** 修改文件时间戳，通过文件描述符指定。 |
| 47   | **fs.fsync(fd, callback)** 异步 fsync.回调函数没有参数，但可能抛出异常。 |
| 48   | **fs.fsyncSync(fd)** 同步 fsync.                             |
| 49   | **fs.write(fd, buffer, offset, length[, position], callback)** 将缓冲区内容写入到通过文件描述符指定的文件。 |
| 50   | **fs.write(fd, data[, position[, encoding]], callback)** 通过文件描述符 fd 写入文件内容。 |
| 51   | **fs.writeSync(fd, buffer, offset, length[, position])** 同步版的 fs.write()。 |
| 52   | **fs.writeSync(fd, data[, position[, encoding]])** 同步版的 fs.write(). |
| 53   | **fs.read(fd, buffer, offset, length, position, callback)** 通过文件描述符 fd 读取文件内容。 |
| 54   | **fs.readSync(fd, buffer, offset, length, position)** 同步版的 fs.read. |
| 55   | **fs.readFile(filename[, options], callback)** 异步读取文件内容。 |
| 56   | **fs.readFileSync(filename[, options])**                     |
| 57   | **fs.writeFile(filename, data[, options], callback)** 异步写入文件内容。 |
| 58   | **fs.writeFileSync(filename, data[, options])** 同步版的 fs.writeFile。 |
| 59   | **fs.appendFile(filename, data[, options], callback)** 异步追加文件内容。 |
| 60   | **fs.appendFileSync(filename, data[, options])** The 同步 version of fs.appendFile. |
| 61   | **fs.watchFile(filename[, options], listener)** 查看文件的修改。 |
| 62   | **fs.unwatchFile(filename[, listener])** 停止查看 filename 的修改。 |
| 63   | **fs.watch(filename[, options][, listener])** 查看 filename 的修改，filename 可以是文件或目录。返回 fs.FSWatcher 对象。 |
| 64   | **fs.exists(path, callback)** 检测给定的路径是否存在。       |
| 65   | **fs.existsSync(path)** 同步版的 fs.exists.                  |
| 66   | **fs.access(path[, mode], callback)** 测试指定路径用户权限。 |
| 67   | **fs.accessSync(path[, mode])** 同步版的 fs.access。         |
| 68   | **fs.createReadStream(path[, options])** 返回ReadStream 对象。 |
| 69   | **fs.createWriteStream(path[, options])** 返回 WriteStream 对象。 |
| 70   | **fs.symlink(srcpath, dstpath[, type], callback)** 异步 symlink().回调函数没有参数，但可能抛出异常。 |

#### 下载图片

```javascript
    let dom = homeStore.map.getTarget() as Element;
    if (options.control == false) {
      dom = dom.getElementsByClassName("ol-layers")[0];
    }
    let funcEnu = {
      png: domtoimage.toPng,
      jpg: domtoimage.toJpeg,
    };

    funcEnu[options.format](dom, { quality: 0.95 }).then(function (data) {
      var base64 = data.split(",")[1]; //去掉图片base64码前面部分data:image/png;base64
      const imageBuffer = new Buffer(base64, "base64");
      fs.writeFileSync(options.path as string, imageBuffer);
    });
```



### Path

用于处理文件路径和目录路径的实用工具

```javascript
var path = require("path")
```

#### 方法



| 序号 | 方法 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **path.normalize(p)** 规范化路径，注意'..' 和 '.'。          |
| 2    | **path.join([path1][, path2][, ...])** 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。 |
| 3    | **path.resolve([from ...], to)** 将 **to** 参数解析为绝对路径，给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。 例如，给定的路径片段的序列为：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz。 `path.resolve('/foo/bar', './baz'); // 返回: '/foo/bar/baz' path.resolve('/foo/bar', '/tmp/file/'); // 返回: '/tmp/file' path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'); // 如果当前工作目录为 /home/myself/node， // 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'` |
| 4    | **path.isAbsolute(path)** 判断参数 **path** 是否是绝对路径。 |
| 5    | **path.relative(from, to)** 用于将绝对路径转为相对路径，返回从 from 到 to 的相对路径（基于当前工作目录）。 在 Linux 上： `path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'); // 返回: '../../impl/bbb'` 在 Windows 上： `path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb'); // 返回: '..\\..\\impl\\bbb'` |
| 6    | **path.dirname(p)** 返回路径中代表文件夹的部分，同 Unix 的dirname 命令类似。 |
| 7    | **path.basename(p[, ext])** 返回路径中的最后一部分。同 Unix 命令 bashname 类似。 |
| 8    | **path.extname(p)** 返回路径中文件的后缀名，即路径中最后一个'.'之后的部分。如果一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符，则此命令返回空字符串。 |
| 9    | **path.parse(pathString)** 返回路径字符串的对象。            |
| 10   | **path.format(pathObject)** 从对象中返回路径字符串，和 path.parse 相反。 |



#### 属性



| 序号 | 属性 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **path.sep** 平台的文件路径分隔符，'\\' 或 '/'。             |
| 2    | **path.delimiter** 平台的分隔符, ; or ':'.                   |
| 3    | **path.posix** 提供上述 path 的方法，不过总是以 posix 兼容的方式交互。 |
| 4    | **path.win32** 提供上述 path 的方法，不过总是以 win32 兼容的方式交互。 |





**一：path.basename(path[, ext])**



参数解析如下：
path: `string`
ext: `string` 可选的文件扩展名
返回：`string`

path.basename(filepath), 是获取路径的最后一部分。 可以看看如下代码：

```
const path = require('path');

console.log(path.basename("/node/base/path/xx/js/index.js"));

// 最后输出 index.js

console.log(path.basename("/node/base/path/xx/js")); // 输出js

console.log(path.basename("/node/base/path/xx/js/")); // js/ 带反斜杠，也一样输出js
```



1.1 获取文件名



如果只想获取文件名，不需要扩展名则可以使用第二个参数，第二个参数可以指定文件的扩展名；如下代码：



```
const path = require('path');

console.log(path.basename("/node/base/path/xx/js/index.js", '.js'));

// 最后输出 index
```



**二：path.extname(path)**



该方法返回path的扩展名，即从path的最后一部分中的最后一个.(句号)字符到字符串结束。如果path的最后一部分没有 . 或 path的文件名的第一个
字符是 . ，则返回一个空字符串。如下代码：

```
const path = require('path');

console.log(path.extname('index.html')); // .html

console.log(path.extname('index.coffee.md')); // .md

console.log(path.extname('index.')); // 返回 .

console.log(path.extname('index')); // 返回 ''

console.log(path.extname('.index')); // 返回 ''
```



如果path不是一个字符串，则抛出 TypeError; 如下：
console.log(path.extname(111)); // 抛出异常



**三：path.dirname(path)**



该方法返回一个path的目录名。如下代码：



```
const path = require('path');

const filepath = '/node/base/path/index.js';

console.log(path.dirname(filepath)); // 输出 /node/base/path
```



**四：path.parse(path)**
path.parse()方法返回一个对象，对象的属性表示path的元素。如下代码：

```
const path = require('path');
const filepath = '/node/base/path/index.js';
console.log(path.parse(filepath)); 
// 输出如下：
/*
  { 
    root: '/',
    dir: '/node/base/path',
    base: 'index.js',
    ext: '.js',
    name: 'index' 
  }
*/
```

**五：path.format(pathObject)**
该方法会从一个对象返回一个路径字符串，与pase.parse()相反。



当pathObject提供的属性有组合时，有些属性的优先级比其他的高；



  \1. 如果提供了pathObject.dir，则pathObject.root 会被忽略。
  \2. 如果提供了 pathObject.base存在，则pathObject.ext 和 pathObject.name 会被忽略；



如下代码：

```
const path = require('path');

// 如果提供了pathObject.dir，则pathObject.root 会被忽略。
const str = {
  root: '/ignored',
  dir: '/node/base/path',
  base: 'index.js',
  ext: '.js',
  name: 'index'
};

console.log(path.format(str)); // 输出 /node/base/path/index.js

// 如果没有提供了pathObject.dir，则pathObject.root 会使用。
const str2 = {
  root: '/',
  base: 'index.js',
  ext: '.js',
  name: 'index'
};

console.log(path.format(str2)); // 输出 /index.js

// 如果没有指定 'base', 则 'name' + 'ext' 会被使用

const str3 = {
  root: '/',
  ext: '.js',
  name: 'index'
};

console.log(path.format(str3)); // 输出 /index.js
```

**六：path.isAbsolute(path);**



该方法会判定path是否为一个绝对路径。如果给定的path是一个长度为零的字符串，则返回false. 如下代码：

```
const path = require('path');

console.log(path.isAbsolute('/xxx/yy')); // true
console.log(path.isAbsolute('/xxx/')); // true
console.log(path.isAbsolute('xxxx/')); // false
console.log(path.isAbsolute('.')); // false
```

**七：path.join([...paths])**
该方法使用特定的分隔符把全部给定的path片段链接到一起，并规范生成的路径。

如下代码：

```
const path = require('path');

console.log(path.join('/node', 'www', 'local', 'html', '')); 
// 输出 /node/www/local/html

console.log(path.join('node', 11122, 'www')); 
// 会报错，TypeError: Path must be a string. Received 11122
```

**八：path.relative(from, to)**
该方法返回从 from 到 to的相对路径(基于当前工作目录)。
如下代码：

```
const path = require('path');

console.log(path.relative('/data/xx/text/aa', '/data/xx/yyyy/bbb'));

// 输出  ../../yyyy/bbb
```

**九：path.resolve([from...], to);**

将to分解成一个绝对路径。
  如果to不是一个绝对路径的话，那么from会被优先考虑，直到找到一个绝对路径，如果在form内还没有找到绝对路径，就会使用当前的工作目录。
  当然如果 to 是一个绝对路径的话，那么直接返回该绝对路径。

如下代码：

```
const path = require('path');

// to 不是一个绝对路径，form优先被考虑，直到找到一个绝对路径
console.log(path.resolve('/foo/bar', './baz')); // 返回 /foo/bar/baz

// to 是一个绝对路径，那么久直接返回 to
console.log(path.resolve('/foo/bar', '/baz')); // 返回 /baz

// 如果 from 和 to 都不是一个绝对路径的话，就会使用当前的工作目录 + form + to
console.log(path.resolve('foo', 'bar'));  // 返回 /Users/tugenhua/个人demo/node0420/nodeUrl/foo/bar
```

### URL类
API:http://nodejs.cn/api/url.html

```js
const myUrl=new URL(input[, base])
```

| 属性 | 描述 |
| ---- | ---- |
|      |      |
|      |      |
|      |      |

由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。

url 模块中的 parse 函数可以用于解析url中的参数。

#### **url.parse(urlStr, [parseQueryString], [slashesDenoteHost])**

参数说明：

- **urlStr** - 需要接收的url字符串。
- **parseQueryString** - 为true时将使用查询模块分析查询字符串，默认为false。
- **shashesDenoteHost**    

     -默认为false，/foo/bar 形式的字符串将被解释成 { pathname: ‘//foo/bar' }

     -如果设置成true，/foo/bar 形式的字符串将被解释成 { host: ‘foo', pathname: ‘/bar' }

**urlcontent.js**

```
 1 var http = require('http');
 2 var url = require('url');
 3 var util = require('util');
 4 
 5 http.createServer(function (req, res) {
 6     res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
 7     res.write('url:'+req.url+'\n\n');
 8     res.write(util.inspect(url.parse(req.url, true))+'\n\n');
 9 
10     var params = url.parse(req.url, true).query;
11     res.write("name：" + params.name + '\n');
12     res.write("age：" + params.age + '\n');
13 
14     var pathname = url.parse(req.url, true).pathname;
15     res.write('pathname:' + pathname + '\n');
16 
17     var path = url.parse(req.url, true).path;
18     res.write('path:' + path);
19     res.end();
20 }).listen(3000);
```



我们在浏览器中输入以下地址：localhost:3000/user?name=dragon&age=18

显示结果如下：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202204291129832.png)

下面我们新建一个form表单，再来模拟一下。

**index.html**



```
 1 <html>
 2 <head>
 3     <title>test</title>
 4 </head>
 5 <body>
 6     <form action="http://localhost:3000" method="GET">
 7         <table border="0">
 8             <tr>
 9                 <td>username：</td>
10                 <td><input type="text" name="username"><br/></td>
11             </tr>
12             <tr>
13                 <td>password：</td>
14                 <td><input type="text" name="password"><br/></td>
15             </tr>
16             <tr>
17                 <td align="center" colspan="2"><input type="submit" name="" value="提交"></td>
18             </tr>
19         </table>
20     </form>
21 </body>
22 </html>
```



**server.js**



```
 1 var http = require("http");
 2 var url = require("url");
 3 var server = http.createServer(function (req, res) {
 4 
 5 var queryObj = url.parse(req.url, true).query;
 6 var username = queryObj.username;
 7 var password = queryObj.password;
 8  
 9 res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
10 res.write('server received form request:\n\n');
11 res.write('username:'+username+'\n\n'+'password:'+password);
12 res.end();
13 });
14 server.listen(3000);
```



运行server.js，然后打开index.html

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202204291129282.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202204291129614.png)

## package.json详解

转自:https://blog.csdn.net/weixin_44135121/article/details/91674772

### 前言

随着前端由多页面到单页面，由零散的文件到模块化开发，在一个完整的项目中，package.json 文件无处不在。首先，在项目根目录会有，其次在 node_modules 中也频现。那么这个文件到底是干嘛的，又有什么作用，今天给大家揭晓。

### 一、package.json 文件作用

package.json 文件其实就是对项目或者模块包的描述，里面包含许多元信息。比如项目名称，项目版本，项目执行入口文件，项目贡献者等等。npm install 命令会根据这个文件下载所有依赖模块。

### 二、package.json 文件创建

package.json 文件创建有两种方式，手动创建或者自动创建。

- 手动创建
  直接在项目根目录新建一个 package.json 文件，然后输入相关的内容。

- 自动创建
  也是在项目根目录下执行 npm init，然后根据提示一步步输入相应的内容完成后即可自动创建。

### 三、package.json 文件示例

```json
{
  "name": "exchange",
  "version": "0.1.0",
  "author": "zhangsan <zhangsan@163.com>",
  "description": "第一个node.js程序",
  "keywords":["node.js","javascript"],
  "private": true,
  "bugs":{"url":"http://path/to/bug","email":"bug@example.com"},
  "contributors":[{"name":"李四","email":"lisi@example.com"}],
  "repository": {
		"type": "git",
		"url": "https://path/to/url"
	},
  "homepage": "http://necolas.github.io/normalize.css",
  "license":"MIT",
  "dependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-router-dom": "^5.0.1",
    "react-scripts": "3.0.1"
  },
  "devDependencies": {
    "browserify": "~13.0.0",
    "karma-browserify": "~5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "bin": {
  "webpack": "./bin/webpack.js"
  },
  "main": "lib/webpack.js",
  "module": "es/index.js",
  "eslintConfig": {
    "extends": "react-app"
  },
  "engines" : { 
    "node" : ">=0.10.3 <0.12" 
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "style": [
  "./node_modules/tipso/src/tipso.css"
],
  "files": [
    "lib/",
    "bin/",
    "buildin/",
    "declarations/",
    "hot/",
    "web_modules/",
    "schemas/",
    "SECURITY.md"
  ]
}

```

### 四、package.json 文件配置说明

1. name：项目/模块名称，长度必须小于等于214个字符，不能以"."(点)或者"_"(下划线)开头，不能包含大写字母。
2. version：项目版本。
3. author：项目开发者，它的值是你在https://npmjs.org网站的有效账户名，遵循“账户名<邮件>”的规则，例如：zhangsan zhangsan@163.com。
4. description：项目描述，是一个字符串。它可以帮助人们在使用npm search时找到这个包。
5. keywords：项目关键字，是一个字符串数组。它可以帮助人们在使用npm search时找到这个包。
6. private：是否私有，设置为 true 时，npm 拒绝发布。
7. license：软件授权条款，让用户知道他们的使用权利和限制。
8. bugs：bug 提交地址。
9. contributors：项目贡献者 。
10. repository：项目仓库地址。
11. homepage：项目包的官网 URL。
12. dependencies：生产环境下，项目运行所需依赖。
13. devDependencies：开发环境下，项目所需依赖。
14. scripts：执行 npm 脚本命令简写，比如 “start”: “react-scripts start”, 执行 npm start 就是运行 “react-scripts start”。
15. bin：内部命令对应的可执行文件的路径。
16. main：项目默认执行文件，比如 require(‘webpack’)；就会默认加载 lib 目录下的 webpack.js 文件，如果没有设置，则默认加载项目跟目录下的 index.js 文件。
17. module：是以 ES Module(也就是 ES6)模块化方式进行加载，因为早期没有 ES6 模块化方案时，都是遵循 CommonJS 规范，而 CommonJS 规范的包是以 main 的方式表示入口文件的，为了区分就新增了 module 方式，但是 ES6 模块化方案效率更高，所以会优先查看是否有 module 字段，没有才使用 main 字段。
    eslintConfig：EsLint 检查文件配置，自动读取验证。
18. engines：项目运行的平台。
19. browserslist：供浏览器使用的版本列表。
20. style：供浏览器使用时，样式文件所在的位置；样式文件打包工具parcelify，通过它知道样式文件的打包位置。
21. files：被项目包含的文件名数组。



