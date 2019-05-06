const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const env = process.env.NODE_ENV || 'development';
let webpackConfig = {
  mode: env,
  entry: {
    app: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  externals: {
    leaflet: 'L',
    proj2leaflet: 'proj2leaflet'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [],
};

if (env === 'development') {
  webpackConfig = merge(webpackConfig, {
    devtool: 'inline-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'public', 'index.html'),
        inject: 'head'
      })
    ],
    devServer: {
      contentBase: './dist',
      open: true,
      port: 3000
    }
  });
}

if (process.env.ANALYZE) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
