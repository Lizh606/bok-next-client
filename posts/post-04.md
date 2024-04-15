---
title: 面试
date: 2023-03-22T22:22:22+0800
---

## 1，**说一说cookie sessionStorage localStorage 区别？**

得分点

数据存储位置、生命周期、存储大小、写入方式、数据共享、发送请求时是否携带、应用场景

标准回答

Cookie、SessionStorage、 LocalStorage都是浏览器的本地存储。

它们的共同点：都是存储在浏览器本地的

它们的区别：

cookie是由服务器端写入的，

而SessionStorage、 LocalStorage都是由前端写入的，

cookie的生命周期是由服务器端在写入的时候就设置好的，

LocalStorage是写入就一直存在，除非手动清除，

SessionStorage是页面关闭的时候就会自动清除。

cookie的存储空间比较小大概4KB，SessionStorage、 LocalStorage存储空间比较大，大概5M。

Cookie、SessionStorage、 LocalStorage数据共享都遵循同源原则，SessionStorage还限制必须是同一个页面。在前端给后端发送请求的时候会自动携带Cookie中的数据，但是SessionStorage、 LocalStorage不会

加分回答

由于它们的以上区别，所以它们的应用场景也不同，Cookie一般用于存储登录验证信息SessionID或者token，LocalStorage常用于存储不易变动的数据，减轻服务器的压力，SessionStorage可以用来检测用户是否是刷新进入页面，如音乐播放器恢复播放进度条的功能。

## 2，**说一说JS数据类型有哪些,区别是什么？**

得分点
Number、String、Boolean、BigInt、Symbol、Null、Undefined、Object、8种

标准回答
JS数据类型分为两类：一类是基本数据类型，也叫简单数据类型，包含7种类型，分别是Number 、String、Boolean、BigInt、Symbol、Null、Undefined。另一类是引用数据类型也叫复杂数据类型，通常用Object代表，普通对象，数组，正则，日期，Math数学函数都属于Object。

数据分成两大类的本质区别：基本数据类型和引用数据类型它们在内存中的存储方式不同。
基本数据类型是直接存储在栈中的简单数据段，占据空间小，属于被频繁使用的数据。
引用数据类型是存储在堆内存中，占据空间大。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址，当解释器寻找引用值时，会检索其在栈中的地址，取得地址后从堆中获得实体。

加分回答

Symbol是ES6新出的一种数据类型，这种数据类型的特点就是没有重复的数据，可以作为object的key。
数据的创建方法Symbol()，因为它的构造函数不够完整，所以不能使用new Symbol()创建数据。由于Symbol()创建数据具有唯一性，所以 Symbol() !== Symbol(), 同时使用Symbol数据作为key不能使用for获取到这个key，需要使用Object.getOwnPropertySymbols(obj)获得这个obj对象中key类型是Symbol的key值。
let key = Symbol('key');
let obj = { [key]: 'symbol'};
let keyArray = Object.getOwnPropertySymbols(obj); // 返回一个数组[Symbol('key')]
obj[keyArray[0]] // 'symbol'
BigInt也是ES6新出的一种数据类型，这种数据类型的特点就是数据涵盖的范围大，能够解决超出普通数据类型范围报错的问题。
使用方法：-整数末尾直接+n：647326483767797n -调用BigInt()构造函数：BigInt("647326483767797")

注意：BigInt和Number之间不能进行混合操作

## 3，**说一说你对闭包的理解？**

得分点

变量背包、作用域链、局部变量不销毁、函数体外访问函数的内部变量、内存泄漏、内存溢出、形成块级作用域、柯里化、构造函数中定义特权方法、Vue中数据响应式Observer

标准回答

闭包 一个函数和词法环境的引用捆绑在一起，这样的组合就是闭包（closure）。

一般就是一个函数A，return其内部的函数B，被return出去的B函数能够在外部访问A函数内部的变量，这时候就形成了一个B函数的变量背包，A函数执行结束后这个变量背包也不会被销毁，并且这个变量背包在A函数外部只能通过B函数访问。

闭包形成的原理：作用域链，当前作用域可以访问上级作用域中的变量 闭包解决的问题：能够让函数作用域中的变量在函数执行结束之后不被销毁，同时也能在函数外部可以访问函数内部的局部变量。

闭包带来的问题：由于垃圾回收器不会将闭包中变量销毁，于是就造成了内存泄露，内存泄露积累多了就容易导致内存溢出。

加分回答

闭包的应用，能够模仿块级作用域，能够实现柯里化，在构造函数中定义特权方法、Vue中数据响应式Observer中使用闭包等。

## 4，**说一说promise是什么与使用方法？**

得分点

pendding、rejected、resolved、微任务、then、catch、Promise.resolve()、Promise.reject()、Promise.all() Promise.any()、Promise.race()

标准回答

Promise的作用：Promise是异步微任务，解决了异步多层嵌套回调的问题，让代码的可读性更高，更容易维护

Promise使用：Promise是ES6提供的一个构造函数，可以使用Promise构造函数new一个实例，Promise构造函数接收一个函数作为参数，

这个函数有两个参数，分别是两个函数 `resolve`和`reject`，`resolve`将Promise的状态由等待变为成功，将异步操作的结果作为参数传递过去；`reject`则将状态由等待转变为失败，在异步操作失败时调用，将异步操作报出的错误作为参数传递过去。

实例创建完成后，可以使用`then`方法分别指定成功或失败的回调函数，也可以使用catch捕获失败，then和catch最终返回的也是一个Promise，所以可以链式调用。

Promise的特点：

\1. 对象的状态不受外界影响（Promise对象代表一个异步操作，有三种状态）。 - pending（执行中） - Resolved（成功，又称Fulfilled） - rejected（拒绝） 其中pending为初始状态，fulfilled和rejected为结束状态（结束状态表示promise的生命周期已结束）。

\2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。 Promise对象的状态改变，只有两种可能（状态凝固了，就不会再变了，会一直保持这个结果）： - 从Pending变为Resolved - 从Pending变为Rejected

\3. resolve 方法的参数是then中回调函数的参数，reject 方法中的参数是catch中的参数

\4. then 方法和 catch方法 只要不报错，返回的都是一个fullfilled状态的promise

加分回答

Promise的其他方法：

Promise.resolve() :返回的Promise对象状态为fulfilled，并且将该value传递给对应的then方法。

Promise.reject()：返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法。

Promise.all()：返回一个新的promise对象，该promise对象在参数对象里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。

Promise.any()：接收一个Promise对象的集合，当其中的一个 promise 成功，就返回那个成功的promise的值。

Promise.race()：当参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。

## 5，**说一说跨域是什么？如何解决跨域问题？**

得分点
同源限制、协议、域名、端口、CORS、node中间件、JSONP、postmessage

标准回答跨域：当前页面中的某个接口请求的地址和当前页面的地址如果协议、域名、端口其中有一项不同，就说该接口跨域了。
跨域限制的原因：浏览器为了保证网页的安全，出的同源协议策略。

跨域报错信息：

跨域解决方案
cors：目前最常用的一种解决办法，通过设置后端允许跨域实现。
res.setHeader('Access-Control-Allow-Origin', '\*');
res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS, POST");
node中间件、nginx反向代理：跨域限制的时候浏览器不能跨域访问服务器，node中间件和nginx反向代理，都是让请求发给代理服务器，静态页面面和代理服务器是同源的，然后代理服务器再向后端服务器发请求，服务器和服务器之间不存在同源限制。
JSONP：利用的原理是script标签可以跨域请求资源，将回调函数作为参数拼接在url中。后端收到请求，调用该回调函数，并将数据作为参数返回去，注意设置响应头返回文档类型，应该设置成javascript。
postmessage：H5新增API，通过发送和接收API实现跨域通信。
加分回答
跨域场景：前后端分离式开发、调用第三方接口

## 6，**说一说BFC**

得分点

块级格式化上下文、独立的渲染区域、不会影响边界以外的元素、形成BFC条件、float、position、overflow、display

标准回答

BFC(Block Formatting Context)块级格式化上下文，是Web页面一块独立的渲染区域，内部元素的渲染不会影响边界以外的元素。

BFC布局规则 -内部盒子会在垂直方向，一个接一个地放置。 -Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。 -每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。 -BFC的区域不会与float box重叠。 -BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。 -计算BFC的高度时，浮动元素也参与计算。

BFC形成的条件 -`float `设置成 `left `或 `right` -`position `是`absolute`或者`fixed` -`overflow `不是`visible`，为 `auto`、`scroll`、`hidden` -`display`是`flex`或者`inline-block` 等 BFC解决能的问题：清除浮动

加分回答

BFC的方式都能清除浮动，但是常使用的清除浮动的BFC方式只有`overflow:hidden`,原因是使用float或者position方式清除浮动，虽然父级盒子内部浮动被清除了，但是父级本身又脱离文档流了，会对父级后面的兄弟盒子的布局造成影响。如果设置父级为`display:flex`，内部的浮动就会失效。所以通常只是用`overflow: hidden`清除浮动。

IFC（Inline formatting contexts）：内联格式上下文。IFC的高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)，IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。

GFC（GrideLayout formatting contexts）：网格布局格式化上下文。当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域。

FFC（Flex formatting contexts）：自适应格式上下文。display值为flex或者inline-flex的元素将会生成自适应容器。

## 7，**说一说Vuex是什么，每个属性是干嘛的，如何使用 ？**

得分点

state、mutations、getters、actions、module、store.commit、store.dispatch

标准回答

Vuex是集中管理项目公共数据的。Vuex 有state、mutations 、getters、actions、module属性。

state 属性用来存储公共管理的数据。

mutations 属性定义改变state中数据的方法， 注意：不要在mutation中的方法中写异步方法ajax，那样数据就不可跟踪了 。

getters 属性可以认为是定义 store 的计算属性。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

action属性类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。

moudle属性是将store分割成模块。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块，从上至下进行同样方式的分割

