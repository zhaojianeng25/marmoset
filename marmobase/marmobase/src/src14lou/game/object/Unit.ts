/**
* name 
*/
module game.object {

	const MOVE_STATUS_MOVE = 1;
	//--停止状态
	const MOVE_STATUS_IDLE = 2;

	//--活着
	const LIVE_STATUS_OK = 1;
	//--已经死亡了
	const LIVE_STATU_DIE = 2;
	//--刚出生状态，保护一下
	const LIVE_STATUS_BORN = 3;

	//--移动速度的单位
	const SPEED_UNIT = 18;

	export class Unit extends UnitField implements IAvatarObj {
		//对象类型
		static TYPE_PLAYER: number = 0;//玩家
		static TYPE_CREATURE: number = 1;//生物
		static TYPE_GAMEOBJECT: number = 2;//游戏对象

		//生物类型
		static CREATURE_TYPE_MONSTER: number = 0;//怪物
		static CREATURE_TYPE_BOSS: number = 1;//boss
		static CREATURE_TYPE_NPC: number = 2;//NPC
		static CREATURE_TYPE_ELITE: number = 3;//精英
		static CREATURE_TYPE_SMALL_BOSS: number = 4;//野外小boss

		//游戏对象类型
		static TYPE_GAMEOBJ_NORMAL: number = 0;//采集
		static TYPE_CGAMEOBJ_TELEPORT: number = 1;//传送点

		//机器人模板id
		static ROBOT_TEMP_ID_LIST: number[] = [];

		public isother:number = 0;
		//判断是否与NPC对话
		public istalk:number = 0
		public isaddeffect:number =0;//是否加过特效
		//使用者才知道的数据，方便，性能考虑
		userData: any;
		get hiding(): boolean {
			return this._buffMgr.hiding;
		}
		// isValid: boolean = true;    //是否有效
		///////// 事件回调定义开始 //////////
		// 死亡状态改变触发 fun(liveStatus:number)
		onLiveStatusChange: Function;
		// 目标位置改变触发
		onTargetPosChange: Function;
		//装备或坐骑发生变化
		onAvatarChange: Function;
		//AOE技能警告
		onRedWaring: Function;
		///////// 事件回调定义结束 //////
		//当前坐标
		pos: Vector2 = new Vector2();
		//当前朝向
		ori: Vector2 = new Vector2();

		//面向哪里,仅客户端关心
		faceToward: number = 0;

		//移动目标点
		target: Vector2 = new Vector2();
		//移动到目标点的时长
		targetTimer: number = 0;
		
		//NPCkey
		public npckey = 0 ;
		//NPCid
		public npcid=0;
		//移动速度,单位为每s移动格子数
		protected _speed: number = 0;
		private _speed_byte: number = 0;
		get speed(): number {
			return this._speed;
		}
		set speed(v: number) {
			if (v == this._speed_byte) {
				return;
			}
			this._speed_byte = v;
			this.SetSpeed(v);
			this._speed = SPEED_UNIT * v / 255;
			if (this.HasTarget()) {
				this.updateTargetTowardAndTimer();
			}
		}
		//当前移动状态
		moveStatus: number;
		//当前移动路径
		movePath: Array<number>;
		//当前移动到哪个点
		move_path_pos: number;
		//当前对象8方向朝向,是否可以理解为朝向
		private _toward: number;

		public get toward(): number {
			return this._toward;
		}
		public set toward(newToward: number) {
			this._toward = this.faceToward = newToward;
		}

		//重现时间 仅客户端使用
		private _reappearTime: number = 0;
		//是否需要显示名字和血条
		needShowName: boolean = true;
		//是否需要显示怒气条
		needShowAnger: boolean = false;

		//说话内容
		public sayContent: any[];
		//说话失效时间
		public sayFailTime: number = 0;
		
		// buff设置透明
		public isBuffAlpha: boolean = false;

		// buff管理器
		private _buffMgr: ClientBuffMgr;
		get buffMgr(): ClientBuffMgr {
			return this._buffMgr;
		}

