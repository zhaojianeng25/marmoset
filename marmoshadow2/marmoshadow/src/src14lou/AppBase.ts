/*
* name
*/
class AppBase {
    // 是否休眠
    protected _isBlur: boolean = false;
    set isBlur(v: boolean) {
        this._isBlur = v;
        // Laya.stage.renderingEnabled = !this._isBlur;
        // this._uiRoot && (this._uiRoot.visible = !this._isBlur);
        // this._sceneRoot && (this._sceneRoot.visible = !this._isBlur);
        Laya.SoundManager.musicMuted = this._isBlur;
        Laya.SoundManager.stopAllSound();
    }
    // 时间同步 
    private _sync: Sync;
    get sync(): Sync {
        if (!this._sync) {
            this._sync = new Sync(this);
        }
        return this._sync;
    }

    // 对象管理器(场景)
    private _sceneObjectMgr: SceneObjectMgr;
    get sceneObjectMgr(): SceneObjectMgr {
        if (!this._sceneObjectMgr) {
            this._sceneObjectMgr = new SceneObjectMgr(this);
        }
        return this._sceneObjectMgr;
    }

    //数据本地存储管理器
    private _localStorageMgr: LocalStorageMgr;
    get localStorageMgr(): LocalStorageMgr {
        if (!this._localStorageMgr) {
            this._localStorageMgr = new game.managers.LocalStorageMgr(this);
        }
        return this._localStorageMgr;
    }

    // 控制器
    private _aCotrller: ACotrller;
    get aCotrller(): ACotrller {
        if (!this._aCotrller) {
            this._aCotrller = new ACotrller(this);
        }
        return this._aCotrller;
    }
    
    // //战斗管理器
    // private _fightMgr: FightMgr;
    // get fightMgr(): FightMgr {
    //     if (!this._fightMgr) {
    //         this._fightMgr = new FightMgr();
    //     }
    //     return this._fightMgr;
    // }

    // //客户端战斗管理器
    // private _battleMgr: BattleMgr;
    // get battleMgr(): BattleMgr {
    //     if (!this._battleMgr) {
    //         this._battleMgr = new BattleMgr(this);
    //     }
    //     return this._battleMgr;
    // }

     //客户端战斗代理
    private _battleProxy: battle.BattleProxy;
    get battleProxy(): battle.BattleProxy {
        if (!this._battleProxy) {
            this._battleProxy = new battle.BattleProxy(this);
        }

        return this._battleProxy;
    }
    // ui
    protected _uiRoot: UIRoot;
    get uiRoot(): UIRoot {
        return this._uiRoot;
    }
    // 场景
    protected _sceneRoot: SceneRoot;
    get sceneRoot(): SceneRoot {
        return this._sceneRoot;
    }

    protected _blackBorder: BlackBorder;

    constructor() {
    }

    // 鼠标按下
    onMouseDown(e: LEvent): void {
        if (this._uiRoot && this._uiRoot.onMouseDown(e)) {
            return;
        }
        this._sceneRoot && this._sceneRoot.onMouseDown(e);
    }

    // 鼠标移动
    onMouseMove(e: LEvent): void {
        if (this._uiRoot && this._uiRoot.onMouseMove(e)) {
            return;
        }
        this._sceneRoot && this._sceneRoot.onMouseMove(e);
    }

    // 鼠标弹起
    onMouseUp(e: LEvent): void {
        if (this._uiRoot && this._uiRoot.onMouseUp(e)) {
            return;
        }
        this._sceneRoot && this._sceneRoot.onMouseUp(e);
    }

    // 鼠标移开
    onMouseOut(e: LEvent): void {
        if (this._uiRoot && this._uiRoot.onMouseOut(e)) {
            return;
        }
        this._sceneRoot && this._sceneRoot.onMouseOut(e);
    }

    onKeyDown(e: LEvent): void {
        this._uiRoot && this._uiRoot.onKeyDown(e)
    }

