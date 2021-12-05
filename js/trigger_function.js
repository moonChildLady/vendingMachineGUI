
function getProductSelection() {
    //console.log("Product Sold out / Selection.....");
	
	var soldoutButton;
    var availableButton;
	
    $.ajax({
        type: 'POST',
		async: false,
        url: './message.aspx?action=getProductSelection',
        //url: './SendMessage.aspx?action=getProductSelection',
        data: {
            //buttonNum: thenum,
        },
        success: function (data) {
            //console.log("getProductSelection is called");

			//$('#returnMsg').load('./SendMessage.aspx');              
			$('#returnMsg').load('./message.aspx');          
			var resultType = $(data).filter('#returnMsg').attr("value");

            var errorMessage = $(data).filter('#errorMessage').attr("value");
            var selectionValue = $(data).filter('#selectValue').attr("value");
            //console.log(resultType);

            soldoutButton = errorMessage.split("");
            availableButton = selectionValue.split("");
            
        }
    });
	
	return [soldoutButton, availableButton];
}


function productButtonPressed(buttonNum) {
		
		var thenum = buttonNum;
		$.ajax({
		    type: 'POST',
			//url: './SendMessage.aspx?productButtonClick=Y',
		    url: './message.aspx?action=productButtonClick',			
			data: {
            buttonNum: thenum,
			},
        success: function(data) {
            console.log("");
            console.log("Button : " + thenum + " is pressed");
          
            var datahtml = data;
			//$('#returnMsg').load('./SendMessage.aspx');
            $('#returnMsg').load('./message.aspx');
            var resultType = $(data).filter('#returnMsg').attr("value");
        }
	});			
}
	

function cancelButtonPressed() {

    //var thenum = buttonNum;
    $.ajax({
        type: 'POST',
        //url: './SendMessage.aspx?cancelButtonClick=Y',
		url: './message.aspx?action=cancelButtonClick',
        data: {
            //buttonNum: thenum,
        },
        success: function (data) {
            console.log("Button : " + "Cancel" + " is pressed");

            var datahtml = data;
			//$('#returnMsg').load('./SendMessage.aspx');
            $('#returnMsg').load('./message.aspx');
            var resultType = $(data).filter('#returnMsg').attr("value");

            console.log(resultType);
        }
    });
}	


$( document ).ready(function() {
 	
	// tmp not use
	//$("#buttonA, #buttonB, #buttonC, #buttonD").on('click', function () {
	$().on('click', function () {
		var thenum = $(this).attr('value');
		$.ajax({
			type: 'get',
			url: 'SendMessage.php',
			data: {
            buttonNum: thenum,
			},
        success: function(data) {
            console.log(data);
			
			onVendRequestState();
        }
		});
	});		// tmp not use	
	
	var count = 0,
    timer = $.timer(function() {
        count++;
        $('#counter').html(count);
    });
	timer.set({ time : 1000, autostart : true });   
	
	
	timer2 = $.timer(function() {	 
	    console.log("Timer 0.3 Second Call: ");
	
		$.ajax({
			type: 'POST',
			//url: './SendMessage.aspx?checkStatus=Y',
			url: './message.aspx?action=checkStatus',
			cache: false,
			async: true,
        success: function(data) {
            			
			var datahtml = data;
			//$('#returnMsg').load('./SendMessage.aspx');
			$('#returnMsg').load('./message.aspx');
			var resultType = $(data).filter('#returnMsg').attr("value");
			var remainValue = $(data).filter('#remainValue').attr("value");
			var selectValue = $(data).filter('#selectValue').attr("value");
			var errorMessage = $(data).filter('#errorMessage').attr("value");

			var d = new Date();
			var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();

			//if (resultType.length > 0)
			 //   console.log(time + " ~~ " + resultType);

            if (resultType.length > 10)
				console.log(time + " : Process locked. Wait next time....");
			    //console.log(time + " : Error - " + resultType);
			
		switch(resultType)
        {	
			//  Idle
		    case '41H':
		        console.log("Vend Idle..........");
		        console.log("Remaining Credit : " + remainValue);
		        var soldoutButton = errorMessage.split("");
		        var availableButton = selectValue.split("");
		        console.log("Sold-out Button Array : " + soldoutButton);
		        console.log("Available Button Array : " + availableButton);
		        onSelectionMode(remainValue, soldoutButton, availableButton);
		        break;
		    //  Product Sold-out
		    case '43H':
		        //console.log("43..........");
		        console.log("Deduced Cost : " + errorMessage);
		        console.log("Remaining Value : " + selectValue);
		        onOctopusDeducted(errorMessage, selectValue);
		        break;
		    //  Octopus Completed
		    case '47H':
		        console.log("Octopus Completed ");
		        onVendCompleted();
		        break;
		    //  Product Soldout
		    case '48H':
		        console.log("Available Value : " + selectValue);
		        console.log("Vend Idle..........");
		        getProductSelection();
		        break;
		    //  Vend Message
		    case '4AH':
		        console.log(time + " : " + resultType);
		        console.log("Message Code : " + errorMessage);

		        //  SIT
		        onMessageScreen(errorMessage);
		        break;

		        //Vend Request State ACK
		    case '4BH':
		        console.log(time + " : calling " + resultType);
                //  SIT
		        onVendRequestMode();
		        break;
            //  Octopus Error
		    case '4CH':
		        console.log(time + " : calling " + resultType);
		        //console.log("Error : " + errorMessage);
		        //console.log("Value : " + selectValue);
		        onOctopusError(errorMessage, selectValue);
		        break;
			//Time-Out/Cancel ACK
		    case '4EH':
		        console.log(time + " : calling " + resultType);
                //  SIT
		        onTimeOut();
		        break;
          }	
        }
		});	
    });
	timer2.set({ time : 300, autostart : true });   
});
	
	

function getOnSpotJSON() {

    console.log("Calling getOnSpotJSON......");

    $.ajax({
        type: 'POST',
        url: './onSpot.aspx/getJSON',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {
        //    bn: 1,
        },
        
        success: function (data) {
            console.log(data.d);
			
        },

        failure: function(response) {
            alert(data.d);
        }
        //error: function (e, ex) { alert(ex); }
    });
}

