
module game.modules.guaji {
    /** 挂机主界面 */
    export class GuaJiMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.GuaJIUI;
        /** 存放挂机系统界面配置信息数据 */
        private hookUIConfigArray: Array<any> = [];
        /** 造型数据 */
        private shapeData: any;
        /** 怪物数据 */
        private monsterData: any;
        /** 宠物数据 */
        private petData: any;
        /** tips界面 */
        private _tipsModule: tips.tipsModule;
        /** 判断是否自动战斗 */
        private _flag: any;
        /** 当前出战宠物 */
        private currPet: any;
        /** 挂机辅助界面 */
        private _guaJiFuZhuMediator: GuaJiFuZhuMediator;
        /** 当前出战的宠物数据 */
        private _petbasedata: any;
        /** 宠物主动技能 */
        private _petActiveSkillsData: any;
        /** 上一次宠物默认技能选中的指向 */
        private petSkillSelected: any;
        /** 判断等级是否符合挂机等级，给予弹窗 */
        private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;

        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.GuaJIUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;

            this._guaJiFuZhuMediator = GuaJiFuZhuMediator.getInstance(this._app)
        }

        public show(): void {
            super.show();
            //挂机界面的初始化           
            this._init();
            //注册事件
            this.registerEvent();
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
        }
        /**
         * 初始化界面UI
         */
        private _init(): void {
            this.dataInit();
            this._listInit();
        }
        /**
         * 挂机区域列表信息初始化
         */
        private _listInit(): void {
            this._viewUI.hookArea_lst.array = this.hookUIConfigArray;
            this._viewUI.hookArea_lst.repeatX = 2;
            this._viewUI.hookArea_lst.repeatY = 2;
            this._viewUI.hookArea_lst.spaceX = 8;
            this._viewUI.hookArea_lst.spaceY = 10;
            this._viewUI.hookArea_lst.vScrollBarSkin = '';
            this._viewUI.hookArea_lst.scrollBar.elasticBackTime = 200;
            this._viewUI.hookArea_lst.scrollBar.elasticDistance = 100;
            this._viewUI.hookArea_lst.renderHandler = new Handler(this, this.onRenderGuaJiList);
        }
        /**
         * 挂机系统界面的挂机区域列表数据渲染
         */
        private onRenderGuaJiList(cell: Box, index: number): void {
            if (index < 0 || index > this.hookUIConfigArray.length) return;
            var areaBg_img: Laya.Image = cell.getChildByName("areaBg_img") as Laya.Image;
            var areaTips_btn: Laya.Button = cell.getChildByName("areaTips_btn") as Laya.Button;
            var levelLimit_lab: Laya.Label = cell.getChildByName("levelLimit_lab") as Laya.Label;
            var areaName_lab: Laya.Label = cell.getChildByName("areaName_lab") as Laya.Label;
            levelLimit_lab.text = this.hookUIConfigArray[index]["LevelLimitMin"] + "-" + this.hookUIConfigArray[index]["LevelLimitMax"];
            areaName_lab.text = this.hookUIConfigArray[index]["mapName"];
            areaTips_btn.on(LEvent.CLICK, this, this.showMonsterImg, [this.hookUIConfigArray[index]["mapName"], this.hookUIConfigArray[index]["sculptimgid"]]);
            areaBg_img.skin = "common/ui/guaJi/" + this.hookUIConfigArray[index]["mapbg"] + ".png";
            //注册事件
            var areaBg_btn: Laya.Button = cell.getChildByName("areaBg_btn") as Laya.Button;
            areaBg_btn.on(LEvent.CLICK, this, this.judgeLevel, [this.hookUIConfigArray[index]["id"], this.hookUIConfigArray[index]["LevelLimitMin"], this.hookUIConfigArray[index]["LevelLimitMax"]]);
        }
        /** 判断等级是否符合挂机等级，给予提示 */
        public judgeLevel(mapid: any, levelMin: number, levelMax: number): void {
            if (levelMin - 5 > mainhud.models.HudModel.getInstance().levelNum) {
                game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.OPEN_EVENT);
                this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                this._TipsMessageMediator.show();
                var param: Dictionary = new Dictionary();
                param.set("contentId", PromptExplain.GUAJI_BIG_LEVEL);
                this._TipsMessageMediator.showContent(param);
            } else if (levelMax + 5 < mainhud.models.HudModel.getInstance().levelNum) {
                game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.OPEN_EVENT);
                this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                this._TipsMessageMediator.show();
                var param: Dictionary = new Dictionary();
                param.set("contentId", PromptExplain.GUAJI_LITTLE_LEVEL);
                this._TipsMessageMediator.showContent(param);
            } else {
                this.goToGuaJiArea(mapid);
                return;
            }
            game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_CANCEL, this, () => {
                game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
            });
            game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, () => {
                game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
                this.goToGuaJiArea(mapid);
            });
        }
        /**
         * 人物跳转到挂机区域
         */
        private goToGuaJiArea(mapid: any): void {
            let inTeamGroup = HudModel.getInstance().chargeInGroup();
            if (!inTeamGroup) //未处于组队
            {
                this.getpost(mapid);
                guaji.models.GuaJiModel.getInstance().fuzhuGuaji =  true;
                let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
                RequesterProtocols._instance.c2s_req_goto(mapid, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
                this.hide();
            } else if (inTeamGroup) {
                this.showDisappTips(PromptExplain.IN_TEAM_GROUP);
            }

        }
        /** 弹窗飘字提示
        * @param id 提示语句id
        */
        private showDisappTips(id: number): void {
            let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[id];
            let tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
            tips.onShow(chattext.msg);
        }
        /**
         * 跳地图随机坐标
         */
        public getpost(mapid: number) {
            let MapData: WorldMapConfigBaseVo = MapModel.getInstance().WorldMapConfigData[mapid]
            let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit
            let x, y: number;
            x = (Math.random() * (MapData.bottomx - MapData.topx) + MapData.topx)
            y = (Math.random() * (MapData.bottomy - MapData.topy) + MapData.topy)
            mainUnit.SetPosX(x);
            mainUnit.SetPosY(y);
            mainUnit.SetPos(x, y);

        }
        /**
         * 显示挂机区域怪物的tips
         */
        private showMonsterImg(areaName: string, idData: string): void {
            this._viewUI.hideBg_img.mouseThrough = false;
            var _idArray = [];
            _idArray = idData.split(",");
            this._viewUI.monsters_img.visible = true;
            this._viewUI.AreaName_lab.text = areaName;
            this._viewUI.monsters_lst.array = _idArray;
            this._viewUI.monsters_lst.repeatX = 3;
            this._viewUI.monsters_lst.repeatY = 1;
            this._viewUI.monsters_lst.hScrollBarSkin = '';
            this._viewUI.monsters_lst.scrollBar.elasticBackTime = 200;
            this._viewUI.monsters_lst.scrollBar.elasticDistance = 100;
            this._viewUI.monsters_lst.renderHandler = new Handler(this, this.onRenderMonstersList);
        }
        /**
         * 怪物图鉴tips列表数据渲染
         */
        private onRenderMonstersList(cell: Box, index: number): void {
            var monster_img: Laya.Image = cell.getChildByName("monster_img") as Laya.Image;
            var monsterName_lab: Laya.Label = cell.getChildByName("monsterName_lab") as Laya.Label;
            var monsterRarely_lab: Laya.Label = cell.getChildByName("monsterRarely_lab") as Laya.Label;
            var _modelid = this.getMonsterAvatarImg(this._viewUI.monsters_lst.array[index]);
            monster_img.skin = "common/icon/avatarpet/" + _modelid + ".png";
            let monstersid = this._viewUI.monsters_lst.array[index];
            let petData: game.data.template.PetCPetAttrBaseVo = this.petData[models.GuaJiModel._instance.monstersDic[monstersid]["petid"]];       //宠物信息
            monsterName_lab.text = petData.name;
            if (petData.unusualid >= 1) monsterRarely_lab.visible = true;
            else monsterRarely_lab.visible = false;
        }
        /**
         * 根据怪物id，得到怪物的头像图片id
         * @param monsterId 怪物的id
         */
        private getMonsterAvatarImg(monsterId: any): number {
            var _petid = this.monsterData[monsterId]["petid"];
            var _petmodelid = this.petData[_petid]["modelid"];
            var _modelid = this.shapeData[_petmodelid]["littleheadID"];
            return _modelid;
        }
        /**
         * 界面UI配置信息初始化
         */
        private dataInit(): void {
            this.hookUIConfigArray = [];
            //获取挂机系统主界面中挂机区域的配置信息
            var _hookUIConfigDic: Object = mapworld.models.MapModel.getInstance().WorldMapConfigData;
            for (let index = 0; index < Object.keys(_hookUIConfigDic).length; index++) {
                let _sonmapname = _hookUIConfigDic[Object.keys(_hookUIConfigDic)[index]]["sonmapname"];
                if (_sonmapname.length > 1) {
                    this.hookUIConfigArray.push(_hookUIConfigDic[Object.keys(_hookUIConfigDic)[index]]);
                }
            }
            this.shapeData = createrole.models.LoginModel.getInstance().cnpcShapeInfo;
            this.petData = pet.models.PetModel._instance.petCPetAttrData;
            this.monsterData = models.GuaJiModel._instance.monstersDic;
            this._flag = models.GuaJiModel._instance.hookBattleData.isautobattle;
            if (this._flag == IsAutoFight.YES) {
                this._viewUI.autoFight_checkbox.skin = "common/ui/guaJi/01.png";
            }
            else if (this._flag == IsAutoFight.NO) {
                this._viewUI.autoFight_checkbox.skin = "common/ui/guaJi/0.png";
            }
            else {
                this._viewUI.autoFight_checkbox.skin = "common/ui/guaJi/01.png";
                models.GuaJiModel._instance.hookBattleData.isautobattle = IsAutoFight.YES;
            }
            this.currPet = createrole.models.LoginModel.getInstance().roleDetail.petIndex;
            if (this.currPet != -1) {
                this.guaJiPetInitUI();
                this._viewUI.PetSkill_img.visible = true;
                this._viewUI.petSkills_btn.visible = true;
            }
            else {
                this._viewUI.PetSkill_img.visible = false;
                this._viewUI.petSkills_btn.visible = false;
            }
            this._viewUI.roleSkill_img.skin = skill.models.SkillModel.getInstance().skillImgArr[1]["img"];
            this._viewUI.roleSkills_btn.label = skill.models.SkillModel.getInstance().skillArr[1]["skillname"];
            var _hookBattleData = models.GuaJiModel.getInstance().hookBattleData;
            if (_hookBattleData) {
                this.setRoleHook();
            }
        }
        /**
         * 根据挂机数据来显示界面宠物挂机设置
         */
        private setPetHook(): void {
            var _hookBattleData: models.HookBattleDataVo = models.GuaJiModel.getInstance().hookBattleData;
            /** 宠物操作类型 */
            var _petoptype = _hookBattleData.petoptype;
            switch (_petoptype) {
                case GuaJiOpeType.ATTACK:
                    this._viewUI.petSkill_img.skin = "common/ui/guaJi/attack1.png";
                    this._viewUI.petSkills_btn.label = "攻击";
                    break;
                case GuaJiOpeType.DEFENSE:
                    this._viewUI.petSkill_img.skin = "common/ui/guaJi/defense1.png";
                    this._viewUI.petSkills_btn.label = "防御";
                    break;
                case GuaJiOpeType.FIRESKILL:
                    this._viewUI.petSkill_img.skin = "common/icon/skill/" + pet.models.PetModel.getInstance().petSkillConfigData[_hookBattleData.petopid]["icon"] + ".png";
                    this._viewUI.petSkills_btn.label = pet.models.PetModel.getInstance().petSkillConfigData[_hookBattleData.petopid]["skillname"];
                    break;
            }
        }
        /**
         * 根据挂机数据来显示界面人物挂机设置
         */
        private setRoleHook(): void {
            var _hookBattleData: models.HookBattleDataVo = models.GuaJiModel.getInstance().hookBattleData;
            /** 人物操作类型 */
            var _charoptype = _hookBattleData.charoptype;
            switch (_charoptype) {
                case GuaJiOpeType.ATTACK:
                    this._viewUI.roleSkill_img.skin = "common/ui/guaJi/attack1.png";
                    this._viewUI.roleSkills_btn.label = "攻击";
                    break;
                case GuaJiOpeType.DEFENSE:
                    this._viewUI.roleSkill_img.skin = "common/ui/guaJi/defense1.png";
                    this._viewUI.roleSkills_btn.label = "防御";
                    break;
                case GuaJiOpeType.FIRESKILL:
                    this._viewUI.roleSkill_img.skin = "common/icon/skill/" + skill.models.SkillModel.getInstance().CSchoolSkillitemBinDic[_hookBattleData.charopid]["normalIcon"] + ".png";
                    this._viewUI.roleSkills_btn.label = skill.models.SkillModel.getInstance().CSchoolSkillitemBinDic[_hookBattleData.charopid]["skillname"];
                    break;
            }
        }
        /**
         * 挂机系统中，宠物数据以及相关UI的初始化
         */
        private guaJiPetInitUI(): void {
            //获取当前出战宠物的索引
            var _petIndex = createrole.models.LoginModel.getInstance().roleDetail.petIndex;
            this._petbasedata = pet.models.PetModel._instance.pets.get(_petIndex);
            //获取宠物技能配置表
            var _petSkillsConfigDic = pet.models.PetModel._instance.petSkillConfigData;
            this._petActiveSkillsData = [];
            if (this._petbasedata.skills) {
                var petSkills = this._petbasedata.skills;
                for (let i = 0; i < petSkills.length; i++) {
                    if (_petSkillsConfigDic[petSkills[i]["skillId"]]["skilltype"] == 2) {
                        this._petActiveSkillsData.push(_petSkillsConfigDic[petSkills[i]["skillId"]]);
                    }
                }
            }
            if (this._petActiveSkillsData.length > 0) {
                this._viewUI.petSkill_img.skin = "common/icon/skill/" + this._petActiveSkillsData[0]["icon"] + ".png";
                this._viewUI.petSkills_btn.label = this._petActiveSkillsData[0]["skillname"];
            }
            else {
                this._viewUI.petSkill_img.skin = "common/ui/guaJi/attack1.png";
                this.petSkillSelected = this._viewUI.petAtta_cbox;
                this._viewUI.petSkills_btn.label = "攻击";
            }
            this.petSkillInit();
        }
        /**
         * 显示宠物技能UI初始化
         */
        private petSkillInit(): void {
            //获取宠物主动技能有几个
            var count = this._petActiveSkillsData.length;
            if (count > 0) {
                if (!models.GuaJiModel._instance.isChangeFlag) {
                    models.GuaJiModel._instance.isChangeFlag = true;
                    this._viewUI.petSkillSelect_img.height += 150;
                    this._viewUI.petAtta_img.y += 150;
                    this._viewUI.petDefe_img.y += 150;
                    //this._viewUI.petSkills_lst.visible = true;
                }
            }
            this._viewUI.petSkills_lst.array = this._petActiveSkillsData;
            this._viewUI.petSkills_lst.hScrollBarSkin = "";
            this._viewUI.petSkills_lst.scrollBar.elasticBackTime = 200;
            this._viewUI.petSkills_lst.scrollBar.elasticDistance = 100;
            this._viewUI.petSkills_lst.renderHandler = new Handler(this, this.onPetActiveSkills);
        }
        /**
         * 渲染宠物主动技能列表
         */
        private onPetActiveSkills(cell: Box, index: number): void {
            if (index < 0 || index > this._petActiveSkillsData.length - 1) {
                cell.visible = false;
                return;
            }
            var petSkill_img: Laya.Image = cell.getChildByName("petSkill_img") as Laya.Image;
            var isSelect_cbox: Laya.CheckBox = cell.getChildByName("isSelect_cbox") as Laya.CheckBox;
            var petSkillName_lab: Laya.Label = cell.getChildByName("petSkillName_lab") as Laya.Label;
            petSkill_img.skin = "common/icon/skill/" + this._petActiveSkillsData[index]["icon"] + ".png";
            petSkillName_lab.text = this._petActiveSkillsData[index]["skillname"];
            if (index == 0 && !this.petSkillSelected) {
                this.petSkillSelected = isSelect_cbox;
            }
            petSkill_img.on(LEvent.CLICK, this, this.changePetSkillSelect, [isSelect_cbox, petSkill_img.skin, this._petActiveSkillsData[index]["skillname"]]);
            RequesterProtocols._instance.c2s_CSetPetOpt(GuaJiOpeType.FIRESKILL, this._petActiveSkillsData[index]["id"]);
            models.GuaJiModel._instance.hookBattleData.petoptype = GuaJiOpeType.FIRESKILL;
            models.GuaJiModel._instance.hookBattleData.petopid = this._petActiveSkillsData[index]["id"];
        }
        /**
         * 改变宠物技能选择
         * 并更改技能显示的图片、名字
         */
        private changePetSkillSelect(cbox: any, skin: any, petshillname: any): void {
            if (this.petSkillSelected != cbox) {
                cbox.selected = true;
                this.petSkillSelected.selected = false;
                this.petSkillSelected = cbox;
                this._viewUI.petSkill_img.skin = skin;
                this._viewUI.petSkills_btn.label = petshillname;
            }
            this.petSkillInit();
            this.changeBack();
            if (this._viewUI.petSkills_lst.visible) {
                this._viewUI.petSkills_lst.visible = false;
            }
            if (this._viewUI.petSkillSelect_img.visible) {
                this._viewUI.petSkillSelect_img.visible = false;
            }
            switch (cbox) {
                case this._viewUI.petAtta_cbox:
                    RequesterProtocols._instance.c2s_CSetPetOpt(GuaJiOpeType.ATTACK, 0);
                    models.GuaJiModel._instance.hookBattleData.petoptype = GuaJiOpeType.ATTACK;
                    break;
                case this._viewUI.petDefe_cbox:
                    RequesterProtocols._instance.c2s_CSetPetOpt(GuaJiOpeType.DEFENSE, 0);
                    models.GuaJiModel._instance.hookBattleData.petoptype = GuaJiOpeType.DEFENSE;
                    break;
            }
        }
        /**
         * 事件监听
         */
        private registerEvent(): void {
            //图片事件监听
            this._viewUI.hideBg_img.on(LEvent.CLICK, this, this.hideTipsImg);
            this._viewUI.petAtta_img.on(LEvent.MOUSE_DOWN, this, this.changePetSkillSelect, [this._viewUI.petAtta_cbox, this._viewUI.petAtta_img.skin, "攻击"]);
            this._viewUI.petDefe_img.on(LEvent.MOUSE_DOWN, this, this.changePetSkillSelect, [this._viewUI.petDefe_cbox, this._viewUI.petDefe_img.skin, "防御"]);
            //按钮事件监听
            this._viewUI.close_btn.on(LEvent.CLICK, this, this.hide);
            this._viewUI.roleSkills_btn.on(LEvent.CLICK, this, this.sendRequest);
            this._viewUI.petSkills_btn.on(LEvent.CLICK, this, this.showSetPetSkillUI);
            this._viewUI.hookTips_btn.on(LEvent.CLICK, this, this.showHookTips);
            this._viewUI.onHook_btn.on(LEvent.CLICK, this, this.onHook);
            //单选框事件监听
            this._viewUI.autoFight_checkbox.on(LEvent.CLICK, this, this.changeOption);
            //消息事件监听
            models.GuaJiProxy.getInstance().on(models.GET_AUTOFIGHTAI_DATA, this, this.showGuaJiFuzhu);
            models.GuaJiProxy.getInstance().on(models.ROLE_SKILL_IMG_CHANGE, this, this.changeRoleSkillImg);
        }
        /**
         * 弹出消息气泡
         */
        private show_Msg(msg: any): void {
            var _disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
            _disappearMessageTipsMediator.onShow(msg);
        }
        /**
         * 原地挂机设置
         */
        private onHook(): void {
            let inTeamGroup = HudModel.getInstance().chargeInGroup();
            if (inTeamGroup) //处于组队
            {
                this.showDisappTips(PromptExplain.IN_TEAM_GROUP);
                return;
            }
            //先检测是否是在挂机区域的地图内
            for (let i = 0; i < this.hookUIConfigArray.length; i++) {
                if (game.modules.mainhud.models.HudModel.getInstance().sceneid == this.hookUIConfigArray[i]["id"]) {
                    this._app.sceneObjectMgr.mainUnit.xunluo = 1;
                    this._app.sceneRoot.hangup = 1;
                    mainhud.models.HudModel.getInstance().taskxl = 1;
                    LocalStorage.setJSON(LoginModel.getInstance().roleDetail.roleid + "_HandUp", true);
                    return;
                }
            }
            //都不在挂机区域地图内，则弹出提示消息飘窗
            var _tipsMsg: string = chat.models.ChatModel._instance.chatMessageTips["150160"]["msg"];
            this.show_Msg(_tipsMsg);
        }
        /**
         * 显示宠物自动技能设置的窗口
         */
        private showSetPetSkillUI(): void {
            this._viewUI.hideBg_img.mouseThrough = false;
            this.petSkillSelected.selected = true;
            this._viewUI.petSkillSelect_img.visible = true;
            if (!this._viewUI.petSkills_lst.visible) {
                this._viewUI.petSkills_lst.visible = true;
            }
            if (!this._viewUI.petSkillSelect_img.visible) {
                this._viewUI.petSkillSelect_img.visible = true;
            }
            this.petSkillInit();
        }
        /**
         * 改变人物默认技能显示图片
         */
        private changeRoleSkillImg(img: any, skillname: any): void {
            this._viewUI.roleSkill_img.skin = img;
            this._viewUI.roleSkills_btn.label = skillname;
        }
        /**
         * 显示挂机说明tips窗口
         */
        private showHookTips(): void {
            this.hideTipsImg();
            var param = new Laya.Dictionary();
            param.set("title", 11132);
            param.set("contentId", 11133);
            if (!this._tipsModule) {
                this._tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param, true);
            }
            else {
                this.onHide();
                this._tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param, true);
            }
            this._viewUI.hideBg_img.mouseThrough = false;
        }
        /**
         * 关闭某些弹窗
         */
        private onHide(): void {
            //如果有，则关闭说明型提示弹窗
            if (this._tipsModule) {
                this._tipsModule.hide();
                this._viewUI.hideBg_img.mouseThrough = true;
            }
        }
        /**
         * 发起请求挂机辅助AI数据
         */
        private sendRequest(): void {
            RequesterProtocols._instance.c2s_CGetRoleFightAI();
        }
        /**
         * 显示挂机辅助的界面
         */
        private showGuaJiFuzhu(data: any): void {
            this.hideTipsImg();
            this._guaJiFuZhuMediator.onShow(data);
        }
        /**
         * 改变是否自动战斗的选项
         */
        private changeOption(): void {
            if (this._flag) {
                this._viewUI.autoFight_checkbox.skin = "common/ui/guaJi/0.png";
                this._flag = false;
                //models.GuaJiModel._instance.flag = false;
                RequesterProtocols._instance.c2s_CSetAutoBattle(IsAutoFight.NO);
                models.GuaJiModel._instance.hookBattleData.isautobattle = IsAutoFight.NO;
            }
            else {
                this._viewUI.autoFight_checkbox.skin = "common/ui/guaJi/01.png";
                this._flag = true;
                //models.GuaJiModel._instance.flag = true;
                RequesterProtocols._instance.c2s_CSetAutoBattle(IsAutoFight.YES);
                models.GuaJiModel._instance.hookBattleData.isautobattle = IsAutoFight.YES;
            }
        }
        /**
         * 关闭某些弹窗口
         */
        private hideTipsImg(): void {
            if (this._viewUI.monsters_img.visible) {
                this._viewUI.monsters_img.visible = false;
            }
            if (this._tipsModule) {
                this._tipsModule.hide();
            }
            if (this._viewUI.petSkills_lst.visible) {
                this._viewUI.petSkills_lst.visible = false;
            }
            if (this._viewUI.petSkillSelect_img.visible) {
                this._viewUI.petSkillSelect_img.visible = false;
            }
            this.changeBack();
            this._viewUI.hideBg_img.mouseThrough = true;
        }

        public hide(): void {
            super.hide();
            this.hideTipsImg();
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
        }
        /**
         * 恢复UI原来的位置
         */
        private changeBack(): void {
            if (models.GuaJiModel._instance.isChangeFlag) {
                this._viewUI.petSkillSelect_img.height -= 150;
                this._viewUI.petAtta_img.y -= 150;
                this._viewUI.petDefe_img.y -= 150;
                this._viewUI.petSkills_lst.visible = false;
                models.GuaJiModel._instance.isChangeFlag = false;
            }
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}