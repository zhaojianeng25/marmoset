import _loginModel  = game.modules.createrole.models.LoginModel;
	
	module game.modules.redPacket.models{
	/** 在红包历史记录里查看红包领取记录事件 */
	export const LOOK_RECORD_EVENT:string = "loRecordEvent";
	/** 在红包界面查看红包领取记录事件 */
	export const SEE_RECORD_EVENT:string = "seeRecordEvent";
	/** 查看个人历史红包记录事件 */
	export const ROLE_REDPACK_RECORD_EVENT:string = "roleRedPackRecordEvent";
	/** 抢红包成功事件 */
	export const GET_REDPACK_SUCCESS:string = "getRedPackSuccess";
	/** 发送红包成功事件 */
	export const SEND_REDPACK_SUCCESS:string = "sendRedPackSuccess";
	/** 当前没有红包发送事件 */
	export const NONE_REDPACK:string = "noneRedPack";
	/** 请求红包界面事件 */
	export const SEND_REDPACK_VIEW:string = "sendRendPackView";
	/** 推送红包消息事件 */
	export const NOTICE_REPACK_EVENT:string = "noticeRedPack";
	/** 个人红包历史为空事件 */
	export const NONE_REDPACK_HIS:string = "noneRedPackHis";

	export class RedPacketProxy extends hanlder.ProxyBase{
        constructor(){
			super();
			RedPacketProxy._instance = this;
			this.init();
		}
        private static _instance:RedPacketProxy;
		public static getInstance():RedPacketProxy {
			if(!this._instance) {
				this._instance = new RedPacketProxy();
			}
			return this._instance;
		}

        public init():void {
			RedPacketModel.getInstance();
			this.addNetworkListener();

            //加载H红包配置表
            Laya.loader.load("common/data/temp/fushi.credpackconfig.bin", Handler.create(this,this.onloadedRedPackComplete), null, Loader.BUFFER);			
		}

        private onloadedRedPackComplete():void{
            console.log("credpackconfig表格加载完毕------ completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.credpackconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,RedPacketModel.getInstance().redPackDic,game.data.template.RedPackConfigBaseVo,"id");
			console.log("成功把红包配置表信息放进字典:",RedPacketModel.getInstance().redPackDic);
        }
		/**
		 * @describe  添加监听
		 */
        private addNetworkListener():void{
			Network._instance.addHanlder(ProtocolsEnum.SSendRedPack,this,this.onSGetSendRedPackMsg);//监听服务器下发红包发送成功的消息
			Network._instance.addHanlder(ProtocolsEnum.SSendRedPackView, this, this.onSGetRedPackViewInfo);//监听服务器下发红包界面下发信息
			Network._instance.addHanlder(ProtocolsEnum.SSendRedPackHisView, this, this.onSGetRedPackHisViewInfo);//监听服务器下发的红包被领取历史记录
			Network._instance.addHanlder(ProtocolsEnum.SGetRedPack, this, this.onSGetGetRedPackMsg);//监听服务器下发的抢红包成功的消息
            Network._instance.addHanlder(ProtocolsEnum.SSendRedPackRoleRecordView, this, this.onSGetRedPackRecordInfo);//监听服务器下发的个人红包历史记录
			Network._instance.addHanlder(ProtocolsEnum.SNoticeRedPack, this, this.onSGetNoticeRedPackInfo);//监听服务器下发的推送红包消息
			Network._instance.addHanlder(ProtocolsEnum.SNoticeRedPackList, this, this.onSGetNoticeRedPackListInfo);//监听服务器下发的上线推送红包消息
        }
		/**
		 * @describe  移除所有的监听
		 */
		 private removeNetworkListener(): void {
			Network._instance.removeHanlder(ProtocolsEnum.SSendRedPack,this,this.onSGetSendRedPackMsg);
			Network._instance.removeHanlder(ProtocolsEnum.SSendRedPackView, this, this.onSGetRedPackViewInfo);
			Network._instance.removeHanlder(ProtocolsEnum.SSendRedPackHisView, this, this.onSGetRedPackHisViewInfo);
			Network._instance.removeHanlder(ProtocolsEnum.SGetRedPack, this, this.onSGetGetRedPackMsg);
            Network._instance.removeHanlder(ProtocolsEnum.SSendRedPackRoleRecordView, this, this.onSGetRedPackRecordInfo);
			Network._instance.removeHanlder(ProtocolsEnum.SNoticeRedPack, this, this.onSGetNoticeRedPackInfo);
			Network._instance.removeHanlder(ProtocolsEnum.SNoticeRedPackList, this, this.onSGetNoticeRedPackListInfo);
		}

		/**
		 * @describe  存放推送红包消息数据
		 */
		private onSGetNoticeRedPackInfo(optcode:number,msg:hanlder.S2C_SNoticeRedPack):void{
			var _infoVo : Array<RedPackRoleTipVo> = [];
			_infoVo = msg.redpackroletip;
			RedPacketModel._instance.redPack_roletip_info = _infoVo;
			var modeltype:number = _infoVo["modeltype"];
			var redpackid:string = _infoVo["redpackid"];
			var rolename:string = _infoVo["rolename"];

			RedPacketProxy.getInstance().event(models.NOTICE_REPACK_EVENT,[rolename,redpackid,modeltype]);
		}
		/**
		 * @describe  存放上线推送红包消息数据
		 */
		private onSGetNoticeRedPackListInfo(optcode:number,msg:hanlder.S2C_SNoticeRedPackList):void{
			var infoList = new Array<RedPackRoleTipVo>();
			infoList = msg.redpackroletiplist;
			if(!infoList || infoList.length == 0){
				return;
			}
			RedPacketModel._instance.redPack_roletip_listInfo = infoList;
		}
		/**
		 * @describe  存放抢红包数据
		 */
		private onSGetGetRedPackMsg(optcode:number,msg:hanlder.S2C_SGetRedPack):void{
			console.log(".......................抢红包成功返回！.......................");
        	var modeltype: number = msg.modeltype;
			var redpackid: string = msg.redpackid;
        	var state: number = msg.state;
			var successflag: number = msg.successflag;
			var fushinum: number = msg.fushinum;
			var _infoVo : Array<GetRedPackVo> = [];
			_infoVo["modeltype"] = modeltype;
			_infoVo["redpackid"] = redpackid;
			_infoVo["state"] = state;
			_infoVo["successflag"] = successflag;
			_infoVo["fushinum"] = fushinum;
			RedPacketModel._instance.redPack_get_info = _infoVo;

			RedPacketProxy.getInstance().event(models.GET_REDPACK_SUCCESS,[successflag,redpackid,state]);
		}
		private onSGetSendRedPackMsg(optcode:number,msg:hanlder.S2C_SSendRedPack):void{
			console.log(".......................请求发送红包成功返回.......................");

			RedPacketProxy.getInstance().event(models.SEND_REDPACK_SUCCESS);
		}
		/**
		 * 存放红包界面信息数据
		 * @param optcode 
		 * @param msg 
		 */
		private onSGetRedPackViewInfo(optcode:number, msg:hanlder.S2C_SSendRedPackView):void{
			console.log(".......................请求红包界面返回.......................");
			var infoList = new Array<RedPackInfoVo>();
			infoList = msg.redpackinfolist;
			if(!infoList || infoList.length == 0){
				RedPacketProxy.getInstance().event(models.NONE_REDPACK);
				return;
			}
			RedPacketModel._instance.redpack_infoList = [];
			RedPacketModel._instance.redpack_infoList = infoList;
			RedPacketModel._instance.redpack_SR_num = msg.daysrnum;

			RedPacketProxy.getInstance().event(models.SEND_REDPACK_VIEW);
		}
		private onSGetRedPackHisViewInfo(optcode:number, msg:hanlder.S2C_SSendRedPackHisView):void{
			console.log(".......................请求红包被领取记录返回.......................");
			var infoList = new Array<RedPackRoleHisInfoVo>();
			infoList = msg.redpackrolehisinfolist;
			if(!infoList || infoList.length == 0) return;
			RedPacketModel._instance.redpack_roleHisInfoList = [];
			RedPacketModel._instance.redpack_roleHisInfoList = infoList;
			var modeltype:number = msg.modeltype;
			var redpackid:string = msg.redpackid;
			var redpackdes:string = msg.redpackdes;
			var redpackallnum:number = msg.redpackallnum;
			var redpackallmoney:number = msg.redpackallmoney;
			var time = msg.time;
			var _infoVo : Array<RedPackHisViewVo> = [];
			_infoVo["modeltype"] = modeltype;
			_infoVo["redpackid"] = redpackid;
			_infoVo["redpackdes"] = redpackdes;
			_infoVo["redpackallnum"] = redpackallnum;
			_infoVo["redpackallmoney"] = redpackallmoney;
			_infoVo["time"] = time;
			RedPacketModel._instance.redPack_HisView_info.set(redpackid,_infoVo);

			RedPacketProxy.getInstance().event(models.LOOK_RECORD_EVENT,redpackid);
			RedPacketProxy.getInstance().event(models.SEE_RECORD_EVENT,redpackid);
		}

        private onSGetRedPackRecordInfo(optcode:number, msg:hanlder.S2C_SSendRedPackRoleRecordView):void{
			console.log(".......................请求个人红包历史记录返回.......................");
			var redpack_rolerecord = new Array<RedPackRoleRecordVo>();
			redpack_rolerecord = msg.redpackrolerecord;
			if( !redpack_rolerecord || redpack_rolerecord.length == 0){
				RedPacketProxy.getInstance().event(models.NONE_REDPACK_HIS);
				return;
			}
			RedPacketModel._instance.redpack_record = [];
			RedPacketModel._instance.redpack_record = redpack_rolerecord;
			var _infoVo : Array<RedPackRoleRecordViewVo> = [];
			_infoVo["modeltype"] = msg.modeltype;
			_infoVo["firstpageflag"] = msg.firstpageflag;
			_infoVo["redpackallnum"] = msg.redpackallnum;
			_infoVo["redpackallmoney"] = msg.redpackallmoney;
			_infoVo["redpackallfushi"] = msg.redpackallfushi;
			RedPacketModel._instance.redPack_roleRecordViewVo = _infoVo;

			RedPacketProxy.getInstance().event(models.ROLE_REDPACK_RECORD_EVENT,[msg.modeltype,redpack_rolerecord]);
        }
    }
}