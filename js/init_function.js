var productArray = [];
var randomProductArray = [];
//var NewrandomProductArray = [];
var oddProductDiv = [];
var evenProductDiv = [];
//var testarray = [];
var NewproductArray = []
var countRow = [];
//var tmpArray = [];
var cloneHTML = [];
var rowHTML = [];
var shufflearray = [];
var questions = [];
var vend_button, vend_image, vend_cost, vend_remainningValue, clonetmp_, tmp_row, flipingeffect, productsdiv,passToVend, curr_lang;
var initcount= 0;
var buttonpresscount =0;
var credit = 0;
var isblock = $('div[mediaType="product"]').data();
//var itemcode;
var secondrow = [];
var isShowCenter = 0;
var CurState = 0; //1=video,image,news, 2=product, 0=nothing

//----------------gobal function--------------
$.ionSound({ //play sound when click
            sounds: [
                "cancel",
                "select"
            ],
            path: "sound/",
            multiPlay: true,
            volume: "1.0"
        });
$.fn.center = function () {
    this.css("position","absolute");
    this.css("top", '0px');
    //this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
    return this;
}

$.fn.shuffleChildren = function() { //shuffle function
	$.each(this.get(), function(index, el) {
		var $el = $(el);
		var $find = $el.children();
		var divs = $(el).children();
		for (var i = 0; i < divs.length; i++) $(divs[i]).remove();
		//the fisher yates algorithm, from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
		var i = divs.length;
		if (i == 0) return false;
		while (--i) {
			var j = Math.floor(Math.random() * (i + 1));
			var tempi = divs[i];
			var tempj = divs[j];
			divs[i] = tempj;
			divs[j] = tempi;
		}
		for (var i = 0; i < divs.length; i++) $(divs[i]).appendTo(this);

	});
};
jQuery.extend({ // goble function for get product and video
	getValues: function(url) {
		var result = null;
		$.ajax({
			url: url,
			type: 'get',
			dataType: 'json',
			async: false,
			success: function(data) {
				result = data.products;
			}
		});
		return result;
	},
	getVideo: function(url) {
		var result = null;
		$.ajax({
			url: url,
			type: 'get',
			dataType: 'json',
			async: false,
			success: function(data) {
				result = data.videos;
			}
		});
		return result;
	}
});
//----------------gobal function--------------
function equijoin(primary, foreign, primaryKey, foreignKey, select) { // combine 2 array function
	var m = primary.length,
		n = foreign.length,
		index = [],
		c = [];

	for (var i = 0; i < m; i++) { // loop through m items
		var row = primary[i];
		index[row[primaryKey]] = row; // create an index for primary table
	}

	for (var j = 0; j < n; j++) { // loop through n items
		var y = foreign[j];
		var x = index[y[foreignKey]]; // get corresponding row from primary
		c.push(select(x, y)); // select only the columns you need
	}

	return c;
}


