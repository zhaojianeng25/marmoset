
module game.modules.ranKingList.models{
    /** 综合评分榜查看角色信息的Vo */
    export class ZongHePingFenVo{
        /** 角色id */
        public roleid:number;
        /** 角色名字 */
        public rolename :string;
        /** 角色等级 */
		public level : number;
        /** 角色模型 */
		public shape : number;
        /**  总评分 */
		public totalscore : number;
        /**  人物评分 */
		public rolescore : number;
        /**  宠物评分 */
	    public manypetscore : number;

        constructor(){

        }
        
    }
    
}