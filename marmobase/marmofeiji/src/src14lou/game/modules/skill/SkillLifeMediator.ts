/**
 * 生活技能类
 */
module game.modules.skill {
	export class SkillLifeMediator extends game.modules.UiMediator {
		public _viewUI: ui.common.SkillLifeUI;
		/**炼金界面 */
		private _SkillLianJinMediator: SkillLianJinMediator;
		/**银币不足界面 */
		private _JinBiBuZuViewMediator: commonUI.JinBiBuZuViewMediator;
		/**页面提示 */
		private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
		/** 飘窗提示*/
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		/**通用物品提示 */
		private _tipsModule: game.modules.tips.tipsModule;
		/**s生活技能表 */
		private skillObj: Object;
		/** s食品表*/
		private foodObj: Object;
		/**z杂货表 */
		private zahuoObj: Object;
		/**d道具表-复合 */
		private dazaoObj: Object;
		/** j继承消耗*/
		private shouhuoObj: Object;
		/** s生活技能学习消耗*/
		private costObj: Object;
		/**生活技能 */
		private skillArr: Array<any>;
		/**生活技能图片 */
		private skillImgArr: Array<any>;
		/**食品 */
		private foodArr: Array<any>;
		/**食品图片 */
		private foodImgArr: Array<any>;
		/**药品 */
		private drugArr: Array<any>;
		/**药品图片 */
		private drugImgArr: Array<any>;
		/** 打造模具图*/
		private dazaoImgArr: Array<any>;
		/**武器模具 */
		private wuqiArr: Array<any>;
		/**武器模具名 */
		private wuqiNameArr: Array<any>;
		/**防具模具 */
		private fangjuArr: Array<any>;
		/**防具模具名 */
		private fangjuNameArr: Array<any>;
		/**饰品模具 */
		private shipinArr: Array<any>;
		/**饰品模具名 */
		private shipinNameArr: Array<any>;
		/**变身卡 */
		private kapianArr: Array<any>;
		/**当前选择列表项下标 */
		private selectNum: number = 0;
		/**用于变身卡翻页*/
		private kapianNum: number = 1;
		/**锻造级别 */
		private dazaoNum: number = 0;
		/**当前活力 */
		private huoliNum: number = 0;//
		/**消耗活力 */
		private huolixiaohao: number = 0//
		/**制造变身卡级别 */
		private shouhuoId: number = 1;
		constructor(uiLayer: Sprite, app?: AppBase) {
			super(uiLayer);
			this._viewUI = new ui.common.SkillLifeUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = false;
			this._app = app;
			this._SkillLianJinMediator = new SkillLianJinMediator(this._app);
			this._JinBiBuZuViewMediator = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
			this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			this.initialize();
			this.init();
			this.registerEvent();
			this.eventListener();
		}
		/**事件监听 */
		public eventListener(): void {
			mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshCurrency_EVENT, this, this.onRefreshCurrency);
			mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshRoleCurrency_EVENT, this, this.onRefreshRoleCurrency);
			mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshRoleData_EVENT, this, this.onRefreshRoleData);
			models.SkillProxy.getInstance().on(models.SUpdateLearnLiveSkill_EVENT, this, this.onUpdateLearnLiveSkil);
			models.SkillProxy.getInstance().on(models.SLiveSkillMakeFood_EVENT, this, this.onLiveSkillMakeFood);
			models.SkillProxy.getInstance().on(models.SLiveSkillMakeStuff_EVENT, this, this.onLiveSkillMakeStuff);
			models.SkillProxy.getInstance().on(models.SLiveSkillMakeCard_EVENT, this, this.onLiveSkillMakeCard);
			models.SkillProxy.getInstance().on(models.SRequestLiveSkillList_EVENT, this, this.onRequestLiveSkillList);
		}
		/**初始化 */
		public initialize(): void {
			this.skillArr = new Array<any>();
			this.skillImgArr = new Array<any>();
			this.foodArr = new Array<any>();
			this.foodImgArr = new Array<any>();
			this.drugArr = new Array<any>();
			this.drugImgArr = new Array<any>();
			this.dazaoImgArr = new Array<any>();
			this.wuqiArr = new Array<any>();
			this.wuqiNameArr = new Array<any>();
			this.fangjuArr = new Array<any>();
			this.fangjuNameArr = new Array<any>();
			this.shipinArr = new Array<any>();
			this.shipinNameArr = new Array<any>();
			this.kapianArr = new Array<any>();
			this.skillObj = models.SkillModel.getInstance().CLifeSkillBinDic;
			this.foodObj = SaleModel.getInstance().foodAndDrugEffectData;
			this.zahuoObj = StrengTheningModel.getInstance().groceryEffectData;
			this.dazaoObj = BagModel.getInstance().itemAttrData;
			this.shouhuoObj = models.SkillModel.getInstance().CInheritCostBinDic;
			this.costObj = models.SkillModel.getInstance().CLifeSkillCostBinDic;
		}
		/**初始化数据 */
		public init(): void {
			this.skillArr.push(this.skillObj[lifeSkill.DUANLIAN]);
			this.skillArr.push(this.skillObj[lifeSkill.GUANXIANG]);
			this.skillArr.push(this.skillObj[lifeSkill.PENGREN]);
			this.skillArr.push(this.skillObj[lifeSkill.LIANJIN]);
			this.skillArr.push(this.skillObj[lifeSkill.DUANZAO]);
			this.skillArr.push(this.skillObj[lifeSkill.CAIFENG]);
			this.skillArr.push(this.skillObj[lifeSkill.ZHUBAO]);
			this.skillArr.push(this.skillObj[lifeSkill.SHOUHUO]);
			for (var i: number = 0; i < this.skillArr.length; i++) {
				this.skillImgArr.push({ img: "common/icon/skill/" + this.skillArr[i]["icon"] + ".png" });
			}
			//初始化食品
			for (var i: number = SkillEnum.FOOD_START; i < SkillEnum.FOOD_END; i++) {
				this.foodArr.push(this.foodObj[i]);
			}
			for (var i: number = SkillEnum.FOOD_IMG_START; i < SkillEnum.FOOD_IMG_END; i++) {
				this.foodImgArr.push({ img: "common/icon/item/" + i + ".png" });
			}
			//初始化药品
			this.drugArr.push(this.foodObj[drug.XIANLUJIU]);
			this.drugArr.push(this.foodObj[drug.XICHENDAN]);
			this.drugArr.push(this.foodObj[drug.HUANMINGYAO]);
			this.drugArr.push(this.foodObj[drug.JULINGJIANG]);
			this.drugArr.push(this.foodObj[drug.XUEQIDAN]);
			this.drugArr.push(this.foodObj[drug.POWANGCHEN]);
			this.drugImgArr.push({ img: "common/icon/item/" + drug.XIANLUJIU_IMG + ".png" });
			this.drugImgArr.push({ img: "common/icon/item/" + drug.XICHENDAN_IMG + ".png" });
			this.drugImgArr.push({ img: "common/icon/item/" + drug.HUANMINGYAO_IMG + ".png" });
			this.drugImgArr.push({ img: "common/icon/item/" + drug.JULINGJIANG_IMG + ".png" });
			this.drugImgArr.push({ img: "common/icon/item/" + drug.XUEQIDAN_IMG + ".png" });
			this.drugImgArr.push({ img: "common/icon/item/" + drug.POWANGCHEN_IMG + ".png" });
			//初始化打造
			this.dazaoImgArr.push({ img: "common/icon/item/" + dazao.WUQI_IMG + ".png" });
			this.dazaoImgArr.push({ img: "common/icon/item/" + dazao.FANGJU_IMG + ".png" });
			this.dazaoImgArr.push({ img: "common/icon/item/" + dazao.SHIPIN_IMG + ".png" });
			for (var i: number = SkillEnum.WIQI_START; i < SkillEnum.WIQI_END; i++) {
				this.wuqiArr.push(this.zahuoObj[i]);
				this.wuqiNameArr.push(this.dazaoObj[i]);
			}
			for (var i: number = SkillEnum.FANGJU_START; i < SkillEnum.FANGJU_END; i++) {
				this.fangjuArr.push(this.zahuoObj[i]);
				this.fangjuNameArr.push(this.dazaoObj[i]);
			}
			for (var i: number = SkillEnum.SHIPIN_START; i < SkillEnum.SHIPIN_END; i++) {
				this.shipinArr.push(this.zahuoObj[i]);
				this.shipinNameArr.push(this.dazaoObj[i]);
			}
		}
		/** 返回已经学习的所有生活技能*/
		public onRequestLiveSkillList(e: any): void {
			var data: hanlder.S2C_request_liveskilllist = models.SkillModel.getInstance().SRequestLiveSkillListData.get("data");
			for (var i: number = 0; i < data.skilllist.length; i++) {
				for (var j: number = 0; j < this.skillArr.length; j++) {
					if (this.skillArr[j]["id"] == data.skilllist[i]["id"]) {
						var levelLab: Laya.Label = this._viewUI.skill_list.getCell(j).getChildByName("level_lab") as Laya.Label;
						levelLab.text = data.skilllist[i]["level"];//刷新等级
					}
				}
			}
			this.getListData();
			this.onSelect(0);
		}
		/**获取已修炼技能等级 */
		public getSkillLevel(): void {
			RequesterProtocols._instance.c2s_CRequestLiveSkillList();//请求已经学习的生活技能链表
		}
		/**获取所需货币数量 */
		public initMoney(): void {
			RequesterProtocols._instance.c2s_CRequestAttr([shuxing.ENERGY]);//请求得到当前活力
			this._viewUI.yongYou1_lab.text = HudModel.getInstance().sliverNum.toString();//银币
			this._viewUI.yongYou2_lab.text = HudModel.getInstance().gonghuiNum.toString();//帮贡
		}
		/**刷新银币 */
		public onRefreshCurrency(e: any): void {
			this._viewUI.yongYou1_lab.text = HudModel.getInstance().sliverNum.toString();//银币
			//根据升级费用改变颜色
			if (parseInt(this._viewUI.xuQiu_lab.text) > parseInt(this._viewUI.yongYou1_lab.text)) {
				this._viewUI.xuQiu_lab.color = models.SkillModel.chineseStr.red;//更换需要银币的字体颜色
			} else
				this._viewUI.xuQiu_lab.color = models.SkillModel.chineseStr.green;
		}
		/**刷新帮贡 */
		public onRefreshRoleCurrency(e: any): void {
			this._viewUI.yongYou2_lab.text = HudModel.getInstance().gonghuiNum.toString();//帮贡
			if (parseInt(this._viewUI.xuQIu2_lab.text) > parseInt(this._viewUI.yongYou2_lab.text)) {
				this._viewUI.xuQIu2_lab.color = models.SkillModel.chineseStr.red;//更换需要帮贡的字体颜色
			} else
				this._viewUI.xuQIu2_lab.color = models.SkillModel.chineseStr.green;
		}
		/**刷新人物属性 */
		public onRefreshRoleData(e: any): void {
			this.huoliNum = HudModel.getInstance().energyNum;//活力
		}
		/**刷新等级 */
		public onUpdateLearnLiveSkil(e: any): void {
			var data: hanlder.S2C_update_learnliveskill = models.SkillModel.getInstance().SUpdateLearnLiveSkillData.get("data");
			var levelLab: Laya.Label = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab") as Laya.Label;
			levelLab.text = data.skill["level"].toString();	//刷新等级
			var skiliData: Array<any> = [this.skillArr[this.selectNum]["name"], data.skill["level"]];	//技能名字 技能等级

			this._viewUI.xuQiu_lab.text = this.costObj[parseInt(levelLab.text) + 1]["silverCostList"][this.skillArr[this.selectNum]["studyCostRule"] - 1];//升级银两费用
			this._viewUI.xuQIu2_lab.text = this.costObj[parseInt(levelLab.text) + 1]["guildContributeCostList"][this.skillArr[this.selectNum]["studyCostRule"] - 1];//升级帮贡费用
			this._viewUI.titleLevel_lab.text = levelLab.text;
			this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1];//消耗活力
			this.huolixiaohao = this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1];//消耗活力
			//让打造界面翻页
			if (parseInt(levelLab.text) % SkillEnum.TEN_LEVEL == 0 && parseInt(levelLab.text) > 10) {
				this.clickRightBtn();
				this.clickRight();
			}
			this.getPengrenData();
			this.onSelect(this.selectNum);
			this.liveSkillBay(skiliData);
		}
		/**生活技能每升一级弹窗 */
		public liveSkillBay(skiliData: Array<string>): void {
			let prompt = HudModel.getInstance().promptAssembleBack(150099, skiliData);
			let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			disappearMsgTips.onShow(prompt);
		}
		/**制作食物返回 */
		public onLiveSkillMakeFood(e: any): void {
			var data: hanlder.S2C_live_skillsakefood = models.SkillModel.getInstance().SLiveSkillMakeFoodData.get("data");
			var levelLab: Laya.Label = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab") as Laya.Label;
			//显示获得食物名称
			var param = [this.foodObj[data.itemid].name];
			let prompt = HudModel.getInstance().promptAssembleBack(150102, param);
			this.tips.onShow(prompt);
			this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1];//消耗活力
		}
		/**锻造返回 */
		public onLiveSkillMakeStuff(e: any): void {
			var data: hanlder.S2C_live_skillmakestuff = models.SkillModel.getInstance().SLiveSkillMakeStuffData.get("data");
			var levelLab: Laya.Label = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab") as Laya.Label;
			//显示获得物品
			var param;
			//根据当前选中列表下标
			switch (this.selectNum) {
				case 4:
					param = [this.wuqiNameArr[this.dazaoNum]["name"]];//武器打造符
					break;
				case 5:
					param = [this.fangjuNameArr[this.dazaoNum]["name"]];//防具打造符
					break;
				case 6:
					param = [this.shipinNameArr[this.dazaoNum]["name"]];//饰品打造符
					break;
			}
			let prompt = HudModel.getInstance().promptAssembleBack(150107, param);
			this.tips.onShow(prompt);
			this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1];//消耗活力
		}
		/**服务器返回制作变身卡成功 */
		public onLiveSkillMakeCard(e: any): void {
			var data: hanlder.S2C_live_skillmakecard = models.SkillModel.getInstance().SLiveSkillMakeCardData.get("data");
			var levelLab: Laya.Label = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab") as Laya.Label;
			//刷新所需道具数量
			this._viewUI.needNum_lab.text = (BagModel.getInstance().chargeItemNum(this.shouhuoObj[this.shouhuoId]["costitem"])).toString();
			this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1];//消耗活力
		}
		/**初始化界面 */
		public getListData(): void {
			//生活技能
			this._viewUI.skill_list.vScrollBarSkin = "";
			this._viewUI.skill_list.scrollBar.elasticBackTime = 200;
			this._viewUI.skill_list.scrollBar.elasticDistance = 50;
			this._viewUI.skill_list.array = this.skillArr;
			this._viewUI.skill_list.repeatY = 4;
			this._viewUI.skill_list.renderHandler = new Handler(this, this.onRender);
			this._viewUI.skill_list.selectHandler = new Handler(this, this.onSelect);
			this._viewUI.skill_list.selectedIndex = 0;
			//炼金
			this._viewUI.lianJin_list.vScrollBarSkin = "";
			this._viewUI.lianJin_list.scrollBar.elasticBackTime = 200;
			this._viewUI.lianJin_list.scrollBar.elasticDistance = 50;
			this._viewUI.lianJin_list.repeatY = this.drugArr.length;
			this._viewUI.lianJin_list.array = this.drugArr;
			this._viewUI.lianJin_list.renderHandler = new Handler(this, this.onDrugRender);
			this._viewUI.lianJin_list.selectedIndex = 0;
		}
		/**初始化烹饪面板 */
		public getPengrenData(): void {
			//烹饪
			this._viewUI.pengRen_list.vScrollBarSkin = "";
			this._viewUI.pengRen_list.scrollBar.elasticBackTime = 200;
			this._viewUI.pengRen_list.scrollBar.elasticDistance = 50;
			this._viewUI.pengRen_list.repeatY = this.foodArr.length;
			this._viewUI.pengRen_list.array = this.foodArr;
			this._viewUI.pengRen_list.renderHandler = new Handler(this, this.onFoodRender);
			this._viewUI.pengRen_list.selectedIndex = 0;
		}
		/**初始化锻造面板 */
		public getDuanzaoData(): void {
			//锻造
			this._viewUI.daZao_list.array = this.wuqiArr;
			this._viewUI.daZao_list.repeatX = 1;
			this._viewUI.daZao_list.renderHandler = new Handler(this, this.onDazaoRender);
			this._viewUI.daZao_list.selectedIndex = 0;
			this._viewUI.daZao_list.scrollTo(this.dazaoNum);
		}
		/**初始化收获面板 */
		public getShouhuoData(): void {
			//收获
			this._viewUI.kapian_list.hScrollBarSkin = "";
			this._viewUI.kapian_list.scrollBar.elasticBackTime = 200;
			this._viewUI.kapian_list.scrollBar.elasticDistance = 50;
			this._viewUI.kapian_list.array = this.kapianArr;
			this._viewUI.kapian_list.repeatX = 3;
			this._viewUI.kapian_list.renderHandler = new Handler(this, this.onKapianRender);
		}
		/**渲染技能列表 */
		public onRender(cell: Laya.Box, index: number): void {
			if (index > this.skillArr.length) return;
			//收获技能65级开放
			if (HudModel.getInstance().levelNum < SkillEnum.SHOUHUO_LEVEL && index > 6) {
				this._viewUI.skill_list.getCell(index).visible = false;
				return;
			}
			var nameLab: Laya.Label = cell.getChildByName("name_lab") as Laya.Label;
			var tubiaoImg: Laya.Image = cell.getChildByName("touxiang_img") as Laya.Image;
			var levelLab: Laya.Label = cell.getChildByName("level_lab") as Laya.Label;
			var jinengBtn: Laya.Button = cell.getChildByName("jineng_btn") as Laya.Button;
			//如果不是选中状态，改变按钮颜色
			if (index != this.selectNum) {
				jinengBtn.skin = "common/ui/tongyong/common_list_textbg2.png";
			}
			nameLab.text = this.skillArr[index]["name"];
			tubiaoImg.skin = this.skillImgArr[index].img;
		}
		/**渲染烹饪列表 */
		public onFoodRender(cell: Laya.Box, index: number): void {
			if (index > this.foodArr.length) return;
			var levelLab: Laya.Label = cell.getChildByName("level_lab") as Laya.Label;
			var foodImg: Laya.Image = cell.getChildByName("food_img") as Laya.Image;
			var pengrenLevel: Laya.Label = this._viewUI.skill_list.getCell(2).getChildByName("level_lab") as Laya.Label;
			//如果烹饪等级大于该食物解锁等级
			if (parseInt(pengrenLevel.text) >= this.foodArr[index]["needPengrenLevel"])
				levelLab.text = "";
			else
				levelLab.text = models.SkillModel.chineseStr.dengji + this.foodArr[index]["needPengrenLevel"];
			foodImg.skin = this.foodImgArr[index].img;
			foodImg.on(LEvent.MOUSE_DOWN, this, this.clickFood, [index]);
			let foodFrame_img: Laya.Image = cell.getChildByName("foodFrame_img") as Laya.Image;
			let _quality = BagModel.getInstance().itemAttrData[this.foodArr[index]["id"]]["nquality"];
			foodFrame_img.skin = bag.BagSystemModule.getGameItemFrameColorResource(_quality);//设置炼金产物的品质边框图
		}
		/**点击烹饪图片 */
		public clickFood(index: number) {
			var itemId = this.foodArr[index].id;
			var parame: Dictionary = new Dictionary();
			parame.set("itemId", itemId);
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
		}
		/**渲染炼金列表 */
		public onDrugRender(cell: Laya.Box, index: number): void {
			if (index > this.drugArr.length) return;
			let drugFrame_img: Laya.Image = cell.getChildByName("drugFrame_img") as Laya.Image;
			let _quality = BagModel.getInstance().itemAttrData[this.drugArr[index]["id"]]["nquality"];
			drugFrame_img.skin = bag.BagSystemModule.getGameItemFrameColorResource(_quality);//设置炼金产物的品质边框图
			let drugImg: Laya.Image = cell.getChildByName("drug_img") as Laya.Image;
			drugImg.skin = this.drugImgArr[index].img;
			drugImg.on(LEvent.MOUSE_DOWN, this, this.clickDrug, [index]);
		}
		/**点击药品图片 */
		public clickDrug(index: number): void {
			var itemId = this.drugArr[index].id;
			var parame: Dictionary = new Dictionary();
			parame.set("itemId", itemId);
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
		}
		/**渲染锻造列表 */
		public onDazaoRender(cell: Laya.Box, index: number): void {
			if (index > this.wuqiArr.length) return;
			var tip = tips.models.TipsModel.getInstance().cstringResConfigData;//程序内字符串
			//根据当前选中下标
			var skillid = this.skillArr[this.selectNum]["id"];		// 技能id
			var skillLevel = models.SkillModel.getInstance().LiveSkilllevelData.get(skillid);
			var showLevel: number;
			switch (this.selectNum) {
				case 4:
					var wuqiImg: Laya.Image = cell.getChildByName("duanZaoTouXiang_img") as Laya.Image;
					var nameLab: Laya.Label = cell.getChildByName("name_lab") as Laya.Label;
					var levelLab: Laya.Label = cell.getChildByName("level_lab") as Laya.Label;
					wuqiImg.skin = this.dazaoImgArr[0].img;
					nameLab.text = this.wuqiNameArr[index]["name"];
					levelLab.text = this.wuqiNameArr[index]["level"] + tip[SkillEnum.JI_TEXT].msg;
					showLevel = this.wuqiNameArr[index]["level"];
					break;
				case 5:
					var fangjuImg: Laya.Image = cell.getChildByName("duanZaoTouXiang_img") as Laya.Image;
					var nameLab: Laya.Label = cell.getChildByName("name_lab") as Laya.Label;
					var levelLab: Laya.Label = cell.getChildByName("level_lab") as Laya.Label;
					fangjuImg.skin = this.dazaoImgArr[1].img;
					nameLab.text = this.fangjuNameArr[index]["name"];
					levelLab.text = this.fangjuNameArr[index]["level"] + tip[SkillEnum.JI_TEXT].msg;
					showLevel = this.fangjuNameArr[index]["level"];
					break;
				case 6:
					var shipinImg: Laya.Image = cell.getChildByName("duanZaoTouXiang_img") as Laya.Image;
					var nameLab: Laya.Label = cell.getChildByName("name_lab") as Laya.Label;
					var levelLab: Laya.Label = cell.getChildByName("level_lab") as Laya.Label;
					shipinImg.skin = this.dazaoImgArr[2].img;
					nameLab.text = this.shipinNameArr[index]["name"];
					levelLab.text = this.shipinNameArr[index]["level"] + tip[SkillEnum.JI_TEXT].msg;
					showLevel = this.shipinNameArr[index]["level"];
					break;
			}
			if (skillLevel < 20) {
				this._viewUI.left_btn.visible = false;
				this._viewUI.right_btn.visible = false;
			} else {
				this._viewUI.left_btn.visible = true;
				if (showLevel <= 10) {
					this._viewUI.left_btn.visible = false;
				}
				this._viewUI.right_btn.visible = false;
				if (showLevel + 10 <= skillLevel) {
					this._viewUI.right_btn.visible = true;
				}
			}
		}
		/**渲染变身卡列表 */
		public onKapianRender(cell: Laya.Box, index: number): void {
			var kapianImg: Laya.Image = cell.getChildByName("kapian_img") as Laya.Image;
			if (this.dazaoObj[this.kapianArr[index]]["icon"] > SkillEnum.KAPIAN_IMG)
				kapianImg.skin = "common/icon/avatarpartner/" + this.dazaoObj[this.kapianArr[index]]["icon"] + ".png";
			else
				kapianImg.skin = "common/icon/avatarrole/" + this.dazaoObj[this.kapianArr[index]]["icon"] + ".png";
		}
		/**注册点击监听 */
		public registerEvent(): void {
			this._viewUI.right_img.on(LEvent.MOUSE_DOWN, this, this.clickRight);
			this._viewUI.left_img.on(LEvent.MOUSE_DOWN, this, this.clickLeft);
			this._viewUI.right_btn.on(LEvent.MOUSE_DOWN, this, this.clickRightBtn);
			this._viewUI.left_btn.on(LEvent.MOUSE_DOWN, this, this.clickLeftBtn);
			this._viewUI.xueXiJiNeng_btn.on(LEvent.MOUSE_DOWN, this, this.clickUpdate);
			this._viewUI.pengren_btn.on(LEvent.MOUSE_DOWN, this, this.clickPengren);
			this._viewUI.lianjin_btn.on(LEvent.MOUSE_DOWN, this, this.clickLianjin);
			this._viewUI.dazao_btn.on(LEvent.MOUSE_DOWN, this, this.clickDazao);
			this._viewUI.shouhuo_btn.on(LEvent.MOUSE_DOWN, this, this.clickShouhuo);
		}
		/**收获技能翻页 */
		public clickRight(): void {
			var levelLab: Laya.Label = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab") as Laya.Label;
			if (this.kapianNum > SkillEnum.MAX_SHOUHUO_LEVEL || Math.floor(this.kapianNum) / SkillEnum.TEN_LEVEL >= Math.floor(parseInt(levelLab.text) / SkillEnum.TEN_LEVEL) - 1)
				return;
			this.kapianNum += SkillEnum.TEN_LEVEL;
			this.initShouhuo(this.kapianNum);
			this.getShouhuoData();
		}

		public clickLeft(): void {
			if (this.kapianNum < SkillEnum.TEN_LEVEL)
				return;
			this.kapianNum -= SkillEnum.TEN_LEVEL;
			this.initShouhuo(this.kapianNum);
			this.getShouhuoData();
		}
		/**打造界面翻页 */
		public clickRightBtn(): void {
			var levelLab: Laya.Label = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab") as Laya.Label;
			if (this.dazaoNum > 8 || this.dazaoNum >= Math.floor(parseInt(levelLab.text) / SkillEnum.TEN_LEVEL) - 1)
				return;
			this.dazaoNum += 1;
			this._viewUI.daZao_list.scrollTo(this.dazaoNum);
			this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[(this.dazaoNum + 1) * SkillEnum.TEN_LEVEL]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1];//消耗活力
		}
		public clickLeftBtn(): void {
			if (this.dazaoNum <= 0)
				return;
			this.dazaoNum -= 1;
			this._viewUI.daZao_list.scrollTo(this.dazaoNum);
			this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[(this.dazaoNum + 1) * SkillEnum.TEN_LEVEL]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1];//消耗活力
		}
		/** 点击升级*/
		public clickUpdate(): void {
			var needMoney = parseInt(this._viewUI.xuQiu_lab.text);
			var needBanggong = parseInt(this._viewUI.xuQIu2_lab.text);
			var skillid = this.skillArr[this.selectNum]["id"];		// 技能id
			var skillzidianDataLevel = models.SkillModel.getInstance().LiveSkilllevelData.get(skillid);			// 通过id取他的等级
			//当前等级大于玩家等级10级
			if (skillzidianDataLevel >= HudModel.getInstance().levelNum + 10) {
				let prompt = HudModel.getInstance().promptAssembleBack(150016);
				let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				disappearMsgTips.onShow(prompt);
			}
			//如果银币不够
			if (needMoney > HudModel.getInstance().sliverNum) {
				var duihuanMoney = needMoney - HudModel.getInstance().sliverNum;//需要兑换的钱
				this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI).toString(), Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI).toString());
				this._JinBiBuZuViewMediator.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
				this._JinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
			}
			//如果帮贡不够
			else if (needBanggong > HudModel.getInstance().gonghuiNum) {
				let prompt = HudModel.getInstance().promptAssembleBack(SkillEnum.BANGGONG_BUZU);
				this.tips.onShow(prompt);
			} else
				RequesterProtocols._instance.c2s_CRequestLearnLiveSkill(this.skillArr[this.selectNum]["id"]);//学习技能
		}

		/**仙晶兑换 */
		public goCharge(yuanbao) {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			if (fuShiNum < yuanbao) {
				this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
				this._TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", RoleEnum.XIANJIN_TIP);
				this._TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
			}
		}
		/**通过元宝购买物品 */
		public buySliverFromYuanBao(yuanbao) {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			if (fuShiNum < yuanbao) {
				this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
				this._TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", RoleEnum.XIANJIN_TIP);
				this._TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				RequesterProtocols._instance.c2s_exchange_currency(3, 1, yuanbao);
			}

		}

		public goRecharge() {
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界
		}

		/**烹饪 */
		public clickPengren(): void {
			var levelLab: Laya.Label = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab") as Laya.Label;
			var needhuoli = this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1];//当前技能所需活力
			if (this.huoliNum < needhuoli) {
				let prompt = HudModel.getInstance().promptAssembleBack(SkillEnum.HUOLI_BUZU);//活力不足
				this.tips.onShow(prompt);
			} else
				RequesterProtocols._instance.c2s_CLiveSkillMakeFood();//烹饪
		}
		/**打开炼金界面 */
		public clickLianjin(): void {
			this._SkillLianJinMediator.show();
			this._SkillLianJinMediator.init(this.huolixiaohao);
			ModuleManager.hide(ModuleNames.SKILL);
		}
		/**锻造 */
		public clickDazao(): void {
			var levelLab: Laya.Label = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab") as Laya.Label;
			var needhuoli = this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1];//当前技能所需活力
			if (this.huoliNum < needhuoli) {
				let prompt = HudModel.getInstance().promptAssembleBack(SkillEnum.HUOLI_BUZU);//活力不足
				this.tips.onShow(prompt);
			} else {
				switch (this.selectNum) {
					case 4:
						RequesterProtocols._instance.c2s_CLiveSkillMakeStuff(this.wuqiArr[this.dazaoNum]["id"], 1);//锻造
						break;
					case 5:
						RequesterProtocols._instance.c2s_CLiveSkillMakeStuff(this.fangjuArr[this.dazaoNum]["id"], 1);//裁缝
						break;
					case 6:
						RequesterProtocols._instance.c2s_CLiveSkillMakeStuff(this.shipinArr[this.dazaoNum]["id"], 1);//珠宝
						break;
				}
			}

		}
		/**制造变身卡 */
		public clickShouhuo(): void {
			var levelLab: Laya.Label = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab") as Laya.Label;
			var needhuoli = this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1];//当前技能所需活力
			//如果道具不足
			if (parseInt(this._viewUI.needNum_lab.text) == 0) {
				let prompt = HudModel.getInstance().promptAssembleBack(SkillEnum.DAOJU_BUZU);
				this.tips.onShow(prompt);
			}
			//活力不足
			else if (this.huoliNum < needhuoli) {
				let prompt = HudModel.getInstance().promptAssembleBack(SkillEnum.HUOLI_BUZU);
				this.tips.onShow(prompt);
			} else
				RequesterProtocols._instance.c2s_CLiveSkillMakeCard(this.shouhuoId);
		}
		/**初始化收获界面 */
		public initShouhuo(level: number): void {
			//根据等级区间初始化不同的变身卡列表
			if (0 <= level && level <= 10) {
				this._viewUI.kapianName_lab.text = this.shouhuoObj[1]["desc"];
				this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[1]["costitem"]]["icon"] + ".png";
				this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[1]["costitem"]]["name"];
				this.shouhuoId = this.shouhuoObj[1]["id"];
				this.kapianArr.length = 0;
				for (var i: number = 0; i < this.shouhuoObj[1]["veccard"].length; i++) {
					if (this.shouhuoObj[1]["veccard"][i] > SkillEnum.VCARD_START) {
						this.kapianArr.push(this.shouhuoObj[1]["veccard"][i]);
					}
				}
			}
			else if (10 < level && level <= 20) {
				this._viewUI.kapianName_lab.text = this.shouhuoObj[2]["desc"];
				this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[2]["costitem"]]["icon"] + ".png";
				this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[2]["costitem"]]["name"];
				this.shouhuoId = this.shouhuoObj[2]["id"];
				this.kapianArr.length = 0;
				for (var i: number = 0; i < this.shouhuoObj[2]["veccard"].length; i++) {
					if (this.shouhuoObj[2]["veccard"][i] > SkillEnum.VCARD_START) {
						this.kapianArr.push(this.shouhuoObj[2]["veccard"][i]);
					}
				}
			}
			else if (20 < level && level <= 30) {
				this._viewUI.kapianName_lab.text = this.shouhuoObj[3]["desc"];
				this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[3]["costitem"]]["icon"] + ".png";
				this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[3]["costitem"]]["name"];
				this.shouhuoId = this.shouhuoObj[3]["id"];
				this.kapianArr.length = 0;
				for (var i: number = 0; i < this.shouhuoObj[3]["veccard"].length; i++) {
					if (this.shouhuoObj[3]["veccard"][i] > SkillEnum.VCARD_START) {
						this.kapianArr.push(this.shouhuoObj[3]["veccard"][i]);
					}
				}
			}
			else if (30 < level && level <= 40) {
				this._viewUI.kapianName_lab.text = this.shouhuoObj[4]["desc"];
				this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[4]["costitem"]]["icon"] + ".png";
				this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[4]["costitem"]]["name"];
				this.shouhuoId = this.shouhuoObj[4]["id"];
				this.kapianArr.length = 0;
				for (var i: number = 0; i < this.shouhuoObj[4]["veccard"].length; i++) {
					if (this.shouhuoObj[4]["veccard"][i] > SkillEnum.VCARD_START) {
						this.kapianArr.push(this.shouhuoObj[4]["veccard"][i]);
					}
				}
			}
			else if (40 < level && level <= 50) {
				this._viewUI.kapianName_lab.text = this.shouhuoObj[5]["desc"];
				this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[5]["costitem"]]["icon"] + ".png";
				this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[5]["costitem"]]["name"];
				this.shouhuoId = this.shouhuoObj[5]["id"];
				this.kapianArr.length = 0;
				for (var i: number = 0; i < this.shouhuoObj[5]["veccard"].length; i++) {
					if (this.shouhuoObj[5]["veccard"][i] > SkillEnum.VCARD_START) {
						this.kapianArr.push(this.shouhuoObj[5]["veccard"][i]);
					}
				}
			}
			else if (50 < level && level <= 60) {
				this._viewUI.kapianName_lab.text = this.shouhuoObj[6]["desc"];
				this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[6]["costitem"]]["icon"] + ".png";
				this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[6]["costitem"]]["name"];
				this.shouhuoId = this.shouhuoObj[6]["id"];
				this.kapianArr.length = 0;
				for (var i: number = 0; i < this.shouhuoObj[6]["veccard"].length; i++) {
					if (this.shouhuoObj[6]["veccard"][i] > SkillEnum.VCARD_START) {
						this.kapianArr.push(this.shouhuoObj[6]["veccard"][i]);
					}
				}
			}
			else if (60 < level && level <= 70) {
				this._viewUI.kapianName_lab.text = this.shouhuoObj[7]["desc"];
				this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[7]["costitem"]]["icon"] + ".png";
				this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[7]["costitem"]]["name"];
				this.shouhuoId = this.shouhuoObj[7]["id"];
				this.kapianArr.length = 0;
				for (var i: number = 0; i < this.shouhuoObj[7]["veccard"].length; i++) {
					if (this.shouhuoObj[7]["veccard"][i] > SkillEnum.VCARD_START) {
						this.kapianArr.push(this.shouhuoObj[7]["veccard"][i]);
					}
				}
			}
			else if (70 < level && level <= 80) {
				this._viewUI.kapianName_lab.text = this.shouhuoObj[8]["desc"];
				this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[8]["costitem"]]["icon"] + ".png";
				this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[8]["costitem"]]["name"];
				this.shouhuoId = this.shouhuoObj[8]["id"];
				this.kapianArr.length = 0;
				for (var i: number = 0; i < this.shouhuoObj[8]["veccard"].length; i++) {
					if (this.shouhuoObj[8]["veccard"][i] > SkillEnum.VCARD_START) {
						this.kapianArr.push(this.shouhuoObj[8]["veccard"][i]);
					}
				}
			}
			else if (80 < level && level <= 100) {
				this._viewUI.kapianName_lab.text = this.shouhuoObj[9]["desc"];
				this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[9]["costitem"]]["icon"] + ".png";
				this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[9]["costitem"]]["name"];
				this.shouhuoId = this.shouhuoObj[9]["id"];
				this.kapianArr.length = 0;
				for (var i: number = 0; i < this.shouhuoObj[9]["veccard"].length; i++) {
					if (this.shouhuoObj[9]["veccard"][i] > SkillEnum.VCARD_START) {
						this.kapianArr.push(this.shouhuoObj[9]["veccard"][i]);
					}
				}
			}
			//需要初始化所需道具的数量并变色
			this._viewUI.needNum_lab.text = (BagModel.getInstance().chargeItemNum(this.shouhuoObj[this.shouhuoId]["costitem"])).toString();
			if (parseInt(this._viewUI.needNum_lab.text) == 0) {
				this._viewUI.needNum_lab.color = models.SkillModel.chineseStr.red;
				this._viewUI.costItemNum_lab.color = models.SkillModel.chineseStr.red;
			} else {
				this._viewUI.needNum_lab.color = models.SkillModel.chineseStr.brown;
				this._viewUI.costItemNum_lab.color = models.SkillModel.chineseStr.brown;
			}
		}
		/**处理技能列表点击 */
		public onSelect(index: number): void {
			this.selectNum = index;
			var nameLab: Laya.Label = this._viewUI.skill_list.getCell(index).getChildByName("name_lab") as Laya.Label;
			var levelLab: Laya.Label = this._viewUI.skill_list.getCell(index).getChildByName("level_lab") as Laya.Label;
			var jinengBtn: Laya.Button = this._viewUI.skill_list.getCell(index).getChildByName("jineng_btn") as Laya.Button;
			//点击更换按钮图片
			jinengBtn.skin = "common/ui/tongyong/common_list_3textbg_dwn.png";
			this._viewUI.titleName_lab.text = nameLab.text;
			this._viewUI.titleLevel_lab.text = levelLab.text;
			this._viewUI.xuQiu_lab.text = this.costObj[parseInt(levelLab.text) + 1]["silverCostList"][this.skillArr[index]["studyCostRule"] - 1];//升级银两费用
			this._viewUI.xuQIu2_lab.text = this.costObj[parseInt(levelLab.text) + 1]["guildContributeCostList"][this.skillArr[index]["studyCostRule"] - 1];//升级帮贡费用
			//根据升级费用改变颜色
			if (parseInt(this._viewUI.xuQiu_lab.text) > parseInt(this._viewUI.yongYou1_lab.text)) {
				this._viewUI.xuQiu_lab.color = models.SkillModel.chineseStr.red;//更换需要银币的字体颜色
			} else
				this._viewUI.xuQiu_lab.color = models.SkillModel.chineseStr.green;
			if (parseInt(this._viewUI.xuQIu2_lab.text) > parseInt(this._viewUI.yongYou2_lab.text)) {
				this._viewUI.xuQIu2_lab.color = models.SkillModel.chineseStr.red;//更换需要帮贡的字体颜色
			} else
				this._viewUI.xuQIu2_lab.color = models.SkillModel.chineseStr.green;
			switch (index) {
				case 0:
				case 1:
					this._viewUI.beiDong_box.visible = true;
					this._viewUI.pengRen_box.visible = false;
					this._viewUI.lianJin_box.visible = false;
					this._viewUI.duanZao_box.visible = false;
					this._viewUI.shouhuo_box.visible = false;
					this._viewUI.huoli_box.visible = false;
					this._viewUI.description_tet.text = this.skillArr[index]["description"];//描述
					this._viewUI.upgradeDesc1_lab.text = this.skillArr[index]["upgradeDesc"];//效果
					this._viewUI.upgradeDesc2_lab.text = this.skillArr[index]["upgradeDesc"];
					this._viewUI.beiDongTouXiang_img.skin = this.skillImgArr[index].img;
					this._viewUI.nowLife_lab.text = (parseInt(levelLab.text) * SkillEnum.TEN_LEVEL).toString();//当前提升属性
					this._viewUI.nextLife_lab.text = ((parseInt(levelLab.text) + 1) * SkillEnum.TEN_LEVEL).toString();//下级提升属性
					break;
				case 2:
					this._viewUI.beiDong_box.visible = false;
					this._viewUI.pengRen_box.visible = true;
					this._viewUI.lianJin_box.visible = false;
					this._viewUI.duanZao_box.visible = false;
					this._viewUI.shouhuo_box.visible = false;
					this._viewUI.huoli_box.visible = true;
					//达到等级，按钮可以点击
					if (parseInt(levelLab.text) > 0)
						this._viewUI.pengren_btn.disabled = false;
					else
						this._viewUI.pengren_btn.disabled = true;
					this._viewUI.description_tet.text = this.skillArr[index]["description"];//描述
					this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text) + 1]["strengthCostList"][this.skillArr[index]["strengthCostRule"] - 1];//消耗活力
					this.getPengrenData();
					break;
				case 3:
					this._viewUI.beiDong_box.visible = false;
					this._viewUI.pengRen_box.visible = false;
					this._viewUI.lianJin_box.visible = true;
					this._viewUI.duanZao_box.visible = false;
					this._viewUI.shouhuo_box.visible = false;
					this._viewUI.huoli_box.visible = true;
					//达到等级，按钮可以点击
					if (parseInt(levelLab.text) > 0)
						this._viewUI.lianjin_btn.disabled = false;
					else
						this._viewUI.lianjin_btn.disabled = true;
					this._viewUI.description_tet.text = this.skillArr[index]["description"];//描述
					this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text) + 1]["strengthCostList"][this.skillArr[index]["strengthCostRule"] - 1];//消耗活力
					this.huolixiaohao = this.costObj[parseInt(levelLab.text) + 1]["strengthCostList"][this.skillArr[index]["strengthCostRule"] - 1];
					break;
				case 4:
				case 5:
				case 6:
					this._viewUI.beiDong_box.visible = false;
					this._viewUI.pengRen_box.visible = false;
					this._viewUI.lianJin_box.visible = false;
					this._viewUI.duanZao_box.visible = true;
					this._viewUI.shouhuo_box.visible = false;
					this._viewUI.huoli_box.visible = true;
					this._viewUI.description_tet.text = this.skillArr[index]["description"];//描述
					if (0 <= parseInt(levelLab.text) && parseInt(levelLab.text) < SkillEnum.TEN_LEVEL) {
						this.dazaoNum = 0;
						this._viewUI.dazao_btn.disabled = true;
					} else {
						this.dazaoNum = Math.floor(parseInt(levelLab.text) / SkillEnum.TEN_LEVEL) - 1;
						this._viewUI.dazao_btn.disabled = false;
					}

					this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text) + 1]["strengthCostList"][this.skillArr[index]["strengthCostRule"] - 1];//消耗活力
					this.getDuanzaoData();
					break;
				case 7:
					this._viewUI.beiDong_box.visible = false;
					this._viewUI.pengRen_box.visible = false;
					this._viewUI.lianJin_box.visible = false;
					this._viewUI.duanZao_box.visible = false;
					this._viewUI.shouhuo_box.visible = true;
					this._viewUI.huoli_box.visible = true;
					//达到等级，按钮可以点击
					if (parseInt(levelLab.text) >= SkillEnum.TEN_LEVEL)
						this._viewUI.shouhuo_btn.disabled = false;
					else
						this._viewUI.shouhuo_btn.disabled = true;
					this._viewUI.description_tet.text = this.skillArr[index]["description"];//描述
					this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text) + 1]["strengthCostList"][this.skillArr[index]["strengthCostRule"] - 1];//消耗活力
					this.initShouhuo(parseInt(levelLab.text));
					this.getShouhuoData();
					break;
			}

		}

		public show(): void {
			super.show();
			this.getSkillLevel();
			this.initMoney();
			//生活技能提示
			if (HudModel.getInstance().yindaoId == YinDaoEnum.LIFESKILL_TIP_YINDAO)
				this.lifeTipYindao();
		}

		/**显示提示 */
		public lifeTipYindao(): void {
			var tip = HudModel._instance.carroweffectData;
			Laya.timer.loop(SkillEnum.YINDAO_TIME, this, this.closeAni);
			this._viewUI.yindaoTip_htm.text = tip[SkillEnum.YINDAO_TIP].text;
			this._viewUI.yindaoTip_img.visible = true;
			HudModel.getInstance().yindaoId = YinDaoEnum.RESET_YINDAO;
		}
		/**关闭动画 */
		public closeAni(): void {
			Laya.timer.clear(this, this.closeAni);
			this._viewUI.yindaoTip_img.visible = false;
		}
		public hide(): void {
			super.hide();
		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}