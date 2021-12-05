function to_onVendRequestMode(){
$('body').unblock();
console.log(isShowCenter);
	if(credit <= 0){
	//console.log(isShowCenter);
		var _root = $('.row_slideshow').eq(1);
		var current_set = $('.row_slideshow').eq(0).data("cycle.opts").currSlide;
		if ($(_root).children('div').eq(current_set+1).find('div[class*="block1x1"]').length != 3) {
			_root = $('.row_slideshow').eq(0);
			_root.addClass('oncontent');
			current_set +=1;
		}
		var divchildren = _root.children('.row').eq(current_set).children('div');
		divchildren.parent().addClass('oncontent');
		divchildren.parent().attr("id", "tmp_");
		if(!clonetmp_){
		clonetmp_ = divchildren.parent().children().clone();
		}
		tmp_row = divchildren.parent().children().clone();
			if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
				$("#tmp_").before('<div class="row tmp_row" id="tmp_row"></div>');
				$(".tmp_row").css('z-index','999');
				 $(tmp_row).each(function(x,y){
					$(y).attr("style","height:320px");
					if($(y).hasClass('block1x2_notmove')){
						$(this).removeClass('block1x2_notmove').addClass('block1x1_notmove');
					}
					if($(y).hasClass('block2x2_notmove')){
						$(this).removeClass('block2x2_notmove col-xs-8 col-md-8').addClass('block1x1_notmove col-xs-4 col-md-4');
					}
					if($(y).hasClass('block1x2')){
						$(this).removeClass('block1x2').addClass('block1x1');
					}
					if($(y).hasClass('block2x2')){
						$(this).removeClass('block2x2 col-xs-8 col-md-8').addClass('block1x1 col-xs-4 col-md-4');
						//$(this).removeClass('block2x2')
					}
					if($(y).hasClass('vcenter_div')){
						$(this).removeClass('vcenter_div')
					}
					if($(y).hasClass('play')){
						$(this).removeClass('play')
					}
					if($(y).find('img').hasClass('vcenter')){
						$(this).find('img').removeClass('vcenter');
					}
					
				});
				$(".tmp_row").html(tmp_row);
				
			}else{
				if(!clonetmp_){
				clonetmp_ = divchildren.parent().children().clone();
				}
			}
			CSSgolbal();//after dynamic create center box, apply once the css
			$('.products_img').removeClass('animated rubberBand');
			divchildren.addClass('animated flipOutY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
					$("#tmp_").attr("style","margin-top:320px");
				}
	$("#page1").append('<div id="mask"></div>');
	$("#tmp_").html('<div id="block_modal" class="row" style="height:320px;border-style:solid;border-width:10px;border-color:white;">' +
		'<div class="col-xs-1" style="width:100px">' +
		'<h3 class="text-left cancel_button"><img src="img/img_close_btn.png"></h3>' +
		'</div>' +
		'<div class="col-xs-4" >' +
		'<img id="image_selected" class="img-responsive pull-left" src="' + vend_image + '">' +
		'</div>' +
		'<div id="msg_box">' +
		'<div class="col-xs-2">' +
		'<p class="text-left messagebox"><span class="price_text '+getLangStyle()+'">'+getTranslate("_price")+'</span> <br><span class="dollor_number_content">' + vend_cost + '</span></p>' +
		'</div>' +
		'<div class="col-xs-4">' +
		'<div >'+
		'<img id="img_boom_yellow" src="img/img_boom_yellow.png" width="120%">'+
		//'<img id="img_boom_white" src="img/img_boom_white.png" width="120%">'+
		'<img data-translate="_purchasetext" id="img_boom_text_all" src="img/img_purchase_text_all.png" >'+
		'</div>'+
		'</div>' +
		'<div class="col-xs-1 arrow">' +
		//'<p class="text-left">Arrow</p>' +
		//'<p class="text-left"><button id="demo_pay" class="btn btn-success">Pay success</button></p>' +
		//'<p class="text-left"><button id="demo_pay_error" class="btn btn-danger">Pay error</button></p>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>');
		CSSgolbal();//after dynamic create center box, apply once the css
	
	blockAll() //block all blocks - init_function.js
	$("#image_selected").addClass('animated bounceInLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).removeClass('animated bounceInLeft');
	});
	$("#img_boom_text_all, .arrow").hide();
$("#img_boom_yellow").addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).removeClass('animated bounceInLeft');

	$("#img_boom_text_all").show();
	$("#img_boom_text_all").addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).removeClass('animated bounceInLeft');
		$(".arrow").fadeIn().show();
		$(".arrow").addClass('play');
	});
	});

	$(".block1x2, .block1x1, .block2x2").removeClass('play');
	$(".cancel_button").parent('div').one('click', cancel_buttonClick);
	$("#demo_pay").bind('click', function() {
		$(".cancel_button").unbind();
		onOctopusDeducted(vend_cost, 19.87);
	});
	$("#demo_pay_error").bind('click', function() {
		$(".cancel_button").unbind();
		//onOctopusError('48', 19.87);
		onMessageScreen(79);
	});

});
}

}
//onOctopusDeducted
function to_onOctopusDeducted(value, remainningValue){
$('.row_slideshow').cycle('pause');
$('body').unblock();
//console.log($("#block_modal").length);
if(isShowCenter ==1){
	$("#msg_box").html('<div class="col-xs-6"><div class="messagebox_bg"><img src="img/img_octopus_box_single.png" width="90%">'+
	'<div>'+
	'<h3 class="text-left '+getLangStyle()+'">'+getTranslate("_deduct")+' <span class="dollor_number">$' + value + '</span></h3>'+
	'<h3 class="text-left '+getLangStyle()+'">'+getTranslate("_remainvalue")+' <span class="dollor_number">$' + remainningValue + '</span></h3>'+
	'</div>'+
	'</div></div>');
	$("#demo_gotocompleted").bind('click', function() {
		onVendCompleted();
	});
	
}else{
		var _root = $('.row_slideshow').eq(1);
		var current_set = $('.row_slideshow').eq(0).data("cycle.opts").currSlide;
		if ($(_root).children('div').eq(current_set+1).find('div[class*="block1x1"]').length != 3) {
			_root = $('.row_slideshow').eq(0);
			_root.addClass('oncontent');
			current_set +=1;
		}
		var divchildren = _root.children('.row').eq(current_set).children('div');
		//console.log(divchildren);
		divchildren.parent().addClass('oncontent');
		divchildren.parent().attr("id", "tmp_");
		if(!clonetmp_){
		clonetmp_ = divchildren.parent().children().clone();
		}
		
		tmp_row = divchildren.parent().children().clone();
			if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
				$("#tmp_").before('<div class="row tmp_row" id="tmp_row"></div>');
				$(".tmp_row").css('z-index','999');
				 $(tmp_row).each(function(x,y){
					$(y).attr("style","height:320px");
					if($(y).hasClass('block1x2_notmove')){
						$(this).removeClass('block1x2_notmove').addClass('block1x1_notmove');
					}
					if($(y).hasClass('block2x2_notmove')){
						$(this).removeClass('block2x2_notmove col-xs-8 col-md-8').addClass('block1x1_notmove col-xs-4 col-md-4');
					}
					if($(y).hasClass('block1x2')){
						$(this).removeClass('block1x2').addClass('block1x1');
					}
					if($(y).hasClass('block2x2')){
						$(this).removeClass('block2x2 col-xs-8 col-md-8').addClass('block1x1 col-xs-4 col-md-4');
						//$(this).removeClass('block2x2')
					}
					if($(y).hasClass('vcenter_div')){
						$(this).removeClass('vcenter_div')
					}
					if($(y).hasClass('play')){
						$(this).removeClass('play')
					}
					if($(y).find('img').hasClass('vcenter')){
						$(this).find('img').removeClass('vcenter');
					}
					
				});
				$(".tmp_row").html(tmp_row);
				
			}else{
				if(!clonetmp_){
				clonetmp_ = divchildren.parent().children().clone();
				}
			}
			if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
					$("#tmp_").attr("style","margin-top:320px");
				}
	$("#page1").append('<div id="mask"></div>');

	$("#tmp_").html('<div id="block_modal" class="row" style="height:320px;border-style:solid;border-width:10px;border-color:white;">' +
		'<div class="col-xs-1" style="width:100px">' +
		'<h3 class="text-left cancel_button"><img src="img/img_close_btn.png"></h3>' +
		'</div>' +
		'<div class="col-xs-4" >' +
		'<img id="image_selected" class="img-responsive pull-left" src="' + vend_image + '">' +
		'</div>' +
		'<div id="msg_box">' +
		'<div class="col-xs-6"><div class="messagebox_bg"><img src="img/img_octopus_box_single.png" width="90%">'+
	'<div>'+
	'<h3 class="text-left '+getLangStyle()+'">'+getTranslate("_deduct")+' <span class="dollor_number">$' + value + '</span></h3>'+
	'<h3 class="text-left '+getLangStyle()+'">'+getTranslate("_remainvalue")+' <span class="dollor_number">$' + remainningValue + '</span></h3>'+
	'</div>'+
	'</div></div>'+
		'</div>' +
		'</div>');
	//$('div[mediaType="product"]').unbind('click');
	//console.log(language);
	//set_lang(current_lang);
	blockAll() //block all blocks - init_function.js
	$(".block1x2, .block1x1, .block2x2").removeClass('play');
	//$(".cancel_button").parent('div').on('click', cancel_buttonClick);
	}
	CSSgolbal();
	$(".cancel_button").parent('div').empty().unbind('click');//hidden cancel button
	//console.log(clonetmp_);
}
//onOctopusError(errorCode, value)
function to_onOctopusError(errorCode, value){
	$('.row_slideshow').cycle('pause');
	$('body').unblock();
if($("#block_modal").length > 0){
	//value = 17.99;
	//vend_remainningValue = value;
	var message;
	$("#msg_box").html('<div class="col-xs-6">'+
		'<div class="messagebox_bg">'+
		'<img src="img/img_octopus_box_single.png" width="90%">'+
		'<div style="width:400px">'+
		//'<h3>errorCode: '+errorCode+'</h3>'+
		'<h3 id="showvalue_position" class="'+getLangStyle()+'">'+getTranslate("_remainvalue")+': <span id="showvalue_onOctopusError" class="dollor_number"></span></h3>'+
		'<h3 id="onOctopusError" class="'+getLangStyle()+'">'+getTranslate(errorCode)+'</h3>'+
		'</div></div></div>');
	if(value != null){
		$("#showvalue_onOctopusError").text("$"+value);
	}else{
		$("#showvalue_position").html("&nbsp;");
	}

		//o_code here
		//set_lang(current_lang);
	//setTimeout(onVendCompleted, 3000);
	$("#demo_gotocompleted").bind('click', function() {
		onOctopusDeducted(vend_cost, vend_remainningValue);
	});
}else{
		var _root = $('.row_slideshow').eq(1);
		var message;
		var current_set = $('.row_slideshow').eq(0).data("cycle.opts").currSlide;
		if ($(_root).children('div').eq(current_set+1).find('div[class*="block1x1"]').length != 3) {
			_root = $('.row_slideshow').eq(0);
			_root.addClass('oncontent');
			current_set +=1;
		}
		var divchildren = _root.children('.row').eq(current_set).children('div');
		//console.log(divchildren);
		divchildren.parent().addClass('oncontent');
		divchildren.parent().attr("id", "tmp_");
		clonetmp_ = divchildren.parent().children().clone();
		tmp_row = divchildren.parent().children().clone();
			if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
				$("#tmp_").before('<div class="row tmp_row" id="tmp_row"></div>');
				$(".tmp_row").css('z-index','999');
				 $(tmp_row).each(function(x,y){
					$(y).attr("style","height:320px");
					if($(y).hasClass('block1x2_notmove')){
						$(this).removeClass('block1x2_notmove').addClass('block1x1_notmove');
					}
					if($(y).hasClass('block2x2_notmove')){
						$(this).removeClass('block2x2_notmove col-xs-8 col-md-8').addClass('block1x1_notmove col-xs-4 col-md-4');
					}
					if($(y).hasClass('block1x2')){
						$(this).removeClass('block1x2').addClass('block1x1');
					}
					if($(y).hasClass('block2x2')){
						$(this).removeClass('block2x2 col-xs-8 col-md-8').addClass('block1x1 col-xs-4 col-md-4');
						//$(this).removeClass('block2x2')
					}
					if($(y).hasClass('vcenter_div')){
						$(this).removeClass('vcenter_div')
					}
					if($(y).hasClass('play')){
						$(this).removeClass('play')
					}
					if($(y).find('img').hasClass('vcenter')){
						$(this).find('img').removeClass('vcenter');
					}
					
				});
				$(".tmp_row").html(tmp_row);
				
			}else{
				clonetmp_ = divchildren.parent().children().clone();
			}
			if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
					$("#tmp_").attr("style","margin-top:320px");
				}

	$("#page1").append('<div id="mask"></div>');

	$("#tmp_").html('<div id="block_modal" class="row" style="height:320px;border-style:solid;border-width:10px;border-color:white;">' +
		'<div class="col-xs-1" style="width:100px">' +
		'<h3 class="text-left cancel_button"><img src="img/img_close_btn.png"></h3>' +
		'</div>' +
		'<div class="col-xs-4" >' +
		'<img id="image_selected" class="img-responsive pull-left" src="' + vend_image + '">' +
		'</div>' +
		'<div id="msg_box">' +
		'<div class="col-xs-6">'+
		'<div class="messagebox_bg">'+
		'<img src="img/img_octopus_box_single.png" width="90%">'+
		'<div>'+
		//'<h3>errorCode: '+errorCode+'</h3>'+
		'<h3 id="showvalue_position" class="'+getLangStyle()+'">'+getTranslate("_remainvalue")+': <span id="showvalue_onOctopusError" class="dollor_number"></span></h3>'+
		'<h3 id="onOctopusError" class="'+getLangStyle()+'">'+getTranslate(errorCode)+'</h3>'+
		'</div></div></div>'+
		'</div>' +
		'</div>');
		if(value != null){
		$("#showvalue_onOctopusError").text("$"+value);
	}else{
		$("#showvalue_position").html("&nbsp;");
	}
	//set_lang(current_lang);
	blockAll() //block all blocks - init_function.js
	$(".block1x2, .block1x1, .block2x2").removeClass('play');
	//$(".cancel_button").parent('div').on('click', cancel_buttonClick);
}
$(".cancel_button").parent('div').empty().unbind('click');//hidden cancel button
}
//onVendCompleted()
function to_onVendCompleted(){
	$('.row_slideshow').cycle('pause');
	$('body').unblock();
	if($("#mask").length != 1){
	$("#page1").append('<div id="mask"></div>');
	}
	$("#lang_position").hide();
	$("#mask").addClass('fullbkg');
	//$("#block_modal").addClass('fullscreen');
	$("#mask").html('<div class="col-xs-12">'+
		//'<p><button class="btn btn-primary" id="demo_back">back to selection mode</button></p>'+
		'<p class="text-center shake"><img src="' + vend_image + '" class="img-responsive"></p>'+
		'</div>');
		//$('div[mediaType="product"]').unblock();
	$(".shake").animate({'marginTop' : "+=1000px"},{
		duration: 2500,
		complete: function(){
        //alert('end ani');
        $(this).hide();
    	}
	});
	/*$("#demo_back").bind('click', function() {
		//$("#page1").html(tmpclone.html());
		onSelectionMode();
	});*/
}

