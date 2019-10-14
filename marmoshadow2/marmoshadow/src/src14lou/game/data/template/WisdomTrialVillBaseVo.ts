/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class WisdomTrialVillBaseVo{
       /*字段*/
       public id: number;  //序号
       public name: string;    //题目
       public optioins: Array<string> = [];    //选项1,选项2,选项3,选项4
       public jinglingid: number;  //精灵id

       constructor(){
       }

       public parse(data:Byte){
           this.id = data.getUint32();
           this.name = data.getUTFBytes(data.getUint32());
           let length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.optioins.push(data.getUTFBytes(data.getUint32()));
           }
           this.jinglingid = data.getUint32();
       }
    }
}