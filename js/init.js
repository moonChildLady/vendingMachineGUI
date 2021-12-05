$(document).ready(function() {
//slide effect setting
	$('.row_slideshow').cycle({
		speed: 3000, // speed of the srolling (ms)
		timeout: 20000 // staying interval of each srolling (ms)
	});
	
	$("#page1, #lang_position").hide(); //hide the page before calling OnSelectionMode
	Languagechange(); //for language changing - inifunction.js
	bindLang();//for language button(bind click) - lang.js
	bindcs();// for cs button (bind click and show in content position)  - content.js
	/*var test = ["1","1","0","1","0","0","0","0","0","0"];
	var test1 = ["0",'0','1',"0","1",'1',"1","1","1","1"];
	function testingfunction(){
	onSelectionMode(0, test, test1);
	}
	setInterval(testingfunction, 9000);*/
     $.preload( 
     	'img/combine.png'
      );

});
