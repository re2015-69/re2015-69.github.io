JS code for client-side

# Draw API Documentation
	var wb = new Whiteboard( optional_room:String )
Creates a new whiteboard connecting to the specified room.
	wb.changeRoom( room:String )
Changes the room to the specified room.
	wb.room:String
The current room. Whiteboard uses an internal variable for sending data.
	wb.changeColour( colour:String )
Call to change the pen colour.
	wb.startStroke( x:Number , y:Number )
Call to start a new pen stroke.
	wb.continueStroke( x:Number , y:Number )
Call to continue a pen stroke.
	wb.receiveColour = function( colour:String )
Define to receive a colour change.
	wb.receiveStartStroke = function( x:Number , y:Number )
Define to receive a start pen stroke.
	wb.receiveContinueStroke = function( x:Number , y:Number )
Define to receive a continue pen stroke.