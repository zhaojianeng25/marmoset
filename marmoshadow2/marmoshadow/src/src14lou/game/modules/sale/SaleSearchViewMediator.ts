/**
* 搜索界面 
*/
module game.modules.sale {
    export class SaleSearchViewMediator extends game.modules.ModuleMediator {
        private _viewUI: ui.common.SaleSearchUI;
        private _AuctionSell: SaleSellViewMediator;
        private _AuctionGongshi: SaleGongshiViewMediator;
        private _SaleSearchBtnListViewMediator: SaleSearchBtnListViewMediator;
        private _SaleSearchPetViewMediator: SaleSearchPetViewMediator;
        /**以name为key 的三级摆摊列表 */
        cMarketThreeTableDataForName = SaleModel._instance.cMarketThreeTableDataForName;
        /**复合表 */
        itemAttrData = BagModel.getInstance().itemAttrData;
        /**
         * 重新排序的一级摆摊配置表
         */
        m_cMarketFirstTableData = SaleModel._instance.m_cMarketFirstTableData;
        /**
         * 二级摆摊配置表
         */
        cMarketSecondTableData = SaleModel._instance.cMarketSecondTableData;
        /**
         * 三级摆摊配置表
         */
        cMarketThreeTableData = SaleModel._instance.cMarketThreeTableData;
        /**宠物信息表 */
        petCPetAttrData = game.modules.pet.models.PetModel._instance.petCPetAttrData;
        /**宠物技能显示表 */
        petSkillConfigData = game.modules.pet.models.PetModel._instance.petSkillConfigData;
        /**道具类型表 */
        itemTypeData = StrengTheningModel._instance.itemTypeData;
        /**装备附加属性表 */
        equipAddattributelibData = StrengTheningModel._instance.equipAddattributelibData;
        /**宠物一级属性转换表 */
        petCPetAttrModDataData = game.modules.pet.models.PetModel._instance.petCPetAttrModDataData;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        /**搜素的所有name */
        searchTotalNameArr: Array<any> = [];
        /**搜索的结果 */
        searchResultArr: Array<any> = [];
        /**装备部件名称 */
        equPartsArr = [];
        /**装备等级 */
        equLevelArr = [];
        /**基础属性  **/
        equBaseAttrArr = models.SaleModel._instance.equBaseAttrArr;
        /**特效 */
        equTeXiaoArr = [];
        /**特技 */
        equTeJiArr = [];
        /**装备附加属性 */
        equAddAttr = models.SaleModel._instance.equAddAttr;
        /**宠物资质评分 */
        petZizhiArr = models.SaleModel._instance.petZizhiArr;
        /**宠物基础属性 */
        petBaseAttr = models.SaleModel._instance.petBaseAttr;
        equSearchDic: Laya.Dictionary = new Laya.Dictionary();
        petSearchDic: Laya.Dictionary = new Laya.Dictionary();
        /**普通宠物 */
        ordinaryPet = [];
        /**灵兽 */
        lingshou = [];
        /**宠物技能 */
        petSkill = [];
        /**选择的是否是灵兽 */
        isLingshou = false;
        constructor(app: AppBase) {
            super();
            this._viewUI = new ui.common.SaleSearchUI();
            this._app = app;
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this.uiLayer = app.uiRoot.general;
            this._SaleSearchBtnListViewMediator = new SaleSearchBtnListViewMediator(this._viewUI);
            this._SaleSearchPetViewMediator = new SaleSearchPetViewMediator(this._viewUI);
            this._viewUI.searchResult_list.visible = false;
            this._viewUI.searchRecord_list.visible = false;
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.closeThisView);
            this._viewUI.search_btn.on(LEvent.MOUSE_DOWN, this, this.onSearch);  //普通搜索
            this._viewUI.searchBtn_tab.selectHandler = new Handler(this, this.loadSearchView);
            models.SaleProxy._instance.on(models.onSaleListTipsbtn, this, this.flushEquPartsBtn);
            models.SaleProxy._instance.on(models.onSaleListEqulevelbtn, this, this.flushEquLevelBtn);
            models.SaleProxy._instance.on(models.onSaleListEquBastAttrbtn1, this, this.flushEquBaseAttr1);
            models.SaleProxy._instance.on(models.onSaleListEquBastAttrbtn2, this, this.flushEquBaseAttr2);
            models.SaleProxy._instance.on(models.onSaleListEquBastAttrbtn3, this, this.flushEquBaseAttr3);
            models.SaleProxy._instance.on(models.onSaleListEquTeXiao, this, this.flushEquTeXiao);
            models.SaleProxy._instance.on(models.onSaleListEquTeJi, this, this.flushEquTeJi);
            models.SaleProxy._instance.on(models.onSaleListEquAddAttr, this, this.flushAddAttr);
            models.SaleProxy._instance.on(models.onSaleListordinaryPet, this, this.flushOrdinaryPet);
            models.SaleProxy._instance.on(models.onSaleListlingchong, this, this.flushLingshou);
            models.SaleProxy._instance.on(models.onSalePetSkill, this, this.flushPetSkill);
            models.SaleProxy._instance.on(models.onSalePetZizhi1, this, this.flushPetZizhi1);
            models.SaleProxy._instance.on(models.onSalePetZizhi2, this, this.flushPetZizhi2);
            models.SaleProxy._instance.on(models.onSalePetZizhi3, this, this.flushPetZizhi3);
            models.SaleProxy._instance.on(models.onSalePetBaseAttr1, this, this.flushPetBaseAttr1);
            models.SaleProxy._instance.on(models.onSalePetBaseAttr2, this, this.flushPetBaseAttr2);
            models.SaleProxy._instance.on(models.onSalePetBaseAttr3, this, this.flushPetBaseAttr3);
            models.SaleProxy._instance.once(models.SMarketSearchResult, this, this.gemEquipPetSeek); //珍品装备或者宠物搜索返回
            this.loadSearchView(0);
            this.searchFirstTab();
            this.initAllListData();

        }

