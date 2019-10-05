
module game.modules.ranKingList.models{
    /** 公会榜的Vo * 公会就是帮派 */
    export class FactionRankRecordEx_infoVo{
        /** 排名 */
        public rank:number;
        /** 公会id */
        public factionid:number;//long型数据
        /** 公会名字 */
        public factionname:string;
        /** 进度时间 */
        public progressstime:number;//long型数据
        /** 公会进度 */
        public progresss:number;
        /** 公会等级 */
        public factionlevel:number;
        /** 当前人数/综合实力 */
        public externdata:number;
        /** 旅馆等级 */
        public hotellevel:number;

        constructor(){

        }
        public fromByteArray(bytes:ByteArray):void {
			this.rank = bytes.readInt32();
            this.factionid = bytes.readLong();
            this.factionname = ByteArrayUtils.readUtf16String(bytes);
            this.progressstime = bytes.readLong();
            this.progresss = bytes.readInt32();
            this.factionlevel = bytes.readInt32();
            this.externdata = bytes.readInt32();
            this.hotellevel = bytes.readInt32();
	    }
    }
    
}
