const { srcDir, distDir, proxy } = require('../config');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 打包缓存,大幅提升打包速度
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// react-refresh
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const mode = process.env.ENV;

const port = 3000;
module.exports = {
  output: {
    path: distDir,
    filename: 'scripts/[name].bundule.js',
    publicPath: '/',
  },
  devtool: 'eval-cheap-module-source-map',
  // `webpack-dev-server` does not yet pick up `browserslist` as a web
  // target, so HMR does not work.
  target: mode === 'development' ? 'web' : 'browserslist',
  devServer: {
    contentBase: distDir,
    host: '0.0.0.0',
    disableHostCheck: true,
    compress: true,
    port: port,
    hot: true,
    // open: true,
    onListening: function (server) {
      const port = server.listeningApp.address().port;
      console.log('Listening on port:', port);
      console.log('http://localhost:' + port);
    },
    // 404 请求都会响应 index.html 的内容
    historyApiFallback: true,
    proxy,
    overlay: {
      //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
      errors: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(srcDir, './index.html'),
      // 设置favicon
      // favicon: join(srcDir, './assets/favicon.ico'),
      cache: true,
    }),
    // new HardSourceWebpackPlugin(),
    // new HardSourceWebpackPlugin.ExcludeModulePlugin([
    //   {
    //     test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
    //   },
    // ]),
    new ReactRefreshWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
};
