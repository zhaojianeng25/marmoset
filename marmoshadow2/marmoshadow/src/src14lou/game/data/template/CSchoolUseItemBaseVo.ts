/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class CSchoolUseItemBaseVo{
            /*字段*/
            public id: number;  //使用道具类id
            public nuseitemgroup: number;   //使用道具组
            public nschoolid: number;   //职业
            public nlvmin: number;  //等级段min
            public nlvmax: number;  //等级段max
            public nmapid: number;  //地图id
            public nposx: number;   //x坐标
            public nposy: number;   //y坐标
            public ndis: number;    //偏移范围
            public nrand: number;   //是否随机坐标
            public nitemid: number; //道具id

       constructor(){
       }
       public parse(data:Byte){
            this.id = data.getUint32(); 
            this.nuseitemgroup = data.getUint32();
            this.nschoolid = data.getUint32();
            this.nlvmin= data.getUint32();
            this.nlvmax = data.getUint32();
            this.nmapid = data.getUint32();
            this.nposx = data.getUint32();
            this.nposy = data.getUint32();
            this.ndis = data.getUint32();
            this.nrand = data.getUint32();
            this.nitemid = data.getUint32();
       }
    }
}