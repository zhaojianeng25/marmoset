
var tipsModel = game.modules.tips.models.TipsModel;
module game.modules.tips {
    /** 装备对比详情tips */
    export class EquipCompareTipsMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.component.EquipCompareTipsUI;
        private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
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
        /**洗练 */
        private _EquipWashPractiseMediator: game.modules.tips.EquipWashPractiseMediator;
        /**重铸 */
        private _EquipRecastMediator: game.modules.tips.EquipRecastMediator;
        /**洗特技 */
        private _EuipWashStuntMediator: game.modules.tips.EuipWashStuntMediator;
        /**t特技特效显示表 */
        equipSkillData = game.modules.tips.models.TipsModel._instance.equipSkillData;
        /**职业配置表 */
        schoolInfo = LoginModel.getInstance().schoolInfo;
        /**职业创建表 */
        createRoleConfigBinDic = game.modules.createrole.models.LoginModel.getInstance().createRoleConfigBinDic;
        /**当前装备基础属性 */
        baseAttr: Dictionary;

        parame = new Laya.Dictionary();
        equipId = -1;
        key = -1;
        equipdType = -1;
        access = -1;
        ItemPurpose = -1;
        minbgHtmlHeight = 120;  //最小的高度
        packid = -1;
        skill = null;
        effect = null;
        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.component.EquipCompareTipsUI();
            this.isCenter = false;
            this._app = app;
        }
        /**
         * 显示背包中装备的tips
         * @param equipId 背包中装备id 
         * @param WearId  已经装备的装备id
         * @param key 装备的key
         * @param packid 背包id
         */
        public showBagEquipTips(WearId, equipdType, parame) {
            this.parame = parame;
            var equipId = parame.get("itemId");
            var key = parame.get("key");
            var packid = parame.get("packid");
            this.packid = packid;
            var equiptype = parame.get("equiptype");
            this.equipId = equipId;
            this.key = key;
            this.equipdType = equiptype;
            this._viewUI.xiangq.visible = false;
            this._viewUI.morebtn_list.visible = false;
            var name = this.itemAttrData[equipId].name;  //名称
            var destribe = this.itemAttrData[equipId].destribe;   //描述
            var effectdes = this.itemAttrData[equipId].effectdes;  //功能说明
            var itemtypeid = this.itemAttrData[equipId].itemtypeid;  //类型
            var itemtypeName = this.itemTypeData[itemtypeid].name;  //类型名
            var iconid = this.itemAttrData[equipId].icon;  //iconid
            var itemIcon = SaleModel.getInstance().getIcon(iconid);  //icon
            var nquality = this.itemAttrData[equipId].nquality;   //品质
            var colour = this.itemAttrData[equipId].colour;
            var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
            this._viewUI.bagEqu_name_label.text = name;
            this._viewUI.bagEqu_name_label.color = colour;
            this._viewUI.bagEqu_type_label.text = tipsModel.stringType.equipType + itemtypeName;
            this._viewUI.bagEqu_level_label.text = this.cstringResConfigData[1].msg + this.itemAttrData[equipId].level;
            this._viewUI.bagEqu_frame_img.skin = itemnquality;
            this._viewUI.bagEqu_icon_img.skin = itemIcon + "";
            var html = this.showAttr(equipId, packid, key);
            var mLevel = game.modules.createrole.models.LoginModel.getInstance().roleDetail.level;  //玩家等级
            var equLevel = this.itemAttrData[equipId].level;  //装备等级
            var needCareer = this.equipEffectData[equipId].needCareer;  //装备职业需求
            var school = game.modules.createrole.models.LoginModel.getInstance().roleDetail.school;  //职业
            var carrerArr = needCareer.split(";");
            this._viewUI.bagEqu_canwear_img.visible = false;
            var sexNeed = this.equipEffectData[equipId].sexNeed;    //装备性别需求
            var shape = game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape;  //角色id
            var sex = this.createRoleConfigBinDic[shape].sex;
            if (mLevel >= equLevel && sexNeed == sex || sexNeed == 0 || needCareer == "0") {
                for (var i = 0; i < carrerArr.length; i++) {
                    if (parseInt(carrerArr[i]) == school || needCareer == "0") {
                        this._viewUI.bagEqu_canwear_img.visible = true;
                    }
                }
            }
            this._viewUI.bagEqu_attr_html.innerHTML = html;
            var htmlHeight = this._viewUI.bagEqu_attr_html.height;
            if (htmlHeight > this.minbgHtmlHeight) {
                var bgHeight = this._viewUI.bagEquip.height;
                this._viewUI.bagEquip.height = bgHeight - this.minbgHtmlHeight + htmlHeight;
            }
            var wearKey = this.isWearCurrentEqu(equipId);
            this.showWearEquipTips(WearId, wearKey);
            if (packid == null) {
                this._viewUI.btn_box.visible = false;
                this._viewUI.bagEqu_canwear_img.visible = false;
            }
            this._viewUI.xiangq_btn.on(LEvent.MOUSE_DOWN, this, this.onxiangqBtn, [equipId]);
            this._viewUI.more_btn.on(LEvent.MOUSE_DOWN, this, this.onMoreBtn, [equipId, key, packid]);
            this._viewUI.zhuangbei_btn.on(LEvent.MOUSE_DOWN, this, this.onZBBtn, [sexNeed, shape]);
            this._viewUI.access_btn.on(LEvent.MOUSE_DOWN, this, this.onAccessEvent, [parame]);
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

        /**
         * 点击装备按钮
         * @param sexNeed 装备性别需求
         * @param shape 角色造型id
         */
        public onZBBtn(sexNeed: number, shape: number) {
            if (this.ItemPurpose == ItemPurpose.ITEM_TRANSFER) {/** 转移 */
                let num = -1;
                let depotId = -1;
                let dstPos = -1;
                let npcId = -1;
                RequesterProtocols._instance.c2s_CTrans_Item(BagTypes.TEMP, this.key, num, BagTypes.BAG, dstPos, depotId, npcId);
            } else if (tipsModel._instance.isPetEquip(this.equipId)) {  //当前物品是否为宠物装备
                RequesterProtocols._instance.c2s_CPutOnPet_Equip(this.key, game.modules.pet.models.PetModel.getInstance().petbasedata.key, this.equipdType)
            } else if (sexNeed != shape && sexNeed != 0) { //是否可以装备 0通用 1男性装备 2女性装备
                this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[100066].msg);
            } else { //将装备穿到人物身上
                RequesterProtocols._instance.c2s_CPutOn_Equip(this.key, this.equipdType);
            }

            this.closeWindow();
        }

        /** 关闭界面 */
        private closeWindow(): void {
            models.TipsProxy.getInstance().event(models.CLOSE_TIPS);
        }
        /**
         * 显示已经装备的装备tips
         * @param itemId 
         */
        public showWearEquipTips(equipId, wearKey) {
            var name = this.itemAttrData[equipId].name;  //名称
            var destribe = this.itemAttrData[equipId].destribe;   //描述
            var effectdes = this.itemAttrData[equipId].effectdes;  //功能说明
            var itemtypeid = this.itemAttrData[equipId].itemtypeid;  //类型
            var itemtypeName = this.itemTypeData[itemtypeid].name;  //类型名
            var iconid = this.itemAttrData[equipId].icon;  //iconid
            var itemIcon = SaleModel.getInstance().getIcon(iconid);  //icon
            var nquality = this.itemAttrData[equipId].nquality;   //品质
            var colour = this.itemAttrData[equipId].colour;
            var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
            this._viewUI.wearEqu_name_label.text = name;
            this._viewUI.wearEqu_name_label.color = colour;
            this._viewUI.wearEqu_type_label.text = tipsModel.stringType.equipType + itemtypeName;
            this._viewUI.wearEqu_level_label.text = this.cstringResConfigData[1].msg + this.itemAttrData[equipId].level;
            this._viewUI.wearEqu_frame_img.skin = itemnquality;
            this._viewUI.wearEqu_icon_img.skin = itemIcon + "";
            var bag3 = bagModel.getInstance().bagMap[BagTypes.EQUIP];  //获取背包3
            let bagType;
            let _itemType = BagModel.getInstance().getItemTotalType(equipId);//装备道具类型
            if (_itemType == ItemTotalType.PetEquipItem) {//是宠物装备
                bagType = BagTypes.PETEQUIP;
            }
            else {//人物角色身上的装备
                bagType = BagTypes.EQUIP;
            }
            var html = this.showAttr(equipId, bagType, wearKey);
            if (html != "") {
                this._viewUI.wearEqu_attr_html.innerHTML = html;
            }
            else {
                this._viewUI.wearEqu_attr_html.innerHTML = "";
                console.log("------------------------设置富文本内容是空！-------------------------");
            }
            var htmlHeight = this._viewUI.wearEqu_attr_html.height;
            if (htmlHeight > this.minbgHtmlHeight) {
                var bgHeight = this._viewUI.wearEquip.height;
                this._viewUI.wearEquip.height = bgHeight - this.minbgHtmlHeight + htmlHeight;
            }
        }

        /**
         * 显示属性
         * @param itemId 装备id
         * @param packid 背包id 
         * @param key 装备key
         */
        public showAttr(itemId, packid, key) {
            let equipTips = this.equipTips;
            let html = "";
            let bagType;
            let _itemType = BagModel.getInstance().getItemTotalType(itemId);
            if (_itemType == ItemTotalType.PetEquipItem) {//是宠物装备
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
                    tips.models.TipsProxy.getInstance().once(tips.models.PETEQUIPTIPS, this, this.showWearEquipTips, [itemId, this.isWearCurrentEqu(itemId)]);
                    RequesterProtocols._instance.c2s_CGetPetEquip_Tips(pet.models.PetModel._instance.petbasedata.key, key)
                    return html;
                }

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
            }
            else {
                html = "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[122].msg + "</span><br/>";
                if (packid == null) {  //显示别人的装备信息
                    equipTips = game.modules.team.models.TeamModel.getInstance().roleEquipData.tips;
                    if (!equipTips) {//可能是珍品回收那边查看装备道具信息
                        equipTips = bag.models.BagModel.getInstance().equipItemRecoverInfoTips;
                    }
                    html = this.showOtherEquip(equipTips, key, itemId, html);
                } else {  //显示背包的装备信息
                    for (var i = 0; i < equipTips.length; i++) {
                        var tipsPackid = equipTips[i].packid;  //背包id
                        var tipsKey = equipTips[i].keyinpack;  //key
                        if (tipsPackid == packid && tipsKey == key) {
                            var baseAttr = equipTips[i].tips.baseAttr;
                            var addAttr = equipTips[i].tips.addAttr;
                            var skill = equipTips[i].tips.skill;
                            var effect = equipTips[i].tips.effect;
                            if (baseAttr != null) { //基础属性
                                var baseAttrKeys = baseAttr.keys;
                                if (packid == BagTypes.BAG) { this.baseAttr = baseAttr }
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
                            if (addAttr != null) {  //附加属性
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

                            if (skill) { //技能
                                this.skill = skill;
                                var name = this.equipAddattributelibDataBySkill[skill].name;
                                var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                                html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11002].msg + "&nbsp;" + name + "</span><br/>";
                            }
                            if (effect) { //特效
                                this.effect = effect;
                                var name = this.equipAddattributelibDataBySkill[effect].name;
                                var color = this.equipAddattributelibDataBySkill[effect].namecolour;
                                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                                html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11003].msg + "&nbsp;" + name + "</span><br/>";
                            }
                            //附魔后临时加成的属性
                            let fuMoShuXingData = this.equipTips[i].tips.enhancement;
                            html += tips.models.TipsModel.getInstance().getFuMoHtmlStr(fuMoShuXingData);

                            var endure = equipTips[i].tips.endure; //耐久
                            html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                            html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[11000].msg + ":" + endure + "</span><br/>";
                            var equipscore = equipTips[i].tips.equipscore;//评分
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
                            if (BagModel.getInstance().itemIsBind(_itemData.flags)) {
                                if (packid == BagTypes.BAG) {
                                    this._viewUI.bBind_img.visible = true;
                                }
                                else if (packid == BagTypes.EQUIP) {
                                    this._viewUI.wearEquBind_img.visible = true;
                                }
                                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                                let cStr = tipsModel.getInstance().cstringResConfigData[11350]["msg"];
                                html += "<span style='color:#FBDC47;fontSize:24'>" + cStr + "</span><br/>";
                            }
                            else {
                                if (packid == BagTypes.BAG) {
                                    this._viewUI.bBind_img.visible = false;
                                }
                                else if (packid == BagTypes.EQUIP) {
                                    this._viewUI.wearEquBind_img.visible = false;
                                }
                            }
                        }
                    }
                }
            }
            return html;
        }

        /**显示别人的装备属性 */
        public showOtherEquip(equipTips, key, itemId, html) {
            let baseAttr, addAttr, skill, effect, endure, equipscore;
            if (key) {
                baseAttr = equipTips.get(key).baseAttr;
                addAttr = equipTips.get(key).addAttr;
                skill = equipTips.get(key).skill;
                effect = equipTips.get(key).effect;
                endure = equipTips.get(key).endure; //耐久
                equipscore = equipTips.get(key).equipscore;//评分
            }
            else {//可能是珍品回收那边查看装备道具信息
                baseAttr = equipTips.baseAttr;
                addAttr = equipTips.addAttr;
                skill = equipTips.skill;
                effect = equipTips.effect;
                endure = equipTips.endure;
                equipscore = equipTips.equipscore;
            }
            if (baseAttr != null) { //基础属性
                var baseAttrKeys = baseAttr.keys;
                this.baseAttr = baseAttr;
                for (var j = 0; j < baseAttrKeys.length; j++) {
                    var baseAttrId = baseAttrKeys[j];   //基础属性的id
                    var baseAttrValue = baseAttr.get(baseAttrId);  //值
                    var baseAttrName = this.attributeDesConfigData[baseAttrKeys[j]].name + "+" + baseAttrValue;
                    html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html += "<span style='fontSize:24;color:#fff2df'>&nbsp;&nbsp;" + baseAttrName + "</span><br/>";
                }
            }
            if (addAttr != null) { //附加属性
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

            if (skill) {  //特技
                this.skill = skill;
                var name = this.equipAddattributelibDataBySkill[skill].name;
                var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11002].msg + "&nbsp;" + name + "</span><br/>";
            }
            if (effect) { //特效
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
            return html;
        }

        /**
         * 点击装备详情按钮
         */
        public onxiangqBtn(equipId) {
            if (!this._viewUI.xiangq.visible) {
                this._viewUI.xiangq.visible = true;
                this._viewUI.wearEquip.visible = false;
                var htmlArr = this.getBaseAttr(this.baseAttr, this.attributeDesConfigData, this.equipIteminfoData, equipId);
                var mHtml = this._viewUI.equipAttr_html;
                mHtml.innerHTML = htmlArr[0];
                this._viewUI.fanwei_html.innerHTML = htmlArr[1];

                var htmlheight = mHtml.height;
                if (htmlheight > this.minbgHtmlHeight) {
                    var bgHeight = this._viewUI.xiangq.height;
                    this._viewUI.xiangq.height = bgHeight - 120 + htmlheight;
                }
                this._viewUI.box.centerY = -100;
            }
        }

        /**显示装备的基础属性 */
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
                if (this.effect != null) { //特效
                    var effectname = this.equipAddattributelibDataBySkill[this.effect].name;
                    var color = this.equipAddattributelibDataBySkill[this.effect].namecolour;
                    html += "<span style='fontSize:10'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html += "<span style='fontSize:24;color:" + color + "'>" + effectname + "</span><br/>";
                    html += "<span style='fontSize:10'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    var describe = this.equipSkillData[this.effect].describe;
                    html += describe;
                }
                if (this.skill != null) { //特技
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

        /**点击更多按钮 */
        public onMoreBtn(equid, key, packid) {
            var morebtnlist = this._viewUI.morebtn_list;
            var arr: Array<any> = [];
            var bCanSale = this.itemAttrData[equid].bCanSale;
            if (bCanSale != 0) {  //是否可以出售
                arr.push({ more_btn: this.cstringResConfigData[11042].msg })
            }
            arr.push({ more_btn: this.cstringResConfigData[126].msg });
            var ncanfenjie = this.equipItemAttrData[equid].ncanfenjie;
            if (ncanfenjie == 1) { //是否可以分解
                arr.push({ more_btn: this.cstringResConfigData[11299].msg });
            }
            var nquality = this.itemAttrData[equid].nquality;
            if (nquality >= 4) {  //品质大于4
                let _equipRefineInfoData = tips.models.TipsModel._instance.equipRefineInfoData;//装备洗炼表
                if (_equipRefineInfoData[equid]) {//如果该装备能洗炼
                    arr.push({ more_btn: this.cstringResConfigData[11773].msg });//洗炼
                }
                arr.push({ more_btn: this.cstringResConfigData[11774].msg });//重铸
            }
            var skill = -1;
            for (var i = 0; i < this.equipTips.length; i++) {
                var mPackid = this.equipTips[i].packid;
                var keyinpack = this.equipTips[i].keyinpack;
                if (mPackid == packid && keyinpack == key) {
                    skill = this.equipTips[i].tips.skill;
                }
            }
            if (skill > 0) { //是否可以洗特技
                arr.push({ more_btn: this.cstringResConfigData[11775].msg });
            }
            morebtnlist.array = arr;
            morebtnlist.repeatY = arr.length;
            morebtnlist.visible = true;
            this._viewUI.closeMoreBtn_img.visible = true;
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

        /**
         * 背包3中装备的key
         * @param itemId 
         */
        public isWearCurrentEqu(itemId: number) {
            var eequiptype = this.equipEffectData[itemId].eequiptype;   //选中装备的部件id
            let bagType;
            let _itemType = BagModel.getInstance().getItemTotalType(itemId);//装备道具类型
            if (_itemType == ItemTotalType.PetEquipItem) {//是宠物装备
                bagType = BagTypes.PETEQUIP;
            }
            else {//人物角色身上的装备
                bagType = BagTypes.EQUIP;
            }
            var bag3 = bagModel.getInstance().bagMap[bagType];  //获取背包3
            let items;
            if (_itemType == ItemTotalType.PetEquipItem) {
                let petKey = PetModel.getInstance().petbasedata.key;
                items = bag3.get(petKey).items;
            }
            else {
                items = bag3.items;
            }
            for (var i = 0; i < items.length; i++) {
                var id = items[i].id;
                if (eequiptype == this.equipEffectData[id].eequiptype) {
                    var key = items[i].key;
                    return key;
                }
            }
            return -1;
        }

        /**点击更多按钮列表 */
        public moreBtnSelect(index: number) {
            var cell = this._viewUI.morebtn_list.getCell(index);
            var morebtn: Button = cell.getChildByName("more_btn") as Button;
            var btnname = morebtn.label;
            if (btnname == this.cstringResConfigData[11773].msg) {/** 洗练 */
                this._EquipWashPractiseMediator = new tips.EquipWashPractiseMediator(this._app);
                this._EquipWashPractiseMediator.onShow(this.equipId, this.key);
                LoginModel.getInstance().CommonPage = "Bag";
            } else if (btnname == this.cstringResConfigData[11299].msg) {/** 分解 */
                var nquality = this.itemAttrData[this.equipId].nquality;
                if (nquality >= EquipNquality.Purple) {
                    var parame: Dictionary = new Dictionary();
                    if (nquality == EquipNquality.Purple) {
                        parame.set("contentId", 11573);
                    }
                    else if (nquality == EquipNquality.Orange) {
                        parame.set("contentId", 11832);
                    }
                    models.TipsProxy.getInstance().once(models.TIPS_ON_OK, this, this.onOkBtn);
                    let _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
                } else {
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
            } else if (btnname == this.cstringResConfigData[126].msg) { //镶嵌界面
                var roleLevel = HudModel.getInstance().levelNum;
                if (roleLevel >= unlock.QIANGHUA_LEVEL) {  //大于32级才能镶嵌
                    strengThening.models.StrengTheningModel.getInstance().tabNum = 1;
                    StrengTheningModel.getInstance().insetEquipment.set(this.packid, this.key);
                    ModuleManager.show(ModuleNames.STRENG_THENING, this._app);
                    ModuleManager.hide(ModuleNames.BAG);
                    LoginModel.getInstance().CommonPage = "Bag";
                } else {
                    this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[150054].msg.replace("$parameter1$", unlock.QIANGHUA_LEVEL));
                }
            }
            this.closeWindow();
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
        public show(parame?, isShow?, access?: number) {
            this._viewUI.mask_img.once(LEvent.MOUSE_DOWN, this, this.closeWindow);
            super.show();
            if (parame && parame.get("purposetype") != null) {
                let type = parame.get("purposetype");
                if (type == ItemPurpose.ITEM_TRANSFER) {
                    this._viewUI.zhuangbei_btn.label = this.cstringResConfigData[2916].msg;
                    this.ItemPurpose = type;
                }
            } else if (isShow && access) {/** 存取 */
                this._viewUI.more_btn.visible = false;
                this._viewUI.zhuangbei_btn.visible = false;
                this._viewUI.access_btn.visible = true;
                this.access = access;
                if (access == 1) {
                    this._viewUI.access_btn.label = this.cstringResConfigData[3079].msg;
                } else if (access == 2) {
                    this._viewUI.access_btn.label = this.cstringResConfigData[3080].msg;
                }
            } else if (isShow) {/** 展示作用 */
                this._viewUI.zhuangbei_btn.visible = false;
                this._viewUI.more_btn.visible = false;
                this._viewUI.access_btn.visible = false;
            } else {/** 正常情况下 */
                this._viewUI.zhuangbei_btn.visible = true;
                this._viewUI.more_btn.visible = true;
                this._viewUI.access_btn.visible = false;
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