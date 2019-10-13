module game.data.template{
	export class CSceneNPCConfigBaseVo{
		public id:number;//id
        public baseid:number //NPCID
		public mapid:number;//map
		public posx:number;//posx
		public posy:number;//posy
		public dir:number;//方向
		public talkinterval:number;//定时循环时间间隔
		public talkintervalsays:string;//定时循环泡泡内容
        public talkdistance:number;//与玩家距离值
        public talkdistancesays:string;//与玩家距离泡泡内容
        public talkcharnum:number;//周围玩家的数量值
        public talkcharnumsays:string;//周围玩家数量泡泡内容
        public pacing:number;//是否内短距离巡逻
        public movespeed:number;//巡逻移动速度
        public mask:number;//遮罩上层
        public transparent:number;//半透明
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.baseid = data.getUint32();
			this.mapid = data.getUint32();
			this.posx = data.getUint32();
			this.posy = data.getUint32();
            this.dir = data.getUint32();
            this.talkinterval = data.getUint32();
            this.talkintervalsays = data.getUTFBytes(data.getUint32());
            this.talkdistance = data.getUint32();
            this.talkdistancesays = data.getUTFBytes(data.getUint32());
            this.talkcharnum = data.getUint32();
            this.talkcharnumsays = data.getUTFBytes(data.getUint32());
            this.pacing = data.getUint32();
            this.movespeed = data.getUint32();
            this.mask = data.getUint32();
            this.transparent = data.getUint32();
		}
	}
}