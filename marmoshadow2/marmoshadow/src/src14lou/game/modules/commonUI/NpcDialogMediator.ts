/**
* NPC对话
*/
module game.modules.commonUI {
	export class NpcDialogMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.component.NpcDialogUI;
		/**剧情对话*/
		public dialog: game.modules.commonUI.JuQingMediator;
		/**宠物商店*/
		public petshop: game.modules.commonUI.PetShopMediator;
		/**任务提交*/
		private taskcommit: game.modules.task.TaskPetChooseMediator;
		/**道具提交*/
		private itemsubmit: game.modules.task.TaskItemChooseMediator;
		/**精英副本*/
		private jingyingfuben: game.modules.commonUI.JingYingFuBenMediator
		/**帮派战*/
		private familybatlle: game.modules.family.FamilyBattleViewMediator
		/**消息提示*/
		private _tips: game.modules.commonUI.DisappearMessageTipsMediator;
		/*礼包兑换*/
		private duihuan: game.modules.commonUI.LiBaoDuiHuanMediator
		/**切磋界面*/
		private qiecuojiemian: game.modules.commonUI.QieChuoJieMianMediator
		/**购买装备*/
		private buyequip: game.modules.commonUI.BuyEquipMediatorxtends
		/**购买物品*/
		private buyitem: game.modules.roleinfo.RoleShopMediator
		/**无上魔冠*/
		private wushangmoguan: game.modules.commonUI.WuShangMoGuangMediator
		/**宠物染色*/
		private petranse: game.modules.commonUI.RanSeMediator
		/**NPC服务*/
		public services: Array<number> = [];
		/**对话内容*/
		public scenarioquests: Array<number> = [];
		/**NPCkey*/
		public npckey: number;
		/**所需要的道具或者宠物ID*/
		public itemid: number;
		/**自动任务等待时间*/
		public autotime: number;
		private idlist: Array<number> = [0, 15, 25, 35, 45, 55, 65, 75, 80, 85, 90, 95]//用于宠物商店
		/** 是否初始化宠物回收窗口 */
		public isRecovery: boolean = false;
		/** 初始化数据-用于返回数据填充 */
		public chat: string;
		public contain: string;
		public serverid: number;
		public servername: string;
		/** 是否是返回 */
		public isback: boolean = false;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.component.NpcDialogUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.allcontrol_img.on(Laya.Event.CLICK, this, this.close);
			this._viewUI.allcontrol_img.mouseEnabled = true;
		}
		/**初始化数据 NPCkey,服务列表，引导列表，显示的内容(也可以作为判断)，道具ID,第几个服务,服务名字*/
		public init(npckey: number, services?: Array<number>, scenarioquests?: Array<number>, contain?: string, itemid?: number, serverid?: number, servername?: string): void {
			this.autotime = 0
			if (services) {//是否有服务
				this.npckey = npckey;//NPCkey
				this.services = services;//NPC服务
			}
			if (scenarioquests) {//是否有对话
				this.scenarioquests = scenarioquests;//指引任务
			}
			this.itemid = itemid;
			this.contain = contain;
			this.serverid = serverid;
			this.servername = servername;
			let npc: game.scene.models.NpcBasicVo = game.scene.models.SceneModel.getInstance().npclist.get(npckey);
			let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[npc.id];
			let npcshape: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[npcinfo.modelID];
			let num: number = parseInt((Math.random() * (npcinfo.chitchatidlist.length - 1)).toFixed(0));
			let text: CNpcChatBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNpcChatData[npcinfo.chitchatidlist[num]];
			this.chat = text.chat;
			if (npcshape.headID < 10500) {//造型id区分 人物
				this._viewUI.npcicon_img.skin = "common/icon/bustrole/" + npcshape.headID + ".png";
			}
			else if (npcshape.headID < 11000) {//怪物
				this._viewUI.npcicon_img.skin = "common/icon/bustmonster/" + npcshape.headID + ".png";
			}
			else if (npcshape.headID < 11200) {//伙伴
				this._viewUI.npcicon_img.skin = "common/icon/bustpartner/" + npcshape.headID + ".png";
			}
			else {//宠物
				this._viewUI.npcicon_img.skin = "common/icon/bustpet/" + npcshape.headID + ".png";
			}
			if (contain && contain.indexOf("span") != -1) {
				this._viewUI.dialog_html.visible = true;
				this._viewUI.neirong_lab.visible = false;
				this._viewUI.npcname_lab.text = npc.name;
				this._viewUI.dialog_html.style.align = "center";
				this._viewUI.dialog_html.innerHTML = contain;
				this._viewUI.dialog_html.style.padding = [(this._viewUI.dialog_html.height - this._viewUI.dialog_html.contextHeight) / 2, 0, 0, 0];
			}
			else {
				this._viewUI.dialog_html.visible = false;
				this._viewUI.neirong_lab.visible = true;
				this._viewUI.npcname_lab.text = npc.name;
				this._viewUI.neirong_lab.text = text.chat;
			}
			if ((services && services.length != 0) || (scenarioquests[0] >= 180000 && scenarioquests[0] <= 190000)) {//是否有服务或者对话
				if (contain == "petshop" || contain == "submititem" || contain == "yaopin") {//特殊处理				
					this.selectserver(serverid);
					return;
				}
				if (services.length == 1) {//判断是不是自动的					
					let servicesinfo: CNpcServerConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cnpcServerConfigData[services[0]]
					if (servicesinfo.nautocommit == 1) {//自动的,送信之类的					
						if (contain) {
							super.show();
							this._viewUI.server_box.visible = false;
							this._viewUI.neirong_lab.text = contain;
							RequesterProtocols._instance.c2s_npc_service(npckey, services[serverid - this.scenarioquests.length]);
							if (AutoHangUpModels.getInstance().autotask == 1) {//自动做任务
								Laya.timer.loop(1000, this, this.closewind)
							}
							return;
						}
					}
				}
				this._viewUI.server_box.visible = true;
				this._viewUI.server_box.y -= 90 * (services.length + scenarioquests.length - 1);
				this._viewUI.server_box.height += 90 * (services.length + scenarioquests.length - 1);
				this._viewUI.server_img.height += 90 * (services.length + scenarioquests.length - 1);
				this._viewUI.server_list.height += 90 * (services.length + scenarioquests.length - 1);
				var data: Array<any> = [];
				for (var index = 0; index < scenarioquests.length; index++) {
					let renwulist: MissionCMainMissionInfoBaseVo = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[scenarioquests[index]]
					if (index == 0) {
						if (servername) {
							data.push({ npcserver_btn: servername });
						}
						else {
							data.push({ npcserver_btn: renwulist.MissionTypeString });
						}
					}
					else {
						data.push({ npcserver_btn: renwulist.MissionTypeString });
					}

				}
				for (var index = 0; index < services.length; index++) {
					let npcserver: CNpcServerConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cnpcServerConfigData[services[index]];
					data.push({ npcserver_btn: npcserver.severStr });
				}
				this._viewUI.server_list.array = data;
				this._viewUI.server_list.repeatY = data.length;
				this._viewUI.server_list.renderHandler = new Laya.Handler(this, this.inithandler);
			}
			else {
				this._viewUI.server_box.visible = false;
			}
			super.show();
			if (AutoHangUpModels.getInstance().autotask == 1) {//自动做任务
				Laya.timer.loop(1000, this, this.selecttaskserver)
			}
		}
		/** 二次对话框加载 */
		public secondDialog(npcKey: number, arr: Array<string>, dialogHtml: string, isDialog?: boolean) {
			this.npckey = npcKey;
			let npc: game.scene.models.NpcBasicVo = game.scene.models.SceneModel.getInstance().npclist.get(npcKey);
			let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[npc.id];
			let npcshape: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[npcinfo.modelID];
			if (npcshape.headID < 10500) {//造型id区分 人物
				this._viewUI.npcicon_img.skin = "common/icon/bustrole/" + npcshape.headID + ".png";
			}
			else if (npcshape.headID < 11000) {//怪物
				this._viewUI.npcicon_img.skin = "common/icon/bustmonster/" + npcshape.headID + ".png";
			}
			else if (npcshape.headID < 11200) {//伙伴
				this._viewUI.npcicon_img.skin = "common/icon/bustpartner/" + npcshape.headID + ".png";
			}
			else {//宠物
				this._viewUI.npcicon_img.skin = "common/icon/bustpet/" + npcshape.headID + ".png";
			}
			console.log("-------对话框----：", dialogHtml);
			if (isDialog) {
				this._viewUI.dialog_html.visible = true;
				this._viewUI.neirong_lab.visible = false;
				this._viewUI.dialog_html.innerHTML = dialogHtml;
			} else {
				this._viewUI.dialog_html.visible = false;
				this._viewUI.neirong_lab.visible = true;
				this._viewUI.neirong_lab.text = dialogHtml;
			}
			this._viewUI.npcname_lab.text = npc.name;
			if (arr.length != 0 && arr) {
				this._viewUI.server_box.visible = true;
				this._viewUI.server_box.y -= 90 * (arr.length - 1);
				this._viewUI.server_box.height += 90 * (arr.length - 1);
				this._viewUI.server_img.height += 90 * (arr.length - 1);
				this._viewUI.server_list.height += 90 * (arr.length - 1);
			}
			var data: Array<any> = [];
			for (var i = 0; i < arr.length; i++) {
				var str = arr[i];
				data.push({ npcserver_btn: str });
			}
			this._viewUI.server_list.array = data;
			this._viewUI.server_list.repeatY = data.length;
			this._viewUI.server_list.renderHandler = new Laya.Handler(this, this.inithandler);
			super.show();
		}
		/**初始化服务响应事件*/
		public inithandler(cell: Box, index: number) {
			let btn: Button = cell.getChildByName("npcserver_btn") as Button;
			btn.on(LEvent.MOUSE_DOWN, this, this.selectserver, [index])
		}
		/**进行服务的区分以及响应的效果*/
		public selectserver(index: number): void {
			if (this.isback) {	//是否是返回
				let PvP5MessDialog = new game.modules.commonUI.NpcDialogMediator(this._app);
				PvP5MessDialog.isback = false;
				PvP5MessDialog.init(this.npckey, this.services, this.scenarioquests, this.contain, this.itemid, this.serverid, this.servername);
			}
			if (this.isRecovery) {
				RequesterProtocols._instance.c2s_pet_sell(modules.pet.models.PetModel.getInstance().yeShengPet[index].petKey);
				this.close();
				return;
			}
			if (this.scenarioquests.length != 0 && index < this.scenarioquests.length) {//支线 或者主线
				if (this.scenarioquests[index] >= 180000 && this.scenarioquests[index] <= 190000) {//主线
					let maininfo: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[this.scenarioquests[index]]
					if (maininfo.MissionType == 12) {//给道具
						game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.ITEMORPETSUBMIT, this, this.mainsubmititem, [this.scenarioquests[index]])
						if (maininfo.ScenarioInfoNpcConversationList.length != 0) {//是否有对话
							this.dialog = new game.modules.commonUI.JuQingMediator(this._app);
							this.dialog.init(this.scenarioquests[index], this.npckey, maininfo.ScenarioInfoNpcConversationList, maininfo.ScenarioInfoNpcID);
						}
						else {
							this.itemsubmit = new game.modules.task.TaskItemChooseMediator(this._app)
							let itemidlist: Array<number> = []
							itemidlist.push(maininfo.ActiveInfoTargetID)
							this.itemsubmit.init(itemidlist)
						}
					}
					else {
						this.dialog = new game.modules.commonUI.JuQingMediator(this._app);
						this.dialog.init(this.scenarioquests[index], this.npckey);
					}
					this.hide();
				}
				else {
					let task: game.modules.task.models.MissionInfoVo = Taskmodels.getInstance().accepttask.get(this.scenarioquests[index])
					if (task.missionstatus == 3) {// 已完成
						this.hide();
						this.dialog = new game.modules.commonUI.JuQingMediator(this._app);
						this.dialog.init(this.scenarioquests[index], this.npckey);
					}
					else {//任务未完成提示
						this.tips();
					}
				}
			}
			//访问npc
			else if ((this.services[index - this.scenarioquests.length] >= 3010 && this.services[index - this.scenarioquests.length] <= 3015) || (this.services[index - this.scenarioquests.length] >= 3019 && this.services[index - this.scenarioquests.length] <= 3021)) {//提交宠物，暂时未知是否有其他的也用该服务 3014->3020
				game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.ITEMORPETSUBMIT, this, this.submit);
				RequesterProtocols._instance.c2s_npc_service(this.npckey, this.services[index - this.scenarioquests.length])
			}
			else if (this.services[index - this.scenarioquests.length] == 100017) {//提交物品
				game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.ITEMORPETSUBMIT, this, this.familytask)
				this.itemsubmit = new game.modules.task.TaskItemChooseMediator(this._app)
				let itemidlist: Array<number> = []
				itemidlist.push(this.itemid)
				this.itemsubmit.init(itemidlist)
			}
			else {
				this.hide();
				chat.models.ChatProxy.getInstance().once(chat.models.NPC_Dialog_Msg, this, this.showS2CNPCDialogTips);
				var _serviceid = this.services[index - this.scenarioquests.length];
				var npcserverinfo: CNpcServerConfigBaseVo;
				if (this.services[index - this.scenarioquests.length]) {
					npcserverinfo = game.modules.mainhud.models.HudModel.getInstance().cnpcServerConfigData[this.services[index - this.scenarioquests.length]];
				}
				switch (_serviceid) {//访问NPC服务需要打开界面在此操作，不满足以下条件的则为领取任务之类
					case 355://无上魔冠
						this.wushangmoguan = new game.modules.commonUI.WuShangMoGuangMediator(this._app)
						this.wushangmoguan.show()
						break;
					case 30000://购买药品(沙老头)
						var yaopinshop = new game.modules.roleinfo.RoleShopMediator(this._app, shopType.DRUG_SHOP);
						if (this.itemid) {
							yaopinshop.onShow(this.itemid);
						}
						else {
							yaopinshop.show();
						}
						break;
					case 30001://购买物品(酒馆、店小二)
						this.buyitem = new game.modules.roleinfo.RoleShopMediator(this._app, shopType.BAR_SHOP);
						if (this.itemid) {
							this.buyitem.onShow(this.itemid);
						}
						else {
							this.buyitem.show();
						}
						break;
					case 30002://购买装备(兵器铺、铁匠)
						var weaponShop = new game.modules.roleinfo.RoleShopMediator(this._app, shopType.WEAPON_SHOP);
						if (this.itemid) {
							weaponShop.onShow(this.itemid);
						}
						else {
							weaponShop.show();
						}
						break;
					case 30003://购买宠物
						this.petshop = new game.modules.commonUI.PetShopMediator(this._app);
						this.petshop.init(this.itemid, 1);
						break;
					case 30004://打开商会					
						ShopModel.getInstance().itemId = this.itemid
						ModuleManager.show(ModuleNames.SHOP, this._app)
						break;
					case 100001://领取寻宝任务						
						this.baozangtask()
						RequesterProtocols._instance.c2s_npc_service(this.npckey, this.services[index - this.scenarioquests.length]);
						this.removeTask(game.scene.models.SceneModel.getInstance().npclist.get(this.npckey).id);
						break;
					case 30005://珍品找回
						let _shopretrieve = new game.modules.commonUI.ShopRetrieveMediator(this._app)
						_shopretrieve.onShow(true);
						break;
					case 100012://宠物仓库
						var _petcangku = new game.modules.pet.PetCangKuMediator(this._app);
						_petcangku.onShow(PetColumnTypes.DEPOT, this.npckey);
						RequesterProtocols._instance.c2s_npc_service(this.npckey, this.services[index - this.scenarioquests.length]);
						break;
					case 100018://天机仙令
						//是否已经参加了天机仙令活动
						if (game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlInfoData.jointime != 0) {
							ModuleManager.show(ModuleNames.TIAN_JI_XIAN_LING, this._app)
						}
						else {
							var _date = new Date();
							RequesterProtocols._instance.c2s_CSetAnYeJoinTime(_date.getTime());
						}
						break;
					case 100209://天将处，精英副本的便捷组队
						let _TeamOrganizeMediator1 = new game.modules.team.TeamOrganizeMediator(this._app);
						_TeamOrganizeMediator1.onshow(TeamSetType.SUPERIOR_FUBEN);
						break;
					case 100400://精英副本
						this.jingyingfuben = new game.modules.commonUI.JingYingFuBenMediator(this._app)
						this.jingyingfuben.show()
						break;
					case 100187://精英副本-重置副本
						RequesterProtocols._instance.c2s_npc_service(this.npckey, _serviceid);
						break;
					case 100049://精英副本-查询次数
						RequesterProtocols._instance.c2s_npc_service(this.npckey, _serviceid);
						break;
					case 100600://礼包兑换码
						this.duihuan = new game.modules.commonUI.LiBaoDuiHuanMediator(this._app)
						this.duihuan.show()
						break;
					case 100602://冠军试炼的便捷组队
						let _TeamOrganizeMediator2 = new game.modules.team.TeamOrganizeMediator(this._app);
						_TeamOrganizeMediator2.onshow(TeamSetType.TIME_ACTIVITY, 6);//6这个写死的数值是定时活动中二级菜单选项里，冠军试炼所在的位置
						break;
					case 100703://回收宠物
						modules.pet.models.PetModel.getInstance().yeShengPet = [];
						for (var i: number = 0; i < PetModel.getInstance().pets.values.length; i++) {
							let petInfo: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.values[i];
							let allpetbase: any = PetModel._instance.petCPetAttrData[petInfo.id];
							var kind: number;//宠物品质
							if (allpetbase.unusualid == 1) {
								kind = allpetbase.kind + allpetbase.unusualid;
							} else {
								kind = allpetbase.kind + allpetbase.unusualid - 1;
							}
							//0为野生，判断是否出战
							if (kind == 0 && PetModel.getInstance().pets.keys[i] != LoginModel.getInstance().roleDetail.petIndex) {
								let recoveryInfo: modules.pet.models.PetRecoveryInfo = new modules.pet.models.PetRecoveryInfo();
								recoveryInfo.petKey = PetModel.getInstance().pets.keys[i];
								recoveryInfo.petName = petInfo.name;
								recoveryInfo.petLevel = petInfo.level;
								modules.pet.models.PetModel.getInstance().yeShengPet.push(recoveryInfo);
							}
						}
						if (modules.pet.models.PetModel.getInstance().yeShengPet.length <= 0) {
							var str = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(140481);
							game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, str);
						} else {
							this.hide();
							let petRecoveryInfo = modules.pet.models.PetModel.getInstance().yeShengPet;
							var datas: Array<string> = [];
							for (var i = 0; i < petRecoveryInfo.length; i++) {
								var name = petRecoveryInfo[i].petName;
								var level = petRecoveryInfo[i].petLevel;
								var str = name + " " + level + "级";
								datas.push(str);
							}
							let petNpcDialog = new game.modules.commonUI.NpcDialogMediator(this._app);
							petNpcDialog.isRecovery = true;
							petNpcDialog.secondDialog(this.npckey, datas, npcserverinfo.servicedescribe, true);
						}
						break;
					case 100800://宠物染色
						this.petranse = new game.modules.commonUI.RanSeMediator(this._app)
						this.petranse.show()
						break;
					case 900050://单人角斗场
						this.qiecuojiemian = new game.modules.commonUI.QieChuoJieMianMediator(this._app)
						this.qiecuojiemian.init(0)
						break;
					case 900051://多人角斗场
						this.qiecuojiemian = new game.modules.commonUI.QieChuoJieMianMediator(this._app)
						this.qiecuojiemian.init(1)
						break;
					case 900052://角斗场观战
						this.qiecuojiemian = new game.modules.commonUI.QieChuoJieMianMediator(this._app)
						this.qiecuojiemian.init(2)
						break;
					case 900053://无上魔冠规则

						break;
					case 910100://决斗规则
						let _juedourule = new game.modules.commonUI.JueDouRuleMediator(this._app)
						_juedourule.show()
						break;
					case 910101://战仙会（生死战）的下战书
						let _letterOfChallenge = new aliveordead.LetterOfChallengeMediator(this._app);
						_letterOfChallenge.show();
						break;
					case 910102://战仙会（生死战）应战
						HudModel.getInstance().useapp = this._app;
						HudModel.getInstance().npckey = this.npckey;
						RequesterProtocols._instance.c2s_CAcceptLiveDieBattleFirst();
						break;
					case 910103://战仙会（生死战）观战
						let _liveDieWatch = new aliveordead.LiveDieWatchMediator(this._app);
						_liveDieWatch.onShow();
						break;
					case 910104://战仙会（生死战）生死榜
						let _liveDieRank = new aliveordead.LiveDieRankListMediator(this._app);
						_liveDieRank.onShow();
						break;
					case 910105://战仙会（生死战） ——是，我要生死战
						RequesterProtocols._instance.c2s_CAcceptLiveDieBattle();
						break;
					case 910108://战仙会（生死战） ——等等我先准备下
						break;
					case 910030://帮派战
						if (family.models.FamilyModel.getInstance().clanid == 0) {//无帮派
							let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[410049];
							this._tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
							this._tips.onShow(chattext.msg)
						}
						break;
					case 910031://帮派战介绍
						this.familybatlle = new game.modules.family.FamilyBattleViewMediator(this._app)
						this.familybatlle.show()
						break;
					case 910106://镇魂石商店
						let _shenshoushop = new game.modules.commonUI.ShopYaoHunYuMediator(this._app)
						_shenshoushop.show()
						break;
					case 910107://提升神兽
						let _shenshoutisheng = new game.modules.commonUI.PetTiShengMediator(this._app)
						_shenshoutisheng.show()
						break;
					case 910118://兑换藏宝图
						break
					case 910119://黑市

						break;
					case 910111://重置神兽
						let _PetBattleChangeMediator = new PetBattleChangeMediator(this._app);
						_PetBattleChangeMediator.onShow();
						break;
					case 910112: //查看神兽
						game.modules.pet.models.PetModel.getInstance().tabnum = 3
						game.modules.pet.models.PetModel.getInstance().tujiannum = 2
						ModuleManager.show(ModuleNames.PET, this._app)
						break;
					case 4000://在蒙面神捕处领取日常副本任务
						//预先监听接取了日常副本任务返回消息
						game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.NEWTASK, this, this.showNPCDialogTips, [this.npckey]);
						//以上判断通过后,发起接取日常副本任务的请求
						RequesterProtocols._instance.c2s_npc_service(this.npckey, 4000);
						this.removeTask(game.scene.models.SceneModel.getInstance().npclist.get(this.npckey).id);
						break;
					case 4003://在蒙面神捕处，日常副本的便捷组队
						let _TeamOrganizeMediator3 = new game.modules.team.TeamOrganizeMediator(this._app);
						_TeamOrganizeMediator3.onshow(TeamSetType.DAILY_FUBEN);
						break;
					case 100309://帮派求助     
						if (modules.mainhud.models.HudModel._instance.qiuzhuBP == 0) {
							modules.mainhud.models.HudModel._instance.qiuzhuBP = 60;
							modules.mainhud.models.HudProxy._instance.event(modules.mainhud.models.REFRESH_TIME, ["bangpai"]);
							game.modules.chat.models.ChatProxy.getInstance().once(game.modules.chat.models.SYS_MSG_IN_CHANNEL, this, this.goChat, [4]);
							this.sendMsg(ChannelType.CHANNEL_CLAN, this.scenarioquests[0]);
						} else {
							var str = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(160238, [modules.mainhud.models.HudModel._instance.qiuzhuBP]);
							this._tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
							this._tips.onShow(str);
						}
						break;
					case 100310://全服求助	
						if (modules.mainhud.models.HudModel._instance.qiuzhuQF == 0) {
							modules.mainhud.models.HudModel._instance.qiuzhuQF = 30;
							modules.mainhud.models.HudProxy._instance.event(modules.mainhud.models.REFRESH_TIME, ["quanfu"]);
							game.modules.chat.models.ChatProxy.getInstance().once(game.modules.chat.models.SYS_MSG_IN_CHANNEL, this, this.goChat, [6]);
							this.sendMsg(ChannelType.CHANNEL_TEAM_APPLY, this.scenarioquests[0]);
						} else {
							var str = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150028, [modules.mainhud.models.HudModel._instance.qiuzhuQF]);
							this._tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
							this._tips.onShow(str);
						}
						break;
					case 910010://叁对叁证道战参加	
						RequesterProtocols._instance.c2s_CGameTime();
						modules.mainhud.models.HudProxy.getInstance().once(modules.mainhud.models.SERVER_TIME, this, this.getTime, ["3v3", this.services[index - this.scenarioquests.length]]);
						break;
					case 910011://叁对叁证道战说明
						var datas: Array<string> = [];
						datas.push("返回");
						let PvP3MessDialog = new game.modules.commonUI.NpcDialogMediator(this._app);
						PvP3MessDialog.isback = true;
						PvP3MessDialog.npckey = this.npckey;
						PvP3MessDialog.services = this.services;
						PvP3MessDialog.scenarioquests = this.scenarioquests;
						PvP3MessDialog.contain = this.contain;
						PvP3MessDialog.itemid = this.itemid;
						PvP3MessDialog.serverid = this.serverid;
						PvP3MessDialog.servername = this.servername;
						PvP3MessDialog.secondDialog(this.npckey, datas, npcserverinfo.servicedescribe, true);
						break;
					case 910015://叁对叁证道战领奖
						var datas: Array<string> = [];
						datas.push("首胜奖励");
						datas.push("十战奖励");
						datas.push("五胜奖励");
						let PvP3NpcDialog = new game.modules.commonUI.NpcDialogMediator(this._app);
						PvP3NpcDialog.services = npcserverinfo.childservice;
						PvP3NpcDialog.secondDialog(this.npckey, datas, this.chat);
						break;
					case 910020://伍对伍证道战参加
						RequesterProtocols._instance.c2s_CGameTime();
						modules.mainhud.models.HudProxy.getInstance().once(modules.mainhud.models.SERVER_TIME, this, this.getTime, ["5v5", this.services[index - this.scenarioquests.length]]);
						break;
					case 910021://伍对伍证道战说明
						var datas: Array<string> = [];
						datas.push("返回");
						let PvP5MessDialog = new game.modules.commonUI.NpcDialogMediator(this._app);
						PvP5MessDialog.isback = true;
						PvP5MessDialog.npckey = this.npckey;
						PvP5MessDialog.services = this.services;
						PvP5MessDialog.scenarioquests = this.scenarioquests;
						PvP5MessDialog.contain = this.contain;
						PvP5MessDialog.itemid = this.itemid;
						PvP5MessDialog.serverid = this.serverid;
						PvP5MessDialog.servername = this.servername;
						PvP5MessDialog.secondDialog(this.npckey, datas, npcserverinfo.servicedescribe, true);
						break;
					case 910025://伍对伍证道战领奖
						var datas: Array<string> = [];
						datas.push("首胜奖励");
						datas.push("五战奖励");
						let PvP5pcDialog = new game.modules.commonUI.NpcDialogMediator(this._app);
						PvP5pcDialog.services = npcserverinfo.childservice;
						PvP5pcDialog.secondDialog(this.npckey, datas, this.chat);
						break;
					default:
						RequesterProtocols._instance.c2s_npc_service(this.npckey, this.services[index - this.scenarioquests.length]);
						break;
				}
			}
		}
		public getTime(str: string, serviceId: number, nowTime: number) {
			var date = new Date();
			var date1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 21:00:00";
			var startTime = new Date(date1).getTime();
			let dialog = new game.modules.commonUI.NpcDialogMediator(this._app);
			var _teaminfo = modules.team.models.TeamModel.getInstance().teamMemberBasic.values;
			let roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
			switch (str) {
				case "3v3":
					var date3v3 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 22:00:00";
					var endTime3v3 = new Date(date3v3).getTime();
					var arr: Array<string> = [];
					for (var i = 0; i < _teaminfo.length; i++) {
						if (_teaminfo[i].level < 45) {
							arr.push(_teaminfo[i].rolename);
						}
					}
					if (!((date.getDay() == 3 || date.getDay() == 6) && startTime <= nowTime && nowTime <= endTime3v3)) {
						this._tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
						this._tips.onShow(game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(140434));
					} else if (roleDetail.level < 45 && _teaminfo.length <= 0) {
						dialog.secondDialog(this.npckey, [], "你等级不足45级，无法参加3v3竞技场");
					} else if (_teaminfo && _teaminfo.length > 3) {
						dialog.secondDialog(this.npckey, [], "参与此活动的队伍人数不可超过3人");
					} else if (arr && arr.length > 0) {
						var str: string = "";
						for (var j = 0; j < arr.length; j++) {
							if (j == 0) {
								str += arr[j];
							} else {
								str = str + "、" + arr[j];
							}
						}
						dialog.secondDialog(this.npckey, [], "队伍成员" + str + "等级不足45级，无法参加3v3竞技场");
					} else {
						RequesterProtocols._instance.c2s_npc_service(this.npckey, serviceId);
					}
					break;
				case "5v5":
					var date5v5 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 23:00:00";
					var endTime5v5 = new Date(date5v5).getTime();
					if (!(date.getDay() == 0 && startTime <= nowTime && nowTime <= endTime5v5)) {
						this._tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
						this._tips.onShow(game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(140434));
					} else if (roleDetail.level < 50) {
						dialog.secondDialog(this.npckey, [], "你等级不足50级，无法参加5V5竞技场");
					} else if (_teaminfo && _teaminfo.length > 0) {
						dialog.secondDialog(this.npckey, [], "5V5竞技场不可组队进场");
					} else {
						RequesterProtocols._instance.c2s_npc_service(this.npckey, serviceId);
					}
					break;
			}
		}
		/** 发送聊天信息 */
		public sendMsg(channel: number, taskId: number) {
			//角色基本数据
			var _roleBasicData: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) as game.scene.models.RoleBasicVo;
			//队伍信息数据
			var _teaminfo = _roleBasicData.rolebasicOctets.datas.get(2);
			//判断是否有队伍
			if (!_teaminfo) {
				RequesterProtocols._instance.c2s_CCreateTeam();
			}
			let disPlayInfo: modules.chat.models.DisplayInfoVo;
			disPlayInfo = new modules.chat.models.DisplayInfoVo();
			disPlayInfo.displaytype = DisplayType.DISPLAY_TASK;
			disPlayInfo.roleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
			let info: MissionCMainMissionInfoBaseVo = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[taskId];
			disPlayInfo.shopid = info.MissionType;
			disPlayInfo.counterid = 1;
			disPlayInfo.uniqid = taskId;
			disPlayInfo.teamid = 0;/** 任务类型为师门时，这里 */
			disPlayInfo.crosstt = 0;
			disPlayInfo.serverid = 0;
			var msg = this.scenarioquests[0] + "*qz[" + game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[taskId].MissionName + "]";
			RequesterProtocols._instance.c2s_CTransChatMessage2Serv(channel, msg, "", [disPlayInfo], FunModelType.QIU_ZHU, taskId);
		}
		/** 打开聊天窗口 */
		public goChat(chatNum: number): void {
			ChatModel.getInstance().Firstchannel = chatNum;
			ModuleManager.show(ModuleNames.Chat, this._app);
		}
		/**
		 * 显示服务器下发的NPC对话消息
		 */
		private showS2CNPCDialogTips(text: any): void {
			this.showNPCDialogTips(this.npckey, text, TipsMsgType.TIPS_NPCTALK);
		}
		/** 领取完任务后去除npc身上的任务 */
		private removeTask(npcId: number): void {
			for (var key = 0; key < Taskmodels.getInstance().acceptableTask.length; key++) {
				let accepttable: AcceptableTaskBaseVo = Taskmodels.getInstance().acceptableTaskData[Taskmodels.getInstance().acceptableTask[key]];
				if (accepttable.destnpcid == npcId) {
					Taskmodels.getInstance().acceptableTask.splice(key, 1);
				}
			}
		}
		/**
		 * 显示NPC、明雷怪物等对话提示
		 * @param npckey NPC的key，可以找到对应的NPC的id
		 * @param dialogtext 对白文字内容
		 * @param tiptype 对话类型
		 */
		public showNPCDialogTips(npckey: number, dialogtext: string, tiptype?: number): void {
			let _npc: game.scene.models.NpcBasicVo = game.scene.models.SceneModel.getInstance().npclist.get(npckey);//根据NPC的key获得NPC数据
			if (!_npc) return;
			let _npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[_npc.id];//根据NPC数据里的id获得对应NPC配置数据
			let _npcshape: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[_npcinfo.modelID];//根据NPC配置数据里的模型ID获得对应NPC模型编号
			if (_npcshape.headID < 10500) {//造型id区分 人物
				this._viewUI.npcicon_img.skin = "common/icon/bustrole/" + _npcshape.headID + ".png";
			}
			else if (_npcshape.headID < 11000) {//怪物
				this._viewUI.npcicon_img.skin = "common/icon/bustmonster/" + _npcshape.headID + ".png";
			}
			else if (_npcshape.headID < 11200) {//伙伴
				this._viewUI.npcicon_img.skin = "common/icon/bustpartner/" + _npcshape.headID + ".png";
			}
			else {//宠物
				this._viewUI.npcicon_img.skin = "common/icon/bustpet/" + _npcshape.headID + ".png";
			}
			this._viewUI.npcname_lab.text = _npc.name;
			if (!dialogtext) {
				let talktext = game.modules.task.models.TaskModel.getInstance().cRepeatTaskChatData[10].strmsg;
				talktext = talktext.replace('<T t="', "");
				talktext = talktext.replace('"></T>', "");
				let _schooltask = game.modules.task.models.TaskModel.getInstance().schooltask;
				let _mapid = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[_schooltask.get(1030000).dstnpcid].mapid;
				let MapData: WorldMapConfigBaseVo = MapModel.getInstance().WorldMapConfigData[_mapid];
				talktext = talktext.replace('$NPCName$', MapData.mapName);
				if (talktext) {
					dialogtext = talktext;
				}
				else {
					dialogtext = "... ...";
				}
			}
			if (tiptype) {//NPC对话提示
				this._viewUI.dialog_html.visible = true;
				this._viewUI.neirong_lab.visible = false;
				this._viewUI.dialog_html.style.align = "center";
				this._viewUI.dialog_html.innerHTML = dialogtext;
				this._viewUI.dialog_html.style.padding = [(this._viewUI.dialog_html.height - this._viewUI.dialog_html.contextHeight) / 2, 0, 0, 0];
			}
			else {
				this._viewUI.dialog_html.visible = false;
				this._viewUI.neirong_lab.visible = true;
				this._viewUI.neirong_lab.text = dialogtext;
			}
			this._viewUI.server_box.visible = false;
			this.show();
		}
		/**提交宠物*/
		public submit(taskid: number, npckey: number, submittype: number, availableids: Array<any>, availablepos: number): void {//上交 任务id npckey 提交类型 
			if (submittype == 2) {//宠物
				this.taskcommit = new game.modules.task.TaskPetChooseMediator(this._app);
				this.taskcommit.init(taskid, npckey, submittype);
				game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.TAKSREFRESH, this, this.tasksucess);
			}

			this.hide();
		}
		/**主线提交道具 任务服务id	*/
		public mainsubmititem(services: number): void {
			this.dialog = new game.modules.commonUI.JuQingMediator(this._app)
			this.dialog.init(services, this.npckey)
		}
		/**帮派任务*/
		public familytask(itemkey: number): void {
			let talkinfo: CRepeatTaskChatBaseVo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskChatData[8]
			this._viewUI.neirong_lab.text = talkinfo.strmsg
			this.show()
			this._viewUI.server_box.visible = false
			this._viewUI.allcontrol_img.mouseEnabled = true;
			let submit: game.modules.task.models.SubmitUnitVo = new game.modules.task.models.SubmitUnitVo();
			let submitinfo: Array<game.modules.task.models.SubmitUnitVo> = [];
			submit.key = itemkey
			submit.num = 1
			submitinfo[0] = submit
			RequesterProtocols._instance.c2s_submit_2npc(1060000, this.npckey, 1, submitinfo);
		}
		/**藏宝图兑换不足时的内容*/
		public baozangtask(): void {
			let talkinfo: CRepeatTaskChatBaseVo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskChatData[11]
			this._viewUI.neirong_lab.text = talkinfo.strmsg
			this.show()
			this._viewUI.server_box.visible = false
			this._viewUI.allcontrol_img.mouseEnabled = true;
		}
		/**师门提交*/
		public tasksucess(): void {
			let talkinfo: CRepeatTaskChatBaseVo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskChatData[game.modules.task.models.TaskModel.getInstance().chattype]
			this._viewUI.neirong_lab.text = talkinfo.strmsg
			this.show();
			this._viewUI.server_box.visible = false
			this._viewUI.allcontrol_img.mouseEnabled = true;
			Laya.timer.loop(1000, this, this.closewind)
		}
		/**任务未完成时的tips*/
		public tips(): void {
			let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[141714];
			this._viewUI.neirong_lab.text = chattext.msg
			this.autotime = 0
			this.show();
			this._viewUI.server_box.visible = false
			this._viewUI.allcontrol_img.mouseEnabled = true;
			Laya.timer.loop(1000, this, this.closewind)
		}
		/**自动对话直至关闭*/
		public closewind() {
			this.autotime += 1;
			if (this.autotime >= 2) {//是否大于两秒
				mainhud.models.HudModel.getInstance().autobatt.init()
				this.close()
			}
		}
		/**自动做任务选择服务 */
		public selecttaskserver(): void {
			this.autotime += 1;
			if (this.autotime >= 3 && AutoHangUpModels.getInstance().autotask == 1) {
				this.selectserver(0)
			}
		}
		public show() {
			super.show();
		}
		public close() {
			mainhud.models.HudModel.getInstance().autobatt.init()
			this.hide()
		}
		public hide() {
			this.isback = false;
			this.isRecovery = false;
			Laya.timer.clear(this, this.selecttaskserver)
			chat.models.ChatProxy.getInstance().offAll(chat.models.NPC_Dialog_Msg);
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}