/**
 * Created by Administrator on 2015/8/20.
 */
    //成绩上传部分
var caccount = document.getElementById("caccount");
var afterinput = document.getElementById("afterinput");
var terms = document.getElementById("terms");
var form = document.getElementById("inputgrade");
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
};
caccount.value = GetQueryString("caccount");



//发送ajax请求
function ajax() {
    $.ajax({
        type: 'get',//account=7&terms=11
        url: 'subjectProcess.php',//请求数据的地址
        dataType: 'json',
        data: {
            //学生account号
            account: account,
            //学期
            terms: terms,
            //科目
            subject:subject
        },
        timeout: 5000,
        success: function (data) {
            try {

                //班级平均成绩
                var average = data.grade5;


                ajaxbg.hide();
                //班级名称
                classname.innerHTML = data.classname;

                //班级头像
                if (data.pict == 'null') {
                    pict.src = 'img/logo.png';
                } else {
                    pict.src = "http://115.28.26.202/picture/" + data.pict;
                }

                //若数据为空，不能翻页
                if (data.grade1["chinese"] == 0 && terms > 1) {
                    terms--;
                    window.location.href = 'teacher.html?account=' + GetQueryString("account") + '&terms=' + terms;
                };
                //画出直线和环形图
                paintChart(data);

            } catch (e) {
                alert("请重试");
                ajaxbg.hide();
            }
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
    });
}

//获取班级信息列表
