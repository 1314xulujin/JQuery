//表单验证

var nick = document.getElementById("nick");
var psw = document.getElementById("psw");
var psw1 = document.getElementById("psw1");
var tel = document.getElementById("tel");
var mail = document.getElementById("mail");
var old = document.getElementById("old");
var regForm = document.getElementsByClassName("reg-form");

//会在点击立即注册 (全部验证) => onsubmit 事件
function checkSubmit(){
	//所有表单验证项都通过 返回 true , 有一项验证不通过则返回false
	/*var arr = [checkNick(),checkPsw(),checkPsw1(),checkTel(),checkMail(),checkAge()];*/
	/*console.log(arr);*/
/*	 console.log(checkNick());
	checkPsw();
	checkPsw1();
	checkTel();
	checkMail();
	checkAge();*/
	//console.log(arr.indexOf(false)>-1?false:true);
	/*return arr.indexOf(false)>-1?false:true;*/
	
	if(checkNick() & checkPsw() & checkPsw1() & checkTel() & checkMail() & checkAge()){
		return true
		}
		
		return false;
	}

//在每一项输入完之后,进行下一项时会验证 = > onchange 事件
nick.onchange = checkNick;
psw.onchange = checkPsw;
psw1.onchange = checkPsw1;
tel.onchange = checkTel;
mail.onchange = checkMail;
old.onchange = checkAge;

//定义一个验证昵称方法
function checkNick(){
	//昵称不能为空 (非空验证) / 昵称的长度必须是在6- 10位 
	var val = nick.value;
	if(val==""){
		 return setStyle(nick,'昵称不能为空!',false);
	 }else if(val.length<6 || val.length >10){
		 return setStyle(nick,'昵称的长度必须是在6 - 10位字符之间!',false);
	}else{
		 return setStyle(nick,'昵称输入正确!',true);
		}	
}

//定义一个验证密码方法
function checkPsw(){
	var val = psw.value;
	if(val==""){
		 return setStyle(psw,'密码不能为空!',false);
	 }else if(val.length<6 || val.length >16){
		 return setStyle(psw,'密码的长度必须是在6 - 16位字符之间!',false);
	}else{
		return setStyle(psw,'密码输入正确!',true);
		}	
}

//定义一个验证确认密码方法
function checkPsw1(){
	var val = psw1.value;
	var val1 = psw.value;
	if(val==""){
		 return setStyle(psw1,'密码不能为空!',false);
	 }else if(val.length<6 || val.length >16){
		 return setStyle(psw1,'密码的长度必须是在6 - 16位字符之间!',false);
	}else if(val!==val1){
		 return setStyle(psw1,'两次密码不一致',false);
	}else{
		return setStyle(psw1,'密码输入正确!',true);
		}	
}

//定义一个验证手机号码方法
function checkTel(){
	var val = tel.value;
	if(!isMobile(val)){
	  return setStyle(tel,'手机号码不正确!',false);	
		}else{		
		return setStyle(tel,'手机号码输入正确!',true);	
	 }
	}

//定义一个验证手机号码方法
function checkMail(){
	var val = mail.value;
	if(!isMail(val)){
	 	return setStyle(mail,'邮箱输入不正确!',false);	
	   }else{		
		return setStyle(mail,'邮箱输入正确!',true);	
	 }
	}


//定义一个验证年龄的方法
function checkAge(){
	var val = old.value;
	if(isNaN(val) || val==""){
		return setStyle(old,'请输入您的年龄!',false);	
	 }else if(val < 16 || val > 150){
		return setStyle(old,'年龄不能超出人类承受范围!',false);	 
	 }else{
		return setStyle(old,'年龄输入正确!',true);	 
		}	 
	}

//定义一个方法用于处理样式

function setStyle(element,tip,status){//element 元素 , tip提示 , status 验证(成功失败)
	var className = status?'success reg-input':'error reg-input';
	element.parentNode.className=className;	
	element.nextElementSibling.innerHTML = '<i></i>' + tip;
	return status;
	}





//定义一个验证是否为正确的手机号码
function isMobile(tel){
			//校验是否为一个正确的手机号码
			var flag = false;
			if(tel.length==11){
				 var arr = [3,4,5,6,7,8,9];
				 var first = tel[0];
				 var sec = tel[1];
				 //console.log(arr,first,sec)
				 if(first==1 && arr.indexOf(sec*1)!=-1 && !isNaN(tel)){
					 flag = true;
					 }
			  }
			return flag;	
		  }

//定义一个验证是否为邮箱
function isMail(mail){
	var flag = false;
	var index1 = mail.indexOf('@');
	var index2 = mail.indexOf('.',index1);
	if(index1 > 1 && index2 >(index1 + 1) && index2<mail.length-2){
		flag = true;
		}
	  return flag;
	}		  


/*
	&& 与 & 
		都是用于判断逻辑运算符,用于判断两边是否都成立 ,区别就是&& 在一个条件失败之后,就不再进行后面所有的比较 , &(位运算符) 即使第一项验证为false ,依然执行完所有的条件判断
	
				
	|| 与 |
		都是用于判断逻辑运算符 ,用于判断或运算 ,多个条件中有一个成立则表达式成立 ,区别就是,|| 只要有遇到条件成立时,就不再往后执行 ,| 即使遇到条件成立, 依然执行完所有的判断条件.

**/	
	