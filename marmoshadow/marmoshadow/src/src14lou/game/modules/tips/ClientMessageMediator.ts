
module game.modules.tips {
	/** 通用客户端提示显示tips */
	export class ClientMessageMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.component.ClientMessageUI;
		/**客户端信息提示表 */
		chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
		/**程序内字符串表 */
		cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
		/**将替换之后的字符串存起来，以便后面再次替换 */
		str: string = "";
		/**最小的高度 */
		minHtmlHeight = 120;  
		constructor(uiLayer: Sprite) {
			super(uiLayer);
			this._viewUI = new ui.common.component.ClientMessageUI();
			this.isCenter = false;
			this.registBtnEvent();
		}
        
		/**注册按钮点击事件 */
		private registBtnEvent(): void {
			this._viewUI.mask_img.on(LEvent.CLICK, this, this.closeWindow);
		}
		
		/** 关闭界面 */
		private closeWindow(): void {
			models.TipsProxy.getInstance().event(models.CLOSE_TIPS);
		}

		/**
		 * 显示客户端信息
		 * @param parame   各参数字典
		 */
		public showContent(parame: Dictionary) {		
			if(parame.get("posX") != null){//x坐标位置
				let posX:number = parame.get("posX");
				this._viewUI.bg_img.x = posX;//设置x坐标
			}
			else{
				this._viewUI.bg_img.centerX = 0;
			}
			if(parame.get("posY") != null){//y坐标位置
				let posY:number = parame.get("posY");
				this._viewUI.bg_img.y = posY;//设置y坐标
			}
			else{
				this._viewUI.bg_img.centerY = 0;
			}
			if (parame.get("title") != null) {//标题id
				var title = parame.get("title");
				this._viewUI.tital_label.text = this.cstringResConfigData[title].msg;
				this._viewUI.tital_label.centerX = 0;
			}
			var msg = "";
			var contentId = parame.get("contentId");//内容id
			if (this.chatMessageTips[contentId] == null) {
				msg = this.cstringResConfigData[contentId].msg;
			} else {
				msg = this.chatMessageTips[contentId].msg;
			}
			this.str = msg;
			if (parame.get("parame") != null) {//参数数组
				var m_parame = parame.get("parame");
				for (var i = 1; i < m_parame.length + 1; i++) {
					this.str = this.str.replace("$parameter" + i + "$", m_parame[i - 1]);
				}
				if (parame.get("color") != null) {//颜色
					var m_color = parame.get("color");
					for (var i = 1; i < m_color.length + 1; i++) {
						this.str = this.str.replace("$color" + i + "$", m_color[i - 1]);
					}
				}
			}
			this.setHtml(this.str);			
			this.show();
		}

        /**
		 * 重新设置背景的高度位置
		 * @param html 
		 */
		public setHtml(html) {
			var bgHeight = this._viewUI.bg_img.height;
			this._viewUI.content_html.innerHTML = html;
			if (this._viewUI.content_html.height > this.minHtmlHeight) {
				this._viewUI.bg_img.height = bgHeight - this.minHtmlHeight + this._viewUI.content_html.height;
			}			
		}

		public show() {
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