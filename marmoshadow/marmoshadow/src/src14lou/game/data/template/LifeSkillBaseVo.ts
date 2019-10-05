/**
* name 
*/
module game.data.template {
    export class LifeSkillBaseVo {
        public id: number; //技能编号
        public name: string; //技能名称
        public paixuID: number; //排序编号
        public icon: number; //图标编号
        public skillType: number; //技能类型
        public fumoItemID: number; //附魔产出道具
        public needGuild: number; //是否需要公会
        public skillLevelMax: number; //技能最高上限
        public studyLevelRule: number; //学习需求等级规则
        public studyCostRule: number; //学习消耗规则
        public strengthCostRule: number; //活力消耗规则
        public upgradeDesc: string; //提升属性说明1
        public upgradeVariable: number; //提升属性系数1
        public upgradeDesc2: string; //提升属性说明2
        public upgradeVariable2: number; //提升属性系数2
        public upgradeDesc3: string; //提升属性说明3
        public upgradeVariable3: number; //提升属性系数3
        public upgradeDesc4: string; //提升属性说明4
        public upgradeVariable4: number; //提升属性系数4
        public skillId: number; //关联被动技能
        public bCanStudy: number; //是否在技能学习人处显示
        public guidetips: string; //生产引导提示	
        public description: string; //描述
        public brief: string; //技能简介
        public effect: string; //下一级效果
        public effectnow: string; //当前级别效果
        public ParaNum: number; //参数个数	
        public ParaIndexList: Array<number>; //参数1对应列,参数2对应列,参数3对应列
        public bNeedSkilled: number; //是否需要熟练度2			
        public gangdescription: string; //公会界面描述
        public cureffect1: string; //专精当前效果1
        public cureffect2: string; //专精当前效果2
        public cureffect3: string; //专精当前效果3
        public cureffect4: string; //专精当前效果4
        public curid1: string; //属性id1
        public curid2: string; //属性id2
        public curid3: string; //属性id3
        public curid4: string; //属性id4
        public openlevel: number; //技能开启等级
        constructor() {

        }
        public parse(data: Byte) {
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.paixuID = data.getUint32(); 
			this.icon = data.getUint32();
			this.skillType = data.getUint32(); 
			this.fumoItemID = data.getUint32(); 
			this.needGuild = data.getUint32(); 
			this.skillLevelMax = data.getUint32(); 
			this.studyLevelRule = data.getUint32(); 
			this.studyCostRule = data.getUint32(); 
			this.strengthCostRule = data.getUint32(); 
			this.upgradeDesc = data.getUTFBytes(data.getUint32());
			this.upgradeVariable = data.getUint32(); 
			this.upgradeDesc2 = data.getUTFBytes(data.getUint32());
			this.upgradeVariable2 = data.getUint32(); 
			this.upgradeDesc3 = data.getUTFBytes(data.getUint32());
			this.upgradeVariable3 = data.getUint32(); 
			this.upgradeDesc4 = data.getUTFBytes(data.getUint32());
			this.upgradeVariable4 = data.getUint32(); 
			this.skillId = data.getUint32(); 
			this.bCanStudy = data.getUint32(); 
			this.guidetips = data.getUTFBytes(data.getUint32());
            this.description = data.getUTFBytes(data.getUint32());
			this.brief = data.getUTFBytes(data.getUint32());
			this.effect = data.getUTFBytes(data.getUint32());
			this.effectnow = data.getUTFBytes(data.getUint32());
			this.ParaNum = data.getUint32(); 
            let ParaIndexListLength: number = data.getUint32();
			this.ParaIndexList = []; 
			for (var index = 0; index < ParaIndexListLength; index++) {
				this.ParaIndexList.push(data.getUint32());
			}
			this.bNeedSkilled = data.getUint32(); 		
			this.gangdescription = data.getUTFBytes(data.getUint32());
			this.cureffect1 = data.getUTFBytes(data.getUint32());
			this.cureffect2 = data.getUTFBytes(data.getUint32());
			this.cureffect3 = data.getUTFBytes(data.getUint32());
			this.cureffect4 = data.getUTFBytes(data.getUint32());
			this.curid1 = data.getUTFBytes(data.getUint32());
			this.curid2 = data.getUTFBytes(data.getUint32());
			this.curid3 = data.getUTFBytes(data.getUint32());
			this.curid4 = data.getUTFBytes(data.getUint32());
			this.openlevel = data.getUint32(); 
        }
    }
}