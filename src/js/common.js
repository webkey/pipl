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
 * !toggle class for input on focus
 * */
function inputToggleFocusClass() {
	// use for the "focus" state
	var $inputs = $('.field-effects-js');

	if ($inputs.length) {
		var $fieldWrap = $('.input-wrap');
		var $selectWrap = $('.select');
		var classFocus = 'input--focus';

		$inputs.focus(function () {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			// add class on input
			$currentField.addClass(classFocus);
			// add class on label
			$currentField.prev('label').addClass(classFocus);
			$currentField.closest($selectWrap).prev('label').addClass(classFocus);
			// add class on wrapper
			$currentFieldWrap.addClass(classFocus);
			// add class on label in wrapper
			$currentFieldWrap.find('label').addClass(classFocus);

		}).blur(function () {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			// remove class on input
			$currentField.removeClass(classFocus);
			// remove class on label
			$currentField.prev('label').removeClass(classFocus);
			$currentField.closest($selectWrap).prev('label').removeClass(classFocus);
			// remove class on wrapper
			$currentFieldWrap.removeClass(classFocus);
			// remove class on label in wrapper
			$currentFieldWrap.find('label').removeClass(classFocus);

		});
	}
}

function inputHasValueClass() {
	// use for the "has-value" state
	var $inputs = $('.field-effects-js');

	if ($inputs.length) {
		var $fieldWrap = $('.input-wrap');
		var $selectWrap = $('.select');
		var classHasValue = 'input--has-value';

		$.each($inputs, function () {
			switchHasValue.call(this);
		});

		$inputs.on('keyup change', function () {
			switchHasValue.call(this);
		});

		function switchHasValue() {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			//first element of the select must have a value empty ("")
			if ($currentField.val().length === 0) {
				// remove class on input
				$currentField.removeClass(classHasValue);
				// remove class on label
				$currentField.prev('label').removeClass(classHasValue);
				$currentField.closest($selectWrap).prev('label').removeClass(classHasValue);
				// remove class on wrapper
				$currentFieldWrap.removeClass(classHasValue);
				// remove class on label in wrapper
				$currentFieldWrap.find('label').removeClass(classHasValue);
			} else if (!$currentField.hasClass(classHasValue)) {
				// add class on input
				$currentField.addClass(classHasValue);
				// add class on label
				$currentField.prev('label').addClass(classHasValue);
				$currentField.closest($selectWrap).prev('label').addClass(classHasValue);
				// add class on wrapper
				$currentFieldWrap.addClass(classHasValue);
				// add class on label in wrapper
				$currentFieldWrap.find('label').addClass(classHasValue);
			}
		}
	}
}

function inputFilledClass() {
	// use if the "focus" state and the "has-value" state are the same
	var $fieldWrap = $('.field-effects-js');

	if ($fieldWrap.length) {
		var $inputsAll = $fieldWrap.find('input[type="email"], input[type="search"], :text, textarea, select');
		var _classFilled = 'input--filled';

		$inputsAll.focus(function () {
			var $thisField = $(this);

			$thisField
				.closest($fieldWrap)
				.addClass(_classFilled);

		}).blur(function () {
			var $thisField = $(this);

			if ($thisField.val() === '') {
				$thisField
					.closest($fieldWrap)
					.removeClass(_classFilled);
			}
		});

		function switchHasValue() {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			$currentFieldWrap.removeClass(_classFilled);

			//first element of the select must have a value empty ("")
			if ($currentField.val() !== '') {
				$currentFieldWrap.addClass(_classFilled);
			}
		}

		$.each($inputsAll, function () {
			switchHasValue.call(this);
		});

		$inputsAll.on('change', function () {
			switchHasValue.call(this);
		});
	}
}
/*toggle class for input on focus end*/

/**
 * !Initial custom select for cross-browser styling
 * */
function customSelect(select) {
	$.each(select, function () {
		var $thisSelect = $(this);
		// var placeholder = $thisSelect.attr('data-placeholder') || '';
		$thisSelect.select2({
			language: "ru",
			width: '100%',
			containerCssClass: 'cselect-head',
			dropdownCssClass: 'cselect-drop'
			// , placeholder: placeholder
		});
	})
}

/**
 * !Initial sliders on the project
 * */
