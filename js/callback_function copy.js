function storePress(button, image, cost) {
	vend_button = button;
	vend_image = image;
	vend_cost = cost;
	productButtonPressed(button);
}
//---------
function getVendStatus() {

}

function getProductSelection() {

}

function productButtonPressed(button) {
	onVendRequestMode();
}

function canelButtonPressed() {

	$.unblockUI({
		onUnblock: function() {
			//$('.row_slideshow').cycle('reinit');
			
			//$('.row_slideshow').cycle('reinit');
			//$('.animated').removeClass('.animated');
			$('.row_slideshow').cycle('resume');
			$(".block1x2, .block1x1, .block2x2").addClass('play');
			$("#tmp_").children('div').removeClass('animated flipOutY');

		}
	});
}

function onOctopusDeducted(value, remainningValue) {
	remainningValue = 19.87;
	vend_remainningValue = remainningValue;
	$("#msg_box").html('<div class="col-xs-8"><h3 class="text-left">收費 ' + value + '</h3><h3 class="text-left">餘額 ' + vend_remainningValue + '</h3><p><button class="btn btn-primary" id="demo_gotocompleted">go to vend completed</button></p></div>');
	//setTimeout(onVendCompleted, 3000);
	$("#demo_gotocompleted").bind('click', function() {
		onVendCompleted();
	});
}

function onOctopusError(errorCode, value) {
	//value = 17.99;
	vend_remainningValue = value;
	$("#msg_box").html('<div class="col-xs-8"><h3>'+errorCode+'</h3><p><button class="btn btn-primary" id="demo_gotocompleted">go to onOctopusDeducted</button></p></div>');
	//setTimeout(onVendCompleted, 3000);
	$("#demo_gotocompleted").bind('click', function() {
		onOctopusDeducted(vend_cost, vend_remainningValue);
	});
}

function onVendRequestMode() {
	$('.row_slideshow').cycle('pause');
	//document.getElementById("videotag").pause();
	//var 
	$.blockUI({
		message: '<div id="block_modal" class="row">' +
			'<div class="col-xs-12">' +
			'<div class="row">' +
			'<div class="col-xs-12">' +
			'<h3 class="text-left cancel_button"><img src="img/img_close_btn.png"></h3>' +
			'</div>' +
			'</div>' +
			'<div class="row">' +
			'<div class="col-xs-4" >' +
			'<p><img id="image_selected" class="img-responsive" src="' + vend_image + '"></p>' +
			'</div>' +
			'<div id="msg_box">' +
			'<div class="col-xs-3">' +
			'<p class="text-left">售價</p><h3 class="text-left">' + vend_cost + '</h3>' +
			'</div>' +
			'<div class="col-xs-4">' +
			'<p class="text-left"><button id="demo_pay" class="btn btn-success">Pay success</button></p>' +
			'<p class="text-left"><button id="demo_pay_error" class="btn btn-danger">Pay error</button></p>' +
			'</div>' +
			'<div class="col-xs-1">' +
			'<p class="text-left">Arrow</p>' +
			'</div>' +
			'</div>' +

		'</div>' +
			'</div>' +
			'</div>',
		css: {
			width: '100%',
			top: '320px',
			height: '320px',
			left: '0',
			border: '5px solid #fff',
			//padding: '15px',
			backgroundColor: 'red',
			color: '#fff'
		}
	});
			   $("#image_selected").addClass('animated bounceInLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			   		//storePress(button, image, cost);
      					$(this).removeClass('animated bounceInLeft');
    			});
	
	$(".block1x2, .block1x1, .block2x2").removeClass('play');
	$(".cancel_button").bind('click', function() {
		canelButtonPressed();
		//document.getElementById("videotag").play();
	});
	$("#demo_pay").bind('click', function() {
		$(".cancel_button").unbind();
		onOctopusDeducted(vend_cost, 19.87);
	});
	$("#demo_pay_error").bind('click', function() {
		$(".cancel_button").unbind();
		onOctopusError('ERRORCODE:01', 19.87);
	});
	

}

function onVendCompleted() {
	$(".blockMsg").css("height", '100%');
	$(".blockMsg").css("top", '0');
	$("#block_modal").html('<div class="col-xs-12"><p><button class="btn btn-primary" id="demo_back">back to selection mode</button></p><p class="text-center"><img src="' + vend_image + '" class="img-responsive"></p></div>');
	$("#demo_back").bind('click', function() {
		onSelectionMode(vend_remainningValue);
	});
}

function onVendFail() {

}

function onSelectionMode(value) {
	$.unblockUI({
		onUnblock: function() {
			$('.row_slideshow').cycle('resume');
			$(".block1x2, .block1x1, .block2x2").addClass('play');
			vend_button = "";
			vend_image = "";
			vend_cost = "";
			vend_remainningValue = "";
		}
	});

}

function onTimeOut() {
	setTimeout(onSelectionMode, 3000);
}

function onMessagScreen(int) {

}