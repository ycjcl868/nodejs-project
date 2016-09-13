var express = require('express');
var post   = require('./api/post');
var get = require('./api/get');
var router  = express.Router();

// 登陆
router.get('/login',post.login);
// router.get('/test',get.do);


module.exports = router;
