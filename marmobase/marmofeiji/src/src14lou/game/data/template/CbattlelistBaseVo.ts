/**
* name z战斗信息表-复合/z战斗信息表_1xxx,z战斗信息表-复合/z战斗信息表_剧情_8xxx,z战斗信息表-复合/z战斗信息表_练功区特殊_9xxx
*/
module game.data.template{
	export class CbattlelistBaseVo{
		public id:number;//ID
		public positionsid:number;//站位配置ID
		

		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.positionsid = data.getUint32();
		}
	}
}