		constructor() {
			super();
			this._buffMgr = new ClientBuffMgr(this);
			//更新完毕之后
			this._after_update = this.onUpdate;
		}
		// 去哪儿
		goto(x: number, y: number): boolean {
			this.SetTargetPosX(x);
			this.SetTargetPosY(y);
			if(this.onTargetPosChange)
				this.onTargetPosChange(this, x, y);
			return true;
		}
		//当对象更新发生时
		protected onUpdate(flags: number, mask: UpdateMask, strmask: UpdateMask): void {
			let isNew = flags & core.obj.OBJ_OPT_NEW;
			// buff更新一下
			this._buffMgr.onUpdate(isNew != 0, mask);

			let byte0Update = mask.GetBit(UnitField.UNIT_INT_BYTE0);
			// Unit坐标发生变化
			if (isNew) {
				if ((mask.GetBit(UnitField.UNIT_INT_POS_X) || mask.GetBit(UnitField.UNIT_INT_POS_Y))) {
					this.SetPos(this.GetPosX(), this.GetPosY());
				}
				//移动状态
				this.moveStatus = MOVE_STATUS_IDLE;
				//如果是创建包 朝向设置下
				if (byte0Update) {
					this.SetToward2(this.GetToward());
				}
			}

			// 血量
			if (isNew || mask.GetBit(UnitField.UNIT_INT_HP)) {
				this._hp = this.GetHp();
			}
			// 总血量
			if (isNew || mask.GetBit(UnitField.UNIT_INT_MAX_HP)) {
				this._maxHp = this.GetMaxHp();
			}

			if (isNew || byte0Update) {
				// 2移动速度
				this.speed = this.GetSpeed();
				// 3生存状态
				let oldLiveStatus = this._liveStatus;
				this.liveStatus = this.GetLiveStatus();
				if (!isNew && oldLiveStatus != this._liveStatus && this._liveStatus == UnitField.LIVE_STATUS_OK) {
					// 复活的话满血一下
					this.hp = this._maxHp;
				}
			}

			let levelUpdate = mask.GetBit(UnitField.UNIT_INT_LEVEL);
			if (isNew || levelUpdate) {
				this._level = this.GetLevel();
			}
			// 非创建包并且等级发生变化
			if (!isNew && levelUpdate) {
				// 需要满血一下
				this.hp = this._maxHp;
			}

			// 实例id (地图id所以需要在前面)
			if (isNew || strmask.GetBit(UnitField.UNIT_STR_INSTANCE_I_D)) {
				this.instanceid = this.GetInstanceID();
			}

			//目标点变化
			if (isNew || mask.GetBit(UnitField.UNIT_INT_TARGET_POS)) {
				this._targetPosX = this.GetTargetPosX();
				this._targetPosY = this.GetTargetPosY();
				if (this.onTargetPosChange) {
					this.onTargetPosChange(this, this._targetPosX, this._targetPosY);
				}
			}

			//变化（0精灵类型ID1坐骑模板2攻击模式3性别）
			let byte1Update = mask.GetBit(UnitField.UNIT_INT_BYTE1);
			// 是否是go
			if (isNew || byte1Update) {
				//0精灵类型                  
				this.typeid = this.GetTypeId();
				//1坐骑模板
				this.mountid = this.GetMount();
				//2攻击模式
				this.attackMode = this.GetAttackMode();
				//3性别
				this.sex = this.GetSex();
			}

			//NPC标志0-怪物，1-NPC，2-游戏对象
			let npcByteUpdae = mask.GetBit(UnitField.UNIT_INT_NPC_BYTE);
			if (isNew || npcByteUpdae) {
				this.npcFlag = this.GetNpcFlag();
			}

			// 主人oid
			if (isNew || mask.GetBit(UnitField.UNIT_INT_MASTER_OID)) {
				this.masterOid = this.GetMasterOid();
			}

			// 模板id
			if (isNew || mask.GetBit(UnitField.UNIT_INT_ENTRY)) {
				this.entryid = this.GetEntry();
			}

			// 武器、衣服、翅膀显示
			let showUpdate = mask.GetBits(UnitField.UNIT_INT_SHOW_WEAPON, 3);
			if (isNew || showUpdate) {
				this._showWeapon = this.GetShowWeapon();
				this._showCoat = this.GetShowCoat();
			}

			// 装备发生变化
			if (isNew
				|| showUpdate										// 武器、衣服、翅膀显示
			) {
				if (this.onAvatarChange)
					this.onAvatarChange();
			}

			// bit位
			if (isNew || mask.GetBit(UnitField.UNIT_INT_FLAG)) {
				this._isGuajibaohu = this.GetFlag(UnitField.UNIT_BIT_GUAJIBAOHU);
				if (this.onRedWaring) {
					this.onRedWaring(this.GetFlag(UnitField.UNIT_BIT_IS_SPELL_CASTING));
				}
			}

			// 主人名称
			if (isNew || strmask.GetBit(UnitField.UNIT_STR_MASTER_NAME)) {
				this._masterName = this.GetMasterName();
				this.checkName();
			}

		}

