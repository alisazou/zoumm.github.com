/* SET RANDOM LOADER COLORS FOR DEMO PURPOSES */	
	var demoColorArray = ['red','blue','green','yellow','purple','gray'];
	var colorIndex = Math.floor(Math.random()*demoColorArray.length);
	setSkin(demoColorArray[colorIndex]);
	

	/* RANDOM LARGE IMAGES FOR DEMO PURPOSES */	
	var demoImgArray = ['https://www.google.com.hk/images/srpr/logo11w.png'];
	
	// Stripes interval
	var stripesAnim;
	var calcPercent;
	
	$progress = $('.progress-bar');
	$percent = $('.percentage');
	$stripes = $('.progress-stripes');
	$stripes.text('////////////////////////');
	
	
	
	preload(demoImgArray);
	
	
	stripesAnimate(); 
	
	/* WHEN LOADED */
	$(window).load(function() {
		loaded = true;
		$progress.animate({
			width: "100%"
		}, 100, function() {
			
			$percent.text('100%');
			clearInterval(calcPercent);
			clearInterval(stripesAnim);
		});
	});
	
	/*** FUNCTIONS ***/
	
	/* LOADING */
	function preload(imgArray) {
		var increment = Math.floor(100 / imgArray.length);
		$(imgArray).each(function() {
			$('<img>').attr("src", this).load(function() {
				$progress.animate({
					width: "+=" + increment + "%"
				}, 100);
			});
		});
		calcPercent = setInterval(function() {
			
			//loop through the items
			$percent.text(Math.floor(($progress.width() / $('.loader').width()) * 100) + '%');
			
		});
	}
	
	/* STRIPES ANIMATION */
	function stripesAnimate() {
		animating();
		stripesAnim = setInterval(animating, 2500);
	}

	function animating() {
		$stripes.animate({
			marginLeft: "-=30px"
		}, 2500, "linear").append('/');
	} 
	
	function setSkin(skin){
		$('.loader').attr('class', 'loader '+skin);
		$('span').hasClass('loaded') ? $('span').attr('class', 'loaded '+skin) : $('span').attr('class', skin);
	}