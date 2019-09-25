
module game.modules.ranKingList.models{
    /**  公会战历史排名榜的Vo */
    export class ClanFightHistroyRank_infoVo{
        /** 排名 */
        public rank:number;
        /** 公会ID */
        public clanid:number;//long型数据
        /** 公会名字 */
        public clanname:string;
        /** 公会等级 */
        public clanlevel:number;
        /** 战斗次数 */
        public fightcount:number;
        /** 胜利次数 */
        public wincount:number;
        /** 积分 */
        public scroe:number;

        constructor(){

        }
        public fromByteArray(bytes:ByteArray):void {
			this.rank = bytes.readInt32();
            this.clanid = bytes.readLong();
            this.clanname = ByteArrayUtils.readUtf16String(bytes);
            this.clanlevel = bytes.readInt32();
            this.fightcount = bytes.readInt32();
            this.wincount = bytes.readInt32();
            this.scroe = bytes.readInt32();
	    }
    }
    
}
