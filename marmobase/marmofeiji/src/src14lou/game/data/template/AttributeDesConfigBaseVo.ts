/**
* name 
*/
module game.data.template {
	export class AttributeDesConfigBaseVo {
		public id: number; //属性id
		public name: string; //属性名 
		public numid: number; //数值型效果id
		public roleattribute: string; //人物属性面板描述 
		public numbasevalue: string; //基础属性描述 
		public numpositivedes: string; //正值描述1 
		public numnegativedes: string; //负值描述1
		public percentid: number; //百分比型效果id
		public percentpositivedes: string; //正值描述2 
		public percentnegativedes: string; //负值描述2 
		constructor() {

		}
		public parse(data: Byte) {
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.numid = data.getUint32();
			this.roleattribute = data.getUTFBytes(data.getUint32());
			this.numbasevalue = data.getUTFBytes(data.getUint32());
			this.numpositivedes = data.getUTFBytes(data.getUint32());
			this.numnegativedes = data.getUTFBytes(data.getUint32());
			this.percentid = data.getUint32();
			this.percentpositivedes = data.getUTFBytes(data.getUint32());
			this.percentnegativedes = data.getUTFBytes(data.getUint32());
		}
	}
}