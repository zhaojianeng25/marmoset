module battle {
    export class BattleScene {
        /**缩放比 */
        private battleScale: number = 1;
        /**场景对象管理器 */
        public _objMgr: SceneObjectMgr;
        /**场景 */
        public _scene: SceneRoot;
        /**场景中心点 */
        private _center: Vector2;
        /**战斗单元 */
        private _unit_list: { [key: number]: FakeUnit } = {};

        private _back_avatars: AvatarBase[];

        constructor(private _app: AppBase, private battle: Battle) {
            this._objMgr = this._app.sceneObjectMgr;
            this._scene = this._app.sceneRoot;
            this._effectInfo = [];
            let main: Vector2 = this._objMgr.mainUnit.pos;
            this._center = new Vector2();//阵列中心点

		    var tw:number=	 this._scene.camera.look_logicRight- this._scene.camera.look_logicLeft 
		    var th:number=	 this._scene.camera.look_logicBottom- this._scene.camera.look_logicTop 

            this._center.x =  this._scene.camera.look_logicLeft+tw/2  + SceneBattleRes.CENTER_OFFSETX;
            this._center.y = this._scene.camera.look_logicTop+th/2 + SceneBattleRes.CENTER_OFFSETY ;
        }

        exit(): void {
            this._scene.showBack(false);
            this.clearBuffEffectOnBattleExit();
            /** 判断战斗结果 */
            let iswin :boolean = false;
            for (var roleIndex = 1; roleIndex < 15; roleIndex++) 
            {
                 let model = this.battle.findRoleByIndex(roleIndex);
                 if(model == null) continue;
                if(model.hp > 0) iswin = true;
            }
            this.battle = null;
            if (this._effectInfo) {
                for (let i: number = 0; i < this._effectInfo.length; i++) {
                    this.clearEffect(this._effectInfo[i].target, this._effectInfo[i].effect);
                }
                this._effectInfo = null;
                this._effectWait = null;
            }
            Laya.timer.once(50, this, this.exitTeleport,[iswin]);
        }
        //退出传送
        private exitTeleport(iswin:boolean =  true): void {
            if( !this ) return ;
            Laya.timer.clear(this, this.exitTeleport);
            this._app.sceneObjectMgr.mainUnit.buffMgr.subHidingCount();
            let pos: Vector2 = game.modules.mainhud.models.HudModel.getInstance().pos;
            let mapid = game.modules.mainhud.models.HudModel.getInstance().sceneid;
            let levelNum = HudModel.getInstance().levelNum;
            if (!iswin && levelNum >= 10) 
            {//输掉战斗
                let battlefaikd = new game.modules.commonUI.BattleFaildMediator(this._app);
                battlefaikd.show();
                HudModel.getInstance().HangUpWin = false;
            } else{
                if(game.modules.mainhud.models.HudModel.getInstance().sceneid >= 1801 && game.modules.mainhud.models.HudModel.getInstance().sceneid <= 1830)
                HudModel.getInstance().taskxl = 1
                HudModel.getInstance().HangUpWin = true 
            }
            this._app.sceneObjectMgr.joinFakeMap(mapid, pos.x, pos.y);
            this._app.aCotrller.sendTeleport(mapid, pos.x, pos.y);
            ModuleManager.show(ModuleNames.MAIN_MENU, this._app);
            this._InBattleTip();
            
           
        }
        /** 战斗结束后判断是否有弹窗 */
        private _InBattleTip():void
        {
            if( ChatModel.getInstance().battleEndTips.keys.length <= 0) return;
            let keys = ChatModel.getInstance().battleEndTips.keys;
            for (var _index = 0; _index < keys.length; _index++) {
                let str = ChatModel.getInstance().battleEndTips.get(keys[_index]);
                let disappearmediators = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                disappearmediators.onShow(str);
                ChatModel.getInstance().battleEndTips.remove(keys[_index]);
                if( ChatModel.getInstance().battleEndTips.keys.length >= 1 )
                {
                    Laya.timer.once(500,this,this._InBattleTip);
                }
            }
        }
        private _effectInfo: { effect: string, target: Unit }[];                	//单独特效数据{effect:string,target:unit}
        private _effectWait: string;                	//待选择特效
        //添加角色特效
        showEffects(target: Unit | Unit[], effect: string, x: number = 0, y: number = 0, z: number = 0): void {
            if (!target || !effect) return;
            if (target instanceof Unit) {//单个对象
                if(this.battle.operate_type != OperationType.ACTION_USEITEM &&  target.hp <= 0) return;
                this.showEffect(target, effect, x, y, z);
                this._effectInfo.push({ effect: effect, target: target });
                return;
            }
            for (let i: number = 0; i < target.length; i++) {
                if(!target[i]) continue;
                if ( target[i].hp <= 0  && this.battle.operate_type != OperationType.ACTION_USEITEM) continue;
                this.showEffect(target[i], effect, x, y, z);
                this._effectInfo.push({ effect: effect, target: target[i] });
            }
        }
        //移除角色特效
        clearEffects(effect: string, isSingle: boolean = true): void {
            if (!effect) return;
            if (typeof (this._effectInfo) == "undefined" || this._effectInfo == null) return;
            for (let i: number = 0; i < this._effectInfo.length; i++) {
                if (this._effectInfo[i].effect != effect) continue;
                this.clearEffect(this._effectInfo[i].target, this._effectInfo[i].effect);
                this._effectInfo.splice(i, 1);
                if (isSingle) return;
                i--;
            }
        }
        //显示特效
        showEffect(target: Unit, name: string, x: number = 0, y: number = 0, z: number = 0): void {
            this._scene.showEffect(target, name, x, y, z);
        }
        //清理图集特效
        clearFrameEffect(target: Unit, name: string): void {
            this._scene.clearFrameEffect(target, name);
        }
        // 清理玩家的所有特效用于死亡，清理战场等
        clearAllFrameEffect(target: Unit){
            this._scene.clearAllFeameEffect(target);
        }
        //清理特效
        clearEffect(target: Unit, name: string): void {
            this._scene.clearEffect(target, name);
        }
        private _frameEffectInfo: { effect: string, target: Unit,info:Array<any>,x:number,y:number,z:number }[] = [];
        //显示图集特效
        showFrameEffect(target: Unit, name: string, info: any = [], x: number = 0, y: number = 0, z: number = 0): void {
            this._scene.showFrameEffect(target, name, info, x, y, z);
            if (info.isbuff){
                 console.log("--------------_frameEffectInfo增加buff",target.name, name);
                 this._frameEffectInfo.push({ effect: name, target: target,info:info,x:x,y:y,z:z}); //存储当前特效所有信息以便变身能够利用
            }
               
        }
    
        /**
         * 战场退出清除buf特效
         */
        clearBuffEffectOnBattleExit() {
            for(let i = 0; i < 28; i ++){
                var fiightModel : FightModel =this.battle.findRoleByIndex(i);
                if (fiightModel)this.clearAllFrameEffect(fiightModel.fakeUnit);
            }  
        }

        /**
         * 战斗场景动作
         * @param target 模型
         * @param atnStus 动作枚举
         * @param func 播放结束回调
         * @param completeState 动作完成状态:0 循环,1 最后一幀,2 默认动作
         */
        battleAction(target: Unit, atnStus: number, func:Function, completeState: number = 2): void {
            this._scene.battleAction(target, atnStus, func, completeState);
        }

        //是否有指定特效
        private isHasEffect(target: Unit, effect: string): boolean {
            if (!target || !effect) return false;
            for (let i: number = 0; i < this._effectInfo.length; i++) {
                if (this._effectInfo[i].target == target && this._effectInfo[i].effect == effect) return true;
            }
            return false;
        }
        //点击地面
        onSceneTouch(cellx: number, celly: number, hitObject: any): boolean {
            if (!hitObject) {
                this.battle.judgehideSkillPanel();
                return false;//未选中
            }
            let index = this.indexOf(hitObject);
            if (index == -1) {
                return false;
            }
            this.battle.touchFightRole(index);
            this.clearEffects(this._effectWait, false);
            this._effectWait = null;
            return true;
        }
        //长按地面
        onSceneLongTouch( hitObject: any): boolean {
             let index = this.indexOf(hitObject);
            if (index == -1) {
                return false;
            }
             //模拟显示buff
            this.battle.onforBuffer(index);
        }

        indexOf(obj: FakeUnit): number {
            let index = -1;
            for (const key in this._unit_list) {
                if (this._unit_list.hasOwnProperty(key)) {
                    const unit = this._unit_list[key];
                    if (unit === obj) {
                        index = Number(key);
                        break;
                    }
                }
            }

            return index;
        }
        /**
         * 增加战斗单元
         */
        addUnit(model: FightModel): void {
            let fakeUnit = this.createFakeUnit(model);
            console.log(">>>> addUnit: ", fakeUnit, " index", model.index);
            this._unit_list[model.index] = fakeUnit;
            if(model.fighterType == FighterType.FIGHTER_MONSTER_HIDE || model.fighterType == FighterType.FIGHTER_MONSTER_NPC)
            {
                if(model.subtype == 2) //精英 
                Laya.timer.once(500,this,this.showEffects,[model.fakeUnit, SceneBattleRes.EFFECT_BLOOD_SILVER_EDGE, -19, -1, 0]); //this.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_BLOOD_SILVER_EDGE, -19, -1, 0);
            }
        }
        /**
         * 创建模型对象
         */
        createFakeUnit(model: battle.FightModel, fake?:boolean): FakeUnit {
            let fakeUnit: FakeUnit = this._objMgr.CreateFakeObject() as FakeUnit;
            fakeUnit.SetTypeId(UnitField.TYPE_ID_CREATURE);
            fakeUnit.SetEntry(model.shape);

            const oname = model.fighterName;
            if (oname && oname.length) {
                fakeUnit.SetName(oname);
            } else if ( model.dataID || model.shape ) {
                var CMonsterConfigBaseVo :CMonsterConfigBaseVo = game.modules.guaji.models.GuaJiModel.getInstance().monstersDic[model.dataID];
                if(CMonsterConfigBaseVo)
                {
                    fakeUnit.SetName(CMonsterConfigBaseVo.name);
                }else if( model.shape )
                {
                    var cNpcShapeBaseVo: game.data.template.CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[model.shape + ""];
                    if (cNpcShapeBaseVo) {
                        fakeUnit.SetName(cNpcShapeBaseVo.name);
                    }
                }
               
            }
            if(model.fighterType == FighterType.FIGHTER_ROLE) //人物职业
            {
                for (let key in game.scene.models.SceneModel.getInstance().rolelist.keys) 
                {
				  let role: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.scene.models.SceneModel.getInstance().rolelist.keys[key]);
                  if (role.rolebasicOctets.roleid == model.dataID) 
                 {
                     model.school = fakeUnit.School = 10 + (role.rolebasicOctets.dirandschool & 0x0F);
                     fakeUnit.Shape = model.shape;
                 }
                }
            }
            fakeUnit.isBattleRole = true;
            fakeUnit.needShowAnger = false;
            fakeUnit.scale = 1;
            fakeUnit.SetLevel(model.level);
            this.setComponent(model,fakeUnit);
            fakeUnit.SetSpeed(200);

            const is_bottom = model.isBottom;
           
           // console.log("------------name = ", oname, "  pos = ", p.x, "  p.y = ", p.y, "  is_bottom =  ", is_bottom);
            
            let toward ;
            let p;
            if( model.index <= BattleConst.MAX_ROLE)
            {
                fakeUnit.needShowName = true;
                p = this.getMapPoint(model.pos - 1, is_bottom);
                // 朝向
                toward = -155;
                if (!is_bottom) {
                    toward = 58;
                }
            }else if( model.index <= BattleConst.WATCHER_MIDDLE_POS) //观战上阵位朝向
            {
                p = this.getMapPoint(model.index, is_bottom);
                fakeUnit.needShowName = false;
                toward = 155;
            }else  //观战下阵位朝向
            {
                fakeUnit.needShowName = false;
                p = this.getMapPoint(model.index, is_bottom);
                toward = -58;
            }
            fakeUnit.SetPos(p.x, p.y);
            fakeUnit.toward = toward;
            fakeUnit.hp = model.hp;
            fakeUnit.maxHp = model.maxhp;
            fakeUnit.maxAnger = 4;
            fakeUnit.isSelfRole = is_bottom;
            fakeUnit.battle = 1;
            fakeUnit.fristUpdate();
            if (!fake) {         
                model.fakeUnit = fakeUnit;   
            }
            if( model.is_self_role && game.scene.models.SceneModel.getInstance().kuileiOccupation.indexOf(LoginModel.getInstance().roleDetail.school) != -1)
              this._addKuiLei(fakeUnit);
            return fakeUnit;
        }
        /** 职业附带傀儡 */
        _addKuiLei(unit:Unit):void
        {
            let fakeUnit: FakeUnit = this._objMgr.CreateFakeObject() as FakeUnit;
            fakeUnit.needShowName = false;
            fakeUnit.toward = unit.toward;
            fakeUnit.battle = unit.battle;
            fakeUnit.scale = unit.scale;
            fakeUnit.isBattleRole = true;
            fakeUnit.SetSpeed(unit.speed);
            fakeUnit.SetTypeId(UnitField.TYPE_ID_CREATURE);
            fakeUnit.SetEntry(1010101);
            fakeUnit.SetPos(unit.pos.x+2, unit.pos.y);
            fakeUnit.hp = 100;
            fakeUnit.fristUpdate();

        }
        /** 设置造型数据
         * @param model 创建模型  @param unit Unit对象
         */
        setComponent(model:FightModel,unit:Unit):void
        {
            if( !model || !unit || !model.components || model.components.keys.length == 0 ) return;
            for (var _index = 0; _index < model.components.keys.length; _index++) 
            {
               if(model.components.keys[_index] == SpriteComponents.SPRITE_WEAPON )
               {
                   let weaponId = model.components.get(model.components.keys[_index]);
                   let equip = StrengTheningModel.getInstance().equipEffectData[weaponId];
                   if(equip) 
                   {
                       unit.Weapon = equip.weaponid;
                    //    unit.Shape = LoginModel.getInstance().roleDetail.shape;
                    //    unit.School = LoginModel.getInstance().roleDetail.school;
                       return ;
                   }


               }
            }
        }

        /** 移除战斗单元 
         * @param FakeUnit 模型
        */
        removeFakeUint(FakeUnit: FakeUnit): void {
            this._objMgr.ReleaseObject(FakeUnit);
        }
        /**
         * 获取站位
         */
        getMapPoint(index: number, is_bottom: boolean, offestX: number = 0, offestY: number = 0): Vector2 {
            let x: number;
            let y: number;
            if(index <= BattleConst.MAX_ROLE)
            {
                if (is_bottom) {
                    x = SceneBattleRes.BOTTOM_POSX[index];
                    y = SceneBattleRes.BOTTOM_POSY[index];
                } else {
                    x = SceneBattleRes.TOP_POSX[index];
                    y = SceneBattleRes.TOP_POSY[index];
                }
            }else //观战位置
            {
                let _index =  (index - BattleConst.WATCHER_START_POS )
                x = SceneBattleRes.MIDDLE_POX[_index];
                y = SceneBattleRes.MIDDLE_POY[_index];
            }
           
           // console.log("----------x = ", x, "------------y = ", y);
            x = this._center.x + x / (this.battleScale * SceneRes.CELL_WIDTH);
            y = this._center.y + y / (this.battleScale * SceneRes.CELL_HEIGHT);
            //console.log("----------------------index = ", index, "   x = ", x, "  y = ", y, " _center.x = ", this._center.x, "  _center.y = ", this._center.y);
            return new Vector2(x, y);
        }
        private getV3DByMapPos(posX: number, posY: number): Vector3D {
            let x: number = (posX - this._scene.camera.logicLeft) * SceneRes.CELL_WIDTH * this._scene.scaleX;
            let y: number = (posY - this._scene.camera.logicTop) * SceneRes.CELL_HEIGHT * this._scene.scaleY;
            var nScale: number = 0.25 / scene2d.Override2dEngine.htmlScale
            x = x * nScale;
            y = y * nScale / (Math.sin(45 * Math.PI / 180)) * -1;
            return new Vector3D(x, 0, y);
        }

        /**
		 * 战将普攻前往
		 * @param target 指定战将
		 * @param index 目标阵位下标
		 */
        public moveForward(target: FakeUnit, index: number, isBottom: boolean): number {
            let time = 25;
            let delay = 10;
            let p = this.getMapPoint(index, isBottom);
            if (isBottom)
            {
                p.x -= 3.5;
                p.y -= 3;
            }
            else{
                 p.x += 3.5;
                 p.y += 3;
            }
            this._scene.doImitateMove(target, p.x, p.y, AvatarSprite.IMITATE_MOVE_TYPE_MOVE, time, delay);
            this.battleAction(target, AvatarData.ACTION_WALK, ()=>{});
            return time + delay;
        }
        /**
         * 战将普攻回阵位
         * @param target 指定战将
         * @param index 目标阵位下标
         */
        public moveBack(target: FakeUnit, index: number, isBottom: boolean): number {
            let time = 25;
            let delay = 10;
            let p = this.getMapPoint(index, isBottom);
            // if (Math.abs(target.GetPosX() - p.x) < 1 && Math.abs(target.GetPosY() - p.y) < 1) return 0; //返回原地奔跑动作需要复位
            this._scene.doImitateMove(target, p.x, p.y, AvatarSprite.IMITATE_MOVE_TYPE_MOVE, time, delay);
            this.battleAction(target, AvatarData.STATE_RETREAT, ()=>{
            });
            return time + delay;
        }

        /** 战将中心点返回 */
        public moveHalfForward(target: FakeUnit,ypos:number,xpos:number):number
        {
            let time = 750;
            let delay = 10;
            // let p = this.getMapPoint(index, isBottom);
            this._scene.doImitateMove(target, xpos, ypos, AvatarSprite.IMITATE_MOVE_TYPE_RUN, time, delay);
            this.battleAction(target, AvatarData.STATE_RUNNING, ()=>{}, 0);
            return time + delay;
        }
        /** 战将逃跑移动 */
        public moveRun(target: FakeUnit,ypos:number,xpos:number,time:number = 1500,delay:number = 0,continued:number = 1500):number
        {
            // let time = 1500;
            // let delay = 1000;
            //调整朝向
            target.toward = 58;
            this._scene.doImitateMove(target, xpos, ypos, AvatarSprite.IMITATE_MOVE_TYPE_RUN, time, delay);
            this.battleAction(target, AvatarData.STATE_RUNNING, ()=>{},0);
            Laya.timer.once(continued,this,()=>{ if(this && target) target.toward = -155});
            return (time + delay);
        }
         /** 战将捕捉移动 */
        public moveCatchRun(target: FakeUnit, index: number, isBottom: boolean):number
        {
           let time = 1500;
            let delay = 10;
            let p = this.getMapPoint(index, isBottom);
            if (isBottom)
            {
                p.x -= 3.5;
                p.y -= 3;
            }
            else{
                 p.x += 3.5;
                 p.y += 3;
            }
            this.battleAction(target, AvatarData.STATE_RUNNING, ()=>{},0);
            this._scene.doImitateMove(target, p.x, p.y, AvatarSprite.IMITATE_MOVE_TYPE_RUN, time, delay);
            return time + delay;
        }
    }
}