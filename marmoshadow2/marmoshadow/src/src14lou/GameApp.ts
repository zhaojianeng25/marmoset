
// 程序入口
class GameApp extends AppBase {
    // 必要素材是否加载完毕
    private _needAssetLoaded: boolean = false;

    // 预加载
    preLoad: PreLoad;

    // 断线重连是否需要重新获取Session
    private _reConnectHasGetSession: boolean = false;

    constructor() {
        super();
        this.init();
    }

    // 初始化函数
    protected init(flag?: any): void {
        if (!this.preLoad) {
            this.preLoad = new PreLoad();
        }
        // 初始化ui
        if (!this._uiRoot) {
            this._uiRoot = new UIRoot(this);
        }
        Laya.stage.addChild(this._uiRoot);

        // 黑色边框
        if (!this._blackBorder) {
            this._blackBorder = new BlackBorder(this);
        }

        // ui初始化后打开登陆页面
        this._uiRoot.on(UIRoot.INIT, this, () => {
            this.onMPlayerData();
            core.obj.SyncEvent.init();
            this.sync.init();
            this.tryCreatedSceneRoot();
            this.loadNeedAsset();
        });

        //flag如果有值，重新打开登陆界面
        if (flag) {
            ModuleManager.show(ModuleNames.CREATE_ROLE,this);
        }
        //监听玩家主动请求返回登陆界面后，服务器允许返回的S
        Network._instance.addHanlder(ProtocolsEnum.SReturnLogin, this, this.removeChilds);
        //Network._instance.addHanlder(ProtocolsEnum.SRoleOffline,this,this.removeChilds);
        // //移除场景、玩家单元
        // this._uiRoot.on(UIRoot.REMOVE, this,this.removeScene);
    }
    // /**
    //      * 移除场景
    //      */
    //     private removeScene():void{
    //         // this._sceneObjMgr = this._app.sceneObjectMgr;
    //         var _mapInfo =this.sceneObjectMgr.mapInfo
    //         var _mainUnit: Unit = this.sceneObjectMgr.mainUnit
    //         //释放旧的地图对象
    //         if(_mapInfo){
    //             this.sceneObjectMgr.ReleaseObject(_mapInfo);
    //         }
    //         //释放主玩家unit
    //         if(_mainUnit){
    //             this.sceneObjectMgr.ReleaseObject(_mainUnit);
    //         }
    //     }
    /**
     * 移除场景、UI
     * 然后，重新初始化
     */
    private removeChilds(): void {
        game.modules.createrole.models.LoginProxy.getInstance().linkState = 0;
        game.modules.setBasics.models.SetBasicsProxy.getInstance().off(game.modules.setBasics.models.TYPE_LINK_BROKEN_BACK_EVENT, this, this.removeChilds);
        // if (this._sceneRoot) {
        //     Laya.stage.removeChild(this._sceneRoot);
        // }
        // if (this._uiRoot) {
        //     Laya.stage.removeChild(this._uiRoot);
        //     //this._uiRoot.event(UIRoot.REMOVE);
        // }
        // //销毁所有的子对象
        // if (this._sceneRoot && this._uiRoot) {
        //     Laya.stage.destroyChildren();
        // }
        //清除某些定时器
        this.clearSomeTime();
        // //清除所有事件监听
        // Laya.stage.offAll();
        //清空所有model里存的数据
        this.clearAllModleData();
        //清空存放module的字典中的数据
        this.clearModuleDic();
        //清除模型
        this.clearModel();
        this.init(true);
    }
    /**
     * 清除模型
     */
    private clearModel(): void {
        // let _storyClasssDic = this.sceneObjectMgr.sceneStoryMgr.get_storyClasss();
        // let storyClass:any = _storyClasssDic[this.sceneObjectMgr.mapAssetInfo.id];
        // storyClass.clear();
        // this.sceneObjectMgr.clear();
    }
    /**
     * 清空存放module的字典中的数据
     */
    private clearModuleDic(): void {
        ModuleManager.instanceDic = new Laya.Dictionary();
    }
    /**
     * 清除某些定时器
     */
    private clearSomeTime(): void {
        Laya.timer.clearAll(this);
    }
    /**
     * 清空所有model里存的数据
     */
    private clearAllModleData(): void {
        game.modules.achievent.models.AchieventModel.clearModelData();
        game.modules.activity.models.ActivityModel.clearModelData();
        game.modules.autohangup.models.AutoHangUpModel.clearModelData();
        game.modules.bag.models.BagModel.clearModelData();
        game.modules.chat.models.ChatModel.clearModelData();
        game.modules.createrole.models.LoginModel.clearModelData();
        game.modules.family.models.FamilyModel.clearModelData();
        game.modules.friend.models.FriendModel.clearModelData();
        game.modules.guaji.models.GuaJiModel.clearModelData();
        game.modules.huoban.models.HuoBanModel.clearModelData();
        game.modules.keju.models.KejuModel.clearModelData();
        game.modules.mainhud.models.HudModel.clearModelData();
        game.modules.pet.models.PetModel.clearModelData();
        game.modules.ranKingList.models.RanKingListModel.clearModelData();
        game.modules.redPacket.models.RedPacketModel.clearModelData();
        game.modules.reward.models.RewardModel.clearModelData();
        game.modules.roleinfo.models.RoleInfoModel.clearModelData();
        game.modules.sale.models.SaleModel.clearModelData();
        game.modules.setBasics.models.SetBasicsModel.clearModelData();
        game.modules.shop.models.ShopModel.clearModelData();
        game.modules.skill.models.SkillModel.clearModelData();
        game.modules.strengThening.models.StrengTheningModel.clearModelData();
        game.modules.task.models.TaskModel.clearModelData();
        game.modules.team.models.TeamModel.clearModelData();
        game.modules.tianjixianling.models.TianJiXianLingModel.clearModelData();
        game.modules.tips.models.TipsModel.clearModelData();
        game.scene.models.SceneModel.clearModelData();
    }

