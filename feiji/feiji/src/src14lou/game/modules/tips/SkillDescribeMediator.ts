/**
* 伙伴技能详细信息显示
*/
module game.modules.tips{
	export class SkillDescribeMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.component.partnerSkillUI;
        /**伙伴技能显示表 */
        friendSkillData = game.modules.huoban.models.HuoBanModel._instance.friendSkillData;
		/**最小的高度 */
        minHtmlHeight = 120;  
		constructor(uiLayer: Sprite){
			super(uiLayer);
			this._viewUI = new ui.common.component.partnerSkillUI();
            this.isCenter = false;
			this._viewUI.bk_img.on(LEvent.MOUSE_DOWN,this,this.closeTips)
		}

        /**
         * 显示技能
         * @param skillId 
         */
        public showSkillDescribe(skillId:number){
	
            var name = this.friendSkillData[skillId].name;
            var desc = this.friendSkillData[skillId].desc;
            var imageID = this.friendSkillData[skillId].imageID;
            this._viewUI.name_lab.text = name;
            this._viewUI.name_lab.centerX = 0;
            this._viewUI.skillIocn_img.skin = "common/icon/skill/" + imageID + ".png";
            var bgHeight = this._viewUI.bg_img.height;
			this._viewUI.skillDescribe_html.innerHTML = desc;
			if(this._viewUI.skillDescribe_html.height > this.minHtmlHeight){
				this._viewUI.bg_img.height = bgHeight - this.minHtmlHeight + this._viewUI.skillDescribe_html.height;
			}
			this._viewUI.bg_img.centerY = 0;
        }
        
		/**关闭tips */
		public closeTips(){
			models.TipsProxy.getInstance().event(models.CLOSE_TIPS);	
		}

		public show(){
			super.show();
		}
        
		public hide():void {
			
			super.hide();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}
	}
}