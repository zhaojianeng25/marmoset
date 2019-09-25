/**
* name 
*/
module game.modules.skill {
	/**专精升级道具 */
	enum item {
		HONGCHENSHI = 101400,//红尘石
		SHENHUNDAN = 101401//神魂丹
	}
	export class SkillZhuanJingMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.SkillZhuanJingUI;
		/** s生活技能表*/
		private skillObj: Object;
		/**弹窗 */
		private _tipsModule: game.modules.tips.tipsModule;
		/**银币不足界面 */
		private _JinBiBuZuViewMediator: commonUI.JinBiBuZuViewMediator;
		/** 页面提示*/
		private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
		/**X修炼技能升级 */
		private costObj: Object;
		/**h幻化使用配置表 */
		private huanhuaUseObj: Object;
		/**h幻化信息配置表 */
		private huanhuaInfoObj: Object;
		/**d道具表-复合 */
		private itemObj: Object;
		/**专精技能 */
		private skillArr: Array<any>;
		/**专精技能图片 */
		private skillImgArr: Array<any>;
		/** 专精技能提升道具*/
		private itemArr: Array<any>;
		/** 背包道具*/
		private bagItemArr: Array<any>;
		/**幻化卡id */
		private huanhuauseArr: Array<number>;
		/**幻化卡使用等级 */
		private huanhuaLevelArr: Array<number>;
		/**幻化卡道具id */
		private huanhuaitemidArr: Array<number>;
		/**幻化卡图片 */
		private huanhuaimgArr: Array<any>;
		/**当前选择列表项下标 */
		private selectNum: number = 0;
		/**生活技能当前属性加成字典key:技能id,value:加成属性字典 */
		private skillEffectsDic: Laya.Dictionary;
		/**生活技能下级属性加成字典key:技能id,value:加成属性字典 */
		private skillNexteffectDic: Laya.Dictionary;
		/**生活技能经验字典key:技能id,value:经验 */
		private skillExpDic: Laya.Dictionary;
		/**生活技能当前等级字典key:技能id,value:等级 */
		private skillLevelDic: Laya.Dictionary;
		/**生活技能等级上限字典key:技能id,value:等级上限 */
		private skilllMaxLevelDic: Laya.Dictionary;
		/** 专精使用的物品id */
		public itemId: number = 0;

