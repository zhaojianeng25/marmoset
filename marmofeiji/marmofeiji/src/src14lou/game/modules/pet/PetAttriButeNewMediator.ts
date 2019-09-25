
import PetModel = game.modules.pet.models.PetModel;
module game.modules.pet {
	/** 宠物基础属性 */
	export class PetAttriButeNewMediator extends game.modules.UiMediator {
		/**模型*/
		public model: ModelsCreate;
		public _viewUI: ui.common.PetAttriButeNewUI;
		/**公用提示界面*/
		private _change: PetGongYongMediator;
		/**装备精铸界面*/
		private _jingzhu: PetJingzhuZhuangbeiMediator;
		/**属性加点界面*/
		private _addshuxing: PetAddShuXingdianMediator;
		/**消息提示*/
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		/**宠物商店*/
		private petshop: game.modules.commonUI.PetShopMediator
		/**提示框*/
		private texttips: game.modules.commonUI.TextTipsMediator
		/**宠物颜色框*/
		public colour: Array<string> = ["baikuang.png", "lvkuang.png", "lankuang.png", "zikuang.png", "jinkuang.png"];
		/**宠物种类图片*/
		public kind: Array<string> = ["common/ui/pet/chongwu_yesheng.png", "common/ui/pet/chongwu_bb.png",
			"common/ui/pet/chongwu_bianyi.png", "common/ui/pet/baobaolingshou.png",
			"common/ui/pet/bianyilingshou.png", "common/ui/pet/chongwu_shenshou.png"];
		/**宠物装备key*/
		public itempackkey: Array<number> = [];
		/**宠物装备id*/
		public equipid: Array<number> = [];
		/**上次选择的宠物*/
		public lastpetbox: Box;
		/**模型场景*/
		private scene2DPanel: TestRole2dPanel
		/**动画效果*/
		private ani: Laya.Animation
		/**穿在宠物身上的  key 为宠物装备的部位类型id 2为鞋子 3为衣服 4为腰带 6为头盔*/
		public inpetequip: Laya.Dictionary;
		/**引导动画 */
		private yindaoAni: Laya.Animation;
		/**手指图标 */
		private dianImg: Laya.Image;
		/** 上一次所选中的子界面按钮 */
		private lastSelectedBtn: number = -1;

