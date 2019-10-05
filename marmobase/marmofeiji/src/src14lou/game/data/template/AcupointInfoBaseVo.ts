/**
* @Author: LinQiuWen
* @description:j技能格系统/技能格信息表
*/
module game.data.template{
    export class AcupointInfoBaseVo{
       /*字段*/
       public id: number;  // 技能格ID
       public isMain: number;     //是否主技能格
       public name: string;    //技能格名称
       public isJueJi: number;    //是否绝技
       public maxlevel: number;    //可学等级上限
       public details: string;     //技能格文案包装
       public describe: string;    //技能格描述
       public iconNormal: string;  //技能格图标正常
       public iconPushed: string;  //技能格图标按下
       public iconHover: string;   //技能格图标悬浮
       public iconDisable: string; //技能格图标不可用
       public locX: number;    //技能格位置x
       public locY: number;    //技能位置Y
       public femalelocX: number;  //女技能格位置x
       public femalelocY: number;  //女技能格位置y
       public lvlocX: number; //技能格等级位置x
       public lvlocY: number;  //技能格等级位置y
       public femalelvlocX: number;    //女技能格等级位置x
       public femalelvlocY: number;    //女技能格等级位置y
       public attribute: number;   //技能格附加属性类型
       public paraA: number;   //技能格附加属性公式系数a
       public paraB: number;   //技能格附加属性公式系数b
       public paraC: number;   //技能格附加属性公式系数c
       public dependAcupoint: string; //依赖技能格ID
       public dependLevel: number; //依赖技能格等级要求
       public pointToSkillList: Array<number> = [];    //影响技能ID1,影响技能ID2,影响技能ID3,影响技能ID4,影响技能ID5
       public studyCostRule: number;   //技能格学习消耗规则
       public juejiDependLevel: string;    //绝技依赖技能格等级要求

       constructor(){
       }
       public parse(data:Byte){
            this.id = data.getUint32();
            this.isMain = data.getByte()
            this.name = data.getUTFBytes(data.getUint32());
            this.isJueJi = data.getByte();
            this.maxlevel = data.getUint32();
            this.details = data.getUTFBytes(data.getUint32());
            this.describe = data.getUTFBytes(data.getUint32());
            this.iconNormal = data.getUTFBytes(data.getUint32());
            this.iconPushed = data.getUTFBytes(data.getUint32());
            this.iconHover = data.getUTFBytes(data.getUint32());
            this.iconDisable = data.getUTFBytes(data.getUint32());
            this.locX = data.getUint32();
            this.locY = data.getUint32();
            this.femalelocX = data.getUint32();
            this.femalelocY = data.getUint32();
            this.lvlocX = data.getUint32();
            this.lvlocY = data.getUint32();
            this.femalelvlocX = data.getUint32();
            this.femalelvlocY = data.getUint32();
            this.attribute = data.getUint32();
            this.paraA = data.getFloat64();
            this.paraB = data.getFloat64();
            this.paraC = data.getFloat64();
            this.dependAcupoint = data.getUTFBytes(data.getUint32());
            this.dependLevel = data.getUint32();

            let pointToSkillListLenth = data.getUint32();
            for (var index = 0; index < pointToSkillListLenth;index++) {
                this.pointToSkillList.push(data.getUint32());
            }
            this.studyCostRule = data.getUint32();
            this.juejiDependLevel = data.getUTFBytes(data.getUint32());
       }
    }
}