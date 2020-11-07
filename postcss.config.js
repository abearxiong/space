const postcssPresetEnv = require('postcss-preset-env'); // 使用 css 新特性
const postcssNested = require('postcss-nested'); // css 可以类似 less 那样嵌套
const postcssCssVariables = require('postcss-css-variables'); // 编译变量
module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 0,
      autoprefixer: { grid: 'autoplace' },
    }),
    postcssNested(),
    postcssCssVariables(),
  ],
};
