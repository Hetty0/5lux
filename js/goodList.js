// 加载商品分类
$(function(){
	// ajax加载商品选择列表
	$.ajax({
		url: 'json/goodList.json',
		type: 'GET',
		success: function(data){
			// console.log(JSON.stringify(data));//数据返回成功
			// 对第一个li单独处理，获取品牌首字母，并去重排序
			//获取所有品牌首字母
			var str = '';
			for (var i = 2; i < data.brand.length; i++) {
				str += data.brand[i].text.substr(0,1);
			};
			// console.log(str);//获得全部首字母:AABBBBBBBBCCCCDFFFGGGHLLLMMPRSSTTVV
			// 对字符串去重
			var arr = [];
			// 先把第一个字母推进数组
			arr.push(str[0]);
			for (var j = 1; j < str.length; j++) {
				// 判断str[j]是否在数组中，如果不在就推入数组，否则不推入
				if (arr.indexOf(str[j]) == -1) {
					arr.push(str[j]);
				}else {
					continue;
				}
			};
			arr = arr.sort();
			// 设置html结构
			var html = '';
			var alpha_choice_cont = '';
			for (var key in data) {
				var choice_box_html = '';
				var choice_html = '';
				var alpha_choice = '';
				// 设置第一个li结构
				if (key == 'brand') {
					for (var k = 0; k < arr.length; k++) {
						alpha_choice += "<span>" + arr[k] + "</span>"
					};
					for (var l = 2; l < data[key].length; l++) {
						alpha_choice_cont += "<a href='" + data[key][l].href + "'>" + data[key][l].text + "</a>";
						
					};
					choice_box_html = "<div class='alpha_choice'><span class='all'>" + data[key][1].text + "</span>" + alpha_choice + "<b class='all_more'>更多</b></div><div class='alpha_choice_cont child_choice'>" + alpha_choice_cont + "</div>";
				}else{
					for (var j = 1; j < data[key].length; j++) {
						choice_html += "<a href='" + data[key][j].href + "'>" + data[key][j].text + "</a>";
					};
					choice_box_html ="<div class='child_choice'>" + choice_html + "</div>"; 
				}
				html += "<li><div class='li_tlt'>" + data[key][0] + "</div><div class='choice_box'>" + choice_box_html + "</div></li>";
			}
			$('.choice_list ul').html(html);
			// 箱包栏单肩包特殊处理
			$('.choice_list ul li a:contains("单肩包")').css({
				backgroundColor: '#fff',
				color: '#6e3e0e'
			}).hover(function() {
				$(this).css({
					backgroundColor: '#c69c6d',
					color: '#fff'
				});
			}, function() {
				$(this).css({
					backgroundColor: '#fff',
				color: '#6e3e0e'
				});
			});
			// 将小皮件设置默认样式
			$('.choice_list ul li a:contains("小皮件")').css({
				backgroundColor: '#c69c6d',
				color: '#fff'
			});
			$('.change_size').prev('ul').find('li:gt(4)').css('display', 'none');
			// 点击change_size改变list的高度
			$('.change_size').click(function(){
				changeSize();
			});
			// 当点击更多的时候改变list的高度
			$('.all_more').click(function(){
				if($(this).text() == '更多'){
					$(this).text('收起');
				}else{
					$(this).text('更多');					
				}
				changeSize();
			});
			// 封装改变list高度的函数
			function changeSize(){
				var change = $('.change_size').prev('ul').find('li:gt(4)');
				if ($(change).css('display') == 'block') {
					$(change).css('display','none');
					$('.change_size').html('更多选项（材质、色系、袖型、风格等）<b></b>').css('width', 278);
					$('.change_size').find('b').css('backgroundPosition', '-75px -292px');
				}else{
					$(change).css('display','block');
					$('.change_size').html('收起<b></b>').css('width', 100);
					$('.change_size').find('b').css('backgroundPosition', '-31px -292px');
				}
			}
			// 点击品牌字母，改变下面的相应的品牌内容
			$('.alpha_choice span').mouseover(function() {
				if ($(this).text() == '所有品牌') {
					$(this).parent().next().html(alpha_choice_cont);
				}else{
					// 找到与当前span标签的首字母一样的品牌
					var html = '';
					for (var i = 2; i < data.brand.length; i++) {
						var str = data.brand[i].text;
						if($(this).text() == str.substr(0,1)){
							html += "<a href='" + data.brand[i].href + "'>" + data.brand[i].text + "</a>";
						}
					};
					$(this).parent().next().html(html);
				}
			});
		}
	});
});
// 加载商品信息(瀑布流)
$(function(){
	$.ajax({
		url: "json/goodShow.json",
		type: "GET",
		success: function(data){
			// console.log(JSON.stringify(data));//数据返回成功
			var html1 = '';
			var html2 = '';
			for (var i = 0; i < data.length / 2 + 3; i++) {
				html1 += "<li><dl><dt><a href='" + data[i].href + "'><img src='" + data[i].img + "'></a></dt><dd><p class='shop'><a href='#'>" + data[i].shop + "</a></p><p class='name'><a href='#'>" + data[i].name + "</a></p><p class='infro'><a href='#'>" + data[i].type + "</a></p><p class='price'>" + data[i].price + "</p><span class='toStore'>加入收藏</span><span class='toCart' id='" + data[i].id + "'>加入购物车</span></dd></dl><p></p><div></div></li>";
			};
			for (var i = data.length / 2 + 4; i < data.length; i++) {
				html2 += "<li><dl><dt><a href='" + data[i].href + "'><img src='" + data[i].img + "'></a></dt><dd><p class='shop'><a href='#'>" + data[i].shop + "</a></p><p class='name'><a href='#'>" + data[i].name + "</a></p><p class='infro'><a href='#'>" + data[i].type + "</a></p><p class='price'>" + data[i].price + "</p><span class='toStore'>加入收藏</span><span class='toCart' id='" + data[i].id + "'>加入购物车</span></dd></dl><p></p><div></div></li>";
			};
			$('.goods_show_box ul').html(html1);
			// 当鼠标移上商品时，边框出现
			$('.goods_show_box ul li').hover(function() {
				$(this).css('borderColor', '#f2f2f2');
				$(this).find('span').show();
			}, function() {
				$(this).css('borderColor', '#fff');
				$(this).find('span').hide();
			});
			// 循环数据，给有售空标志和闪电发货的商品加上class名
			for (var i = 0; i < data.length; i++) {
				if(data[i].isFast == 'true'){
					$('.goods_show_box ul li').eq(i).find('p').last().addClass('deliverFast');
				}
				if(data[i].isEmpty == 'true'){
					$('.goods_show_box ul li').eq(i).find('div').last().addClass('sellout');
				}
			};
			// 当点击第 2 页的时候，下载新的数据
			$('.num1').click(function(){
				changePage.call(this, html1);
			});
			$('.num2').click(function(){
				changePage.call(this, html2);

			});
			// 点击下页的时候跳到第 2 页
			$('.nextPage').click(function(){
				if($('.num2').hasClass('on')){
					return;
				}else{
					changePage.call($('.num2'), html2);
				}
			});
			// 点击前页的时候跳到第 1 页
			$('.prePage').click(function(){
				if($('.num1').hasClass('on')){
					return;
				}else{
					changePage.call($('.num1'), html1);
				}
			});
			// 点击首页
			$('.firstPage').click(function(){
				changePage.call($('.num1'), html1);
			});
			// 点击末页
			$('.lastPage').click(function(){
				changePage.call($('.num2'), html2);
			});
			// 点击向右箭头
			$('.arrow_rt').click(function(){
				if($('.num2').hasClass('on')){
					return;
				}else{
					changePage.call($('.num2'), html2);
				}
			});
			// 点击向左箭头
			$('.arrow_lt').click(function(){
				if($('.num1').hasClass('on')){
					return;
				}else{
					changePage.call($('.num1'), html1);
				}
			});
			function changePage(html){
				$('.goods_show_box ul').html(html);
				$(this).addClass('on').siblings().removeClass('on');
				if(html == html1){
					text = '1/2';
				}else {
					text = '2/2';
				}
				$('.goods_show_tlt p span').text(text);
			}
			// 点击第一个商品链接到商品详情页
			$('.goods_show_box dt a').click(function(){
				var src = $(this).find('img').attr('src');
				if (src == data[0].img) {
					var str = $(this).parentsUntil('dl').next().find('.toCart').attr('id');
					$(this).attr('href', 'detail.html?id=' + str);
				};
			});
			// 点击加入购物车增加cookie
			$('.toCart').click(function(){
				creatCookie.call(this);
			});
			
		}
	});
});