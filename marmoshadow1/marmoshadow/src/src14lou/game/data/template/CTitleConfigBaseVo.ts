/**
* name 称谓表
*/
module game.data.template{
	export class CTitleConfigBaseVo{
		public id:number;//称谓id
		public titlename:string;//称谓名
		public availtime:number;//有效时间 -1为没有固定的有效时间
		public category:string;//category 客户端显示的第一类分级
		public species:string;//species 客户端显示的第二类分级
		public description:string;//称谓名
		public fontcolor:string;//称谓名
		public gettype:string;//获得方式

		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.titlename = data.getUTFBytes(data.getUint32());
			this.availtime = data.getUint32();
			this.category = data.getUTFBytes(data.getUint32());
			this.species = data.getUTFBytes(data.getUint32());
			this.description = data.getUTFBytes(data.getUint32());
			this.fontcolor = data.getUTFBytes(data.getUint32());
			this.gettype = data.getUTFBytes(data.getUint32());
			
		}
	}
}