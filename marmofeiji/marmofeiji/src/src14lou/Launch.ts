
import Stage = Laya.Stage;                      //laya.display.Stage;
import Sprite = Laya.Sprite;                    //laya.display.Sprite;
import Graphics = Laya.Graphics;                //laya.display.Graphics;

import TextInput = Laya.TextInput;              //laya.ui.TextInput;
import TextArea = Laya.TextArea;                //laya.ui.TextArea;
import Button = Laya.Button;                    //laya.ui.Button;
import Box = Laya.Box;                          //laya.ui.Box;
import ProgressBar = Laya.ProgressBar;          //laya.ui.ProgressBar;
import List = Laya.List;                        //laya.ui.List;
import LImage = Laya.Image;                     //laya.ui.Image;
import Label = Laya.Label;                      //laya.ui.Label;
import Panel = Laya.Panel;
import CheckBox = Laya.CheckBox;

import Socket = Laya.Socket;                    //laya.net.Socket;
import Loader = Laya.Loader;                    //laya.net.Loader;
import HttpRequest = Laya.HttpRequest;          //laya.net.HttpRequest;
import LocalStorage = Laya.LocalStorage;        //laya.net.LocalStorage

import Texture = Laya.Texture;                  //laya.resource.Texture;
import Templet = Laya.Templet;                  //laya.ani.bone.Templet
import Skeleton = Laya.Skeleton;

import Byte = Laya.Byte;                        //laya.utils.Byte;
import Handler = Laya.Handler;                  //laya.utils.Handler;
import Browser = Laya.Browser;                  //laya.utils.Browser;
import Dictionary = Laya.Dictionary;            //laya.utils.Dictionary;

import Matrix = Laya.Matrix;                    //laya.maths.Matrix;
import Rectangle = Laya.Rectangle;              //laya.maths.Rectangle;
import Point = Laya.Point;                      //laya.maths.Point;

import LEvent = Laya.Event;                     //laya.events.Event;
import EventDispatcher = Laya.EventDispatcher;  //laya.events.EventDispatcher 

// import SoundManager = Laya.SoundManager;        //laya.media.SoundManager;

import GlowFilter = Laya.GlowFilter;            //laya.filters.GlowFilter;
import ColorFilter = Laya.ColorFilter;          //laya.filters.ColorFilter;
 

import Timer = laya.utils.Timer;

//import Protocols = hanlder.Protocols;
import RequesterProtocols = hanlder.RequesterProtocols;
import ProtocolsEnum = hanlder.ProtocolsEnum;
import Network = core.Network;
import GuidObject = core.obj.GuidObject;
import UpdateMask = core.obj.UpdateMask;
import SyncEvent = core.obj.SyncEvent;
import HanlderStruct = core.obj.HanlderStruct;

import PathConst = game.Path;
import SceneRoot = game.SceneRoot;
import UIRoot = game.UIRoot;
import Sync = game.Sync;
import BlackBorder = game.BlackBorder;

import IPoolsObject = game.utils.IPoolsObject;
import ObjectPools = game.utils.ObjectPools;
import Vesion = game.utils.Vesion;
import Vector2 = game.utils.Vector2;
import MathU = game.utils.MathU;
import StringU = game.utils.StringU;
import Direct = game.utils.Direct;
import AStar = game.utils.AStar;
import Dijkstra = game.utils.Dijkstra;
import MD5 = game.utils.MD5;
import Random = game.utils.Random;
import DisplayU = game.utils.DisplayU;
import ColorU = game.utils.ColorU;
import TextFieldU = game.utils.TextFieldU;
import HtmlFormat = game.utils.HtmlFormat;
import DictionaryU = game.utils.DictionaryU;
import ObjectU = game.utils.ObjectU;

import RefAsset = game.data.RefAsset;
import AssetsLoader = game.data.AssetsLoader;
import Template = game.data.Template;
import TemplateExpan = game.data.TemplateExpan;
import RefTemplet = game.data.RefTemplet;
import RefSound = game.data.RefSound;
import Teleport = game.data.Teleport;
import MapTeleportIndex = game.data.MapTeleportIndex;
import EnumToString = game.data.EnumToString;
import PreLoad = game.data.PreLoad;
import GossipData = game.data.GossipData;
import MapWater = game.data.MapWater;

