
var tipsModel = game.modules.tips.models.TipsModel;
module game.modules.tips {
    /** 单个物品详情tips */
    export class EquipTipsMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.component.EquipTipsUI;
        /**杂货表数据 */
        groceryEffectData = game.modules.strengThening.models.StrengTheningModel._instance.groceryEffectData;
        /**复合表 */
        itemAttrData = BagModel.getInstance().itemAttrData;
        /**宝石表 */
        gemEffectData = game.modules.strengThening.models.StrengTheningModel._instance.gemEffectData;
        /**道具类型表 */
        itemTypeData = game.modules.strengThening.models.StrengTheningModel._instance.itemTypeData;
        /**装备表 */
        equipEffectData = game.modules.strengThening.models.StrengTheningModel._instance.equipEffectData;
        /**装备表2 */
        equipItemAttrData = game.modules.strengThening.models.StrengTheningModel._instance.equipItemAttrData;
        /**装备的属性和附加属性 */
        equipTips = StrengTheningModel.getInstance().equipTips;
        /**装备附加属性库 */
        equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
        /**属性效果id表 */
        attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
        /**装备生成基本属性表 */
        equipIteminfoData = StrengTheningModel.getInstance().equipIteminfoData;
        /**装备附加属性库by skill */
        equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        /**客户端信息提示表 */
        chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
        /**t特技特效显示表 */
        equipSkillData = game.modules.tips.models.TipsModel._instance.equipSkillData;
        /**职业配置表 */
        schoolInfo = LoginModel.getInstance().schoolInfo;
        /**职业创建表 */
        createRoleConfigBinDic = game.modules.createrole.models.LoginModel.getInstance().createRoleConfigBinDic;
        /**洗练 */
        private _EquipWashPractiseMediator: game.modules.tips.EquipWashPractiseMediator;
        /**重铸 */
        private _EquipRecastMediator: game.modules.tips.EquipRecastMediator;
        /**洗特技 */
        private _EuipWashStuntMediator: game.modules.tips.EuipWashStuntMediator;
        /** 飘动提示窗口 */
        private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
        /** 道具名称，供某些道具进行某些操作时，弹出二次确认框时使用 */
        private itemName: string = "";
        /**装备基础属性，用于显示详情信息 */
        baseAttr: Dictionary;
        /**特效.用于显示详情信息 */
        effect = null;
        /**特技，拥有显示详情信息 */
        skill = null;
        /**洗练界面 */
        jumpXilianPage = 2;

