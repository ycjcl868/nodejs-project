//表单验证JS代码
jQuery.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    var mobile = /^(((13[0-9]{1})|(18[0-9]{1})|(15[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "<i class='reg-verw'></i>×请正确填写您的手机号码");

jQuery.validator.addMethod("Chinese", function (value, element) {
    var mobile = /^[\u4e00-\u9fa5]{2,4}$/i;
    return this.optional(element) || (mobile.test(value));
}, "<i class='reg-verw'></i>请输入你的真实姓名");

$(function () {
    //注册表单
    var validate = $("#register").validate({
        rules: {
            debug: true,
            name: {
                required: true,
                Chinese: true
            },
            password1: {
                required: true,
                minlength: 5
            },
            password2: {
                required: true,
                minlength: 5,
                equalTo: "#password1"
            },
            number: {
                required: true,
                isMobile: true,
                remote: {
                    url: "checkphone.php",
                    type: "get",
                    data: {
                        number: function () {
                            return $("#number").val();
                        }
                    }
                }
            },
            captcha: {
                required: true,
                minlength: 4,
                maxlength: 4,
                remote: {
                    url: "process.php",
                    type: "post",
                    data: {
                        captcha: function () {
                            return $("#phone_code").val();
                        }
                    }
                }
            }
        },

        success: function (label) {
            label.addClass("valid");

        },
        messages: { //定义提示信息
            name: {
                required: "不能为空",
                Chinese: "请输入真实姓名"
            },
            sex: "请选择性别",
            password1: {
                required: "不能为空",
                minlength: $.validator.format("至少五位字符")
            },
            password2: {
                required: "不能为空",
                minlength: $.validator.format("至少五位字符"),
                equalTo: $.validator.format("两次密码不一致")
            },
            number: {
                required: $.validator.format("不能为空"),
                isMobile: $.validator.format("请输入正确的手机号码"),
                remote: "手机号已存在"
            },
            captcha: {
                required: "不能为空",
                minlength: $.validator.format("请输入4位校验码"),
                maxlength: $.validator.format("请输入4位校验码"),
                remote: "校验码错误"
            }
        }
    });

    $("#register").onsubmit = function () {
        if ($("#futid").value == '') {
            return false;
        }
    };


    //登陆表单
    var validate2 = $("#login").validate({
        rules: {
            debug: true,
            phone: {
                required: true,
                isMobile: true
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        success: function (label) {
            label.addClass("valid");
        },
        messages: {
            phone: {
                required: $.validator.format("不能为空"),
                isMobile: $.validator.format("请输入正确的手机号码"),
            },
            password: {
                required: "不能为空",
                minlength: $.validator.format("至少五位字符")
            }
        }
    });


    //创建班级表单
    var validate3 = $("#createclassForm").validate({
        rules: {
            debug: true,
            "file": {
                required: true,
                accept: 'image/*'
            },
            "grade": {
                required: true,
            },
            "classname": {
                required: true,
                maxlength: 10
            }
        },
        success: function (label) {
            label.addClass("valid");
        },
        messages: {
            file: {
                required: $.validator.format("请上传头像"),
                accept: "请上传jpg|png|bmp|gif等格式的图片"
            },
            grade: {
                required: "不能为空",
            },
            classname: {
                required: "不能为空",
                maxlength: $.validator.format("名称过长")
            }
        },
    });


    //关联班级
    var validate4 = $("#relateForm").validate({
        rules: {
            debug: true,
            Taccount: {
                required: true,
                number: true
            }
        },
        success: function (label) {
            label.addClass("valid");
        },
        messages: {
            Taccount: {
                required: $.validator.format("请输入班级ID"),
                number: "请输入数字ID"
            }
        }
    });


    //导入成绩表单
    var validate5 = $("#inputgrade").validate({
        rules: {
            "terms": {
                required: true,
                number: true
            },
            "file": {
                required: true,
                accept: "xls/*"
            }
        },
        success: function (label) {
            label.addClass("valid");
        },
        messages: {
            "terms": {
                required: $.validator.format("请填写第几次的考试成绩"),
                number: "请输入数字"
            },
            "file": {
                accept: "请上传xls文件",
                required: "不能为空"
            }
        },
    });
    //清除错误信息
    var oForm = document.getElementById("login");
    var error0 = document.getElementById("error0");
    var error1 = document.getElementById("error1");
    try{
        var oPhone = oForm.phone||document.getElementById("inputPhone");
        oPhone.onfocus = function () {
            error0.innerHTML = '';
            error1.innerHTML = '';
        };
    }catch(e){

    }



    //
    //$('#btn-reset').click(function () {
    //    document.formName.reset();
    //});


})
