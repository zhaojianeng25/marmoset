module battle {
	export class BattlePage extends game.gui.base.Page {
		get view(): ui.common.MainBattleUI {
			return this._view;
		}
		private battle: Battle;
		private petBattleUI: game.modules.commonUI.PetBattleChangeMediator;
		/** 聊天记录信息 */
		private chatData: Array<any> = [];
		/** 聊天界面 */
		private ChatViewMediator: game.modules.chat.ChatViewMediator;
		/** 挂机辅助界面 */
		private _guaJiFuZhuMediator: game.modules.guaji.GuaJiFuZhuMediator;
		/** 上条记录信息 */
		private lastImg: Laya.Image;
		private app: AppBase;
		/** 特技 */
		private equipStunt: boolean = false;
		/** buff数据 */
		private buff: Laya.Dictionary = new Laya.Dictionary;
		/** 阵法效果 */
		private effect = [];
		/**装备附加属性库by skill */
		equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
		/**t特技特效显示表 */
		equipSkillData = game.modules.tips.models.TipsModel._instance.equipSkillData;
		/** 操作返回是否显示技能列表 */
		public show_skill_list: boolean = false;
		constructor(app: AppBase, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(app, onOpenFunc, onCloseFunc);
			this.battle = app.battleProxy.battle;

			this._asset = [
				game.Path.atlas_ui + "mainhud.atlas",
				game.Path.atlas_ui + "hud_zhandou.atlas",
				game.Path.atlas_ui + "tongyong.atlas",
			];
			this.app = app;
			this.ChatViewMediator = new game.modules.chat.ChatViewMediator(this.app);
			this.petBattleUI = new game.modules.commonUI.PetBattleChangeMediator(this._app);
			this._guaJiFuZhuMediator = game.modules.guaji.GuaJiFuZhuMediator.getInstance(this._app);
		}

		// 页面初始化函数
		protected init(): void {
			this._view = new ui.common.MainBattleUI();
			this.addChild(this.view);
			this.bindListener();
			/** 人物属性信息刷新 */
			this.updateRoleAttr();
			/** 宠物属性刷新 */
			this.updatePetAttr();
			/** 刷新我方阵法信息 */
			this.updateZhenfa(ZhenFaType.FRIEND_ZHENFA);
			/** 敌方阵法 */
			this.updateZhenfa(ZhenFaType.ENEMY_ZHENFA);
		}

		private bindListener(): void {
			this.view.closeMain_btn.on(Laya.Event.CLICK, this, this.clickCloseMain);
			this.view.showMain_btn.on(Laya.Event.CLICK, this, this.clickShowMain);
			this.view.mainFriend_btn.on(Laya.Event.CLICK, this, this.showMainBtnEvent, [ModuleNames.FRIEND]);
			this.view.mainRoleAvatar.on(LEvent.CLICK, this, this.clickMainRoleAvatar);
			this.view.mainPetAvatar.on(LEvent.CLICK, this, this.clickMainPetAvatar);
			this.view.mainCatch_btn.on(Laya.Event.CLICK, this, this.clickMaincatch);
			this.view.mainRunAway_btn.on(Laya.Event.CLICK, this, this.clickMainrunaway);
			this.view.mainCall_btn.on(Laya.Event.CLICK, this, this.clickMaincall);
			this.view.mainProtect_btn.on(Laya.Event.CLICK, this, this.clickMainprotect, [1]);
			this.view.mainDefense_btn.on(Laya.Event.CLICK, this, this.clickMaindefense);
			this.view.mainMagic_btn.on(Laya.Event.CLICK, this, this.clickMainmagic, [OperateRoleType.Role]);
			this.view.mainStunt_btn.on(Laya.Event.CLICK, this, this.clickMainstunt);
			this.view.mainAttack_btn.on(Laya.Event.CLICK, this, this.clickMainattack);
			this.view.auto_btn.on(Laya.Event.CLICK, this, this.clickAuto);
			this.view.petRunAway_btn.on(Laya.Event.CLICK, this, this.clickMainrunaway);
			this.view.petProtect_btn.on(Laya.Event.CLICK, this, this.clickMainprotect, [6]);
			this.view.petDefense_btn.on(Laya.Event.CLICK, this, this.clickMaindefense);
			this.view.petMagic_btn.on(Laya.Event.CLICK, this, this.clickMainmagic, [OperateRoleType.Pet]);
			this.view.petAttack_btn.on(Laya.Event.CLICK, this, this.clickMainattack);
			this.view.petProp_btn.on(Laya.Event.CLICK, this, this.clickMainprop);
			this.view.opera_back_btn.on(Laya.Event.CLICK, this, this.clickOpera_back);
			this.view.auto_cancel_btn.on(Laya.Event.CLICK, this, this.clickAuto_cancel);
			this.view.mainChat_btn.on(Laya.Event.CLICK, this, this.clickMainChat);
			this.view.mainProp_btn.on(LEvent.CLICK, this, this.openBattleBag, [OperateRoleType.Role]);
			this.view.petProp_btn.on(LEvent.CLICK, this, this.openBattleBag, [OperateRoleType.Pet]);
			this.view.mainChatset_btn.on(LEvent.CLICK, this, this.opChatSet);//聊天频道设置
			this.view.pet_attack_checkbox.clickHandler = new Laya.Handler(this, this.setPetAttack);
			this.view.pet_defence_checkbox.clickHandler = new Laya.Handler(this, this.setPetDefence);
			/** 以下在菜单栏中显示 */
			this.view.mainBag_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.BAG]);
			this.view.mainRank_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.RANKING_LIST]);
			this.view.mainHuoBan_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.HUOBAN]);
			this.view.mainSkill_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.SKILL]);
			this.view.mainActive_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.ACTIVITY]);
			this.view.mainFamily_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.Family]);
			this.view.mainStreng_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.STRENG_THENING]);
			this.view.mainSet_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.SystemSetting]);
			this.view.mainShop_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.SHOP]);
			this.view.mainTeam_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.Team]);
			this.view.mainGuide_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.ACHIEVENT]);
			this.view.mainGuaJi_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.GUA_JI]);
			this.view.mainTask_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.TASK]);
			this.view.mainReward_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.REWARD]);
			this.view.mainHongBao_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.RED_PACKET]);
			this.view.mainPaiMai_btn.on(LEvent.CLICK, this, this.showMainBtnEvent, [ModuleNames.SALE]);
			/** 响应事件 */
			game.modules.chat.models.ChatProxy.getInstance().on(game.modules.chat.models.SYS_MSG_IN_CHANNEL, this, this.onGetChatData);
			//消息事件监听
			game.modules.guaji.models.GuaJiProxy.getInstance().on(game.modules.guaji.models.GET_AUTOFIGHTAI_DATA, this, this.showGuaJiFuzhu);
			game.modules.guaji.models.GuaJiProxy.getInstance().on(game.modules.guaji.models.ROLE_SKILL_IMG_CHANGE, this, this.showAutoBattle);
			// NotifyMgr.register(NotifyType.AutoBattleSkillChange, this, this.showAutoBattle);

		}
		/** 回合数 */
		private round_num: ClipNum;
		/** 倒计时 */
		private round_delay_num: ClipNum;
		/** 自动三秒倒计时 */
		private auto_round_delay_num: ClipNum;
		// 页面打开时执行函数
		protected onOpen(): void {
			super.onOpen();

			this.round_num = new ClipNum("ui/hud_zhandou/round.png", 292, 31);
			this.view.round_box.addChild(this.round_num);
			this.round_delay_num = new ClipNum("ui/hud_zhandou/round_delay.png", 393, 48);
			this.view.round_delay_box.addChild(this.round_delay_num);
			this.setRound(this.battle._cur_round);
			this.view.round_delay_box.visible = false;
			this.view.skill_list.array = [];

			this.view.wait_flag.visible = false;
			if( !this.battle.isWatch )this.JudgingAutoMatically();
			this.hideOpera();
			this.clickCloseMain();
			this.battle.onBattlePageInitSuccess(this);

		}

		//页面关闭函数
		public close(): void {
			super.close();
			this.battle = null;
			game.modules.chat.models.ChatProxy.getInstance().off(game.modules.chat.models.SYS_MSG_IN_CHANNEL, this, this.onGetChatData);
			//消息事件监听
			game.modules.guaji.models.GuaJiProxy.getInstance().off(game.modules.guaji.models.GET_AUTOFIGHTAI_DATA, this, this.showGuaJiFuzhu);
			game.modules.guaji.models.GuaJiProxy.getInstance().off(game.modules.guaji.models.ROLE_SKILL_IMG_CHANGE, this, this.showAutoBattle);

		}
		/** 显示buffer 
		 * @param fightmodel 模型
		*/
		showBuffer(fightmodel: FightModel): void {
			let buffer = fightmodel.buffs;

			this.view.buff_img.visible = true;
			this.view.buff_img.height = 150;
			this.view.buff_list.x = 49;
			this.view.buff_list.y = 110;
			this.view.buff_list.visible = true;
			this.view.attr_box.visible = false;
			/** 门派设置 */
			this.view.school_img.visible = false;
			this.view.npcname_lab.x = 40;
			let baseId = fightmodel.dataID;
			if (typeof buffer != "undefined" && buffer.keys.length != 0) {
				this.ongetBuff(this.view.buff_list, buffer);
				let len = buffer.keys.length;
				this.view.buff_img.height = this.view.buff_img.height + len * 80;
			} else {
				this.view.buff_list.visible = false;
			}
			if (fightmodel.fighterType == FighterType.FIGHTER_PET) {/** 宠物 */
				this.view.npcname_lab.text = fightmodel.fighterName;
				this.view.attr_box.visible = true;
				this.view.anger_box.visible = false;
				this.view.buff_list.y += 30;
				this.view.buff_img.height += 30;
				this.dealAttr(fightmodel);
			} else if (fightmodel.fighterType == FighterType.FIGHTER_ROLE) {/** 角色 */
				this.view.npcname_lab.text = fightmodel.fighterName;
				this.view.school_img.visible = true;
				this.view.attr_box.visible = true;
				this.view.anger_box.visible = true;
				this.view.npcname_lab.x += 30;
				this.view.buff_list.y += 60;
				this.view.buff_img.height += 60;
				this.dealAttr(fightmodel);
			} else if (fightmodel.fighterType == FighterType.FIGHTER_PARTNER) {
				let huobanbaseinfo: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[baseId];
				this.view.npcname_lab.text = huobanbaseinfo.name;
				this.view.school_img.visible = true;
				this.view.npcname_lab.x += 30;
				let detailinfo: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[fightmodel.dataID] as CHeroBaseInfoBaseVo;
				let schoolImgUrl = game.modules.team.models.TeamModel.getInstance().getSchoolImgBack(detailinfo.school);
				this.view.school_img.skin = schoolImgUrl;
			} else {
				let data = game.modules.guaji.models.GuaJiModel._instance.monstersDic[baseId];
				this.view.npcname_lab.text = data.name;
			}

		}
		/** 处理属性 */
		private dealAttr(fightmodel: FightModel): void {

			this.view.life_lab.text = fightmodel.hp + "/" + fightmodel.maxhp;
			if (fightmodel.is_self_role) {
				var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;//人物信息
				this.view.magic_lab.text = fightmodel.mp + "/" + roleDetail.maxmp;	//人物蓝条
				let school = LoginModel.getInstance().roleDetail.school;
				let schoolImgUrl = game.modules.team.models.TeamModel.getInstance().getSchoolImgBack(school);
				this.view.school_img.skin = schoolImgUrl;
				this.view.anger_lab.text = roleDetail.sp + "/" + roleDetail.maxsp;
			} else if (fightmodel.is_pet) {
				let petinfo: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(_LoginModel.getInstance().roleDetail.petIndex);
				this.view.magic_lab.text = fightmodel.mp + "/" + petinfo.maxmp;//宠物蓝条
			}

		}
		/** buff list */
		private ongetBuff(list: Laya.List, buffer: Laya.Dictionary): void {
			this.buff = buffer;
			list.vScrollBarSkin = "";
			list.scrollBar.elasticBackTime = 200;
			list.scrollBar.elasticDistance = 50;
			list.array = this.buff.keys;
			list.repeatY = this.buff.keys.length;
			list.renderHandler = new Handler(this, this.onRenderListItemOfBuff);
			// list.selectHandler = new Handler(this,this.onSelcetOfBagGameItem);
		}
		/** buff数据渲染 */
		private onRenderListItemOfBuff(cell: Box, index: number): void {
			if (index > this.buff.keys.length - 1 || index < 0) return;
			let buff_icon = cell.getChildByName("buff_icon") as Laya.Image;
			let buffname_lab = cell.getChildByName("buffname_lab") as Laya.Label;
			let buffdesc_lab = cell.getChildByName("buffdesc_lab") as Laya.Label;
			let buffdata = this.battle.battleProxy.BuffConfigData[this.buff.keys[index]];
			let value = this.buff.get(this.buff.keys[index]);
			let huihe;
			if (value == 0) huihe = "无限";
			else huihe = value + "回合";
			buff_icon.skin = "common/icon/skill/" + buffdata.shapeid + ".png";
			buffname_lab.text = buffdata.strshowname + " " + huihe;
			buffdesc_lab.text = buffdata.strshowname;
		}
		/** 技能->包含宠物和人物 */
		private skills: Array<any> = []; //game.data.template.SchoolSkillitemBaseVo
		/** 自动的宠物技能 */
		private autoPetSkills: Array<any> = [];
		private onSkillRender(cell: Laya.Box, index: number): void {
			const icon = cell.getChildByName("skill_icon") as Laya.Image;
			const name = cell.getChildByName("skill_name") as Laya.Label;
			let operaterole = this.battle.cur_operate_role_type;
			const skill = this.skills[index];
			if (typeof (skill) == "undefined") {
				icon.loadImage("");
				name.text = "";
				return;
			}
			else if (operaterole === OperateRoleType.Role && this.equipStunt) {/** 人物特技选择 */
				let skillid = skill.tips.skill;
				var color = this.equipAddattributelibDataBySkill[skillid].namecolour;
				var skillicon = this.equipSkillData[skillid].icon;
				let skillName = this.equipAddattributelibDataBySkill[skillid].name;//两个里名称不一致要不就是这里面的名称-> this.equipSkillData[skillid].name 
				icon.loadImage("common/icon/skill/" + skillicon + ".png");
				name.text = skillName;
				name.color = color;
				icon.off(LEvent.CLICK, this, this.onSkillCellSelect);
				icon.on(LEvent.CLICK, this, this.onSkillCellSelect, [index]);
				let str = this.equipSkillData[skillid].cost;
				let costnum = this.equipSkillData[skillid].costnum;
				str = str.replace("$parameter1$", costnum);//消耗	
				let describe: string = this.equipSkillData[skillid].describe;
				describe = describe.substring(40, (describe.length - 7));
				// icon.on(LEvent.RIGHT_CLICK,this,this._onshowskillDetail,[skillicon,skillName,-1,str,describe]);
				//长按事件
				icon.on(LEvent.MOUSE_DOWN, this, () => {
					let up_flag = true;
					icon.on(LEvent.MOUSE_UP, this, () => { up_flag = false; });
					Laya.timer.once(1000, this, () => {
						if (up_flag) this._onshowskillDetail(skillicon, skillName, -1, str, describe);
					});
				});
			}
			else if (operaterole === OperateRoleType.Role) {/** 人物技能 */
				icon.loadImage("common/icon/skill/" + skill.normalIcon + ".png");
				name.text = skill.skillname;
				icon.off(LEvent.CLICK, this, this.onSkillCellSelect);
				icon.on(LEvent.CLICK, this, this.onSkillCellSelect, [index]);
				let level = game.modules.skill.models.SkillModel.getInstance().skillLevelDic.get(skill.id);
				let cost = Math.floor(level * skill["paramA"] + skill["paramB"]);//消耗数值
				let str = skill["costA"];
				str = str.replace("$parameter1$", cost);//消耗	
				let desc = skill.skilldescribe;
				// icon.on(LEvent.RIGHT_CLICK,this,this._onshowskillDetail,[skill.normalIcon,skill.skillname,level,str,desc]);
				//长按事件
				icon.on(LEvent.MOUSE_DOWN, this, () => {
					let up_flag = true;
					icon.on(LEvent.MOUSE_UP, this, () => { up_flag = false; });
					Laya.timer.once(1000, this, () => {
						if (up_flag) this._onshowskillDetail(skill.normalIcon, skill.skillname, level, str, desc);
					});
				});
			} else if (operaterole === OperateRoleType.Pet) {/** 宠物技能 */
				let petskill: PetSkillConfigBaseVo = PetModel.getInstance().petSkillConfigData[skill.skillId] as PetSkillConfigBaseVo;
				icon.loadImage("common/icon/skill/" + petskill.icon + ".png");
				name.text = petskill.skillname;
				icon.on(LEvent.CLICK, this, this.onSkillCellSelect, [index]);
				let describe: string = petskill.skilldescribe;
				describe = describe.substring(40, (describe.length - 7));
				//长按事件
				icon.on(LEvent.MOUSE_DOWN, this, () => {
					let up_flag = true;
					icon.on(LEvent.MOUSE_UP, this, () => { up_flag = false; });
					Laya.timer.once(1000, this, () => {
						if (up_flag) this._onshowskillDetail(petskill.icon, petskill.skillname, -1, petskill.param, describe);
					});
				});
				// icon.on(LEvent.RIGHT_CLICK,this,this._onshowskillDetail,[petskill.icon,petskill.skillname,-1,petskill.param,describe]);
			}
		}
		/** 技能详情 
		 * @param icon 图标 @param skillname 技能名称 @param level 等级 @param cost 消耗 @param desc 描述
		*/
		private _onshowskillDetail(icon: number, skillname: string, level: number, cost: string, desc: string): void {
			if (!this.view) return;
			if (!this.view.ski_detail_img.visible) this.view.ski_detail_img.visible = true;
			this.view.skill_icon.skin = "common/icon/skill/" + icon + ".png";
			if (level != -1) {
				this.view.ski_level_box.visible = true;
				this.view.ski_level_lab.text = level.toString();
			} else this.view.ski_level_box.visible = false;
			this.view.ski_cost_lab.text = cost;
			this.view.ski_describ_lab.text = desc;
			this.view.ski_name_lab.text = skillname;
			this.view.ski_detail_img.on(LEvent.CLICK, this, this.hidePartUI);
		}
		/** 判断隐藏技能详情ui */
		private hidePartUI(): void {
			this.view.ski_detail_img.visible = false;
			if (!this.view.skill_list_bg.visible) this.view.skill_list_bg.visible = true;
		}
		/** 渲染自动宠物战斗技 */
		private onAutoSkillRender(cell: Laya.Box, index: number): void {
			let hookBattleData = game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData;
			const skill = this.autoPetSkills[index];
			const icon = cell.getChildByName("skill_icon") as Laya.Image;
			const name = cell.getChildByName("skill_name") as Laya.Label;
			const skillbox = cell.getChildByName("skill_cbox") as Laya.CheckBox;
			if (skill.skillId == hookBattleData.petopid) {
				skillbox.selected = true;
			} else skillbox.selected = false;
			skillbox.clickHandler = new Laya.Handler(this, this.clickSkillBox, [skill.skillId]);
			let petskill: PetSkillConfigBaseVo = PetModel.getInstance().petSkillConfigData[skill.skillId] as PetSkillConfigBaseVo;
			icon.loadImage("common/icon/skill/" + petskill.icon + ".png");
			name.text = petskill.skillname;
			// icon.on(LEvent.CLICK,this,this.onSkillCellSelect,[index]);
		}
		/** 自动战斗宠物技能点击 */
		private clickSkillBox(skillid: number): void {
			RequesterProtocols._instance.c2s_CSetPetOpt(GuaJiOpeType.FIRESKILL, skillid);
			game.modules.guaji.models.GuaJiModel._instance.hookBattleData.petoptype = GuaJiOpeType.FIRESKILL;
			game.modules.guaji.models.GuaJiModel._instance.hookBattleData.petopid = skillid;
			this.getAutoPetSkill();
			this.showAutoBattle([]);
			this.view.pet_attack_checkbox.selected = false;
			this.view.pet_defence_checkbox.selected = false;
		}
		/** 设置自动宠物攻击 */
		private setPetAttack(): void {
			RequesterProtocols._instance.c2s_CSetPetOpt(GuaJiOpeType.ATTACK, 0);
			game.modules.guaji.models.GuaJiModel._instance.hookBattleData.petoptype = GuaJiOpeType.ATTACK;
			game.modules.guaji.models.GuaJiModel._instance.hookBattleData.petopid = 0;
			this.getAutoPetSkill();
			this.showAutoBattle([]);
		}
		/** 设置自动宠物防御 */
		private setPetDefence(): void {
			RequesterProtocols._instance.c2s_CSetPetOpt(GuaJiOpeType.DEFENSE, 0);
			game.modules.guaji.models.GuaJiModel._instance.hookBattleData.petoptype = GuaJiOpeType.DEFENSE;
			game.modules.guaji.models.GuaJiModel._instance.hookBattleData.petopid = 0;
			this.getAutoPetSkill();
			this.showAutoBattle([]);
		}
		/** 挂机辅助 */
		private showGuaJiFuzhu(data: Array<any>): void {
			this._guaJiFuZhuMediator.onShow(data);
		}

		/** 选中技能或特技 */
		private onSkillCellSelect(index: number): void {
			let skill;
			if (this.battle.cur_operate_role_type === OperateRoleType.Role && this.equipStunt) //主角特技
			{
				let skillid = this.skills[index].tips.skill;
				skill = this.equipSkillData[skillid];
				this.battle.selectEquipStunt(skill);
				let skillName = this.equipAddattributelibDataBySkill[skillid].name;
				this.showBackOperate(skillName);
			}
			else if (this.battle.cur_operate_role_type === OperateRoleType.Role) //主角技能
			{
				skill = this.skills[index];
				this.battle.selectSkill(skill);
				//使用技能时存储该技能
				HudModel.getInstance().battleSkill = skill;

				this.showBackOperate(skill.skillname);
			} else if (this.battle.cur_operate_role_type === OperateRoleType.Pet)//宠物技能
			{
				skill = PetModel.getInstance().petSkillConfigData[this.skills[index].skillId] as PetSkillConfigBaseVo;
				this.battle.selectSkill(skill);
				//使用技能时存储该技能
				HudModel.getInstance().battleSkill_pet = skill;
				this.showBackOperate(skill.skillname);
			} else return;
			this.show_skill_list = true;
		}

		private clickCloseMain(): void {
			this.view.battleMain_box.visible = false;
			this.view.showMain_btn.visible = true;
		}
		private clickShowMain(): void {
			this.view.battleMain_box.visible = true;
			this.view.showMain_btn.visible = false;
			this.sortMainBtnAndEvent();
		}
		/** 功能按钮的实现 */
		private sortMainBtnAndEvent(): void {
			this.view.mainBag_btn.pos(20, 10);
			/** 调整的位置 */
			let posArray = [];
			/** 调整的按钮 */
			let btnarr = [];
			this.hideMainBtn();
			let levelNum = HudModel.getInstance().levelNum;
			//排行按钮,等级触发31，任务完成 180176
			if (levelNum >= unlock.PAIHANG_LEVEL) {
				this.view.mainRank_btn.visible = true;
				if (posArray.length != 0) btnarr.push(this.view.mainRank_btn)
			} else posArray.push([120, 10])
			//助战按钮,等级触发17，任务完成 180176
			if (levelNum >= unlock.ZHUZHAN_LEVEL) {
				this.view.mainHuoBan_btn.visible = true;
				if (posArray.length != 0) {
					btnarr.push(this.view.mainHuoBan_btn)
					posArray.push([220, 10])
				}
			} else posArray.push([220, 10])
			//技能
			if (levelNum >= unlock.SKILL_LEVEL) {
				this.view.mainSkill_btn.visible = true;
				if (posArray.length != 0) {
					btnarr.push(this.view.mainSkill_btn)
					posArray.push([320, 10])
				}
			} else posArray.push([320, 10])
			//活动按钮,等级触发19
			if (levelNum >= unlock.ACTIVITY_LEVEL) {
				this.view.mainActive_btn.visible = true;
				if (posArray.length != 0) {
					btnarr.push(this.view.mainActive_btn)
					posArray.push([20, 110])
				}
			} else posArray.push([20, 110])
			//帮派按钮,等级触发16，任务完成 180163
			if (levelNum >= unlock.BANGPAI_LEVEL) {
				this.view.mainFamily_btn.visible = true;
				if (posArray.length != 0) {
					btnarr.push(this.view.mainFamily_btn)
					posArray.push([120, 110])
				}
			} else posArray.push([120, 110])
			//强化按钮,等级触发32，任务完成 180176
			if (levelNum >= unlock.QIANGHUA_LEVEL) {
				this.view.mainStreng_btn.visible = true;
				if (posArray.length != 0) {
					btnarr.push(this.view.mainStreng_btn)
					posArray.push([220, 110])
				}
			} else posArray.push([220, 110])
			if (posArray.length != 0) {
				posArray.push([320, 110]);
				btnarr.push(this.view.mainSet_btn)
				posArray.push([20, 210])
				btnarr.push(this.view.mainShop_btn)
				posArray.push([120, 210])
				btnarr.push(this.view.mainTeam_btn)
				posArray.push([220, 210])
				btnarr.push(this.view.mainGuide_btn)
			}
			//挂机按钮,等级触发25，任务完成 180176
			if (levelNum >= unlock.GUAJI_LEVEL) {
				this.view.mainGuaJi_btn.visible = true;
				if (posArray.length != 0) {
					btnarr.push(this.view.mainGuaJi_btn)
					posArray.push([320, 210])
				}
			} else posArray.push([320, 210])
			if (posArray.length != 0) {
				posArray.push([20, 310])
				btnarr.push(this.view.mainTask_btn)
				posArray.push([120, 310])
				btnarr.push(this.view.mainReward_btn)
				posArray.push([220, 310])
				btnarr.push(this.view.mainHongBao_btn)
				posArray.push([320, 310])
				btnarr.push(this.view.mainPaiMai_btn)
			}
			for (var btnIndex = 0; btnIndex < btnarr.length; btnIndex++) {
				let btn = btnarr[btnIndex] as Laya.Button;
				btn.x = posArray[btnIndex][0];
				btn.y = posArray[btnIndex][1];
			}
		}


		private hideMainBtn(): void {
			this.view.mainSkill_btn.visible = false;
			this.view.mainFamily_btn.visible = false;
			this.view.mainHuoBan_btn.visible = false;
			this.view.mainActive_btn.visible = false;
			this.view.mainGuaJi_btn.visible = false;
			this.view.mainRank_btn.visible = false;
			this.view.mainStreng_btn.visible = false;
		}
		/** 显示人物属性 */
		private clickMainRoleAvatar(): void {
			ModuleManager.show(ModuleNames.ROLE_Info, this.app);
		}
		/** 显示宠物属性 */
		private clickMainPetAvatar(): void {
			ModuleManager.show(ModuleNames.PET, this.app);
		}
		/** 战斗背包
		 * @param type 操作对象 0人物 1宠物
		 */
		private openBattleBag(type: number): void {
			let BattleBagViewMediator: game.modules.bag.BattleBagViewMediator;
			BattleBagViewMediator = game.modules.bag.BattleBagViewMediator.getInstance(this._app);
			BattleBagViewMediator.onshow(type, this.battle.battledrug);
		}
		// 捕捉
		private clickMaincatch(): void {
			this.battle.mainCatch();
			this.showBackOperate("捕捉");
		}
		// 逃跑
		private clickMainrunaway(): void {
			let remindViewMediator = game.modules.commonUI.RemindViewMediator.getInstance(this.app.uiRoot.general, this.app);
			let cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
			let prompt = cstringResConfigData[Intra_ProgramString.ESCAPE_CONFIRM].msg;
			let rightBtnName = cstringResConfigData[Intra_ProgramString.ENSURE].msg;
			let leftBtnName = cstringResConfigData[Intra_ProgramString.CANCLE].msg;
			remindViewMediator.onShow(prompt, rightBtnName, leftBtnName);
			remindViewMediator.once(game.modules.commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
		}
		private clickEnSureBtnEvent(): void {
			this.battle.runaway();
		}
		// 召唤
		private clickMaincall(): void {
			let petFightNum = this.battle.battlePetKey;
			this.petBattleUI.show(petFightNum);
			this.petBattleUI.once(game.modules.commonUI.CALL_PET, this, this.summonPet);
		}
        /** 召唤监听
         * @param key 
         */
		private summonPet(key: number): void {
			this.battle.summonPet(key);
		}
		/** 保护
		 * @param cantTar 不能选中的目标
		 * */
		private clickMainprotect(cantTar: number): void {
			this.battle.protect(cantTar);
			/** 只显示我方 */
			this.battle.showSelectEffects(false);
			this.showBackOperate("保护");
		}
		// 防御
		private clickMaindefense(): void {
			this.battle.defense();
		}
        /** 法术
		 * @param type 操作对象
		 */
		private clickMainmagic(type: number): void {
			if (this.equipStunt) this.equipStunt = false;
			this.skills = [];
			if (type === OperateRoleType.Role) {
				this.skills = this._app.battleProxy.battle.skills;
			} else if (type === OperateRoleType.Pet) {
				this.skills = PetModel.getInstance().petskilllist();
			}
			this.chargeSkills(type);

		}
		/** 显示自动战斗的宠物技能窗口 */
		private showAutoPetSkill(): void {
			if (!this.view.auto_petskill_img.visible) this.view.auto_petskill_img.visible = true;
			this.getAutoPetSkill();

		}
		private getAutoPetSkill(): void {
			this.autoPetSkills = PetModel.getInstance().petskilllist();
			this.view.auto_petskill_list.vScrollBarSkin = "";
			this.view.auto_petskill_list.scrollBar.elasticBackTime = 200;
			this.view.auto_petskill_list.scrollBar.elasticDistance = 50;
			this.view.auto_petskill_list.array = this.autoPetSkills;
			this.view.auto_petskill_list.renderHandler = new Laya.Handler(this, this.onAutoSkillRender);
		}
		// 显示技能
		private showSkillPanel(): void {
			this.view.skill_list.vScrollBarSkin = "";
			this.view.skill_list.scrollBar.elasticBackTime = 200;
			this.view.skill_list.scrollBar.elasticDistance = 50;
			this.view.skill_list.array = this.skills;
			const item_list = this.view.skill_list;
			item_list.renderHandler = new Laya.Handler(this, this.onSkillRender);

		}
		// 显示已选(需要选择目标的操作才显示这个)
		public showBackOperate(name: string): void {
			this.hideOpera();
			this.view.opera_back_btn.visible = true;
			this.view.select_name.visible = true;
			this.view.select_name.text = name;
		}

		// 特技 
		private clickMainstunt(): void {
			let equipStunt = game.modules.tips.models.TipsModel.getInstance().getEquipStunt();
			this.skills = [];
			//只存放当前装备上的特技
			for (let _index = 0; _index < equipStunt.length; _index++) {
				if (equipStunt[_index].packid == BagTypes.EQUIP) {
					//特技可能出现重复
					if (this.skills.indexOf(equipStunt[_index].tips.skill) == -1)
						this.skills.push(equipStunt[_index]);
				}
			}
			if (equipStunt.length == 0 || this.skills.length == 0) {
				let promptId = PromptExplain.NO_EQUIP_STUNT;
				let prompt = HudModel.getInstance().promptAssembleBack(promptId);
				let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this.app);
				disappearMsgTips.onShow(prompt);
				return;
			}
			if (!this.equipStunt) this.equipStunt = true;
			this.chargeSkills();
		}

		// 攻击
		private clickMainattack(): void {
			this.battle.selectNormalAttack();
			this.showBackOperate("普通攻击");
		}
		// 道具
		private clickMainprop(): void {
		}
		// private is_auto:boolean;
		// 自动战斗
		private clickAuto(): void {
			//处于播放脚本状况下处理自动战斗按钮
			if (this.battle.battle_stepe == BattleStep.Play) {
				game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData.isautobattle = 1;
				this.view.auto_btn.visible = false;
				this.nextRoundManual(PromptExplain.NEXT_ROUND_AUTO);
				return;
			}
			RequesterProtocols._instance.c2s_CSetAutoBattle(1);
			this.hideOpera();
			this.judgehideSkillPanel();
			this.battle.is_auto = true;
			this.view.auto_cancel_box.visible = true;
			game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData.isautobattle = 1;
			this.showAutoBattle();

		}

		// 操作返回
		private clickOpera_back(): void {
			this.battle.clearTargetEffect();
			this.backOperate();
		}
		// 取消自动战斗
		private clickAuto_cancel(): void {
			this.battle.is_auto = false;
			this.judgehideSkillPanel();
			this.view.auto_cancel_box.visible = false;
			RequesterProtocols._instance.c2s_CSetAutoBattle(0);
			game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData.isautobattle = 0;
			this.cancleAutoOperate();
			Laya.timer.clear(this, this.setdelayNum);
		}
		/** 显示自动战斗操作
		 * @param args 自动指令填充倒计时
		 */
		public showAutoBattle(args: any = -1): void {
			this.hideOpera();
			this.battle.is_auto = true;
			this.view.auto_cancel_box.visible = true;
			/** 判断是否有出战宠物 */
			if (LoginModel.getInstance().roleDetail.petIndex == -1) {
				this.view.auto_skill_icon2.visible = false;
			} else this.view.auto_skill_icon2.visible = true;
			let hookBattleData = game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData;
			if (hookBattleData.charoptype == OperationType.ACTION_ATTACK) {
				this.view.role_auto_img.skin = "common/ui/guaJi/attack1.png";
			} else if (hookBattleData.charoptype == OperationType.ACTION_SKILL) {
				let skill = this.battle.skills;
				for (var index = 0; index < skill.length; index++) {
					if (skill[index].id == hookBattleData.charopid)
						this.view.role_auto_img.skin = "common/icon/skill/" + skill[index].normalIcon + ".png";
				}
			} else if (hookBattleData.charoptype == OperationType.ACTION_DEFEND) {
				this.view.role_auto_img.skin = "common/ui/guaJi/defense1.png";
			}
			this.view.role_auto_img.on(LEvent.CLICK, this, this.requestGuaJiSkill);
			if (hookBattleData.petoptype == OperationType.ACTION_ATTACK) {
				this.view.pet_auto_img.skin = "common/ui/guaJi/attack1.png";
			} else if (hookBattleData.petoptype == OperationType.ACTION_SKILL) {
				let petskill: PetSkillConfigBaseVo = PetModel.getInstance().petSkillConfigData[hookBattleData.petopid] as PetSkillConfigBaseVo;
				if( petskill ) this.view.pet_auto_img.skin = "common/icon/skill/" + petskill.icon + ".png";
			} else if (hookBattleData.petoptype == OperationType.ACTION_DEFEND) {
				this.view.pet_auto_img.skin = "common/ui/guaJi/defense1.png";
			}
			this.view.pet_auto_img.on(LEvent.CLICK, this, this.showAutoPetSkill);
			// if (typeof(args) != "undefined")
			// 	this.auto_initDelay();
			// else
			//计时器
			if (typeof (args) == "number" && args > 0) {
				if (this.battle._cur_round <= 0) return;
				Laya.timer.once(args * 1000, this, () => {
					this.sendAutoFightCommand();
				})
			} else this.sendAutoFightCommand();


		}


		// 打开聊天界面
		private clickMainChat(): void {
			this.judgehideSkillPanel();
			ModuleManager.show(ModuleNames.Chat, this.app);
		}
		/** 聊天频道设置点击 */
		private opChatSet(): void {/** 聊天频道设置界面 */
			let _selectChannelMediator = new game.modules.chat.SelectChannelMediator(this._app);
			_selectChannelMediator.onShow();
		}
		// 显示等待中
		showWait(): void {
			this.hideOpera();
			NotifyMgr.notify(NotifyType.RoundOprateEnd);
			this.view.round_delay_box.visible = false;
			this.view.wait_flag.visible = true;
		}
		private requestGuaJiSkill(): void {
			RequesterProtocols._instance.c2s_CGetRoleFightAI();
		}

        /**
         * 设置回合数
         * @param round 回合数, -1隐藏
         */
		setRound(round: number): void {
			if (round >= 0) {
				this.view.round_box.visible = true;
				this.round_num.setNum(round);
			} else {
				this.view.round_box.visible = false;
			}
		}
        /**
         * 设置回合倒计时
         * @param delay 倒计时, -1隐藏
         */
		setRoundDelay(delay: number = -1): void {
			delay = Math.floor(delay / 1000);
			// //console.log( this.view);
			//设置延迟数
			if (delay > 0 && this.battle.battle_stepe != BattleStep.Play) {
				this.view.round_delay_box.visible = true;
				this.round_delay_num.setNum(delay);
			} else {
				if ((this.view.round_delay_box.visible || this.battle.battle_stepe == BattleStep.Play) && !this.battle.isWatch) //倒计时小于0或者操作状态为播放剧本
				{
					this.view.round_delay_box.visible = false;
					RequesterProtocols._instance.c2s_CSetAutoBattle(1);
					game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData.isautobattle = 1;
					this.view.auto_cancel_box.visible = true;
					this.showAutoBattle();
				}

			}
		}
		/** 初始化自动3秒倒计时 */
		auto_initDelay(): void {
			/** 如果实例化 */
			if (!this.auto_round_delay_num) {
				this.view.auto_delay_box.visible = true;
				this.auto_round_delay_num = new ClipNum("ui/hud_zhandou/round_delay.png", 393, 48);
				this.view.auto_delay_box.addChild(this.auto_round_delay_num);
				let delay = 3;
				this.setdelayNum(delay);
			} else {
				this.sendAutoFightCommand();
			}

		}
		/** 自动倒计时设置 
		 * @param delay 延迟数
		*/
		private setdelayNum(delay: number = 3): void {
			if (!this.view) return;
			if (delay > 0) {
				this.view.auto_delay_box.visible = true;
				this.view.auto_cancel_box.visible = true;
				this.auto_round_delay_num.setNum(delay);
			} else {
				this.sendAutoFightCommand();
				return;
			}
			delay -= 1;
			Laya.timer.loop(1000, this, this.setdelayNum, [delay]);
		}
		private is_operate_pet: boolean;
		/** 人物操作菜单 */
		showMainOpera(): void {
			this.hideOpera();
			this.lastBattleSkill();
			this.view.auto_btn.visible = true;
			this.view.mainBottom_box.visible = true;
			this.view.mainRight_box.visible = true;
			this.is_operate_pet = false;
			// this.showInReadyEffect(FighterType.FIGHTER_ROLE);
			this.battle.showSelectEffects();
			this.battle.showInReadyEffect();
			// this.showInReadyEffect(FighterType.FIGHTER_PET);

		}
		/** 宠物操作菜单 */
		showPetOpera(): void {
			this.hideOpera();
			this.lastPetBattleSkill();
			this.view.auto_btn.visible = true;
			this.view.petBottom_box.visible = true;
			this.view.petRight_box.visible = true;
			// this.battle.clearInReadyEffect();
			this.battle.showSelectEffects();
			this.is_operate_pet = true;
		}
		/** 观战ui表现 */
		showWatch():void
		{
			this.hideOpera();
			this.view.auto_btn.visible = true;
			this.view.round_delay_box.visible = false;
			this.view.wait_flag.visible = false;
			this.view.auto_cancel_box.visible = false;
			this.view.auto_btn.skin = "common/ui/mainhud/battle_quxiao.png";
			this.view.auto_btn.off(LEvent.CLICK, this, this.clickAuto);
			this.view.auto_btn.on(LEvent.CLICK, this, this.exitWatch);
		}
		/** 请求退出观战 */
		exitWatch():void
		{
			RequesterProtocols._instance.c2s_CEndWatchBattle();
		}
		/** 发送自动战斗的指令 */
		private sendAutoFightCommand(): void {
			console.error('自动发送战斗指令了====>>>>>>>>>>>>>>>>>>>>');
			if (!this.view) return;
			this.view.auto_delay_box.visible = false;
			let hookBattleData = game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData;
			this.battle.autoFightCommand(hookBattleData.charoptype, 1, hookBattleData.charopid);
			let fightPet =  LoginModel.getInstance().roleDetail.petIndex;
			if(fightPet && fightPet != -1 )  //有出战宠物
			 this.battle.autoFightCommand(hookBattleData.petoptype, 0, hookBattleData.petopid);
			else  //没有出战宠物
			 this.battle.autoFightCommand(-1, -1, -1);
			Laya.timer.clear(this, this.setdelayNum);
			this.auto_round_delay_num = null;
		}
		/** 上次战斗使用的技能 */
		private lastBattleSkill(): void {
			let skill = HudModel.getInstance().battleSkill;
			if (skill == -1) {
				this.view.skill_bg_img.visible = false;
				return;
			}
			this.view.skill_bg_img.visible = true;
			this.view.skill_icon_img.loadImage("common/icon/skill/" + skill.normalIcon + ".png");
			let level = game.modules.skill.models.SkillModel.getInstance().skillLevelDic.get(skill.id);
			let cost = Math.floor(level * skill["paramA"] + skill["paramB"]);//消耗数值
			let str = skill["costA"];
			str = str.replace("$parameter1$", cost);//消耗
			// this.view.skill_icon_img.on(LEvent.RIGHT_CLICK,this,this._onshowskillDetail,[skill.normalIcon,skill.skillname,level,str,skill.skilldescribe]);
			this.view.skill_icon_img.on(LEvent.MOUSE_DOWN, this, () => {
				let up_flag = true;
				this.view.skill_icon_img.on(LEvent.MOUSE_UP, this, () => { up_flag = false; });
				Laya.timer.once(1000, this, () => {
					if (up_flag) this._onshowskillDetail(skill.normalIcon, skill.skillname, level, str, skill.skilldescribe);
				});
			});
			this.view.skill_icon_img.on(LEvent.CLICK, this, this.useLastSkill, [skill])
		}
		/** 上次宠物战斗使用的技能 */
		private lastPetBattleSkill(): void {
			let petskill = HudModel.getInstance().battleSkill_pet;
			if (petskill == -1) {
				this.view.skill_pet_bg_img.visible = false;
				return;
			}
			this.view.skill_pet_bg_img.visible = true;
			this.view.skill_pet_icon_img.loadImage("common/icon/skill/" + petskill.icon + ".png");
			let describe: string = petskill.skilldescribe;
			describe = describe.substring(40, (describe.length - 7));
			// this.view.skill_pet_icon_img.on(LEvent.RIGHT_CLICK,this,this._onshowskillDetail,[petskill.icon,petskill.skillname,-1,petskill.param,describe]);
			this.view.skill_pet_icon_img.on(LEvent.MOUSE_DOWN, this, () => {
				let up_flag = true;
				this.view.skill_pet_icon_img.on(LEvent.MOUSE_UP, this, () => { up_flag = false; });
				Laya.timer.once(1000, this, () => {
					if (up_flag) this._onshowskillDetail(petskill.icon, petskill.skillname, -1, petskill.param, describe);
				});
			});
			this.view.skill_pet_icon_img.on(LEvent.CLICK, this, this.useLastSkill, [petskill])
		}
		/** 选中之前选中的技能 */
		private useLastSkill(skill): void {
			//如果技能详情界面可见 属长按效果 不执行选中方法
			if (this.view.ski_detail_img.visible) return;
			this.battle.selectSkill(skill);
			this.showBackOperate(skill.skillname);
		}
		// private showInReadyEffect(type: number): void {
		// 	this.battle.showInReadyEffect(type);
		// }
		/** 操作返回 */
		private backOperate(): void {
			if (this.is_operate_pet) {
				this.showPetOpera();
			} else {
				this.showMainOpera();
			}
			if (this.show_skill_list) {
				this.show_skill_list = false;
				this.view.skill_list_bg.visible = true;
			}
		}
		/** 取消自动操作 */
		private cancleAutoOperate(): void {
			/** 判断还处于操作状态 */
			if (this.battle.battle_stepe == BattleStep.Opera && this.battle.cur_operate_role_type == OperateRoleType.None) {/** 玩家未操作则开始回合菜单 */

				this.battle.startRoundOperate();
			} else if (this.battle.battle_stepe == BattleStep.Opera && this.battle.cur_operate_role_type == OperateRoleType.Role) {/** 玩家操作完毕则直接发送指令 */
				this.sendAutoFightCommand();
				this.nextRoundManual(PromptExplain.NEXT_ROUND_MANUAL);
			} else if (this.battle._cur_round > 0) {
				this.nextRoundManual(PromptExplain.NEXT_ROUND_MANUAL);
			}
		}
		/** 发送下回合手动提示框 */
		private nextRoundManual(id: number): void {
			/** 等待或者播放剧本则提示 */
			let prompt = HudModel.getInstance().promptAssembleBack(id);
			let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this.app);
			disappearMsgTips.onShow(prompt);
		}
		hideOpera(): void {
			//非观战隐藏
			if( !this.battle.isWatch ) this.view.auto_btn.visible = false;
			this.view.skill_list_bg.visible = false;
			this.view.buff_img.visible = false;
			this.view.mainBottom_box.visible = false;
			this.view.mainRight_box.visible = false;
			this.view.ski_detail_img.visible = false;
			this.view.petBottom_box.visible = false;
			this.view.petRight_box.visible = false;

			this.view.opera_back_btn.visible = false;
			this.view.select_name.visible = false;

			this.view.wait_flag.visible = false;
		}
		startPlay(): void {
			this.hideOpera();
			this.view.wait_flag.visible = false;
			this.view.round_delay_box.visible = false;
		}
		/** 无选中对象判断刷新ui */
		judgehideSkillPanel(): void {

			if (this.view.auto_petskill_img.visible) {
				this.view.auto_petskill_img.visible = false;
			}
			if (this.view.buff_img.visible) {
				this.view.buff_img.visible = false;
			}
			if (this.view.ski_detail_img.visible && this.view.skill_list_bg.visible) {
				this.view.ski_detail_img.visible = false;
			} else if (this.view.skill_list_bg.visible) {
				this.view.skill_list_bg.visible = false;
			} else if (this.view.ski_detail_img.visible) {
				this.view.ski_detail_img.visible = false;
			}
			if (this.view.zhenfa_img.visible) {
				this.view.zhenfa_img.visible = false;
			}
		}

        /** 战斗界面聊天信息
		 * @param type 频道类型
		 */
		private onGetChatData(type: number): void {
			//console.log("主界面聊天数据下发类型...." + type);
			if (type != ChannelType.CHANNEL_SYSTEM) {/** 这里需要做类型判断(接收频道的开关是否关闭) */
				let _whetherShow = HudModel.getInstance().whertherShow(type);
				if (!_whetherShow) return;
			}
			if (this.view == null) return;
			this.view.chatList_panel.vScrollBarSkin = "";
			// if(this.chatData.length > 5) this.chatData.shift();
			if (type == ChannelType.CHANNEL_SYSTEM) {
				// this.sysData = modules.chat.models.ChatModel.getInstance().systemMsgList;
				var sysdata: Array<any> = game.modules.chat.models.ChatModel.getInstance().systemMsgList;
				try {
					sysdata[sysdata.length - 1].messigeid;
					if (sysdata == null) return;
					this.chatData.push(sysdata[sysdata.length - 1]);
				} catch (error) {
					//console.log('捕获类型异常处理，执行系统聊天的类型...');
					var Sysdata: Array<any> = game.modules.chat.models.ChatModel.getInstance().SystemMsgList;
					if (Sysdata == null) return;
					this.chatData.push(Sysdata[Sysdata.length - 1]);
				}
			} else {
				var data: Array<any> = game.modules.chat.models.ChatModel.getInstance().chatList.get(type);
				if (data == null) return;
				this.chatData.push(data[data.length - 1]);
			}
			if (this.chatData.length == 0) return;
			if (this.view.chat_shadow_img.hasListener(LEvent.MOUSE_DOWN)) {/** 判断当前ui是否存在监听，有则移除 */
				this.view.chat_shadow_img.off(LEvent.MOUSE_DOWN, this, this.showChatSelectRender);
			}
			this.view.chatList_panel.visible = true;
			this.view.chatList_panel.vScrollBar.elasticDistance = 100;
			this.view.chatList_panel.vScrollBar.elasticBackTime = 200;
			this.showChatRender(this.chatData.length - 1);

		}

        /** 
		 * 主界面聊天渲染
		 * @param index 当前渲染下标
		 */
		private showChatRender(index: number): void {
			if (index != this.chatData.length - 1) return;
			let mainChatImg: Laya.Image = new Laya.Image;
			mainChatImg.x = 90;
			mainChatImg.y = 4;
			mainChatImg.height = 29;
			mainChatImg.width = 615;
			let logo: Laya.Image = new Laya.Image;
			logo.x = 2;
			logo.y = 1;
			let content: Laya.HTMLDivElement = new Laya.HTMLDivElement;
			content.x = 3;
			content.y = -1;
			content.width = 615;
			/** 频道资源加载 */
			HudModel.getInstance().getChannelImg(logo, this.chatData[index].messagetype);
			if (this.chatData[index].messagetype && this.chatData[index].messagetype != ChannelType.CHANNEL_SYSTEM && typeof (this.chatData[index].roleid) == "number") {/** 判断是否是系统消息 */
				let arr = this.chatData[index].message.split("*split");
				/** 队伍一键喊话切割 */
				let teamyell = this.chatData[index].message.split("#,");
				/** 智慧试炼求助切割->帮派频道 */
				let kejuHelp = this.chatData[index].message.split(",fq,");
				/** 天机仙令求助信息 */
				let tianji = this.chatData[index].message.split("^");
				let isTeamYell = false;
				let apply_btn = new Laya.Button;
				mainChatImg.addChild(content);
				if (teamyell && teamyell.length == 7) {/** 是队伍的一键喊话信息 添加申请按钮 */
					isTeamYell = true;
					apply_btn.label = "[申请加入]";
					ChatModel.getInstance().SetBtnAtribute(apply_btn, "#7bcf2d");
					let html = "<img src ='' style = 'width:48px;height:1px'></img>" + "<span style='font:24px ;color:#87CEFA;SimHei'>【" + this.chatData[index].rolename + "】</span>"
					html += "<span style='font:24px ;color:#ffffff'>[ " + teamyell[0] + "</span>";
					html += "<span style='color:#ffffff;fontSize:24'>(" + teamyell[1] + "/5),</span>";
					html += "<span style='color:#ffffff;fontSize:24'>等级" + teamyell[2] + "-" + teamyell[3] + "开组了! </span>";
					html += "<span style='color:#ffffff;fontSize:24'>" + teamyell[4] + " ]</span>";
					content.style.leading = 3;
					content.innerHTML = html;
					let lastwordXpos = content._childs[5]._text.words[content._childs[5]._text.words.length - 1]._x + content._childs[5]._text.words[content._childs[5]._text.words.length - 1]._w;
					HudModel.getInstance().setApplyBtnPos(2, apply_btn, content);
					mainChatImg.addChild(apply_btn);
					apply_btn.on(LEvent.MOUSE_DOWN, this, HudModel.getInstance().onApplyJoinTeam, [teamyell[5]]);
					content.on(LEvent.MOUSE_DOWN, this, this.onRequestTeamInfo, [teamyell[6]]);

				} else if (kejuHelp && kejuHelp.length == 4) {
					apply_btn.label = "[回答问题]";
					ChatModel.getInstance().SetBtnAtribute(apply_btn, "#ff6600");
					let questionId = Number(kejuHelp[0]);//题目Id
					let examtype = kejuHelp[3];
					let data = KejuModel.getInstance().getExamConfigData(examtype);
					let html = "<img src ='' style = 'width:48px;height:1px'></img>";
					html += "<span style='font:24px ;color:#87CEFA;SimHei'>【" + kejuHelp[1] + "】</span>";
					html += "<span style='font:24px ;color:#ff6600'>" + data[questionId].name + "</span>";
					content.style.leading = 3;
					content.innerHTML = html;
					mainChatImg.addChild(apply_btn);
					let lastwordXpos = content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._x + content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._w;
					HudModel.getInstance().setApplyBtnPos(2, apply_btn, content);
					apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().onShowKejuTitle, [kejuHelp[0], kejuHelp[3], kejuHelp[1], kejuHelp[2], this._app]);
					content.on(LEvent.CLICK, this, this.showChatSelectRender);
				} else if (tianji && (tianji.length == 8 || tianji.length == 2)) {/** 天机仙令 */
					let rolename = this.chatData[index].rolename;
					let html = "<img src ='' style = 'width:48px;height:1px'></img>";
					html += "<span style='font:24px ;color:#87CEFA;SimHei'>【" + this.chatData[index].rolename + "】</span>"
					html += "<span style='font:24px ;color:#87CEFA'>" + rolename + "</span>";
					html += "<span style='font:24px ;color:#ffff00'>发布了任务求助信息</span>";
					let taskId = tianji[0];
					let tjxlTask = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig[taskId];
					if (tjxlTask) {
						let tasktype = tjxlTask.tasktype;
						let taskname = tjxlTask.strtasknameui;
						html += "<span style='font:24px ;color:#33cc00'>" + taskname + "</span>";
						if (tasktype != -1 && tasktype == TaskType.Pet) //需求
						{
							html += "<span style='font:24px ;color:#000000'>需求</span>";
							let targetId = tianji[6];
							let targetNum = tianji[7];
							let petName = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[targetId].name;
							html += "<span style='font:24px ;color:#33cc00'>" + petName + "x" + targetNum + "</span>";
							content.innerHTML = html;
							HudModel.getInstance().setApplyBtnPos(6, apply_btn, content);
							apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, tianji[6], tianji[0], this._app, this.view, this.chatData[index].roleid]);
						} else if (tasktype != -1 && tasktype == TaskType.Item) {
							html += "<span style='font:24px ;color:#000000'>需求</span>";
							let targetId = tianji[6];
							let targetNum = tianji[7];
							let itemName = game.modules.bag.models.BagModel.getInstance().itemAttrData[targetId].name;
							html += "<span style='font:24px ;color:#33cc00'>" + itemName + "x" + targetNum + "</span>";
							content.innerHTML = html;
							HudModel.getInstance().setApplyBtnPos(6, apply_btn, content);
							apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, tianji[6], tianji[0], this._app, this.view, this.chatData[index].roleid]);
						} else if (tasktype != -1 && tasktype == TaskType.NPC) {
							content.innerHTML = html;
							HudModel.getInstance().setApplyBtnPos(4, apply_btn, content);
							apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, 0, 0, this._app, this.view, this.chatData[index].roleid]);
						}
						if (tasktype == TaskType.Item || tasktype == TaskType.Pet)
							apply_btn.label = "[帮助完成]";
						else if (tasktype == TaskType.NPC)
							apply_btn.label = "[申请加入]";
						ChatModel.getInstance().SetBtnAtribute(apply_btn, "#ffff00");
						content.style.leading = 3;
						mainChatImg.addChild(apply_btn);
					}
				} else if (arr.length == 2 && this.chatData[index].displayinfos.length != 0) {/** 分享之有点击事件*/
					let share_btn = new Laya.Button;
					var facehtml = arr[1];
					if ((arr[1].indexOf("@") != -1)) {
						facehtml = ChatModel.getInstance().getFaceHtmlText(arr[1]);
					}
					/** 主界面聊天颜色默认为白色 */
					arr[0] = arr[0].replace("#000000", "#f6f6f4");
					/** 根据长度计算按钮长度 */
					let len = facehtml.length;
					share_btn.width = 18.5 * len;
					share_btn.height = 24;
					share_btn.skin = "";
					// share_btn.scaleX = 1.17;
					share_btn.labelSize = 24;
					share_btn.labelAlign = "left";
					share_btn.labelColors = arr[0];
					share_btn.label = facehtml;
					share_btn.mouseEnabled = true;
					share_btn.mouseThrough = false;
					mainChatImg.addChild(share_btn);
					content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + "<span style='font:22px ;color:#87CEFA;SimHei'>【" + this.chatData[index].rolename + "】</span>";
					let x = content._childs[1]._text.words[content._childs[1]._text.words.length - 1]._x + content._childs[1]._text.words[content._childs[1]._text.words.length - 1]._w;
					share_btn.x = x + content.x + 20;
					share_btn.y = content.y + content._childs[1]._text.words[content._childs[1]._text.words.length - 1]._y;
					share_btn.on(LEvent.CLICK, this, this.onMainProp, [this.chatData[index].displayinfos[0], this.chatData[index].message, this.chatData[index].roleid]);
				} else if (arr.length == 2) {/** 正常输入切割 */
					var facehtml = arr[1];
					if ((arr[1].indexOf("@") != -1)) {
						facehtml = ChatModel.getInstance().getFaceHtmlText(arr[1]);
					}
					/** 主界面聊天颜色默认为白色 */
					arr[0] = arr[0].replace("#000000", "#f6f6f4");
					content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + "<span style='font:22px ;color:#87CEFA;SimHei'>【" + this.chatData[index].rolename + "】</span>" + "<span style='font:22px;color:" + arr[0] + "; SimHei'>" + facehtml + " </span> ";
				}
				else {/** 任务时直接请求 */
					content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + "<span style='font:24px ;color:#87CEFA; SimHei'>【" + this.chatData[index].rolename + "】</span>" + "<span style='font:24px;color:#ffffff; SimHei'>" + this.chatData[index].message + " </span> ";
				}

				/** 点击事件 */
				if (teamyell && teamyell.length == 7) {/** 组队 */
					// content.on(LEvent.MOUSE_DOWN,this,this.showTeamMember);
				} //else if (this.chatData[index].displayinfos.length != 0) {/** 指定点击事件 */
				//content.on(LEvent.CLICK, this, this.onMainProp, [this.chatData[index].displayinfos[0], this.chatData[index].message, this.chatData[index].roleid]);

				//} 
				else {/** 正常点击事件--》跳转至聊天界面 */
					content.on(LEvent.CLICK, this, this.showChatSelectRender);
				}

				// generalInfo_lab.text = "";
			} else if (this.chatData[index].roleid && typeof (this.chatData[index].roleid) == "string") {/** 红包处理 */
				var clickbtn = new Laya.Button;
				// clickbtn.scaleX = 1.17;
				let param = ChatModel.getInstance().specialChannelData.get(this.chatData[index].roleid);
				clickbtn.label = "[抢红包]";
				clickbtn.skin = "";
				content.style.leading = 2;
				let ss = "csfsf";
				let x;
				/** 是否是未定义的空字符串 */
				let isundefined = this.chatData[index].message.search("undefined");
				if (isundefined != -1) {
					let message = this.chatData[index].message.replace("undefined", " ");
					content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + message;
					x = content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._x + content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._w;
				} else {
					content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + this.chatData[index].message;
					x = content._childs[3]._text.words[content._childs[3]._text.words.length - 1]._x + content._childs[3]._text.words[content._childs[3]._text.words.length - 1]._w;
				}

				if (content.contextHeight == 26) {/** 一行数据 */
					clickbtn.x = content.x + x;
					clickbtn.y = content.y - 2;
				} else {
					/** 换行后的实际宽度 */
					clickbtn.x = content.x + x;
					clickbtn.y = content.y + (content.contextHeight / 2);
				}
				clickbtn.mouseEnabled = true;
				clickbtn.labelSize = 24;
				clickbtn.labelColors = "#008000";
				clickbtn.width = 90;
				clickbtn.height = 26;
				clickbtn.on(LEvent.CLICK, this, HudModel.getInstance().onRedPacketEvent, [param]);
				mainChatImg.addChild(content);
				mainChatImg.addChild(clickbtn);
				content.on(LEvent.CLICK, this, this.showChatSelectRender);
			}
			else {/** 系统频道消息 */
				if (typeof (this.chatData[index].messageid) != "undefined") {
					var msgId = this.chatData[index].messageid;
					var data = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[msgId];
					let param = this.chatData[index].parameters;
					content.style.leading = 2;
					let tempdata = HudModel.getInstance().promptAssembleBack(msgId, param);
					content.innerHTML = "<img src ='' style = 'width:48px;height:1px'> </img>" + tempdata;//"<span style='font:24px ;color:#FFFFFF; SimHei'> " + tempdata + " </span>";//data.msg
					mainChatImg.on(LEvent.CLICK, this, this.showChatSelectRender);
					// generalInfo_lab.text = "";
					mainChatImg.addChild(content);
				} else if (typeof (this.chatData[index].message) != "undefined") {
					var generalInfo_lab: Laya.Label = new Laya.Label;
					generalInfo_lab.x = 52;
					generalInfo_lab.y = 0;
					generalInfo_lab.width = 582;
					generalInfo_lab.height = 27;
					generalInfo_lab.fontSize = 25;
					generalInfo_lab.color = "#ffffff";
					generalInfo_lab.align = "left";
					generalInfo_lab.overflow = "visible";
					generalInfo_lab.wordWrap = true;
					// generalInfo_lab.scaleX = 1.17;
					let tempData = this.chatData[index].message;
					generalInfo_lab.text = tempData;
					mainChatImg.on(LEvent.CLICK, this, this.showChatSelectRender);
					// content.innerHTML = "";
					mainChatImg.addChild(generalInfo_lab);
				}
			}
			if (this.lastImg == null) {
				mainChatImg.y = 1;
			} else {/**第二个以上 */
				mainChatImg.y = this.lastImg.y + this.lastImg.height + 2;
			}
			if (content.contextHeight > mainChatImg.height) {/** 位置重新处理 */
				mainChatImg.height = content.contextHeight;
				if (content.contextHeight == 80) {/** 表情位置处理 */
					content.y = -30;
					mainChatImg.height -= 30;
					mainChatImg.y += 30;
				}
			} else if (generalInfo_lab && generalInfo_lab.text != "") {
				mainChatImg.height = 2 * generalInfo_lab.height;
			}
			/** 滚动条信息 */
			let scrollY = mainChatImg.y;
			// mainChatImg.skin = "common/ui/liaotian/liaotian_tiaose_hong.png";
			mainChatImg.addChild(logo);
			this.lastImg = mainChatImg; //JSON.stringify(logo); //Object.assign({},logo)  //$.extend(true,{},logo);
			this.view.chatList_panel.addChild(mainChatImg);
			if (scrollY >= 150) {/** 大于 容器节点的高度时才滚动*/
				this.view.chatList_panel.vScrollBar.setScroll(0, scrollY, scrollY);
				this.view.chatList_panel.scrollTo(null, scrollY);
			}

		}

		/** 选中数据显示聊天界面 */
		private showChatSelectRender(): void {
			ModuleManager.show(ModuleNames.Chat, this._app);
		}
		/** 点击富文本显示该角色队伍信息 */
		public onRequestTeamInfo(teamid: number): void {
			RequesterProtocols._instance.c2s_COneKeyApplyTeamInfo(teamid);
			game.modules.team.models.TeamProxy.getInstance().once(game.modules.team.models.ONE_KEY_TEAMINFO, this, this.onShowTeamInfo);
		}
        /** 队伍情况界面 
         * @param teaminfo 队伍详情
        */
		private onShowTeamInfo(teaminfo: Array<any>): void {
			let TeamInfoMediator = new game.modules.team.TeamInfoMediator(this._app);
			TeamInfoMediator.onshow(teaminfo);
		}
		/** 主界面点击聊天记录弹出tips */
		private onMainProp(displayinfos: game.modules.chat.models.DisplayInfoVo, itemName: string, roleId: number, e: LEvent): void {
			e.stopPropagation();
			let roleid = LoginModel.getInstance().roleDetail.roleid;
			if (roleId == roleid && displayinfos.displaytype == DisplayType.DISPLAY_ITEM) {/** 自己点击并且是道具物品时 */
				let fromBag = true;
				let _viewUI = this.app.uiRoot.general;
				this.ChatViewMediator.showItemTips(displayinfos, fromBag, this._app, _viewUI);
			} else {
				this.ChatViewMediator.otherOnItem(displayinfos, itemName);
			}
		}
		/** 人物属性刷新 */
		public updateRoleAttr(): void {
			var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;//人物信息
			let _rolehp = HudModel.getInstance().hpNum;
			let _rolehpMax = HudModel.getInstance().maxHpNum;
			let _rolemp = HudModel.getInstance().mpNum;
			let _rolempMax = HudModel.getInstance().maxMpNum;
			let _rolesp = HudModel.getInstance().spNum;
			let _rolespMax = HudModel.getInstance().maxSpNum;
			let _roleexp = HudModel.getInstance().expNum;
			let _rolenexp = HudModel.getInstance().nexpNum;

			this.view.mainRoleRed.value = _rolehp / _rolehpMax;	//血条
			this.view.mainRoleBlue.value = _rolemp / _rolempMax;//蓝条
			//怒气条
			if (roleDetail.maxsp == 0) {
				this.view.mainRoleYellow.value = 0;
			} else {
				this.view.mainRoleYellow.value = _rolesp / _rolespMax;
			}
			this.view.mainRoleLevel.text = HudModel.getInstance().levelNum.toString();//等级
			this.view.exp_progress.value = _roleexp / _rolenexp;//经验条
			this.view.mainRoleAvatar.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleDetail.shape) + ".png";//头像
		}
        /** 战斗中刷新血条 
         * @param hp 血量
		 * @param isrole  是否角色 
		 * @param ispet   是否宠物
		 * @param color   漂字颜色'
		 * @param isCrit  是否暴击
        */
		public updateHp(target: FightModel, value: number, color: number = 1, isCrit = false): void {
			var hp = target.hp + value;
			if (hp < 0) hp = 0;

			if (target.is_self_role) {
				this.view.mainRoleRed.value = hp / target.maxhp;
			}
			else if (target.is_pet) {
				// let petinfo: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(_LoginModel.getInstance().roleDetail.petIndex);
				this.view.mainPetRed.value = hp / target.maxhp;
			}
			let die = target.changeHp(value, color);
			/** 死亡则清除对应buff */
			// if( die ) this.battle._scene.clearDeaderBuff(target.fakeUnit);
		}
		/** 战斗中刷新蓝条 
		* @param mp 魔法值
		* @param isrole  是否角色 
		* @param ispet   是否宠物
	   */
		public updateMp(target: FightModel, value: number): void {
			var mp = target.mp + value;
			if (mp < 0) mp = 0;

			if (target.is_self_role) {
				let maxmp = HudModel.getInstance().maxMpNum;
				this.view.mainRoleBlue.value = mp / maxmp;	//人物蓝条
			}
			else if (target.is_pet) {
				let petinfo: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(_LoginModel.getInstance().roleDetail.petIndex);
				if( petinfo )
				this.view.mainPetBlue.value = mp / petinfo.maxmp;//宠物蓝条
			}

			target.changeMp(value);

		}
		/** 战斗中刷新怒气条 
		* @param value 更新值
	   */
		public updateSp(target: FightModel, value: number): void {
			// var sp = target.mp + value;
			// if (mp < 0) mp = 0;
			// let roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;//人物信息
			if (!target.is_self_role) return;
			let maxsp = HudModel.getInstance().maxSpNum;
			let sp = HudModel.getInstance().spNum;
			sp += value;
			this.view.mainRoleYellow.value = sp / maxsp;	//人物怒气条
			target.changeSp(value);

		}

		/** 宠物属性刷新 */
		public updatePetAttr(): void {
			////console.log('开始刷新宠物属性----------');
			var _loginModel = game.modules.createrole.models.LoginModel.getInstance();
			if (_loginModel.roleDetail.pets.length == 0) {
				//没有宠物时，不显示
				this.view.pet_img.visible = false;
				this.view.mainPetAvatar.visible = false;
				this.view.mainPetRed.visible = false;
				this.view.mainPetBlue.visible = false;
				this.view.mainPetLevel.visible = false;
			} else if (_loginModel.roleDetail.petIndex == -1 && _loginModel.roleDetail.pets.length != 0) {
				//有宠物但是不参战时，不显示具体蓝条和血条
				this.view.pet_img.visible = true;
				this.view.mainPetAvatar.visible = true;
				this.view.mainPetRed.visible = true;
				this.view.mainPetBlue.visible = true;
				this.view.mainPetLevel.visible = true;
				this.view.mainPetRed.value = 0;//宠物血条
				this.view.mainPetBlue.value = 0;//宠物蓝条
				this.view.mainPetLevel.text = "";//宠物等级
				this.view.mainPetAvatar.skin = "common/ui/tongyong/chongwudiwen.png";//宠物头像
			} else {
				let petinfo: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(_LoginModel.getInstance().roleDetail.petIndex);
				let allpetbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petinfo.id];
				let icondata: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid] as CNpcShapeBaseVo;
				this.view.pet_img.visible = true;
				this.view.mainPetAvatar.visible = true;
				this.view.mainPetRed.visible = true;
				this.view.mainPetBlue.visible = true;
				this.view.mainPetLevel.visible = true;
				this.view.mainPetRed.value = petinfo.hp / petinfo.maxhp;//宠物血条
				this.view.mainPetBlue.value = petinfo.mp / petinfo.maxmp;//宠物蓝条
				this.view.mainPetLevel.text = petinfo.level.toString();//宠物等级
				this.view.mainPetAvatar.skin = "common/icon/avatarpet/" + icondata.littleheadID + ".png";//宠物头像
			}

		}
		/** 菜单栏里的点击事件
		 * @param moduleName 模块名称
		 */
		private showMainBtnEvent(moduleName: string): void {
			if (moduleName == ModuleNames.Family) {
				let clankey = HudModel.getInstance().clankey;
				if (clankey > 0) {
					ModuleManager.show(ModuleNames.haveFamily, this._app);  //有帮派界面
				} else {
					ModuleManager.show(ModuleNames.Family, this._app);  //没有帮派界面
				}
			} else
				ModuleManager.show(moduleName, this._app);
		}
		/** 判断当前的技能刷新ui
		 * @param type 操作对象
		 */
		private chargeSkills(type: number = -1): void {
			this.view.skill_list_bg.visible = true;
			if (this.skills.length == 0) {
				this.view.skill_list.visible = false;
				if (type == OperateRoleType.Pet) this.view.noskill_lab.visible = true;
			} else {
				this.view.skill_list.visible = true;
				this.view.noskill_lab.visible = false;
				this.showSkillPanel();
			}

		}
		/** 刷新己方阵法数据 
		 * @param user 阵法 1 敌方 2 我方
		*/
		private updateZhenfa(user: number): void {
			let SSendBattleStart = this.battle.SendBattleStart;
			if (!SSendBattleStart) return;
			let viewImg: Laya.Image;
			let formationId = -1;
			let formationLevel = 0;
			if (user == ZhenFaType.FRIEND_ZHENFA)//我方
			{
				viewImg = this.view.we_zhenfa_img;
				formationId = SSendBattleStart.friendsformation;
				formationLevel = SSendBattleStart.friendsformationLevel;
			} else if (user == ZhenFaType.ENEMY_ZHENFA)//敌方
			{
				viewImg = this.view.enemy_zhenfa_img;
				formationId = SSendBattleStart.enemyformation;
				formationLevel = SSendBattleStart.enemyformationLevel;
			}
			if (formationId == 0 || formationLevel == 0) {
				viewImg.visible = false;
				return;
			}
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3];
			let zhenfa: FormationbaseConfigBaseVo;
			// let zfinfo: number;//game.modules.huoban.models.FormBeanVo;
			zhenfa = HuoBanModel.getInstance().FormationbaseConfigData[formationId];
			// zfinfo = SSendBattleStart.friendsformationLevel;//LoginModel.getInstance().roleDetail.learnedFormsMap.get(SSendBattleStart.friendsformation);
			if (!zhenfa) return;
			viewImg.visible = true;
			viewImg.skin = "common/icon/item/" + zhenfa.icon + ".png";
			viewImg.on(LEvent.CLICK, this, this._onshowZhenfa, [zhenfa, formationLevel]);
			this.view.zhenfa_name_lab.text = formationLevel + chattext.msg + zhenfa.name;
		}
		/** 阵法点击 */
		private _onshowZhenfa(zhenfa: FormationbaseConfigBaseVo, zflevel: number): void {
			if (zhenfa && zflevel && !this.view.zhenfa_img.visible) this.view.zhenfa_img.visible = true;
			let allzhenfaeffect: ZhenFaEffectBaseVo = HuoBanModel.getInstance().ZhenFaEffectData[(zhenfa.id - 1) * 5 + zflevel + 1];
			let effect: Array<string> = allzhenfaeffect.descirbe;
			for (var _index = 0; _index < effect.length; _index++) {
				this.effect[_index] = effect[_index].replace("<br>", " ,").replace("50321A", "d2ba44").replace("50321A", "f35416");;
			}
			//长度固定位5
			if (this.effect.length == 5) {
				this.view.numberOne_html.innerHTML = this.effect[0];
				this.view.numberTwo_html.innerHTML = this.effect[1];
				this.view.numberThree_html.innerHTML = this.effect[2];
				this.view.numberFour_html.innerHTML = this.effect[3];
				this.view.numberFive_html.innerHTML = this.effect[4];
			}
			this.view.zhenfa_img.on(LEvent.MOUSE_DOWN, this, this.showzhenfa);
		}
		/** 点击事件触发保证ui不消失 */
		private showzhenfa(): void {
			if (!this.view.zhenfa_img.visible) this.view.zhenfa_img.visible = true;
		}

		/** 手动操作情况判断 */
		public ManualFightPerformance(): void {
			let HookBattleData = game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData;
			if (HookBattleData.isautobattle == OperateType.Manual_Fight) //手动
			{
				this.view.auto_btn.visible = true;
			}
		}

		/** 战斗准备阶段判断是否自动战斗刷新ui */
		private JudgingAutoMatically(): void {
			let HookBattleData = game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData;
			if (HookBattleData.isautobattle === OperateType.Auto_Fight)//自动操作
			{
				this.view.auto_cancel_box.visible = true;
				this.showAutoBattle(3);
			} else
				this.view.auto_cancel_box.visible = false;
		}

	}
}