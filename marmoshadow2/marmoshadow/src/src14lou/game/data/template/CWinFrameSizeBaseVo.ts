/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class CWinFrameSizeBaseVo{
       /*字段*/
       public id : number;
       public frameWidth: number;
       public frameHeight: number;
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.frameHeight = data.getUint32();
           this.frameWidth = data.getUint32();
       }
    }
}