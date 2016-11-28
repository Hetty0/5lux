$(function(){
	var cookieName = $.cookie('username');
	var cookiePwd = $.cookie('password');
	//设置标识变量
	var flag = false;
	// 当失去光标时判断手机号码是否正确
	$('#regi_phone').blur(function(){
		var str = $(this).val();
		var reg = /^1\d{10}$/;
		if(reg.test(str)){
			// 判断输入的手机号是否有cookie缓存
			if(cookieName){
				if(cookieName.search(str) != -1){
					$(this).next('.remind_tips').text('手机号已注册，请转到登陆页面').css('color', 'red');
					flag = false;
				}else{
					$(this).next('.remind_tips').text('输入正确 √').css('color', 'green');
					flag = true;
				}
			}else{
				$(this).next('.remind_tips').text('输入正确 √').css('color', 'green');
				flag = true;
			}
			flag = true;
		}else{
			$(this).next('.remind_tips').text('您输入的手机号码有误，请重新输入').css('color', 'red');
			flag = false;
			return;
		}
	});
	
	var strCode = '';
	showCode();
	$('.getcode').click(showCode);
	function showCode(){
		// 当点击获取验证码时，系统随机产生 4 位验证码
		var str = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ';//length:62
		strCode = '';
		for (var i = 0; i < 4; i++) {
			var n = Math.floor(Math.random() * 62);
			strCode += str[n];
		};
		$('#regi_code').next('.remind_tips').text('验证码为：'+strCode).css('color', 'green');
	}
	// 当失去光标时判断手机验证码是否正确
	$('#regi_code').blur(function(){
		if(strCode != ''){
			// console.log(new RegExp(strCode,'i'));
			if($(this).val().match(new RegExp(strCode,'i'))){
				$(this).next('.remind_tips').text('输入正确 √').css('color', 'green');
				flag = true;
			}else {
				$(this).next('.remind_tips').text('您输入的验证码有误，请重新获取').css('color', 'red');
				flag = false;
				return;
			}
		}else{
			flag = false;
		}
	});

	// 验证密码(设定为6-18位)，分为强、一般、弱三种
	//重点判断强和弱两种
	$('#regi_pwd').blur(function(){
		var strPwd = $(this).val();
		// 判断是否满足长度
		if (strPwd.length >= 6 && strPwd.length <= 18) {
			//判断密码强度：强 有字母大写、小写、数字
			if(/\d/.test(strPwd) && /[a-z]/.test(strPwd) && /[A-Z]/.test(strPwd)){
				$(this).next('.remind_tips').text('密码强度：强').css('color', 'green');
			}else if(/^\d+$/.test(strPwd) || /^[a-z]+$/.test(strPwd) || /^[A_Z]+$/.test(strPwd)){
				$(this).next('.remind_tips').text('密码强度：弱').css('color', 'green');
			}else{
				$(this).next('.remind_tips').text('密码强度：中').css('color', 'green');
			}
		}else{
			$(this).next('.remind_tips').text('您输入的密码长度不合法，请重新输入').css('color', 'red');
		}
		if($('#confir_pwd').val().length != 0){
			isPwdSame();
		}
	});
	// 确认密码验证
	$('#confir_pwd').blur(function(){
		isPwdSame();
	});
	//封装判断两次输入是否一致函数
	function isPwdSame(){
		var pwd = $('#regi_pwd').val();
		var conPwd = $('#confir_pwd').val();
		if(pwd.length >= 6 & pwd.length <= 18){
			if (conPwd == pwd) {
				$('#confir_pwd').next('.remind_tips').text('输入正确 √').css('color', 'green');
				flag = true;
			}else{
				$('#confir_pwd').next('.remind_tips').text('两次输入密码长度不一致，请重新输入').css('color', 'red');
				flag = false;
				return;
			}
		}else{
			flag = false;
		}
	}
	
	// 点击提交按钮
	$('form').submit(function(){
		// 判断每个输入框是否为空置
		if($('#regi_phone').val() == ''){
			$('#regi_phone').next('.remind_tips').text('请输入手机号').css('color', 'red');
			flag = false;
		}else if($('#remind_tips').val() == ''){
			$('#remind_tips').next('.remind_tips').text('请输入验证码').css('color', 'red');
			flag = false; 
		}else if($('#confir_pwd').val() == ''){
			$('#confir_pwd').next('.remind_tips').text('请输入验证码').css('color', 'red');
			flag = false;
		}
		if (flag) {
			alert('注册成功');
			// 判断是否有cookie缓存，如有，则取出并重新赋值
			if(cookieName){
				cookieName = cookieName.concat(' ' + $('#regi_phone').val());
				cookiePwd = cookiePwd.concat(' ' + $('#regi_pwd').val());
				$.cookie('username', cookieName, {expires: 365});
				$.cookie('password', cookiePwd, {expires: 365});
			}else {
				// 存入coolie缓存
				$.cookie('username', $('#regi_phone').val(), {expires: 365});
				$.cookie('password', $('#regi_pwd').val(), {expires: 365});
			}
			// 跳转到登陆页面(cookie直接储存在根目录中，不用地址传输，不安全)
			/*var userCookie = {"username": $.cookie('username'),"password": $.cookie('password')};
			$('form').attr('action', 'login.html?userCookie=' + JSON.stringify(userCookie));*/
		}else {
			alert('输入信息有误，请仔细检查');
			return false;
		}
	});

	// 当点击已有账号，立即登陆时(cookie直接储存在根目录中，不需传输)
	/*var userCookie = {"username": $.cookie('username'),"password": $.cookie('password')};
	$('.regi_login a').attr('href', 'login.html?userCookie=' + JSON.stringify(userCookie));*/
});