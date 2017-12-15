/**
 * !resize only width
 * */
var resizeByWidth = true;

var prevWidth = -1;
$(window).resize(function () {
	var currentWidth = $('body').outerWidth();
	resizeByWidth = prevWidth !== currentWidth;
	if (resizeByWidth) {
		$(window).trigger('resizeByWidth');
		prevWidth = currentWidth;
	}
});

/**
 * !device detected
 * */
var DESKTOP = device.desktop();
var MOBILE = device.mobile();
var TABLET = device.tablet();

/**
 *  Add placeholder for old browsers
 * */
function placeholderInit() {
	$('[placeholder]').placeholder();
}

/**
 * !Show print page by click on the button
 * */
function printShow() {
	$('.view-print').on('click', function (e) {
		e.preventDefault();
		window.print();
	})
}

/**
 * !Toggle class for input on focus
 * */
function inputToggleFocusClass() {
	// use for the "focus" state
	var $fieldWrap = $('.field-effects-js');

	if ($fieldWrap.length) {
		var $inputsAll = $fieldWrap.find('input[type="email"], input[type="search"], :text, textarea, select');
		var _classFocus = 'input--focus';

		$inputsAll.focus(function () {
			var $thisField = $(this);

			$thisField
				.closest($fieldWrap)
				.addClass(_classFocus);

		}).blur(function () {
			var $thisField = $(this);

			$thisField
				.closest($fieldWrap)
				.removeClass(_classFocus);
		});
	}
}

function inputHasValueClass() {
	// use for the "has-value" state
	var $fieldWrap = $('.field-effects-js');

	if ($fieldWrap.length) {
		var $inputsAll = $fieldWrap.find('input[type="email"], input[type="search"], :text, textarea, select');
		var classHasValue = 'input--has-value';

		$.each($inputsAll, function () {
			switchHasValue.call(this);
		});

		// $inputsAll.on('change', function () {
		// 	switchHasValue.call(this);
		// });

		$inputsAll.on('keyup change', function () {
			switchHasValue.call(this);
		});

		function switchHasValue() {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			//first element of the select must have a value empty ("")
			if ($currentField.val().length === 0) {
				$currentFieldWrap.removeClass(classHasValue);
			} else if (!$currentFieldWrap.hasClass(classHasValue)) {
				$currentFieldWrap.addClass(classHasValue);
			}
		}
	}
}

/**
 * !Initial sliders on the project
 * */
function slidersInit() {
	/*main slider*/
	var $mainSlider = $('.main-slider-js');
	if ($mainSlider.length) {
		var dur = 800;

		$mainSlider.each(function () {
			var $thisSlider = $(this);
			var $thisBtnNext = $('.swiper-button-next', $thisSlider);
			var $thisBtnPrev = $('.swiper-button-prev', $thisSlider);
			var $thisFractPag = $('.swiper-pagination', $thisSlider);

			var thisSwiper = new Swiper($thisSlider, {
				// Optional parameters
				speed: dur,
				parallax: true,
				loop: false,
				mousewheel: true,
				// Keyboard
				keyboardControl: true,

				// Navigation arrows
				nextButton: $thisBtnNext,
				prevButton: $thisBtnPrev,

				// Pagination
				pagination: $thisFractPag,
				paginationType: 'fraction',

				breakpoints: {
					992: {
						simulateTouch: false,
						shortSwipes: false,
						longSwipes: false,
						followFinger: false,
						allowTouchMove: false,
						touchMoveStopPropagation: false
					}
				}
			});

			$(document).on('mousewheel', function(event) {
				if(window.innerWidth < 992) {
					return;
				}

				if($('.main-section--info').hasClass('fp-completely') && !thisSwiper.animating){
					if(event.deltaY < 0) {
						thisSwiper.slideNext();
					} else {
						thisSwiper.slidePrev();
					}

					if(thisSwiper.previousIndex === 0 && thisSwiper.realIndex === 0) {
						$.fn.fullpage.setAllowScrolling(true);
					} else {
						$.fn.fullpage.setAllowScrolling(false);
					}
				}
			});
		});
	}


}

/**
 * !Initial full page scroll plugin
 * */
