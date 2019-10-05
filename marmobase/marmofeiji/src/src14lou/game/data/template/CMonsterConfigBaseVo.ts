
module game.data.template{
	export class CMonsterConfigBaseVo{
		public id:number;//编号
		public name:string;//名称
		public title:string;//称谓
		public modelID:number;//造型id
		public becatch:number;//能否捕捉
		public showhpbar:number;//显示血量
		public showhpbarbig:number;//显示大血量
        public showlevel:number;//显示等级
        public npctype:number;//类型
        public bodytype:number;//大小比例
        public area1colour:number;//area1colour
        public area2colour:number;//area2colour
        public petid:number;//对应宠物
        public school:number;//职业
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.title = data.getUTFBytes(data.getUint32());
			this.modelID = data.getUint32();
			this.becatch = data.getUint32();
            this.showhpbar = data.getUint32();
            this.showhpbarbig = data.getUint32();
            this.showlevel = data.getUint32();
            this.npctype = data.getUint32();
            this.bodytype = data.getFloat64();
            this.area1colour = data.getUint32();
            this.area2colour = data.getUint32();
            this.petid = data.getUint32();
            this.school = data.getUint32();
		}
	}
}