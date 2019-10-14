/**
* name 
*/
module game.data.template {
    export class SkillitemBaseVo {
        public id: number; //技能id
        public skillname: string; //技能名
        public sType: string; //技能类型
        public paramA: number; //消耗系数a1  double
        public paramB: number; //消耗系数b1  double
        public costA: string; //显示消耗1
        public paramC: number; //消耗系数a2  double
        public paramD: number; //消耗系数b2  double
        public costB: string; //显示消耗2
        public costTypeA: number; //消耗1属性编号
        public costTypeB: number; //消耗2属性编号
        public normalIcon: number; //图标编号
        public skilldescribe: string; //技能描述
        public targettype: number; //目标类型
        public bCanUseInBattle: number; //战斗内外使用
        public effectid: number; //魔法入口
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
			this.skillname = data.getUTFBytes(data.getUint32()); 
			this.sType = data.getUTFBytes(data.getUint32());
			this.paramA = data.getFloat64(); 
			this.paramB = data.getFloat64();
			this.costA = data.getUTFBytes(data.getUint32());
			this.paramC = data.getFloat64(); 
			this.paramD = data.getFloat64(); 
			this.costB = data.getUTFBytes(data.getUint32());
			this.costTypeA = data.getUint32(); 
			this.costTypeB = data.getUint32(); 
			this.normalIcon = data.getUint32(); 
			this.skilldescribe = data.getUTFBytes(data.getUint32());
			this.targettype = data.getUint32(); 
			this.bCanUseInBattle = data.getUint32(); 
			this.effectid = data.getUint32();
        }
    }
}