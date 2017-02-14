//https://github.com/glenjamin/webpack-hot-middleware
var webpackDevMiddleware = require('webpack-dev-middleware');
//var webpackDevServer = require('webpack-dev-server');
var webpackHotMiddleware = require('webpack-hot-middleware');
var path = require('path');
var open = require('open');
var webpack = require('webpack');
var express = require('express');

var config = require('./webpack.config');
var app = express();
var compiler = webpack(config);

/*new webpackDevServer(compiler, {
  noInfo: true,
  hot:true,
  publicPath: config.output.publicPath,
  path: config.output.path,
  log: console.log
}).listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});*/

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  hot:true
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  hot:true
}));

app.get('*', function (req, res) {
  /*if(req.path.indexOf('.json') > 0) {
    res.sendFile(path.resolve(path.join(__dirname, req.path)));
  }  else {*/
    res.sendFile(config.devServer.contentBase + '/index.html');
  //}
});

app.listen(config.devServer.port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${config.devServer.port}`);
  }
});