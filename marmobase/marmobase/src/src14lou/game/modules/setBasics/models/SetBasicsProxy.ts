module game.modules.setBasics.models {
    /** 设置道具安全锁密码成功事件 */
    export const SET_PASSWORD_SUCCESS_EVENT: string = "setPasswordSuccess";
    /** 设置道具安全锁密码成功事件 */
    export const RESET_PASSWORD_SUCCESS_EVENT: string = "resetPasswordSuccess";
    /** 设置道具安全锁密码成功事件 */
    export const DEL_PASSWORD_SUCCESS_EVENT: string = "delPasswordSuccess";
    /** 开启道具安全锁事件 */
    export const OPEN_GOOD_LOCKS_EVENT: string = "openGoodLocks";
    /** 开启道具安全锁事件 */
    export const CLOSE_GOOD_LOCKS_EVENT: string = "closeGoodLocks";
    /** 开启道具安全锁失败事件 */
    export const OPEN_GOOD_LOCKS_FAIL_EVENT: string = "openGoodLocksfail";
    /** 开启道具安全锁失败事件 */
    export const CLOSE_GOOD_LOCKS_FAIL_EVENT: string = "closeGoodLocksfail";
    /** 获取到道具安全锁信息 */
    export const GET_GOOD_LOCK_INFO: string = "getGoodLockInfo";
    /** 主动下线，退出游戏事件 */
    export const TYPE_OFFLINE_EVENT: string = "offLine";
    /** 被动断线事件 */
    export const TYPE_LINK_BROKEN_EVENT: string = "lineBroken";
    /** 被动断线窗口返回服务器列表事件 */
    export const TYPE_LINK_BROKEN_BACK_EVENT: string = "lineBrokenBack";
    /** 返回人物选择界面事件 */
    export const TYPE_CHOSEE_ROLE_EVENT: string = "choseeRole";
    /** 返回登录界面事件 */
    export const TYPE_RETURN_LOGIN_EVENT: string = "returnLogin";
    /** 收到最新系统设置的信息事件 */
    export const GET_SYSCONFIG_INFO_EVENT: string = "getSysConfigInfo";
    /** 收到重新设置的最新系统设置的信息事件 */
    export const GET_RESET_SYSCONFIG_INFO_EVENT: string = "getResetSysConfigInfo";
    /** 得到设置自动进入副本选项成功消息 */
    export const GET_SetLineConfig: string = "getSetLineConfig";

    export class SetBasicsProxy extends hanlder.ProxyBase {
        /**  */
        private useapp: any;
        constructor() {
            super();
            SetBasicsProxy._instance = this;
            this.init();
        }
        private static _instance: SetBasicsProxy;
        public static getInstance(): SetBasicsProxy {
            if (!this._instance) {
                this._instance = new SetBasicsProxy();
            }
            return this._instance;
        }
        public init(app?: AppBase): void {
            if (app) {
                this.useapp = app;
            }
            SetBasicsModel.getInstance();
            this.addNetworkListener();
        }
        /**
		 * 添加监听
		 */
        private addNetworkListener(): void {
            Network._instance.addHanlder(ProtocolsEnum.SSetPassword, this, this.getSSetPassword);
            Network._instance.addHanlder(ProtocolsEnum.SResetPassword, this, this.getSResetPassword);
            Network._instance.addHanlder(ProtocolsEnum.SDelPassword, this, this.getSDelPassword);
            Network._instance.addHanlder(ProtocolsEnum.SOpenGoodLocks, this, this.getSOpenGoodLocks);
            Network._instance.addHanlder(ProtocolsEnum.SCloseGoodLocks, this, this.getSCloseGoodLocks);
            Network._instance.addHanlder(ProtocolsEnum.SGetGoodLocksInfo, this, this.getSGetGoodLocksInfo);
            Network._instance.addHanlder(ProtocolsEnum.SReturnLogin, this, this.getSReturnLogin);
            //Network._instance.addHanlder(ProtocolsEnum.SRoleOffline,this,this.getSRoleOffline);
            Network._instance.addHanlder(ProtocolsEnum.SGetSysConfig, this, this.getSGetSysConfig);
            Network._instance.addHanlder(ProtocolsEnum.SResetSysConfig, this, this.getSResetSysConfig);
            Network._instance.addHanlder(ProtocolsEnum.SSetLineConfig, this, this.getSSetLineConfig);
        }
        /** 收到设置自动进入副本选项成功消息返回 */
        private getSSetLineConfig(optcode: number, msg: hanlder.S2C_SSetLineConfig): void {
            SetBasicsModel.getInstance().setLineConfig = new Laya.Dictionary();
            SetBasicsModel.getInstance().setLineConfig = msg.configmap;
            SetBasicsProxy.getInstance().event(models.GET_SetLineConfig, msg.configmap);
        }
        /**
         * 收到重新设置后的最新系统设置信息
         */
        private getSResetSysConfig(optcode: number, msg: hanlder.S2C_SResetSysConfig): void {
            // SetBasicsModel._instance.resetSysConfigDic = msg.sysconfigmap;
            var _key = msg.sysconfigmap.keys;
            var _value = msg.sysconfigmap.values;
            for (let i = 0; i < _key.length; i++) {
                SetBasicsModel._instance.SysConfigDic.set(_key[i], _value[i]);
            }
            SetBasicsProxy.getInstance().event(models.GET_RESET_SYSCONFIG_INFO_EVENT, msg.sysconfigmap);
        }
        /**
         * 收到最新系统设置信息
         */
        private getSGetSysConfig(optcode: number, msg: hanlder.S2C_SGetSysConfig): void {
            SetBasicsModel._instance.SysConfigDic = msg.sysconfigmap;
            console.log(SetBasicsModel._instance.SysConfigDic);
            SetBasicsProxy.getInstance().event(models.GET_SYSCONFIG_INFO_EVENT);

            this.initSetBasicsConfig(msg.sysconfigmap);
        }
        /**
         * 
         */
        private initSetBasicsConfig(dicmap: Laya.Dictionary): void {
            //设置音乐
            dicmap.get(SysConfigType.Music) == 1? this.useapp.sceneRoot.playSceneMusic() : this.useapp.sceneRoot.stopSceneMusic();//
            dicmap.get(SysConfigType.Music) == 1? models.SetBasicsModel.getInstance().isCloseMusic = false : models.SetBasicsModel.getInstance().isCloseMusic = true;
            //设置音效
            dicmap.get(SysConfigType.SoundSpecEffect) == 1? this.useapp.sceneRoot.playSceneSound() : Laya.SoundManager.stopAllSound();
            //设置音量
            let _volume = dicmap.get(SysConfigType.Volume)/200;
            Laya.SoundManager.setMusicVolume(_volume);
            //Laya.SoundManager.setSoundVolume(_volume);
            // //是否自动挂机
            // var _isstar = LocalStorage.getItem("isstarAutoGuaJi" + _roleId);
            // if (_isstar) {
            //     switch (Number(_isstar)) {
            //         case 0://关闭
            //             game.modules.autohangup.models.AutoHangUpModel.getInstance().isstar = 0;
            //             break;
            //         case 1://开启
            //             game.modules.autohangup.models.AutoHangUpModel.getInstance().isstar = 1;
            //             break;
            //     }
            // }
        }
        /**
         * 收到通知客户端返回登录界面
         */
        private getSReturnLogin(optcode: number, msg: hanlder.S2C_SReturnLogin): void {
            console.log("---------------------msg.reason = " + msg.reason);
            // switch(msg.reason){
            //     case OffLineType.OFFLINE:
            //         SetBasicsProxy.getInstance().event(models.TYPE_OFFLINE_EVENT,[msg.ext]);
            //         break;
            //     case OffLineType.LINK_BROKEN:
            //         SetBasicsProxy.getInstance().event(models.TYPE_LINK_BROKEN_EVENT,[msg.ext]);
            //         break;
            //     case OffLineType.CHOSEE_ROLE:
            //         SetBasicsProxy.getInstance().event(models.TYPE_CHOSEE_ROLE_EVENT,[msg.ext]);
            //         break;
            //     case OffLineType.RETURN_LOGIN:
            //         SetBasicsProxy.getInstance().event(models.TYPE_RETURN_LOGIN_EVENT,[msg.ext]);
            //         break;
            // }
            models.SetBasicsModel._instance._isRrturnLoginflag = true;
            SetBasicsProxy.getInstance().event(models.TYPE_RETURN_LOGIN_EVENT, [msg.ext]);
        }
        /**
         * 收到了道具安全锁信息的消息
         */
        private getSGetGoodLocksInfo(optcode: number, msg: hanlder.S2C_SGetGoodLocksInfo): void {
            let info = new ItemLockInfoVo();
            info.password = msg.password;
            info.forceDelPdTime = msg.forceDelPdTime;
            info.forceDelEndTime = msg.forceDelEndTime;
            info.isFistLoginOfDay = msg.isFistLoginOfDay;
            info.errorTimes = msg.errorTimes;
            info.lockEndTime = msg.lockEndTime;
            info.isOpenSafeLock = msg.isOpenSafeLock;
            SetBasicsModel._instance.itemLockInfo = info;

            SetBasicsProxy.getInstance().event(models.GET_GOOD_LOCK_INFO, [info]);
        }
        /**
         * 收到了关闭道具安全锁的消息
         */
        private getSCloseGoodLocks(optcode: number, msg: hanlder.S2C_SOpenGoodLocks): void {
            if (msg.status == 1) {//收到设置成功的消息                
                SetBasicsProxy.getInstance().event(models.CLOSE_GOOD_LOCKS_EVENT);
            } else if (msg.status == 0) {
                SetBasicsProxy.getInstance().event(models.CLOSE_GOOD_LOCKS_FAIL_EVENT);
            }
        }
        /**
         * 收到了开启道具安全锁的消息
         */
        private getSOpenGoodLocks(optcode: number, msg: hanlder.S2C_SOpenGoodLocks): void {
            if (msg.status == 1) {//收到设置成功的消息                
                SetBasicsProxy.getInstance().event(models.OPEN_GOOD_LOCKS_EVENT);
            } else if (msg.status == 0) {
                SetBasicsProxy.getInstance().event(models.OPEN_GOOD_LOCKS_FAIL_EVENT);
            }
        }
        /**
         * 收到了解除道具安全锁的消息
         */
        private getSDelPassword(optcode: number, msg: hanlder.S2C_SDelPassword): void {
            if (msg.status == 1) {//收到设置成功的消息                
                SetBasicsProxy.getInstance().event(models.DEL_PASSWORD_SUCCESS_EVENT);
            }
        }
        /**
         * 收到了重新设置了道具安全锁的消息
         */
        private getSResetPassword(optcode: number, msg: hanlder.S2C_SResetPassword): void {
            if (msg.status == 1) {//收到设置成功的消息                
                SetBasicsProxy.getInstance().event(models.RESET_PASSWORD_SUCCESS_EVENT);
            }
        }
        /**
         * 收到了设置了道具安全锁的消息
         */
        private getSSetPassword(optcode: number, msg: hanlder.S2C_SSetPassword): void {
            if (msg.status == 1) {//收到设置成功的消息                
                SetBasicsProxy.getInstance().event(models.SET_PASSWORD_SUCCESS_EVENT);
            }
        }
    }
}