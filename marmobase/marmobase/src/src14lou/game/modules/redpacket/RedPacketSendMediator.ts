/**
 * 发送红包界面  本界面里，符石就是元宝
 */
module game.modules.redPacket{
	export class RedPacketSendMediator extends game.modules.UiMediator{
        private _viewUI : ui.common.RedEnvelopeUI;
		private _redConfirmMediator : RedConfirmMediator;
		private _disappearMessageTipsMediator : DisappearMessageTipsMediator;
		/** 红包主界面 */
		private _redPacketMediator:RedPacketMediator;
		/** 当前红包类型 */
		private curr_type:number;
		/** 红包配置表 */
		private configure_Vo : RedPackConfigBaseVo;
		/** 符石最少值 */
		private fushimin:number;
		/** 符石最多值 */
		private fishimax:number;
		/** 红包数量最少值 */
		private packmin:number;
		/** 红包数量最多值 */
		private packmax:number;
		/** 当前文本内容 */
		private curr_text:string;
		/** 最后显示的文本内容 */
		private last_text:string;
		/** 可输入的最小值 */
		private _min:number;
		/** 可输入的最大值 */
		private _max:number;
		/** 最大值的长度 */
		private _maxLength:number = 0;
		/** 当前文本 */
		private curr_label : Laya.Label;
		/** 输入的数值超出范围事件 */
		public static NUMBER_OVER_RANK:string = "numberOverRank";
		/** 玩家当前拥有的符石数 */
		private fushiNumber:number;
        /** tips界面 */
        private _tipsModule:tips.tipsModule;

        constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.RedEnvelopeUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;

			this._redConfirmMediator = new RedConfirmMediator(app);			
		}
		
		public showUI(type?:number):void{
			if(type != null){
				this.curr_type = type;
			}			
			this.show();
		}

        public show():void {
            this._init_UI();
			this.registerEvent();
			super.show();
		}
		
