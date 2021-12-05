function storePress(button, image, cost) {
	vend_button = button;
	vend_image = image;
	vend_cost = cost;
	if(vend_button != "" && vend_image != "" && vend_cost !=""){
	passToVend = 1;
	}
	console.log("button: "+vend_button+", image: "+vend_image+", cost: "+vend_cost);
	//productButtonPressed(button);
	setTimeout(onVendRequestMode, 1000);
}
//---------
function getVendStatus() {

}

function getProductSelection() {
	return ["0","1","0","0","1"];

console.log("getProductSelection");
}

function productButtonPressed(button) {
	//onVendRequestMode();
}

function cancelButtonPressed() {

	//$.unblockUI({
	//	onUnblock: function() {
	//$('.row_slideshow').cycle('reinit');

	//$('.row_slideshow').cycle('reinit');
	//$('.animated').removeClass('.animated');
	//prodcutpress();
	$('.row_slideshow').cycle('resume');
	//$(".block1x2, .block1x1, .block2x2").addClass('play');
	backtoselection();
	console.log("cancelButtonPressed");
	//	}
	//});
}

function onOctopusDeducted(value, remainningValue) {
	$("#lang, #cs").unbind('click'); // unbind click of language and cs button 
	to_onOctopusDeducted(value, remainningValue); //call the function in content.js
	console.log("onOctopusDeducted :"+value+", "+remainningValue);
}

function onOctopusError(errorCode, value) {
$("#lang, #cs").unbind('click');// unbind click of language and cs button
	to_onOctopusError(errorCode, value);//call the function in content.js
	console.log("onOctopusError :"+errorCode+" ,"+value);
}

function onVendRequestMode() {
	if(passToVend != 1){ 
		return false;
	}else{
		passToVend = 0;
	}
	isShowCenter = 1;
	//passToVend = 0;
	console.log("onVendRequestMode "+passToVend);
	$(".block1x2, .block1x1, .block2x2").removeClass('play'); //remove the flash effect
	//$('.row_slideshow').cycle('pause');
		$("#lang, #cs").unbind('click'); // unbind click of language and cs button
		
		if($("#videotag").length > 0){ //pause the video
		document.getElementById("videotag").pause();
		}
		
		to_onVendRequestMode(); //call the function in content.js
		
}

function onVendCompleted() {

	to_onVendCompleted(); //call the function in content.js
	console.log("onVendCompleted");

}

function onVendFail() {

}

function onSelectionMode(value, sold_out, selection) {
	if(initcount == 0){
		initcall();
		$("#page1, #lang_position").show();  //show the product, langauge and cs
		console.log("onSelectionMode called");
	}

	if(sold_out){
	soldout(sold_out); //call the function - init_function.js
	}
	if(value){
		credit = value; //pass the value to goble var (credit)
	}
	
	if(value > 0){
	
		dimselection(selection); //call the function - init_function.js
		
	}
	//console.log(CurState);
	backtoselection(value, sold_out, selection); // call the function - init_function.js
	$("#credit").text("Credit: "+credit); // for testing use, write the credie near the cs button
	vend_button = "";
	vend_image = "";
	vend_cost = "";
	vend_remainningValue = "";
	console.log("secound onSelectionMode called");

}

function onTimeOut() {
	//onSelectionMode();
}

function onMessageScreen(value) {
	$("#lang, #cs").unbind('click'); // unbind click of language and cs button
	console.log("onMessageScreen: "+value);
	to_onMessageScreen(value); //call the function in content.js
}