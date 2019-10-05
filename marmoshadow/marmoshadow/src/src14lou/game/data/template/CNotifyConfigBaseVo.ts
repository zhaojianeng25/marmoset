/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class CNotifyConfigBaseVo{
       public id : number;

       public text: string;    //描述

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.text = data.getUTFBytes(data.getUint32());
       }
    }
}