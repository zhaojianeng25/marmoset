/**
* name 
*/
module game.data{
	export class point{
		public x:number;
		public y:number;

		constructor(__x:number = 0, __y:number = 0){
			this.x = __x;
			this.y = __y;
		}

		/**
		 * 比较两个点是否相同的x,y 
		 * @param ept 需要比较的点
		 * @return 
		 * 
		 */		
		public equals(ept:point):Boolean{
			return !(ept.x != this.x || ept.y != this.y);
		}
		
		public toString():String{
			return "x=" + this.x + ",y="+this.y;
		}
	}
}