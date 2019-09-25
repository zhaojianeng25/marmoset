/**
* name 
*/
module game.data.template{
	export class StageInfoBaseVo{
		public id:number;//阶段ID
		public stagenum:number;//多结果标示
		public stagetype:number;//阶段类型
		public executetype:number;//执行方式
		public delay:number;//播放延时
		public actiontype:number//动作类型;
		public actionlimittime:number;//动作最长时间
		public movetype:number;//移动类型
		public syncprotect:number;//同步保护
		public targetx:number;//目的x
		public targety:number;//目的y
		public phantomid:number;//残影对象编号
		public phantomalpha:number;//残影对象透明度
		public movetime:number;//移动时间
		public effecttype:number;//特效类型
		public postype:number;//特效位置类型
		public hastrail:number;//有痕迹
		public youfangxiang:number;//有方向
		public effectname:string;//特效名
		public effectlayer:number;//特效图层
		public effectsound:string;//音效
		public resulttype:number;//结果类型
		public resultlimittime:number;//执行结果最长时间
		public resultonhittime:number;//结果受击复位时间
		public teleporttype:number;//瞬移类型
		public teletime:number;//瞬移时间
		public blurtime:number;//保留
		public teleportlimittime:number;//瞬移最长时间
		public x:number;//人物脚底x偏移
        public y:number;//人物脚底y偏移
        public scale:number; //缩放比
		public x0:number;//人物脚底x偏移
        public y0:number;//人物脚底y偏移
        public scale0:number; //缩放比
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			if (this.id == 11000104){
				console.log();
			}
			this.stagenum = data.getUint32();
			this.stagetype =  data.getUint32();
			this.executetype = data.getUint32();
			this.delay = data.getUint32();
			this.actiontype = data.getUint32();
			this.actionlimittime = data.getUint32();
			this.movetype = data.getUint32();
			this.syncprotect = data.getUint32();
			this.targetx = data.getUint32();
			this.targety =   data.getUint32();
			this.phantomid = data.getUint32();
			this.phantomalpha = data.getUint32();
			this.movetime = data.getUint32();
			this.effecttype = data.getUint32();
			this.postype = data.getUint32();
			this.hastrail = data.getUint32();
			this.youfangxiang = data.getUint32();
			this.effectname = data.getUTFBytes(data.getUint32());
			this.effectlayer = data.getUint32();
			this.effectsound = data.getUTFBytes(data.getUint32());
			this.resulttype = data.getUint32();
			this.resultlimittime = data.getUint32();
			this.resultonhittime = data.getUint32();
			this.teleporttype = data.getUint32();
			this.teletime = data.getUint32();
			this.blurtime = data.getUint32();
			this.teleportlimittime = data.getUint32();
			this.x = data.getInt32();
            this.y = data.getInt32();
            this.scale = data.getFloat64();
			this.x0 = data.getInt32();
            this.y0 = data.getInt32();
            this.scale0 = data.getFloat64();
		}
	}
}