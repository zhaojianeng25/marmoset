
module game.modules.ranKingList.models{
    /** 5v5竞技场排行榜的Vo */
    export class PvP5RankData_infoVo{
        /** 排名 */
        public rank:number;
        /** 角色ID */
        public roleid:number;//long型数据
        /*** 角色名字 */
        public rolename:string;
        /** 积分 */
        public score:number;
        /** 职业 */
        public school:number;

        constructor(){

        }
        public fromByteArray(bytes:ByteArray):void {
			this.rank = bytes.readInt32();
            this.roleid = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.score = bytes.readInt32();
            this.school = bytes.readInt32();
	    }
    }
    
}
