/**
* name 
*/
module game.scene.models {
	/**模型创建 */
	export const MODEL_CREATE = "model_create";
	/**人物移动*/
	export const ROLE_MOVE = "role_move"
	/**其他玩家移动*/
	export const OTHERROLE_MOVE = "otherrole_move";
	/**模型清除*/
	export const MODEL_CELAR = "model_clear";
	/**npc对话*/
	export const NPC_DIALOG = "npc_dialog";
	/**停止移动*/
	export const MOVE_STOP = "move_stop";
	/**路径描绘*/
	export const MOVE_PATH = "move_path";
	/**小地图移动*/
	export const SMALL_MOVE = "small_move";
	/**队伍移动*/
	export const TEAM_MOVE = "team_move";
	/**自动移动*/
	export const AUTO_MOVE = "auto_move"
	/**队伍状态*/
	export const TEAM_STATE = "team_state"
	/**选择npc*/
	export const NPC_SELECT = "npc_select"
	/**选择玩家*/
	export const ROLE_SELECT = "role_select"
	/**任务提示*/
	export const TASK_TIPS = "task_tips"
	export class SceneProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			SceneProxy._instance = this;
			//this.init();
		}
		private static _instance: SceneProxy;
		public static getInstance(): SceneProxy {
			if (!this._instance) {
				this._instance = new SceneProxy();
			}
			return this._instance;
		}

		public init(): void {
			SceneModel.getInstance();
			this.addNetworkListener();

			//RequesterProtocols._instance.c2s_CReqNewHandBattle();
			//RequesterProtocols._instance.c2s_check_move(1,[],1);
			//RequesterProtocols._instance.c2s_CSetAutoBattle(1);
			//RequesterProtocols._instance.c2s_CSetCharOpt(1,1);
			//RequesterProtocols._instance.c2s_CSendAction(1,1,1);
			//RequesterProtocols._instance.c2s_CRequestApplyList();
			//RequesterProtocols._instance.c2s_CSendRoundPlayEnd([1,1,1]);
		}
		// 添加监听
		private addNetworkListener(): void {
			Network._instance.addHanlder(ProtocolsEnum.SSendBattleStart, this, this.onSSendBattleStart);
			Network._instance.addHanlder(ProtocolsEnum.SSendRoleInitAttrs, this, this.onSSendRoleInitAttrs);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleData, this, this.onSRefreshRoleData);
			Network._instance.addHanlder(ProtocolsEnum.SSendAlreadyUseItem, this, this.onSSendAlreadyUseItem);
			Network._instance.addHanlder(ProtocolsEnum.SSendAddFighters, this, this.onSSendAddFighters);
			Network._instance.addHanlder(ProtocolsEnum.SUpdateRoleSceneState, this, this.onSUpdateRoleSceneState);
			Network._instance.addHanlder(ProtocolsEnum.SSendRoundScript, this, this.onSSendRoundScript);
			Network._instance.addHanlder(ProtocolsEnum.SSendRoundPlayEnd, this, this.onSSendRoundPlayEnd);
			Network._instance.addHanlder(ProtocolsEnum.SSendRoundStart, this, this.onSSendRoundStart);
			Network._instance.addHanlder(ProtocolsEnum.SBuffChangeResult, this, this.onSBuffChangeResult);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshNaiJiu, this, this.onSRefreshNaiJiu);
			Network._instance.addHanlder(ProtocolsEnum.SRspRoleInfo, this, this.onSRspRoleInfo);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshCurrency, this, this.onSRefreshCurrency);
			Network._instance.addHanlder(ProtocolsEnum.SSendBattleEnd, this, this.onSSendBattleEnd);
			/**添加人物到场景*/
			Network._instance.addHanlder(ProtocolsEnum.SAddUserScreen, this, this.onAddUserScreen);
			/**删除离开场景的人物与NPC*/
			Network._instance.addHanlder(ProtocolsEnum.SRemoveUserScreen, this, this.onRemoveScreen);
			/**人物移动*/
			Network._instance.addHanlder(ProtocolsEnum.SRoleMove, this, this.onRoleMove);
			/**人物停止*/
			Network._instance.addHanlder(ProtocolsEnum.SRoleStop, this, this.onRoleStopMove);
			/**访问NPC*/
			Network._instance.addHanlder(ProtocolsEnum.SVisitNpc, this, this.onVisitNpc);
			/**返回队伍信息*/
			Network._instance.addHanlder(ProtocolsEnum.SSetRoleTeamInfo, this, this.onRoleTeamInfo);
		}

		// 移除监听
		private removeNetworkListener(): void {

		}
		private onSSendBattleStart(optcode: number, msg: hanlder.s2c_SSendBattleStart): void {


		}
		private onSSendRoleInitAttrs(optcode: number, msg: hanlder.s2c_SSendRoleInitAttrs): void {


		}
		private onSRefreshRoleData(optcode: number, msg: hanlder.s2c_SRefreshRoleData): void {


		}
		private onSSendAlreadyUseItem(optcode: number, msg: hanlder.s2c_SSendAlreadyUseItem): void {


		}
		private onSSendAddFighters(optcode: number, msg: hanlder.s2c_SSendAddFighters): void {
			SceneModel.getInstance().fighterList = msg.fighterList;
			SceneModel.getInstance().fighterList0 = msg.fighterList0;
			SceneModel.getInstance().fighterList1 = msg.fighterList1;
			console.log("SceneProxy onSSendAddFighters:", msg);

		}

		private onSUpdateRoleSceneState(optcode: number, msg: hanlder.s2c_update_role_scene_state): void {
			let roleState = new Laya.Dictionary;
			let scenestate = new Laya.Dictionary;
			/** key 角色id value 场景状态 */
			scenestate.set(msg.roleId, msg.scenestate);
			SceneModel.getInstance().roleStateInScene.set(msg.roleId,msg.scenestate);
			roleState.set("sceneState", scenestate);
			this.event(TEAM_STATE, roleState);

		}
		//添加到场景的人物以及NPC
		private onAddUserScreen(optcode: number, msg: hanlder.s2c_add_user_screen): void {
			console.log("----添加到场景的人物以及NPC：" + msg.rolelist + "," + msg.npclist);
			let rolelist: Laya.Dictionary = new Laya.Dictionary();
			let npclist: Laya.Dictionary = new Laya.Dictionary()
			console.log(SceneModel.getInstance().rolelist.values);
			for (var index = 0; index < msg.rolelist.length; index++) {
				let role: RoleBasicVo = msg.rolelist[index];
				SceneModel.getInstance().rolelist.set(role.rolebasicOctets.roleid, role);
				rolelist.set(role.rolebasicOctets.roleid, role);
			}
			for (var index = 0; index < msg.npclist.length; index++) {
				let npc: NpcBasicVo = msg.npclist[index];
				SceneModel.getInstance().npclist.set(npc.npckey, npc);
				npclist.set(npc.npckey, npc)
			}
			console.log(SceneModel.getInstance().smallallnpc.values);
			if (SceneModel.getInstance().smallallnpc.get(SceneModel.getInstance().smallallnpc.keys[0]) == null) {
				SceneModel.getInstance().smallallnpc = SceneModel.getInstance().npclist;
			}
			SceneModel.getInstance().newrolelist = rolelist
			SceneModel.getInstance().newnpclist = npclist
			models.SceneProxy.getInstance().event(models.MODEL_CREATE);
			if (game.modules.activity.models.ActivityModel._instance.JingYingNpc.get(game.modules.mainhud.models.HudModel.getInstance().sceneid) && npclist.values.length > 0) {
				game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.NEWTASK);
			}
		}
		//离开场景的人物以及NPC
		private onRemoveScreen(optcode: number, msg: hanlder.s2c_remove_user_screen): void {
			let roleinfo: Laya.Dictionary = new Laya.Dictionary();
			let npcinfo: Laya.Dictionary = new Laya.Dictionary()
			for (var index = 0; index < msg.roleids.length; index++) {
				roleinfo.set(msg.roleids[index], SceneModel.getInstance().rolelist.get(msg.roleids[index]))
				SceneModel.getInstance().rolelist.remove(msg.roleids[index]);
			}
			for (var index = 0; index < msg.npcids.length; index++) {
				npcinfo.set(msg.npcids[index], SceneModel.getInstance().npclist.get(msg.npcids[index]))
				SceneModel.getInstance().npclist.remove(msg.npcids[index])
			}
			models.SceneProxy.getInstance().event(models.MODEL_CELAR, [roleinfo, npcinfo]);
		}
		//人物移动
		private onRoleMove(optcode: number, msg: hanlder.s2c_role_move): void {
			if (msg.roleid == game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) {
				models.SceneProxy.getInstance().event(ROLE_MOVE, [msg.destPos]);
			}
			else {
				models.SceneProxy.getInstance().event(models.OTHERROLE_MOVE, [msg.roleid, msg.destPos]);
			}
			let role: RoleBasicVo = new RoleBasicVo();
			role = SceneModel.getInstance().rolelist.get(msg.roleid);
			role.pos = msg.destPos;
			SceneModel.getInstance().rolelist.set(msg.roleid, role)
		}
		//人物停止移动
		private onRoleStopMove(optcode: number, msg: hanlder.s2c_role_stop): void {
			let role: RoleBasicVo = SceneModel.getInstance().rolelist.get(msg.roleid);
			role.pos = msg.pos
			SceneModel.getInstance().rolelist.set(msg.roleid, role);
			if (msg.roleid == game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) {
				models.SceneProxy.getInstance().event(ROLE_MOVE, [msg.pos]);
			}
			else {
				models.SceneProxy.getInstance().event(models.OTHERROLE_MOVE, [msg.roleid, msg.pos]);
			}
		}
		//访问NPC
		private onVisitNpc(optcode: number, msg: hanlder.s2c_visit_npc): void {
			models.SceneModel.getInstance().npckey = msg.npckey;
			models.SceneModel.getInstance().npcservices = msg.services;
			models.SceneModel.getInstance().scenarioquests = msg.scenarioquests;
			models.SceneProxy.getInstance().event(NPC_DIALOG, [msg.npckey, msg.services, msg.scenarioquests]);
		}
		/**创建队伍时返回的消息*/
		private onRoleTeamInfo(optcode: number, msg: hanlder.s2c_set_role_team_info): void {
			let teaminfo: TeamOctetsVo = new TeamOctetsVo();
			teaminfo.teamid = msg.teamid;
			teaminfo.normalnum = msg.teamnormalnum
			teaminfo.teamindexstate = (msg.teamindex << 4) + msg.teamstate;//将teamindex第几个成员，teamstate在队伍中的状态
			teaminfo.hugindex = 0;
			let role: RoleBasicVo = SceneModel.getInstance().rolelist.get(msg.roleid);
			if (role) {
				if (msg.teamid == 0) {//队伍ID为零则为离开队伍
					role.rolebasicOctets.datas.remove(2);//2为队伍key 移除队伍信息
				}
				else {
					role.rolebasicOctets.datas.set(2, teaminfo);//添加队伍信息
				}
			}
			this.event(TEAM_STATE)
		}
		// 服务端发送回合制战斗脚本
		private onSSendRoundScript(optcode: number, msg: hanlder.S2C_SSendRoundScript): void {
			console.log("SceneProxy onSSendRoundScript:", msg);

		}
		private onSSendRoundPlayEnd(optcode: number, msg: hanlder.s2c_SSendRoundPlayEnd): void {


		}
		private onSSendRoundStart(optcode: number, msg: hanlder.s2c_SSendRoundStart): void {


		}
		private onSBuffChangeResult(optcode: number, msg: hanlder.s2c_SBuffChangeResult): void {


		}
		private onSRefreshNaiJiu(optcode: number, msg: hanlder.S2C_SRefresh_NaiJiu): void {


		}
		private onSRspRoleInfo(optcode: number, msg: hanlder.S2C_SRspRoleInfo): void {


		}
		private onSRefreshCurrency(optcode: number, msg: hanlder.S2C_SRefresh_Currency): void {


		}
		private onSSendBattleEnd(optcode: number, msg: hanlder.s2c_SSendBattleEnd): void {


		}
	}
}