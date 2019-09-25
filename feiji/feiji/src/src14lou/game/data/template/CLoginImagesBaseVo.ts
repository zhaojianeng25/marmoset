module game.data.template{
	export class CLoginImagesBaseVo{
		public id:number;//ID
		public imagefilename:string;//图片
		public width:number;//图宽
        public height:number;//图高
        public minlevel:number;//最小等级
        public maxlevel:number;//最大等级
        public mapid:number;//适配地图ID
        public taskid:number;//适配任务
        public weight:number;//权重
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.imagefilename = data.getUTFBytes(data.getUint32());
			this.width = data.getUint32();
            this.height = data.getUint32();
            this.minlevel = data.getUint32();
            this.maxlevel = data.getUint32();
            this.mapid = data.getUint32();
            this.taskid = data.getUint32();
            this.weight = data.getUint32();

		}
	}
	
}