import GlobalDef = game.object.GlobalDef;
import UnitField = game.object.UnitField;
import ItemField = game.object.ItemField;
import EquipField = game.object.EquipField;
import MailField = game.object.MailField;
import PlayerDataField = game.object.PlayerDataField;
import QuestField = game.object.QuestField;
import GlobalObjectField = game.object.GlobalObjectField;
import JjcField = game.object.JjcField;
import FightRole = game.object.FightRole;
import BattleInfo = game.object.BattleInfo;
import BattleRole = game.object.BattleRole;
import BattleHurt = game.object.BattleHurt;
import BattleTarget = game.object.BattleTarget;
import BattleExtra = game.object.BattleExtra;
import MapInfo = game.object.MapInfo;

import IAvatarObj = game.object.IAvatarObj;
import Unit = game.object.Unit;
import FakeUnit = game.object.FakeUnit;
import SpellCastInfo = game.object.SpellCastInfo;
import SpellCastData = game.object.SpellCastData;
import BuffCastInfo = game.object.BuffCastInfo;
import BuffCastData = game.object.BuffCastData;
import QuestItemObject = game.object.QuestItemObject;
import GlobalConfigField = game.object.GlobalConfigField;
import ChatItem = game.object.ChatItem;
import Buff = game.object.Buff;
import WujiangField = game.object.WuJiangField;

import SceneObjectMgr = game.managers.SceneObjectMgr;
import LocalStorageMgr = game.managers.LocalStorageMgr;
import EffectMgr = game.managers.EffectMgr;
import ClientBuffMgr = game.managers.ClientBuffMgr;
import FightMgr = game.managers.FightMgr;
import BattleMgr = game.managers.BattleMgr;

import ACotrller = game.cotrl.ACotrller;
import FindTouchUnitStack = game.cotrl.FindTouchUnitStack;
import GotoMapTouchUnitStack = game.cotrl.GotoMapTouchUnitStack;
import GotoMapPosStack = game.cotrl.GotoMapPosStack;
import WaitTeleteportStack = game.cotrl.WaitTeleteportStack;
import PluginsMgr = game.cotrl.PluginsMgr;

import Camera = game.scene.Camera;
import Effect = game.scene.Effect;
import EffectAvatar = game.scene.EffectAvatar;
import EffectFrame = game.scene.EffectFrame;
import EffectSkeleton = game.scene.EffectSkeleton;
import EffectLayer = game.scene.EffectLayer;
import EffectSKLayer = game.scene.EffectSKLayer;
import SceneRes = game.scene.SceneRes;
import AvatarItem = game.scene.AvatarItem;
import AvatarLinkage = game.scene.AvatarLinkage;
import AvatarBase = game.scene.AvatarBase;
import AvatarSprite = game.scene.AvatarSprite;
import AvatarUnit = game.scene.AvatarUnit;
import AvatarBuff = game.scene.AvatarBuff;
import FightxtDrawtor = game.scene.FightxtDrawtor;
import AvatarDrawtor = game.scene.AvatarDrawtor;
import MapPartLayer = game.scene.MapPartLayer;
import MapObsLayer = game.scene.MapObsLayer;
import AvatarData = game.scene.AvatarData;
import WeatherBase = game.scene.WeatherBase;


import EffectFrameUI = game.gui.component.EffectFrameUI;
import AnimationFrame = game.gui.component.AnimationFrame;
import Grid = game.gui.component.Grid;
import CoolGrid = game.gui.component.CoolGrid;
import TemplateGrid = game.gui.component.TemplateGrid;
import TemplateInfoGrid = game.gui.component.TemplateInfoGrid;
import ClipUtil = game.gui.component.ClipUtil;
import AvatarUIShow = game.gui.component.AvatarUIShow;
import AvatarUISprite = game.gui.component.AvatarUISprite;
import TweenBtnEff = game.gui.component.TweenBtnEff;
import MyTab = game.gui.component.MyTab;
import Common = game.gui.component.Common;
import UIFrameAnimation = game.gui.component.UIFrameAnimation;

import PageDef = game.gui.page.PageDef;
import Page = game.gui.base.Page;
import TopUI = game.gui.TopUI;
import GeneralUI = game.gui.GeneralUI;
import HUD = game.gui.HUD;
import TopunderUI = game.gui.TopunderUI;