		fristUpdate():void{
			
		}
		private visible: boolean = true;
		setVisible(v: boolean): void {
			this.visible = v;
		}

		isVisible(): boolean {
			return this.visible;
		}

		// 主人名称
		private _masterName: string = '';
		get masterName(): string {
			return this._masterName;
		}

		// 名字
		private _unitName: string;
		set unitName(v: string) {
			this._unitName = v;
		}
		//是否是队长
		private iscaptain:number = 0;
		set captain(num:number){
			this.iscaptain = num
		}
		get captain(){
			return this.iscaptain
		}
		//设置武器
		private WeaponNum:number = 0;
		set Weapon(num:number){
			this.WeaponNum = num
		}
		get Weapon(){
			return this.WeaponNum
		}
		/** 设置职业 */
		private school:number = -1;
		set School(num:number)
		{
			this.school = num;
		}
		get School():number
		{
			return this.school;
		}
		/** 设置造型 */
		private shape:number = -1;
		set Shape(num:number)
		{
			this.shape = num;
		}
		get Shape():number
		{
			return this.shape;
		}
		//角色在场景状态
		private rolestateInScene:number = 0;
		set roleState(num:number){
			this.rolestateInScene = num
		}
		get roleState(){
			return this.rolestateInScene
		}
		/**染色*/
		private isranse:number =0;
		set ranse(num:number){
			this.isranse = num
		}
		get ranse(){
			return this.isranse
		}
		/**是否在可见场景中*/
		private islook:number =0;
		set look(num:number){
			this.islook = num
		}
		get look(){
			return this.islook
		}
		/**可接任务图标 1为可接 3为完成 4为未完成*/
		private isaccpet:number =0;
		set accpet(num:number){
			this.isaccpet = num
		}
		get accpet(){
			return this.isaccpet
		}
		/**升级特效*/
		private islevelup:number =0;
		set levelup(num:number){
			this.islevelup = num
		}
		get levelup(){
			return this.islevelup
		}
		/**NPC选中特效*/
		private isnpcselect:number =0;
		set npcselect(num:number){
			this.isnpcselect = num
		}
		get npcselect(){
			return this.isnpcselect
		}
		/**商店光标*/
		private isshop:number =0;
		set shop(num:number){
			this.isshop = num
		}
		get shop(){
			return this.isshop
		}
		/**宠物商店光标*/
		private ispetshop:number =0;
		set petshop(num:number){
			this.ispetshop = num
		}
		get petshop(){
			return this.ispetshop
		}
		/**掌门*/
		private ischief:number =0;
		set chief(num:number){
			this.ischief = num
		}
		get chief(){
			return this.ischief
		}
		/**藏宝图*/
		private isbaotu:number =0;
		set baotu(num:number){
			this.isbaotu = num
		}
		get baotu(){
			return this.isbaotu
		}
		/**比武场*/
		private isbiwu:number =0;
		set biwu(num:number){
			this.isbiwu = num
		}
		get biwu(){
			return this.isbiwu
		}
		/**屠魔试炼*/
		private istumo:number =0;
		set tumo(num:number){
			this.istumo = num
		}
		get tumo(){
			return this.istumo
		}
		/**帮派副本*/
		private isfamilyfuben:number =0;
		set familyfuben(num:number){
			this.isfamilyfuben = num
		}
		get familyfuben(){
			return this.isfamilyfuben
		}
		/**悬赏*/
		private isxuanshang:number =0;
		set xuanshang(num:number){
			this.isxuanshang = num
		}
		get xuanshang(){
			return this.isxuanshang
		}
		/**战斗*/
		private isbattle:number =0;
		set battle(num:number){
			this.isbattle = num
		}
		get battle(){
			return this.isbattle
		}
		/**主线*/
		private iszhuxian:number =0;
		set zhuxian(num:number){
			this.iszhuxian = num
		}
		get zhuxian(){
			return this.iszhuxian
		}
		/**副本*/
		private iscarbon:number =0;
		set carbon(num:number){
			this.iscarbon = num
		}
		get carbon(){
			return this.iscarbon
		}
		/**乱世降妖*/
		private iswelfare:number =0;
		set welfare(num:number){
			this.iswelfare = num
		}
		get welfare(){
			return this.iswelfare
		}
		/**福利*/
		private isdemon:number =0;
		set demon(num:number){
			this.isdemon = num
		}
		get demon(){
			return this.isdemon
		}
		/**自动寻路 */
		private isautowalk:number =0;
		set autowalk(num:number){/**自动寻路 */
			this.isautowalk = num
		}
		get autowalk(){
			return this.isautowalk
		}
		/**自动巡逻 */
		private isxunluo:number =0;
		set xunluo(num:number){/**自动巡逻 */
			this.isxunluo = num
		}
		get xunluo(){
			return this.isxunluo
		}
		/**停止移动 */
		private isstopwalk:number =0
		set stopwalk(num:number){/**停止移动 */
			this.isstopwalk = num
		}
		get stopwalk(){
			return this.isstopwalk
		}
		/**特效次数*/
		private iscount:number =0
		set count(num:number){
			this.iscount = num
		}
		get count(){
			return this.iscount
		}
		// 最终名字
		private _name: string;
		get name(): string {
			return this._name;
		}
		// 称谓
		private _appellation: string;
		get appellation(): string {
			return this._appellation;
		}
		set appellation(_v:string){
			this._appellation = _v;
		}

