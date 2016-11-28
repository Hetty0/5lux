// banner轮播图开始
$(function(){
	$.ajax({
		url: 'json/banner.json',
		type: 'GET',
		success: function(data){
			// console.log(JSON.stringify(data));//数据返回成功
			var banner_html = '';
			var banner_dot_html = '';
			for (var i = 0; i < data.length; i++) {
				banner_html += '<li><a href="' + data[i].href + '"><img src="' + data[i].src + '"></a></li>';
				banner_dot_html += "<div></div>";
			};
			banner_html = "<li><a href='" + data[data.length-1].href + "'><img src='" + data[data.length-1].src + "'></a></li>" + banner_html + "<li><a href='" + data[0].href + "'><img src='" + data[0].src + "'></a></li>";
			$('.banner_move').html(banner_html);//添加图片
			$('.banner_dot').html(banner_dot_html);//添加小圆点

			//数据下载成功后，设置滚动效果
			var liWidth = document.documentElement.clientWidth || document.body.clientWidth;
			var length = $(".banner_move").children().length;
			var i = -1;
			var j = 0;
			$('.banner, .banner_move li').css('width', liWidth);
			$('.banner_move').css({
				'width': liWidth * length,
				'left': liWidth * i
			});
			$('.banner_dot').children().eq(0).addClass('active');
			// 点击右边按钮，实现向右滚动
			$('.banner_rt').click(function(){
				perfectMove();
			});
			//点击左边按钮，实现向左滚动
			$('.banner_lt').click(function(){
				if(i == -1){
					i = -6;
					j = 5;
					$('.banner_move').css('left', liWidth * -7);
				}else{
					i++;
				}
				j = -i-1;
				move();
				active();
				console.log(i + ',' + j);
			});
			// 点击小圆点，实现对应出现
			$('.banner_dot div').mouseover(function(){
				i = -($(this).index() + 1);
				j = $(this).index();
				move();
				active();
			});
			// 当鼠标移上去自动播放停止，反之播放
			$('.banner').hover(function() {
				palyStop();
			}, function() {
				play();
			});
			// 自动播放
			play();
			// 生成定时器
			function play(){
				timer = setInterval(perfectMove,3000);
			}
			// 停止定时器
			function palyStop(){
				clearInterval(timer);
			}
			//封装运动函数
			function move(){
				$('.banner_move').stop().animate({left: liWidth * i}, 300)
			}	
			//封装小圆点样式函数
			function active(){
				$('.banner_dot').children().eq(j).addClass('active').siblings().removeClass('active');
			} 
			// 封装完美向左滚动
			function perfectMove(){
				if(i == -6){
					i = -1;
					j = 0;
					$('.banner_move').css('left', 0);
				}else{
					i--;
				}
				j = -i - 1;
				move();
				active();
			}

			
		}
		// banner轮播图结束
	});
});

// flagship 开始
$(function(){
	$.ajax({
		url: 'json/flagship.json',
		type: 'GET',
		success: function(data){
			// console.log(JSON.stringify(data));//数据返回成功
			var show_person_html = '';
			var hotstore_html = '';
			for (var i = 0; i < data[0].length; i++) {
				show_person_html += "<li><a href='#'><img src='" + data[0][i].src_person + "'/></a><div class='brand_hide'><img src='" + data[0][i].src_mini +"'/><span></span><p>" + data[0][i].ename + "</p><p>" + data[0][i].cname + "</p></div></li>";
			};
			$(".show_person").html(show_person_html);
			for (var j = 0; j < data[1].length; j++) {
				var in_hotstore = '';
				for (var k = 0; k < data[1][j].length; k++) {
					in_hotstore += "<div id = 'changeBd" + k + "'><img src='" + data[1][j][k].src_store + "' /><p><a href='#'>" + data[1][j][k].txt + "</a><span></span></p><div class='topline'></div><div class='rightline'></div><div class='bottomline'></div><div class='leftline'></div></div>";
				};
				hotstore_html += "<li>" + in_hotstore + "</li>";
			};
			$(".hotstore_cont").html(hotstore_html);
			// show_person将最后一个li元素margin-right设置为0
			$(".show_person").children().last().css('marginRight', 0) ;
			// brand_hide动画效果
			$('.show_person li > a').hover(function() {
				$(this).siblings('.brand_hide').stop().animate({height: 154}, 200);
			}, function() {
				$(this).siblings('.brand_hide').stop().animate({height: 54}, 200)
			});
			// hotstore_cont将最右边的div元素margin-right设置为0
			for (var i = 0; i < $('.hotstore_cont li > div').length; i++) {
				if((i + 1) % 7 == 0){
					$('.hotstore_cont li > div').eq(i).css('marginRight', 0);
				}
			};
			// 热门旗舰店-添加鼠标划上效果
			$('.hotstore_cont li div').hover(function() {
				showBorder(this);
				$(this).children('img').animate({opacity: 0}, 300);
				$(this).children('p').stop().animate({opacity: 1}, 300);
			}, function() {
				hideBorder(this);
				$(this).children('img').animate({opacity: 1}, 300);
				$(this).children('p').stop().animate({opacity: 0}, 300);
			});
			// 点击左右箭头切换品牌
			var n = 0;
			$('.hot_next').click(function(){
				n++;
				if (n > 2) {
					n = 2;
					return;
				};
				console.log(n);
				$(this).parent().siblings().animate({left: -1210 * n}, 300);
			});
			$('.hot_pre').click(function(){
				if (n <= 0) {
					n = 0;
					return;
				};
				n--;
				console.log(n);
				$(this).parent().siblings().animate({left: -1210 * n}, 300);
			});

		}
	});
});
//封装鼠标划上边框渐变显示效果
function showBorder(obj){
	var h = $(obj).height();
	var w = $(obj).width();
	$(obj).find('.topline').stop().animate({'width': w + 1}, 300);
	$(obj).find('.rightline').stop().animate({'height': h + 1}, 300);
	$(obj).find('.bottomline').stop().animate({'width': w + 1}, 300);
	$(obj).find('.leftline').stop().animate({'height': h + 2}, 300);
}
function hideBorder(obj) {
	$(obj).find('.topline').stop().animate({'width': 0}, 300);
	$(obj).find('.rightline').stop().animate({'height': 0}, 300);
	$(obj).find('.bottomline').stop().animate({'width': 0}, 300);
	$(obj).find('.leftline').animate({'height': 0}, 300);
};
// flagship 结束

