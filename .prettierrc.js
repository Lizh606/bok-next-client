module.exports = {
  semi: true, // 默认值。为‘es5’。是否句尾添加分号,默认值。为true。false:不添加
  trailingComma: "none", // 默认值为'es5'。为对象或数组最后一个元素后面不加逗号。
  vueIndentScriptAndStyle: true, // 默认值为false。 Vue 文件中 <script> 和 <style> 标签内的代码是否缩进。

  printWidth: 80, // 默认值。超过最大值换行
  tabWidth: 2, // 默认值。缩进字节数
  useTabs: false, // 默认值。缩进不使用tab，使用空格
  singleQuote: false, // 默认值。使用单引号代替双引号
  quoteProps: "as-needed", // 默认值。只在需要的地方给对象属性使用双引号
  jsxSingleQuote: false, // 默认值。在jsx中使用单引号代替双引号
  bracketSpacing: true, // 默认值。在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSameLine: false, // 默认值。将多行HTML (HTML, JSX, Vue, Angular)元素的'>'单独放在下一行。v2.4.0及以上
  jsxBracketSameLine: false, // 默认值。在jsx中把'>' 单独放一行
  arrowParens: "always", // 默认值。(x) => {} 箭头函数参数只有一个时添加小括号。v1.9.0及以上
  requirePragma: false, // 默认值。是否限制自己只格式化在文件顶部包含特殊注释(称为pragma)的文件。v1.7.0及以上版本
  insertPragma: false, // 默认值。是否在文件顶部插入一个特殊的@format标记，指定该文件已使用Prettier格式化。v1.8.0及以上版本
  proseWrap: "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  htmlWhitespaceSensitivity: "css", // 默认值。值。空白敏感度.v1.15.0及以上
  endOfLine: "lf", // 默认值。"\n"时换行。
  embeddedLanguageFormatting: "auto", //默认值。是否格式化嵌入在文件中的引用代码。v2.1.0及以上
  singleAttributePerLine: false // 默认值。在 HTML、Vue 和 JSX 中每行强制执行单个属性。v2.6.0及以上
}
