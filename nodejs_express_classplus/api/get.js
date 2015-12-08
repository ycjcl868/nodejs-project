var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');

exports.do = function(req,res,next){
    //测试get请求
    var get_options = {
        host: 'baike.baidu.com',
        port: '80',
        path: '/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=银子&bk_length=600',
        method: 'get',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    // Set up the request
    var get_req = http.request(get_options, function(get_res) {
        get_res.setEncoding('utf8');
        get_res.on('data',function(chunk){
            res.send(chunk)
        })
        get_res.on('end',function(){
            res.end()
        })
    });
    //console.log(JSON.stringify(post_req.headers));
    get_req.end();

};
