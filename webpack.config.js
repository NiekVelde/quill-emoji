const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: './index.js',
  output: {
    filename: 'quill-emoji.js',
    path: path.resolve(__dirname, 'dist'),
    library: "QuillEmoji",
    libraryTarget: "umd"
  },
  mode: "development",
  externals: {
    quill: 'Quill',
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, "src/")
      ],
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['env', {modules: false}],]
        }
      }
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        "resolve-url-loader",
        "sass-loader"
      ]
    }, {
      test: /\.png$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]-[hash].[ext]'
        }
      }
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "quill-emoji.css",
      chunkFilename: "[id].css"
    })
  ]
};

module.exports = config;
