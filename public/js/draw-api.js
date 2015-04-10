var socket = io('/draw');

console.log("Initialising Draw API . . .");

var Whiteboard = function( sroom ) {
	this.room = sroom || "";
	var room = sroom || "";
	if ( sroom ) {
		socket.emit( "changeroom" , { "o": "", "n": sroom } );
	}
	var idthing = Date.now();
	this.changeRoom = function( nroom ) {
		var oroom = room;
		room = nroom;
		this.room = nroom;
		socket.emit( "changeroom" , { "o": oroom, "n": nroom } );
	}
	this.changeColour = function( colour ) {
		socket.emit( "colour" , { "wbid": room, "colour": colour, "id": idthing } );
	}
	this.startStroke = function( x , y ) {
		socket.emit( "startstroke" , { "wbid": room, "x": x, "y": y, "id": idthing } );
	}
	this.continueStroke = function( x , y ) {
		socket.emit( "contstroke" , { "wbid": room, "x": x, "y": y, "id": idthing } );
	}
	var sthis = this;
	socket.on( "colour" , function( colour ) {
		if ( colour.id === idthing ) return;
		if ( sthis.receiveColour ) {
			sthis.receiveColour( colour.colour );
		}
	} );
	socket.on( "startstroke" , function( strokedata ) {
		if ( strokedata.id === idthing ) return;
		if ( sthis.receiveStartStroke ) {
			sthis.receiveStartStroke( strokedata.x , strokedata.y );
		}
	} );
	socket.on( "contstroke" , function( strokedata ) {
		if ( strokedata.id === idthing ) return;
		if ( sthis.receiveContinueStroke ) {
			sthis.receiveContinueStroke( strokedata.x , strokedata.y );
		}
	} );
}