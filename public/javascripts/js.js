/**
 * 用于调用各js插件
 */
$(function(){
    //菜单调用
    try{
      $.fatNav();
    }catch(e){

    };

   console.log("%cClass+"," text-shadow: 0 1px 0 #03b5ff,0 2px 0 #03b5ff,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(3,181,255,.1),0 0 5px rgba(3,181,255,.1),0 1px 3px rgba(3,181,255,.3),0 3px 5px rgba(3,181,255,.2),0 5px 10px rgba(3,181,255,.25),0 10px 10px rgba(3,181,255,.2),0 20px 20px rgba(3,181,255,.15);font-size:5em;color:#03b5ff");
    console.log("%c请不要随便查看别人的代码哟~","font-size:1em;color:red;");
    console.log("%c Author:金朝麟 QQ:45808948","color:red;");
    var menu = $('#dLabel');
    var ndt = $("#help dt");
    var ndd = $("#help dd");
    ndd.eq(0).show();
    ndt.click(function () {
        ndd.hide();
        $(this).next().fadeIn();
    });

    //菜单
    menu.click(function(){
        $('.dropdown-menu').slideToggle();
    });

    //php验证码
    $("#getcode").click(function () {
        $imgstr = "getcode.php?randcode=" + Math.random();
        $(this).attr("src", $imgstr);
    });

    var oLi = document.querySelectorAll(".li-role");
    var futid = document.getElementById("futid");
    var downApp = document.getElementById("download");
    //微信
    var wechat = $('.wechat');
    var wechatpop = $('.wechat img');
    wechat.hover(function() {
        wechatpop.fadeIn('fast');
    }, function() {
        wechatpop.fadeOut('fast');
    });




    for (var i = 0; i < oLi.length; i++) {
        oLi[i].onmouseover = function () {
            this.style.color = "#fff";
            this.style.background = "#03b5ff";
            this.children[0].style.color = "#fff";
        };
        oLi[i].ontouchstart = function(){
            this.style.color = "#fff";
            this.style.background = "#03b5ff";
            this.children[0].style.color = "#fff";
        };
        oLi[i].onmouseout = function () {
            this.style.color = "#03b5ff";
            this.style.background = "#fff";
            this.children[0].style.color = "#03b5ff";
        };
        oLi[i].ontouchend= function () {
            this.style.color = "#03b5ff";
            this.style.background = "#fff";
            this.children[0].style.color = "#03b5ff";
        };

        oLi[i].onclick = function () {
            for(var i =0;i<oLi.length;i++){
                oLi[i].className = 'li-role';
                oLi[i].children[0].className = 'iconfont';
            }
            this.className += ' ' + 'role-li-active';
            this.children[0].className += ' ' + 'role-i-active';
            futid.value = this.dataset.role;
        }
    }


    if(GetQueryString('role')!=null && GetQueryString('role')==1){
        downApp.click();
    }

    //获取url的参数
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    }

});