import PanEngine = pan.PanEngine;
import PanScene = pan.PanScene;
import PanSceneSprite = pan.PanSceneSprite;
import SceneChar = pan.SceneChar;
import CharAction = pan.CharAction;

import Vector2D = Pan3d.Vector2D;
import Vector3D = Pan3d.Vector3D;
import MathUtil = Pan3d.MathUtil;
import MathClass = Pan3d.MathClass;
import TestTriangle = Pan3d.TestTriangle;

import Scene_data = Pan3d.Scene_data;

import Skill = Pan3d.Skill;
import SkillManager = Pan3d.SkillManager;

import ProgrmaManager = Pan3d.ProgrmaManager;

import Display3D = Pan3d.Display3D;
import Display3dMovie = Pan3d.Display3dMovie;

import LineDisplaySprite = Pan3d.LineDisplaySprite;
import LineDisplayShader = Pan3d.LineDisplayShader;
import ModuleManager = game.modules.ModuleManager;
import ModuleMediator = game.modules.ModuleMediator;
import ModuleEvent = game.modules.ModuleEvent;
import ModuleNames = game.modules.ModuleNames;


// 是否iphoneX
var onIPhoneX: boolean = false;

// 游戏配置
var gameConf:GameConf;
// 游戏接口
var gameApi:GameApi;

// 启动程序
class Launch {
    // 美术设计画布像素高宽
    widthDesginPixelw: number = 750;
    heightDesginPixelw: number = 1334;
    minSacleDesginPixelw: number = 0.5625;
    maxSacleDesginPixelw: number = 0.64;
    // 浏览器可视画布像素高宽
    private _clientWidth: number;
    private _clientHeight: number;
    // 浏览器可视高宽（在设备上的像素高宽）
    private _designWidth: number = 0;
    private _designHeight: number = 0;
    // 客户端画布缩放比
    private _clientScale: number = 1;
    // 场景缩放比(基于客户端画布缩放比)
    private _sceneScale: number = 1.17;
    private _tweenScale: boolean = false;
    // 程序集合
    private _apps: Array<AppBase> = [];
    // 是否休眠
    isBlur: boolean = false;

    private _showStat: boolean = false;
    get showStat(): boolean {
        return this._showStat;
    }
    set showStat(v: boolean) {
        this._showStat = v;
        this._showStat ? Laya.Stat.show() : Laya.Stat.hide();
    }
    get sceneScale():number{
        return this._sceneScale;
    }
    set sceneScale(v: number) {
        if (this._sceneScale == v) return;
        this._sceneScale = v;
        this.onResize();
    }

