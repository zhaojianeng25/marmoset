
module game.modules.strengThening {	
		/** 宝石镶嵌 */
	export class StrengTheningInsertViewMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.StrengTheningInsertUI;
		/**玩家拥有的装备的id */
		haveEquIdArr = StrengTheningModel._instance.haveEquIdArr;
		/**装备边框 */
		frameSkinArr = StrengTheningModel._instance.frameSkinArr;
		/**复合装备表 */
		itemAttrData = BagModel.getInstance().itemAttrData;
		/**道具类型表 */
		itemTypeData = StrengTheningModel.getInstance().itemTypeData;
		/**装备-宝石表-修理 */
		equipItemAttrData = StrengTheningModel.getInstance().equipItemAttrData;
		/**宝石表 */
		gemEffectData = StrengTheningModel.getInstance().gemEffectData;
		/**宝石类型表 */
		gemTypeData = StrengTheningModel.getInstance().gemTypeData;
		/**装备部位对应表 */
		equipPosNameData = StrengTheningModel.getInstance().equipPosNameData;
		/**装备属性信息 */
		equipTips = StrengTheningModel.getInstance().equipTips;
		/**装备附加属性库 */
		equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
		/**装备基础上属性 */
		equipIteminfoData = StrengTheningModel.getInstance().equipIteminfoData;
		/**程序内字符串表 */
		cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
		/**属性效果id表 */
		attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
		/**装备附加属性库by skill */
		equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
		/**装备表 */
		equipEffectData = game.modules.strengThening.models.StrengTheningModel._instance.equipEffectData;
		/**职业创建表 */
		createRoleConfigBinDic = game.modules.createrole.models.LoginModel.getInstance().createRoleConfigBinDic;
		/**玩家装备 */
		equArr: Array<any> = [];
		/**当前装备可以镶嵌的宝石类型 */
		equGemType: Array<number> = [];
		/**当前玩家拥有的装备 */
		m_haveEqu = [];
		/**玩家的宝石 */
		m_gem = [];
		onClickIndex = 0;
		/**保存点击的一级宝石按钮 */
		saveClickGemBtn = null;
		/**当前列表点击的按钮 */
		bgBtn: Laya.Box = null;
		/**宝石按钮位置 */
		gemBtnPosition = [];
		/**宝石列表选择的index */
		gemListSelectIndex = -1;
		/**保存原始宝石类型按钮坐标 */
		gemTypeBtnPosArr = [];
		/**是否显示红点 */
		isShowRedDot = 0;

		constructor(uiLayer: Sprite, app: AppBase) {
			super(uiLayer);
			this._viewUI = new ui.common.StrengTheningInsertUI();
			this.isCenter = false;
			this._app = app;

		}
        
		/**初始化数据 */
		public initLists(): void {
			this.initHaveEqu();
			if( this.m_haveEqu.length == 0 )return ;
			var equArr = [];
			this.isShowRedDot = 0;
			var equip_list = this._viewUI.equip_list;
			for (var i: number = 0; i < this.m_haveEqu.length; i++) {
				var nquality = this.itemAttrData[this.m_haveEqu[i].itemId].nquality;  //品质
				var frame_img = this.frameSkinArr[nquality - 1];
				var iconSkin = SaleModel._instance.getIcon(this.itemAttrData[this.m_haveEqu[i].itemId].icon);
				var mpackid = this.m_haveEqu[i].packid;
				var key = this.m_haveEqu[i].key;
				var diamondID = StrengTheningModel.getInstance().equGem(mpackid, key);
				var gemsLevel = this.equipItemAttrData[this.m_haveEqu[i].itemId].gemsLevel;
				var isWearEquip = StrengTheningModel.getInstance().isWearEquip(this.m_haveEqu[i].itemId, key);
				var isHaveEquGem = this.haveEquipGem(this.m_haveEqu[i].itemId, gemsLevel);
				var vgemboxlevel = this.equipItemAttrData[this.m_haveEqu[i].itemId].vgemboxlevel;
				equArr.push({
					name_lab: this.itemAttrData[this.m_haveEqu[i].itemId].name,
					frame_img: frame_img,
					equIcon_img: iconSkin,
					packid: this.m_haveEqu[i].packid,
					key: this.m_haveEqu[i].key,
					itemId: this.m_haveEqu[i].itemId,
					diamondID: diamondID,  //镶嵌宝石
					gemsLevel: gemsLevel,  //最高镶嵌宝石等级
					isWear: isWearEquip, //当前装备是否穿在身上
					isHaveEquGem: isHaveEquGem, //是否有可装备的宝石
					vgemboxlevel: vgemboxlevel,   //宝石槽开启等级
				})
			}
			this.equArr = equArr;
			SaleModel._instance.showList(equip_list, equArr)
			equip_list.renderHandler = new Handler(this, this.onEquipListRender, [equArr]);
			equip_list.selectHandler = new Handler(this, this.onEquipListSelect, [equArr]);
			let gemListSelectIndex = StrengTheningModel.getInstance().getInsertEquipPos(equArr);
			if(gemListSelectIndex != -1)
			this.gemListSelectIndex = gemListSelectIndex;
			if (this.gemListSelectIndex != -1) {
				this.onEquipListSelect(equArr, this.gemListSelectIndex);
				equip_list.scrollTo(this.gemListSelectIndex);
			} else {
				this.onEquipListSelect(equArr, 0);
			}
			equip_list.selectedIndex = this.gemListSelectIndex;
			this.decraseGem();
			var itemAttrData = this.itemAttrData[this.m_haveEqu[0].itemId];
			this.showRedDot(equArr);
			
		}