        parame = new Laya.Dictionary();
        equipId = -1;
        key = -1;
        packid = -1;
        equipdType = -1;
        access = -1;
        ItemPurpose = -1;
        /**最小的高度 */
        minHtmlHeight = 120;
        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.component.EquipTipsUI();
            this.isCenter = false;
            this._app = app;
        }

		/**
		 * 背包中显示装备的详细信息
		 * @param itemId 物品id
		 */
        public showItemTips(parame, WearId): void {
            this.parame = parame;
            this._viewUI.xiangqing.visible = false;
            this._viewUI.morebtn_list.visible = false;
            var itemId = parame.get("itemId");
            var key = parame.get("key");
            var packid = parame.get("packid");
            var equiptype = parame.get("equiptype");
            this.equipId = itemId;
            this.key = key;
            this.packid = packid;
            this.equipdType = equiptype;
            var destribe = this.itemAttrData[itemId].destribe;   //描述
            var effectdes = this.itemAttrData[itemId].effectdes;  //功能说明
            var itemName = this.itemAttrData[itemId].name; //物品名称
            this.itemName = itemName;
            var itemtypeid = this.itemAttrData[itemId].itemtypeid;  //类型
            var itemtypeName = this.itemTypeData[itemtypeid].name;  //类型名
            var iconid = this.itemAttrData[itemId].icon;  //iconid
            var itemIcon = SaleModel.getInstance().getIcon(iconid);  //icon
            var nquality = this.itemAttrData[itemId].nquality;   //品质
            var colour = this.itemAttrData[itemId].colour;
            var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
            var bBind = this.itemAttrData[itemId].bBind;
            if (bBind) {
                this._viewUI.bBind_img.visible = true;
            } else {
                this._viewUI.bBind_img.visible = false;
            }
            var mLevel = game.modules.createrole.models.LoginModel.getInstance().roleDetail.level;  //玩家等级
            var equLevel = this.itemAttrData[itemId].level;  //装备等级
            var needCareer = this.equipEffectData[itemId].needCareer;  //装备职业需求
            var school = game.modules.createrole.models.LoginModel.getInstance().roleDetail.school;  //职业
            var carrerArr = needCareer.split(";");
            this._viewUI.isCanWear_img.visible = false;
            var sexNeed = this.equipEffectData[itemId].sexNeed;
            var shape = game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape;  //角色id
            var sex = this.createRoleConfigBinDic[shape].sex
            if (this.packid != BagTypes.EQUIP && this.packid != BagTypes.PETEQUIP)//显示可装备的标准判断，如果是装备背包、宠物装备背包中则不需要判断 , 不显示
            {
                if (mLevel >= equLevel && sexNeed == sex || sexNeed == 0 || needCareer == "0") {
                    for (var i = 0; i < carrerArr.length; i++) {
                        if (parseInt(carrerArr[i]) == school || needCareer == "0") {
                            this._viewUI.isCanWear_img.visible = true;
                        }
                    }
                }
            }
            if (this.packid == BagTypes.BAG && tips.models.TipsModel.getInstance().whichView != ModuleNames.PET) {
                this._viewUI.isCanWear_img.visible = false;//为了让在背包显示宠物装备时，不显示出可装备的小图标
            }
            this._viewUI.equiName_label.text = itemName;
            this._viewUI.equiName_label.color = colour;
            this._viewUI.equipType_label.text = tipsModel.stringType.equipType + itemtypeName;
            this._viewUI.equipLevel_label.text = this.cstringResConfigData[1].msg + this.itemAttrData[itemId].level;
            this._viewUI.kuang_img.skin = itemnquality;
            this._viewUI.equipIcon_img.skin = itemIcon + "";

            if (WearId > 0) {
                var wearKey = this.isWearCurrentEqu(itemId);
                this.showAttr(itemId, wearKey, BagTypes.EQUIP);
                this._viewUI.more_btn.on(LEvent.MOUSE_DOWN, this, this.onMoreBtn, [itemId, key, packid, 1]);
                this.setTipsBtn();
            } else {
                this.showAttr(itemId, key, packid);
                this._viewUI.more_btn.on(LEvent.MOUSE_DOWN, this, this.onMoreBtn, [itemId, key, packid, 0]);
                this.setWearEquipTipsBtn();
            }
            if (packid == null) {
                this._viewUI.btn_box.visible = false;
                this._viewUI.isCanWear_img.visible = false;
            }
            if (packid != BagTypes.TEMP) {
                this._viewUI.xiangq_btn.on(LEvent.MOUSE_DOWN, this, this.onXangqBtn, [itemId]);
                this._viewUI.zhuangbei_btn.on(LEvent.MOUSE_DOWN, this, this.onZBBtn, [sexNeed, shape, parame]);
                this._viewUI.access_btn.on(LEvent.MOUSE_DOWN, this, this.onAccessEvent, [parame]);
            } else {
                this._viewUI.more_btn.disabled = true;
                this._viewUI.zhuangbei_btn.label = this.cstringResConfigData[2916].msg;
                this._viewUI.zhuangbei_btn.on(LEvent.MOUSE_DOWN, this, this.temporaryequip, [BagTypes.TEMP, key, 1, 1]);
            }
        }

        /**拍卖行显示装备详细信息 */
        public showAuctionItemTips(parame): void {
            this._viewUI.xiangqing.visible = false;
            this._viewUI.morebtn_list.visible = false;
            var itemId = parame.get("itemId");
            var key = parame.get("key");
            var packid = parame.get("packid");
            var equiptype = parame.get("equiptype");
            this.equipId = itemId;
            this.key = key;
            this.packid = packid;
            this.equipdType = equiptype;
            var destribe = this.itemAttrData[itemId].destribe;   //描述
            var effectdes = this.itemAttrData[itemId].effectdes;  //功能说明
            var itemName = this.itemAttrData[itemId].name; //物品名称
            this.itemName = itemName;
            var itemtypeid = this.itemAttrData[itemId].itemtypeid;  //类型
            var itemtypeName = this.itemTypeData[itemtypeid].name;  //类型名
            var iconid = this.itemAttrData[itemId].icon;  //iconid
            var itemIcon = SaleModel.getInstance().getIcon(iconid);  //icon
            var nquality = this.itemAttrData[itemId].nquality;   //品质
            var colour = this.itemAttrData[itemId].colour;
            var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
            var bBind = this.itemAttrData[itemId].bBind;
            if (bBind) {
                this._viewUI.bBind_img.visible = true;
            } else {
                this._viewUI.bBind_img.visible = false;
            }
            var mLevel = game.modules.createrole.models.LoginModel.getInstance().roleDetail.level;  //玩家等级
            var equLevel = this.itemAttrData[itemId].level;  //装备等级
            var needCareer = this.equipEffectData[itemId].needCareer;  //装备职业需求
            var school = game.modules.createrole.models.LoginModel.getInstance().roleDetail.school;  //职业
            var carrerArr = needCareer.split(";");
            this._viewUI.isCanWear_img.visible = false;
            var sexNeed = this.equipEffectData[itemId].sexNeed;
            var shape = game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape;  //角色id
            var sex = this.createRoleConfigBinDic[shape].sex
            if (this.packid != BagTypes.EQUIP)//显示可装备的标准判断，如果是装备背包中则不需要判断 , 不显示
            {
                if (mLevel >= equLevel && sexNeed == sex || sexNeed == 0 || needCareer == "0") {
                    for (var i = 0; i < carrerArr.length; i++) {
                        if (parseInt(carrerArr[i]) == school || needCareer == "0") {
                            this._viewUI.isCanWear_img.visible = true;
                        }
                    }
                }
            }

            this._viewUI.equiName_label.text = itemName;
            this._viewUI.equiName_label.color = colour;
            this._viewUI.equipType_label.text = tipsModel.stringType.equipType + itemtypeName;
            this._viewUI.equipLevel_label.text = this.cstringResConfigData[1].msg + this.itemAttrData[itemId].level;
            this._viewUI.kuang_img.skin = itemnquality;
            this._viewUI.equipIcon_img.skin = itemIcon + "";
            this.showAuctionItem(itemId, key);
            this._viewUI.more_btn.on(LEvent.MOUSE_DOWN, this, this.onMoreBtn, [itemId, key, packid, 0]);
            this.setWearEquipTipsBtn();
            if (packid == null) {
                this._viewUI.btn_box.visible = false;
                this._viewUI.isCanWear_img.visible = false;
            }
            this._viewUI.xiangq_btn.on(LEvent.MOUSE_DOWN, this, this.onXangqBtn, [itemId]);
            this._viewUI.zhuangbei_btn.on(LEvent.MOUSE_DOWN, this, this.onZBBtn, [parame]);
            this._viewUI.access_btn.on(LEvent.MOUSE_DOWN, this, this.onAccessEvent, [parame]);
        }


        /**设置人物身上穿的装备tips的btn显示 */
        public setTipsBtn() {
            this._viewUI.more_btn.label = this.cstringResConfigData[126].msg;
            this._viewUI.zhuangbei_btn.label = this.cstringResConfigData[2667].msg;
        }

        /**设置按钮的值 */
        public setWearEquipTipsBtn() {
            this._viewUI.more_btn.label = this.cstringResConfigData[11045].msg;
            this._viewUI.zhuangbei_btn.label = this.cstringResConfigData[2666].msg;
        }

        /**显示宠物装备 */
        public showpetequip(itemId, key, packid, equipdType, parame): void {
            this._viewUI.xiangqing.visible = false;
            this._viewUI.morebtn_list.visible = false;
            // this._viewUI.zhuangbei_btn.visible = false
            // this._viewUI.more_btn.visible = false
            this._viewUI.more_btn.gray = true;
            this._viewUI.more_btn.mouseEnabled = false
            this.equipId = itemId;
            this.key = key;
            this.packid = packid;
            this.equipdType = equipdType;
            var itemName = this.itemAttrData[itemId].name; //物品名称
            var itemtypeid = this.itemAttrData[itemId].itemtypeid;  //类型
            var itemtypeName = this.itemTypeData[itemtypeid].name;  //类型名
            var iconid = this.itemAttrData[itemId].icon;  //iconid
            var itemIcon = SaleModel.getInstance().getIcon(iconid);  //icon
            var nquality = this.itemAttrData[itemId].nquality;   //品质
            var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
            var sexNeed = this.equipEffectData[this.equipId].sexNeed;    //装备性别需求
            var shape = game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape;  //角色id
            var bBind = this.itemAttrData[itemId].bBind;
            if (bBind) {  //是否绑定
                this._viewUI.bBind_img.visible = true;
            } else {
                this._viewUI.bBind_img.visible = false;
            }
            this._viewUI.isCanWear_img.visible = false;
            this._viewUI.equiName_label.text = itemName;
            this._viewUI.equipType_label.text = tipsModel.stringType.equipType + itemtypeName;
            this._viewUI.equipLevel_label.text = this.cstringResConfigData[1].msg + this.itemAttrData[itemId].level;
            this._viewUI.kuang_img.skin = itemnquality;
            this._viewUI.equipIcon_img.skin = itemIcon + "";
            this.showAttr(itemId, key, packid);
            this._viewUI.zhuangbei_btn.label = this.cstringResConfigData[2667].msg;
            if (nquality == 1) {
                this._viewUI.more_btn.label = this.cstringResConfigData[11044].msg;
            }
            else {
                this._viewUI.more_btn.label = this.cstringResConfigData[11045].msg;
            }
            this._viewUI.xiangq_btn.on(LEvent.MOUSE_DOWN, this, this.onXangqBtn, [itemId]);
            this._viewUI.more_btn.on(LEvent.MOUSE_DOWN, this, this.onMoreBtn, [itemId, key, packid]);
            this._viewUI.zhuangbei_btn.on(LEvent.MOUSE_DOWN, this, this.onZBBtn, [sexNeed, shape, parame, 1]);
        }

        /**点击装备按钮 */
        public onZBBtn(sexNeed: number, shape: number, parame: Laya.Dictionary, num?: number) {
            if (this.ItemPurpose == ItemPurpose.ITEM_TRANSFER) {/** 转移 */
                let num = -1;
                let depotId = -1;
                let dstPos = -1;
                let npcId = -1;
                RequesterProtocols._instance.c2s_CTrans_Item(BagTypes.TEMP, this.key, num, BagTypes.BAG, dstPos, depotId, npcId);
            } else if (tipsModel._instance.isPetEquip(this.equipId)) {  //当前装备是否为宠物装备
                /** 宠物专用 */
                // RequesterProtocols._instance.c2s_CPutOnPet_Equip(this.key,game.modules.pet.models.PetModel.getInstance().petbasedata.key,this.equipdType)
                let petNum = game.modules.pet.models.PetModel.getInstance().pets.keys.length;
                if (petNum == 0) {/** 没有宠物，弹窗提示 先自己手写，后面统一放入配置表取*/
                    let prompt = this.chatMessageTips[150078].msg;
                    this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                    this.DisappearMessageTipsMediator.onShow(prompt);
                } else {
                    if (PetModel.getInstance().tabnum == 0 && PetModel.getInstance().changexilian == this.jumpXilianPage) { //是否跳转到洗练界面
                        //判断是装备还是脱下
                        if (num == 1) {
                            RequesterProtocols._instance.c2s_CTakeOffPet_Equip(this.key, PetModel._instance.petbasedata.key, this.equipdType)
                        }
                        else {
                            RequesterProtocols._instance.c2s_CPutOnPet_Equip(this.key, PetModel._instance.petbasedata.key, this.equipdType);
                        }
                    }
                    else {
                        PetModel.getInstance().tabnum = 0;
                        PetModel.getInstance().changexilian = this.jumpXilianPage;
                        ModuleManager.show(ModuleNames.PET, this._app);
                        ModuleManager.hide(ModuleNames.BAG);
                        LoginModel.getInstance().CommonPage = "Bag";
                    }
                }
            } else if (sexNeed != shape && sexNeed != 0) { //是否可以装备 0通用 1男性装备 2女性装备
                this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[100066].msg);
            } else {
                if (this._viewUI.zhuangbei_btn.label == this.cstringResConfigData[2667].msg) {  //人物身上装备卸下
                    /** 脱下装备请求 */
                    RequesterProtocols._instance.c2s_CTakeOff_Equip(this.key, this.equipdType);
                } else if (this._viewUI.zhuangbei_btn.label == this.cstringResConfigData[2666].msg) {
                    RequesterProtocols._instance.c2s_CPutOn_Equip(this.key, this.equipdType);
                }
            }
            this.closeWindow();
        }

        /** 存取按钮点击事件 */
        private onAccessEvent(parame: Laya.Dictionary): void {
            let depotId = parame.get("currdepot");
            let num = -1;
            let dstPos = -1;
            let npcId = -1;
            bagModel.getInstance().currDepotId = depotId;
            if (this.access == 1) {/** 存入协议 */
                RequesterProtocols._instance.c2s_CTrans_Item(BagTypes.BAG, this.key, num, BagTypes.DEPOT, dstPos, depotId, npcId);
            } else if (this.access == 2) {/** 取出协议 */
                depotId = -1;
                RequesterProtocols._instance.c2s_CTrans_Item(BagTypes.DEPOT, this.key, num, BagTypes.BAG, dstPos, depotId, npcId);
            }
            this.closeWindow();
        }

        /** 关闭界面 */
        private closeWindow(): void {
            models.TipsProxy.getInstance().event(models.CLOSE_TIPS);
        }

        /**
         * 
         * 装备的属性信息
         * @param itemId 装备id
         * @param key  装备的key
         * @param packid  背包id
         */
        public showAttr(itemId, key, packid) {
            let html = "";
            let _itemType = BagModel.getInstance().getItemTotalType(itemId);
            if (_itemType == ItemTotalType.PetEquipItem) {//是宠物装备
                let equipTips = this.equipTips;
                let petEquipTips;
                for (var i = 0; i < equipTips.length; i++) {
                    let _tipsPackid = equipTips[i].packid;  //背包id
                    let _tipsKey = equipTips[i].keyinpack;  //key
                    if (_tipsPackid == packid && _tipsKey == key) {
                        petEquipTips = equipTips[i];
                        break;
                    }
                }
                if (!petEquipTips) {
                    if (packid == BagTypes.PETEQUIP) {
                        tips.models.TipsProxy.getInstance().once(tips.models.PETEQUIPTIPS, this, this.showAttr, [itemId, key, packid]);
                        RequesterProtocols._instance.c2s_CGetPetEquip_Tips(pet.models.PetModel._instance.petbasedata.key, key);
                    }
                    else if (packid == BagTypes.DEPOT || packid == BagTypes.TEMP) {
                        createrole.models.LoginProxy.getInstance().once(createrole.models.GetItemTips_EVENT, this, this.showAttr, [itemId, key, packid]);
                        RequesterProtocols._instance.c2s_CGetItem_Tips(packid, key);
                    }
                    return;
                }
                if (!petEquipTips) return;
                let petEquipSkill = petEquipTips.tips.skill;
                if (petEquipSkill) { //宠物装备特技
                    this.skill = petEquipSkill;
                    var petEquipSkill_name = this.equipAddattributelibDataBySkill[petEquipSkill].name;
                    var color = this.equipAddattributelibDataBySkill[petEquipSkill].namecolour;
                    html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11002].msg + "&nbsp;" + petEquipSkill_name + "</span><br/>";
                }

                let petEquipEffect = petEquipTips.tips.effect;
                if (petEquipEffect) { //特效
                    this.effect = effect;
                    var petEquipEffect_name = this.equipAddattributelibDataBySkill[petEquipEffect].name;
                    var color = this.equipAddattributelibDataBySkill[petEquipEffect].namecolour;
                    html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11003].msg + "&nbsp;" + petEquipEffect_name + "</span><br/>";
                }

                let suiting = StrengTheningModel.getInstance().equipEffectData[itemId].suiting;//获得该宠物装备所对应的套装id
                let _petSuitBuffData = PetModel.getInstance().petSuitBuffData[suiting];
                if (_petSuitBuffData) {//如果有宠物装备套装效果
                    let haveSuitNum = 0;//已集齐的宠物套装数量
                    if (packid == BagTypes.PETEQUIP) {
                        let suits = [_petSuitBuffData.item1, _petSuitBuffData.item2, _petSuitBuffData.item3, _petSuitBuffData.item4];//存放宠物装备套装装备id的数值
                        let petEquipBag = BagModel.getInstance().bagMap[packid];
                        let petKey = PetModel.getInstance().petbasedata.key;
                        let items = petEquipBag.get(petKey).items;//存放宠物身上装备背包的道具数据的数组
                        for (let i = 0; i < items.length; i++) {
                            let petEquipItemId = items[i].id;
                            if (petEquipItemId == suits[0] || petEquipItemId == suits[1] || petEquipItemId == suits[2] || petEquipItemId == suits[3]) {
                                haveSuitNum++;
                            }
                        }
                    }
                    let petSuitName = _petSuitBuffData.name;//宠物套装名字
                    html = "<span style='color:#FBDC47;fontSize:24'>" + petSuitName + "</span><br/>";
                    html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    let petSuitProp = _petSuitBuffData.prop;////宠物套装效果
                    if (haveSuitNum == 4) {//宠物套装装备集齐，则紫色显示
                        html += "<span style='color:#FE46EF;fontSize:24'>&nbsp;&nbsp;&nbsp;&nbsp;" + petSuitProp + "&nbsp;&nbsp;&nbsp;&nbsp; " + haveSuitNum + "/4</span><br/>";
                    }
                    else {
                        html += "<span style='color:#FFFFFF;fontSize:24'>&nbsp;&nbsp;&nbsp;&nbsp;" + petSuitProp + "&nbsp;&nbsp;&nbsp;&nbsp; " + haveSuitNum + "/4</span><br/>";
                    }
                }
                let petEquipScore = petEquipTips.tips.equipscore;//宠物装备评分
                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[111].msg + "" + 0 + "</span><br/>";

                let petEquipDestribe = this.itemAttrData[itemId].destribe; //宠物装备描述
                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                html += "<span style='color:#FFFFFF;fontSize:24'>" + petEquipDestribe + "</span><br/>";
                this.setHtml_innerHTML(html);
                return;
            }
            html = "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[122].msg + "</span><br/>";
            if (packid == -1) {
                this.showOtherItem(itemId, key, false);
            }
            else if (packid == null) {
                this.showOtherItem(itemId, key, true);
            }
            else {
                for (var i = 0; i < this.equipTips.length; i++) {
                    var equPackid = this.equipTips[i].packid;   //背包id
                    var equKey = this.equipTips[i].keyinpack;  //装备的key
                    if (equPackid == packid && equKey == key) {
                        var baseAttr = this.equipTips[i].tips.baseAttr;
                        var addAttr = this.equipTips[i].tips.addAttr;
                        var diamond = this.equipTips[i].tips.diamondID as Array<number>;
                        var skill = this.equipTips[i].tips.skill;
                        var effect = this.equipTips[i].tips.effect;
                        //基础属性
                        if (baseAttr != null) {
                            this.baseAttr = baseAttr;
                            var baseAttrKeys = baseAttr.keys;
                            for (var j = 0; j < baseAttrKeys.length; j++) {
                                var baseAttrId = baseAttrKeys[j];   //基础属性的id
                                var baseAttrValue = baseAttr.get(baseAttrId);  //值
                                var attrName = "";
                                if (baseAttrValue > 0) {
                                    attrName = this.attributeDesConfigData[baseAttrKeys[j]].numpositivedes;
                                } else {
                                    attrName = this.attributeDesConfigData[baseAttrKeys[j]].numnegativedes;
                                }
                                var baseAttrName = attrName.replace("$parameters$", baseAttrValue);
                                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                                html += "<span style='fontSize:24;color:#fff2df'>&nbsp;&nbsp;" + baseAttrName + "</span><br/>";
                            }
                        }
                        //宝石属性
                        if (diamond.length != 0) {
                            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                            html += "<span style='color:#FBDC47;fontSize:24'>宝石属性</span><br/>";
                            for (let _index = 0; _index < diamond.length; _index++) {
                                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                                html += "<span style='color:#FBDC47;fontSize:24'>&nbsp;&nbsp;" + this.itemAttrData[diamond[_index]].name + "</span>&nbsp;&nbsp;&nbsp;<span style='color:#FBDC47;fontSize:24'>" + this.itemAttrData[diamond[_index]].effectdes + "</span><br/>";
                            }

                        }
                        //附加属性
                        if (addAttr != null) {
                            var addAttrKeys = addAttr.keys;
                            for (var k = 0; k < addAttrKeys.length; k++) {
                                var addAttrId = addAttrKeys[k];
                                var addAttrValue = addAttr.get(addAttrId);
                                var name = this.equipAddattributelibData[addAttrId].name;
                                var tipname = "";
                                if (addAttrValue > 0) {
                                    tipname = name + "+" + addAttrValue;
                                } else {
                                    tipname = name + addAttrValue;
                                }
                                var color = this.equipAddattributelibData[addAttrId].namecolour;
                                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                                html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + tipname + "</span><br/>";
                            }
                        }
                        //特技
                        if (skill) {
                            this.skill = skill;
                            var name = this.equipAddattributelibDataBySkill[skill].name;
                            var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                            html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11002].msg + "&nbsp;" + name + "</span><br/>";
                        }
                        //特效
                        if (effect) {
                            this.effect = effect;
                            var name = this.equipAddattributelibDataBySkill[effect].name;
                            var color = this.equipAddattributelibDataBySkill[effect].namecolour;
                            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                            html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11003].msg + "&nbsp;" + name + "</span><br/>";
                        }
                        //附魔后临时加成
                        let fuMoShuXingData = this.equipTips[i].tips.enhancement;
                        html += tips.models.TipsModel.getInstance().getFuMoHtmlStr(fuMoShuXingData);

                        var endure = this.equipTips[i].tips.endure; //耐久
                        html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                        html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[11000].msg + ":" + endure + "</span><br/>";
                        var equipscore = this.equipTips[i].tips.equipscore;//评分
                        html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                        html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[111].msg + "" + equipscore + "</span><br/>";

                        var sexNeed = this.equipEffectData[itemId].sexNeed;
                        var shape = game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape;  //角色id
                        var sex = this.createRoleConfigBinDic[shape].sex;
                        if (sexNeed != 0) {
                            var sexDesc = "";
                            var sexColor = "";
                            if (sexNeed == 1) {
                                sexDesc = this.cstringResConfigData[132].msg;
                            } else {
                                sexDesc = this.cstringResConfigData[133].msg;
                            }
                            if (sexNeed == sex) {
                                sexColor = "#FBDC47";
                            } else {
                                sexColor = "#FF2800";
                            }
                            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                            html += "<span style='color:" + sexColor + ";fontSize:24'>" + sexDesc + "</span><br/>";
                        }
                        var needCareer = this.equipEffectData[itemId].needCareer;
                        var school = game.modules.createrole.models.LoginModel.getInstance().roleDetail.school;  //职业
                        var carrerArr = needCareer.split(";");
                        if (needCareer != "0") {
                            var m_school = "";
                            for (var s in carrerArr) {
                                m_school += this.schoolInfo[carrerArr[s]].name + "  ";
                            }
                            var a = carrerArr.indexOf(school);
                            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                            if (carrerArr.indexOf(school + "") >= 0) {
                                html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[11431].msg + ":" + m_school + "</span><br/>";
                            } else {
                                html += "<span style='color:#FF2800;fontSize:24'>" + this.cstringResConfigData[11431].msg + ":" + m_school + "</span><br/>";
                            }
                        }
                        var destribe = this.itemAttrData[itemId].destribe; //描述
                        html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                        html += "<span style='color:#FBDC47;fontSize:24'>" + destribe + "</span><br/>";

                        let _itemData: bag.models.ItemVo;
                        if (packid == BagTypes.DEPOT) {
                            let depotId = this.parame.get("currdepot");
                            _itemData = BagModel.getInstance().getItemInfoData(packid, itemId, key, depotId);
                        }
                        else {
                            _itemData = BagModel.getInstance().getItemInfoData(packid, itemId, key);
                        }
                        if (_itemData && BagModel.getInstance().itemIsBind(_itemData.flags)) {

                            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                            let cStr = tipsModel.getInstance().cstringResConfigData[11350]["msg"];
                            html += "<span style='color:#FBDC47;fontSize:24'>" + cStr + "</span><br/>";
                        }
                    }
                }
                this.setHtml_innerHTML(html);
            }
        }

        /** 设置富文本内容 */
        private setHtml_innerHTML(html): void {
            let mHtml = this._viewUI.attrbuite_html;
            mHtml.innerHTML = html;
            let htmlheight = mHtml.height;
            if (htmlheight > this.minHtmlHeight) {
                let bgHeight = this._viewUI.bg_img.height;
                this._viewUI.bg_img.height = bgHeight - 120 + htmlheight;
            }
            this._viewUI.box.centerY = -180;
        }

        /**
        * 背包3中装备的key
        * @param itemId 
        */
        public isWearCurrentEqu(itemId: number) {
            var eequiptype = this.equipEffectData[itemId].eequiptype;   //选中装备的部件id
            var bag3 = bagModel.getInstance().bagMap[BagTypes.EQUIP];  //获取背包3
            var items = bag3.items;
            for (var i = 0; i < items.length; i++) {
                var id = items[i].id;
                if (eequiptype == this.equipEffectData[id].eequiptype) {
                    var key = items[i].key;
                    return key;
                }
            }
            return -1;
        }

        /** 查看别人的装备tips */
        private showOtherItem(itemId: number, key: number, isShowOtherEqu): void {
            var html = "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[122].msg + "</span><br/>";
            let equipDetail = null;
            // var equPackid = equipDetail.packid;   //背包id
            // var equKey = equipDetail.keyinpack;  //装备的key
            var baseAttr = null;
            var addAttr = null;
            var skill = null;
            var effect = null;
            var endure = null; //耐久            
            var equipscore = null;//评分
            if (isShowOtherEqu) {
                equipDetail = game.modules.team.models.TeamModel.getInstance().roleEquipData.tips;
                if (!equipDetail) {//可能是珍品回收那边查看装备道具信息
                    equipDetail = bag.models.BagModel.getInstance().equipItemRecoverInfoTips;
                    baseAttr = equipDetail.baseAttr;
                    addAttr = equipDetail.addAttr;
                    skill = equipDetail.skill;
                    effect = equipDetail.effect;
                    endure = equipDetail.endure;
                    equipscore = equipDetail.equipscore;
                }
                else {
                    baseAttr = equipDetail.get(key).baseAttr;
                    addAttr = equipDetail.get(key).addAttr;
                    skill = equipDetail.get(key).skill;
                    effect = equipDetail.get(key).effect;
                    endure = equipDetail.get(key).endure;
                    equipscore = equipDetail.get(key).equipscore;
                }
            } else {
                equipDetail = ChatModel.getInstance().chatTips[ChatModel.getInstance().chatTips.length - 1];
                var equPackid = equipDetail.packid;   //背包id
                var equKey = equipDetail.keyinpack;  //装备的key
                baseAttr = equipDetail.tips.baseAttr;
                addAttr = equipDetail.tips.addAttr;
                skill = equipDetail.tips.skill;
                effect = equipDetail.tips.effect;
                endure = equipDetail.tips.endure;
                equipscore = equipDetail.tips.equipscore;
            }
            if (baseAttr != null) {
                this.baseAttr = baseAttr;
                var baseAttrKeys = baseAttr.keys;
                for (var j = 0; j < baseAttrKeys.length; j++) {
                    var baseAttrId = baseAttrKeys[j];   //基础属性的id
                    var baseAttrValue = baseAttr.get(baseAttrId);  //值
                    var baseAttrName = this.attributeDesConfigData[baseAttrKeys[j]].name + "+" + baseAttrValue;
                    html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
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
                    html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + tipname + "</span><br/>";
                }
            }

            if (skill) {
                this.skill = skill;
                var name = this.equipAddattributelibDataBySkill[skill].name;
                var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11002].msg + "&nbsp;" + name + "</span><br/>";
            }
            if (effect) {
                this.effect = effect;
                var name = this.equipAddattributelibDataBySkill[effect].name;
                var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11003].msg + "&nbsp;" + name + "</span><br/>";
            }
            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
            html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[11000].msg + ":" + endure + "</span><br/>";
            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
            html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[111].msg + "" + equipscore + "</span><br/>";
            var destribe = this.itemAttrData[itemId].destribe; //描述
            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
            html += "<span style='color:#FBDC47;fontSize:24'>" + destribe + "</span><br/>";
            var mHtml = this._viewUI.attrbuite_html;
            mHtml.innerHTML = html;
            var htmlheight = mHtml.height;
            if (htmlheight > this.minHtmlHeight) {
                var bgHeight = this._viewUI.bg_img.height;
                this._viewUI.bg_img.height = bgHeight - 120 + htmlheight;
            }
            this._viewUI.box.centerY = -180;
        }

        /**拍卖行查看别人装备 */
        private showAuctionItem(itemId: number, key: number): void {
            var html = "";
            let equipDetail = null;
            var baseAttr = null;
            var addAttr = null;
            var skill = null;
            var effect = null;
            var endure = null; //耐久            
            var equipscore = null;//评分

            equipDetail = game.modules.sale.models.SaleModel.getInstance().SOtherItemTipsDsc.get("tips");
            baseAttr = equipDetail.baseAttr;            //基础属性
            addAttr = equipDetail.addAttr;              //附加属性
            skill = equipDetail.skill;                  //技能
            effect = equipDetail.effect;                //特效
            endure = equipDetail.endure;                //耐久度
            equipscore = equipDetail.equipscore;        //装备评分

            if (baseAttr != null) {
                this.baseAttr = baseAttr;
                var baseAttrKeys = baseAttr.keys;
                for (var j = 0; j < baseAttrKeys.length; j++) {
                    var baseAttrId = baseAttrKeys[j];   //基础属性的id
                    var baseAttrValue = baseAttr.get(baseAttrId);  //值
                    var baseAttrName = this.attributeDesConfigData[baseAttrKeys[j]].name + "+" + baseAttrValue;
                    html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[122].msg + "</span><br/>";
                    html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
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
                    html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + tipname + "</span><br/>";
                }
            }

            if (skill) {
                this.skill = skill;
                var name = this.equipAddattributelibDataBySkill[skill].name;
                var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11002].msg + "&nbsp;" + name + "</span><br/>";
            }
            if (effect) {
                this.effect = effect;
                var name = this.equipAddattributelibDataBySkill[effect].name;
                var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11003].msg + "&nbsp;" + name + "</span><br/>";
            }
            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
            html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[11000].msg + ":" + endure + "</span><br/>";
            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
            html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[111].msg + "" + equipscore + "</span><br/>";
            var destribe = this.itemAttrData[itemId].destribe; //描述
            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
            html += "<span style='color:#ffffff;fontSize:24'>" + destribe + "</span><br/>";
            var mHtml = this._viewUI.attrbuite_html;
            mHtml.innerHTML = html;
            var htmlheight = mHtml.height;
            if (htmlheight > this.minHtmlHeight) {
                var bgHeight = this._viewUI.bg_img.height;
                this._viewUI.bg_img.height = bgHeight - 120 + htmlheight;
            }
            this._viewUI.box.centerY = -180;
        }


        /**
         * 点击装备详情按钮
         */
        public onXangqBtn(equid: number) {
            if (!this._viewUI.xiangqing.visible) {
                this._viewUI.xiangqing.visible = true;
                var htmlArr = this.getBaseAttr(this.baseAttr, this.attributeDesConfigData, this.equipIteminfoData, equid);
                var mHtml = this._viewUI.equipAttr_html;
                mHtml.innerHTML = htmlArr[0];
                this._viewUI.fanwei_html.innerHTML = htmlArr[1];
                var htmlheight = mHtml.height;
                if (htmlheight > this.minHtmlHeight) {
                    var bgHeight = this._viewUI.xiangqing.height;
                    this._viewUI.xiangqing.height = bgHeight - 120 + htmlheight;
                }
                this._viewUI.box.centerY = 0;
            }
        }




        /**显示基础属性 */
        public getBaseAttr(baseAttr, attributeDesConfigData, equipIteminfoData, equid) {
            var html = "";
            var html2 = "";
            if (baseAttr != null) {
                var baseAttrKeys = baseAttr.keys;
                for (var i = 0; i < baseAttrKeys.length; i++) {
                    var baseAttrId = baseAttrKeys[i];    //基础属性的id
                    var baseAttrValue = baseAttr.get(baseAttrId);  //基础属性的值
                    var baseAttrName = attributeDesConfigData[baseAttrKeys[i]].name + "+" + baseAttrValue;
                    html += "<span style='fontSize:10'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html2 += "<span style='fontSize:10'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    var shuxing1id = equipIteminfoData[equid].shuxing1id;
                    var shuxing2id = equipIteminfoData[equid].shuxing2id;
                    var shuxing3id = equipIteminfoData[equid].shuxing3id;
                    if (baseAttrId == shuxing1id) {
                        var shuxing1bodongduanmin = equipIteminfoData[equid].shuxing1bodongduanmin;
                        var min = shuxing1bodongduanmin[0]
                        var shuxing1bodongduanmax = equipIteminfoData[equid].shuxing1bodongduanmax;
                        var max = shuxing1bodongduanmax[shuxing1bodongduanmax.length - 1];
                        html += "<span style='fontSize:24;color:#fff2df'>&nbsp;&nbsp;" + baseAttrName + "</span><br/>";
                        html2 += "<span style='fontSize:24;color:#fff2df'>&nbsp;&nbsp;" + min + "一" + max + "</span><br/>";
                    } else if (baseAttrId == shuxing2id) {
                        var shuxing2bodongduanmin = equipIteminfoData[equid].shuxing2bodongduanmin;
                        var min = shuxing2bodongduanmin[0]
                        var shuxing2bodongduanmax = equipIteminfoData[equid].shuxing2bodongduanmax;
                        var max = shuxing2bodongduanmax[shuxing2bodongduanmax.length - 1];
                        html += "<span style='fontSize:24;color:#fff2df'>&nbsp;&nbsp;" + baseAttrName + "</span><br/>";
                        html2 += "<span style='fontSize:24;color:#fff2df'>&nbsp;&nbsp;" + min + "一" + max + "</span><br/>";
                    } else if (baseAttrId == shuxing3id) {
                        var shuxing3bodongduanmin = equipIteminfoData[equid].shuxing3bodongduanmin;
                        var min = shuxing3bodongduanmin[0]
                        var shuxing3bodongduanmax = equipIteminfoData[equid].shuxing3bodongduanmax;
                        var max = shuxing3bodongduanmax[shuxing3bodongduanmax.length - 1];
                        html += "<span style='fontSize:24;color:#fff2df'>&nbsp;&nbsp;" + baseAttrName + "</span><br/>";
                        html2 += "<span style='fontSize:24;color:#fff2df'>&nbsp;&nbsp;" + min + "一" + max + "</span><br/>";
                    }
                }
                if (this.effect != null) {
                    var effectname = this.equipAddattributelibDataBySkill[this.effect].name;
                    var color = this.equipAddattributelibDataBySkill[this.effect].namecolour;
                    html += "<span style='fontSize:10'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html += "<span style='fontSize:24;color:" + color + "'>" + effectname + "</span><br/>";
                    html += "<span style='fontSize:10'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    var describe = this.equipSkillData[this.effect].describe;
                    html += describe;
                }
                if (this.skill != null) {
                    var color = this.equipAddattributelibDataBySkill[this.skill].namecolour;
                    var skillName = this.equipSkillData[this.skill].name;
                    html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html += "<span style='fontSize:24;color:" + color + "'>" + skillName + "</span><br/>";
                    var describe = this.equipSkillData[this.skill].describe;
                    html += describe + "<br/>";

                    var cost = this.equipSkillData[this.skill].cost;
                    var costnum = this.equipSkillData[this.skill].costnum;
                    var m_cost = cost.replace("$parameter1$", costnum);
                    html += "<span style='fontSize:24;color:#fff2df'>" + m_cost + "</span><br/>";

                }
            }
            var arr: Array<any> = [];
            arr.push(html, html2);
            return arr;
        }

        /**
         * 点击morebtn(更多)按钮
         * @param equid 
         * @param key 
         * @param packid 
         * @param isWearEquip 当前是不是人物身上穿的装备 0：不是  1：是
         */
        public onMoreBtn(equid, key, packid, isWearEquip) {
            var morebtnlist = this._viewUI.morebtn_list;
            if (isWearEquip == 1) {
                morebtnlist.visible = false;
                if (this._viewUI.more_btn.label = this.cstringResConfigData[126].msg) {
                    var roleLevel = HudModel.getInstance().levelNum;
                    if (roleLevel >= unlock.QIANGHUA_LEVEL) {  //任务等级大于32级才能进入镶嵌界面
                        strengThening.models.StrengTheningModel.getInstance().tabNum = 1;
                        this.closeWindow();
                        StrengTheningModel.getInstance().insetEquipment.set(packid, key);
                        ModuleManager.show(ModuleNames.STRENG_THENING, this._app);
                        ModuleManager.hide(ModuleNames.BAG);
                        LoginModel.getInstance().CommonPage = "Bag";
                    } else {
                        this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[150054].msg.replace("$parameter1$", unlock.QIANGHUA_LEVEL));
                    }
                }
            } else {
                // if (morebtnlist.visible) {
                //     morebtnlist.visible = false;
                // } else {
                morebtnlist.visible = true;
                this._viewUI.closeMoreBtn_img.visible = true;
                if (130000 <= equid && equid <= 130099) { //宠物装备
                    this.setPetEquipArr(equid, morebtnlist);
                } else {
                    this.setEquiplistArr(equid, key, packid, morebtnlist);
                }
                // }
            }
            this.setMorebtnlistPos();
            morebtnlist.selectHandler = new Handler(this, this.moreBtnSelect);
        }

        /**设置morelsit坐标 */
        public setMorebtnlistPos() {
            var x = this._viewUI.btn_box.x;
            var y = this._viewUI.btn_box.y;
            var numY = this._viewUI.morebtn_list.repeatY;
            var spaceY = this._viewUI.morebtn_list.spaceY;
            var morebtnlistY = numY * 50 + spaceY * (numY - 1);
            this._viewUI.morebtn_list.x = 43;
            this._viewUI.morebtn_list.y = y - morebtnlistY;
            this._viewUI.closeMoreBtn_img.on(LEvent.MOUSE_DOWN, this, () => {
                this._viewUI.morebtn_list.visible = false;
                this._viewUI.closeMoreBtn_img.visible = false;
            });
        }

        /**设置装备tips更多按钮的类型 */
        public setEquiplistArr(equid, key, packid, morebtnlist) {
            var arr: Array<any> = [];
            var bCanSale = this.itemAttrData[equid].bCanSale;
            if (bCanSale != 0) {
                arr.push({ more_btn: this.cstringResConfigData[11042].msg })
            }
            arr.push({ more_btn: this.cstringResConfigData[126].msg });//镶嵌

            var ncanfenjie = this.equipItemAttrData[equid].ncanfenjie;
            if (ncanfenjie == 1) {
                arr.push({ more_btn: this.cstringResConfigData[11299].msg });//分解
            }
            var nquality = this.itemAttrData[equid].nquality;
            if (nquality >= 4) {
                let _equipRefineInfoData = tips.models.TipsModel._instance.equipRefineInfoData;//装备洗炼表
                if (_equipRefineInfoData[equid]) {//如果该装备能洗炼
                    arr.push({ more_btn: this.cstringResConfigData[11773].msg });//洗炼
                }
                arr.push({ more_btn: this.cstringResConfigData[11774].msg });//重铸
            }

            // var skill = this.equipTips[equid].tips.skill;
            // if(skill > 0){
            //     arr.push({more_btn:"洗特技"});
            // }
            var skill = -1;
            for (var i = 0; i < this.equipTips.length; i++) {
                var mPackid = this.equipTips[i].packid;
                var keyinpack = this.equipTips[i].keyinpack;
                if (mPackid == packid && keyinpack == key) {
                    skill = this.equipTips[i].tips.skill;
                }
            }
            if (skill > 0) {
                arr.push({ more_btn: this.cstringResConfigData[11775].msg });
            }

            if (arr.length == 1) {
                var name = arr[0].more_btn;
                this._viewUI.more_btn.label = name;
                arr = [];
            }

            morebtnlist.array = arr;
            morebtnlist.repeatY = arr.length;
            morebtnlist.visible = true;
            this._viewUI.closeMoreBtn_img.visible = true;

        }

        /**设置宠物装备tips更多按钮类型 */
        public setPetEquipArr(equid, morebtnlist) {
            var arr: Array<any> = [];
            var bCanSale = this.itemAttrData[equid].bCanSale;
            if (bCanSale != 0) {
                arr.push({ more_btn: this.cstringResConfigData[11042].msg })
            }

            var bManuleDesrtrol = this.itemAttrData[equid].bManuleDesrtrol;
            if (bManuleDesrtrol == 1) {
                arr.push({ more_btn: this.cstringResConfigData[11044].msg });
            }

            if (arr.length == 1) {
                var name = arr[0].more_btn;
                this._viewUI.more_btn.label = name;
                arr = [];
            }

            morebtnlist.array = arr;
            morebtnlist.repeatY = arr.length;
            morebtnlist.visible = true;

        }

        /**更多按钮列表选择 */
        public moreBtnSelect(index: number) {
            var cell = this._viewUI.morebtn_list.getCell(index);
            var morebtn: Button = cell.getChildByName("more_btn") as Button;
            var btnname = morebtn.label;
            if (btnname == this.cstringResConfigData[11773].msg) {
                this._EquipWashPractiseMediator = new tips.EquipWashPractiseMediator(this._app);
                this._EquipWashPractiseMediator.onShow(this.equipId, this.key);
                LoginModel.getInstance().CommonPage = "Bag";
            } else if (btnname == this.cstringResConfigData[11299].msg) {
                var nquality = this.itemAttrData[this.equipId].nquality;
                if (nquality >= EquipNquality.Purple) {/** 跳转到确认界面 */
                    var parame: Dictionary = new Dictionary();
                    if (nquality == EquipNquality.Purple) {
                        parame.set("contentId", 11573);
                    }
                    else if (nquality == EquipNquality.Orange) {
                        parame.set("contentId", 11832);
                    }
                    models.TipsProxy.getInstance().once(models.TIPS_ON_OK, this, this.onOkBtn);
                    let _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
                } else {/** 直接分解 */
                    this.onOkBtn();
                }
            } else if (btnname == this.cstringResConfigData[11774].msg) {/** 重铸 */
                this._EquipRecastMediator = new tips.EquipRecastMediator(this._app);
                this._EquipRecastMediator.onShow(this.equipId, this.key);
            } else if (btnname == this.cstringResConfigData[11775].msg) {/** 洗特技 */
                this._EuipWashStuntMediator = new tips.EuipWashStuntMediator(this._app);
                this._EuipWashStuntMediator.show();
            } else if (btnname == this.cstringResConfigData[11042].msg) {/** 拍卖界面 */
                sale.models.SaleModel.getInstance().tiaozhuanid = ViewIndex.SELL;
                ModuleManager.show(ModuleNames.SALE, this._app);
                let currView = tips.models.TipsModel.getInstance().whichView;
                if (currView.length != 0) {
                    ModuleManager.hide(currView);
                    LoginModel.getInstance().CommonPage = currView;
                }
            } else if (btnname == this.cstringResConfigData[126].msg) {/** 镶嵌界面 */
                var roleLevel = HudModel.getInstance().levelNum;
                if (roleLevel >= unlock.QIANGHUA_LEVEL) {
                    strengThening.models.StrengTheningModel.getInstance().tabNum = 1;
                    StrengTheningModel.getInstance().insetEquipment.set(this.packid, this.key);
                    ModuleManager.show(ModuleNames.STRENG_THENING, this._app);
                    ModuleManager.hide(ModuleNames.BAG);
                    LoginModel.getInstance().CommonPage = "Bag";
                } else {
                    this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[150054].msg.replace("$parameter1$", unlock.QIANGHUA_LEVEL));
                }
            } else if (btnname == this.cstringResConfigData[11044].msg) {  //丢弃 需要二次确认 
                let parame = new Laya.Dictionary();
                parame.set("contentId", 140402);
                parame.set("parame", [this.itemName]);
                tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_OK, this, this.sureOnOKForAbandon);
                tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_CANCEL, this, this.sureOnCancelForAbandon);
                let _tipsModule = new tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
            }
            this.closeWindow();
        }
        /** 取消丢弃道具 */
        private sureOnCancelForAbandon(): void {
            tips.models.TipsProxy.getInstance().off(tips.models.TIPS_ON_OK, this, this.sureOnOKForAbandon);
        }
        /** 确定丢弃道具 */
        private sureOnOKForAbandon(): void {
            RequesterProtocols._instance.c2s_CDrop_Item(this.packid, this.key, 0);
            tips.models.TipsProxy.getInstance().off(tips.models.TIPS_ON_CANCEL, this, this.sureOnCancelForAbandon);
        }
        /**
         *分解
         */
        public onOkBtn() {
            RequesterProtocols._instance.c2s_resolve_equip(this.key);
        }
        /** 
		 * @param isshow 是否显示按钮 @param access 1 存入 2取出
		 */
        public show(parame?: Laya.Dictionary, isShow?: boolean, access?: number) {
            this._viewUI.mask_img.once(LEvent.MOUSE_DOWN, this, this.closeWindow);
            super.show();
            if (parame && parame.get("purposetype") != null) {
                let type = parame.get("purposetype");
                if (type == ItemPurpose.ITEM_TRANSFER) {
                    this._viewUI.zhuangbei_btn.label = this.cstringResConfigData[2916].msg;
                    this.ItemPurpose = type;
                }
            } else if (isShow && access) {/** 存取 */
                this._viewUI.zhuangbei_btn.visible = false;
                this._viewUI.more_btn.visible = false;
                this._viewUI.access_btn.visible = true;
                this.access = access;
                if (access == 1) {
                    this._viewUI.access_btn.label = this.cstringResConfigData[3079].msg;
                } else if (access == 2) {
                    this._viewUI.access_btn.label = this.cstringResConfigData[3080].msg;
                }
            }
            else if (isShow) {/** 展示 */
                this._viewUI.zhuangbei_btn.visible = false;
                this._viewUI.more_btn.visible = false;
                this._viewUI.access_btn.visible = false;
            } else {/** 正常按钮 */
                this._viewUI.zhuangbei_btn.visible = true;
                this._viewUI.more_btn.visible = true;
                this._viewUI.access_btn.visible = false;
            }
        }

        /**
         * 临时背包装备转移按钮事件
         */
        public temporaryequip(srcpackid, itemKey, number, dstpackid): void {
            let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
            if (bag.items.length != bag.capacity) {     //如果背包格子和数据源相等说明他满了
                RequesterProtocols._instance.c2s_CTrans_Item(srcpackid, itemKey, number, dstpackid, -1, -1, -1);
                this.closeWindow();
            } else {
                let prompt = this.chatMessageTips[145950].msg;
                this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                this.DisappearMessageTipsMediator.onShow(prompt);
            }
        }


        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}