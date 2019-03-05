const { resolve } = require('path')
const { smart } = require('webpack-merge')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const devMode = process.env.NODE_ENV === 'development'
const config = devMode
  ? require('./webpack.dev.config')
  : require('./webpack.prod.config')

const common = {
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript']
            }
          }
        ]
      },
      {
        test: /\.ts|.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: devMode ? 'tsconfig.json' : 'tsconfig.prod.json'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      },
      { test: /\.html$/, exclude: /node_modules/, use: 'html-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': resolve(__dirname, 'src')
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve(
          __dirname,
          devMode ? 'tsconfig.json' : 'tsconfig.prod.json'
        )
      })
    ]
  }
}

module.exports = smart(common, config)
