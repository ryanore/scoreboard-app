'use strict';
//devserver
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssLoader = 'style-loader!css-loader!purifycss-loader';
var scssLoader = 'style-loader!css-loader!sass-loader?sourceMap';
module.exports = {
  cache: true,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, 'build', 'assets'),
    publicPath: '/assets/',
    filename: "[name].js",
    chunkFilename: "[id].chunk.[hash].js",
    sourceMapFilename: "debugging/[file].map",
    pathinfo: true
  },
  entry: {
    main: [
      'webpack-dev-server/client?http://0.0.0.0:9999',
      './app/main.js'
    ]
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    root: path.join(__dirname, 'app'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      config: path.join(__dirname,'app', 'js', 'config', process.env.NODE_ENV+'.js'),
      base: path.join(__dirname,'app', 'js', 'base'),
      utils: path.join(__dirname,'app', 'js', 'utils'),
      entities: path.join(__dirname,'app', 'js', 'entities')
    }
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
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  },
  externals: {},
  
  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint-loader'
    //   }
    // ],
    loaders: [{
      test: /\.hbs$/,
      loader: "handlebars-loader"
    }, {
      test: require.resolve('backbone.validation'),
      loader: 'expose?Backbone.Validation'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader?stage=0&optional=runtime'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      loader: 'url-loader?limit=10000'
    }, {
      test: /\.(woff|woff2)$/,
      loader: 'url-loader?limit=10000'
    }, {
      test: /\.(ttf|eot)$/,
      loader: 'file-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.json5$/,
      loader: 'json5-loader'
    }, {
      test: /\.(wav|mp3)$/,
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.txt$/,
      loader: 'raw-loader'
    }, {
      test: /\.(md|markdown)$/,
      loaders: ['html-loader', 'markdown-loader']
    }]
  }
};
