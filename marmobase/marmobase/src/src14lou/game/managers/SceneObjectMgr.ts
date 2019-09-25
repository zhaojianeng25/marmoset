/**
* 场景对象管理器
*/
module game.managers {

    export class SceneObjectMgr extends core.obj.GuidObjectTable {

        /** 自定义事件 */
        //对象被移除
        static DELETE_OBJECT: string = "delete_object";
        //地图传送
        static MAP_TELEPORT: string = "map_teleport";
        //主Unit对象更新事件
        static MAINUNIT_UPDATE: string = "mainunit_update";
        //战利品拾取事件
        static LOOT_PICK_RESULT: string = "loot_pick_result";


        static getPrefix(s: string): string {
            let idx: number = s.indexOf(".")
            return idx == -1 ? "" : s.substr(0, idx);
        }

        // 应用程序引用
        private _app: AppBase;
        constructor(app: AppBase) {
            super();
            this._app = app;
        }

        public isInBattle:boolean = false;
        //地图id
        public mapid: number = 0;
        //地图对象
        public mapInfo: MapInfo;
        //地图信息
        public mapAssetInfo: game.data.MapAssetInfo;      
        //副本代理
        private _instanceAgent: game.scene.InstanceAgent;
        get instanceAgent(): game.scene.InstanceAgent {
            return this._instanceAgent;
        }
        // 剧情管理器
        private _sceneStoryMgr: SceneStoryMgr;
        get sceneStoryMgr(): SceneStoryMgr {
            return this._sceneStoryMgr;
        }

        //主玩家对象
        public mainUnit_guid: string;
        public mainUnit: Unit;
        /** 傀儡对象 */
        public kuileiUnit: Unit;
        /** 傀儡 */
        public kuileiArr: Array<Unit> = [];
        // 获取摄像机跟随对象
        get followUnit(): Unit {
            return this.sceneStoryMgr && this.sceneStoryMgr.followUnit ? this.sceneStoryMgr.followUnit : this.mainUnit
        }


        //当前选中对象oid
        private _selectOid: number = 0;
        set selectOid(v: number) {
            this._selectOid = v;
            if (this.mainUnit && v == this.mainUnit.oid) {
                this._selectUnit = null;
            }
            else {
                this._selectUnit = this.FindUnit(v);
            }
        }
        get selectOid(): number {
            return this._selectOid;
        }
        //当前选中对象
        private _selectUnit: Unit;
        get selectUnit(): Unit {
            return this._selectUnit;
        }

        // 根据整型或者字符串GUID
        FindUnit(oid: number): Unit {
            let guid: string = this._u_2_guid[oid];
            return this._objs[guid] as Unit;
        }

        // 是否断线重连中
        private _dropReConnectIng: boolean = false;
        set dropReConnectIng(v: boolean) {
            this._dropReConnectIng = v;
        }

        init(mapid: number): void {
            //地图素材信息
            if (!this.mapAssetInfo) {
                this.mapAssetInfo = new game.data.MapAssetInfo();
            }
            //副本代理
            if (!this._instanceAgent) {
                this._instanceAgent = new game.scene.InstanceAgent(this._app);
            }
            //剧情管理器
            if (!this._sceneStoryMgr) {
                this._sceneStoryMgr = new game.managers.SceneStoryMgr(this._app);
            }
            //let mapid = 1;
            logd("玩家初始信息 mapid:" + mapid);
            if (mapid != 0) {
                // let KuafuData = playerdata.GetKuafuData();
                // if (!KuafuData || !KuafuData.length) {
                this.continueTeleport(mapid);
                // }
                // else {
                //     logd("有跨服数据不主动传送");
                // }
            }
        }

