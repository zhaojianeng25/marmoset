module game.data.template{
	export class CExitgameBaseVo{
		public id:number;//ID
		public exp:number;//升级经验
		public levela:number;//等级下限
        public levelb:number;//等级上限
        public area:string;//挂机区
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
            this.exp = data.getUint32();
            this.levela = data.getUint32();
            this.levelb = data.getUint32();
			this.area = data.getUTFBytes(data.getUint32());
			
		}
	}
	
}