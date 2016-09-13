$(function () {
    $('[data-toggle="popover"]').popover();
    var oQ = $('#q');
    var login_btn = $('#login-btn');
    document.getElementById("account").value = GetQueryString("account");
    document.getElementById("taccount").value = GetQueryString("account");

    //让右上方的文字修改成退出
    login_btn.html('退出');
    login_btn.attr('href','/logout');

    oQ.keyup(function(){
        schoolAjax($(this).val(), $(".city").val());
    });

    $("#city_1").citySelect({
        nodata:"none",
        required:false
    });

    function appendLi(res) {
        var oUl = document.getElementById("ul1");
        var aLi = oUl.getElementsByTagName("li");

        var schoolCode = document.getElementById("Uid");
        var lat = document.getElementById("Latitude");
        var lng = document.getElementById("Longitude");
        var schoolName = document.getElementById("Scname");
        var schoolAddress = document.getElementById("Address");

        var html = '';
        if (res.results.length) {
            oUl.style.display = 'block';
            for (var i = 0; i < 5; i++)
                try {
                    html += '<li class="schoolLi" data-index=' + i + '>' + res.results[i].name + '</li>';
                } catch (e) {

                }
        } else {
            html = '<li class="schoolLi" data-index="-1">没有找到，直接输入</li>';
        }
        oUl.innerHTML = html;

        for (var j = 0; j < aLi.length; j++) {
            aLi[j].addEventListener("mouseover", function () {
                oQ.val(this.innerHTML);
            });
            aLi[j].addEventListener("click", function () {
                oUl.style.display = 'none';
                var num = this.dataset.index;
                if (num != -1) {
                    try {
                        schoolCode.value = res.results[num].uid;
                        lat.value = res.results[num].location.lat;
                        lng.value = res.results[num].location.lng;
                        schoolName.value = res.results[num].name;
                        schoolAddress.value = res.results[num].address;
                    } catch (e) {

                    }
                }
            });
        }
    }
    function schoolAjax(q) {
        var question = EncodeUtf8(q);
        $.ajax({
            type: 'get',
            url: 'http://api.map.baidu.com/place/v2/search?ak=PvGhSZuS43N79LAeAhPuanTw&output=json&tag=学校&query=' + question + '&page_size=20&page_num=0&scope=1&region='+$('#city').val(),//请求数据的地址
            dataType: 'jsonp',
            timeout: 5000,
            success: function (data) {
                var res = JSON.stringify(data);
                appendLi(data);
            },
            error: function (e) {
                alert("请求失败");
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    ajaxTimeoutTest.abort();
                    alert("超时，请重试");
                }
            }
        })
    }

    function EncodeUtf8(s1) {
        var s = escape(s1);
        var sa = s.split("%");
        var retV = "";
        if (sa[0] != "") {
            retV = sa[0];
        }
        for (var i = 1; i < sa.length; i++) {
            if (sa[i].substring(0, 1) == "u") {
                retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));
            }
            else retV += "%" + sa[i];
        }

        return retV;
    }

    function Str2Hex(s) {
        var c = "";
        var n;
        var ss = "0123456789ABCDEF";
        var digS = "";
        for (var i = 0; i < s.length; i++) {
            c = s.charAt(i);
            n = ss.indexOf(c);
            digS += Dec2Dig(eval(n));

        }
        //return value;
        return digS;
    }

    function Dec2Dig(n1) {
        var s = "";
        var n2 = 0;
        for (var i = 0; i < 4; i++) {
            n2 = Math.pow(2, 3 - i);
            if (n1 >= n2) {
                s += '1';
                n1 = n1 - n2;
            }
            else
                s += '0';

        }
        return s;

    }

    function Dig2Dec(s) {
        var retV = 0;
        if (s.length == 4) {
            for (var i = 0; i < 4; i++) {
                retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
            }
            return retV;
        }
        return -1;
    }

    function Hex2Utf8(s) {
        var retS = "";
        var tempS = "";
        var ss = "";
        if (s.length == 16) {
            tempS = "1110" + s.substring(0, 4);
            tempS += "10" + s.substring(4, 10);
            tempS += "10" + s.substring(10, 16);
            var sss = "0123456789ABCDEF";
            for (var i = 0; i < 3; i++) {
                retS += "%";
                ss = tempS.substring(i * 8, (eval(i) + 1) * 8);


                retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
                retS += sss.charAt(Dig2Dec(ss.substring(4, 8)));
            }
            return retS;
        }
        return "";
    }
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    }
});
