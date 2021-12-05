//background-color, define the css class name here, and edit the css file - css/custom.css
var arraycolor = ["color_1", "color_2", "color_3", "color_4","color_5", "color_6", "color_7", "color_8", "color_9", "color_10","color_11","color_12","color_13"];
function CSSgolbal(){
$('.dollor_number').css('font-size','32px'); //used for price font-size(e.g $6.5)[not centerbox]
$(".dollor_number_content").css('font-size','30px'); //used for text font-size(e.g $6.5)[inside centerbox]
$('.dollor_text').css('font-size','36px'); //used for text font-size(e.g Buy)[EN]
$('.chi').css({'font-size':'36px'}); //used for text font-size(e.g 購物)[CHI]
$('.newstext').css('font-size','30px');//font size for news
$('.price_text.chi').css('font-size','70px')// font size of (價錢)
$('.price_text.dollor_text').css('font-size','50px')// font size of (價錢)

$('.dollor_number').css('color','black'); //used for price font color(e.g $6.5)
$('.dollor_text').css('color','black'); //used for text font color(e.g Buy)[EN]
$('.chi').css({'color':'black'}); //used for text font color(e.g 購物)[CHI]
$('.price_text').css('color','black')// used for text color (價錢)
$('.newstext').css('color','white');//color of news
$('.newstext').css('margin','');//margin of news

/*$('.block1x1').children('.select_product').children('.products_img').css('padding',''); //block 1x1 img padding
$('.block1x2').children('.select_product').children('.products_img').css('padding','100px 0px 120px 0px');//block 2x1 img padding
$('.block2x2').children('.select_product').children('.products_img').css('padding','100px 0px 0px 0px');//block 2x2 img padding
*/
$('.select_product').children('.products_img').css('padding','100px 0px 120px 0px'); //block 1x1 img padding
$('.block1x1').children('.select_product').find('.postion_cost').css('padding',''); //block 1x1 text padding
$('.block1x2').children('.select_product').find('.postion_cost').css('padding','');//block 2x1 text padding
$('.block2x2').children('.select_product').find('.postion_cost').css('padding','');//block 2x2 text padding
//for the margin dettails, please go to readme.txt
$('.block1x1').children('.select_product').children('.products_img').css('padding','10px'); //
}
$.blockUI.defaults.overlayCSS.cursor = 'none';
$.blockUI.defaults.css.cursor = 'none';
$(document).ready(function() {

//hide mouse
/*$('body').mouseover(function(){
    $(this).css({cursor: 'none'});
});
$("#lang_position").mouseover(function(){
$(this).css({cursor: 'none'});
});
//disable right click
 $(this).bind("contextmenu", function(e) {
                e.preventDefault();
});

$(this).css("cursor","none");*/
	$('.row_slideshow').cycle({
		speed: 2000, // speed of the srolling (ms)
		timeout: 12000 // staying interval of each srolling (ms)
	});
curr_lang = "chinese"; // set default language
//getOnSpotJSON();
});
