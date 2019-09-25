
module game.modules.ranKingList.models{
    /** 红包榜的Vo */
    export class RedPackRankRecord_infoVo{
        /** 排名 */
        public rank:number;
        /** 角色ID */
        public roleid:number;//long型数据
        /** 人物名称 */
        public rolename:string;
        /** 职业（门派）*/
        public school:number;
        /** 数量 */
        public num:number;//long型数据

        constructor(){

        }
        public fromByteArray(bytes:ByteArray):void {
			this.rank = bytes.readInt32();
            this.roleid = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.school = bytes.readInt32();
            this.num = bytes.readLong();
	    }
    }
    
}
