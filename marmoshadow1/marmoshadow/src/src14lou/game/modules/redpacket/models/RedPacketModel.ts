/**
* name 
*/
/** 红包类型 */
enum RedPackType{
    /** 世界红包 */
    TYPE_WORLD = 1,
    /** 帮派红包 */
    TYPE_CLAN = 2,
    /** 队伍红包 */
    TYPE_TEAM =3
};
/** 红包状态 */
enum RedPackState{
    /** 可以抢红包 */
    STATE_CANGET =0,
    /** 已经领取红包 */
    STATE_HAVE = 1,
    /** 红包已经抢光 */
    STATE_NONE =2
};
/** 玩家的红包记录状态 */
enum RedPackRecordState{    
    /** 发出的红包 */
    SEND_RED_PACK = 1,
    /** 收到的红包 */
    RECEIVED_RED_PACK = 0
};
/** 抢红包是否成功 */
enum SuccessFlag{
    /** 失败 */
    FAILE = 0,
    /** 成功 */
    SUCCESS = 1
}

module game.modules.redPacket.models{
	export class RedPacketModel{
		public redPackDic:Object = {};
        /** 红包历史里记录下的红包记录信息数据，用于红包历史里的列表 */
        public redpack_record:Array<RedPackRoleRecordVo>=[];
        /** 红包的信息数据，用于红包界面的列表 */
        public redpack_infoList:Array<RedPackInfoVo> = [];
        /** 红包被领取的记录信息数据，用于红包领取记录的列表 */
        public redpack_roleHisInfoList:Array<RedPackRoleHisInfoVo> = [];
        public redpack_SR_num:SRRedPackNumVo;
        /** 红包被领取的历史信息数据 */
        public redPack_HisView_info:Laya.Dictionary = new Dictionary();
        public redPack_get_info:Array<GetRedPackVo> = [];
        /** 红包历史界面信息数据 */
        public redPack_roleRecordViewVo:Array<RedPackRoleRecordViewVo>= [];
        /** 推送红包消息的信息 */
        public redPack_roletip_info:Array<RedPackRoleTipVo> = [];
        /** 上线推送红包消息的列表信息 */
        public redPack_roletip_listInfo:Array<RedPackRoleTipVo> = [];
        /** 存放过期的红包数据 */
        public expiredRedPackData = [];
		constructor(){
			RedPacketModel._instance = this;
		}
		public static _instance:RedPacketModel;
		public static getInstance():RedPacketModel {
			if(!this._instance) {
				this._instance = new RedPacketModel();
			}
			return this._instance;
		}
        public static clearModelData(): void {
            redPacket.models.RedPacketModel._instance.redpack_record = [];
            redPacket.models.RedPacketModel._instance.redpack_infoList = [];
            redPacket.models.RedPacketModel._instance.redpack_roleHisInfoList = [];
            redPacket.models.RedPacketModel._instance.redpack_SR_num = new models.SRRedPackNumVo();
            redPacket.models.RedPacketModel._instance.redPack_HisView_info = new Laya.Dictionary();
            redPacket.models.RedPacketModel._instance.redPack_get_info = [];
            redPacket.models.RedPacketModel._instance.redPack_roleRecordViewVo = [];
            redPacket.models.RedPacketModel._instance.redPack_roletip_info = [];
            redPacket.models.RedPacketModel._instance.redPack_roletip_listInfo = [];
            redPacket.models.RedPacketModel._instance.expiredRedPackData = [];
        }
		/** 给其他地方提供抢红包的接口 */
        public qiangRedPack(redpacktype:number,redpackid:string):void{
            RequesterProtocols._instance.c2s_CGetRedPack(redpacktype,redpackid);
        }
	}
}