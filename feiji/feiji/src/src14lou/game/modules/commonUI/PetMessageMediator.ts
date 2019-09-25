/**
* 宠物信息弹窗 
*/
module game.modules.commonUI {
    /** 关闭宠物信息弹窗事件 */
    export const CLOSE_PET_TIPS: string = "closePetTipsEvent";
    export class PetMessageMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.PetMessageUI;
        /** 宠物Id */
        private petId: number;
        /** 技能信息弹窗 */
        private _tipsModule: game.modules.tips.tipsModule;
        /** 宠物3D模型窗口 */
        private _petMessageModel: PetMessageModel;
        /** 来自战斗 */
        private frombattle = false;
        constructor(petId: number, app: AppBase,frombattle: boolean = false) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.PetMessageUI();
            this.isCenter = true;
            this._petMessageModel = new PetMessageModel(petId, this._viewUI);
            this._app = app;
            this.petId = petId;
            this.frombattle = frombattle;
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.skill_list.renderHandler = new Handler(this, this.skillHandler);
        }
        /** 宠物信息加载 */
        public init(): void {
            var _petCPetAttrData = PetModel.getInstance().petCPetAttrData;
            var _petSkillConfigData = PetModel.getInstance().petSkillConfigData;
            //宠物名称
            this._viewUI.petName_lab.text = _petCPetAttrData[this.petId].name;
            //名称颜色
            var _petColor = _petCPetAttrData[this.petId].colour;
            this._viewUI.petName_lab.color = "#" + _petColor;
            //参战等级
            this._viewUI.level_lab.text = "参战等级：" + _petCPetAttrData[this.petId].uselevel;
            this._SetUI();
            if(!this.frombattle)
            {
                //攻击资质
                this._viewUI.gongJi_lab.text = _petCPetAttrData[this.petId].attackaptmin + "-" + _petCPetAttrData[this.petId].attackaptmax;
                //体力资质
                this._viewUI.tiLi_lab.text = _petCPetAttrData[this.petId].phyforceaptmin + "-" + _petCPetAttrData[this.petId].phyforceaptmax;
                //速度资质
                this._viewUI.suDu_lab.text = _petCPetAttrData[this.petId].speedaptmin + "-" + _petCPetAttrData[this.petId].speedaptmax;
                //防御资质
                this._viewUI.fangYu_lab.text = _petCPetAttrData[this.petId].defendaptmin + "-" + _petCPetAttrData[this.petId].defendaptmax;
                //法术资质
                this._viewUI.faShu_lab.text = _petCPetAttrData[this.petId].magicaptmin + "-" + _petCPetAttrData[this.petId].magicaptmax;
                //成长资质
                this._viewUI.chengZhang_lab.text = _petCPetAttrData[this.petId].growrate[0] / 1000 + "-" + _petCPetAttrData[this.petId].growrate[6] / 1000;
            }else
            {
                for (let key in PetModel.getInstance().pets.keys) {
                    let petinfo: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(PetModel._instance.pets.keys[key])
                    if(petinfo.id == this.petId)
                    {
                        //生命
                        this._viewUI.life_lab.text = Math.floor(petinfo.hp).toString();
                        //攻击
                        this._viewUI.attack_lab.text = Math.floor(petinfo.attack).toString();
                        //防御
                        this._viewUI.defense_lab.text = Math.floor(petinfo.defend).toString();
                        //法攻
                        this._viewUI.legal_attack_lab.text = Math.floor(petinfo.magicattack).toString();
                        //法防
                        this._viewUI.law_prevention_lab.text = Math.floor(petinfo.magicdef).toString();
                        //速度
                        this._viewUI.speed_lab.text = Math.floor(petinfo.speed).toString();
                        break;
                    }
                    
                }
                
            }
            
            //技能数组
            var _skillid = _petCPetAttrData[this.petId].skillid;
            var data: Array<any> = [];
            for (var i: number = 0; i < 6; i++) {
                var _colorVisi: boolean = false;
                var _colorSkin: string = "";
                var _skillVisi: boolean = false;
                var _skillSkin: string = "";
                var _tipsVisi: boolean = false;
                if (i < _skillid.length) {
                    //图标
                    var _icon = _petSkillConfigData[_skillid[i]].icon;
                    //品质
                    var _color = _petSkillConfigData[_skillid[i]].color;
                    //主被动
                    var _skilltype = _petSkillConfigData[_skillid[i]].skilltype;
                    _colorVisi = true;
                    _skillVisi = true;
                    _tipsVisi = true;
                    if (_skilltype == 1) {
                        _colorSkin = "common/ui/pet/beiji" + _color + ".png";
                    } else if (_skilltype == 2) {
                        _colorSkin = "common/ui/pet/zhuji" + _color + ".png";
                    }
                    _skillSkin = "common/icon/skill/" + _icon + ".png";
                }
                data.push({
                    waiKuang_img: { visible: _colorVisi, skin: _colorSkin },
                    jiNeng_img: { visible: _skillVisi, skin: _skillSkin },
                    tips_btn: { visible: _tipsVisi },
                });
            }
            this._viewUI.skill_list.array = data;
        }

        /** 修改ui显示 */
        private _SetUI():void
        {
            if (this.frombattle) {//来自召唤宠物界面
                this._viewUI.attr_box.visible = true;
                this._viewUI.zizhi_box.visible = false;
                //设置背景位置
                this._viewUI.attr_bg_img.x = 425;
                this._viewUI.attr_bg_img.width = 250;
            } else if (!this.frombattle) {//首充
                this._viewUI.attr_box.visible = false;
                this._viewUI.zizhi_box.visible = true;
                //设置背景位置
                this._viewUI.attr_bg_img.x = 372;
                this._viewUI.attr_bg_img.width = 308;
            }
        }
        /** 技能按钮监听 */
        public skillHandler(cell: Laya.Box, index: number): void {
            var btn = cell.getChildByName("tips_btn") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.getTips, [cell, index]);
        }
        /** 获取技能弹窗 */
        public getTips(cell: Laya.Box, index: number): void {
            var _petCPetAttrData = PetModel.getInstance().petCPetAttrData;
            var _skillid = _petCPetAttrData[this.petId].skillid;
            var itemId = _skillid[index];
            var parame: Dictionary = new Dictionary();
            parame.set("itemId", itemId);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
        }
        public show(): void {
            super.show();
            this.init();
            this._petMessageModel.show();
        }
        public hide(): void {
            this.event(commonUI.CLOSE_PET_TIPS);
            super.hide();
        }
        public getView(): Sprite {
            return this._viewUI;
        }
    }
    export class PetMessageModel extends game.modules.UiMediator {
        private _viewUI: ui.common.PetMessageModelUI;
        public petId: number;
        /** 宠物3D模型 */
        public model: ModelsCreate;
        private scene2DPanel: TestRole2dPanel;
        constructor(petId: number, uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.PetMessageModelUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;
            this.petId = petId;
        }
        /** 创建宠物模型 */
        public modelcreate(modelid: number): void {
            if (this.model.role3d) {
                this.scene2DPanel.removeSceneChar(this.model.role3d);
            }
            var parentui: any = this._viewUI.parent;
            if (parentui) {
                this.model.role3d = new YxChar3d();
                this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
                //坐标
                this.model.role3d.set2dPos((this._viewUI.chongwu_img.x + this._viewUI.chongwu_img.width / 2.2) * parentui.globalScaleX, (this._viewUI.chongwu_img.y + this._viewUI.chongwu_img.height) * parentui.globalScaleY);
                this.model.role3d.scale = 1.2;
                this.model.role3d.rotationY = 135;
                this.model.role3d.rotationX = 0;
                this.scene2DPanel.addSceneChar(this.model.role3d);
            }
        }
        public show(): void {
            super.show();
            this.model = new ModelsCreate();
            this.scene2DPanel = new TestRole2dPanel();
            this._viewUI.chongwu_img.addChild(this.scene2DPanel);
            var parentui: any = this._viewUI.parent;
            this.scene2DPanel.ape.x = parentui.x * parentui.globalScaleX;
            this.scene2DPanel.ape.y = parentui.y * parentui.globalScaleY;
            this.modelcreate(PetModel.getInstance().petCPetAttrData[this.petId].modelid);
        }
        public hide(): void {
            super.hide();
        }
        public getView(): Sprite {
            return this._viewUI;
        }
    }
}