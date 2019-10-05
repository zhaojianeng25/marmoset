
module game.modules.ranKingList.models{
    /** FactionRankRecord的Vo */
    export class FactionRank_infoVo{
        /** 排名 */
        public rank:number;
        /** 公会名称 */
        public factionname:string;
        /** 帮主名称 */
        public mastername:string;
        /** 公会等级 */
        public level:number;
        /** 阵营 */
        public camp:number;
        /** 公会key */  
        public factionKey:number;//long型数据

        constructor(){

        }
        public fromByteArray(bytes:ByteArray):void {
			this.rank = bytes.readInt32();
            this.factionname = ByteArrayUtils.readUtf16String(bytes);
            this.mastername = ByteArrayUtils.readUtf16String(bytes);
            this.level = bytes.readInt32();
            this.camp = bytes.readInt32();
            this.factionKey = bytes.readLong();
	    }
    }
    
}
