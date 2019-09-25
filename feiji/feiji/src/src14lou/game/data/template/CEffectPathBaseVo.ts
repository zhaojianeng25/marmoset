/**
* name  t特效路径表
*/
module game.data.template{
	export class CEffectPathBaseVo{
		public id:number;//ID
		public Name:string;//特效名	
     	public Patn:string; //特效路径
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.Name = data.getUTFBytes(data.getUint32());
			this.Patn = data.getUTFBytes(data.getUint32());
		}
	}
}