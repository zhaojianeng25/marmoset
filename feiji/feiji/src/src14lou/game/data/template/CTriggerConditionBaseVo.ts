module game.data.template{
	export class CTriggerConditionBaseVo{
		public id:number;//ID
		public type:number;//触发类型
		public school:number;//需求职业
        public level:number;//需求等级
        public quest:number;//需求任务
        public params:Array<number> =[];//参数1,参数2,参数3,参数4,参数5
        public spot:number;//点亮名胜
        public taskiprgbartimed:number;//进度条时间
        public prgbartext:string;//进度条文字
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
            this.type = data.getUint32();
            this.school = data.getUint32();
            this.level = data.getUint32();
            this.quest = data.getUint32();
          
            let listCount:number = data.getUint32();
			for (var index = 0; index < listCount; index++) {				
				this.params.push(data.getUint32());				
			}  
            this.spot = data.getUint32();
             this.taskiprgbartimed = data.getUint32();
            this.prgbartext = data.getUTFBytes(data.getUint32());
		}
	}
	
}