		//重载名字
		public SetName(value: string, needUpdate: boolean = false): void {
			this._unitName = value;
			if (needUpdate) this.checkName();
		}
		public GetName(): string {
			return this._unitName && this._unitName.length > 0 ? this._unitName : super.GetName();
		}

		private checkName(): void {
			let name = this._unitName;
			if (!name || !name.length) {
				name = super.GetName();
			}
			if (this._isPlayer || this._isRobot) {
				// 如果是玩家
				name = EnumToString.getPlayerName(name, true);
			}
			else if (this._isPet) {
				if (this._masterName) {
					//宠物名字特别处理 主人Oid
					let masterName = EnumToString.getPlayerName(this._masterName, true);
					name = StringU.substitute("【{0}】{1}", masterName, name);
				}
			}
			else if (this._typeid == UnitField.TYPE_ID_CREATURE) {
				if (this._level > 0 && !this._isNpc) {
					// 普通怪物标明等级
					name = StringU.substitute("{0}({1}级)", name, this._level);
				}
			}
			else{//NPC
				
			}
			this._name = name;
		}

		public SetPos(x: number, y: number): void {
			this.pos.x = x;
			this.pos.y = y;
			this.SetPosX(x);
			this.SetPosY(y);
			//console.log("Unit SetPos:", this._unitName, this.pos.x, this.pos.y);
		}

