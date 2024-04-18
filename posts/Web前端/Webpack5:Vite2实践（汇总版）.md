---
title: Webpack5:Vite2实践
date: 2024-04-18T09:31:22+0800
tag: Vue
description: Webpack5:Vite2实践（汇总版）
---

# 一、Vite构建项目

[Home | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/)

Vite 运行 Dev 命令后只做了两件事情，一是启动了一个用于承载资源服务的 service；二是使用 [esbuild](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/BCL1Cm64mps4cZe_V26Wtw) 预构建 npm 依赖包。之后就一直躺着，直到浏览器以 http 方式发来 ESM 规范的模块请求时，Vite 才开始“**「按需编译」**”被请求的模块。(由于使用了ESM，vite不能使用reuqire，只能使用import和export)

### 1使用Vite2构建Vue2项目

使用官网模板构建vue项目(vue3)

```
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app -- --template vue
```

`Vite` 默认不提供 `Vue2` 项目的创建方式。这里搭建的时候vue3的项目，可以通过替换vue版本实现vue2,后续插件的版本也需要对应；

我们也可以使用 `Vite` 创建一个原生项目，然后再安装 `Vue2` 的生态进行开发，具体参考[Vite 搭建 Vue2 项目（Vue2 + vue-router + vuex） - 简书 (jianshu.com)](https://www.jianshu.com/p/fa8fc06b7c6b)

#### 1.1初始化项目

```bash
npm init vite@latest
选择 vanilla 即可
```

#### 1.2 安装vue依赖

```bash
npm install vue
npm install vite-plugin-vue2 --dev
npm install vue-template-compiler
```

#### 1.3创建src目录

在项目根目录下创建 `src` 目录。

创建项目的 `main.js` 。

#####

### 2.**目录结构差异**

搭建完成后可以看到vite的目录结构

![image-20220406183006362](/Users/lizehang/Library/Application Support/typora-user-images/image-20220406183006362.png)

`index.html` 在项目最外层而不是在 `public` 文件夹内。这是有意而为之的：在开发期间 Vite 是一个服务器，而 `index.html` 是该 Vite 项目的入口文件。

手动引入 `src/main.js 启动入口，设置 `type=module

<script type="module" src="/src/main.js"></script>

### 3.**基础配置**

#### 3.1引入vite依赖

要在 `vite` 里运行 `vue2` 项目，需要安装一个 `vite` 的插件：`vite-plugin-vue2`

```
npm install vite-plugin-vue2 --dev
```

配置如下

```
import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  plugins: [
     createVuePlugin({
        vueTemplateOptions: {}
      }),
  ]
}
```

还需要安装vue-template-compiler，注意版本要和vue版本一致

```bash
npm install vue-template-compiler
```

#### 3.2常用功能配置

3.2.1.导入时省略文件类型后缀

我们在导入 `vue`、`js` 等文件时往往喜欢省略类型后缀，这需要配置 `extensions`

```
resolve: {
    extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
```

3.2.2.路径别名配置

```
import path from 'path';
const resolve = dir => path.resolve(__dirname, dir);

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});
```

3.2.3.scss配置

在vite中需要额外安装sass

```
yarn add sass
```

配置如下

```
 css: {
            preprocessorOptions: {
                scss: {
                    // additionalData: '@import "@/styles/scss/global.scss";'
                }
            },
        },
```

3.2.4.打包压缩

使用 `vite-plugin-compression` 做 gzip 压缩。

```
import compressPlugin from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    compressPlugin({
      filter: /\.(js|css)$/i, // 压缩文件类型
      deleteOriginFile: true, // 压缩后删除源文件
    }),
  ],
});

```

3.2.5.api 代理

proxy的配置和原先一样

### 4.安装Router

4.1安装vue-router

```bash
npm install vue-router
```

```js
import VueRouter from "vue-router"
Vue.use(VueRouter)
```

因为默认的 `router/index.js` 用到了环境变量，根据vite文档，这里需要做修改

```javascript
const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes
})
```

从 `process.env` 改成了 import.meta.env

在main.js中全局注册

```js
import Vue from "vue"
import App from "./App.vue"
import router from "./router/index.js"

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app")
```

### 5.安装vuex

```bash
npm install vuex --save
```

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: { },
  mutations: { }
  },
  actions: {}
})
```

全局注册vuex

```js
import Vue from "vue"
import store from "./store"

