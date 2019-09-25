/**
* 宠物上架详情界面 
*/
module game.modules.sale {
    export class SalePetViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.SalePetShelfUI;
        private _AuctionSell: SaleSellViewMediator;
        private _AuctionGongshi: SaleGongshiViewMediator;
        private _XiaoJianPanMediator: game.modules.tips.XiaoJianPanMediator;
        private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
        private _tipsModule: game.modules.tips.tipsModule;
        /**复合表 */
        itemAttrData = BagModel.getInstance().itemAttrData;
        /**宠物技能显示表 */
        petSkillConfigData = game.modules.pet.models.PetModel._instance.petSkillConfigData;
        /**宠物信息表 */
        petCPetAttrData = game.modules.pet.models.PetModel._instance.petCPetAttrData;
        /**npc造型表 */
        cnpcShapeData = game.modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo;
        /**宠物上架价格 */
        petprice = 0;
        /**点击小键盘后的数字 */
        totalNum = "";
        petSkillListArr: Array<any> = [];
        /**物品上架最高价格 */
        currentlimitNum = 999999999;
        /**最高摊位费 */
        boothPriceLimitMax = 100000;
        /**最低摊位费 */
        boothPriceLimitMin = 1000;
        /**客户端信息提示表 */
        chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
        /**银币不足界面 */
		private _JinBiBuZuViewMediator:commonUI.JinBiBuZuViewMediator;
        /**弹出类型的tips */
        private _TipsMessageMediator:game.modules.tips.TipsMessageMediator;

        constructor(uiLayer: Sprite, app: AppBase, isBuyPet?) {
            super(uiLayer);
            this._viewUI = new ui.common.SalePetShelfUI();
            this.isCenter = false;
            this._app = app;
            this._JinBiBuZuViewMediator = new commonUI.JinBiBuZuViewMediator(this._viewUI,this._app);
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.boothTips_btn.on(LEvent.MOUSE_DOWN, this, this.onBoothTipsBtn);
            this._viewUI.buyPet_btn.on(LEvent.MOUSE_DOWN, this, this.buyPet);
            models.SaleProxy._instance.on(models.SMarketPetTips, this, this.showPetDetails, [SaleModel.salePetMarketUpOrDown.MarketDown]);
            this.addPetSkillList();
            this._viewUI.buyPet_box.visible = false;
            if (isBuyPet == true) {
                this.showbuyPet();
            }
            
        }

        /**显示购买宠物 */
        public showbuyPet() {
            this._viewUI.buyPet_box.visible = true;
            this._viewUI.cancel_btn.visible = false;
            this._viewUI.shelf_btn.visible = false;
        }

        /**购买宠物 */
        public buyPet() {
            models.SaleProxy._instance.event(models.butPet);
            this.hide();
        }

