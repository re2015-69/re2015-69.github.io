console.log("Initialising Draw Server API . . .");
module.exports = function( io ) {
	var drawApp = io.of( "/draw" );
	drawApp.on( "connection" , function( socket ) {
		socket.on( "changeroom" , function( data ) {
			socket.leave( data.o );
			socket.join( data.n );
		} );
		socket.on( "colour" , function( data ) {
			drawApp.to( data.wbid ).emit( "colour" , data );
		} );
		socket.on( "startstroke" , function( data ) {
			drawApp.to( data.wbid ).emit( "startstroke" , data );
		} );
		socket.on( "contstroke" , function( data ) {
			drawApp.to( data.wbid ).emit( "contstroke" , data );
		} );
	} );
}