    // 加载必要素材
    private loadNeedAsset(): void {
        let assetsLoader: AssetsLoader = new AssetsLoader();
        assetsLoader.load([PathConst.template,
        PathConst.atlas_ui + 'hud.atlas',],
            Handler.create(this, this.onNeedAssetLoaded, [assetsLoader]));
    }

    private onNeedAssetLoaded(assetsLoader: AssetsLoader): void {
        this._needAssetLoaded = true;
        // 清理载模板预加
        this.preLoad.clear(PathConst.template);
        let buff = Laya.loader.getRes(PathConst.template);
        // 清理模板素材内存
        assetsLoader.release(PathConst.template, true);
        let dataStr = StringU.readZlibData(new ByteArray(buff));
        Template.setData(JSON.parse(dataStr));
        TemplateExpan.init();
        MapTeleportIndex.inst.init();
        console.log("Template.data:", Template.data);
        // GossipData.init();
        //this.checkInGame();
    }

    // 校验进入游戏
    private checkInGame(): void {
        if (!this._needAssetLoaded) {
            //logd('[checkInGame] _needAssetLoaded is false');
            return;
        }
        let loadImg: game.gui.page.Load = this._uiRoot.top.getPage(PageDef.LOAD) as game.gui.page.Load;
        if (loadImg) loadImg.showJindu(2);
    }

