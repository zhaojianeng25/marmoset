
import LoginModel = game.modules.createrole.models.LoginModel;
module game.modules.createrole {
	/** 登陆账号界面 */
	export class LoginViewMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.LoginUI;
		/** 服务器选择界面 */
		private _serverSelectMediator: ServerSelectMediator;
		/** 判断是否已经是第一次到达登录界面 */
		private _flag: boolean;
		/** 临时存放历史账号的数组 */
		private _tempHisAccount: any;
		/** 临时存放历史账号密码的数组 */
		private _tempHisPassword: any;
		/** 最近一次登陆过的账号 */
		private lastAccount: any;

		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.LoginUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			//this.isCenter = true;
		}

		private enterLogin(e: any): void {
			if (this.lastAccount && this.lastAccount != this._viewUI.account_txt.text) {
				LoginModel.getInstance().isAccountChanged = true;
			}
			LoginModel.getInstance().userLoginAccount = this._viewUI.account_txt.text;
			LoginModel.getInstance().userLoginPassword = this._viewUI.password_txt.text;
			let _ip = models.LoginModel.getInstance().currServer.ip;
			if (!_ip) {
				this._serverSelectMediator = new ServerSelectMediator(this._app);
				this._serverSelectMediator.show();
			}
			else {
				this._flag = true;
			}
			//如果是从选择服务器界面中切换账号跳转到此界面，就需要如下判断
			if (this._flag) {
				this._serverSelectMediator = new ServerSelectMediator(this._app);
				this._serverSelectMediator.show();
			}

			this.judgeHisAccount();

			LocalStorage.setItem("daowang_userLoginAccount", this._viewUI.account_txt.text);
			LocalStorage.setItem("daowang_userLoginAccountPassword", this._viewUI.password_txt.text);

			//let userRoleId:number = parseInt(LocalStorage.getItem("daowang_userRoleId" + this._viewUI.account_txt.text));

			//RequesterProtocols._instance.c2s_login(this._viewUI.account_txt.text, this._viewUI.password_txt.text);//登录

			this.lastAccount = this._viewUI.account_txt.text;

			this.hide();
		}

		/**
		 * 判断历史账号
		 */
		private judgeHisAccount(): void {
			//获取有几个账号登陆过的计数
			let countAccount: string = LocalStorage.getItem("countAccount");
			var _count: number;
			//如果该计数有值或者不为空或者不为零
			if (countAccount && countAccount != "" && countAccount != "0") {
				//就将计数number化
				_count = Number(countAccount);
			}
			else {//没有，就重新写一个计数值到本地存储
				LocalStorage.setItem("countAccount", "1");
				//保存账号和密码到本地存储里
				LocalStorage.setItem("hisAccount" + 1, this._viewUI.account_txt.text);
				LocalStorage.setItem("hisPassword" + 1, this._viewUI.password_txt.text);
				return;
			}
			//如果当前账号与本地存储里的历史账号相同，则返回
			for (let i = 1; i < _count + 1; i++) {
				let _hisAccount: string = LocalStorage.getItem("hisAccount" + i);
				if (_hisAccount == this._viewUI.account_txt.text) return;
			}
			if (countAccount && countAccount != "" && countAccount != "0") {
				//在原有记录过有几个账号登陆过的计数上加一
				_count += 1;
				LocalStorage.setItem("countAccount", _count + "");
				LocalStorage.setItem("hisAccount" + _count, this._viewUI.account_txt.text);
				LocalStorage.setItem("hisPassword" + _count, this._viewUI.password_txt.text);
			}
			//如果超过十个记录数，则本地删除最旧的那个账号
			if (_count > 10) {
				for (let i = 1; i < _count; i++) {//进行数据的覆盖,达到删除最旧的那个账号
					LocalStorage.setItem("hisAccount" + i, LocalStorage.getItem("hisAccount" + (i + 1)));
					LocalStorage.setItem("hisPassword" + i, LocalStorage.getItem("hisPassword" + (i + 1)));
				}
				//本地移除最后一个记录数的账号
				LocalStorage.removeItem("hisAccount" + _count);
				LocalStorage.removeItem("hisPassword" + _count);
				//将记录数减一，一并存储到本地
				_count -= 1;
				LocalStorage.setItem("countAccount", _count + "");
			}
		}
		public show(): void {
			super.show();
			//console.log("LoginViewMediator show");
			//this.layout();

			let userAccount: string = LocalStorage.getItem("daowang_userLoginAccount");
			let userAccountpassword: string = LocalStorage.getItem("daowang_userLoginAccountPassword");
			let userRoleId: string = LocalStorage.getItem("daowang_userRoleId");

			if (userAccount && userAccount != "") {
				this._viewUI.account_txt.text = userAccount;
			}
			if (userAccountpassword && userAccountpassword != "") {
				this._viewUI.password_txt.text = userAccountpassword;
			}
			console.log("userAccount userAccountpassword userRoleId", userAccount, userAccountpassword, userRoleId);
			this.registerEvent();
			this.initHisAccount();
		}
		////////////////
		///事件
		////////////////
        /**注册事件
         * @describe  UI的事件监听注册与消息监听注册
         */
		private registerEvent(): void {
			//按钮事件
			this._viewUI.enter_btn.on(LEvent.MOUSE_DOWN, this, this.enterLogin);
			this._viewUI.selectAccount_btn.on(LEvent.CLICK, this, this.showHisAccountLst);
			//消息事件
			models.LoginProxy.getInstance().on(models.LOGIN_EVENT, this, this.onHide);
			models.LoginProxy.getInstance().on(models.PRELOAD_END, this, this.onHide);
			//图片
			this._viewUI.hideBg_img.on(LEvent.CLICK, this, this.onHideLst);
		}
		/**
		 * 隐藏历史账号列表
		 */
		private onHideLst(): void {
			if (this._viewUI.hisAccout_lst.visible) {
				this._viewUI.hisAccout_lst.visible = false;
				this._viewUI.hideBg_img.mouseThrough = true;
			}
		}
		/**
		 * 隐藏该界面
		 */
		private onHide(): void {
			if (this) {
				this.hide();
			}
		}
		/**
		 * 显示历史账号列表
		 */
		private showHisAccountLst(): void {
			//获取有几个账号登陆过的计数
			let countAccount: string = LocalStorage.getItem("countAccount");
			//如果该计数有值或者不为空
			if (countAccount && countAccount != "" && countAccount != "0") {
				//就显示历史账号列表
				this._viewUI.hisAccout_lst.visible = true;
				this._viewUI.hideBg_img.mouseThrough = false;
			}

		}
		/**
		 * 初始化历史账号
		 */
		private initHisAccount(): void {
			//获取有几个账号登陆过的计数
			let countAccount: string = LocalStorage.getItem("countAccount");
			var _count: number;
			//如果该计数有值或者不为空
			if (countAccount && countAccount != "" && countAccount != "0") {
				//就将该计数number化
				_count = Number(countAccount);
			}
			else {//否则就返回
				return;
			}
			//获取有效的账号计数后，把个个历史账号放入临时数组
			//将最新的账号放在数组的第一个，最旧的那个账号放到数组最后一个
			//密码同理
			this._tempHisAccount = [];
			this._tempHisPassword = [];
			for (let i = _count; i > 0; i--) {
				this._tempHisAccount.push(LocalStorage.getItem("hisAccount" + i));
				this._tempHisPassword.push(LocalStorage.getItem("hisPassword" + i));
			}
			//临时数组存放完历史账号数据后，初始化历史账号列表
			this._viewUI.hisAccout_lst.array = this._tempHisAccount;
			if (_count >= 4) {
				this._viewUI.hisAccout_lst.repeatY = 4;
			}
			else {
				this._viewUI.hisAccout_lst.repeatY = _count;
			}
			this._viewUI.hisAccout_lst.vScrollBarSkin = "";
			this._viewUI.hisAccout_lst.renderHandler = new Handler(this, this.onHisAccountLst);
		}
		/**
		 * 渲染历史账号列表的单元格
		 */
		private onHisAccountLst(cell: Box, index: number): void {
			if (index < 0 || index >= this._tempHisAccount.length) return;
			var account_lab: Laya.Label = cell.getChildByName("account_lab") as Laya.Label;
			var labBg_img: Laya.Image = cell.getChildByName("labBg_img") as Laya.Image;
			var delete_btn: Laya.Button = cell.getChildByName("delete_btn") as Laya.Button;
			account_lab.text = this._tempHisAccount[index];
			labBg_img.on(LEvent.CLICK, this, this.replaceAccount, [index]);
			delete_btn.on(LEvent.CLICK, this, this.deleteHisAccount, [index]);
		}
		/**
		 * 把所选择的历史账号替换到当前显示账号
		 */
		private replaceAccount(index: number): void {
			var _tempAccount = this._tempHisAccount[index];
			var _tempPassword = this._tempHisPassword[index];
			//隐藏历史账号列表
			this.onHideLst();
			//本地存储要做调整，替换之前显示的当前账号变为最新的历史账号，其它历史账号依次调整
			for (let i = index; i > 0; i--) {
				if (this._tempHisAccount[i - 1]) {
					this._tempHisAccount[i] = this._tempHisAccount[i - 1];
					this._tempHisPassword[i] = this._tempHisPassword[i - 1];
				}
			}
			this._tempHisAccount[0] = _tempAccount;
			this._tempHisPassword[0] = _tempPassword;
			var _count = Number(LocalStorage.getItem("countAccount"));
			//根据调整后的临时数组，重新写入本地存储
			for (let i = 0; i < this._tempHisAccount.length; i++) {
				LocalStorage.setItem("hisAccount" + _count, this._tempHisAccount[i]);
				LocalStorage.setItem("hisPassword" + _count, this._tempHisPassword[i]);
				_count--;
			}
			//UI上重新显示所选择的账号密码(防止引用传递带来错误)
			this.showSelected(_tempAccount, _tempPassword);
			//重新初始化
			this.initHisAccount();
		}
		/**
		 * 显示所选择的账号密码
		 */
		private showSelected(_tempAccount: any, _tempPassword: any): void {
			this._viewUI.account_txt.text = _tempAccount;
			this._viewUI.password_txt.text = _tempPassword;
		}
		/**
		 * 删除历史账号
		 */
		private deleteHisAccount(index: number): void {
			//被删除的账号，对其相应下标的数组数据重新赋值后一位的值
			//数值覆盖，达到删除的效果
			//数组存放数据的次序与本地存储次序相对应
			for (let i = index; i < this._tempHisAccount.length; i++) {
				this._tempHisAccount[i] = this.getNextValue(this._tempHisAccount[i + 1]);
				this._tempHisPassword[i] = this.getNextValue(this._tempHisPassword[i + 1]);
			}
			//然后数组中最后一位出栈
			this._tempHisAccount.pop();
			this._tempHisPassword.pop();
			var _count = Number(LocalStorage.getItem("countAccount"));
			//删除最后一位的数据
			LocalStorage.removeItem("hisAccount" + _count);
			LocalStorage.removeItem("hisPassword" + _count);
			_count--;
			LocalStorage.setItem("countAccount", _count + "");
			if (_count == 0) {
				this.onHideLst();
				return;
			}
			//根据调整后的临时数组，重新写入本地存储
			for (let i = 0; i < this._tempHisAccount.length; i++) {
				LocalStorage.setItem("hisAccount" + _count, this._tempHisAccount[i]);
				LocalStorage.setItem("hisPassword" + _count, this._tempHisPassword[i]);
				_count--;
			}
			//重新初始化
			this.initHisAccount();
		}
		/**
		 * 获取数组中下一个的值
		 */
		private getNextValue(value: any): any {
			if (!value) return null;
			return value;
		}
		public hide(): void {
			super.hide();
		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}