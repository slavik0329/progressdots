# ProgressDots
Awesome jQuery progressbar plugin

<h2>Javascript</h2>
```Javascript
$( '#progressBox' ).dottify({		
	numDots: 17,		
	dotColor: '#51048e',		
	dotSize: '7px',		
	radius: '60%',		
	randomColors: true //Change colors after every pass
});
```

<h2>HTML</h2>
```HTML
<!-- jQuery library included first -->
<script src="jquery.min.js"></script> 
<!-- Include ProgressDots plugin -->
<script src="jquery.progressdots.js"></script> 
<!-- Include CSS for plugin -->
<link href="jquery.progressdots.css" rel="stylesheet"> 

<!-- Create a container of any width/height  -->
<div id='progressBox'></div>
```
<h2>CSS</h2>
```CSS
#progressBox  {
    border: 8px solid #DDD;
    width: 80%;
    height: 40px;
}
```

Live demo: http://progressdots.rubixapps.com/
