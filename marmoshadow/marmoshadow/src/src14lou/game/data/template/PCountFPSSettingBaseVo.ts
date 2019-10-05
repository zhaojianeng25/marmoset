module game.data.template{
    export class PCountFPSSettingBaseVo{
        public id:number;
        public minfps:number;//帧率min
        public maxfps:number;//帧率max
        public playercount:number;  //对应人数
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.minfps = data.getUint32();        
            this.maxfps = data.getUint32();
            this.playercount = data.getUint32();
            
        }
    }
}   