module game.managers{
	/**
	 * 客户端战斗管理器,主要战斗数据管理
	 * name 王谦
	 */
	export class BattleMgr extends Laya.EventDispatcher{
	// 	public static BATTLE_UIREADY	:string = "battle_uiready";		//战斗场景UI准备好了
	// 	public static BATTLE_ROUND		:string = "battle_round";		//更新战斗回合
	// 	public static BATTLE_AUTO		:string = "battle_auto";		//更新自动战斗
	// 	public static BATTLE_ROLE		:string = "battle_role";		//更新战将信息
	// 	public static BATTLE_WAIT		:string = "battle_wait";		//等待玩家操作
	// 	public static BATTLE_SPELL		:string = "battle_spell";		//技能选择等待
	// 	public static BATTLE_SELECT		:string = "battle_select";		//更新战将选中
	// 	public static BATTLE_SUPER		:string = "battle_super";		//显示技能大招
	// 	public static BATTLE_CONTINUE	:string = "battle_continue";	//战斗继续
	// 	public static BATTLE_RESULT		:string = "battle_result";		//战斗结算
	// 	public static BATTLE_EXIT		:string = "battle_exit";		//退出战斗
		
    //     private _app:AppBase;
	// 	private _sceneScale:number;			//原有场景缩放
	// 	private _battleScale:number;		//战斗场景缩放
	// 	private _isStart:boolean;			//是否开始
	// 	private _roles0:FightRole[];		//进攻方战将列表(玩家)
	// 	private _roles1:FightRole[];		//防守方战将列表
	// 	private _fightBack:Handler;			//战斗回调
	// 	private _battleRoles0:BattleRole[];	//战斗战将数据0
	// 	private _battleRoles1:BattleRole[];	//战斗战将数据1
	// 	private _anger:number;				//初始怒气点数
	// 	private _battleInfo:BattleInfo;		//当前战斗数据
	// 	private _showSpell:any[];			//显示技能

    //     constructor(app: AppBase) {
    //         super();
    //         this._app = app;
	// 	}
	// 	// 初始化 GameApp.onMPlayerData调用此方法
	// 	init():void{
	// 		this._sceneScale = main.sceneScale;
	// 		this._battleScale = 1;
	// 		Network._instance.addHanlder(ProtocolsEnum.SSendBattleEnd, this, this.onSSendBattleEnd);
	// 	}
	// 	/**战斗场景缩放*/
	// 	public get battleScale():number{
	// 		return this._battleScale;
	// 	}
	// 	/**设置是否战斗场景缩放*/
	// 	public set isBattleScale(v:boolean){
	// 		main.sceneScale = v ? this._battleScale : this._sceneScale;
	// 	}
	// 	/**当前战斗数据*/
	// 	public get battleInfo():BattleInfo{
	// 		return this._battleInfo;
	// 	}
	// 	/**战斗战将数据0*/
	// 	public get battleRoles0():BattleRole[]{
	// 		return this._battleRoles0;
	// 	}
	// 	/**战斗战将数据1*/
	// 	public get battleRoles1():BattleRole[]{
	// 		return this._battleRoles1;
	// 	}
	// 	/**初始怒气点数*/
	// 	public get anger():number{
	// 		return this._anger;
	// 	}
	// 	/**战斗场景事件*/
	// 	public battleEvent(type:string, data:any=null):void{
	// 		this.event(type, data);
	// 	}
		
	// 	private onSSendBattleEnd(optcode : number, msg: hanlder.s2c_SSendBattleEnd): void {
	// 		this.battleEvent(BattleMgr.BATTLE_EXIT);
	// 	}
	// 	/**开始战斗*/ //点击主界面副本开始战斗
	// 	public start():void{
	// 		if(this._app.aCotrller.isTeleporting || this._isStart) return;//传送中或已开始
	// 		this._isStart = true;
	// 		this.checkMainRoles();
	// 		this.checkTargetRoles();
	// 		this._fightBack = Handler.create(this, this.onFightResult, null, false);
	// 		this._app.fightMgr.start(this._roles0, this._roles1, false, this._fightBack);
	// 		this._roles0 = this._roles1 = null;
	// 		this._index++;
	// 	}
	// 	private _index:number = 0;
	// 	/**退出当前战斗*/
	// 	public exit():void{
	// 		this._app.fightMgr.exit();
	// 		this._isStart = false;
	// 	}
	// 	//检测主玩家战将信息
	// 	private checkMainRoles():void{
	// 		if(this._roles0 && this._roles0.length) return;
	// 		if(!this._roles0) this._roles0 = [];
	// 		var fighterVo:game.scene.models.FighterInfoVo;
	// 		this._roles0.length = 0;