function slidersInit() {
	//images carousel
	var $imagesCarousel = $('.images-slider');

	if($imagesCarousel.length){
		var slideCounterTpl = '' +
			'<div class="slider-counter">' +
				'<span class="slide-curr">0</span>/<span class="slide-total">0</span>' +
			'</div>';

		$imagesCarousel.each(function () {
			var $currentImagesCarousel = $(this);
			var $images = $currentImagesCarousel.find('.images-slider__list');
			var $titles = $currentImagesCarousel.find('.flashes');
			var dur = 200;

			$images.on('init', function (event, slick) {
				$(slick.$slider).append($(slideCounterTpl).clone());

				$('.slide-total', $(slick.$slider)).text(slick.$slides.length);
				$('.slide-curr', $(slick.$slider)).text(slick.currentSlide + 1);
			});

			$images.slick({
				fade: false,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				asNavFor: $titles,
				// initialSlide: 2,
				lazyLoad: 'ondemand',
				infinite: true,
				dots: true,
				arrows: true
			}).on('beforeChange', function (event, slick, currentSlide, nextSlider) {
				$('.slide-curr', $(slick.$slider)).text(nextSlider + 1);
			});

			$titles.slick({
				fade: true,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				asNavFor: $images,
				dots: false,
				arrows: false
			});

		});
	}

	/*main slider*/
	var $mainSlider = $('.main-slider-js');
	if ($mainSlider.length) {
		$mainSlider.each(function () {
			var $thisSlider = $(this);
			var $thisBtnNext = $('.swiper-button-next', $thisSlider);
			var $thisBtnPrev = $('.swiper-button-prev', $thisSlider);
			var $thisFractPag = $('.swiper-pagination', $thisSlider);

			new Swiper($thisSlider, {
				// Optional parameters
				speed: 800,
				parallax: true,
				loop: false,
				// Keyboard
				keyboardControl: true,

				// Navigation arrows
				nextButton: $thisBtnNext,
				prevButton: $thisBtnPrev,

				// Pagination
				pagination: $thisFractPag,
				paginationType: 'fraction'
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
			responsiveWidth: 1200,
			responsiveHeight: 400,

			// dots navigation
			navigation: true,
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

	var btnCloseTpl = '<button title="%title%" type="button" class="mfp-close"><svg class="svg-ico-close" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 57.2 57.2"><path d="M34.3 28.6L56 6.9c1.6-1.6 1.6-4.1 0-5.7 -1.6-1.6-4.1-1.6-5.7 0L28.6 22.9 6.9 1.3c-1.6-1.6-4.1-1.6-5.7 0 -1.6 1.6-1.6 4.1 0 5.7l21.7 21.6L1.3 50.3c-1.6 1.5-1.6 4.1 0 5.6 0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2l21.7-21.6L50.3 56c0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2c1.6-1.6 1.6-4.1 0-5.7L34.3 28.6z"></path></svg></button>';

	$('.btn-popup-js').magnificPopup({
		type: 'inline',
		midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.,
		// closeOnContentClick: false,
		mainClass: 'mfp-zoom-in',
		removalDelay: 500,
		fixedContentPos: 'auto',
		overflowY: 'auto',
		closeMarkup: btnCloseTpl
	});
}

/**
 * !Testing form validation (for example). Do not use on release!
 * */
function formSuccessExample() {
	var $form = $('.user-form form');

	if ( $form.length ) {

		$form.submit(function (event) {
			var $thisForm = $(this);

			if ($thisForm.parent().hasClass('success-form')) return;

			event.preventDefault();

			testValidateForm($thisForm);
		});

		// $(':text, input[type="email"], textarea', $form).on('keyup change', function () {
		// 	var $form = $(this).closest('form');
		// 	if ($form.parent().hasClass('error-form')) {
		// 		testValidateForm($form);
		// 	}
		// })

	}

	function testValidateForm(form) {
		var $thisFormWrap = form.parent();

		var $inputs = $(':text, input[type="email"], input[type="password"], textarea', form);

		var inputsLength = $inputs.length;
		var inputsHasValueLength = $inputs.filter(function () {
			return $(this).val().length;
		}).length;

		$thisFormWrap.toggleClass('error-form', inputsLength !== inputsHasValueLength);
		$thisFormWrap.toggleClass('success-form', inputsLength === inputsHasValueLength);

		$.each($inputs, function () {
			var $thisInput = $(this);
			var thisInputVal = $thisInput.val();
			var $thisInputWrap = $thisInput.parent();

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
	// inputFilledClass();
	customSelect($('select.cselect'));
	slidersInit();
	objectFitImages(); // object-fit-images initial
	fullPageInitial();
	popupInitial();

	formSuccessExample();
});