        continueTeleport(mapid: number): void {
            //let mapid = 1608
            if (mapid != 0) {
                // let KuafuData = playerdata.GetKuafuData();
                let pos: Vector2 = new Vector2();
                pos = game.modules.mainhud.models.HudModel.getInstance().pos;
                // 没有的话，就初始化，并存到远程存储咯
                if (!pos.x || !pos.y) {
                    pos.x = MapInfo.MAP_XINSHOUCUN_POSX;
                    pos.y = MapInfo.MAP_XINSHOUCUN_POSY;
                }
                let posX = pos.x;
                let posY = pos.y;
                let teleportPar = "";
                logd("发起传送 mapid:" + mapid + " pos:" + posX + "," + posY + " par:" + teleportPar);
                this._app.aCotrller.stack(new WaitTeleteportStack(this._app, mapid, posX, posY, teleportPar));
            }
        }

        unInit(): void {
        }

        // 添加监听
        addNetworkListener(network: Network): void {
            //network.addHanlder(Protocols.SMSG_GRID_UPDATE_DATA, this, this.onGridUpdateData);
            //network.addHanlder(Protocols.SMSG_JOIN_MAP_RESULT, this, this.onJoinMapResult);
            //network.addHanlder(Protocols.MSG_MOVE_STOP, this, this.onMoveStop);
        }

        // 移除监听
        removeNetworkListener(network: Network): void {
            //network.removeHanlder(Protocols.SMSG_GRID_UPDATE_DATA, this, this.onGridUpdateData);
            //network.removeHanlder(Protocols.SMSG_JOIN_MAP_RESULT, this, this.onJoinMapResult);
            //network.removeHanlder(Protocols.MSG_MOVE_STOP, this, this.onMoveStop);
        }

        // 对象更新包应用
        private onGridUpdateData(optcode: number, msg: any): void {
            if (this._dropReConnectIng) {
                // 断线重连的需要清理下旧数据
                this.clearObjs();
                this._dropReConnectIng = false;
            }
            this.ApplyBlock(msg);
        }

        // 加入地图返回
        private onJoinMapResult(optcode: number, msg: hanlder.s2c_join_map_result): void {
            logd("onJoinMapResult", msg.guid, msg.mapid);
            let stack = this._app.aCotrller.curStack;
            if (stack instanceof WaitTeleteportStack) {
                stack.onJoinMapResult(msg.mapid);
            }
            this.mainUnit_guid = msg.guid;
            this.mainUnit = this.Get(msg.guid) as Unit;
            if (!this.mainUnit) {
                loge("主Unit未找到！");
                return;
            }
            if (this.mainUnit && this.mainUnit.buffMgr) this.mainUnit.buffMgr.isSelf = true;
            //Unit对象更新事件抛出
            this.event(SceneObjectMgr.MAINUNIT_UPDATE);
        }

        // 停止移动
        private onMoveStop(optcode: number, msg: hanlder.both_move_stop): void {
            let unit: Unit = this.FindUnit(msg.oid);

            if (!unit)
                return;

            unit.MoveStop(unit.faceToward, msg.target_x, msg.target_y);
        }

        /**
         * 心跳
         */
        public update(diff: number) {
            diff /= 1000;
            // this._app.floating = this.mainUnit ? (this.mainUnit.mount != 0) : false;
            this.ForEachObject(function (other: any) {
                other instanceof Unit && other.Update(diff);
            });

            if (this.mapInfo) {
                let newMapid: number = this.mapInfo.id;
                if (newMapid != 0 && newMapid != this.mapid) {
                    this.mapid = newMapid;
                    //副本代理 清理
                    this._instanceAgent.clear();
                    // 剧情
                    this._sceneStoryMgr.clear();
                    //加载素材信息
                    this.mapAssetInfo.onLoadedComplete = () => {
                        //应用一下移动缓存
                        this.applyTargetPosChangeCache();
                        this._sceneStoryMgr.init();//然后SceneBattle.init()
                        //副本代理
                        this._instanceAgent.init();
                        //触发传送事件
                        this.event(SceneObjectMgr.MAP_TELEPORT, newMapid);
                    }
                    this.mapAssetInfo.load(newMapid);
                }
            }

            this._sceneStoryMgr && this._sceneStoryMgr.update(diff);
        }

