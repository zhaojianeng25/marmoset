module game.modules.aliveordead.models{
    /** 战仙会（生死斗）被下战书返回的信息 */
    export class InvitationLiveDieOKVo{
        /** 所下战书的对方id */
		public sourceid: number;//long型数据
		/** 所下战书的对方名字 */
		public sourcename: string;
		/** 所下战书的类型 */
		public selecttype: number;//0单人   1组队

        constructor()
		{

		}
    }
}