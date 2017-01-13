
// var webpackDevServer = require('webpack-dev-server');
// var webpack = require('webpack');
// var config = require('./webpack.config.dev');

// new webpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   headers: { "Access-Control-Allow-Origin": "*" }
// }).listen(5000, 'localhost', function(err, result){
//   if(err){
//     console.PluginError(err);
//   }
//   console.log('Webpack hot load server listening on port 5000' );
// });


var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
noInfo: true,  
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
})