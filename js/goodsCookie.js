// 加入购物车
// 思路：点击加入购物车，创建cookie，必要值：id、num
// 商品其他详细数据通过json数据传输
// 创建cookie的函数封装在这个文件中
$(function(){
	// 购物车页面内容Ajax加载
	$.ajax({
		url: "json/goodShow.json",
		type: "GET",
		success: function(data){
			// cookie中的id和返回的数据库判断，找到一样的，加载到页面中
			var goodsObj = eval($.cookie('goods'));
			var html = '';
			var menu_shoppingbag_html = '';
			// console.log($.cookie('goods'));
			// 加载添加购物车时的弹窗内的商品
			var mcar_sgoods_html = '';
			for (var i = 0; i < 4; i++) {
				mcar_sgoods_html += "<li><a href='" + data[i].href + "'><img src='" + data[i].img + "' /></a><a class = 'mcart_goodsInfo' href='" + data[i].href + "'>" + data[i].name + "</a><span>" + data[i].price + "</span></li>";
			};
			$('.mcar_similar_goods').html(mcar_sgoods_html);
			if(goodsObj){
				// 加载购物车内商品
				for (var i = 0; i < goodsObj.length; i++) {
					// 当数据库中的商品id重复时，只取第一个商品数据
					var n = 0;
					for (var j = 0; j < data.length; j++) {
						if(goodsObj[i].id == data[j].id){
							n++;
							if(n == 1){
								// 加载购物车信息
								html += "<tr><td><input type='checkbox' name='pro_select' value='' checked='checked'></td><td><a href='" + data[j].href + "?id=1'><img src='" + data[j].img + "' /></a></td><td class='goodsW200'><a href='" + data[j].href + "'>" + data[j].type + "</a></td><td>" + data[j].name + "</td><td class='singlePrice'>" + data[j].price.substring(1) + "</td><td><p class='goods_numbox'><i class='cart_reduce'>-</i><input class='number' type='text' value='" + goodsObj[i].num + "'><i class='cart_increase'>+</i></p></td><td></td><td><b class='sum'></b></td><td class='cart_operate'><span class='cart_del'>删除</span><span class='to_collect'>移入收藏夹</span><a><b></b>定制包装</a></td></tr>";
								// 加载购物袋信息
								menu_shoppingbag_html += "<li><a href='" + data[j].href + "'><img src='" + data[j].img + "' /></a><a class='mbag_txt' href='" + data[j].href + "'>" + data[j].name + "</a><span class='mbag_num'>" + goodsObj[i].num + "</span><b class='mbag_price'>￥<span>" + goodsObj[i].num * data[j].price.substring(1) + "</span></b></li>";
							}
						}
					};
				};
			}
			// 购物袋内容
			menu_shoppingbag_html = "<div class='mybag'><ul>" + menu_shoppingbag_html + "</ul><p><span class='mbag_num_total'>0件商品</span><span class='mbag_price_total'>￥0.00</span></p><a class='shop_btn' href='shoppingcart.html'>结算</a></div>";
			$(menu_shoppingbag_html).appendTo('#right_menu dd');

			// 购物车结算部分
			var account_html = '';
			account_html = "<div class='account'><div class='checkInfo'></div><div class='payNow'></div></div>";
			$('.addGoods').html(html);
			// 打开页面时，调用下面函数
			isBlankShow();
			sum();
			total();
			hasCheckedGoods();
			isExceed();
			
			$('input[name=pro_select]').click(function(){
				// 默认情况下，购物车checkbox全选，当用户取消某一个选中时，全选也取消(当有一个不选的时候，全选取消)
				if (this.checked == false) {
					$('.checkAll').get(0).checked = false;
					$('.checkAll').get(1).checked = false;
				}
				// 当所有商品都选中时，全选自动选上(遍历查看是否选中)
				var n = 0;// 设置次数
				for (var i = 0; i < $('input[name=pro_select]').length; i++) {
					if($('input[name=pro_select]')[i].checked){
						n++;//如果次数和商品数相等，则说明商品全部被选择
					}
				};
				if(n == goodsObj.length) {
					$('.checkAll').get(0).checked = true;
					$('.checkAll').get(1).checked = true;
				}
				sum();
				total();
			});
			// 点击全选，将所有的商品都选上/取消
			$('.checkAll').click(function(){
				checkAll.call(this);
				sum();
				total();
				hasCheckedGoods();
				isExceed();
			});
			// 购买数量减少按键
			$('tr .cart_reduce').click(function(){
				var number = $(this).siblings('.number').val();
				console.log($(this).siblings('.number').index());
				if(number <= 1){
					number = 1;
				}else{
					number--;
				}
				$(this).siblings('.number').val(number);
				sum();
				total();
				isExceed();
				hasCheckedGoods();
			});
			// 购买数量增加按键
			$('.cart_increase').click(function(){
				var number = $(this).siblings('.number').val();
				number++;
				$(this).siblings('.number').val(number);
				$('.mbag_num').html(number);
				sum();
				total();
				hasCheckedGoods();
				isExceed();
			});
			// 手动输入购买数量
			$('.number').keyup(function(){
				var val = $(this).val();
				if(isNaN(val) || val < 1){
					val = 1;
				}
				$(this).val(val);
				$('.mbag_num').html(val);
				sum();
				total();
				hasCheckedGoods();
				isExceed();
			});
			// 删除单个商品
			$('.cart_del').click(function(){
				var confirOne = confirm('确实要操作此项吗？');
				if(confirOne){
					$(this).parentsUntil('tbody').remove();
					// 删除该商品cookie
					sum();
					total();
					hasCheckedGoods();
					isExceed();
					isBlankShow();
				}
			});
			// 清空购物车
			$('.cart_clearout').click(function(){
				var confirAll = confirm('确实要操作此项吗？');
				if(confirAll){
					$('.addGoods').html('');
					$.cookie('goods', null);
					// 显示购物提示
					isBlankShow();
				}
			});
			
			// 当购物车没商品时(即没有cookie缓存时)，购物提示出现，结算div消失
			function isBlankShow(){
				if ($.cookie('goods')) {
					// 购物车效果
					$('.blank').hide();
					$('.account, .priceInfo').show();
					// 购物袋效果
					$('.mybag').show();
					$('.menu_shopping_box').hide();
				}else {
					$('.blank').show();
					$('.account, .priceInfo').hide();
					// 购物袋效果
					$('.mybag').hide();
					$('.menu_shopping_box').show();
				}
			}
			// 封装全选按键函数
			function checkAll(){
				for (var i = 0; i < $('input[type=checkbox]').length; i++) {
					$('input[type=checkbox]')[i].checked = this.checked;
				};
			}
			// 封装小计函数
			function sum(){
				for (var i = 0; i < $('.addGoods tr').length; i++) {
					var sum = 0;
					sum = parseFloat($($('.addGoods tr')[i]).find('.singlePrice').html() * $($('.addGoods tr')[i]).find('.number').val()).toFixed(2);
					$($('.addGoods tr')[i]).find('.sum').html(sum);
				};
			}
			// 封装结算函数(点击选择按钮的时候调用)
			function total(){
				var totalPrice = 0;
				for (var j = 0; j < $('.addGoods tr').length; j++) {
					// 当商品选中的时候将小计相加
					if($('.addGoods tr').eq(j).find('input[type=checkbox]').get(0).checked){//找到每行对应的选择按钮
						totalPrice += parseFloat($('.sum')[j].innerHTML);
					}
				};
				$('.totalPrice').html(parseFloat(totalPrice).toFixed(2));
			}
			// 封装选中件数
			function hasCheckedGoods(){
				var hasChecked = 0;
				for (var i = 0; i < $('.addGoods tr').length; i++) {
					// 当商品选中的时候将小计相加
					if($('.addGoods tr').eq(i).find('input[type=checkbox]').get(0).checked){//找到每行对应的选择按钮
						hasChecked += parseInt($('.number').eq(i).val());
					}
				};
				$('.red_number').html('：' + hasChecked);
			}
			// 当商品不满足活动10000时，提示去凑单，同时显示差额
			function isExceed(){
				var differ = 0;
				var totalMoney = $('.totalPrice').html();
				if(totalMoney < 10000){
					differ = 10000 - totalMoney;
					$('.priceInfo').find('i').html('¥' + differ);
					$('.priceInfo').show();
				}else{
					$('.priceInfo').hide();
				}
			}
			// 购物袋中的商品总数
			var mbag_num_total = 0;
			for (var i = 0; i < $('.mybag li').length; i++) {
				mbag_num_total += parseInt($('.mybag li').eq(i).find('.mbag_num').html());
			};
			$('.mbag_num_total').html(mbag_num_total + '件商品');
			$('.mcar_line1 b span').html(mbag_num_total + '件商品');
			// 购物袋中的商品总价格
			var mbag_price_total = 0;
			for (var i = 0; i < $('.mybag li').length; i++) {
				mbag_price_total += parseInt($('.mybag li').eq(i).find('.mbag_price span').html());
			};
			$('.mbag_price_total').html('￥' + mbag_price_total);
			$('.mcar_line2 span').html(mbag_price_total);
		}
	});
});
// 封装创建cookie的函数
function creatCookie(){
	// console.log(this);
	var id = this.id;
	var num = 0; 
	var goods = $.cookie('goods');
	// 判断是否有cookie存在
	if (goods) {
		// 判断是否有相同的商品，将goods转换成对象，遍历
		var arr = eval(goods);
		// 设置标志，查看是否需要加入新的商品
		var isAdd = true;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].id == id) {
				arr[i].num = arr[i].num + 1;
				isAdd = false;
			}
		}
		if(isAdd){
			arr.push({id:id,num:1});
		}
		var str = JSON.stringify(arr);
		$.cookie('goods', str, {expires:7});
	}else {
		$.cookie("goods", "[{id:" + id + ",num:1}]", {expires:7});
	}
	// console.log($.cookie('goods'));
	// 创建cookie成功，创建div弹窗
	$('.newAddGood').show();
}
// 页面右边栏购物袋效果以及添加商品的弹窗
$(function(){
	// 点击弹窗的关闭按钮，隐藏弹窗；
	$('.close_icon').click(function(){
		$('.newAddGood').hide();
	});
})