// hot_items开始
$(function(){
	// 最后一个span(明星同款)标签margin-right = 0；
	$('.hot_items_tag').children().last().css('marginRight', 0);
	// 加载数据
	$.ajax({
		url: 'json/hot_items.json',
		type: 'GET',
		success: function(data){
			// console.log(data);//数据加载成功
			var html = '';
			var init = '';
			for (var i = 0; i < data.length; i++) {
				var mini_good = '';
				for (var j = 0; j < data[i].child.length; j++) {
					var add = '';
					if(i == 2){
						add = "<div><p><a href='#'><span>" + data[i].child[j].ename + "</span><span>" + data[i].child[j].cname + "</span><b></b><i>" + data[i].child[j].info + "</i></a></p></div>"
					}else{
						add = "<p><span>" + data[i].child[j].ename + "</span><span>" + data[i].child[j].cname + "</span><i>" + data[i].child[j].price + "</i></p>"
					};
					var mini = '';
					if(i == 0 || i == 1){
						if (j == 0 || j == 2){
							mini = 'hot_items_good_sm';
						}else if (j == 1) {
							mini = 'hot_items_good_lg';
						}else if(j == 3 || j== 4 || j == 5){
							mini = 'hot_items_good_mid';
						}
					}
					mini_good += "<div class='" + mini + "'>" + add + "<a href='" + data[i].child[j].lt_href + "'><img src='" + data[i].child[j].lt_src + "' /></a></div>";
				};
				if(i == 2){
					init = "<div><p><a href='#'><span>" + data[2].init.ename + "</span><span>" + data[2].init.cname + "</span><b></b><i>" + data[2].init.info + "</i></a></p></div>";
				}
				html += "<li id='hot_item_li" + i + "'><div class='hot_items_lt'>" + init + "<a href='" + data[i].lg_href + "'><img src='" + data[i].lg_src + "'/></a></div><div class='hot_items_rt'>" + mini_good + "</div></li>";
			};
			$(".hot_items_box").html(html);
			// 数据添加完成
			// 特殊样式处理
			var w = $('.hot_items_box').children().size() * 1210;
			$('.hot_items_box').css('width', w);
			//将hot_items_rt最右边的div的margin-right置为 0
			$('.hot_items_box li:eq(0) .hot_items_rt').children().eq(2).css('marginRight', 0);
			$('.hot_items_box li:eq(0) .hot_items_rt').children().eq(5).css('marginRight', 0);
			$('.hot_items_box li:eq(1) .hot_items_rt').children().eq(2).css('marginRight', 0);
			$('.hot_items_box li:eq(1) .hot_items_rt').children().eq(5).css('marginRight', 0);

			// 添加鼠标移动显示相应商品列表效果
			$('.hot_items_tag span').mouseenter(function() {
				var n = $(this).index();
				$('.hot_items_tag').children().removeClass('active');
				$(this).addClass('active');
				$('.hot_items_box').animate({left: -1210 * n}, 300);
			});
			// 给热卖品牌和新品推荐的商品添加鼠标效果
			$('#hot_item_li0 .hot_items_rt div, #hot_item_li1 .hot_items_rt div').hover(function() {
				$(this).children('p').stop().animate({left: -20}, 300);
				$(this).children('a').stop().animate({left: 20}, 300);
			}, function() {
				$(this).children('p').stop().animate({left: 0}, 300);
				$(this).children('a').stop().animate({left: 0}, 300);
			});
			//给明星同款添加鼠标移动效果
			//左边商品
			$('#hot_item_li2 .hot_items_lt').hover(function() {
				$(this).children('div').css('display', 'block');
			}, function() {
				$(this).children('div').css('display', 'none');
			});
			//右边商品
			$('#hot_item_li2 .hot_items_rt > div').hover(function() {
				$(this).children('div').css('display', 'block');
			}, function() {
				$(this).children('div').css('display', 'none');
			});
		}
	});
})
// hot_items结束

