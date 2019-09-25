module game.story{
	/**
	 * 战斗场景
	 * name 王谦
	 */
	export class SceneBattle extends Base{
	// 	private _isHAxisX:boolean;					//x轴即是水平
	// 	private _isHAxisY:boolean;					//x轴不是水平
	// 	private _scene:SceneRoot;					//场景
	// 	private _objMgr:SceneObjectMgr;				//场景对象管理器
	// 	private _fires:any[];						//场景特效
	// 	private _center:Vector2;					//场景中心点
	// 	private _isFightReady:boolean;				//战斗是否准备好
	// 	private _isUIReady:boolean;					//战斗场景UI准备好了
	// 	private _isAuto:boolean;					//自动战斗
	// 	private _topRoles:FakeUnit[];				//上阵位战将
	// 	private _bottomRoles:FakeUnit[];			//下阵位战将
	// 	private _effectInfo:any[];					//单独特效数据{effect:string,target:unit}
	// 	private _effectWait:string;					//待选择特效
	// 	private _timer:Timer;						//战斗时钟
	// 	private _curRound:number;					//当前回合
	// 	private _spellId:number;					//当前选中技能
	// 	private _battleInfo:BattleInfo;				//当前战斗数据
	// 	private _curHurt:BattleHurt;				//当前伤害
	// 	private _isContinue:boolean;				//是否跳过当前伤害
	// 	private _castUnit:FakeUnit;					//出手者unit
	// 	private _targetUnits:FakeUnit[];			//受击者unit列表
	// 	private _spell_T:any;						//技能模板
	// 	private _follows:number[];					//后续表现技能
	// 	private _isNear:boolean;					//是否近战攻击
	// 	private _special:boolean;					//是否特殊技能
	// 	private _curHit:number;						//当前伤害数据
	// 	private _isAllDied:boolean;					//已经全死了

	// 	constructor(app:AppBase){
	// 		super(app);
	// 		this.haveSelfLookRule = true;
	// 	}
	// 	//退出
	// 	exit():void{
	// 		this.clear();
	// 	}
	// 	// 清理
	// 	clear():void{
	// 		super.clear();
	// 		if(this._timer){
	// 			this._timer.clear(this, this.enterRole);
	// 			SceneBattleRes.clearDelayPlay(this._timer, this);
	// 			this._timer = null;
	// 		}
	// 		this.clearSceneEffectFires();
	// 		if(this._effectInfo){
	// 			for(let i:number = 0; i < this._effectInfo.length; i++){
	// 				this.clearEffect(this._effectInfo[i].target, this._effectInfo[i].effect);
	// 			}
	// 			this._effectInfo = null;
	// 			this._effectWait = null;
	// 		}
	// 		if(this._topRoles){
	// 			for(let i:number = 0; i < this._topRoles.length; i++){
	// 				if(!this._topRoles[i]) continue;
	// 				this._objMgr.ReleaseObject(this._topRoles[i]);
	// 				this._topRoles[i] = null;
	// 			}
	// 			this._topRoles = null;
	// 		}
	// 		if(this._bottomRoles){
	// 			for(let i:number = 0; i < this._bottomRoles.length; i++){
	// 				if(!this._bottomRoles[i]) continue;
	// 				this._objMgr.ReleaseObject(this._bottomRoles[i]);
	// 				this._bottomRoles[i] = null;
	// 			}
	// 			this._bottomRoles = null;
	// 		}
	// 		if(this._mainFakeUnit){
	// 			this._objMgr.ReleaseObject(this._mainFakeUnit);
	// 			this._mainFakeUnit = null;
	// 		}
	// 		if(this._scene){
	// 			this._scene = null;
	// 		}
	// 		this.needJieChiCamer = false;
	// 		this._objMgr = null;
	// 		this._center = null;
	// 		this._castUnit = null;
	// 		this._targetUnits = null;
	// 		this._battleInfo = null;
	// 		this._curHurt = null;
	// 		this._spell_T = null;
	// 		this._follows = null;
	// 		this._curRound = this._spellId = this._curHit = 0;
	// 		this._isHAxisX = this._isHAxisY = this._isFightReady = this._isUIReady = this._isAuto = this._isContinue = this._isNear = this._special = this._isAllDied = false;
	// 		Laya.timer.once(50, this, this.exitTeleport);
	// 	}
	// 	//退出传送
	// 	private exitTeleport():void{
	// 		Laya.timer.clear(this, this.exitTeleport);
	// 		this._app.sceneObjectMgr.mainUnit.buffMgr.subHidingCount();
	// 		let pos:Vector2 = game.modules.mainhud.models.HudModel.getInstance().pos;
    //         let mapid = game.modules.mainhud.models.HudModel.getInstance().sceneid;
    //         this._app.sceneObjectMgr.joinFakeMap(mapid,pos.x,pos.y);
	// 		this._app.aCotrller.sendTeleport(mapid, pos.x, pos.y);
	// 		this._app.battleMgr.isBattleScale = false;
	// 	}
	// 	//是否可见
	// 	lookIn(obj:IAvatarObj):boolean{
	// 		return true;
	// 	}
	// 	//初始化 地图信息加载完SceneObjectMgr.update()里调用SceneStoryMgr.init()然后SceneBattle.init()
	// 	init():void{
	// 		super.init();
	// 		this._isHAxisX = true;
	// 		this._isHAxisY = false;
	// 		this._objMgr = this._app.sceneObjectMgr;
	// 		this._scene = this._app.sceneRoot;
	// 	}
	// 	//剧情3D场景加载完成 SceneRoot.onMapTelePort();然后SceneStoryMgr.onCompleteScene3D()然后SceneBattle.onCompleteScene3D()然后SceneBattle.onMainUnitUpdate()
	// 	public onCompleteScene3D():void{
	// 		if(this._objMgr.mainUnit){
	// 			 this.onMainUnitUpdate();
	// 		}else{
	// 			 this._objMgr.on(SceneObjectMgr.MAINUNIT_UPDATE, this, this.onMainUnitUpdate);
	// 		}
	// 	}
    //     //添加事件侦听
    //     protected set addListener(isAdd:boolean){
	// 		 DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_UIREADY, this, this.onUIReady);
	// 		 DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_AUTO, this, this.updateAuto);
	// 		 DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_SPELL, this, this.updateSpell);
	// 		 DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_CONTINUE, this, this.fightContinue);
	// 		 DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_EXIT, this, this.exit);
	// 	}
	// 	//战斗场景UI准备好了
	// 	private onUIReady(isAuto:boolean):void{
	// 		this._isAuto = isAuto;
	// 		if(this._isFightReady){
	// 			 this.startFight();
	// 		}
	// 		this._isUIReady = true;
	// 	}
	// 	//主玩家unit对象有更新
	// 	private onMainUnitUpdate():void{
	// 		this._timer = new Timer();
	// 		this._effectInfo = [];
	// 		this.initCamera();//初始化摄像头
	// 		this.initScene();
	// 		this.readyFight();
	// 		SceneBattleRes.delayPlay(this._timer, this, 1500, this.enterScene, 2000, this.enterScene);
	// 	}
	// 	//初始化场景
	// 	private initScene():void{
	// 		this.showSceneEffectFires();
	// 	}
	// 	//显示场景火特效
	// 	private showSceneEffectFires():void{
	// 		if(this._fires) return;
	// 		this._fires = [];
	// 		let fires:string[] = SceneBattleRes.EFFECT_FIRE;
	// 		let poss:number[] = SceneBattleRes.EFFECT_FIRE_POS;
	// 		let base:number;
	// 		for(let i:number = 0; i < fires.length; i++){
	// 			base = 3*i;
	// 			this.showEffectFire(fires[i], poss[base], -100, -poss[base+1]+100, poss[base+2]);
	// 		}
	// 	}
	// 	//清理场景火特效
	// 	private clearSceneEffectFires():void{
	// 		if(!this._fires) return;
	// 		for(let i:number = 0; i < this._fires.length; i++){
	// 			this.clearEffectFire(this._fires[i], false);
	// 		}
	// 		this._fires = null;
	// 	}
	// 	//显示场景火特效
	// 	private showEffectFire(name:string, x:number=0, y:number=0, z:number=0, scale:number=1):void{
	// 		let index:number = this._fires.length;
	// 		let data:any = this._fires[index] = {x:x, y:y, z:z, particle:null};
	// 		this._scene.avatarLayer.scene3d.addParticle('model/' + name + '.txt', scale, (v)=>{
	// 			data.particle = v;
	// 		});
	// 	}
	// 	//清理场景火特效
	// 	private clearEffectFire(fire:any, isSplice:boolean = true):void{
	// 		let index:number = this._fires.indexOf(fire);
	// 		if(index == -1) return;//不存在
	// 		if(this._fires[index].particle) this._scene.avatarLayer.scene3d.removeParticle(this._fires[index].particle);
	// 		if(isSplice) this._fires.splice(index, 1);
	// 	}
	// 	//绘制场景火特效
	// 	private onDrawEffectFire():void{
	// 		if(!this._fires) return;
	// 		let pos:Vector3D = this.getV3DByMapPos(this._mainFakeUnit.pos.x, this._mainFakeUnit.pos.y);
	// 		for(let i:number = 0; i < this._fires.length; i++){
	// 			if(!this._fires[i].particle) continue;
	// 			this._fires[i].particle.x = pos.x + this._fires[i].x;
	// 			this._fires[i].particle.z = pos.z + this._fires[i].z;
	// 			this._fires[i].particle.y = pos.y + this._fires[i].y;
	// 		}
	// 	}
	// 	//初始化摄像头
	// 	private initCamera():void{
	// 		this._objMgr.mainUnit.buffMgr.addHidingCount();//主角隐身
	// 		let main:Vector2 = this._objMgr.mainUnit.pos;
	// 		this._mainFakeUnit = this.createFakeUnit("场景中点", UnitField.TYPE_ID_PLAYER, 0, 100, main.x, main.y, 200, Direct.BOTTOM_RIGHT);
	// 		this.needJieChiCamer = true;//劫持摄像头
	// 		// 技能预加载
	// 		let spellIds:number[] = [];
	// 		let roles:BattleRole[];
	// 		let j:number, spellId:number;
	// 		for(let i:number = 0; i < FightMgr.MAX_POS; i++){
	// 			roles = this._app.battleMgr.battleRoles0;
	// 			if(i < roles.length){
	// 				for(j = 0; j < roles[i].spells.length; j++){
	// 					spellId = roles[i].spells[j].id;
	// 					if(spellIds.indexOf(spellId) == -1) spellIds.push(spellId);
	// 				}
	// 			}
	// 			roles = this._app.battleMgr.battleRoles1;
	// 			if(i < roles.length){
	// 				for(j = 0; j < roles[i].spells.length; j++){
	// 					spellId = roles[i].spells[j].id;
	// 					if(spellIds.indexOf(spellId) == -1) spellIds.push(spellId);
	// 				}
	// 			}
	// 		}
	// 		let temp:any;
	// 		for(let i:number = 0; i < spellIds.length; i++){
	// 			spellId = spellIds[i];//战将技能
	// 			temp = Template.getSkillsTempById(spellId);
	// 			if(!temp) continue;
	// 			this.preLoadSkill(temp);
	// 			if(!temp.follow || !temp.follow.length) continue;
	// 			for(j = 0; j < temp.follow.length; j++){
	// 				spellId = temp.follow[j];//武将后续表现技能
	// 				if(!spellId || spellIds.indexOf(spellId)!=-1) continue;//已加载
	// 				spellIds.push(spellId);
	// 				this.preLoadSkill(Template.getSkillsTempById(spellId));
	// 			}
	// 		}
	// 		if(spellIds.indexOf(SceneBattleRes.BEATEN_SPELL)==-1){
	// 			this.preLoadSkill(Template.getSkillsTempById(SceneBattleRes.BEATEN_SPELL));//通用受击
	// 		}
	// 		this.preLoadSkill(Template.getSkillsTempById(1015));//女弓手受击
	// 	}
	// 	//预加载技能
	// 	private preLoadSkill(temp:any):void{
	// 		if(!temp || !temp.icon || !temp.icon.length) return;
	// 		this._scene.avatarLayer.scene3d.skillManager.preLoadSkill(getSkillUrl(temp.icon));
	// 	}
	// 	//心跳
	// 	update(diff:number):void{
	// 		if (this._mainFakeUnit && this._mainFakeUnit.userData && this._mainFakeUnit.userData.isNeedDrawView){
	// 			 this._mainFakeUnit.userData.isNeedDrawView = false;
	// 		}
	// 		this.onDrawEffectFire();
	// 	}
	// 	//战斗准备
	// 	private readyFight():void{
	// 		let main:Vector2 = this._objMgr.mainUnit.pos;
	// 		this._center = new Vector2();//阵列中心点
	// 		let battleScale:number = this._app.battleMgr.battleScale;
	// 		this._center.x = main.x + SceneBattleRes.CENTER_OFFSETX/(battleScale*SceneRes.CELL_WIDTH);
	// 		this._center.y = main.y + SceneBattleRes.CENTER_OFFSETY/(battleScale*SceneRes.CELL_HEIGHT);

	// 		this._topRoles = [];
	// 		this._bottomRoles = [];
	// 		this._topRoles.length = this._bottomRoles.length = SceneBattleRes.MAX_POS;
	// 		//下阵位战将
	// 		let isBottom:boolean = true;
	// 		//面向中心点
	// 		let x:number = -this.getWujiangPos(1, isBottom, this._isHAxisX)/SceneRes.CELL_WIDTH;
	// 		let y:number = -this.getWujiangPos(1, isBottom, this._isHAxisY)/SceneRes.CELL_HEIGHT;
	// 		let toward:number = 180 * Math.atan2(y, x) / Math.PI;
	// 		//let toward:number = -45;
	// 		x = -100//this.getMapPos(this.getEnterPos(isBottom, this._isHAxisX), this._isHAxisX);//己方进入到阵位
	// 		y = -100//this.getMapPos(this.getEnterPos(isBottom, this._isHAxisY), this._isHAxisY);
			
	// 		//x = this.getMapPos(this.getEnterPos(isBottom, this._isHAxisX), this._isHAxisX);//己方进入到阵位
	// 		//y = this.getMapPos(this.getEnterPos(isBottom, this._isHAxisY), this._isHAxisY);
	// 		//x = 0;
	// 		//y = 0;
	// 		//toward = 0;

	// 		let roles:BattleRole[] = this._app.battleMgr.battleRoles0;
	// 		let len:number = roles.length;
	// 		let fakeUnit:FakeUnit;
	// 		let role:BattleRole;
	// 		let i:number, index:number;
	// 		for(i = 0; i < len; i++){
	// 			role = roles[i];
	// 			index = role.pos-1;
	// 			console.log("readyFight battleRoles0:", role.pos, index);
	// 			fakeUnit = this.createFakeUnit(role.name, UnitField.TYPE_ID_CREATURE, role.entry, 0, x, y, 200, toward, true, false);
	// 			fakeUnit.hp = role.initHp;
	// 			fakeUnit.maxHp = role.maxHp;
	// 			fakeUnit.maxAnger = 4;
	// 			fakeUnit.isSelfRole = true;
	// 			this._bottomRoles[index] = fakeUnit;
	// 			//this._bottomRoles.push(fakeUnit);
	// 		}
	// 		console.log("readyFight this._bottomRoles:", this._bottomRoles);
	// 		//上阵位战将
	// 		isBottom = false;
	// 		toward += 180;
	// 		roles = this._app.battleMgr.battleRoles1;
	// 		len = roles.length;
	// 		for(i = 0; i < len; i++){
	// 			role = roles[i];
	// 			index = role.pos-1 - 14;
	// 			console.log("readyFight battleRoles1:", role.pos, index);
	// 			x = this.getMapPos(this.getWujiangPos(index, isBottom, this._isHAxisX), this._isHAxisX);//对方直接显示在阵位上
	// 			y = this.getMapPos(this.getWujiangPos(index, isBottom, this._isHAxisY), this._isHAxisY);

	// 			//x = this.getMapPos(73, this._isHAxisX);
	// 			//y = this.getMapPos(-157, this._isHAxisY);
	// 			//                            名称        id类型              模板id       等级 x y  速度 朝向 是否显示名字 是否显示怒气条
	// 			fakeUnit = this.createFakeUnit(role.name, UnitField.TYPE_ID_CREATURE, role.entry, 0, x, y, 200, toward, true, false);
	// 			fakeUnit.hp = role.initHp;
	// 			fakeUnit.maxHp = role.maxHp;
	// 			fakeUnit.maxAnger = 4;
	// 			this._topRoles[index] = fakeUnit;
	// 			//this._topRoles.push(fakeUnit);
	// 		}
	// 		console.log("readyFight this._topRoles:", this._topRoles);
	// 	}
	// 	//进入场景
	// 	private enterScene(isEnd:boolean):void{
	// 		if(!isEnd){
	// 			this.enterRole(0);
	// 		}else{
	// 			if(this._isUIReady){
	// 				 this.startFight();
	// 			}
	// 			this._isFightReady = true;
	// 		}
	// 	}
	// 	//战将进入场景
	// 	private enterRole(index:number):void{
	// 		if(index >= SceneBattleRes.MAX_POS) return;
	// 		if(this._bottomRoles[index]){//己方进入到阵位
	// 			this.moveEnter(this._bottomRoles[index], index, true, true);
	// 		}
	// 		index++;
	// 		this._timer.once(100, this, this.enterRole, [index]);
	// 	}
	// 	//添加角色特效
	// 	private showEffects(target:any, effect:string, x:number=0, y:number=0, z:number=0):void{
	// 		if(!target || !effect) return;
	// 		if(target instanceof Unit){//单个对象
	// 			if(target.hp <= 0) return;
	// 			this.showEffect(target, effect, x, y, z);
	// 			this._effectInfo.push({effect:effect,target:target});
	// 			return;
	// 		}
	// 		for(let i:number = 0; i < target.length; i++){
	// 			if(!target[i] || target[i].hp <= 0) continue;
	// 			this.showEffect(target[i], effect, x, y, z);
	// 			this._effectInfo.push({effect:effect,target:target[i]});
	// 		}
	// 	}
	// 	//移除角色特效
	// 	private clearEffects(effect:string, isSingle:boolean = true):void{
	// 		if(!effect) return;
	// 		for(let i:number = 0; i < this._effectInfo.length; i++){
	// 			if(this._effectInfo[i].effect != effect) continue;
	// 			this.clearEffect(this._effectInfo[i].target, this._effectInfo[i].effect);
	// 			this._effectInfo.splice(i,1);
	// 			if(isSingle) return;
	// 			i--;
	// 		}
	// 	}
	// 	//是否有指定特效
	// 	private isHasEffect(target:Unit, effect:string):boolean{
	// 		if(!target || !effect) return false;
	// 		for(let i:number = 0; i < this._effectInfo.length; i++){
	// 			if(this._effectInfo[i].target == target && this._effectInfo[i].effect == effect) return true;
	// 		}
	// 		return false;
	// 	}
	// 	//开始战斗
	// 	private startFight():void{
	// 		if(this._isUIReady && this._isFightReady) {
	// 			return;
	// 		}
	// 		this._curRound = 1;
	// 		this._battleInfo = this._app.battleMgr.battleInfo;
	// 		SceneBattleRes.delayPlay(this._timer, this, 0, this.updateRound, 4000, this.updateRound);
	// 	}
	// 	//更新回合
	// 	private updateRound(isEnd:boolean):void{
	// 		if(!isEnd){
	// 			this.clearEffects(SceneBattleRes.EFFECT_CAST, true);
	// 			this._app.battleMgr.battleEvent(BattleMgr.BATTLE_ROUND, {curRound:this._curRound});
	// 		}else{
	// 			this._app.battleMgr.battleEvent(BattleMgr.BATTLE_ROUND, null);
	// 			if(!this._battleInfo || !this._battleInfo.hurts){
	// 				return;
	// 			}
	// 			this._app.battleMgr.updateBattleRoleSpells();//更新技能数据
	// 			this._battleInfo.isNewRound = false;//回合已更新
	// 			if(this._battleInfo.hurts.length){
	// 				 this.hurtStart();//继续播放
	// 			}else if(this._battleInfo.winner){
	// 				 this.fightEnd();//战斗结束
	// 			}else{
	// 				 this.updateWait();//等待玩家操作
	// 			}
	// 		}
	// 	}
	// 	//等待玩家操作
	// 	private updateWait():void{
	// 		if(!this._battleInfo){
	// 			 return;
	// 		}
	// 		this.clearEffects(SceneBattleRes.EFFECT_CAST, true);
	// 		if(!this._isAuto){
	// 			 this.showEffects(this._bottomRoles[this._battleInfo.pos-1], SceneBattleRes.EFFECT_CAST, 0, SceneBattleRes.EFFECT_CAST_Y, 0);
	// 		}
	// 		this._app.battleMgr.battleEvent(BattleMgr.BATTLE_WAIT, {isAttack:this._battleInfo.isAttack, index:this._battleInfo.index});
	// 	}
	// 	//技能选择等待
	// 	private updateSpell(spellId:number):void{
	// 		let temp:any = Template.getSkillsTempById(spellId);
	// 		let isChange:boolean = true;
	// 		if(this._spellId){
	// 			let old:any = Template.getSkillsTempById(this._spellId);
	// 			isChange = temp.select != old.select;
	// 			if(isChange){//清理特效
	// 				this.clearEffects(this._effectWait, false);
	// 				this._effectWait = null;
	// 			}
	// 		}
	// 		if(isChange){//显示特效
	// 			let targets:FakeUnit[] = this.getSelectTargets(temp.select);
	// 			this._effectWait = SceneBattleRes.EFFECT_WAIT1;//敌方待选择特效
	// 			if(targets && targets.length && targets[0].isSelfRole){
	// 				 this._effectWait = SceneBattleRes.EFFECT_WAIT0;
	// 			}
	// 			this.showEffects(targets, this._effectWait, 0, SceneBattleRes.EFFECT_WAIT_Y, 0);
	// 		}
	// 		this._spellId = spellId;
	// 	}
	// 	//获取选中目标列表
	// 	private getSelectTargets(type:number):FakeUnit[]{
	// 		if(type == 2){
	// 			 return [this._bottomRoles[this._battleInfo.pos-1]];//自身
	// 		}
	// 		let isAttack:boolean;
	// 		let indexs0:number[];
	// 		let indexs1:number[];
	// 		switch(type){
	// 			case 0: //
	// 				isAttack = false; 
	// 				indexs0 = [0,1,2]; 
	// 				indexs1 = [3,4,5]; 
	// 				break;
	// 			case 1: //
	// 				isAttack = false; 
	// 				indexs0 = [0,1,2,3,4,5]; 
	// 				break;
	// 			case 3: 
	// 				isAttack = true; 
	// 				indexs0 = [0,1,2]; 
	// 				indexs1 = [3,4,5]; 
	// 				break;
	// 			case 4: 
	// 				isAttack = true; 
	// 				indexs0 = [0,1,2,3,4,5]; 
	// 				break;
	// 		}
	// 		if(!indexs0){
	// 			 return null;
	// 		}
	// 		let roles:FakeUnit[] = isAttack?this._bottomRoles:this._topRoles;
	// 		let targets0:FakeUnit[] = [];
	// 		let targets1:FakeUnit[] = [];
	// 		for(let i:number = 0; i < roles.length; i++){
	// 			if(!roles[i] || roles[i].hp <= 0){
	// 				 continue;
	// 			}
	// 			if(indexs0.indexOf(i) != -1){
	// 				 targets0.push(roles[i]);
	// 			}
	// 			if(indexs1 && indexs1.indexOf(i) != -1){
	// 				 targets1.push(roles[i]);
	// 			}
	// 		}
	// 		return targets0.length ? targets0 : targets1;
	// 	}
	// 	//更新自动战斗
	// 	private updateAuto(isAuto:boolean):void{
	// 		this._isAuto = isAuto;
	// 		if(this._isAuto){
	// 			this.clearEffects(this._effectWait, false);
	// 			this._effectWait = null;
	// 			this._spellId = 0;
	// 		}
	// 	}
	// 	//点击地面
	// 	onSceneTouch(cellx:number, celly:number, hitObject:any):boolean{
	// 		if(!hitObject){
	// 			 return false;//未选中
	// 		}
	// 		if(!this.isHasEffect(hitObject as Unit, this._effectWait)){
	// 			 return false;//找不到
	// 		}
	// 		let temp:any = Template.getSkillsTempById(this._spellId);
	// 		let isAttack:boolean = temp.select > 2;
	// 		let roles:FakeUnit[] = isAttack?this._bottomRoles:this._topRoles;
	// 		let index:number = roles.indexOf(hitObject as FakeUnit);
	// 		if(index == -1){
	// 			 return false;
	// 		}
	// 		this.showEffects(hitObject as Unit, SceneBattleRes.EFFECT_SELECT, 0, 0, SceneBattleRes.EFFECT_SELECT_Y);
	// 		this._app.battleMgr.battleEvent(BattleMgr.BATTLE_SELECT,{isAttack:isAttack, pos:index + 1, spellId:this._spellId});
	// 		this.clearEffects(this._effectWait, false);
	// 		this._effectWait = null;
	// 		this._spellId = 0;
	// 		return true;
	// 	}
	// 	//当前伤害信息播放开始
	// 	private hurtStart():void{
	// 		//console.trace("SceneBattle hurtStart!");
	// 		let hurts:BattleHurt[] = this._battleInfo.hurts[0];
	// 		if(!hurts.length){
	// 			this._battleInfo.hurts.shift();
	// 			if(!this._battleInfo.hurts.length){
	// 				 return;
	// 			}
	// 		}
	// 		this._curHurt = hurts.shift();
	// 		if(!hurts.length){
	// 			 this._battleInfo.hurts.shift();
	// 		}
	// 		this._castUnit = this.getWujiangUnit(this._curHurt.pos-1, this._curHurt.isAttack);
	// 		this.clearEffects(SceneBattleRes.EFFECT_CAST, true);
	// 		this._isContinue = false;
	// 		if(this._curHurt.state > 0 && !this._curHurt.buffInfo.length){
	// 			 this.showCastBuffs(true);//正常状态且无自身Buff效果
	// 		}else{
	// 			 SceneBattleRes.delayPlay(this._timer, this, 0, this.showCastBuffs, 500, this.showCastBuffs);
	// 		}
	// 		this._app.battleMgr.battleEvent(BattleMgr.BATTLE_ROLE, {isAttack:this._curHurt.isAttack, index:this._curHurt.index, anger:this._curHurt.anger});
	// 	}
	// 	//显示出手者Buff效果
	// 	private showCastBuffs(isEnd:boolean):void{
	// 		if(!isEnd){
	// 			//显示Buff效果
	// 			switch(this._curHurt.state){
	// 				case -1://buff减血死亡
	// 					this.battleAction(this._castUnit, AvatarData.STATE_BEATEN);
	// 					this.createdFightxt(Pan3d.TextJumpType.NORMALDAMAGE, this._castUnit.hp, this._castUnit.toward, this._castUnit);
	// 					this._castUnit.hp = 0;
	// 					this._isContinue = true;
	// 					break;
	// 				case -2://buff不出手
	// 					this._isContinue = true;
	// 					break;
	// 				case 0://未知状态
	// 					this._isContinue = true;
	// 					break;
	// 				default://正常buff增减血
	// 					this.clearEffects(SceneBattleRes.EFFECT_JIAXUE, false);
	// 					let value:number = this._curHurt.value;
	// 					if(value){
	// 						if(value > 0){
	// 							this.battleAction(this._castUnit, AvatarData.STATE_BEATEN);
	// 							this.createdFightxt(Pan3d.TextJumpType.NORMALDAMAGE, value, this._castUnit.toward, this._castUnit);
	// 						}else{
	// 							this.createdFightxt(Pan3d.TextJumpType.TREATMENT, value, this._castUnit.toward, this._castUnit);
	// 							this.showEffects(this._castUnit, SceneBattleRes.EFFECT_JIAXUE, 0, SceneBattleRes.EFFECT_JIAXUE_Y, 0);
	// 						}
	// 						this._castUnit.hp = this._curHurt.curHp;
	// 					}
	// 					this._isContinue = false;
	// 					break;
	// 			}
	// 		}else{
	// 			this.moveBack(this._castUnit, this._curHurt.pos-1, this._curHurt.isAttack, false);
	// 			if(this._isContinue){
	// 				this.updateUnitBuffs(this._castUnit, this._curHurt.buffs);//更新出手者buff
	// 				this.updateBuffs();
	// 				if(this._curHurt.state == -1) this.onWujiangDie(this._castUnit);
	// 				this._targetUnits = null;
	// 				this._spell_T = null;
	// 				this._follows = null;
	// 				this._isNear = false;
	// 				this.hurtEnd();//直接进入下一伤害
	// 				return;
	// 			}
	// 			let spellId:number = this._curHurt.state;
	// 			let specialIds:number[] = [6,9];
	// 			this._special = specialIds.indexOf(spellId)!=-1;
	// 			if(spellId == 15) this.clearEffects(SceneBattleRes.EFFECT_SHUAIRUO, false);//衰落特效
	// 			this._spell_T = Template.getSkillsTempById(spellId);
	// 			if(this._spell_T){
	// 				this._isNear = this._spell_T.is_far == 0;
	// 				this._follows = this._spell_T.follow;
	// 			}else{
	// 				this._isNear = true;
	// 				this._follows = [];
	// 			}
	// 			this._follows.length = 3;
	// 			if(!this._follows[1]) this._follows[1] = SceneBattleRes.BEATEN_SPELL;
	// 			if(!this._follows[2]) this._follows[2] = SceneBattleRes.BEATEN_SPELL;
	// 			this._targetUnits = [];
	// 			let target:BattleTarget;
	// 			for(let i:number = 0; i < this._curHurt.targets.length; i++){
	// 				target = this._curHurt.targets[i];
	// 				this._targetUnits[i] = this.getWujiangUnit(target.pos-1, target.isAttack);
	// 			}
	// 			this._curHit = 0;
	// 			//开始显示技能
	// 			if(/*this._isAuto || */!this._curHurt.isAttack || this._spell_T.type != 3){
	// 				this.showsSell(true, false);
	// 			}else{
	// 				SceneBattleRes.delayPlay(this._timer, this, 0, this.showsSell, 1500, this.showsSell);
	// 			}
	// 		}
	// 	}
	// 	//开始显示技能
	// 	private showsSell(isEnd:boolean, isSuper:boolean = true):void{
	// 		if(!isEnd){
	// 			if(isSuper){
	// 				this.clearSceneEffectFires();
	// 				this.showBack(true);
	// 				this.otherRoles(true);
	// 				this.showEffects(this._castUnit, SceneBattleRes.EFFECT_SPELL, 0, SceneBattleRes.EFFECT_SPELL_Y, 0);
	// 				this._app.battleMgr.battleEvent(BattleMgr.BATTLE_SUPER, {isAttack:this._curHurt.isAttack, entry:this._castUnit.GetEntry()});
	// 				let sound:string;
	// 				switch(this._castUnit.GetEntry()){
	// 					case 1: sound = "call_zs"+Math.floor(Math.random()*3); break;
	// 					case 2: sound = "call_td"+Math.floor(Math.random()*2); break;
	// 					case 3: sound = "call_gjs"+Math.floor(Math.random()*2); break;
	// 					case 4: sound = "call_dcjk"+Math.floor(Math.random()*3); break;
	// 					case 5: sound = "call_rxbhz"+Math.floor(Math.random()*2); break;
	// 					case 6: sound = "call_ssqx"+Math.floor(Math.random()*2); break;
	// 				}
	// 				if(sound) this._app.playSound("sounds/battle/"+sound+".mp3");
	// 			}
	// 		}else{
	// 			if(isSuper){
	// 				this.showSceneEffectFires();
	// 				this.showBack(false);
	// 				this.otherRoles(false);
	// 				this.clearEffects(SceneBattleRes.EFFECT_SPELL, true);
	// 				this._app.battleMgr.battleEvent(BattleMgr.BATTLE_SUPER, null);
	// 			}
	// 			if(this._isNear){
	// 				SceneBattleRes.delayPlay(this._timer, this, 0, this.attackMove, 200, this.attackMove);
	// 			}else{
	// 				// let time:number = this._spell_T?this._spell_T.time_beaten:500;
	// 				let time:number = this._time_beaten[this._spell_T.id];
	// 				if(this._special) time = 1;
	// 				SceneBattleRes.delayPlay(this._timer, this, 50, this.attackSkill, time, this.attackSkill);
	// 			}
	// 		}
	// 	}
	// 	//更新其他战将显隐
	// 	private otherRoles(isHide:boolean):void{
	// 		let role:FakeUnit;
	// 		for(let i:number = 0; i < SceneBattleRes.MAX_POS; i++){
	// 			role = this._topRoles[i];
	// 			if(role && role != this._castUnit){
	// 				if(isHide) role.buffMgr.addHidingCount();
	// 				else role.buffMgr.subHidingCount();
	// 			}
	// 			role = this._bottomRoles[i];
	// 			if(role && role != this._castUnit){
	// 				if(isHide) role.buffMgr.addHidingCount();
	// 				else role.buffMgr.subHidingCount();
	// 			}
	// 		}
	// 	}
	// 	private _time_beaten:number[] = [0,200,300,500,500,500, 500,500,500,500,200, 500,600,500,500,500, 500,500,500,500,500, 500,500,500,500,500, 400,800,1000,500,1, 700,200];
	// 	//技能攻击移动
	// 	private attackMove(isEnd:boolean):void{
	// 		if(!isEnd){
	// 			let target:BattleTarget = this._curHurt.targets[0];
	// 			this.moveForward(this._castUnit, target.pos-1, target.isAttack);
	// 			this._app.playSound("sounds/battle/run.mp3");
	// 		}else{
	// 			this.battleAction(this._castUnit, AvatarData.STATE_STAND, 0);
	// 			// let time:number = this._spell_T?this._spell_T.time_beaten:500;
	// 			let time:number = this._time_beaten[this._spell_T.id];
	// 			if(this._special) time = 1;
	// 			SceneBattleRes.delayPlay(this._timer, this, 0, this.attackSkill, time, this.attackSkill);
	// 		}
	// 	}
	// 	//技能攻击特效
	// 	private attackSkill(isEnd:boolean):void{

	// 		/////////////////////////////////////////////
	// 		/*var action:any = {};
	// 		action.operationType = 2;
	// 		action.aim = 2;
	// 		action.operationID = 1;*/
	// 		//RequesterProtocols._instance.c2s_CSendAction(action,1,1);

	// 		if(!isEnd){
	// 			if(this._spell_T){
	// 				let hitPos:Vector3D[];
	// 				if(this._isNear && this._spell_T.id != 6){
	// 					let index:number = this._curHurt.targets[0].pos-1;
	// 					let isBottom:boolean = !this._curHurt.isAttack;
	// 					let x:number = isBottom?SceneBattleRes.FORWARD_OFFSETX:-SceneBattleRes.FORWARD_OFFSETX;
	// 					let y:number = isBottom?-SceneBattleRes.FORWARD_OFFSETY:SceneBattleRes.FORWARD_OFFSETY;
	// 					x = this.getMapPos(this.getWujiangPos(index, isBottom, this._isHAxisX)+x, this._isHAxisX);
	// 					y = this.getMapPos(this.getWujiangPos(index, isBottom, this._isHAxisY)+y, this._isHAxisY);
	// 					hitPos = [this.getV3DByMapPos(x,y)];
	// 				}
	// 				this.castSpell(this._castUnit, this._spell_T.id, false, hitPos);
	// 				if(this._follows[1] != 1001) this.playSkillHit();//配套受击
	// 				if(this._follows[0]){
	// 					for(let i:number = 0; i < this._targetUnits.length; i++)
	// 						this.castSpell(this._castUnit, this._follows[0], true, this._targetUnits[i]);//弹道
	// 				}
	// 			}
	// 		}else{
	// 			let time:number = this._isNear?0:250;
	// 			if(this._special){
	// 				 time = 1;
	// 			}
	// 			this._isAllDied = false;
	// 			SceneBattleRes.delayPlay(this._timer, this, time, this.hitTarget, 300, this.hitTarget);
	// 		}
	// 	}
	// 	//受击表现
	// 	private hitTarget(isEnd:boolean):void{
	// 		if(!isEnd){
	// 			this.fightxtDrawtors();
	// 			let targetUnit:FakeUnit;
	// 			let target:BattleTarget;
	// 			let isAllDied:boolean = true;
	// 			for(let i:number = 0; i < this._targetUnits.length; i++){
	// 				targetUnit = this._targetUnits[i];
	// 				this.clearEffects(SceneBattleRes.EFFECT_SELECT, true);
	// 				if(this._follows&&this._follows[2]){//关联受击
	// 					if(targetUnit.GetEntry() != 3) this.castSpell(targetUnit, this._follows[2]);
	// 					else this.castSpell(targetUnit, 1015);//女弓手受击
	// 				}
	// 				target = this._curHurt.targets[i];
	// 				if(targetUnit.hp > 0){
	// 					if(target.hit[this._curHit] == Pan3d.TextJumpType.DODGE) this.battleAction(targetUnit, AvatarData.STATE_DEFENSE);
	// 					else this.battleAction(targetUnit, AvatarData.STATE_BEATEN);
	// 					isAllDied = false;
	// 					let sound:string;
	// 					switch(targetUnit.GetEntry()){
	// 						case 1: sound = "hit_zs"; break;
	// 						case 2: sound = "hit_td"; break;
	// 						case 3: sound = "hit_gjs"; break;
	// 						case 4: sound = "hit_dcjk"; break;
	// 						case 5: sound = "hit_rxbhz"; break;
	// 						case 6: sound = "hit_ssqx"; break;
	// 						case 7: sound = "hit_zq"; break;
	// 					}
	// 					if(sound) this._app.playSound("sounds/battle/"+sound+".mp3");
	// 				}else if(!targetUnit.isDied){
	// 					this.onWujiangDie(targetUnit, this._spell_T.type > 1);
	// 				}
	// 			}
	// 			this._isAllDied = isAllDied;
	// 		}else{
	// 			this._curHit++;
	// 			if(!this._isAllDied && this._curHit < this._curHurt.times){//受击还未完结
	// 				if(this._spell_T.id == 9){
	// 					let time:number = this._time_beaten[this._spell_T.id];
	// 					if(this._special) time = 1;
	// 					SceneBattleRes.delayPlay(this._timer, this, 0, this.attackSkill, time, this.attackSkill);
	// 				}else{
	// 					let time:number = this._isNear?0:250;
	// 					if(this._special) time = 1;
	// 					SceneBattleRes.delayPlay(this._timer, this, time, this.hitTarget, 400, this.hitTarget);
	// 				}
	// 			}else{
	// 				this.moveBack(this._castUnit, this._curHurt.pos-1, this._curHurt.isAttack, false);
	// 				let buffId:number = this._spell_T.buff_self.length?this._spell_T.buff_self[0]:0;
	// 				this.updateUnitBuffs(this._castUnit, this._curHurt.buffs, buffId);//更新出手者buff
	// 				this.updateBuffs();
	// 				this.showExtraRoles();
	// 				this.hurtEnd();
	// 			}
	// 		}
	// 	}
	// 	//战斗飘血
	// 	private fightxtDrawtors():void{
	// 		let targets:BattleTarget[] = this._curHurt.targets;
	// 		let target:FakeUnit;
	// 		for(let i:number = 0; i < targets.length; i++){
	// 			target = this._targetUnits[i];
	// 			this.createdFightxt(targets[i].hit[this._curHit], targets[i].value[this._curHit], target.toward, target);
	// 			target.hp = targets[i].curHp[this._curHit];
	// 		}
	// 	}
	// 	//播放受击技能
	// 	private playSkillHit():FakeUnit{
	// 		let target:FakeUnit;
	// 		let hitPos:Vector3D[];
	// 		let index:number;
	// 		let isBottom = !this._curHurt.isAttack;
	// 		switch(this._spell_T.target){
	// 			case 2://前排全部
	// 				index = this._curHurt.targets[0].pos<4?1:4;
	// 				hitPos=[this.getV3DByMapPos(this.getMapPos(this.getWujiangPos(index,isBottom,this._isHAxisX),this._isHAxisX),this.getMapPos(this.getWujiangPos(index,isBottom,this._isHAxisY),this._isHAxisY))];
	// 				break;
	// 			case 3://列目标
	// 				index = this._curHurt.targets[0].pos-1;
	// 				hitPos=[this.getV3DByMapPos(this.getMapPos(this.getCenterPos(index,isBottom,this._isHAxisX),this._isHAxisX),this.getMapPos(this.getCenterPos(index,isBottom,this._isHAxisY),this._isHAxisY))];
	// 				break;
	// 			case 4://敌方全部
	// 				index = 1;
	// 				let pos:Vector3D = this.getV3DByMapPos(this.getMapPos(this.getCenterPos(index,isBottom,this._isHAxisX),this._isHAxisX),this.getMapPos(this.getCenterPos(index,isBottom,this._isHAxisY),this._isHAxisY));
	// 				if(this._spell_T.id != 27){
	// 					hitPos=[pos];
	// 				}else{
	// 					hitPos = [];
	// 					for(let i:number = 0; i < 13; i++){
	// 						hitPos.push(new Vector3D(pos.x+Math.random()*300-150, pos.y, pos.z+Math.random()*200-100));
	// 					}
	// 				}
	// 				break;
	// 			case 5://自身
	// 				target = this._targetUnits[0];
	// 				break;
	// 			case 7://己方全部
	// 				index = 1;
	// 				isBottom = this._curHurt.isAttack;
	// 				hitPos=[this.getV3DByMapPos(this.getMapPos(this.getCenterPos(index,isBottom,this._isHAxisX),this._isHAxisX),this.getMapPos(this.getCenterPos(index,isBottom,this._isHAxisY),this._isHAxisY))];
	// 				break;
	// 			default://前排单体
	// 				target = this._targetUnits[0];
	// 				break;
	// 		}
	// 		if(this._follows[1]) this.castSpell(this._targetUnits[0], this._follows[1], false, hitPos);
	// 		return target;
	// 	}
	// 	//更新buff
	// 	private updateBuffs():void{
	// 		if(!this._curHurt.targets.length) return;
	// 		let targets:BattleTarget[] = this._curHurt.targets;
	// 		let buffId:number;
	// 		for(let i:number = 0; i < targets.length; i++){
	// 			buffId = this._spell_T.buff_target.length?this._spell_T.buff_target[0]:0;
	// 			this.updateUnitBuffs(this._targetUnits[i], targets[i].buffs, buffId);//更新受击者buff
	// 		}
	// 	}
	// 	/**
	// 	 * 更新战将buff
	// 	 * @param target 指定战将
	// 	 * @param values buff数据:{buff_id,buff_lv,buff_round,buff_data}
	// 	 */
	// 	private updateUnitBuffs(target:FakeUnit, values:any[], buffId:number = 0):void{
	// 		let len:number = target.hp>0?values.length:0;
	// 		let buffIds:number[] = [buffId];
	// 		let counts:number[] = [0];
	// 		let value:any;
	// 		let id:number, index:number;
	// 		for(let i:number = 0; i < UnitField.MAX_BUFF; i++){
	// 			//旧buff
	// 			id = target.GetBuffId(i);
	// 			index = buffIds.indexOf(id);
	// 			if(index == -1){
	// 				buffIds.push(id);
	// 				counts.push(-1);
	// 			}else counts[index]--;
	// 			if(i < len){
	// 				value = values[i];
	// 				target.SetBuffId(i, value.buff_id);
	// 				target.SetBuffLv(i, value.buff_lv);
	// 				target.SetBuffTm(i, value.buff_round);
	// 				target.SetBuffData(i, 0);
	// 				id = value.buff_id;
	// 				index = buffIds.indexOf(id);
	// 				if(index == -1){
	// 					buffIds.push(id);
	// 					counts.push(1);
	// 				}else counts[index]++;
	// 			}else{
	// 				target.SetBuffId(i, 0);
	// 				target.SetBuffLv(i, 0);
	// 				target.SetBuffTm(i, 0);
	// 				target.SetBuffData(i, 0);
	// 			}
	// 		}
	// 		target.buffMgr.onUpdate(true, null);
	// 		this.checkBufftxt(target, buffIds, counts, buffId);
	// 	}
	// 	//检测显示buff飘字
	// 	private checkBufftxt(target:FakeUnit, buffIds:number[], counts:number[], buffId:number = 0):void{
	// 		if(target.hp <= 0 || !buffIds || !buffIds.length || !counts || !counts.length) return;
	// 		let type:number;
	// 		for(let i:number = 0; i < buffIds.length; i++){
	// 			type = 0;
	// 			if(counts[i] > 0){//新增
	// 				switch(buffIds[i]){
	// 					case 2: type = Pan3d.TextJumpType.DEFENSEREDUCE; break;
	// 					case 3: type = Pan3d.TextJumpType.DEFENSEADD; break;
	// 					case 4: this.showEffects(target, SceneBattleRes.EFFECT_SHUAIRUO, 0, SceneBattleRes.EFFECT_SHUAIRUO_Y, 0); break;//衰落特效
	// 				}
	// 			}else if(counts[i] < 0){//减少
	// 				// switch(buffIds[i]){
	// 				// 	case 4: type = Pan3d.TextJumpType.RESISTANCE; break;
	// 				// }
	// 			}else if(buffIds[i] == buffId){//不变
	// 				switch(buffIds[i]){
	// 					case 4: type = Pan3d.TextJumpType.RESISTANCE; break;
	// 				}
	// 			}
	// 			if(type) this.createdFightxt(type, 0, target.toward, target);
	// 		}
	// 	}
	// 	//战将死亡
	// 	private onWujiangDie(target:FakeUnit, special:boolean = false):void{
	// 		target.isDieSpecial = special;
	// 		target.hp = 0;
	// 		let atnStus:number = !special?AvatarData.STATE_DIING:AvatarData.STATE_DIING1;
	// 		this.battleAction(target, atnStus, 1);
	// 		this.updateUnitBuffs(target, []);
	// 		let sound:string;
	// 		switch(target.GetEntry()){
	// 			case 1: sound = "die_zs"; break;
	// 			case 2: sound = "die_td"; break;
	// 			case 3: sound = "die_gjs"; break;
	// 			case 4: sound = "die_dcjk"; break;
	// 			case 5: sound = "die_rxbhz"; break;
	// 			case 6: sound = "die_ssqx"; break;
	// 			case 7: sound = "die_zq"; break;
	// 		}
	// 		if(sound) this._app.playSound("sounds/battle/"+sound+".mp3");
	// 	}
	// 	//显示额外目标飘血
	// 	private showExtraRoles():void{
	// 		if(!this._curHurt.extras || !this._curHurt.extras.length) return;
	// 		this.clearEffects(SceneBattleRes.EFFECT_JIAXUE, false);
	// 		let extra:BattleExtra;
	// 		let target:FakeUnit;
	// 		for(let i:number = 0; i < this._curHurt.extras.length; i++){
	// 			extra = this._curHurt.extras[i];
	// 			target = this.getWujiangUnit(extra.pos-1, extra.isAttack);
	// 			if(extra.value > 0){
	// 				this.battleAction(target, AvatarData.STATE_BEATEN);
	// 				this.createdFightxt(Pan3d.TextJumpType.NORMALDAMAGE, extra.value, target.toward, target);
	// 			}else{
	// 				this.createdFightxt(Pan3d.TextJumpType.TREATMENT, extra.value, target.toward, target);
	// 				this.showEffects(target, SceneBattleRes.EFFECT_JIAXUE, 0, SceneBattleRes.EFFECT_JIAXUE_Y, 0);
	// 			}
	// 			target.hp = extra.curHp;
	// 		}
	// 	}
	// 	//当前伤害信息播放结束
	// 	private hurtEnd():void{
	// 		if(this._battleInfo.hurts.length){//继续播放
	// 			if(this._battleInfo.hurts[0].length && this._battleInfo.hurts[0][0].isNewRound){//新回合
	// 				this._curRound++;
	// 				SceneBattleRes.delayPlay(this._timer, this, 0, this.updateRound, 4000, this.updateRound);//更新回合
	// 			}else{
	// 				 this.hurtStart();
	// 			}
	// 		}else if(this._battleInfo.winner){
	// 			 this.fightEnd();//战斗结束
	// 		}else if(this._curRound == this._battleInfo.round){
	// 			 this.updateWait();//等待玩家操作
	// 		}else{
	// 			this._curRound++;
	// 			SceneBattleRes.delayPlay(this._timer, this, 0, this.updateRound, 4000, this.updateRound);//更新回合
	// 		}
	// 	}
	// 	//战斗继续
	// 	private fightContinue():void{
	// 		this._battleInfo = this._app.battleMgr.battleInfo;
	// 		this.hurtStart();
	// 	}
	// 	//战斗结束
	// 	private fightEnd():void{
	// 		Laya.timer.once(2000, this, ()=>{
	// 			this._app.battleMgr.battleEvent(BattleMgr.BATTLE_RESULT);
	// 		});
	// 	}
	// 	/*==========工具函数==========*/
	// 	/**
	// 	 * 创建假的Unit对象
	// 	 * @param oname 名称
	// 	 * @param typeid id类型
	// 	 * @param cid 模板id
	// 	 * @param lv 等级
	// 	 * @param px 坐标x
	// 	 * @param py 坐标y
	// 	 * @param speed 速度
	// 	 * @param toward 朝向
	// 	 * @param needShowName 是否显示名字
	// 	 * @param needShowAnger 是否显示怒气条
	// 	 */
	// 	private createFakeUnit(oname:string, typeid:number, cid:number, lv:number, px:number, py:number, speed:number, toward:number, needShowName:boolean = false, needShowAnger:boolean = false):FakeUnit{
	// 		let fakeUnit: FakeUnit = this._objMgr.CreateFakeObject() as FakeUnit;
	// 		fakeUnit.SetTypeId(typeid);
	// 		fakeUnit.SetEntry(cid);
	// 		if(oname && oname.length){
	// 			fakeUnit.SetName(oname);
	// 		}else if(cid){
	// 			//let temp: any = Template.getCreatureTempById(cid);
	// 			//temp && fakeUnit.SetName(temp.name);
	// 			//LoginModel.getInstance().cnpcShapeInfo;
				
	// 			var cNpcShapeBaseVo:game.data.template.CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[cid + ""];
	// 			if(cNpcShapeBaseVo){
	// 				fakeUnit.SetName(cNpcShapeBaseVo.name);
	// 			}
	// 		}
	// 		fakeUnit.needShowName = needShowName;
	// 		fakeUnit.isBattleRole = needShowName;
	// 		fakeUnit.needShowAnger = needShowAnger;
	// 		fakeUnit.scale = 1;
	// 		fakeUnit.SetLevel(lv);
	// 		fakeUnit.SetPos(px, py);
	// 		//console.log("createFakeUnit,px, py:", px, py);
	// 		fakeUnit.SetSpeed(speed);
	// 		fakeUnit.toward = toward;
	// 		fakeUnit.fristUpdate();
	// 		return fakeUnit;
	// 	}
	// 	//获取阵位上的战将
	// 	private getWujiangUnit(index:number, isBottom:boolean):FakeUnit{
	// 		if(isBottom){
	// 			 return this._bottomRoles[index];
	// 		}else{
	// 			 return this._topRoles[index];
	// 		}
	// 	}
	// 	/**
	// 	 * 战将普攻回阵位
	// 	 * @param target 指定战将
	// 	 * @param index 目标阵位下标
	// 	 * @param isBottom 目标是否下阵位
	// 	 * @param isJump 是否跳动
	// 	 */
	// 	private moveEnter(target:FakeUnit, index:number, isBottom:boolean, isJump:boolean):void{
	// 		let x:number = this.getMapPos(this.getWujiangPos(index, isBottom, this._isHAxisX), this._isHAxisX);
	// 		let y:number = this.getMapPos(this.getWujiangPos(index, isBottom, this._isHAxisY), this._isHAxisY);
	// 		target.SetPos(x, y);
	// 		// this.doImitateMove(target, x, y, AvatarSprite.IMITATE_MOVE_TYPE_RUN, 500);
	// 		this.battleAction(target, AvatarData.STATE_ENTER);
	// 	}
	// 	/**
	// 	 * 战将普攻前往
	// 	 * @param target 指定战将
	// 	 * @param index 目标阵位下标
	// 	 * @param isBottom 目标是否下阵位
	// 	 */
	// 	private moveForward(target:FakeUnit, index:number, isBottom:boolean):void{
	// 		let x:number = isBottom?SceneBattleRes.FORWARD_OFFSETX:-SceneBattleRes.FORWARD_OFFSETX;
	// 		let y:number = isBottom?-SceneBattleRes.FORWARD_OFFSETY:SceneBattleRes.FORWARD_OFFSETY;
	// 		x = this.getMapPos(this.getWujiangPos(index, isBottom, this._isHAxisX)+x, this._isHAxisX);
	// 		y = this.getMapPos(this.getWujiangPos(index, isBottom, this._isHAxisY)+y, this._isHAxisY);
	// 		this.doImitateMove(target, x, y, AvatarSprite.IMITATE_MOVE_TYPE_RUN, 200);
	// 		this.battleAction(target, AvatarData.STATE_RUNNING, 0);
	// 	}
	// 	/**
	// 	 * 战将普攻回阵位
	// 	 * @param target 指定战将
	// 	 * @param index 目标阵位下标
	// 	 * @param isBottom 目标是否下阵位
	// 	 * @param isJump 是否跳动
	// 	 */
	// 	private moveBack(target:FakeUnit, index:number, isBottom:boolean, isJump:boolean):void{
	// 		let x:number = this.getMapPos(this.getWujiangPos(index, isBottom, this._isHAxisX), this._isHAxisX);
	// 		let y:number = this.getMapPos(this.getWujiangPos(index, isBottom, this._isHAxisY), this._isHAxisY);
	// 		if(Math.abs(target.GetPosX() - x) < 1 && Math.abs(target.GetPosY() - y) < 1) return;
	// 		this.doImitateMove(target, x, y, AvatarSprite.IMITATE_MOVE_TYPE_RUN, 100, 100);
	// 		this.battleAction(target, AvatarData.STATE_RETREAT);
	// 	}
	// 	//获取战将进场坐标
	// 	private getEnterPos(isBottom:boolean, isHorizontal:boolean):number{
	// 		if(isBottom){
	// 			if(isHorizontal) return SceneBattleRes.ENTER_BOTTOMX;
	// 			else return SceneBattleRes.ENTER_BOTTOMY;
	// 		}else{
	// 			if(isHorizontal) return SceneBattleRes.ENTER_TOPX;
	// 			else return SceneBattleRes.ENTER_TOPY;
	// 		}
	// 	}
	// 	//获取战将阵位坐标
	// 	private getWujiangPos(index:number, isBottom:boolean, isHorizontal:boolean):number{
	// 		if(isBottom){
	// 			if(isHorizontal) return SceneBattleRes.BOTTOM_POSX[index];
	// 			else return SceneBattleRes.BOTTOM_POSY[index];
	// 		}else{
	// 			if(isHorizontal) return SceneBattleRes.TOP_POSX[index];
	// 			else return SceneBattleRes.TOP_POSY[index];
	// 		}
	// 	}
	// 	//获取阵位中间位置坐标
	// 	private getCenterPos(index:number, isBottom:boolean, isHorizontal:boolean):number{
	// 		index = index%3;
	// 		if(isBottom){
	// 			if(isHorizontal) return (SceneBattleRes.BOTTOM_POSX[index]+SceneBattleRes.BOTTOM_POSX[index+3])/2;
	// 			else return (SceneBattleRes.BOTTOM_POSY[index]+SceneBattleRes.BOTTOM_POSY[index+3])/2;
	// 		}else{
	// 			if(isHorizontal) return (SceneBattleRes.TOP_POSX[index]+SceneBattleRes.TOP_POSX[index+3])/2;
	// 			else return (SceneBattleRes.TOP_POSY[index]+SceneBattleRes.TOP_POSY[index+3])/2;
	// 		}
	// 	}
	// 	//获取逻辑坐标
	// 	private getMapPos(num:number, isHorizontal:boolean):number{
	// 		let battleScale:number = this._app.battleMgr.battleScale;
	// 		if(isHorizontal){
	// 			 return this._center.x + num/(battleScale*SceneRes.CELL_WIDTH);
	// 		}else{
	// 			 return this._center.y + num/(battleScale*SceneRes.CELL_HEIGHT);
	// 		}
	// 	}
	// 	//获取逻辑坐标
	// 	private getV3DByMapPos(posX:number, posY:number):Vector3D{
	// 		let x:number = (posX-this._scene.camera.logicLeft) * SceneRes.CELL_WIDTH * this._scene.scaleX;
	// 		let y:number = (posY-this._scene.camera.logicTop) * SceneRes.CELL_HEIGHT * this._scene.scaleY;
    //         var nScale: number = 0.25 / scene2d.Override2dEngine.htmlScale
    //         x = x * nScale;
    //         y = y * nScale / (Math.sin(45 * Math.PI / 180)) * -1;
	// 		return new Vector3D(x,0,y);
	// 	}
	// }
	// /**战斗场景配置*/
	// export class SceneBattleRes{
	// 	/**阵位数量*/
	// 	public static MAX_POS:number = 14;//6;
	// 	/**中心点偏移量*/
	// 	public static CENTER_OFFSETX:number = 40;
	// 	public static CENTER_OFFSETY:number = 2;
	// 	/**上阵位:0~5*/
	// 	public static TOP_POSX:number[] = [-310.5,-252.5, -200.5, -150.5,
	// 										 -85.5, 73.5, 235.5, 
	// 										 -24.5, 134.5, 294.5,
	// 										 -84.5, -150.5, -200.5, -255.5];
	// 	public static TOP_POSY:number[] = [-197.5, -177.5, -157.5, -137.5, -313.5, -288.5, -262.5,
	// 										-197.5,-177.5, -157.5, -137.5, -313.5, -288.5, -262.5];
	// 	/**下阵位:0~5*/
	// 	public static BOTTOM_POSX:number[] = [-233.5, -73.5, 97.5, -294.5, -134.5, 35.5, 45.5,
	// 											-233.5, -73.5, 97.5, -294.5, -134.5, 35.5, 45.5];
	// 	public static BOTTOM_POSY:number[] = [133.5, 157.5, 183.5, 203.5, 223.5, 243.5, 263.5,
	// 											270.5, 294.5, 320.5, 340.5, 360.5, 380.5, 400.5];
	// 	/**上阵位战将进场坐标x*/
	// 	public static ENTER_TOPX:number = 171.25;
	// 	/**上阵位战将进场坐标y*/
	// 	public static ENTER_TOPY:number = -367.25;
	// 	/**下阵位战将进场坐标x*/
	// 	public static ENTER_BOTTOMX:number = -171.25;
	// 	/**下阵位战将进场坐标y*/
	// 	public static ENTER_BOTTOMY:number = 373.25;
	// 	/**战将普攻前往目标偏移量x*/
	// 	public static FORWARD_OFFSETX:number = 36.75;
	// 	/**战将普攻前往目标偏移量y*/
	// 	public static FORWARD_OFFSETY:number = 78.75;
	// 	/**战将受击偏移量x*/
	// 	public static BEATEN_OFFSETX:number = 18.375;
	// 	/**战将受击偏移量y*/
	// 	public static BEATEN_OFFSETY:number = 39.375;
	// 	/**战将受击击飞偏移量x*/
	// 	public static BEATEN_FLYX:number = 294;
	// 	/**战将受击击飞偏移量y*/
	// 	public static BEATEN_FLYY:number = 630;
	// 	/**通用受击技能*/
	// 	public static BEATEN_SPELL:number = 1001;
	// 	/**场景火特效名*/
	// 	public static EFFECT_FIRE:string[] = ["smoke", "huoxing", "fire", "smoke", "huoxing", "fire", "smoke", "huoxing", "fire"];
	// 	/**场景火特效y轴偏移*/
	// 	public static EFFECT_FIRE_POS:number[] = [120,-250,2, 100,-300,2, 50,-220,1.5, 0,-270,2.2, -20,-320,2.2, -65,-217,1.8, -140,-260,2.2, -170,-320,2.2, -140,-230,1.5];
	// 	/**施法者特效名*/
	// 	public static EFFECT_CAST:string = "xuanzhong";
	// 	/**施法者特效y轴偏移*/
	// 	public static EFFECT_CAST_Y:number = 0;
	// 	/**己方目标待选择特效名*/
	// 	public static EFFECT_WAIT0:string = "wofang_01";
	// 	/**敌方目标待选择特效名*/
	// 	public static EFFECT_WAIT1:string = "difang_01";
	// 	/**目标待选择特效y轴偏移*/
	// 	public static EFFECT_WAIT_Y:number = 65;
	// 	/**目标选中特效名*/
	// 	public static EFFECT_SELECT:string = "mingzhong";
	// 	/**目标选中特效y轴偏移*/
	// 	public static EFFECT_SELECT_Y:number = 0;
	// 	/**技能闪光特效名*/
	// 	public static EFFECT_SPELL:string = "dashan";
	// 	/**技能闪光特效y轴偏移*/
	// 	public static EFFECT_SPELL_Y:number = 160;
	// 	/**加血特效名*/
	// 	public static EFFECT_JIAXUE:string = "jiaxue";
	// 	/**加血特效y轴偏移*/
	// 	public static EFFECT_JIAXUE_Y:number = 50;
	// 	/**衰落特效名*/
	// 	public static EFFECT_SHUAIRUO:string = "shuairuo";
	// 	/**衰落特效y轴偏移*/
	// 	public static EFFECT_SHUAIRUO_Y:number = 20;
		
	// 	/*===========================延迟播放相关============================*/
	// 	/**等待时间*/
	// 	public static TIME_WAIT:number = 500;
	// 	/**延迟播放*/
	// 	public static delayPlay(timer:Timer, caller: any, playStartTime:number=0, playFun:Function=null, playTime:number=0, playEndFun:Function=null):void{
	// 		/*let onPlayStart:Function = (caller: any, playFun:Function = null, playTime:number=0, playEndFun:Function=null):void=>{
	// 			if(playFun){
	// 				let handler:Handler = Handler.create(caller, playFun);
	// 				handler.runWith(false);
	// 			}
	// 			if(playEndFun){
	// 				 timer.once(playTime||SceneBattleRes.TIME_WAIT, caller, playEndFun, [true]);
	// 			}
	// 		};*/

	// 		if(playStartTime){
	// 			 timer.once(playStartTime, caller, this.onPlayStart, [timer,caller, playFun, playTime, playEndFun]);
	// 		}else if(playEndFun){
	// 			 this.onPlayStart(timer, caller, playFun, playTime, playEndFun);
	// 		}
	// 		//console.trace("SceneBattleRes delayPlay!");
	// 	}
	// 	static onPlayStart (timer:Timer, caller: any, playFun:Function = null, playTime:number=0, playEndFun:Function=null):void{
	// 		if(playFun){
	// 			let handler:Handler = Handler.create(caller, playFun);
	// 			handler.runWith(false);
	// 		}
	// 		if(playEndFun){
	// 			timer.once(playTime||SceneBattleRes.TIME_WAIT, caller, playEndFun, [true]);
	// 		}
	// 	}
	// 	/**清除延迟播放*/
	// 	public static clearDelayPlay(timer:Timer, caller: any):void{
	// 		timer.clearAll(caller);
	// 	}
	 }
}