function fullPageInitial() {

	var $mainSections = $('.main-sections-js');
	if($mainSections.length) {
		$mainSections.fullpage({
			verticalCentered: false,
			sectionSelector: '.main-section-js',
			scrollingSpeed: 600,
			recordHistory: true,
			responsiveWidth: 992,
			responsiveHeight: 400,

			// dots navigation
			navigation: false,
			navigationPosition: null
		});
	}

	$('.move-next-section-js').on('click', function (e) {
		e.preventDefault();

		if($mainSections.length) {
			$.fn.fullpage.moveSectionDown();
		}
	});
}
/*full page scroll*/

/**
 * !popup initial
 * */
function popupInitial(){

	var btnCloseTpl = '<button title="%title%" type="button" class="mfp-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 51.4" width="24" height="24"><path d="M44.1 20.1c4.3-3.3 2.4-7.7 2.4-11.7 0-0.3-0.3-0.7-0.5-1C43.1 4.9 40.2 2.4 37.3 0c-4.6 3.7-8.9 7.2-13.1 10.6l-9.3-9.3C9.4 5.2 4.6 11.5 2.7 17.2c-0.2 0.5 0.2 1.5 0.6 1.9 1.7 1.7 3.4 3.4 5.2 5 1.7 1.5 1.6 2.8 0.1 4.4 -2 2.1-4.2 4.1-5.6 6.6 -4.4 7.7-4 9.1 2.4 15.2 1.8 1.7 2.9 1.5 4.5-0.1 4.1-4 8.3-7.7 12.7-11.7 3.7 3.4 7.3 6.7 11 10 2.1-2.3 4.1-4.6 6.1-6.8 1-1 2.6-1.6 3.2-2.7 2.5-4.3 1.7-7.9-2.2-11.1 -0.7-0.6-1.3-1.3-2.2-2.2C40.4 23.7 42.1 21.6 44.1 20.1zM42.9 20.1c-0.4 0-0.7-0.1-1.1-0.1 0.3-2.7 0.5-5.3 0.8-8l1.1 0.1C43.5 14.8 43.2 17.4 42.9 20.1zM45.9 10l-0.4 7.4c-0.3 0-0.7 0-1-0.1 0.1-2.5 0.2-4.9 0.2-7.4C45.1 10 45.5 10 45.9 10zM7.4 10.5c1.9 3.7-1.3 5.7-1.4 8.5C3.8 17.5 4.3 14.7 7.4 10.5zM8.5 21.7c-2.3-2-1.7-4.9 1.6-8.6C12.2 16.8 9.2 18.9 8.5 21.7zM12.3 16.5c1.8 1.7 1.3 4.1-1.8 7.6C9 22.4 9.5 20.4 12.3 16.5zM3.2 36.3c1.8 1.7 1.1 4.9-1.8 8.7C0.2 41.4 3.2 39.3 3.2 36.3zM4.5 47.9c-3-3.8 0.9-6.3 0.9-9.5C8.1 39.7 7.7 42.7 4.5 47.9zM8.1 50.4c-2.8-1.8-2.7-2.6 0.5-8.9C10.5 43.2 10.5 44 8.1 50.4zM11.1 47.5c-0.4-0.1-0.7-0.3-1.1-0.4 0.9-2.6 1.8-5.2 2.7-7.8 0.3 0.1 0.7 0.2 1 0.3C13.1 42.3 13.6 45.4 11.1 47.5zM17.4 36c-0.7 3-0.4 6.1-2.9 8.6C13.9 40.1 15 36.9 17.4 36zM18.6 41.2c-0.4-0.1-0.8-0.2-1.1-0.3 1.3-2.7-0.2-6.1 2.3-8.4 0.3 0.1 0.6 0.2 0.9 0.2C19.9 35.5 19.2 38.4 18.6 41.2zM20.6 38.1c0.7-3.9 0.1-7.7 4-9.8C25.1 32 24.5 35.4 20.6 38.1zM26.2 30.6c2.5 3-0.7 5.6-0.7 8.4C23.6 36 25.5 33.3 26.2 30.6zM28.8 33c1.9 1.6 1.7 4.7-0.6 8.6C26.4 40.1 26.6 36.5 28.8 33zM31.4 35.8c1.8 1.5 1.8 1.5-0.4 8C29.5 42 29.7 39.8 31.4 35.8zM35 42.1c-0.4 1.4-0.8 2.9-1.2 4.3 -2.2-1.1-2.2-1.1-0.4-7.6C35.7 39.6 35.7 39.6 35 42.1zM36.5 43.9c-0.3-0.1-0.7-0.2-1-0.3 0.7-2.3 1.4-4.6 2.1-6.9 0.4 0.1 0.7 0.2 1.1 0.3C37.9 39.2 37.2 41.6 36.5 43.9zM40.6 29c1.4 1.3 1.7 2.4 0.1 3.8 -6.9 6.1-4.7 5.7-10.2 0 -1.7-1.7-3.9-3.1-5.9-4.6 0 0 0 0 0.1 0 0 0 0 0-0.1 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.1 0.5-2.5 0.8-3.4 1.6 -2.9 2.8-5.6 5.9-8.4 8.9 -0.7 0.8-1.5 1.5-2.3 2.4l-6.4-6.4c4.3-4.8 8.7-9.8 13.4-15.1 -2.6-2.6-5.2-5.4-8-7.9C8.1 10.3 7.7 9.2 9.4 7.7c1-0.9 1.9-1.9 2.9-2.8 2.7-2.6 2.8-2.6 5.4 0.2 2.2 2.3 4.1 4.8 6.1 7.1 4-3.2 8-6.3 11.9-9.6 1.5-1.3 2.4-1 3.6 0.3 0.9 1 1.9 1.9 3 2.8 3 2.4 3.1 2.4 0.4 5.2 -3.4 3.4-6.8 6.8-10.1 10.1C35.2 23.7 37.8 26.4 40.6 29zM39 23.3c0.4-3.1-0.7-6.6 2.1-9.2C40.8 17.2 41.5 20.6 39 23.3z"></path></svg></button>';

	var $defaultPopup = $('.btn-popup-js');
	if ($defaultPopup.length) {
		$defaultPopup.magnificPopup({
			type: 'inline',
			midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.,
			// closeOnContentClick: false,
			mainClass: 'mfp-zoom-in',
			removalDelay: 500,
			fixedContentPos: 'auto',
			overflowY: 'auto',
			closeMarkup: btnCloseTpl,
			callbacks: {
				open: function () {
					$.fn.fullpage.setAllowScrolling(false);
				}, close: function () {
					$.fn.fullpage.setAllowScrolling(true);
				}
			}
		});
	}

	var $videoPopup = $('.popup-video-js');
	if ($videoPopup.length) {
		$videoPopup.magnificPopup({
			disableOn: 500,
			midClick: false,
			type: 'iframe',
			mainClass: 'mfp-zoom-in mfp-iframe-view',
			removalDelay: 500,
			preloader: false,
			closeMarkup: btnCloseTpl,
			closeBtnInside: false,

			fixedContentPos: false
		});
	}
}