// shopping_mall开始
$(function(){
	// shopping_mall导航效果
	$('.shopping_mall_nav li').hover(function() {
		$(this).children('a').stop().animate({top: -50}, 300);
	}, function() {
		$(this).children('a').stop().animate({top: 0}, 300);
	});
	$.ajax({
		url: 'json/shopping_mall.json',
		type: 'GET',
		success: function(data){
			// console.log(data);//数据返回成功
			var html = '';
			for (var i = 0; i < data.length; i++) {
				var goos_lt_top = '';
				var goods_lt_btm_icon = '';
				var goods_rt = '';
				for (var j = 0; j < data[i].classic.length; j++) {
					goos_lt_top += "<li><a href='#'>" + data[i].classic[j] + "</a></li>";
				};
				for (var k = 0; k < data[i].icon.length; k++) {
					goods_lt_btm_icon += "<li><a href='#'><img src='" + data[i].icon[k] + "' /></a></li>";
				};
				for (var l = 0; l < data[i].child_good.length; l++) {
					goods_rt += "<div><a href='" + data[i].child_good[l].href + "'><img src='" + data[i].child_good[l].img_src + "' /></a></div>";
				};
				html += "<div class='goodstitle'><img src='" + data[i].title + "'><p class='rightbtn'><a href='" + data[i].href + "'>SHOW&nbsp;MORE</a><span></span></p></div><div class='goods'><div class='goods_lt'><ul class='goos_lt_top'>" + goos_lt_top + "</ul><div class='goods_lt_btm'><div class='relative'><ul>" + goods_lt_btm_icon + "</ul></div><p><span class='lt_arrow'></span><i></i><i></i><i></i><span class='rt_arrow'></span></p></div></div><div class='goods_mid'><a href='" + data[i].mid.href + "'><img src='" + data[i].mid.src + "'></a><div class='mid_info'><span>" + data[i].mid.info[0] +"</span><b></b><span>" + data[i].mid.info[1] +"</span><p>" + data[i].mid.info[2] +"</p></div></div><div class='goods_rt'>" + goods_rt + "</div></div>";
			};
			$('.shopping_mall_box').html(html);
			// 左下角选项卡切换效果
			$('.goods_lt_btm p i').click(function() {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				var n = $(this).index() - 1;
				// console.log($(this).parent().prev());
				$(this).parent().prev().find('ul').animate({left: 220 * n * -1}, 600);
			});
			// 添加id名称，实现锚点链接
			arr = ['classic_bags','collection_watches','exquisite_accessories','nurse_makeup','fashion_apparel']
			for (var i = 0; i < data.length; i++) {
				$('.goodstitle').eq(i).attr('id', arr[i]);
			};
		}
	});
});
// shopping_mall结束

// promotion开始
$(function(){
	$.ajax({
		url: 'json/promotion.json',
		type: 'GET',
		success: function(data){
			// console.log(data);//数据返回成功
			var html = '';
			for(var key in data){
				var goods = '';
				if(key == 'bottom'){
					for (var i = 0; i < data[key].length; i++) {
						var goods_mini = '';
						for (var j = 0; j < data[key][i].length; j++) {
							var add = '';
							if(i == 0){
								add = "<div class='topline'></div><div class='rightline'></div><div class='bottomline'></div><div class='leftline'></div>";
							}
							goods_mini += "<div><a href='" + data[key][i][j].child_href + "'><img src='" + data[key][i][j].child_img + "'></a>" + add +"</div>";
							
						};
						if(i == 0){
							cName = 'pro_btm_lt';
						}else{
							cName = 'pro_btm_rt';
						}
						goods += "<div class='" + cName +"'>" + goods_mini + "</div>";
					};
				}else{
					for (var i = 0; i < data[key].length; i++) {
						goods += "<div><a href='" + data[key][i].pro_href + "'><img src='" + data[key][i].pro_img + "'></a></div>";
					};
				}
				html += "<div class='pro_goods_" + key +"'>" + goods +"</div>"
			}
			$('.promotion_box').html(html);
			// 数据加载成功
			// 对特殊样式进行处理
			$('.pro_goods_top').children().first().css({
				'width': 598,
				'marginLeft': 0
			});
			$('.pro_goods_mid').children().last().css({
				'width': 598,
				'marginRight': 0
			});
			// 将pro_btm_lt中div鼠标移动效果
			$('.pro_btm_lt > div').hover(function() {
				var m = $(this).index();
				showBorder(this);
				$('.pro_btm_rt').children().eq(m).css('display', 'block').siblings().css('display', 'none');;
			}, function() {
				hideBorder(this);
			});

		}
	});
});

