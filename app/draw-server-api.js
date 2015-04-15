console.log("Initialising Draw Server API . . .");
module.exports = function( io ) {
	var drawApp = io.of( "/draw" );
	var layers = {};
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
		socket.on( "newlayer" , function( data ) {
			drawApp.to( data.wbid ).emit( "newlayer" , data );
			layers[ data.wbid ].push( data );
		} );
		socket.on( "layers" , function( data ) {
			var layarr = layers[ data.wbid ] || [];
			for ( var i = 0 ; i < layarr.length ; i++ ) socket.emit( "newlayer" , layarr[i] );
			layers[ data.wbid ] = layarr;
		} );
	} );
}