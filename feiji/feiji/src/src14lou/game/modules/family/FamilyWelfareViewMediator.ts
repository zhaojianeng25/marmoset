/**
* 帮派福利界面
*/
module game.modules.family {
    export class FamilyWelfareViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.FamilyFuLiUI;
        private FamilyFuWenViewMediator: FamilyFuWenViewMediator;
        private FamilyImpeachmentViewMediator: FamilyImpeachmentViewMediator;
        private SkillModule: game.modules.skill.SkillModule;
        private RedPacketMediator: game.modules.redPacket.RedPacketMediator;
        private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
        /**公会福利配置表 */
        clanCFactionFuLiData = models.FamilyModel.getInstance().clanCFactionFuLiData;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        /**客户端信息提示表 */
        chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;

        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.FamilyFuLiUI();
            this._app = app;
            this.isCenter = false;
            models.FamilyProxy._instance.on(models.SBonusQuery, this, this.showWelfareView);
        }
        
        /**显示公会福利 */
        public showWelfareView() {
            var welfareArr = [];
            for (var i = 1; i <= Object.keys(this.clanCFactionFuLiData).length; i++) {
                var name = this.clanCFactionFuLiData[i].name;
                var icon = this.clanCFactionFuLiData[i].icon;
                var desc = this.clanCFactionFuLiData[i].desc;
                var isgive = this.clanCFactionFuLiData[i].isgive;
                var id = this.clanCFactionFuLiData[i].id;
                var m_icon = SaleModel._instance.getIcon(icon);
                if (id == 6) {
                    m_icon = "common/ui/redpacket/" + icon + ".png";
                }
                welfareArr.push({ name_label: name, miaoShu_label: desc, fuLiIcon_img: m_icon, isgive: isgive, id: id });
            }
            SaleModel._instance.showList(this._viewUI.fuli_list, welfareArr);
            this._viewUI.fuli_list.renderHandler = new Handler(this, this.fuliListRender, [welfareArr]);
        }
        
        /**福利列表渲染 */
        public fuliListRender(welfareArr, cell: Box, index: number) {
            var gz_box = cell.getChildByName("gz_box") as Laya.Box;
            var openortake_btn = cell.getChildByName("openortake_btn") as Button;
            var gongZi_lab = cell.getChildByName("gz_box").getChildByName("gongZi_lab") as Label;
            var fuLiIcon_img = cell.getChildByName("fuLiIcon_img") as Laya.Image;
            var isgive = welfareArr[index].isgive;
            if (isgive == 1) {
                gz_box.visible = true;
                openortake_btn.label = this.cstringResConfigData[2939].msg;
                var bonus = models.FamilyModel.getInstance().bonus;
                if (bonus <= 0) {
                    openortake_btn.disabled = true;
                } else {
                    openortake_btn.disabled = false;
                }
                gongZi_lab.text = bonus + "";
            } else {
                gz_box.visible = false;
            }
            openortake_btn.on(LEvent.MOUSE_DOWN, this, this.onOpenBtn, [welfareArr, index]);
        }

        /**打开福利中不同的界面 */
        public onOpenBtn(welfareArr, index) {
            var isgive = welfareArr[index].isgive;
            var id = welfareArr[index].id;
            switch (id) {
                case 1:
                    this.showFuWen();
                    break;
                case 2:
                    this.showLifeSkill();
                    break;
                case 3:
                    this.showZhuanJing();
                    break;
                case 4:
                    this.showPharmacy();
                    break;
                case 5:
                    this.getBonus();
                    break;
                case 6:
                    this.showRedBag();
                    break;
            }

        }

        /**打开帮派符文 */
        public showFuWen() {
            models.FamilyProxy._instance.event(models.CloseModule);
            this.FamilyFuWenViewMediator = new FamilyFuWenViewMediator(this._app);
            this.FamilyFuWenViewMediator.show();
        }

        /**生活技能 */
        public showLifeSkill() {
            ModuleManager.hide(ModuleNames.haveFamily);
            skill.models.SkillModel.getInstance().currenTabNum = 2;//切换到生活技能界面
            skill.models.SkillModel.getInstance().isFromClanWelfareJump = true;
            ModuleManager.show(ModuleNames.SKILL, this._app);
        }

        /**帮派专精 */
        public showZhuanJing() {
            ModuleManager.hide(ModuleNames.haveFamily);
            // RequesterProtocols._instance.c2s_CRequestParticleSkillList();//请求已经学习的修炼技能链表
            skill.models.SkillModel.getInstance().currenTabNum = 3;//切换到生活技能界面
            ModuleManager.show(ModuleNames.SKILL, this._app);
            LoginModel.getInstance().CommonPage = ModuleNames.haveFamily;
        }

        /**打开帮派药房 */
        public showPharmacy() {
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var house = clanInfo[0].house;
            var yaofangLevel = house.get(clanHouse.BuildYaoFang);
            if (yaofangLevel > 0) {
                let _FanilyPharmacyViewMediator = new FanilyPharmacyViewMediator(this._app);
                _FanilyPharmacyViewMediator.show();
                models.FamilyProxy._instance.event(models.CloseModule);
            } else {
                this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[160318].msg);
            }
        }

        /**领取工资 */
        public getBonus() {
            this.CGrabBonus();
        }

        /**帮派红包 */
        public showRedBag() {
            ModuleManager.hide(ModuleNames.haveFamily);
            this.RedPacketMediator = new game.modules.redPacket.RedPacketMediator(this._app);
            this.RedPacketMediator.show(RedPackType.TYPE_CLAN);
            LoginModel.getInstance().CommonPage = ModuleNames.haveFamily;

        }

        /**查询分红 */
        public CBonusQuery() {
            RequesterProtocols._instance.c2s_CBonusQuery();
        }

        /**领取分红 */
        public CGrabBonus() {
            RequesterProtocols._instance.c2s_CGrabBonus();
        }

        public show() {
            // this.showWelfareView();
            this.CBonusQuery();
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