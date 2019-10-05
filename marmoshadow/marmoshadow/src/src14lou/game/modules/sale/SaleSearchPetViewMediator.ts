/**
* 宠物搜索tips
*/
module game.modules.sale {
    export class SaleSearchPetViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.SaleSearchPetUI;
        /**复合表 */
        itemAttrData = BagModel.getInstance().itemAttrData;
        /**选择的技能名称 */
        selectPetSkillName = [];
        /**宠物技能 */
        petSkillIndexArr = [];
        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.SaleSearchPetUI();
            this.isCenter = false;
            this._viewUI.bg_img.on(LEvent.MOUSE_DOWN, this, this.cancel);
            this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.cancel);
            this._viewUI.reset_btn.on(LEvent.MOUSE_DOWN, this, this.reset);
            this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN, this, this.ok);
        }

        /**
         * 显示宠物
         */
        public showPet(x, y, ordinaryPet, lingshou) {
            this._viewUI.petSkill_box.visible = false;
            var listBox = this._viewUI.listBox;
            listBox.visible = true;
            listBox.pos(x, y);
            this._viewUI.selectPet_tab.selectHandler = new Handler(this, this.petTabSelect, [ordinaryPet, lingshou]);
            this.petTabSelect(ordinaryPet, lingshou, 0);
        }
        
        /**宠物选择 */
        public petTabSelect(ordinaryPet, lingshou, index: number) {
            this._viewUI.petList_viewstack.selectedIndex = index;
            if (index == 0) {
                this.showOrdinaryPet(ordinaryPet);
            } else if (index == 1) {
                this.showLingchong(lingshou)
            }
        }

        /**
         * 显示普通宠物
         */
        public showOrdinaryPet(ordinaryPet) {
            var OrdinaryPetlist = this._viewUI.OrdinaryPet_list;
            SaleModel._instance.showList(OrdinaryPetlist, ordinaryPet);
            OrdinaryPetlist.renderHandler = new Handler(this, this.OrdinaryPetlistRender, [ordinaryPet]);

        }
        
        /**普通宠物列表渲染 */
        public OrdinaryPetlistRender(ordinaryPet, cell: Box, index: number) {
            var onebtn = cell.getChildByName("onebtn") as Button;
            var name = ordinaryPet[index].name;
            onebtn.label = name;
            onebtn.on(LEvent.MOUSE_UP, this, this.onOrdinaryPetBtn, [index]);
        }
        
        /**选择宠物 */
        public onOrdinaryPetBtn(index) {
            this.hide();
            models.SaleProxy._instance.event(models.onSaleListordinaryPet, index);
        }

        /**
         * 显示灵宠
         */
        public showLingchong(lingshou) {
            var lingshoulist = this._viewUI.lingshou_list;
            SaleModel._instance.showList(lingshoulist, lingshou);
            lingshoulist.renderHandler = new Handler(this, this.lingshoulistRender, [lingshou]);

        }
        
        /**灵宠列表渲染 */
        public lingshoulistRender(lingshou, cell: Box, index: number) {
            var onebtn = cell.getChildByName("onebtn") as Button;
            var name = lingshou[index].name;
            onebtn.label = name;
            onebtn.on(LEvent.MOUSE_UP, this, this.onLingshouBtn, [index]);
        }
        
        /**灵宠选择 */
        public onLingshouBtn(index) {
            this.hide();
            models.SaleProxy._instance.event(models.onSaleListlingchong, index);
        }


        /**
         * 显示宠物技能  129 655
         */
        public showPetSkill(x, y, petSkill) {
            this._viewUI.listBox.visible = false;
            var petSkillBox = this._viewUI.petSkill_box;
            petSkillBox.visible = true;
            petSkillBox.pos(x, y);
            SaleModel._instance.showList(this._viewUI.petSkill, petSkill);
            this._viewUI.petSkill.renderHandler = new Handler(this, this.petSkilllistRender, [petSkill]);
            this._viewUI.petSkill.selectHandler = new Handler(this, this.petSkillSelect, [petSkill]);

        }
        
        /**宠物技能列表渲染 */
        public petSkilllistRender(petSkill, cell: Box, index: number) {
            var skillname = petSkill[index].skillname;
            var icon = petSkill[index].icon;
            var color = petSkill[index].color;
            var skillIcon = SaleModel.getInstance().getIcon(icon);
            var frame = StrengTheningModel._instance.frameSkinArr[color - 1];
            var icon_img = cell.getChildByName("icon_img") as Laya.Image;
            icon_img.skin = skillIcon + "";
            var diban_img = cell.getChildByName("diban_img") as Laya.Image;
            diban_img.skin = frame;
            var select_img = cell.getChildByName("select_img") as Laya.Image;
            if (this.petSkillIndexArr.indexOf(index) < 0) {
                select_img.visible = false;
            } else {
                select_img.visible = true;
            }
        }
        
        /**点击图标 */
        public onIconImage(cell, index, petSkill) {
            var select_img = cell.getChildByName("select_img") as Laya.Image;
            select_img.visible = true;
            var skillname = petSkill[index].skillname;
            this.selectPetSkillName.unshift(skillname);
            this.showSkillName();
        }
        
        /**显示技能名称 */
        public showSkillName() {
            var selectPetSkill_label = this._viewUI.selectPetSkill_label;
            var str = "";
            for (var i = 0; i < this.selectPetSkillName.length; i++) {
                str += this.selectPetSkillName[i] + "  ";
            }
            selectPetSkill_label.text = str;
        }
        
        /**宠物技能选择 */
        public petSkillSelect(petSkill, index) {
            if (this._viewUI.petSkill.selectedIndex != -1) {
                if (this.petSkillIndexArr.length >= 20) {  //选择技能的个数不能大于20
                    return;
                }
                var cell = this._viewUI.petSkill.getCell(index);
                var select_img = cell.getChildByName("select_img") as Laya.Image;
                if (this.petSkillIndexArr.indexOf(index) < 0) {
                    this.petSkillIndexArr.unshift(index);
                    var skillname = petSkill[index].skillname;
                    this.selectPetSkillName.unshift(skillname);
                } else {
                    var mindex = this.petSkillIndexArr.indexOf(index);
                    this.petSkillIndexArr.splice(mindex, 1);
                    var name = this.selectPetSkillName.indexOf(petSkill[index].skillname);
                    this.selectPetSkillName.splice(name, 1);
                }
                this.showSkillName();
                this._viewUI.petSkill.selectedIndex = -1;
            }
        }

        /**
         * 宠物技能选择重置
         */
        public reset() {
            this.selectPetSkillName = [];
            this.petSkillIndexArr = [];
            this._viewUI.selectPetSkill_label.text = "";
        }

        /**
         * 确定
         */
        public ok() {
            SaleModel._instance.petSkillIndexArr = this.petSkillIndexArr;
            models.SaleProxy._instance.event(models.onSalePetSkill);
            this.hide();
        }

        /**
         * 取消
         */
        public cancel() {
            this.reset();
            this.hide();
        }

        public show(): void {
            this.selectPetSkillName = [];
            this.petSkillIndexArr = [];
            this._viewUI.selectPetSkill_label.text = "";
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