module game.data.template{
	export class CNpcInAllBaseVo{
		public id:number;//编号
		public name:string;//名称
		public area1colour:number;//造型id
		public area2colour:number;//能否捕捉

		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.area2colour = data.getUint32();
			this.area2colour = data.getUint32();

		}
	}
}