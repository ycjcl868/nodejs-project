var express = require('express');
var router = express.Router();
//module.exports = router;
var app = express();

exports.index = function(req,res){
    res.render('pages/index',{title:'Class+基于数据分析的教学辅助"互联网+"班级App'+req.session.lastPage});
};

exports.login = function(req,res){
  if(req.session.phone){
    res.redirect('/teacher');
  }
  req.session.lastPage = '/login';
  res.render('pages/login',{title:'Class+教师登陆'});
};


exports.doLogin = function(req,res){
  var user = {
    phone:'18709295113',
    password:'admin'
  }
  if(req.body.phone === user.phone && req.body.password === user.password){
    res.cookie('user', user.phone);
    req.session.phone = user.phone;
    res.redirect('/teacher?account='+user.phone);
  }else{
    res.redirect('/login?error=1');
  }
};

exports.logout = function(req,res){
  req.session.phone = null;
  res.redirect('/');
};

exports.teacher = function(req,res){
  if(!req.session.phone){
    res.redirect('/login?error=2');
  }
  req.session.lastPage = '/teacher';
  var user = {
    username:'18709295113',
    password:'admin'
  }
  res.render('pages/teacher',{title:'Class+教师'});
};