使用方法： state ：直接以对象方式添加属性 mutations ：通过`store.commit`调用 action：通过 `store.dispatch` 方法触发 getters：直接通过store.getters.调用

加分回答

可以使用mapState、mapMutations、mapAction、mapGetters一次性获取每个属性下对应的多个方法。 VueX在大型项目中比较常用，非关系组件传递数据比较方便。

## 8，**说一说JavaScript有几种方法判断变量的类型？**

得分点

typeof、instanceof、Object.prototype.toString.call()（对象原型链判断方法）、 constructor (用于引用数据类型)

标准回答

JavaScript有4种方法判断变量的类型，分别是typeof、instanceof、Object.prototype.toString.call()（对象原型链判断方法）、 constructor (用于引用数据类型)

typeof：常用于判断基本数据类型，对于引用数据类型除了function返回’function‘，其余全部返回’object'。

instanceof：主要用于区分引用数据类型，检测方法是检测的类型在当前实例的原型链上，用其检测出来的结果都是true，不太适合用于简单数据类型的检测，检测过程繁琐且对于简单数据类型中的undefined, null, symbol检测不出来。

constructor：用于检测引用数据类型，检测方法是获取实例的构造函数判断和某个类是否相同，如果相同就说明该数据是符合那个数据类型的，这种方法不会把原型链上的其他类也加入进来，避免了原型链的干扰。

Object.prototype.toString.call()：适用于所有类型的判断检测，检测方法是Object.prototype.toString.call(数据) 返回的是该数据类型的字符串。

这四种判断数据类型的方法中，各种数据类型都能检测且检测精准的就是Object.prototype.toString.call()这种方法。

加分回答

instanceof的实现原理：验证当前类的原型prototype是否会出现在实例的原型链**proto**上，只要在它的原型链上，则结果都为true。因此，`instanceof` 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 `prototype`，找到返回true，未找到返回false。

Object.prototype.toString.call()原理：Object.prototype.toString 表示一个返回对象类型的字符串，call()方法可以改变this的指向，那么把Object.prototype.toString()方法指向不同的数据类型上面，返回不同的结果

## 9，**说一说样式优先级的规则是什么？**

得分点

`!important`、行内样式、嵌入样式、外链样式、id选择器、类选择器、标签选择器、复合选择器、通配符、继承样式

标准回答

CSS样式的优先级应该分成四大类

第一类`!important`，无论引入方式是什么，选择器是什么，它的优先级都是最高的。

第二类引入方式，行内样式的优先级要高于嵌入和外链，嵌入和外链如果使用的选择器相同就看他们在页面中插入的顺序，在后面插入的会覆盖前面的。

第三类选择器，选择器优先级：id选择器>（类选择器 | 伪类选择器 | 属性选择器 ）> （后代选择器 | 伪元素选择器 ）> （子选择器 | 相邻选择器） > 通配符选择器 。

第四类继承样式，是所有样式中优先级比较低的。

第五类浏览器默认样式优先级最低。

加分回答

使用!important要谨慎

一定要优先考虑使用样式规则的优先级来解决问题而不是 `!important`

只有在需要覆盖全站或外部 CSS 的特定页面中使用 `!important`

永远不要在你的插件中使用 `!important`

永远不要在全站范围的 CSS 代码中使用 `!important` 优先级的比较指的是相同的样式属性，不同样式属性优先级比较失效，比如：在设置`max-width`时注意，已经给元素的`max-width`设置了`!important`但是还不生效，很有可能就是被width覆盖了 举例：`div`最终的宽度还是`200px` div { max-width: 400px !important; height: 200px;background-color: tomato; width: 200px; }

## 10，**说一说JS实现异步的方法？**

得分点

回调函数、事件监听、setTimeout、Promise、生成器Generators/yield、async/await

标准回答

所有异步任务都是在同步任务执行结束之后，从任务队列中依次取出执行。 回调函数是异步操作最基本的方法，

比如AJAX回调，回调函数的优点是简单、容易理解和实现，缺点是不利于代码的阅读和维护，各个部分之间高度耦合，使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况），而且每个任务只能指定一个回调函数。此外它不能使用 try catch 捕获错误，不能直接 return Promise包装了一个异步调用并生成一个Promise实例，当异步调用返回的时候根据调用的结果分别调用实例化时传入的resolve 和 reject方法，then接收到对应的数据，做出相应的处理。

Promise不仅能够捕获错误，而且也很好地解决了回调地狱的问题，缺点是无法取消 Promise，错误需要通过回调函数捕获。

Generator 函数是 ES6 提供的一种异步编程解决方案，Generator 函数是一个状态机，封装了多个内部状态，可暂停函数, yield可暂停，next方法可启动，每次返回的是yield后的表达式结果。优点是异步语义清晰，缺点是手动迭代`Generator` 函数很麻烦，实现逻辑有点绕

async/await是基于Promise实现的，async/await使得异步代码看起来像同步代码，所以优点是，使用方法清晰明了，缺点是awt 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 awt 会导致性能上的降低，代码没有依赖性的话，完全可以使用 Promise.all 的方式。

加分回答

JS 异步编程进化史：callback -> promise -> generator/yield -> async/awt。 async/awt函数

对 Generator 函数的改进，

体现在以下三点：

内置执行器。 Generator 函数的执行必须靠执行器，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。

更广的适用性。 yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 awt 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

更好的语义。 async 和 awt，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，awt 表示紧跟在后面的表达式需要等待结果。 目前使用很广泛的就是promise和async/await

## 11，**说一说Vue2.0 双向绑定的原理与缺陷？**

得分点

Object.defineProperty、getter、setter

标准回答

Vue响应式指的是：组件的data发生变化，立刻触发视图的更新

原理： Vue 采用数据劫持结合发布者-订阅者模式的方式来实现数据的响应式，通过Object.defineProperty来劫持数据的setter，getter，在数据变动时发布消息给订阅者，订阅者收到消息后进行相应的处理。 通过原生js提供的监听数据的API，当数据发生变化的时候，在回调函数中修改dom

核心API：Object.defineProperty

Object.defineProperty API的使用

作用: 用来定义对象属性 特点： 默认情况下定义的数据的属性不能修改 描述属性和存取属性不能同时使用，使用会报错

响应式原理： 获取属性值会触发getter方法 设置属性值会触发setter方法 在setter方法中调用修改dom的方法

加分回答

Object.defineProperty的缺点

\1. 一次性递归到底开销很大，如果数据很大，大量的递归导致调用栈溢出

\2. 不能监听对象的新增属性和删除属性

\3. 无法正确的监听数组的方法，当监听的下标对应的数据发生改变时

## 12，**说一说数组去重都有哪些方法？**

得分点

对象属性、new Set()、indexOf、hasOwnProperty、reduce+includes、filter

标准回答

第一种方法：利用对象属性key排除重复项：遍历数组，每次判断对象中是否存在该属性，不存在就存储在新数组中，并且把数组元素作为key，设置一个值，存储在对象中，最后返回新数组。这个方法的优点是效率较高，缺点是占用了较多空间，使用的额外空间有一个查询对象和一个新的数组

第二种方法：利用Set类型数据无重复项：new 一个 Set，参数为需要去重的数组，Set 会自动删除重复的元素，再将 Set 转为数组返回。这个方法的优点是效率更高，代码简单，思路清晰，缺点是可能会有兼容性问题

第三种方法：filter+indexof 去重：这个方法和第一种方法类似，利用 Array 自带的 filter 方法，返回 arr.indexOf(num) 等于 index 的num。原理就是 indexOf 会返回最先找到的数字的索引，假设数组是 [1, 1]，在对第二个1使用 indexOf 方法时，返回的是第一个1的索引0。这个方法的优点是可以在去重的时候插入对元素的操作，可拓展性强。

第四种方法：这个方法比较巧妙，从头遍历数组，如果元素在前面出现过，则将当前元素挪到最后面，继续遍历，直到遍历完所有元素，之后将那些被挪到后面的元素抛弃。这个方法因为是直接操作数组，占用内存较少。

第五种方法：reduce +includes去重：这个方法就是利用reduce遍历和传入一个空数组作为去重后的新数组，然后内部判断新数组中是否存在当前遍历的元素，不存在就插入到新数组中。这种方法时间消耗多，内存空间也有额外占用。 方法还有很多，常用的、了解的这些就可以

加分回答

以上五个方法中，在数据低于10000条的时候没有明显的差别，高于10000条，第一种和第二种的时间消耗最少，后面三种时间消耗依次增加，由于第一种内存空间消耗比较多，且现在很多项目不再考虑低版本浏览器的兼容性问题，所以建议使用第二种去重方法，简洁方便。

## 13，**说一说null 和 undefined 的区别，如何让一个属性变为null**

得分点

操作的变量没有被赋值、全局对象的一个属性、函数没有return返回值、值 `null` 特指对象的值未设置 undefined == null、undefined !== null

标准回答

undefind 是全局对象的一个属性，当一个变量没有被赋值或者一个函数没有返回值或者某个对象不存在某个属性却去访问或者函数定义了形参但没有传递实参，这时候都是undefined。

undefined通过typeof判断类型是'undefined'。undefined == undefined undefined === undefined 。

null代表对象的值未设置，相当于一个对象没有设置指针地址就是null。null通过typeof判断类型是'object'。null === null null == null null == undefined null !== undefined undefined 表示一个变量初始状态值，而 null 则表示一个变量被人为的设置为空对象，而不是原始状态。在实际使用过程中，不需要对一个变量显式的赋值 undefined，当需要释放一个对象时，直接赋值为 null 即可。 让一个变量为null，直接给该变量赋值为null即可。

加分回答

