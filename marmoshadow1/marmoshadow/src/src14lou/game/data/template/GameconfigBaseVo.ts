module game.data.template{
    export class GameconfigBaseVo{
        public id:number;
        public key:string;//变量
        public wndname:string;//控件名
        public leixingtype:number;//类型
        public value:number;//默认值
        
      
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.key = data.getUTFBytes(data.getUint32());      
            this.wndname = data.getUTFBytes(data.getUint32());  
            this.leixingtype = data.getUint32();
            this.value = data.getUint32();
        }
    }
}   