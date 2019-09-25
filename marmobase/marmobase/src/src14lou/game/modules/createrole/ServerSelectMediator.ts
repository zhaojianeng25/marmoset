/**
 * 选择登录的服务器
 */
module game.modules.createrole {
    export class ServerSelectMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.LoginServerSelectUI;
        /** 登录界面 */
        private _loginViewMediator: game.modules.createrole.LoginViewMediator;
        /** 飘窗 */
        private _disappearMessageTipsMediator: DisappearMessageTipsMediator;
        /** 加载背景 */
        private _changJingChangeMediator: commonUI.ChangJingChangeMediator;
        /** 服务器选择中列表的配置信息 */
        private serverConfig: any;
        /** 当前所选择的大区所有服务器数据 */
        private currListData: any;
        /** 指向最后被选中服务器背景图的索引 */
        private lastSelect: Laya.Image;
        /** 指向确定连接服务器背景图的索引 */
        private currServerBg: Laya.Image;
        /** 临时存放被选中的服务器对象 */
        private tempServer: any;
        /** 判断是否有更改账号 */
        private isChangeAccount: boolean = false;
        /** 判断是否登录失败 */
        private isLogin: boolean = false;
        /** 判断点击进入按钮是否被点击 */
        private isClicked: boolean = false;

        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.LoginServerSelectUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
            //this.isCenter = true;

