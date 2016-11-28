$(function(){
	//关闭页面APP下载
	$('.fixed_close').click(function(){
		$('.download_app_wrap').css('display', 'none');
	});
	// 右边栏
	// 点击返回顶部
	$('#right_menu .menu_gotop').click(function(){
		var h = $(window).scrollTop();
		var timer = setInterval(function(){
			if(h <= 0){
				clearInterval(timer);
				h = 0;
			}else{
				h -= 300;
			}
			$(window).scrollTop(h);
			// console.log($(window).scrollTop())
		},30);
	});
	//点击出现右边购物袋
	var n = 1;
	$('#right_menu .menu_cart').click(function(){
		n++;
		// 偶数打开，奇数关闭
		if(n % 2 == 0) {
			$('#right_menu dd').animate({width: 294}, 300);
		}else{
			$('#right_menu dd').animate({width: 0}, 300);
		}
		// 点击购物袋中的关闭按钮，关闭购物车
		$('.close_menu_right').click(function(){
			$('#right_menu dd').animate({width: 0}, 300);
			n++;
		});
	});
	// 点击右边menu小图标左边div显示提示
	$('#right_menu li').hover(function() {
		$(this).find('.tabtip').css('display', 'block');
	}, function() {
		$(this).find('.tabtip').css('display', 'none');
	});
})
