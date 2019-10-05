/**
* name 
*/
module game.data.template{
	export class BattleAIConfigBaseVo{
		public id:number;//id
		public talkinfo:string;//说话信息
		public talkshow:number;//说话信息是否显示到聊天框
		public tipsinfo:string;//提示框信息
		public appearchange:number;//改变形象
		public playeffect:string;//播放战场特效
		public playsound:number//播放音乐;
		public changeground:number;//改变战场地图
		public changegroundeffect:number;//改变场景时的渐变特效
		public speak:string;//语音资源名
		public speakshow:number;//语音信息是否显示到聊天框
		public speaktime:string;//语音信息时长
		public effectid:number;//战斗中召唤特效
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.talkinfo = data.getUTFBytes(data.getUint32());
			this.talkshow =data.getUint32();
			this.tipsinfo = data.getUTFBytes(data.getUint32());
			this.appearchange = data.getUint32();
			this.playeffect = data.getUTFBytes(data.getUint32());
			this.playsound = data.getUint32();
			this.changeground = data.getUint32();
			this.changegroundeffect = data.getUint32();
			this.speak = data.getUTFBytes(data.getUint32());
			this.speakshow = data.getUint32();
			this.speaktime = data.getUTFBytes(data.getUint32());
			this.effectid = data.getUint32();
			
		}
	}
}