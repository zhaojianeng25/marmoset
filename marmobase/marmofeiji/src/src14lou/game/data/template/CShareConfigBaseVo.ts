/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class CShareConfigBaseVo {
       /*字段*/
       public id: number;
       public iconWechat : string;
       public titleWechat : string;
       public describWechat : string;
       public iosUrlWechat : string;
       public androidUrlWechat : string;
       public iconMonents : string;
       public titleMonents : string;
       public describMonents : string;
       public iosUrlMonents : string;
       public androidUrlMonents : string;
       public iconWeibo : string;
       public titleWeibo : string;
       public describWeibo : string;
       public iosUrlWeibo : string;
       public androidUrlWeibo : string;
       constructor(){
       }
       public parse(data:Byte){
        this.id = data.getUint32();;
        this.iconWechat = data.getUTFBytes(data.getUint32());
        this.titleWechat = data.getUTFBytes(data.getUint32());
        this.describWechat = data.getUTFBytes(data.getUint32());
        this.iosUrlWechat = data.getUTFBytes(data.getUint32());
        this.androidUrlWechat = data.getUTFBytes(data.getUint32());
        this.iconMonents = data.getUTFBytes(data.getUint32());
        this.titleMonents = data.getUTFBytes(data.getUint32());
        this.describMonents = data.getUTFBytes(data.getUint32());
        this.iosUrlMonents = data.getUTFBytes(data.getUint32());
        this.androidUrlMonents = data.getUTFBytes(data.getUint32());
        this.iconWeibo = data.getUTFBytes(data.getUint32());
        this.titleWeibo = data.getUTFBytes(data.getUint32());
        this.describWeibo = data.getUTFBytes(data.getUint32());
        this.iosUrlWeibo = data.getUTFBytes(data.getUint32());
        this.androidUrlWeibo = data.getUTFBytes(data.getUint32());
       }
    }
}