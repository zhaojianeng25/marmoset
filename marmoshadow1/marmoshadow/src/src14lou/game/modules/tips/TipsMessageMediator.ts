/**
* 通用客户端提示显示tips
*/
module game.modules.tips {
	export class TipsMessageMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.component.TipsMessageUI;
		/** 倒计时 */
		private currentSecond: number;
		/**客户端信息提示表 */
		chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
		/**程序内字符串表 */
		cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
		/**存储替换的字符串，以便再次替换 */
		str: string = ""
		/** 传导模块 */
		private moduleName: string = "";
		/**最小的高度 */
		minHtmlHeight = 60;
		constructor(uiLayer: Sprite, app: AppBase) {
			super(app.uiRoot.topUnder);
			this._viewUI = new ui.common.component.TipsMessageUI();
			this._app = app;
			this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.onCancelBtn);
			this._viewUI.cancel_btn.visible = true;
			this._viewUI.cancel_btn.x = 50;
			this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN, this, this.onOkBtn);
			this._viewUI.ok_btn.visible = true;
			this._viewUI.ok_btn.x = 260;
		}

		/**
		 * 显示客户端信息
		 * @param contentId 显示信息id
		 * @param parame   字典(标题title,参数parame[])
		 */
		public showContent(parame: Dictionary, moduleName?: string) {
			if (moduleName)
				this.moduleName = moduleName;
			var msg = "";
			var contentId = parame.get("contentId");
			if (this.chatMessageTips[contentId] == null) {
				msg = this.cstringResConfigData[contentId].msg;
			} else {
				msg = this.chatMessageTips[contentId].msg;
			}
			this.str = msg;
			if (parame.get("parame") != null) {
				var m_parame = parame.get("parame");
				for (var i = 1; i < m_parame.length + 1; i++) {
					this.str = this.str.replace("$parameter" + i + "$", m_parame[i - 1]);
				}
			}
			// else {
			// 	this.str = "<span style='fontSize:24;color:#391104'>" + this.str + "</span><br>"(this._viewUI.content_html.contextHeight/24-1)
			// }
			// 判断字符串中是否存在样式，-1表示不存在
			if (this.str.indexOf("<span") == -1) {
				this.str = "<span style='fontSize:24;color:#391104'>" + this.str + "</span><br>"
			}
			this._viewUI.content_html.style.width = 430;
			this._viewUI.content_html.style.align = "center";
			this._viewUI.content_html.innerHTML = this.str;
			var fontSizeLength = this.str.indexOf("fontSize:") + "fontSize:".length;
			var fontSize = parseInt(this.str.substring(fontSizeLength, fontSizeLength + 2));
			var contextHeight: number = Math.floor(this._viewUI.content_html.contextHeight);
			//108为单行文本时垂直居中的y值坐标，文本行数倍数大于等于3时才需要变更坐标位置
			if (contextHeight / fontSize > 3) {
				this._viewUI.content_html.y = 108 - ((contextHeight / fontSize - 3) * fontSize);
			} else if (contextHeight / fontSize == 3) {
				this._viewUI.content_html.y = 108 - ((contextHeight / fontSize - 2) * (fontSize / 2));
			} else {
				this._viewUI.content_html.y = 108;
			}
			if (parame.get("btnName") != null) {
				this._viewUI.ok_btn.label = parame.get("btnName");
			} else {
				this._viewUI.ok_btn.label = "确定";
			}
		}
		/** 设置确定按钮居中，隐藏取消按钮 */
		public setBtnVisi(): void {
			this._viewUI.cancel_btn.visible = false;
			this._viewUI.ok_btn.x = 151;
		}
		/** 计时器 */
		public counTime(time: number): void {
			this.currentSecond = time;
			Laya.timer.loop(1000, this, this.updataTime);
		}
		/** 循环倒计时刷新UI */
		private updataTime(): void {
			this.currentSecond--;
			if (this.currentSecond < 0) {
				this.onCancelBtn();
			} else {
				let prompt = this.cstringResConfigData[2036].msg;
				this._viewUI.cancel_btn.label = prompt + "(" + this.currentSecond + ")";
			}
		}

		/**点击取消按钮 */
		public onCancelBtn() {
			this.hide();
			Laya.timer.clear(this, this.updataTime);
			models.TipsProxy.getInstance().event(models.TIPS_ON_CANCEL);
			models.TipsProxy.getInstance().offAll(models.TIPS_ON_OK);
		}

		/**点击ok按钮 */
		public onOkBtn() {
			this.hide();
			Laya.timer.clear(this, this.updataTime);
			if (this.moduleName != "") {
				models.TipsProxy.getInstance().event(models.TIPS_ON_OK, this.moduleName);
				this.moduleName = "";
			} else models.TipsProxy.getInstance().event(models.TIPS_ON_OK);

			models.TipsProxy.getInstance().offAll(models.TIPS_ON_CANCEL);
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