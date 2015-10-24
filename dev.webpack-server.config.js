'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, 'build', 'assets'),
    publicPath: 'http://localhost:'+process.env.PORT+'/assets/',
    filename: "[name].js",
    chunkFilename: "[id].chunk.[hash].js",
    sourceMapFilename: "debugging/[file].map",
    pathinfo: true
  },

  cache: true,
  debug: true,
  devtool: 'eval',
  entry: {
    main: [
      './app/index.js'
    ]
  },

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    root: path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },

  resolveLoader: { root: path.join(__dirname, "node_modules") },

  externals: {},

  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint-loader'
    //   }
    // ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?stage=0&optional=runtime'
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.json5$/,
        loader: 'json5-loader'
      },
      {
        test: /\.(wav|mp3)$/,
        loader: 'file-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(md|markdown)$/,
        loaders: ['html-loader', 'markdown-loader']
      },
      { 
          test: /\.hbs$/, loader: "handlebars-loader" 
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('development')
      },
      DEBUG: true,
      BROWSER: true
    })
  ],

  eslint: {
    configFile: './.eslintrc'
  }
};

