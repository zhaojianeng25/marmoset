
module game.modules.ranKingList.models{
    /** 冰封王座副本排行榜的Vo */
    export class BingFengRank_infoVo{
        /** 职业 */
        public shool :number;
        /** 排名 */
        public rank :number;
        /** roleid 角色id */
        public roleid :number;//long型数据
        /** 玩家的名字 */
        public roleName :string;
        /** 关数 */
        public stage :number;
        /** 耗时 */
        public times :number;

        constructor(){

        }
        public fromByteArray(bytes:ByteArray):void {
			this.shool = bytes.readInt32();
            this.rank = bytes.readInt32();
            this.roleid = bytes.readLong();
            this.roleName = ByteArrayUtils.readUtf16String(bytes);
            this.stage = bytes.readInt32();
            this.times = bytes.readInt32();
	    }
    }
    
}
