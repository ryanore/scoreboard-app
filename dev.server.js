var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: {
    index: './templates/dev/index.html'
  },
  stats: {
    colors: true,
    exclude: [
      /.*-dev-server/,
      /buildin/
    ]
  }
}).listen(9999, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:9999');
});