	// 		/*let entrys:number[] = [1,2,3,4,5];
	// 		let poss:number[] = [2,3,4,5,6];			
	// 		for(let i:number = 0; i < poss.length; i++){
	// 			this._roles0.push(this.createRolesInfo(fighterVo, 1, entrys[i], poss[i]));
	// 		}*/

	// 		var fighterVoList = game.scene.models.SceneModel.getInstance().fighterList0;
	// 		for (var index = 0; index < fighterVoList.length; index++) {
	// 			fighterVo = fighterVoList[index];
	// 			this._roles0.push(this.createRolesInfo(fighterVo, 1, fighterVo.shape, fighterVo.index));
	// 		}
	// 	}
	// 	//检测对手战将信息
	// 	private checkTargetRoles():void{
	// 		if(this._roles1 && this._roles1.length) return;
	// 		if(!this._roles1) this._roles1 = [];
	// 		var fighterVo:game.scene.models.FighterInfoVo;
	// 		this._roles1.length = 0;

	// 		/*let entrys:number[] = [7,7,7,6];
	// 		let poss:number[] = [1,2,3,5];
	// 		for(let i:number = 0; i < poss.length; i++){
	// 			this._roles1.push(this.createRolesInfo(fighterVo, 2, entrys[i], poss[i]));
	// 		}*/

	// 		var fighterVoList = game.scene.models.SceneModel.getInstance().fighterList1;
	// 		for (var index = 0; index < fighterVoList.length; index++) {
	// 			fighterVo = fighterVoList[index];
	// 			/*if (index >= 4) {
	// 				fighterVo.index = 5;
	// 			}else{
	// 				fighterVo.index = index;
	// 			}*/
	// 			this._roles1.push(this.createRolesInfo(fighterVo, 2, fighterVo.shape, fighterVo.index));
	// 		}
	// 	}
	// 	private _roleInfos:number[][] = [
	// 		[1,640,2,160,3,80,4,72,5,40,6,50,7,12,8,0,9,0,10,0],//男剑士
	// 		[1,576,2,176,3,76,4,72,5,40,6,55,7,13.2,8,0,9,0,10,0],//女剃刀手
	// 		[1,512,2,195.2,3,72,4,72,5,40,6,50,7,12,8,0,9,0,10,0],//女弓手
	// 		[1,704,2,231,3,76,4,75.6,5,38,6,80,7,19.2,8,0,9,0,10,0],//德川家康
	// 		[1,924,2,187,3,92,4,61.2,5,46,6,75,7,18,8,0,9,0,10,0],//日向百合子
	// 		[1,792,2,150,3,72,4,79.2,5,36,6,45,7,10.8,8,0,9,0,10,0],//上杉谦信
	// 		[1,2056,2,90,3,72,4,61.2,5,36,6,45,7,10.8,8,0,9,0,10,0]//足轻
	// 	];
	// 	//创建战将数据
	// 	private createRolesInfo(fighterVo:game.scene.models.FighterInfoVo, faction:number, entry:number, pos:number):FightRole{
	// 		let role = new FightRole();
	// 		role.entry = entry;
	// 		role.faction = faction;
	// 		//let temp:any = Template.getCreatureTempById(role.entry);
	// 		//let skills:number[] = temp.skills.concat();

	// 		//var tempSkill:number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,17,18,19,21,22,23,24,26,27,28,29,30,31,32,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1015];
	// 		/*var tempSkill:number[] = [1,2,4,5,6,7,8,9,10,12,13,15,17,18,19,22,23,24,26,27,28,29,30,31,32];
	// 		var startIndex:number = Math.floor(tempSkill.length * Math.random());
	// 		startIndex = ((startIndex >= 1) ? (startIndex - 1) : startIndex);
	// 		var endIndex:number = startIndex + Math.floor(5 * Math.random() + 1);
	// 		endIndex = ((endIndex >= tempSkill.length) ? (tempSkill.length - 1) : endIndex);
	// 		skills = tempSkill.slice(startIndex, endIndex);*/

