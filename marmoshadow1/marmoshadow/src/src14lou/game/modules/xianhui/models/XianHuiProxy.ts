/**
* XianHuiProxy 
*/
module game.modules.xianhui.models {
	/** 刷新3v3证道战信息 */
	export const REFRESH_PVP3_EVENT: string = "refreshPVP3Event";
	/** 刷新3v3证道战战况 */
	export const REFRESH_PVP3BATTLE_EVENT: string = "refreshPVP3BattleEvent";
	/** 刷新3v3证道战排行 */
	export const REFRESH_PVP3RANKING_EVENT: string = "refreshPVP3RankingEvent";
	/** 刷新3v3匹配准备状态 */
	export const REFRESH_MATCHSTATE_EVENT: string = "refreshMatchStateEvent";

	/** 刷新5v5证道战信息 */
	export const REFRESH_PVP5_EVENT: string = "refreshPVP5Event";
	/** 刷新5v5证道战战况 */
	export const REFRESH_PVP5BATTLE_EVENT: string = "refreshPVP5BattleEvent";
	/** 刷新5v5证道战排行 */
	export const REFRESH_PVP5RANKING_EVENT: string = "refreshPVP5RankingEvent";
	/** 刷新5v5匹配准备状态 */
	export const REFRESH_MATCHSTATE2_EVENT: string = "refreshMatchState2Event";

