module game.data.template{
	export class CAwardConfigBaseVo{
		public id:number;//编号
		public money:string;//银币奖励
		public awardGroupId:number;//奖励ID
        public awardId:string;//道具
        public noticeAwardId:string;//公告物品ID
        public noticeId:number;//公告提示编号
        public propertyNoticeId:number;//获得道具自己系统提示
        public silverNoticeId:number;//获得银币自己系统提示
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.money = data.getUTFBytes(data.getUint32());
			this.awardGroupId = data.getUint32();
            this.awardId = data.getUTFBytes(data.getUint32());
            this.noticeAwardId = data.getUTFBytes(data.getUint32());
            this.noticeId = data.getUint32();
            this.propertyNoticeId = data.getUint32();
            this.silverNoticeId = data.getUint32();
		}
	}
	
}