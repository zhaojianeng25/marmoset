module game.data.template{
	export class CLuaTestBaseVo{
		public id:number;//伙伴id
		public name:string;//伙伴名称
		 public skillid: Array<number> =[];//技能1,技能2,技能3,技能4,技能5,技能6,技能7,技能8
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			let listCount: number = data.getUint32();
            for (var index = 0; index < listCount; index++) {
                this.skillid.push(data.getUint32());
            }
        }
	}
}