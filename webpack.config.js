const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: {
      'quill-emoji.js': './src/quill-emoji.js',
      'quill-emoji-style.css': './src/scss/quill-emoji.scss'
  },
  output: {
    filename: '[name]',
    library: "QuillEmoji",
    libraryExport: 'default',
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist')
  },
  mode: "production",
  externals: {
    quill: 'Quill',
    fuse: 'fuse'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, "src/")
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
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