null 其实属于自己的类型 Null，而不属于Object类型，typeof 之所以会判定为 Object 类型，是因为JavaScript 数据类型在底层都是以二进制的形式表示的，二进制的前三位为 0 会被 typeof 判断为对象类型，而 null 的二进制位恰好都是 0 ，因此，null 被误判断为 Object 类型。 对象被赋值了null 以后，对象对应的堆内存中的值就是游离状态了，GC 会择机回收该值并释放内存。因此，需要释放某个对象，就将变量设置为 null，即表示该对象已经被清空，目前无效状态。

## 14，**说一下浮动？**

得分点

脱离文档流、盒子塌陷、 影响其他元素排版、伪元素 、`overflow:hidden` 、标签插入法

标准回答

浮动的作用，设置浮动的图片，可以实现文字环绕图片，设置了浮动的块级元素可以排列在同一行，设置了浮动的行内元素可以设置宽高，同时可以按照浮动设置的方向对齐排列盒子。

设置浮动元素的特点：

设置了浮动，该元素脱标。元素不占位置

浮动可以进行模式转换（行内块元素） 浮动造成的影响，使盒子脱离文档流，如果父级盒子没有设置高度，需要被子盒子撑开，那么这时候父级盒子的高度就塌陷了，同时也会造成父级盒子后面的兄弟盒子布局受到影响。如果浮动元素后面还有其他兄弟元素，其他兄弟元素的布局也会受到影响。

清除浮动的方法：

伪元素清除浮动：给浮动元素父级增加 .clearfix::after { content: ''; display: table; clear: both; } /_兼容IE低版本 _/ .clearfix { \*zoom: 1; } overflow：hidden`：给浮动元素父级增加`overflow：hidden`属性

额外标签法：给浮动元素父级增加标签

加分回答 三种清除浮动的特点和影响 -伪元素清除浮动：不会新增标签，不会有其他影响，是当下清除浮动最流行的方法 -`overflow：hidden`：不会新增标签，但是如果父级元素有定位元素超出父级，超出部分会隐藏，在不涉及父级元素有超出内容的情况，overflow：hidden比较常用，毕竟写法方便简洁 -标签插入法：清除浮动的语法加在新增标签上，由于新增标签会造成不必要的渲染，所以这种方法目前不建议使用

## 15，**说一说es6中箭头函数？**

得分点

没有this、this是从外部获取、不能使用new、没有arguments、没有原型和super

标准回答

箭头函数相当于匿名函数，简化了函数定义。

箭头函数有两种写法，当函数体是单条语句的时候可以省略{}和return。另一种是包含多条语句，不可以省略{}和return。

箭头函数最大的特点就是没有this，所以this是从外部获取，就是继承外部的执行上下文中的this，由于没有this关键字所以箭头函数也不能作为构造函数， 同时通过 `call()` 或 `apply()` 方法调用一个函数时，只能传递参数（不能绑定this），第一个参数会被忽略。

箭头函数也没有原型和super。不能使用yield关键字，因此箭头函数不能用作 Generator 函数。不能返回直接对象字面量。

加分回答

箭头函数的不适用场景：

定义对象上的方法 当调用` dog.jumps` 时，`lives` 并没有递减。因为 `this` 没有绑定值，而继承父级作用域。 var dog = { lives: 20, jumps: () => { this.lives--; } }

不适合做事件处理程序 此时触发点击事件，this不是button，无法进行class切换 var button = document.querySelector('button'); button.addEventListener('click', () => { this.classList.toggle('on'); });

箭头函数函数适用场景：

简单的函数表达式，内部没有this引用，没有递归、事件绑定、解绑定，适用于map、filter等方法中，写法简洁 var arr = [1,2,3]; var newArr = arr.map((num)=>num\*num)

内层函数表达式，需要调用this，且this应与外层函数一致时

```js
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],
  showList() {
    this.students.forEach((student) => alert(this.title + ": " + student))
  }
}
group.showList()
```

## 16，**说一说call apply bind的作用和区别？**

得分点

bind改变this指向不直接调用、call和apply改变this指向直接调用、apply接收第二个参数为数组 、call用于对象的继承 、伪数组转换成真数组、apply用于找出数组中的最大值和最小值以及数组合并、bind用于vue或者react框架中改变函数的this指向

标准回答

call、apply、bind的作用都是改变函数运行时的this指向。

bind和call、apply在使用上有所不同，bind在改变this指向的时候，返回一个改变执行上下文的函数，不会立即执行函数，而是需要调用该函数的时候再调用即可，但是call和apply在改变this指向的同时执行了该函数。

bind只接收一个参数，就是this指向的执行上文。 call、apply接收多个参数，第一个参数都是this指向的执行上文，后面的参数都是作为改变this指向的函数的参数。但是call和apply参数的格式不同，call是一个参数对应一个原函数的参数，但是apply第二个参数是数组，数组中每个元素代表函数接收的参数，数组有几个元素函数就接收几个元素。

加分回答

call的应用场景： 对象的继承，在子构造函数这种调用父构造函数，但是改变this指向，就可以继承父的属性

```js
function superClass() {
  this.a = 1
  this.print = function () {
    console.log(this.a)
  }
}

