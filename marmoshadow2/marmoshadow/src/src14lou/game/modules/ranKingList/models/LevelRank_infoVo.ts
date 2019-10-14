
module game.modules.ranKingList.models{
    /** 等级排行榜的Vo */
    export class LevelRank_infoVo{
        /** roleid  角色id */
        public roleid:number;//long型数据
        /** 名字 */
        public nickname:string; 
        /** 角色等级 */
		public level:number;
        /** 角色职业id */
		public school:number;
        /** 排名 */
		public rank:number;

        constructor(){

        }
        public fromByteArray(bytes:ByteArray):void {
			this.roleid = bytes.readLong();
            this.nickname = ByteArrayUtils.readUtf16String(bytes);
            this.level = bytes.readInt32();
            this.school = bytes.readInt32();
            this.rank = bytes.readInt32();
	    }
    }
    
}