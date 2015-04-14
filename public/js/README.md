JS code for client-side

# Draw API Documentation
	var wb = new Whiteboard( optional_room:String )
Creates a new whiteboard connecting to the specified room. The Whiteboard object is only for communications.

	wb.changeRoom( room:String )
Changes the room to the specified room.

	wb.room:String
The current room. Whiteboard uses an internal variable for sending data.

	wb.changeColour( layerid:Any , colour:String )
Call to change the pen colour.

	wb.startStroke( layerid:Any , x:Number , y:Number )
Call to start a new pen stroke.

	wb.continueStroke( layerid:Any , x:Number , y:Number )
Call to continue a pen stroke.

	wb.receiveColour = function( layerid:Any , colour:String )
Define to receive a colour change.

	wb.receiveStartStroke = function( layerid:Any , x:Number , y:Number )
Define to receive a start pen stroke.

	wb.receiveContinueStroke = function( layerid:Any , x:Number , y:Number )
Define to receive a continue pen stroke.

	var wbdoc = new WhiteboardDocument()
Creates a new WhiteboardDocument.

	wbdoc.layers:Array
The array representing the layers in the document.

	wbdoc.addLayer( layer:WhiteboardLayer )
Adds a layer to the document.

	wbdoc.swopIndexes( a:Number , b:Number )
Swops the z-indexing and position of elements a and b in the layers array.

	var wbl = new WhiteboardLayer()
Creates a new WhiteboardLayer.

	wbl.canv:Object
The canvas representing the layer.

	wbl.layer:Context
The context of the canvas.

	wbl.id:Any
Defaults to the timestamp of the layer when it was created. May be modified freely.