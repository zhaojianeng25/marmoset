
module game.modules.skill{
    /**技能按钮 */
	enum ButtonType {
        fightSkill_btn  = 1,
        lifeSkill_btn    = 2,
        specialtySkill_btn = 3,
        marrySkill_btn = 4
    }
	export class SkillModule extends game.modules.ModuleMediator{
		private _viewUI:ui.common.SkillDibanUI;
		private _SkillStudyMediator:SkillStudyMediator;
		private _SkillLifeMediator:SkillLifeMediator;
		private _SkillZhuanJingMediator:SkillZhuanJingMediator;
        private _SkillMarryMediator:SkillMarryMediator;
        /**动画 */
		private ani:Laya.Animation;
		/**手指图标 */
		private dianImg:Laya.Image;
		/**当前引导编号 */
		private yindaoId:number;
        /** 是否关闭（给回退到帮派福利界面处做标识） */
        private isClose:boolean = false;
		constructor(app:AppBase){
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.SkillDibanUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
            models.SkillModel.getInstance().appBase = this._app;
            
			// 战斗技能界面
            this._SkillStudyMediator = new SkillStudyMediator(this._viewUI,this._app);
            // 生活技能界面
            this._SkillLifeMediator = new SkillLifeMediator(this._viewUI,this._app);
            // 专精技能界面
            this._SkillZhuanJingMediator = new SkillZhuanJingMediator(this._viewUI,this._app);
            // 结婚技能界面
            this._SkillMarryMediator = new SkillMarryMediator(this._viewUI);
            this.initialize();
			this.registerEvent();

		}
        /**初始化 */
		public initialize():void{
			this.ani = new Laya.Animation();
			this.dianImg = new Laya.Image();
		}
		public show():void {
			super.show();
		}
		
