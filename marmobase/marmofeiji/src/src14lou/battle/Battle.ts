module battle {
	export class Battle {
		/**当前回合数 */
		public _cur_round: number = 0;
		/**动作管理 */
		private _action_mgr: ActionMgr;
		/**战斗界面 */
		private _page: BattlePage;
		/**战斗单位列表 key=index value=fightmodel*/
		private _models: Dictionary = new Dictionary;
		/**战斗场景 */
		public _scene: BattleScene;
		/**战场流程 */
		private battle_step: BattleStep = BattleStep.Inint;
		/** 出战宠物key */
		public battlePetKey: Laya.Dictionary = new Dictionary;
		/** 药品 */
		private drugkey: number = -1;
		/** 当前操作菜单不能被选中的目标 */
		private cantSelectTarget = [];
		/** 战斗开始数据 */
		private SSendBattleStart;
		/** 战斗物品使用次数 */
		private item_usetimes: Laya.Dictionary = new Laya.Dictionary(); 
		/** 是否处于观战状态 */
		private inWatch :boolean = false;
		public app:AppBase;
		constructor(private _app: AppBase, msg: hanlder.s2c_SSendBattleStart | hanlder.s2c_SSendWatchBattleStart) {
			this.initNetHandler();
			this.SSendBattleStart = msg;
			this._cur_round = msg.roundnum < 0 ? 0 : msg.roundnum;
			this.start();
			this._app = _app;
			if( msg instanceof hanlder.s2c_SSendWatchBattleStart ) this.inWatch = true;
		}
		get battleProxy(): BattleProxy {
			return this._app.battleProxy;
		}
		get isWatch():boolean
		{
			return this.inWatch;
		}
		get getApp():AppBase{
			return this._app;
		}
		/**
		 * 返回所有战斗单元
		 */
		get models(): FightModel[] {
			return this._models.values;
		}
		get page(): BattlePage {
			return this._page;
		}
		get scene(): BattleScene {
			return this._scene;
		}
		get battle_stepe(): BattleStep {
			return this.battle_step;
		}

		private initNetHandler(): void {
			// 793455: 服务器发给客户端，进战斗时主角的二级属性
			Network._instance.addHanlder(ProtocolsEnum.SSendRoleInitAttrs, this, this.onSSendRoleInitAttrs);
			// 793456: 服务器发给客户端，进战斗时宠物的二级属性
			Network._instance.addHanlder(ProtocolsEnum.SSendPetInitAttrs, this, this.onSSendPetInitAttrs);
			// 799432: 刷新人物属性的消息
			Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleData, this, this.onSRefreshRoleData);
			// 793458: 服务器向客户端发送已经使用过的道具列表，baseid
			Network._instance.addHanlder(ProtocolsEnum.SSendAlreadyUseItem, this, this.onSSendAlreadyUseItem);
			// 793434: 服务器向客户端发送战斗单元
			Network._instance.addHanlder(ProtocolsEnum.SSendAddFighters, this, this.onSSendAddFighters);
			// 793435: 服务器向客户端发送 开始回合操作选择
			Network._instance.addHanlder(ProtocolsEnum.SSendRoundStart, this, this.onSSendRoundStart);
			// 793457: 服务器向客户端发送剧本
			Network._instance.addHanlder(ProtocolsEnum.SSendRoundScript, this, this.onSSendRoundScript);
			// 793462: 服务器广播给战斗内所有人，某个角色已经播放动画完毕了
			Network._instance.addHanlder(ProtocolsEnum.SSendRoundPlayEnd, this, this.onSSendRoundPlayEnd);
			// 793439: 服务器向客户端发送结束战斗消息   
			Network._instance.addHanlder(ProtocolsEnum.SSendBattleEnd, this, this.onSSendBattleEnd);
			/**刷新出战宠物*/
			Network._instance.addHanlder(ProtocolsEnum.SSetFightPet, this, this.currentfightpet);
			/** 发送人物操作状态（准备中，请等待，掉线） */
			Network._instance.addHanlder(ProtocolsEnum.SSendBattlerOperateState, this, this.SSendBattlerOperateState);
			/** 将观战玩家移出战场 */
			Network._instance.addHanlder(ProtocolsEnum.SRemoveWatcher, this, this.SRemoveWatcher);
			
			

		}

		start(): void {
			this.loadSkills();
			this._scene = new BattleScene(this._app, this);
			this._action_mgr = new ActionMgr(this);	
			
		}

		//点击地面
		onSceneTouch(cellx: number, celly: number, hitObject: any): boolean {
			return this.scene && this.scene.onSceneTouch(cellx, celly, hitObject);
		}
		//长按地面
		onSceneLongTouch( hitObject: any): boolean {
			return this.scene && this.scene.onSceneLongTouch(hitObject);
		}
		/** 查看buffer */
		onforBuffer(fighterid:number):void
		{
			this.findRoleByIndex(fighterid);
			let fightmodel:FightModel = this._models.get(fighterid);
			this.page.showBuffer(fightmodel);
		}

		/**
		 * 玩家当前已学技能
		 */
		private _skills: game.data.template.SchoolSkillitemBaseVo[];
		get skills(): game.data.template.SchoolSkillitemBaseVo[] {
			return this._skills;
		}
		/** 战斗药品使用次数 */
		get battledrug(): Laya.Dictionary {
			return this.item_usetimes;
		}
		get operate_type():number
		{
			return this.cur_operate_type;
		}
		get SendBattleStart():any
		{
			return this.SSendBattleStart;
		}

		/**
		 * 初始化玩家已学的主动技能
		 */
		private loadSkills(): void {
			this._skills = [];
			let data: hanlder.S2C_send_inborns = game.modules.createrole.models.LoginModel.getInstance().SSendInbornsData.get("data");//未升级之前的等级数据
			// let _skillArr  = game.modules.skill.models.SkillModel.getInstance().skillArr;
			let _skillArr = game.modules.skill.models.SkillModel.getInstance().skillLevelDic;
			let dic = data.inborns as Laya.Dictionary;
			for (let index = 0; index < _skillArr.keys.length; index++) {
				// const id = _skillArr.keys[index];
				// const skill = game.modules.skill.models.SkillModel.getInstance().AcupointInfoBinDic[id] as game.data.template.AcupointInfoBaseVo;
				const real_id = _skillArr.keys[index];//skill.pointToSkillList[0];
				const skill_type = this.battleProxy.SkillTypeData[real_id] as SkillTypeConfigBaseVo;
				// 被动技能不可显示给玩家选择
				if (skill_type.skilltype == SkillType.UNACTIVE || skill_type.skilltype == SkillType.EQUIP_ENCHANTING ) continue;
				const real_skill = game.modules.skill.models.SkillModel.getInstance().CSchoolSkillitemBinDic[real_id] as game.data.template.SchoolSkillitemBaseVo;
				this._skills.push(real_skill);
			}
			// 按id排序
			this._skills.sort((a: SchoolSkillitemBaseVo, b: SchoolSkillitemBaseVo) => {
				return a.id - b.id;
			});
			this.checkInitEnd();
		}

		private _logic(): void {
			if (this._action_mgr) {
				this._action_mgr.logic(Laya.timer.delta);
			}
		}

		exit(): void {
			//console.log("----------------------------清理战场");
			if (this._action_mgr) {
				this._action_mgr.cleanAll();
				this._action_mgr = null;
			}
			this._app.uiRoot.HUD.close(PageDef.HUD_FIGHT_PAGE);
			this._page = null;
			/** 战斗结束移除 */
			LocalStorage.removeItem(LoginModel.getInstance().roleDetail.roleid+"_callPetTimes");
			if (this._scene) {
				this._scene.exit();
				this._scene = null;
			}
			/** 清除战斗中属性值改变 */
			game.modules.roleinfo.models.RoleInfoModel.getInstance().battleRoleAttr.clear();
			game.modules.pet.models.PetModel.getInstance().battlePetAttr.clear();
			Laya.timer.clear(this, this._logic);
			// 793455: 服务器发给客户端，进战斗时主角的二级属性
			Network._instance.removeHanlder(ProtocolsEnum.SSendRoleInitAttrs, this, this.onSSendRoleInitAttrs);
			// 793456: 服务器发给客户端，进战斗时主角宠物的二级属性
			Network._instance.removeHanlder(ProtocolsEnum.SSendPetInitAttrs, this, this.onSSendPetInitAttrs);
			// 799432: 刷新人物属性的消息
			Network._instance.removeHanlder(ProtocolsEnum.SRefreshRoleData, this, this.onSRefreshRoleData);
			// 793458: 服务器向客户端发送已经使用过的道具列表，baseid
			Network._instance.removeHanlder(ProtocolsEnum.SSendAlreadyUseItem, this, this.onSSendAlreadyUseItem);
			// 793434: 服务器向客户端发送战斗信息
			Network._instance.removeHanlder(ProtocolsEnum.SSendAddFighters, this, this.onSSendAddFighters);
			// 793435: 服务器向客户端发送 开始回合操作选择
			Network._instance.removeHanlder(ProtocolsEnum.SSendRoundStart, this, this.onSSendRoundStart);
			// 793457: 服务器向客户端发送剧本
			Network._instance.removeHanlder(ProtocolsEnum.SSendRoundScript, this, this.onSSendRoundScript);
			// 793462: 服务器广播给战斗内所有人，某个角色已经播放动画完毕了
			Network._instance.removeHanlder(ProtocolsEnum.SSendRoundPlayEnd, this, this.onSSendRoundPlayEnd);
			// 793439: 服务器向客户端发送结束战斗消息   
			Network._instance.removeHanlder(ProtocolsEnum.SSendBattleEnd, this, this.onSSendBattleEnd);
		}

		/**
		 * 
		 * @param index 根据索引返回战斗单位
		 */
		findRoleByIndex(index: number): FightModel {
			return this._models.get(index);
		}
		/** 根据索引移除战斗单元 */
		removeRoleByIndex(index:number):void
		{
			if(this._models.get(index))
			{
				this._models.remove(index);
			}
		}
		/** 根据id返回战斗单元 */
		findeRoleById( id:number ):FightModel 
		{
			for( let _index in this._models)
			{
				let model: FightModel = this._models.get(_index)
				if( model && model.dataID == id ) return model;
			}
			return null;
		}

		public self_role: FightModel;
		/**
		 * 判断当前玩家是否还活着
		 */
		get selfRoleAlive(): boolean {
			if (!this.self_role) {
				return false;
			}
			return this.self_role.hp > 0;
		}

		public self_pet: FightModel;
		/**
		 * 判断当前出战宠物是否还活着
		 */
		get selfPetAlive(): boolean {
			if (!this.self_pet) {
				return false;
			}
			return this.self_pet.hp > 0;
		}

		/**
		 * 加入战斗单元
		 * @param fighter 
		 */
		addNewFighter(fighter: game.scene.models.FighterInfoVo): void {
			//console.log("----------------加入战斗单元 qqqqqqqq");
			let model = new FightModel(this._app, fighter);
			// 是当前玩家
			if (model.is_self_role) {
				this.self_role = model;
			}
			// 判断是否是宠物，宠物服务端没发造型id
			if (fighter.fighterType == FighterType.FIGHTER_PET) {
				let modelid = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[model.dataID].modelid;
				model.shape = LoginModel.getInstance().cnpcShapeInfo[modelid].shape;
				model.baseShape = model.shape;
			}
			// 判断是否是当前玩家的出战宠物
			if (fighter.fighterType == FighterType.FIGHTER_PET && fighter.index == this.self_role.index + BattleConst.PET_INDEX) {
				/** 移除原宠物的模型 */
				if (this.self_pet) this._scene.removeFakeUint(this.self_pet.fakeUnit);
				else 
				{
					this.battlePetKey.set(LoginModel.getInstance().roleDetail.petIndex, LoginModel.getInstance().roleDetail.petIndex);
					this._callPetCount();
				}
				this.self_pet = model;
			}
			this._models.set(model.index, model);
			if (this._scene) {
				this._scene.addUnit(model);
			}
			
			
		}
		/** 计算召唤宠物次数 作用于断线重连 */
		private _callPetCount():void
		{
			let callPets = LocalStorage.getJSON(LoginModel.getInstance().roleDetail.roleid+"_callPetTimes");
			if (callPets && callPets instanceof Object) 
			{/** 如果有缓存的召唤数据 先更新防止覆盖 */
				for (var _index = 0; _index < callPets._keys.length; _index++) {
					this.battlePetKey.set(callPets._keys[_index], callPets._values[_index])
				}
			}
			LocalStorage.setJSON(LoginModel.getInstance().roleDetail.roleid+"_callPetTimes",this.battlePetKey);
		}

		/** 七星观职业显示连击点特效 */
		private schoolCombo_Point(model: FightModel)
		{
			if( !this.scene) return ;
			let school = this._GetSchoolByModel(model);
			if( !school ) return ;
			this.SchoolIconEffect(school,model);
			if (school == zhiye.qixing) { //七星观的职业
				this.scene.clearEffect(model.fakeUnit, SceneBattleRes.EFFECT_COMBO_POINT_1);
				this.scene.clearEffect(model.fakeUnit, SceneBattleRes.EFFECT_COMBO_POINT_2);
				this.scene.clearEffect(model.fakeUnit, SceneBattleRes.EFFECT_COMBO_POINT_3);
				this.scene.clearEffect(model.fakeUnit, SceneBattleRes.EFFECT_COMBO_POINT_4);
				this.scene.clearEffect(model.fakeUnit, SceneBattleRes.EFFECT_COMBO_POINT_5);
				switch (model.ep) {
					case 1:
						this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_COMBO_POINT_1, 0, -7, 0);
						break;
					case 2:
						this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_COMBO_POINT_2, 0, -7, 0);
						break;
					case 3:
						this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_COMBO_POINT_3, 0, -7, 0);
						break;
					case 4:
						this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_COMBO_POINT_4, 0, -7, 0);
						break;
					case 5:
						this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_COMBO_POINT_5, 0, -7, 0);
						break;
					default:
						break;
				}
			}
			
		}

		/** 门派图标 
		 * @param school 职业
		 * @param model 模型
		*/
		private SchoolIconEffect(school:number,model:FightModel):void
		{
			if( !this.scene) return ;
			if( !school ||  school == -1) return;
			 let _namelen = model.fighterType == FighterType.FIGHTER_PARTNER? 40 :45
			switch (school) {
				case zhiye.yunxiao:
					this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_YUNXIAO, _namelen, -113, 0);
					break;
				case zhiye.dahuang:
					this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_YUNXIAO, _namelen, -113, 0);
					break;
				case zhiye.cangyu:
					this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_CANGYU, _namelen, -113, 0);
					break;
				case zhiye.feixue:
					this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_FEIXUE, _namelen, -113, 0);
					break;
				case zhiye.tianlei:
					this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_TIANLEI, _namelen, -113, 0);
					break;
				case zhiye.wuliang:
					this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_WULIANG, _namelen, -113, 0);
					break;
				case zhiye.xuanming:
					this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_YOUMING, _namelen, -113, 0);
					break;
				case zhiye.qixing:
					this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_QIXING, _namelen, -113, 0);
					break;
				case zhiye.danyang:
					this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_DANYANG, _namelen, -113, 0);
					break;
				default:
					break;
			}
		}
		/** 根据模型判断职业 */
		_GetSchoolByModel( model:FightModel ): number
		{
			let school : number = -1;
			if( model.is_self_role  )
			{
				 school =  LoginModel.getInstance().roleDetail.school;
			}else if(model.fighterType == FighterType.FIGHTER_PARTNER)
			{
				let baseId  = model.dataID;
				let huobanbaseinfo: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[baseId];
				school = huobanbaseinfo.school;
			} 
			return school;
		}
		/**
		 * 是否能选择角色
		 * @param index 选中目标
		 */
		 canSelectRole(index:number): boolean {
			if (this.battle_step != BattleStep.Opera) {
				console.error("不能选中目标原因是==当前操作菜单处于======》" +this.battle_step);
				return false;
			}else if(index <= BattleConst.MAX_POS)
			{
				if( this.cur_operate_type === OperationType.ACTION_ATTACK || this.cur_operate_type === OperationType.ACTION_CATHCH
					|| this.cur_operate_type === OperationType.ACTION_UNIQUE_SKILL )
				{
					console.error("不能选中目标原因是==选中目标是自己方==当前指令类型====》" +this.cur_operate_type);
					return false;
				}else if( this.cantSelectTarget.indexOf(index) != -1)
				{
					console.error("不能选中目标原因是1===this.cantSelectTarget===》");
					return false;
				}
				
			}else
			{
				if(this.cantSelectTarget.indexOf(index) != -1 )
				{
					console.error("不能选中目标原因是1===this.cantSelectTarget===》");
					return false;
				} 
			}

			return true;
		}
		/**
		 * 回合开始
		 * @param round 回合数
		 * @param delay 倒计时
		 */
		roundStart(round: number, delay: number): void {
			console.log("#############################################回合开始 round=", round);
			if( !this.inWatch )
			{
				// this._page.setRoundDelay(delay);
				this.battle_step = BattleStep.Opera;
				this.cur_operate_role_type = OperateRoleType.None;
			}
			this._page.setRound(round);
			this.startRoundOperate();
			
					
		}

		/**
		 * 显示回合操作菜单
		 */
		 startRoundOperate(): void {
			if( this.inWatch ) //如果处于观战状态
			{
				this.page.showWatch(); return ;
			}
			/** 如果处于自动挂机状态 */
			let HookBattleData = game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData;
			if (HookBattleData.isautobattle === OperateType.Manual_Fight)//手动操作
			{
				// 如果玩家还没操作，并且玩家还活着，那么显示操作菜单
				if (this.cur_operate_role_type === OperateRoleType.None) {
					this.cur_operate_role_type = OperateRoleType.Role;
					/** 不管是否死亡人物操作菜单都存在 */
					this._page.showMainOpera();
					return;
					// 如果玩家已经操作，并且宠物还活着，那么显示操作菜单	
				} else if (this.cur_operate_role_type === OperateRoleType.Role) {
					this._scene.clearEffect(this.self_role.fakeUnit,SceneBattleRes.EFFECT_READY)
					this.cur_operate_role_type = OperateRoleType.Pet;
					if (this.selfPetAlive) {
						this._page.showPetOpera();
						return;
					}
					this.startRoundOperate();
					// 如果人宠都操作完毕，显示等待
				}
			} else if (HookBattleData.isautobattle === OperateType.Auto_Fight)//自动操作
			{
				this.page.showAutoBattle([]);
				this.showInReadyEffect();
			}

			if (this.cur_operate_role_type === OperateRoleType.Pet) {
				console.log("自己角色和宠物都已经死亡或者已经操作完，进入等待");
				this._page.showWait();
				if(this.self_pet )
				this._scene.clearEffect(this.self_pet.fakeUnit,SceneBattleRes.EFFECT_READY)
				this.battle_step = BattleStep.Wait;
				this.cur_operate_role_type = OperateRoleType.None;
			}

		}

		private cur_operate_type: OperationType = OperationType.ACTION_ATTACK;
		public cur_operate_role_type: OperateRoleType = OperateRoleType.None;
		public is_auto: boolean;
		private cur_skill: any;
		/**
		 * 技能，目标显示待选择特效光圈
		 */
		selectSkill(skill: any): void {
			this.cur_skill = skill;
			this.cur_operate_type = OperationType.ACTION_SKILL;
			this.getSelectTarget(this.cur_skill.targettype);
			// 根据技能类型，决定是选择我方还是敌方
			this.showSelectEffects(this.cur_skill.targettype == SkillTarget.ENEMY);
		}
		/** 选中特技 */
		selectEquipStunt(skill: any): void {
			this.cur_skill = skill;
			this.cur_operate_type = OperationType.ACTION_SPECIAL_SKILL;
			this.getSelectTarget(this.cur_skill.targettype);
			// 根据技能类型，决定是选择我方还是敌方
			this.showSelectEffects(this.cur_skill.targettype == SkillTarget.ENEMY);

		}
		/**
		 * 普攻，目标显示待选择特效光圈
		 */
		selectNormalAttack(): void {
			this.cur_skill = null;
			this.cur_operate_type = OperationType.ACTION_ATTACK;
			this.showSelectEffects();

		}
		/** 准备中的特效 */
		showInReadyEffect(): void {
			// if (type == FighterType.FIGHTER_PET && typeof (this.self_pet) != "undefined")
			// 	this.scene.showEffects(this.self_pet.fakeUnit, SceneBattleRes.EFFECT_READY,0,12,0);
			// else if (type == FighterType.FIGHTER_ROLE && typeof (this.self_role) != "undefined")
			// 	this.scene.showEffects(this.self_role.fakeUnit, SceneBattleRes.EFFECT_READY,0,12,0);
			for (let _index in this.models) {
				if (this.models[_index].fighterType == FighterType.FIGHTER_ROLE || this.models[_index].fighterType == FighterType.FIGHTER_PET) {
					this.scene.showEffects(this.models[_index].fakeUnit, SceneBattleRes.EFFECT_READY, 0, 12, 0);
				}

			}
		}
		/** 移除准备中的特效 */
		clearInReadyEffect(): void {
			// 清除我方选择目标特效
			this.scene.clearEffects(SceneBattleRes.EFFECT_READY, false);
		}
		/**
		 * 显示待选择目标特效光圈
		 * @param isAttack 是否是攻击技能
		 */
		showSelectEffects(isAttack: boolean = true): void {
			const units: FakeUnit[] = [];
			var max_pos = BattleConst.MAX_ROLE;
			var min_pos = BattleConst.MAX_POS;
			// 非攻击技能，则是对我方选择目标 敌方15-28 我方1-14
			if (!isAttack) {
				min_pos = 0;
				max_pos = BattleConst.MAX_POS;
			}
			// 筛选目标	
			for (let i = 0; i < this.models.length; i++) {
				const element = this.models[i];
				if (element.index > min_pos && element.index <= max_pos && this.cantSelectTarget.indexOf(element.index) == -1 ) {
					units.push(element.fakeUnit);
				}
			}
			// 显示特效
			// if (isAttack)
				this.scene.showEffects(units, SceneBattleRes.EFFECT_WAIT1);
			// else
			// {
			// 	this.scene.clearEffects(SceneBattleRes.EFFECT_WAIT1, false);
				// this.scene.showEffects(units, SceneBattleRes.EFFECT_WAIT0);	
			// }
				

		}
		/**
		 * 选择目标
		 * @param index 站位 
		 */
		touchFightRole(index: number): void {
			// 是否是回合菜单可操作状态
			if (!this.canSelectRole(index)) {
				return;
			}
			//选中对象清除显示技能flag
			if( this.page.show_skill_list ) this.page.show_skill_list = false;
			// 清除待选择目标特效
			this.scene.clearEffects(SceneBattleRes.EFFECT_WAIT1, false);
			// 清除我方选择目标特效
			this.scene.clearEffects(SceneBattleRes.EFFECT_WAIT0, false);
			// 给被选择目标新增特效
			if (index > BattleConst.MAX_POS && index <= BattleConst.MAX_ROLE) {
				const unit = this._models.get(index).fakeUnit;
				this.scene.showEffects(unit, SceneBattleRes.EFFECT_SELECT);
			}
			// 组装指令
			let operate_info: { operationType: battle.OperationType, aim: number, operationID: number } = {
				operationType: this.cur_operate_type,
				aim: index,
				operationID: 0
			};
			// 指令逻辑
			switch (this.cur_operate_type) {
				case OperationType.ACTION_ATTACK:
					operate_info.operationID = BattleConst.Normal_Attack_Skill_id;
					break;

				case OperationType.ACTION_SKILL:
					if (this.cur_skill)
					{
						operate_info.operationID = this.cur_skill.id;
						this.cur_skill = null;
					} 
					break;
				case OperationType.ACTION_SPECIAL_SKILL:
					if (this.cur_skill) 
					{
						operate_info.operationID = this.cur_skill.id;
						this.cur_skill = null;
					} 
					break;
				case OperationType.ACTION_USEITEM:
					operate_info.operationID = this.drugkey;
					this.drugkey = -1;
					this.cur_operate_type = OperationType.ACTION_ATTACK;
					break;
			}
			//如果当前操作对象是主角并且操作类型不是技能 选中技能退回 -1
			if(this.cur_operate_role_type == OperateRoleType.Role && this.cur_operate_type != OperationType.ACTION_SKILL )
				HudModel.getInstance().battleSkill = -1 ;
			else if(this.cur_operate_role_type == OperateRoleType.Pet && this.cur_operate_type != OperationType.ACTION_SKILL )
				HudModel.getInstance().battleSkill_pet = -1;
				this.saveAttaclSelection();
			// 如果是自动，目标由服务器控制
			if (this.is_auto) {
				operate_info.aim = 0;
			}

			const autooperate = this.is_auto ? 1 : 0;
			console.log("玩家操作选择:", this.cur_operate_role_type, autooperate, operate_info);
			// 该特效是循环特效，战斗中只能定时清理
			Laya.timer.once(1000, null, () => {
				if( this.scene )
				this.scene.clearEffects(SceneBattleRes.EFFECT_SELECT, false);
			})

			RequesterProtocols._instance.c2s_CSendAction(operate_info, this.cur_operate_role_type, autooperate);
			this.cantSelectTarget = [];//清空不可操作目标
			// NotifyMgr.notify(NotifyType.RoundOprateEnd);
			this.startRoundOperate();
		}
		/** 存储攻击指令 */
		private saveAttaclSelection():void
		{
			if( this.cur_operate_type != OperationType.ACTION_SKILL && this.cur_operate_type != OperationType.ACTION_DEFEND && this.cur_operate_type != OperationType.ACTION_ATTACK ) return;
			let hookBattleData = game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData;
			if( !this.cur_skill ) return;
			if( this.cur_operate_role_type == OperateRoleType.Role) //存储玩家选择
			{
				if( this.cur_operate_type == OperationType.ACTION_SKILL ) //使用技能
				{
					RequesterProtocols._instance.c2s_CSetCharOpt(GuaJiOpeType.FIRESKILL,this.cur_skill.id);
					hookBattleData.charoptype = OperationType.ACTION_SKILL;
					hookBattleData.charopid = this.cur_skill.id;
				}else if( this.cur_operate_type == OperationType.ACTION_ATTACK )
				{
					RequesterProtocols._instance.c2s_CSetCharOpt(GuaJiOpeType.ATTACK,0);
					hookBattleData.charoptype = OperationType.ACTION_ATTACK;
					hookBattleData.charopid = 0;
				}else if( this.cur_operate_type == OperationType.ACTION_DEFEND)
				{
					RequesterProtocols._instance.c2s_CSetCharOpt(GuaJiOpeType.DEFENSE,0);
					hookBattleData.charoptype = OperationType.ACTION_DEFEND;
					hookBattleData.charopid = 0;
				}
			}else if( this.cur_operate_role_type == OperateRoleType.Pet ) //存储宠物选择
			{
				if( this.cur_operate_type == OperationType.ACTION_SKILL ) //使用技能
				{
					RequesterProtocols._instance.c2s_CSetPetOpt(GuaJiOpeType.FIRESKILL,this.cur_skill.id);
					hookBattleData.petoptype = OperationType.ACTION_SKILL;
					hookBattleData.petopid = this.cur_skill.id;
				}else if( this.cur_operate_type == OperationType.ACTION_ATTACK )
				{
					RequesterProtocols._instance.c2s_CSetPetOpt(GuaJiOpeType.ATTACK,0);
					hookBattleData.petoptype = OperationType.ACTION_ATTACK;
					hookBattleData.petopid = 0;
				}else if( this.cur_operate_type == OperationType.ACTION_DEFEND)
				{
					RequesterProtocols._instance.c2s_CSetPetOpt(GuaJiOpeType.DEFENSE,0);
					hookBattleData.petoptype = OperationType.ACTION_DEFEND;
					hookBattleData.petopid = 0;
				}
			}
		}
		/** 发送自动战斗指令 
		 * @param operationType 操作类型
		 * @param operationer 操作对象 1 主角 0 宠物 -1 没有出战宠物
		 * @param spectialType 如果是技能的话就是技能Id
		*/
		autoFightCommand(operationType: number, operationer: number, spectialType: number = -1): void 
		{
			this.cur_operate_role_type = operationer;
			if (operationer != OperateRoleType.None) {
				// 组装指令
				let operate_info: { operationType: battle.OperationType, aim: number, operationID: number } = {
					operationType: operationType,
					aim: 0,
					operationID: spectialType
				};
				if (operate_info.operationID == 0) {
					operate_info.operationID = -1;
				}
				const autooperate = this.is_auto ? 1 : 0;
				//存在自动状态下 刷新人物操作状态优先于回合开始的准备特效 故这里需要延迟发送
				Laya.timer.once(1000,this,()=>{ RequesterProtocols._instance.c2s_CSendAction(operate_info, operationer, autooperate); },null,false) 
			}
			if( operationer == OperateRoleType.Pet || operationer == OperateRoleType.None)
			{
				let inTeamGroup = HudModel.getInstance().chargeInGroup(false);
				//不处于组队状态关闭计时器
				if (!inTeamGroup) NotifyMgr.notify(NotifyType.RoundOprateEnd);
				this._page.showWait();
				this.battle_step = BattleStep.Wait;
				this.cur_operate_role_type =  OperateRoleType.None;
			}
			
		}
		/** 无选中对象隐藏技能框 */
		judgehideSkillPanel(): void {
			if(this.page)
			this.page.judgehideSkillPanel();
		}

		/**逃跑 */
		runaway(): void {
			this.scene.clearEffects(SceneBattleRes.EFFECT_WAIT1, false);
			let operate_info: { operationType: battle.OperationType, aim: number, operationID: number } = {
				operationType: OperationType.ACTION_ESCAPE,
				aim: this.self_role.index,
				operationID: 0
			};
			const autooperate = this.is_auto ? 1 : 0;
			if(this.cur_operate_role_type == OperateRoleType.Role)
			HudModel.getInstance().battleSkill = -1 ;
			HudModel.getInstance().battleSkill_pet = -1;
			console.log("玩家操作选择:", this.cur_operate_role_type, autooperate, operate_info);
			RequesterProtocols._instance.c2s_CSendAction(operate_info, this.cur_operate_role_type, autooperate);
			// NotifyMgr.notify(NotifyType.RoundOprateEnd);
			this.startRoundOperate();
		}
		/**防御 */
		defense(): void {
			this.scene.clearEffects(SceneBattleRes.EFFECT_WAIT1, false);
			this.cur_operate_type = OperationType.ACTION_DEFEND;
			let operate_info: { operationType: battle.OperationType, aim: number, operationID: number } = {
				operationType: this.cur_operate_type,
				aim: -1,
				operationID: 0
			};
			
			const autooperate = this.is_auto ? 1 : 0;
			if(this.cur_operate_role_type == OperateRoleType.Role) //如果操作对象是主角清空上次使用的技能
			HudModel.getInstance().battleSkill = -1 ;
			HudModel.getInstance().battleSkill_pet = -1;
			operate_info.aim = this.cur_operate_role_type == OperateRoleType.Role ? this.self_role.index:this.self_pet.index;
			console.log("玩家操作选择:", this.cur_operate_role_type, autooperate, operate_info);
			RequesterProtocols._instance.c2s_CSendAction(operate_info, this.cur_operate_role_type, autooperate);
			this.saveAttaclSelection();
			// NotifyMgr.notify(NotifyType.RoundOprateEnd);
			this.startRoundOperate();
		}
		/**保护 
		 * @param cantTar 不能被选中的目标
		*/
		protect(cantTar:number): void {
			this.cantSelectTarget = [];
			this.cantSelectTarget.push(cantTar);
			for (let _index = 15; _index <= BattleConst.MAX_ROLE; _index++) {
				let tarModel = this.findRoleByIndex(_index);
				if (tarModel) this.cantSelectTarget.push(_index);
			}
			this.cur_operate_type = OperationType.ACTION_PROTECT;
			this.scene.clearEffects(SceneBattleRes.EFFECT_WAIT1, false);
		}
		/** 捕捉 */
		mainCatch(): void {
			this.cur_operate_type = OperationType.ACTION_CATHCH;
			this.showSelectEffects();
		}
		/**召唤宠物 
		 * @param callKey 召唤宠物key
		*/
		summonPet(callKey: number): void {
			let operate_info: { operationType: battle.OperationType, aim: number, operationID: number } = {
				operationType: OperationType.ACTION_SUMMON,
				aim: this.self_role.index,
				operationID: callKey
			};
			const autooperate = this.is_auto ? 1 : 0;
			console.log("玩家操作选择:", this.cur_operate_role_type, autooperate, operate_info);
			HudModel.getInstance().battleSkill = -1 ;
			RequesterProtocols._instance.c2s_CSendAction(operate_info, this.cur_operate_role_type, autooperate);
			// NotifyMgr.notify(NotifyType.RoundOprateEnd);
			this.startRoundOperate();
		}
		/** 清除特效 */
		clearTargetEffect(): void {
			this.scene.clearEffects(SceneBattleRes.EFFECT_WAIT1, false);
			this.scene.clearEffects(SceneBattleRes.EFFECT_WAIT0, false);
		}

		/**
		 * 初始化战场战斗单位, 观战玩家添加
		 * @param optcode 
		 * @param msg 
		 */
		private onSSendAddFighters(optcode: number, msg: hanlder.s2c_SSendAddFighters): void {
			console.log(">>>> Battle.onSSendAddFighters");

			if (!this._models) {
				this._models = new Dictionary();
			}

			let fighterList = msg.fighterList;
			for (let index = 0; index < fighterList.length; index++) {
				this.addNewFighter(fighterList[index]);
			}

			ModuleManager.hide(ModuleNames.MAIN_MENU);
			this._app.uiRoot.HUD.open(PageDef.HUD_FIGHT_PAGE);
			//等不到avatarUnit被初始化已经执行，故此次延迟
			Laya.timer.once(1000,this,()=>{
				//加入战斗单元判断职业显示
				for (let _index in this.models) {
					this.schoolCombo_Point(this.models[_index]);
				}
			})
			
		}
		/**
		 * 进战斗时主角的二级属性
		 * @param optcode 
		 * @param msg 
		 */
		private onSSendRoleInitAttrs(optcode: number, msg: hanlder.s2c_SSendRoleInitAttrs): void {
			console.log(">>>> Battle.onSSendRoleInitAttrs", msg);
		}
		/**
		 * 进战斗时宠物的二级属性
		 * @param optcode 
		 * @param msg 
		 */
		private onSSendPetInitAttrs(optcode: number, msg: hanlder.s2c_SSendPetInitAttrs): void {
			console.log(">>>> Battle.onSSendPetInitAttrs", msg);
		}
		/**
		 * 刷新人物属性的消息
		 * @param optcode 
		 * @param msg 
		 */
		private onSRefreshRoleData(optcode: number, msg: hanlder.s2c_SRefreshRoleData): void {
			console.log(">>>> Battle.onSRefreshRoleData");
			//this._page.pettest();
		}
		/**
		 * 服务器向客户端发送已经使用过的道具列表，baseid
		 * @param optcode
		 * @param msg 
		 */
		private onSSendAlreadyUseItem(optcode: number, msg: hanlder.s2c_SSendAlreadyUseItem): void 
		{
			this.item_usetimes.clear();
			this.item_usetimes = msg.itemlist;
		}
		/**
		 * 服务器通知客户端回合开始
		 * @param optcode 
		 * @param msg 
		 */
		private onSSendRoundStart(optcode: number, msg: hanlder.s2c_SSendRoundStart): void {
			console.log(">>>> Battle.onSSendRoundStart", msg.time, msg.environment, msg.aiactions);
			this._cur_round++;
			if (this._cur_round == 1 && !this.isWatch)
				this._action_mgr.addQueue(new aciton.DelayPlay(this, 100));
			if(!this.isWatch) this._action_mgr.addQueue(new aciton.ShowRoundDelay(this, this._cur_round, msg.time));
			else this._page.setRound(this._cur_round);
		}
	     /*
		 * 服务器通知客户端播放剧本
		 * @param optcode 
		 * @param msg 
		 */
		private onSSendRoundScript(optcode: number, msg: hanlder.S2C_SSendRoundScript): void {
			console.log(">>>> Battle.onSSendRoundScript");
				if (this._cur_round == 0) {
				return;
			}
			// 防止玩家点击了技能，没选择目标，蓝圈特效未清除
			this.scene.clearEffects(SceneBattleRes.EFFECT_WAIT1, false);
			this.scene.clearEffects(SceneBattleRes.EFFECT_WAIT0, false);
			this.scene.clearEffects(SceneBattleRes.EFFECT_READY, false);
			/** 播放脚本的时候关闭战斗背包界面 */
			let BattleBagViewMediator = game.modules.bag.BattleBagViewMediator.getInstance(this._app);
			BattleBagViewMediator.hide();
			this.battle_step = BattleStep.Play;
			if( !this.page) return ;
			this.page.startPlay();

			console.log(">>>>> playItem");
			for (let i = 0, len = msg.playItem.length; i < len; i++) {
				const playItem: game.scene.models.NewResultItemVo = msg.playItem[i];
				const lastPlayItem: game.scene.models.NewResultItemVo = msg.playItem[len - 1];
				var isFaShulianJi = false;
				if (len > 1 && playItem.demoExecuteVo.attackerID == lastPlayItem.demoExecuteVo.attackerID 
					&& playItem.demoExecuteVo.operationID == lastPlayItem.demoExecuteVo.operationID)
					isFaShulianJi = true;
					
				console.log("第",i,"个出手者脚本 攻击者：", playItem.demoExecuteVo.attackerID);
				/** 加个判断如果是召唤动作 刷新宠物数据 */
				if (playItem.demoExecuteVo.operationType === OperationType.ACTION_SUMMON)
					this.page.updatePetAttr();

				// 组装aiaction
				const beforeAiActions:action.ai.AiAction[] = []; //攻击行动前
				const afterAiActions:action.ai.AiAction[] = []; //攻击行动后
				const dieAiActions:action.ai.AiAction[] = []; //对应id死亡时
				for (let i = 0; i < msg.aiactions.length; i++) {
					const element: game.scene.models.AIOperationVo = msg.aiactions[i];
					if (element.actionSeq === i) {
						if (element.actionMoment === -1) {
							beforeAiActions.push(new action.ai.AiAction(this, element.actionMoment, element.actionFighterId, element.actionId));
						} else if (element.actionMoment === 0) {
							afterAiActions.push(new action.ai.AiAction(this, element.actionMoment, element.actionFighterId, element.actionId));
						} else if (element.actionMoment > 0) {
							dieAiActions.push(new action.ai.DieAiAction(this, element.actionMoment, element.actionFighterId, element.actionId));
						}
					}
				}

				// 攻击行动之前aiactions
				if (beforeAiActions.length > 0) {
					this._action_mgr.addQueue(...beforeAiActions);
				}
				let isLastaction = i == (len-1);
				// 攻击行动
				this._action_mgr.addQueue(new aciton.ResultItem(this, playItem, isFaShulianJi, dieAiActions, isLastaction ));
				// 攻击行动之后 aiactons
				if (beforeAiActions.length > 0) {
					this._action_mgr.addQueue(...afterAiActions);
				}
				if (i < len && !this.isWatch) {
					this._action_mgr.addQueue(new aciton.DelayPlay(this,100));
				}
			}
			console.log(">>>>> 主角属性变化", msg.roleChangedAttrs);
			console.log(">>>>> 宠物属性的变化", msg.petChangedAttrs);
			// 回合结束血量
			this._action_mgr.addQueue(new aciton.ModelFinalStaus(this, msg.fighterfinallyhps, msg.fighterfinallymps));
			console.log("-------------battle onSSendRoundScript end");
			/** 手动操作情况判断 */
			if( !this.inWatch ) this._page.ManualFightPerformance();
		}

		/**
		 * 服务器广播给战斗内所有人，某个角色已经播放动画完毕了
		 * @param optcode 
		 * @param msg 
		 */
		private onSSendRoundPlayEnd(optcode: number, msg: hanlder.s2c_SSendRoundPlayEnd): void {
			console.log(">>>> Battle.onSSendRoundPlayEnd, fighterId: " + msg.fighterId);
		}

		/**
		 * 服务器广播战斗结束
		 * @param optcode 
		 * @param msg 
		 */
		private onSSendBattleEnd(optcode: number, msg: hanlder.s2c_SSendBattleEnd): void {
			console.log("============ 战斗结束");
			if( !this.isWatch ) this._action_mgr.addQueue(new aciton.BattleEnd(this));
			else 
			{
				this.exit();
            	NotifyMgr.notify(NotifyType.BattleEnd);
			}

		}

		/**
		 * 战斗界面初始化完成
		 * @param page 
		 */
		onBattlePageInitSuccess(page: BattlePage): void {
			this._page = page;
			this.checkInitEnd();
		}

		/** 战斗药品使用选择目标 
		 * @param target 目标对象
		 * @param itemkey 药品key
		 * @param itemName 药品名称
		*/
		drugOnSelectTarget(target: number, itemkey: number,itemName): void {
			this.page.showBackOperate(itemName);
			this.drugkey = itemkey;
			this.cur_operate_type = OperationType.ACTION_USEITEM;
			let numstart = target == SkillTarget.ENEMY ? 15:1;
			let numend   = target == SkillTarget.ENEMY ? 28:14;
			this.getSelectTarget(target);
			this.showSelectEffects(target == SkillTarget.ENEMY);
		}
		/** 存储非选中目标 */
		private getSelectTarget(target:number):void
		{
			this.cantSelectTarget = [];
			if(target == SkillTarget.ENEMY)
			{// 如果目标是敌人 己方所有角色不能被选中
				for (let index = 1; index <= BattleConst.MAX_POS; index++) 
				{
					var tarModel = this.findRoleByIndex(index);
					if(tarModel) this.cantSelectTarget.push(index);
				}
			}else //目标是己方 敌方和部分己方不能被选中 
			{
				this.scene.clearEffects(SceneBattleRes.EFFECT_WAIT1, false);
				for (var _index = 1; _index <= BattleConst.MAX_ROLE; _index++) 
				{
					var tarModel = this.findRoleByIndex(_index);
					if(target == SkillTarget.OWN) //主角
					{
						if(tarModel && tarModel.fighterType != FighterType.FIGHTER_ROLE)
						this.cantSelectTarget.push(_index);
					}else if(target == SkillTarget.OWN_PET ) //宠物
					{
						if(tarModel && tarModel.fighterType != FighterType.FIGHTER_PET)
						this.cantSelectTarget.push(_index);
					}else if(target == SkillTarget.FRIEND_NOT_OWN)//除主角
					{
						if(tarModel && tarModel.fighterType == FighterType.FIGHTER_ROLE)
						this.cantSelectTarget.push(_index);
					}else if(target == SkillTarget.FRIEND_NOT_PET) //死亡对象使用
					{
						if(tarModel && tarModel.hp > 0)
						this.cantSelectTarget.push(_index);
					}
					else if(target == SkillTarget.FRIEND_FLOOR) //友方地面
					{
						if(tarModel && _index > BattleConst.MAX_POS )
						this.cantSelectTarget.push(_index);
					}
					else if(target == SkillTarget.FRIEND) //选取自己方
					{
						if(tarModel && _index > BattleConst.MAX_POS )
						this.cantSelectTarget.push(_index);
					}
				}
			}
		}

		/**
		 * 检查是否初始化完成
		 */
		private checkInitEnd(): void {
			if (!this._page) {
				return;
			}
			if (!this._scene) {
				return;
			}
			if (!this._skills) {
				return;
			}
			if( !this.isWatch )
			{
				// 通知服务器准备完成 空回合
				RequesterProtocols._instance.c2s_CSendRoundPlayEnd([1, 1, 1]);
			}else { 
				this._page.showWatch();
				// NotifyMgr.notify(NotifyType.RoundOprateEnd);
			} 
			Laya.timer.frameLoop(1, this, this._logic);
			
		}


		/** 出战宠物次数限制 */
		private currentfightpet(optcode: number, msg: hanlder.S2C_set_fightpet): void {
			if (msg.isinbattle == 1) //0=战斗外设置参战 1=战斗中召唤
			{
				this.battlePetKey.set(msg.petkey, msg.petkey);
				this._callPetCount();
			}
		}

		/** 刷新角色操作状态 */
		private SSendBattlerOperateState(optcode:number, msg:hanlder.s2c_SSendBattlerOperateState)
		{ //回合操作开始时，所有人状态为准备中，服务器不用发 1为准备中，2为操作完毕（请等待状态）3为代表掉线 人物操作结束时，服务器返回请等待状态，掉线时返回掉线状态
			let idnex = msg.battleid;
			let opstate = msg.state;
			let model = this.findRoleByIndex(idnex);
			// this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_READY,0,12,0);
			if( opstate == 2 && this._scene)
			 this._scene.clearEffect(model.fakeUnit,SceneBattleRes.EFFECT_READY);

		}
		/** 移除观战玩家 
		 * @param  index 站位标记
		*/
		private SRemoveWatcher(index: number): void {
			let role = this.findRoleByIndex(index);
			if (role) {
				if (role.is_self_role) this.exit();
				else {
					this._scene.removeFakeUint(role.fakeUnit);
					this.removeRoleByIndex(index);
				}
			}

		}

		/**
		 * 战斗系统提示
		 * @param msgID 提示ID
		 */
		public showTipsByMsgID(msgID: number): void {
			let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[msgID];
			if( !chattext ) return;
			console.log('showTipsByMsgID==========', msgID, "   ",chattext);
			var tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			tips.onShow(chattext.msg);
		}

		/**
		 * 战斗系统提示
		 * @param msg 提示
		 */
		public showTips(msg: string): void {
			console.log('showTips=========='+msg);
			var tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			tips.onShow(msg);
		}

		/**
		 * TODO 喊字飘字
		 * @param msg 
		 */
		public createFightPicTxt(target: FightModel, msg: string) {
			this._app.sceneRoot.createFightPicTxt(target.fakeUnit, msg);
		}

		/**
		 * 更新buff
		 * @param fighterid 目标
		 * @param buffID 
		 * @param round  -1为删除该buff，0为没有回合数的buff，>0为回合数
		 */
		public updateBuff(fighterid: number, buffID: number, round: number) {
			const fighter = this.findRoleByIndex(fighterid);
			// 获取对应的buf
			var buffVo = this.battleProxy.BuffConfigData[buffID];
			if (!buffVo.effect)
			{
				console.log("---------------------找不到特效 bufvo id ", buffVo.id, " buffVo.name" ,buffVo.name);
				return;
			}
				
			// 配置表存在这个buf且允许战斗中播放
			if (buffVo.id && buffVo.inbattle) {
				// -1为删除该buff，0为没有回合数的buff，>0为回合数
				if (round == -1)
					this._scene.clearFrameEffect(fighter.fakeUnit, buffVo.effect);
				else
				{
					// 播放特效
					var info: any = {}
					info.loop = true//是否循环;
					// buff释放位置
					info.x = buffVo.x;
					info.y = buffVo.y
					info.frameScale = buffVo.scale;
					info.isbuff =  true;
					info.isShow = buffVo.floor == 0 ? true : false;
					this._scene.showFrameEffect(fighter.fakeUnit, buffVo.effect, info);
				}
				var specialshowType;
				var alpha = 0.85;
				//specialshow == 1 受体透明度设置为0.5 specialshow == 2 受体播放跳动效果
				for (var i = 0; i < buffVo.specialshow.length; i ++){
					specialshowType = buffVo.specialshow[i];
					if (specialshowType == 1){
						alpha = round == -1 ? 1 : alpha;
						this._scene._scene.updateAlpha(fighter.fakeUnit, alpha);
					}
					else if (specialshowType == 2)
					{
						var info: any = {}
						info.loop = true//是否循环;
						// buff释放位置
						info.x = buffVo.x;
						info.y = buffVo.y
						info.frameScale = buffVo.scale;
						info.isbuff =  true;
						info.isShow = buffVo.floor == 0 ? true : false;
						this._scene.showFrameEffect(fighter.fakeUnit, buffVo.effect, info);
					}	
						
				}
				// 存储buf    
				fighter.addBuffer(buffID, round);
			}
		}
		/**
		 * 清除buff
		 * @param fighterid 站位
		 */
		public cleanBuff(target: FightModel){
			for(var i = 0; i < target.buffs.keys.length; i ++){
				var buffid: number =  target.buffs.keys[i];
				var buffVo = this.battleProxy.BuffConfigData[buffid];
				this._scene.clearFrameEffect(target.fakeUnit, buffVo.effect);
			}
		}

		/**
		 * 检查buff
		 * @param fighter 攻击者
		 * @param eBattleOperate 指令 
		 */
		CheckBuffBeforeOperate(fighter:FightModel, eBattleOperate: number): void 
		{
			var buffs = fighter.buffs;
			for (var i = 0; i < buffs.values.length; i++) {
				var buffid: number = buffs.keys[i];
				var buffVo = this.battleProxy.BuffConfigData[buffid];

				if (buffVo.cleartype == 4 || buffVo.cleartype == 5) {
					for (var i = 0; i < buffVo.specialshow.length; i++)
					{
						if (buffVo.specialshow[i] == 1) {
							if (eBattleOperate == OperationType.ACTION_ATTACK
								|| eBattleOperate == OperationType.ACTION_SKILL && buffVo.cleartype == 5) {
								this._scene._scene.updateAlpha(fighter.fakeUnit, 255);
								return;
							}
						}
					}
				}
			}
		}

		/**
		 * 更新属性 TODO
		 * @param fighterid 目标
		 * @param attrID 属性ID
		 * @param value 值
		 */
		public updateAttr(fighterid: number, attrID: number, value: number) 
		{
			let fighterType = this.findRoleByIndex(fighterid).fighterType;
			if(fighterType == FighterType.FIGHTER_ROLE)
			{
				game.modules.roleinfo.models.RoleInfoModel.getInstance().battleRoleAttr.set(attrID,value);
				if(attrID == 120) //刷新怒气值
				{
					let fighter = this.findRoleByIndex(fighterid);
					Laya.timer.once(800,this,()=>{ if( this._page ) this._page.updateSp(fighter,value); })
				}
				
			}
				
			else if(fighterType == FighterType.FIGHTER_PET)
				game.modules.pet.models.PetModel.getInstance().battlePetAttr.set(attrID,value);
		}

		/**
		 * 飘字
		 * @param text_type 类型
		 * @param num 数值
		 * @param toward 朝向 
		 * @param target 目标
		 */
		public ShowFightxt(target: FightModel, type: number, data: any, isbottom: boolean = false) {
			if( !target ) return ;
			this._app.sceneRoot.createdFightxt(target.fakeUnit, type, data, isbottom);
		}

		/**
		 * 播放战斗背景音乐
		 * @param musicID 音乐ID
		 */
		public playBattleGroundMusic(musicID : number){
			// TODO 背景音乐加载没写好
			//BattleBackGroundBaseVo = this.battleProxy.BattleBackGroundMusicData[musicID];
			this._app.playMusic("");
		}
		/**
		 * ai语音
		 */
		public PlayAISpeak(sexfile : string, battler:FightModel){
			this._app.playSound(sexfile);
		}
	}
}