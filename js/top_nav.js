$(function(){

	// 头部广告
	$('.deliver_rule').click(function(){
		$('.rule_box').css('display', 'block');
	});
	$('.rule_box .rule_colse').click(function(){
		$('.rule_box').css('display', 'none');
	});
	//head-my5lux下拉菜单
	$('.my5lux > a').mouseenter(function(){
		$(this).css('color', '#d00000');
		$('.my5lux').css('backgroundPosition', '-253px -464px');
	}).mouseleave(function(){
		$(this).css('color', '#666666');
		$('.my5lux').css('backgroundPosition', '-253px -436px');
	});
	$('.my5lux').mouseenter(function(){
		$(this).css({
			'backgroundColor': '#fff',
			'backgroundPosition': "-253px -464px"
		}).children().eq(0).css('color', '#d00000');
		$(this).find('ul').css('display', 'block')
			.find('li').mouseover(function(){
				// $('.my5lux > a').css('color', '#666666');
				$(this).find('a').css('color', 'red');
				$(this).siblings().find('a').css('color', '#666666');
			});
	}).mouseleave(function(){
		$(this).css({
			'backgroundColor': '#f2f2f2',
			'backgroundPosition': "-253px -436px"
		}).children('a').css('color', '#666666');
		$('.my5lux ul').css('display', 'none');
	});
	//head-download下拉菜单
	$('.download > a').mouseenter(function(){
		$(this).css('color', '#d00000');
		$('.download').css('backgroundPosition', '-210px -404px');
	}).mouseleave(function(){
		$(this).css('color', '#666666');
		$('.download').css('backgroundPosition', '-210px -368px');
	});
	$('.download').mouseenter(function(){
		$(this).css({
			'backgroundColor': '#fff',
			'backgroundPosition':  '-210px -404px'
		});
		$(this).find('ul').css('display', 'block');
	}).mouseleave(function(){
		$(this).css({
			'backgroundColor': '#f2f2f2',
		}).find('a').css('color', '#666666');;
		$(this).find('ul').css('display', 'none');
	});
	//mid_head购物车
	$('.shopping_cart').mouseenter(function(){
		$('.empty').css('display', 'block');
		$('.shopping_box').css('display', 'block');
	}).mouseleave(function(){
		$('.empty').css('display', 'none');
		$('.shopping_box').css('display', 'none');
	});
	//nav 到店背景切换366 252
	$('.nav_left_last').mouseenter(function(){
		$('.icon_shop').css('backgroundPosition', '-366px -252px');
	}).mouseleave(function(){
		$('.icon_shop').css('backgroundPosition', '-58px -169px');
	});;
	//nav_right手风琴特效
	$('.nav_right li').mouseenter(function(){
		$(this).stop().animate({width: 140}, 300).siblings().stop().animate({width: 30}, 300);
	}).mouseleave(function(){
		$(this).stop().animate({width: 30}, 300)
	});;
})
$(function(){
	// 判断是否有cookie用户
	var user = $.cookie('currentName');
	if(user){
		$('.head_user').html('欢迎用户：' + user);
		$('.login').hide();
	}
});
