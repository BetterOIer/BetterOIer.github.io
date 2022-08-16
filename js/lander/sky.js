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
	
    function Sky(_width, _terrainObj)
    {    
		this.width = _width;
		this.reset(_terrainObj);
    }
    
    this.Sky = Sky;
    
// public
	// Draws the sky
    Sky.prototype.draw = function(_context)
    {	
		_context.save();
		_context.fillStyle = "#fff";
		var starNum = this.stars.length,
			zoom = Lander.settings.zoom,
			x = Lander.settings.zx,
			y = Lander.settings.zy;
			
		for(var star = 0; star < starNum; star++){
			_context.fillRect((this.stars[star].x - x) * zoom, (this.stars[star].y*zoom)-y, this.stars[star].size, this.stars[star].size);
		}
		_context.restore();
    };
	
	Sky.prototype.reset = function(_terrain){
		var starNum = utilities.getRandomRange(100,200),
			curY = 0,
			curX = 0,
			terrainObj = _terrain;
			
		this.stars = [];
		
		for(var star = 0; star < starNum; star++){
			curY = utilities.getRandomRange(0,600);
			curX = utilities.getRandomRange(0, this.width);
			
			if(curY < terrainObj.y[curX]){
				this.stars.push({x : curX, y :curY, size :1});
			}else{
				star--;
			}
		}
	}
})();