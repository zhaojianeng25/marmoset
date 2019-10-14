/**
* name b冰封王座配置表新
*/
module game.data.template{
	export class InstanceCEnChouLuNewConfigBaseVo{
		public id:number;//id
		public minlevel:number;//等级min
		public maxlevel:number;//等级max
		public instzoneid:number;//等级段id
		public levelall:number;//总关卡数
		public state:number;//当前状态
		public Map:number;//所在地图
		public ZuoBiao:string;//跳转坐标
		public FocusNpc:number;//挑战npc
		public Fightid:number;//战斗id
		public JiangyouNpc:string;//服务npc
		public title:string;//关卡描述
		public describe:string;//攻略
		public boss:number;//是否BOSS
		public level:string;//第几关
		public introduce:string;//介绍
		public name:string;//名字
		public posX:number;//x坐标
		public posY:number;//y坐标

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.minlevel = data.getUint32();
			this.maxlevel = data.getUint32();
			this.instzoneid = data.getUint32();
			this.levelall = data.getUint32();
			this.state = data.getUint32();
			this.Map = data.getUint32();
			this.ZuoBiao = data.getUTFBytes(data.getUint32());
			this.FocusNpc = data.getUint32();
			this.Fightid = data.getUint32();
			this.JiangyouNpc = data.getUTFBytes(data.getUint32());
			this.title = data.getUTFBytes(data.getUint32());
			this.describe = data.getUTFBytes(data.getUint32());
			this.boss = data.getUint32();
			this.level = data.getUTFBytes(data.getUint32());
			this.introduce = data.getUTFBytes(data.getUint32());
			this.name = data.getUTFBytes(data.getUint32());
			this.posX = data.getUint32();
			this.posY = data.getUint32();
		}
	}
}