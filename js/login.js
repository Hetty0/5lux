$(function(){
	/*不需要用浏览器地址传输
	// 封装接收url传递过来的cookie
	var userCookie = location.search;
	var flag = false;
	//判断是否存在cookie
	if(userCookie){
		userCookie = decodeURIComponent(userCookie);
		var m = userCookie.indexOf('=');
		var obj = JSON.parse(userCookie.substring(m + 1));
	}*/
	// 用cookie根目录储存，不需要浏览器传输
	/*function isRegister(name, value){
		// 传入一个参数时，判断是否有用户名，返回true/false
		// 传入两个参数时，判断用户名密码是否一致，返回true/false
		var arr0 = obj.username.split(' ');
		var arr1 = obj.password.split(' ');
		var n = arr0.indexOf(name);
		// 判断是否存在用户名
		if(n != -1){
			flag = true;
			// 当传入密码参数时，判断密码是否与cookie中的一致
			if(arguments[1]){
				if(arr1[n] == value){
					flag = true;
				}else{
					flag = false;
				}
			}
		}else{
			flag = false;
		}
		console.log(arr1[n] + ',' + value);
		return flag;
	}*/
	var flag = false;
	function isRegister(name, value){
		if($.cookie('username')){
			var arrName = $.cookie('username').split(' ');
			var arrPwd = $.cookie('password').split(' ');
			var n = arrName.indexOf(name);
			if (n != -1) {
				flag = true;
				// 当传入第二参数时，判断密码是否正确
				if(arguments[1]){
					if (arrPwd[n] == value) {
						flag = true;
					}else{
						flag = false;
					}
				}
			}else{
				flag = false;
			}
		}
		return flag;
	}
	// 用户名失去光标时判断cookie中有没有用户名
	$('.login_user').blur(function(){
		var logName = $(this).val();
		if(isRegister(logName)){
			$(this).next().html('输入正确√').css('color', 'green');
		}else{
			$(this).next().html('用户名不存在哦，赶紧去注册吧！').css('color', 'red');
		}
	});
	// 判断密码是否正确
	$('.login_pwd').blur(function(){
		var logName = $('.login_user').val();
		var logPwd = $(this).val();
		if (isRegister(logName, logPwd)) {
			$(this).next().html('输入正确√').css('color', 'green');
		}else{
			$(this).next().html('密码错误，请核对后输入！').css('color', 'red');
		}
	});

	// 点击登陆按钮，跳转到首页
	$('form').submit(function(){
		// 点击记住我,将当前账号存入cookie
		var checked = $('.remindMe input').attr('checked');
		if ($(this).get(0).checked) {
			$.cookie('currentName', $('.login_user').val(), {expires: 7});
			$.cookie('currentPwd', $('.login_pwd').val(), {expires: 7});
		}else{
			$.cookie('currentName', $('.login_user').val());
			$.cookie('currentPwd', $('.login_pwd').val());
		}
		// 是否登陆成功
		if(flag){
			alert('登陆成功');
		}else{
			alert('信息输入错误，请仔细核对');
			return false;
		}
	});



})