		protected onShow(event:Object):void {
			this._app.uiRoot.closeLoadProgress();
			this.show();
            //选中页面
            let currentSelect = skill.models.SkillModel.getInstance().currenTabNum;
            //通知主界面开启蒙版
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
            //点击生活技能引导
            if(HudModel.getInstance().yindaoId == YinDaoEnum.LIFESKILL_YINDAO)
                this.clicklifeYindao();
            //点击专精引导
			else if(HudModel.getInstance().yindaoId == YinDaoEnum.ZHUANJING_CLICK_YINDAO)
				this.clickzhuangjingYindao();
            this.switchButton(currentSelect);
			this.switchChildUI(currentSelect);
            //根据等级开放不同功能按钮
            if(HudModel.getInstance().levelNum<35){
                this._viewUI.lifeSkill_btn.visible = false;//生活技能
                this._viewUI.specialtySkill_btn.visible = false;//专精技能
                this._viewUI.marrySkill_btn.visible = false;//结婚技能
            }else if(HudModel.getInstance().levelNum>=35 &&HudModel.getInstance().levelNum<45){
                this._viewUI.lifeSkill_btn.visible = true;//生活技能
                this._viewUI.specialtySkill_btn.visible = false;//专精技能
                this._viewUI.marrySkill_btn.visible = false;//结婚技能
            }else if(HudModel.getInstance().levelNum>=45 &&HudModel.getInstance().levelNum<50){
                this._viewUI.lifeSkill_btn.visible = true;//生活技能
                this._viewUI.specialtySkill_btn.visible = true;//专精技能
                this._viewUI.marrySkill_btn.visible = false;//结婚技能
            }else{
                 this._viewUI.lifeSkill_btn.visible = true;//生活技能
                this._viewUI.specialtySkill_btn.visible = true;//专精技能
                this._viewUI.marrySkill_btn.visible = true;//结婚技能
            }
		}
        /**点击专精引导 */
        public clickzhuangjingYindao():void{
            var x1 = this._viewUI.specialtySkill_btn.x + this._viewUI.specialtySkill_btn.width;
			var y1 = this._viewUI.specialtySkill_btn.y + this._viewUI.skilldiban_box.y ;
			var x2 = x1 - 60;
			var y2 = y1 + 30 ;
			this.setAniPos(x2,y2);
			this.startYindao(0);
            HudModel.getInstance().yindaoId = YinDaoEnum.RESET_YINDAO;
            this.yindaoId = YinDaoEnum.ZHUANJING_CLICK_YINDAO;
        }
        /**点击生活技能引导 */
        public clicklifeYindao():void{
            var x1 = this._viewUI.lifeSkill_btn.x + this._viewUI.lifeSkill_btn.width;
			var y1 = this._viewUI.lifeSkill_btn.y + this._viewUI.skilldiban_box.y ;
			var x2 = x1 - 60;
			var y2 = y1 + 30 ;
			this.setAniPos(x2,y2);
			this.startYindao(0);
            HudModel.getInstance().yindaoId = YinDaoEnum.LIFESKILL_TIP_YINDAO;
            this.yindaoId = YinDaoEnum.LIFESKILL_YINDAO;
        }
        /**引导开始 */
		public startYindao(tipid:number):void{
			var tip = HudModel._instance.carroweffectData;
			this.onload();
			Laya.timer.loop(1000,this,this.moveImg);
			Laya.timer.loop(5000,this,this.closeAni);
			this._viewUI.addChild(this.ani);
			this._viewUI.addChild(this.dianImg);
			
		}
		/**设置动画位置*/
		public setAniPos(x:number,y:number){
			this.ani.x = x;
			this.ani.y = y;
			this.dianImg.x = x;
			this.dianImg.y = y;
		}
		/**关闭动画 */
		public closeAni():void{
			this.ani.clear();
			Laya.timer.clear(this,this.closeAni);
			Laya.timer.clear(this,this.moveImg);
			this.dianImg.visible = false;
			this.dianImg.mouseThrough = false;
		}
		/**播放动画 */
		public onload(){
			Laya.Animation.createFrames(this.anUrls("",9),"yindao")
			this.ani.play(0,true,"yindao");
			this.ani.interval = 112;
			this.dianImg.skin = "common/ui/mainhud/dian.png";
            this.dianImg.mouseThrough = true;
            this.ani.mouseThrough = true;
		}
		/**移动手指图标 */
		public moveImg():void{
			this.dianImg.visible = true;
			if(this.dianImg.y<=this.ani.y)
				Laya.Tween.to(this.dianImg,{x:this.ani.x + 25,y:this.ani.y +25},1000,null,Laya.Handler.create(this,function() {} ),null,false);
			else
				Laya.Tween.to(this.dianImg,{x:this.ani.x-5 ,y:this.ani.y-5},1000,null,Laya.Handler.create(this,function() {} ),null,false);
		}
        /**获取资源数据 */
		public anUrls(aniName:string,length:number):any{
			var urls:any=[]
			for (var index = 1; index <= length; index++) {
				urls.push("common/ui/yindao/"+aniName+index+".png");			
			}
			return urls;
		}
		public getView():Sprite {
			return this._viewUI;
		}
		public hide():void {
            super.hide();
            //设置下次打开时显示的子页面
            skill.models.SkillModel.getInstance().currenTabNum = SkillEnum.ZHANDOU_KEY;
            if(LoginModel.getInstance().CommonPage != "")
            {   
                ModuleManager.show(LoginModel.getInstance().CommonPage,this._app);
                LoginModel.getInstance().CommonPage = "";
            }
            var _isFlag = skill.models.SkillModel.getInstance().isFromClanWelfareJump;//获取是否从帮派福利中生活技能而来的标识
            if(_isFlag && this.isClose){
                skill.models.SkillModel.getInstance().isFromClanWelfareJump = false;
                this.isClose = false;
                family.models.FamilyModel.getInstance().clanCurrenTabNum = 2;//打开帮派福利子界面的索引
                ModuleManager.show(ModuleNames.haveFamily,this._app);
            }
		}
        
