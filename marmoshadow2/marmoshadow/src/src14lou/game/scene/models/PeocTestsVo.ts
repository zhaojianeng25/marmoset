/**
* 宠物数据
*/
module game.scene.models{
	export class PeocTestsVo{
		/**宠物id*/
		public showpetid:number;
		/**宠物名字*/
		public showpetname:string;
		/**宠物颜色*/
		public  petcoloursndsize:number;
		/**宠物技能效果*/
		public showskilleffect:number;
		/**可携带等级*/
		public evolvelevel:number;
		constructor(){
		}
		public fromByteArray(bytes:ByteArray):void {
			this.showpetid = bytes.readInt32();
			this.showpetname = ByteArrayUtils.readUtf16String(bytes);
			this.petcoloursndsize = bytes.readInt16();
			this.showskilleffect = bytes.readByte();
			this.evolvelevel = bytes.readByte();
		}
	}
}