new Vue({
  store,
  render: (h) => h(App)
}).$mount("#app")
```

### 6.运行项目

```js
yarn dev
```

### 7.打包项目

```js
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview" //本地调试 --port
  },
```

```js
yarn build
```

# 二、Vue-cli 转 Vite 与 Vite特性

### 1. Vue-cli 转 Vite

#### 1.1 webpack-to-vite

使用 [webpack-to-vite](<(https://originjs.org/guide/tools/webpack-to-vite/#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)>) 完成基础转换

```
$ npm install @originjs/webpack-to-vite -g
$ webpack-to-vite <project path>
```

#### 1.2 index.html

```html
<!-- vue-cli -->
<head>
  <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</head>

<!-- vite -->
<head>
  <link rel="icon" href="/favicon.ico" />
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</head>
```

**vite 与 webpack 对比 (1.2)**

1. `index.html` 中的 URL 将被自动转换，因此不再需要 `BASE_URL` 占位符
2. `webpack`中的入口文件被放在 `index.html` 中解析

#### 1.3 vite.config.js

```js
// vue-cli
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const path = require("path");
function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	publicPath: "/",
	devServer: {
		host: "0.0.0.0",
		port: 9096,
		open: true
	},
	css: {
		loaderOptions: {
			sass: {
				data: `@import "@/styles/index.scss";`
			}
		}
	},
	chainWebpack: config => {
		config.resolve.alias
			.set("@", resolve("src"));
		config.module
			.rule("workder")
			.test(/\.worker\.js$/)
			.use("worker-loader")
			.loader("worker-loader")
			.options({
				inline: true
			})
			.end();
		config.module.rule("images").
			.test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
			.exclude.add(resolve("src/icon/svg"))
			.end();
	},
	configureWebpack: {
    	optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        warnings: false,
                        compress: {
                            drop_console: false,
                            drop_debugger: true
                        }
                    },
                    parallel: true,
                    sourceMap: true
                })
            ]
        }
    },
    plugins:
       process.env.NODE_ENV === "production"
         ? [
             new CompressionPlugin({
               filename: "[path].gz[query]",
               algorithm: "gzip",
               test: new RegExp(
                 "\\.(" + ["js", "css"].join("|") + ")$"
               ),
               threshold: 10240,
               minRatio: 0.8
             })
           ]
         : []
}
```

```js
// vite
import { defineConfig, loadEnv } from "vite"
import path from "path"
import { createVuePlugin } from "vite-plugin-vue2"
import ViteRequireContext from "@originjs/vite-plugin-require-context"
import envCompatible from "vite-plugin-env-compatible"
import { viteCommonjs } from "@originjs/vite-plugin-commonjs"

export default ({ mode }) =>
  defineConfig({
    base: loadEnv(mode, process.cwd()).DEV ? "/" : "./",
    server: {
      strictPort: false,
      port: 9096,
      host: "0.0.0.0",
      open: true
    },
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/styles/index.scss";'
        },
        scss: {
          additionalData: '@import "@/styles/index.scss";',
          exclude: "node_modules",
          javascriptEnabled: true,
          charset: false
        }
      }
    },
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: ""
        },
        {
          find: "@",
          replacement: path.resolve(__dirname, "src")
        }
      ]
    },
    plugins: [
      createVuePlugin({
        jsx: true,
        vueTemplateOptions: {
          compilerOptions: {
            whitespace: "condense"
          }
        }
      }),
      ViteRequireContext(),
      viteCommonjs(),
      envCompatible(),
      viteCompression()
    ],
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true
        }
      },
      chunkSizeWarningLimit: 2000
    }
  })