function shuffle(array) { //shuffle product function
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function getAllBlockNo() { // get all the block number
	return $('.row').children('div').length;
}


function getProductBlockNo() { // get all the product block number
	return $('.row').children('div[mediaType="product"]').length;
}

function NewsBlock(){
	var bkgimg = '<img src="img/img_text_news.png" class="img-responsive-h news-img center_block">';
	var newText = "暢飲零卡路里的Coca-Cola Zero，對熱量說不！不必再為了熱量而放棄美妙滋味，魚與熊掌一起兼得。";
	$('div[mediaType="news"]').append('<p class="newstext chi">'+bkgimg+'</p>');
}
function NewsBlockClick(){
	var newTextHTML = "<h1 class='text-center'>暢飲零卡路里的Coca-Cola Zero，對熱量說不！不必再為了熱量而放棄美妙滋味，魚與熊掌一起兼得。</h1>";
	$('body').block({  //when click cancel button, block all, display loading gif
	message: '<div class="text-left" id="newsCancelClick"><img src="img/img_close_btn.png"></div><div>'+newTextHTML+'</div>', 
	css: {
						backgroundColor: 'none',
						border:'0px solid #FFFFFF',
						width:'1080px'
						//top: $(this).parent().parent('div[mediaType="product"]').height()/2,
						//left: $(this).parent().parent('div[mediaType="product"]').width()/2,
					}
	});
	$('.row_slideshow').cycle('pause'); //pause the srolling
	//$('.blockUI.blockMsg').center();
	$("#newsCancelClick").one('click', newsCancelClick);
}
function newsCancelClick(){
	$('body').unblock();//unblock the video
	$('.row_slideshow').cycle('resume'); //resume the srolling
	$('div[mediaType="news"]').one('click', NewsBlockClick); //rebind click for video block
}
function VideoBlock(){
	var bkgimg = 'img/video_block.png';
	var img = 'img/video_block.png'
	$('div[mediaType="video"]').append('<img src="'+img+'" width="460px">');
	$('div[mediaType="video"]').css('padding-left','0px');
	
}
function ImageBlock(){
	var bkgimg = 'img/video_block.png';
	var img = 'img/E-directory-01.jpg'
	$('div[mediaType="images"]').append('<img src="'+img+'" width="460px">');
	$('div[mediaType="images"]').css('padding-left','0px');
	$('div[mediaType="images"]').css('overflow','hidden');
	
}
function ImageBlockClick(){
	CurState = 1;
	//$("#lang_position").hide();
	$("#lang_position").css('z-index','1');
	$('body').block({  //when click cancel button, block all, display loading gif
	message: '<div class="text-left" id="ImageCancelClick" style="position: absolute;z-index:8000"><img src="img/img_close_btn.png"></div><div style="overflow: hidden;width:1080px;position: absolute;z-index:9888"><img src="img/E-directory-01.jpg" style="cursor:none;"></div>', 
	centerY: false,
	css: {
						//top: '0px',
						//position: 'absolute',
						top: '0px', 
						left:'0px',
						backgroundColor: 'none',
						border:'0px solid #FFFFFF',
						width:'1080px'
		}
	});
	$('.blockOverlay').click(ImageCancelClick);
	$('.blockMsg').click(ImageCancelClick);
	$('.row_slideshow').cycle('pause'); //pause the srolling
	//$('.blockUI.blockMsg').center();
	$("#ImageCancelClick").one('click', ImageCancelClick);
}

function ImageCancelClick(){

	$('body').unblock();//unblock the video
	$("#lang_position").show();
	$('.row_slideshow').cycle('resume'); //resume the srolling
	$('div[mediaType="images"]').one('click', ImageBlockClick); //rebind click for video block
}

function Bgkcolor() { //background color function
	//var colour = globalcolor();
	var colour = shuffle(arraycolor);
	var oddblockArray = [];
	for (var i = 0; i <= getAllBlockNo(); i++) {
		colour.push(colour[i]);
	}
	for(var i=0;i<=2;i++){
	$.each($('.row_slideshow'), function(index, item) {
		$.each($(item).children('.row:not(".cycle-sentinel")').eq(i), function(i, v) {
			$.each($(v).children('div').not('div[mediaType="video"]'), function(x, ve) {
				oddblockArray.push(ve);
			});
		});
	});
	}
	for (var i = 0; i <= oddblockArray.length; i++) {
		var y = 0;
		if ($(oddblockArray[i]).children('.row').length > 0) {
				$(oddblockArray[i]).children('.row').children('div').not('div[mediaType="video"]').each(function(a,b){
					$(this).addClass(colour[i+a+5]);
				});
			
		}else{
			$(oddblockArray[i]).addClass(colour[i+y]);
			
		}

	}

}

function playArray(index, ele, array, listener) { // for video
	//ele.removeEventListener(listener||0);
	ele.src = array[index];
	ele.load();
	ele.play();
	index++;
	if (index >= array.length) {
		index = 0;
	}
	listener = ele.addEventListener('ended', function() {
		playArray(index, ele, array, listener);
	}, false);
}

function Anim(ele, x, count) { 
	for (var i = 0; i < count; i++) {
		$(ele).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			Anim(ele)
			$(this).removeClass(x);
		});
	}
}
function Languagechange(){ //for language changing, change the value and language button
	//set_lang(dictionary.chinese);
	var selector = $("#lang");
	var language = selector.find('img').attr('value');
        if(language =="english"){
        selector.find('img').attr("src","img/img_menu_btn_cn.png");
        selector.find('img').attr("value","chinese");
        curr_lang = "english";
        }else{
            selector.find('img').attr("src","img/img_menu_btn_en.png");
            selector.find('img').attr("value","english");
            curr_lang = "chinese";
        }
        /*if (dictionary.hasOwnProperty(language)) {
            set_lang(dictionary[language]);

        }*/

}
function prodcutpress() { //click product function
	if(buttonpresscount==0){
		if($(this).attr("status")=="sold_out" || $(this).attr("selection")=="unselected"){ //if product is sold out or in dim state
		$.ionSound.play("cancel"); //play cancel sound
		if(credit <= 0){
		$(this).find('.soldout_img').addClass('animated rubberBand').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() { //for sold out image animation
		$(this).removeClass('animated rubberBand'); //when animation end, remove the animation class
		});
		}
		//$(this).find('img').off('click'); // click once only
		//$(this).off('click');// make sure click once only
		console.log("prodcutpress " + $(this).attr("status") + " " + $(this).attr("selection"));

		}else{ // in normal state of blocks
		//CurState = 2;//prodcut mode
		var button = $(this).children('div').find('.products_img').attr("button");
		var image = $(this).children('div').find('.products_img').attr("src");
		var cost = $(this).find('.itemcost').text();		
		$('.row_slideshow').cycle('pause'); //pause the srolling
		$.ionSound.play("select");//play select sound
		$(this).find('.products_img').css('-webkit-animation-duration','1s').addClass('animated rubberBand ').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() { //for the product block animation
		$(this).removeClass('animated rubberBand'); //when animation end, remove the animation class
		$('div[mediaType="product"]').off('click', prodcutpress);
		$('div[mediaType="video"]').off('click', VideoBlockClick);
		$('div[mediaType="news"]').off('click', NewsBlockClick);
		$('div[mediaType="images"]').off('click', ImageBlockClick);
		$("#cs, #lang").unbind('click');
		});
		storePress(button, image, cost);
		productsdiv = $(this);
		console.log($(this));
		//productButtonPressed(button);
		$('div[mediaType="product"]').off('click');
		console.log("prodcutpress");
		buttonpresscount++;
		}
		
		}

}

