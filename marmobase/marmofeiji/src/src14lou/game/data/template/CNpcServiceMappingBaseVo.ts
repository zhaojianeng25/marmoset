//CNpcServiceMappingBaseVo
module game.data.template{
	export class CNpcServiceMappingBaseVo{
		public id:number;//NPC服务ID
		public type:number;//服务类型
		public param1:number;//服务类型1
        public param2:number;//服务类型2
        public param3:number;//服务类型3
        public param4:number;//服务类型4
        public param5:number;//服务类型5
        public param6:number;//服务类型6
        public param7:number;//服务类型7
        public param8:number;//服务类型8
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.type = data.getUint32();
			this.param1 = data.getUint32();
            this.param2 = data.getUint32();
            this.param3 = data.getUint32();
            this.param4 = data.getUint32();
            this.param5 = data.getUint32();
            this.param6 = data.getUint32();
            this.param7 = data.getUint32();
            this.param8 = data.getUint32();
		}
	}
	
}