		//设置目标点位置
		public SetTarget(x?: number, y?: number): void {
			if (x && y) {
				this.target.x = x;
				this.target.y = y;
			}
		}

		//删除目标点
		public DeleteTarget(): void {
			this.target.set(Vector2.zero);
			this.targetTimer = 0;

		}

		//目标点不等于00点,说明是有目标的
		public HasTarget(): boolean {
			return !this.target.equal(Vector2.zero);
		}

		//取得两个对象之间的距离
		public Distance(other: Unit): number {
			return this.pos.dist(other.pos);
		}

		// --设置朝向,使用补间还是立即模式
		public SetToward2(toward: number, immediately?: boolean): boolean {
			// --如果设置朝向没有传入新方向则从下标读取, 客户端专用
			if (!toward) {
				toward = super.GetToward();
				if (this.toward == toward) {
					return true;
				}
			} else {
				super.SetToward(toward);
			}

			//toward = Math.abs((toward - 8)%8);
			this.toward = toward;
			this.ori.fromToward(toward);
			return true;
		}

		public SetMoveStatus(s?: number): void {
			if (s) {
				super.SetMoveStatus(s);
				this.moveStatus = s;
			} else {
				this.moveStatus = super.GetMoveStatus();
			}
		}

		//是否移动状态
		public get isMoving(): boolean {
			return this.moveStatus == MOVE_STATUS_MOVE;
		}

		/**
		 * 面朝对象
		 */
		public faceTarget(unit: Unit): void {
			if (!unit) {
				return;
			}
			let faceOri = Vector2.sub(null, unit.pos, this.pos);
			//得到8方向朝向
			this.faceToward = faceOri.getToward();
		}

		//通过路径进行移动
		public MoveToPath(path: Array<number>, now_pos: number) {
			let move_path_pos: number = -1;
			let allpost:Array<any> =[];
			// if(path.length == 4 )
			// {
				
			// 	let x = ( path[2] -path[0] )/4;
			// 		x = ( x > -1 && x <= 0 ) || ( x >= 0 && x < 1) ? 0 : x
			// 	let y = ( path[3] -path[1] )/4;
			// 		y = ( y > -1 && y <= 0 ) || ( y >= 0 && y < 1) ? 0 : y
			// 	for (var _index = 1; _index < 4; _index++) 
			// 	{
			// 		path.splice(path.length -2,0,(path[0]+_index*x))
			// 		path.splice(path.length -2,0,(path[1]+_index*y))
			// 	}

			// }
			
				for (let pos: number = now_pos; pos < path.length; pos += 2) {
				if (this.MoveTo(path[pos], path[pos + 1]) == false) {
					move_path_pos = pos
					let poss:Vector2 =new Vector2()
					poss.x = path[pos]
					poss.y = path[pos+1]
					
					if(this.isother == 1){/**1为玩家自己*/
						// Laya.timer.once(250,this,this.check_move,[poss])
						RequesterProtocols._instance.c2s_check_move(poss,[],game.modules.mainhud.models.HudModel.getInstance().movesceneid);
					}
					}
				}
			
			
			//已经到达目的地了
			if (move_path_pos == -1) {				
				this.movePath && (this.movePath.length = 0);				
				if(this.isother == 1){/**1为玩家自己*/
					game.scene.models.SceneProxy.getInstance().event(game.scene.models.MOVE_STOP);	
					RequesterProtocols._instance.c2s_role_stop(allpost,this.target,game.modules.mainhud.models.HudModel.getInstance().movesceneid);
					// if(AutoHangUpModels.getInstance().)
					if(this.istalk==0){//点击位置为非NPC
						this.istalk = 3
						game.modules.mainhud.models.HudModel.getInstance().autobatt.stop()
						game.modules.mainhud.models.HudModel.getInstance().autobatt.init()
					}				
				}	
				else{
					return false
				}			
				return true
			}
			this.movePath = path;
			this.move_path_pos = move_path_pos;
			return false
		}

