module game.modules.guaji{
    /** 挂机辅助界面 */
    /** 刷新战斗中的表现 */
    const refreshBattleSkill:string = "refreshBattleSkillEvent";
    export class GuaJiFuZhuMediator extends game.modules.UiMediator{        
        private _viewUI:ui.common.GuaJiFuZhuUI;
        /** 挂机辅助界面UI初始化所需的数据 */
        private initNeedData:Array<any>=[];
        /** 智能设置中被选中的选项数据 */
        private seleectedData:Array<number>=[];
        /** 智能设置中重新选择里没被选中的选项数据 */
        private noSelectData:Array<number>=[];
        /** 技能显示配置表数据 */
        private skillsData:Object;
        /** 挂机设置的配置表数据 */
        private roleFightAIData:Object;
        /** 角色所能学技能数据 */
        private _skillArr:Array<any>;
        /** 技能图片 */
        private _skillImgArr:Array<any>;
        /** 角色当前所有技能等级的数据 */
        private _skillLevelDic:Laya.Dictionary;
        /** 飘窗 */
        private _disappearMessageTipsMediator : DisappearMessageTipsMediator;
        /** 临时数组,存放符合要求可以显示的默认技能信息 */
        private _tempSkillInfoArray:any = [];
        /** 临时数组,存放符合要求可以显示的默认技能图片 */
        private _tempSkillImgArray:any = [];
        /** 指向上一个被选为默认人物技能的索引 */
        private roleSkillIndex:any;
        /** 当前角色的职业 */
        private currRoleSchool:number;
        /** 连击点数组 */
        private paramsArray:Array<any>;
        /** 当前要选择连击点的按钮 */
        private currSelectParamBtn:Laya.Button;

        constructor(app:AppBase){
            super(app.uiRoot.general);
            this._viewUI = new ui.common.GuaJiFuZhuUI();  
            this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app;
        }