function unbindCS(){
	$("#cs, #lang").unbind('click');
}
function HideCS(){
	$("#lang_position").hide();
}
function backtoselection(value, sold_out, selection) { //three parameters come form OnSelectionMode (callback_function.js), clear all tmp content, like onVendRequestMode, and re-bind all click function, and resume the srolling
	//$('div[mediaType="product"]').unbind('click');
	if(value <= 0 && CurState == 0){ //clear all the tmp content created by productbuttonpress(init_function.js)
	$(".tmp_row").remove();
	$("#tmp_").html(clonetmp_);
	$("#tmp_").children('div').removeClass('animated flipOutY');
	$('.products_img').removeClass('animated rubberBand');
	$("#tmp_").removeAttr("style");
	$("#tmp_").removeAttr("id");
	$('body').unblock();
	$("#block_video").remove();
	clonetmp_ = "";
	isShowCenter = 0;
	}
	if(value == 0 && CurState == 0){
		console.log("backtoselection value:"+value);
		//$('div[mediaType="product"], div[mediaType="news"], div[mediaType="video"]').unblock();
		$('div[mediaType="product"], div[mediaType="news"], div[mediaType="video"], div[mediaType="images"]').unblock();
		$('.row_slideshow').cycle('resume'); //resume the srolling
		credit = 0;
		bindcs(); //re-bind cs click button
		bindLang(); //re-bind language lick button
		$("#lang_position").css('z-index','1100');
		$('div[mediaType="video"]').one('click', VideoBlockClick); //re-bind video click function using prodcutpress(init_function.js)
		$('div[mediaType="news"]').one('click', NewsBlockClick);
		$('div[mediaType="images"]').one('click', ImageBlockClick);
		$('div[mediaType="product"]').removeAttr('selection');
		if($("#videotag").length > 0){
		document.getElementById("videotag").stop();
		}
		//CurState = 0;
	}
	if(value > 0){
		
		//alert(1);
		$("#lang_position").css('z-index','0');
		//$("#lang_position").css('display','none');
		HideCS(); //unbind
	}

	$('.oncontent').removeClass('oncontent');//clear the background image of content mode(red)
	buttonpresscount=0;
	$('div[mediaType="product"]').on('click', prodcutpress); //re-bind products click function using prodcutpress(init_function.js)
	$("#mask").remove(); //make sure clear big red srceen created from onVendCompleted (callback_function.js)
	$("#lang_position").show(); //make sure the cs and lanuage button are showing
	/*if($("#videotag").length > 0){ //play the video
	document.getElementById("videotag").play();
	}*/
	console.log("backtoselection value:"+value);
	console.log(CurState);
}

