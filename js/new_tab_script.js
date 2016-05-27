$(document).ready(function(){
	updateClock(); //initial loading of clock

	setTimeout(function(){
		$("#icon-wrapper").css({'opacity':1},200); //fade in icons on load
	},100);

	i = setTimeout(function () { //fade out icons on load after 2 seconds
	       		 $("#icon-wrapper").css({'opacity':0},400);
	   		}, 2000);

	setTimeout(function(){		//fade in #time-wrapper on load
		$("#time-wrapper").css({'opacity':1},200);
	},100);

	$("html").mousemove(function() { //fade icons when mouse stops / show icons when mouse moves
	    clearTimeout(i);
	    $("#icon-wrapper").css({'opacity':1}, 200);

	   	i = setTimeout(function () {
	       	$("#icon-wrapper").css({'opacity':0},400);
	   	}, 2000);

	})

	$("html").click(function() { //fade icons when not clicking / show icon on click
	    clearTimeout(i);
	    $("#icon-wrapper").css({'opacity':1}, 200);

	    i = setTimeout(function () {
	       	$("#icon-wrapper").css({'opacity':0},400);
	   	}, 2000);
	})

	var background = ["images/backgrounds/1.jpg", // stores background images in array
					 "images/backgrounds/2.png",
					 "images/backgrounds/4.jpg", 
					 "images/backgrounds/8.jpg",
					 "images/backgrounds/9.jpg",
					 "images/backgrounds/10.jpg",
					 "images/backgrounds/11.jpg",
					 "images/backgrounds/12.png",
					 "images/backgrounds/13.jpg",
					 "images/backgrounds/14.png",
					 "images/backgrounds/15.jpg",
					 "images/backgrounds/firewatch.jpg"];
	var bgAmount = background.length;
	var bg = background[Math.floor((Math.random() * bgAmount) + 0)];

	chrome.storage.sync.get('background',function(data){ 
		if(!data.background){
			$('body').css({'background-image': 'url(' + bg + ')'}); //sets random background if no stored background is found
			$('#pin').addClass("glyphicon glyphicon-heart-empty");
		}
		else {
			$('body').css({'background-image': data.background}); //get stored background
			$('#pin').addClass("glyphicon glyphicon-heart");
		}
	})

	$("#refresh").click(function() { //refreshed background to a random background
		$('body').css({'background-image': 'url(' + background[Math.floor((Math.random() * bgAmount) + 0)]  + ')'}); //sets random background*/
		if ($('#pin').hasClass("glyphicon glyphicon-heart")){
			$('#pin').removeClass("glyphicon glyphicon-heart");
			$('#pin').addClass("glyphicon glyphicon-heart-empty");
			chrome.storage.sync.clear();
		}
	});

	$("#pin").click(function() {
		var storedbg = document.getElementById('background').style.backgroundImage; //stores current background
		if($(this).hasClass("glyphicon glyphicon-heart-empty")){
			$(this).removeClass("glyphicon glyphicon-heart-empty");
			$(this).addClass("glyphicon glyphicon-heart");
			chrome.storage.sync.set({'background' : storedbg});
		}
		else if ($(this).hasClass("glyphicon glyphicon-heart")){
			$(this).removeClass("glyphicon glyphicon-heart");
			$(this).addClass("glyphicon glyphicon-heart-empty");
			chrome.storage.sync.clear();
		}
	});

	$("#bg-left").click(function() { //navigates to previous background
		var currentbg = document.getElementById('background').style.backgroundImage;
		var removeurl = currentbg.length - 2;
		var bgFind = currentbg.substring(5, removeurl)
		var bgIndex = background.indexOf(bgFind);
		var left = bgIndex -1;
		if (bgIndex === 0){
			left = bgAmount-1;
		}
		if ($('#pin').hasClass("glyphicon glyphicon-heart")){
			$('#pin').removeClass("glyphicon glyphicon-heart");
			$('#pin').addClass("glyphicon glyphicon-heart-empty");
			chrome.storage.sync.clear();
		}
		$('body').css({'background-image': 'url(' + background[left] + ')'});		
	});

	$('#bg-right').click(function(){ //navigates to next background
		var currentbg = document.getElementById('background').style.backgroundImage;
		var removeurl = currentbg.length - 2;
		var bgFind = currentbg.substring(5, removeurl)
		var bgIndex = background.indexOf(bgFind);
		var right = bgIndex +1;
		if (bgIndex === bgAmount - 1){
			right = 0;
		}
		if ($('#pin').hasClass("glyphicon glyphicon-heart")){
			$('#pin').removeClass("glyphicon glyphicon-heart");
			$('#pin').addClass("glyphicon glyphicon-heart-empty");
			chrome.storage.sync.clear();
		}
		$('body').css({'background-image': 'url(' + background[right] + ')'});
	});

	$('#notes-icon').click(function(){
		$(this).toggleClass("pinned");
		if($('#notes-icon').hasClass('pinned')){
			$('#time-wrapper').css({top: "13%"})
			setTimeout(function(){
			$('#notes-wrapper').css({opacity: 1});
			},500);
		}
		else {
			$('#notes-wrapper').css({opacity: 0});
			setTimeout(function(){
			$('#time-wrapper').css({top: "50%"});
			},500);
		}
	});

})

function updateClock(){ //get time
    var d = new Date(); //returns current date and time
    var date = d.getDate(); //current date of month
    var hour = d.getHours(); //current hour of the time
    var minute = d.getMinutes(); //current minute of the time
	    if (minute <= 9){
	    	minute = "0" + minute;
	    }
    var second = d.getSeconds(); //current seconds of the time
	    if (second <= 9){
	    	second = "0" + second;
	    }
    var weekday = new Array(7); //stores weekdays in an array
	    weekday[0]=  "SUNDAY";
		weekday[1] = "MONDAY";
		weekday[2] = "TUESDAY";
		weekday[3] = "WEDNESDAY";
		weekday[4] = "THURSDAY";
		weekday[5] = "FRIDAY";
		weekday[6] = "SATURDAY";
	var day = weekday[d.getDay()];
	var monthno = new Array(12);//stores months in an array
		monthno[0] = "JANUARY";
		monthno[1] = "FEBRUARY";
		monthno[2] = "MARCH";
		monthno[3] = "APRIL";
		monthno[4] = "MAY";
		monthno[5] = "JUNE";
		monthno[6] = "JULY";
		monthno[7] = "AUGUST";
		monthno[8] = "SEPTEMBER";
		monthno[9] = "OCTOBER";
		monthno[10] = "NOVEMBER";
		monthno[11] = "DECEMBER";
	var month = monthno[d.getMonth()];
	switch (date){ //adds suffix to date
		case 1:
		case 21:
		case 31:
			date = date + "st";
			break;
		case 2:
		case 22:
			date = date + "nd";
			break;
		case 3:
		case 23:
			date = date + "rd";
			break;
		default:
			date = date + "th";
			break;
	}


    document.getElementById("date").innerHTML = day + " " + date + " of " + month; //prints day and month date in #date
    document.getElementById("time").innerHTML = hour + ":" + minute + ":" + second; 
    document.getElementById("tab_title").innerHTML = "New Tab - " + hour + ":" + minute + ":" + second;//prints time in #time
    setTimeout(updateClock, 500); //refresh clock every second
}
