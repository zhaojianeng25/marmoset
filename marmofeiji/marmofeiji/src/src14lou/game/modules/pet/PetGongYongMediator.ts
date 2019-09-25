/**
* 宠物公用提示框
*/
module game.modules.pet {
	export class PetGongYongMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PetGongYongUI;
		/**消息提示*/
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		private _XiaoJianPanMediator: game.modules.tips.XiaoJianPanMediator;
		/**点击小键盘后的数字 */
        totalNum = "";
		constructor(uiLayaer: Sprite) {
			super(uiLayaer);
			this._viewUI = new ui.common.PetGongYongUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = false;
			this._viewUI.inputname_textinput.maxChars = 6;
			this._viewUI.inputname_textinput.on(Laya.Event.KEY_DOWN, this, this.keydown);
		}
		public show(): void {
			super.show();
		}
		/**更改名字*/
		public changename(): void {
			super.show();
			this._viewUI.fangsheng_box.visible = false;
			this._viewUI.changename_box.visible = true;
			this._viewUI.quxiao_btn.clickHandler = new Laya.Handler(this, this.quxiao);
			this._viewUI.queding_btn.clickHandler = new Laya.Handler(this, this.queding);
		}
		/**宠物放生确定*/
		public fangsheng(index: number): void {
			super.show();
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11829]
			let tips: string = chattext.msg.replace("$petname$", PetModel.getInstance().petbasedata.name)
			tips = tips.replace("$petlv$", PetModel.getInstance().petbasedata.level + "")
			this._viewUI.text_lab.changeText(tips);
			this._viewUI.fangsheng_box.visible = true;
			this._viewUI.changename_box.visible = false;
			this._viewUI.yzm_lab.changeText((Math.random() * 8999 + 1000).toFixed(0));
			this._viewUI.quxiao_btn.clickHandler = new Laya.Handler(this, this.quxiao);
			this._viewUI.queding_btn.clickHandler = new Laya.Handler(this, this.fsqueding);
			this._viewUI.yzm_label.on(LEvent.MOUSE_DOWN, this, this.onPrice);
		}
		/**取消放生或更改名字*/
		public quxiao(): void {
			this.hide();
		}

		/**确定更改名字*/
		public queding(): void {
			var newpetname: string = this._viewUI.inputname_textinput.text;
			if (this._viewUI.inputname_textinput.text != "") {
				if (this._viewUI.inputname_textinput.text.length <= 6) {
					RequesterProtocols._instance.c2s_mod_petname(PetModel._instance.petbasedata.key, newpetname);
				}
			} else {
				this.baywindows(420041);
			}
			this.hide();
		}
		
		/** 键盘落下监听-判断输入是否超过限制 */
		public keydown(): void {
			let newpetname = this._viewUI.inputname_textinput.text;
			let characterByte = this.judgebyte(newpetname);
			if (characterByte >= 6) {
				this.baywindows(142995);
			}
		}

		/**
		 * 飘窗方法提示
		 * @param count 传过来的数字就是配置表里面的数字
		 */
		public baywindows(count: number): void {
			if (count != null) {
				try {
					let prompt = HudModel.getInstance().promptAssembleBack(count);
					let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
					disappearMsgTips.onShow(prompt);
				} catch (ex) {
					console.log(ex);
				}
			}
		}
		/**
		 * 判断英文数字 或者中文 占用多少字节
		 * @param str 传过来的字
		 */
		public judgebyte(str: string): number {
			var Englishrecord: number = 0;		// 英语占用多少字节
			for (var i = 0; i < str.length; i++) {
				if (str[i].charCodeAt(0) < 299) {
					Englishrecord++;
				}
			}
			return Englishrecord;
		}
		/**确定放生*/
		public fsqueding(): void {
			if (this._viewUI.yzm_label.text == this._viewUI.yzm_lab.text) {
				models.PetProxy.getInstance().event(models.RELEASEPET_EVENT);
				this.hide();
			}
			else {	//验证码错误
				this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150075];
				this.tips.onShow(chattext.msg);
			}
		}

		/**显示小键盘 */
        public onPrice() {
            this._XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
            this._XiaoJianPanMediator.onShow(150, 400);
            game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.setPetPrice);
        }

		/**通过小键盘设置价格 */
		public setPetPrice(num) {
			if (num == -2) {  //点击了ok
				if (this.totalNum == "" || this.totalNum.charAt(0) == "0") {
					this.totalNum = "";
				}
			}
			if (num == -1) {  //点击了删除
				this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
				if (this.totalNum.length <= 0) {
					this.totalNum = "0";
				}
			}
			if(this.totalNum.length >= 4) return;
			var onePriceLabel = this._viewUI.yzm_label;
			if (num >= 0) {
				if (typeof (this.totalNum) === "number") {
					this.totalNum = "";
				}
				var oneChar = this.totalNum.charAt(0);
				if (oneChar != '0') {
					this.totalNum += num;
				} else {
					this.totalNum = num;
				}
			}
			onePriceLabel.text = this.totalNum;
		}
		
		public hide(): void {
			game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.ON_KRYBOARD, this, this.setPetPrice);
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}