function soldout(soldoutarray){ //for display soldout image, called from callback_function.js
	
	var imgselector = $("img");
	for(var i=0;i<soldoutarray.length;i++){
		if(soldoutarray[i]==1){
			imgselector.each(function(x,y){
			if($(this).attr("button") == i+1){
				$(this).parent().parent('div[mediaType="product"]').unbind('click');
				$(this).next('.postion_cost').html("<div><span class='soldout_img'><img src='img/img_sold_out.png'></span></div>");
				//$(this).next('.postion_cost').hide();
				$(this).parent().parent().attr("status", 'sold_out');
				//$(this).parent().parent().off('click');

			}
			});
			
		}else{
			imgselector.each(function(x,y){
			if($(this).attr("button") == i+1){
				$(this).parent().parent().removeAttr("status");
			}
			});
		}
	}
	console.log("soldout called");
}
function dimselection(selectionarray){  //for display Dim image, called from callback_function.js
	
	var imgselector = $("img");
	var current_set = $('.row_slideshow').eq(0).data("cycle.opts").currSlide;
	
	for(var i=0;i<selectionarray.length;i++){
		if(selectionarray[i]==0){
			imgselector.each(function(x,y){
			if($(this).attr("button") == i+1){
				$(this).parent().parent('div[mediaType="product"]').unbind('click');
				/*$(this).parent().parent('div[mediaType="product"]').block({ message: '<img class="img-responsive" src="img/img_dim_icon.png">', 
					css: {
						backgroundColor: 'none',
						border:'0px solid #FFFFFF',
						top: $(this).parent().parent('div[mediaType="product"]').height()/2,
						left: $(this).parent().parent('div[mediaType="product"]').width()/2,
					}
				}); */
				$(this).parent().parent('div[mediaType="product"]').block({ message: null});
				//$(this).attr("selection", 'unselected');
				$(this).parent().parent().attr("selection", 'unselected');
				
			}
			});
		}
		/*else{ //reset the product status
			imgselector.each(function(x,y){
			if($(this).attr("button") == i+1){
				$(this).parent().parent('div[mediaType="product"]').unblock(); //unblock the product blocks
				$(this).parents('div[mediaType="product"]').removeAttr("selection");
			}
			});
		}*/
	}
	console.log("selection dim called");
}
function cancel_buttonClick(){ //for cancel button click
	$.ionSound.play("cancel"); //play sound
	$(this).addClass('animated pulse'); // add animate effect
	$('body').block({  //when click cancel button, block all, display loading gif
	//message: '<img id="loader" class="img-responsive-h" style="cursor:none">', 
	message:'<div class="loading_gif"></div>',
	css: {
						backgroundColor: 'none',
						border:'0px solid #FFFFFF',
						width:'1080px'
						//top: $(this).parent().parent('div[mediaType="product"]').height()/2,
						//left: $(this).parent().parent('div[mediaType="product"]').width()/2,
					}
	});
	$('.blockUI.blockMsg').center();
	//$("#loader").attr("src","img/img_loading.gif");
	$(".loading_gif").addClass('play');
	cancelButtonPressed(); // call the cancelButtonPressed
	//$(this).off('click');

}
function SelfCancel_buttonClick(){ //for self cancel button click (cs, disclaimer)
	CurState = 0;
	console.log(CurState);
	$.ionSound.play("cancel"); //play sound
	$(this).addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		backtoselection(0,null,null);
	});
	
	console.log("SelfCancelButtonPressed");

}
function SelfCancel_buttonClick_noEffect(){ //for self cancel button click (cs, disclaimer)
	CurState = 0;
	console.log(CurState);
	$.ionSound.play("cancel"); //play sound
	//$(this).addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		backtoselection(0,null,null);
	//});
	
	console.log("SelfCancelButtonPressed_noeffect");

}
function blockAll(){ //block all blocks
	var isBlocked = $('img').parent().parent('div[mediaType="product"]').data('blockUI.isBlocked');

	if(!isBlocked){
	//$('div[mediaType="product"],div[mediaType="video"],div[mediaType="news"]').off('click');
	$('img').parent().parent('div[mediaType="product"]').block({ message: null });
	$('div[mediaType="news"],div[mediaType="video"],div[mediaType="images"]').block({ message: null });
	}
	
}
function randFlash(){ //random add flash
var random_silder = Math.floor((Math.random() * $('.row_slideshow').length ));
/*$(".cycle-slide-active").eq(random_silder).each(function(x,y){
		var img_length  = Math.floor((Math.random() * $(y).find(".products_img").length));
		$(y).find(".products_img").eq(img_length).parents('div[mediaType="product"]').addClass('play');
});*/

$(".cycle-slide-active").each(function(a,b){
	//console.log($(b).attr('data-timeout'));
		var img_length  = Math.floor((Math.random() * $(b).find("div[mediaType='product'][status!='sold_out']").find(".products_img").length));
		//console.log(img_length);
		setTimeout(function(){$(b).find("div[mediaType='product'][status!='sold_out']").find(".products_img").eq(img_length).parents('div[mediaType="product"]').addClass('play');},5000);
		
	});

	}