    constructor() {
        // //laya.debug.DebugTool.init();
        // //指定worker.js所在的路径,比如放在libs目录下
        // Laya.WorkerLoader.workerPath = "libs/worker.js";
        LayaOverwrite.do();

        // 初始化配置
        gameConf = window['game_conf'];
        // 初始化接口
        gameApi = window["externalInterfacePI"];
        
        isDebug = (location.href.indexOf("file") == 0);
        // 初始化舞台
        Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
        // 是否IPhoneX
        if (Browser.onIPhone && Math.abs(Browser.pixelRatio - 3) < 0.01) {
            onIPhoneX = (Browser.clientWidth == 375 && Browser.clientHeight == 812) || (Browser.clientWidth == 812 && Browser.clientHeight == 375);
        }
        // 引擎有bug这个鬼东西暂时不能设置
        // Laya.AtlasResourceManager.atlasTextureWidth = 1024;
        // Laya.AtlasResourceManager.atlasTextureHeight = 1024;
        Laya.AtlasResourceManager.maxTextureCount = 1;

        // 抗锯齿
        Config.isAntialias = true;

        //启用DebugPanel调试面板
        //Laya.DebugTool.init();

        //log_level = 1;
        this.checkWorkerLoaderEnable();


        
        ////////////////连接服务器////////////////////////////////////
        logd("Browser.window.username:", Browser.window.username);
        logl("Browser.window.username:", Browser.window.username);
        this.requesterProtocols = new RequesterProtocols();
        this.netWork = new Network();
        //this.netWork.connectByUrl(Browser.window.server);
       // this.addNetworkListener(this.netWork);
        //game.modules.ModuleManager.init(game.modules.LoadModuleCmd);



        // this.showStat = isDebug;

        Laya.loader.maxLoader = 3;
        Laya.loader.retryNum = 10;
        Laya.loader.retryDelay = 500;

        Loader.maxTimeOut = 20;
        Loader.typeMap["data"] = Loader.BUFFER;
        Loader.typeMap["bin"] = Loader.BUFFER;

        if (!isDebug) {
            let url = location.href;
            let log = StringU.getParameter(url, "log");
            if (log != "") {
                log_level = Number(log);
            }
            this.showStat = (StringU.getParameter(url, "stat") != "");
        }
        else {
            log_level = MAX_LOG_LEVEL;
            ObjectPools.mold = ObjectPools.MOLD_DEBUG_STRICT;
        }
        let onPC = Browser.onPC;
        if (!onPC) {
            if (window.orientation == 0) {
                Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
            }
            // else if (window.orientation == 90 || window.orientation == -90) {
            //     Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
            // }
            window.addEventListener("orientationchange", (e) => {
                this.lockOrientation = false;
                Laya.stage.screenMode = Stage.SCREEN_NONE;
            });
            // 默认场景最小
            // this._sceneScale = 0.8;
        }
        // Vesion.addSearchPath("CN/", "data.bin");

        // 微信分享结果函数
        window['validateShare'] = (res: any) => {
            // logd('validateShare', res);
            this.apiShareCallback();
        }

        //加载文件版本信息
        Vesion.once(Vesion.LOAD_DATA_COMPLETE, this, () => {
            let url = location.href;
            let sdkName = StringU.getParameter(url, "sdkName");
            let sdkUrl = StringU.getParameter(url, "sdkUrl");
            sdkUrl = decodeURIComponent(sdkUrl);
            // sdkName = 'aaa'
            // sdkUrl = '//d.hgame.com/loadsdk'

            let api: any = gameApi;
            if (sdkUrl != '') {
                let script = document.createElement("script");
                script.src = sdkUrl;
                document.head.appendChild(script);
                if (api && api.setSDK) {
                    api.setSDK(sdkName);
                }
            }
            //game.data.ProjTemplate.loadTemplates();
            this.init();
        })

        Vesion.loadVesionFile();
        // this.test_media_recorder(); //测试多媒体信息采集
        logd('game_start');
    }
    private netWork:Network;
    private requesterProtocols:RequesterProtocols;

    private checkWorkerLoaderEnable(): void {
        let workerLoaderEnable = false;
        if (StringU.getParameter(location.href, 'worker') != "") {
            workerLoaderEnable = true;
        }
        else {
            let api: any = gameApi;
            api && (workerLoaderEnable = api.workerLoaderEnable);
        }
        if (workerLoaderEnable) {
            //开启使用WorkerLoader来加载解码图片的功能
            Laya.WorkerLoader.enable = true;
        }
    }
    