		private check_move(poss:Vector2D):void
		{
			RequesterProtocols._instance.c2s_check_move(poss,[],game.modules.mainhud.models.HudModel.getInstance().movesceneid);
		}
		public MoveTo(x: number, y: number): boolean {
			//如果移动距离太近,瞬间就到了
			this.SetTarget(x, y);
			if (Math.floor(this.pos.x) == x && Math.floor(this.pos.y) == y) {
				
				return true;
			}
			// --设置为移动状态
			this.SetMoveStatus(MOVE_STATUS_MOVE);
			// //计算移动方向,TODO:这里要根据情况做寻路
			// Vector2.sub(this.ori, this.target, this.pos).normalize();
			// this.toward = this.ori.getToward();
			// // this.SetToward(this.toward);
			// //移动到目标点需要的秒数
			// let dist: number = this.target.dist(this.pos);
			// this.targetTimer = dist / this.speed;
			this.updateTargetTowardAndTimer();
			return false;
		}

		private updateTargetTowardAndTimer(): void {
			//计算移动方向,TODO:这里要根据情况做寻路
			Vector2.sub(this.ori, this.target, this.pos).normalize();
			this.toward = this.ori.getToward();
			// this.SetToward(this.toward);
			//移动到目标点需要的秒数
			let dist: number = this.target.dist(this.pos);
			this.targetTimer = dist / this.speed;
		}

		public MoveStop(toward?: number, x?: number, y?: number) {
			this.SetMoveStatus(MOVE_STATUS_IDLE);
			this.DeleteTarget();
			if (x && y) {
				Vector2.temp.x = x;
				Vector2.temp.y = y;
				if (this.pos.dist(Vector2.temp) > 1.5) {
					this.SetPos(x, y);
				}
			}
			if (toward) {
				this.SetToward2(toward, true);
			}
		}

		public static lerp(p0: number, p1: number, t: number): number {
			return p0 * (1 - t) + p1 * t;
		}

		public UpdateLocal(deltaTime: number): boolean {
			// --如果已经到达目标点则返回true
			let arriveTarget: boolean = true;
			// 有目标点才需要执行以下逻辑
			if (this.HasTarget()) {
				if (this.targetTimer < deltaTime)
					deltaTime = this.targetTimer;
				//定时器心跳
				this.targetTimer -= deltaTime;
				//目标定时器到了,说明到站了
				arriveTarget = this.targetTimer < 0.001

				//如果已经到达目标点，则设置为目标点，否则根据时间角度计算距离
				if (arriveTarget) {
					this.SetPos(this.target.x, this.target.y);
				}
				else {
					// --速度乘以时间得到距离再乘以单位向量得到位移向量 再加上要追赶的距离
					let offset: number = this.speed * deltaTime
					this.pos.add(this.ori.normalize().mul(offset));
					this.userData && this.userData.pos.set(this.pos);
				}
				// logd("UpdateLocal", this.pos.x, this.pos.y);
			}
			return arriveTarget;
		}

		private _moveDelay: boolean = false;
		set moveDelay(v: boolean) {
			this._moveDelay = v;
		}
		public Update(deltaTime: number) {
			if (this.moveStatus == MOVE_STATUS_MOVE && !this._moveDelay) {
				let dtime: number = deltaTime
				while (dtime && this.movePath && this.movePath.length != 0) {
					if (this.UpdateLocal(dtime)) {
						dtime = Math.abs(this.targetTimer)
						this.MoveToPath(this.movePath, this.move_path_pos + 2)
					}
					else {
						break;
					}
				}

				if (this.movePath && this.movePath.length == 0) {
					// console.log("人物停止移动");
					this.MoveStop();
				}
			}

			//生存状态 客户端模拟
			if (this._reappearTime > 0 && this._reappearTime <= Laya.timer.currTimer)
				this.setLiveFlag(false);
		}

