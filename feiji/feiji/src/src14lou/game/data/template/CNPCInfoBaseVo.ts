//CNPCInfoBaseVo
module game.data.template{
	export class CNPCInfoBaseVo{
		public id:number;//编号
		public npctype:number;//npctype
		public name:string;//名称
        public mapid:number;//所在地图的id
        public hide:number;//是否任务隐藏
        public namecolour:string;//namecolour
        public bordercolour:string;//小地图npc颜色
        public showInMiniMap:number;//小地图显示
        public showinserver:number;//是否点卡服显示
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.npctype = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
            this.mapid = data.getUint32();
            this.hide = data.getUint32();
            this.namecolour = data.getUTFBytes(data.getUint32());
            this.bordercolour = data.getUTFBytes(data.getUint32());
            this.showInMiniMap = data.getUint32();
            this.showinserver = data.getUint32();
         
		}
	}
	
}