    private init(): void {
        EffectMgr.init();
        ClipUtil.init();

        // 初始化3d引擎
        PanEngine.init(Laya.Render.canvas, () => {
            let app = new GameApp();
            app.isBlur = this.isBlur;
            this._apps.push(app);
            // 主心跳
            Laya.stage.frameLoop(1, this, this.onUpdate);
            Laya.stage.mouseThrough = true;
            Laya.stage.on(LEvent.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(LEvent.MOUSE_MOVE, this, this.onMouseMove);
            Laya.stage.on(LEvent.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(LEvent.MOUSE_OUT, this, this.onMouseOut);
            // 监听窗口大小变化
            Laya.stage.on(LEvent.RESIZE, this, this.onResize);
            this.onResize();
            // 休眠（浏览器）
            Laya.stage.on(LEvent.BLUR, this, this.onBlur);
            // 激活（浏览器）
            Laya.stage.on(LEvent.FOCUS, this, this.onFocus);

            //按键监听 防止和快捷栏的按键监听混在一起
            if (Laya.Browser.onPC) {
                Laya.stage.on(LEvent.KEY_DOWN, this, this.onKeyDown);
            }
        });
    }

    private _prevUpdateTimer: number;
    // 心跳更新
    private onUpdate(): void {
        let timer = Laya.timer.currTimer;
        let diff = timer - this._prevUpdateTimer;
        // logd('Launch.onUpdate', timer - this._prevUpdateTimer, diff);   
        this._prevUpdateTimer = timer;
        if (!diff) {
            return;
        }
        // 这样做才能防止白边
        this.checkClientSize();

        // 更新设计分辨率
        // Laya.stage.designWidth = this._designWidth;
        if (Laya.stage.width != this._designWidth)
            Laya.stage.width = this._designWidth;
        // Laya.stage.designHeight = this._designHeight;
        if (Laya.stage.height != this._designHeight)
            Laya.stage.height = this._designHeight;
        // 心跳
        // let diff = Laya.timer.delta;
        for (let app of this._apps) {
            app.onUpdate(diff);
        }
        // 对象池
        ObjectPools.update(diff);
        // 装备部件
        AvatarItem.update(diff);
        //特效缓存更新
        EffectMgr.update(diff);
        // 引用计数素材更新
        RefAsset.update(diff);
        // 引用计数素材更新
        RefSound.update(diff);

        // 3d
        PanEngine.update();
    }

    // 鼠标按下
    private onMouseDown(e: LEvent): void {
        for (let app of this._apps) {
            app.onMouseDown(e);
        }
    }

    // 鼠标移动
    private onMouseMove(e: LEvent): void {
        for (let app of this._apps) {
            app.onMouseMove(e);
        }
    }

    // 鼠标弹起
    private onMouseUp(e: LEvent): void {
        for (let app of this._apps) {
            app.onMouseUp(e);
        }
    }

    // 鼠标移开
    private onMouseOut(e: LEvent): void {
        for (let app of this._apps) {
            app.onMouseOut(e);
        }
    }

    private onKeyDown(e: LEvent): void {
        for (let app of this._apps) {
            app.onKeyDown(e);
        }
    }

    // 休眠
    private onBlur(): void {
        this.isBlur = true;
        for (let app of this._apps) {
            app.isBlur = true;
        }
    }

    // 激活
    private onFocus(): void {
        this.isBlur = false;
        for (let app of this._apps) {
            app.isBlur = false;
        }
    }
    // 游戏窗口尺寸发生变化
    onResize(): void {
        logd('Browser:', Browser.width, Browser.height, Browser.clientWidth, Browser.clientHeight, Browser.pixelRatio)
        logd('window:', window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight, window.devicePixelRatio)
        logd('screen:', screen.width, screen.height, screen.availWidth, screen.availHeight, screen.deviceXDPI, screen.deviceYDPI, screen.pixelDepth)
        logd('onIPhoneX', onIPhoneX)
        this.checkClientSize();
        let sceneScale = this._sceneScale;
        let clientScale = this._clientScale;
        let clientWidth = this._clientWidth;
        let clientHeight = this._clientHeight;
        // if (!Browser.onPC) {
        //     if (clientWidth > clientHeight) {
        //         // 如果是横屏模式  并且有之前的竖屏缩放数据
        //         if (this._verticalClientScale) {
        //             sceneScale = this._verticalClientScale / this._clientScale;
        //             this._verticalClientScale = 0;
        //         }
        //     }
        //     else {
        //         this._verticalClientScale = this._clientScale;
        //     }
        // }
        for (let app of this._apps) {
            app.onResize(clientWidth, clientHeight, clientScale, sceneScale, this._tweenScale, Handler.create(this, this.onResize3D, null, false));
        }
        // alert(clientScale + ',' + sceneScale)
        this.onResize3D(sceneScale);
    }
    // 3d场景尺寸发生变化
    private onResize3D(sceneScale: number): void {
        PanEngine.resetSize(Laya.Render.canvas.width, Laya.Render.canvas.height, this._clientScale * sceneScale); //设置canvas大小
    }

    // 浏览器可视原始高宽
    private _browserClientWidth: number = 0;
    private _browserClientHeight: number = 0;
    private _prevBrowserClientWidth: number;
    private _prevBrowserClientHeight: number;

    private _lockOrientation: boolean = true;
    private set lockOrientation(v: boolean) {
        this._lockOrientation = v;
    }

    onPC: boolean = false;
    // 校验浏览器可视屏幕像素
    private checkClientSize(): void {
        let browser_clientWidth = Browser.clientWidth;
        let browser_clientHeight = Browser.clientHeight;
        this.onPC = Browser.onPC;
        if (!this.onPC && this._prevBrowserClientWidth) {
            if ((browser_clientWidth == this._prevBrowserClientWidth
                && browser_clientHeight != this._prevBrowserClientHeight)
                || (browser_clientHeight == this._prevBrowserClientHeight
                    && browser_clientWidth != this._prevBrowserClientWidth)) {
                // 呼出软键盘了
                // if(Laya.stage.screenMode == Stage.SCREEN_HORIZONTAL){
                //     // 如果自动横屏改成竖屏
                //     Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
                //     this.verticalByInput = true;
                // }

                return;
            }
        }

        let __width = browser_clientWidth;
        let __height = browser_clientHeight;
        switch (Laya.stage.screenMode) {
            case Stage.SCREEN_VERTICAL:
                browser_clientHeight = Math.max(__width, __height);
                browser_clientWidth = Math.min(__width, __height);
                break;
            case Stage.SCREEN_HORIZONTAL:
                browser_clientHeight = Math.min(__width, __height);
                browser_clientWidth = Math.max(__width, __height);
                break;
        }

        if (this._browserClientWidth == browser_clientWidth && this._browserClientHeight == browser_clientHeight) {
            return;
        }

        this._browserClientWidth = browser_clientWidth;
        this._browserClientHeight = browser_clientHeight;
        this._prevBrowserClientWidth = browser_clientWidth;
        this._prevBrowserClientHeight = browser_clientHeight;

        this._designWidth = this._browserClientWidth * Browser.pixelRatio;
        this._designHeight = this._browserClientHeight * Browser.pixelRatio;

        // if (this._designWidth < this._designHeight && (this._designWidth < 1280 || this._designHeight < 720)) {
        //     // 屏幕太小适应手机的适配方案
        //     this.onPC = false;
        // }

        let wScale = this._designWidth / this.widthDesginPixelw;
        let hScale = this._designHeight / this.heightDesginPixelw;

        this._clientScale = Math.min(wScale, hScale);

        if (wScale > hScale) {
            this._clientWidth = this.heightDesginPixelw * (this._designWidth / this._designHeight);
            this._clientHeight = this.heightDesginPixelw;
        }
        else {
            this._clientWidth = this.widthDesginPixelw;
            this._clientHeight = this.widthDesginPixelw * (this._designHeight / this._designWidth);
        }

    }

    // 分享回调
    private _shareCallback: Function;
    set shareCallback(v: Function) {
        this._shareCallback = v;
    }
    private apiShareCallback = (...args) => {
        this._shareCallback && this._shareCallback.call(this);
        logd("分享成功");
    }

    // 支付回调
    private _payCallback: Function;
    set payCallback(v: Function) {
        this._payCallback = v;
    }
    private apiPayCallback = (...args) => {
        this._payCallback && this._payCallback.call(this);
        logd("支付成功");
    }

    // 关注回调
    private _focusCallback: Function;
    set focusCallback(v: Function) {
        this._focusCallback = v;
    }
    private apiFocusCallback = (...args) => {
        this._focusCallback && this._focusCallback.call(this);
        logd("关注成功");
    }
}

var main = new Launch();

////////////////////////////////////////////////////////////
// 打印
let MAX_LOG_LEVEL = 4
let log_level = MAX_LOG_LEVEL

// 本地调试
var isDebug: boolean = false;

function logTrace(...args: any[]): void {
    //if (log_level < 1) return;
    args.unshift(Sync.getTimeShortStr(Laya.timer.currTimer));
    args.unshift("[T]");
    console.trace(args.join(" "));
}
function logd(...args: any[]): void {
    if (log_level < 4) return;
    args.unshift(Sync.getTimeShortStr1(Laya.timer.currTimer));
    args.unshift("[D]");
    console.debug(args.join(" "));
}

function logl(...args: any[]): void {
    if (log_level < 3) return;
    args.unshift(Sync.getTimeShortStr(Laya.timer.currTimer));
    args.unshift("[L]");
    console.log(args.join(" "));
}

function logw(...args: any[]): void {
    if (log_level < 2) return;
    args.unshift(Sync.getTimeShortStr(Laya.timer.currTimer));
    args.unshift("[W]");
    console.warn(args.join(" "));
}

function loge(...args: any[]): void {
    if (log_level < 1) return;
    args.unshift(Sync.getTimeShortStr(Laya.timer.currTimer));
    args.unshift("[E]");
    console.error(args.join(" "));
}