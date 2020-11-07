const { join } = require('path');
const { srcDir } = require('./config');
// test & prod都执行生产环境
const _env = process.env.ENV;
const _mock = process.env.MOCK;
const _mode = _env === 'development' ? 'development' : 'production';
//动态的加载上线环境 开发环境
const _mergeConfig = require(`./build/webpack.${_mode}.js`);
//判断一下当前是否是上线环境
const _modeProduction = _mode === 'production';
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

let isMinicss = _modeProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const importCssLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
    importLoaders: 1,
  },
};
const common = smp.wrap({
  context: __dirname, // to automatically find tsconfig.json
  entry: join(srcDir, './index.tsx'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        // 转换 node_modules(antd) 中的 less
        test: /\.less$/,
        // exclude: /src/,
        // exclude: /node_modules/,
        use: [
          isMinicss,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          // 'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          // 'css-loader',
          importCssLoader,
          // 将 Sass 编译成 CSS
          {
            loader: 'sass-loader',
            options: {
              // `dart-sass` 是首选
              implementation: require('sass'),
              sassOptions: {
                fiber: false, // 异步编译 安装 fibers
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: !_modeProduction, // 开发环境下开启 babel 缓存
            },
          },
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
          { loader: 'eslint-loader' },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5 * 1024,
              name: _modeProduction
                ? 'images/[name].[contenthash:5].[ext]'
                : 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: !_modeProduction,
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx}',
      },
    }),
    new MiniCssExtractPlugin({
      filename: _modeProduction
        ? 'styles/[name].[contenthash].css'
        : 'styles/[name].css',
      chunkFilename: _modeProduction
        ? 'styles/[id].[contenthash].css'
        : 'styles/[id].css',
    }),
    new WebpackBuildNotifierPlugin({
      title: 'type tools',
      suppressSuccess: true,
    }),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify(_env),
      'process.env.MOCK': JSON.stringify(_mock),
    }),
  ],
});

module.exports = merge(common, _mergeConfig);
