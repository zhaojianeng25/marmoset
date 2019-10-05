/**
* @Author: LinQiuWen
* @description:F服务器经验限制表
*/
module game.data.template{
    export class ServiceExpConfigBaseVo{
       /*字段*/
       public id: number;
       public midlevel: number;    //受限类型等级
       public bili: number;    //受限制比例
  
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.midlevel = data.getInt32();
           this.bili = data.getFloat64();
       }
    }
}