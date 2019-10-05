module game.data.template{
    export class TongPingSettingBaseVo{
        public id:number;
        public morevalue:number;//人数多
        public lessvalue:number;//人数一般
             
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.morevalue = data.getUint32();        
            this.lessvalue = data.getUint32();
         
            
        }
    }
}