		constructor(uiLayer: Sprite, app?: AppBase) {
			super(uiLayer);
			this._viewUI = new ui.common.SkillZhuanJingUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = false;
			this._app = app;
			this._JinBiBuZuViewMediator = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
			this.initialize();
			this.registerEvent();
			this.eventListener();
			this.init();

		}
		/**事件监听 */
		public eventListener(): void {
			mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshCurrency_EVENT, this, this.onRefreshCurrency);
			models.SkillProxy.getInstance().on(models.SRequestParticleSkillList_EVENT, this, this.onRequestParticleSkillList);
			models.SkillProxy.getInstance().on(models.SUpdateLearnParticleSkill_EVENT, this, this.onUpdateLearnParticleSkill);
			this._viewUI.item_img.on(LEvent.CLICK, this, this.getItemTips);
		}
		/** 物品信息弹窗 */
		public getItemTips(): void {
			if (this.itemId == 0) return;
			var parame: Dictionary = new Dictionary();
			parame.set("itemId", this.itemId);
			parame.set("xpos", 195);
			parame.set("ypos", 940);
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
		}
		/**初始化 */
		public initialize(): void {
			this.skillArr = new Array<any>();
			this.skillImgArr = new Array<any>();
			this.itemArr = new Array<any>();
			this.bagItemArr = new Array<any>();
			this.huanhuauseArr = new Array<number>();
			this.huanhuaLevelArr = new Array<number>();
			this.huanhuaitemidArr = new Array<number>();
			this.huanhuaimgArr = new Array<any>();
			this.skillEffectsDic = new Laya.Dictionary();
			this.skillNexteffectDic = new Laya.Dictionary();
			this.skillExpDic = new Laya.Dictionary();
			this.skillLevelDic = new Laya.Dictionary();
			this.skilllMaxLevelDic = new Laya.Dictionary();
			this.skillObj = models.SkillModel.getInstance().CLifeSkillBinDic;
			this.costObj = models.SkillModel.getInstance().CParticeSkillLevelupBinDic;
			this.huanhuaUseObj = models.SkillModel.getInstance().CHuanhuaUseBinDic;
			this.huanhuaInfoObj = models.SkillModel.getInstance().CHuanhuaInfoBinDic;
			this.itemObj = BagModel.getInstance().itemAttrData;
			this.itemArr = [item.HONGCHENSHI, item.SHENHUNDAN];//专精道具
		}
		/**注册点击监听 */
		private registerEvent(): void {
			this._viewUI.learn_btn.on(LEvent.MOUSE_DOWN, this, this.clickLearn);
			this._viewUI.learnTen_btn.on(LEvent.MOUSE_DOWN, this, this.clickLearnTen);
			this._viewUI.useProp_btn.on(LEvent.MOUSE_DOWN, this, this.clickUseProp);
			this._viewUI.showInfor1_btn.on(LEvent.MOUSE_DOWN, this, this.showTip);
			this._viewUI.showInfor2_btn.on(LEvent.MOUSE_DOWN, this, this.showTishi);

		}
		/**显示弹窗信息 */
		public showTip(): void {
			var param: Dictionary = new Dictionary();
			param.set("title", SkillEnum.ZHUANGJING_TITLE);
			param.set("contentId", SkillEnum.ZHUANGJING_TIP);
			var clanLimit = this.clanLevelLimit();
			var roleLimit = this.roleLevelLimit();
			if (family.models.FamilyModel.getInstance().myclanInfo.length > 0)
				var historycontribution = family.models.FamilyModel.getInstance().myclanInfo[0].historycontribution;//历史贡献
			else
				historycontribution = 0;
			var contributionLimit = this.historycontributionLimit();
			var sortLimit = this.sortLimit(clanLimit, roleLimit, contributionLimit);
			var arr = [clanLimit, roleLimit, historycontribution, contributionLimit, sortLimit];
			param.set("parame", arr);
			var color = this.sortColor(clanLimit, roleLimit, contributionLimit, sortLimit);
			param.set("color", color);
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param);
		}
		/**根据几个上限大小得出颜色排序 */
		public sortColor(clanLimit: any, roleLimit: any, contributionLimit: any, sortLimit: any): any {
			var color;
			if (sortLimit == clanLimit)
				color = [models.SkillModel.chineseStr.red_two, models.SkillModel.chineseStr.green_two, models.SkillModel.chineseStr.green_two];
			else if (sortLimit == roleLimit)
				color = [models.SkillModel.chineseStr.green_two, models.SkillModel.chineseStr.red_two, models.SkillModel.chineseStr.green_two];
			else if (sortLimit == contributionLimit)
				color = [models.SkillModel.chineseStr.green_two, models.SkillModel.chineseStr.green_two, models.SkillModel.chineseStr.red_two];
			return color;
		}
		/**根据几个上限大小得出专精等级上限 */
		public sortLimit(clanLimit: any, roleLimit: any, contributionLimit: any): any {
			var sortLimit;
			sortLimit = (clanLimit > roleLimit) ? roleLimit : clanLimit;
			sortLimit = (sortLimit > contributionLimit) ? contributionLimit : sortLimit;
			return sortLimit;
		}
		/**根据历史帮贡得出专精等级上限 */
		public historycontributionLimit(): any {
			if (family.models.FamilyModel.getInstance().myclanInfo.length > 0) {
				var historycontribution = family.models.FamilyModel.getInstance().myclanInfo[0].historycontribution;//历史贡献
				var contributionLimit = Math.floor((historycontribution / 150) + 5);
				return contributionLimit;
			}
			return 5;
		}
		/**根据帮派等级得出专精等级上限 */
		public clanLevelLimit(): any {
			if (family.models.FamilyModel.getInstance().clanInfo.length > 0) {
				var clanlevel = family.models.FamilyModel.getInstance().clanInfo[0].clanlevel;//帮派等级
				var clanLimit;
				if (clanlevel == 1) {
					clanLimit = 8;
				} else if (clanlevel == 2) {
					clanLimit = 12;
				} else if (clanlevel == 3) {
					clanLimit = 16;
				} else if (clanlevel >= 4) {
					clanLimit = 20;
				}
				return clanLimit;
			}
			return 0;
		}
		/**根据玩家等级得出专精等级上限 */
		public roleLevelLimit(): any {
			var level = HudModel.getInstance().levelNum;//人物等级
			var roleLimit;
			if (level < 45)
				roleLimit = 0;
			else if (45 <= level && level < 50) {
				roleLimit = 1;
			} else if (50 <= level && level < 55) {
				roleLimit = 2;
			} else if (55 <= level && level < 60) {
				roleLimit = 4;
			} else if (60 <= level && level < 65) {
				roleLimit = 8;
			} else if (65 <= level && level < 70) {
				roleLimit = 12;
			} else if (70 <= level && level < 75) {
				roleLimit = 14;
			} else if (75 <= level && level < 80) {
				roleLimit = 16;
			} else if (80 <= level && level < 85) {
				roleLimit = 18;
			} else if (85 <= level) {
				roleLimit = 20;
			}
			return roleLimit;
		}
		/**显示弹窗信息 */
		public showTishi(): void {
			var param: Dictionary = new Dictionary();
			param.set("title", SkillEnum.SHUXING_TITLE);
			param.set("contentId", SkillEnum.SHUXING_TIP);
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param);
		}
		/**学习一次 */
		public clickLearn(): void {
			//如果银币不够
			var needMoney = SkillEnum.ZHUANGJING_YINBI;
			if (needMoney > HudModel.getInstance().sliverNum) {
				var duihuanMoney = needMoney - HudModel.getInstance().sliverNum;//需要兑换的钱
				this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI).toString(), Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI).toString());
				this._JinBiBuZuViewMediator.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
				this._JinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
			} else
				RequesterProtocols._instance.c2s_CRequestLearnParticleSkill(this.skillArr[this.selectNum]["id"], 1, 0);//请求学习修炼技能每次增加一级
		}
		/**学习十次 */
		public clickLearnTen(): void {
			//如果银币不够
			var needMoney = SkillEnum.ZHUANGJING_YINBI * SkillEnum.TEN_LEVEL;
			if (needMoney > HudModel.getInstance().sliverNum) {
				var duihuanMoney = needMoney - HudModel.getInstance().sliverNum;//需要兑换的钱
				this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI).toString(), Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI).toString());
				this._JinBiBuZuViewMediator.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
				this._JinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
			} else
				RequesterProtocols._instance.c2s_CRequestLearnParticleSkill(this.skillArr[this.selectNum]["id"], SkillEnum.TEN_LEVEL, 0);
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
		/**充值 */
		public goRecharge() {
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界
		}
		/**使用道具 需要根据经验条计算次数 */
		public clickUseProp(): void {
			var itemNum = parseInt(this._viewUI.itemNum_lab.text);//道具数量
			var level = this.skillLevelDic.get(this.skillArr[this.selectNum]["id"]);//技能等级
			var totalExp = this.costObj[level]["vecskillexp"][this.selectNum];//当前等级总经验
			var nowExp = this.skillExpDic.get(this.skillArr[this.selectNum]["id"]);//当前经验
			var needExp = totalExp - nowExp;//升级所需经验
			var needNum = needExp / 10;//升级所需道具数目
			if (itemNum > 0) {
				//如果道具数量大于升级所需数量
				if (itemNum > needNum) {
					if (this.selectNum < 4)
						RequesterProtocols._instance.c2s_CRequestLearnParticleSkill(this.skillArr[this.selectNum]["id"], needNum, this.itemArr[0]);
					else
						RequesterProtocols._instance.c2s_CRequestLearnParticleSkill(this.skillArr[this.selectNum]["id"], needNum, this.itemArr[1]);
				} else {
					if (this.selectNum < 4)
						RequesterProtocols._instance.c2s_CRequestLearnParticleSkill(this.skillArr[this.selectNum]["id"], itemNum, this.itemArr[0]);
					else
						RequesterProtocols._instance.c2s_CRequestLearnParticleSkill(this.skillArr[this.selectNum]["id"], itemNum, this.itemArr[1]);
				}
				this.onSelect(this.selectNum);
			}

		}

		/**刷新银币 */
		public onRefreshCurrency(e: any): void {
			this._viewUI.yongYouShuLiang_lab.text = HudModel.getInstance().sliverNum.toString();//银币
			//根据升级费用改变颜色
			if (parseInt(this._viewUI.yiCiXuYao_lab.text) > parseInt(this._viewUI.yongYouShuLiang_lab.text)) {
				this._viewUI.yiCiXuYao_lab.color = models.SkillModel.chineseStr.red;//更换需要银币的字体颜色
			} else
				this._viewUI.yiCiXuYao_lab.color = models.SkillModel.chineseStr.green;
		}
		/**返回已经学习的所有修炼技能 */
		public onRequestParticleSkillList(e: any): void {
			var data: hanlder.S2C_request_particleskilllist = models.SkillModel.getInstance().SRequestParticleSkillListData.get("data");
			//当前属性加成数组
			for (var i: number = 0; i < data.skilllist.length; i++) {
				var effectDic: Laya.Dictionary = new Laya.Dictionary();//当前属性加成字典key:属性加成字段，value:加成值
				var nexteffectDic: Laya.Dictionary = new Laya.Dictionary();//下级属性加成字典key:属性加成字段，value:加成值
				effectDic.clear();
				nexteffectDic.clear();
				//设置属性加成字典
				for (var j: number = 0; j < this.skillArr.length; j++) {
					if (this.skillArr[j]["id"] == data.skilllist[i]["id"]) {
						//如果s生活技能表中该专精技能的第一个属性加成字段不为空
						if (this.skillArr[j]["curid1"] != "") {
							//如果服务器返回的当前属性加成字典的长度大于等于1，赋给第一个属性加成字段,长度为0，说明值为0
							if (data.skilllist[i].effects.keys.length >= 1)
								effectDic.set(this.skillArr[j]["curid1"], data.skilllist[i].effects.get(this.skillArr[j]["curid1"]));
							else
								effectDic.set(this.skillArr[j]["curid1"], 0);
							//如果服务器返回的下级属性加成字典的长度大于等于1，赋给第一个属性加成字段,长度为0，说明值为0
							if (data.skilllist[i].nexteffect.keys.length >= 1)
								nexteffectDic.set(this.skillArr[j]["curid1"], data.skilllist[i].nexteffect.get(this.skillArr[j]["curid1"]));
							else
								nexteffectDic.set(this.skillArr[j]["curid1"], 0);
						}
						//如果s生活技能表中该专精技能的第二个属性加成字段不为空
						if (this.skillArr[j]["curid2"] != "") {
							//如果服务器返回的当前属性加成字典的长度大于等于2，赋给第二个属性加成字段,长度为0，说明值为0
							if (data.skilllist[i].effects.keys.length >= 2)
								effectDic.set(this.skillArr[j]["curid2"], data.skilllist[i].effects.get(this.skillArr[j]["curid2"]));
							else
								effectDic.set(this.skillArr[j]["curid2"], 0);
							//如果服务器返回的下级属性加成字典的长度大于等于2，赋给第二个属性加成字段,长度为0，说明值为0
							if (data.skilllist[i].nexteffect.keys.length >= 2)
								nexteffectDic.set(this.skillArr[j]["curid2"], data.skilllist[i].nexteffect.get(this.skillArr[j]["curid2"]));
							else
								nexteffectDic.set(this.skillArr[j]["curid2"], 0);
						}
						//如果s生活技能表中该专精技能的第三个属性加成字段不为空
						if (this.skillArr[j]["curid3"] != "") {
							//如果服务器返回的当前属性加成字典的长度大于等于3，赋给第三个属性加成字段,长度为0，说明值为0
							if (data.skilllist[i].effects.keys.length >= 3)
								effectDic.set(this.skillArr[j]["curid3"], data.skilllist[i].effects.get(this.skillArr[j]["curid3"]));
							else
								effectDic.set(this.skillArr[j]["curid3"], 0);
							//如果服务器返回的下级属性加成字典的长度大于等于3，赋给第三个属性加成字段,长度为0，说明值为0
							if (data.skilllist[i].nexteffect.keys.length >= 3)
								nexteffectDic.set(this.skillArr[j]["curid3"], data.skilllist[i].nexteffect.get(this.skillArr[j]["curid3"]));
							else
								nexteffectDic.set(this.skillArr[j]["curid3"], 0);
						}
						//如果s生活技能表中该专精技能的第四个属性加成字段不为空
						if (this.skillArr[j]["curid4"] != "") {
							//如果服务器返回的当前属性加成字典的长度大于等于4，赋给第四个属性加成字段,长度为0，说明值为0
							if (data.skilllist[i].effects.keys.length >= 4)
								effectDic.set(this.skillArr[j]["curid4"], data.skilllist[i].effects.get(this.skillArr[j]["curid4"]));
							else
								effectDic.set(this.skillArr[j]["curid4"], 0);
							//如果服务器返回的下级属性加成字典的长度大于等于4，赋给第四个属性加成字段,长度为0，说明值为0
							if (data.skilllist[i].nexteffect.keys.length >= 4)
								nexteffectDic.set(this.skillArr[j]["curid4"], data.skilllist[i].nexteffect.get(this.skillArr[j]["curid4"]));
							else
								nexteffectDic.set(this.skillArr[j]["curid4"], 0);
						}
						this.skillEffectsDic.set(data.skilllist[i]["id"], effectDic);
						this.skillNexteffectDic.set(data.skilllist[i]["id"], nexteffectDic);
						this.skillExpDic.set(data.skilllist[i]["id"], data.skilllist[i]["exp"]);
						this.skillLevelDic.set(data.skilllist[i]["id"], data.skilllist[i]["level"]);
						this.skilllMaxLevelDic.set(data.skilllist[i]["id"], data.skilllist[i]["maxlevel"]);
					}
				}
			}
			this.getListData();
			this.onSelect(0);
		}

		/**如果修炼技能等级有变化会更新 */
		public onUpdateLearnParticleSkill(e: any): void {
			var data: hanlder.S2C_update_learnparticleskill = models.SkillModel.getInstance().SUpdateLearnParticleSkillData.get("data");
			//当前属性加成数组
			var effectDic: Laya.Dictionary = new Laya.Dictionary();//当前属性加成字典key:属性加成字段，value:加成值
			var nexteffectDic: Laya.Dictionary = new Laya.Dictionary();//下级属性加成字典key:属性加成字段，value:加成值
			effectDic.clear();
			nexteffectDic.clear();
			//设置属性加成字典
			for (var j: number = 0; j < this.skillArr.length; j++) {
				if (this.skillArr[j]["id"] == data.skill["id"]) {
					//如果s生活技能表中该专精技能的第一个属性加成字段不为空
					if (this.skillArr[j]["curid1"] != "") {
						//如果服务器返回的当前属性加成字典的长度大于等于1，赋给第一个属性加成字段,长度为0，说明值为0
						if (data.skill.effects.keys.length >= 1)
							effectDic.set(this.skillArr[j]["curid1"], data.skill.effects.get(this.skillArr[j]["curid1"]));
						else
							effectDic.set(this.skillArr[j]["curid1"], 0);
						//如果服务器返回的下级属性加成字典的长度大于等于1，赋给第一个属性加成字段,长度为0，说明值为0
						if (data.skill.nexteffect.keys.length >= 1)
							nexteffectDic.set(this.skillArr[j]["curid1"], data.skill.nexteffect.get(this.skillArr[j]["curid1"]));
						else
							nexteffectDic.set(this.skillArr[j]["curid1"], 0);
					}
					//如果s生活技能表中该专精技能的第二个属性加成字段不为空
					if (this.skillArr[j]["curid2"] != "") {
						//如果服务器返回的当前属性加成字典的长度大于等于2，赋给第二个属性加成字段,长度为0，说明值为0
						if (data.skill.effects.keys.length >= 2)
							effectDic.set(this.skillArr[j]["curid2"], data.skill.effects.get(this.skillArr[j]["curid2"]));
						else
							effectDic.set(this.skillArr[j]["curid2"], 0);
						//如果服务器返回的下级属性加成字典的长度大于等于2，赋给第二个属性加成字段,长度为0，说明值为0
						if (data.skill.nexteffect.keys.length >= 2)
							nexteffectDic.set(this.skillArr[j]["curid2"], data.skill.nexteffect.get(this.skillArr[j]["curid2"]));
						else
							nexteffectDic.set(this.skillArr[j]["curid2"], 0);
					}
					//如果s生活技能表中该专精技能的第三个属性加成字段不为空
					if (this.skillArr[j]["curid3"] != "") {
						//如果服务器返回的当前属性加成字典的长度大于等于3，赋给第三个属性加成字段,长度为0，说明值为0
						if (data.skill.effects.keys.length >= 3)
							effectDic.set(this.skillArr[j]["curid3"], data.skill.effects.get(this.skillArr[j]["curid3"]));
						else
							effectDic.set(this.skillArr[j]["curid3"], 0);
						//如果服务器返回的下级属性加成字典的长度大于等于3，赋给第三个属性加成字段,长度为0，说明值为0
						if (data.skill.nexteffect.keys.length >= 3)
							nexteffectDic.set(this.skillArr[j]["curid3"], data.skill.nexteffect.get(this.skillArr[j]["curid3"]));
						else
							nexteffectDic.set(this.skillArr[j]["curid3"], 0);
					}
					//如果s生活技能表中该专精技能的第四个属性加成字段不为空
					if (this.skillArr[j]["curid4"] != "") {
						//如果服务器返回的当前属性加成字典的长度大于等于4，赋给第四个属性加成字段,长度为0，说明值为0
						if (data.skill.effects.keys.length >= 4)
							effectDic.set(this.skillArr[j]["curid4"], data.skill.effects.get(this.skillArr[j]["curid4"]));
						else
							effectDic.set(this.skillArr[j]["curid4"], 0);
						//如果服务器返回的下级属性加成字典的长度大于等于4，赋给第四个属性加成字段,长度为0，说明值为0
						if (data.skill.nexteffect.keys.length >= 4)
							nexteffectDic.set(this.skillArr[j]["curid4"], data.skill.nexteffect.get(this.skillArr[j]["curid4"]));
						else
							nexteffectDic.set(this.skillArr[j]["curid4"], 0);
					}
					this.skillEffectsDic.set(data.skill["id"], effectDic);
					this.skillNexteffectDic.set(data.skill["id"], nexteffectDic);
					this.skillExpDic.set(data.skill["id"], data.skill["exp"]);
					this.skillLevelDic.set(data.skill["id"], data.skill["level"]);
					this.skilllMaxLevelDic.set(data.skill["id"], data.skill["maxlevel"]);
				}
			}
			this.onSelect(this.selectNum);
			var spetciallLevel = this.skillLevelDic.get(data.skill["id"]);
			var spetciallName = models.SkillModel.getInstance().CLifeSkillBinDic[data.skill["id"]].name;
			var spetciallSkillDate: Array<any> = [spetciallName, spetciallLevel];					// 专精学习技能的名字  专精升级完技能的等级
			this.spetciallzationSkili(spetciallSkillDate);
		}
		/***专精技能升级飘窗 */
		public spetciallzationSkili(spetciallSkillDate: Array<any>): void {
			let prompt = HudModel.getInstance().promptAssembleBack(142309, spetciallSkillDate);
			let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			disappearMsgTips.onShow(prompt);
		}
		/**初始化幻化卡 */
		public initKapian(): void {
			this.huanhuauseArr.length = 0;
			this.huanhuaLevelArr.length = 0;
			this.huanhuaitemidArr.length = 0;
			this.huanhuaimgArr.length = 0;
			for (var i: number = 1; i < SkillEnum.HUANHUA_NUM; i++) {
				//初始化可以使用的变身卡，和变身卡需要的等级
				if (this.skillArr[this.selectNum]["id"] == this.huanhuaUseObj[i]["skillid"]) {
					//如果配置表中的该字段的有值
					if (this.huanhuaUseObj[i]["cardid1"] != "") {
						this.huanhuauseArr.push(this.huanhuaUseObj[i]["cardid1"]);
						this.huanhuaLevelArr.push(this.huanhuaUseObj[i]["level"]);
					}
					//如果配置表中的该字段的有值
					if (this.huanhuaUseObj[i]["cardid2"] != "") {
						this.huanhuauseArr.push(this.huanhuaUseObj[i]["cardid2"]);
						this.huanhuaLevelArr.push(this.huanhuaUseObj[i]["level"]);
					}
					//如果配置表中的该字段的有值
					if (this.huanhuaUseObj[i]["cardid3"] != "") {
						this.huanhuauseArr.push(this.huanhuaUseObj[i]["cardid3"]);
						this.huanhuaLevelArr.push(this.huanhuaUseObj[i]["level"]);
					}
				}
			}
			for (var i: number = 0; i < this.huanhuauseArr.length; i++) {
				this.huanhuaitemidArr.push(this.huanhuaInfoObj[this.huanhuauseArr[i]]["itemid"]);
			}
			for (var i: number = 0; i < this.huanhuaitemidArr.length; i++) {
				if (this.itemObj[this.huanhuaitemidArr[i]]["icon"] > SkillEnum.KAPIAN_IMG)
					this.huanhuaimgArr.push({ img: "common/icon/avatarpartner/" + this.itemObj[this.huanhuaitemidArr[i]]["icon"] + ".png" });
				else
					this.huanhuaimgArr.push({ img: "common/icon/avatarrole/" + this.itemObj[this.huanhuaitemidArr[i]]["icon"] + ".png" });
			}
			this.getKapianListData();
		}
		/**渲染卡牌列表 */
		public getKapianListData(): void {
			this._viewUI.kapian_list.vScrollBarSkin = "";
			this._viewUI.kapian_list.scrollBar.elasticBackTime = 200;
			this._viewUI.kapian_list.scrollBar.elasticDistance = 50;
			this._viewUI.kapian_list.array = this.huanhuaimgArr;
			this._viewUI.kapian_list.renderHandler = new Handler(this, this.onKapianRender);
			this._viewUI.kapian_list.selectedIndex = 0;
		}

		public onKapianRender(cell: Laya.Box, index: number): void {
			if (index > this.huanhuaimgArr.length) return;
			var levelLab: Laya.Label = cell.getChildByName("level_lab") as Laya.Label;
			var tubiaoImg: Laya.Image = cell.getChildByName("kapian_img") as Laya.Image;
			levelLab.text = models.SkillModel.chineseStr.dengji + this.huanhuaLevelArr[index];
			tubiaoImg.skin = this.huanhuaimgArr[index].img;
		}
		public init(): void {
			//人物专精
			for (var i: number = SkillEnum.ROLE_ZHUANGJING_START; i < SkillEnum.ROLE_ZHUANGJING_END; i++) {
				this.skillArr.push(this.skillObj[i]);
			}
			//宠物专精
			for (var i: number = SkillEnum.PET_ZHUANGJING_START; i < SkillEnum.PET_ZHUANGJING_END; i++) {
				this.skillArr.push(this.skillObj[i]);
			}
			//变身
			for (var i: number = SkillEnum.BIANSHEN_START; i < SkillEnum.BIANSHEN_END; i++) {
				this.skillArr.push(this.skillObj[i]);
			}
			for (var i: number = 0; i < this.skillArr.length; i++) {
				this.skillImgArr.push({ img: "common/icon/skill/" + this.skillArr[i]["icon"] + ".png" });
			}
			RequesterProtocols._instance.c2s_CRequestParticleSkillList();//请求已经学习的修炼技能链表
		}
		/**初始化技能列表 */
		public getListData(): void {
			this._viewUI.skill_list.vScrollBarSkin = "";
			this._viewUI.skill_list.scrollBar.elasticBackTime = 200;
			this._viewUI.skill_list.scrollBar.elasticDistance = 50;
			this._viewUI.skill_list.array = this.skillArr;
			this._viewUI.skill_list.renderHandler = new Handler(this, this.onRender);
			this._viewUI.skill_list.selectHandler = new Handler(this, this.onSelect);
			this._viewUI.skill_list.selectedIndex = -1;
		}
		/**渲染技能列表 */
		public onRender(cell: Laya.Box, index: number): void {
			if (index > this.skillArr.length) return;
			var nameLab: Laya.Label = cell.getChildByName("name_lab") as Laya.Label;
			var tubiaoImg: Laya.Image = cell.getChildByName("touxiang_img") as Laya.Image;
			var jinengBtn: Laya.Button = cell.getChildByName("jineng_btn") as Laya.Button;
			//如果不是选中状态，改变按钮颜色
			if (index != this.selectNum) {
				jinengBtn.skin = "common/ui/tongyong/common_list_textbg2.png";
			}
			nameLab.text = this.skillArr[index]["name"];
			tubiaoImg.skin = this.skillImgArr[index].img;
		}
		/**处理技能列表点击 */
		public onSelect(index: number): void {
			if (index != -1) {
				this.selectNum = index;
				var nameLab: Laya.Label = this._viewUI.skill_list.getCell(index).getChildByName("name_lab") as Laya.Label;
				var levelLab: Laya.Label = this._viewUI.skill_list.getCell(index).getChildByName("level_lab") as Laya.Label;
				levelLab.text = this.skillLevelDic.get(this.skillArr[index]["id"]);
				this._viewUI.skillName_lab.text = nameLab.text;
				this._viewUI.wuKengShangXian_lab.text = levelLab.text;//当前等级
				this._viewUI.dengJiShangXian_lab.text = this.skilllMaxLevelDic.get(this.skillArr[index]["id"]);//等级上限
				this._viewUI.skill_img.skin = this.skillImgArr[index].img;
				this._viewUI.ratio_lab.text = this.skillExpDic.get(this.skillArr[index]["id"]) + "/" + this.costObj[parseInt(levelLab.text)]["vecskillexp"][index];//经验
				var jinengBtn: Laya.Button = this._viewUI.skill_list.getCell(index).getChildByName("jineng_btn") as Laya.Button;
				//根据升级费用改变颜色
				if (parseInt(this._viewUI.yiCiXuYao_lab.text) > parseInt(this._viewUI.yongYouShuLiang_lab.text)) {
					this._viewUI.yiCiXuYao_lab.color = models.SkillModel.chineseStr.red;//更换需要银币的字体颜色
				} else
					this._viewUI.yiCiXuYao_lab.color = models.SkillModel.chineseStr.green;
				//点击更换按钮图片
				jinengBtn.skin = "common/ui/tongyong/common_list_3textbg_dwn.png";
				this._viewUI.decription_lab.text = this.skillArr[index]["description"];
				this._viewUI.shuxingName1_lab.text = this.skillArr[index]["cureffect1"];
				this._viewUI.shuxingName2_lab.text = this.skillArr[index]["cureffect2"];
				this._viewUI.shuxingName3_lab.text = this.skillArr[index]["cureffect3"];
				this._viewUI.shuxingName4_lab.text = this.skillArr[index]["cureffect4"];
				//属性面板
				var effectDic: Laya.Dictionary = new Laya.Dictionary();//当前属性加成字典key:属性加成字段，value:加成值
				var nexteffectDic: Laya.Dictionary = new Laya.Dictionary();//下级属性加成字典key:属性加成字段，value:加成值
				effectDic.clear();
				nexteffectDic.clear();

				effectDic = this.skillEffectsDic.get(this.skillArr[index]["id"]);
				nexteffectDic = this.skillNexteffectDic.get(this.skillArr[index]["id"]);

				if (this._viewUI.shuxingName1_lab.text == "")
					this._viewUI.shuxing1_box.visible = false;
				else {
					this._viewUI.shuxing1_box.visible = true;
					this._viewUI.effect1_lab.text = effectDic.get(this.skillArr[index]["curid1"]);
					this._viewUI.nextEffect1_lab.text = nexteffectDic.get(this.skillArr[index]["curid1"]);
				}
				if (this._viewUI.shuxingName2_lab.text == "")
					this._viewUI.shuxing2_box.visible = false;
				else {
					this._viewUI.shuxing2_box.visible = true;
					this._viewUI.effect2_lab.text = effectDic.get(this.skillArr[index]["curid2"]);
					this._viewUI.nextEffect2_lab.text = nexteffectDic.get(this.skillArr[index]["curid2"]);
				}
				if (this._viewUI.shuxingName3_lab.text == "")
					this._viewUI.shuxing3_box.visible = false;
				else {
					this._viewUI.shuxing3_box.visible = true;
					this._viewUI.effect3_lab.text = effectDic.get(this.skillArr[index]["curid3"]);
					this._viewUI.nextEffect3_lab.text = nexteffectDic.get(this.skillArr[index]["curid3"]);
				}
				if (this._viewUI.shuxingName4_lab.text == "")
					this._viewUI.shuxing4_box.visible = false;
				else {
					this._viewUI.shuxing4_box.visible = true;
					this._viewUI.effect4_lab.text = effectDic.get(this.skillArr[index]["curid4"]);
					this._viewUI.nextEffect4_lab.text = nexteffectDic.get(this.skillArr[index]["curid4"]);
				}
				//道具图片
				if (index < 4) {
					this.itemId = 101400;
					this._viewUI.item_img.visible = true;
					this._viewUI.useProp_btn.visible = true;
					this._viewUI.xiulianItem_img.skin = "common/icon/item/20060.png";
					this._viewUI.itemNum_lab.text = BagModel.getInstance().chargeItemNum(this.itemArr[0]).toString();//道具数量
				} else if (index > 3 && index < 8) {
					this.itemId = 101401;
					this._viewUI.item_img.visible = true;
					this._viewUI.useProp_btn.visible = true;
					this._viewUI.xiulianItem_img.skin = "common/icon/item/20061.png";
					this._viewUI.itemNum_lab.text = BagModel.getInstance().chargeItemNum(this.itemArr[1]).toString();//道具数量
				} else {
					this.itemId = 0;
					this._viewUI.useProp_btn.visible = false;
					this._viewUI.item_img.visible = false;
				}

				if (index < 8) {
					this._viewUI.kapian_box.visible = false;
					this._viewUI.shuxing_box.visible = true;
				} else {
					this._viewUI.kapian_box.visible = true;
					this._viewUI.shuxing_box.visible = false;
					this.initKapian();
				}
				this._viewUI.skill_list.selectedIndex = -1;
			}

		}

		public show(): void {
			super.show();
			this._viewUI.yongYouShuLiang_lab.text = HudModel.getInstance().sliverNum.toString();//银币
			//这里需要调用服务端数据的时候不能做数据的刷新 需要等待数据下发才能做刷新

		}

		public hide(): void {
			super.hide();

		}

		public getView(): Sprite {
			return this._viewUI;
		}

	}
}