/**
* @Author: LinQiuWen
* @description:
*/

module game.data.template{
    export class ThreePvpWhiteMenuBaseVo{
       /*字段*/
       public id: string;
       public sid: string; //sid
       public username: string;    
       public roleid: string;
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUTFBytes(data.getUint32());
           this.sid = data.getUTFBytes(data.getUint32());
           this.username = data.getUTFBytes(data.getUint32());
           this.roleid = data.getUTFBytes(data.getUint32());
       }
    }
}