    // 主玩家数据下来了
    private onMPlayerData(): void {
        logd('主玩家数据下来了');
        //let loadImg: game.gui.page.Load = this._uiRoot.top.getPage(PageDef.LOAD) as game.gui.page.Load;
        //if (loadImg) loadImg.showJindu(3);
        //this._uiRoot.top.close(PageDef.LOAD);

        //this._uiRoot.toLoadMainPlayerData();//UIRoot加载完预加载数据common.atlas、hud.atlas、tongyong.atlas调用_uiRoot.checkIntoScene进入场景sceneObjectMgr.joinFakeMap,然后CreateObject、mapInfo.firstUpdate
        //this.sceneObjectMgr.init();//WaitTeleteportStack、加载完load/loading0.jpg然后callTeleport(){_sceneObjectMgr.joinFakeMap}

        //this.battleMgr.init();
        //launch.onUpdate、app.onUpdate、_sceneObjectMgr.update、this.event(SceneObjectMgr.MAP_TELEPORT, newMapid);changeUIMOde,open(HudMainPage);
        this.battleProxy.init();
        game.modules.autohangup.models.AutoHangUpModel.getInstance();
        game.modules.friend.models.FriendProxy.getInstance().init();
        game.modules.mapworld.models.MapProxy.getInstance().init();
        game.scene.models.SceneProxy.getInstance().init();
        game.modules.bag.models.BagProxy.getInstance().init();
        game.modules.createrole.models.LoginProxy.getInstance().init();
        game.modules.mainhud.models.HudProxy.getInstance().init();
        game.modules.chat.models.ChatProxy.getInstance().init();
        game.modules.achievent.models.AchieventProxy.getInstance().init();
        game.modules.pet.models.PetProxy.getInstance().init();
        game.modules.strengThening.models.StrengTheningProxy.getInstance().init();
        game.modules.roleinfo.models.RoleInfoProxy.getInstance().init();
        game.modules.huoban.models.HuoBanProxy.getInstance().init();
        ModuleManager.loadModuleExecute(ModuleNames.FRIEND, this);	//预先载入好友系统
        game.modules.team.models.TeamProxy.getInstance().init();
        game.modules.sale.models.SaleProxy.getInstance();
        game.modules.tips.models.TipsProxy.getInstance().init();
        ModuleManager.loadModuleExecute(ModuleNames.DisapperTips, this);
        game.modules.reward.models.RewardProxy.getInstance();
        game.modules.activity.models.ActivityProxy.getInstance();
        game.modules.shop.models.ShopProxy.getInstance();
        game.modules.family.models.FamilyProxy.getInstance();
        ModuleManager.show(ModuleNames.CREATE_ROLE, this);
        game.modules.task.models.TaskProxy.getInstance().init();
        game.modules.skill.models.SkillProxy.getInstance().init();
        game.modules.ranKingList.models.RanKingListProxy.getInstance().init();
        game.modules.redPacket.models.RedPacketProxy.getInstance().init();
        ModuleManager.loadModuleExecute(ModuleNames.RED_PACKET, this);//预先载入红包系统
        game.modules.setBasics.models.SetBasicsProxy.getInstance().init(this);
        game.modules.guaji.models.GuaJiProxy.getInstance().init();
        game.modules.tianjixianling.models.TianJiXianLingProxy.getInstance().init();
        ModuleManager.loadModuleExecute(ModuleNames.TIAN_JI_XIAN_LING, this);//预先载入天机仙令活动
        ModuleManager.loadModuleExecute(ModuleNames.ACTIVITY, this);
        game.modules.setBasics.models.SetBasicsProxy.getInstance().on(game.modules.setBasics.models.TYPE_LINK_BROKEN_BACK_EVENT, this, this.removeChilds);
        game.modules.xianhui.models.XianHuiProxy.getInstance().init();
        // game.modules.chat.models.ChatProxy.getInstance().init();
        // ModuleManager.show(ModuleNames.Chat,this);
        //  game.modules.mainhud.models.HudProxy.getInstance();
        //  ModuleManager.show(ModuleNames.MAIN_MENU,this);

        //Protocols._instance.c2s_CRoleList();
        //Network._instance.addHanlder(core.LOADED_PROTO, this, this.loadedProto);
    }
    /*private loadedProto(): void {
        Protocols._instance.c2s_CRoleList();
        console.log("Protocols._instance.c2s_CRoleList()");
    }*/

    // 尝试初始化场景
    private tryCreatedSceneRoot(): void {
        //初始化场景
        if (!this._sceneRoot) {
            this._sceneRoot = new SceneRoot(this);
            // this._sceneRoot.isDebug = true;
            // laya.utils.Stat.show(0,0);
            this._sceneRoot.onTouch = (cellx: number, celly: number, hitObject: any): void => {
                this.aCotrller.onSceneTouch(cellx, celly, hitObject, true);
            };
            //长按
            this._sceneRoot.onLongTouch = (hitObject: any): void => {
                if (hitObject) this.aCotrller.onLongSceneTouch(hitObject);
            };
            Laya.stage.addChildAt(this._sceneRoot, 0);
            this.onResize(this._clientWidth, this._clientHeight, this._clientScale, this._sceneBaseScale);
        }
        else {
            Laya.stage.addChildAt(this._sceneRoot, 0);
        }
    }
}