/**
 * !Toggle drop (plugin)
 * */
;(function($){
	var defaults = {
		opener: '.ms-drop__opener-js',
		openerText: 'span',
		drop: '.ms-drop__drop-js',
		dropOption: '.ms-drop__drop-js a',
		dropOptionText: 'span',
		initClass: 'ms-drop--initialized',
		outsideClick: true, // Close all if outside click
		clickEsc: true, // Close all if esc key click
		closeAfterSelect: true, // Close drop after selected option
		preventOption: false, // Add preventDefault on click to option
		selectValue: true, // Display the selected value in the opener
		modifiers: {
			isOpen: 'is-open',
			activeItem: 'active-item'
		}

		// Callback functions
		// afterInit: function () {} // Fire immediately after initialized
		// afterChange: function () {} // Fire immediately after added or removed an open-class
	};

	function MsDrop(element, options) {
		var self = this;

		self.config = $.extend(true, {}, defaults, options);

		self.element = element;

		self.callbacks();
		self.event();
		// close drop if clicked outside active element
		if (self.config.outsideClick) {
			self.clickOutside();
		}
		if (self.config.clickEsc) {
			self.clickEsc();
		}
		self.eventDropItems();
		self.init();
	}

	/** track events */
	MsDrop.prototype.callbacks = function () {
		var self = this;
		$.each(self.config, function (key, value) {
			if(typeof value === 'function') {
				self.element.on(key + '.msDrop', function (e, param) {
					return value(e, self.element, param);
				});
			}
		});
	};

	MsDrop.prototype.event = function () {
		var self = this;
		self.element.on('click', self.config.opener, function (event) {
			event.preventDefault();
			var curContainer = $(this).closest(self.element);

			if (curContainer.hasClass(self.config.modifiers.isOpen)) {
				curContainer.removeClass(self.config.modifiers.isOpen);

				// callback afterChange
				self.element.trigger('afterChange.msDrop');
				return;
			}

			self.element.removeClass(self.config.modifiers.isOpen);

			curContainer.addClass(self.config.modifiers.isOpen);

			// callback afterChange
			self.element.trigger('afterChange.msDrop');
		});
	};

	MsDrop.prototype.clickOutside = function () {

		var self = this;
		$(document).on('click', function(event){
			if( $(event.target).closest(self.element).length ) {
				return;
			}

			self.closeDrop();
			event.stopPropagation();
		});

	};

	MsDrop.prototype.clickEsc = function () {

		var self = this;

		$(document).keyup(function(e) {
			if (self.element.hasClass(self.config.modifiers.isOpen) && e.keyCode === 27) {
				self.closeDrop();
			}
		});
	};

	MsDrop.prototype.closeDrop = function (container) {

		var self = this,
			$element = $(container || self.element);

		if ($element.hasClass(self.config.modifiers.isOpen)) {
			$element.removeClass(self.config.modifiers.isOpen);
		}

	};

	MsDrop.prototype.eventDropItems = function () {

		var self = this;

		self.element.on('click', self.config.dropOption, function (e) {
			var cur = $(this);
			var curParent = cur.parent();

			if(curParent.hasClass(self.config.modifiers.activeItem)){
				e.preventDefault();
				return;
			}
			if(self.config.preventOption){
				e.preventDefault();
			}

			var curContainer = cur.closest(self.element);

			curContainer.find(self.config.dropOption).parent().removeClass(self.config.modifiers.activeItem);

			curParent
				.addClass(self.config.modifiers.activeItem);

			if(self.config.selectValue){
				curContainer
					.find(self.config.opener).find(self.config.openerText)
					.text(cur.find(self.config.dropOptionText).text());
			}

			if(self.config.closeAfterSelect) {
				self.closeDrop();
			}

		});

	};

	MsDrop.prototype.init = function () {

		this.element.addClass(this.config.initClass);

		this.element.trigger('afterInit.msDrop');

	};

	$.fn.msDrop = function (options) {
		'use strict';

		return this.each(function(){
			new MsDrop($(this), options);
		});

	};
})(jQuery);