	// 		var tempSkill:number[][] = [[1, 2, 4, 5, 6], [7, 8, 9, 10, 12], [26, 27, 28, 29, 30, 31], [13, 15], [17, 18, 19], [32], [32], [32], [22, 23, 24]];
	// 		let skills:number[] = tempSkill[Math.floor(tempSkill.length * Math.random())];

	// 		//console.log("createRolesInfo role.entry:", role.entry);
	// 		//console.log("createRolesInfo temp:", temp);
	// 		console.log("createRolesInfo skills:", skills);
	// 		let spells:any[] = [{id:skills.shift(),lv:1}];
	// 		if(skills.length){//大招
	// 			spells.push({id:skills.pop(),lv:1});
	// 		}
	// 		if(skills.length){//小招0
	// 			spells.push({id:skills.shift(),lv:1});
	// 		}
	// 		if(skills.length){//小招1
	// 			spells.push({id:skills.shift(),lv:1});
	// 		}
	// 		// let index:number;
	// 		// if(skills.length){//小招0
	// 		// 	index = Math.floor(Math.random()*skills.length);
	// 		// 	spells.push({id:skills[index],lv:1});
	// 		// 	skills.splice(index,1);
	// 		// }
	// 		// if(skills.length){//小招1
	// 		// 	index = Math.floor(Math.random()*skills.length);
	// 		// 	spells.push({id:skills[index],lv:1});
	// 		// 	skills.splice(index,1);
	// 		// }
	// 		role.spells = spells;
	// 		let passives:any[] = [];
	// 		/*for(let i:number = 0; i < temp.passive.length; i++){
	// 			passives.push({id:temp.passive[i], rate:100});
	// 		}*/
	// 		role.passives = passives;
	// 		role.pos = pos;
	// 		role.buffs = [];
	// 		role.attrs = this._roleInfos[entry-1];
	// 		role.hp =  role.max_hp;

	// 		//////////////////////////////////////
	// 		if(fighterVo){
	// 			role.hp = fighterVo.hp;
	// 			role.max_hp = fighterVo.maxhp;
	// 			role.name = fighterVo.fighterName;
	// 		}