        /**关闭当前界面 */
        public closeThisView() {
            ModuleManager.show(ModuleNames.SALE, this._app);
            this.hide();
        }

        /**选择显示搜索界面、搜索装备界面、搜索宠物界面 */
        public loadSearchView(index: number) {
            this._viewUI.search_viewStack.selectedIndex = index;
            if (index == 0) {
                this.showSearchRecord(); //显示普通搜索记录
            } else if (index == 1) {
                this.showSearchEqu(); //搜索装备
            } else if (index == 2) {
                this.showSearchPet();  //搜索宠物
            }
        }

        /**搜索装备 */
        public showSearchEqu() {
            this._viewUI.equ_btn.on(LEvent.MOUSE_DOWN, this, this.onEquBtn);  //装备部件
            this._viewUI.equLevel_btn.on(LEvent.MOUSE_DOWN, this, this.onBtn); //装备等级
            this._viewUI.baseAttr1_btn.on(LEvent.MOUSE_DOWN, this, this.onBaseAttrBrn1); //基础属性1
            this._viewUI.baseAttr2_btn.on(LEvent.MOUSE_DOWN, this, this.onBaseAttrBrn2); //基础属性2
            this._viewUI.baseAttr3_btn.on(LEvent.MOUSE_DOWN, this, this.onBaseAttrBrn3); //基础属性2
            this._viewUI.texiao_btn.on(LEvent.MOUSE_DOWN, this, this.onTeXiao); //特效
            this._viewUI.teji_btn.on(LEvent.MOUSE_DOWN, this, this.onTeJi); //特技
            this._viewUI.addAttr_btn.on(LEvent.MOUSE_DOWN, this, this.onAddAttr);  //附加属性
            this._viewUI.equSearch_btn.on(LEvent.MOUSE_DOWN, this, this.onEquSearchBtn);  //珍品装备搜索
            this._viewUI.equReset_btn.on(LEvent.MOUSE_DOWN, this, this.initAllListData);  //珍品装备搜索重置
            this._viewUI.addAttr1_btn.on(LEvent.MOUSE_DOWN, this, this.onAddAttr1); //增加属性
            this._viewUI.addAttr2_btn.on(LEvent.MOUSE_DOWN, this, this.onAddAttr2);  //增加属性
            this._viewUI.lessAttr2_btn.on(LEvent.MOUSE_DOWN, this, this.onlessAttr2); //减少属性
            this._viewUI.lessAttr3_btn.on(LEvent.MOUSE_DOWN, this, this.onlessAttr3); //减少属性
        }

        /**搜索宠物 */
        public showSearchPet() {
            this._viewUI.pet_btn.on(LEvent.MOUSE_DOWN, this, this.onPetBtn);  //搜索宠物
            this._viewUI.petSkill_btn.on(LEvent.MOUSE_DOWN, this, this.onPetSkill); //宠物技能
            this._viewUI.zizhi1_btn.on(LEvent.MOUSE_DOWN, this, this.onzizhi1_btn); //宠物资质1
            this._viewUI.zizhi2_btn.on(LEvent.MOUSE_DOWN, this, this.onzizhi2_btn); //宠物资质2
            this._viewUI.zizhi3_btn.on(LEvent.MOUSE_DOWN, this, this.onzizhi3_btn); //宠物资质3
            this._viewUI.petBaseAttr_btn1.on(LEvent.MOUSE_DOWN, this, this.onPetAttr1); //宠物基础属性1
            this._viewUI.petBaseAttr2_btn.on(LEvent.MOUSE_DOWN, this, this.onPetAttr2); //宠物基础属性2
            this._viewUI.petBaseAttr3_btn.on(LEvent.MOUSE_DOWN, this, this.onPetAttr3); //宠物基础属性3
            // SaleModel._instance.showList(this._viewUI.petZizhi_list,this.arr);
            this._viewUI.petSearch_btn.on(LEvent.MOUSE_DOWN, this, this.petSearch); //宠物搜索
            this._viewUI.petRest_btn.on(LEvent.MOUSE_DOWN, this, this.petRestInitUI); //宠物重置
        }