        // 创建对象
        CreateObject(k: string, u: number): GuidObject {
            // logd("SceneObjectMgr:CreateObject guid:" + k + ", oid:" + u);
            let obj: GuidObject;
            var prefix: String = k.charAt(0);//ObjectMgr.getPrefix(k);

            switch (prefix) {
                case GlobalDef.TYPE_UNIT:
                    if (this.getPrefix(k) == SceneObjectMgr._fakeGuidPrefix) {
                        obj = new FakeUnit();
                    }
                    else {
                        obj = new Unit();

                    }
                    (<Unit>obj).onTargetPosChange = (o: Unit, x: number, y: number) => {
                        this.onUnitTargetPosChange(o, x, y);
                    }

                    break;
                case GlobalDef.TYPE_MAP:
                    // logd("create map info", k, u)
                    this.mapInfo = new MapInfo();
                    obj = this.mapInfo;
                    break;
                default:
                    obj = new GuidObject();
                    break;
            }
            obj.guid = k;
            obj.oid = u;
            this.AttachObject(obj);
            return obj;
        }
        private getPrefix(s: string): string {
            let idx: number = s.indexOf(".")
            return idx == -1 ? "" : s.substr(0, idx);
        }

        ReleaseObject(o: GuidObject): void {
            if (!o) return;
            let k: string = o.guid;
            //  logd("SceneObjectMgr:ReleaseObject guid:" + k);
            switch (k.charAt(0)) {
                case GlobalDef.TYPE_UNIT:
                    if (this.mainUnit == o) {
                        this.mainUnit = null;
                    }
                    break;
                case GlobalDef.TYPE_MAP:
                    // logd('release map info', o.guid)
                    if (this.mapInfo == o) {
                        this.mapInfo = null;
                        this.mapid = 0;
                        //触发传送事件
                        this.event(SceneObjectMgr.MAP_TELEPORT, 0);
                    }
                    break;
                default:
                    break;
            }
            super.ReleaseObject(o);

            //事件触发
            this.event(SceneObjectMgr.DELETE_OBJECT, o);
        }

        // 移动缓存
        private _unitTargetPosChangeCache = {};
        private applyTargetPosChangeCache(): void {
            for (let key in this._unitTargetPosChangeCache) {
                let v = this._unitTargetPosChangeCache[key]
                if (v) {
                    this.onUnitTargetPosChange(v[0], v[1], v[2]);
                }
                delete this._unitTargetPosChangeCache[key];
            }        
        }