        /**提示信息弹窗 */
        public onBoothTipsBtn() {
            var parame: Dictionary = new Dictionary();
            parame.set("contentId", 150507)
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parame);
        }

        /**显示宠物详情 */
        public showPetDetails(salePetMarketUpOrDown, pet) {
            var petId = pet.id;
            var petName = pet.name;    //名称
            var petLevel = pet.level;    //等级
            var petkey = pet.key;   // key
            var quality = this.petCPetAttrData[petId].quality;   //品质
            var modelid = this.petCPetAttrData[petId].modelid; //造型id
            var petName = this.petCPetAttrData[petId].name;  //名称
            var petIconId = this.cnpcShapeData[modelid].littleheadID;  //iconid
            var petIcon = SaleModel._instance.getIcon(petIconId);
            var frameImg = StrengTheningModel._instance.frameSkinArr[quality - 1];
            this._viewUI.petName_lab.text = petName;
            this._viewUI.itemLv_lab.text = petLevel;
            this._viewUI.petIcon_img.skin = petIcon + "";
            this._viewUI.petFrame_img.skin = frameImg;
            this.ontab(pet, 0);         // 显示宠物属性的方法
            this._viewUI.detailsBtn_tab.selectHandler = new Handler(this, this.ontab, [pet]);
            if (salePetMarketUpOrDown == SaleModel.salePetMarketUpOrDown.MarketUp) {
                this._viewUI.shelf_btn.label = SaleModel.salePetMarketUpOrDown.MarketUp;
                this._viewUI.petPrice_label.on(LEvent.MOUSE_DOWN, this, this.onPrice);
                this._viewUI.petBoothPrice_label.text = "1000";  //默认摆摊银币为1000
            } else {
                this._viewUI.shelf_btn.label = SaleModel.salePetMarketUpOrDown.MarketDown;
                this._viewUI.boothFee_box.visible = false;
                this._viewUI.petPrice_label.text = this.petprice + "";
            }
            this._viewUI.shelf_btn.on(LEvent.MOUSE_DOWN, this, this.onMarket, [petkey]);
        }

        /**显示小键盘 */
        public onPrice() {
            this._XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
            this._XiaoJianPanMediator.onShow(190, 640);
            game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.setPetPrice);
        }

        /**通过小键盘设置价格 */
        public setPetPrice(num) {
            if (num == -2) {  //点击了ok
                if (this.totalNum == "" || this.totalNum.charAt(0) == "0") {
                    this.totalNum = "1";
                }
            }
            if (num == -1) {  //点击了删除
                this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
                if (this.totalNum.length <= 0) {
                    this.totalNum = "0";
                }
            }
            var onePriceLabel = this._viewUI.petPrice_label;
            var oneBoothPriceLabel = this._viewUI.petBoothPrice_label;
            if (num >= 0) {
                if (typeof (this.totalNum) === "number") {
                    this.totalNum = "";
                }
                var oneChar = this.totalNum.charAt(0);
                if (oneChar != '0') {
                    this.totalNum += num;
                } else {
                    this.totalNum = num;
                }
            }
            if (parseInt(this.totalNum) <= this.currentlimitNum) {
                onePriceLabel.text = this.totalNum;
            } else {
                onePriceLabel.text = this.currentlimitNum + "";
                let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                this.DisappearMessageTipsMediator.onShow(prompt);
            }
            if (parseInt(this.totalNum) <= this.boothPriceLimitMin) {
                oneBoothPriceLabel.text = this.boothPriceLimitMin + "";
            } else if (this.boothPriceLimitMin <= parseInt(this.totalNum) && parseInt(this.totalNum) <= this.boothPriceLimitMax) {
                oneBoothPriceLabel.text = this.totalNum;
            } else {
                oneBoothPriceLabel.text = this.boothPriceLimitMax + "";
            }
        }

        /**
         * 上架宠物
         * @param petKey 
         */
        public onMarket(petKey) {
            var price = this._viewUI.petPrice_label.text;
            var m_price = parseInt(price);
            var money = game.modules.bag.models.BagModel._instance.sliverIcon;
            if (m_price > 0) {
                var petBoothPrice = this._viewUI.petBoothPrice_label.text;
                var level = game.modules.createrole.models.LoginModel.getInstance().roleDetail.level;
                var rolelevel = HudModel._instance.levelNum; //人物等级
                if (rolelevel >= 30) { //宠物等级大于30才能拍卖
                    if (parseInt(petBoothPrice) <= money) {
                        this.CMarketUp(BagTypes.DEPOT, petKey, 1, m_price);
                        this.hide();
                    } else { //银币不足
                        // let prompt = this.chatMessageTips[120025].msg;
                        // this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                        // this.DisappearMessageTipsMediator.onShow(prompt);
                        var duihuanMoney = parseInt(petBoothPrice) - HudModel.getInstance().sliverNum;//需要兑换的钱
                        this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI).toString(), Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI).toString());
                        this._JinBiBuZuViewMediator.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
                        this._JinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
                    }
                } else {  //等级不足30
                    let prompt = this.chatMessageTips[150022].msg;
                    this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                    this.DisappearMessageTipsMediator.onShow(prompt);
                }
            } else {    //提示输入物品价格
                let prompt = this.chatMessageTips[150510].msg;
                this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                this.DisappearMessageTipsMediator.onShow(prompt);
            }
        }

        /**元宝兑换金币 */
		public goCharge(yuanbao) {
			var fuShiNum = HudModel.getInstance().fuShiNum;			// 元宝的数量
			if (fuShiNum < yuanbao) {
				this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI,this._app);
				this._TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", RoleEnum.XIANJIN_TIP);
				this._TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			}else{
				RequesterProtocols._instance.c2s_exchange_currency(3,2,yuanbao);
			}
		}

		/**通过元宝购买物品 */
		public buySliverFromYuanBao(yuanbao) {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			//如果元宝不够
			if(fuShiNum < yuanbao){
				this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI,this._app);
				this._TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", RoleEnum.XIANJIN_TIP);
				this._TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			}else{
				RequesterProtocols._instance.c2s_exchange_currency(3,1,yuanbao);
			}
		}

		/**充值 */
		public goRecharge() {
			this._JinBiBuZuViewMediator.hide();
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界
		}

        /**选择显示宠物技能、资质、属性 */
        public ontab(pet, index: number) {
            this._viewUI.detailsView_vstack.selectedIndex = index;
            switch (index) {
                case 0:
                    this.showPetSkill(pet);  //宠物技能
                    break;
                case 1:
                    this.showPetZizhi(pet);  //宠物资质
                    break;
                case 2:
                    this.showPetAttr(pet);  //宠物属性
                    break;
            }
        }

        /**初始化技能格子 */
        public addPetSkillList() {
            var petskilllist = this._viewUI.petskill_list;
            for (var i = 0; i < 12; i++) {
                this.petSkillListArr.push({ petSkillId: -1, skillFrame_img: -1, skillIcon_img: -1 });
            }
        }

        /**
         * 显示宠物技能
         */
        public showPetSkill(pet) {
            var petId = pet.id;
            var skillidArr = [];   //技能
            var skills = pet.skills;
            for (var j in skills) {
                var skillId = skills[j].skillId;
                var skilltype = skills[j].skilltype;
                skillidArr.push({ skillId: skillId, skilltype: skilltype });
            }
            for (var i = 0; i < skillidArr.length; i++) {
                var skillid = skillidArr[i].skillId;
                var iconId = this.petSkillConfigData[skillid].icon;
                var icon = SaleModel._instance.getIcon(iconId);
                var color = this.petSkillConfigData[skillid].color;  //品质
                var skilltype = this.petSkillConfigData[skillid].skilltype; // 类型
                var skillFrame = "";
                if (skilltype == 1) {  //被动
                    skillFrame = "common/ui/pet/beiji" + color + ".png";
                } else if (skilltype == 2) {
                    skillFrame = "common/ui/pet/zhuji" + color + ".png";
                }
                this.petSkillListArr[i].skillFrame_img = skillFrame;
                this.petSkillListArr[i].petSkillId = skillid;
                this.petSkillListArr[i].skillIcon_img = icon;
            }
            var petskilllist = this._viewUI.petskill_list;
            petskilllist.array = this.petSkillListArr;
            petskilllist.repeatX = 4;
            petskilllist.repeatY = 3;
            petskilllist.vScrollBarSkin = "";
            petskilllist.selectHandler = new Handler(this, this.petskilllistSelect)
        }

        /**点击技能 */
        public petskilllistSelect(index: number) {
            if (this._viewUI.petskill_list.selectedIndex != -1) {
                var petSkillId = this.petSkillListArr[index].petSkillId;
                if (petSkillId != -1) {
                    var parame: Dictionary = new Dictionary();
                    parame.set("itemId", petSkillId)
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
                }
                this._viewUI.petskill_list.selectedIndex = -1;
            }
        }

        /**
         * 宠物资质
         */
        public showPetZizhi(pet) {
            var attackaptmax = this.petCPetAttrData[pet.id].attackaptmax;
            var gjzz = ((pet.attackapt / attackaptmax) * 100).toFixed(2);
            this._viewUI.gjzz_probar.value = parseInt(gjzz) / 100;
            this._viewUI.gjzz_label.text = pet.attackapt;
            var defendaptmax = this.petCPetAttrData[pet.id].defendaptmax;
            var fyzz = ((pet.defendapt / defendaptmax) * 100).toFixed(0);
            this._viewUI.fyzz_probar.value = parseInt(fyzz) / 100;
            this._viewUI.fyzz_label.text = pet.defendapt;
            var phyforceaptmax = this.petCPetAttrData[pet.id].phyforceaptmax;
            var tlzz = ((pet.phyforceapt / phyforceaptmax) * 100).toFixed(0);
            this._viewUI.tlzz_probar.value = parseInt(tlzz) / 100;
            this._viewUI.tlzz_label.text = pet.phyforceapt;
            var speedaptmax = this.petCPetAttrData[pet.id].speedaptmax;
            var sdzz = ((pet.speedapt / speedaptmax) * 100).toFixed(0);
            this._viewUI.sdzz_probar.value = parseInt(sdzz) / 100;
            this._viewUI.sdzz_label.text = pet.speedapt;
            var magicaptmax = this.petCPetAttrData[pet.id].magicaptmax;
            var fszz = ((pet.magicapt / magicaptmax) * 100).toFixed(0);
            this._viewUI.fszz_probar.value = parseInt(fszz) / 100;
            this._viewUI.fszz_label.text = pet.magicapt;
            this._viewUI.cwcz_label.text = pet.growrate * 0.001 + "";
            var growrate = this.petCPetAttrData[pet.id].growrate;
            var totalgrowrate = growrate[growrate.length - 1];
            var chengz = ((pet.growrate / totalgrowrate) * 100).toFixed(0);
            this._viewUI.cwcz_proBar.value = parseFloat(chengz) / 100;
            this._viewUI.useOne_lab.text = pet.aptaddcount;
            this._viewUI.useTwo_lab.text = pet.growrateaddcount;
        }

        /**
         * 宠物属性
         */
        public showPetAttr(pet) {
            this._viewUI.hpNumber_lab.text = pet.hp;
            this._viewUI.mpNumber_lab.text = pet.mp;
            this._viewUI.attackNumber_lab.text = pet.attack;
            this._viewUI.defenseNumber_lab.text = pet.defend;
            this._viewUI.magicAttackNumber_lab.text = pet.magicattack;
            this._viewUI.magicDefenseNumber_lab.text = pet.magicdef;
            this._viewUI.spendNumber_lab.text = pet.speed;
            this._viewUI.tiZhiNumber_lab.text = pet.autoaddcons;
            this._viewUI.zhiLiNumber_lab.text = pet.autoaddiq;
            this._viewUI.liLiangNumber_lab.text = pet.autoaddstr;
            this._viewUI.naiLiNumber_lab.text = pet.autoaddendu;
            this._viewUI.minJieNumber_lab.text = pet.autoaddagi;
            this._viewUI.qianLiNumber_lab.text = pet.point;
            this._viewUI.lifeNumber_lab.text = pet.life;

        }

        /**
		 * 物品上架
		 * @param containertype 背包类型
		 * @param key key
		 * @param num 数量
		 * @param price 价格
		 */
        public CMarketUp(containertype, key, num, price) {
            if (this._viewUI.shelf_btn.label == SaleModel.salePetMarketUpOrDown.MarketUp) {
                RequesterProtocols._instance.c2s_market_up(containertype, key, num, price);
            } else {
                RequesterProtocols._instance.c2s_market_down(2, key);
            }
        }

        public getPetPrice(price) {
            this.petprice = price;
        }

        public show(): void {
            super.show();
        }

        public hide(): void {
            game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.ON_KRYBOARD, this, this.setPetPrice);
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}