// onMessageScreen(value)
function to_onMessageScreen(value){
		$('.row_slideshow').cycle('pause');
		$('body').unblock();
		var content;
	if(value == '78'){
		//value =="";
		content = '<img id="img_boom_yellow" src="img/img_boom_yellow.png" width="120%"><img id="img_boom_text_sold" src="img/img_sold_out_text_all.png">';
		//$('div[mediaType="product"]').block({ message: null });
	}else{
		//content =value;
		content = "<p class='chi' style='padding-top:20%'>不好意思，你購買的商品餘額不足，由於沒有同類型價格之商品，因此請聯絡客戶服務中心進行退款</p>";
	}

		if($("#block_modal").length > 0){
			
		$("#image_selected").attr("src", vend_image);
		$("#msg_box").html(
		'<div class="col-xs-1"></div>' +
		'<div class="col-xs-4">' +
		'<div >'+
		
		//'<img id="img_boom_white" src="img/img_boom_white.png" width="120%">'+
		//'<img data-translate="_purchasetext" id="img_boom_text_all" src="img/img_purchase_text_all.png" >'+
		content+
		'</div>'+
		'</div>');
		}else{

			var _root = $('.row_slideshow').eq(1);
		var message;
		var current_set = $('.row_slideshow').eq(0).data("cycle.opts").currSlide;
		if ($(_root).children('div').eq(current_set+1).find('div[class*="block1x1"]').length != 3) {
			_root = $('.row_slideshow').eq(0);
			_root.addClass('oncontent');
			current_set +=1;
		}
		var divchildren = _root.children('.row').eq(current_set).children('div');
		//console.log(divchildren);
		divchildren.parent().addClass('oncontent');
		divchildren.parent().attr("id", "tmp_");
		clonetmp_ = divchildren.parent().children().clone();
		tmp_row = divchildren.parent().children().clone();

			if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
				$("#tmp_").before('<div class="row tmp_row" id="tmp_row"></div>');
				//$(".tmp_row").css('z-index','999');
				 $(tmp_row).each(function(x,y){
					$(y).attr("style","height:320px");
					if($(y).hasClass('block1x2_notmove')){
						$(this).removeClass('block1x2_notmove').addClass('block1x1_notmove');
					}
					if($(y).hasClass('block2x2_notmove')){
						$(this).removeClass('block2x2_notmove col-xs-8 col-md-8').addClass('block1x1_notmove col-xs-4 col-md-4');
					}
					if($(y).hasClass('block1x2')){
						$(this).removeClass('block1x2').addClass('block1x1');
					}
					if($(y).hasClass('block2x2')){
						$(this).removeClass('block2x2 col-xs-8 col-md-8').addClass('block1x1 col-xs-4 col-md-4');
						//$(this).removeClass('block2x2')
					}
					if($(y).hasClass('vcenter_div')){
						$(this).removeClass('vcenter_div')
					}
					if($(y).hasClass('play')){
						$(this).removeClass('play')
					}
					if($(y).find('img').hasClass('vcenter')){
						$(this).find('img').removeClass('vcenter');
					}
					
				});
				$(".tmp_row").html(tmp_row);
				//$('div[mediaType="product"]').block({ message: null });
				//$('img').parent().parent('div[mediaType="product"]').block({ message: null });
			}else{
				clonetmp_ = divchildren.parent().children().clone();
			}
			if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
					$("#tmp_").attr("style","margin-top:320px");
				}
	$("#page1").append('<div id="mask"></div>');