    // 心跳更新
    onUpdate(diff: number): void {
        this._isBlur = window["appInBackground"];
        this._sync && this._sync.update(diff);
        this._sceneObjectMgr && this._sceneObjectMgr.update(diff);
        this._aCotrller && this._aCotrller.update(diff);

        this._uiRoot && this._uiRoot.update(diff);

        if (this._sceneRoot) {
            if (this._sceneCurScale != this._sceneEndScale) {
                if (this._sceneCurScale <= 0) {
                    this._sceneCurScale = this._sceneEndScale;
                    WeatherBase.LOCK_RESET = false; // 解除天气重置锁定
                }
                else {
                    let d = this._sceneEndScale - this._sceneCurScale;
                    if (Math.abs(d) < 0.002) {
                        this._sceneCurScale = this._sceneEndScale;
                        WeatherBase.LOCK_RESET = false; // 解除天气重置锁定
                    }
                    else {
                        let scaleSpeed = this._sceneScaleSpeed;
                        if (!scaleSpeed) {
                            scaleSpeed = d / 5;
                        }
                        this._sceneCurScale += scaleSpeed;
                        WeatherBase.LOCK_RESET = true; // 锁定天气重置
                    }
                }

                this.sceneResize(this._sceneCurScale)
                if (this._sceneScaleHandler) this._sceneScaleHandler.runWith(this._sceneCurScale);
            }
            this._sceneRoot.update(diff);
        }
    }