```

**vite 与 webpack 对比 (1.3)**

1. 公共基础路径、开发服务器、别名、`gzip`、`terser`配置不同
2. `Vite` 提供了对 `.scss`, `.sass`, `.less`, `.styl` 和 `.stylus` 文件的内置支持，不必像`wepack`一样为它们安装特定的 插件，但必须安装相应的预处理器依赖，例如`sass`,`less`,`stylus`
3. 静态资源的处理不同，例如图片与`web workder`
4. `Vite`对`jsx`语法显式声明

#### 1.4 JSX

1. 需要将所有使用到`jsx`语法的js文件后缀名改为`.jsx`，在使用到`jsx`语法的vue文件中将脚本加上 `lang="jsx"`标识
2. 将`jsx`语法转换为`render`函数

```vue
<script lang="jsx">
  export default {
    render() {
      return <div>JSX Render</div>
    }
  }
</script>
```

#### 1.5 CSS

1. vite 不支持` :export` 语法，可以通过以下方式替代

```js
import targetStyle from "./target.module.scss"
```

2. `/deep/` 不再被支持，用`::v-deep`替代

#### 1.6 静态资源

1. Web worker

   脚本可以通过 `?worker` 或 `?sharedworker` 后缀导入为 web worker

   ```js
   import Worker from "path/target.worker.js?worker"
   ```

2. 图片

   图片可以被当作URL引入，或者直接在<img>标签中引入图片路径

   ```js
   import imgUrl from "./img.png"
   // const imgUrl = new URL('./img.png', import.meta.url).href;
   document.getElementById("hero-img").src = imgUrl
   ```

#### 1.7 其他

1. **Autoprefixer**

   （一款PostCSS 插件，用于解析 CSS 并使用 Can I Use 中的值浏览器前缀添加到 CSS 规则中）

   在vue-cli项目中，`Autoprefixer`作为`@vue/cli-service`的依赖被引入，在vite项目中需要在package.json中声明这一依赖。

2. **pdfmaker 与 CommonJS**

   由于 Vite 只支持 ES Module 包，对于 CommonJS 或 UMD 包必须经过转换才可使用，而 Vite 的智能导入分析可能存在缺漏，因此需要手动配置让依赖被预构建处理。

   ```js
   export default defineConfig({
     optimizeDeps: {
       include: ["pica", "tinycolor2"]
     }
   })
   ```

   同时，项目中可能出现单独引入某一CommonJS依赖下的某个文件，在这种情况下`optimizeDeps`也不起作用，需要引入`@rollup/plugin-commonjs`手动处理

   ```js
   export default defineConfig({
     plugins: [
       commonjs({
         dynamicRequireTargets: [
           "node_modules/pdfmake/build/pdfmake.js",
           "node_modules/pdfmake/build/vfs_fonts"
         ]
       })
     ],
     optimizeDeps: {
       include: ["pdfmake/build/pdfmake", "pdfmake/build/vfs_fonts"]
     }
   })
   ```

3. **.env**

   Vite 在一个特殊的 **`import.meta.env`** 对象上暴露环境变量，常用变量有：`import.meta.env.MODE``import.meta.env.BASE_URL`,`import.meta.env.PROD`,`import.meta.env.DEV`。

   Vite 通过.env文件加载的环境变量也会通过 `import.meta.env` 暴露给客户端源码。

   为了防止意外地将一些环境变量泄漏到客户端，只有以 `VITE_` 为前缀的变量才会暴露给经过 vite 处理的代码。

   ```
   // .env.permission
   VITE_APP_PERMISSION = true
   ```

### 2. Vite特性

![webpack-dev-server.png](https://s2.loli.net/2022/04/12/94sGQCnrA2LT6Wh.png)

**webpack**： 先打包后启动

![esm-dev-server.png](https://s2.loli.net/2022/04/12/JnDh31gEVHmb798.png)

**vite**： 先启动再按需编译资源

#### 2.1 预构建

用`Esbuild`整理不会发生变化的 node_modules 依赖，进行预构建，减少网络请求次数。

##### 2.1.1 预构建流程

1. **查找依赖**： 如果是首次启动本地服务，那么`vite`会自动抓取源代码，从代码中找到需要预构建的依赖，即：以`index.html`作为查找入口（`entryPoints`），将所有的来自`node_modules`以及在配置文件的`optimizeDeps.include`选项中指定的模块找出来；
2. **构建找到的依赖**：打包需要预构建的依赖列表；
3. **创建或更新缓存文件**：`vite`在启动时为提升速度，会检查缓存是否有效，有效的话就可以跳过预构建环节，缓存是否有效的判定是对比缓存中的`hash`值与当前的`hash`值是否相同。由于`hash`的生成算法是基于`vite`配置文件和项目依赖的，所以配置文件和依赖的的变化都会导致`hash`发生变化，从而重新进行预构建。

##### 2.1.2 预构建原因

> 1.  **CommonJS 和 UMD 兼容性**：开发阶段中，Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。当转换 CommonJS 依赖时，Vite 会执行智能导入分析，这样即使导出是动态分配的（如 React），按名导入也会符合预期效果：
> 2.  **性能：** Vite 将有许多内部模块的 ESM 依赖关系转换为单个模块，以提高后续页面加载性能。
>
> 一些包将它们的 ES 模块构建作为许多单独的文件相互导入。例如，[`lodash-es` 有超过 600 个内置模块](https://unpkg.com/browse/lodash-es/)！当我们执行 `import { debounce } from 'lodash-es'` 时，浏览器同时发出 600 多个 HTTP 请求！尽管服务器在处理这些请求时没有问题，但大量的请求会在浏览器端造成网络拥塞，导致页面的加载速度相当慢。
>
> 通过预构建 `lodash-es` 成为一个模块，我们就只需要一个 HTTP 请求了！

#### 2.2 缓存

1. **缓存文件**：Vite 会将预构建的依赖缓存到 `node_modules/.vite`。` package.json`中的依赖列表、`lockfile`、`vite.config.js`的变化、`node_modules/.vite`被删除、或者用`--force`启动开发服务器，都会导致重新运行预构建。
2. **浏览器缓存**：解析后的依赖请求会以 HTTP 头 `max-age=31536000,immutable` 强缓存，以提高在开发时的页面重载性能。一旦被缓存，这些请求将永远不会再到达开发服务器。

##### 2.3 热更新

##### 2.3.1 开发模式下的运行流程

Vite提供了一个开发服务器，然后结合原生的ESM，当代码中出现import的时候，发送一个资源请求，Vite开发服务器拦截请求，根据不同文件类型，在服务端完成模块的改写（比如单文件的解析编译等）和请求处理，实现真正的按需编译，然后返回给浏览器。请求的资源在服务器端按需编译返回，完全跳过了打包这个概念，不需要生成一个大的bundle。服务器随起随用，所以开发环境下的初次启动是非常快的。而且热更新的速度不会随着模块增多而变慢，因为代码改动后，并不会有bundle的过程。

| 资源类型       | 服务端操作                                 |
| -------------- | ------------------------------------------ |
| CSS LESS SCSS  | CSS 预处理,打包为ESModule动态插入style标签 |
| jsx ts tsx vue | JS编译                                     |
| json           | 打包为ESModule                             |
| 静态资源       | 打包为ESModule,输出本地路径                |

##### 2.3.2 热更新原理

Vite 通过 `WebSocket` 来实现热更新通信。

Vite的客户端监听来自服务端的 HMR 消息推送完成对应的更新操作，消息包含：

- `connected`: WebSocket 连接成功

- `vue-reload`: Vue 组件重新加载（当你修改了 script 里的内容时）

- `vue-rerender`: Vue 组件重新渲染（当你修改了 template 里的内容时）

- `style-update`: 样式更新

- `style-remove`: 样式移除

- `js-update`: js 文件更新

- `full-reload`: fallback 机制，网页重刷新

Vite在服务端监听文件变更，根据不同文件类型来做不同的处理。例如：对于 `Vue` 文件的热更新而言，主要是重新编译 `Vue` 文件，检测 `template` 、`script` 、`style` 的改动，如果有改动就通过 WS 服务端发起对应的热更新请求；对于热更新 `js` 文件而言，会递归地查找引用这个文件的 `importer`，如果找不到就发送`full-reload`。

#### 2.4 与Webpack的对比

|          | Bundle（Webpack）               | Bundleless(Vite/Snowpack)      |
| -------- | ------------------------------- | ------------------------------ |
| 启动时间 | 长，完成打包项目                | 短，只启动Server 按需加载      |
| 构建时间 | 随项目体积线性增长              | 构建时间复杂度O(1)             |
| 加载性能 | 打包后加载对应Bundle            | 请求映射至本地文件             |
| 缓存能力 | 缓存利用率一般，受split方式影响 | 缓存利用率近乎完美             |
| 文件更新 | 重新打包                        | 重新请求单个文件               |
| 调试体验 | 通常需要SourceMap进行调试       | 不强依赖SourceMap,可单文件调试 |
| 生态     | 非常完善                        | 目前先对不成熟，但是发展很快   |

# 三、webpack5

##新特性

1. 增加持久化存储能力，提升构建性能（核心）
2. 提升算法能力来改进长期缓存（降低产物资源的缓存失效率）
3. 提升 Tree Shaking 能力降低产物大小和代码生成逻辑
4. 提升 web 平台的兼容性能力
5. 清除了内部结构中，在 Webpack4 没有重大更新而引入一些新特性时所遗留下来的一些奇怪的 state
6. 通过引入一些重大的变更为未来的一些特性做准备，使得能够长期的稳定在 Webpack5 版本上 ###构建优化

> 当检测到某个文件变化时，根据依赖关系，只对依赖树上相关的文件进行编译，从而大幅提高了构建速度。

1. 嵌套的 tree-shaking
   这个例子可以在生产模式下删除导出的b
   ![image.png](https://upload-images.jianshu.io/upload_images/19506176-fc74805b74e21070.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 内部模块 tree-shaking
   webpack5中有一个新选项 optimization.innerGraph，在生产模式下默认开启，可以对模块中的标志进行分析，找出导出和引用之间的依赖关系。
   ![image.png](https://upload-images.jianshu.io/upload_images/19506176-6363b33becc0a0ca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 内部依赖图算法会找出 something 只有在使用 test 导出时才会使用。这允许将更多的出口标记为未使用，并从代码包中省略更多的代码。
- 当设置"sideEffects": false时，若test 导出未被使用时，./something 将被省略。

3. 其它优化

- CommonJs Tree Shaking
  加了对一些 CommonJs 构造的支持，允许消除未使用的 CommonJs 导出，并从 require() 调用中跟踪引用的导出名称。
- 副作用分析：可以根据对源代码的静态分析，自动将模块标记为无副作用
- 模块合并：支持更多模块，如 ExternalModules 和 json 模块
- 通用 Tree Shaking 改进
  export \* 已经改进，可以跟踪更多的信息，并且不再将默认导出标记为使用
- 改进代码生成
  会生成更短的代码 Object(...)->(0, ...)
  合并运行时函数
  Webpack 将多个导出的 getters 合并为一个运行时函数调用。

> r.d(x, "a", () => a); r.d(x, "b", () => b); -> r.d(x, {a: () => a, b: () => b});

- 改进 target 配置
  在 webpack 4 中，"target "是在 "web" 和 "node" 之间的一个粗略的选择（还有一些其他的）。 Webpack 5 给你更多的选择。
- 代码块拆分与模块大小
  SplitChunksPlugin 现在知道如何处理这些不同的大小，并将它们用于 minSize 和 maxSize。 默认情况下，只有 javascript 大小被处理，但现在可以传递多个值来管理它们：
  ![image.png](https://upload-images.jianshu.io/upload_images/19506176-89ab5231bd33898e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 长期缓存

在webpack4中经常使用的hard-source-webpack-plugin来缓存我们的打包文件，在webpack5中被废弃掉了。现在有一个文件系统缓存。它是可选的，可以通过以下配置启用：
![image.png](https://upload-images.jianshu.io/upload_images/19506176-5110cca06362ee58.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/19506176-126f2429ec8e7f92.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### webpack5其它新特性

1、加载资源模块
资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

- asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
- asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
- asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
  ![image.png](https://upload-images.jianshu.io/upload_images/19506176-d87aab389a0bb9e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. Web 平台特性

- import.meta
  import.meta.webpackHot 是 module.hot 的别名，在严格的 ESM 中也可以使用。
  import.meta.webpack 是 webpack 的主要版本号。
  import.meta.url 是当前文件的 file: url(类似于\_\_filename，但作为文件 url)
- 资源模块
  new URL("./image.png", import.meta.url)
- 原生 Worker 支持
  new Worker(new URL("./worker.js", import.meta.url))

### 总结

1. webpack5增强了对模块之间依赖的分析能力，从而提升了tree shaking的能力，如：嵌套、内部依赖、改进代码生成
2. 长期缓存： webpack5 生产环境默认计算hash方式为deterministic，生成更稳定的chunkId, 有利于长期缓存
3. 增量构建：webpack5 丰富了cache配置，可以指定缓存存放在文件系统中，不容易失效，加大了构建速度
4. webpack5新增了一些web新特性

- 资源模块无需使用loader
- 不同项目之前共享模块
- 支持通过import.meta访问当前文件路径
- 支持入口文件描述符，指定依赖

## 安装

> npm install -g npm-check-updates

## 执行npm-check-updates

![image.png](https://upload-images.jianshu.io/upload_images/19506176-6cfe0e1edd016abc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) ##规则写法的更改
![image.png](https://upload-images.jianshu.io/upload_images/19506176-7b26b3d306d7a4b4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 注意的是需要安装style-loader和css-loader的依赖，webpack4就不需要 ##废弃了hard-source-webpack-plugin
> 在webpack4中经常使用的hard-source-webpack-plugin来缓存我们的打包文件，在webpack5中被废弃掉了。

```
  cache: {
    // 将缓存类型设置为文件系统
    type: "filesystem",
    buildDependencies: {
      /* 将你的 config 添加为 buildDependency，
           以便在改变 config 时获得缓存无效*/
      config: [__filename],
      /* 如果有其他的东西被构建依赖，
           你可以在这里添加它们*/
      /* 注意，webpack.config，
           加载器和所有从你的配置中引用的模块都会被自动添加*/
    },
    // 指定缓存的版本
    version: "1.0",
  },
```

![image.png](https://upload-images.jianshu.io/upload_images/19506176-126f2429ec8e7f92.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
每次我们执行完打包命令后，为了防止缓存过于固定，导致更改构建配置无感知，webpack5依然使用旧的缓存，默认情况下，每次修改构建配置文件都会导致重新开始缓存。
![image.png](https://upload-images.jianshu.io/upload_images/19506176-d9d7803e41fd0d54.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) ###原理
webpack5增加了确定的 moduleId，chunkId 的支持

> optimization.moduleIds = 'deterministic'
> optimization.chunkIds = 'deterministic'
> 这个配置在mode:production的时候是默认开启的，它的作用是以确定的方式为 module 和 chunk 分配 3-5 位数字id，相比于 webpack4 版本的选项 hashed，它会导致更小的文件 bundles。

由于 moduleId 和 chunkId 确定了，构建的文件的 hash 值也会确定，有利于浏览器长效缓存。同时此配置有利于减少文件打包大小。这个也是webpack5持久化缓存的秘诀之一。
