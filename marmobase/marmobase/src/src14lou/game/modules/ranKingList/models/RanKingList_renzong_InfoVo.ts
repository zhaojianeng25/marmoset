
module game.modules.ranKingList.models{
    /** 人物综和实力榜的Vo */
    export class RanKingList_renzong_InfoVo{
        /** 排名 */
        public rank:number;
        /** 角色ID */
        public roleid:number; //long型数据
        /** 角色名字 */  
		public rolename:string;
        /** 角色职业 */
		public school:number;
        /** 总评分 */
		public score:number;
        /**角色等级 */
		public rolelevel:number;

        constructor(){

        }
        public fromByteArray(bytes:ByteArray):void {
			this.rank = bytes.readInt32();
            this.roleid = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.school = bytes.readInt32();
            this.score = bytes.readInt32();
            this.rolelevel = bytes.readInt32();
	    }
    }
    
}