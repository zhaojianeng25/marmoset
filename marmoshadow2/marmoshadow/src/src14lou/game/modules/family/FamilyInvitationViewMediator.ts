
module game.modules.family {
    /** 帮派邀请 */
    export class FamilyInvitationViewMediator extends game.modules.ModuleMediator {
        private _viewUI: ui.common.FamilyYaoQingUI;
        private _tipsModule: game.modules.tips.tipsModule;
        private FriendSystemModule: game.modules.friend.FriendSystemModule;
        private FamilyScreeningViewMediator: FamilyScreeningViewMediator;
        /**职业配置表 */
        schoolInfo = LoginModel.getInstance().schoolInfo;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        /**当前选择的角色id */
        roleid = 0;

        constructor(app: AppBase) {
            super();
            this.uiLayer = app.uiRoot.general;
            this._viewUI = new ui.common.FamilyYaoQingUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
            this.roleid = 0;
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.closeThisView);
            this._viewUI.yaoQing_btn.on(LEvent.MOUSE_DOWN, this, this.invitation);
            this._viewUI.search_btn.on(LEvent.MOUSE_DOWN, this, this.search);
            this._viewUI.change_btn.on(LEvent.MOUSE_DOWN, this, this.clanInvitationView);
            this._viewUI.lianXi_btn.on(LEvent.MOUSE_DOWN, this, this.contactPlayer);
            this._viewUI.shaiXuan_btn.on(LEvent.MOUSE_DOWN, this, this.screenOutSearch);
            models.FamilyProxy._instance.on(models.SClanInvitationView, this, this.showInvitationView);
        }

        /**显示邀请界面 */
        public showInvitationView() {
            var invitationroleinfolist = models.FamilyModel.getInstance().invitationroleinfolist;
            var invitationroleinfoArr = [];
            for (var i = 0; i < invitationroleinfolist.length; i++) {
                var roleid = invitationroleinfolist[i].roleid;
                var rolename = invitationroleinfolist[i].rolename;
                var level = invitationroleinfolist[i].level;
                var sex = invitationroleinfolist[i].sex;
                var school = invitationroleinfolist[i].school;
                var fightvalue = invitationroleinfolist[i].fightvalue;
                var vip = invitationroleinfolist[i].vip;
                var shape = invitationroleinfolist[i].shape;  //造型
                var m_sex = "";
                if (sex == Sex.man) { //性别是男的
                    m_sex = this.cstringResConfigData[1188].msg;
                } else {
                    m_sex = this.cstringResConfigData[1187].msg;
                }
                var m_school = this.schoolInfo[school].name;
                var m_school_img = "common/ui/havefamily/" + school + ".png";
                invitationroleinfoArr.push({
                    roleName_lab: rolename, roleid: roleid, sex_lab: m_sex, lv_lab: level, zhiYeIcon_img: m_school_img,
                    zhiYe_lab: m_school, wholePower_lab: fightvalue, vip_lab: vip, shape: shape
                })
            }
            SaleModel._instance.showList(this._viewUI.role_list, invitationroleinfoArr);
            this._viewUI.role_list.selectHandler = new Handler(this, this.roleListSelect, [invitationroleinfoArr]);
        }

        public roleListSelect(invitationroleinfoArr, index: number) {
            var roleid = invitationroleinfoArr[index].roleid;
            this.roleid = roleid;
        }

        /**邀请 */
        public invitation() {
            if (this.roleid != 0) {
                this.CClanInvitation(this.roleid);
            }
        }

        /**被邀请 */
        public showClanInvitation(ClanInvitation) {
            var param: Dictionary = new Dictionary();
            param.set("contentId", 145034);
            var hostrolename = ClanInvitation.get("hostrolename");
            var clannname = ClanInvitation.get("clannname");
            var pa = [hostrolename, clannname];
            param.set("parame", pa);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, param);
        }

        /**搜索 */
        public search() {
            var roleid = this._viewUI.search_input.text;
            this.CRequestSearchRole(roleid);
        }

        /**默认请求邀请 */
        public clanInvitationView() {
            this.CClanInvitationView(1, -1, Sex.allman);
        }

        /**联系玩家 */
        public contactPlayer() {
            this.closeThisView();
            this.FriendSystemModule = new game.modules.friend.FriendSystemModule(this._app);
            this.FriendSystemModule.show();
        }

        /**筛选搜索 */
        public screenOutSearch() {
            this.FamilyScreeningViewMediator = new FamilyScreeningViewMediator(this._viewUI, this._app);
            this.FamilyScreeningViewMediator.show();
        }

        /***************************************************************************************************************** */

        /**
         * 客户端请求邀请界面
         * @param type_level 等级删选  -1表示所有
         * @param type_school 职业删选  -1表示所有
         * @param type_sex 性别删选  1男  2女  -1表示所有
         */
        public CClanInvitationView(type_level, type_school, type_sex) {
            RequesterProtocols._instance.c2s_CClanInvitationView(type_level, type_school, type_sex);
        }

        /**
         * 公会邀请
         * @param guestroleid 
         */
        public CClanInvitation(guestroleid) {
            RequesterProtocols._instance.c2s_CClanInvitation(guestroleid);
        }

        /**
         * 搜索
         * @param roleId 
         */
        public CRequestSearchRole(roleId) {
            RequesterProtocols._instance.c2s_CRequestSearchRole(roleId);
        }

        public closeThisView() {
            this.hide();
            // ModuleManager.show(ModuleNames.haveFamily, this._app);
        }

        public show() {
            this.clanInvitationView();
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