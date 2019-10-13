/**
* name 
*/
module game.data.template{
	export class BattleBackGroundBaseVo{
		public id:number;//id
		public path:string;//战斗底图
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.path = data.getUTFBytes(data.getUint32());
		  
		}
	}
}