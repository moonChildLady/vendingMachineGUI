var productArray = [];
var randomProductArray = [];
var NewrandomProductArray = [];
var oddProductDiv = [];
var evenProductDiv = [];
var testarray = [];
var NewproductArray = []
var countRow = [];
var tmpArray = [];
var cloneHTML = [];
var rowHTML = [];
var shufflearray = [];
var questions = [];
var vend_button, vend_image, vend_cost, vend_remainningValue, clonetmp_, tmp_row;
//var itemcode;
var secondrow = [];
$.fn.shuffleChildren = function() {
	$.each(this.get(), function(index, el) {
		var $el = $(el);
		var $find = $el.children();

		/*$find.sort(function() {
            return 0.5 - Math.random();
        });
        
        //for(var i = 0; i < find.length; i++) $(find[i]).appendTo($el);
        
        $el.empty();
        $find.appendTo($el);*/
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

function equijoin(primary, foreign, primaryKey, foreignKey, select) {
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
jQuery.extend({
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

function shuffle(array) {
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

function getAllBlockNo() {
	return $('.row').children('div').length;
}

function getFirstSliderRow() {
	return $('.row_slideshow').eq(0).children('.row').length;
}

function getSlider() {
	return $('.row_slideshow').length;
}

function getProductBlockNo() {
	return $('.row').children('div[mediaType="product"]').length;
}

function getCountSlider() {
	return $('#page1 .row_slideshow').length;
}

function getLastRow(a, j) {
	return clone = $(a).parent().each(function(x, y) {
		$(y).eq(j - 1).children().clone();
	});
}

function Bgkcolor1() {

	var tmpcolorarray = [];
	var array = ["color_yellow", "color_blue", "color_green", "color_gray"];
	shuffle(array);
	for (var i = 0; i < getAllBlockNo() + 3; i++) {
		array.push(array[i]);
	}
	for (var x = 0; x < $(".row_slideshow").length; x++) {
		tmpcolorarray[0] = array[4];
		tmpcolorarray[1] = array[3];
		for (var i = 0; i < $(".row_slideshow").eq(x).children(".row").length; i++) {
			//	shuffle(array);
			$(".row_slideshow").eq(x).children(".row").eq(i).children('div').each(function(i) {

				if ($(this).children('.row').length > 0) {
					//$(this).children('.row').children('div').each(function(z){		
					//$(this).addClass(array[z+2]);
					$(this).children('.row').children('div').eq(0).addClass(tmpcolorarray[1]);
					$(this).children('.row').children('div').eq(1).addClass(tmpcolorarray[0]);
					//});
				} else {
					$(this).addClass(array[i]);
				}
			});
		}
	}
	for (var x = 0; x < $(".fix_slideshow").length; x++) {
		tmpcolorarray[0] = array[4];
		tmpcolorarray[1] = array[3];
		for (var i = 0; i < $(".fix_slideshow").eq(x).children(".row").length; i++) {
			//	shuffle(array);
			$(".fix_slideshow").eq(x).children(".row").eq(i).children('div').each(function(i) {

				if ($(this).children('.row').length > 0) {
					//$(this).children('.row').children('div').each(function(z){		
					//$(this).addClass(array[z+2]);
					$(this).children('.row').children('div').eq(0).addClass(tmpcolorarray[1]);
					$(this).children('.row').children('div').eq(1).addClass(tmpcolorarray[0]);
					//});
				} else {
					$(this).addClass(array[i]);
				}
			});
		}
	}

}

function Bgkcolor() {
	var colour = ["color_yellow", "color_blue", "color_green", "color_gray"];
	var colour = shuffle(colour);
	var oddblockArray = [];
	var evenblockArray = [];
	for (var i = 0; i <= getAllBlockNo(); i++) {
		colour.push(colour[i]);
	}
	$.each($('.row_slideshow'), function(index, item) {
		$.each($(item).children('.row'), function(i, v) {
			$.each($(v).children('div'), function(x, ve) {
				oddblockArray.push(ve);
			});
		});
	});
	for (var i = 0; i <= oddblockArray.length; i++) {

		if ($(oddblockArray[i]).children('.row').length > 0) {
			//$(this).children('.row').children('div').each(function(z){		
			//$(this).addClass(array[z+2]);
			$(oddblockArray[i]).children('.row').children('div').eq(0).addClass(colour[i + 1]);
			$(oddblockArray[i]).children('.row').children('div').eq(1).addClass(colour[i + 2]);
			//});
		} else {
			$(oddblockArray[i]).addClass(colour[i]);
		}
		//$(oddblockArray[i]).addClass(colour[i]);
	}

}

function playArray(index, ele, array, listener) {
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

function prodcutpress() {
	$('div[mediaType="product"]').off('click').on('click', function() {
		//console.log('moving finished, bind click');
		//console.log($(this).children('img').attr("button"));
		var button = $(this).children('img').attr("button");
		var image = $(this).children('img').attr("src");
		var cost = $(this).find('.itemcost').text();

		$('.row_slideshow').cycle('pause');
		$(".block1x2, .block1x1, .block2x2").removeClass('play');
		$("#lang").unbind('click');
		if($("#videotag").length > 0){
		document.getElementById("videotag").pause();
	}
		//console.log($(this).parent().parent().parent().children('.row_slideshow').eq(0));
		var _root = $(this).parent().parent().parent().children('.row_slideshow').eq(1);
		

		//console.log(_root);
		//console.log($(_root).children('div').eq(0).find('div[class*="block1x1"]').length);
		var current_set = $(this).parent().index();
		if ($(_root).children('div').eq(current_set).find('div[class*="block1x1"]').length != 3) {
			console.log($(_root).children('div').eq(current_set).find('div[class*="block1x1"]').length);
			_root = $(this).parent().parent().parent().children('.row_slideshow').eq(0);
			//divchildren = _root.parent.children('.row').eq(current_set).children('div');			

			_root.css("background-image", "url('img/img_octopus_bg.jpg')");
			
		}
		var divchildren = _root.children('.row').eq(current_set).children('div');
		console.log(current_set);
		divchildren.parent().css("background-image", "url('img/img_octopus_bg.jpg')");
		divchildren.parent().attr("id", "tmp_");
		//$("#tmp_").prepend('<div class="row"></div>').attr("id","tmp_row");
		clonetmp_ = divchildren.parent().children().clone();
		tmp_row = divchildren.parent().children().clone();
		//divchildren.each(function(x, y) {
			if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {

				$("#tmp_").before('<div class="row tmp_row" id="tmp_row"></div>');
				$(".tmp_row").css('z-index','999');
				 $(tmp_row).each(function(x,y){
					$(y).attr("style","height:320px");
					if($(y).hasClass('block1x2_notmove')){
						$(this).removeClass('block1x2_notmove').addClass('block1x1_notmove');
					}
					if($(y).hasClass('block1x2')){
						$(this).removeClass('block1x2').addClass('block1x1');
					}
					if($(y).hasClass('vcenter_div')){
						$(this).removeClass('vcenter_div')
					}
					if($(y).find('img').hasClass('vcenter')){
						$(this).find('img').removeClass('vcenter');
					}
				});
				 //console.log(tmp_row)
				$(".tmp_row").html(tmp_row);
				
			}else{
				clonetmp_ = divchildren.parent().children().clone();
			}
			//console.log(divchildren);

			divchildren.addClass('animated flipOutY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				storePress(button, image, cost);
				//$(y).hide();
				//$(y).removeClass('animated flipOutY');
				//setTimeout(function(){
					if ($(_root).children('div').eq(0).find('div[class*="block1x1"]').length != 3) {
					$("#tmp_").attr("style","margin-top:320px");
				}
				//}, 500);

			});
		//});

	});
}

function backtoselection() {

	$(".tmp_row").remove();
	$("#tmp_").html(clonetmp_);
	$("#tmp_").children('div').removeClass('animated flipOutY');

	$("#tmp_").attr("style","");
	//$("#tmp_").remove();
	$("#tmp_").attr("id", "");
	$(".block1x2, .block1x1, .block2x2").addClass('play');
	prodcutpress
	$("#lang").on("click", function() {
        //var language = $(this).val().toLowerCase();
        var language = $(this).find('img').attr('value');
        //console.log(language);
        if(language =="english"){
        $(this).find('img').attr("src","img/img_menu_btn_cn.png");
        $(this).find('img').attr("value","chinese");
        }else{
            $(this).find('img').attr("src","img/img_menu_btn_en.png");
            $(this).find('img').attr("value","english");
        }
        if (dictionary.hasOwnProperty(language)) {
            set_lang(dictionary[language]);

        }
    });
	if($("#videotag").length > 0){
	document.getElementById("videotag").play();
	}
}

function boom_img() {
	$("#img_boom_white").addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		//storePress(button, image, cost);
		$(this).removeClass('animated bounceInLeft');
		//boom();
	});
}

function boom() {
	setInterval(boom_img, 1000);
}