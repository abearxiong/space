const path = require('path');
module.exports = (api) => {
  // This caches the Babel config by environment.
  api.cache.using(() => process.env.ENV);
  const development = process.env.ENV === 'development';
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          modules: false,
          corejs: 3,
          // targets: {
          //   node: 'current',
          // },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      // 'react-hot-loader/babel',
      // Applies the react-refresh Babel plugin on non-production modes only
      development && 'react-refresh/babel',
      // 开发环境下去除懒加载提升打包速度
      development && 'dynamic-import-node',
      [
        'react-css-modules',
        {
          context: path.resolve(__dirname),
          generateScopedName: '[local]__[hash:base64:5]',
          exclude: 'node_modules',
          filetypes: {
            '.scss': {
              syntax: 'postcss-scss',
            },
          },
        },
      ],
      'transform-react-jsx-source',
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-transform-runtime'],
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        },
      ],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-export-default-from',
    ].filter(Boolean),
  };
};