            this.serverConfig = models.LoginModel.getInstance().ServerConfig;
            models.LoginProxy.getInstance().on(models.LOGIN_EVENT2, this, this.onEnter);
        }

        /**
         * 界面初始化
         */
        private _init_UI(type: number, btn?: Laya.Button): void {
            if (!btn) {
                //服务器列表数据初始化
                this.serverDataInit(type);
                //当前服务器UI初始化
                this.currServerUI_init();
            }
            //服务器列表初始化
            this._serverListInit(type);
        }
        /**
         * 服务器列表数据初始化
         * @describe 把玩家最近登录过的服务器放到服务器列表数据的第一个
         */
        private serverDataInit(type: number): void {
            var isSelectIndex = LocalStorage.getItem("user_recentLoginServerIndex");
            var _judge = setBasics.models.SetBasicsModel._instance._isRrturnLoginflag;
            if (_judge) return;
            if (Object.keys(this.serverConfig).length == 0) {
                console.log("读取服务器json文件失败，请检查json是否正确书写或者读取方式是否又出错");
                return;
            }
            if (this.isLogin) {
                this.isLogin = false;
                return;
            }
            if (isSelectIndex && isSelectIndex != null) {
                var _tempData: any;
                _tempData = this.serverConfig["" + type][0];
                let _currServer = models.LoginModel.getInstance().currServer;//若排序过就不再排序
                if (_currServer == _tempData) return;
                this.serverConfig["" + type][0] = this.serverConfig["" + type][isSelectIndex];
                this.serverConfig["" + type][isSelectIndex] = _tempData;
            }
        }
        /**
         * 当前服务器UI初始化
         */
        private currServerUI_init(): void {
            let _ip = models.LoginModel.getInstance().currServer.ip;
            if (!_ip) {
                var currSelectIndex = LocalStorage.getItem("user_recentLoginServerIndex");
                if (currSelectIndex != null && currSelectIndex) {//如果有值，也间接表示服务器列表数据次序已经重新初始化，0，也就是第一位就是要显示的最近一次所登陆过的服务器
                    this._viewUI.currServer_box.visible = true;
                    this._viewUI.Server_imag.visible = false;
                    this._viewUI.serverName_lab.text = this.serverConfig["" + ServerAarea.ORDINARY][0]["name"];
                    models.LoginModel.getInstance().currServer = this.serverConfig["" + ServerAarea.ORDINARY][0];
                    // this.showStateImag(this.serverConfig["" + ServerAarea.ORDINARY][0]["serverstate"], this._viewUI.isSelect_img);
                    ////////////////断开临时连接服务器////////////////////////
                    // Network._instance.cleanSocket();
                    Browser.window.server = this.serverConfig["" + ServerAarea.ORDINARY][0]["ip"];
                    ////////////////重新最近一次连接服务器///////////////////////
                    // Network._instance.connectByUrl(Browser.window.server);
                    // console.log("-----------------------------------------Browser.window.server是：", Browser.window.server);
                    if (this.lastSelect) {
                        this.currServerBg = this.lastSelect;
                    }
                }
                else {
                    this._viewUI.currServer_box.visible = true;
                    this._viewUI.Server_imag.visible = false;
                    this._viewUI.isSelect_img.skin = "common/ui/createrole/server.png";
                }
            }
            else {
                this._viewUI.serverName_lab.text = models.LoginModel.getInstance().currServer.name;
                this.showStateImag(models.LoginModel.getInstance().currServer.serverstate, this._viewUI.isSelect_img);
            }
        }
        /**
         * 服务器列表初始化
         */
        private _serverListInit(type: number): void {
            this.currListData = this.serverConfig["" + type];
            var dataSize: number;
            dataSize = Object.keys(this.serverConfig["" + type]).length;
            this._viewUI.server_list.array = this.serverConfig["" + type];
            this._viewUI.server_list.repeatX = 1;
            this._viewUI.server_list.repeatY = dataSize;
            if (this._viewUI.server_list.array.length <= 8) {
                this._viewUI.server_list.repeatY = 8;
            }
            this._viewUI.server_list.vScrollBarSkin = '';
            this._viewUI.server_list.scrollBar.elasticBackTime = 200;
            this._viewUI.server_list.scrollBar.elasticDistance = 100;
            this._viewUI.server_list.renderHandler = new Laya.Handler(this, this.onListRender);
            this._viewUI.server_list.selectHandler = new Laya.Handler(this, this.onselectRender);
        }
        /**
         * 服务器被选中响应渲染
         * @param index 
         */
        private onselectRender(index: number): void {
            if (index != -1) {
                this.tempServer = this.currListData[index];
            }
            var serverBg_img: Laya.Image = this._viewUI.server_list.getCell(index).getChildByName("serverBg_img") as Laya.Image;
            serverBg_img.skin = "common/ui/createrole/common_list_3textbg2.png";
            if (this.lastSelect) {
                this.lastSelect.skin = "common/ui/createrole/common_list_3textbg.png";
            }
            this.lastSelect = serverBg_img;
        }
        /**
         * 服务器列表数据渲染
         * @param cell 
         * @param index 
         */
        private onListRender(cell: Box, index: number): void {
            if (index < 0 || index >= this._viewUI.server_list.array.length) {
                return;
            }
            var serverBg_img: Laya.Image = cell.getChildByName("serverBg_img") as Laya.Image;
            serverBg_img.skin = "common/ui/createrole/common_list_3textbg.png";
            if (this.lastSelect == serverBg_img) {
                this.lastSelect.skin = "common/ui/createrole/common_list_3textbg2.png";
            }
            var serverName_lab: Laya.Label = cell.getChildByName("serverName_lab") as Laya.Label;
            var serverInfo_lab: Laya.Label = cell.getChildByName("serverInfo_lab") as Laya.Label;
            var mark_img: Laya.Image = cell.getChildByName("mark_img") as Laya.Image;
            serverName_lab.text = this.currListData[index]["name"];
            serverInfo_lab.text = this.currListData[index]["info"];
            var light_img: Laya.Image = this._viewUI.server_list.getCell(index).getChildByName("light_img") as Laya.Image;
            this.showStateImag(this.currListData[index]["serverstate"], light_img);
            if (this.currListData[index]["isNew"]) {
                mark_img.visible = true;
            }
            else {
                mark_img.visible = false;
            }
        }
        /**
         * 根据服务器的状态进行显示不同状态图片
         */
        private showStateImag(type: number, img: Laya.Image): void {
            switch (type) {
                case ServerState.BUSY:
                    img.skin = "common/ui/createrole/red.png";
                    break;
                case ServerState.GOOD:
                    img.skin = "common/ui/createrole/yello.png";
                    break;
                case ServerState.EXCELLENT:
                    img.skin = "common/ui/createrole/green.png";
                    break;
                case ServerState.MAINTAIN:
                    img.skin = "common/ui/createrole/server.png";
                    break;
            }
        }
        /**
         * 移除场景
         */
        private removeScene(): void {
            // this._sceneObjMgr = this._app.sceneObjectMgr;
            var _mapInfo = this._app.sceneObjectMgr.mapInfo
            var _mainUnit: Unit = this._app.sceneObjectMgr.mainUnit
            //释放旧的地图对象
            if (_mapInfo) {
                this._app.sceneObjectMgr.ReleaseObject(_mapInfo);
            }
            //释放主玩家unit
            if (_mainUnit) {
                this._app.sceneObjectMgr.ReleaseObject(_mainUnit);
            }
        }
        public show(): void {
            if (models.LoginModel.getInstance().isBreakLink) {
                models.LoginModel.getInstance().isBreakLink = false;
                return;
            }
            this.registerEvent();
            this._init_UI(ServerAarea.ORDINARY);
            super.show();
        }
        /**
         * 注册事件
         */
        private registerEvent(): void {
            //按钮点击事件监听
            this._viewUI.recommend_btn.on(LEvent.CLICK, this, this._init_UI, [ServerAarea.RECOMMEND, this._viewUI.recommend_btn]);
            this._viewUI.currently_btn.on(LEvent.CLICK, this, this._init_UI, [ServerAarea.ORDINARY, this._viewUI.currently_btn]);
            this._viewUI.close_btn.on(LEvent.MOUSE_UP, this, this.onReturn);
            this._viewUI.confirm_btn.on(LEvent.CLICK, this, this.onConfirm);
            this._viewUI.return_btn.on(LEvent.CLICK, this, this.onReturn);
            this._viewUI.enter_btn.on(LEvent.CLICK, this, this.enterBtnClicked);
            //图片点击事件监听
            this._viewUI.selectServer_img.on(LEvent.CLICK, this, this.onSelectServer);
            this._viewUI.change_img.on(LEvent.CLICK, this, this.onChange);
            //消息监听事件
            models.LoginProxy.getInstance().on(models.ERROR_INFO, this, this.errorLogin);
            models.LoginProxy.getInstance().on(models.BE_IN_CONNECTION_STATE, this, this.changeCurrServerStateImg);
            models.LoginProxy.getInstance().on(models.BE_IN_NOT_CONNECTION_STATE, this, this.showTipsMsg);
            //setBasics.models.SetBasicsProxy.getInstance().on(setBasics.models.TYPE_RETURN_LOGIN_EVENT,this,this.removeScene);
        }
        /** 点击进入按钮被点击 */
        private enterBtnClicked():void{
            this.isClicked = true;
            this.reConnectUrl();
        }
        /** 更改当前显示服务器状态的图片 */
        private changeCurrServerStateImg(): void {
            this.showStateImag(models.LoginModel.getInstance().currServer.serverstate, this._viewUI.isSelect_img);
            this.closeTimer();
            if(this.isClicked){
                Laya.timer.once(1000, this, this.onEnter);
                this.isClicked = false;
            }
        }
        /** 关闭定时器 */
        private closeTimer(): void {
            Laya.timer.clear(this, this.reConnectUrl);
        }
        /** 显示提示飘窗 */
        private showTipsMsg(): void {
            this._viewUI.isSelect_img.skin = "common/ui/createrole/server.png";
            let _tipsMsg = ChatModel.getInstance().chatMessageTips[420045]["msg"];
            this.show_Msg(_tipsMsg);
            this.openTimer();
            this.isClicked = false;
        }
        /** 开启一次性延时定时器(延迟15秒) */
        private openTimer(): void {
            Laya.timer.once(15000, this, this.reConnectUrl);
        }
        /** 重新连接服务器 */
        private reConnectUrl(): void {
            Network._instance.connectByUrl(Browser.window.server);
        }
        /**
         * 登陆错误
         */
        private errorLogin(): void {
            var msg = "<span style='color:#f6f6f4;fontSize:24'>登陆失败（失败原因未知，暂以此替代！）</span>";
            this.show_Msg(msg);
            this.isLogin = true;
            this.show();
        }
        /**
         * 切换账号
         */
        private onChange(): void {
            this._loginViewMediator = new LoginViewMediator(this._app);
            this._loginViewMediator.show();
            this.hide();
        }
        /**
         * 进入游戏
         */
        private onEnter(): void {
            let _linkState = LoginModel.getInstance().linkServerState;
            if (_linkState == LinkState.CLOSE || _linkState == LinkState.ERROR || _linkState == undefined) {
                this.showTipsMsg();
                return;
            }
            this.isChangeAccount = models.LoginModel.getInstance().isAccountChanged;
            //var _judgeFlag = setBasics.models.SetBasicsModel._instance._isRrturnLoginflag;
            if (this._viewUI.isSelect_img.skin == "common/ui/createrole/red.png") {//如果服务器爆满，弹出提示窗口
                this.show_Msg(chat.models.ChatModel._instance.chatMessageTips[190065].msg);
            }
            else if (this._viewUI.isSelect_img.skin == "common/ui/createrole/server.png") {//如果服务处于维护状态
                this.show_Msg(chat.models.ChatModel._instance.chatMessageTips[144483].msg);
            }
            else {
                RequesterProtocols._instance.c2s_login(LoginModel.getInstance().userLoginAccount, LoginModel.getInstance().userLoginPassword);//登录
                this.isChangeAccount = false;
                this.hide();
            }

        }
        /**
         * 弹出消息气泡飘窗
         */
        private show_Msg(msg: any): void {
            this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
            this._disappearMessageTipsMediator.onShow(msg);
        }
        /**
         * 选择服务器界面UI出现
         */
        private onSelectServer(): void {
            this.closeTimer();
            this._viewUI.Server_imag.visible = true;
            this._viewUI.currServer_box.visible = false;
        }
        /**
         * 确定选择服务器
         */
        private onConfirm(): void {
            if (this.tempServer) {
                models.LoginModel.getInstance().currServer = this.tempServer;
                LocalStorage.setItem("user_recentLoginServerIndex", this.tempServer["index"]);
                let _linkState = LoginModel.getInstance().linkServerState;
                if (_linkState == LinkState.OPEN) {
                    ////////////////断开连接服务器////////////////////////
                    Network._instance.cleanSocket();
                }
                Browser.window.server = this.tempServer.ip;
                ////////////////重新连接服务器///////////////////////
                Network._instance.connectByUrl(Browser.window.server);
                this.currServerBg = this.lastSelect;
            }
            this.currServerUI_init();
            this._viewUI.Server_imag.visible = false;
            this._viewUI.currServer_box.visible = true;
        }
        /**
         * 返回前一个界面
         */
        private onReturn(): void {
            let _linkState = LoginModel.getInstance().linkServerState;
            if (_linkState == LinkState.CLOSE || _linkState == LinkState.ERROR || _linkState == undefined) {
                this.openTimer();
            }
            this.currServerUI_init();
            if (this.lastSelect) {
                // this.lastSelect.scaleX = 1;
                // this.lastSelect.scaleY = 1;
                // this.currServerBg.scaleX = 0.95;
                // this.currServerBg.scaleY = 0.95;
                this.lastSelect = this.currServerBg;
            }
            this._viewUI.Server_imag.visible = false;
            this._viewUI.currServer_box.visible = true;
        }

        public hide(): void {
            super.hide();
            models.LoginProxy.getInstance().off(models.BE_IN_CONNECTION_STATE, this, this.changeCurrServerStateImg);
            models.LoginProxy.getInstance().off(models.BE_IN_NOT_CONNECTION_STATE, this, this.showTipsMsg);
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}