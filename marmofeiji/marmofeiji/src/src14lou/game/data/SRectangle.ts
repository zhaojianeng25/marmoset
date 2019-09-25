/**
* name 
*/
module game.data{
	export class SRectangle{
		public  centerPoint:point = new point();
		public  centerPostion:point = new point();
		
		private  _x:number;
		public get x():number{
			return this._x;
		}		
		public set x(value:number){
			this._x = value;
			this.update();
		}
		
		
		private _y:number;
		public get y():number{
			return this._y;
		}
		
		public set y(value:number){
			this._y = value;
			this.update();
		}
		
		
		private  _width:number;
		public get width():number{
			return this._width;
		}
		
		public set width(value:number){
			this._width = value;
			this.update();
		}
		
		
		private _height:number;
		public get height():number{
			return this._height;
		}
		
		public set height(value:number){
			this._height = value;
			this.update();
		}
		
		private  _left:number;		
		
		private  _right:number;		
		
		private  _top:number;
		
		private  _bottom:number;

		constructor(__x:number=0,__y:number=0,__width:number=0,__height:number=0){
			this.x = __x;
			this.y = __y;
			this.width = __width;
			this.height = __height;
			this.update();
		}

		private update():void{
			this.centerPoint.x = this.width/2;
			this.centerPoint.y = this.height/2;
			this.centerPostion.x = this.x + this.centerPoint.x;
			this.centerPostion.y = this.y + this.centerPoint.y;
			
			this._left = this._x;
			this._right = this._x + this._width;
			this._top = this._y;
			this._bottom = this._y + this._height;
		}
		
		/**
		 * 设置宽度，将自动更新中心点x
		 */
		public setWidth(newWidth:number):void{
			this.width = newWidth;
			this.update();
		}
		
		/**
		 * 设置高度，将自动更新中心点y
		 */
		public setHeight(newHeight:number):void{
			this.height = newHeight;
			this.update();
		}
		
		
		/**
		 * 指示点是否被包含在矩形区域
		 * px X轴
		 * py Y轴
		 * roundWidening 四周扩宽
		 */
		public contains2(px:number, py:number, roundWidening:number = 0):Boolean{
			return px > (this._left - roundWidening) && 	px < (this._right + roundWidening) &&
					py > (this._top - roundWidening)  && py < (this._bottom + roundWidening);
		}
		
		/**
		 * 指示点是否被包含在矩形区域
		 * px X轴
		 * py Y轴
		 * roundWidening 四周扩宽
		 */
		public contains(px:number, py:number):Boolean{
			return px >= this._left && px < this._right	
				&&  py >= this._top  && py < this._bottom;
		}
		
		/**
		 * 区域碰撞检测 
		 * @param rect 目标区域
		 * @return 
		 * 
		 */		
		public hitTest(rect:Rectangle, exp:number = 0):Boolean{
			if(exp == 0)
				return !(rect.right < this._left || rect.x > this._right || rect.bottom < this._top || rect.y > this._bottom);
			else
				return !(rect.right < this._left-exp || rect.x > this._right+exp || rect.bottom < this._top-exp || rect.y > this._bottom+exp);
		}

		public toString():string{
			return "SRectangle{x:"+this._x +" y:" + this._y +" width:"+this._width+ " height:"+this.height+"}";
		}
	}
}