	// 		return role;
	// 	}
	// 	/**出手战斗*/
	// 	public fight(spellId:number = 0, targetPos:number = 0):void{
	// 		if(!this._battleInfo || this._battleInfo.winner) return;
	// 		this._app.fightMgr.fight(this._battleInfo.round, this._battleInfo.spos, spellId, targetPos, this._fightBack);//_fightBack = this.onFightResult
	// 	}
	// 	//战斗回调函数
	// 	private onFightResult(value:any):void{
	// 		if(value.success != 1) return;
	// 		let isStart:boolean;
	// 		if(value.hasOwnProperty("show_info")){
	// 			isStart = true;
	// 			let show_info:any[] = value.show_info;
	// 			this._battleRoles0 = [];
	// 			this._battleRoles1 = [];
	// 			for(let i:number = 0; i < FightMgr.MAX_POS; i++){
	// 				if(i < show_info[0].length){
	// 					this._battleRoles0.push(this.readBattleRole(show_info[0][i]));
	// 				}
	// 				if(i < show_info[1].length){
	// 					this._battleRoles1.push(this.readBattleRole(show_info[1][i]));
	// 				}
	// 			}
	// 		}
	// 		if(value.hasOwnProperty("anger")){
	// 			 this._anger = value.anger;
	// 		}
	// 		if(value.hasOwnProperty("show_spell")){//显示技能
	// 			this._showSpell = value.show_spell;
	// 		}
	// 		this._battleInfo = this.readBattleInfo(value);
	// 		if(isStart){//第一次进入战斗场景是true
	// 			this._app.aCotrller.sendTeleport(MapInfo.MAP_BATTLE, MapInfo.MAP_BATTLE_POSX, MapInfo.MAP_BATTLE_POSY, true, false, false);
	// 			this.isBattleScale = true;
	// 		}else{
	// 			this.battleEvent(BattleMgr.BATTLE_CONTINUE);//除了第一次地方自动出手，后面每次出手都会执行此行代码
	// 		}
	// 	}
	// 	//读取战将数据
	// 	private readBattleRole(data:any):BattleRole{
	// 		if(!data){
	// 			return null;
	// 		}
	// 		let battleRole:BattleRole = new BattleRole();
	// 		battleRole.spos = data.pos;
	// 		battleRole.pos = Math.ceil(data.pos/2);
	// 		battleRole.entry = data.entry;
	// 		battleRole.initHp = battleRole.curHp = data.cur_hp;
	// 		battleRole.maxHp = data.max_hp;
	// 		battleRole.spells = data.spells||[];
	// 		battleRole.buffs = data.buffs||[];
	// 		battleRole.name = data.name;
	// 		return battleRole;
	// 	}
	// 	/**更新战将技能数据*/
	// 	public updateBattleRoleSpells():void{
	// 		if(!this._showSpell) return;
	// 		let show_spell:any[] = this._showSpell;
	// 		for(let i:number = 0; i < FightMgr.MAX_POS; i++){
	// 			if(i < show_spell[0].length) this._battleRoles0[i].spells = show_spell[0][i].spells;
	// 			if(i < show_spell[1].length) this._battleRoles1[i].spells = show_spell[1][i].spells;
	// 		}
	// 		this._showSpell = null;
	// 	}
	// 	//获取战将数据信息
	// 	public getBattleRole(isAttack:boolean, index:number):BattleRole{
	// 		let roles:BattleRole[] = isAttack ? this._battleRoles0 : this._battleRoles1;
	// 		if(index < 0 || index >= roles.length) return null;
	// 		return roles[index];
	// 	}
	// 	//获取战将数据信息
	// 	public getBattleRoleByPos(isAttack:boolean, pos:number):BattleRole{
	// 		let roles:BattleRole[] = isAttack ? this._battleRoles0 : this._battleRoles1;
	// 		for(let i:number = 0; i < roles.length; i++){
	// 			if(roles[i].pos == pos) return roles[i];
	// 		}
	// 		return null;
	// 	}
	// 	//设置战将数据信息
	// 	private setBattleRoleInfo(data:any):void{
	// 		if(!data.hasOwnProperty("spos")) return;
	// 		let spos:number = data.spos;
	// 		for(let i:number = 0; i < FightMgr.MAX_POS; i++){
	// 			if(i < this._battleRoles0.length && this._battleRoles0[i].spos == spos){
	// 				data.isAttack = true;
	// 				data.index = i;
	// 				data.pos = this._battleRoles0[i].pos;
	// 				break;
	// 			}
	// 			if(i < this._battleRoles1.length && this._battleRoles1[i].spos == spos){
	// 				data.isAttack = false;
	// 				data.index = i;
	// 				data.pos = this._battleRoles1[i].pos;
	// 				break;
	// 			}
	// 		}
	// 	}
	// 	//读取当前战斗数据 FightMgr.returnInfo()会调用此方法
	// 	private readBattleInfo(data:any):BattleInfo{
	// 		if(!data){
	// 			return null;
	// 		}
	// 		let info:BattleInfo = new BattleInfo();
	// 		info.isNewRound = false;
	// 		info.winner = data.winer;
	// 		info.round = data.round;
	// 		info.spos = data.cur_pos;
	// 		this.setBattleRoleInfo(info);
	// 		info.hurts = [];
	// 		let hurt_info:any[] = data.hurt_info;
	// 		let hurt:BattleHurt;
	// 		for(let i:number = 0; i < hurt_info.length; i++){
	// 			info.hurts[i] = [];
	// 			for(let j:number = 0; j < hurt_info[i].length; j++){
	// 				hurt = this.readHurtInfo(data.hurt_info[i][j]);
	// 				info.hurts[i].push(hurt);
	// 				if(hurt.isNewRound){
	// 					 info.isNewRound = true;
	// 				}
	// 			}
	// 		}
	// 		return info;
	// 	}
	// 	//读取战斗出手数据
	// 	private readHurtInfo(data:any):BattleHurt{
	// 		if(!data) return null;
	// 		let hurt:BattleHurt = new BattleHurt();
	// 		hurt.isNewRound = data.new_round;
	// 		hurt.anger = data.anger;
	// 		hurt.spos = data.pos;
	// 		this.setBattleRoleInfo(hurt);
	// 		let role:BattleRole = this.getBattleRole(hurt.isAttack, hurt.index);
	// 		hurt.state = data.state;
	// 		role.spells = hurt.spells = data.spells;
	// 		hurt.buffs = data.buffs;
	// 		hurt.buffInfo = data.buff_trigger_info||[];
	// 		hurt.value = 0;
	// 		//计算出手者血量增减
	// 		for(let i:number = 0; i < hurt.buffInfo.length; i++){
	// 			if(hurt.buffInfo[i].value){
	// 				hurt.value += hurt.buffInfo[i].value;
	// 			}
	// 		}
	// 		hurt.curHp = role.curHp = role.curHp-hurt.value;
	// 		hurt.value = Math.floor(hurt.value);
	// 		//目标战将
	// 		hurt.targets = [];
	// 		hurt.times = 0;
	// 		if(data.cast_info && data.cast_info.length){
	// 			for(let i:number = 0; i < data.cast_info.length; i++)
	// 				hurt.targets[i] = this.readTargetInfo(data.cast_info[i]);
	// 			hurt.times = hurt.targets[0].hit.length;
	// 		}
	// 		//额外目标战将
	// 		hurt.extras = [];
	// 		if(data.extra_info && data.extra_info.length){
	// 			for(let i:number = 0; i < data.extra_info.length; i++)
	// 				hurt.extras[i] = this.readExtraInfo(data.extra_info[i]);
	// 		}
	// 		return hurt;
	// 	}
	// 	//战斗目标战将数据
	// 	private readTargetInfo(data:any):BattleTarget{
	// 		if(!data) return null;
	// 		let target:BattleTarget = new BattleTarget();
	// 		target.spos = data.pos;
	// 		this.setBattleRoleInfo(target);
	// 		let role:BattleRole = this.getBattleRole(target.isAttack, target.index);
	// 		target.hit = [];
	// 		for(let i:number = 0; i < data.hit_info.length; i++){
	// 			target.hit.push(this.getHitType(data.hit_info[i]));
	// 		}
	// 		target.buffs = data.buffs;
	// 		target.value = [];
	// 		target.curHp = [];
	// 		for(let i:number = 0; i < data.value.length; i++){
	// 			target.curHp[i] = role.curHp = role.curHp-data.value[i];
	// 			target.value[i] = Math.floor(data.value[i]);
	// 		}
	// 		return target;
	// 	}
	// 	//获取伤害显示类型
	// 	private getHitType(hit:number):number{
	// 		let type:number = Pan3d.TextJumpType.NORMALDAMAGE;
	// 		switch(hit){
	// 			case UnitField.HIT_NOMAL: type = Pan3d.TextJumpType.NORMALDAMAGE; break;
	// 			case UnitField.HIT_CRIT: type = Pan3d.TextJumpType.CRIT; break;
	// 			case UnitField.HIT_MISS: type = Pan3d.TextJumpType.DODGE; break;
	// 			case UnitField.HIT_ZHILIAO: type = Pan3d.TextJumpType.TREATMENT; break;
	// 		}
	// 		return type;
	// 	}
	// 	//战斗额外目标战将数据
	// 	private readExtraInfo(data:any):BattleExtra{
	// 		if(!data) return null;
	// 		let target:BattleExtra = new BattleExtra();
	// 		target.spos = data.pos;
	// 		this.setBattleRoleInfo(target);
	// 		let role:BattleRole = this.getBattleRole(target.isAttack, target.index);
	// 		role.curHp = role.curHp-data.value;
	// 		if(role.curHp > role.maxHp) role.curHp = role.maxHp;
	// 		target.curHp = role.curHp;
	// 		target.value = Math.floor(data.value);
	// 		return target;
	// 	}
	 }
}