		/**显示红点 */
		public showRedDot(equArr) {
			var isShowRedDot1 = 0;
			var isShowRedDot2 = 0;
			var rolelevel = HudModel.getInstance().levelNum;
			for (var i in equArr) {
				var isWear = equArr[i].isWear;
				var vgemboxlevel = equArr[i].vgemboxlevel;
				var isHaveEquGem = equArr[i].isHaveEquGem;
				var gemsLevel = equArr[i].gemsLevel;
				var diamondID = equArr[i].diamondID;
				var itemlevel = this.itemAttrData[equArr[i].itemId].level;
				if (rolelevel >= unlock.QIANGHUA_LEVEL) {   //人物等级大于32级
					if (gemsLevel > 0) {  //是否可镶嵌
						if (diamondID.length <= 0) { //没有镶嵌宝石
							if (isHaveEquGem == true && isWear == true) {
								if (vgemboxlevel[0] <= itemlevel && itemlevel <= vgemboxlevel[1]) {  //只能镶嵌一个宝石
									isShowRedDot1 += 1;
								} else if (itemlevel > vgemboxlevel[1]) {  //镶嵌两个宝石
									isShowRedDot2 += 1;
								}
							}
						}else if(diamondID.length == 1 && isWear == true){ //镶嵌一颗宝石
							if(itemlevel > vgemboxlevel[1]){
								isShowRedDot2 += 1;
							}
						}
					}
				}
			}
			if (isShowRedDot1 > 0 || isShowRedDot2 > 0) {
				models.StrengTheningProxy.getInstance().event(models.insertRedDot, [1]);  //开启红点 1：开启 0：关闭
			} else {
				models.StrengTheningProxy.getInstance().event(models.insertRedDot, [0]);  //开启红点 1：开启 0：关闭
			}
		}
        
		/**是否可装备 */
		public equipIsCanWear(itemId) {
			var iscanWear = false;
			var mLevel = game.modules.createrole.models.LoginModel.getInstance().roleDetail.level;  //玩家等级
			var equLevel = this.itemAttrData[itemId].level;  //装备等级
			var needCareer = this.equipEffectData[itemId].needCareer;  //装备职业需求
			var school = game.modules.createrole.models.LoginModel.getInstance().roleDetail.school;  //职业
			var carrerArr = needCareer.split(";");
			var sexNeed = this.equipEffectData[itemId].sexNeed;
			var shape = game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape;  //角色id
			var sex = this.createRoleConfigBinDic[shape].sex
			if (mLevel >= equLevel && sexNeed == sex || sexNeed == 0 || needCareer == "0") {
				if (carrerArr.indexOf(school + "") > 0 || needCareer == "0") {
					iscanWear = true;
				}
			}
			return iscanWear;
		}
        
		/**装备列表显示 */
		public onEquipListRender(equArr, cell: Box, index: number) {
			var arrtibute_lab = cell.getChildByName("arrtibute_lab") as Label;
			var gem1_img = cell.getChildByName("gem1_img") as Laya.Image;
			var gem2_img = cell.getChildByName("gem2_img") as Laya.Image;
			var isCanWear_img = cell.getChildByName("isCanWear_img") as Laya.Image;
			var iscanWear = this.equipIsCanWear(equArr[index].itemId);
			var point_img = cell.getChildByName("point_img") as Laya.Image;
			point_img.visible = false;
			isCanWear_img.visible = false;
			if (iscanWear) {
				isCanWear_img.visible = true;
			}
			gem1_img.visible = false;
			gem2_img.visible = false;
			if (equArr[index].gemsLevel > 0) {  //是否可镶嵌
				var diamondID = equArr[index].diamondID;
				var iswearequip = equArr[index].isWear;
				var isHaveEquGem = equArr[index].isHaveEquGem;
				var itemlevel = this.itemAttrData[equArr[index].itemId].level; //物品等级
				var vgemboxlevel = equArr[index].vgemboxlevel;
				if (diamondID.length > 0) {  //是否已经镶嵌宝石
					arrtibute_lab.visible = false;
					if (diamondID.length == 2) {  //镶嵌两个宝石
						gem2_img.visible = true;
						gem1_img.visible = true;
						gem1_img.skin = SaleModel._instance.getIcon(this.itemAttrData[diamondID[0]].icon);
						gem2_img.skin = SaleModel._instance.getIcon(this.itemAttrData[diamondID[1]].icon);
					}
					if (diamondID.length == 1) {  //镶嵌一个宝石
						gem1_img.visible = true;
						if (iswearequip == true && isHaveEquGem == true) {  //是穿在身上的装备、有镶嵌的宝石
							if (itemlevel >= vgemboxlevel[1]) {  //装备等级大于最大镶嵌等级
								point_img.visible = true;
							}
						}
						gem1_img.skin = SaleModel._instance.getIcon(this.itemAttrData[diamondID[0]].icon);
					}
				} else {
					arrtibute_lab.visible = true;
					if (isHaveEquGem) {
						arrtibute_lab.text = this.cstringResConfigData[11011].msg;
						arrtibute_lab.color = "#13FF00";
						if (iswearequip) {
							point_img.visible = true;
						}
					} else {
						arrtibute_lab.text = this.cstringResConfigData[2749].msg;
						arrtibute_lab.color = "#391104";
					}
				}
			} else {
				arrtibute_lab.visible = true;
				arrtibute_lab.text = this.cstringResConfigData[11028].msg;
				arrtibute_lab.color = "#391104";
			}
			var bg_btn = cell.getChildByName("bg_btn") as Button;
			bg_btn.on(LEvent.MOUSE_UP, this, this.onBgBtn, [index, cell]);

		}

