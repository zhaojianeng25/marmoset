module game.modules.aliveordead.models{
    /** 准备下战书成功 */
    export const InvitationLiveDieSuccess: string = "invitationLiveDieSuccess";
    /** 被下战书 */
    export const InvitationLiveDieOK: string = "invitationLiveDieOK";
    /** 生死战应战 */
    export const AcceptBattleFirst: string = "acceptBattleFirst";
    /** 获得生死战观战界面的列表数据 */
    export const GetWatchData: string = "getWatchData";
    /** 获得生死战排行榜界面的列表数据 */
    export const  GetLDRankLstData: string = "getLDRankLstData";
    /** 某场生死战点赞成功 */
    export const RoseSuccess: string = "roseSuccess";

    /** 战仙会（生死战）协议处理 proxy */
    export class AliveOrDeadProxy extends hanlder.ProxyBase {
        constructor() {
			super();
			AliveOrDeadProxy._instance = this;
			this.init();
		}
		public static _instance: AliveOrDeadProxy;
		public static getInstance(): AliveOrDeadProxy {
			if (!this._instance) {
				this._instance = new AliveOrDeadProxy();
			}
			return this._instance;
		}

        public init(): void {
            AliveOrDeadModel.getInstance();
			this.addNetworkListener();
        }

        /** 添加监听 */
		private addNetworkListener(): void {
            Network._instance.addHanlder(ProtocolsEnum.SInvitationLiveDieBattle, this, this.onSInvitationLiveDieBattle);            
            Network._instance.addHanlder(ProtocolsEnum.SInvitationLiveDieBattleOK, this, this.onSInvitationLiveDieBattleOK);      
            Network._instance.addHanlder(ProtocolsEnum.SAcceptInvitationLiveDieBattle, this, this.onSAcceptInvitationLiveDieBattle);
            Network._instance.addHanlder(ProtocolsEnum.SAcceptLiveDieBattleFirst, this, this.onSAcceptLiveDieBattleFirst);
            Network._instance.addHanlder(ProtocolsEnum.SLiveDieBattleWatchView, this, this.onSLiveDieBattleWatchView);
            Network._instance.addHanlder(ProtocolsEnum.SLiveDieBattleRankView, this, this.onSLiveDieBattleRankView);
            Network._instance.addHanlder(ProtocolsEnum.SLiveDieBattleGiveRose, this, this.onSLiveDieBattleGiveRose);
        }

        /** 点赞成功返回 */
        private onSLiveDieBattleGiveRose(optcode: number, msg: hanlder.s2c_SLiveDieBattleGiveRose):void{
            this.event(models.RoseSuccess,[msg.vedioid, msg.rosenum, msg.roseflag]);
        }

        /** 返回生死战排行榜界面数据 */
        private onSLiveDieBattleRankView(optcode: number, msg: hanlder.s2c_SLiveDieBattleRankView):void{
            models.AliveOrDeadModel.getInstance()._rolefightlist = [];
            models.AliveOrDeadModel.getInstance()._rolefightlist = msg.rolefightlist;
            this.event(models.GetLDRankLstData, [msg.rolefightlist]);
        }

        /** 返回生死斗观战界面数据 */
        private onSLiveDieBattleWatchView(optcode: number, msg: hanlder.s2c_SLiveDieBattleWatchView):void{            
            this.event(models.GetWatchData, [msg.rolewatchlist]);
        }

        /** 生死战应战 */
        private onSAcceptLiveDieBattleFirst(optcode: number, msg: hanlder.s2c_SAcceptLiveDieBattleFirst):void{
            let _app = HudModel.getInstance().useapp;
            let _npckey = HudModel.getInstance().npckey;
            let _npcDialog = new commonUI.NpcDialogMediator(_app);
            let _contain = "";
            if(msg.hostroleid == 0 && msg.hostroleid == ""){//没人发起决斗邀请
                _contain = ChatModel.getInstance().chatMessageTips[162129]["msg"];
                _npcDialog.init(_npckey, [], [], _contain);
            }
            else{//有人发起决斗邀请
                _contain = ChatModel.getInstance().chatMessageTips[162128]["msg"];
                _contain = _contain.replace("$parameter1$", msg.hostrolename)
                _npcDialog.init(_npckey, [910105, 910108], [], _contain);
            }
            //this.event(models.AcceptBattleFirst, [msg.hostroleid, msg.hostrolename]);
        }

        /** 收到确定是否接受战书消息返回 */
        private onSAcceptInvitationLiveDieBattle(optcode: number, msg: hanlder.s2c_SAcceptInvitationLiveDieBattle):void{

        }

        /** 收到下战书结果消息返回 */
        private onSInvitationLiveDieBattleOK(optcode: number, msg: hanlder.s2c_SInvitationLiveDieBattleOK):void{
            let _invitationLiveDieOKVo = new InvitationLiveDieOKVo();
            _invitationLiveDieOKVo.sourceid = msg.sourceid;
            _invitationLiveDieOKVo.sourcename = msg.sourcename;
            _invitationLiveDieOKVo.selecttype = msg.selecttype;
            this.event(models.InvitationLiveDieOK, _invitationLiveDieOKVo);
        }

        /** 收到下战书消息返回 */
        private onSInvitationLiveDieBattle(optcode: number, msg: hanlder.s2c_SInvitationLiveDieBattle):void{
            let _invitationSuccessVo = new InvitationSuccessVo();
            _invitationSuccessVo.objectid = msg.objectid;
            _invitationSuccessVo.objectname = msg.objectname;
            _invitationSuccessVo.selecttype = msg.selecttype;
            _invitationSuccessVo.costmoney = msg.costmoney;
            this.event(models.InvitationLiveDieSuccess, _invitationSuccessVo);
        }

        /** 移除监听 */
		private removeNetworkListener(): void {
            Network._instance.removeHanlder(ProtocolsEnum.SInvitationLiveDieBattle, this, this.onSInvitationLiveDieBattle);
            Network._instance.removeHanlder(ProtocolsEnum.SInvitationLiveDieBattleOK, this, this.onSInvitationLiveDieBattleOK);      
            Network._instance.removeHanlder(ProtocolsEnum.SAcceptInvitationLiveDieBattle, this, this.onSAcceptInvitationLiveDieBattle);
        }
    }
}