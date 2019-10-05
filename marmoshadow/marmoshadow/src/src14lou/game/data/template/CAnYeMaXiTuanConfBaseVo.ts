/**
* @Author: LinQiuWen
* @description:x循环任务/x暗夜马戏团任务配置表
*/
module game.data.template{
    export class CAnYeMaXiTuanConfBaseVo{
       /*字段*/
       public id: number;  //
       public nactivetype: number; //活动类型
       public levelgroup: number;  //等级组
       public levelmin: number;    //等级段min
       public levelmax: number;    //等级段max
       public roundgroup: number;  //环数组
       public roundmin: number;    //环数段min
       public roundmax: number;    //环数段max
       public roundrate: number;   //环数段随机概率
       public period: number;  //周期
       public tasktype: number;    //任务类型
       public group: number;   //类型下组ID
       public isrenxing: number;   //是否可任性
       public renxingcost: number; //任性符石消耗
       public normalaward: number; //普通奖励ID
       public extaward: number;    //额外奖励ID
       public specialaward: number;    //特殊情况奖励ID
       public comtips: number; //任务完成后提示ID
       public strtasknameui: string;   //UI任务名称
       public ntaskicon: number;   //UI任务图标ID
       public strtaskdescui: string;   //UI任务描述
       public strtaskname: string; //任务名称
       public strtaskdesc: string; //任务描述
       public vrewardid: Array<number> = [];    //展示道具1,展示道具2,展示道具3,展示道具4,展示道具5,展示道具6
       public strtasktypeicon: string; //任务图标
       public titledes: string;    //任务说明标题下描述
       public followtitle: string; //寻宝名称
       public followtitledes: string;  //寻宝目标
       public dialogdes: string;   //寻宝描述
       public dialogdessuccess: string;    //寻宝成功描述
       public dialogdesfail: string;   //寻宝失败描述
       public followdes: string;   //寻宝追踪描述
       public followdessuccess: string;    //寻宝成功追踪描述
       public followdesfail: string;   //寻宝失败追踪描述
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.nactivetype = data.getUint32();
           this.levelgroup = data.getUint32();
           this.levelmin = data.getUint32();
           this.levelmax = data.getUint32();
           this.roundgroup = data.getUint32();
           this.roundmin = data.getUint32();
           this.roundmax = data.getUint32();
           this.roundrate = data.getUint32();
           this.period = data.getUint32();
           this.tasktype = data.getUint32();
           this.group = data.getUint32();
           this.isrenxing = data.getUint32();
           this.renxingcost = data.getUint32();
           this.normalaward = data.getUint32();
           this.extaward = data.getUint32();
           this.specialaward = data.getUint32();
           this.comtips = data.getUint32();
           this.strtasknameui = data.getUTFBytes(data.getUint32());
           this.ntaskicon = data.getUint32();
           this.strtaskdescui = data.getUTFBytes(data.getUint32());
           this.strtaskname = data.getUTFBytes(data.getUint32());
           this.strtaskdesc = data.getUTFBytes(data.getUint32());
           let length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.vrewardid.push(data.getUint32());
           }
           this.strtasktypeicon = data.getUTFBytes(data.getUint32());
           this.titledes = data.getUTFBytes(data.getUint32());
           this.followtitle = data.getUTFBytes(data.getUint32());
           this.followtitledes =data.getUTFBytes(data.getUint32());
           this.dialogdes = data.getUTFBytes(data.getUint32());
           this.dialogdessuccess = data.getUTFBytes(data.getUint32());
           this.dialogdesfail = data.getUTFBytes(data.getUint32());
           this.followdes = data.getUTFBytes(data.getUint32());
           this.followdessuccess = data.getUTFBytes(data.getUint32());
           this.followdesfail = data.getUTFBytes(data.getUint32());
       }
    }
}