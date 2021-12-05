$(document).ready(function() {
	//$(".container").
	/*var $page1 = $('#page1');
	var $page2 = $('#page2');
	var $page1_slideshow = $('#page1 .cycle-slideshow');
	var $page2_slideshow = $('#page2 .cycle-slideshow');
	    runslide();
	    
	    function runslide() {
	        $page1.fadeIn(1500).delay(11600).fadeOut(1500, function() {
	        $page1_slideshow.cycle('pause');
	        $page2_slideshow.cycle('resume');
	            $page2.fadeIn(1500).delay(11600).fadeOut(1500, function() {
	                runslide();
	                $page1_slideshow.cycle('resume');
	                $page2_slideshow.cycle('pause');
	            });
	        });
	    }*/
	//var uniqueRandoms = [];
	//var numRandoms = 5;

	//console.log(getProductDetail("C001"));

	var info2 = $.getValues("json/productsdetails.json");
	var info1 = $.getValues("json/products.json");
	var c = equijoin(info1, info2, "itemcode", "itemcode", function(a, b) {
		return {
			image: b.image,
			text: b.content,
			name: a.itemname,
			price: a.price,
			button: a.button
		};
	});

	//console.log(JSON.stringify(c));


	function getProductInfo() {
		return $.getValues("json/products.json");
	}

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

	
	//console.log(videolist);
	function getProductDetail(itemcode) {
		$.ajax({
			url: "json/productsdetails.json",
			type: 'get',
			dataType: 'json',
			async: false,
			success: function(data) {
				$.each(data, function(index, value) {
					//result = data.products;
					if (value.itemcode == itemcode) {
						questions[key] = {
							itemname: val.itemname,
							itemcode: val.itemcode,
							image: val.image,
							content: val.content,
							sort_order: val.sort_order
						};
					}
					//result = 
				});
				//result = data.products;
			}
		});
	}
	//$.each(c, function(data) {
	$.each(c, function(key, product) {
		productArray.push(product);
		productArray = shuffle(productArray);
		randomProductArray.push(product.image);
		randomProductArray = shuffle(randomProductArray);
		tmpArray.push(product);
	});
	for (var i = 0; i <= getProductBlockNo(); i++) {
		productArray.push(productArray[i]);
	}
	$.each($('#page1 .row_slideshow'), function(index, item) {
		$.each($(item).children('.row:first'), function(i, v) {
			$.each($(v).find('div[mediaType="product"]'), function(x, ve) {
				if ($(ve).attr('mediaType') == 'product') {
					$(ve).attr("id", "location_odd_" + index + "_" + i + "_" + x);

				}
				oddProductDiv.push($(ve).attr("id"));

			});

		});

	});
	var tmp = [];
	$.each(productArray, function(x, y) {

		$("#" + oddProductDiv[x]).children('img').before("<div><span data-translate='_buy' class='dollor_text'>Buy</span><div>HK <span class='itemcost dollor_number'>" + y.price + "</span></div>");
		//$("#"+oddProductDiv[x]+", #"+evenProductDiv[x]).attr("button", y.button);
		$("#" + oddProductDiv[x]).children('img').attr("src", y.image);
		$("#" + oddProductDiv[x]).children('img').attr("button", y.button);
	});

	var color_array = $(".row_slideshow > .row:first-child .clone").clone();
	//loop the 2nd to n rows
	$(".row_slideshow .row").each(function(i) {
		if (i > 0) {
			//shuffle(color_array);
			$(this).find(".for_clone").each(function(j) {
				secondrow.push($(this));

			});
		}

	});
	for (var i = 0; i <= secondrow.length; i++) {
		$(secondrow[i]).html($(color_array[i]).html());
	}
	var HTMLarray = [];
	var tmpHTMLarray = [];
	for (var x = 0; x < $(".row_slideshow").length; x++) {
		HTMLarray = $(".row_slideshow:eq(" + x + ") > .row:eq(0)").children('div').clone();
		shuffle(HTMLarray);
		//console.log(HTMLarray.length);
		for (var i = 0; i < HTMLarray.length; i++) {
			if ($(HTMLarray[i]).children('.row').length > 0) {

				$(HTMLarray[i]).children('.row').each(function(j) {

					tmpHTMLarray[j] = $(this);

				});
				HTMLarray.splice(i, 1);
				HTMLarray.splice(0, 0, "");
				//HTMLarray.splice($.inArray((HTMLarray[i], HTMLarray),1));
			}
		}
		for (var i = 0; i < $(".row_slideshow").eq(x).children(".row:not(:eq(0))").length; i++) {
			$(".row_slideshow").eq(x).children(".row:not(:eq(0))").eq(i).children('div').each(function(i) {

				if ($(this).children('.row').length > 0) {
					$(this).children('.row').eq(0).html($(tmpHTMLarray[1]).html());
					$(this).children('.row').eq(1).html($(tmpHTMLarray[0]).html());
				} else {
					$(this).html($(HTMLarray[i]).html());
				}


			});
		}
	}
	$(".vcenter_div").each(function(i) {
		$(this).find('img').addClass("vcenter");
	});
	Bgkcolor();

	$(".block1x2, .block1x1, .block2x2").addClass('play');
	

	prodcutpress();
	Array.prototype.sort.call( $('.row_slideshow'), function(a, b) {
    a = $(a).data('index'), b = $(b).data('index');
    return a < b ? -1 : a > b ? 1 : 0;
});
	//$('.row_slideshow').each(function(x,y){
		//for(var i =0;i<$('.row_slideshow').length; i++){
			//$('.row_slideshow').eq(i).attr("id", "rows_"+i);
		//$('.row_slideshow').cycle();
		$('.row_slideshow').cycle().on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
		console.log('moving, unbind click');
		$('div[mediaType="product"]').unbind('click');
		$(".block1x2, .block1x1, .block2x2").removeClass('play');
		
	});
		$('.row_slideshow').cycle().on('cycle-after', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {

		prodcutpress();
		$(".block1x2, .block1x1, .block2x2").addClass('play');
	});
//});
//}
	Images();
	
	
	var videolist = $.getVideo("json/video.json");
	var videoarray=[];
	$.each(videolist, function(i,data){
		videoarray.push(data.media_path);
	});
	//$("#videotag").play();
	if($("#videotag").length > 0){
	playArray(0,document.getElementById("videotag"),videoarray);
}
	set_lang(dictionary.chinese);
	//document.getElementById("videotag").play();
	//setTimeout(onVendRequestMode, 3000);
	//setTimeout(onOctopusError("1", 19.77), 5000);
	//setInterval(onSelectionMode, 4000);
	//}
	//});
	//});

	//console.log(getCountSlider());

});