		/**是否有可装备的宝石 */
		public haveEquipGem(equipId, gemsLevel) {
			var isHaveEquGem = false;
			var vgemtype: Array<number> = this.equipItemAttrData[equipId].vgemtype;  //当前装备的 可镶嵌宝石类型
			for (var i in this.m_gem) {
				var itemId = this.m_gem[i].itemId;
				var itemlevel = this.itemAttrData[itemId].level;
				for (var j in vgemtype) {
					var nitemid = this.gemTypeData[vgemtype[j]].nitemid;
					if (nitemid <= itemId && itemId < nitemid + 99 && itemlevel <= gemsLevel) {
						isHaveEquGem = true;
					}
				}
			}
			return isHaveEquGem;
		}

		
        
		/**列表点击效果 */
		public onBgBtn(index, cell) {
			var bgBtn: Button = cell.getChildByName("bg_btn") as Button;
			bgBtn.selected = true;
			if (this.bgBtn == null) {
				this.bgBtn = cell;
				return;
			}
			if (this.bgBtn != cell) {
				var btnLeft: Button = this.bgBtn.getChildByName("bg_btn") as Button;
				btnLeft.selected = false;
				this.bgBtn = cell;
			}
		}

		
        
		/**装备列表选择 */
		public onEquipListSelect(equArr, index: number): void {
			this.gemListSelectIndex = index;
			var itemAttrData = this.itemAttrData[equArr[index].itemId];
			this._viewUI.showEquName_lab.text = itemAttrData.name;
			var level = itemAttrData.level;    //装备等级
			var itemtypeName = this.itemTypeData[itemAttrData.itemtypeid].name;
			this._viewUI.equLevelType_label.text = level + this.cstringResConfigData[3].msg + itemtypeName;
			var nquality = itemAttrData.nquality;  //品质
			this._viewUI.frame_img.skin = this.frameSkinArr[nquality - 1];
			this._viewUI.equIcon_img.skin = "common/icon/item/" + itemAttrData.icon + ".png";
			var itemId = this.itemAttrData[equArr[index].itemId].id;  //当前点击的装备的id
			var vgemtype: Array<number> = this.equipItemAttrData[itemId].vgemtype;  //当前装备的 可镶嵌宝石类型
			this.equGemType = [];
			this.equGemType = vgemtype;
			var eequiptype = this.equipItemAttrData[itemId].eequiptype; //当前装备的部位id
			var strname = this.equipPosNameData[eequiptype].strname;  //部位对应名称
			var equtype = this.cstringResConfigData[11008].msg.replace("$parameter1$", strname);
			this._viewUI.eequiptype_label.text = equtype;
			this._viewUI.gem_radio.selectedIndex = 0;
			this.showGemList();
			var diamondID = equArr[index].diamondID;  //当前装备镶嵌的宝石
			this.gemXiangqianCao(itemId, diamondID);
			this.showEquipAttr(equArr, index);
		}