function subClass() {
  superClass.call(this) // 执行superClass，并将superClass方法中的this指向subClass this.print();
}
subClass()
```

借用Array原型链上的slice方法，把伪数组转换成真数组

```js
let domNodes = Array.prototype.slice.call(document.getElementsByTagName("div"))
```

apply的应用场景： Math.max，获取数组中最大、最小的一项

```js
let max = Math.max.apply(null, array)
let min = Math.min.apply(null, array)
//实现两个数组合并
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
Array.prototype.push.apply(arr1, arr2)
console.log(arr1) // [1, 2, 3, 4, 5, 6]
```

bind的应用场景 在vue或者react框架中，使用bind将定义的方法中的this指向当前类

## 17，**说一说HTML语义化？**

得分点

语义化标签、利于页面内容结构化、利于无CSS页面可读、利于SEO、利于代码可读 标准回答 HTML语义化就是指在使用HTML标签构建页面时，避免大篇幅的使用无语义的标签

## 18，**说一说this指向（普通函数、箭头函数）？**

得分点

全局执行上下文、函数执行上下文、this严格模式下undefined、非严格模式window、构造函数新对象本身、普通函数不继承this、箭头函数无this，可继承

标准回答

this关键字由来：在对象内部的方法中使用对象内部的属性是一个非常普遍的需求。但是 JavaScript 的作用域机制并不支持这一点，基于这个需求，JavaScript 又搞出来另外一套 this 机制。

this存在的场景有三种全局执行上下文和函数执行上下文和eval执行上下文，eval这种不讨论。

在全局执行环境中无论是否在严格模式下，（在任何函数体外部）`this` 都指向全局对象。

在函数执行上下文中访问this，函数的调用方式决定了 `this` 的值。

在全局环境中调用一个函数，函数内部的 this 指向的是全局变量 window，通过一个对象来调用其内部的一个方法，该方法的执行上下文中的 this 指向对象本身。

普通函数this指向：当函数被正常调用时，在严格模式下，this 值是 undefined，非严格模式下 this 指向的是全局对象 window；通过一个对象来调用其内部的一个方法，该方法的执行上下文中的 this 指向对象本身。

new 关键字构建好了一个新对象，并且构造函数中的 this 其实就是新对象本身。嵌套函数中的 this 不会继承外层函数的 this 值。

箭头函数this指向：箭头函数并不会创建其自身的执行上下文，所以箭头函数中的 this 取决于它的外部函数。

加分回答

箭头函数因为没有this，所以也不能作为构造函数，但是需要继承函数外部this的时候，使用箭头函数比较方便

```js
var myObj = {
  name: "闷倒驴",
  showThis: function () {
    console.log(this) // myObj
    var bar = () => {
      this.name = "王美丽"
      console.log(this) // myObj
    }
    bar()
  }
}
myObj.showThis()
console.log(myObj.name) // "王美丽"
console.log(window.name) // ''
```

## 19，**说一说CSS尺寸设置的单位**

得分点

px、rem、em、vw、vh

标准回答

px：pixel像素的缩写，绝对长度单位，它的大小取决于屏幕的分辨率，是开发网页中常常使用的单位。

em：相对长度单位，在 `font-size` 中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小，如 width。如当前元素的字体尺寸未设置，由于字体大小可继承的原因，可逐级向上查找，最终找不到则相对于浏览器默认字体大小。

rem：相对长度单位，相对于根元素的字体大小，根元素字体大小未设置，使用浏览器默认字体大小。

vw：相对长度单位，相对于视窗宽度的1%。

vh：相对长度单位，相对于视窗高度的1%。

加分回答

rem应用：在移动端网页开发中，页面要做成响应式的，可使用rem配合媒体查询或者flexible.js实现。原理是通过媒体查询或者flexible.js，能够在屏幕尺寸发生改变时，重置html根元素的字体大小，页面中的元素都是使用rem为单位设置的尺寸，因此只要改变根元素字体大小，页面中的其他元素的尺寸就自动跟着修改

vw应用：由于vw被更多浏览器兼容之后，在做移动端响应式页面时，通常使用vw配合rem。原理是使用vw设置根元素html字体的大小，当窗口大小发生改变，vw代表的尺寸随着修改，无需加入媒体查询和flexible.js，页面中的其他元素仍使用rem为单位，就可实现响应式。

## 20，**说几个未知宽高元素水平垂直居中方法**

```
position` `transform` `flex` `justify-content` `align-items` `vertical-align` `text-align
```

标准回答
未知宽高元素水平垂直都居中的实现方法：
\1. 设置元素相对父级定位`position:absolute;left:50%;right:50%`，让自身平移自身高度50% `transform: translate(-50%,-50%);`，这种方式兼容性好，被广泛使用的一种方式
\2. 设置元素的父级为弹性盒子`display:flex`，设置父级和盒子内部子元素水平垂直都居中`justify-content:center; align-items:center` ，这种方式代码简洁，但是兼容性ie 11以上支持，由于目前ie版本都已经很高，很多网站现在也使用这种方式实现水平垂直居中
\3. 设置元素的父级为网格元素`display: grid`，设置父级和盒子内部子元素水平垂直都居中`justify-content:center; align-items:center` ，这种方式代码简介，但是兼容性ie 10以上支持
\4. 设置元素的父级为表格元素`display: table-cell`，其内部元素水平垂直都居中`text-align: center;vertical-align: middle;` ，设置子元素为行内块`display: inline-block; `，这种方式兼容性较好

## 21，**说一说JS变量提升？**

得分点

Var声明的变量声明提升、函数声明提升、let和const变量不提升

标准回答

变量提升是指JS的变量和函数声明会在代码编译期，提升到代码的最前面。 变量提升成立的前提是使用Var关键字进行声明的变量，并且变量提升的时候只有声明被提升，赋值并不会被提升，同时函数的声明提升会比变量的提升优先。 变量提升的结果，可以在变量初始化之前访问该变量，返回的是undefined。在函数声明前可以调用该函数。 加分回答 使用let和const声明的变量是创建提升，形成暂时性死区，在初始化之前访问let和const创建的变量会报错。

## 22，**说一说** **HashRouter 和 HistoryRouter的区别和原理？**

得分点

```
#` `window.onhashchange` `history.pushState ` `window.onpopstate
```

标准回答

HashRouter和 HistoryRouter的区别：

\1. history和hash都是利用浏览器的两种特性实现前端路由，history是利用浏览历史记录栈的API实现，hash是监听location对象hash值变化事件来实现

\2. history的url没有'#'号，hash反之

\3. 相同的url，history会触发添加到浏览器历史记录栈中，hash不会触发，history需要后端配合，如果后端不配合刷新新页面会出现404，hash不需要。

HashRouter的原理：通过`window.onhashchange`方法获取新URL中hash值，再做进一步处理

HistoryRouter的原理：通过`history.pushState `使用它做页面跳转不会触发页面刷新，使用`window.onpopstate` 监听浏览器的前进和后退，再做其他处理 加分回答 hash模式下url会带有#，需要url更优雅时，可以使用history模式。 需要兼容低版本的浏览器时，建议使用hash模式。 需要添加任意类型数据到记录时，可以使用history模式

## 23，**说一说map 和 forEach 的区别？**

得分点

map创建新数组、map返回处理后的值、forEach()不修改原数组、forEach()方法返回undefined

标准回答

map 和 forEach 的区别：map有返回值，可以开辟新空间，return出来一个length和原数组一致的数组，即便数组元素是undefined或者是null。

forEach默认无返回值，返回结果为undefined，可以通过在函数体内部使用索引修改数组元素。

加分回答

map的处理速度比forEach快，而且返回一个新的数组，方便链式调用其他数组新方法，比如filter、reduce

```js
let arr = [1, 2, 3, 4, 5]
let arr2 = arr.map((value) => value * value).filter((value) => value > 10) // arr2 = [16, 25]
```

## 24，**说一说事件循环Event loop，宏任务与微任务？**

得分点

任务挂起、同步任务执行结束执行队列中的异步任务、执行script标签内部代码、setTimeout/setInterval、ajax请、postMessageMessageChannel、setImmediate、I/O（Node.js）Promise、MutonObserver、Object.observe、process.nextTick（Node.js）每个宏任务中都包含了一个微任务队列

标准回答

浏览器的事件循环：执行js代码的时候，遇见同步任务，直接推入调用栈中执行，遇到异步任务，将该任务挂起，等到异步任务有返回之后推入到任务队列中，当调用栈中的所有同步任务全部执行完成，将任务队列中的任务按顺序一个一个的推入并执行，重复执行这一系列的行为。

异步任务又分为宏任务和微任务。

宏任务：任务队列中的任务称为宏任务，每个宏任务中都包含了一个微任务队列。

微任务：等宏任务中的主要功能都完成后，渲染引擎不急着去执行下一个宏任务，而是执行当前宏任务中的微任务

宏任务包含：执行script标签内部代码、setTimeout/setInterval、ajax请、postMessageMessageChannel、setImmediate，I/O（Node.js）

微任务包含：Promise、MutonObserver、Object.observe、process.nextTick（Node.js）

加分回答

浏览器和Node 环境下，microtask 任务队列的执行时机不同

Node端，microtask 在事件循环的各个阶段之间执行

浏览器端，microtask 在事件循环的 macrotask 执行完之后执行

## 25，**说一说Vue3.0 实现数据双向绑定的方法 ？**

得分点

Proxy、数据拦截、劫持整个对象、返回一个新对象、有13种劫持

标准回答

Vue3.0 是通过Proxy实现的数据双向绑定，Proxy是ES6中新增的一个特性，实现的过程是在目标对象之前设置了一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

用法： ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

```js
var proxy = new Proxy(target, handler)
```

target: 是用Proxy包装的被代理对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

handler: 是一个对象，其声明了代理target 的一些操作，其属性是当执行一个操作时定义代理的行为的函数。

加分回答

`Object.defineProperty` 的问题：在Vue中，`Object.defineProperty`无法监控到数组下标的变化，导致直接通过数组的下标给数组设置值，不能实时响应。目前只针对以上方法做了hack处理，所以数组属性是检测不到的，有局限性Object.defineProperty只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。Vue里，是通过递归以及遍历data对象来实现对数据的监控的，如果属性值也是对象那么需要深度遍历,显然如果能劫持一个完整的对象，不管是对操作性还是性能都会有一个很大的提升。

Proxy的两个优点：可以劫持整个对象，并返回一个新对象，有13种劫持

## 26，**说一下Diff算法？**

得分点

patch、patchVnode、updateChildren、vue优化时间复杂度为O(n)

标准回答

Diff算法比较过程

第一步：patch函数中对新老节点进行比较 如果新节点不存在就销毁老节点 如果老节点不存在，直接创建新的节点 当两个节点是相同节点的时候，进入 patctVnode 的过程，比较两个节点的内部

第二步：patchVnode函数比较两个虚拟节点内部 如果两个虚拟节点完全相同，返回 当前vnode 的children 不是textNode，再分成三种情况 - 有新children，没有旧children，创建新的 - 没有新children，有旧children，删除旧的 - 新children、旧children都有，执行`updateChildren`比较children的差异，这里就是diff算法的核心 当前vnode 的children 是textNode，直接更新text

第三步：updateChildren函数子节点进行比较 - 第一步 头头比较。若相似，旧头新头指针后移（即 `oldStartIdx++` && `newStartIdx++`），真实dom不变，进入下一次循环；不相似，进入第二步。 - 第二步 尾尾比较。若相似，旧尾新尾指针前移（即 `oldEndIdx--` && `newEndIdx--`），真实dom不变，进入下一次循环；不相似，进入第三步。 - 第三步 头尾比较。若相似，旧头指针后移，新尾指针前移（即 `oldStartIdx++` && `newEndIdx--`），未确认dom序列中的头移到尾，进入下一次循环；不相似，进入第四步。

第四步 尾头比较。若相似，旧尾指针前移，新头指针后移（即 `oldEndIdx--` && `newStartIdx++`），未确认dom序列中的尾移到头，进入下一次循环；不相似，进入第五步。

第五步 若节点有key且在旧子节点数组中找到sameVnode（tag和key都一致），则将其dom移动到当前真实dom序列的头部，新头指针后移（即 `newStartIdx++`）；否则，vnode对应的dom（`vnode[newStartIdx].elm`）插入当前真实dom序列的头部，新头指针后移（即 `newStartIdx++`）。

但结束循环后，有两种情况需要考虑： - 新的字节点数组（newCh）被遍历完（`newStartIdx > newEndIdx`）。那就需要把多余的旧dom（`oldStartIdx -> oldEndIdx`）都删除，上述例子中就是`c,d`； - 新的字节点数组（oldCh）被遍历完（`oldStartIdx > oldEndIdx`）。那就需要把多余的新dom（`newStartIdx -> newEndIdx`）都添加。

## 27，**说一说三栏布局的实现方案?**

得分点

圣杯布局、双飞翼布局、三栏高度不定、中间栏内容多先渲染

标准回答

三栏布局，要求左右两边盒子宽度固定，中间盒子宽度自适应，盒子的高度都是随内容撑高的，一般都是中间盒子内容较多，为了保证页面渲染快，在写结构的时候，需要把中间盒子放在左右盒子的前面。

实现三栏布局的方法通常是圣杯布局和双飞翼布局。

圣杯布局的实现方案：三个元素放在同一个父级元素中，代表中间盒子的元素放在最前面，父级盒子设置左右`padding`，三个盒子全部浮动，设置中间盒子宽度100%，左右盒子设置固定宽度，设置左边盒子左边距-100%同时相对自身定位，右边平移自身宽度，右边盒子设置右边距-自身宽度，最后设置父级盒子清除浮动，否则父级盒子的高度无法被撑开 双

飞翼布局的实现方案：三个盒子对应三个元素，其中中间盒子套了两层，中间盒子内部盒子设置`margin`,三个盒子全部浮动，设置中间盒子宽度100%，左右盒子设置固定宽度,设置左边盒子左边距-100%,右边盒子设置右边距-自身宽度，最后设置父级盒子清除浮动，否则父级盒子的高度无法被撑开

加分回答

圣杯布局: - 优点：不需要添加dom节点 - 缺点：正常情况下是没有问题的，但是特殊情况下就会暴露此方案的弊端，当middle部分的宽小于left部分时就会发生布局混乱。 双飞翼布局： - 优点：不会像圣杯布局那样变形，CSS样式代码更简洁 - 缺点：多加了一层dom节点

## 28，**说一下浏览器垃圾回收机制？**

得分点

栈垃圾回收、堆垃圾回收、新生区老生区、Scavenge算法、标记-清除算法、标记-整理算法、全停顿、增量标记

标准回答

浏览器垃圾回收机制根据数据的存储方式分为栈垃圾回收和堆垃圾回收。 栈垃圾回收的方式非常简便，当一个函数执行结束之后，JavaScript 引擎会通过向下移动 ESP 来销毁该函数保存在栈中的执行上下文，遵循先进后出的原则。

堆垃圾回收，当函数直接结束，栈空间处理完成了，但是堆空间的数据虽然没有被引用，但是还是存储在堆空间中，需要垃圾回收器将堆空间中的垃圾数据回收。为了使垃圾回收达到更好的效果，根据对象的生命周期不一样，使用不同的垃圾回收的算法。在 V8 中会把堆分为新生代和老生代两个区域，新生代中存放的是生存时间短的对象，老生代中存放的生存时间久的对象。新生区中使用Scavenge算法，老生区中使用标记-清除算法和标记-整理算法。

加分回答 Scavenge算法：

\1. 标记：对对象区域中的垃圾进行标记

\2. 清除垃圾数据和整理碎片化内存：副垃圾回收器会把这些存活的对象复制到空闲区域中，并且有序的排列起来，复制后空闲区域就没有内存碎片了

\3. 角色翻转：完成复制后，对象区域与空闲区域进行角色翻转，也就是原来的对象区域变成空闲区域，原来的空闲区域变成了对象区域，这样就完成了垃圾对象的回收操作，同时这种角色翻转的操作还能让新生代中的这两块区域无限重复使用下去

标记-清除算法：

\1. 标记：标记阶段就是从一组根元素开始，递归遍历这组根元素，在这个遍历过程中，能到达的元素称为活动对象，没有到达的元素就可以判断为垃圾数据。

\2. 清除：将垃圾数据进行清除。

\3. 产生内存碎片：对一块内存多次执行标记 - 清除算法后，会产生大量不连续的内存碎片。而碎片过多会导致大对象无法分配到足够的连续内存。

标记-整理算法

\1. 标记：和标记 - 清除的标记过程一样，从一组根元素开始，递归遍历这组根元素，在这个遍历过程中，能到达的元素标记为活动对象。

\2. 整理：让所有存活的对象都向内存的一端移动

\3. 清除：清理掉端边界以外的内存 V8 是使用副垃圾回收器和主垃圾回收器处理垃圾回收的，不过由于 JavaScript 是运行在主线程之上的，一旦执行垃圾回收算法，都需要将正在执行的 JavaScript 脚本暂停下来，待垃圾回收完毕后再恢复脚本执行。我们把这种行为叫做全停顿。 为了降低老生代的垃圾回收而造成的卡顿，V8 将标记过程分为一个个的子标记过程，同时让垃圾回收标记和 JavaScript 应用逻辑交替进行，直到标记阶段完成，我们把这个算法称为增量标记（Incremental Marking）算法

## 29，**说一说** **vue 的 keep-alive ？**

得分点

缓存组件、条件缓存、路由配合条件缓存、不重新加载、activated、deactivated

标准回答

`<keep-alive>`作用：缓存组件，提升性能，避免重复加载一些不需要经常变动且内容较多的组件。 `<keep-alive>`的使用方法：使用`<keep-alive>`标签对需要缓存的组件进行包裹，默认情况下被`<keep-alive>`标签包裹的组件都会进行缓存，

区分被包裹的组件是否缓存有两种方法，

第一种是给keepalive 添加属性，组件名称指的是具体组件添加的name，不是路由里面的name。

include 包含的组件(可以为字符串，数组，以及正则表达式,只有匹配的组件会被缓存)。

exclude 排除的组件(以为字符串，数组，以及正则表达式,任何匹配的组件都不会被缓存)。第二种也是最常用的一种是，和路由配合使用：在路由中添加meta属性。

使用keepalive导致组件不重新加载，也就不会重新执行生命周期的函数，如果要解决这个问题，就需要两个属性进入时触发：activated 退出时触发：deactivated

加分回答

`<keep-alive>`适用的场景：首页展示固定数据的组件，比如banner九宫格</keep-alive></keep-alive></keep-alive></keep-alive></keep-alive>

## 30，**CSRF攻击是什么？**

得分点

CSRF时跨站请求伪造、盗用用户身份发起请求

标准回答

CSRF跨站点请求伪造（Cross Site Request Forgery）和XSS攻击一样，有巨大的危害性，就是攻击者盗用了用户的身份，以用户的身份发送恶意请求，但是对服务器来说这个请求是合理的，这样就完成了攻击者的目标。

CSRF攻击的过程原理是：

用户打开浏览器，访问目标网站A，输入用户名和密码请求登录 - 用户信息在通过认证后，网站A产生一个cookie信息返回给浏览器，这个时候用户以可正常发送请求到网站A - 用户在没有退出网站A之前在同一个浏览器打开了另一个新网站B。 - 新网站B收到用户请求之后返回一些攻击代码，并发出一个请求要求访问返回cookie的网站A - 浏览器收到这些攻击性代码之后根据新网站B的请求在用户不知道的情况下以用户的权限操作了cookie并向网站A服务器发起了合法的请求。

预防CSRF攻击主要有以下策略：

1. 使用验证码，在表单中添加一个随机的数字或者字母验证码，强制要求用户和应用进行直接的交互。

2. HTTP中Referer字段，检查是不是从正确的域名访问过来，它记录了HTTP请求的来源地址。

3. 使用token验证，在HTTP请求头中添加token字段，并且在服务器端建立一个拦截器验证这个token，如果token不对，就拒绝这个请求。

加分回答

验证HTTP Referer字段的好处就是实施起来特别简单，普通的网站开发不需要特别担心CSRF漏洞，只需要在最后面设置一个拦截器来验证referer的值就可以了，不需要改变已有的代码逻辑，非常便捷。但是这个方法也不是万无一失的，虽然referer是浏览器提供的，但是不同的浏览器可能在referer的实现上或多或少有自身的漏洞，所以使用referer的安全保证是通过浏览器实现的。使用token验证的方法要比referer更安全一些，需要把token放在一个HTTP自定义的请求头部中，解决了使用get或者post传参的不便性。

## 31，**XSS攻击是什么？**

得分点

XSS是跨站脚本攻击、向目标网站插入恶意代码、大量用户访问网站时运行恶意脚本获取信息

标准回答

XSS是跨站脚本攻击(Cross Site Scripting)，不写为CSS是为了避免和层叠样式表（Cascading Style Sheets）的缩写混淆，所以将跨站脚本攻击写为XSS。

攻击者可以通过向Web页面里面插入script代码，当用户浏览这个页面时，就会运行被插入的script代码，达到攻击者的目的。XSS的危害一般是泄露用户的登录信息cookie，攻击者可以通过cookie绕过登录步骤直接进入站点。

XSS的分类分为反射型和存储型。

反射型就是临时通过url访问网站，网站服务端将恶意代码从url中取出，拼接在HTML中返回给浏览器，用户就会执行恶意代码。

存储型就是将恶意代码以留言的形式保存在服务器数据库，任何访问网站的人都会受到攻击。预防XSS攻击的方案基本是对数据进行严格的输出编码，比如HTML元素的编码，JavaScript编码，css编码，url编码等等。

加分回答 XSS的危害

获取cookie：网站中的登录一般都是用cookie作为某个用户的身份证明，这是服务器端返回的一串字符。如果cookie被攻击者拿到，那么就可以绕过密码登录。当空间、论坛如果可以被插入script代码，那么进入空间或者论坛的人的账号就可以轻易被攻击者获取。 - 恶意跳转：直接在页面中插入window.location.href进行跳转。

XSS的分类： - 反射型XSS（非持久型XSS）：通过URL参数直接注入 - 存储型XSS（持久型XSS）：存储到数据库后读取时注入

XSS的预防： - 浏览器的防御和“X-XSS-Protection”有关，默认值为1，即默认打开XSS防御，可以防御反射型的XSS，不过作用有限，只能防御注入到HTML的节点内容或属性的XSS，例如URL参数中包含script标签。不建议只依赖此防御手段。 - 防御HTML节点内容，通过转义<为<以及>为>来实现防御HTML节点内容。 - 预防HTML属性，通过转义"->&quto来实现防御，一般不转义空格，但是这要求属性必须带引号。 - 预防JavaScript代码，通过将数据进行JSON序列化。 - 防御富文本是比较复杂的工程，因为富文本可以包含HTML和script，这些难以预测与防御，建议是通过白名单的方式来过滤允许的HTML标签和标签的属性来进行防御，大概的实现方式是： - 将HTML代码段转成树级结构的数据 - 遍历树的每一个节点，过滤节点的类型和属性，或进行特殊处理 - 处理完成后，将树级结构转化成HTML代码 - 开启浏览器XSS防御：Http Only cookie，禁止 JavaScript 读取某些敏感 Cookie，攻击者完成XSS注入后也无法窃取此 Cookie。

## 32，**说一说js继承的方法和优缺点？**

得分点

原型链继承、借用构造函数继承、组合继承、原型式继承、寄生式继承、寄生组合式继承、ES6 Class

标准回答

原型链继承：让一个构造函数的原型是另一个类型的实例，那么这个构造函数new出来的实例就具有该实例的属性，

原型链继承的。优点：写法方便简洁，容易理解。缺点：在父类型构造函数中定义的引用类型值的实例属性，会在子类型原型上变成原型属性被所有子类型实例所共享。同时在创建子类型的实例时，不能向超类型的构造函数中传递参数。

借用构造函数继承：在子类型构造函数的内部调用父类型构造函数；使用 apply() 或 call() 方法将父对象的构造函数绑定在子对象上。优点：解决了原型链实现继承的不能传参的问题和父类的原型共享的问题。缺点：借用构造函数的缺点是方法都在构造函数中定义，因此无法实现函数复用。在父类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式。

组合继承：将原型链和借用构造函数的组合到一块。使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有自己的属性。优点就是解决了原型链继承和借用构

造函数继承造成的影响。缺点是无论在什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部

原型式继承：在一个函数A内部创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的一个新实例。本质上，函数A是对传入的对象执行了一次浅复制。

ECMAScript 5通过增加Object.create()方法将原型式继承的概念规范化了。

这个方法接收两个参数：作为新对象原型的对象，以及给新对象定义额外属性的对象（第二个可选）。在只有一个参数时，Object.create()与这里的函数A方法效果相同。

优点是：不需要单独创建构造函数。缺点是：属性中包含的引用值始终会在相关对象间共享

寄生式继承：寄生式继承背后的思路类似于寄生构造函数

工厂模式：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。优点：写法简单，不需要单独创建构造函数。缺点：通过寄生式继承给对象添加函数会导致函数难以重用。

寄生组合式继承：通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。优点是：高效率只调用一次父构造函数，并且因此避免了在子原型上面创建不必要，多余的属性。与此同时，原型链还能保持不变；缺点是：代码复杂

加分回答

ES6 Class实现继承。原理：原理ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。

ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。需要注意的是，class关键字只是原型的语法糖，JavaScript继承仍然是基于原型实现的。

优点：语法简单易懂,操作更方便。缺点：并不是所有的浏览器都支持class关键字 lass Person { //调用类的构造方法 constructor(name, age) { this.name = name this.age = age } //定义一般的方法 showName() { console.log("调用父类的方法") console.log(this.name, this.age); } } let p1 = new Person('kobe', 39) console.log(p1) //定义一个子类 class Student extends Person { constructor(name, age, salary) { super(name, age)//通过super调用父类的构造方法 this.salary = salary } showName() {//在子类自身定义方法 console.log("调用子类的方法") console.log(this.name, this.age, this.salary); } } let s1 = new Student('wade', 38, 1000000000) console.log(s1) s1.showName()

## 33，**说一说defer和async区别？**

得分点

加载JS文档和渲染文档可以同时进行、JS代码立即执行、JS代码不立即执行、渲染引擎和JS引擎互斥

标准回答

浏览器会立即加载JS文件并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行 `加上async属性，加载JS文档和渲染文档可以同时进行（异步），当JS加载完成，JS代码立即执行，会阻塞HTML渲染。` 加上defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），当HTML渲染完成，才会执行JS代码。

加分回答

渲染阻塞的原因： 由于 JavaScript 是可操纵 DOM 的,如果在修改这些元素属性同时渲染界面（即 JavaScript 线程和 UI 线程同时运行）,那么渲染线程前后获得的元素数据就可能不一致了。因此为了防止渲染出现不可预期的结果,浏览器设置 GUI 渲染线程与 JavaScript 引擎为互斥的关系。当浏览器在执行 JavaScript 程序的时候,GUI 渲染线程会被保存在一个队列中,直到 JS 程序执行完成,才会接着执行。如果 JS 执行的时间过长,这样就会造成页面的渲染不连贯,导致页面渲染加载阻塞的感觉

## 34，**说一下浏览器如何渲染页面的？**

得分点

dom树、stylesheet、布局树、分层、光栅化、合成

标准回答

浏览器拿到HTML，先将HTML转换成dom树，再将CSS样式转换成stylesheet，根据dom树和stylesheet创建布局树，对布局树进行分层，为每个图层生成绘制列表，再将图层分成图块，紧接着光栅化将图块转换成位图，最后合成绘制生成页面。

加分回答

分层的目的：避免整个页面渲染，把页面分成多个图层，尤其是动画的时候，把动画独立出一个图层，渲染时只渲染该图层就ok，transform，z-index等，浏览器会自动优化生成图层 光栅化目的：页面如果很长但是可视区很小，避免渲染非可视区的样式造成资源浪费，所以将每个图层又划分成多个小个子，当前只渲染可视区附近区域

## 35，**说一说computed和watch的区别？**

得分点

computed值有缓存、触发条件是依赖值发生更改、 watch无缓存支持异步、监听数据变化

标准回答

computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；

watch： 更多的是观察的作用，支持异步，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

加分回答

computed应用场景：需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算； watch应用场景：需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

## 36，**说一说** **Vue 中 $nextTick 作用与原理？**

得分点

异步渲染、获取DOM、Promise

标准回答

Vue 在更新 DOM 时是异步执行的，在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。所以修改完数据，立即在方法中获取DOM，获取的仍然是未修改的DOM。

$nextTick的作用是：该方法中的代码会在当前渲染完成后执行，就解决了异步渲染获取不到更新后DOM的问题了。

$nextTick的原理：$nextTick本质是返回一个Promise

加分回答

应用场景：在钩子函数created()里面想要获取操作Dom，把操作DOM的方法放在$nextTick中

## 37，**说一说new会发生什么？**

得分点

创建空对象、为对象添加属性、把新对象当作this的上下文、箭头函数不能作为构造函数

标准回答

`new` 关键字会进行如下的操作：

\1. 创建一个空的简单JavaScript对象（即`{}`）；

\2. 为步骤1新创建的对象添加属性`__proto__`，将该属性链接至构造函数的原型对象 ；

\3. 将步骤1新创建的对象作为`this`的上下文 ；

\4. 如果该函数没有返回对象，则返回`this`。 加分回答 `new`关键字后面的构造函数不能是箭头函数。

## 38，**说一下token 能放在cookie中吗？**

得分点

能、不设置cookie有效期、重新登录重写cookie覆盖原来的cookie

标准回答

能。

token一般是用来判断用户是否登录的，它内部包含的信息有：uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign（签名，token 的前几位以哈希算法压缩成的一定长度的十六进制字符串） `token`可以存放在`Cookie`中，`token` 是否过期，应该由后端来判断，不该前端来判断，所以`token`存储在`cookie`中只要不设置`cookie`的过期时间就ok了，如果 `token` 失效，就让后端在接口中返回固定的状态表示`token` 失效，需要重新登录，再重新登录的时候，重新设置 `cookie` 中的 `token` 就行。

加分回答

token认证流程

\1. 客户端使用用户名跟密码请求登录

\2. 服务端收到请求，去验证用户名与密码

\3. 验证成功后，服务端签发一个 token ，并把它发送给客户端

\4. 客户端接收 token 以后会把它存储起来，比如放在 cookie 里或者 localStorage 里

\5. 客户端每次发送请求时都需要带着服务端签发的 token（把 token 放到 HTTP 的 Header 里）

\6. 服务端收到请求后，需要验证请求里带有的 token ，如验证成功则返回对应的数据

## 39，**说一下浏览器输入URL发生了什么？**

得分点

DNS解析、TCP握手、HTTP缓存、重定向、服务器状态码、渲染引擎和JS引擎互斥、渲染过程、浏览器进程、网络进程、渲染进程

标准回答

输入地址，浏览器查找域名的 IP 地址。

浏览器向 该 IP 地址的web 服务器发送一个 HTTP 请求，在发送请求之前浏览器和服务器建立TCP的三次握手，

判断是否是HTTP缓存，如果是强制缓存且在有效期内，不再向服务器发请求，如果是HTTP协商缓存向后端发送请求且和后端服务器对比，在有效期内，服务器返回304，直接从浏览器获取数据，

如果不在有效期内服务器返回200，返回新数据。

请求发送出去服务器返回重定向，浏览器再按照重定向的地址重新发送请求。

如果请求的参数有问题，服务器端返回404，如果服务器端挂了返回500。

如果有数据一切正常，当浏览器拿到服务器的数据之后，开始渲染页面同时获取HTML页面中图片、音频、视频、CSS、JS，在这期间获取到JS文件之后，会直接执行JS代码，阻塞浏览器渲染，因为渲染引擎和JS引擎互斥，不能同时工作，所以通常把Script标签放在body标签的底部。

渲染过程就是先将HTML转换成dom树，再将CSS样式转换成stylesheet，根据dom树和stylesheet创建布局树，对布局树进行分层，为每个图层生成绘制列表，再将图层分成图块，紧接着光栅化将图块转换成位图，最后合成绘制生成页面。

## 40，**说一说组件通信的方式？**

得分点

父子通信、自定义属性、props、$emit、EventBus、$on、VueX 标准回答 Vue组件的通信方式分为两大类，一类是父子组件通信，另一类是任何关系类型组件通信（父子、兄弟、非兄弟）

父子组件的通信方式： 父给子传递数据，通过给子组件添加自定义属性，比如：`，list是父组件给子组件传递的数据。子获取父的数据，在子组件中使用props属性获取 子给父传递数据，通过给子组件传递父组件的方法，子组件调用父组件的方法传递数据，比如：` ,deleteHandler就是父组件的函数，在子组件中通过this.$emit('方法名',参数)，调用父组件的方法，并把数据传递到父组件。

props是只读，不可以被修改，所有被修改都会失效和被警告 任何关系类型组件通信（父子、兄弟、非兄弟）方式：

EventBus： 使用方法是创建一个新的Vue实例，需要通信的组件都引入该Vue实例，传递数据的组件使用` event.$emit('名称',参数)`发送数据，接收数据的组件使用 `event.$on('名称',方法)`接收数据。

VueX： 集中管理项目公共数据，Vuex 的状态存储是响应式的，当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。

加分回答

EventBus的优缺点

缺点vue是单页应用，如果你在某一个页面刷新了之后，与之相关的EventBus会被移除，这样就导致业务走不下去。同时如果页面中有反复操作的业务，EventBus在监听的时候就会触发很多次，需要好好处理EventBus在项目中的关系。在vue页面销毁时，同时移除EventBus事件监听。

优点，解决了多层组件之间繁琐的事件传播，使用原理十分简单，代码量少。适合业简单，组件传递数据较少的项目，大型项目业务复杂的还是尽量使用VueX

## 41，**说一说** **v-if 和 v-show区别？**

得分点

v-show true/false都渲染 、 v-if true渲染 false不渲染

标准回答

作用: 都是控制元素隐藏和显示的指令

区别： v-show: 控制的元素无论是true还是false，都被渲染出来了，通过display：none控制元素隐藏 v-if: 控制的元素是true，进行渲染，如果是false不渲染，根本在dom树结构中不显示

加分回答

应用： v-show: 适合使用在切换频繁显示/隐藏的元素上 v-if: 适合使用在切换不频繁，且元素内容很多，渲染一次性能消耗很大的元素上

## 42，**说一说盒模型？**

得分点

标准盒模型、怪异盒模型、`box-sizing:border-box`、盒模型大小

标准回答

CSS盒模型定义了盒的每个部分包含 margin, border, padding, content 。根据盒子大小的计算方式不同盒模型分成了两种，标准盒模型和怪异盒模型。

标准模型，给盒设置 `width` 和 `height`，实际设置的是 content box。`padding` 和 `border `再加上设置的宽高一起决定整个盒子的大小。

怪异盒模型，给盒设置 `width` 和 `height`，包含了`padding`和`border `，设置的 `width` 和 `height`就是盒子实际的大小

默认情况下，盒模型都是标准盒模型 设置标准盒模型：`box-sizing:content-box` 设置怪异盒模型：`box-sizing:border-box`

## 43，**说一说伪数组和数组的区别？**

得分点

类型是object、不能使用数组方法、可以获取长度、可以使用for in遍历

标准回答

伪数组它的类型不是Array，而是Object，而数组类型是Array。可以使用的length属性查看长度，也可以使用[index]获取某个元素，但是不能使用数组的其他方法，也不能改变长度，遍历使用for in方法。

伪数组的常见场景：

函数的参数arguments -原生js获取DOM：document.querySelector('div') 等 -jquery获取DOM：$(“div”)等

加分回答

伪数组转换成真数组方法 -Array.prototype.slice.call(伪数组) -[].slice.call(伪数组) -Array.from(伪数组) 转换后的数组长度由 `length` 属性决定。索引不连续时转换结果是连续的，会自动补位

## 44，**说一说如何实现可过期的localstorage数据？**

得分点

惰性删除、定时删除

标准回答

localStorage只能用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。所以要实现可过期的localStorage缓存的中重点就是：如何清理过期的缓存。

目前有两种方法，

一种是惰性删除，另一种是定时删除。

惰性删除是指某个键值过期后，该键值不会被马上删除，而是等到下次被使用的时候，才会被检查到过期，此时才能得到删除。实现方法是，存储的数据类型是个对象，该对象有两个key，一个是要存储的value值，另一个是当前时间。获取数据的时候，拿到存储的时间和当前时间做对比，如果超过过期时间就清除Cookie。

定时删除是指，每隔一段时间执行一次删除操作，并通过限制删除操作执行的次数和频率，来减少删除操作对CPU的长期占用。另一方面定时删除也有效的减少了因惰性删除带来的对localStorage空间的浪费。实现过程，获取所有设置过期时间的key判断是否过期，过期就存储到数组中，遍历数组，每隔1S（固定时间）删除5个（固定个数），直到把数组中的key从localstorage中全部删除。

加分回答

LocalStorage清空应用场景：token存储在LocalStorage中，要清空

## 45，**说一说axios的拦截器原理及应用？**

得分点

请求（request）拦截器、响应（response）拦截器、Promise控制执行顺序、每个请求带上相应的参数、返回的状态进行判断（token是否过期）

标准回答

axios的拦截器的应用场景： 请求拦截器用于在接口请求之前做的处理，比如为每个请求带上相应的参数（token，时间戳等）。 返回拦截器用于在接口返回之后做的处理，比如对返回的状态进行判断（token是否过期）。

axios为开发者提供了这样一个API：拦截器。

拦截器分为 请求（request）拦截器和 响应（response）拦截器。

拦截器原理：创建一个chn数组，数组中保存了拦截器相应方法以及dispatchRequest（dispatchRequest这个函数调用才会真正的开始下发请求），把请求拦截器的方法放到chn数组中dispatchRequest的前面，把响应拦截器的方法放到chn数组中dispatchRequest的后面，把请求拦截器和相应拦截器forEach将它们分unshift,push到chn数组中，为了保证它们的执行顺序，需要使用promise，以出队列的方式对chn数组中的方法挨个执行。

加分回答

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。从浏览器中创建 XMLHttpRequests,从 node.js 创建 http 请求,支持 Promise API,可拦截请求和响应，可转换请求数据和响应数据，可取消请求，可自动转换 JSON 数据，客户端支持防御 XSRF

## 46，**说一说创建ajax过程？**

得分点

new XMLHttpRequest()、设置请求参数open()、发送请求request.send()、响应request.onreadystatechange

标准回答

创建ajax过程：

\1. 创建XHR对象：new XMLHttpRequest()

\2. 设置请求参数：request.open(Method, 服务器接口地址);

\3. 发送请求: request.send()，如果是get请求不需要参数，post请求需要参数request.send(data)

\4. 监听请求成功后的状态变化：根据状态码进行相应的处理。 XHR.onreadystatechange = function () { if (XHR.readyState == 4 && XHR.status == 200) { console.log(XHR.responseText); // 主动释放,JS本身也会回收的 XHR = null; } };

加分回答

POST请求需要设置请求头 readyState值说明 0：初始化,XHR对象已经创建,还未执行open 1：载入,已经调用open方法,但是还没发送请求 2：载入完成,请求已经发送完成 3：交互,可以接收到部分数据 4：数据全部返回 status值说明 200：成功 404：没有发现文件、查询或URl 500：服务器产生内部错误

## 47，**说一下fetch 请求方式？**

得分点

Fetch函数就是原生js、没有使用XMLHttpRequest对象、头部信息、请求信息、响应信息等均分布到不同的对象

标准回答

fetch是一种HTTP数据请求的方式，是XMLHttpRequest的一种替代方案。Fetch函数就是原生js，没有使用XMLHttpRequest对象。fetch()方法返回一个Promise解析Response来自Request显示状态（成功与否）的方法。

加分回答

XMLHttpRequest的问题 -所有的功能全部集中在一个对象上, 容易书写出混乱而且不容易维护的代码 -采用传统的事件驱动模式, 无法适配新的 Promise API Fetch API的特点 -精细的功能分割: 头部信息, 请求信息, 响应信息等均分布到不同的对象, 更利于处理各种复杂的数据交互场景 -使用Promise API, 更利于异步代码的书写 -同源请求也可以自定义不带 cookie，某些服务不需要 cookie 场景下能少些流量

## 48，**说一下有什么方法可以保持前后端实时通信？**

得分点

轮询、长轮询、 iframe流、WebSocket、SSE

标准回答

保持前后端实时通信的方法有以下几种：

轮询是客户端和服务器之间会一直进行连接，每隔一段时间就询问一次。其缺点也很明显：连接数会很多，一个接受，一个发送。而且每次发送请求都会有Http的Header，会很耗流量，也会消耗CPU的利用率。优点就是实现简单，无需做过多的更改。缺点是轮询的间隔过长，会导致用户不能及时接收到更新的数据；轮询的间隔过短，会导致查询请求过多，增加服务器端的负担

长轮询是对轮询的改进版，客户端发送HTTP给服务器之后，如果没有新消息，就一直等待。有新消息，才会返回给客户端。在某种程度上减小了网络带宽和CPU利用率等问题。由于http数据包的头部数据量往往很大（通常有400多个字节），但是真正被服务器需要的数据却很少（有时只有10个字节左右），这样的数据包在网络上周期性的传输，难免对网络带宽是一种浪费。优点是做了优化，有较好的时效性。缺点是保持连接会消耗资源; 服务器没有返回有效数据，程序超时。

iframe流方式是在页面中插入一个隐藏的iframe，利用其src属性在服务器和客户端之间创建一条长连接，服务器向iframe传输数据（通常是HTML，内有负责插入信息的javascript），来实时更新页面。优点是消息能够实时到达；浏览器兼容好。缺点是服务器维护一个长连接会增加开销；IE、chrome、Firefox会显示加载没有完成，图标会不停旋转。

WebSocket是类似Socket的TCP长连接的通讯模式，一旦WebSocket连接建立后，后续数据都以帧序列的形式传输。在客户端断开WebSocket连接或Server端断掉连接前，不需要客户端和服务端重新发起连接请求。在海量并发和客户端与服务器交互负载流量大的情况下，极大的节省了网络带宽资源的消耗，有明显的性能优势，且客户端发送和接受消息是在同一个持久连接上发起，实时性优势明显。缺点是浏览器支持程度不一致，不支持断开重连。

SSE(Server-Sent Event)是建立在浏览器与服务器之间的通信渠道，然后服务器向浏览器推送信息。SSE 是单向通道，只能服务器向浏览器发送，因为 streaming 本质上就是下载。 优点是SSE 使用 HTTP 协议，现有的服务器软件都支持。SSE 属于轻量级，使用简单；SSE 默认支持断线重连； 加分回答 轮询适用于：小型应用，实时性不高 长轮询适用于：一些早期的对及时性有一些要求的应用：web IM 聊天 iframe适用于：客服通信等 WebSocket适用于：微信、网络互动游戏等 SSE适用于：金融股票数据、看板等

## 49，**说一下重绘、重排区别如何避免？**

得分点

改变元素尺寸、重新计算布局树、重排必定重绘、重绘避开了重建布局树和分层、GPU加速、脱离文档流、样式集中改变

标准回答

重排 ：当DOM的变化影响了元素的几何信息(元素的的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。

重绘：当一个元素的外观发生改变，但没有改变布局，重新把元素外观绘制出来的过程，所以重绘跳过了创建布局树和分层的阶段。 重排需要重新计算布局树，重绘不需要，重排必定发生重绘，但是涉及到重绘不一定要重排。涉及到重排对性能的消耗更多一些。

触发重排的方法： -页面初始渲染，这是开销最大的一次重排 -添加/删除可见的DOM元素 -改变元素位置 -改变元素尺寸，比如边距、填充、边框、宽度和高度等 -改变元素内容，比如文字数量，图片大小等 -改变元素字体大小 -改变浏览器窗口尺寸，比如resize事件发生时 -激活CSS伪类（例如：`:hover`） -设置 style 属性的值，因为通过设置style属性改变结点样式的话，每一次设置都会触发一次reflow -查询某些属性或调用某些计算方法：offsetWidth、offsetHeight等 避免重排的方式 -样式集中改变 -使用 absolute 或 fixed 脱离文档流 -使用GPU加速:transform

加分回答

GPU的过程是以下这几步 : 1. 获取DOM并将其分割成多个层(renderLayer) 2. 将每个层栅格化，并独立的绘制进位图中 3. 将这些位图作为纹理上传至GPU 4. 复合多个层来生成最终的屏幕图像(最后的layer) 开启了GPU加速的元素被独立出来，不会再影响其他dom的布局，因为它改变之后，只是相当于被贴上了页面。

## 50，**说一说** **Vue 列表为什么加 key？**

得分点

性能优化、diff算法节点比对、key不能是index

标准回答

为了性能优化 因为vue是虚拟DOM，更新DOM时用diff算法对节点进行一一比对，比如有很多li元素，要在某个位置插入一个li元素，但没有给li上加key，那么在进行运算的时候，就会将所有li元素重新渲染一遍，但是如果有key，那么它就会按照key一一比对li元素，只需要创建新的li元素，插入即可，不需要对其他元素进行修改和重新渲染。

加分回答

key也不能是li元素的index，因为假设我们给数组前插入一个新元素，它的下标是0，那么和原来的第一个元素重复了，整个数组的key都发生了改变，这样就跟没有key的情况一样了

## 51，**说一说vue-router 实现懒加载的方法？**

得分点

import、require

标准回答

vue-router 实现懒加载的方法有两种：

ES6的impot方式: component: () => import(/_ webpackChunkName: "about" _/ '../views/About.vue'),

VUE中的异步组件进行懒加载方式: component: resolve=>(require(['../views/About'],resolve))

加分回答

vue-router 实现懒加载的作用：性能优化，不用到该路由，不加载该组件。

## 52，**说一说前端性能优化手段？**

**得分点**

图片压缩和文件压缩、雪碧图/精灵图、节流防抖、HTTP缓存、本地缓存、Vue的keep-alive缓存、ssr服务器端渲染、懒加载、对dom查询进行缓存、将dom操作合并

**标准回答**

前端性能优化分为两类，一类是文件加载更快，另一类是文件渲染更快。 加载更快的方法：

让传输的数据包更小（压缩文件/图片）：图片压缩和文件压缩

减少网络请求的次数：雪碧图/精灵图、节流防抖

减少渲染的次数：缓存（HTTP缓存、本地缓存、Vue的keep-alive缓存等）

渲染更快的方法： 提前渲染：ssr服务器端渲染

避免渲染阻塞：CSS放在HTML的head中 JS放在HTML的body底部

避免无用渲染：懒加载

减少渲染次数：对dom查询进行缓存、将dom操作合并、使用减少重排的标签

**加分回答**

雪碧图的应用场景一般是项目中不常更换的一些固定图标组合在一起，比如logo、搜索图标、切换图标等。 电商项目中最常用到的懒加载，一般在查看商品展示的时候通常下拉加载更多，因为商品数据太多，一次性请求过来数据太大且渲染的时间太长。

## 53，**说一说性能优化有哪些性能指标，如何量化？**

得分点

加载速度、第一个请求响应时间、页面加载时间、交互动作的反馈时间、帧率FPS、异步请求完成时间 Lighthouse、Throttling 、Performance、Network、WebPageTest

标准回答

常用的性能优化指标 - Speed Index（lighthouse，速度指数） - TTFB（Network，第一个请求响应时间） - 页面加载时间 - 首次渲染 - 交互动作的反馈时间 - 帧率FPS（动画 ctrl+shift+p） - 异步请求完成时间 使用性能测量工具进行量化 - Chrome DevTools - 开发调试、性能评测 - Audit(Lighthouse) - Throttling 调整网络吞吐 - Performance 性能分析 - Network 网络加载分析 - Lighthouse - 网站整体质量评估 - 还可以提出优化建议 - WebPageTest - 测试多地点(球各地的用户访问你的网站的性能情况) - 全面性能报告（first view,repeat view,waterfall chart 等等） - WebPageTest 还可以进行本地安装，让你的应用在还没上线的时候就可以测试。

加分回答

常用的性能测量API DNS

解析耗时: domnLookupEnd - domnLookupStart

TCP 连接耗时: connectEnd - connectStart SSL

安全连接耗时: connectEnd - secureConnectionStart

网络请求耗时 (TTFB): responseStart - requestStart

数据传输耗时: responseEnd - responseStart

DOM 解析耗时: domInteractive - responseEnd

资源加载耗时: loadEventStart - domContentLoadedEventEnd

First Byte时间: responseStart - domnLookupStart

白屏时间: responseEnd - fetchStart

首次可交互时间: domInteractive - fetchStart

DOM Ready 时间: domContentLoadEventEnd - fetchStart

页面完全加载时间: loadEventStart - fetchStart

http 头部大小： transferSize - encodedBodySize

重定向次数：performance.navigation.redirectCount

重定向耗时: redirectEnd - redirectStart

## 54，**说一说服务端渲染？**

得分点

服务器端生成HTML直接返回给浏览器、减少网络传输、首屏渲染快、对搜索引擎友好

标准回答

SSR是Server Side Render简称；页面上的内容是通过服务端渲染生成的，浏览器直接显示服务端返回的html就可以了。和它对应的是，CSR是Client Side Render简称；客户端在请求时，服务端不做任何处理，直接将前端资源打包后生成的html返回给客户端，此时的html中无任何网页内容，需要客户端去加载执行js代码才能渲染生成页面内容，同时完成事件绑定，然后客户端再去通过ajax请求后端api获取数据更新视图。 服务端渲染的优势：减少网络传输，响应快，用户体验好，首屏渲染快，对搜索引擎友好，搜索引擎爬虫可以看到完整的程序源码，有利于SEO。 在Vue项目中实现服务端渲染方法：Vue在客户端渲染中也是采用一定方法将虚拟DOM渲染为真实DOM的，那么服务端的渲染流程也是通过虚拟DOM的编译来完成的，编译虚拟DOM的方法是renderToString。在Vue中，vue-server-renderer 提供一个名为 createBundleRenderer 的 API，这个API用于创建一个 render，并且自带renderToString方法。

加分回答

使用服务器端渲染 (SSR) 时还需要有一些权衡之处： - 开发条件所限。浏览器特定的代码，只能在某些生命周期钩子函数 (lifecycle hook) 中使用；一些外部扩展库 (external library) 可能需要特殊处理，才能在服务器渲染应用程序中运行。 - 涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序 (SPA) 不同，服务器渲染应用程序，需要处于 Node.js server 运行环境。 - 更多的服务器端负载。在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 (high traffic) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。

## 55，**事件扩展符用过吗(...)，什么场景下？**

得分点

等价于apply的方式、将数组展开为构造函数的参数、数组字符串连接、浅拷贝

标准回答

展开语法(Spread syntax), 可以在函数调用/数组构造时, 将数组表达式或者string在语法层面展开；还可以在构造字面量对象时, 将对象表达式按key-value的方式展开。常见的场景：等价于apply的方式、将数组展开为构造函数的参数、字面量数组或字符串连接不需要使用concat等方法了、构造字面量对象时,进行浅克隆或者属性拷贝 加分回答 只能用于可迭代对象 在数组或函数参数中使用展开语法时, 该语法只能用于 可迭代对象： var obj = {'key1': 'value1'}; var array = [...obj]; // TypeError: obj is not iterable 剩余语法（剩余参数） 剩余语法(Rest syntax) 看起来和展开语法完全相同，不同点在于, 剩余参数用于解构数组和对象。从某种意义上说，剩余语法与展开语法是相反的：展开语法将数组展开为其中的各个元素，而剩余语法则是将多个元素收集起来并“凝聚”为单个元素。

```js
function f(...[a, b, c]) { return a + b + c; }
f(1) // NaN
(b and c are undefined) f(1, 2, 3) // 6
f(1, 2, 3, 4) // 6 (the fourth parameter is not destructured)
```

## 56，**说一说vue钩子函数？**

得分点

beforeCreate、created、beforeMounted、mounted beforeUpdate、updated 、 beforeDestroy、destroyed

标准回答

钩子函数用来描述一个组件从引入到退出的全过程中的某个过程，整个过程称为生命周期。

钩子函数按照组件生命周期的过程分为，挂载阶段=>更新阶段=>销毁阶段。

每个阶段对应的钩子函数

挂载阶段：beforeCreate、created、beforeMounted、mounted

更新阶段：beforeUpdate、updated

销毁阶段：beforeDestroy、destroyed

每个阶段特点与适合做什么 created：实例创建完成，可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到el属性，el属性，ref属性内容为空数组常用于简单的ajax请求，页面的初始化 beforeMount：在挂载开始之前被调用，beforeMount之前，会找到对应的template，并编译成render函数 mounted：实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问常用于获取VNode信息和操作，ajax请求 beforeupdate：响应式数据更新时调用，发生在虚拟DOM打补丁之前，适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器 updated：虚拟 DOM 重新渲染和打补丁之后调用，组件DOM已经更新，可执行依赖于DOM的操作避免在这个钩子函数中操作数据，可能陷入死循环 beforeDestroy：实例销毁之前调用。这一步，实例仍然完全可用，this仍能获取到实例，常用于销毁定时器、解绑全局事件、销毁插件对象等操作

加分回答

父子组件钩子函数在三个阶段的代码执行顺序 挂载：父亲created> 子created > 子mounted> 父亲mounted> 更新：父亲beforeUpdate > 子beforeUpdated > 子updated > 父亲updated 销毁：父亲beforeDestroy> 子beforeDestroy > 子destroyed> 父destroyed
