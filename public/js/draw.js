var wb = new Whiteboard( "testy" );

var wbdoc = new WhiteboardDocument();
var assignedTo;

var ctx, color = "#000";	
document.addEventListener( "DOMContentLoaded", function(){
	// setup a new canvas for drawing wait for device init
	setTimeout(function(){
		initApp();
    }, 1000);
}, false );

function initApp() {
	//wb.getLayerList();
	document.getElementById("content").innerHTML = "";
	wb.initLayers();
	newCanvas();
}

function newCanvas(){
	assignedTo = new WhiteboardLayer( window.innerWidth , window.innerHeight - 90 );
	wb.newLayer( assignedTo.id );
	document.getElementById("content").appendChild( assignedTo.canv );
	ctx = assignedTo.layer;
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;
	wbdoc.addLayer( assignedTo );
	drawTouch();
	drawPointer();
	drawMouse();
}

function startStroke( l , x , y ) {
	var lay = l === assignedTo.id ? assignedTo.layer : wbdoc.getLayer( l ).layer;
	lay.moveTo( x , y );
}
function continueStroke( l , x , y ) {
	var lay = l === assignedTo.id ? assignedTo.layer : wbdoc.getLayer( l ).layer;
	lay.lineTo( x , y );
	lay.stroke();
}
        
function selectColor(el){
    for(var i=0;i<document.getElementsByClassName("palette").length;i++){
        document.getElementsByClassName("palette")[i].style.borderColor = "#777";
        document.getElementsByClassName("palette")[i].style.borderStyle = "solid";
    }
    el.style.borderColor = "#fff";
    el.style.borderStyle = "dashed";
    color = window.getComputedStyle(el).backgroundColor;
    ctx.beginPath();
    ctx.strokeStyle = color;
	wb.changeColour( assignedTo.id , color );
}
// prototype to	start drawing on touch using canvas moveTo and lineTo
var drawTouch = function() {
	var start = function(e) {
		ctx.beginPath();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		startStroke( assignedTo.id , x , y );
		wb.startStroke( assignedTo.id , x , y );
	};
	var move = function(e) {
		e.preventDefault();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		continueStroke( assignedTo.id , x , y );
		wb.continueStroke( assignedTo.id , x , y );
	};
	assignedTo.canv.addEventListener("touchstart", start, false);
	assignedTo.canv.addEventListener("touchmove", move, false);
}; 
    
// prototype to	start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
var drawPointer = function() {
	var start = function(e) {
        e = e.originalEvent;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY-44;
		startStroke( assignedTo.id , x , y );
		wb.startStroke( assignedTo.id , x , y );
	};
	var move = function(e) {
		e.preventDefault();
        e = e.originalEvent;
		x = e.pageX;
		y = e.pageY-44;
		continueStroke( assignedTo.id , x , y );
		wb.continueStroke( assignedTo.id , x , y );
    };
	assignedTo.canv.addEventListener("MSPointerDown", start, false);
	assignedTo.canv.addEventListener("MSPointerMove", move, false);
};
// prototype to	start drawing on mouse using canvas moveTo and lineTo
var drawMouse = function() {
	var clicked = 0;
	var start = function(e) {
		clicked = 1;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY-44;
		startStroke( assignedTo.id , x , y );
		wb.startStroke( assignedTo.id , x , y );
	};
	var move = function(e) {
		if(clicked){
			x = e.pageX;
			y = e.pageY-44;
			continueStroke( assignedTo.id , x , y );
			wb.continueStroke( assignedTo.id , x , y );
		}
	};
	var stop = function(e) {
		clicked = 0;
	};
	assignedTo.canv.addEventListener("mousedown", start, false);
	assignedTo.canv.addEventListener("mousemove", move, false);
	document.addEventListener("mouseup", stop, false);
};

wb.receiveColour = function( l , c ) {
	var lay = wbdoc.getLayer( l ).layer;
	lay.beginPath();
	lay.strokeStyle = c;
}
wb.receiveStartStroke = startStroke;
wb.receiveContinueStroke = continueStroke;
wb.receiveNewLayer = function( l ) {
	var lay = new WhiteboardLayer( window.innerWidth , window.innerHeight - 90 );
	lay.id = l;
	lay.layer.lineWidth = 5;
	wbdoc.addLayer( lay );
	document.getElementById("content").innerHTML = "";
	for ( var i = 0 ; i < wbdoc.layers.length ; i++ ) {
		document.getElementById("content").appendChild( wbdoc.layers[i].canv );
	}
}