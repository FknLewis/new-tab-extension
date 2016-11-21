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

	chrome.storage.sync.get('background',function(data){ //get background
		if(!data.background){
			$('body').css({'background-image': 'url(' + bg + ')'}); //sets random background if no stored background is found
			$('#pin').addClass("glyphicon glyphicon-heart-empty");
		}
		else {
			$('body').css({'background-image': data.background}); //get stored background
			$('#pin').addClass("glyphicon glyphicon-heart");
		}
	})


	chrome.storage.sync.get('notePin', function(data){ //check if notes are pinned or not
		var notePin = data.notePin;
		if(notePin){
			$('#notes-icon').addClass(notePin);
			$('#input-box').focus();
			if($(window).width() < 768){ //phone
				$('#time-wrapper').css({top: "16%"});
			}
			else if ($(window).width() < 1024){ //ipad
				$('#time-wrapper').css({top: "18%"});
			}
			else{ //desktop
				$('#time-wrapper').css({top: "13%"});
			}
			$('#notes-wrapper').css({opacity: 1});
			$('#input-wrapper').css({opacity: 1});
		}
		else if(!notePin){
			$('#time-wrapper').css({top:'50%'});
			$('#notes-wrapper').css({opacity: 0});
			$('#input-wrapper').css({opacity: 0});
		}
	})



	$("#refresh").click(function() { //refreshed background to a random background
		$('body').css({'background-image': 'url(' + background[Math.floor((Math.random() * bgAmount) + 0)]  + ')'}); //sets random background*/
		if ($('#pin').hasClass("glyphicon glyphicon-heart")){
			$('#pin').removeClass("glyphicon glyphicon-heart");
			$('#pin').addClass("glyphicon glyphicon-heart-empty");
			chrome.storage.sync.remove('background');
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
			chrome.storage.sync.remove('background');
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
			chrome.storage.sync.remove('background');
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
			chrome.storage.sync.remove('background');
		}
		$('body').css({'background-image': 'url(' + background[right] + ')'});
	});




	$('#notes-icon').click(function(){ //brings up notes display & moves date/time to top
		$(this).toggleClass("pinned");
		setTimeout(function(){
			if($('#notes-icon').hasClass('pinned')){
				var notePin = 'pinned';
				chrome.storage.sync.set({'notePin': notePin});
				if ($(window).width() < 768){ //phone
					$('#time-wrapper').css({top: "16%"});
					setTimeout(function(){
						$('#input-wrapper').css({opacity: 1});
					},400);
					setTimeout(function(){
						$('#notes-wrapper').css({opacity: 1});
					},400);
				}
				else if ($(window).width() < 1024){ //ipad
					$('#time-wrapper').css({top: "18%"});
					setTimeout(function(){
						$('#input-wrapper').css({opacity: 1});
					},400);
					setTimeout(function(){
						$('#notes-wrapper').css({opacity: 1});
					},400);
				}
				else{ //desktop
					$('#time-wrapper').css({top: "13%"});
					setTimeout(function(){
						$('#input-wrapper').css({opacity: 1});
					},400);
					setTimeout(function(){
						$('#notes-wrapper').css({opacity: 1});
					},400);
				}
			}
			else {
				$('#input-wrapper').css({opacity: 0});
				$('#notes-wrapper').css({opacity: 0});
				setTimeout(function(){
					$('#time-wrapper').css({top:'50%'});
				}, 400)
				chrome.storage.sync.remove('notePin');
			}
		}, 250)
	});

	chrome.storage.sync.get(['folders', 'notes', 'activeTag'], function(data){ //FOLDERS
		var folders = data.folders;
		var notes = data.notes;
		if(!folders || !folders[0]){ //ADD DEFAULT FOLDERS IF NONE FOUND
			var folders = ["All", "Work", "Personal"];
			$('#add').before("<li>"+folders[i]+"</li>")
			chrome.storage.sync.set({'folders':folders});
		}
		else{
			for (i=0; i < folders.length; i++){ //LOAD IN FOLDERS
				var activeTag = data.activeTag; //set active tag on last active menu
				$('#add').before("<li>"+folders[i]+"</li>");
			}
		}

		var activeTag = data.activeTag; //set active tag on last active menu
		if(!activeTag){
			$('#folders li:nth-child(1)').addClass('active-tab');
		}
		else {
			for (var i = 0; i < folders.length+1; i++){
				if($('#folders li:nth-child('+i+')').text() === activeTag){
					$('#folders li:nth-child('+i+')').addClass('active-tab');
				}
			}
		}

		$('#add').click(function(){ // add folders
			$("<li contenteditable='true'></li>").insertBefore('#add');
			$('#add').prev().focus();
		})

		$(document).on('dblclick', '#folders li', function(e){ //double click to edit
			var folderName = $(this).text();
			var folderIndex = folders.indexOf("folderName");
			if(folderName != "All"){
				$(this).attr('contenteditable', 'true');
				$(this).focus();
			}
			var folderName = $(this).attr('title');
			$(this).text(folderName);
			$(this).removeAttr('title');
		})

		$(document).on('keyup keydown','#folders li', function(e){ //leave input when enter is pressed or shift enter
			if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13) || (e.keyCode == 13 && e.shiftKey)) {
				e.preventDefault();
				$(this).blur();
			}
		})

		$(document).on('focus', '#folders li', function(){ //add active tab to new folder, remove if no name, sort big names
			var oldFolderName = $(this).text();
			var findFolder = (oldFolderName.substring(0,oldFolderName.length-1));
			var folderIndex = folders.indexOf(oldFolderName);
			console.log(notes.length);
			for (i = 0; i < notes.length; i++){
				if(notes[i].folder === oldFolderName){
					console.log(notes[i].folder + " " + notes[i].note);
				}
			}


			$(this).on('focusout', function(){
				var folderName = $(this).text();
				$('#folders li').removeAttr('contenteditable');
				$('#folders li').removeClass('active-tab');
				$(this).addClass('active-tab');
				if(folderName.length > 15){ //ABBREVIATE FOLDER NAME IF MORE THAN 15 CHARACTERS
					$(this).attr('title', $(this).text());
					shortFolderName = folderName.substring(0,15) + '...';
					$(this).text(shortFolderName);

				}
				else {
					$(this).text(folderName);
					$(this).attr('title', $(this).text());
				}

				if (folderName == "" || folderName.trim().length <= 0){ //IF FOLDER NAME IS EMPTY
					$(this).remove(); //REMOVE FOLDER LIST ITEM
					if (folderIndex > 0){ //REMOVE FOLDER AND REMOVE FROM ARRAY
						folders.splice(folderIndex, 1);
						console.log("Removed Folder, Update:" + folders)
					}
				}

				else if (folderName !== "" || folderName.trim().length <= 0){ //IF FOLDER NAME IS NOT EMPTY
					if(oldFolderName.length > 0){ //ADD FOLDER TO ARRAY
							folders.splice(folderIndex, 1, folderName);
					}
					else{
						folders.push(folderName);
					}
				}
				chrome.storage.sync.set({'folders':folders});
				/*chrome.storage.sync.remove('folders');*/
			})
		})

		var notes = data.notes; //load notes
		if(!notes){
			var notes=[];
			chrome.storage.sync.set({'notes':notes});
		}
		else{
			var noteFolder = $('.active-tab').text();
			for (i = 0; i < notes.length; i++){
				if(notes[i].folder == noteFolder){
					$("#notes-wrapper").prepend("<div class='note'><span contenteditable='true'>"+notes[i].note+"</span><div class='remove glyphicon glyphicon-remove'></div> </div>");
				}
				else if (noteFolder == "All"){
					$("#notes-wrapper").prepend("<div class='note'><span contenteditable='true'>"+notes[i].note+"</span><div class='remove glyphicon glyphicon-remove'></div> </div>");
				}
			}
		}

		$('#folders li').click(function(){ // show notes to specific folder
			var noteFolder = $(this).text();
			$('#notes-wrapper .note').remove();
			for (i = 0; i < notes.length; i++){
				if(notes[i].folder == noteFolder){
					$("#notes-wrapper").prepend("<div class='note'><span contenteditable='true'>"+notes[i].note+"</span><div class='remove glyphicon glyphicon-remove'></div> </div>");
				}
				else if (noteFolder == "All"){
					$("#notes-wrapper").prepend("<div class='note'><span contenteditable='true'>"+notes[i].note+"</span><div class='remove glyphicon glyphicon-remove'></div> </div>");
				}
			}
		})

		$("#input-box").keypress(function (e) { //create notes
	 	var noteText = $('#input-box').val();
		var noteFolder = $('.active-tab').text();
		var note = {folder:noteFolder, note:noteText};
	        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
	            if(noteText != "" && noteText != " " && noteText.charAt(0) != " ") {
	   	            notes.push(note);
		            $("#notes-wrapper").prepend("<div class='note'><span contenteditable='true'>"+noteText+"</span><div class='remove glyphicon glyphicon-remove'></div> </div>");
		            $(this).val('');
		            chrome.storage.sync.set({'notes':notes});
	        	}
	        	else {
	        		$(this).val('');
	        	}
	        }
    	});

		$(document).on('focus', '.note>span', function(){ //edit notes
			var storedNote = $(this).text();
			var storedNoteIndex = findIndexByKeyValue(notes, "note", storedNote);
			var foundFolder = notes[storedNoteIndex].folder;
			function findIndexByKeyValue(array, property, string){
				for (var i = 0; i < array.length; i++){
					if (array[i][property] == string){
						return i;
					}
				}
				return null;
			}
			console.log(foundFolder);


			$(this).on('keydown keyup', function (e) { //save notes on keyup
		    	var newNoteText = $(this).text();
				if ($('.active-tab').text() === "All"){
					var noteFolder = foundFolder;
				}
				else {
					var noteFolder = $('.active-tab').text();
				}
				var newNote = {folder:noteFolder, note:newNoteText};

		    	if ((e.keyCode == 13) || (e.keyCode == 13 && e.shiftKey)) {
			        e.preventDefault();
			        window.getSelection().removeAllRanges();
			    }
	    		if(newNoteText != "" && newNoteText != " " && newNoteText.charAt(0) != " ") {
			        var newNoteText = $(this).text();
			        notes.splice(storedNoteIndex, 1, newNote);
			        chrome.storage.sync.set({'notes':notes});
							console.log(notes);
			    }
			    else{
			    	notes.splice(storedNoteIndex, 1);
	    			chrome.storage.sync.set({'notes':notes});
			    }
	    	});
		})

		$(document).on('click', '.remove', function() {  //removes note if X is pressed
			var text = $(this).parent().text();
			var toFind = (text.substring(0,text.length-1));
			var foundIndex = notes.indexOf(toFind);
			notes.splice(foundIndex, 1);
	    	$(this).parent().remove();
	    	chrome.storage.sync.set({'notes':notes});
	    	$("#input-box").prop('disabled', false);
	    	$('#input-box').attr('placeholder', "Create a note")
		});
	})

	$(document).on('click', '#folders li', function(){ //add active tab
		var activeTag = $(this).text();
		$('#folders li').removeClass('active-tab');
		$(this).addClass('active-tab');
		chrome.storage.sync.set({"activeTag":activeTag});
	})

	$("#folders").mousewheel(function(event, delta) { //scroll folders with mouse wheel
      this.scrollLeft -= (delta * 30);
      event.preventDefault();
   });

})

function updateClock(){ //get time
    var d = new Date();
    var date = d.getDate();
    var hour = d.getHours();
    	if (hour <= 9){
    		hour = "0" + hour;
    	}
    var minute = d.getMinutes();
	    if (minute <= 9){
	    	minute = "0" + minute;
	    }
    var second = d.getSeconds();
	    if (second <= 9){
	    	second = "0" + second;
	    }
    var weekday = new Array(7);
	    weekday[0]=  "SUNDAY";
		weekday[1] = "MONDAY";
		weekday[2] = "TUESDAY";
		weekday[3] = "WEDNESDAY";
		weekday[4] = "THURSDAY";
		weekday[5] = "FRIDAY";
		weekday[6] = "SATURDAY";
	var day = weekday[d.getDay()];
	var monthno = new Array(12);
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
	switch (date){
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


    document.getElementById("date").innerHTML = day + " " + date + " of " + month;
    document.getElementById("time").innerHTML = hour + ":" + minute + ":" + second;
    document.getElementById("tab_title").innerHTML = "New Tab - " + hour + ":" + minute + ":" + second;
    setTimeout(updateClock, 500); //refresh clock every second
}
