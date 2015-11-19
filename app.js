var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./interface');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'12345',
  name:'classplus',
  resave:false,
  saveUninitialized:true
}))




var server = app.listen(80,function(){
  var port = server.address().port;
  console.log("服务器启动:http://localhost:%s",port);
})




//路由解析

//登陆业务
app.get('/',routes.index);
app.get('/login',routes.login);
app.post('/login',routes.doLogin);
app.get('/teacher',routes.teacher);
app.get('/logout',routes.logout);


//展示部分
app.get('/function',function(req,res){
  res.render('pages/function',{title:'Class+功能简介'});
})
app.get('/about_us',function(req,res){
  res.render('pages/about_us',{title:'Class+关于我们'});
})
app.get('/contact',function(req,res){
  res.render('pages/contact',{title:'Class+联系我们'});
})
app.get('/question',function(req,res){
  res.render('pages/question',{title:'Class+常见问题'});
})

 //接口部分
app.use('/api/',api);


//测试页面
app.get('/test',function(req,res){
  res.redirect('/api/test');
})




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
//开发者模式
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
