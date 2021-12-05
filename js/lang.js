//$(function() {
    "use strict";
    var dictionary, set_lang;
	var current_lang;
    dictionary = {
        "english": {
            "_buy": "Buy",
			"_remainvalue":"Remaining",
            "_purchasetext": "img/img_purchase_text_en.png",
			"_errorCode1":"Read card error, <br> retry please",
			"_errorCode2":"Invalid card",
			"_errorCode3":"Present card again",
			"_errorCode4":"Card rejected",
			"_errorCode5":"Incomplete transaction. <br>Present card again",
			"_errorCode6":"Insufficient fund",
            "_cs":"Customer Services Hotline : 2636 7883",
            "_cs2":"Outlet no : 8880002",
			//"_sold_out":"img/img_purchase_text_en.png"
        },
        "chinese": {
            "_buy": "購買",
			"_remainvalue":"餘額",
            "_purchasetext": "img/img_purchase_text_all.png",
			"_errorCode1":"讀咭錯誤,請重試",
			"_errorCode2":"此卡失效",
			"_errorCode3":"請再拍卡",
			"_errorCode4":"此卡失效",
			"_errorCode5":"交易未完成,請重試",
			"_errorCode6":"餘額不足",
            "_cs":"客戶服務熱線 : 2636 7883",
            "_cs2":"售賣機編號 : 8880002",
			//"_sold_out":"img/img_sold_out.png"
        }
    };

    // Function for swapping dictionaries
    set_lang = function(dictionary) {
	current_lang = dictionary;
        var translate = $("[data-translate]");

        translate.text(function() {
            var key = $(this).data("translate"); //prop. _buy
            if(current_lang =="english"){
                $(this).removeClass('chi, dollor_text').addClass('dollor_text');
            }else{
                $(this).removeClass('chi, dollor_text').addClass('chi');
            }
            if($(this).prop('tagName')=="IMG"){
                //console.log("1233");
                $(this).attr("src",dictionary[key]);
            }
			
            if (dictionary.hasOwnProperty(key)) {
                return dictionary[key];
				
            }
            //console.log(translate.prop('tagName'));
        });
        
    };
function getTranslate(code){
    
    var lang_eng = {
            "_buy": "Buy",
            "_price":"Price",
			"_deduct": "Deduct",
            "_purchasetext": "img/img_purchase_text_en.png",
			"_remainvalue":"Remaining",
            "16":"Read card error, <br> retry please",
            "":"Read card error, <br> retry please",
            "34":"Read card error, <br> retry please",
            "19":"Invalid card",
            "24":"Invalid card",
            "20":"Present card again",
            "32":"Present card again",
            "21":"Card rejected",
            "22":"Incomplete transaction. <br>Present card again",
            "25":"Incomplete transaction. <br>Present card again",
            "48":"Insufficient fund",
            "_cs":"Customer Services Hotline : 2636 7883",
            "_cs2":"Outlet no : 8880002"
        };
    var lang_chi = {
            "_buy": "購買",
            "_price":"價錢",
			"_deduct": "收費",
            "_purchasetext": "img/img_purchase_text_all.png",
			"_remainvalue":"餘額",
            "16":"讀咭錯誤,請重試",
            "17":"讀咭錯誤,請重試",
            "34":"讀咭錯誤,請重試",
            "19":"此卡失效",
            "24":"此卡失效",
            "20":"請再拍卡",
            "32":"請再拍卡",
            "21":"此卡失效",
            "22":"交易未完成,請重試",
            "25":"交易未完成,請重試",
            "48":"餘額不足",
            "_cs":"客戶服務熱線 : 2636 7883",
            "_cs2":"售賣機編號 : 8880002"
        };
    if(curr_lang =="chinese"){ //lang = chinese
        return lang_chi[code];
    }else{
        return lang_eng[code];
    }
    console.log(curr_lang);
}

function getLangStyle(){
    if(curr_lang =="chinese"){
        return "chi";
    }else{
        return "dollor_text";
    }
}
    // Set initial language to English
    //set_lang(dictionary.chinese);
    

    // Swap languages when menu changes
    function bindLang(){
    $("#lang").off('click').on("click", function() {
        //var language = $(this).val().toLowerCase();
        
        var selector = $(this).parent().parent();
        var language = selector.find('img').attr('value');
        //console.log(language);
        if(language =="english"){
        selector.find('img').attr("src","img/img_menu_btn_cn.png");
        selector.find('img').attr("value","chinese");

        curr_lang = "english";

        }else{
            selector.find('img').attr("src","img/img_menu_btn_en.png");
            selector.find('img').attr("value","english");
            curr_lang = "chinese";
        }
        //getTranslate("_buy");
        if (dictionary.hasOwnProperty(language)) {
            set_lang(dictionary[language]);
			
			
        }
    });
    }


//});