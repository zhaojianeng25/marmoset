/**
* name  x巡游配置/x巡游路径子地图表
*/
module game.data.template{
	export class CAutoMovePathPointBaseVo{
		public id:number;//巡游路径ID
		public ridename:string;//巡游坐骑	
		public effectname:string;//绑定特效	
		public cameraz:number;//摄像机高度	
		public speed:number;//巡游速度	
		public paths:number;//场景ID	
		public pointcount:number;//路点总数	
		public points:Array<string> = [];//寻路点1,寻路点2,寻路点3,寻路点4,寻路点5,寻路点6,寻路点7,寻路点8,寻路点9,寻路点10,寻路点11,寻路点12,寻路点13,寻路点14,寻路点15,寻路点16,寻路点17,寻路点18,寻路点19,寻路点20	
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.ridename = data.getUTFBytes(data.getUint32());
			this.effectname = data.getUTFBytes(data.getUint32());
			this.cameraz = data.getUint32();
			this.speed = data.getUint32();
			this.paths = data.getUint32();
			this.pointcount = data.getUint32();
			let listCount:number = data.getUint32();
			for (var index = 0; index < listCount; index++) {		
				this.points.push(data.getUTFBytes(data.getUint32()))		
				// console.log(data.getUTFBytes(data.getUint32()));				
			}
		}
	}
}