		private _level: number = 0;
		get level(): number {
			return this._level;
		}
		// 血量
		private _hp: number = 0;
		get hp(): number {
			return this._hp;
		}
		set hp(v: number) {
			if (v < 0) {
				v == 0;
			}
			this._hp = v;
			this.SetHp(v);
		}
		// 最大血量
		private _maxHp: number = 0;
		get maxHp(): number {
			return this._maxHp;
		}
		set maxHp(v: number) {
			this._maxHp = v;
			this.SetMaxHp(v);
		}
		// 怒气
		private _anger: number = 0;
		get anger(): number {
			return this._anger;
		}
		set anger(v: number) {
			if (v < 0) {
				v == 0;
			}
			this._anger = v;
		}
		// 最大怒气
		private _maxAnger: number = 0;
		get maxAnger(): number {
			return this._maxAnger;
		}
		set maxAnger(v: number) {
			this._maxAnger = v;
		}

		// 目标位置X
		private _targetPosX: number = 0;
		get targetPosX(): number {
			return this._targetPosX;
		}
		// 目标位置X
		private _targetPosY: number = 0;
		get targetPosY(): number {
			return this._targetPosY;
		}

		// 精灵类型id
		private _typeid: number = 0;
		get typeid(): number {
			return this._typeid;
		}
		set typeid(v: number) {
			this._typeid = v;
			this._isPlayer = v == UnitField.TYPE_ID_PLAYER;
			this.isGameObject = v == UnitField.TYPE_ID_GAMEOBJ;
			this.checkIsNpc();
			this.checkIsMonster();
			this.checkIsBoss();
		}

		// npc标识
		private _npcFlag: number = 0;
		get npcFlag(): number {
			return this._npcFlag;
		}
		set npcFlag(v: number) {
			this._npcFlag = v;
			this.checkIsNpc();
			this.checkIsTeleteport();
			this.checkIsMonster();
			this.checkIsBoss();
		}

		// 模板id
		private _entryid: number = 0;
		get entryid(): number {
			return this._entryid;
		}
		set entryid(v: number) {
			this._entryid = v;
			this._isRobot = (Unit.ROBOT_TEMP_ID_LIST.indexOf(v) != -1);
		}

		// 玄兽品质
		private _quality:number = 0;
		get quality():number{
			return this._quality;
		}
		private _isRobot: boolean = false;
		//机器人
		get isRobot(): boolean {
			return this._isRobot;
		}

		// 主人OID
		private _masterOid: number = 0;
		set masterOid(v: number) {
			this._masterOid = v;
		}
		get masterOid() :number{
			return this._masterOid;
		}

		// 当前生存状态
		private _liveStatus: number = 0;
		set liveStatus(v: number) {
			if (v == this._liveStatus) {
				return;
			}
			this._liveStatus = v;
			this._isDied = (v == UnitField.LIVE_STATU_DIE);
			this.SetLiveStatus(v);
			if (this.onLiveStatusChange)
				this.onLiveStatusChange(v);
		}

		private _isDied: boolean = false;
		//是否死亡
		get isDied(): boolean {
			return this._isDied;
		}

		//设置生存状态 隐藏状态 特殊接口 特殊使用
		setLiveFlag(isDied: boolean = true, time: number = 0): void {
			let status: number;
			if (isDied) {
				status = UnitField.LIVE_STATU_DIE;
				time = time > 0 ? time : 2000;
				this._reappearTime = Laya.timer.currTimer + time;
			}
			else {
				status = UnitField.LIVE_STATUS_OK;
				this._reappearTime = 0;
			}
			this.liveStatus = status;
			this._isDied = isDied;
		}

		scale:number = 1;		//形象缩放
		high:number = 0;		//形象所处高度(3d)

		//坐骑模板id
		private _mountid: number = 0;
		get mountid(): number {
			return this._mountid;
		}
		set mountid(v: number) {
			if (v == this._mountid) {
				return;
			}
			this._mountid = v;
			this.SetMount(v);
			if (this.onAvatarChange)
				this.onAvatarChange();
		}
		//是否处于坐骑状态
		get isRiding(): boolean {
			return this._mountid > 0;
		}