	/** 刷新匹配结果 */
	export const REFRESH_MATCHRESULE_EVENT: string = "refreshMatchResultEvent";
	export class XianHuiProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			XianHuiProxy._instance = this;
			this.init();
		}
		public static _instance: XianHuiProxy;
		public static getInstance(): XianHuiProxy {
			if (!this._instance) {
				this._instance = new XianHuiProxy();
			}
			return this._instance;
		}

		public init(): void {
			XianHuiModel.getInstance();
			this.addNetworkListener();
		}
		/** 添加监听 */
		private addNetworkListener(): void {
			Network._instance.addHanlder(ProtocolsEnum.SPvP3MyInfo, this, this.onPvP3MyInfo);
			Network._instance.addHanlder(ProtocolsEnum.SPvP3BattleInfo, this, this.onPvP3BattleInfo);
			Network._instance.addHanlder(ProtocolsEnum.SPvP3RankingList, this, this.onPvP3RankingList);
			Network._instance.addHanlder(ProtocolsEnum.SPvP3MatchResult, this, this.onPvP3MatchResult);
			Network._instance.addHanlder(ProtocolsEnum.SPvP3ReadyFight, this, this.onPvP3ReadyFight);

			Network._instance.addHanlder(ProtocolsEnum.SPvP5MyInfo, this, this.onPvP5MyInfo);
			Network._instance.addHanlder(ProtocolsEnum.SPvP5BattleInfo, this, this.onPvP5BattleInfo);
			Network._instance.addHanlder(ProtocolsEnum.SPvP5RankingList, this, this.onPvP5RankingList);
			Network._instance.addHanlder(ProtocolsEnum.SPvP5MatchResult, this, this.onSPvP5MatchResult);
			Network._instance.addHanlder(ProtocolsEnum.SPvP5ReadyFight, this, this.onSPvP5ReadyFight);
		}
		/** pvp5准备状态 1-准备 */
		private onSPvP5ReadyFight(optcode: number, msg: hanlder.s2c_SPvP5ReadyFight): void {
			// this.event(REFRESH_MATCHSTATE2_EVENT);
		}
		/** pvp5匹配结果 */
		private onSPvP5MatchResult(optcode: number, msg: hanlder.s2c_SPvP5MatchResult): void {
			this.event(REFRESH_MATCHRESULE_EVENT, [msg.targets]);
		}
		/** pvp5排行 */
		private onPvP5RankingList(optcode: number, msg: hanlder.s2c_SPvP5RankingList): void {
			XianHuiModel.getInstance().roleScores1 = msg.roleScores1;
			XianHuiModel.getInstance().roleScores2 = msg.roleScores2;
			XianHuiModel.getInstance().myScore = msg.myScore;
			this.event(REFRESH_PVP5RANKING_EVENT);
		}
		/** pvp5战况 */
		private onPvP5BattleInfo(optcode: number, msg: hanlder.s2c_SPvP5BattleInfo): void {			
			let PvP5BattleInfoVo = new models.PvP5BattleInfoVo();
			PvP5BattleInfoVo.ismine = msg.ismine;
			PvP5BattleInfoVo.msgId = msg.msgId;
			PvP5BattleInfoVo.parameters = msg.parameters;
			//存储全部战况
			if (!XianHuiModel.getInstance().PvP5BattleInfos.get(0)) {
				XianHuiModel.getInstance().PvP5BattleInfos.set(0, [PvP5BattleInfoVo]);
			} else {
				XianHuiModel.getInstance().PvP5BattleInfos.get(0).push(PvP5BattleInfoVo);
			}
			//存储自信相关战况
			if (msg.ismine == 1) {
				if (!XianHuiModel.getInstance().PvP5BattleInfos.get(1)) {
					XianHuiModel.getInstance().PvP5BattleInfos.set(1, [PvP5BattleInfoVo]);
				} else {
					XianHuiModel.getInstance().PvP5BattleInfos.get(1).push(PvP5BattleInfoVo);
				}
			}
			this.event(REFRESH_PVP5BATTLE_EVENT);
		}
		/** pvp5信息 */
		private onPvP5MyInfo(optcode: number, msg: hanlder.s2c_SPvP5MyInfo): void {
			let PvP5MyInfo = new models.PvP5MyInfoVo();
			PvP5MyInfo.firstwin = msg.firstwin;
			PvP5MyInfo.fivefight = msg.fivefight;
			PvP5MyInfo.battlenum = msg.battlenum;
			PvP5MyInfo.winnum = msg.winnum;
			PvP5MyInfo.combowinnum = msg.combowinnum;
			PvP5MyInfo.score = msg.score;
			PvP5MyInfo.camp = msg.camp;
			PvP5MyInfo.waitstarttime = msg.waitstarttime;
			XianHuiModel.getInstance().PvP5MyInfo = PvP5MyInfo;
			this.event(REFRESH_PVP5_EVENT);
		}

		/** pvp3准备状态 1-准备 */
		private onPvP3ReadyFight(optcode: number, msg: hanlder.s2c_SPvP3ReadyFight): void {
			this.event(REFRESH_MATCHSTATE_EVENT, [msg.ready]);
		}
		/** pvp3匹配结果 */
		private onPvP3MatchResult(optcode: number, msg: hanlder.s2c_SPvP3MatchResult): void {
			this.event(REFRESH_MATCHRESULE_EVENT, [msg.targets]);
		}
		/** pvp3排行 */
		private onPvP3RankingList(optcode: number, msg: hanlder.s2c_SPvP3RankingList): void {
			XianHuiModel.getInstance().history = msg.history;
			XianHuiModel.getInstance().PvP3Ranking.set(msg.history, [msg.roleScores, msg.myScore]);
			this.event(REFRESH_PVP3RANKING_EVENT);
		}
		/** pvp3战况 */
		private onPvP3BattleInfo(optcode: number, msg: hanlder.s2c_SPvP3BattleInfo): void {
			let PvP3BattleInfoVo = new models.PvP3BattleInfoVo();
			PvP3BattleInfoVo.ismine = msg.ismine;
			PvP3BattleInfoVo.msgId = msg.msgId;
			PvP3BattleInfoVo.parameters = msg.parameters;
			//存储全部战况
			if (!XianHuiModel.getInstance().PvP3BattleInfos.get(0)) {
				XianHuiModel.getInstance().PvP3BattleInfos.set(0, [PvP3BattleInfoVo]);
			} else {
				XianHuiModel.getInstance().PvP3BattleInfos.get(0).push(PvP3BattleInfoVo);
			}
			//存储自信相关战况
			if (msg.ismine == 1) {
				if (!XianHuiModel.getInstance().PvP3BattleInfos.get(1)) {
					XianHuiModel.getInstance().PvP3BattleInfos.set(1, [PvP3BattleInfoVo]);
				} else {
					XianHuiModel.getInstance().PvP3BattleInfos.get(1).push(PvP3BattleInfoVo);
				}
			}
			this.event(REFRESH_PVP3BATTLE_EVENT);
		}
		/** pvp3信息 */
		private onPvP3MyInfo(optcode: number, msg: hanlder.s2c_SPvP3MyInfo): void {
			let PvP3MyInfo = new models.PvP3MyInfoVo();
			PvP3MyInfo.firstwin = msg.firstwin;
			PvP3MyInfo.tenfight = msg.tenfight;
			PvP3MyInfo.eightwin = msg.eightwin;
			PvP3MyInfo.battlenum = msg.battlenum;
			PvP3MyInfo.winnum = msg.winnum;
			PvP3MyInfo.combowinnum = msg.combowinnum;
			PvP3MyInfo.score = msg.score;
			PvP3MyInfo.ready = msg.ready;
			XianHuiModel.getInstance().PvP3MyInfo = PvP3MyInfo;
			this.event(REFRESH_PVP3_EVENT);
		}

	}
}