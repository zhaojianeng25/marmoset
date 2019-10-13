module game.managers{
	/**
	 * 战斗管理器
	 * name 王谦
	 */
	export class FightMgr{
		public static MAX_ROUND:number = 10;		//回合数量
		//public static MAX_POS:number = 6;			//阵位数量
		public static MAX_POS:number = 14;			//阵位数量
		//public static MAX_ROLE:number = 12;			//战将数量
		public static MAX_ROLE:number = 28;			//战将数量
		public static MAX_ANGER:number = 100;		//最大怒气点数
		private static ADD_ANGER:number = 1;		//普攻涨怒气点数

		private static WINER_NONE:number = 0;		//无赢家
		private static WINER_ROLES1:number = 1;		//roles1赢
		private static WINER_ROLES2:number = 2;		//roles2赢

		private _roles1:FightRole[];	//roles1
		private _roles2:FightRole[];	//roles2
		private _is_pvp:boolean;		//是否pvp
		private _isInit:boolean;		//是否开始
		private _handler:Handler;		//回调
		private _buffMgr:BuffMgr;		//buff管理器
		private _spellMgr:SpellMgr;		//技能管理器

		private _show_info:any[];		//显示信息
		private _show_spell:any[];		//显示技能
		private _max_pos:number;		//最大阵位
		private _winer:number;			//赢家:1 roles1方,2 roles2方
		private _round:number;			//当前回合
		private _cur_role:FightRole;	//当前出手战将
		private _next_role:FightRole	//下个出手战将
		private _angers:number[];		//怒气点数
		private _hurt_info:any[];		//伤害结构
		private _new_round:boolean;		//是否新回合
		private _is_return:boolean;		//是否中断

		constructor(){

		}
		//清理
		private clear():void{
			this._roles1 = this._roles2 = null;
			this._handler = null;
			this._cur_role = this._next_role = null;
			this._show_info = null;
			this._show_spell = null;
			this._buffMgr = null;
			this._spellMgr = null;
			this._angers = null;
			this._hurt_info = null;
			this._max_pos = this._round = 0;
			this._isInit = this._is_pvp = this._new_round = this._is_return = false;
		}
		
		/*===========================双方战斗相关=============================*/
		/**
		 * 开始战斗
		 * @param roles1 战将列表1:pos按顺序给
		 * @param roles2 战将列表2:pos按顺序给
		 * @param is_pvp 是否pvp
		 * @param handler 回调
		 */
		public start(roles1:FightRole[],roles2:FightRole[],is_pvp:boolean,handler:Handler):void {
			this.clear();
            this.init(roles1,roles2,is_pvp);
			this._handler = handler;
			this._isInit = true;
			this._is_return = false;
			this._hurt_info.length = 0;
			this.calculRoles();//计算出手战将
			if(this._winer || this._is_return) return;
			if(!this._cur_role){
				this._winer = FightMgr.WINER_ROLES1;//没人，直接胜利
				this.returnInfo();
				return;
			}
			this.checkChuShou();
		}
		/*===========================初始化相关=============================*/
		//初始化函数 this.start()调用此函数
		private init(roles1:FightRole[],roles2:FightRole[],is_pvp:boolean):void {
			this._roles1 = roles1;
			this._roles2 = roles2;
			this._is_pvp = is_pvp;
			this._buffMgr = new BuffMgr();
			this._spellMgr = new SpellMgr();
			this._winer = FightMgr.WINER_NONE; //还没有赢家
			this._round = 1;
			this._angers = [50,50];
			this._hurt_info = [];
			//初始化战斗角色
			this.initRoles();
		}
		//初始化战斗角色 roles1方为 1 3 5 7 9 11 roles2方为 2 4 6 8 10 12
		private initRoles():void {
			this._show_info = [[],[]];
			this._max_pos = 0;
			let show1:any[] = this._show_info[0];
			let show2:any[] = this._show_info[1];
			let role:FightRole;
			for(let i:number = 0; i < FightMgr.MAX_POS; i++){
				if(i < this._roles1.length){
					role = this._roles1[i];
					role.pos = 2 * role.pos - 1;
					this._spellMgr.initSpells(role.spells);
					if(role.entry == 4){
						 this._buffMgr.addRoleBuff(role, 5);//德川家康初始buff
					}
					show1.push({name:role.name, entry:role.entry, pos:role.pos, cur_hp:role.hp, max_hp:role.max_hp, spells:ObjectU.cloneObjectList(role.spells), buffs:ObjectU.cloneObjectList(role.buffs)});
					if(role.pos > this._max_pos){
						 this._max_pos = role.pos;
					}
				}
				if(i < this._roles2.length){
					role = this._roles2[i];
					role.pos = 2 * role.pos;
					this._spellMgr.initSpells(role.spells);
					if(role.entry == 4){
						this._buffMgr.addRoleBuff(role, 5);//德川家康初始buff
					}
					show2.push({name:role.name, entry:role.entry, pos:role.pos, cur_hp:role.hp, max_hp:role.max_hp, spells:ObjectU.cloneObjectList(role.spells), buffs:ObjectU.cloneObjectList(role.buffs)});
					if(role.pos > this._max_pos){
						this._max_pos = role.pos;
					}
				}
			}
		}
		//寻找指定战将
		private findRoleByPos(pos:number):FightRole{
			if(pos <= 0 || pos > FightMgr.MAX_ROLE) return null;
			for(let i:number = 0; i < FightMgr.MAX_POS; i++){
				if(i < this._roles1.length && this._roles1[i].pos == pos) return this._roles1[i];
				if(i < this._roles2.length && this._roles2[i].pos == pos) return this._roles2[i];
			}
			return null;
		}
		//寻找敌方指定战将
		private findRoleByEntry(entry:number, isRole1:boolean):FightRole{
			if(!entry) return null;
			let roles:FightRole[] = isRole1?this._roles1:this._roles2;
			for(let i:number = 0; i < roles.length; i++){
				if(roles[i].entry == entry) return roles[i];
			}
			return null;
		}
		//清理敌方全部嘲讽buff
		private clearChaofeng(isRole1:boolean):void{
			let roles:FightRole[] = isRole1?this._roles1:this._roles2;
			for(let i:number = 0; i < roles.length; i++){
				this._buffMgr.clearChaofeng(roles[i].buffs);
			}
		}
		/**更新回合*/
		public updateRound():void{
			//技能回合、怒气点数
			this._show_spell = [[],[]];
			let show1:any[] = this._show_spell[0];
			let show2:any[] = this._show_spell[1];
			let role:FightRole;
			for(let i:number = 0; i < FightMgr.MAX_POS; i++){
				if(i < this._roles1.length){
					role = this._roles1[i];
					this._spellMgr.updateSpells(role.spells);
					show1.push({pos:role.pos, spells:ObjectU.cloneObjectList(role.spells)});
				}
				if(i < this._roles2.length){
					role = this._roles2[i];
					this._spellMgr.updateSpells(role.spells);
					show2.push({pos:role.pos, spells:ObjectU.cloneObjectList(role.spells)});
				}
			}
			this._round++;
			this._new_round = true;
		}
		/**
		 * 出手战斗
		 * @param round 回合
		 * @param pos 位置
		 * @param spell_id 技能id
		 * @param target_pos 目标阵位
		 * @param handler 回调
		 *///只有BattleMgr.fight()调用
		public fight(round:number, pos:number, spell_id:number, target_pos:number, handler:Handler):void{
			if(this._winer){
				logd("this battle is over");
				return;
			}
			if(round != this._round && pos != this._cur_role.pos) return;
			this._handler = handler;
			this._isInit = false;
			this._is_return = false;
			this._hurt_info.length = 0;
			this._hurt_info[0] = [];
			this.chuShou(this._hurt_info[0], this._cur_role, spell_id, target_pos);//roles1出手
			if(this._winer || this._is_return) return;
			this.checkNext();
			if(this._winer || this._is_return) return;
			this.checkChuShou();
		}
		/**退出当前战斗*/
		public exit():void{
			this.clear();
		}
		//检测并出手(roles2)
		private checkChuShou():void{
			if(this._cur_role.pos % 2 == 1){//roles1出手时，中断
				this.returnInfo();
				return;
			}
			let index:number = this._hurt_info.length;
			this._hurt_info[index] = [];
			this.chuShou(this._hurt_info[index], this._cur_role);
			if(this._winer || this._is_return){
				 return;
			}
			this.checkNext();
			if(this._winer || this._is_return){
				 return;
			}
			this.checkChuShou();
		}
		//出手
		private chuShou(hurt_info:any[], role:FightRole, spell_id:number = 0, target_pos:number = 0):void{
			let chushou_info:any = {state:0, pos:role.pos, new_round:this._new_round, anger:0, spells:null, buffs:null, buff_trigger_info:null, cast_info:null, extra_info:null};//出手信息
			this._new_round = false;
			this.buffTrigger(role, chushou_info);
			if(chushou_info.state < 0){//buff效果中断
				hurt_info.push(chushou_info);
				if(chushou_info.state == -1){
					 this.checkOver(role.pos % 2 == 1);//挂了,本队是否死光了
				}
				return;
			}
			let target:FightRole;
			if(this._buffMgr.hasChaofeng(role.buffs)){//是否被嘲讽
				spell_id = this._spellMgr.getNormalSpellId(role);//普通攻击
				target = this.findRoleByEntry(4, role.pos % 2 == 0);//德川家康
			}else{
				 target = this.findRoleByPos(target_pos);
			}
			let index:number;
			let mains:FightRole[];
			let targets:FightRole[];
			if(role.pos % 2 == 1){//roles1出手
				index = 0;
				mains = this._roles1;
				targets = this._roles2;
			}else{
				index = 1;
				mains = this._roles2;
				targets = this._roles1;
			}
			if(spell_id){
				let temp:any = Template.getSkillsTempById(spell_id);
				if(temp.cost > this._angers[index]) spell_id = 0;
			}
			if(!spell_id){
				 spell_id = this._spellMgr.getSpellId(role, this._angers[index]);
			}
			let spell_info:any = this._spellMgr.getSpellInfo(role.spells,spell_id);
			let temp:any = Template.getSkillsTempById(spell_id);
			this._angers[index] -= temp.cost;
			if(temp.type == 1){
				 this._angers[index]++;
			}
			chushou_info.anger = this._angers[index];
			// spell_info.round = temp.cool;
			//释放技能
			let cast_info:any[] = this._spellMgr.castSpell(spell_info, role, target, mains, targets, this._is_pvp);
			let poss:number[] = [];
			let info:any;
			let j:number;
			for(let i:number = 0; i < cast_info.length; i++){
				info = cast_info[i];
				poss.push(info.pos);
				target = this.findRoleByPos(info.pos);
				if(info.value && info.value.length){
					for(j = 0; j < info.value.length; j++)
						this.calculDamage(target, info.value[j]);
					this._spellMgr.checkPassiveHurt(target, role);
				}
				info.buffs = ObjectU.cloneObjectList(target.buffs);//技能目标buff更新
			}
			let extra_info:any[] = [];//额外信息{pos:role.pos, value:0}
			let times:number, value:number;
			for(let i:number = 0; i < targets.length; i++){//嘲讽回血
				if(targets[i].entry != 4 && targets[i].hp > 0) continue;
				times = this._buffMgr.getDHuixue(targets[i].buffs);
				if(times && poss.indexOf(targets[i].pos) == -1){//德川家康:队友被攻击,给自己加3%的血
					value = -times*targets[i].max_hp/100;
					this.calculDamage(targets[i], value);
					extra_info.push({pos:targets[i].pos, value:value});
				}
				break;
			}
			this._buffMgr.updateBuff(role.buffs);//自身回合，buff更新
			chushou_info.state = spell_id;
			chushou_info.spells = ObjectU.cloneObjectList(role.spells);
			chushou_info.buffs = ObjectU.cloneObjectList(role.buffs);
			chushou_info.cast_info = cast_info;
			chushou_info.extra_info = extra_info;
			hurt_info.push(chushou_info);
			//检测是否结束
			this.checkOver(role.pos % 2 != 1);//对面是否死光了
			if(this._winer || this._is_return){
				 return;
			}
			this.checkOver(role.pos%2==1);//本队是否死光了
		}
		//出手战将buff触发信息
		private buffTrigger(role:FightRole, chushou_info:any):void{
			let buff_trigger_info:any[] = [];//buff触发信息
			let buffs:any[] = role.buffs;
			let info:any;
			for(let i:number = 0; i < buffs.length; i++){
				info = this._buffMgr.buffTrigger(buffs[i], role);
				if(!info) continue;
				if(info.value) this.calculDamage(role, info.value);
				buff_trigger_info.push(info);
				if(role.hp <= 0) break;//挂了，没必要继续
			}
			chushou_info.buff_trigger_info = buff_trigger_info;
			//出手战将特殊状态处理
			if(role.hp <= 0){
				chushou_info.state = -1;
				this._buffMgr.updateBuff(role.buffs);//自身回合，buff更新
				chushou_info.buffs = ObjectU.cloneObjectList(role.buffs);
			}else if(this._buffMgr.isLimit(role.buffs)){
				chushou_info.state = -2;
				this._buffMgr.updateBuff(role.buffs);//自身回合，buff更新
				chushou_info.buffs = ObjectU.cloneObjectList(role.buffs);
			}
		}
		//检测是否结束
		private checkOver(isRole1:boolean):void{
			let roles:FightRole[] = isRole1?this._roles1:this._roles2;
			for(let i:number = 0; i < roles.length; i++){
				if(roles[i].hp > 0){
					return;
				}
			}
			this._winer = isRole1?FightMgr.WINER_ROLES2:FightMgr.WINER_ROLES1;
			this.returnInfo();
		}
		//返回信息
		private returnInfo():void{
			if(this._handler == null) return;
			let cur_pos:number = this._cur_role ? this._cur_role.pos : 0;
			let value:any = {//回调参数
				success:1,
				winer:this._winer,				//赢家:1 roles1方,2 roles2方
				round:this._round,				//当前回合
				hurt_info:this._hurt_info,		//伤害结构
				cur_pos:cur_pos,				//当前玩家出手:1 3 5 7 9 11
			};
			if(this._show_spell){
				value.show_spell = this._show_spell;
				this._show_spell = null;
			}
			if(this._isInit){
				this._isInit = false;
				value.show_info = this._show_info;	//显示初始化场景的战将，显示信息
				value.anger = this._angers[0];		//初始怒气点数
			}
			this._handler.runWith(value);
			this._is_return = true;
			if(this._winer) this.clear();//已有结果，直接清理
		}
		/*===========================战斗计算相关=============================*/
		/*计算出手战将*/
		private calculRoles():void{
			let pos:number = this._cur_role ? this._cur_role.pos : 0;
			pos += (pos % 2) == 0 ? 1 : 2;
			this._cur_role = this._next_role = null;
			if(pos > this._max_pos){
				if(this._round >= FightMgr.MAX_ROUND){//超过回合数
					this._winer = FightMgr.WINER_ROLES2;
					this.returnInfo();
					return;
				}
				this.updateRound();
				pos = 1;
			}
			this.searchChushouRoles(pos);//往后搜索:第1次
			if(!this._cur_role && !this._next_role){
				if(this._round >= FightMgr.MAX_ROUND){//超过回合数
					this._winer = FightMgr.WINER_ROLES2;
					this.returnInfo();
					return;
				}
				this.updateRound();//没搜索到:更新回合
			}
			this.searchChushouRoles(1);//新回合搜索:第2次
			if(!this._cur_role && !this._next_role){//没搜索到
				this.returnInfo();
				return;
			}
			if(this._cur_role && this._next_role){//双战将
				if(this.sortRoles(this._cur_role, this._next_role) > 0){//互换
					let role:FightRole = this._cur_role;
					this._cur_role = this._next_role;
					this._next_role = role;
				}
			}else{
				if(!this._cur_role){//无当前出手战将
					this._cur_role = this._next_role;
					this._next_role = null;
				}
			}
		}
		//搜索出手战将
		private searchChushouRoles(pos:number):void{
			if(this._cur_role || this._next_role){
				return;//已有找到，直接中断
			}
			let i1:number = 0;
			let i2:number = 0;
			let stop1:boolean, stop2:boolean;
			for (let i:number = 0; i < FightMgr.MAX_POS; i++){
				if(i1 < this._roles1.length){
					if(this._roles1[i1].pos <= pos){//搜索到当前限定阵位
						if(this._roles1[i1].pos == pos && this._roles1[i1].hp > 0){
							 this._cur_role = this._roles1[i1];
						}
						i1++;
					}else{
						stop1 = true;
					}
				}
				if(i2 < this._roles2.length){
					if(this._roles2[i2].pos <= pos+1){//搜索到当前限定阵位
						if(this._roles2[i2].pos == pos+1 && this._roles2[i2].hp > 0){
							 this._next_role = this._roles2[i2];
						}
						i2++;
					}else{
						stop2 = true;
					}
				}
				if(this._cur_role && this._next_role) return;//都找到了
				if(stop1 && stop2){//双方都搜索停止
					if(this._cur_role || this._next_role) return;//有找到了
					pos += 2;//后移搜索
					if(pos > this._max_pos) return;//超出当前最大阵位
					stop1 = stop2 = false;
					i--;
				}
			}
			//全部搜索一遍了
		}
		//对比出手战将
		private sortRoles(r0:FightRole, r1:FightRole):number{
			if(r0.speed > r1.speed) return -1;//速度
			if(r0.speed < r1.speed) return 1;
			if(r0.rare > r1.rare) return -1;//稀有度
			if(r0.rare < r1.rare) return 1;
			if(r0.level > r1.level) return -1;//等级
			if(r0.level < r1.level) return 1;
			if(r0.atk > r1.atk) return -1;//攻击
			if(r0.atk < r1.atk) return 1;
			if(r0.max_hp > r1.max_hp) return -1;//生命
			if(r0.max_hp < r1.max_hp) return 1;
			if(r0.def > r1.def) return -1;//防御
			if(r0.def < r1.def) return 1;
			return 0;
		}
		//检测下个出手战将
		private checkNext():void{
			if(this._next_role){
				this._cur_role = this._next_role;
				if(this._next_role.hp > 0){//还有血
					this._next_role = null;
					return;
				}
			}
			this.calculRoles();//计算出手战将
		}
		//统一在这处理伤害治疗
		private calculDamage(role:FightRole,value:number):void{
			role.hp -= value;
			if(role.hp < 0){
				role.hp = 0;
				if(role.entry == 4) this.clearChaofeng(role.pos%2==0);
			}else if(role.hp > role.max_hp) role.hp = role.max_hp;
			role.test_old_hps.push(value);
		}
	}
}