		constructor(uiLayer: Sprite) {
			super(uiLayer);
			this._viewUI = new ui.common.PetAttriButeNewUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = false;
			this.inpetequip = new Laya.Dictionary()
			this.model = new ModelsCreate()
			this.scene2DPanel = new TestRole2dPanel()
			this._viewUI.chongwubase_img.addChild(this.scene2DPanel)
			this.ani = new Laya.Animation()
			this._viewUI.touicon_img.on(LEvent.DOUBLE_CLICK, this, this.takeoff, [6])
			this._viewUI.touicon_img.on(LEvent.CLICK, this, this.chakan, [106])
			this._viewUI.yaodaiicon_img.on(LEvent.DOUBLE_CLICK, this, this.takeoff, [4])
			this._viewUI.yaodaiicon_img.on(LEvent.CLICK, this, this.chakan, [74])
			this._viewUI.yifuicon_img.on(LEvent.DOUBLE_CLICK, this, this.takeoff, [3])
			this._viewUI.yifuicon_img.on(LEvent.CLICK, this, this.chakan, [58])
			this._viewUI.xieziicon_img.on(LEvent.DOUBLE_CLICK, this, this.takeoff, [2])
			this._viewUI.xieziicon_img.on(LEvent.CLICK, this, this.chakan, [42])
			models.PetProxy.getInstance().on(models.REFRESH_EVENT, this, this.refresh);
			models.PetProxy.getInstance().on(models.REFRESHSHOUMING_EVENT, this, this.initpetbase);
			game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_BAG_COUNT, this, this.initpetbase)
			this._viewUI.hp_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11804])
			this._viewUI.mp_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11805])
			this._viewUI.exp_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11806])
			this._viewUI.lift_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11807])
			this._viewUI.attack_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11808])
			this._viewUI.def_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11809])
			this._viewUI.speed_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11810])
			this._viewUI.magic_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11811])
			this._viewUI.magicdef_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11812])
			this._viewUI.pingfen_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11813])
			this._viewUI.baobao_img.on(LEvent.MOUSE_DOWN, this, this.showdata, [11814])
			this._viewUI.attadpt_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11815])
			this._viewUI.defadpt_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11816])
			this._viewUI.magicadpt_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11817])
			this._viewUI.pyadpt_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11818])
			this._viewUI.speedadpt_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11819])
			this._viewUI.growadpt_box.on(LEvent.MOUSE_DOWN, this, this.showdata, [11820])
			this._viewUI.on(LEvent.MOUSE_UP, this, this.hidedata);
			this._viewUI.on(LEvent.MOUSE_OUT, this, this.hidedata);
			this.initialize();
			this._viewUI.chongwu_list.renderHandler = new Laya.Handler(this, this.initselect);
		}
		/**初始化 */
		public initialize(): void {
			this.yindaoAni = new Laya.Animation();
			this.dianImg = new Laya.Image();
		}
		/**显示tips*/
		public showdata(textid: number): void {
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[textid]
			this.texttips.init(chattext.msg, this._viewUI.mouseX, this._viewUI.mouseY);
		}
		/**隐藏tips*/
		public hidedata(): void {
			if (this.texttips) {
				this.texttips.hide()
			}
		}
		/**创建模型*/
		modelcreate(modelid: number): void {//模型创建 模型ID
			if (this.model.role3d) {//移除模型
				this.scene2DPanel.removeSceneChar(this.model.role3d)
			}
			var parentui: any = this._viewUI.parent
			if (parentui) {//是否拥有父节点
				this.model.role3d = new YxChar3d();
				this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
				this.model.role3d.set2dPos((this._viewUI.chongwubase_img.x + this._viewUI.pet_img.width / 2 + this._viewUI.pet_img.x) * parentui.globalScaleX * 1.17, (this._viewUI.chongwubase_img.y + this._viewUI.pet_img.height + this._viewUI.pet_img.y) * parentui.globalScaleY * 1.17);  //坐标
				this.model.role3d.scale = 1;
				this.model.role3d.rotationY = 135
				this.model.role3d.rotationX = 0
				this.scene2DPanel.addSceneChar(this.model.role3d)
			}
		}
		/**宠物数据初始化*/
		public initpetbase(): void {
			let allpetbase: any = PetModel._instance.petCPetAttrData[PetModel._instance.petbasedata.id];
			let petCPetAttrBaseVo: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel._instance.petbasedata.id] as PetCPetAttrBaseVo;
			this.modelcreate(petCPetAttrBaseVo.modelid);			// 创建模型
			this._viewUI.petname_lab.changeText(PetModel.getInstance().petbasedata.name);
			this._viewUI.petname_lab.color = "#" + petCPetAttrBaseVo.colour;
			this._viewUI.wuliattack_lab.changeText(Math.floor(PetModel.getInstance().petbasedata.attack) + "");
			this._viewUI.wulidefense_lab.changeText(Math.floor(PetModel.getInstance().petbasedata.defend) + "");
			this._viewUI.speed_lab.changeText(Math.floor(PetModel.getInstance().petbasedata.speed) + "");
			this._viewUI.fashuattack_lab.changeText(Math.floor(PetModel.getInstance().petbasedata.magicattack) + "");
			this._viewUI.fashudefense_lab.changeText(Math.floor(PetModel.getInstance().petbasedata.magicdef) + "");
			this._viewUI.canzhandj_lab.changeText(PetModel.getInstance().petbasedata.useLevel + "");
			this._viewUI.hp_lab.changeText(Math.floor(PetModel.getInstance().petbasedata.hp) + "/" + Math.floor(PetModel.getInstance().petbasedata.maxhp));
			this._viewUI.mp_lab.changeText(Math.floor(PetModel.getInstance().petbasedata.mp) + "/" + Math.floor(PetModel.getInstance().petbasedata.maxmp));
			this._viewUI.exp_lab.text = PetModel.getInstance().petbasedata.exp + "/" + PetModel.getInstance().petbasedata.nexp;
			if (this._viewUI.exp_lab.text.length * 14 >= 110) {//根据经验数值来调整lable大小
				this._viewUI.exp_lab.fontSize = 110 / (this._viewUI.exp_lab.text.length * 14) * 25;
			}
			else {
				this._viewUI.exp_lab.fontSize = 25
			}
			this._viewUI.hp_progressbar.value = PetModel.getInstance().petbasedata.hp / PetModel.getInstance().petbasedata.maxhp;
			this._viewUI.mp_progressbar.value = PetModel.getInstance().petbasedata.mp / PetModel.getInstance().petbasedata.maxmp;
			this._viewUI.attackapt_lab.changeText(PetModel.getInstance().petbasedata.attackapt + "");
			this._viewUI.defenseapt_lab.changeText(PetModel.getInstance().petbasedata.defendapt + "");
			this._viewUI.magicapt_lab.changeText(PetModel.getInstance().petbasedata.magicapt + "");
			this._viewUI.phyapt_lab.changeText(PetModel.getInstance().petbasedata.phyforceapt + "");
			this._viewUI.speedapt_lab.changeText(PetModel.getInstance().petbasedata.speedapt + "");
			this._viewUI.growapt_lab.changeText((PetModel.getInstance().petbasedata.growrate / 1000).toFixed(3) + "");
			this._viewUI.pingfen_lab.changeText(PetModel.getInstance().petbasedata.petscore + "");
			this._viewUI.canzhandj_lab.changeText(PetModel.getInstance().petbasedata.useLevel + "");
			this._viewUI.attack_pro.value = (PetModel.getInstance().petbasedata.attackapt - petCPetAttrBaseVo.attackaptmin) / (petCPetAttrBaseVo.attackaptmax - petCPetAttrBaseVo.attackaptmin)
			this._viewUI.def_pro.value = (PetModel.getInstance().petbasedata.defendapt - petCPetAttrBaseVo.defendaptmin) / (petCPetAttrBaseVo.defendaptmax - petCPetAttrBaseVo.defendaptmin)
			this._viewUI.magic_pro.value = (PetModel.getInstance().petbasedata.magicapt - petCPetAttrBaseVo.magicaptmin) / (petCPetAttrBaseVo.magicaptmax - petCPetAttrBaseVo.magicaptmin)
			this._viewUI.py_pro.value = (PetModel.getInstance().petbasedata.phyforceapt - petCPetAttrBaseVo.phyforceaptmin) / (petCPetAttrBaseVo.phyforceaptmax - petCPetAttrBaseVo.phyforceaptmin)
			this._viewUI.speed_pro.value = (PetModel.getInstance().petbasedata.speedapt - petCPetAttrBaseVo.speedaptmin) / (petCPetAttrBaseVo.speedaptmax - petCPetAttrBaseVo.speedaptmin)
			if (PetModel.getInstance().petbasedata.key == LoginModel.getInstance().roleDetail.petIndex) {//宠物参战按钮
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[2117]
				this._viewUI.rest_btn.label = chattext.msg;
			}
			else {
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[2118]
				this._viewUI.rest_btn.label = chattext.msg;
			}
			if (allpetbase.unusualid == 1)//宠物品质
				this._viewUI.baobao_img.skin = this.kind[PetModel.getInstance().petbasedata.kind + allpetbase.unusualid];
			else
				this._viewUI.baobao_img.skin = this.kind[PetModel.getInstance().petbasedata.kind + allpetbase.unusualid - 1];
			if (PetModel.getInstance().petbasedata.life == -1) {//宠物生命 -1为永久
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11548]
				this._viewUI.shouming_lab.changeText(chattext.msg);
			}
			else {
				this._viewUI.shouming_lab.changeText(PetModel.getInstance().petbasedata.life + "");
			}
			if (allpetbase.growrate[6] == PetModel._instance.petbasedata.growrate) {//宠物成长率是否满，当前成长率-最小成长率再除以最大与最小的差值
				this._viewUI.grow_progressbar.value = 1;
			}
			else {
				this._viewUI.grow_progressbar.value = (PetModel._instance.petbasedata.growrate - allpetbase.growrate[0]) / (allpetbase.growrate[6] - allpetbase.growrate[0]);
			}
			this.initpetskill();
			this.initequip();
			this.ChangeBattleAttr();
		}
		/**
		 * 宠物战斗属性刷新
		 */
		private ChangeBattleAttr(): void {
			if (PetModel.getInstance().battlePetAttr.keys.length != 0) {
				let petAttr = PetModel.getInstance().battlePetAttr;
				for (var attrIndex = 0; attrIndex < petAttr.keys.length; attrIndex++) {
					let attrId = petAttr.keys[attrIndex];
					let val = petAttr.get(attrId);
					this.updateBattleAttr(attrId, val);
				}
			}
		}
		/** 刷新指定属性
		 * @param attrId 属性Id
		 * @param val 值
		 */
		private updateBattleAttr(attrId: number, val: number): void {
			if (attrId == 60 || attrId == 80) {//生命值
				this._viewUI.hp_lab.text = val + "/" + Math.floor(PetModel.getInstance().petbasedata.maxhp);//生命值
				this._viewUI.hp_progressbar.value = val / PetModel.getInstance().petbasedata.maxhp;
			} else if (attrId == 90 || attrId == 100) {//魔法值
				this._viewUI.mp_lab.text = val + "/" + Math.floor(PetModel.getInstance().petbasedata.maxmp);
				this._viewUI.mp_progressbar.value = val / PetModel.getInstance().petbasedata.maxmp;
			} else if (attrId == 130) {//物理攻击
				this._viewUI.wuliattack_lab.text = val.toString();;
			} else if (attrId == 150) {//法术攻击
				this._viewUI.fashuattack_lab.text = val.toString();
			} else if (attrId == 200) {//速度
				this._viewUI.speed_lab.text = val.toString();
			} else if (attrId == 140) {//物理防御
				this._viewUI.wulidefense_lab.text = val.toString();
			} else if (attrId == 160) {//法术防御
				this._viewUI.fashudefense_lab.text = val.toString();
			}
		}
		/**宠物列表初始化*/
		public initpetlist(): void {
			var data: Array<any> = [];
			let score: string = "";
			let lock: string = "";
			if (PetModel.getInstance().pets.keys.length == 0) {
				ModuleManager.hide(ModuleNames.PET);		// 关闭当前界面
				ModuleManager.show(ModuleNames.PET, this._app);	// 打开宠物界面
			}
			for (let p in PetModel.getInstance().pets.keys) {
				let getdata: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(PetModel.getInstance().pets.keys[p]);
				let allpetbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[getdata.id];
				let icondata: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid] as CNpcShapeBaseVo;
				if (getdata.petscore >= allpetbase.treasureScore)
					score = "common/ui/tongyong/zhenpin.png";
				else
					score = "";
				/** 是否上锁 */
				if (getdata.flag == 2) lock = "common/ui/tongyong/suo.png";
				else lock = "";
				if (parseInt(p) == PetModel.getInstance().currentselect) {//是否为当前选择宠物
					if (PetModel.getInstance().pets.keys[p] == LoginModel.getInstance().roleDetail.petIndex) {//是否为出战宠物
						if (getdata.kind == 1)//是否为稀有宠物
							data.push({ name_lab: getdata.name, petadd_lab: "", lv_lab: "LV." + getdata.level, ischuzhan_img: "common/ui/pet/chongwu_zhan.png", zhenpin_img: score, tianjiachongwu_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 1], lockimg_img: lock });
						else {
							data.push({ name_lab: getdata.name, petadd_lab: "", lv_lab: "LV." + getdata.level, ischuzhan_img: "common/ui/pet/chongwu_zhan.png", zhenpin_img: score, tianjiachongwu_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 1], lockimg_img: lock });
						}
					}
					else {
						data.push({ name_lab: getdata.name, petadd_lab: "", lv_lab: "LV." + getdata.level, ischuzhan_img: "", zhenpin_img: score, tianjiachongwu_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 1], lockimg_img: lock });
					}
					PetModel.getInstance().petbasedata = getdata;
					PetModel.getInstance().petinitfight = getdata.initbfp;
					PetModel.getInstance().petbasicfight = getdata.bfp;
					PetModel.getInstance().petskill = getdata.skills;
				}
				else {
					if (PetModel.getInstance().pets.keys[p] == LoginModel.getInstance().roleDetail.petIndex)//是否为出战宠物
						data.push({ name_lab: getdata.name, petadd_lab: "", lv_lab: "LV." + getdata.level, ischuzhan_img: "common/ui/pet/chongwu_zhan.png", zhenpin_img: score, tianjiachongwu_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 1], lockimg_img: lock });
					else
						data.push({ name_lab: getdata.name, petadd_lab: "", lv_lab: "LV." + getdata.level, ischuzhan_img: "", zhenpin_img: score, tianjiachongwu_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 1], lockimg_img: lock });
				}
			}
			if (game.modules.createrole.models.LoginModel.getInstance().roleDetail.petmaxnum > PetModel.getInstance().pets.keys.length) {
				data.push({ name_lab: "", lv_lab: "", ischuzhan_img: "", petadd_lab: "添加宠物", zhenpin_img: "", kuang_img: "common/ui/tongyong/kuang94.png", tianjiachongwu_img: "common/ui/pet/chongwu_jiahao.png", lockimg_img: "" });
			}
			this._viewUI.chongwu_list.array = data;
			this._viewUI.chongwu_list.vScrollBarSkin = "";
			this._viewUI.chongwu_list.repeatY = data.length;
			this._viewUI.chongwu_list.scrollBar.elasticBackTime = 200;
			this._viewUI.chongwu_list.scrollBar.elasticDistance = 50;
		}
		/**技能初始化*/
		public initpetskill(): void {
			var data: Array<any> = [];
			for (var index = 0; index < 12; index++) {
				if (index < PetModel.getInstance().petskill.length) {
					let petskill: PetSkillConfigBaseVo = PetModel.getInstance().petSkillConfigData[PetModel.getInstance().petskill[index].skillId] as PetSkillConfigBaseVo;
					if (!petskill) continue;
					let petdata: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id] as PetCPetAttrBaseVo;
					let petskillgrate: number = petdata.skillrate[index]
					let isbindskill: Array<number> = petdata.isbindskill;
					if (petskill.skilltype == 1) {//宠物技能类型 1 为被动 2为主动
						if (index < isbindskill.length)
							data.push({ skillkuang_img: "common/ui/pet/beiji" + petskill.color + ".png", skillitem_img: "common/icon/skill/" + petskill.icon + ".png", bangding_img: "common/ui/pet/bangding.png" });
						else
							data.push({ skillkuang_img: "common/ui/pet/beiji" + petskill.color + ".png", skillitem_img: "common/icon/skill/" + petskill.icon + ".png", bangding_img: "" });
					}
					else {
						if (index < isbindskill.length)//是否是绑定技能
							data.push({ skillkuang_img: "common/ui/pet/zhuji" + petskill.color + ".png", skillitem_img: "common/icon/skill/" + petskill.icon + ".png", bangding_img: "common/ui/pet/bangding.png" });
						else
							data.push({ skillkuang_img: "common/ui/pet/zhuji" + petskill.color + ".png", skillitem_img: "common/icon/skill/" + petskill.icon + ".png", bangding_img: "" });
					}
				}
				else {
					data.push({ skillkuang_img: "common/ui/tongyong/kuang94.png", skillitem_img: "", bangding_img: "" });
				}

			}
			this._viewUI.petskill_list.array = data;
			this._viewUI.petskill_list.vScrollBarSkin = "";
			this._viewUI.petskill_list.repeatY = data.length
			this._viewUI.petskill_list.scrollBar.elasticBackTime = 200;
			this._viewUI.petskill_list.scrollBar.elasticDistance = 50;
			this._viewUI.petskill_list.renderHandler = new Laya.Handler(this, this.initskill)
		}
		/**初始化技能响应*/
		public initskill(cell: Box, index: number): void {
			let skillitem: Laya.Image = cell.getChildByName("skillitem_img") as Laya.Image
			skillitem.on(LEvent.MOUSE_DOWN, this, this.selectskill, [cell, index])
		}
		/**选择宠物的技能列表*/
		public selectskill(cell: Box, index: number): void {
			this.skillstips(index)
		}
		/**初始化宠物装备栏*/
		public initequip(): void {
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[1];
			var data: Array<any> = [];
			let countnumber: number = 0;
			for (let p = 0; p < bag.items.length; p++) {
				if (bag.items[p].id >= PetModel.petequipid.start && bag.items[p].id <= PetModel.petequipid.end) {//宠物装备ID范围
					let item: ItemAttrBaseVo = BagModel.getInstance().itemAttrData[bag.items[p].id];
					data.push({ biankuang_img: "common/ui/tongyong/" + this.colour[item.nquality - 1], item_img: "common/icon/item/" + item.icon + ".png" });
					this.itempackkey[countnumber] = bag.items[p].key;
					this.equipid[countnumber] = bag.items[p].id;
					countnumber++;
				}
			}
			for (var index = countnumber; index < 16; index++) {
				data.push({ biankuang_img: "common/ui/tongyong/kuang94.png", item_img: "" });
			}
			this._viewUI.petzhuangbei_list.array = data;
			this._viewUI.petzhuangbei_list.vScrollBarSkin = "";
			this._viewUI.petzhuangbei_list.repeatY = data.length
			this._viewUI.petzhuangbei_list.scrollBar.elasticBackTime = 200;
			this._viewUI.petzhuangbei_list.scrollBar.elasticDistance = 100;
			this._viewUI.petzhuangbei_list.renderHandler = new Laya.Handler(this, this.selectpetequip);
			this.initequipinfo(PetModel.getInstance().petbasedata.key)
			if (this.ani) {//是否存在特效
				this.ani.clear();
			}
		}
		/**初始化 宠物身上的装备*/
		public initequipinfo(petkey: number): void {//通过宠物key去找相对应的宠物装备信息
			this._viewUI.xieziicon_img.skin = "common/ui/tongyong/jiao.png"
			this._viewUI.petxiezi_img.skin = "common/ui/tongyong/kuang94.png"
			this._viewUI.yifuicon_img.skin = "common/ui/tongyong/yifu.png"
			this._viewUI.petyifu_img.skin = "common/ui/tongyong/kuang94.png"
			this._viewUI.yaodaiicon_img.skin = "common/ui/tongyong/yaodai.png"
			this._viewUI.petyaodai_img.skin = "common/ui/tongyong/kuang94.png"
			this._viewUI.touicon_img.skin = "common/ui/tongyong/toubu.png"
			this._viewUI.pettou_img.skin = "common/ui/tongyong/kuang94.png"
			let petbag: Laya.Dictionary = game.modules.bag.models.BagModel.getInstance().bagMap[9]
			let baginfo: game.modules.bag.models.BagVo = petbag.get(petkey)
			if (baginfo) {//背包是否有数据
				for (var index = 0; index < baginfo.items.length; index++) {
					let item: game.modules.bag.models.ItemVo = baginfo.items[index]
					let iteminfo: ItemAttrBaseVo = game.modules.bag.models.BagModel.getInstance().itemAttrData[item.id]
					switch (item.position) {//宠物装备位置 2为鞋子 3为衣服 4为腰带 6为头盔
						case 2:
							this._viewUI.xieziicon_img.skin = "common/icon/item/" + iteminfo.icon + ".png"
							this._viewUI.petxiezi_img.skin = "common/ui/tongyong/" + this.colour[iteminfo.nquality - 1]
							break;
						case 3:
							this._viewUI.yifuicon_img.skin = "common/icon/item/" + iteminfo.icon + ".png"
							this._viewUI.petyifu_img.skin = "common/ui/tongyong/" + this.colour[iteminfo.nquality - 1]
							break;
						case 4:
							this._viewUI.yaodaiicon_img.skin = "common/icon/item/" + iteminfo.icon + ".png"
							this._viewUI.petyaodai_img.skin = "common/ui/tongyong/" + this.colour[iteminfo.nquality - 1]
							break;
						case 6:
							this._viewUI.touicon_img.skin = "common/icon/item/" + iteminfo.icon + ".png"
							this._viewUI.pettou_img.skin = "common/ui/tongyong/" + this.colour[iteminfo.nquality - 1]
							break;
						default:
							break;
					}
					this.inpetequip.set(item.position, item);
				}
			}
		}
		/**查看宠物身上的装备信息 */
		public showequiptips(position: number): void {//装备位置
			var parame: Dictionary = new Dictionary();
			let item: game.modules.bag.models.ItemVo = this.inpetequip.get(position)
			if (item == null) {//当前位置是否有装备
				return;
			}
			parame.set("itemId", item.id);
			parame.set("key", item.key);
			parame.set("packid", 1);
			parame.set("equiptype", position);
			let _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame);
		}
		/**脱下装备 */
		public takeoff(position: number): void {
			let item: game.modules.bag.models.ItemVo = this.inpetequip.get(position)
			if (item == null) {//当前位置是否有装备
				return;
			}
			RequesterProtocols._instance.c2s_CTakeOffPet_Equip(item.key, PetModel.getInstance().petbasedata.key, 1);
		}
		public show(): void {
			super.show();
			this.lastSelectedBtn = 0;//默认宠物基础属性子界面按钮被选中
			var parentui: any = this._viewUI.parent
			this.scene2DPanel.ape.x = parentui.x * parentui.globalScaleX
			this.scene2DPanel.ape.y = parentui.y * parentui.globalScaleY
			this.texttips = new game.modules.commonUI.TextTipsMediator(this._app)
			this.initpetlist();
			this.initpetbase();
			models.PetProxy.getInstance().on(models.REFRESHSTATE_EVENT, this, this.refresh);
			this._viewUI.change_btn.selectHandler = new Laya.Handler(this, this.onselect);
			this._viewUI.release_btn.clickHandler = new Laya.Handler(this, this.fangsheng);
			this._viewUI.zhuangbeijingzhu_btn.clickHandler = new Laya.Handler(this, this.zhuangbeijingzhu);
			this._viewUI.distribution.clickHandler = new Laya.Handler(this, this.addshuxing);
			this._viewUI.rest_btn.clickHandler = new Laya.Handler(this, this.petfightorrest);
			this._viewUI.bbaddjy_btn.clickHandler = new Laya.Handler(this, this.petpetyang);
			this._viewUI.changepetname_btn.clickHandler = new Laya.Handler(this, this.changepetnameui);
			models.PetProxy.getInstance().on(models.RELEASEPET_EVENT, this, this.success);
			if (PetModel._instance.changexilian != -1) {//是否为宠物洗练界面
				this._viewUI.change_btn.selectedIndex = PetModel._instance.changexilian
			}
			//宠物加点引导
			if (HudModel.getInstance().yindaoId == YinDaoEnum.CLICK_PET_YINDAO) {
				this.petPointYindao();
				this._viewUI.change_btn.selectedIndex = 0;
				this.onselect(0);
			}
		}
		/**点击属性点分配 */
		public petPointYindao(): void {
			// var x1 = this._viewUI.distribution.x + this._viewUI.distribution.width - 80;
			// var y1 = this._viewUI.chongwubase_img.y + this._viewUI.distribution.y - 50;
			var x1 = this._viewUI.distribution.x + this._viewUI.distribution.width - 100;
			var y1 = this._viewUI.chongwubase_img.y + this._viewUI.distribution.y - 30;
			var x2 = x1 - 50;
			var y2 = y1 + 100;
			this.setTipPos(x1, y1);
			this.setAniPos(x2, y2);
			this.startYindao(YinDaoEnum.PET_YINDAO_TIP);
			HudModel.getInstance().yindaoId = YinDaoEnum.PET_FANGAN_YINDAO;
		}
		/**引导开始 */
		public startYindao(tipid: number): void {
			var tip = HudModel._instance.carroweffectData;
			this.onAniload();
			Laya.timer.loop(1000, this, this.moveImg);
			Laya.timer.loop(5000, this, this.closeAni);
			this._viewUI.yindaoTip_htm.text = tip[tipid].text;
			this._viewUI.addChild(this.yindaoAni);
			this._viewUI.addChild(this.dianImg);
			this._viewUI.yindaoTip_img.visible = true;
			this.dianImg.visible = true;
		}
		/**设置引导提示位置 */
		public setTipPos(x: number, y: number) {
			this._viewUI.yindaoTip_img.x = x;
			this._viewUI.yindaoTip_img.y = y;
		}
		/**设置动画位置*/
		public setAniPos(x: number, y: number) {
			this.yindaoAni.x = x;
			this.yindaoAni.y = y;
			this.dianImg.x = x + 20;
			this.dianImg.y = y - 10;
		}
		/**关闭动画 */
		public closeAni(): void {
			this.yindaoAni.clear();
			Laya.timer.clear(this, this.closeAni);
			Laya.timer.clear(this, this.moveImg);
			this._viewUI.yindaoTip_img.visible = false;
			this.dianImg.visible = false;
		}
		/**播放动画 */
		public onAniload() {
			Laya.Animation.createFrames(this.aUrls("", 9), "yindao")
			this.yindaoAni.play(0, true, "yindao");
			this.yindaoAni.interval = 112;
			this.dianImg.skin = "common/ui/mainhud/dian.png";
			this.yindaoAni.mouseThrough = true;
			this.dianImg.mouseThrough = true;
		}
		/**移动手指图标 */
		public moveImg(): void {
			if (this.dianImg.y <= this.yindaoAni.y) {
				// Laya.Tween.to(this.dianImg, { x: this.yindaoAni.x + 25, y: this.yindaoAni.y + 25 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
				Laya.Tween.to(this.dianImg, { x: this.yindaoAni.x + 50, y: this.yindaoAni.y + 20 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
			} else {
				// Laya.Tween.to(this.dianImg, { x: this.yindaoAni.x - 5, y: this.yindaoAni.y - 5 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
				Laya.Tween.to(this.dianImg, { x: this.yindaoAni.x + 20, y: this.yindaoAni.y - 10 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
			}
		}
		/**点击宠物装备特效*/
		public aUrls(aniName: string, length: number): any {
			var urls: any = []
			for (var index = 1; index <= length; index++) {
				urls.push("common/ui/yindao/" + aniName + index + ".png")
			}
			return urls;
		}
		/**选择宠物装备*/
		public selectpetequip(cell: Box, index: number): void {
			var petequip: Laya.Image = cell.getChildByName("item_img") as Laya.Image;
			petequip.on(Laya.Event.CLICK, this, this.select, [cell, index]);
		}
		/**宠物穿戴装备*/
		public talikequip(index: number): void {//穿装备
			let equipdata: EquipItemAttrBaseVo = StrengTheningModel.getInstance().equipItemAttrData[this.equipid[index]] as EquipItemAttrBaseVo;
			if (equipdata != null)
				RequesterProtocols._instance.c2s_CPutOnPet_Equip(this.itempackkey[index], PetModel._instance.petbasedata.key, equipdata.eequiptype - 99);
		}
		/**选择装备特效*/
		public onload() {
			Laya.Animation.createFrames(this.anUrls("xuanzhong", 9), "xuanzhong")
			this.ani.play(0, true, "xuanzhong")
			this.ani.interval = 112
		}
		/**特效路径*/
		public anUrls(aniName: string, length: number): any {
			var urls: any = []
			for (var index = 1; index <= length; index++) {
				urls.push("common/ui/tuji/" + aniName + index + ".png")
			}
			return urls
		}
		/**选择宠物装备*/
		public select(cell: Box, index: number): void {
			this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onload))
			let img: Laya.Image = cell.getChildByName("biankuang_img") as Laya.Image;
			let petequip: Laya.Image = cell.getChildByName("item_img") as Laya.Image;
			img.addChild(this.ani)
			this.ani.scaleX = 0.96
			this.ani.scaleY = 0.96
			if(petequip.skin == "") return;
			var parame: Dictionary = new Dictionary();
			parame.set("itemId", this.equipid[index]);
			parame.set("key", this.itempackkey[index]);
			parame.set("packid", 1);
			let item: ItemAttrBaseVo = BagModel.getInstance().itemAttrData[this.equipid[index]];
			if (item == null) {
				return;
			}
			switch (item.itemtypeid) {//42为护环 58为宝坠 74项圈 106头冠
				case 42:
					parame.set("equiptype", 2);
					break;
				case 58:
					parame.set("equiptype", 3);
					break;
				case 74:
					parame.set("equiptype", 4);
					break;
				case 106:
					parame.set("equiptype", 6);
					break;
				default:
					break;
			}
			tips.models.TipsModel.getInstance().whichView = ModuleNames.PET;
			tips.models.TipsModel.getInstance().currItemId = this.equipid[index];
			tips.models.TipsModel.getInstance().currItemKey = this.itempackkey[index];
			let _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame);
		}
		/**选择当前界面的不同分页*/
		private onselect(index: number): void {
			PetModel.getInstance().changexilian = index
			let flag: boolean = false;//用来判断是否不标记这次是哪个子界面按钮被选中
			switch (index) {// 0为基础属性界面 1为资质技能界面 2为宠物装备
				case 0:
					this._viewUI.petbase_box.visible = true;
					this._viewUI.petskill_box.visible = false;
					this._viewUI.petzhuangbei_box.visible = false;
					this._viewUI.rest_btn.visible = true;
					this._viewUI.release_btn.visible = true;
					break;
				case 1:
					this._viewUI.petbase_box.visible = false;
					this._viewUI.petskill_box.visible = true;
					this._viewUI.petzhuangbei_box.visible = false;
					this._viewUI.rest_btn.visible = true;
					this._viewUI.release_btn.visible = true;
					break;
				case 2:
					let roleLevel = HudModel.getInstance().levelNum;
					if (roleLevel < 65) {
						let tipsMsg: string = ChatModel.getInstance().chatMessageTips[160352]["msg"];
						tipsMsg = tipsMsg.replace("$parameter1$", "65");
						let disTipsMsgView = new commonUI.DisappearMessageTipsMediator(this._app);
						disTipsMsgView.onShow(tipsMsg);
						if (this.lastSelectedBtn != -1) {
							this._viewUI.change_btn.selectedIndex = this.lastSelectedBtn;
							flag = true;
						}
						break;
					}
					this._viewUI.petbase_box.visible = false;
					this._viewUI.petskill_box.visible = false;
					this._viewUI.petzhuangbei_box.visible = true;
					this._viewUI.rest_btn.visible = false;
					this._viewUI.release_btn.visible = false;
					break;
			}
			if (!flag) {
				this.lastSelectedBtn = index;
			}
		}
		/**宠物刷新数据*/
		public refresh(): void {
			this.initpetlist();//刷新宠物列表
			this.initpetbase();//刷新当前宠物数据
		}
		/**宠物出战*/
		public petfightorrest() {
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[2118]
			let rolelevel: number = HudModel.getInstance().levelNum;	//角色等级
			if (this._viewUI.rest_btn.label == chattext.msg) {//是否更换参战状态
				if (PetModel.getInstance().petbasedata.level <= (rolelevel + 10)) {
					if (PetModel.getInstance().petbasedata.useLevel <= rolelevel) {
						RequesterProtocols._instance.c2s_set_fightpet(PetModel.getInstance().petbasedata.key);
					}
					else {
						this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
						let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150084];
						this.tips.onShow(chattext.msg);
					}
				} else {
					this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
					let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[141394];
					this.tips.onShow(chattext.msg);
				}
			}
			else {
				RequesterProtocols._instance.c2s_set_fightpetrest();
			}

		}
		/**名称修改*/
		public changepetnameui(): void {
			this._change = new PetGongYongMediator(this._viewUI);
			this._change.app = this._app
			this._change.changename();
		}
		/**宠物放生*/
		public fangsheng(): void {
			let pet: PetCPetAttrBaseVo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id];
			if (pet.unusualid == 2) {//野生以外的宠物放生需要二次确认
				// this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				// let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[162116];
				// this.tips.onShow(chattext.msg);
				let promot = HudModel.getInstance().promptAssembleBack(PromptExplain.SHENSHOU_CANT_FREE);
				game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promot);
				return
			}
			//选择放生的宠物为出战宠物
			if (PetModel.getInstance().petbasedata.key == game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex) {
				// this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				// let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150040];		// 配置表提示 
				// this.tips.onShow(chattext.msg);
				let promot = HudModel.getInstance().promptAssembleBack(PromptExplain.FIGHT_CANT_FREE);
				game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promot);
				return;
			}
			let bag: Laya.Dictionary = game.modules.bag.models.BagModel.getInstance().bagMap[9];
			let baginfo: game.modules.bag.models.BagVo = bag.get(PetModel.getInstance().petbasedata.key);
			if (baginfo && baginfo.items.length != 0) {//宠物身上有装备
				// this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				// let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[191055];
				// this.tips.onShow(chattext.msg);
				let promot = HudModel.getInstance().promptAssembleBack(PromptExplain.ZHUENGBEI_CANT_FREE);
				game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promot);
				return
			}
			if (pet.quality >= EquipNquality.Purple) {//是紫色、橙色品质的，默认就是珍品宠物
				this.releaseConfirmation();
			}
			else if (PetModel.getInstance().petbasedata.petscore < pet.treasureScore)//当前宠物评分不足达到珍品宠物，就认为不是珍品
			{
				this.success();	 // 放生成功方法
			}
			else {// 宠物放生验证确认
				this.releaseConfirmation();
			}
		}
		/** 验证码放生确认 */
		private releaseConfirmation(): void {
			this._change = new PetGongYongMediator(this._viewUI);
			this._change.app = this._app;
			this._change.fangsheng(this._viewUI.chongwu_list.selectedIndex);
		}
		/**放生成功*/
		public success(): void {
			let keylist: Array<number> = [];
			keylist[0] = PetModel._instance.petbasedata.key;
			models.PetProxy.getInstance().once(models.DEL_PET, this, this.releasepet);
			RequesterProtocols._instance.c2s_free_pet1(keylist);
		}
		/**装备精铸*/
		public zhuangbeijingzhu(): void {
			this._jingzhu = new PetJingzhuZhuangbeiMediator(this._app);
			this._jingzhu.show();
			ModuleManager.hide(ModuleNames.PET);
		}
		/**属性点配置*/
		public addshuxing(): void {
			this._addshuxing = new PetAddShuXingdianMediator(this._app);
			this._addshuxing.show();
			ModuleManager.hide(ModuleNames.PET);
			if (HudModel.getInstance().yindaoId == YinDaoEnum.PET_FANGAN_YINDAO)
				this.closeAni();
		}
		/**宠物选择响应事件*/
		public initselect(cell: Box, index: number): void {
			let btn: Button = cell.getChildByName("petdiban_btn") as Button;
			if (index == PetModel.getInstance().currentselect) {//宠物选择是否与当前的选择的宠物一样
				if (this.lastpetbox) {
					let lastbtn: Button = this.lastpetbox.getChildByName("petdiban_btn") as Button;
					lastbtn.selected = false
				}
				btn.selected = true;
				this.lastpetbox = cell;
			}
			btn.on(LEvent.MOUSE_DOWN, this, this.selectlist, [cell, index])
		}
		/**宠物选择*/
		public selectlist(cell: Box, index: number): void {
			var petdata: Array<any> = [];
			let count: number = 0;
			let score: string = "";
			let lastbtn: Button = this.lastpetbox.getChildByName("petdiban_btn") as Button;
			lastbtn.selected = false;
			let btn: Button = cell.getChildByName("petdiban_btn") as Button;
			btn.selected = true;
			this.lastpetbox = cell;
			PetModel.getInstance().currentselect = index;
			if (index > PetModel.getInstance().pets.keys.length - 1) {//当前点击的位置是否大于已有的宠物长度
				game.modules.createrole.models.LoginModel.getInstance().CommonPage = ModuleNames.PET
				game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.ADD_EVENT, this, this.addpet)
				this.petshop = new game.modules.commonUI.PetShopMediator(this._app);
				this.petshop.init()
				ModuleManager.hide(ModuleNames.PET)
				return;
			}
			for (let num in PetModel.getInstance().pets.keys) {
				let data: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(PetModel.getInstance().pets.keys[num]);
				if (parseInt(num) == index) {//当前选择的宠物信息
					PetModel.getInstance().petbasedata = data;
					PetModel.getInstance().petinitfight = data.initbfp;
					PetModel.getInstance().petbasicfight = data.bfp;
					PetModel.getInstance().petskill = data.skills;
				}
			}
			this.initpetbase();		//宠物数据初始化
		}
		/**从宠物商店购买宠物 */
		public addpet(): void {
			this.initpetlist();
			game.modules.pet.models.PetProxy.getInstance().off(game.modules.pet.models.ADD_EVENT, this, this.addpet)
		}
		/**切换到培养界面*/
		public petpetyang(): void {
			models.PetProxy.getInstance().event(models.CHANGEUI_EVENT);
		}
		public hide(): void {
			PetModel.getInstance().changexilian = -1
			this.hidedata()
			super.hide();
		}
		/**更改宠物名字*/
		public changename(e: any): void {
			this._viewUI.petname_lab.changeText(PetModel._instance.petName);
		}

		public getView(): Sprite {
			return this._viewUI;
		}
		/**放生宠物*/
		public releasepet(): void {
			this.refresh();
		}
		/**技能tips*/
		public skillstips(index: number): void {
			if (index < PetModel.getInstance().petskill.length) {//是否是拥有的技能还是空白位置
				var parame: Dictionary = new Dictionary();
				parame.set("itemId", PetModel.getInstance().petskill[index].skillId)
				let _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
			}
		}
		/**查看宠物装备tips*/
		public chakan(num: number): void {//宠物装备的部位类型ID
			//先判断现有的tips中有没有该装备的tips，没有就发协议添加  
			let equipTips = StrengTheningModel.getInstance().equipTips
			let ishave = 0;
			let itemkey: number
			var parame: Dictionary = new Dictionary();
			parame.set("packid", 9);
			let petbag: Laya.Dictionary = game.modules.bag.models.BagModel.getInstance().bagMap[9]
			let petequipinfo: BagVo = petbag.get(PetModel.getInstance().petbasedata.key)
			let item: ItemAttrBaseVo
			for (var index = 0; index < petequipinfo.items.length; index++) {
				let items: game.modules.bag.models.ItemVo = petequipinfo.items[index]
				item = BagModel.getInstance().itemAttrData[items.id]
				if (item.itemtypeid == num) {//部位ID是否正确
					parame.set("itemId", items.id);
					parame.set("key", items.key);
					itemkey = items.key
					for (var index = 0; index < equipTips.length; index++) {
						if (equipTips[index].packid == 9) {//9为宠物装备背包
							if (equipTips[index].keyinpack == items.key) {//拥有该tips
								ishave = 1
								break;
							}
						}
					}
					break;
				}
				else {
					item = null
				}
			}
			if (item) {//是否有装备信息
				switch (item.itemtypeid) {// 42为护环 58为宝坠 74项圈 106头冠
					case 42:
						parame.set("equiptype", 2);
						break;
					case 58:
						parame.set("equiptype", 3);
						break;
					case 74:
						parame.set("equiptype", 4);
						break;
					case 106:
						parame.set("equiptype", 6);
						break;
					default:
						break;
				}
				if (ishave == 1) {//是否拥有该装备的TIPS，1为拥有，未拥有时向服务器请求
					let _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.PETEQUIP, parame);
				}
				else {//发协议请求tips
					game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.PETEQUIPTIPS, this, this.showequip, [parame])
					RequesterProtocols._instance.c2s_CGetPetEquip_Tips(pet.models.PetModel._instance.petbasedata.key, itemkey)
				}
			}

		}
		/**显示装备tips*/
		public showequip(parame: Dictionary): void {
			let _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.PETEQUIP, parame);
		}
	}
}