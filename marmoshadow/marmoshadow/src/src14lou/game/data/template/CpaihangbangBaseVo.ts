/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class CpaihangbangBaseVo{
       /*字段*/
       public id: number;
       public name1: string; //名称1
       public kuandu1: number; //宽度1
       public name2: string;   //名称2
       public kuandu2: number; //宽度2
       public name3: string;   //名称3
       public kuandu3: number; //宽度3
        public name4: string;   //名称4
       public kuandu4: number; //宽度4
        public name5: string;   //名称5
       public kuandu5: number; //宽度5
        public name6: string;   //名称6    
       public kuandu6: number; //宽度6
       public lingjiang: number;   //奖励
       public leixing: string; //类型

       constructor(){

       }
       public parse(data:Byte){
        this.id = data.getUint32();

        this.name1 = data.getUTFBytes(data.getUint32());
        this.kuandu1 = data.getFloat64();

                this.name2 = data.getUTFBytes(data.getUint32());
        this.kuandu2 = data.getFloat64();

                this.name3 = data.getUTFBytes(data.getUint32());
        this.kuandu3 = data.getFloat64();

                this.name4 = data.getUTFBytes(data.getUint32());
        this.kuandu4 = data.getFloat64();

                this.name5 = data.getUTFBytes(data.getUint32());
        this.kuandu5 = data.getFloat64();

                this.name6 = data.getUTFBytes(data.getUint32());
        this.kuandu6 = data.getFloat64();
        

        this.lingjiang = data.getUint32();
        this.leixing = data.getUTFBytes(data.getUint32());
       }
    }
}