        /**
         * 用于其它页面显示挂机辅助界面
         */
        public onShow(data:Array<number>):void{
            this.seleectedData = data;
            this.show();
        }
        public static _instance:GuaJiFuZhuMediator;
		public static getInstance(app:AppBase):GuaJiFuZhuMediator 
        {
			if(!this._instance) {
				this._instance = new GuaJiFuZhuMediator(app);
			}
			return this._instance;
        }
        public show():void{
            super.show();
            //挂机界面的初始化           
            this._init();
            //注册事件
            this.registerEvent();
        }
        /**
         * 初始化界面
         */
        private _init():void{
            //数据初始化
            this._dataInit();
            //UI初始化
            this._initUI();
        }
        /**
         * 初始化挂机辅助的UI
         */
        private _initUI():void{
            //自动施放技能设置
            this.skillsConfig();
            //技能连击点列表初始化
            this.paramsConfig();
            //默认技能设置
            this.setDefaultSkill();
        }
        /**
         * 技能连击点列表初始化
         */
        private paramsConfig():void{
            this._viewUI.param_lst.array = this.paramsArray;
            this._viewUI.param_lst.vScrollBarSkin = "";
            this._viewUI.param_lst.renderHandler = new Handler(this,this.onRenderParamLst);
        }
        /**
         * 渲染连击点列表
         */
        private onRenderParamLst(cell:Box,index:number):void{
            if(index<0 || index>=this.paramsArray.length) return;
            var param_btn:Laya.Button = cell.getChildByName("param_btn") as Laya.Button;
            param_btn.label = this.paramsArray[index];
            param_btn.on(LEvent.CLICK,this,this.seleectParam,[this.paramsArray[index]]);
        }
        /**
         * 选中了某个连击点
         */
        private seleectParam(param:any):void{
            if(this.currSelectParamBtn){
                this.currSelectParamBtn.label = param;
            }
            this._viewUI.param_box.visible = false;
            this._viewUI.hideBg_img.mouseThrough = true;
        }
        /**
         * 默认技能设置
         */
        private setDefaultSkill():void{
            //置空，防止其它地方数据干扰
            this._tempSkillImgArray = [];
            this._tempSkillInfoArray = [];
            for(let i = 0; i < this._skillArr.length; i ++){
                if(!this._skillLevelDic.get(this._skillArr[i]["id"])){
                    continue;
                }
                else if(this._skillArr[i]["paramA"] == 0 && this._skillArr[i]["paramB"] == 0){
                    continue;
                }
                else if( this._skillArr[i].skillsort  != 7 &&  this._skillArr[i].skillsort  != 1 ){ //7装备附魔技能不放入1-8  1被动技能不放入
                    this._tempSkillInfoArray.push(this._skillArr[i]);
                    this._tempSkillImgArray.push(this._skillImgArr[i]);
                }
            }
            this._viewUI.defaultSkills_lst.array = this._tempSkillImgArray;
            this._viewUI.defaultSkills_lst.renderHandler = new Handler(this,this.onRenderDefaultSkillLst);
        }
        /**
         * 改变默认技能的选择
         */
        private changeSetDefaultSkill(index:number):void{
            //发送修改设置默认技能的请求
            RequesterProtocols._instance.c2s_CSetCharOpt(GuaJiOpeType.FIRESKILL,this._tempSkillInfoArray[index]["id"]);            
            models.GuaJiModel._instance.hookBattleData.charoptype = GuaJiOpeType.FIRESKILL;
            models.GuaJiModel._instance.hookBattleData.charopid = this._tempSkillInfoArray[index]["id"];
            var skill_cbox : Laya.CheckBox = this._viewUI.defaultSkills_lst.getCell(index).getChildByName("skill_cbox") as Laya.CheckBox;
            if(this.roleSkillIndex == skill_cbox){
                skill_cbox.selected = true;
            }
            else{
                skill_cbox.selected = true;
                models.GuaJiProxy.getInstance().event(models.ROLE_SKILL_IMG_CHANGE,[this._tempSkillImgArray[index]["img"],this._tempSkillInfoArray[index]["skillname"]]);
                this.roleSkillIndex.selected = false;
                this.roleSkillIndex = skill_cbox;
            }
            
        }
        /**
         * 渲染默认技能列表
         */
        private onRenderDefaultSkillLst(cell:Box,index:number):void{
            if(index < 0 || index > this._tempSkillImgArray.length-1){
                cell.visible = false;
                return;
            }
            var skill_img:Laya.Image = cell.getChildByName("skill_img") as Laya.Image;
            var skillName_lab:Laya.Label = cell.getChildByName("skillName_lab") as Laya.Label;
            skill_img.skin = this._tempSkillImgArray[index]["img"];
            skillName_lab.text = this._tempSkillInfoArray[index]["skillname"];
            var skill_cbox : Laya.CheckBox = cell.getChildByName("skill_cbox") as Laya.CheckBox;
            if(index == 0 && !this.roleSkillIndex){
                skill_cbox.selected = true;
                this.roleSkillIndex = skill_cbox;
            }
            cell.on(LEvent.CLICK,this,this.changeSetDefaultSkill,[index]);
        }
        /**
         * 自动施放技能设置
         */
        private skillsConfig():void{
            this._viewUI.skillsConfig_lst.array = this.initNeedData;
            this._viewUI.skillsConfig_lst.vScrollBarSkin ='';
            this._viewUI.skillsConfig_lst.scrollBar.elasticBackTime = 200;
            this._viewUI.skillsConfig_lst.scrollBar.elasticDistance = 100;
            this.noSelectData = [];            
            this._viewUI.skillsConfig_lst.renderHandler = new Handler(this,this.onRenderSkillsConfigList);
        }
        /**
         * 渲染选择技能列表
         */
        private onRenderSkillsConfigList(cell:Box,index:number):void{
            if(index < 0 || index > this.initNeedData.length-1){
                cell.visible = false;
                return;
            }
            var jinengShuoming : Laya.Label = cell.getChildByName("jinengShuoming") as Laya.Label;
            var isSelect_cbox:Laya.CheckBox = cell.getChildByName("isSelect_cbox") as Laya.CheckBox;
            var param_btn:Laya.Button = cell.getChildByName("param_btn") as Laya.Button;
            for(let i = 0; i < this.seleectedData.length; i++){
                if(this.initNeedData[index]["id"] == this.seleectedData[i]){//如果列表初始化所需的数据中的id等于传过来被选中id的话
                    isSelect_cbox.selected = true;//就是被选中，则被勾选上
                }
            }
            jinengShuoming.text = this.initNeedData[index]["desc"];
            if(this.currRoleSchool == zhiye.qixing){//如果是七星观门派，列表渲染也要进行另外处理
                this.otherLabShow(jinengShuoming,jinengShuoming.text,this.initNeedData[index]["param"],param_btn);
            }
            cell.on(LEvent.CLICK,this,this.changeSetRoleSkill,[index]);
        }
        /**
         * 对七星观门派技能智能设置中的介绍进行另外的处理
         */
        private otherLabShow(lab:Laya.Label,text:string,parameter:any,param_btn:any):void{
            if(text.indexOf("$parameter1$") == -1) return;
            text = text.replace("$parameter1$","    ");
            lab.text = text;
            param_btn.label = parameter;
            param_btn.on(LEvent.CLICK,this,this.showSeleectParamsLst,[param_btn]);
            param_btn.visible = true;
        }
        /**
         * 显示出选择连击点的列表
         */
        private showSeleectParamsLst(btn:Laya.Button):void{
            this.currSelectParamBtn = btn;
            this._viewUI.param_box.visible = true;
            this._viewUI.hideBg_img.mouseThrough = false;
        }
        /**
         * 改变人物自动施放技能的设置选项
         */
        private changeSetRoleSkill(index:number):void{
            var skillid:any = this.initNeedData[index]["skill"];
            var levelLimit = this.initNeedData[index]["level"];
            var isSelect_cbox:Laya.CheckBox = this._viewUI.skillsConfig_lst.getCell(index).getChildByName("isSelect_cbox") as Laya.CheckBox;
            if(isSelect_cbox.selected){
                isSelect_cbox.selected = false;
                this.noSelectData.push(this.initNeedData[index]["id"]);
            }
            else if(this._skillLevelDic.get(skillid)){
                isSelect_cbox.selected = true;
            }
            else{
                var skillName = this.skillsData[skillid]["skillname"];
                var _prompt = mainhud.models.HudModel._instance.promptAssembleBack(166002,[levelLimit,skillName]);
                this.show_Msg(_prompt);
            }
        }
        /**
         * 弹出消息气泡
         */
        private show_Msg(msg:any):void{
            this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
            this._disappearMessageTipsMediator.onShow(msg);
        }
        /**
         * 数据初始化
         */
        private _dataInit():void{
            this.currRoleSchool = createrole.models.LoginModel.getInstance().roleDetail.school;
            this.skillsData = skill.models.SkillModel.getInstance().CSchoolSkillitemBinDic;
            this.roleFightAIData = models.GuaJiModel._instance.roleFightAIDic;
            var _keys = Object.keys(this.roleFightAIData);
            this.initNeedData = [];
            for(let i = 0; i < Object.keys(this.roleFightAIData).length; i++){
                if(this.roleFightAIData[_keys[i]]["school"] == this.currRoleSchool){
                    this.initNeedData.push(this.roleFightAIData[_keys[i]]);//放入门派所对应的挂机智能设置数据
                }
            }
            this.getParamArray();
            if(this.currRoleSchool == zhiye.qixing){//如果门派是七星观的话，要进行额外的数据处理
                this.otherDataInit();
            }
            this._skillArr  = skill.models.SkillModel.getInstance().skillArr;
            this._skillImgArr = skill.models.SkillModel.getInstance().skillImgArr;
            this._skillLevelDic = skill.models.SkillModel.getInstance().skillLevelDic;
        }
        /**
         * 获取有需要连击点设定的技能所需几种连击点数据
         */
        private getParamArray():void{
            this.paramsArray = [];
            for(let i = 0; i < this.initNeedData.length; i++){
                let _desc = this.initNeedData[i]["desc"];
                //找到需要连击点设定的技能，并且排除掉重复的连击点数值的数据
                if(_desc.indexOf("$parameter1$") != -1 && this.paramsArray.indexOf(this.initNeedData[i]["param"]) == -1){
                    this.paramsArray.push(this.initNeedData[i]["param"]);
                }                
            }
        }
        /**
         * 对于七星观门派进行其它数据处理
         */
        private otherDataInit():void{
            var _temp1 = [];
            var _temp2 = [];
            for(let i = 0; i < this.initNeedData.length; i++){
                if(!this.initNeedData[i]["param"] && this.initNeedData[i]["param"] ==0 ){
                    _temp1.push(this.initNeedData[i]);//先放七星观没有要求连击点参数为零(包括不需要连击点与需要连击点数值为零)的技能
                }
                else{
                    for(let j = 0; j < this.seleectedData.length; j ++){
                        if(this.initNeedData[i]["id"] == this.seleectedData[j]){
                            _temp2.push(this.initNeedData[i]);//放入有要求连击点参数,而且是被选中的数据
                        }
                    }
                }
            }
            //数据参数替换（
            for(let i = 0; i < _temp1.length; i++){
                for(let j = 0; j < _temp2.length; j ++){
                    if(_temp1[i]["desc"] == _temp2[j]["desc"]){
                        _temp1[i] = _temp2[j];
                    }
                }
            }
            this.initNeedData = [];//置空，重新存放数据
            this.initNeedData = _temp1;
        }
        /**
         * 注册事件
         */
        private registerEvent():void{
            //按钮事件监听
            this._viewUI.close_btn.on(LEvent.CLICK,this,this.hide);
            //单选框事件监听
            this._viewUI.attack_cbox.on(LEvent.CLICK,this,this.changeGuaJiOpe,[this._viewUI.attack_cbox]);
            this._viewUI.defense_cbox.on(LEvent.CLICK,this,this.changeGuaJiOpe,[this._viewUI.defense_cbox]);
        }
        /**
         * 更改挂机的操作
         */
         private changeGuaJiOpe(cbox:any):void{            
            switch(Number(cbox.name)){
                case GuaJiOpeType.ATTACK:
                    RequesterProtocols._instance.c2s_CSetCharOpt(GuaJiOpeType.ATTACK,0);                                
                    models.GuaJiModel._instance.hookBattleData.charoptype = GuaJiOpeType.ATTACK;
                    models.GuaJiProxy.getInstance().event(models.ROLE_SKILL_IMG_CHANGE,["common/ui/guaJi/attack1.png","攻击"]);
                    break;
                case GuaJiOpeType.DEFENSE:
                    RequesterProtocols._instance.c2s_CSetCharOpt(GuaJiOpeType.DEFENSE,0);                                
                    models.GuaJiModel._instance.hookBattleData.charoptype = GuaJiOpeType.DEFENSE;
                    models.GuaJiProxy.getInstance().event(models.ROLE_SKILL_IMG_CHANGE,["common/ui/guaJi/defense1.png","防御"]);
                    break;
            }
            if(this.roleSkillIndex == cbox){
                cbox.selected = true;
            }
            else{
                cbox.selected = true;
                this.roleSkillIndex.selected = false;
                this.roleSkillIndex = cbox;
            }
         }

