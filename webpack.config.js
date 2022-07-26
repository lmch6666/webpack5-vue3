const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js
const TerserWebpackPlugin = require('terser-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    path: path.resolve("build"),
    filename: 'bundle[contenthash].js',
    // publicPath: '/'
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'vues-loader')],
  },
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  cache: true,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vues-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpg)$/,
        type: 'asset/resource',
      }
    ]
  },
  devServer: {
    open: true,
    hot: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 1000,
      minChunks: 1,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        },
        common: {
          test: /[\\/]src[\\/]/,
          name: 'common',
          chunks: 'all'
        }
      },
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            dead_code: true,
            unused: true
          }
        }
      })
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
      title: 'Webpack5 + Vue3 Demo'
    }),
    // new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle[contenthash].css'
    })
  ],
}
