
module game.modules.ranKingList.models{
    /** 等级榜查看角色信息的Vo */
    export class RankRoleInfoVo{
        /** 角色id*/
        public roleid:number;//long型数据
        /** 角色名字 */
        public rolename :string;
        /** 角色模型 */
		public shape : number;
        /** 角色等级 */
		public level : number;
        /** 综合战力 */
		public zonghescore : number;
        /** 宠物评分 */
		public petscore : number;
        /** 阵营 */
	    public camp : number;
        /** 职业 */
        public school:number;
        /** 公会名称 */
        public factionname:string;
        /** 排名 */
        public rank;

        constructor(){

        }
        
    }
    
}