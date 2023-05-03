在Apple M1中出现如下错误

```
…but is an incompatible architecture (have 'arm64', need 'x86_64')…
```

解决方法

```bash
yarn rebuild --runtime=electron --arch=arm64 --target=19.0.1 --disturl=https://atom.io/download/atom-shell --abi=110
```

