/*
* name;
*/
module game.data{
   export class Teleport{
       /**
		 * 来源坐标 X,Y
		 */		
		public srcPortX:number;
		public srcPortY:number;
		/**
		 * 目的地图id
		 */
		public dstMapid:number;
		/**
		 * 目的坐标X,Y
		 */
		public dstPortX:number;
		public dstPortY:number;
		/**
		 * 传送点名称 
		 */		
		public name:String;
		/**
		 * 模板id 
		 */		
		public tempId:number;

        constructor(){

        }
    }
}