        private _init_UI():void{
			this.configure_Vo = models.RedPacketModel.getInstance().redPackDic[this.curr_type];
			this.fushimin = this.configure_Vo.fushimin;
            this.fishimax = this.configure_Vo.fishimax;
            this.packmin = this.configure_Vo.packmin;
            this.packmax = this.configure_Vo.packmax;
			//获取当前玩家背包中的符石数量
			this.fushiNumber = bag.models.BagModel.getInstance().yuanbaoIcon;
            this._init_label();//初始化界面文本
        }
		/**
		 * 判断所输入的数值是否是玩家当前所能支持
		 */
		private onJudgeNumber(lab:Laya.Label,num:number):void{
			if(lab == this._viewUI.hongBaoNumber_lab) return;
			if(num > this.fushiNumber){
				lab.color = "#ff0400";
			}
			else if(num <= this.fushiNumber){
				lab.color = "#000000"
			}
		}
		////////////////
        ///事件
        ////////////////
        /**注册事件
         * @describe  UI的事件监听注册与消息监听注册
         */
		private registerEvent():void{
			//添加自定义事件监听
			this._viewUI.hongBaoMoneyDown_btn.on(RedPacketSendMediator.NUMBER_OVER_RANK,this,this.send_over_msg);
			this._viewUI.hongBaoMoneyUp_btn.on(RedPacketSendMediator.NUMBER_OVER_RANK,this,this.send_over_msg);
			this._viewUI.hongBaoNumberDown_btn.on(RedPacketSendMediator.NUMBER_OVER_RANK,this,this.send_over_msg);
			this._viewUI.hongBaoNumberUp_btn.on(RedPacketSendMediator.NUMBER_OVER_RANK,this,this.send_over_msg);
			//添加鼠标点击事件监听
			this._viewUI.hongBaoMoneyDown_btn.on(LEvent.CLICK,this,this.moneyDown);
			this._viewUI.hongBaoMoneyUp_btn.on(LEvent.CLICK,this,this.moneyUp);
			this._viewUI.hongBaoNumberDown_btn.on(LEvent.CLICK,this,this.numberDown);
			this._viewUI.hongBaoNumberUp_btn.on(LEvent.CLICK,this,this.numberUp);
			//为发送红包按钮添加监听事件
			this._viewUI.send_hongbao_btn.on(LEvent.CLICK,this,this.show_confirmUI);
			//为输入寄语文本区域添加监听事件
			this._viewUI.hongBaoJiYu_input.on(LEvent.MOUSE_DOWN,this,this.setText);
			//tips按钮被点
            this._viewUI.tips_btn.on(LEvent.MOUSE_DOWN,this,this.onSHowTipsUI);
			//背景透明图片添加监听事件
            this._viewUI.hideBg_img.on(LEvent.CLICK,this,this.onTipsHide);
			tips.models.TipsProxy.getInstance().on(tips.models.TIPS_ON_OK,this,this.goToPutMoney);
			tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD,this,this.getNum);
			tips.models.TipsProxy.getInstance().on(RedPacketSendMediator.NUMBER_OVER_RANK,this,this.send_over_msg);
			this._viewUI.close_btn.on(LEvent.MOUSE_UP,this,this.close_hide);
		}
		/** 取消事件 */
		private removeEvent():void{
			this._viewUI.hongBaoMoneyDown_btn.off(RedPacketSendMediator.NUMBER_OVER_RANK,this,this.send_over_msg);
			this._viewUI.hongBaoMoneyUp_btn.off(RedPacketSendMediator.NUMBER_OVER_RANK,this,this.send_over_msg);
			this._viewUI.hongBaoNumberDown_btn.off(RedPacketSendMediator.NUMBER_OVER_RANK,this,this.send_over_msg);
			this._viewUI.hongBaoNumberUp_btn.off(RedPacketSendMediator.NUMBER_OVER_RANK,this,this.send_over_msg);
			this._viewUI.hongBaoMoneyDown_btn.off(LEvent.CLICK,this,this.moneyDown);
			this._viewUI.hongBaoMoneyUp_btn.off(LEvent.CLICK,this,this.moneyUp);
			this._viewUI.hongBaoNumberDown_btn.off(LEvent.CLICK,this,this.numberDown);
			this._viewUI.hongBaoNumberUp_btn.off(LEvent.CLICK,this,this.numberUp);
			this._viewUI.send_hongbao_btn.off(LEvent.CLICK,this,this.show_confirmUI);
			this._viewUI.hongBaoJiYu_input.off(LEvent.MOUSE_DOWN,this,this.setText);
            this._viewUI.tips_btn.off(LEvent.MOUSE_DOWN,this,this.onSHowTipsUI);
            this._viewUI.hideBg_img.off(LEvent.CLICK,this,this.onTipsHide);
			tips.models.TipsProxy.getInstance().off(tips.models.TIPS_ON_OK,this,this.goToPutMoney);
			tips.models.TipsProxy.getInstance().off(game.modules.tips.models.ON_KRYBOARD,this,this.getNum);
			tips.models.TipsProxy.getInstance().off(RedPacketSendMediator.NUMBER_OVER_RANK,this,this.send_over_msg);
			this._viewUI.close_btn.off(LEvent.MOUSE_UP,this,this.close_hide);
		}
		/**
		 * 前往去充值
		 */
		private goToPutMoney():void{
			//商城充值入口
			ModuleManager.jumpPage(ModuleNames.SHOP,shopMediatorType.CHONGZHI,this._app);
		}
		/**
         * 显示tipsUI
         */
        private onSHowTipsUI():void{
            var param = new Laya.Dictionary();
            param.set("title",11490);
            switch(this.curr_type){
                case RedPackType.TYPE_WORLD:
                    param.set("contentId",11487);
                    break;
                case RedPackType.TYPE_CLAN:
                    param.set("contentId",11488);
                    break;
                case RedPackType.TYPE_TEAM:
                    param.set("contentId",11489);
                    break;
            }            
            if( !this._tipsModule ){
                this._tipsModule = new tips.tipsModule(this._viewUI,this._app,TIPS_TYPE.CLIENTMESSAGE,param,true);
            }
            else{
                this.onTipsHide();
                this._tipsModule = new tips.tipsModule(this._viewUI,this._app,TIPS_TYPE.CLIENTMESSAGE,param,true);
            }
			this._viewUI.hideBg_img.mouseThrough = false;
        }
		/**
         * 关闭tips说明型提示弹窗
         */
        private onTipsHide():void{
            if(this._tipsModule){
                this._tipsModule.hide();
            }
            this._viewUI.hideBg_img.mouseThrough = true;
        }
		/**
		 * 置空文本区域内容
		 */
		private setText():void{
			this._viewUI.hongBaoJiYu_input.text = "";
		}
		/**
		 * @describe 发送输入数值超出范围提示信息
		 */
		private send_over_msg():void{
			var msg = chat.models.ChatModel._instance.chatMessageTips[160044].msg;
            this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
			this._disappearMessageTipsMediator.onShow(msg);
		}
		private show_confirmUI():void{
			if(this._viewUI.hongBaoMoney_lab.color == "#ff0400"){
				var param =new Laya.Dictionary();
				param.set("contentId",150506);//提示仙晶（元宝）不足，请前往充值
				this._tipsModule = new game.modules.tips.tipsModule(this._viewUI,this._app,TIPS_TYPE.CLIENT_TIPS_MESSAGE,param);
			}
			else{
				this._redConfirmMediator.show_UI(this.curr_type,this._viewUI.hongBaoMoney_lab.text,this._viewUI.hongBaoNumber_lab.text,this._viewUI.hongBaoJiYu_input.text);
				this.hide();
			}
		}
		private numberUp():void{
			var curr_text_num:number = Number(this._viewUI.hongBaoNumber_lab.text);
			if(curr_text_num +1> this.packmax){
				this._viewUI.hongBaoNumber_lab.changeText(this.packmax.toString());
				this._viewUI.hongBaoNumberUp_btn.event(RedPacketSendMediator.NUMBER_OVER_RANK);
				return;
			}
			this._viewUI.hongBaoNumber_lab.changeText(String(curr_text_num + 1));
		}
		private numberDown():void{
			var curr_text_num:number = Number(this._viewUI.hongBaoNumber_lab.text);
			if(curr_text_num -1 < this.packmin){
				this._viewUI.hongBaoNumber_lab.changeText(this.packmin.toString());
				this._viewUI.hongBaoMoneyDown_btn.event(RedPacketSendMediator.NUMBER_OVER_RANK);
				return;
			}
			this._viewUI.hongBaoNumber_lab.changeText(String(curr_text_num - 1));
		}
		private moneyUp():void{
			var curr_text_num:number = Number(this._viewUI.hongBaoMoney_lab.text);
			if(curr_text_num +1 > this.fishimax){
				this._viewUI.hongBaoMoney_lab.changeText(this.fishimax.toString());
				this._viewUI.hongBaoMoneyUp_btn.event(RedPacketSendMediator.NUMBER_OVER_RANK);
				return;
			}
			this._viewUI.hongBaoMoney_lab.changeText(String(curr_text_num + 1));
			this.onJudgeNumber(this._viewUI.hongBaoMoney_lab,curr_text_num +1);
		}
		private moneyDown():void{
			var curr_text_num:number = Number(this._viewUI.hongBaoMoney_lab.text);
			if(curr_text_num -1 < this.fushimin){
				this._viewUI.hongBaoMoney_lab.changeText(this.fushimin.toString());
				this._viewUI.hongBaoNumberDown_btn.event(RedPacketSendMediator.NUMBER_OVER_RANK);
				return;
			}
			this._viewUI.hongBaoMoney_lab.changeText(String(curr_text_num - 1));
			this.onJudgeNumber(this._viewUI.hongBaoMoney_lab,curr_text_num -1);
		}
		private _init_label():void{
			this.show_label(this.curr_type);
			var hongbaoname:string = this.configure_Vo.name;
            var fushimin:number = this.configure_Vo.fushimin;
            var fishimax:number = this.configure_Vo.fishimax;
            var packmin:number = this.configure_Vo.packmin;
            var packmax:number = this.configure_Vo.packmax;
			var _box:Laya.Box = this._viewUI.envelope_box as Laya.Box;
			this._viewUI.hongBaoName_lab.text = hongbaoname;
			var fushimin_lable : Laya.Label = _box.getChildByName("fushimin_lable") as Laya.Label;
			var fishimax_label : Laya.Label = _box.getChildByName("fishimax_label") as Laya.Label;
			fushimin_lable.text = '最小金额为'+fushimin;
			fishimax_label.text = '最小金额为'+fishimax;
			this._viewUI.hongBaoMoney_lab.text = fushimin.toString();
			this._viewUI.hongBaoNumber_lab.text = packmin.toString();
			this.onJudgeNumber(this._viewUI.hongBaoMoney_lab,fushimin);
			console.log("---------------给文本添加监听事件------------------------------");
			this._viewUI.hongBaoMoney_lab.on(LEvent.CLICK,this,this.updaeLabel,[fushimin,704]);
			this._viewUI.hongBaoNumber_lab.on(LEvent.CLICK,this,this.updaeLabel,[packmin,884]);
		}
		private updaeLabel(text:number,posY:number):void{
			console.log("-------------------------------------文本被点击，出现小键盘！-----------------------------");			
			switch(text){
				case this.fushimin:
					this._min = this.fushimin;
					this._max = this.fishimax;
					this.curr_label = this._viewUI.hongBaoMoney_lab;
					break;
				case this.packmin:
					this._min = this.packmin;
					this._max = this.packmax;
					this.curr_label = this._viewUI.hongBaoNumber_lab;
					break;
			}
			this.curr_text = "0";
			var tempNum = this._max;
			this._maxLength = 0;
			do{
				tempNum = Math.floor(tempNum / 10);
				this._maxLength ++;
			}while(tempNum > 0)			
			let _XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
            _XiaoJianPanMediator.show(0,posY,this._viewUI);
		}
		/**
         * 接收小键盘点击的按钮
         * @param num 
         */
        public getNum(num){
			if(!this.curr_text) return;
            if(num == -2){  //点击了ok
				if(this.curr_text.length <= 1){
					this.curr_label.text = this._min + "";
                    this.curr_text = this._min + "";
					//game.modules.tips.models.TipsProxy.getInstance().event(RedPacketSendMediator.NUMBER_OVER_RANK);
                }
            }    
            if(num == -1){  //点击了删除
                this.curr_text = this.curr_text.substring(0,this.curr_text.length -1);
				if(this.curr_text.length <= 0){
                    this.curr_text = "0";
                }
				this.onJudgeNumber(this.curr_label,Number(this.curr_text));
            }
            if(num >= 0){
                var oneChar = this.curr_text.charAt(0);  
                if(oneChar != '0'){
                    this.curr_text += num;
					if(Number(this.curr_text) > this._max){
						this.curr_text = this._max.toString();
						game.modules.tips.models.TipsProxy.getInstance().event(RedPacketSendMediator.NUMBER_OVER_RANK);
					}
                }else{
                    this.curr_text = num + "" ;
                }
            }
			if(this.curr_text.length <= this._maxLength ){
				this.curr_label.text = "";
                this.curr_label.text = this.curr_text;
            }
			else if(this.curr_text.length == undefined){
				this.curr_label.text = this._min + "";
                this.curr_text = this._min + "";
			}
			else{
				this.curr_label.text = this._max + "";
                this.curr_text = this._max + "";
				game.modules.tips.models.TipsProxy.getInstance().event(RedPacketSendMediator.NUMBER_OVER_RANK);
            }
			this.onJudgeNumber(this.curr_label,Number(this.curr_text));
        }
		
		private show_label(type:number):void{
			switch(type){
				case RedPackType.TYPE_WORLD:
                    this._viewUI.world_label.visible = true;
                    this._viewUI.faction_label.visible = false;
                    this._viewUI.team_label.visible = false;
                    break;
                case RedPackType.TYPE_CLAN:
                    this._viewUI.world_label.visible = false;
                    this._viewUI.faction_label.visible = true;
                    this._viewUI.team_label.visible = false;
                    break;
                case RedPackType.TYPE_TEAM:
                    this._viewUI.world_label.visible = false;
                    this._viewUI.faction_label.visible = false;
                    this._viewUI.team_label.visible = true;
                    break;
			}
		}
		private close_hide():void{
			this._redPacketMediator = new RedPacketMediator(this._app);
			this._redPacketMediator.show(this.curr_type)
			this.hide();
		}

        public hide():void {
			this.onTipsHide();
			this.removeEvent();
			super.hide();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}
    }
			
}