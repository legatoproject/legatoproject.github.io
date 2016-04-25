document.addEventListener('DOMContentLoaded', function() {
    particleground(document.getElementById('particles'), {
        parallax: true,
        parallaxMultiplier: 40,
        dotColor: '#B7CDD4',
        lineColor: '#A9C3CC',
        density: 4500,
        minSpeedX: 0.1,
	    maxSpeedX: 0.5,
	    minSpeedY: 0.1,
	    maxSpeedY: 0.5,

    });
}, false);