/*$("#tmp_").html('<div id="block_modal" class="row" style="height:320px;border-style:solid;border-width:10px;border-color:white;">' +
		'<div class="col-xs-1" style="width:50px">' +
		'<h3 class="text-left cancel_button"><img src="img/img_close_btn.png"></h3>' +
		'</div>' +
		'<div class="col-xs-4" >' +
		'<img id="image_selected" class="img-responsive pull-left" src="' + vend_image + '">' +
		'</div>' +
		'<div id="msg_box">' +
		'<div class="col-xs-7">'+
		'<div class="messagebox_bg">'+
		'<img src="img/img_octopus_box_single.png" width="70%">'+
		'<div>'+
		//'<h3>errorCode: '+errorCode+'</h3>'+
		'<h3 id="showvalue_position" data-translate="_remainvalue">餘額: <span id="showvalue_onOctopusError" class="dollor_number"></span></h3>'+
		'<h3 id="onOctopusError"></h3>'+
		'</div></div></div>'+
		'</div>' +
		'</div>');*/
	
	$("#tmp_").html('<div id="block_modal" class="row" style="height:320px;border-style:solid;border-width:10px;border-color:white;">' +
		'<div class="col-xs-1" style="width:100px">' +
		//'<h3 class="text-left cancel_button"><img src="img/img_close_btn.png"></h3>' +
		'</div>' +
		'<div class="col-xs-4" >' +
		'<img id="image_selected" class="img-responsive pull-left" src="' + vend_image + '">' +
		'</div>' +
		'<div id="msg_box">' +
		'<div class="col-xs-1"></div>' +
		'<div class="col-xs-4">' +
		'<div >'+
		//'<img id="img_boom_yellow" src="img/img_boom_yellow.png" width="120%">'+
		//'<img id="img_boom_white" src="img/img_boom_white.png" width="120%">'+
		//'<img data-translate="_purchasetext" id="img_boom_text_all" src="img/img_purchase_text_all.png" >'+
		content+
		'</div>'+
		'</div>'+
		'</div>');
	
	//set_lang(current_lang);
	$(".block1x2, .block1x1, .block2x2").removeClass('play');
	//$(".cancel_button").parent('div').on('click', cancel_buttonClick);
		}
		//$('div[mediaType="news"],div[mediaType="video"],div[mediaType="product"]').off('click');
		blockAll() //block all blocks - init_function.js
		
		$(".cancel_button").parent('div').empty().unbind('click'); //hidden cancel button
}
function bindcs(){
//$("#lang_position").show();
	$("#cs").off('click').on('click',function(){
		$('div[mediaType="product"]').off('click', prodcutpress);
		$('div[mediaType="video"]').off('click', VideoBlockClick);
		$('div[mediaType="news"]').off('click', NewsBlockClick);
		$('div[mediaType="images"]').off('click', ImageBlockClick);
	   $(".block1x2, .block1x1, .block2x2").removeClass('play');
	   $(this).unbind('click');
	   $("#lang").unbind('click');
	    $('.row_slideshow').cycle('pause');
		if($("#videotag").length > 0){
		document.getElementById("videotag").pause();
		}
 		var _root = $('.row_slideshow').eq(1);
		var current_set = $('.row_slideshow').eq(0).data("cycle.opts").currSlide;
		if ($(_root).children('div').eq(current_set+1).find('div[class*="block1x1"]').length != 3) {
			_root = $('.row_slideshow').eq(0);
			_root.addClass('oncontent');
			current_set +=1;
		}
		//console.log(current_set);
		var divchildren = _root.children('.row').eq(current_set).children('div');
		//console.log(divchildren);
		divchildren.parent().addClass('oncontent');
		divchildren.parent().attr("id", "tmp_");
		clonetmp_ = divchildren.parent().children().clone();
		tmp_row = divchildren.parent().children().clone();
			if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
				$("#tmp_").before('<div class="row tmp_row" id="tmp_row"></div>');
				$(".tmp_row").css('z-index','999');
				 $(tmp_row).each(function(x,y){
					$(y).attr("style","height:320px");
					if($(y).hasClass('block1x2_notmove')){
						$(this).removeClass('block1x2_notmove').addClass('block1x1_notmove');
					}
					if($(y).hasClass('block2x2_notmove')){
						$(this).removeClass('block2x2_notmove col-xs-8 col-md-8').addClass('block1x1_notmove col-xs-4 col-md-4');
					}
					if($(y).hasClass('block1x2')){
						$(this).removeClass('block1x2').addClass('block1x1');
					}
					if($(y).hasClass('block2x2')){
						$(this).removeClass('block2x2 col-xs-8 col-md-8').addClass('block1x1 col-xs-4 col-md-4');
						//$(this).removeClass('block2x2')
					}
					if($(y).hasClass('vcenter_div')){
						$(this).removeClass('vcenter_div')
					}
					if($(y).hasClass('play')){
						$(this).removeClass('play')
					}
					if($(y).find('img').hasClass('vcenter')){
						$(this).find('img').removeClass('vcenter');
					}
					
				});
				$(".tmp_row").html(tmp_row);
				
			}else{
				clonetmp_ = divchildren.parent().children().clone();
			}
			CSSgolbal();
			divchildren.addClass('animated flipOutY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
					$("#tmp_").attr("style","margin-top:320px");
				}					
	$("#tmp_").html('<div id="block_modal" class="row" style="height:320px;border-style:solid;border-width:10px;border-color:white;">' +
		'<div class="col-xs-1" style="width:100px">' +
		'<h3 class="text-left cancel_button"><img src="img/img_close_btn.png"></h3>' +
		'</div>' +
		//'<div class="col-xs-2" >' +
		//'<img id="image_selected" class="img-responsive pull-left" src="img/coca_1x1.png">' +
		//'</div>' +
		'<div id="msg_box">' +
		'<div class="col-xs-10 text-center" style="margin-top:100px">' +
		//'<p class="text-center messagebox">'+
		'<div class="cs '+getLangStyle()+'" data-translate="_cs2">'+getTranslate("_cs2")+'</div>'+
		'<span data-translate="_cs" class="cs '+getLangStyle()+'">'+getTranslate("_cs")+'</span>'+
		//'</p>' +
		'</div>' +
		'<div class="col-xs-1 tnc">' +
		'<p><img src="img/btn_tnc.png" class="img-responsive"></p>'+
		//'<p class="text-left">Arrow</p>' +
		//'<p class="text-left"><button id="demo_pay" class="btn btn-success">Pay success</button></p>' +
		//'<p class="text-left"><button id="demo_pay_error" class="btn btn-danger">Pay error</button></p>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>');
	//$('div[mediaType="product"]').unbind('click');
	//set_lang(current_lang);
	
	$("#image_selected").addClass('animated bounceInLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).removeClass('animated bounceInLeft');
	});
	$("#img_boom_text_all, .arrow").hide();
$("#img_boom_yellow").addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).removeClass('animated bounceInLeft');

	$("#img_boom_text_all").show();
	$("#img_boom_text_all").addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).removeClass('animated bounceInLeft');
		$(".arrow").fadeIn().show();
		$(".arrow").addClass('play');
	});
	});

	
	$(".cancel_button").parent('div').on('click', SelfCancel_buttonClick);
	$(".tnc").bind('click', function(){
		$("#msg_box").html('<div class="col-xs-6 "><div class="tncc scroll"><p>Disclaimer</p><p>Swire Beverages Limited T/A Swire Coca-Cola HK Limited (“SCCHK”) (or any of its associated companies or subsidiaries) (SCCHK and such associated and subsidiary company (the “Group”)) or their directors, officers or employees will have no liability arising out of the Content, or its display to you, whether in contract, tort or otherwise.  Content includes any text, software, scripts, graphics, photos, sounds, music, videos, audiovisual combinations, interactive features and other materials.  Without limiting the generality of the foregoing, SCCHK or any member of the Group gives no representation or warranty as to the truth, accuracy, completeness or timeliness of the whole or any part of the Content or as to whether the whole or any part of the Content will be fit for any purpose.  The use of the Content is entirely at your own risk.</p><p>The Weather Services or related contents are obtained from the Observatory.</p><p>Copyright Notice in relation to the weather services or related contents</p><p>"© The Government of the HKSAR. The above materials ("the Materials") are posted with the permission of the Government of the Hong Kong Special Administrative Region ("HKSARG"). No further reproduction or distribution thereof is allowed. Copyright in the Materials is and shall remain at all times the property of the HKSARG. All rights are expressly reserved by HKSARG".</p><p>Disclaimer in relation to the weather services or related contents</p><p>"The Government of the Hong Kong Administrative Region ("HKSARG") gives no warranties and makes no representations or statements (whether express or implied) of any kind in relation to the Materials, whether in respect of the accuracy, completeness, timeliness, merchantability and fitness for a particular purpose of the Materials or otherwise. </p><p>HKSARG shall not in any circumstances or in any way be liable to any person (including any body of persons, corporate or unincorporate) for any loss or damage (including consequential, indirect, incidental and special loss or damage) arising out of or in connection with the Materials, the use of the Materials or inability to use them."</p></div></div>');
	});

	});
    });
	
}
function VideoBlockClick(){
	CurState = 1;
	console.log(CurState);
	$('div[mediaType="product"]').off('click');
	$('div[mediaType="images"]').off('click');
	$(".block1x2, .block1x1, .block2x2").removeClass('play');
	$('.row_slideshow').cycle('pause');
	var _root = $('.row_slideshow').eq(1);
		var current_set = $('.row_slideshow').eq(0).data("cycle.opts").currSlide;
		if ($(_root).children('div').eq(current_set+1).find('div[class*="block1x1"]').length != 3) {
			_root = $('.row_slideshow').eq(0);
			_root.addClass('onvideo');
			current_set +=1;
		}
		var divchildren = _root.children('.row').eq(current_set).children('div');
		divchildren.parent().addClass('onvideo');
		divchildren.parent().attr("id", "tmp_");
		if(!clonetmp_){
		clonetmp_ = divchildren.parent().children().clone();
		}
		tmp_row = divchildren.parent().children().clone();
			if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
				$("#tmp_").before('<div class="row tmp_row" id="tmp_row"></div>');
				$(".tmp_row").css('z-index','999');
				 $(tmp_row).each(function(x,y){
					$(y).attr("style","height:320px");
					if($(y).hasClass('block1x2_notmove')){
						$(this).removeClass('block1x2_notmove').addClass('block1x1_notmove');
					}
					if($(y).hasClass('block2x2_notmove')){
						$(this).removeClass('block2x2_notmove col-xs-8 col-md-8').addClass('block1x1_notmove col-xs-4 col-md-4');
					}
					if($(y).hasClass('block1x2')){
						$(this).removeClass('block1x2').addClass('block1x1');
					}
					if($(y).hasClass('block2x2')){
						$(this).removeClass('block2x2 col-xs-8 col-md-8').addClass('block1x1 col-xs-4 col-md-4');
						//$(this).removeClass('block2x2')
					}
					if($(y).hasClass('vcenter_div')){
						$(this).removeClass('vcenter_div')
					}
					if($(y).hasClass('play')){
						$(this).removeClass('play')
					}
					if($(y).find('img').hasClass('vcenter')){
						$(this).find('img').removeClass('vcenter');
					}
					
				});
				$(".tmp_row").html(tmp_row);
				
			}else{
				if(!clonetmp_){
				clonetmp_ = divchildren.parent().children().clone();
				}
			}
			blockAll();
			CSSgolbal();//after dynamic create center box, apply once the css
			
			//$('body').append('<div id="block_video" class="row" style="position: absolute; margin-top:-1660px;z-index:9911"></div>');
			$('.row_slideshow').eq(0).attr('style','position: relative;overflow-x:none;overflow-y:none');
			divchildren.addClass('animated flipOutY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
					$("#tmp_").attr("style","margin-top:320px");
				}
			$('#tmp_').html(
				'<div id="block_modal" class="row">' +
				'<div class="video_cancel" style="width:100px">' +
		'<h3 class="text-left cancel_button"><img src="img/img_close_btn.png"></h3>' +
		'</div>' +
		'<video id="videotag" style="display:none">'+
		'<source id="video_src" src="" type="video/mp4">'+
		'</video>'+
				'<div id="tmp_video" style="position: absolute;left: 45%;top: 150px">'+
				'<div id="loader" class="text-center">'+
'<div id="d1" style="background:red"></div>'+
'<div id="d2" style="background:green"></div>'+
'<div id="d3"  style="background:blue"></div>'+
'<div id="d4"  style="background:yellow"></div>'+
'<div id="d5"  style="background:lightblue"></div>'+
'</div>'+
'</div>'+
'</div>');

		var video_base = "videos/";
		var video_array = ['testing11.mp4','testing.mp4','testing11.mp4'];
		$("#video_src").attr("src", video_base+video_array[current_set-1]);
		//document.getElementById("videotag").play();
		document.getElementById("videotag").onplay = function(e){
			$("#tmp_video").hide();
			$("#videotag").show();
			$('body').one('click',SelfCancel_buttonClick_noEffect);
		$(".cancel_button").parent('div').one('click', SelfCancel_buttonClick);
		};
		document.getElementById("videotag").onended = function(e) {
			CurState = 0;
			$('body').off('click',SelfCancel_buttonClick_noEffect);
			backtoselection(0,null,null);
			//$("#block_video").remove();
		};
		
		/*$('#tmp_').html(
			'<div id="block_modal" class="row" style="background-color:#000;height:900px">' +
		'<div class="video_cancel" style="width:100px">' +
		'<h3 class="text-left cancel_button"><img src="img/img_close_btn.png"></h3>' +
		'</div>' +
		'<video id="videotag">'+
		'<source id="video_src" src="videos/testing11.mp4" type="video/mp4">'+
		'</video>'+
		//'<img src="img/coca_1x1.png" style="position: absolute; z-index:9911">'+
		'</div>'
		);
		//document.getElementById("videotag").play();
		var videoheight = document.getElementById("videotag").videoHeight;
		//$('#block_modal').css('height',videoheight+'px');
		console.log(videoheight);
		document.getElementById("videotag").onplay = function(e){
		$('body').one('click',SelfCancel_buttonClick_noEffect);
		$(".cancel_button").parent('div').one('click', SelfCancel_buttonClick);
		};
		document.getElementById("videotag").onended = function(e) {
			CurState = 0;
			backtoselection(0,null,null);
			$('body').off('click',SelfCancel_buttonClick_noEffect);
			//$("#block_video").remove();
		};*/
		//$("#videotag").css('height','640px');
		//$('.row_slideshow').css('z-index', '10');
		/*if($("#videotag").length > 0){
			playArray(0,document.getElementById("videotag"),videoarray);
		}*/
		
		});

}