		// 显示的衣服
		private _showCoat: number = 0;
		get showCoat(): number {
			return this._showCoat;
		}

		// 显示的武器
		private _showWeapon: number = 0;
		get showWeapon(): number {
			return this._showWeapon;
		}

		// 显示的翅膀
		private _showWings: number = 0;
		get showWings(): number {
			return this._showWings;
		}

		//攻击模式
		private _attackMode: number = 0;
		get attackMode(): number {
			return this._attackMode;
		}
		set attackMode(v: number) {
			this._attackMode = v;
			this.SetAttackMode(v);
		}

		//性别
		private _sex: number = 0;
		get sex(): number {
			return this._sex;
		}
		set sex(v: number) {
			this._sex = v;
			this.SetSex(v);
		}

		// 是否挂机保护
		private _isGuajibaohu: boolean = false;
		get isGuajibaohu(): boolean {
			return this._isGuajibaohu
		}

		private _isPlayer: boolean = false;
		//玩家对象
		get isPlayer(): boolean {
			return this._isPlayer;
		}

		private _isGameObject: boolean = false;
		//是否游戏对象
		get isGameObject(): boolean {
			return this._isGameObject;
		}
		set isGameObject(v: boolean) {
			this._isGameObject = v;
			this.checkIsTeleteport();
		}

		private _isTeleteport: boolean = false;
		//是否传送点
		get isTeleteport(): boolean {
			return this._isTeleteport;
		}
		private checkIsTeleteport(): void {
			this._isTeleteport = this._isGameObject && this._npcFlag == 1;
		}

		private _isMonster: boolean = false;
		//是否怪物
		get isMonster(): boolean {
			return this._isMonster;
		}
		private checkIsMonster(): void {
			this._isMonster = (this._typeid == UnitField.TYPE_ID_CREATURE && this._npcFlag != 2);
		}

		private _isBoss: boolean = false;
		//是否boss
		get isBoss(): boolean {
			return this._isBoss;
		}
		private checkIsBoss(): void {
			this._isBoss = (this._typeid == UnitField.TYPE_ID_CREATURE && this._npcFlag == 1);
		}

		private _isNpc: boolean = false;
		//是否npc
		get isNpc(): boolean {
			return this._isNpc;
		}
		private checkIsNpc(): void {
			this._isNpc = (this._typeid == UnitField.TYPE_ID_CREATURE && this._npcFlag == 2);
		}

		private _isPet: boolean = false;
		//是否宠物
		get isPet(): boolean {
			return this._isPet;
		}

		//该类型是否可以被攻击
		get isCanAttackType(): boolean {
			let isCanAttackPet = this.isPet;
			return !this.isNpc && !this.isGameObject && !isCanAttackPet;
		}

		//是否可以上坐骑
		get isCanMountUp(): boolean {
			let lockUp: boolean = this.buffMgr.lockMountUp;
			return !lockUp;
		}

		// 实例id
		private _instanceid: string;
		set instanceid(v: string) {
			this._instanceid = v;
			this.checkMapid();
		}
		get instanceid(): string {
			return this._instanceid;
		}

		// 地图id
		private _mapid: number = 0;
		get mapid(): number {
			return this._mapid;
		}
		checkMapid(): void {
			let value: number = parseInt(this._instanceid);
			if (value) {
				this._mapid = value;
			}
			else {
				let value: string = this._instanceid;
				if (!value || !value.length) {
					this._mapid = 0;
				}
				else {
					let values: Array<any> = value.split(";");
					if (values && values.length > 1) {
						this._mapid = values[1];
					}
					else {
						this._mapid = 0;
					}
				}
			}
		}

		public dispose(): void {
			this._buffMgr.dispose();
			this._buffMgr = null;
			this.onLiveStatusChange = null;
			this.onTargetPosChange = null;
			this._unitName = null;
			this.scale = 1;
			this.high = 0;
			super.dispose();
		}
	}
}
