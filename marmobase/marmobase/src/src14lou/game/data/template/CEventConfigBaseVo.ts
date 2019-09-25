module game.data.template{
	export class CEventConfigBaseVo{
		public id:number;//事件ID
		public name:string;//名称
		public iconId:number;//图标
        public type:number;//类型
        public enermyId:number;//事件刷怪组ID
        public battleId:number;//战斗ID
        public battleAward:string;//战斗奖励
        public skillId:number;//技能ID
        public personalNoticeId:number;//自己系统提示
        public noticeId:number;//全服通告提示
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.iconId = data.getUint32();
            this.type = data.getUint32();
            this.enermyId = data.getUint32();
            this.battleId = data.getUint32();
            this.battleAward = data.getUTFBytes(data.getUint32());
            this.skillId = data.getUint32();
            this.personalNoticeId = data.getUint32();
            this.noticeId = data.getUint32();
		}
	}
	
}