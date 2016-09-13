$(function () {
    var ajaxbg = $("#background,#progressBar");
    var subjects = ["chinese", "math", "english", "physics", "chemistry", "biology", "politics", "history", "geography", "good", "pass", "fail", "last-target", "real-rank", "next-target"];
    var subjectsName = ["语文", "数学", "英语", "物理", "化学", "生物", "政治", "历史", "地理", "优秀率", "及格率", "不及格率", "上次目标", "实际排名", "下次目标", "下次目标"];
    var varies = $(".grades-varies");
    var grades = $(".subjects-grades");
    var account = GetQueryString("account") || 1;
    var terms = GetQueryString("terms") || 1;
    var total = [120, 120, 120, 100, 100, 100, 100, 100, 100];
    var classname = document.getElementById("classname");
    var pict = document.getElementById("pict");
    var left = document.getElementById("left-grade");
    var right = document.getElementById("right-grade");
    var num = GetQueryString("terms") || 1;
    var times = document.getElementById("times");
    times.innerHTML = num;
    ajaxbg.show();
    // singleGrade();
    // ajax();
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null
    }
    paintChart();
    Vary();
    radar()    

    // function ajax() {
    //     $.ajax({
    //         type: 'get',
    //         url: 'process.php',
    //         dataType: 'json',
    //         data: {account: account, terms: terms, interface: 'student'},
    //         timeout: 5000,
    //         success: function (data) {
    //             try {
    //                 var grade = data.grade1;
    //                 var vary = data.grade3;
    //                 var average = data.grade5;
    //                 ajaxbg.hide();
    //                 classname.innerHTML = data.classname;
    //                 if (data.pict == 'null') {
    //                     pict.src = 'img/logo.png'
    //                 } else {
    //                     pict.src = "http://115.28.26.202/picture/" + data.pict
    //                 }
    //                 if (data.grade1["chinese"] == 0 && num > 1) {
    //                     num--;
    //                     window.location.href = 'student.html?account=' + GetQueryString("account") + '&terms=' + num + '&end=1'
    //                 }
    //                 if (terms == 1) {
    //                     left.style.visibility = 'hidden'
    //                 }
    //                 if (GetQueryString('end') == 1) {
    //                     right.style.visibility = 'hidden'
    //                 }
    //                 Vary(vary, data);
    //                 paintChart(grade, average, data);
    //                 radar(grade)
    //             } catch (e) {
    //                 alert("请重试");
    //                 ajaxbg.hide()
    //             }
    //         },
    //         error: function (e) {
    //             alert("请求失败")
    //         },
    //         complete: function (XMLHttpRequest, status) {
    //             if (status == 'timeout') {
    //                 ajaxTimeoutTest.abort();
    //                 alert("超时，请重试")
    //             }
    //         }
    //     })
    // }

    function paintChart() {
        var studentGrade1 = [];
        var classGrade = [];
        var studentGrade2 = [];
        var grade = {
            "chinese":80, 
            "math":90, 
            "english":70, 
            "physics":79, 
            "chemistry":89, 
            "biology":80, 
            "politics":89, 
            "history":89, 
            "geography":89            
        };        
        var average = {
            "chinese":79, 
            "math":100, 
            "english":80, 
            "physics":88, 
            "chemistry":70, 
            "biology":75, 
            "politics":90, 
            "history":70, 
            "geography":80            
        };

        var rate = [0.5, 0.8, 0.2];
        for (var i = 0; i < 9; i++) {
            studentGrade1[i] = {label: subjectsName[i], y: grade[subjects[i]]};
            classGrade[i] = {label: subjectsName[i], y: average[subjects[i]]};
            grades[i].innerHTML = grade[subjects[i]];
            studentGrade2[i] = {
                backgroundColor: "#dbdddd",
                title: {text: subjectsName[i]},
                data: [{
                    indexLabelLineColor: "#00afeb",
                    type: "doughnut",
                    dataPoints: [{
                        y: grade[subjects[i]],
                        indexLabel: "",
                        color: "#00afeb"
                    }, {y: total[i] - grade[subjects[i]], indexLabel: "", color: "#d2d2d2"}]
                }]
            }
        }
        for (var i = 9; i < 12; i++) {
            grades[i].innerHTML = (rate[i - 9] * 100).toFixed(0) + '%';
            studentGrade2[i] = {
                backgroundColor: "#dbdddd",
                title: {text: subjectsName[i]},
                data: [{
                    indexLabelLineColor: "#00afeb",
                    type: "doughnut",
                    dataPoints: [{y: rate[i - 9].toFixed(2), indexLabel: "", color: "#00afeb"}, {
                        y: 1 - rate[i - 9],
                        indexLabel: "",
                        color: "#d2d2d2"
                    }]
                }]
            }
        }
        var chart = new CanvasJS.Chart("chartContainer", {
            colorSet: "#00aff0",
            backgroundColor: "#e6e7e7",
            title: {fontFamily: "tahoma", text: "班级各科平均成绩"},
            animationEnabled: true,
            axisY: {titleFontFamily: "arial", titleFontSize: 12, includeZero: false},
            toolTip: {shared: true},
            data: [{type: "line", name: "你的成绩", showInLegend: true, dataPoints: studentGrade1}, {
                type: "line",
                name: "班级平均成绩",
                showInLegend: true,
                dataPoints: classGrade
            }],
            legend: {
                cursor: "pointer", itemclick: function (e) {
                    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false
                    } else {
                        e.dataSeries.visible = true
                    }
                    chart.render()
                }
            }
        });
        try {
            for (var i = 0; i < subjects.length; i++) {
                new CanvasJS.Chart(subjects[i], studentGrade2[i]).render()
            }
        } catch (e) {
        }
        chart.render();
        ajaxbg.hide();
    }

    function radar() {
        var grade = {
            "chinese":80, 
            "math":90, 
            "english":70, 
            "physics":79, 
            "chemistry":89, 
            "biology":80, 
            "politics":89, 
            "history":89, 
            "geography":89            
        };         
        var data = [{
            className: '成绩雷达图',
            axes: [{axis: "语文", value: grade[subjects[0]]}, {axis: "数学", value: grade[subjects[1]]}, {
                axis: "英语",
                value: grade[subjects[2]]
            }, {axis: "物理", value: grade[subjects[3]]}, {axis: "化学", value: grade[subjects[4]]}, {
                axis: "生物",
                value: grade[subjects[5]]
            }, {axis: "政治", value: grade[subjects[6]]}, {axis: "历史", value: grade[subjects[7]]}, {
                axis: "地理",
                value: grade[subjects[8]]
            }]
        }];
        var chart = RadarChart.chart();
        chart.config({w: 300, h: 300, axisText: true, r: 2, levels: 0, circles: true});
        RadarChart.defaultConfig.w = '300';
        RadarChart.defaultConfig.h = '300';
        RadarChart.defaultConfig.radius = 2;
        RadarChart.draw(".chart-container", data)
    }

    // left.onclick = function () {
    //     if (num > 1) {
    //         num--
    //     }
    //     window.location.href = 'student.html?account=' + GetQueryString("account") + '&terms=' + num
    // };
    // right.onclick = function () {
    //     if (num < 5) {
    //         num++
    //     }
    //     window.location.href = 'student.html?account=' + GetQueryString("account") + '&terms=' + num
    // };
    // function singleGrade() {
    //     var grade = $('.subjects a');
    //     for (var i = 0; i < 9; i++) {
    //         grade[i].href = 'subject.html?account=' + GetQueryString("account") + '&subject=' + subjects[i] + '&terms=' + terms + '&role=student'
    //     }
    // }

    function Vary() {
        var rate = [0.5, 0.8, 0.2];
        var vary = {
            "chinese":2, 
            "math":3, 
            "english":10, 
            "physics":12, 
            "chemistry":8, 
            "biology":8, 
            "politics":2, 
            "history":-3, 
            "geography":7

        }

        for (var i = 0; i < 9; i++) {
            varies[i].innerHTML = vary[subjects[i]];
            if (vary[subjects[i]] > 0) {
                varies.eq(i).addClass("red");
                varies.eq(i).append("<i class='icon-arrow-up'></i>")
            } else if (vary[subjects[i]] < 0) {
                varies.eq(i).append("<i class='icon-arrow-down'></i>")
            } else {
                varies.eq(i).append("<i class='icon-minus'></i>")
            }
        }
        for (var i = 9; i < 12; i++) {
            varies[i].innerHTML = (rate[i - 9] * 100).toFixed(1) + '%'
        }
    }
});