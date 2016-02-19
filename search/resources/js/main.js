$(function() {
	$('.flexslider').flexslider({
		animation: 'fade',
		slideshow: true,
		controlNav: false,
		prevText: '<i class="fa fa-angle-left"></i>',
		nextText: '<i class="fa fa-angle-right"></i>'
	});
	
	var percent = 55;
	var slides = $("#slides");
	var w = $(window).resize(function() {
		slides.css("height", w.height() * percent / 100);
	});
	w.resize();
});