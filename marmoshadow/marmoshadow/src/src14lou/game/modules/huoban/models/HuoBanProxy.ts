/**
* 伙伴
*/
module game.modules.huoban.models {
	/**伙伴信息*/
	export const HUOBANLIST_EVENT: string = "huobanlist_event";
	/**伙伴阵容*/
	export const ZHENRONG_EVENT: string = "zhenrong_event";
	/**伙伴详情*/
	export const HUOBANDETAIL_EVENT: string = "huobandetail_event";
	/**伙伴解锁*/
	export const HUOBANJIESUO_EVENT: string = "huobanjiesuo_event";
	/**界面更换*/
	export const JIEMIANCHANGE_EVENT: string = "jiemainchange_event";
	/**上阵提示*/
	export const SHANGZHENTISHI_EVENT: string = "shangzhentishi_event";
	/**更换阵容*/
	export const SWITCHCHANGE_EVENT: string = "swtichchange_event";
	/**打开阵法*/
	export const OPENZHENFA_EVENT: string = "openzhenfa_event";
	export class HuoBanProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			HuoBanProxy._instance = this;
			this.addNetworkListener();
			Laya.loader.load("common/data/temp/npc.cherobaseinfo.bin", Handler.create(this, this.onloadedcHeroBaseInfoComplete), null, Loader.BUFFER);
			//CFriendSkill
			Laya.loader.load("common/data/temp/skill.cfriendskill.bin", Handler.create(this, this.onloadedFriendSkillComplete), null, Loader.BUFFER);
			//battlemagic 最终位置为在队伍中读取
			Laya.loader.load("common/data/temp/battle.cformationbaseconfig.bin", Handler.create(this, this.onloadedFormationbaseConfigBaseVoComplete), null, Loader.BUFFER);
			//克制 CFormationRestrain
			Laya.loader.load("common/data/temp/battle.cformationrestrain.bin", Handler.create(this, this.onloadedFormationRestrainBaseVoComplete), null, Loader.BUFFER);
			//team.czhenfaeffect
			Laya.loader.load("common/data/temp/team.czhenfaeffect.bin", Handler.create(this, this.onloadedZhenFaEffectComplete), null, Loader.BUFFER);
		}
		public addNetworkListener(): void {
			/**获取伙伴信息*/
			Network._instance.addHanlder(ProtocolsEnum.SHuobanList, this, this.refrehuoban);
			/**刷新阵容*/
			Network._instance.addHanlder(ProtocolsEnum.SZhenrongInfo, this, this.refrezhenrong);
			;/**伙伴增加*/
			Network._instance.addHanlder(ProtocolsEnum.SChangeZhenrong, this, this.add)
			/**伙伴详情*/
			Network._instance.addHanlder(ProtocolsEnum.SHuobanDetail, this, this.huobandetail);
			/**伙伴解锁*/
			Network._instance.addHanlder(ProtocolsEnum.SActiveHuoBan, this, this.huobanjiesuo);
			/**更改阵法*/
			Network._instance.addHanlder(ProtocolsEnum.SSwitchZhenfa, this, this.switchchangezhenfa);
			/**打开阵法*/
			Network._instance.addHanlder(ProtocolsEnum.SFormationsMap, this, this.openzhenfa);
		}
		//z光环效果配置表
		onloadedZhenFaEffectComplete(): void {
			console.log("ZhenFaEffect表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/team.czhenfaeffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, HuoBanModel.getInstance().ZhenFaEffectData, game.data.template.ZhenFaEffectBaseVo, "id");
			//console.log("ZhenFaEffect.configData:",this.ZhenFaEffectData);
		}
		onloadedFormationRestrainBaseVoComplete(): void {
			console.log("cformationrestrain 表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cformationrestrain.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, HuoBanModel.getInstance().FormationRestrainData, game.data.template.FormationRestrainBaseVo, "id");
			// console.log("cformationrestrain.configData:",this.FormationRestrainData);
		}
		onloadedFormationbaseConfigBaseVoComplete(): void {
			console.log("cformationbaseconfig 表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cformationbaseconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, HuoBanModel.getInstance().FormationbaseConfigData, game.data.template.FormationbaseConfigBaseVo, "id");
			//  console.log("cformationbaseconfig.configData:",HuoBanModel.getInstance().FormationbaseConfigData);
		}
		onloadedFriendSkillComplete(): void {
			console.log("FriendSkillData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cfriendskill.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, HuoBanModel.getInstance().friendSkillData, game.data.template.FriendSkillBaseVo, "id");
			//	console.log("FriendSkillData:", this.friendSkillData);
		}
		onloadedcHeroBaseInfoComplete(): void {
			console.log("CHeroBaseInfo-h伙伴系统/h伙伴信息配置表 completed1");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cherobaseinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, HuoBanModel.getInstance().cheroBaseInfoData, game.data.template.CHeroBaseInfoBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.cheroBaseInfoData);
		}
		/**打开阵法*/
		public openzhenfa(optcode: number, msg: hanlder.S2C_formations_map): void {
			console.log(msg.formationMap.keys);
			for (let p in msg.formationMap.keys) {
				if (msg.formationMap.get(msg.formationMap.keys[p])) {
					LoginModel.getInstance().roleDetail.learnedFormsMap.set(msg.formationMap.keys[p], msg.formationMap.get(msg.formationMap.keys[p]));
				}
			}
			models.HuoBanProxy.getInstance().event(OPENZHENFA_EVENT);
		}
		/**伙伴详情*/
		public huobandetail(optcode: number, msg: hanlder.S2C_SHuoban_Detail): void {
			console.log("伙伴信息：" + msg.huoban);
			HuoBanModel.getInstance().huobandetail = msg.huoban;
			models.HuoBanProxy.getInstance().event(HUOBANDETAIL_EVENT);
		}
		/**伙伴解锁*/
		public huobanjiesuo(optcode: number, msg: hanlder.S2C_SActive_HuoBan): void {
			for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
				if (HuoBanModel.getInstance().huobaninfo[index].huobanID == msg.huobanId) {//是否有该伙伴
					if (msg.state == 1) {//是否永久
						HuoBanModel.getInstance().huobaninfo[index].state = 1;
						HuoBanModel.getInstance().huobandetail.state = 1;
					}
					else {
						HuoBanModel.getInstance().huobaninfo[index].state = (msg.state - 10) * 60;
						HuoBanModel.getInstance().huobandetail.state = (msg.state - 10) * 60;
					}
					HuoBanModel.getInstance().huobandetail.weekfree = 0;
					HuoBanModel.getInstance().huobaninfo[index].weekfree = 0;
					break;
				}
			}
			models.HuoBanProxy.getInstance().event(HUOBANJIESUO_EVENT);
		}
		/**伙伴增加*/
		public add(optcode: number, msg: hanlder.S2C_SChange_Zhenrong): void {
			console.log("更新后阵容：" + msg.huobanlist);
			let info: game.modules.huoban.models.ZhenrongInfoVo = new game.modules.huoban.models.ZhenrongInfoVo();
			info.zhenfa = msg.zhenfa;
			info.huobanlist = msg.huobanlist;
			switch (msg.reason) {//更新原因 1-系统第一次自动更新 2-光环更新 3-参战伙伴更新 4-伙伴阵容切换
				case 1:
					break;
				case 2:
					break;
				case 3:
					HuoBanModel.getInstance().currentzrid = msg.zhenrong;//当前阵容
					break;
				case 4:
					HuoBanModel.getInstance().zhenrongid = msg.zhenrong;//选择阵容
					break;
				case 5:
					HuoBanModel.getInstance().currentzrid = msg.zhenrong;//当前阵容
					break;
				default:
					break;
			}
			HuoBanModel.getInstance().reason = msg.reason;
			HuoBanModel.getInstance().zrhuobanlist[msg.zhenrong] = info;
			if (HuoBanModel.getInstance().huobaninfo.length != 0) {
				for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
					HuoBanModel.getInstance().huobaninfo[index].infight = 0;
				}
				for (var index = 0; index < info.huobanlist.length; index++) {
					HuoBanModel.getInstance().huobaninfo[info.huobanlist[index] - 40000].infight = 1;
				}
			}
			models.HuoBanProxy.getInstance().event(ZHENRONG_EVENT);
		}
		/**刷新阵容*/
		public refrezhenrong(optcode: number, msg: hanlder.S2C_SZhenrong_Info): void {
			HuoBanModel.getInstance().zhenrongid = msg.dangqianzhenrong;
			HuoBanModel.getInstance().currentzrid = msg.dangqianzhenrong;
			HuoBanModel.getInstance().zrhuobanlist = msg.zhenrongxinxi;
			if (msg.zhenrongxinxi[msg.dangqianzhenrong]) {
				if (HuoBanModel.getInstance().huobaninfo.length != 0) {
					for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
						HuoBanModel.getInstance().huobaninfo[index].infight = 0;
					}
					for (var index = 0; index < msg.zhenrongxinxi[msg.dangqianzhenrong].huobanlist.length; index++) {
						HuoBanModel.getInstance().huobaninfo[msg.zhenrongxinxi[msg.dangqianzhenrong].huobanlist[index] - 40000].infight = 1;
					}
				}
			}
			models.HuoBanProxy.getInstance().event(ZHENRONG_EVENT);
		}
		/**获取伙伴信息*/
		public refrehuoban(optcode: number, msg: hanlder.S2C_SHuoban_List): void {
			HuoBanModel.getInstance().huobaninfo = msg.huobans;
			console.log(HuoBanModel.getInstance().huobaninfo);
			models.HuoBanProxy.getInstance().event(HUOBANLIST_EVENT);
		}
		/**更换阵法 */
		public switchchangezhenfa(optcode: number, msg: hanlder.S2C_SSwitch_Zhenfa): void {
			if (HuoBanModel.getInstance().zrhuobanlist[msg.zhenrongid]) {//阵容列表是否有该阵容
				HuoBanModel.getInstance().zrhuobanlist[msg.zhenrongid].zhenfa = msg.zhenfaid;
			}
			else {
				HuoBanModel.getInstance().currentzf[msg.zhenrongid] = msg.zhenfaid;
				HuoBanModel.getInstance().currentzr = msg.zhenrongid;
			}
			models.HuoBanProxy.getInstance().event(SWITCHCHANGE_EVENT);
		}
		private static _instance: HuoBanProxy;
		public static getInstance(): HuoBanProxy {
			if (!this._instance) {
				this._instance = new HuoBanProxy();
			}
			return this._instance;
		}
	}
}