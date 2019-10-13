/**
* name  t特效路径表_非剧情
*/
module game.data.template{
	export class CEffectPathNoneDramaBaseVo{
		public id:number;//ID
		public Path:string;//特效路径	
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.Path = data.getUTFBytes(data.getUint32());
		}
	}
}