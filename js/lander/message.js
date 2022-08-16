/*
 Copyright (c) 2010, Jason Brown
 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.

*/
(function () {
	var utilities = new Utilities();	
	
    function Message(options)
    {
		// Required options
		this.message = options.message;
		this.pos = new Vector(options.x,options.y,0);
		this.font = options.font;
		this.type = 1;
		this.visible = 1;
		
		if(options.type){
			this.type = options.type;
		}
		
		if(this.type === 2 && options.blinkTime){
			this.lastBlinkTime = 0;
			this.blinkTime = options.blinkTime;
		}
	}
    
    this.Message = Message;
    Message.prototype.update = function(deltaTime){
		var curTime = (new Date()).getTime();

		if(this.type === 2 && curTime > this.lastBlinkTime + this.blinkTime){
			this.lastBlinkTime = curTime;
			this.visible = Math.abs(this.visible) - 1;
		}
	}
	
	 Message.prototype.updateMessage = function(message){
		this.message = message;
	}
	
    Message.prototype.draw = function(_context)
    {	
		if(this.visible){
			_context.save();
			_context.drawString(this.message,  this.font, this.pos.x, this.pos.y);
			_context.restore();
		}
    };
})();