        // 生物目标位置发生改变
        onUnitTargetPosChange(o: Unit, tx: number, ty: number): void {
            if (tx != 0 && ty != 0  && 	!this._app.sceneObjectMgr.mapInfo.inBattle) {
                // logd(o.GetName(), o.guid, o.getMapId(), 'mapAssetInfo.id', this.mapAssetInfo ? this.mapAssetInfo.id : 0);             
                if (!this.mapAssetInfo || !this.mapAssetInfo.trukPath /*|| o.mapid != this.mapAssetInfo.id*/) {
                    // 缓存起来                    
                    let cache = this._unitTargetPosChangeCache[o.oid];
                    if (!cache) {
                        cache = [];
                        this._unitTargetPosChangeCache[o.oid] = cache;
                    }
                    cache[0] = o;
                    cache[1] = tx;
                    cache[2] = ty;
                    return;
                }
                let x = Math.floor(o.pos.x);
                let y = Math.floor(o.pos.y);
                let path: Array<number>;
                if (x == tx && y == ty) {
                    path = [tx, ty];
                }
                else {
                    path = this.mapAssetInfo.trukPath.find(x, y, tx, ty, 0);
                    if (AStar.isInvalidPath(path)) {
                        //无效路径
                        logd("寻路失败 ", Math.floor(o.pos.x), Math.floor(o.pos.y), tx, ty)
                        path = [x, y, tx, ty];
                        this._app.sceneObjectMgr.mainUnit.SetMoveStatus(0)
                        return;
                    }
                }
                // 
                let pos: Vector2 = new Vector2();
                pos.x = tx;
                pos.y = ty;
                if (this.mainUnit.name == o.name) {
                    console.log("-------------------move 1");
                    RequesterProtocols._instance.c2s_role_move(o.pos, pos, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
                    game.scene.models.SceneProxy.getInstance().event(game.scene.models.MOVE_PATH, [path]);
                    o.isother = 1;//自己玩家
                }
                else {
                    o.isother = 0;
                }
                if (this._app.sceneRoot.isnpc == 1) {
                    o.istalk = 1
                }
                else if (this._app.sceneRoot.isnpc == 0) {
                    o.istalk = 0
                }
                o.MoveToPath(path, 0)
            } else {
                o.MoveStop();
            }
        }

        //获取附近unit
        getNearUnit(o: Unit): Unit {
            let nearUnit: Unit;
            let misDis: number = Number.MAX_VALUE;
            let mainGuid: string = this.mainUnit_guid;
            this.ForEachObject(function (other: any) {
                if (!(other instanceof game.object.Unit)) return;
                let dis: number = o.Distance(other);
                if (other.guid != mainGuid && dis < misDis) {
                    misDis = dis;
                    nearUnit = other;
                }
            });
            return nearUnit;
        }

        //获取附近怪（含boss）
        getNearMonsterUnit(o: Unit): Unit {
            if (!o) return null;
            let nearUnit: Unit;
            let misDis: number = Number.MAX_VALUE;
            let mainGuid: string = this.mainUnit_guid;
            this.ForEachObject(function (other: any) {
                if (!(other instanceof game.object.Unit)) return;
                let dis: number = o.Distance(other);
                if ((other.isBoss || other.isMonster) && !other.isPet && dis < misDis) {
                    misDis = dis;
                    nearUnit = other;
                }
            });
            return nearUnit;
        }

        //获取附近unit
        getNearCanAttackUnit(o: Unit): Unit {
            let nearUnit: Unit;
            let misDis: number = Number.MAX_VALUE;
            let mainGuid: string = this.mainUnit_guid;
            this.ForEachObject(function (other: any) {
                if (!(other instanceof game.object.Unit)) return;
                let dis: number = o.Distance(other);
                if (other.isCanAttackType && !other.isDied && other.guid != mainGuid && dis < misDis) {
                    misDis = dis;
                    nearUnit = other;
                }
            });
            return nearUnit;
        }

        //根据guid取Unit
        getUnitByGuid(o_guid: string): Unit {
            let needUnit: Unit;
            this.ForEachObject(function (other: any) {
                if (!(other instanceof game.object.Unit)) return;
                if (other.guid == o_guid) {
                    needUnit = other;
                }
            });

            return needUnit;
        }

        //根据guid取Unit
        getUnitByOid(o_oid: number): Unit {
            let needUnit: Unit;
            this.ForEachObject(function (other: any) {
                if (!(other instanceof game.object.Unit)) return;
                if (other.oid == o_oid) {
                    needUnit = other;
                }
            });
            return needUnit;
        }

        //根据模板id 取最近unit
        getUnitByEntry(o: Unit, temp_id: number): Unit {
            let nearUnit: Unit;
            let misDis: number = Number.MAX_VALUE;
            this.ForEachObject(function (other: any) {
                if (!(other instanceof game.object.Unit)) return;
                let dis: number = o.Distance(other);
                if (!other.isDied && dis < misDis && temp_id == other.entryid) {
                    misDis = dis;
                    nearUnit = other;
                }
            });
            return nearUnit;
        }

        //根据模板id 随机一个unit
        getRandomUnitByEntry(o: Unit, temp_id: number): Unit {
            let arr: any[] = [];
            this.ForEachObject(function (other: any) {
                if (!(other instanceof game.object.Unit)) return;
                if (!other.isDied && temp_id == other.entryid) {
                    arr[arr.length] = other;
                }
            });
            return arr.length ? arr[MathU.randomRange(0, arr.length - 1)] : null;
        }

        //获取某unit周围(某范围内)对象个数
        getNearCountByUnit(o: Unit, radis: number): number {
            if (!o) return 0;
            let count: number = 0;
            let mainGuid: string = this.mainUnit_guid;
            this.ForEachObject(function (other: any) {
                if (!(other instanceof game.object.Unit)) return;
                let dis: number = o.Distance(other);
                if (dis < radis && !other.isNpc && !other.isGameObject && !other.isDied && other.guid != mainGuid) {
                    count++;
                }
            });
            return count;
        }

        //设置玩家说话内容
        setPlayerSayInfo(oid: number, content: any[]): void {
            if (!oid) return;
            this.ForEachObject(function (other: any) {
                if (!(other instanceof game.object.Unit) || !other.isPlayer || other.oid != oid) return;
                other.sayContent = content;
                other.sayFailTime = Laya.timer.currTimer + 3500;
            });
        }

        // 清理
        clear(): void {
            this.clearObjs();
        }

        // 清理对象	
        clearObjs(): void {
            this.ForEachObject((other: any) => {
                if (!(other instanceof game.object.Unit)) return;
                //事件触发
                this.event(SceneObjectMgr.DELETE_OBJECT, other);
            });
            super.clearObjs();
            //副本代理
            if (this._instanceAgent) {
                this._instanceAgent.clear();
            }
        }

        //////////////////////////剧情相关接口/////////////////////////
        private static _fakeLastUID: number = 4294967295;
        private static _fakeGuidPrefix = "unit_fake"
        // 创建假unit对象
        CreateFakeObject(): GuidObject {
            SceneObjectMgr._fakeLastUID--;
            let uid = SceneObjectMgr._fakeLastUID;
            let guid = SceneObjectMgr._fakeGuidPrefix + "." + uid;
            return this.CreateObject(guid, uid);
        }
        // 清理假unit对象
        clearFakeObject(): void {
            this.ForEachObject((obj: any) => {
                if (obj instanceof FakeUnit) {
                    this.ReleaseObject(obj);
                }
            })
        }

        //////////////////////////客户端实现场景功能/////////////////////////
        //假地图对象id
        private static _fakeMapLastUID: number = 4294967295;
        private static _unitLastUID: number = 4294967295;
        //加入地图
        public joinFakeMap(mapid: number, px: number, py: number): void {           
            //释放旧的地图对象           
            this._app.aCotrller.stop()
            if (this.mapInfo) {
                this.ReleaseObject(this.mapInfo);
            }
            //释放主玩家unit
            if (this.mainUnit) {
                this.ReleaseObject(this.mainUnit);
            }
            let mapinfos: MapConfigBaseVo = MapModel.getInstance().MapConfigData[mapid]
            let newmapid
            if (mapinfos) {
                newmapid = parseInt(mapinfos.resdir)
            }
            else {
                newmapid = mapid
            }
            //加入新的地图对象
            SceneObjectMgr._fakeMapLastUID--;
            let mid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid//SceneObjectMgr._fakeMapLastUID;//
            let mguid = GlobalDef.TYPE_MAP + "." + mid;// game.modules.createrole.models.LoginModel.getInstance().roleDetail.rolename//
            this.CreateObject(mguid, mid);
            if (this.mapInfo) {
                this.mapInfo.SetMapID(newmapid);
                this.mapInfo.firstUpdate();
            }        
            //加入新的玩家对象
            SceneObjectMgr._unitLastUID--;
            let uid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
            let guid = GlobalDef.TYPE_UNIT + "." + uid;
            let unit = this.CreateObject(guid, uid);
            if (unit instanceof Unit) {
                unit.instanceid = "0;" + newmapid;
                unit.typeid = UnitField.TYPE_ID_PLAYER;
                unit.SetPosX(px);
                unit.SetPosY(py);
                unit.SetPos(px, py);
                unit.SetToward(1);
                unit.SetToward2(1);
                let role: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape]
                unit.entryid = parseInt(role.shape)//game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape;
                unit.speed = 120;
                unit.liveStatus = UnitField.LIVE_STATUS_OK;
                //主玩家数据设置
                unit.sex = 1;
                unit.SetLevel(1);  
                BagModel.UnitWeapon(unit);            
                unit.SetName(game.modules.createrole.models.LoginModel.getInstance().roleDetail.rolename, true);
                let roles: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
                if (roles) {//先后顺序不固定导致需要该判断
                    let team: game.scene.models.TeamOctetsVo = roles.rolebasicOctets.datas.get(2)
                    if (team) {
                        if (team.teamindexstate > 0) {//在队伍中 暂离的话值为负数
                            if ((team.teamindexstate >> 4) == 1) {//141216
                                unit.captain = 1
                            }
                            else {
                                unit.captain = 0
                            }
                        }
                    }
                    else {
                        unit.captain = -1
                    }
                }
                else {//消除队长标志
                    game.scene.models.SceneProxy.getInstance().on(game.scene.models.MODEL_CREATE, this, this.biaozhi, [unit])
                }
                //如果有称谓需加入
                if( LoginModel.getInstance().roleDetail.title != -1) this._updateRoleTitle(unit, LoginModel.getInstance().roleDetail.title);
            }
            //加入地图后
            let msg: hanlder.s2c_join_map_result = new hanlder.s2c_join_map_result();
            msg.guid = unit ? unit.guid : "";
            msg.mapid = newmapid;
            this.onJoinMapResult(RequesterProtocols.SMSG_JOIN_MAP_RESULT, msg)
            let allpost:Array<any> =[];
            Laya.timer.clear(this, this.ishangup)//先清除定时器                 
            this._app.sceneRoot.hangup = 0;
            var _isstar = LocalStorage.getItem("isstarAutoGuaJi" + game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);           
            if ( !game.modules.mainhud.models.HudModel.getInstance().HangUpWin ) {/**若角色血量为1 则该角色死亡过,不进行挂机处理 */
                Laya.timer.clear(this, this.ishangup)
                this._app.sceneRoot.hangup = 0
                AutoHangUpModels.getInstance().isstar = parseInt(_isstar)
                this._app.sceneObjectMgr.mainUnit.xunluo = 0
                this._app.sceneObjectMgr.mainUnit.stopwalk = 0            
            }
            else if (HudModel.getInstance().taskxl == 1  && newmapid != 1001) {//任务进行的挂机巡逻 1巡逻状态 2为在巡逻时进行地图跳转，保持挂机
                Laya.timer.loop(1000, this, this.ishangup)            
                this.ishangup(newmapid)
            }
            else if (game.modules.mainhud.models.HudModel.getInstance().sceneid >= 1801 && game.modules.mainhud.models.HudModel.getInstance().sceneid <= 1830 && newmapid != 1001) {//挂机地图延迟进入自动巡逻
                AutoHangUpModels.getInstance().isstar = parseInt(_isstar)
                console.log(HudModel.getInstance().taskxl)
                if (HudModel.getInstance().taskxl == 1 ) {
                    this._app.sceneObjectMgr.mainUnit.xunluo = 1
                }
                /** 首次进入地图 判断是否挂机 */
                if( LocalStorage.getJSON(LoginModel.getInstance().roleDetail.roleid+"_HandUp") || game.modules.guaji.models.GuaJiModel.getInstance().fuzhuGuaji)
                {
                    Laya.timer.loop(1000, this, this.ishangup)
                    if( game.modules.guaji.models.GuaJiModel.getInstance().fuzhuGuaji )
                     game.modules.guaji.models.GuaJiModel.getInstance().fuzhuGuaji = false;
                }
                
            }
            else if (this._app.sceneObjectMgr.mainUnit.xunluo == 3) {//巡逻状态时跳转到其他地图关闭巡逻状态
                this._app.sceneObjectMgr.mainUnit.xunluo = 2
                this._app.sceneRoot.hangup = 0
                AutoHangUpModels.getInstance().isstar = parseInt(_isstar)                
            }
            else {
                this._app.sceneRoot.hangup = 0
                this._app.sceneObjectMgr.mainUnit.xunluo = 2
                Laya.timer.clear(this, this.ishangup)                
            }
           
               Laya.timer.once(1000,this,() =>{
                 // 用于断线重连，进入场景。让服务器检查是否在战斗中
                 RequesterProtocols._instance.c2s_CAfterEnterWorld();    
               } 
               )
                      
        }
        /** 刷新角色称谓
         * @param unit 主玩家Unit
         * @param titleid 称谓id
         *  */  
        private _updateRoleTitle(unit:Unit,titleid:number):void
		{
			let titleinfo: CTitleConfigBaseVo = RoleInfoModel.getInstance().CRoleTitleBinDic[titleid];
            if( titleinfo )
            {
                let clo = titleinfo.fontcolor;
                let arr = clo.split("#");
                unit.appellation = "["+arr[1]+"]" + titleinfo.titlename;
            }
		}    
        /**队长标志  */
        public biaozhi(unit) {
            let roles: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
            if (roles) {
                let team: game.scene.models.TeamOctetsVo = roles.rolebasicOctets.datas.get(2)
                if (team) {
                    if (team.teamindexstate > 0) {//在队伍中 暂离的话值为负数
                        if ((team.teamindexstate >> 4) == 1) {//141216
                            unit.captain = 1
                        }
                        else {
                            unit.captain = 0
                        }
                    }
                }
                else {
                    unit.captain = -1
                }
                game.scene.models.SceneProxy.getInstance().off(game.scene.models.MODEL_CREATE, this, this.biaozhi)
            }
        }
        /**若在挂机地图则直接进行挂机处理*/  
        public ishangup(mapid?) {       
            if (HudModel.getInstance().taskxl == 1) {//是否自动巡逻
                this._app.sceneRoot.hangup = 0                  
                if (mapid != 1001) {
                    this._app.sceneObjectMgr.mainUnit.xunluo = 1
                    this._app.sceneRoot.hangup = 1
                    this._app.sceneObjectMgr.mainUnit.stopwalk = 0
                }
                else {
                    this._app.sceneObjectMgr.mainUnit.xunluo = 2
                    var _isstar = LocalStorage.getItem("isstarAutoGuaJi" + game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
                    AutoHangUpModels.getInstance().isstar = parseInt(_isstar)
                }
                Laya.timer.clear(this, this.ishangup)
                return;
            }
            //是否在挂机地图
            if (game.modules.mainhud.models.HudModel.getInstance().sceneid >= 1801 && game.modules.mainhud.models.HudModel.getInstance().sceneid <= 1830) {
                this._app.sceneRoot.hangup = 1
                this._app.sceneObjectMgr.mainUnit.stopwalk = 0
                this._app.sceneObjectMgr.mainUnit.xunluo = 1
                HudModel.getInstance().taskxl = 1
                Laya.timer.clear(this, this.ishangup)
                if( !LocalStorage.getJSON(LoginModel.getInstance().roleDetail.roleid+"_HandUp"))
                LocalStorage.setJSON(LoginModel.getInstance().roleDetail.roleid+"_HandUp",true);
            }
            else {
                this._app.sceneRoot.hangup = 0
                this._app.sceneObjectMgr.mainUnit.stopwalk = 1
                this._app.sceneObjectMgr.mainUnit.xunluo = 0
                LocalStorage.setJSON(LoginModel.getInstance().roleDetail.roleid+"_HandUp",false);
            }
            Laya.timer.clear(this, this.ishangup)
        }
    }
}
