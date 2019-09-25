/**
* name 
*/
module game.data.template{
	export class WorldMapSmallHeadConfigBaseVo{
		public id:number;//ID
		public smallhead:number;//小头像id
		public wordmaphead:number;//大地图小头像id
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.smallhead = data.getUint32();
			this.wordmaphead = data.getUint32();
			
		}
	}
}