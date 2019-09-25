/**
* 战斗技能类
*/
module game.modules.skill {

	export class SkillStudyMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.SkillStudyUI;
		/**银币不足界面 */
		private _JinBiBuZuViewMediator: commonUI.JinBiBuZuViewMediator;
		/** 飘窗提示*/
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		/** 页面提示*/
		private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
		/**j技能显示表 */
		private skillObj: Object;
		/**技能格消耗表 */
		private costObj: Object;
		/**技能格信息表 */
		private skillGridObj: Object;
		/**当前选则列表项下标 */
		private selectNum: number = 0;
		/**战斗技能 */
		private skillArr: Array<any>;
		/**战斗技能图片 */
		private skillImgArr: Array<any>;
		/**技能格*/
		private skillGridArr: Array<number>;
		/**每个技能对应的升级消耗字典key:列表下标，value:升级消耗 */
		private skillCostDic: Laya.Dictionary;
		/**技能等级字典key:列表下标，value:技能等级  */
		private skillLevelDic: Laya.Dictionary;
		constructor(uiLayer: Sprite, app?: AppBase) {
			super(uiLayer);
			this._viewUI = new ui.common.SkillStudyUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = false;
			this._app = app;
			this._JinBiBuZuViewMediator = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
			this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			this.initialize();
			this.init();
			this.initLevel();
			this.registerEvent();
			this.eventListener();
		}
		/**初始化 */
		public initialize(): void {
			this.skillArr = new Array<any>();
			this.skillImgArr = new Array<any>();
			this.skillGridArr = new Array<number>();
			this.skillCostDic = new Laya.Dictionary();
			this.skillLevelDic = new Laya.Dictionary();
			this.skillObj = models.SkillModel.getInstance().CSchoolSkillitemBinDic;
			this.costObj = models.SkillModel.getInstance().AcupointLevelUpBinDic;
			this.skillGridObj = models.SkillModel.getInstance().AcupointInfoBinDic;
		}
		public show(): void {
			super.show();
			this.getListData();
			this.onSelect(0);
			this.initDandu();
		}


