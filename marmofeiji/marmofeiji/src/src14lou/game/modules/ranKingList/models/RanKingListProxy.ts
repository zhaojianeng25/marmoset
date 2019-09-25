
module game.modules.ranKingList.models {
	/** 得到排行榜某个榜的下发数据事件 */
	export const GET_RANKLIST_INFODATA_EVENT: string = "getRankListInfoData";
	/** 得到某些排行榜上某排名玩家信息查看的下发数据事件 */
	export const GET_ROLE_RANKLIS_INFO2DATA_EVENT: string = "getRoleRankListInfo2Data";
	/** 得到宠物排行榜上某排名的宠物信息查看的下发数据事件 */
	export const GET_PET_RANKLIST_INFODATA_EVENT: string = "getPetRankListInfo2Data";
	/** 得到等级排行榜上某排名玩家信息查看的下发数据事件 */
	export const GET_ROLE_RANKLIS_INFODATA_EVENT: string = "getRoleRankListInfoData";
	/** 得到帮派信息数据 */
	export const GET_CLANDATA: string = "getClanData";

	/** 排行榜的proxy */
	export class RanKingListProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			RanKingListProxy._instance = this;
			this.init();
		}
		private static _instance: RanKingListProxy;
		public static getInstance(): RanKingListProxy {
			if (!this._instance) {
				this._instance = new RanKingListProxy();
			}
			return this._instance;
		}

		public init(): void {
			RanKingListModel.getInstance();
			this.addNetworkListener();
			//排行榜配置表           
			Laya.loader.load("common/data/temp/game.cpaihangbang.bin", Handler.create(this, this.onloadedPaiHangBangComplete), null, Loader.BUFFER);
		}

		private onloadedPaiHangBangComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cpaihangbang.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, RanKingListModel.getInstance().paiHangBangDic, game.data.template.CpaihangbangBaseVo, "id");
			console.log("!!!cpaihangbang表格加载完毕!!!");
		}

		// 添加监听
		private addNetworkListener(): void {
			Network._instance.addHanlder(ProtocolsEnum.SRequestRankList, this, this.onSGetRankListInfo);
			Network._instance.addHanlder(ProtocolsEnum.SRankRoleInfo2, this, this.onSGet_role_RankListInfo2);//监听请求某些排行榜上某排名玩家信息查看
			Network._instance.addHanlder(ProtocolsEnum.SFactionRankInfo, this, this.onSGet_faction_RankListInfo);//监听请求榜单上帮派的信息查看
			Network._instance.addHanlder(ProtocolsEnum.SRankRoleInfo, this, this.onSGet_role_RankListInfo);//监听等级排行榜上某名名次玩家信息查看
			Network._instance.addHanlder(ProtocolsEnum.SFactionRankInfo, this, this.onGetClanInfo);//监听帮派排行榜上某名名次帮派信息查看
		}
		/** 得到所要查看的帮派信息返回 */
		private onGetClanInfo(optcode: number, msg: hanlder.S2C_faction_rankinfo): void {
			//放入帮派key、帮派曾用名、帮派宣言和帮主id
			ranKingList.models.RanKingListModel._instance.clanDetailArr.push({factionkey:msg.factionkey, lastname:msg.lastname, title:msg.title, factionmasterid:msg.factionmasterid});
			this.event(models.GET_CLANDATA);
		}
		/**
		 * 请求等级排行榜上某名名次玩家信息查看下发数据返回
		 */
		private onSGet_role_RankListInfo(optcode: number, msg: hanlder.S2C_rank_roleinfo): void {
			var _lookRoleInfoData = new RankRoleInfoVo();
			_lookRoleInfoData.roleid = msg.roleid;
			_lookRoleInfoData.rolename = msg.rolename;
			_lookRoleInfoData.shape = msg.shape;
			_lookRoleInfoData.level = msg.level;
			_lookRoleInfoData.zonghescore = msg.zonghescore;
			_lookRoleInfoData.petscore = msg.petscore;
			_lookRoleInfoData.camp = msg.camp;
			_lookRoleInfoData.school = msg.school;
			_lookRoleInfoData.factionname = msg.factionname;
			_lookRoleInfoData.rank = msg.rank;
			RanKingListModel._instance.lookRoleInfoDat = _lookRoleInfoData;
			//派发在等级等级排行榜上某名名次玩家信息查看下发数据存放成功
			RanKingListProxy.getInstance().event(models.GET_ROLE_RANKLIS_INFODATA_EVENT, [msg.roleid, _lookRoleInfoData]);
		}
		// 请求排行榜返回
		private onSGetRankListInfo(optcode: number, msg: hanlder.S2C_request_ranklist): void {
			RanKingListModel._instance.rankListInfoData = [];
			RanKingListModel._instance.rankListInfoData = msg.list;
			//玩家自己排行榜相关信息装填
			var _myRankData = new MyRankInfoVo();
			_myRankData.ranktype = msg.ranktype;
			_myRankData.myrank = msg.myrank;
			_myRankData.myTitle = msg.myTitle;
			_myRankData.takeAwardFlag = msg.takeAwardFlag;
			_myRankData.extdata = msg.extdata;
			_myRankData.extdata1 = msg.extdata1;
			_myRankData.extdata2 = msg.extdata2;
			_myRankData.extdata3 = msg.extdata3;
			RanKingListModel._instance.myRankInfoData = _myRankData;
			//派发得到某榜单下发数据事件消息
			RanKingListProxy.getInstance().event(models.GET_RANKLIST_INFODATA_EVENT, [msg.ranktype, msg.hasMore]);
		}

		/** 请求排行榜上某个排名玩家信息查看下发数据返回 */
		private onSGet_role_RankListInfo2(optcode: number, msg: hanlder.S2C_rank_roleinfo2): void {
			var rank_type: number;
			var rank_num: number;
			rank_type = msg.ranktype;
			rank_num = msg.rank;
			var _arrayVo: Array<ZongHePingFenVo> = [];
			_arrayVo["roleid"] = msg.roleid;
			_arrayVo["rolename"] = msg.rolename;
			_arrayVo["level"] = msg.level;
			_arrayVo["shape"] = msg.shape;
			_arrayVo["totalscore"] = msg.totalscore;
			_arrayVo["rolescore"] = msg.rolescore;
			_arrayVo["manypetscore"] = msg.manypetscore;
			RanKingListModel._instance.zonghepingfen_info.clear();
			RanKingListModel._instance.zonghepingfen_info.set(rank_num, _arrayVo);
			//派发得到排行榜上某个排名玩家信息查看下发数据事件消息
			RanKingListProxy.getInstance().event(models.GET_ROLE_RANKLIS_INFO2DATA_EVENT, [msg.ranktype, msg.rank]);
		}
		//请求查看榜单上帮派信息返回
		private onSGet_faction_RankListInfo(optcode: number, msg: hanlder.S2C_faction_rankinfo): void {

		}
	}
}