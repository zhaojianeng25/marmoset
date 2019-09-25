/**
* name 
*/
module game.data.template{
	export class RewardSystemBtnShowBaseVo{
		public id:number;//系统ID
		public systemname:string;//系统名称
		public bshoweffect:number;//提醒特效
		public btnimage:string;//图片
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.systemname = data.getUTFBytes(data.getUint32());
			this.bshoweffect = data.getUint32();
			this.btnimage = data.getUTFBytes(data.getUint32());
		}
	}
}