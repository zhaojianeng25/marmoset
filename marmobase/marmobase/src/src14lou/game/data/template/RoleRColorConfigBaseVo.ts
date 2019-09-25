/**
* name 
*/
module game.data.template{
	export class RoleRColorConfigBaseVo{
		public id:number;//
		public rolepos:number;//部位
		public modeltype:number;//方案
		public res:number;//美术资源
		public itemcode:number;//道具1
		public colorlist:Array<string> = [];
		public itemnum:number;//数量1
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.rolepos = data.getUint32();
			this.modeltype = data.getUint32();
			this.res = data.getUint32();
			this.itemcode = data.getUint32();
			let listCount:number = data.getUint32();
			for (var index = 0; index < listCount; index++) {				
				//console.log(data.getUTFBytes(data.getUint32()));
				this.colorlist.push(data.getUTFBytes(data.getUint32()));
			}
			this.itemnum = data.getUint32();
		}
	}
}