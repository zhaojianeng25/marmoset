/**
* name 
*/
module game.data.template {
    export class SchoolSkillitemBaseVo {
        public id: number; //技能id
        public skillname: string; //技能名
        public skillabbrname: string; //技能定位
        public skillsort: number; //排序
        public sType: string; //技能类型
        public paramA: number; //消耗系数a1
        public paramB: number; //消耗系数b1
        public costA: string; //显示消耗1
        public paramC: number; //消耗系数a2
        public paramD: number; //消耗系数b2
        public costB: string; //显示消耗2
        public costTypeA: number; //消耗1属性编号
        public costTypeB: number; //消耗2属性编号
        public normalIcon: number; //图标编号
        public levellimit: Array<number>; //技能等级1,技能等级2,技能等级3,技能等级4,技能等级5,技能等级6,技能等级7" />
        public leveldescribezero: string; //技能升级描述
        public leveldescribe: Array<string>; //技能升级描述1,技能升级描述2,技能升级描述3,技能升级描述4,技能升级描述5,技能升级描述6,技能升级描述7" />
        public skilldescribe: string; //技能描述
        public skilldescribelist: Array<string>; //技能描述1,技能描述2,技能描述3,技能描述4,技能描述5,技能描述6,技能描述7" />
        public targettype: number; //目标类型
        public bCanUseInBattle: number; //战斗内外使用
        public effectid: number; //魔法入口
        public skillScript: string; //技能剧情描述
        public frienddegree: number; //需要好友度
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.skillname = data.getUTFBytes(data.getUint32());
            this.skillabbrname = data.getUTFBytes(data.getUint32());
            this.skillsort = data.getUint32();
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
            let levellimitLength: number = data.getUint32();
            this.levellimit = [];
            for (var index = 0; index < levellimitLength; index++) {
                this.levellimit.push(data.getUint32());
            }
            this.leveldescribezero = data.getUTFBytes(data.getUint32());
            let leveldescribeLength: number = data.getUint32();
            this.leveldescribe = [];
            for (var index = 0; index < leveldescribeLength; index++) {
                this.leveldescribe.push(data.getUTFBytes(data.getUint32()));
            }
            this.skilldescribe = data.getUTFBytes(data.getUint32());
            let skilldescribelistLength: number = data.getUint32();
            this.skilldescribelist = [];
            for (var index = 0; index < skilldescribelistLength; index++) {
                this.skilldescribelist.push(data.getUTFBytes(data.getUint32()));
            }
            this.targettype = data.getUint32();
            this.bCanUseInBattle = data.getUint32();
            this.effectid = data.getUint32();
            this.skillScript = data.getUTFBytes(data.getUint32());
            this.frienddegree = data.getUint32();
        }
    }
}