/**
* name 
*/
module game.data{
	export class TrunkPoint extends point{
		/**
		 * 关键点id
		 */
		id:number;
		/**
		 * 下一点的节点数据 
		 */		
		nextPoints:Array<point> = new Array<point>();
		
		/**
		 * 临时变量，距离 
		 */		
		distance:number;
	}
}