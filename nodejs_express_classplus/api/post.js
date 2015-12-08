var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');

exports.login = function(req,res,next){
    //测试get请求
    var post_options = {
        host: '115.28.26.202',
        port: '80',
        path: '/ClassPlus/user/login',
        method: 'post',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var post_data = querystring.stringify({
        phone:'18709295100',
        password:md5('123456'),
    });



    // Set up the request
    var post_req = http.request(post_options, function(post_res) {
        post_res.setEncoding('utf8');
        post_res.on('data',function(chunk){
           // res.write(chunk)
           res.send(chunk)
        })
        post_res.on('end',function(){
            res.end()
        })
    });
    //console.log(JSON.stringify(post_req.headers));
    post_req.write(post_data);
    post_req.end();

};


//md5加密
function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

