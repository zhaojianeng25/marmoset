module game.data.template{
    export class TuiSongSettingBaseVo{
        public id:number;
        public name:string;//活动名称
        public day:string;//周期
        public time:string;//时间
        public pcount:string;//人数
       
      
             
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());        
            this.day = data.getUTFBytes(data.getUint32());    
            this.time = data.getUTFBytes(data.getUint32());        
            this.pcount = data.getUTFBytes(data.getUint32());    
        }
    }
}