
module game.modules.ranKingList.models{
    /** 玩家自己在排行榜上的相关信息的Vo */
    export class MyRankInfoVo{
        /** 排行榜类型 */
        public ranktype:number;
        /** 玩家自己的排名 */
        public myrank:number;
        /** 阵营独有 显示帮派名字 */
        public myTitle:string;
        /** 是否可以领取奖励 */
        public takeAwardFlag:number;//1=可以领取奖励  0=不可以领取奖励或已经领取过奖励了
        /** 扩展数据 */
        public extdata:number;//玩家自己在排行榜处的评分
        /** 扩展数据 */
        public extdata1:number;//long型数据，放时间的
        /** 扩展数据 */
        public extdata2:number;//float型数据，放进度的
        /** 扩展数据 */
        public extdata3:string;//放玩家所在帮派某些信息
    }
}