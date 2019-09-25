
module game.modules.ranKingList.models{
    /** 职业榜的Vo */
    export class RoleProfessionRankRecord_infoVo{
        /** 排名 */
        public rank:number;
        /** 角色ID */
        public roleid:number;//long型数据
        /** 人物名称 */
        public rolename:string;
        /** 职业（门派） */
        public school:number;
        /** 总评分 */
        public score:number;
        /** 公会名字 */
        public faction:string;
        /** 等级 */
        public rolelevel:number;

        constructor(){

        }
        public fromByteArray(bytes:ByteArray):void {
			this.rank = bytes.readInt32();
            this.roleid = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.school = bytes.readInt32();
            this.score = bytes.readInt32();
            this.faction = ByteArrayUtils.readUtf16String(bytes);
            this.rolelevel = bytes.readInt32();
	    }
    }
    
}
