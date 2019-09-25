
module game.modules.ranKingList.models{
    /**
 * name  公会副本竞速榜的Vo
 * 公会就是帮派
 * 熔火之心、纳克萨玛斯都是公会副本
 */
    export class FactionRaidRank_infoVo{
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
        /** 会长名字 */
        public factionmonstername:string;
        /** 公会副本名字 */
        public factioncopyname:string;
        /** BOSS血量百分比 */
        public bosshp:number;//float型数据

        constructor(){

        }
        public fromByteArray(bytes:ByteArray):void {
			
	    }
    }
    
}
