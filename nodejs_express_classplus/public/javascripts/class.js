/**
 * Created by Administrator on 2015/8/20.
 */
    //�ɼ��ϴ�����
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



//����ajax����
function ajax() {
    $.ajax({
        type: 'get',//account=7&terms=11
        url: 'subjectProcess.php',//�������ݵĵ�ַ
        dataType: 'json',
        data: {
            //ѧ��account��
            account: account,
            //ѧ��
            terms: terms,
            //��Ŀ
            subject:subject
        },
        timeout: 5000,
        success: function (data) {
            try {

                //�༶ƽ���ɼ�
                var average = data.grade5;


                ajaxbg.hide();
                //�༶����
                classname.innerHTML = data.classname;

                //�༶ͷ��
                if (data.pict == 'null') {
                    pict.src = 'img/logo.png';
                } else {
                    pict.src = "http://115.28.26.202/picture/" + data.pict;
                }

                //������Ϊ�գ����ܷ�ҳ
                if (data.grade1["chinese"] == 0 && terms > 1) {
                    terms--;
                    window.location.href = 'teacher.html?account=' + GetQueryString("account") + '&terms=' + terms;
                };
                //����ֱ�ߺͻ���ͼ
                paintChart(data);

            } catch (e) {
                alert("������");
                ajaxbg.hide();
            }
        },
        error: function (e) {
            alert("����ʧ��");
        },
        complete: function (XMLHttpRequest, status) { //������ɺ�����ִ�в���
            if (status == 'timeout') {//��ʱ,status����success,error��ֵ�����
                ajaxTimeoutTest.abort();
                alert("��ʱ��������");
            }
        }
    });
}

//��ȡ�༶��Ϣ�б�
