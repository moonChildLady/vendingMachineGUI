function initcall(){
	function Images() {
		$.ajax({
			url: "json/images.json",
			type: 'get',
			dataType: 'json',
			async: false,
			success: function(data) {
				$.each(data.images, function(index, value) {
					$(".rslides").append(
						'<li><img src="' + value.media_path + '" class="img-responsive"></li>'
					);
				});
				
			}
		});
		//$('.image_slideshow').cycle();
		 $(".rslides").responsiveSlides({random: true});
	}

	var jsonarray = [["1","1141","7.5","1"],["2","3526","6.5","3,4"],["3","2866","6.5","2"],["4","1732","11.5","5,6,7"],["5","4155","8.5","8"],["6","6243","5.5","9"],["7","4425","6.5","10"]] ;
		var newarray = [];
		var basepath = "img/onspot/";
		var dollor_sign = "$";
		//console.log(1);
		var m = jsonarray.length;
		for(var i = 0; i < m; i++){
			if(jsonarray[i][3].split(",").length > 1){
				
				for(var j= 0; j< jsonarray[i][3].split(",").length; j++){
					
					var temp_ = [];
					temp_[0] = jsonarray[i][0];
					temp_[1] = jsonarray[i][1];
					temp_[2] = dollor_sign+jsonarray[i][2];
					temp_[3] = jsonarray[i][3].split(",")[j];
					temp_[4] = basepath+jsonarray[i][1]+".png";
					newarray.push(temp_);
				}
			}else{
				jsonarray[i][2] = dollor_sign+jsonarray[i][2];
				jsonarray[i][4] = basepath+jsonarray[i][1]+".png";
				newarray.push(jsonarray[i]);
			}
		
	}
	/*for (var i = 0; i <= getProductBlockNo(); i++) {
		productArray.push(productArray[i]);
	}*/
	//console.log(getProductBlockNo());
	//console.log(productArray);
	$.each($('#page1 .row_slideshow'), function(index, item) {
		$.each($(item).children('.row:first'), function(i, v) {
			$.each($(v).find('div[mediaType="product"]'), function(x, ve) {
				if($(ve).children('.row').length > 0){
					$(ve).children('.row').children('div[mediaType="product"]').attr("id", "location_odd_" + index + "_" + i + "_" + x);
				}else{
					$(ve).attr("id", "location_odd_" + index + "_" + i + "_" + x);
				}
				oddProductDiv.push($(ve).attr("id"));
				
			});

		});

	});
	oddProductDiv = $.grep(oddProductDiv,function(n){ return(n) });
	console.log(oddProductDiv);
	var tmp = [];
	var colourshuffle = shuffle(arraycolor);
	$.each(newarray, function(x, y) {
	if($("#" + oddProductDiv[x]).children('.row').length > 0){
	//$("#" + oddProductDiv[x]).attr("id","");
		$("#" + oddProductDiv[x]).children('.row').children('div').html("<div class='select_product'><img src='"+newarray[x][4]+"' class='img-responsive products_img' button='"+newarray[x][3]+"'><div class='postion_cost'><span data-translate='_buy' class='"+getLangStyle()+"'>"+getTranslate("_buy")+"</span><span>button:"+newarray[x][3]+"</span><div><span class='itemcost dollor_number'>" + newarray[x][2] + "</span></div></div></div>");
		//$("#" + oddProductDiv[x]).children('.row').children('div').addClass(colourshuffle[x]);
		
	}else{
	//$("#" + oddProductDiv[x]).addClass(colourshuffle[x]);
		$("#" + oddProductDiv[x]).html("<div class='select_product'><img src='"+newarray[x][4]+"' class='img-responsive products_img' button='"+newarray[x][3]+"'><div class='postion_cost'><span data-translate='_buy' class='"+getLangStyle()+"'>"+getTranslate("_buy")+"</span><span>button:"+newarray[x][3]+"</span><div><span class='itemcost dollor_number'>" + newarray[x][2] + "</span></div></div></div>");
		//$("#" + oddProductDiv[x]).addClass(colourshuffle[x]);
		}
	
	});


	/*var color_array = $(".row_slideshow > .row:first-child .clone").clone();
	$(".row_slideshow .row").each(function(i) {
		if (i > 0) {
			$(this).find(".for_clone").each(function(j) {
				secondrow.push($(this));

			});
		}

	});
	for (var i = 0; i <= secondrow.length; i++) {
		$(secondrow[i]).html($(color_array[i]).html());
	}*/
	
	var HTMLarray = [];
	var tmpHTMLarray = [];
	for (var x = 0; x < $(".row_slideshow").length; x++) {
		HTMLarray = $(".row_slideshow:eq(" + x + ") > .row:eq(0)").children('div[mediaType="product"]').clone();
		shuffle(HTMLarray);
		for (var i = 0; i < HTMLarray.length; i++) {
			if ($(HTMLarray[i]).children('.row').length > 0) {
				$(HTMLarray[i]).children('.row').children('div[mediaType="product"]').each(function(j) {
					tmpHTMLarray[j] = $(this);
					
				});
				HTMLarray.splice(i, 1);
				HTMLarray = $.merge(HTMLarray, tmpHTMLarray[0]);
				shuffle(HTMLarray);
			}
		}
		for (var i = 0; i < $(".row_slideshow").eq(x).children(".row:not(:eq(0))").length; i++) {
			$(".row_slideshow").eq(x).children(".row:not(:eq(0))").eq(i).children('div[mediaType="product"]').each(function(i) {

				if ($(this).children('.row').length > 0) {
						$(this).children('.row').children('div[mediaType="product"]').each(function(index,y){
						$(y).html($(HTMLarray[index]).html());
						});
				} else {
					$(this).html($(HTMLarray[i]).html());
				}


			});
		}
	}
	$(".vcenter_div").each(function(i) {
		$(this).find('img').addClass("vcenter");
	});
	$('div[mediaType="product"]').each(function(x, y){
		if($(y).children('.row').length > 0){
			$(this).removeAttr('mediaType');
		}
	});
	Bgkcolor(); // call the background color function - init_function.js
	NewsBlock(); //news
	VideoBlock();
	ImageBlock();
	randFlash(); //call the randon flash function - init_function.js
	Array.prototype.sort.call( $('.row_slideshow'), function(a, b) {
    a = $(a).data('index'), b = $(b).data('index');
    return a < b ? -1 : a > b ? 1 : 0;
});
//slide effect setting


//callback function in srolling, when sroll before
		$('.row_slideshow').cycle().on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
		console.log('moving, unbind click');
		$('div[mediaType="product"]').off('click', prodcutpress);
		$('div[mediaType="video"]').off('click', VideoBlockClick);
		$('div[mediaType="news"]').off('click', NewsBlockClick);
		$('div[mediaType="images"]').off('click', ImageBlockClick);
		$("#cs, #lang").unbind('click');
		$(".block1x2, .block1x1, .block2x2").removeClass('play');
		$('div[mediaType="product"]').removeAttr("random","random_flash");
	});
	//callback function in srolling, when sroll after
		$('.row_slideshow').eq(0).cycle().on('cycle-after', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
		$('div[mediaType="product"]').on('click', prodcutpress);
		$('div[mediaType="video"]').one('click', VideoBlockClick);
		$('div[mediaType="news"]').one('click', NewsBlockClick);
		$('div[mediaType="images"]').one('click', ImageBlockClick);
		bindcs();
		bindLang();
		randFlash();
	});
	
	Images();
	/*var videolist = $.getVideo("json/video.json");
	var videoarray=[];
	$.each(videolist, function(i,data){
		videoarray.push(data.media_path);
	});
	if($("#videotag").length > 0){
	playArray(0,document.getElementById("videotag"),videoarray);
	}*/
	if($('div[mediaType="product"]').css("style","height:640px")){
		$('div[mediaType="product"]').children('div').children('img').css('style',"height:100%");
	}
	initcount++;
	CSSgolbal();
	
		
	
	}//end of initcall