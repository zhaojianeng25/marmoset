/**
* 宠物炼宠
*/
module game.modules.pet {
	export class PetLianChongMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PetProPertylianchongUI;
		/**洗练确认界面*/
		private _xilianqueren: PetXiLianQueRenMediator;
		/**合宠结果界面*/
		private _hechengresult: PetHechongResultMediator;
		/**选择合宠宠物界面*/
		private _selectpet: PetSelectMediator;
		/**技能书选择界面*/
		private _petskillstudy: PetSelectSkillMediator;
		/**技能认证界面*/
		private _petskillrenzheng: PetSkillRenZhengMediator;
		/**消息提示*/
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		/**快捷购买*/
		private buykuaijie: game.modules.commonUI.BuyKuaiJieMediator
		/**宠物商店*/
		private petshop: game.modules.commonUI.PetShopMediator
		/**tips信息*/
		private _tipsModule: game.modules.tips.tipsModule;
		/**提示框*/
		private texttips: game.modules.commonUI.TextTipsMediator
		/**使用道具二次确认*/
		private remind: game.modules.commonUI.RemindViewMediator
		/**宠物技能id*/
		public petskillid: number;
		/**宠物模型*/
		public model: ModelsCreate;
		/**模型场景*/
		private scene2DPanel: TestRole2dPanel
		/**宠物品质框*/
		public colour: Array<string> = ["lvkuang.png", "lankuang.png", "zikuang.png", "jinkuang.png"];
		/**宠物种类*/
		public kind: Array<string> = ["common/ui/pet/chongwu_yesheng.png", "common/ui/pet/chongwu_bb.png",
			"common/ui/pet/chongwu_bianyi.png", "common/ui/pet/baobaolingshou.png",
			"common/ui/pet/bianyilingshou.png", "common/ui/pet/chongwu_shenshou.png"];
		/**选择的第一只宠物key*/
		public selectpetkey1: number;
		/**选择第二只宠物key*/
		public selectpetkey2: number;
		/**道具id*/
		public itemid: number;
		/**是否法术认证*/
		public iscertification: number = 0;
		/**上次选择的宠物*/
		public lastbox: Box
		/**洗练道具数量*/
		public xilianitem: number;
		/**预览技能列表*/
		public yulanskill: Array<game.modules.pet.models.PetSkillVo> = []
		/**判断是否有重复技能*/
		public isrepeat: number = 0
		/**是否有必带技能*/
		public isbring: number = 0
		/** 合宠特效 */
		private petAni: Laya.Animation;
		constructor(uiLayaer: Sprite) {
			super(uiLayaer);
			this._viewUI = new ui.common.PetProPertylianchongUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = false;
			this.model = new ModelsCreate()
			this.scene2DPanel = new TestRole2dPanel()
			this._viewUI.xilian_img.addChild(this.scene2DPanel)
			this._viewUI.item_img.on(LEvent.MOUSE_DOWN, this, this.itemtips)
			this._viewUI.attack_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11815])
			this._viewUI.defence_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11816])
			this._viewUI.magic_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11817])
			this._viewUI.phy_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11818])
			this._viewUI.speed_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11819])
			this._viewUI.grow_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11820])
			this._viewUI.pets_img.on(LEvent.MOUSE_DOWN, this, this.showdata, [11814])
			this._viewUI.pingfen_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11813])
			this._viewUI.on(LEvent.MOUSE_UP, this, this.hidedata);
			this._viewUI.on(LEvent.MOUSE_OUT, this, this.hidedata);
			game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_BAG_DEPOT_COUNT, this, this.initdata)
			this._viewUI.selectpet_list.renderHandler = new Laya.Handler(this, this.initselect);
		}
		/**显示TIPS*/
		public showdata(textid: number): void {
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[textid]
			this.texttips.init(chattext.msg, this._viewUI.mouseX, this._viewUI.mouseY);
		}
		/**隐藏TIPS*/
		public hidedata(): void {
			if (this.texttips) {
				this.texttips.hide()
			}
		}
		/**初始化数据*/
		public show(): void {
			super.show();
			var parentui: any = this._viewUI.parent
			this.scene2DPanel.ape.x = parentui.x * parentui.globalScaleX
			this.scene2DPanel.ape.y = parentui.y * parentui.globalScaleY
			this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			this._selectpet = new PetSelectMediator(this._app);
			this.texttips = new game.modules.commonUI.TextTipsMediator(this._app)
			this.remind = new game.modules.commonUI.RemindViewMediator(this._viewUI, this._app)
			this.selectpetkey1 = -1;
			this.selectpetkey2 = -1;
			this.initdata();
			this.initpetlist();
			this.refreshhechonginfo();
			this.petskillid = 0;
			this._viewUI.lianchong_tab.selectHandler = new Laya.Handler(this, this.selectbtn);
			this._viewUI.xichong_btn.clickHandler = new Laya.Handler(this, this.xichong);
			this._viewUI.xiliantishi_btn.clickHandler = new Laya.Handler(this, this.xiliantishi);
			this._viewUI.hechengtishi_btn.clickHandler = new Laya.Handler(this, this.hechengtishi);
			this._viewUI.skilltishi1_btn.clickHandler = new Laya.Handler(this, this.skilltishi1);
			this._viewUI.skilltishi2_btn.clickHandler = new Laya.Handler(this, this.skilltishi2);
			this._viewUI.pethecheng_btn.clickHandler = new Laya.Handler(this, this.pethecheng);
			this._viewUI.petadd1_btn.clickHandler = new Laya.Handler(this, this.addpet1);
			this._viewUI.petadd2_btn.clickHandler = new Laya.Handler(this, this.addpet2);
			this._viewUI.fashurenzhen_btn.clickHandler = new Laya.Handler(this, this.fashurenzhen);
			this._viewUI.addskill_btn.clickHandler = new Laya.Handler(this, this.studyskill);
			this._viewUI.study_btn.clickHandler = new Laya.Handler(this, this.study);
			this._viewUI.addskill_btn.visible = true;
			this._viewUI.studyicon_img.visible = false;
			this._viewUI.studyicon_img.on(Laya.Event.CLICK, this, this.studyskill);
			this._viewUI.studykuang_img.skin = "common/ui/tongyong/kuang94.png";
			if (PetModel.getInstance().studyskill != -1) {
				this._viewUI.lianchong_tab.selectedIndex = PetModel._instance.studyskill
			}
			//派发监听
			this.selectbtn(this._viewUI.lianchong_tab.selectedIndex)
			models.PetProxy.getInstance().on(models.REFRESH_EVENT, this, this.refreshpetinfo);
			models.PetProxy.getInstance().on(models.STUDYPETSELECT_EVENT, this, this.petskillselect);
			models.PetProxy.getInstance().on(models.REFRESHSELECT_EVNT, this, this.refreshinfo);
			models.PetProxy.getInstance().on(models.HECHONG_EVENT, this, this.hechongresult);
			models.PetProxy.getInstance().on(models.XILIAN_PET_BAY, this, this.petxilianbay);
		}
		/**初始化技能*/
		public initpetskill(): void {
			var data: Array<any> = [];
			for (var index: number = 0; index < 12; index++) {//12为最多显示技能的格子数
				if (index < PetModel.getInstance().petbasedata.skills.length) {
					let petskill: PetSkillConfigBaseVo = PetModel.getInstance().petSkillConfigData[PetModel.getInstance().petbasedata.skills[index].skillId] as PetSkillConfigBaseVo;
					let petdata: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id] as PetCPetAttrBaseVo;
					let isbindskill: Array<number> = petdata.isbindskill;
					if (petskill.skilltype == 1) {//宠物技能类型 1为被动 2主动
						if (index < isbindskill.length)
							data.push({ skill_img: "common/ui/pet/beiji" + petskill.color + ".png", peticon_img: "common/icon/skill/" + petskill.icon + ".png", bangding_img: "common/ui/pet/bangding.png" });
						else
							data.push({ skill_img: "common/ui/pet/beiji" + petskill.color + ".png", peticon_img: "common/icon/skill/" + petskill.icon + ".png", bangding_img: "" });
					}
					else {
						let skill: game.modules.pet.models.PetSkillVo = PetModel._instance.petskill[index];
						if (!skill) continue;
						if (index < isbindskill.length)//是否是绑定技能
							data.push({ skill_img: "common/ui/pet/zhuji" + petskill.color + ".png", peticon_img: "common/icon/skill/" + petskill.icon + ".png", bangding_img: "common/ui/pet/bangding.png" });
						else if (skill.certification == 1) {//是否已认证 1为已认证
							data.push({ skill_img: "common/ui/pet/zhuji" + petskill.color + ".png", peticon_img: "common/icon/skill/" + petskill.icon + ".png", bangding_img: "common/ui/pet/renzheng.png" });
							this.iscertification = 1;//1代表已经认证
						}
						else
							data.push({ skill_img: "common/ui/pet/zhuji" + petskill.color + ".png", peticon_img: "common/icon/skill/" + petskill.icon + ".png", bangding_img: "" });
					}
				}
				else {
					data.push({ skill_img: "common/ui/tongyong/kuang94.png", peticon_img: "", bangding_img: "" });
				}
			}
			this._viewUI.petskill_list.array = data;
			this._viewUI.petskill_list.vScrollBarSkin = "";
			this._viewUI.petskill_list.repeatY = data.length
			this._viewUI.petskill_list.scrollBar.elasticBackTime = 200;
			this._viewUI.petskill_list.scrollBar.elasticDistance = 50;
			this._viewUI.allskill_list.array = data;
			this._viewUI.allskill_list.vScrollBarSkin = "";
			this._viewUI.allskill_list.repeatY = data.length
			this._viewUI.allskill_list.scrollBar.elasticBackTime = 200;
			this._viewUI.allskill_list.scrollBar.elasticDistance = 50;
			this._viewUI.petskill_list.renderHandler = new Laya.Handler(this, this.iniskill)
			this._viewUI.allskill_list.renderHandler = new Laya.Handler(this, this.iniskill)
			if (this.iscertification == 1) {//是否认证 1为认证
				let strinfo: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11120]
				this._viewUI.fashurenzhen_btn.label = strinfo.msg;
			}
			else {
				let strinfo: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11121]
				this._viewUI.fashurenzhen_btn.label = strinfo.msg;
			}
		}
		/**技能响应事件*/
		public iniskill(cell: Box, index: number): void {
			let skill: Laya.Image = cell.getChildByName("peticon_img") as Laya.Image
			skill.on(LEvent.MOUSE_DOWN, this, this.skillstips, [index])
		}
		/**初始化宠物列表*/
		public initpetlist(): void {
			var data: Array<any> = [];
			let score: string = "";
			let lock: string = "";
			for (let p in PetModel.getInstance().pets.keys) {
				let getdata: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(PetModel.getInstance().pets.keys[p]);
				if (getdata == null)//拿到的宠物数据是否为空
					continue;
				let allpetbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[getdata.id];
				let icondata: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid];
				if (getdata.petscore >= allpetbase.treasureScore)//是否为珍品
					score = "common/ui/tongyong/zhenpin.png";
				else
					score = "";
				/** 是否上锁 */
				if (getdata.flag == 2) lock = "common/ui/tongyong/suo.png";
				else lock = "";
				if (parseInt(p) == PetModel.getInstance().currentselect) {//是否为当前选择宠物
					if (PetModel.getInstance().pets.keys[p] == LoginModel.getInstance().roleDetail.petIndex) {//是否为出战宠物
						if (getdata.kind == 1)//是否为稀有宠物
							data.push({ listpetname_lab: getdata.name, petadd_lab: "", petlv_lab: "LV." + getdata.level, zhandou_img: "common/ui/pet/chongwu_zhan.png", zhenpin_img: score, iconpet_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 2], lockimg_img: lock });
						else {
							data.push({ listpetname_lab: getdata.name, petadd_lab: "", petlv_lab: "LV." + getdata.level, zhandou_img: "common/ui/pet/chongwu_zhan.png", zhenpin_img: score, iconpet_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 2], lockimg_img: lock });
						}
					}
					else {
						data.push({ listpetname_lab: getdata.name, petadd_lab: "", petlv_lab: "LV." + getdata.level, zhandou_img: "", zhenpin_img: score, iconpet_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 2], lockimg_img: lock });
					}
				}
				else {
					if (PetModel.getInstance().pets.keys[p] == LoginModel.getInstance().roleDetail.petIndex)//是否为出战宠物
						data.push({ listpetname_lab: getdata.name, petadd_lab: "", petlv_lab: "LV." + getdata.level, zhandou_img: "common/ui/pet/chongwu_zhan.png", zhenpin_img: score, iconpet_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 2], lockimg_img: lock });
					else
						data.push({ listpetname_lab: getdata.name, petadd_lab: "", petlv_lab: "LV." + getdata.level, zhandou_img: "", zhenpin_img: score, iconpet_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 2], lockimg_img: lock });
				}
			}
			if (game.modules.createrole.models.LoginModel.getInstance().roleDetail.petmaxnum > PetModel.getInstance().pets.keys.length) {//已拥有的宠物是否满了
				data.push({ listpetname_lab: "", petlv_lab: "", zhandou_img: "", petadd_lab: "添加宠物", zhenpin_img: "", kuang_img: "common/ui/tongyong/kuang94.png", iconpet_img: "common/ui/pet/chongwu_jiahao.png", lockimg_img: "" });
			}
			this._viewUI.selectpet_list.array = data;
			this._viewUI.selectpet_list.vScrollBarSkin = "";
			this._viewUI.selectpet_list.repeatY = data.length
			this._viewUI.selectpet_list.scrollBar.elasticBackTime = 200;
			this._viewUI.selectpet_list.scrollBar.elasticDistance = 0;

		}
		/**模型创建*/
		modelcreate(modelid: number): void {
			if (this.model.role3d) {//拥有模型及移除
				this.scene2DPanel.removeSceneChar(this.model.role3d)
			}
			var parentui: any = this._viewUI.parent
			if (parentui) {//是否拥有父节点
				this.model.role3d = new YxChar3d();
				this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
				this.model.role3d.set2dPos((this._viewUI.xilian_img.x + this._viewUI.pet_img.width / 2) * parentui.globalScaleX * 1.17, (this._viewUI.xilian_img.y + this._viewUI.pet_img.height + this._viewUI.pet_img.y) * parentui.globalScaleY * 1.17);
				this.model.role3d.scale = 1;
				this.model.role3d.rotationY = 135
				this.model.role3d.rotationX = 0
				this.scene2DPanel.addSceneChar(this.model.role3d)
			}
		}
		/**初始化数据*/
		public initdata(): void {
			this.iscertification = 0;
			this._viewUI.petname_lab.changeText(PetModel.getInstance().petbasedata.name);
			let petCPetAttrBaseVo: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id] as PetCPetAttrBaseVo;
			this.modelcreate(petCPetAttrBaseVo.modelid)
			this._viewUI.petname_lab.color = "#" + petCPetAttrBaseVo.colour;//洗练界面
			this._viewUI.namepet_lab.changeText(PetModel.getInstance().petbasedata.name);
			this._viewUI.namepet_lab.color = "#" + petCPetAttrBaseVo.colour.substring(2, petCPetAttrBaseVo.colour.length);//学技能界面
			this._viewUI.attack_lab.changeText(PetModel.getInstance().petbasedata.attackapt + "");
			this._viewUI.defence_lab.changeText(PetModel.getInstance().petbasedata.defendapt + "");
			this._viewUI.magic_lab.changeText(PetModel.getInstance().petbasedata.magicapt + "");
			this._viewUI.phy_lab.changeText(PetModel.getInstance().petbasedata.phyforceapt + "");
			this._viewUI.speed_lab.changeText(PetModel.getInstance().petbasedata.speedapt + "");
			this._viewUI.growgrate_lab.changeText((PetModel.getInstance().petbasedata.growrate / 1000).toFixed(3) + "");
			this._viewUI.attack_pro.value = (PetModel.getInstance().petbasedata.attackapt - petCPetAttrBaseVo.attackaptmin) / (petCPetAttrBaseVo.attackaptmax - petCPetAttrBaseVo.attackaptmin)
			this._viewUI.defence_pro.value = (PetModel.getInstance().petbasedata.defendapt - petCPetAttrBaseVo.defendaptmin) / (petCPetAttrBaseVo.defendaptmax - petCPetAttrBaseVo.defendaptmin)
			this._viewUI.magic_pro.value = (PetModel.getInstance().petbasedata.magicapt - petCPetAttrBaseVo.magicaptmin) / (petCPetAttrBaseVo.magicaptmax - petCPetAttrBaseVo.magicaptmin)
			this._viewUI.phy_pro.value = (PetModel.getInstance().petbasedata.phyforceapt - petCPetAttrBaseVo.phyforceaptmin) / (petCPetAttrBaseVo.phyforceaptmax - petCPetAttrBaseVo.phyforceaptmin)
			this._viewUI.speed_pro.value = (PetModel.getInstance().petbasedata.speedapt - petCPetAttrBaseVo.speedaptmin) / (petCPetAttrBaseVo.speedaptmax - petCPetAttrBaseVo.speedaptmin)
			//成长率判断
			if (PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id].growrate[6] == PetModel.getInstance().petbasedata.growrate) {
				this._viewUI.growgrate_progressbar.value = 1;
			}
			else {
				this._viewUI.growgrate_progressbar.value = (PetModel.getInstance().petbasedata.growrate - PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id].growrate[0]) / (PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id].growrate[6] - PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id].growrate[0]);
			}
			if (PetModel.getInstance().petbasedata.kind == 4) {//宠物类型 4为神兽
				this._viewUI.xilian_box.visible = false;
			}
			else {
				this._viewUI.xilian_box.visible = true;
				let petbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id];
				let bag: game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[1];
				let count: number = 0;
				for (var index = 0; index < bag.items.length; index++) {
					let item: game.modules.bag.models.ItemVo = bag.items[index];
					if (item.id == petbase.washitemid) {//洗练道具ID
						count = item.number;
					}
				}
				this.xilianitem = count
				let item: ItemAttrBaseVo = BagModel.getInstance().itemAttrData[petbase.washitemid] as ItemAttrBaseVo;
				this._viewUI.item_img.skin = "common/icon/item/" + item.icon + ".png";
				this._viewUI.kuang_img.skin = "common/ui/tongyong/" + this.colour[item.nquality - 2]
				this._viewUI.xilianshuliang_lab.changeText(count + "/" + petbase.washitemnum);
				this.itemid = petbase.washitemid;
			}
			let pets: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id] as PetCPetAttrBaseVo;
			if (pets.unusualid == 1) {//是否是稀有宠物
				this._viewUI.petbb_img.skin = this.kind[PetModel.getInstance().petbasedata.kind + pets.unusualid]
				this._viewUI.pets_img.skin = this.kind[PetModel.getInstance().petbasedata.kind + pets.unusualid]
			}
			else {
				this._viewUI.petbb_img.skin = this.kind[PetModel.getInstance().petbasedata.kind - 1 + pets.unusualid]
				this._viewUI.pets_img.skin = this.kind[PetModel.getInstance().petbasedata.kind - 1 + pets.unusualid]
			}
			this._viewUI.petscore_lab.text = PetModel.getInstance().petbasedata.petscore + "";
			this._viewUI.fenshu_lab.text = PetModel.getInstance().petbasedata.petscore + "";
			this.initpetskill();
		}
		public hide(): void {
			PetModel.getInstance().studyskill = -1
			this.hidedata()
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
		/**洗练宠物*/
		public xichong(): void {
			if (PetModel.getInstance().petbasedata.key != LoginModel.getInstance().roleDetail.petIndex) {
				//如果宠物身上携带装备
				let baginfo: Laya.Dictionary = game.modules.bag.models.BagModel.getInstance().bagMap[9]
				let bag: game.modules.bag.models.BagVo = baginfo.get(PetModel._instance.petbasedata.key)
				if (bag) {//背包是否有数据
					if (bag.items.length != 0) {
						let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[191055];
						let tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
						tips.onShow(chattext.msg);
						return;
					}
				}
				//绑定的宠物不能洗练
				if (PetModel._instance.petbasedata.flag == 1) {
					let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150049];
					let tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
					tips.onShow(chattext.msg);
					return;
				}
				//锁定宠物不能出战
				if (PetModel._instance.petbasedata.flag == 2) {
					let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150048];
					let tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
					tips.onShow(chattext.msg);
					return;
				}
				//判断材料够不够，不够跳转到购买界面
				let petbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id];
				if (this.xilianitem >= petbase.washitemnum) {//洗练次数是否到达一定次数
					//如果不是野生的判断已经洗练的次数
					if (PetModel.getInstance().petbasedata.kind != 1) {//不是野生宠物洗练
						let petCPetAttrBaseVo: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel._instance.petbasedata.id] as PetCPetAttrBaseVo;
						console.log(PetModel._instance.petbasedata.washcount)
						if (PetModel._instance.petbasedata.petscore >= petCPetAttrBaseVo.treasureScore) {//珍品跳
							game.modules.pet.models.PetProxy.getInstance().once(game.modules.pet.models.CANCEL, this, this.cancel);
							game.modules.pet.models.PetProxy.getInstance().once(game.modules.pet.models.QUEDING, this, this.xilian, [0]);
							this._xilianqueren = new PetXiLianQueRenMediator(this._viewUI);
							this._xilianqueren.init(160314);
						}
						else {//不是珍品
							this.canxilian();
						}
					}
					else {
						RequesterProtocols._instance.c2s_pet_wash(PetModel._instance.petbasedata.key);
						PetModel._instance.petbasedata.washcount += 1;
					}
				}
				else {//快捷购买界面
					let buyinfo: CQuickBuyBaseVo = game.modules.pet.models.PetModel.getInstance().cQuickBuyData[this.itemid]
					this.buykuaijie = new game.modules.commonUI.BuyKuaiJieMediator(this._app);
					this.buykuaijie.init(buyinfo.goodsid)//商品ID
				}
			}
			else {
				this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150047];
				this.tips.onShow(chattext.msg);
			}
		}
		/**提示框*/
		public xiliantishi(): void {
			var parame: Dictionary = new Dictionary();
			parame.set("contentId", 150045);
			let arr = ["血灵水"];
			parame.set("parame", arr);
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parame);
		}
		/**合成提示*/
		public hechengtishi(): void {
			var parame: Dictionary = new Dictionary();
			parame.set("contentId", 150050)
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parame);
		}
		/**学习技能提示*/
		public skilltishi1(): void {
			var parame: Dictionary = new Dictionary();
			parame.set("contentId", 150061)
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parame);
		}
		/**宠物提示*/
		public skilltishi2(): void {
			var parame: Dictionary = new Dictionary();
			parame.set("contentId", 150060)
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parame);
		}
		/**宠物合成*/
		public pethecheng(): void {
			let _roleLevel = HudModel.getInstance().levelNum;
			if (_roleLevel < 55) //宠物合宠解锁条件
			{
				let disappearMsgTips = new DisappearMessageTipsMediator(this._app);
				let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.HECHONG_CONDITION, [55]);
				disappearMsgTips.onShow(prompt);
				return;
			}
			if (this.selectpetkey1 != -1 && this.selectpetkey2 != -1) {//-1为未选择宠物，不为-1则为选择宠物的key
				if (this.isbring == 1) {//有必带技能
					let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[162161];
					let text: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1556]
					this.remind.onhtmlShow(chattext.msg, text.msg)
					this.remind.once(commonUI.RIGHT_BUTTON_EVENT, this, this.hechong);
					this.remind.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancelhechong)
					return
				}
				if (this.isrepeat == 1) {//有重复技能
					let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[162162];
					let text: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1556]
					this.remind.onhtmlShow(chattext.msg, text.msg)
					this.remind.once(commonUI.RIGHT_BUTTON_EVENT, this, this.hechong);
					this.remind.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancelhechong)
					return;
				}
				RequesterProtocols._instance.c2s_pet_synthesize(this.selectpetkey1, this.selectpetkey2);//petkey1,petkey2
			}
			else {
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150087];
				this.tips.onShow(chattext.msg);
			}
		}
		/**宠物1添加，*/
		public addpet1(): void {
			this._selectpet.petselect(this.selectpetkey1, this.selectpetkey2, 1);
		}
		/**宠物2添加*/
		public addpet2(): void {
			this._selectpet.petselect(this.selectpetkey1, this.selectpetkey2, 2);
		}
		/**法术认证*/
		public fashurenzhen(): void {
			//神兽不可以法术认证
			let petinfo: PetCPetAttrBaseVo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id]
			if (petinfo.unusualid == 2) {//神兽
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[162117];
				this.tips.onShow(chattext.msg);
				return;
			}
			this._petskillrenzheng = new PetSkillRenZhengMediator(this._app);
			if (this.iscertification == 1)//是否有法术认证
				this._petskillrenzheng.cancaleinit();
			else
				this._petskillrenzheng.show();
		}
		/**学习技能界面*/
		public studyskill(): void {
			this._petskillstudy = new PetSelectSkillMediator(this._app);
			this._petskillstudy.show();
		}
		/**切换界面 0为洗练 1为合宠 2为学技能*/
		public selectbtn(index: number): void {
			switch (index) {
				case 0:
					this._viewUI.xilian_img.visible = true;
					this._viewUI.petlist_box.visible = true;
					this._viewUI.studyskill_box.visible = false;
					this._viewUI.hechong_box.visible = false;
					let petCPetAttrBaseVo: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id] as PetCPetAttrBaseVo;
					this.modelcreate(petCPetAttrBaseVo.modelid)
					this.selectpetkey1 = -1
					this.selectpetkey2 = -1
					this.refreshhechonginfo()
					break;
				case 1:
					this._viewUI.xilian_img.visible = false;
					this._viewUI.petlist_box.visible = false;
					this._viewUI.studyskill_box.visible = false;
					this._viewUI.hechong_box.visible = true;
					if (this.model.role3d) {//是否有模型
						this.scene2DPanel.removeSceneChar(this.model.role3d)
					}
					break;
				case 2:
					this._viewUI.xilian_img.visible = false;
					this._viewUI.petlist_box.visible = true;
					this._viewUI.studyskill_box.visible = true;
					this._viewUI.hechong_box.visible = false;
					if (this.model.role3d) {//是否有模型
						this.scene2DPanel.removeSceneChar(this.model.role3d)
					}
					this.selectpetkey1 = -1
					this.selectpetkey2 = -1
					this.refreshhechonginfo()
					break;
				default:
					break;
			}
		}
		/**学习技能*/
		public study(): void {
			if (this.petskillid != 0) {//选择的技能书ID不为零
				RequesterProtocols._instance.c2s_pet_learnskillbybook(PetModel._instance.petbasedata.key, this.petskillid);
			}
		}
		/**宠物选择响应事件*/
		public initselect(cell: Box, index): void {
			let btn: Button = cell.getChildByName("pet_btn") as Button
			if (index == PetModel.getInstance().currentselect) {
				if (this.lastbox) {
					let lastbtn: Button = this.lastbox.getChildByName("pet_btn") as Button
					lastbtn.selected = false
				}
				btn.selected = true;
				this.lastbox = cell;
			}
			btn.on(LEvent.MOUSE_DOWN, this, this.selectlist, [cell, index])
		}
		/**宠物选择*/
		public selectlist(cell: Box, index: number): void {
			var petdata: Array<any> = [];
			let count: number = 0;
			let score: string = "";
			let lastbtn: Button = this.lastbox.getChildByName("pet_btn") as Button
			lastbtn.selected = false
			let btn: Button = cell.getChildByName("pet_btn") as Button
			btn.selected = true;
			this.lastbox = cell;
			PetModel.getInstance().currentselect = index;
			if (index == PetModel.getInstance().pets.keys.length) {//选择的位置为无宠物
				//宠物商店
				game.modules.createrole.models.LoginModel.getInstance().CommonPage = ModuleNames.PET
				game.modules.pet.models.PetModel.getInstance().tabnum = 1
				game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.ADD_EVENT, this, this.addpet)
				this.petshop = new game.modules.commonUI.PetShopMediator(this._app);
				this.petshop.init()
				ModuleManager.hide(ModuleNames.PET)
				return;
			}
			for (let num in PetModel.getInstance().pets.keys) {
				if (parseInt(num) == index) {//选择的宠物位置ID是否有宠物
					this.refreshpet(index)
					this.initdata();
				}
			}
		}
		/**刷新宠物数据*/
		public refreshpet(num: number) {//第几个宠物
			let data: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(PetModel.getInstance().pets.keys[num]);
			if (!data) return;
			PetModel.getInstance().petbasedata = data;
			PetModel.getInstance().petinitfight = data.initbfp;
			PetModel.getInstance().petbasicfight = data.bfp;
			PetModel.getInstance().petskill = data.skills;
		}
		/**刷新宠物信息*/
		public refreshpetinfo(e: any): void {
			this._viewUI.studykuang_img.skin = "common/ui/tongyong/kuang94.png";
			this._viewUI.studyicon_img.skin = "";
			this._viewUI.addskill_btn.visible = true;
			this.initdata();
			this.refreshpet(PetModel.getInstance().currentselect)// //this._viewUI.selectpet_list.selectedIndex
			// this._viewUI.selectpet_list.scrollTo(PetModel.getInstance().currentselect); 
			// this._viewUI.selectpet_list.startIndex = PetModel.getInstance().currentselect;
			this.initpetlistSingle();
		}
		initpetlistSingle(): void {
			var data: Array<any> = [];
			let score: string = "";
			let lock: string = "";
			let getdata: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(PetModel.getInstance().pets.keys[PetModel.getInstance().currentselect]);
			if (getdata == null) return;
			let allpetbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[getdata.id];
			let icondata: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid];
			if (getdata.petscore >= allpetbase.treasureScore)//是否为珍品
				score = "common/ui/tongyong/zhenpin.png";
			else
				score = "";
			/** 是否上锁 */
			if (getdata.flag == 2) lock = "common/ui/tongyong/suo.png";
			else lock = "";
			// if (parseInt(p) == PetModel.getInstance().currentselect) {//是否为当前选择宠物
			if (PetModel.getInstance().pets.keys[PetModel.getInstance().currentselect] == LoginModel.getInstance().roleDetail.petIndex) {//是否为出战宠物
				if (getdata.kind == 1)//是否为稀有宠物
					data.push({ listpetname_lab: getdata.name, petadd_lab: "", petlv_lab: "LV." + getdata.level, zhandou_img: "common/ui/pet/chongwu_zhan.png", zhenpin_img: score, iconpet_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 2], lockimg_img: lock });
				else {
					data.push({ listpetname_lab: getdata.name, petadd_lab: "", petlv_lab: "LV." + getdata.level, zhandou_img: "common/ui/pet/chongwu_zhan.png", zhenpin_img: score, iconpet_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 2], lockimg_img: lock });
				}
			}
			else {
				data.push({ listpetname_lab: getdata.name, petadd_lab: "", petlv_lab: "LV." + getdata.level, zhandou_img: "", zhenpin_img: score, iconpet_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 2], lockimg_img: lock });
			}

			this._viewUI.selectpet_list.changeItem(PetModel.getInstance().currentselect, data[0]);
		}
		/**宠物学习技能选择*/
		public petskillselect(e: any, e1: any): void {
			let num: number = e;
			this.petskillid = e1;
			this._viewUI.addskill_btn.visible = false;
			this._viewUI.studyicon_img.visible = true;
			let petskill: PetSkillConfigBaseVo = PetModel.getInstance().petSkillConfigData[num] as PetSkillConfigBaseVo;
			if (petskill.skilltype == 1) {//宠物技能类型 1为被动 2主动
				this._viewUI.studykuang_img.skin = "common/ui/pet/beiji" + petskill.color + ".png";
				this._viewUI.studyicon_img.skin = "common/icon/skill/" + petskill.icon + ".png";
			}
			else {
				this._viewUI.studykuang_img.skin = "common/ui/pet/zhuji" + petskill.color + ".png";
				this._viewUI.studyicon_img.skin = "common/icon/skill/" + petskill.icon + ".png";
			}
		}
		public refreshinfo(e1: any, e2: any): void {//刷新选中合宠的信息
			this.selectpetkey1 = e1;
			this.selectpetkey2 = e2;
			this.refreshhechonginfo();
		}
		/**进行合宠的信息*/
		public refreshhechonginfo(): void {
			let pet1: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(this.selectpetkey1);
			let pet2: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(this.selectpetkey2);
			// 哪个为空哪个不填加
			if (pet1 != null) {
				let allpetbase: PetCPetAttrBaseVo = PetModel._instance.petCPetAttrData[pet1.id];
				let icondata: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid];
				this._viewUI.pet1gongji_lab.text = pet1.attackapt + "";
				this._viewUI.pet1tili_lab.text = pet1.phyforceapt + "";
				this._viewUI.pet1speed_lab.text = pet1.speedapt + "";
				this._viewUI.pet1fangyu_lab.text = pet1.defendapt + "";
				this._viewUI.pet1fashu_lab.text = pet1.magicapt + "";
				this._viewUI.pet1grow_lab.text = (pet1.growrate / 1000).toFixed(3) + "";
				// this._viewUI.pet1grow_lab.text = pet1.growrate / 1000 + "";
				this._viewUI.pet1grow_progressbar.value = (pet1.growrate - allpetbase.growrate[0]) / (allpetbase.growrate[6] - allpetbase.growrate[0])
				this._viewUI.pet1attack_pro.value = (pet1.attackapt - allpetbase.attackaptmin) / (allpetbase.attackaptmax - allpetbase.attackaptmin)
				this._viewUI.pet1def_pro.value = (pet1.defendapt - allpetbase.defendaptmin) / (allpetbase.defendaptmax - allpetbase.defendaptmin)
				this._viewUI.pet1magic_pro.value = (pet1.magicapt - allpetbase.magicaptmin) / (allpetbase.magicaptmax - allpetbase.magicaptmin)
				this._viewUI.pet1phy_pro.value = (pet1.phyforceapt - allpetbase.phyforceaptmin) / (allpetbase.phyforceaptmax - allpetbase.phyforceaptmin)
				this._viewUI.pet1agi_pro.value = (pet1.speedapt - allpetbase.speedaptmin) / (allpetbase.speedaptmax - allpetbase.speedaptmin)
				this._viewUI.selectpet1lv_lab.text = pet1.level + "";
				this._viewUI.petadd1_btn.skin = "common/icon/avatarpet/" + icondata.littleheadID + ".png";
				this._viewUI.kuang1_img.skin = "common/ui/tongyong/" + this.colour[allpetbase.quality - 2];
				this._viewUI.selectpet1lv_lab.visible = true;
				//判断是不是珍品
				if (pet1.petscore >= allpetbase.treasureScore) {
					this._viewUI.pet1zp_img.visible = true
				}
				else {
					this._viewUI.pet1zp_img.visible = false
				}
			}
			else {
				this._viewUI.pet1gongji_lab.text = 0 + "";
				this._viewUI.pet1tili_lab.text = 0 + "";
				this._viewUI.pet1speed_lab.text = 0 + "";
				this._viewUI.pet1fangyu_lab.text = 0 + "";
				this._viewUI.pet1fashu_lab.text = 0 + "";
				this._viewUI.pet1grow_lab.text = 0 + "";
				this._viewUI.selectpet1lv_lab.text = 0 + "";
				this._viewUI.petadd1_btn.skin = "common/ui/tongyong/itemadd.png";
				this._viewUI.kuang1_img.skin = "common/ui/tongyong/kuang94.png";
				this._viewUI.pet1grow_progressbar.value = 0
				this._viewUI.selectpet1lv_lab.visible = false;
				this._viewUI.pet1zp_img.visible = false
				this._viewUI.pet1attack_pro.value = 0
				this._viewUI.pet1def_pro.value = 0
				this._viewUI.pet1magic_pro.value = 0
				this._viewUI.pet1phy_pro.value = 0
				this._viewUI.pet1agi_pro.value = 0
			}
			//宠物2
			if (pet2 != null) {
				let allpetbase: PetCPetAttrBaseVo = PetModel._instance.petCPetAttrData[pet2.id];
				let icondata: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid];
				this._viewUI.pet2gongji_lab.text = pet2.attackapt + "";
				this._viewUI.pet2tili_lab.text = pet2.phyforceapt + "";
				this._viewUI.pet2speed_lab.text = pet2.speedapt + "";
				this._viewUI.pet2fangyu_lab.text = pet2.defendapt + "";
				this._viewUI.pet2fashu_lab.text = pet2.magicapt + "";
				this._viewUI.pet2grow_lab.text = (pet2.growrate / 1000).toFixed(3) + "";
				this._viewUI.selectpet2lv_lab.text = pet2.level + "";
				this._viewUI.petadd2_btn.skin = "common/icon/avatarpet/" + icondata.littleheadID + ".png";
				this._viewUI.kuang2_img.skin = "common/ui/tongyong/" + this.colour[allpetbase.quality - 2];
				this._viewUI.selectpet2lv_lab.visible = true;
				this._viewUI.pet2grow_progressbar.value = (pet2.growrate - allpetbase.growrate[0]) / (allpetbase.growrate[6] - allpetbase.growrate[0])
				this._viewUI.pet2attack_pro.value = (pet2.attackapt - allpetbase.attackaptmin) / (allpetbase.attackaptmax - allpetbase.attackaptmin)
				this._viewUI.pet2def_pro.value = (pet2.defendapt - allpetbase.defendaptmin) / (allpetbase.defendaptmax - allpetbase.defendaptmin)
				this._viewUI.pet2magic_pro.value = (pet2.magicapt - allpetbase.magicaptmin) / (allpetbase.magicaptmax - allpetbase.magicaptmin)
				this._viewUI.pet2phy_pro.value = (pet2.phyforceapt - allpetbase.phyforceaptmin) / (allpetbase.phyforceaptmax - allpetbase.phyforceaptmin)
				this._viewUI.pet2agi_pro.value = (pet2.speedapt - allpetbase.speedaptmin) / (allpetbase.speedaptmax - allpetbase.speedaptmin)
				if (pet2.petscore >= allpetbase.treasureScore) {//判断是不是珍品
					this._viewUI.pet2zp_img.visible = true
				}
				else {
					this._viewUI.pet2zp_img.visible = false
				}
			}
			else {
				this._viewUI.pet2gongji_lab.text = 0 + "";
				this._viewUI.pet2tili_lab.text = 0 + "";
				this._viewUI.pet2speed_lab.text = 0 + "";
				this._viewUI.pet2fangyu_lab.text = 0 + "";
				this._viewUI.pet2fashu_lab.text = 0 + "";
				this._viewUI.pet2grow_lab.text = 0 + "";
				this._viewUI.selectpet2lv_lab.text = 0 + "";
				this._viewUI.petadd2_btn.skin = "common/ui/tongyong/itemadd.png";
				this._viewUI.kuang2_img.skin = "common/ui/tongyong/kuang94.png";
				this._viewUI.selectpet2lv_lab.visible = false;
				this._viewUI.pet2zp_img.visible = false
				this._viewUI.pet2grow_progressbar.value = 0
				this._viewUI.pet2attack_pro.value = 0
				this._viewUI.pet2def_pro.value = 0
				this._viewUI.pet2magic_pro.value = 0
				this._viewUI.pet2phy_pro.value = 0
				this._viewUI.pet2agi_pro.value = 0
			}
			this.refreshyulan();
		}
		/**技能预览*/
		public refreshyulan(): void {
			var data: Array<any> = [];
			if (this.selectpetkey1 != -1 && this.selectpetkey2 != -1) {//是否已经选择两只宠物
				let pet1: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(this.selectpetkey1);
				let pet2: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(this.selectpetkey2);
				let allpetbase1: PetCPetAttrBaseVo = PetModel._instance.petCPetAttrData[pet1.id];
				let allpetbase2: PetCPetAttrBaseVo = PetModel._instance.petCPetAttrData[pet2.id];
				let icondata1: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase1.modelid];
				let icondata2: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase2.modelid];
				this._viewUI.gongjiyulan_lab.text = ((pet1.attackapt + pet2.attackapt) / 2 * 0.9).toFixed(0) + "-" + ((pet1.attackapt + pet2.attackapt) / 2 * 1.08).toFixed(0);
				this._viewUI.fangyuyulan_lab.text = ((pet1.defendapt + pet2.defendapt) / 2 * 0.9).toFixed(0) + "-" + ((pet1.defendapt + pet2.defendapt) / 2 * 1.08).toFixed(0);
				this._viewUI.speed_yulan.text = ((pet1.speedapt + pet2.speedapt) / 2 * 0.9).toFixed(0) + "-" + ((pet1.speedapt + pet2.speedapt) / 2 * 1.08).toFixed(0);
				this._viewUI.tiliyulan_lab.text = ((pet1.attackapt + pet2.attackapt) / 2 * 0.9).toFixed(0) + "-" + ((pet1.attackapt + pet2.attackapt) / 2 * 1.08).toFixed(0);
				this._viewUI.fashuyulan_lab.text = ((pet1.attackapt + pet2.attackapt) / 2 * 0.9).toFixed(0) + "-" + ((pet1.attackapt + pet2.attackapt) / 2 * 1.08).toFixed(0);
				// this._viewUI.growgrateyulan_lab.text = ((pet1.growrate + pet2.growrate - 48) / 2000).toFixed(2) + "-" + ((pet1.growrate + pet2.growrate + 24) / 2000).toFixed(2);
				this._viewUI.growgrateyulan_lab.text = (Math.floor((pet1.growrate + pet2.growrate - 48) / 20) / 100).toFixed(2) + "-" + (Math.ceil((pet1.growrate + pet2.growrate + 24) / 20) / 100).toFixed(2);
				this._viewUI.pet1lv_lab.text = pet1.level + "";
				this._viewUI.pet2lv_lab.text = pet2.level + "";
				this._viewUI.pet1lv_lab.visible = true;
				this._viewUI.pet2lv_lab.visible = true;
				this._viewUI.pet1kuang_img.skin = "common/ui/tongyong/" + this.colour[allpetbase1.quality - 2];
				this._viewUI.pet2kuang_img.skin = "common/ui/tongyong/" + this.colour[allpetbase2.quality - 2];
				this._viewUI.pet1icon_btn.skin = "common/icon/avatarpet/" + icondata1.littleheadID + ".png";
				this._viewUI.pet2icon_btn.skin = "common/icon/avatarpet/" + icondata2.littleheadID + ".png";
				this._viewUI.pet1icon_btn.visible = true;
				this._viewUI.pet2icon_btn.visible = true;
				//判断是否有必带技能
				for (var index = 0; index < allpetbase1.skillid.length; index++) {
					for (var nums = 0; nums < pet1.skills.length; nums++) {
						if (pet1.skills[nums].skillId == allpetbase1.skillid[index]) {
							if (allpetbase1.skillrate[index] == 1001) {//1001为必带技能
								this.isbring = 1
							}
							break;
						}
					}
				}
				for (var index = 0; index < allpetbase2.skillid.length; index++) {
					for (var nums = 0; nums < pet2.skills.length; nums++) {
						if (pet2.skills[nums].skillId == allpetbase2.skillid[index]) {
							if (allpetbase2.skillrate[index] == 1001) {//1001为必带技能
								this.isbring = 1
							}
							break;
						}
					}
				}
				//技能整合
				let allpetskill: Array<game.modules.pet.models.PetSkillVo> = [];
				for (var index = 0; index < pet1.skills.length; index++) {
					allpetskill[index] = pet1.skills[index];
				}
				for (var index = 0; index < pet2.skills.length; index++) {
					let issimilar = 0;
					for (var index1 = 0; index1 < allpetskill.length; index1++) {
						if (allpetskill[index1].skillId == pet2.skills[index].skillId) {//是否有重复技能
							issimilar = 1;
							break;
						}
					}
					if (issimilar == 0) {
						allpetskill[allpetskill.length] = pet2.skills[index];
					}
				}
				for (var index: number = 0; index < 12; index++) {//12为最多显示技能的格子数
					if (index < allpetskill.length) {
						let petskill: PetSkillConfigBaseVo = PetModel.getInstance().petSkillConfigData[allpetskill[index].skillId] as PetSkillConfigBaseVo;
						if (petskill.skilltype == 1) {//技能类型 1被动 2主动
							data.push({ petskilkuang_img: "common/ui/pet/beiji" + petskill.color + ".png", skillan_img: "common/icon/skill/" + petskill.icon + ".png" });
						}
						else {
							data.push({ petskilkuang_img: "common/ui/pet/zhuji" + petskill.color + ".png", skillan_img: "common/icon/skill/" + petskill.icon + ".png" });
						}
					}
					else {
						data.push({ petskilkuang_img: "common/ui/tongyong/kuang94.png" });
					}
				}
				this.yulanskill = allpetskill
				if (pet1.skills.length + pet2.skills.length > allpetskill.length) {//判断是否有重复技能 大于有重复技能 1 为由重复技能
					this.isrepeat = 1
				}
				else {
					this.isrepeat = 0
				}
			}
			else {
				this._viewUI.gongjiyulan_lab.text = 1000 + "-" + 2000;
				this._viewUI.fangyuyulan_lab.text = 1000 + "-" + 2000;
				this._viewUI.speed_yulan.text = 1000 + "-" + 2000;
				this._viewUI.tiliyulan_lab.text = 1000 + "-" + 2000;
				this._viewUI.fashuyulan_lab.text = 1000 + "-" + 2000;
				this._viewUI.growgrateyulan_lab.text = 1000 + "-" + 2000;
				this._viewUI.pet1lv_lab.text = 0 + "";
				this._viewUI.pet2lv_lab.text = 0 + "";
				this._viewUI.pet1lv_lab.visible = false;
				this._viewUI.pet2lv_lab.visible = false;
				this._viewUI.pet1kuang_img.skin = "common/ui/tongyong/kuang94.png";
				this._viewUI.pet2kuang_img.skin = "common/ui/tongyong/kuang94.png";
				this._viewUI.pet1icon_btn.visible = false;
				this._viewUI.pet2icon_btn.visible = false;
				for (var index: number = 0; index < 12; index++) {//12为最多显示技能的格子数
					data.push({ petskilkuang_img: "common/ui/tongyong/kuang94.png" });
				}
				this.yulanskill = [];
			}
			this._viewUI.skillyulan_list.array = data;
			this._viewUI.skillyulan_list.vScrollBarSkin = "";
			this._viewUI.skillyulan_list.repeatY = data.length
			this._viewUI.skillyulan_list.scrollBar.elasticBackTime = 200;
			this._viewUI.skillyulan_list.scrollBar.elasticDistance = 50;
			this._viewUI.skillyulan_list.renderHandler = new Laya.Handler(this, this.inityulanskill)
		}
		/**初始化预览技能响应事件*/
		public inityulanskill(cell: Box, index: number): void {
			let skill: Laya.Image = cell.getChildByName("skillan_img") as Laya.Image
			skill.on(LEvent.MOUSE_DOWN, this, this.yulanskilltips, [index])
		}
		/**预览技能tips*/
		public yulanskilltips(index: number): void {
			if (index < this.yulanskill.length) {//选择的技能TIPS是否为空
				var parame: Dictionary = new Dictionary();
				parame.set("itemId", this.yulanskill[index].skillId)
				this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
			}
		}
		/**技能tips*/
		public itemtips(): void {
			var parame: Dictionary = new Dictionary();
			parame.set("itemId", this.itemid)
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
		}
		/**合宠结果*/
		public hechongresult(e: any): void {
			let petkey: number = e;
			this._InitAnimation(petkey);

		}
		/** 加载特效 */
		private _InitAnimation(petkey): void {
			this.petAni = new Laya.Animation();
			this._viewUI.petlianchong_img.addChild(this.petAni);
			this.petAni.loadAtlas("common/res/atlas/ui/hehcong.atlas");
			this.petAni.interval = 100;
			this.petAni.pos(-180, 200)
			this.petAni.play(0, false);
			this.petAni.on(LEvent.COMPLETE, this, this.removeAni, [petkey]);

		}
		/** 移除特效 */
		private removeAni(petkey): void {
			this._viewUI.petlianchong_img.removeChild(this.petAni);
			this.petAni = null;
			ModuleManager.hide(ModuleNames.PET);
			PetModel.getInstance().tabnum = 0;
			this._hechengresult = new PetHechongResultMediator(this._app);
			this._hechengresult.init(petkey);
		}
		/**增加宠物*/
		public addpet(): void {
			this.initpetlist();
			game.modules.pet.models.PetProxy.getInstance().off(game.modules.pet.models.ADD_EVENT, this, this.addpet)
		}
		/**技能tips*/
		public skillstips(index: number): void {
			if (index < PetModel.getInstance().petskill.length) {//选择的技能TIPS是否为空
				var parame: Dictionary = new Dictionary();
				parame.set("itemId", PetModel.getInstance().petskill[index].skillId)
				this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
			}
		}
		/**取消合宠*/
		public cancelhechong(): void {
			this.remind.off(commonUI.RIGHT_BUTTON_EVENT, this, this.hechong)
		}
		/**进行合宠*/
		public hechong(): void {
			this.isbring = 0
			this.isrepeat = 0
			this.remind.off(commonUI.LEFT_BUTTON_EVENT, this, this.cancelhechong)
			game.modules.createrole.models.LoginModel.getInstance().CommonPage = ModuleNames.PET
			RequesterProtocols._instance.c2s_pet_synthesize(this.selectpetkey1, this.selectpetkey2)
			models.PetProxy.getInstance().once(models.DEL_PET, this, this.initpetlist);
		}
		/**取消洗练*/
		public cancel(): void {
			this._xilianqueren.off(game.modules.pet.models.QUEDING, this, this.xilian)
		}
		/**确定洗练*/
		public xilian(index: number): void {
			if (index == 0) {//再次确定是否洗练
				this.canxilian()
			}
			else {
				this._xilianqueren.off(game.modules.pet.models.CANCEL, this, this.cancel)
				RequesterProtocols._instance.c2s_pet_wash(PetModel._instance.petbasedata.key);
			}
		}
		/**宠物洗练*/
		public canxilian(): void {
			let petCPetAttrBaseVo: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel._instance.petbasedata.id] as PetCPetAttrBaseVo;
			if (PetModel._instance.petbasedata.washcount + 1 == petCPetAttrBaseVo.nskillnumfull) {//是否达到一定的洗练次数
				game.modules.pet.models.PetProxy.getInstance().once(game.modules.pet.models.CANCEL, this, this.cancel)
				game.modules.pet.models.PetProxy.getInstance().once(game.modules.pet.models.QUEDING, this, this.xilian, [1])
				this._xilianqueren = new PetXiLianQueRenMediator(this._viewUI);
				this._xilianqueren.init(11532);
			}
			else {//不是满技能
				RequesterProtocols._instance.c2s_pet_wash(PetModel._instance.petbasedata.key);
				PetModel._instance.petbasedata.washcount += 1;
			}
		}
		/**洗练宠物成功飘窗 */
		public petxilianbay(): void {
			let prompt = HudModel.getInstance().promptAssembleBack(150059);
			let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			disappearMsgTips.onShow(prompt);
		}
	}
}