    // 是否浮空
    private _floating: boolean = false;
    set floating(v: boolean) {
        if (this._floating == v) {
            return;
        }
        this._floating = v;
        if (this.sceneObjectMgr.mainUnit) {
            var effect = ObjectPools.malloc(EffectAvatar) as EffectAvatar;
            effect.setData("0000upgrade");
            effect.toward = Direct.BOTTOM;
            effect.anchorObject = this.sceneObjectMgr.mainUnit;
            if (this._floating)
                effect.offSet = [0, 0, 0, 0, 0, -80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.sceneRoot.addEffect(effect);
        }

        this.onResize(this._clientWidth, this._clientHeight, this._clientScale, this._sceneBaseScale, true)
    }

    private _floatingScale: number = 0.9;
    get floatingScale(): number {
        return this._floatingScale;
    }
    private _avatarFloatingScale: number = 1 / this._floatingScale;
    get avatarFloatingScale(): number {
        return this._avatarFloatingScale
    }

    // 浏览器可视画布像素高宽
    protected _clientWidth: number;
    protected _clientHeight: number;
    get clientWidth(): number {
        return this._clientWidth;
    }
    get clientHeight(): number {
        return this._clientHeight;
    }
    // 客户端画布缩放比
    protected _clientScale: number = 1;
    public get clientScale(): number {
        return this._clientScale;
    }
    // 场景基础缩放比(基于客户端画布缩放比)
    protected _sceneBaseScale: number = 1;
    protected _sceneScaleHandler: Handler;
    public get sceneBaseScale(): number {
        return this._sceneBaseScale;
    }
    public set sceneBaseScale(v: number) {
        this._sceneBaseScale = v;
    }

    // 场景最终缩放比
    protected _sceneEndScale: number = 1;
    set sceneEndScale(v: number) {
        this._sceneEndScale = v;
    }
    get sceneEndScale(): number {
        return this._sceneEndScale;
    }
    // 场景当前缩放比
    protected _sceneCurScale: number = 0;
    get sceneCurScale(): number {
        return this._sceneCurScale;
    }
    set sceneCurScale(v: number) {
        this._sceneCurScale = v;
    }

    // 场景缩放速率
    private _sceneScaleSpeed: number = 0;
    set sceneScaleSpeed(v: number) {
        this._sceneScaleSpeed = v;
    }

    set mouseLock(v: boolean) {
        this._uiRoot && (this._uiRoot.mouseLock = v);
        this._sceneRoot && (this._sceneRoot.mouseLock = v);
    }

    //Iphone X 安全区域距离顶部
    static IPHONEX_TOP: number = 44 / 812;
    //Iphone X 安全区域距离底部
    static IPHONEX_BOTTOM: number = 34 / 812;

    // 游戏窗口尺寸发生变化
    onResize(width: number, height: number, clientScale: number, sceneBaseScale: number, tween: boolean = false, handler: Handler = null): void {
        this._clientWidth = width;
        this._clientHeight = height;
        this._clientScale = clientScale;
        this._sceneBaseScale = sceneBaseScale;
        this._sceneScaleHandler = handler;

        let x = 0, y = 0;
        //判断IPhoneX
        if (onIPhoneX) {
            if (Laya.stage.screenMode == Stage.SCREEN_HORIZONTAL) {
                //正横屏 
                width = width * (1 - AppBase.IPHONEX_TOP - AppBase.IPHONEX_BOTTOM);
                // x偏移
                x = width * AppBase.IPHONEX_TOP * clientScale;
            }
            else if (Laya.stage.screenMode == Stage.SCREEN_VERTICAL) {
                // 竖屏
                height = height * (1 - AppBase.IPHONEX_TOP - AppBase.IPHONEX_BOTTOM);
                // y偏移
                y = height * AppBase.IPHONEX_TOP * clientScale;
            } else {
                if (window.orientation == 0) {
                    // 竖屏
                    height = height * (1 - AppBase.IPHONEX_TOP - AppBase.IPHONEX_BOTTOM);
                    // y偏移
                    y = height * AppBase.IPHONEX_TOP * clientScale;
                } else if (window.orientation == 90) {
                    //正横屏 
                    width = width * (1 - AppBase.IPHONEX_TOP - AppBase.IPHONEX_BOTTOM);
                    // x偏移
                    x = width * AppBase.IPHONEX_TOP * clientScale;
                } else if (window.orientation == -90) {
                    //反横屏
                    width = width * (1 - AppBase.IPHONEX_TOP - AppBase.IPHONEX_BOTTOM);
                    // x偏移
                    x = width * AppBase.IPHONEX_BOTTOM * clientScale;
                }
            }
        }
        if (this._uiRoot) {
            this._uiRoot.x = x;
            this._uiRoot.y = y;
            this._uiRoot.scale(clientScale, clientScale);
            this._uiRoot.resize(width, height);
            this._uiRoot.graphics.clear();
            x = x / clientScale;
            y = y / clientScale;
            this._uiRoot.graphics.drawRect(- x, - y, this._clientWidth, y, '#00000');
            this._uiRoot.graphics.drawRect(- x, height, this._clientWidth, this._clientHeight - y - height, '#00000');

            this._uiRoot.graphics.drawRect(- x, 0, x, height, '#00000');
            this._uiRoot.graphics.drawRect(width, 0, this._clientWidth - x - width, height, '#00000');
        }

        this._blackBorder && this._blackBorder.scale(clientScale, clientScale);
        this._blackBorder && this._blackBorder.resize(width, height);
        Laya.stage.addChild(this._blackBorder);

        // 如果浮空视野拉远
        this._sceneEndScale = this._floating ? sceneBaseScale * this._floatingScale : sceneBaseScale;
        // WeatherBase.LOCK_RESET = tween;
        if (!tween) {
            this._sceneCurScale = 0;
        }
    }

    private sceneResize(scale: number): void {
        let sceneScale = this._clientScale * scale;
        let sceneWidth = this._clientWidth / scale;
        let sceneHeight = this._clientHeight / scale;
        this._sceneRoot.scale(sceneScale, sceneScale);
        this._sceneRoot.resize(sceneWidth, sceneHeight);
    }

    playSound(url: string, loops?: number, complete?: Handler, soundClass?: any, startTime?: number): void {
        if (this._isBlur) {
            return;
        }
        RefSound.Get(url).playSound(url, loops, soundClass, startTime);
    }

    stopSound(url: string): void {
        RefSound.Get(url).stopSound()
        // Laya.SoundManager.stopSound(url);
    }
    private _musicUrl = ""
    playMusic(url: string, loops?: number, complete?: Handler, startTime?: number): Laya.SoundChannel {
        if (this._musicUrl != "")
            this.stopMusic()
        this._musicUrl = url
        return Laya.SoundManager.playMusic(url, loops, complete, startTime);
    }

    stopMusic(): void {
        Laya.SoundManager.stopMusic();
        if (this._musicUrl != "")
            Laya.SoundManager.destroySound(this._musicUrl);
    }
}