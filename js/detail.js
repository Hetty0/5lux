$(function(){
	$.ajax({
		url: "json/wallet.json",
		type: "GET",
		success: function(data){
			// 加载放大镜下面的小图片
			var miniShowBox_html = '';
			for (var i = 0; i < data.wallet_show.length; i++) {
				miniShowBox_html += "<li><img src='" + data.wallet_show[i] + "'></li>";
			};
			$('.miniShowBox').html(miniShowBox_html);

			// 点击向右箭头，图片向右滑动
			var w = 0;
			$('.turn_rt').mousedown(function(){
				var timer = setInterval(function(){
					if(w <= -435){
						clearInterval(timer);
					}else{
						w -= 46;
						$('.miniShowBox').stop().animate({left: w}, 300, 'linear');
					}
				},100);
				$(document).mouseup(function(){
					clearInterval(timer);
				});
			});
			// 点击左箭头，向左滑动
			$('.turn_lt').mousedown(function(){
				var timer = setInterval(function(){
					if(w >= 0){
						clearInterval(timer);
					}else{
						w += 46;
						$('.miniShowBox').stop().animate({left: w}, 300, 'linear');
					}
				},100);
				$(document).mouseup(function(){
					clearInterval(timer);
				});
			});
			// 点击小图片，相应大图在上面展示
			$('.miniShowBox li').click(function(){
				var n = $(this).index();
				$('.purchase_lt').find('dt img').attr('src', data.wallet_show[n]);
				$('.magnify img').attr('src', data.wallet_show[n]);
			});
			// 鼠标移上去显示放大镜
			$('.showBox').hover(function() {
				$('.overmask').show().find('.smallmask').show(500);
				// 右侧大图显示效果
				$('.magnify').show().stop().animate({
					width: 480,
					height: 480,
					opacity: 1,
					left: 576,
					top: 224,
				}, 500);

			}, function() {
				$('.overmask').hide();
				// 右侧大图消失效果
				$('.magnify').stop().animate({
					width: 20,
					height: 20,
					border: 0,
					opacity: 0,
					left: 288,
					top: 426,
				}, 500, function(){
					$('.magnify').hide();
				});
			});
			$('.showBox').hover(function(evt) {
				// 拖拽效果
				var w = evt.pageX - $('.smallmask').width() / 2;
				var h = evt.pageY - $('.smallmask').height() / 2;
				var maxLeft = $('.showBox').width() - $('.smallmask').width();
				var maxTop = $('.showBox').height() - $('.smallmask').height();
				if(w < 0){
						w = 0;
					}else if(w > maxLeft){
						w = maxLeft;
					}
				if (h < 0) {
					h = 0;
				}else if(h > maxTop){
					h = maxTop;
				}
				$('.smallmask').css('left', w);
				$('.smallmask').css('top', h);
				$('.showBox').mousemove(function(evt){
					var n = $('.magnify').width() / $('.smallmask').width();
					var disX = evt.pageX - $('.showBox').offset().left;
					var disY = evt.pageY - $('.showBox').offset().top;
					var left = disX - $('.smallmask').width() / 2;
					var top = disY - $('.smallmask').height() / 2;
					if(left < 0){
							left = 0;
						}else if(left > maxLeft){
							left = maxLeft;
						}
					if (top < 0) {
						top = 0;
					}else if(top > maxTop){
						top = maxTop;
					}
					$('.smallmask').css('left', left);
					$('.smallmask').css('top', top);
					$('.smallmask img').css('left', -left - 3);
					$('.smallmask img').css('top', -top - 3);
					$('.magnify img').css('left', -n * left);
					$('.magnify img').css('top', -n * top);
				});
			}, function() {
				$('.bg').off('mousemove');
			});
		}
	});
})