		/**事件监听 */
		public eventListener(): void {
			mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshCurrency_EVENT, this, this.onRefreshCurrency);
			models.SkillProxy.getInstance().on(models.SUpdateInborn_EVENT, this, this.onUpdateInborn);
		}
		/**技能升级刷新 */
		public onUpdateInborn(e: any): void {
			var data: hanlder.S2C_update_inborn = models.SkillModel.getInstance().SUpdateInbornData.get("data");
			var combatSkillLevel = data.inborns.get(this.skillGridArr[this.selectNum]["id"]);
			var combatSkillDate: Array<any> = [this.skillGridArr[this.selectNum]['name'], combatSkillLevel];
			//0：技能升级，1：一键升级
			switch (data.flag) {
				case 0:
					if (this.selectNum < 6) {
						var levelLab: Laya.Label = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab") as Laya.Label;
						levelLab.text = data.inborns.get(this.skillGridArr[this.selectNum]["id"]);//刷新等级
					}
					var unlockLevel: Laya.Label = this._viewUI.skill_list.getCell(0).getChildByName("level_lab") as Laya.Label;
					//前6个技能是放在列表中，使用循环完成刷新
					for (var i: number = 0; i < 6; i++) {
						var levelLab: Laya.Label = this._viewUI.skill_list.getCell(i).getChildByName("level_lab") as Laya.Label;
						var unlockLevellab: Laya.Label = this._viewUI.skill_list.getCell(i).getChildByName("unlockLevel_lab") as Laya.Label;
						//符合等级的技能解锁
						if (levelLab.text == "") {
							//从第4个技能开始，解锁等级公式： （技能列表下标-2）*10
							if (parseInt(unlockLevel.text) == (i - 2) * SkillEnum.TEN_LEVEL) {
								levelLab.text = 0 + "";//刷新等级
								unlockLevellab.text = models.SkillModel.chineseStr.dengji;
							}
						}
						if (levelLab.text != "") {
							var levelNum = parseInt(levelLab.text);
							var cost = this.costObj[levelNum + 1]["moneyCostRule"][0];//升级费用
							this.skillCostDic.set(i, cost);
							this.skillLevelDic.set(i, levelNum);
						} else {
							this.skillCostDic.set(i, -1);
							this.skillLevelDic.set(i, -1);
						}

					}
					//附魔技能升级
					if (data.inborns.get(this.skillGridArr[6]["id"]) != null) {
						this._viewUI.level7_lab.text = data.inborns.get(this.skillGridArr[6]["id"]);
						this._viewUI.unlockLevel7_lab.text = models.SkillModel.chineseStr.dengji;
						if (this._viewUI.jineng7_use_btn.disabled)
							this._viewUI.jineng7_use_btn.disabled = false;
						this.clickJineng7();
					} else {
						var unlockLevelLab: Laya.Label = this._viewUI.skill_list.getCell(0).getChildByName("level_lab") as Laya.Label;
						//达到等级解锁
						if (parseInt(unlockLevelLab.text) == SkillEnum.UNLOCK_FUMO) {
							this._viewUI.level7_lab.text = 0 + "";//刷新等级
							this._viewUI.unlockLevel7_lab.text = models.SkillModel.chineseStr.dengji;
						}
						// } else {
						// 	// this._viewUI.level7_lab.text = "";//刷新等级
						// 	// this._viewUI.unlockLevel7_lab.text = models.SkillModel.chineseStr.forty_jiesuo;
						// }
					}
					if (this._viewUI.level7_lab.text != "") {
						var levelNum = parseInt(this._viewUI.level7_lab.text);
						var cost = this.costObj[levelNum + 1]["moneyCostRule"][0];//升级费用
						this.skillCostDic.set(6, cost);
						this.skillLevelDic.set(6, levelNum);
					} else {
						this.skillCostDic.set(6, -1);
						this.skillLevelDic.set(6, -1);
					}
					//绝技升级
					if (data.inborns.get(this.skillGridArr[7]["id"]) != null) {
						this._viewUI.unlockLevel8_lab.text = models.SkillModel.chineseStr.dengji;
						this._viewUI.level8_lab.text = data.inborns.get(this.skillGridArr[7]["id"]);
					} else {
						// this._viewUI.level8_lab.text = "";
						// this._viewUI.unlockLevel8_lab.text = models.SkillModel.chineseStr.fifty_jiesuo;
					}
					if (this.selectNum < 6)
						this.onSelect(this.selectNum);
					break;
				case 1:
					for (var j: number = 0; j < 6; j++) {
						var levelLab: Laya.Label = this._viewUI.skill_list.getCell(j).getChildByName("level_lab") as Laya.Label;
						var unlockLevellab: Laya.Label = this._viewUI.skill_list.getCell(j).getChildByName("unlockLevel_lab") as Laya.Label;
						if (data.inborns.get(this.skillGridArr[j]["id"]) != null) {
							levelLab.text = data.inborns.get(this.skillGridArr[j]["id"]);//刷新等级
							unlockLevellab.text = models.SkillModel.chineseStr.dengji;
						} else {
							var unlockLevel: Laya.Label = this._viewUI.skill_list.getCell(0).getChildByName("level_lab") as Laya.Label;//第一个技能的等级
							//从第4个技能开始，解锁等级公式：（技能列表下标-2）*10
							if (j > 2 && levelLab.text == "") {
								if (parseInt(unlockLevel.text) == (j - 2) * SkillEnum.TEN_LEVEL) {
									levelLab.text = 0 + "";//刷新等级
									unlockLevellab.text = models.SkillModel.chineseStr.dengji;
								} else {
									levelLab.text = "";//刷新等级
									unlockLevellab.text = (j - 2) * SkillEnum.TEN_LEVEL + models.SkillModel.chineseStr.level_jiesuo;
								}
							}

						}
						if (levelLab.text != "") {
							var levelNum = parseInt(levelLab.text);
							var cost = this.costObj[levelNum + 1]["moneyCostRule"][0];//升级费用
							this.skillCostDic.set(j, cost);
							this.skillLevelDic.set(j, levelNum);
						} else {
							this.skillCostDic.set(j, -1);
							this.skillLevelDic.set(j, -1);
						}
					}
					//附魔技能升级
					if (data.inborns.get(this.skillGridArr[6]["id"]) != null) {
						this._viewUI.level7_lab.text = data.inborns.get(this.skillGridArr[6]["id"]);
						this._viewUI.unlockLevel7_lab.text = models.SkillModel.chineseStr.dengji;
						if (this._viewUI.jineng7_use_btn.disabled)
							this._viewUI.jineng7_use_btn.disabled = false;
					} else {
						var unlockLevelLab: Laya.Label = this._viewUI.skill_list.getCell(0).getChildByName("level_lab") as Laya.Label;//第一个技能的等级
						//达到解锁等级解锁
						if (parseInt(unlockLevelLab.text) == SkillEnum.UNLOCK_FUMO) {
							this._viewUI.level7_lab.text = 0 + "";//刷新等级
							this._viewUI.unlockLevel7_lab.text = models.SkillModel.chineseStr.dengji;
						} else {
							// this._viewUI.level7_lab.text = "";//刷新等级
							// this._viewUI.unlockLevel7_lab.text = models.SkillModel.chineseStr.forty_jiesuo;
						}
					}
					if (this._viewUI.level7_lab.text != "") {
						var levelNum = parseInt(this._viewUI.level7_lab.text);
						var cost = this.costObj[levelNum + 1]["moneyCostRule"][0];//升级费用
						this.skillCostDic.set(6, cost);
						this.skillLevelDic.set(6, levelNum);
					} else {
						this.skillCostDic.set(6, -1);
						this.skillLevelDic.set(6, -1);
					}
					//绝技升级
					if (data.inborns.get(this.skillGridArr[7]["id"]) != null) {
						this._viewUI.unlockLevel8_lab.text = models.SkillModel.chineseStr.dengji;
						this._viewUI.level8_lab.text = data.inborns.get(this.skillGridArr[7]["id"]);
					} else {
						// this._viewUI.level8_lab.text = "";
						// this._viewUI.unlockLevel8_lab.text = models.SkillModel.chineseStr.fifty_jiesuo;
					}
					if (this.selectNum < 6)
						this.onSelect(this.selectNum);
					else
						this.clickJineng7();
					break;
			}
			this.combatSkillbay(combatSkillDate);
		}
		/**战斗技能升级飘窗 */
		public combatSkillbay(combatSkillDate: Array<any>): void {
			let prompt = HudModel.getInstance().promptAssembleBack(142309, combatSkillDate);
			let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			disappearMsgTips.onShow(prompt);
		}
		/**初始化技能等级 */
		public initLevel(): void {
			var data: hanlder.S2C_send_inborns = createrole.models.LoginModel.getInstance().SSendInbornsData.get("data");//接受技能等级信息
			for (var j: number = 0; j < 6; j++) {
				var levelLab: Laya.Label = this._viewUI.skill_list.getCell(j).getChildByName("level_lab") as Laya.Label;
				var unlockLevellab: Laya.Label = this._viewUI.skill_list.getCell(j).getChildByName("unlockLevel_lab") as Laya.Label;
				if (data.inborns.get(this.skillGridArr[j]["id"]) != null) {
					levelLab.text = data.inborns.get(this.skillGridArr[j]["id"]);//刷新等级
					unlockLevellab.text = models.SkillModel.chineseStr.dengji;
				} else {
					var unlockLevel: Laya.Label = this._viewUI.skill_list.getCell(0).getChildByName("level_lab") as Laya.Label;//第一个技能的等级
					//从第4个技能开始，解锁等级公式：（技能列表下标-2）*10
					if (parseInt(unlockLevel.text) == (j - 2) * SkillEnum.TEN_LEVEL) {
						levelLab.text = 0 + "";//刷新等级
						unlockLevellab.text = models.SkillModel.chineseStr.dengji;
					} else {
						levelLab.text = "";//刷新等级
						unlockLevellab.text = (j - 2) * SkillEnum.TEN_LEVEL + models.SkillModel.chineseStr.level_jiesuo;
					}
				}
				if (levelLab.text != "") {
					var levelNum = parseInt(levelLab.text);
					var cost = this.costObj[levelNum + 1]["moneyCostRule"][0];//升级费用
					this.skillCostDic.set(j, cost);
					this.skillLevelDic.set(j, levelNum);
				} else {
					this.skillCostDic.set(j, -1);
					this.skillLevelDic.set(j, -1);
				}
			}
			//附魔技能初始化
			if (data.inborns.get(this.skillGridArr[6]["id"]) != null) {
				this._viewUI.level7_lab.text = data.inborns.get(this.skillGridArr[6]["id"]);
				this._viewUI.unlockLevel7_lab.text = models.SkillModel.chineseStr.dengji;
			} else {
				var unlockLevelLab: Laya.Label = this._viewUI.skill_list.getCell(0).getChildByName("level_lab") as Laya.Label;
				if (parseInt(unlockLevelLab.text) == SkillEnum.UNLOCK_FUMO) {
					this._viewUI.level7_lab.text = 0 + "";//刷新等级
					this._viewUI.unlockLevel7_lab.text = models.SkillModel.chineseStr.dengji;
					this._viewUI.jineng7_use_btn.disabled = false;
				} else {
					this._viewUI.level7_lab.text = "";//刷新等级
					this._viewUI.unlockLevel7_lab.text = models.SkillModel.chineseStr.forty_jiesuo;
					this._viewUI.jineng7_use_btn.disabled = true;
				}
			}
			if (this._viewUI.level7_lab.text != "") {
				var levelNum = parseInt(this._viewUI.level7_lab.text);
				var cost = this.costObj[levelNum + 1]["moneyCostRule"][0];//升级费用
				this.skillCostDic.set(6, cost);
				this.skillLevelDic.set(6, levelNum);
			} else {
				this.skillCostDic.set(6, -1);
				this.skillLevelDic.set(6, -1);
			}
			//绝技初始化
			if (data.inborns.get(this.skillGridArr[7]["id"]) != null) {
				this._viewUI.unlockLevel8_lab.text = models.SkillModel.chineseStr.dengji;
				this._viewUI.level8_lab.text = data.inborns.get(this.skillGridArr[7]["id"]);
			} else {
				this._viewUI.level8_lab.text = "";
				this._viewUI.unlockLevel8_lab.text = models.SkillModel.chineseStr.fifty_jiesuo;
			}

		}
		/**初始化信息 */
		public init(): void {
			var myData = createrole.models.LoginModel.getInstance().roleDetail;
			//根据职业，初始化不同的技能列表和技能格列表
			switch (myData["school"]) {
				case zhiye.yunxiao:
					for (var i: number = SkillEnum.YUNXIAO_START; i < SkillEnum.YUNXIAO_END; i++) {
						this.skillArr.push(this.skillObj[i]);
						this.skillImgArr.push({ img: "common/icon/skill/" + this.skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = SkillEnum.YUNXIAO_GRID_START; i < SkillEnum.YUNXIAO_GRID_END; i++) {
						this.skillGridArr.push(this.skillGridObj[i]);
					}
					break;
				case zhiye.dahuang:
					for (var i: number = SkillEnum.DAHUANG_START; i < SkillEnum.DAHUANG_END; i++) {
						this.skillArr.push(this.skillObj[i]);
						this.skillImgArr.push({ img: "common/icon/skill/" + this.skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = SkillEnum.DAHUANG_GRID_START; i < SkillEnum.DAHUANG_GRID_END; i++) {
						this.skillGridArr.push(this.skillGridObj[i]);
					}
					break;
				case zhiye.cangyu:
					for (var i: number = SkillEnum.CANGYU_START; i < SkillEnum.CANGYU_END; i++) {
						this.skillArr.push(this.skillObj[i]);
						this.skillImgArr.push({ img: "common/icon/skill/" + this.skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = SkillEnum.CANGYU_GRID_START; i < SkillEnum.CANGYU_GRID_END; i++) {
						this.skillGridArr.push(this.skillGridObj[i]);
					}
					break;
				case zhiye.feixue:
					for (var i: number = SkillEnum.FEIXUE_START; i < SkillEnum.FEIXUE_END; i++) {
						this.skillArr.push(this.skillObj[i]);
						this.skillImgArr.push({ img: "common/icon/skill/" + this.skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = SkillEnum.FEIXUE_GRID_START; i < SkillEnum.FEIXUE_GRID_END; i++) {
						this.skillGridArr.push(this.skillGridObj[i]);
					}
					break;
				case zhiye.tianlei:
					for (var i: number = SkillEnum.TIANLEI_START; i < SkillEnum.TIANLEI_END; i++) {
						this.skillArr.push(this.skillObj[i]);
						this.skillImgArr.push({ img: "common/icon/skill/" + this.skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = SkillEnum.TIANLEI_GRID_START; i < SkillEnum.TIANLEI_GRID_END; i++) {
						this.skillGridArr.push(this.skillGridObj[i]);
					}
					break;
				case zhiye.wuliang:
					for (var i: number = SkillEnum.WULIANG_START; i < SkillEnum.WULIANG_END; i++) {
						this.skillArr.push(this.skillObj[i]);
						this.skillImgArr.push({ img: "common/icon/skill/" + this.skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = SkillEnum.WULIANG_GRID_START; i < SkillEnum.WULIANG_GRID_END; i++) {
						this.skillGridArr.push(this.skillGridObj[i]);
					}
					break;
				case zhiye.xuanming:
					for (var i: number = SkillEnum.XUANMING_START; i < SkillEnum.XUANMING_END; i++) {
						this.skillArr.push(this.skillObj[i]);
						this.skillImgArr.push({ img: "common/icon/skill/" + this.skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = SkillEnum.XUANMING_GRID_START; i < SkillEnum.XUANMING_GRID_END; i++) {
						this.skillGridArr.push(this.skillGridObj[i]);
					}
					break;
				case zhiye.qixing:
					for (var i: number = SkillEnum.QIXING_START; i < SkillEnum.QIXING_END; i++) {
						this.skillArr.push(this.skillObj[i]);
						this.skillImgArr.push({ img: "common/icon/skill/" + this.skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = SkillEnum.QIXING_GRID_START; i < SkillEnum.QIXING_GRID_END; i++) {
						this.skillGridArr.push(this.skillGridObj[i]);
					}
					break;
				case zhiye.danyang:
					for (var i: number = SkillEnum.DANGYANG_START; i < SkillEnum.DANGYANG_END; i++) {
						this.skillArr.push(this.skillObj[i]);
						this.skillImgArr.push({ img: "common/icon/skill/" + this.skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = SkillEnum.DANGYANG_GRID_START; i < SkillEnum.DANGYANG_GRID_END; i++) {
						this.skillGridArr.push(this.skillGridObj[i]);
					}
					break;
			}
			this._viewUI.ownNumber_lab.text = HudModel.getInstance().sliverNum.toString();//银币
		}
		/**刷新银币 */
		public onRefreshCurrency(e: any): void {
			this._viewUI.ownNumber_lab.text = HudModel.getInstance().sliverNum.toString();//银币
			if (parseInt(this._viewUI.needNumber_lab.text) > parseInt(this._viewUI.ownNumber_lab.text)) {
				this._viewUI.needNumber_lab.color = models.SkillModel.chineseStr.red;//更换需要银币的字体颜色
			} else
				this._viewUI.needNumber_lab.color = models.SkillModel.chineseStr.green;
		}
		/**注册点击监听 */
		private registerEvent(): void {
			this._viewUI.upgrade_btn.on(LEvent.MOUSE_DOWN, this, this.clickUpgrade);
			this._viewUI.upgradeAll_btn.on(LEvent.MOUSE_DOWN, this, this.clickUpgradeAll);
			this._viewUI.jineng7_btn.on(LEvent.MOUSE_DOWN, this, this.clickJineng7);
			this._viewUI.jineng8_btn.on(LEvent.MOUSE_DOWN, this, this.clickJineng8);
			this._viewUI.jineng7_use_btn.on(LEvent.MOUSE_DOWN, this, this.clickUse);
		}
		/**制作附魔道具 */
		public clickUse(): void {
			RequesterProtocols._instance.c2s_CLiveSkillMakeEnhancement();
		}
		/**升级技能 */
		public clickUpgrade(): void {
			//判断是否达到最高等级
			var key = true;
			var level = HudModel.getInstance().levelNum;
			if (parseInt(this._viewUI.titleLevel_lab.text) != level)
				key = false;
			if (key) {
				let prompt = HudModel.getInstance().promptAssembleBack(SkillEnum.MAX_FIGHT_LEVEL);
				this.tips.onShow(prompt);
				return;
			}
			//如果银币不够
			var needMoney = parseInt(this._viewUI.needNumber_lab.text);
			if (needMoney > HudModel.getInstance().sliverNum) {
				var duihuanMoney = needMoney - HudModel.getInstance().sliverNum;//需要兑换的钱
				this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI).toString(), Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI).toString());
				this._JinBiBuZuViewMediator.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
				this._JinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
			} else
				RequesterProtocols._instance.c2s_CUpdateInborn(this.skillGridArr[this.selectNum]["id"], 0);
		}
		/**一键升级 */
		public clickUpgradeAll(): void {
			var key = true;
			var level = HudModel.getInstance().levelNum;
			for (var j: number = 0; j < 6; j++) {
				//判断是否达到最高等级
				var levelLab: Laya.Label = this._viewUI.skill_list.getCell(j).getChildByName("level_lab") as Laya.Label;
				if (parseInt(levelLab.text) != level && levelLab.text != "") {
					key = false;
					break;
				}
			}
			if (parseInt(this._viewUI.level7_lab.text) != level && this._viewUI.level7_lab.text != "")
				key = false;
			if (key) {
				let prompt = HudModel.getInstance().promptAssembleBack(SkillEnum.MAX_FIGHT_LEVEL);
				this.tips.onShow(prompt);
				return;
			}
			//如果当前银币足够升某个技能等级，先升级
			for (var i: number = 0; i < this.skillCostDic.keys.length; i++) {
				if (this.skillCostDic.get(i) != -1 && HudModel.getInstance().sliverNum >= this.skillCostDic.get(i)) {
					RequesterProtocols._instance.c2s_CUpdateInborn(this.skillGridArr[i]["id"], 1);
					return;
				}
			}
			//所需银币
			var needMoney = 0;
			//升级的技能数
			var num = 0;
			//需要一键升级的技能数
			var needUpdateNum = Math.ceil(level / SkillEnum.TEN_LEVEL) + 2;
			//银币不够
			for (var i: number = 0; i < this.skillLevelDic.keys.length; i++) {
				if (this.skillLevelDic.get(i) != -1) {
					for (var j: number = this.skillLevelDic.get(i); j < level; j++) {
						needMoney += this.costObj[j + 1]["moneyCostRule"][0];
					}
					num++;
				}
			}
			//计算出总共需要的银币
			if (num < needUpdateNum) {
				for (var i: number = 2; i <= level; i++) {
					needMoney += this.costObj[i]["moneyCostRule"][0] * (needUpdateNum - num);
				}
			}
			if (needMoney > HudModel.getInstance().sliverNum) {
				var duihuanMoney = needMoney - HudModel.getInstance().sliverNum;//需要兑换的钱
				this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI).toString(), Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI).toString());
				this._JinBiBuZuViewMediator.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
				this._JinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
			} else {
				for (var i: number = 0; i < this.skillGridArr.length; i++) {
					if (this.skillGridArr[i]["isMain"] == 1) {
						RequesterProtocols._instance.c2s_CUpdateInborn(this.skillGridArr[i]["id"], 1);
					}
				}
			}
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
		public buySliverFromYuanBao(yuanbao, moduleName) {
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
		/**充值界面 */
		public goRecharge() {
			ModuleManager.hide(ModuleNames.SKILL);	 //隐藏当前界面
			LoginModel.getInstance().CommonPage = ModuleNames.SKILL;	//把当前界面的值存进去
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);	//生成充值界面
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界
		}
		/**初始化两个独立技能格 */
		public initDandu(): void {
			this._viewUI.touxiang7_img.skin = this.skillImgArr[6].img;
			this._viewUI.touxiang8_img.skin = this.skillImgArr[7].img;
			this._viewUI.name7_lab.text = this.skillArr[6]["skillname"];
			this._viewUI.name8_lab.text = this.skillArr[7]["skillname"];
		}
		/** 设置显示技能详情的面板 */
		private setSkillDetailPanel(): void {
			this._viewUI.skillDetails_panel.visible = true;
			this._viewUI.skillDetails_panel.vScrollBarSkin = "";
			this._viewUI.skillDetails_panel.vScrollBar.elasticBackTime = 200;
			this._viewUI.skillDetails_panel.vScrollBar.elasticDistance = 100;
		}
		/**点击附魔技能 */
		public clickJineng7(): void {
			this.selectNum = 6;
			this._viewUI.name_box.visible = true;
			this.setSkillDetailPanel();
			this._viewUI.update_box.visible = true;
			this._viewUI.jueji_box.visible = false;
			var tip = tips.models.TipsModel.getInstance().cstringResConfigData;//程序内字符串
			this._viewUI.jineng7_btn.skin = "common/ui/tongyong/common_list_3textbg_dwn.png";
			//改变其他按钮的皮肤
			for (var i: number = 0; i < this.skillArr.length; i++) {
				if (i != this.selectNum) {
					var otherBtn: Laya.Button = this._viewUI.skill_list.getCell(i).getChildByName("jineng_btn") as Laya.Button;
					otherBtn.skin = "common/ui/tongyong/common_list_textbg2.png"
				}
			}
			this._viewUI.jineng8_btn.skin = "common/ui/skill/skillbg.png";
			this._viewUI.titleName_lab.text = this.skillArr[6]["skillname"];//技能名
			var levelNum;
			if (this._viewUI.level7_lab.text == "") {
				this._viewUI.titleLevel_lab.text = 0 + "";
				levelNum = 0;
				this._viewUI.update_box.visible = false;
				//解锁条件
				this._viewUI.jiesuo_box.visible = true;
				this._viewUI.jieSuoTouXiang_img.skin = this.skillImgArr[0].img;
				this._viewUI.jieSuoShuoMing_lab.text = this.skillArr[0]["skillname"] + models.SkillModel.chineseStr.dadao;
				this._viewUI.jiesuoLevel_lab.text = SkillEnum.UNLOCK_FUMO + tips.models.TipsModel.getInstance().cstringResConfigData[SkillEnum.JI_TEXT].msg;
			} else {
				this._viewUI.titleLevel_lab.text = this._viewUI.level7_lab.text;
				levelNum = parseInt(this._viewUI.level7_lab.text);
			}
			let fuMo_skillDescStr = this.skillArr[6]["sType"];//附魔技能描述
			let fuMo_skillGongXiaoStr = tip[SkillEnum.GONGXIA0].msg + this.skillArr[6]["skilldescribe"];//附魔技能功效
			this._viewUI.needNumber_lab.text = this.costObj[levelNum + 1]["moneyCostRule"][0];//升级费用
			let fuMo_skillLevelUpStr = "";
			for (var i: number = 0; i < 6; i++) {
				if (levelNum >= this.skillArr[this.selectNum]["levellimit"][i] && levelNum < this.skillArr[this.selectNum]["levellimit"][i + 1])
					fuMo_skillLevelUpStr = tip[SkillEnum.SHENG_JI].msg + ": " + this.skillArr[this.selectNum]["leveldescribe"][i];//附魔技能升级效果
			}
			var cost = Math.floor(levelNum * this.skillArr[this.selectNum]["paramA"] + this.skillArr[this.selectNum]["paramB"]);//消耗数值
			var str = this.skillArr[this.selectNum]["costA"];
			let fuMo_skillCost = str.replace("$parameter1$", cost);//附魔技能消耗
			this.showSkillDetails(fuMo_skillDescStr, fuMo_skillGongXiaoStr, fuMo_skillLevelUpStr, fuMo_skillCost);
		}
		/**点击绝技 */
		public clickJineng8(): void {
			this.selectNum = 7;
			this._viewUI.name_box.visible = false;
			this._viewUI.skillDetails_panel.visible = false;
			this._viewUI.update_box.visible = false;
			this._viewUI.jueji_box.visible = true;
			var tip = tips.models.TipsModel.getInstance().cstringResConfigData;//程序内字符串
			//点击效果
			this._viewUI.jineng8_btn.skin = "common/ui/skill/skillbg2.png";
			for (var i: number = 0; i < this.skillArr.length; i++) {
				if (i != this.selectNum) {
					var otherBtn: Laya.Button = this._viewUI.skill_list.getCell(i).getChildByName("jineng_btn") as Laya.Button;
					otherBtn.skin = "common/ui/tongyong/common_list_textbg2.png"
				}
			}
			this._viewUI.jineng7_btn.skin = "common/ui/tongyong/common_list_textbg2.png";
			this._viewUI.juejiName_lab.text = this.skillArr[7]["skillname"];//技能名
			this._viewUI.jueJiTouXiang_img.skin = this.skillImgArr[7].img;
			this._viewUI.jueJiShuoMing_htm.innerHTML = this.skillArr[7]["skillScript"];
			this._viewUI.juejiGongxiao_lab.text = tip[SkillEnum.GONGXIA0].msg + this.skillArr[7]["skilldescribe"];
			this._viewUI.juejiGongxiao_lab.overflow = Laya.Text.SCROLL;
			this._viewUI.juejiGongxiao_lab.on(LEvent.MOUSE_DOWN, this, (e: LEvent) => {
				let prevy = this._viewUI.juejiGongxiao_lab.mouseY;
				Laya.stage.on(LEvent.MOUSE_MOVE, this, this.scrollText, [prevy]);
				Laya.stage.on(LEvent.MOUSE_UP, this, this.stopScrollText);
			})
			if (this._viewUI.level8_lab.text != "") {
				this._viewUI.unlockLevel8_lab.text = models.SkillModel.chineseStr.dengji;
				var levelNum = parseInt(this._viewUI.level8_lab.text);
				this._viewUI.juejiLevel_lab.text = levelNum + tip[SkillEnum.JI_TEXT].msg;
				//根据绝技等级，显示不同的文本
				if (levelNum == 1) {
					for (var i: number = 0; i < 6; i++) {
						if (levelNum >= this.skillArr[this.selectNum]["levellimit"][i] && levelNum < this.skillArr[this.selectNum]["levellimit"][i + 1])
							this._viewUI.juejiShengji_lab.text = tip[SkillEnum.UNLOCK].msg + (levelNum + 1) + "级(下一级)\n" + "所有技能达到70级\n" + this.skillArr[this.selectNum]["leveldescribe"][i];//升级效果
					}
				} else if (levelNum == 2) {
					for (var i: number = 0; i < 6; i++) {
						if (levelNum >= this.skillArr[this.selectNum]["levellimit"][i] && levelNum < this.skillArr[this.selectNum]["levellimit"][i + 1])
							this._viewUI.juejiShengji_lab.text = tip[SkillEnum.UNLOCK].msg + (levelNum + 1) + "级(下一级)\n" + "所有技能达到90级\n" + this.skillArr[this.selectNum]["leveldescribe"][i];//升级效果
					}
				} else {
					this._viewUI.unlock_img.visible = false;
				}
				var cost = Math.floor(levelNum * this.skillArr[this.selectNum]["paramA"] + this.skillArr[this.selectNum]["paramB"]);//消耗数值
				var str = this.skillArr[this.selectNum]["costA"];
				this._viewUI.juejiXiaohao_lab.text = str.replace("$parameter1$", cost);//消耗
			}

		}
		/** 滚动文本
		 * @param prevy 滚动y坐标
		 */
		private scrollText(prevy: number): void {

			let nowy = this._viewUI.juejiGongxiao_lab.mouseY;
			this._viewUI.juejiGongxiao_lab.scrollY += prevy - nowy;
			console.log('this._viewUI.juejiGongxiao_lab.scrollY ===' + this._viewUI.juejiGongxiao_lab.scrollY);
			prevy = nowy;

		}
		/** 停止滚动文本 */
		private stopScrollText(): void {

			Laya.stage.off(LEvent.MOUSE_MOVE, this, this.scrollText);
			Laya.stage.off(LEvent.MOUSE_UP, this, this.stopScrollText);

		}
		/**初始化技能列表 */
		public getListData(): void {
			this._viewUI.skill_list.array = this.skillArr;
			this._viewUI.skill_list.repeatY = 3;
			this._viewUI.skill_list.repeatX = 2;
			this._viewUI.skill_list.renderHandler = new Handler(this, this.onRender);
			this._viewUI.skill_list.selectHandler = new Handler(this, this.onSelect);
			this._viewUI.skill_list.selectedIndex = -1;
		}
		/**渲染技能列表 */
		public onRender(cell: Laya.Box, index: number): void {
			if (index > 5) {
				cell.visible = false;
				return;
			}
			var nameLab: Laya.Label = cell.getChildByName("name_lab") as Laya.Label;
			var tubiaoImg: Laya.Image = cell.getChildByName("touxiang_img") as Laya.Image;
			var jinengBtn: Laya.Button = cell.getChildByName("jineng_btn") as Laya.Button;
			if (index != this.selectNum) {
				jinengBtn.skin = "common/ui/tongyong/common_list_textbg2.png"
			}
			nameLab.text = this.skillArr[index]["skillname"];
			tubiaoImg.skin = this.skillImgArr[index].img;
		}
		/**处理技能列表点击 */
		public onSelect(index: number): void {
			if (index != -1) {
				this.selectNum = index;
				this._viewUI.name_box.visible = true;
				this.setSkillDetailPanel();
				this._viewUI.update_box.visible = true;
				this._viewUI.jueji_box.visible = false;
				var tip = tips.models.TipsModel.getInstance().cstringResConfigData;//程序内字符串
				var nameLab: Laya.Label = this._viewUI.skill_list.getCell(index).getChildByName("name_lab") as Laya.Label;
				var levelLab: Laya.Label = this._viewUI.skill_list.getCell(index).getChildByName("level_lab") as Laya.Label;
				var jinengBtn: Laya.Button = this._viewUI.skill_list.getCell(index).getChildByName("jineng_btn") as Laya.Button;
				//点击更换按钮图片
				jinengBtn.skin = "common/ui/tongyong/common_list_3textbg_dwn.png";
				this._viewUI.jineng7_btn.skin = "common/ui/tongyong/common_list_textbg2.png";
				this._viewUI.jineng8_btn.skin = "common/ui/skill/skillbg.png";
				this._viewUI.titleName_lab.text = nameLab.text;
				var levelNum;
				let skillLevelUpStr = "";
				//判断当前技能是否有等级
				if (levelLab.text == "") {
					levelNum = 0;
					this._viewUI.titleLevel_lab.text = 0 + "";
					this._viewUI.update_box.visible = false;
					//解锁条件
					this._viewUI.jiesuo_box.visible = true;
					this._viewUI.jieSuoTouXiang_img.skin = this.skillImgArr[0].img;
					this._viewUI.jieSuoShuoMing_lab.text = this.skillArr[0]["skillname"] + models.SkillModel.chineseStr.dadao;
					this._viewUI.jiesuoLevel_lab.text = (index - 2) * 10 + tip[SkillEnum.JI_TEXT].msg;
					skillLevelUpStr = tip[SkillEnum.SHENG_JI].msg + ": " + this.skillArr[index]["leveldescribe"][0];//技能未解锁时升级效果
				} else {
					levelNum = parseInt(levelLab.text);
					this._viewUI.titleLevel_lab.text = levelLab.text;
					this._viewUI.update_box.visible = true;
					this._viewUI.jiesuo_box.visible = false;
				}
				this._viewUI.needNumber_lab.text = this.costObj[levelNum + 1]["moneyCostRule"][0];//升级费用
				if (parseInt(this._viewUI.needNumber_lab.text) > parseInt(this._viewUI.ownNumber_lab.text)) {
					this._viewUI.needNumber_lab.color = models.SkillModel.chineseStr.red;//更换需要银币的字体颜色
				} else
					this._viewUI.needNumber_lab.color = models.SkillModel.chineseStr.green;
				let skillDescStr = this.skillArr[index]["sType"];//技能描述;
				let skillGongXiaoStr = tip[SkillEnum.GONGXIA0].msg + this.skillArr[index]["skilldescribe"];//技能功效
				for (var i: number = 0; i < 6; i++) {
					if (levelNum >= this.skillArr[index]["levellimit"][i] && levelNum < this.skillArr[index]["levellimit"][i + 1])
						skillLevelUpStr = tip[SkillEnum.SHENG_JI].msg + ": " + this.skillArr[index]["leveldescribe"][i];//技能解锁后升级效果
				}
				var cost = Math.floor(levelNum * this.skillArr[index]["paramA"] + this.skillArr[index]["paramB"]);//消耗数值
				var str = this.skillArr[index]["costA"];
				let skillCostStr = str.replace("$parameter1$", cost);//技能消耗
				this.showSkillDetails(skillDescStr, skillGongXiaoStr, skillLevelUpStr, skillCostStr);
				this._viewUI.skill_list.selectedIndex = -1;
			}

		}
		/** 处理UI显示技能详细文本内容
		 * @param desc 技能描述
		 * @param gongxiao 技能功效
		 * @param levelUpEffect 技能升级效果
		 * @param cost 技能消耗
		 */
		private showSkillDetails(desc: string, gongxiao: string, levelUpEffect: string, cost: string): void {
			this._viewUI.skillDetails_panel.scrollTo(null, 0);
			this._viewUI.miaoshu_html.innerHTML ="<span style='color:#50321a;font:SimHei;fontSize:22'>" + desc + "</span>";
			this._viewUI.gongxiao_html.y = this._viewUI.miaoshu_html.y + this._viewUI.miaoshu_html.contextHeight + 15;
			this._viewUI.gongxiao_html.innerHTML = "<span style='color:#8c6d55;font:SimHei;fontSize:22'>" + gongxiao + "</span>";
			this._viewUI.xiaohao_html.y = this._viewUI.gongxiao_html.y + this._viewUI.gongxiao_html.contextHeight + 15;
			this._viewUI.xiaohao_html.innerHTML = "<span style='color:#50321a;font:SimHei;fontSize:22'>" + cost + "</span>";
			this._viewUI.shengji_html.y = this._viewUI.xiaohao_html.y + this._viewUI.xiaohao_html.contextHeight + 15;
			this._viewUI.shengji_html.innerHTML = "<span style='color:#8c6d55;font:SimHei;fontSize:22'>" + levelUpEffect + "</span>";
			this._viewUI.skillDetails_panel.vScrollBar.max = 45;
		}
		public hide(): void {
			super.hide();
		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}