/**
 * !Toggle drop initial
 * */
function toggleDropInit() {
	var $shareContainer = $('.social-share__container-js');
	if($shareContainer.length){
		$shareContainer.msDrop({
			opener: '.social-share__opener-js',
			drop: 'social-share__drop-js',
			selectValue: false
		})
	}
}

/**
 * !Testing form validation (for example). Do not use on release!
 * */
function formSuccessExample() {
	var $form = $('.user-form form, .subscription-form form, .callback-form form');

	if ( $form.length ) {

		$form.submit(function (event) {
			var $thisForm = $(this);

			if ($thisForm.parent().hasClass('success-form')) return;

			event.preventDefault();

			testValidateForm($thisForm);
		});

	}

	function testValidateForm(form) {
		var $thisFormWrap = form.parent();

		var $inputs = $(':text, input[type="email"], input[type="password"], textarea, select', form);

		var inputsLength = $inputs.length;
		var inputsHasValueLength = $inputs.filter(function () {
			return $(this).val().length;
		}).length;

		$thisFormWrap.toggleClass('error-form', inputsLength !== inputsHasValueLength);
		$thisFormWrap.toggleClass('success-form', inputsLength === inputsHasValueLength);

		$.each($inputs, function () {
			var $thisInput = $(this);
			var thisInputVal = $thisInput.val();
			var $thisInputWrap = $thisInput.closest('.input-wrap');

			$thisInput.toggleClass('error', !thisInputVal.length);
			$thisInput.toggleClass('success', !!thisInputVal.length);

			$thisInputWrap.toggleClass('error', !thisInputVal.length);
			$thisInputWrap.toggleClass('success', !!thisInputVal.length);
		});
	}
}

/**
 * =========== !ready document, load/resize window ===========
 */

$(window).on('load', function () {
	// add functions
});

$(window).on('debouncedresize', function () {
	// $(document.body).trigger("sticky_kit:recalc");
});

$(document).ready(function () {
	placeholderInit();
	printShow();
	inputToggleFocusClass();
	inputHasValueClass();
	slidersInit();
	fullPageInitial();
	popupInitial();
	toggleDropInit();

	formSuccessExample();
});
