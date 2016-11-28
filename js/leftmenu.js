//引入json数据
$.ajax({
	url: 'json/leftmenu.json',
	type: 'GET',
	success: function(data){
		// document.write(data);//数据返回成功
		var lmenu_html = '';
		//循环得到每个li标签
		for (var i = 0; i < data.length; i++) {
			var menu_show_html = '';
			//循环得到li标签右边的div中的title和内容div
			for (var j = 0; j < data[i].child.length; j++) {
				if(data[i].child[j].child_title){
					var menu_show_childContent = '';
					//循环得到内容div里面的内容
					for (var k = 0; k < data[i].child[j].child_content.length; k++) {
						if(typeof data[i].child[j].child_content[k] == 'string'){
							menu_show_childContent += "<a href='#'>" + data[i].child[j].child_content[k] + "</a>";
						}else{
							//美妆的特殊处理
							var makeup_html = '';
							for (var l = 0; l < data[i].child[j].child_content.length; l++) {
								//美妆内部的小分类处理
								var mini_html = '';
								var mini = data[i].child[j].child_content[l].child_content_cont;
								if(mini){
									for (var m = 0; m < mini.length; m++) {
										mini_html += '<a>' + mini[m] + '</a>';
									};
								}
								makeup_html += "<div class='show_part'><h3>" + data[i].child[j].child_content[l].child_content_tlt + "</h3><div class='show_mini'>" + mini_html + "</div></div>"; 
							};
							menu_show_childContent = makeup_html;
						}
					};
					var name = (i == 2) ? 'beautytop' : 'showshop';
					menu_show_html += "<div class='" + name + "'><h2><a href='#'>" + data[i].child[j].child_title + "</a></h2><div class='showbag'>" + menu_show_childContent + "</div></div>";
				}else if(data[i].child[j].btn2){
					menu_show_html += "<div class='showindex'><a href='#'>" + data[i].child[j].btn1 + "</a><a href='#'>" + data[i].child[j].btn2 + "</a></div>";
				}else{
					menu_show_html += "<div class='showindex'><a href='#'>" + data[i].child[j].btn1 + "</a></div>";
				}
			};
			lmenu_html += "<li><div class='lmenu_group lmenu" + i + "'><a href='" + data[i].url + "'><span>" + data[i].title + "</span><i></i></a></div><div class='menu_show'>" + menu_show_html + "</div></li>";
		};
		$('.leftmenu ul').html(lmenu_html);
		for (var i = 0; i < data.length; i++) {
			$(".lmenu" + i).css('background-position', data[i].iconPosition);
			$('.lmenu' + i).next().css("top", data[i].position_top);
		};
		// 给小皮件链接到列表页
		$('.showbag').find('a:contains("小皮件")').attr('href', 'goodList.html');
	}
});
//动态js
$(function(){
	$('.classify').mouseover(function(){
		$('.leftmenu').css('display', 'block');
		$('.leftmenu>ul>li').mouseover(function(){
			$(this).find('i').css('backgroundImage', 'url("img/share02.png")');
			console.log($(this).find('i').html());
			$('.leftmenu').css('display', 'block');
			$(this).children().eq(0).css({
				backgroundImage: 'url("img/brand_category2.png")',
				backgroundRepeat: "no-repeat",
			});
			$(this).find('.menu_show').show();
			$(this).siblings().find('.menu_show').hide();
		}).mouseout(function(){
			$(this).children().eq(0).css(
				{
				backgroundImage: 'url("img/brand_category1.png")',
				backgroundRepeat: "no-repeat",
			});
			$('.leftmenu').css('display', 'none');
			$(this).find('i').css('backgroundImage', '');
		});
	}).mouseout(function(){
		$('.leftmenu').css('display', 'none');
	});
});