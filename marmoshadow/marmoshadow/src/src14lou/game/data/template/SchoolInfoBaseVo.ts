/**
* @Author: LinQiuWen
* @description:z职业配置表
*/
module game.data.template{
    export class SchoolInfoBaseVo{
       public id: number;   //id
       public name: string;  //名字
       public englishName: string;  //英文名称
       public describe: string; //描述
       public schoolicon: string;   //职业图标
       public schoolback: string;   //职业背景
       public schoolmapid: number;  //出生地图id
       public schooljobmapid: number; //职业地图id
       public scheme: string;   //推荐加点1
       public explain: string;  //加点1说明
       public addpoint: Array<number> = [];     //推荐体1,推荐智1,推荐力1,推荐耐1,推荐敏1
       public scheme2: string;  //推荐加点2
       public explain2: string; //加点2说明
       public addpoint2: Array<number> = []; //推荐体2,推荐智2,推荐力2,推荐耐2,推荐敏2
       public scheme3: string;  //加点3说明
       public explain3: string; //加点3说明
       public addpoint3: Array<number> = []; //推荐体3,推荐智3,推荐力3,推荐耐3,推荐敏3
       public schooliconpath: string;   //职业图标路径
       public jobtype: number;  //类型
       public normalbtnimage: string; //普通态职业
       public pushbtnimage: string; //按下态职业
       public schoolpicpath: string; // 战斗职业

       constructor(){

       }

       public parse(data:Byte){
           this.id = data.getUint32();
           this.name = data.getUTFBytes(data.getUint32());
           this.englishName = data.getUTFBytes(data.getUint32());
           this.describe = data.getUTFBytes(data.getUint32());
           this.schoolicon = data.getUTFBytes(data.getUint32());
           this.schoolback = data.getUTFBytes(data.getUint32());
           this.schoolmapid = data.getUint32();
           this.schooljobmapid = data.getUint32();
           this.scheme = data.getUTFBytes(data.getUint32());
           this.explain = data.getUTFBytes(data.getUint32());
           let addpointLength = data.getUint32();
           
           for (var index = 0; index < addpointLength;index++) {
               this.addpoint.push(data.getUint32());
           }
           this.scheme2 = data.getUTFBytes(data.getUint32());
           this.explain2 = data.getUTFBytes(data.getUint32());
           let addpoint2Length = data.getUint32();
           for (var index = 0; index < addpoint2Length;index++) {
               this.addpoint2.push(data.getUint32());
           }
           this.scheme3 = data.getUTFBytes(data.getUint32());
           this.explain3 = data.getUTFBytes(data.getUint32());
           let addpoint3Length = data.getUint32();
           for (var index = 0; index < addpoint3Length;index++) {
               this.addpoint3.push(data.getUint32());
           }
           this.schooliconpath = data.getUTFBytes(data.getUint32());
           this.jobtype = data.getUint32();
           this.normalbtnimage = data.getUTFBytes(data.getUint32());
           this.pushbtnimage = data.getUTFBytes(data.getUint32());
           this.schoolpicpath = data.getUTFBytes(data.getUint32());
       }
    }
}