// 加载商品展示图片
$(function(){
	$.ajax({
		url: "json/wallet.json",
		type: "GET",
		success: function(data){
			// console.log(JSON.stringify(data));//数据返回成功
			// 加载商品详情中的图片
			var pro_show = '';
			for (var i = 0; i < data.wallet_dtail.length; i++) {
				pro_show += "<img src='" + data.wallet_dtail[i] + "'>";
			};
			$('.pro_show').html(pro_show);
			// 加载尺寸参照中的图片
			var gSize_html = '';
			for (var i = 0; i < data.wallet_size.length; i++) {
				gSize_html += "<img src='" + data.wallet_size[i] + "' />";
			};
			$('.gSize').html(gSize_html);
			// 加载同品牌推荐
			var same_brand_html = '';
			for (var i = 0; i < data.wallet_relative.length; i++) {
				same_brand_html += "<li><dl><dt><a href='" + data.wallet_relative[i].href + "'><img src='" + data.wallet_relative[i].src + "' /></a></dt><dd><p><a href='#'>" + data.wallet_relative[i].info + "</a></p><span>" + data.wallet_relative[i].price + "</span></dd></dl></li>";
			};
			$('.same_brand').html("<li class='bg9a'>同品牌推荐<li>" + same_brand_html);
			// 加载热销排行商品
			var hot_rank_html = '';
			for (var i = 0; i < data.hot_rank.length; i++) {
				hot_rank_html += "<li><dl><dt><a href='" + data.hot_rank[i].href + "'><img src='" + data.hot_rank[i].src + "' /></a></dt><dd><p><a href='#'>" + data.hot_rank[i].info + "</a></p><span>" + data.hot_rank[i].price + "</span></dd></dl></li>";
			};
			$('.hot_rank').html("<li class='bg9a'>热销排行<li>" + hot_rank_html);
		}
	});
});


$(function(){
	// 商品详情右侧会员价，隐藏div
	$('.memberPrice span').hover(function() {
		$(this).css({
			'borderColor': '#ccc',
			'borderBottomColor': '#fff',
		}).siblings().show();
	}, function() {
		$(this).css({
			'borderColor': '#fff',
		}).siblings().hide();
	});
	// 点击下拉箭头，活动显示/隐藏
	$('.shop_active').find('b').click(function(){
		console.log('aaa');
		if($('.isHide').css('display') == 'block'){
			$('.isHide').hide();
		}else{
			$('.isHide').show();
		}
	});
	// 点击加入购物车，效果
	var id = location.search;
	if(id){
		// 获取id名
		index = id.indexOf('=');
		id = id.substring(index + 1);
		$('.toCart').attr('id', id);
		$('.toCart').click(function(){
			creatCookie.call(this);
		});
	}

	// 点击手机购买，下面的二维码显示/隐藏
	$('.buyPhone').click(function(){
		console.log('a');
		if($('.qrCode').css('display') == 'none'){
			$('.qrCode').css('display', 'block');
		}else{
			$('.qrCode').css('display', 'none');
		}
	});
	//商品详情大图上鼠标移上去的蒙版
	$('.wlt_show_rtTop').hover(function() {
		$('.maskBig').show();
	}, function() {
		$('.maskBig').hide();
	});
	// 小图上鼠标移上去的蒙版
	$('.wlt_show_rtBtm > div').hover(function() {
		$(this).find('.maskSmall').show();
	}, function() {
		$(this).find('.maskSmall').hide();
	});
	// 点击商品详情，显示商品详情部分，尺寸参照和商品评价隐藏
	$('.to_gDtail').click(function(){
		$('html,body').animate({scrollTop: 842}, 300);
		$(this).css('color', '#c8a985').siblings('span').css('color', '#000');
		$('.gDtail').show();
		$('.gSize').hide();
		$('.gComment').hide();
	});
	// 点击尺寸参照，显示尺寸参照，其他隐藏
	$('.to_gSize').click(function(){
		$('html,body').animate({scrollTop: 842}, 300);
		$(this).css('color', '#c8a985').siblings('span').css('color', '#000');
		$('.gSize').show();
		$('.gDtail').hide();
		$('.gComment').hide();
	});
	// 点击商品评价，显示商品评价，其他两个隐藏
	$('.to_gComment').click(function(){
		$('html,body').animate({scrollTop: 842}, 300);
		$(this).css('color', '#c8a985').siblings('span').css('color', '#000');
		$('.gComment').show();
		$('.gSize').hide();
		$('.gDtail').hide();
	});
	// 吸顶菜单
	$(window).scroll(function(){
		h = $(window).scrollTop();
		if( h > 800){
			$('.wlt_show_tltwrap').css({
				position: 'fixed',
				top: 0,
				left: 0,
				borderBottom: '1px solid #ccc',
				zIndex: 5
			});
		}else{
			$('.wlt_show_tltwrap').css({
				position: 'relative',
				boder: 0,
				zIndex: 0
			});
		}
	});
})