        /**初始化数据 */
        public initAllListData() {
            var partsArr: Array<any> = [210, 211, 212, 206, 207, 200, 209, 208, 202, 204, 203, 201];                                  //装备二级菜单序号id
            for (var i = 0; i < partsArr.length; i++) {
                var name = this.cMarketSecondTableData[partsArr[i]].name;
                var id = this.cMarketSecondTableData[partsArr[i]].id;
                this.equPartsArr.push({ name: name, id: id });
            }
            this.flushEquSellRadio(0);      // 装备出售状态
            this.flushEquPartsBtn(0);       // 刷新装备部件
            this.flushEququality(0);        // 装备品质
            var levelArr = [50, 60, 70, 80, 90, 100]; //等级列表数据
            for (var i = 0; i < levelArr.length; i++) {
                var levelname = levelArr[i] + this.cstringResConfigData[3].msg;
                var levelid = levelArr[i];
                this.equLevelArr.push({ name: levelname, id: levelid })
            }
            this.flushEquLevelBtn(0);
            for (var i = 2001; i < 2032; i++) {  //装备的特效id区间
                var name = this.equipAddattributelibData[i].name;
                var id = this.equipAddattributelibData[i].id;
                this.equTeXiaoArr.push({ name: name, id: id });
            }
            for (var i = 3001; i < 3030; i++) {  //装备的特技id区间
                var name = this.equipAddattributelibData[i].name;
                var id = this.equipAddattributelibData[i].id;
                this.equTeJiArr.push({ name: name, id: id });
            }
            this._viewUI.baseAttr2_box.visible = false;
            this._viewUI.baseAttr3_box.visible = false;
            for (var i = 43050; i <= 43080; i++) {   //宠物宝宝的区间
                var pet = this.petCPetAttrData[i];
                var id = this.petCPetAttrData[i].id;
                var name = pet.name;
                this.ordinaryPet.push({ name: name, id: id });
            }
            for (var i = 43150; i <= 43162; i++) { //宠物灵兽的区间
                var pet = this.petCPetAttrData[i];
                var id = this.petCPetAttrData[i].id;
                var name = pet.name;
                this.lingshou.push({ name: name, id: id });
            }
            this.flushOrdinaryPet(0);
            this.flushLingshou(0);
            for (var i = 206001; i <= 206142; i++) {  //宠物的被动技能显示
                var petSkill = this.petSkillConfigData[i];
                var icon = petSkill.icon;
                var color = petSkill.color;
                var skillname = petSkill.skillname;
                var id = petSkill.id;
                this.petSkill.push({ id: id, skillname: skillname, icon: icon, color: color })
            }
            for (var i = 207001; i <= 207020; i++) {  //宠物的主动技能显示
                var petSkill = this.petSkillConfigData[i];
                if (petSkill != undefined) {
                    var icon = petSkill.icon;
                    var color = petSkill.color;
                    var skillname = petSkill.skillname;
                    var id = petSkill.id;
                    this.petSkill.push({ id: id, skillname: skillname, icon: icon, color: color })
                }
            }
            this.initGemUi();
        }

        /**初始化珍品物品搜索界面 */
        private initGemUi(): void {
            var treasuretext: Array<any> = [];
            var viewUI = this._viewUI;
            treasuretext.push(
                viewUI.minPrice_input, viewUI.maxPrice_input, viewUI.baseAttr1_input,
                viewUI.baseAttr2_input, viewUI.baseAttr3_input, viewUI.totalAttr_input,
                viewUI.score_input,
            );
            for (var index = 0; index < treasuretext.length; index++) {
                treasuretext[index].text = "";
            }
        }