        public hide():void {
            this.removeNoNeedData();
            this.hideComponent();
            RequesterProtocols._instance.c2s_CSetRoleFightAI(this.seleectedData);
			super.hide();
		}
        /**
         * 隐藏在某些特定职业下才会出现的UI
         */
        private hideComponent():void{
            var param1_btn:Laya.Button = this._viewUI.skillsConfig_lst.getCell(1).getChildByName("param_btn") as Laya.Button;
            if(param1_btn && param1_btn.visible){
                param1_btn.visible = false;
            }
            var param2_btn:Laya.Button = this._viewUI.skillsConfig_lst.getCell(3).getChildByName("param_btn") as Laya.Button;
            if(param2_btn && param2_btn.visible){
                param2_btn.visible = false;
            }
            if(this._viewUI.param_box.visible){
                this._viewUI.param_box.visible = false;
            }
            this._viewUI.hideBg_img.mouseThrough = true;
        }
        /**
         * 除去不需要的数据
         */
        private removeNoNeedData():void{
            if(this.noSelectData.length == 0) return;
            var _tempArray:any = [];
            for(let i = 0; i < this.seleectedData.length; i++){
                for(let j = 0; j < this.noSelectData.length; j++){
                    if(this.seleectedData[i] != this.noSelectData[j]){
                        _tempArray.push(this.seleectedData[i]);
                    }
                }
            }
            this.seleectedData = _tempArray;
        }

        public getView():Sprite {
			return this._viewUI;
		}
    }
}