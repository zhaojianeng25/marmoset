/**
* name 
*/
module game.data.template{
	export class MapConfigBaseVo{
		public id:number;//id
		public mapName:string;//名字
		public mapIcon:string;//地图图标
		public desc:string;//描述
		public resdir:string;//资源目录
		public battleground:number//战斗底图;
		public width:number;//宽度
		public height:number;//高度
		public safemap:number;//是否安全区
		public xjPos:number;//默认x
		public yjPos:number;//默认y
		public qinggong:number;//是否可无视阻挡
		public bShowInWorld:number;//是否显示在世界地图上
		public LevelLimitMin:number;//等级限制下限
		public LevelLimitMax:number;//等级限制上限
		public fightinfor:number;//战斗区域描述
		public playerPosX:number;//玩家所在世界地图位置左上角X坐标
		public playerPosY:number;//玩家所在世界地图位置左上角Y坐标
		public dynamic:number;//是否副本
		public fubenType:number;//副本类型
		public music:string;//音效
		public flyPosX:number;//飞行符传送x坐标
		public flyPosY:number;//飞行符传送y坐标
		public sceneColor:string;//场景颜色
		public jumpmappoint:number;//是否读取传送点文件
		public isMemVisible:number;//是否隐藏队员
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.mapName = data.getUTFBytes(data.getUint32());
			this.mapIcon = data.getUTFBytes(data.getUint32());
			this.desc = data.getUTFBytes(data.getUint32());
			this.resdir = data.getUTFBytes(data.getUint32());
			this.battleground = data.getUint32();
			this.width = data.getUint32();
			this.height = data.getUint32();
			this.safemap = data.getUint32();
			this.xjPos = data.getUint32();
			this.yjPos = data.getUint32();
			this.qinggong = data.getUint32();
			this.bShowInWorld = data.getByte();
			this.LevelLimitMin = data.getInt32();
			this.LevelLimitMax = data.getInt32();
			this.fightinfor = data.getUint32();
			this.playerPosX = data.getUint32();
			this.playerPosY = data.getUint32();
			this.dynamic = data.getUint32();
			this.fubenType = data.getUint32();
			this.music = data.getUTFBytes(data.getUint32());
			this.flyPosX = data.getUint32();
			this.flyPosY = data.getUint32();
			this.sceneColor = data.getUTFBytes(data.getUint32());
			this.jumpmappoint = data.getUint32();
			this.isMemVisible = data.getUint32();
			
		}
	}
}