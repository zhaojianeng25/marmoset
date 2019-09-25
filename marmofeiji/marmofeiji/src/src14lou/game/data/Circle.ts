/**
* name 
*/
module game.data{
	export class Circle{
		public  x:number;
		public  y:number;
		public  radius:number;

		constructor(_x:number, _y:number, _radius:number){
			this.x = _x;
			this.y = _y;
			this.radius = _radius;
		}
	}
}