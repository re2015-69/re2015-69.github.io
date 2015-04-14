WhiteboardDocument = function() {
	this.layers = [];
	this.addLayer = function( wbl ) {
		this.layers.push( wbl );
		wbl.canv.style["z-index"] = 1000 - this.layers.length + 1;
	}
	this.swopIndexes = function( a , b ) {
		var l1 = this.layers[a];
		var l2 = this.layers[b];
		l1.canv.style["z-index"] = 1000 - b;
		l2.canv.style["z-index"] = 1000 - a;
		this.layers[a] = l2;
		this.layers[b] = l1;
	}
	this.getLayer = function( l ) {
		for ( var i = 0 ; i < this.layers.length ; i++ ) {
			if ( this.layers[i].id === l ) return this.layers[i];
		}
		return false;
	}
}
WhiteboardLayer = function( w , h ) {
	this.canv = document.createElement("canvas");
	this.canv.width = w || 800;
	this.canv.height = h || 600;
	this.layer = this.canv.getContext("2d");
	this.id = Date.now();
}

var socket = io('/draw');

var Whiteboard = function( sroom ) {
	console.log("Initialising Draw API . . .");
	this.room = sroom || "";
	var room = sroom || "";
	var users = {};
	if ( sroom ) {
		socket.emit( "changeroom" , { "o": "", "n": sroom } );
	}
	var uid = Date.now();
	this.changeRoom = function( nroom ) {
		var oroom = room;
		room = nroom;
		this.room = nroom;
		socket.emit( "changeroom" , { "o": oroom, "n": nroom } );
	}
	this.changeColour = function( layerid , colour ) {
		socket.emit( "colour" , { "wbid": room, "colour": colour, "id": uid, "lid": layerid } );
	}
	this.startStroke = function( layerid , x , y ) {
		socket.emit( "startstroke" , { "wbid": room, "x": x, "y": y, "id": uid, "lid": layerid } );
	}
	this.continueStroke = function( layerid , x , y ) {
		socket.emit( "contstroke" , { "wbid": room, "x": x, "y": y, "id": uid, "lid": layerid } );
	}
	this.newLayer = function( lid ) {
		socket.emit( "newlayer" , { "wbid": room, "lid": lid , "id": uid } );
	}
	this.initLayers = function() {
		socket.emit( "layers" );
	}
	var sthis = this;
	socket.on( "colour" , function( colour ) {
		if ( colour.id === uid ) return;
		if ( sthis.receiveColour ) {
			sthis.receiveColour( colour.lid , colour.colour );
		}
	} );
	socket.on( "startstroke" , function( strokedata ) {
		if ( strokedata.id === uid ) return;
		if ( sthis.receiveStartStroke ) {
			sthis.receiveStartStroke( strokedata.lid , strokedata.x , strokedata.y );
		}
	} );
	socket.on( "contstroke" , function( strokedata ) {
		if ( strokedata.id === uid ) return;
		if ( sthis.receiveContinueStroke ) {
			sthis.receiveContinueStroke( strokedata.lid , strokedata.x , strokedata.y );
		}
	} );
	socket.on( "newlayer" , function( layerdata ) {
		if ( layerdata.id === uid ) return;
		if ( sthis.receiveNewLayer ) {
			sthis.receiveNewLayer( layerdata.lid );
		}
	} );
	console.log("Done.");
}