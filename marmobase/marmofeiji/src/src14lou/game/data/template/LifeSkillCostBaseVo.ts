/**
* name 
*/
module game.data.template {
    export class LifeSkillCostBaseVo {
        public id: number; //技能等级
        public needLevelList: Array<number>; //需求等级1,需求等级2,需求等级3,需求等级4,需求等级5
        public silverCostList: Array<number>; //消耗银币1,消耗银币2,消耗银币3,消耗银币4,消耗银币5,消耗银币6,消耗银币7,消耗银币8,消耗银币9,消耗银币10
        public guildContributeCostList: Array<number>; //消耗公会贡献1,消耗公会贡献2,消耗公会贡献3,消耗公会贡献4,消耗公会贡献5,消耗公会贡献6,消耗公会贡献7,消耗公会贡献8,消耗公会贡献9,消耗公会贡献10
        public strengthCostList: Array<number>; //消耗活力1,消耗活力2,消耗活力3,消耗活力4,消耗活力5,消耗活力6,消耗活力7,消耗活力8,消耗活力9,消耗活力10
        public silverCostListType: Array<number>; //消耗类型1,消耗类型2,消耗类型3,消耗类型4,消耗类型5,消耗类型6,消耗类型7,消耗类型8,消耗类型9,消耗类型10
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            let needLevelListLength: number = data.getUint32();
			this.needLevelList = []; 
            for (var index = 0; index < needLevelListLength; index++) {
                this.needLevelList.push(data.getUint32());
            }
            let silverCostListLength: number = data.getUint32();
			this.silverCostList = []; 
            for (var index = 0; index < silverCostListLength; index++) {
                this.silverCostList.push(data.getUint32());
            }
            let guildContributeCostListLength: number = data.getUint32();
			this.guildContributeCostList = []; 
            for (var index = 0; index < guildContributeCostListLength; index++) {
                this.guildContributeCostList.push(data.getUint32());
            }
            let strengthCostListLength: number = data.getUint32();
			this.strengthCostList = []; 
            for (var index = 0; index < strengthCostListLength; index++) {
                this.strengthCostList.push(data.getUint32());
            }
            let silverCostListTypeLength: number = data.getUint32();
			this.silverCostListType = [];
            for (var index = 0; index < silverCostListTypeLength; index++) {
                this.silverCostListType.push(data.getUint32());
            }
        }
    }
}