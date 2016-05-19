 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-78024926-1', 'auto');
  ga('send', 'pageview');


$(document).ready(function() {
    var prt = document.getElementById('particles');
    if (prt) {
        particleground(prt, {
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
    }
});