        /**装备部件 */
        public onEquBtn() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(317, 398, this.equPartsArr, 1);
        }

        /**装备等级 */
        public onBtn(e: LEvent) {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(317, 442, this.equLevelArr, 2);
        }

        /**基础属性1 */
        public onBaseAttrBrn1() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(200, 759, this.equBaseAttrArr, 3);
        }

        /**基础属性2 */
        public onBaseAttrBrn2() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(200, 817, this.equBaseAttrArr, 4);
        }

        /**基础属性3 */
        public onBaseAttrBrn3() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(200, 873, this.equBaseAttrArr, 5);
        }

        /**特效 */
        public onTeXiao() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(179, 693, this.equTeXiaoArr, 6);

        }

        /**特技 */
        public onTeJi() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(396, 700, this.equTeJiArr, 7);

        }

        /**附加属性 */
        public onAddAttr() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(185, 935, this.equAddAttr, 8);
        }

        /**宠物 */
        public onPetBtn() {
            this._SaleSearchPetViewMediator.show();
            this._SaleSearchPetViewMediator.showPet(130, 400, this.ordinaryPet, this.lingshou); //660

        }

        /**宠物技能 */
        public onPetSkill() {
            this._SaleSearchPetViewMediator.show();
            this._SaleSearchPetViewMediator.showPetSkill(129, 650, this.petSkill); //

        }

        /**宠物资质1 */
        public onzizhi1_btn() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(170, 794, this.petZizhiArr, 9);

        }

        /**宠物资质2 */
        public onzizhi2_btn() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(165, 841, this.petZizhiArr, 10);

        }


        /**宠物资质3 */
        public onzizhi3_btn() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(149, 889, this.petZizhiArr, 11);

        }

        /**宠物基础属性1 */
        public onPetAttr1() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(185, 657, this.petBaseAttr, 12);

        }

        /**宠物基础属性2 */
        public onPetAttr2() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(181, 697, this.petBaseAttr, 13);

        }

        /**宠物基础属性3 */
        public onPetAttr3() {
            this._SaleSearchBtnListViewMediator.show();
            this._SaleSearchBtnListViewMediator.showSearchList(171, 757, this.petBaseAttr, 14);

        }

        /**
         * 装备出售状态
         * @param index 上架中 公示中
         */
        public flushEquSellRadio(index) {
            this._viewUI.radiogemsell.selectedIndex = index;
        }

        /**
         * 装备品质
         * @param index 紫色品质 橙色品质
         */
        public flushEququality(index) {
            this._viewUI.color_radio.selectedIndex = index;
        }

        /**刷新装备部件 */
        public flushEquPartsBtn(index) {
            var name = this.equPartsArr[index].name;
            var id = this.equPartsArr[index].id;
            this.equSearchDic.set(1, id);
            this._viewUI.equ_btn.label = name;
        }

        /**装备等级 */
        public flushEquLevelBtn(index) {
            var name = this.equLevelArr[index].name;
            var id = this.equLevelArr[index].id;
            this._viewUI.equLevel_btn.label = name;
            this.equSearchDic.set(2, id);
        }
        /**装备基础属性1 */
        public flushEquBaseAttr1(index) {
            var name = this.equBaseAttrArr[index].name;
            var id = this.equBaseAttrArr[index].id;
            this._viewUI.baseAttr1_btn.label = name;
            this.equSearchDic.set(3, id);
        }
        /**装备基础属性2 */
        public flushEquBaseAttr2(index) {
            var name = this.equBaseAttrArr[index].name;
            var id = this.equBaseAttrArr[index].id;
            this._viewUI.baseAttr2_btn.label = name;
            this.equSearchDic.set(4, id);
        }
        /**装备基础属性3 */
        public flushEquBaseAttr3(index) {
            var name = this.equBaseAttrArr[index].name;
            var id = this.equBaseAttrArr[index].id;
            this._viewUI.baseAttr3_btn.label = name;
            this.equSearchDic.set(5, id);
        }

        /**装备特效 */
        public flushEquTeXiao(index) {
            var name = this.equTeXiaoArr[index].name;
            var id = this.equTeXiaoArr[index].id;
            this._viewUI.texiao_btn.label = name;
            this.equSearchDic.set(6, id);
        }

        /**装备特技 */
        public flushEquTeJi(index) {
            var name = this.equTeJiArr[index].name;
            var id = this.equTeJiArr[index].id;
            this._viewUI.teji_btn.label = name;
            this.equSearchDic.set(7, id);
        }

        /**装备附加属性 */
        public flushAddAttr(index) {
            var name = this.equAddAttr[index].name;
            var id = this.equAddAttr[index].id;
            this._viewUI.addAttr_btn.label = name;
            this.equSearchDic.set(8, id);
        }

        /**普通宠物 */
        public flushOrdinaryPet(index) {
            var name = this.ordinaryPet[index].name;
            var id = this.ordinaryPet[index].id;
            this._viewUI.pet_btn.label = name;
            this.isLingshou = false;
            this.petSearchDic.set("pet", index);
        }

        /**灵兽 */
        public flushLingshou(index) {
            var name = this.lingshou[index].name;
            var id = this.lingshou[index].id;
            this._viewUI.pet_btn.label = name;
            this.isLingshou = true;
            this.petSearchDic.set("pet", index);
        }

        /**宠物技能 */
        public flushPetSkill() {
            var petSkillIndexArr = SaleModel._instance.petSkillIndexArr;
            var str = "";
            for (var i = 0; i < petSkillIndexArr.length; i++) {
                var index = petSkillIndexArr[i];
                var name = this.petSkill[index].skillname;
                str += name + "  ";
            }
            this._viewUI.petSkill_btn.label = str;
        }

        /**宠物资质1 */
        public flushPetZizhi1(index) {
            var name = this.petZizhiArr[index].name;
            var id = this.petZizhiArr[index].id;
            this._viewUI.zizhi1_btn.label = name;
            this.petSearchDic.set("petZizhi1", id);
        }

        /**宠物资质2 */
        public flushPetZizhi2(index) {
            var name = this.petZizhiArr[index].name;
            var id = this.petZizhiArr[index].id;
            this._viewUI.zizhi2_btn.label = name;
            this.petSearchDic.set("petZizhi2", id);
        }

        /**宠物资质3 */
        public flushPetZizhi3(index) {
            var name = this.petZizhiArr[index].name;
            var id = this.petZizhiArr[index].id;
            this._viewUI.zizhi3_btn.label = name;
            this.petSearchDic.set("petZizhi3", id);
        }

        /**宠物基础属性1 */
        public flushPetBaseAttr1(index) {
            var name = this.petBaseAttr[index].name;
            var id = this.petBaseAttr[index].id;
            this._viewUI.petBaseAttr_btn1.label = name;
            this.petSearchDic.set("petBaseAttr1", id);

        }

        /**宠物基础属性2 */
        public flushPetBaseAttr2(index) {
            var name = this.petBaseAttr[index].name;
            var id = this.petBaseAttr[index].id;
            this._viewUI.petBaseAttr2_btn.label = name;
            this.petSearchDic.set("petBaseAttr2", id);

        }

        /**宠物基础属性3 */
        public flushPetBaseAttr3(index) {
            var name = this.petBaseAttr[index].name;
            var id = this.petBaseAttr[index].id;
            this._viewUI.petBaseAttr3_btn.label = name;
            this.petSearchDic.set("petBaseAttr3", id);

        }

        /**增加属性1 */
        public onAddAttr1() {
            this._viewUI.baseAttr2_box.visible = true;
        }

        /**增加属性2 */
        public onAddAttr2() {
            this._viewUI.baseAttr3_box.visible = true;
        }

        /**减少属性2 */
        public onlessAttr2() {
            if (this._viewUI.baseAttr3_box.visible) {
                this._viewUI.baseAttr3_box.visible = false;

            } else {
                this._viewUI.baseAttr2_box.visible = false;
            }
        }

        /**减少属性3 */
        public onlessAttr3() {
            this._viewUI.baseAttr3_box.visible = false;
        }

        /**
         * 普通搜索
         */
        public onSearch() {
            this._viewUI.searchResult_list.visible = true;
            this.searchResultArr.length = 0;
            var searchText = this._viewUI.input.text;
            var reg = new RegExp(searchText);
            for (var i = 0; i < this.searchTotalNameArr.length; i++) {
                var name = this.searchTotalNameArr[i].name;
                var firstno = this.searchTotalNameArr[i].firstno;
                var twono = this.searchTotalNameArr[i].twono;
                var id = this.searchTotalNameArr[i].id;
                var itemid = this.searchTotalNameArr[i].itemid;
                var itemtype = this.searchTotalNameArr[i].itemtype;
                var logictype = this.searchTotalNameArr[i].logictype;
                var valuerange = this.searchTotalNameArr[i].valuerange;
                if (name == searchText) {
                    var searchResult: Dictionary = new Dictionary();
                    searchResult.set("firstno", firstno);
                    searchResult.set("twono", twono);
                    searchResult.set("id", id);
                    searchResult.set("name", name);
                    searchResult.set("itemid", itemid);
                    searchResult.set("itemtype", itemtype);
                    searchResult.set("logictype", logictype);
                    searchResult.set("valuerange", valuerange);
                    var searchRecordArr = SaleModel._instance.searchRecordArr;
                    if (searchRecordArr.indexOf(name) < 0) {
                        if (searchRecordArr.length >= 8) {
                            SaleModel._instance.searchRecordArr.shift();
                        }
                        SaleModel._instance.searchRecordArr.push(name);
                    }
                    this.search(searchResult);
                } else {
                    if (name.match(reg) != null) {
                        this.searchResultArr.push({ name: name });
                    }
                }
            }
            this.showSearchResult();    // 显示搜索结果
        }

        /**珍品装备 珍品宠物搜索返回的结果 */
        public gemEquipPetSeek(): void {
            var browsetype = SaleModel._instance.SearchResultData.get("browsetype");
            if (browsetype == 1) {
                SaleModel.getInstance().isSeekback = true;
                models.SaleModel._instance.tiaozhuanid = ViewIndex.BUY;
                models.SaleProxy._instance.event(models.buyGemEguipPetSeek);
            } else {
                SaleModel.getInstance().isSeekback = true;
                models.SaleModel._instance.tiaozhuanid = ViewIndex.PUBLICITY;
                models.SaleProxy._instance.event(models.attentionGemEguipPetSeekSearch, actiontype.search);
            }
            this.closeThisView();
        }

        /**搜索 */
        public search(searchResult) {
            var selectedIndex = this._viewUI.saleState_radio.selectedIndex;
            if (selectedIndex == 0) {
                models.SaleProxy._instance.event(models.buySearch, searchResult);
                models.SaleModel._instance.tiaozhuanid = 0;
            } else {
                models.SaleProxy._instance.event(models.attentionSearch, searchResult);
                models.SaleModel._instance.tiaozhuanid = 2;
            }
            this.closeThisView();
        }

        /**
         * 珍品装备搜索
         */
        public onEquSearchBtn() {
            var equPartsId = this.equSearchDic.get(1);  //装备部件id
            var equLevelId = this.equSearchDic.get(2);  //装备等级
            var baseAttr1 = this.equSearchDic.get(3);   //基础属性1
            var baseAttr2 = this.equSearchDic.get(4);   //基础属性2
            var baseAttr3 = this.equSearchDic.get(5);   //基础属性3
            var equTeXiaoId = this.equSearchDic.get(6); //装备特效
            var equTeJiId = this.equSearchDic.get(7);   //装备特技
            var addAttr = this.equSearchDic.get(8);     //附加属性
            var color = [];  //品质
            var index = this._viewUI.color_radio.selectedIndex;
            if (index == 0) {
                color.push(4);
            } else if (index == 1) {
                color.push(5);
            }
            var minPrice = this._viewUI.minPrice_input.text;
            var equMinPrice = 0;  //最小价格
            if (minPrice != "") {
                equMinPrice = parseInt(minPrice);
            }
            var maxPrice = this._viewUI.maxPrice_input.text;
            var equMaxPrice = 0;   //最大价格
            if (maxPrice != "") {
                equMaxPrice = parseInt(maxPrice);
            }
            var basicattr = [];   //基础属性
            if (this._viewUI.baseAttr1_box.visible) {
                var baseAttrNum1 = this._viewUI.baseAttr1_input.text;  //基础属性1的值
                var num1 = 0;
                var baseAttr1 = this.equSearchDic.get(3);   //基础属性1 id
                if (baseAttrNum1 != "") {
                    num1 = parseInt(baseAttrNum1);
                }
                basicattr.push({ attrid: baseAttr1, attrval: num1 });
            }
            if (this._viewUI.baseAttr2_box.visible) {
                var baseAttrNum2 = this._viewUI.baseAttr2_input.text;  //基础属性2的值
                var baseAttr2 = this.equSearchDic.get(4);   //基础属性2
                var num2 = 0;
                if (baseAttrNum2 != "") {
                    num2 = parseInt(baseAttrNum2);
                }
                basicattr.push({ attrid: baseAttr2, attrval: num2 });
            }
            if (this._viewUI.baseAttr3_box.visible) {
                var baseAttrNum3 = this._viewUI.baseAttr3_input.text;  //基础属性3的值
                var baseAttr3 = this.equSearchDic.get(5);   //基础属性3
                var num3 = 0;
                if (baseAttrNum3 != "") {
                    num3 = parseInt(baseAttrNum3);
                }
                basicattr.push({ attrid: baseAttr3, attrval: num3 })
            }
            var addAttrArr = [];
            var addAttrNum = this._viewUI.totalAttr_input.text;
            var totalattr = 0;  //属性总和
            if (addAttrNum != "") {
                totalattr = parseInt(addAttrNum);
            }
            addAttrArr.push(addAttr);   //附加属性
            var score = this._viewUI.score_input.text;
            var equScore = 0;   //评分
            if (score != "") {
                equScore = parseInt(score);
            }
            var sellstate = this._viewUI.radiogemsell.selectedIndex == 0 ? 1 : 2;    // 出售状态 1上架 2公示
            this.CMarketSearchEquip(equPartsId, equLevelId, equMinPrice, equMaxPrice, equTeXiaoId, equTeJiId, color, basicattr, addAttrArr, totalattr, equScore, sellstate);
        }
        /**
         * 宠物搜索
         */
        public petSearch() {
            var petSkillIndexArr = SaleModel._instance.petSkillIndexArr;
            var index = this.petSearchDic.get("pet");
            var petId = 0;      //宠物id
            if (this.isLingshou) {
                petId = this.lingshou[index].id;
            } else {
                petId = this.ordinaryPet[index].id;
            }
            var petMinPrice_input = this._viewUI.petMinPrice_input.text;
            var petMinPrice = 0;  //最小价格
            if (petMinPrice_input != "") {
                petMinPrice = parseInt(petMinPrice_input);
            }
            var petMaxPrice_input = this._viewUI.petMaxPrice_input.text;
            var petMaxPrice = 0;  //最大价格
            if (petMaxPrice_input != "") {
                petMaxPrice = parseInt(petMaxPrice_input);
            }
            var petMinLevel_input = this._viewUI.petMinLevel_input.text;
            var petMinLevel = 0; //最小等级
            if (petMinLevel_input != "") {
                petMinLevel = parseInt(petMinLevel_input);
            }
            var petMaxLevel_input = this._viewUI.petMaxLevel_input.text;
            var petMaxLevel = 0; //最大等级
            if (petMaxLevel_input != "") {
                petMaxLevel = parseInt(petMaxLevel_input);
            }
            var petSkillNum_input = this._viewUI.petSkillNum_input.text;
            var petSkillNum = 0;  //技能总数
            if (petSkillNum_input != "") {
                petSkillNum = parseInt(petSkillNum_input);
            }
            var petSkillIndexArr = SaleModel._instance.petSkillIndexArr;   //选择的技能index
            var skills = [];    //包含技能
            for (var i = 0; i < petSkillIndexArr.length; i++) {
                var index = petSkillIndexArr[i];
                var skill = this.petSkill[index];
                skills.push(skill);
            }
            var zizhi = []; //资质
            var petZizhi1 = this.petSearchDic.get("petZizhi1");   //资质1 id
            var petZizhi2 = this.petSearchDic.get("petZizhi2");   //资质2 id
            var petZizhi3 = this.petSearchDic.get("petZizhi3");   //资质3 id
            var zizhi1_input = this._viewUI.zizhi1_input.text;
            var zizhi1 = 0;    //资质1的值
            if (zizhi1_input != "") {
                zizhi1 = parseInt(zizhi1_input);
            }
            if (petZizhi1 != undefined) {
                var attrid = petZizhi1;
                var attrval = zizhi1;
                zizhi.push({ attrid, attrval });
            }
            var zizhi2_input = this._viewUI.zizhi2_input.text;
            var zizhi2 = 0;    //资质2的值
            if (zizhi2_input != "") {
                zizhi2 = parseInt(zizhi2_input);
            }
            if (petZizhi2 != undefined) {
                var attrid = petZizhi2;
                var attrval = zizhi2;
                zizhi.push({ attrid, attrval });
            }
            var zizhi3_input = this._viewUI.zizhi3_input.text;
            var zizhi3 = 0;    //资质3的值
            if (zizhi3_input != "") {
                zizhi3 = parseInt(zizhi3_input);
            }
            if (petZizhi3 != undefined) {
                var attrid = petZizhi3;
                var attrval = zizhi3;
                zizhi.push({ attrid, attrval });
            }
            var attr = [];  //基础属性
            var petBaseAttrId1 = this.petSearchDic.get("petBaseAttr1");  //基础属性1 id
            var petBaseAttrId2 = this.petSearchDic.get("petBaseAttr2");  //基础属性2 id 
            var petBaseAttrId3 = this.petSearchDic.get("petBaseAttr3");  //基础属性3 id
            var petBaseAttr1_input = this._viewUI.petBaseAttr1_input.text;
            var petBaseAttr1 = 0;
            if (petBaseAttr1_input != "") {
                petBaseAttr1 = parseInt(petBaseAttr1_input);
            }
            if (petBaseAttrId1 != undefined) {
                var attrid = petBaseAttrId1;
                var attrval = petBaseAttr1;
                attr.push({ attrid, attrval });
            }
            var petBaseAttr2_input = this._viewUI.petBaseAttr2_input.text;
            var petBaseAttr2 = 0;
            if (petBaseAttr2_input != "") {
                petBaseAttr2 = parseInt(petBaseAttr2_input);
            }
            if (petBaseAttrId2 != undefined) {
                var attrid = petBaseAttrId2;
                var attrval = petBaseAttr2;
                attr.push({ attrid, attrval });
            }
            var petBaseAttr3_input = this._viewUI.petBaseAttr3_input.text;
            var petBaseAttr3 = 0;
            if (petBaseAttr3_input != "") {
                petBaseAttr3 = parseInt(petBaseAttr3_input);
            }
            if (petBaseAttrId3 != undefined) {
                var attrid = petBaseAttrId3;
                var attrval = petBaseAttr3;
                attr.push({ attrid, attrval });
            }
            var petScore_input = this._viewUI.petScore_input.text;
            var petScore = 0;   //评分
            if (petScore_input != "") {
                petScore = parseInt(petScore_input);
            }
            var sellstate = this._viewUI.randiosell.selectedIndex == 0 ? 1 : 2;    // 出售状态 1上架 2公示
            this.CMarketSearchPet(petId, petMinLevel, petMaxLevel, petMinPrice, petMaxPrice, zizhi, skills, petSkillNum, attr, petScore, sellstate);
        }

        /**
         * 搜索珍品宠物界面重置
         */
        private petRestInitUI(): void {
            let arruitext: Array<any> = [];             //text文本框数组
            let arruibutton: Array<any> = [];           //button按钮数组
            arruitext.push(
                this._viewUI.petMinPrice_input, this._viewUI.petMaxPrice_input,
                this._viewUI.petMinLevel_input, this._viewUI.petMaxLevel_input,
                this._viewUI.petSkillNum_input, this._viewUI.zizhi1_input,
                this._viewUI.petBaseAttr1_input, this._viewUI.petBaseAttr2_input,
                this._viewUI.petBaseAttr3_input, this._viewUI.petScore_input,
                this._viewUI.zizhi2_input, this._viewUI.zizhi3_input,
            );
            arruibutton.push(
                this._viewUI.zizhi1_btn, this._viewUI.zizhi2_btn,
                this._viewUI.zizhi3_btn, this._viewUI.petBaseAttr_btn1,
                this._viewUI.petBaseAttr2_btn, this._viewUI.petBaseAttr3_btn,
                this._viewUI.petSkill_btn,
            );
            for (var i = 0; i < arruitext.length; i++) {
                arruitext[i].text = "";
            }
            for (var i = 0; i < arruibutton.length; i++) {
                arruibutton[i].label = "";
            }
            // 默认选中玄冰晶
            var name = this.lingshou[0].name;
            this._viewUI.pet_btn.label = name;
            // 把选中的单选框改为 0 默认的
            this._viewUI.randiosell.selectedIndex = 0;
            this._viewUI.petType_redio.selectedIndex = 0;
        }

        /**显示搜索结果 */
        public showSearchResult() {
            var searchList = this._viewUI.searchResult_list;
            this._viewUI.searchRecord_list.visible = false;
            searchList.visible = true;
            if (this.searchResultArr.length > 0) {
                SaleModel._instance.showList(searchList, this.searchResultArr);
            }
            searchList.renderHandler = new Handler(this, this.searchRender);
        }

        /**渲染 */
        public searchRender(cell: Box, index: number) {
            var resultBtn = cell.getChildByName("result_Btn") as Button;
            resultBtn.label = this.searchResultArr[index].name;
            resultBtn.on(LEvent.MOUSE_UP, this, this.onResultBtn, [cell, index]);
        }

        /**选择结果 */
        public onResultBtn(cell, index) {
            var resultBtn = cell.getChildByName("result_Btn") as Button;
            var name = resultBtn.label;
            this._viewUI.input.text = name;
            this._viewUI.searchResult_list.visible = false;
        }

        /**显示普通搜索记录 */
        public showSearchRecord() {
            var searchRecordArr = SaleModel._instance.searchRecordArr;
            if (searchRecordArr.length > 0) {
                this._viewUI.searchRecord_list.visible = true;
                SaleModel._instance.showList(this._viewUI.searchRecord_list, searchRecordArr);
                this._viewUI.searchRecord_list.renderHandler = new Handler(this, this.searchRecordRender);
            }
        }

        /**搜索记录列表渲染 */
        public searchRecordRender(cell: Box, index: number) {
            var record = cell.getChildByName("record_Btn") as Button;
            record.label = SaleModel._instance.searchRecordArr[index];
            record.on(LEvent.MOUSE_UP, this, this.onRecordBtn, [cell, index]);

        }

        /**点击搜索记录 */
        public onRecordBtn(cell, index) {
            var record = cell.getChildByName("record_Btn") as Button;
            var name = record.label;
            this._viewUI.input.text = name;
        }

        /**遍历一级表 */
        public searchFirstTab() {
            for (var i = 0; i < Object.keys(this.m_cMarketFirstTableData).length; i++) {
                var secondmenus = this.m_cMarketFirstTableData[i].cMarketFirstTableData.secondmenus;
                for (var j = 0; j < secondmenus.length; j++) {
                    this.searchSecondTab(secondmenus[j]);
                }
            }
        }
        /**遍历二级表 */
        public searchSecondTab(index) {
            var thirdmenus = this.cMarketSecondTableData[index].thirdmenus;
            for (var i = 0; i < thirdmenus.length; i++) {
                this.searchThreeTab(thirdmenus[i]);
            }
        }
        /**遍历三级表 */
        public searchThreeTab(index) {
            var MarketThreeTableData = this.cMarketThreeTableData[index];
            var itemtype = MarketThreeTableData.itemtype;   //物品类型
            var itemid = MarketThreeTableData.itemid; //物品id
            var firstno = MarketThreeTableData.firstno; //一级菜单id
            var twono = MarketThreeTableData.twono; //二级菜单id
            var id = MarketThreeTableData.id;  //三级页签类型
            var logictype = MarketThreeTableData.logictype; //逻辑类型
            var valuerange = MarketThreeTableData.valuerange;
            if (itemtype == 1 || itemtype == 4 || itemtype == 3) {   //道具复合表
                var name = this.itemAttrData[itemid].name;
                this.searchTotalNameArr.push({
                    name: name, itemid: itemid, firstno: firstno, twono: twono, id: id, itemtype: itemtype,
                    logictype: logictype, valuerange: valuerange
                });
            } else if (itemtype == 2) {  //宠物
                var name = this.petCPetAttrData[itemid].name;
                this.searchTotalNameArr.push({
                    name: name, itemid: itemid, firstno: firstno, twono: twono,
                    id: id, itemtype: itemtype, logictype: logictype, valuerange: valuerange
                });
            }
        }

        /**
         * 摆摊珍品装备搜索
         * @param euqiptype 类型
         * @param level 等级
         * @param pricemin 最小价格
         * @param pricemax 最大价格
         * @param effect 特效
         * @param skill 特技
         * @param color 品质，4紫，5橙
         * @param basicattr 基础属性
         * @param additionalattr 附加属性
         * @param totalattr 属性总和
         * @param score 评分
         * @param sellstate 出售状态 1上架，2公示
         */
        public CMarketSearchEquip(euqiptype: number, level: number, pricemin: number, pricemax: number, effect: number, skill: number, color: Array<any>, basicattr: Array<any>,
            additionalattr: Array<any>, totalattr: number, score: number, sellstate: number) {
            RequesterProtocols._instance.c2s_CMarketSearchEquip(euqiptype, level, pricemin, pricemax, effect, skill, color, basicattr, additionalattr, totalattr, score, sellstate);
        }


        /**
         * 摆摊宠物搜索
         * @param pettype 类型
         * @param levelmin 最低等级
         * @param levelmax 最高等级
         * @param pricemin 最低价格
         * @param pricemax 最高价格
         * @param zizhi 资质成长
         * @param skills 包含技能
         * @param totalskillnum 技能总数
         * @param attr 基础属性
         * @param score 评分
         * @param sellstate 出售状态 1上架，2公示
         */
        public CMarketSearchPet(pettype, levelmin, levelmax, pricemin, pricemax, zizhi: Array<any>, skills: Array<any>, totalskillnum, attr: Array<any>, score, sellstate) {
            RequesterProtocols._instance.c2s_CMarketSearchPet(pettype, levelmin, levelmax, pricemin, pricemax, zizhi, skills, totalskillnum, attr, score, sellstate);
        }

        public show(): void {
            super.show();
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}