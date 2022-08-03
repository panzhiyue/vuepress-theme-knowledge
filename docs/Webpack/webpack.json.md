```json
{
    module: {
      rules: [{  //解析.mjs文件
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }]
    }
    resolve: {
      alias: {   //定义路径别名
        '~/': path.join(__dirname, '/'),
        ...commonPackagesAlias(),
        '@': path.join(__dirname, 'packages', name, 'src'),
        // '#': path.join(__dirname, 'packages'),
      },
    },
	devServer:{
		proxy: {
      		'/api': {
        		target: 'http://www.baidu.com/',
        		pathRewrite: {'^/api' : ''},
        		changeOrigin: true,     // target是域名的话，需要这个参数，
        		secure: false,          // 设置支持https协议的代理
      		},
      		'/api2': {
          		.....
      		}
    	}
	}
}
```



2. devServe.proxy配置中主要的参数说明
2.1 '/api'
捕获API的标志，如果API中有这个字符串，那么就开始匹配代理，
比如API请求/api/users, 会被代理到请求 http://www.baidu.com/api/users 。

2.2 target
代理的API地址，就是需要跨域的API地址。
地址可以是域名,如：http://www.baidu.com
也可以是IP地址：http://127.0.0.1:3000
如果是域名需要额外添加一个参数changeOrigin: true，否则会代理失败。

2.3 pathRewrite
路径重写，也就是说会修改最终请求的API路径。
比如访问的API路径：/api/users,
设置pathRewrite: {'^/api' : ''},后，
最终代理访问的路径：http://www.baidu.com/users，
这个参数的目的是给代理命名后，在访问时把命名删除掉。

2.4 changeOrigin
这个参数可以让target参数是域名。

2.5 secure
secure: false,不检查安全问题。
设置后，可以接受运行在 HTTPS 上，可以使用无效证书的后端服务器

2.6 其他参数配置查看http-proxy-middleware文档
其他的配置参数等信息，可以查看这里：https://github.com/chimurai/h...

3. 参考资料
webpack-dev-server： https://github.com/webpack/we...
http-proxy-middleware： https://github.com/chimurai/h...
webpack官网 devServer.proxy配置