        /**注册按钮监听事件 */
        private registerEvent(): void {
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this, this.clickCloseBtnEvent);
			this._viewUI.fightSkill_btn.on(LEvent.MOUSE_DOWN,this, this.clickFightBtnEvent);
			this._viewUI.lifeSkill_btn.on(LEvent.MOUSE_DOWN,this, this.clickLifeBtnEvent);
			this._viewUI.specialtySkill_btn.on(LEvent.MOUSE_DOWN,this, this.clickSpecialtyBtnEvent);
            this._viewUI.marrySkill_btn.on(LEvent.MOUSE_DOWN,this, this.clickMarryBtnEvent);
        }
        /**点击关闭按钮 */
        private clickCloseBtnEvent(): void {
            //通知主界面关闭黑色蒙版
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            var _isFlag = skill.models.SkillModel.getInstance().isFromClanWelfareJump;//获取是否从帮派福利中生活技能而来的标识
            if(_isFlag){
                this.isClose = true;
            }
            this.hide();
            this._SkillStudyMediator.hide();
            this._SkillLifeMediator.hide();
            this._SkillZhuanJingMediator.hide();
            this._SkillMarryMediator.hide();
        }
        /**战斗按钮点击事件 */
        private clickFightBtnEvent(): void {
            if (!this._viewUI.fightSkill_btn.selected) {
                this.switchButton(ButtonType.fightSkill_btn);
                this.switchChildUI(ButtonType.fightSkill_btn);
            }
        }
        /**生活技能点击事件 */
        private clickLifeBtnEvent(): void {
            if (!this._viewUI.lifeSkill_btn.selected) {
                this.switchButton(ButtonType.lifeSkill_btn);
                this.switchChildUI(ButtonType.lifeSkill_btn);
                //如果有引导，关闭引导
                if(this.yindaoId==YinDaoEnum.LIFESKILL_YINDAO)
                    this.closeAni();
            }
        }
        /**专精技能点击事件 */
        private clickSpecialtyBtnEvent(): void {
            if (!this._viewUI.specialtySkill_btn.selected) {
                this.switchButton(ButtonType.specialtySkill_btn);
                this.switchChildUI(ButtonType.specialtySkill_btn);
                //如果有引导，关闭引导
                if(this.yindaoId==YinDaoEnum.ZHUANJING_CLICK_YINDAO)
                    this.closeAni();
            }
        }
        /**结婚技能点击事件 */
        private clickMarryBtnEvent(): void {
            if (!this._viewUI.marrySkill_btn.selected) {
                this.switchButton(ButtonType.marrySkill_btn);
                this.switchChildUI(ButtonType.marrySkill_btn);
            }
        }
        
        /**切换按钮 */
        private switchButton(index: ButtonType) {
            //初始化button的select状态
            this._viewUI.fightSkill_btn.selected = false;
            this._viewUI.lifeSkill_btn.selected = false;
            this._viewUI.specialtySkill_btn.selected = false;
            this._viewUI.marrySkill_btn.selected = false;
            switch(index) {
                case ButtonType.fightSkill_btn:
                    this._viewUI.fightSkill_btn.selected = true;
                    break;
                case ButtonType.lifeSkill_btn:
                    this._viewUI.lifeSkill_btn.selected = true;   
                    break;
                case ButtonType.specialtySkill_btn:
                    this._viewUI.specialtySkill_btn.selected = true;   
                    break;
                case ButtonType.marrySkill_btn:
                    this._viewUI.marrySkill_btn.selected = true;   
                    break;
                default:
                    console.log("SkillModule.switchButton error");             
            }
        }

        /**切换子界面 */
        private switchChildUI(index: ButtonType) {
            switch(index) {
                case ButtonType.fightSkill_btn:
                    this._SkillStudyMediator.show();
                    this._SkillLifeMediator.hide();
                    this._SkillZhuanJingMediator.hide();
                    this._SkillMarryMediator.hide();
                    break;
                case ButtonType.lifeSkill_btn:
                    this._SkillStudyMediator.hide();
                    this._SkillLifeMediator.show();
                    this._SkillZhuanJingMediator.hide();
                    this._SkillMarryMediator.hide();
                    break;
                case ButtonType.specialtySkill_btn:
                    this._SkillStudyMediator.hide();
                    this._SkillLifeMediator.hide();
                    this._SkillZhuanJingMediator.show();
                    this._SkillMarryMediator.hide();
                    break;
                case ButtonType.marrySkill_btn:
                    this._SkillStudyMediator.hide();
                    this._SkillLifeMediator.hide();
                    this._SkillZhuanJingMediator.hide();
                    this._SkillMarryMediator.show();
                    break;
                default:
                    console.log("SkillModule.switchChildUI error");       
            }
        }
	}
}