// SA Event Guide : Author ~ Anton Boshoff //


// === INDEX === //
// Global Variables
// Mobile Nav
// Initiate Nivo Slider
// Page Heading Color
// Back to Top


// === NAMESPACE === //
window.app = {}


// === TRIGGER ON DOCUMENT READY === //
$(function(){

	try {

		app.go.globalVar();
		app.go.mobileNav();
		app.go.initNivo();
		app.go.pageHead();
		app.go.toTop();

		// ==== TRIGGER ON RESIZE (DEBOUNCE) ==== //
		var updateLayout = _.debounce(function(e) {

			app.go.globalVar();
			app.go.mobileNav();
			
		}, 500);

		window.addEventListener('resize', updateLayout, true);

	} catch(err) {

		alert(err);

	}

});


// === FUNCTIONS === //
app.go = {

	// Global Variables
	globalVar: function() {

		app.go.windowWidth =  window.innerWidth;
		app.go.navTrigger = $('header nav li a');
	},

	// Mobile Nav
	mobileNav: function() {

		if ( app.go.windowWidth < 960 ) {

			var handler = function() {
	      		var $self = $(this);

	      		$self.parent().siblings('li').removeClass('expand').find('ul.drop-down').slideUp();
				
				if ( $self.parent().hasClass('expand') ) {
					$self.siblings('ul.drop-down').slideUp();
					$self.parent().removeClass('expand');
				} else {
					$self.siblings('ul.drop-down').slideDown();
					$self.parent().addClass('expand');
				}
			};
			
			app.go.navTrigger.bind('click', handler);

		} else {

			app.go.navTrigger.unbind();
			app.go.navTrigger.parent('li').removeClass('expand');
			app.go.navTrigger.siblings('ul.drop-down').attr('style', '');

		}
	},

	// Initiate Nivo Slider
	initNivo: function() {
		$('#slider').nivoSlider({
			effect: 'fade',
			controlNav: false,
			pauseOnHover: false,
			animSpeed: 1000,
    		pauseTime: 4000,
    		directionNav: false
		});
	},

	// Page Heading Color
	pageHead: function() {

		var activePage = $('header nav li a.active'),
			theColor = activePage.data('color');

		$('.page-head').addClass(theColor);
	},

	// Back to Top
	toTop: function() {
		$(window).scroll(function() {
	    	var jTop = $('.toTop'),
	    		scrollPos = $(this).scrollTop();

			if ( scrollPos != 0 && scrollPos > 400 ) {
				jTop.fadeIn();	
			} else {
				jTop.fadeOut(100);
			}
		});
	 
		$('.toTop').on('click', function() {
			$('body, html').animate({ scrollTop: 0 },400);
		});
	}

}