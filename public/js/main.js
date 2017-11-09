/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	;$(function () {
		/* Current submenu */
		var cur_href = document.location.pathname;
		console.log(cur_href);
		var slashPosition = cur_href.lastIndexOf('/');
		var menu_href = cur_href.slice(slashPosition + 1);
		console.log(menu_href);

		$('a[href="' + menu_href + '"]', 'nav.navbar').parent('li').addClass('active open').parents('li').addClass('open');

		/* autocomplete */

		// Ajax lookup:
		//$('.searchField input').autocomplete({
		//	serviceUrl: 'http://rossot.vmb.co:14180/api/suggestions/search?'
		//});

		// Local lookup (no ajax):
		var searchQuery = [{ value: 'образование в россии' }, { value: 'обратная связь' }, { value: 'обращение в россотрудничество' }, { value: 'образ' }];
		$('.searchField input').autocomplete({
			autoSelectFirst: true,
			lookup: searchQuery
		});

		/* show/hide date interval for search result */
		$('#datepicker').datepicker({
			language: "ru",
			multidate: false,
			daysOfWeekHighlighted: "0,6",
			todayHighlight: true
		});

		$('.searchResult .selectResult').on('click', 'a.datePeriod', function () {
			$('#datepicker').css('display', 'table');
		});
		$('.searchResult .selectResult').on('click', 'a.dateAlltime', function () {
			$('#datepicker').css('display', 'none');
		});

		/* layout newsBlock */
		if (document.body.clientWidth > 767) {
			$('.grid').masonry();
		}

		/* counter textarea */
		$('#feedbackForm textarea').keypress(function () {
			counter(this);
		});
		$('#feedbackForm textarea').keyup(function () {
			counter(this);
		});
		$('#feedbackForm textarea').change(function () {
			counter(this);
		});
		function counter(el) {
			var wrapper = document.createElement('DIV');
			wrapper.innerHTML = el.value;
			var len = (wrapper.textContent || wrapper.innerText).length;
			document.getElementById('count').innerHTML = len;
			//document.getElementById('kb').innerHTML = (len/1024).toFixed(2);
		}

		/* account Form */
		var feedbackForm = document.forms.feedbackForm;

		if (feedbackForm) {
			var requiredInputs = $('#feedbackForm .required');
			var agreed = feedbackForm.elements.agreed;
			var validRequireds = false;
			$(requiredInputs).change(function () {
				validRequireds = true;
				$(requiredInputs).each(function () {
					if ($(this).val() == '') {
						validRequireds = false;
					}
					if ($(this).val() != '') {
						$(this).closest('.form-group').removeClass('has-error');
					}
				});

				if (agreed.classList.contains('checked') && validRequireds == true) {
					$(feedbackForm.elements.submitFeedback).prop('disabled', false);
				} else {
					$(feedbackForm.elements.submitFeedback).prop('disabled', true);
				}
			});

			$(agreed).on('click', function () {
				this.classList.toggle('checked');
				if (agreed.classList.contains('checked')) {
					$(requiredInputs).each(function () {
						if ($(this).val() == '') {
							$(this).closest('.form-group').addClass('has-error');
						}
					});

					if (validRequireds == true) {
						$(feedbackForm.elements.submitFeedback).prop('disabled', false);
					}
				} else {
					$(feedbackForm.elements.submitFeedback).prop('disabled', true);
				}
			});
		}

		// clickable anons-block
		$("section.anons").on("click", "article", function () {
			window.location = $(this).find("a").attr('href');
		});
		// clickable news-block
		$("section.news").on("click", ".news", function () {
			window.location = $(this).find("a").attr('href') || 'news.html';
		});
		// clickable projects-block
		$("section.projects").on("click", "article", function () {
			window.location = $(this).find("a").attr('href');
		});
		// clickable manage-block
		$("section.manage.block").on("click", "article", function () {
			window.location = $(this).find("a").attr('href');
		});
		// clickable programs-block
		$("section.programs").on("click", "article", function () {
			window.location = $(this).find("a").attr('href');
		});

		// select lang
		$('.navbar-default .lang').on('click', 'a', function () {
			$('.navbar-default.visible-xs .lang a.active').removeClass('active');
			$(this).addClass('active');
		});

		/* Correcting jumping navbar on collapsing */
		var htmlWidth = document.documentElement.clientWidth;
		$(window).resize(function () {
			htmlWidth = document.documentElement.clientWidth;
		});
		document.querySelector('.navbar-default.visible-xs .navbar-toggle').addEventListener('click', function () {
			this.classList.toggle('open-nav');
			document.body.classList.toggle('overflow-hid');
			var scrollbarWidth = document.documentElement.clientWidth - htmlWidth;
			document.body.style.paddingRight = scrollbarWidth + 'px';
			document.querySelector('.navbar.navbar-default.visible-xs').style.paddingRight = scrollbarWidth + 'px';
		});

		// fixed desktop navbar
		var navDesktop = document.querySelector('.navbar.navbar-desktop');
		var navOffset = navDesktop.offsetTop;
		window.onscroll = function () {
			var scrolled = window.pageYOffset || document.documentElement.scrollTop;
			if (scrolled >= navOffset) {
				navDesktop.classList.add('fixed-nav');
				$('.navbar-desktop .navbarLine').addClass('container');
			} else {
				navDesktop.classList.remove('fixed-nav');
				$('.navbar-desktop .navbarLine').removeClass('container');
			}
		};

		//collapse menu
		$('.navbar-default #navbar-collapsed').on('shown.bs.collapse', function () {
			var docHeight = document.documentElement.clientHeight;
			var navLineHeight = document.querySelector('.navbar-default.visible-xs .navbar-header').offsetHeight;
			var visibleSearchLine = 0;
			if (document.querySelector('.navbar.navbar-desktop .navbarLine .searchField.visibleSearch')) {
				visibleSearchLine = document.querySelector('.navbar-default.visible-xs .searchField.visibleSearch').offsetHeight;
			}
			var menuHeight = docHeight - navLineHeight - visibleSearchLine;
			//$('body').addClass('overflow-hid');
			$('.navbar-default #navbar-collapsed').height(menuHeight);
		});
		$('.navbar-default #navbar-collapsed').on('hidden.bs.collapse', function () {
			//$('body').removeClass('overflow-hid');
		});

		// search line
		$('.navbar.navbar-default .search').click(function () {
			$('.navbar.navbar-default .searchField').toggle();
			document.querySelector('.navbar.navbar-default .searchField input.form-control').focus();
			return false;
		});
		$('.navbar.navbar-desktop .search').click(function () {
			$('.navbar.navbar-desktop .searchField').toggle();
			document.querySelector('.navbar.navbar-desktop .searchField input.form-control').focus();
			return false;
		});
		$('body').click(function (evt) {
			if (!document.querySelector('.navbar.navbar-desktop .navbarLine .searchField.visibleSearch')) {
				if ($('.navbar.navbar-desktop .navbarLine .searchField').css('display') !== 'none') {
					if (evt.target.nodeName !== document.querySelector('.navbar.navbar-desktop .searchField input.form-control').nodeName) {
						$('.navbar.navbar-desktop .navbarLine .searchField').toggle();
					}
				}
				if ($('.navbar.navbar-default .navbar-header .searchField:not(.visibleSearch)').css('display') !== 'none') {
					if (evt.target.nodeName !== document.querySelector('.navbar.navbar-default .searchField input.form-control').nodeName) {
						$('.navbar.navbar-default .navbar-header .searchField').toggle();
					}
				}
			}
		});
	});

/***/ })
/******/ ]);