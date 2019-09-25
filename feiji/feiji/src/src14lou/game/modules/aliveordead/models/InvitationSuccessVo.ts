module game.modules.aliveordead.models{
    /** 战仙会（生死斗）下战书返回的信息 */
    export class InvitationSuccessVo{
        /** 被下战书的对方id */
		public objectid: number;//long型数据
		/** 被下战书的对方名字 */
		public objectname: string;
		/** 所下战书的类型 */
		public selecttype: number;//0单人   1组队
		/** 下战书所需花费 */
		public costmoney: number;

        constructor()
		{

		}
    }
}