		/**属性 */
		public showEquipAttr(equArr, index) {
			this._viewUI.attr_panel.destroyChildren();
			var packid = equArr[index].packid;
			var key = equArr[index].key;
			var html = "";
			var equipTips = models.StrengTheningModel._instance.equipTips;
			for (var i in equipTips) {
				var equPackid = equipTips[i].packid;   //背包id
				var equKey = equipTips[i].keyinpack;  //装备的key
				if (packid == equPackid && key == equKey) {
					var baseAttr = equipTips[i].tips.baseAttr;
					var addAttr = equipTips[i].tips.addAttr;
					var skill = equipTips[i].tips.skill;
					var effect = equipTips[i].tips.effect;
					if (baseAttr != null) {
						var baseAttrKeys = baseAttr.keys;
						for (var j = 0; j < baseAttrKeys.length; j++) {
							var baseAttrId = baseAttrKeys[j];   //基础属性的id
							var baseAttrValue = baseAttr.get(baseAttrId);  //值
							var baseAttrName = this.attributeDesConfigData[baseAttrKeys[j]].name + "+" + baseAttrValue;
							html += "<span style='fontSize:24;color:#fff2df'>&nbsp;&nbsp;" + baseAttrName + "</span><br/>";
						}
					}
					if (addAttr != null) {
						var addAttrKeys = addAttr.keys;
						for (var k = 0; k < addAttrKeys.length; k++) {
							var addAttrId = addAttrKeys[k];
							var addAttrValue = addAttr.get(addAttrId);
							var name = this.equipAddattributelibData[addAttrId].name;
							var tipname = name + addAttrValue;
							var color = this.equipAddattributelibData[addAttrId].namecolour;
							html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + tipname + "</span><br/>";
						}
					}

					if (skill != 0) {
						var name = this.equipAddattributelibDataBySkill[skill].name;
						var color = this.equipAddattributelibDataBySkill[skill].namecolour;
						html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11002].msg + "&nbsp;" + name + "</span><br/>";
					}

					if (effect != 0) {
						var name = this.equipAddattributelibDataBySkill[effect].name;
						var color = this.equipAddattributelibDataBySkill[skill].namecolour;
						html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11003].msg + "&nbsp;" + name + "</span><br/>";
					}

					var attrHtml = new Laya.HTMLDivElement();
					attrHtml.width = 215;
					attrHtml.innerHTML = html;
					attrHtml.x = 0;
					attrHtml.y = 0;
					this._viewUI.attr_panel.addChild(attrHtml);
					this.setPanel(this._viewUI.attr_panel);
				}
			}

		}

		/**宝石镶嵌槽 */
		public gemXiangqianCao(itemId, diamondID) {
			var hols = this.equipItemAttrData[itemId].hols;
			var vgemboxlevel = this.equipItemAttrData[itemId].vgemboxlevel;
			var gemsLevel = this.equipItemAttrData[itemId].gemsLevel;
			var itemlevel = this.itemAttrData[itemId].level;
			if (gemsLevel > 0) {  //可镶嵌
				var tishi = this.cstringResConfigData[11009].msg;
				this._viewUI.gemMaxLevel_label.text = tishi.replace("$parameter1$", gemsLevel);
				if (diamondID.length > 0) {  //当前装备镶嵌有宝石
					this._viewUI.decrease2_btn.visible = true;
					this._viewUI.name2_lab.visible = true;
					this._viewUI.attribute2_lab.visible = true;
					this._viewUI.xqtishi2_label.visible = false;
					this._viewUI.decrease1_btn.visible = true;
					this._viewUI.xqGemName_lab.visible = true;
					this._viewUI.xqtishi_label.visible = false;
					this._viewUI.xqGemAttribute_lab.visible = true;
					if (diamondID.length == 1) {
						this.showGem1(diamondID);
						if (itemlevel < vgemboxlevel[1]) {  //只能镶嵌一个宝石
							this._viewUI.decrease2_btn.visible = false;
							this._viewUI.name2_lab.visible = false;
							this._viewUI.attribute2_lab.visible = false;
							this._viewUI.xqtishi2_label.visible = true;
							this._viewUI.gemIcon2_img.skin = "common/ui/tongyong/suo.png";
							var tishi1 = this.cstringResConfigData[11027].msg;
							this._viewUI.xqtishi2_label.text = tishi1.replace("$parameter1$", vgemboxlevel[1]);

						} else {  //镶嵌两个宝石
							this._viewUI.decrease2_btn.visible = false;
							this._viewUI.name2_lab.visible = false;
							this._viewUI.attribute2_lab.visible = false;
							this._viewUI.xqtishi2_label.visible = true;
							this._viewUI.gemIcon2_img.skin = "common/ui/tongyong/huoban_jiahao.png";
						}
					}
					if (diamondID.length == 2) {
						this.showGem1(diamondID);
						this.showGem2(diamondID);
					}
				} else {
					if (itemlevel < vgemboxlevel[0]) {  //不能镶嵌宝石
						this.cannotInsertGem(vgemboxlevel);
					} else if (vgemboxlevel[0] <= itemlevel && itemlevel < vgemboxlevel[1]) {  //只能镶嵌一个
						this._viewUI.gemIcon1_img.skin = "common/ui/tongyong/huoban_jiahao.png";
						this._viewUI.gemIcon2_img.skin = "common/ui/tongyong/suo.png";
						this._viewUI.xqtishi2_label.visible = true;
						this._viewUI.decrease2_btn.visible = false;
						this._viewUI.name2_lab.visible = false;
						this._viewUI.attribute2_lab.visible = false;
						this._viewUI.xqtishi_label.visible = true;
						this._viewUI.xqtishi_label.text = this.cstringResConfigData[2754].msg;
						this._viewUI.decrease1_btn.visible = false;
						this._viewUI.xqGemAttribute_lab.visible = false;
						this._viewUI.xqGemName_lab.visible = false;
						var tishi1 = this.cstringResConfigData[11027].msg;
						this._viewUI.xqtishi2_label.text = tishi1.replace("$parameter1$", vgemboxlevel[1]);

					} else if (vgemboxlevel[1] <= itemlevel) { //镶嵌两个
						this._viewUI.xqtishi_label.visible = true;
						this._viewUI.xqtishi2_label.visible = true;
						this._viewUI.xqGemName_lab.visible = false;
						this._viewUI.xqGemAttribute_lab.visible = false;
						this._viewUI.name2_lab.visible = false;
						this._viewUI.attribute2_lab.visible = false;
						this._viewUI.decrease1_btn.visible = false;
						this._viewUI.decrease2_btn.visible = false;
						this._viewUI.xqtishi_label.text = this.cstringResConfigData[2754].msg;
						this._viewUI.xqtishi2_label.text = this.cstringResConfigData[2754].msg;
						this._viewUI.gemIcon1_img.skin = "common/ui/tongyong/huoban_jiahao.png";
						this._viewUI.gemIcon2_img.skin = "common/ui/tongyong/huoban_jiahao.png";
					}
				}
			} else {  //不能镶嵌
				this.cannotInsertGem(vgemboxlevel);
			}
		}

		/**不能镶嵌宝石 */
		public cannotInsertGem(vgemboxlevel) {
			this._viewUI.gemIcon1_img.skin = "common/ui/tongyong/suo.png";
			this._viewUI.gemIcon2_img.skin = "common/ui/tongyong/suo.png";
			this._viewUI.xqtishi_label.visible = true;
			this._viewUI.xqtishi2_label.visible = true;
			this._viewUI.xqGemName_lab.visible = false;
			this._viewUI.xqGemAttribute_lab.visible = false;
			this._viewUI.name2_lab.visible = false;
			this._viewUI.attribute2_lab.visible = false;
			this._viewUI.decrease1_btn.visible = false;
			this._viewUI.decrease2_btn.visible = false;
			var tishi1 = this.cstringResConfigData[11027].msg;
			this._viewUI.xqtishi_label.text = tishi1.replace("$parameter1$", vgemboxlevel[0]);
			this._viewUI.xqtishi2_label.text = tishi1.replace("$parameter1$", vgemboxlevel[1]);
			this._viewUI.gemMaxLevel_label.text = this.cstringResConfigData[11398].msg;
		}
        
		/**显示第一个宝石 */
		public showGem1(diamondID) {
			var gemid = diamondID[0];
			if (gemid != undefined) {
				var icon = this.itemAttrData[gemid].icon;
				var mGemIcon = SaleModel._instance.getIcon(icon);
				this._viewUI.gemIcon1_img.skin = mGemIcon;
				this._viewUI.xqGemName_lab.text = this.itemAttrData[gemid].name;
				this._viewUI.xqGemAttribute_lab.text = this.itemAttrData[gemid].effectdes;
			}
		}
        
		/**显示第二个宝石 */
		public showGem2(diamondID) {
			var gemid = diamondID[1];
			if (gemid != undefined) {
				var icon = this.itemAttrData[gemid].icon;
				var mGemIcon = SaleModel._instance.getIcon(icon);
				this._viewUI.gemIcon2_img.skin = mGemIcon;
				this._viewUI.name2_lab.text = this.itemAttrData[gemid].name;
				this._viewUI.attribute2_lab.text = this.itemAttrData[gemid].effectdes;
			}
		}

		/**删除宝石 */
		public decraseGem() {
			this._viewUI.decrease1_btn.on(LEvent.MOUSE_DOWN, this, this.delGem);
			this._viewUI.decrease2_btn.on(LEvent.MOUSE_DOWN, this, this.delGem);
		}

		/**刷新装备列表 */
		public flushGemList() {
			game.modules.createrole.models.LoginProxy.getInstance().once(game.modules.createrole.models.GetItemTips_EVENT, this, this.initLists);
		}
        
		/**删除宝石 */
		public delGem() {
			var selectedIndex = this._viewUI.equip_list.selectedIndex;
			var packid = this.equArr[selectedIndex].packid;
			var key = this.equArr[selectedIndex].key;
			var isWear = this.equArr[selectedIndex].isWear;
			if (isWear) {
				this.CDelGem(key, 1, 0);
			} else {
				this.CDelGem(key, 0, 0);
			}
			this.flushGemList();
		}

        /**
		 * //镶嵌宝石列表
		 */
		public showGemList(): void {
			var gemListArr: Array<any> = [];
			var gem_list = this._viewUI.gem_list;
			gem_list.repeatY = this.equGemType.length;
			this.showList(gem_list);
			for (var i: number = 0; i < this.equGemType.length; i++) {
				var name_lab = this.gemTypeData[this.equGemType[i]].strname;
				var attribute_lab = this.gemTypeData[this.equGemType[i]].stradddes
				var icomId = this.gemTypeData[this.equGemType[i]].nicon;
				var gemIcon = "common/icon/item/" + icomId + ".png";
				var nitemid = this.gemTypeData[this.equGemType[i]].nitemid;
				gemListArr.push({ name_lab: name_lab, attribute_lab: attribute_lab, gemIcon_img: gemIcon, gemType: this.equGemType[i], nitemid: nitemid })
			}
			gem_list.array = gemListArr;
			this.setPanel(this._viewUI.gem_panel);
			this.createXiangqGemBtn(gemListArr);
		}

        /**创建装备可镶嵌的宝石类型 */
		public createXiangqGemBtn(gemListArr) {
			this._viewUI.gem_panel.destroyChildren();
			this.gemTypeBtnPosArr = [];
			for (let i = 0; i < gemListArr.length; i++) {
				let GemTypeBtn: Laya.Button = new Laya.Button();
				GemTypeBtn.width = 220;
				GemTypeBtn.height = 70;
				GemTypeBtn.skin = "common/ui/tongyong/common_list_3textbg11.png";
				GemTypeBtn.stateNum = 2;
				GemTypeBtn.sizeGrid = "10,10,10,10";
				GemTypeBtn.x = 0;
				GemTypeBtn.y = 70 * i;
				GemTypeBtn.name = i + "";
				this.gemTypeBtnPosArr.push({ name: GemTypeBtn.name, y: GemTypeBtn.y })
				let img: Laya.Image = new Laya.Image();
				img.width = 50;
				img.height = 50;
				img.x = 10;
				img.y = 10;
				img.skin = gemListArr[i].gemIcon_img;
				GemTypeBtn.addChild(img);
				let namelab = new Laya.Label;
				namelab.width = 130;
				namelab.height = 25;
				namelab.fontSize = 22;
				namelab.font = "SimHei";
				namelab.align = "left";
				namelab.color = "#50321a";
				namelab.x = 70;
				namelab.y = 5;
				namelab.text = gemListArr[i].name_lab;
				GemTypeBtn.addChild(namelab);
				let desclabel = new Laya.Label;
				desclabel.width = 130;
				desclabel.height = 25;
				desclabel.fontSize = 22;
				desclabel.font = "SimHei";
				desclabel.align = "left";
				desclabel.color = "#50321a";
				desclabel.x = 70;
				desclabel.y = 40;
				desclabel.text = gemListArr[i].attribute_lab;
				GemTypeBtn.addChild(desclabel);
				this.gemBtnPosition.push(GemTypeBtn.y);
				GemTypeBtn.on(LEvent.MOUSE_DOWN, this, this.onNewBtn, [gemListArr[i].name_lab, gemListArr[i].gemType, GemTypeBtn, gemListArr.length, gemListArr[i].nitemid]);
				this._viewUI.gem_panel.addChild(GemTypeBtn);
			}
		}
        
		/**点击装备的当前类型宝石 */
		public onNewBtn(gemName, gemType, GemTypeBtn, length, nitemid) {
			if (this.saveClickGemBtn != null && this.saveClickGemBtn == GemTypeBtn) {
				var gembtnbox = this._viewUI.gem_panel.getChildByName("gembtnbox");
				if (gembtnbox != null) {
					this._viewUI.gem_panel.removeChild(gembtnbox);
					this.saveClickGemBtn = null;
					for (var i = 0; i < length; i++) {
						var name = i + "";
						var mbtn = this._viewUI.gem_panel.getChildByName(name) as Button;
						mbtn.y = this.gemTypeBtnPosArr[i].y;
					}
				}
			} else {
				this.saveClickGemBtn = GemTypeBtn;
				this.createMyGemBtn(gemName, gemType, GemTypeBtn, length, nitemid);
			}
		}

        /**创建显示拥有的宝石 */
		public createMyGemBtn(gemName, gemType, gemBtn, gemBtnlength, nitemid) {
			var gembtnbox = this._viewUI.gem_panel.getChildByName("gembtnbox");
			if (gembtnbox != null) {
				this._viewUI.gem_panel.removeChild(gembtnbox);
				for (var i = 0; i < gemBtnlength; i++) {
					var name = i + "";
					var mbtn = this._viewUI.gem_panel.getChildByName(name) as Button;
					mbtn.y = this.gemTypeBtnPosArr[i].y;
				}
			}
			let mbox = new Laya.Box();
			mbox.width = 220;
			mbox.x = 0;
			var gembtnPosY = 0;
			if (parseInt(gemBtn.name) != 0) {
				gembtnPosY = this.gemTypeBtnPosArr[parseInt(gemBtn.name)].y;
				gemBtn.y = gembtnPosY;
			} else {
				gembtnPosY = gemBtn.y;
			}
			mbox.y = gembtnPosY + gemBtn.height;
			mbox.name = "gembtnbox";
			let goShopBtn: Laya.Button = new Laya.Button();
			goShopBtn.name = "goShop";
			goShopBtn.width = 220;
			goShopBtn.height = 70;
			goShopBtn.skin = "common/ui/tongyong/common_list_3textbg11.png";
			goShopBtn.stateNum = 2;
			goShopBtn.sizeGrid = "10,10,10,10";
			goShopBtn.x = 0;
			goShopBtn.y = 0;
			let goShop_frame: Laya.Image = new Laya.Image();
			goShop_frame.width = 60;
			goShop_frame.height = 60;
			goShop_frame.x = 5;
			goShop_frame.y = 5;
			goShop_frame.skin = "common/ui/tongyong/kuang94.png";
			goShopBtn.addChild(goShop_frame)
			let goShop_img: Laya.Image = new Laya.Image();
			goShop_img.width = 50;
			goShop_img.height = 50;
			goShop_img.x = 10;
			goShop_img.y = 10;
			goShop_img.skin = "common/ui/tongyong/huoban_jiahao.png";
			goShopBtn.addChild(goShop_img);
			let gemlabel = new Laya.Label;
			gemlabel.width = 130;
			gemlabel.height = 25;
			gemlabel.fontSize = 22;
			gemlabel.font = "SimHei";
			gemlabel.align = "left";
			gemlabel.color = "#50321a";
			gemlabel.x = 70;
			gemlabel.y = 20;
			gemlabel.text = gemName;
			goShopBtn.addChild(gemlabel);
			goShopBtn.on(LEvent.MOUSE_DOWN, this, this.goShop, [nitemid]);
			mbox.addChild(goShopBtn);
			var havegemArr = [];
			if (this.m_gem.length > 0) {  //拥有宝石
				for (let i in this.m_gem) {
					var gemId = this.m_gem[i].itemId;
					var gemNum = this.m_gem[i].itemNum;
					var key = this.m_gem[i].key;
					var ngemtype = this.gemEffectData[gemId].ngemtype;
					if (ngemtype == gemType) {
						havegemArr.push({ gemId: gemId, gemNum: gemNum, key: key });
					}
				}
				var gemList = this._viewUI.gem_list;
				var gemlistArr = [];
				for (let j = 0; j < havegemArr.length; j++) {
					var gemid = havegemArr[j].gemId;
					var key = havegemArr[j].key;
					var gemname = this.gemEffectData[gemid].name;
					var mGemIcon = SaleModel._instance.getIcon(this.itemAttrData[gemid].icon);
					var frameimg = StrengTheningModel._instance.frameSkinArr[this.itemAttrData[gemid].nquality - 1];
					let haveGemBtn: Laya.Button = new Laya.Button();
					haveGemBtn.width = 220;
					haveGemBtn.height = 70;
					haveGemBtn.skin = "common/ui/tongyong/common_list_3textbg11.png";
					haveGemBtn.stateNum = 2;
					haveGemBtn.sizeGrid = "10,10,10,10";
					haveGemBtn.x = 0;
					haveGemBtn.y = 70 * (j + 1);
					let namelab = new Laya.Label;
					namelab.width = 130;
					namelab.height = 25;
					namelab.fontSize = 22;
					namelab.font = "SimHei";
					namelab.align = "left";
					namelab.color = "#50321a";
					namelab.x = 70;
					namelab.y = 5;
					namelab.text = gemname;
					haveGemBtn.addChild(namelab);
					let desclabel = new Laya.Label;
					desclabel.width = 130;
					desclabel.height = 25;
					desclabel.fontSize = 22;
					desclabel.font = "SimHei";
					desclabel.align = "left";
					desclabel.color = "#50321a";
					desclabel.x = 70;
					desclabel.y = 40;
					desclabel.text = this.itemAttrData[gemid].effectdes;
					haveGemBtn.addChild(desclabel);
					let frame: Laya.Image = new Laya.Image();
					frame.width = 60;
					frame.height = 60;
					frame.x = 5;
					frame.y = 5;
					frame.skin = frameimg;
					haveGemBtn.addChild(frame);
					let img: Laya.Image = new Laya.Image();
					img.width = 50;
					img.height = 50;
					img.x = 10;
					img.y = 10;
					img.skin = mGemIcon;
					haveGemBtn.addChild(img);
					let numLabel = new Laya.Label;
					numLabel.width = 50;
					numLabel.height = 18;
					numLabel.fontSize = 18;
					numLabel.font = "SimHei";
					numLabel.align = "right";
					numLabel.color = "#f3eae7";
					numLabel.x = 10;
					numLabel.y = 40;
					numLabel.bold = true;
					numLabel.text = havegemArr[j].gemNum;
					haveGemBtn.addChild(numLabel);
					haveGemBtn.on(LEvent.MOUSE_UP, this, this.onHaveGemBtn, [gemId, key]);
					mbox.addChild(haveGemBtn);
				}
			}
			this._viewUI.gem_panel.addChild(mbox);
			if (havegemArr.length > 0) {
				mbox.height = (havegemArr.length + 1) * 70;
			} else {
				mbox.height = 70;
			}

			var gemBtnName = parseInt(gemBtn.name)
			if (gemBtnName < gemBtnlength - 1) {
				var haveBtnNum = gemBtnlength - 1 - gemBtnName;
				for (var k = 1; k <= haveBtnNum; k++) {
					var btnname = gemBtnName + k;
					var mbtn = this._viewUI.gem_panel.getChildByName(btnname + "") as Button;
					mbtn.y = mbox.height + gemBtn.y + gemBtn.height + 70 * (k - 1);
				}
			}

		}

		/**镶嵌宝石 和 替换宝石 */
		public onHaveGemBtn(gemId, gemkey) {
			var selectedIndex = this._viewUI.equip_list.selectedIndex;
			if (selectedIndex == -1) { return }
			var packid = this.equArr[selectedIndex].packid;
			var key = this.equArr[selectedIndex].key;
			var isWear = this.equArr[selectedIndex].isWear;
			var radioSelectIndex = this._viewUI.gem_radio.selectedIndex;
			if (radioSelectIndex == 0) {
				if (this._viewUI.decrease1_btn.visible) {
					if (isWear) {
						this.CReplaceGemFromEquip(key, 1, 0, gemkey);
					} else {
						this.CReplaceGemFromEquip(key, 0, 0, gemkey);
					}
				} else {
					if (isWear) {
						this.CAttachGem(key, 1, gemkey);
					} else {
						this.CAttachGem(key, 0, gemkey);
					}
				}
			}
			if (radioSelectIndex == 1) {
				if (this._viewUI.decrease2_btn.visible) {
					if (isWear) {
						this.CReplaceGemFromEquip(key, 1, 1, gemkey);
					} else {
						this.CReplaceGemFromEquip(key, 0, 1, gemkey);
					}
				} else {
					if (isWear) {
						this.CAttachGem(key, 1, gemkey);
					} else {
						this.CAttachGem(key, 0, gemkey);
					}
				}
			}
			this.flushGemList();
		}
        
		/**前往商城 */
		public goShop(nitemid) {
			var tabNum = game.modules.strengThening.models.StrengTheningModel._instance.tabNum;
			game.modules.shop.models.ShopModel._instance.itemId = nitemid;
			ModuleManager.show(ModuleNames.SHOP, this._app);
			ModuleManager.hide(ModuleNames.STRENG_THENING);
			LoginModel.getInstance().CommonPage = ModuleNames.STRENG_THENING;
			game.modules.strengThening.models.StrengTheningModel._instance.tabNum = tabNum;
		}
        
		/**设置panel的效果 */
		public setPanel(panel) {
			panel.vScrollBarSkin = '';
			panel.vScrollBar.elasticBackTime = 200;
			panel.vScrollBar.elasticDistance = 100;
		}
        
		/**显示列表 */
		public showList(lsit: Laya.List): void {
			lsit.vScrollBarSkin = "";
			lsit.scrollBar.elasticBackTime = 200;
			lsit.scrollBar.elasticDistance = 50;
		}

        /**获取拥有的装备id  宝石id */
		public initHaveEqu() {  
			this.m_gem = [];
			this.m_haveEqu = [];
			var bag1 = bagModel.getInstance().bagMap[BagTypes.BAG].items;
			var bag3 = bagModel.getInstance().bagMap[BagTypes.EQUIP].items;
			var returnBag3 = this.getItems(bag3);
			var returnBag1 = this.getItems(bag1);
			this.pushToArr(returnBag3, BagTypes.EQUIP);
			this.pushToArr(returnBag1, BagTypes.BAG);
		}
        
		/**获取背包的数据 */
		public getItems(bag) {
			var idArr: Array<any> = []
			for (var i: number = 0; i < bag.length; i++) {
				var itemId = bag[i].id;      //item id
				var itemNum = bag[i].number;      //item id
				idArr.push({ itemId: itemId, itemNum: itemNum, key: bag[i].key });
			}
			return idArr;
		}
 
        /**将背包中的物品分类 */
		public pushToArr(returnBag, packid) {  
			if (returnBag.length == 0) return;
			for (var i: number = 0; i < returnBag.length; i++) {
				if (108000 <= returnBag[i].itemId && returnBag[i].itemId <= 108812) {   //宝石
					this.m_gem.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum, key: returnBag[i].key, packid: packid })
				} else if (120000 <= returnBag[i].itemId && returnBag[i].itemId <= 126675) {  //装备
					this.m_haveEqu.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum, key: returnBag[i].key, packid: packid })
				} else if (140000 <= returnBag[i].itemId && returnBag[i].itemId <= 140005) {  //策划装备
					this.m_haveEqu.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum, key: returnBag[i].key, packid: packid })
				}
			}
		}

		public show(): void {
			this.initLists();
			super.show();
		}

		public hide(): void {
			super.hide();
		}

		public getView(): Sprite {
			return this._viewUI;
		}

		/**
		 * 镶嵌
		 * @param keyinpack 装备道具的key
		 * @param isBquipBag 是否为装备背包 1：是，0：不是
		 * @param gemkey 要镶嵌宝石在背包中的key
		 */
		public CAttachGem(keyinpack, isBquipBag, gemkey): void {
			RequesterProtocols._instance.c2s_CAttach_Gem(keyinpack, isBquipBag, gemkey);
		}

		/**取消镶嵌 */
		public CDelGem(keyinpack: number, isequip: number, gempos: number): void {
			RequesterProtocols._instance.c2s_CDel_Gem(keyinpack, isequip, gempos);
		}

		/**
		 * 宝石替换
		 * @param equipItemkey 装备道具key
		 * @param isBquipBag 是否为装备背包 1：是，0：不是
		 * @param gemIndex 装备可镶嵌宝石的第几个位置
		 * @param gemItemkey 要镶嵌宝石在背包中的key
		 */
		public CReplaceGemFromEquip(equipItemkey, isBquipBag, gemIndex, gemItemkey) {
			RequesterProtocols._instance.c2s_CReplaceGemFrom_Equip(equipItemkey, isBquipBag, gemIndex, gemItemkey);
		}

	}
}