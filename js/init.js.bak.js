/*function shuffle(){
        $(".shuffledv").each(function(){
            var divs = $(this).find('div');
            for(var i = 0; i < divs.length; i++) $(divs[i]).remove();            
            //the fisher yates algorithm, from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
            var i = divs.length;
            if ( i == 0 ) return false;
            while ( --i ) {
               var j = Math.floor( Math.random() * ( i + 1 ) );
               var tempi = divs[i];
               var tempj = divs[j];
               divs[i] = tempj;
               divs[j] = tempi;
             }
            for(var i = 0; i < divs.length; i++) $(divs[i]).appendTo(this);
        });                    
    }*/
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
        for(var i = 0; i < divs.length; i++) $(divs[i]).remove();            
        //the fisher yates algorithm, from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
        var i = divs.length;
        if ( i == 0 ) return false;
        while ( --i ) {
           var j = Math.floor( Math.random() * ( i + 1 ) );
           var tempi = divs[i];
           var tempj = divs[j];
           divs[i] = tempj;
           divs[j] = tempi;
         }
        for(var i = 0; i < divs.length; i++) $(divs[i]).appendTo(this);
        
    });
};
$(document).ready(function(){
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
	    
function shuffle(o) {
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  return array;
}
function getAllBlockNo(){
	return $('.row').children('div').length;
}
function getFirstSliderRow(){
	return $('.row_slideshow').eq(0).children('.row').length;
}
function getSlider(){
	return $('.row_slideshow').length;
}
function getProductBlockNo(){
	return $('.row').children('div[mediaType="product"]').length;
}
function getCountSlider(){
	return $('#page1 .row_slideshow').length;
}
function Bgkcolor(){
	var colour = ["color_yellow", "color_blue", "color_green","color_gray"];
	var colour = shuffle(colour);
	var oddblockArray = [];
	var evenblockArray = [];
	/*$.each(colour, function(x,y){
		colour.push(y);
	});*/
	for(var i=0; i<=getAllBlockNo(); i++){
		//shuffleColourArray = colour.concat(colour);
		//console.log(i);
		colour.push(colour[i]);
		//shuffleColourArray = shuffle(shuffleColourArray);
	}
	$.each($('.row_slideshow'), function (index, item) {
	$.each($(item).children('.row'), function(i, v){
	$.each($(v).children('div'), function(x, ve){
	//var 
	oddblockArray.push(ve);
	});
	});
	});
	/*$.each($('.row_slideshow'), function (index, item) {
	$.each($(item).children('.row:nth-child(even)'), function(i, v){
	$.each($(v).children('div'), function(x, ve){
	//var 
	evenblockArray.push(ve);
	});
	});
	});*/
	//console.log(blockArray);
	for(var i=0; i<=oddblockArray.length;i++){
		$(oddblockArray[i]).addClass(colour[i]);
		//console.log(oddProductDiv[i]);
	}
	/*for(var i=0; i<=evenblockArray.length;i++){
		$(evenblockArray[i]).addClass(colour[i]);
		//console.log(oddProductDiv[i]);
	}*/
	console.log(colour);
	//return shuffleColourArray;
	
}

	$.getJSON( "json/products.json", function( data ) {
				
				var productArray = [];
				var randomProductArray = [];
				var NewrandomProductArray  = [];
				var oddProductDiv = [];
				var evenProductDiv = [];
				var testarray = [];
				var NewproductArray = []
				var countRow = [];
				var tmpArray = [];
				var cloneHTML = [];
				var rowHTML = [];
				$.each(data.products, function( key, product) {
					//productArray.push(product.image);
					
					productArray.push(product);
					productArray = shuffle(productArray);
					randomProductArray.push(product.image);
					randomProductArray = shuffle(randomProductArray);
					tmpArray.push(product);
				});
				for(var i=0; i<=getProductBlockNo(); i++){
					productArray.push(productArray[i]);
				}
				$.each($('#page1 .row_slideshow'), function (index, item) {
				$.each($(item).children('.row:nth-child(odd)'), function(i, v){
				//console.log(v);
				$.each($(v).children('div[mediaType="product"]'), function(x, ve){
				if($(this).attr('mediaType')=='product'){
					//$(this).children('img').attr("id", "location_odd_"+index+"_"+i+"_"+x);
					//$(this).attr("id", "location_odd_"+index+"_"+i+"_"+x);
					$(ve).attr("id", "location_odd_"+index+"_"+i+"_"+x);
					
					}else{
					//cloneHTML.push($(this));
					}
					//oddProductDiv.push($(ve).children('img').attr("id"));
					oddProductDiv.push($(ve).attr("id"));
				//cloneHTML.push($(this));	
				});
				cloneHTML.push($(this));	
				});
				
				});

				/*$.each($('#page1 .row_slideshow'), function (index, item) {
				$.each($(item).children('.row:nth-child(odd)'), function(i, v){
					cloneHTML += $(v).clone().html();
				});
				});*/
				//console.log(cloneHTML);
				
				$.each($('.row_slideshow'), function (index, item) {
				$.each($(item).children('.row:nth-child(even)'), function(i, v){
				//console.log(v);
				$.each($(v).children('div'), function(x, ve){
				if($(this).attr('mediaType')=='product'){
					//$(this).children('img').attr("id", "location_even_"+index+"_"+i+"_"+x);
					$(ve).attr("id", "location_even_"+index+"_"+i+"_"+x);
					evenProductDiv.push($(ve).attr("id"));
					}
				});
				});
				});	
				$.each(productArray, function(x,y){
					$("#"+oddProductDiv[x]).children('img').before("<div><span>Buy</span><div>HK <span>"+y.price+"</span></div>");
					$("#"+oddProductDiv[x]+", #"+evenProductDiv[x]).attr("button", y.button);
					$("#"+oddProductDiv[x]).children('img').attr("src", y.image);
					//console.log(oddProductDiv[x]+y.image); 
					
				});
				$.each(productArray, function(x,y){
					$("#"+evenProductDiv[x]).children('img').before("<div><span>Buy</span><div>HK <span>"+y.price+"</span></div>");
					//$("#"+oddProductDiv[x]+", #"+evenProductDiv[x]).attr("button", y.button);
					$("#"+evenProductDiv[x]).children('img').attr("src", y.image);
					//console.log(oddProductDiv[x]+y.image); 
					
				});
				/*$.each(cloneHTML, function(x,y){
					console.log(y);
					$.each($(y).children('div'), function(i,j){
						rowHTML.push($(j));
					});
				});
				console.log(rowHTML);*/
				
		}).done(function() {
		$("[id^='location_even_']").parent('div').shuffleChildren();
		$("[id^='location_odd_']").parent('div').shuffleChildren();		
		Bgkcolor();

		$('.row_slideshow').cycle();	
	});
	
	//console.log(getCountSlider());
	
});