var nick = $("#nick");
var psw = $("#psw");
var psw1 = $("#psw1");
var tel = $("#tel");
var mail = $("#mail");
var old = $("#old");
var regForm = $(".reg-form");

//每次输入完之后，进行下一波验证，触发onchange事件来验证
nick[0].onchange = checkNick;
psw[0].onchange = checkPsw;
psw1[0].onchange = checkPsw1;
tel[0].onchange = checkTel;
mail[0].onchange = checkMail;
old[0].onchange = checkOld;

//定义一个点击立即注册（全部验证）

function checkSubmit(){
    if(checkNick() & checkPsw() & checkPsw1() & checkTel() & checkMail() & checkOld()){
        regForm.attr("action","https://www.baidu.com")
		return true
    }
    return false;
}
//定义一个验证昵称的方法

function checkNick(){
    var val = nick.val();
    var reg = /^[\u4E00-\u9FA5\w-]{6,10}$/;
    if( val == "" ){
        return setStyle(nick[0],"昵称不能为空",false);
    }else if( reg.test(val) == false ){
        return setStyle(nick[0],"昵称格式不正确",false);
    }else{
        return setStyle(nick[0],"昵称格式正确",true)
    }
}

//定义一个验证第一次密码的方法

function checkPsw(){
    var val = psw.val();
    var reg = /^[0-9A-z\!\?]{6,16}$/;
    if( val == "" ){
        return setStyle(psw[0],"密码不能为空",false);
    }else if( reg.test(val) == false ){
        return setStyle(psw[0],"密码格式不正确",false);
    }else{
        return setStyle(psw[0],"密码格式正确",true)
    }
}

//定义一个验证第一次密码的方法

function checkPsw1(){
    var val = psw.val();
    var val1 = psw1.val();
    var reg = /^[0-9A-z\!\?]{6,16}$/;
    if( val1 == "" ){
        return setStyle(psw1[0],"密码不能为空",false);
    }else if( val!=val1 ){
        return setStyle(psw1[0],"密码与上面密码输入不一致",false);
    }else if( reg.test(val1) == false ){
        return setStyle(psw1[0],"密码格式不正确",false);
    }else{
        return setStyle(psw1[0],"密码格式正确",true)
    }
}

//定义一个验证手机号码的方法

function checkTel(){
    var val = tel.val();
    var reg = /^1[3-9]\d{9}$/;
    if( val == "" ){
        return setStyle(tel[0],"手机号码不能为空",false);
    }else if( reg.test(val) == false ){
        return setStyle(tel[0],"手机号码格式错误",false);
    }else{
        return setStyle(tel[0],"手机号码格式正确",true);
    }
}

//定义一个验证邮箱的方法

function checkMail(){
    var val = mail.val();
    var reg = /^[\w\.]+@[A-z0-9]+\.[A-z0-9]{2,6}$/;
    if( val == "" ){
        return setStyle(mail[0],"邮箱不能为空",false);
    }else if( reg.test(val) == false ){
        return setStyle(mail[0],"邮箱格式错误",false);
    }else{
        return setStyle(mail[0],"邮箱格式正确",true);
    }
}

//定义一个验证年龄的方法

function checkOld(){
    var val = old.val();
    var reg = /(^1[6-9]$|^[2-9][0-9]$)/;
    if( val == "" ){
        return setStyle(old[0],"年龄不能为空",false);
    }else if( reg.test(val) == false ){
        return setStyle(old[0],"年龄格式错误或者年龄不符合范围",false);
    }else{
        return setStyle(old[0],"年龄格式正确",true);
    }
}
//定义一个方法用于处理样式

function setStyle(element,tip,status){//element 元素 , tip提示 , status 验证(成功失败)
    var className = status?'success reg-input':'error reg-input';
    element.parentNode.className = className;
    element.nextElementSibling.innerHTML = '<i></i>'+tip;
    return status;
}