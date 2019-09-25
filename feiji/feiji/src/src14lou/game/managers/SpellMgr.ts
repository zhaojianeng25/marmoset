module game.managers{
	/**
	 * 技能管理器
	 * name 王谦
	 */
	export class SpellMgr{
		private _oneFront:number[][]; 		//前排一个
		private _oneBack:number[][]; 		//后排一个
		private _oneAdj:number[][]; 		//相邻一个
		private _handler_targets:string[];	//目标函数路由
		private _handler_cast:string[];		//技能函数路由

		private _buffMgr:BuffMgr;	//buff管理器

		constructor(){
			this.initTagetsHander();
			this.initSpellHander();
			this._buffMgr = new BuffMgr();
		}
		/**处理技能回合*/
		public initSpells(spells:any[]):void{
			for(let i:number = 0; i < spells.length; i++){
				spells[i].round = 0;
			}
		}
		/**获得普攻技能id*/
		public getNormalSpellId(role:FightRole):number{
			let spells:any[] = role.spells;
			let temp:any;
			for(let i:number = 0; i < spells.length; i++){
				temp = Template.getSkillsTempById(spells[i].id);
				if(temp.type == 1) return temp.id;
			}
			return 0;
		}
		/**获得出手技能id*/
		public getSpellId(role:FightRole, anger:number):number{
			let spells:any[] = role.spells;
			let temp:any;
			let spell_id:number = 0;
			let max:number = 0;
			for(let i:number = 0; i < spells.length; i++){
				if(spells[i].round > 0) continue;//回合冷却中
				temp = Template.getSkillsTempById(spells[i].id);
				if(!temp || temp.cost > anger || max > temp.cost) continue;//怒气不足或不是最大怒气技能(优先释放靠后技能)
				spell_id = temp.id;
				max = temp.cost;
			}
			return spell_id;
		}
		/**获得出手技能信息*/
		public getSpellInfo(spells:any[], spell_id:number):any{
			for(let i:number = 0; i < spells.length; i++){
				if(spells[i].id == spell_id) return spells[i];
			}
			return null;
		}
		/**处理技能回合*/
		public updateSpells(spells:any[]):void{
			for(let i:number = 0; i < spells.length; i++){
				if(spells[i].round >= 1) spells[i].round--;
			}
		}
		/**技能释放*/
		public castSpell(spell_info:any, main:FightRole, target:FightRole, mains:FightRole[], targets:FightRole[], is_pvp:boolean):any[]{
			let id:number = spell_info.id;
			let funName:string = this._handler_cast[id];
			if(!funName || !this[funName]) return null;
			return this[funName](spell_info, main, target, mains, targets, is_pvp);
		}
		//是否命中
		private isHit(main:FightRole, target:FightRole):boolean{
			let eva = target.eva + this._buffMgr.getBonusEva(target.buffs);
			let hit:number = main.hit + this._buffMgr.getBonusHit(main.buffs);
			return Random.randInt(1,100) > eva-hit;//目标没闪避成功
		}
		//是否暴击
		private isCrit(main:FightRole, target:FightRole):boolean{
			let crit_def:number = 0;//target.crit_def + this._buffMgr.getBonusCritDef(target.buffs);
			let crit:number = main.crit + this._buffMgr.getBonusCrit(main.buffs);
			return Random.randInt(1,100) <= crit-crit_def;//自己没暴击成功
		}
		//计算伤害
		private calculDamage(main:FightRole, target:FightRole, times:number, is_pvp:boolean):number{
			if (this._buffMgr.isWudi(target.buffs)) return 0;//无敌，无处入手
			let atk:number = main.atk * (1+this._buffMgr.getBonusDamge(main.buffs)/100);
			let def:number = target.def * (1+this._buffMgr.getBonusDef(target.buffs)/100);
			let damage:number = atk - def;
			damage = times*damage;
			if(damage < 0) damage = 1;
			return damage;
		}
		//计算暴击伤害
		private calculCritHurt(main:FightRole, target:FightRole):number{
			return this._buffMgr.getBonusCritHurt(main.buffs);
		}
		
		/*==============================目标选择相关================================*/
		//取目标
		private getTargets(type:number, main:FightRole, mains:FightRole[], target:FightRole, targets:FightRole[]):FightRole[]{
			if(!main || !mains || !targets) return null;
			let funName:string = this._handler_targets[type];
			if(!funName || !this[funName]) return null;
			return this[funName](main, mains, target, targets);
		}
		//获取相邻信息
		private getOneAdjInfo(index:number,row:number[]):number[]{
			if(!row || !row.length || index < 0 || index >= row.length) return null;
			let list:number[] = [];
			let idx:number;
			for(let i:number = 1; i < row.length; i++){//左右向外扩展
				idx = index - i;
				if(idx >= 0) list.push(row[idx]);
				idx = index + i;
				if(idx < row.length) list.push(row[idx]);
			}
			return list;
		}
		//目标函数路由
		private initTagetsHander():void{
			let rows1:number[][] = [[1,3,5],[7,9,11]];
			let rows2:number[][] = [[2,4,6],[8,10,12]];
			this._oneFront = [];//前排一个:[2,4,6,8,10,12]、[1,3,5,7,9,11]、[4,2,6,10,8,12]、[3,1,5,9,7,11]、[6,2,4,12,8,10]、[5,1,3,11,7,9]
			this._oneBack = [];//后排一个:[8,10,12,2,4,6]、[7,9,11,1,3,5]、[10,8,12,4,2,6]、[9,7,11,3,1,5]、[12,8,10,6,2,4]、[11,7,9,5,1,3]
			this._oneAdj = [];//相邻一个:[3,5]、[4,6]、[1,5]、[2,6]、[3,1]、[4,2]、[9,11]、[10,12]、[7,11]、[8,12]、[9,7]、[10,8]
			let row00:number[],row01:number[],row10:number[],row11:number[];
			let pos1:number, pos2:number, index:number, pos:number;
			let isFront:boolean,isRows1:boolean;
			for(let i:number = 0; i < FightMgr.MAX_POS; i++){
				pos1 = i+1;
				pos2 = pos1+FightMgr.MAX_POS;
				//数值计算
				index = rows1[0].indexOf(pos1);
				if(index == -1) rows1[1].indexOf(pos1);
				if(index == -1){
					isRows1 = false;
					index = rows2[0].indexOf(pos1);
					if(index == -1) rows2[1].indexOf(pos1);
				}else isRows1 = true;
				if(index == -1) continue;
				if(isRows1){//阵位列表
					row00 = rows1[0].concat();
					row01 = rows1[1].concat();
					row10 = rows2[0].concat();
					row11 = rows2[1].concat();
				}else{
					row00 = rows2[0].concat();
					row01 = rows2[1].concat();
					row10 = rows1[0].concat();
					row11 = rows1[1].concat();
				}
				pos = row10.splice(index,1)[0];
				row10.unshift(pos);
				pos = row11.splice(index,1)[0];
				row11.unshift(pos);
				this._oneFront[pos2] = this._oneFront[pos1] = row10.concat(row11);
				this._oneBack[pos2] = this._oneBack[pos1] = row11.concat(row10);
				this._oneAdj[pos1] = this.getOneAdjInfo(index, row00);
				this._oneAdj[pos2] = this.getOneAdjInfo(index, row01);
			}
			this._handler_targets = [];
			this._handler_targets[1] = "getFrontOne";		//前排一个
			this._handler_targets[2] = "getFrontAll";		//前排全部
			this._handler_targets[3] = "getColumn";			//列目标
			this._handler_targets[4] = "getTargetAll";		//敌方全体
			this._handler_targets[5] = "getMain";			//自身
			this._handler_targets[6] = "getTargetOne";		//敌方单体
			this._handler_targets[7] = "getMainAll";		//己方全体
		}
		//通过阵位列表选择未死战将
		private getRolesByPoss(roles:FightRole[], targets:FightRole[], poss:number[]):number{
			if(!roles || !targets || !targets.length || !poss || !poss.length) return FightMgr.MAX_ROLE;//找不到或没处放
			let min:number = FightMgr.MAX_ROLE;
			let index:number;
			for(let i:number = 0; i < targets.length; i++){
				if(targets[i].hp <= 0) continue;
				index = poss.indexOf(targets[i].pos);
				if(index == -1) continue;
				roles[index] = targets[i];
				if(index < min) min = index;
			}
			return min;
		}
		//整理列表:全部前移
		private reSortList(roles:FightRole[]):void{
			let index:number = 0;
			for(let i:number = 0; i < roles.length; i++){
				if(!roles[i]) continue;
				roles[index] = roles[i];
				index++;
			}
			roles.length = index;
		}
		//前排一个
		private getFrontOne(main:FightRole, mains:FightRole[], target:FightRole, targets:FightRole[]):FightRole[]{
			if(target && target.hp > 0) return [target];
			let roles:FightRole[] = [];
			let min:number = this.getRolesByPoss(roles, targets, this._oneFront[main.pos]);
			return min<FightMgr.MAX_ROLE?[roles[min]]:null;
		}
		//前排全部
		private getFrontAll(main:FightRole, mains:FightRole[], target:FightRole, targets:FightRole[]):FightRole[]{
			let roles:FightRole[] = [];
			let min:number = this.getRolesByPoss(roles, targets, this._oneFront[main.pos]);
			if(min == FightMgr.MAX_ROLE) return null;//没找到
			if(min < 3 && roles.length > 3) roles.length = 3;//前排有
			this.reSortList(roles);
			if(target && target.hp > 0){
				let index:number = roles.indexOf(target);
				if(index != -1) roles.splice(index, 1);
				roles.unshift(target);
			}
			return roles;
		}
		//列目标
		private getColumn(main:FightRole, mains:FightRole[], target:FightRole, targets:FightRole[]):FightRole[]{
			let roles:FightRole[] = [];
			let pos:number = main.pos;
			if(target && target.hp > 0) pos = target.pos%2==1?target.pos+1:target.pos-1;
			let min:number = this.getRolesByPoss(roles, targets, this._oneFront[pos]);
			if(min == FightMgr.MAX_ROLE) return null;//没找到
			let index:number = 0;//筛选列目标
			for(let i:number = min; i < roles.length; i+=3){
				if(!roles[i]) continue;
				roles[index] = roles[i];
				index++;
			}
			roles.length = index;
			return roles;
		}
		//敌方全体
		private getTargetAll(main:FightRole, mains:FightRole[], target:FightRole, targets:FightRole[]):FightRole[]{
			let roles:FightRole[] = [];
			let pos:number = main.pos%2==1?main.pos+1:main.pos-1;
			for(let i:number = 0; i < targets.length; i++){
				if(targets[i].hp <= 0) continue;
				if(targets[i].pos != pos) roles.push(targets[i]);
				else roles.unshift(targets[i]);
			}
			if(target && target.hp > 0){
				let index:number = roles.indexOf(target);
				if(index != -1) roles.splice(index, 1);
				roles.unshift(target);
			}
			return roles;
		}
		//自身
		private getMain(main:FightRole, mains:FightRole[], target:FightRole, targets:FightRole[]):FightRole[]{
			return [main];
		}
		//敌方单体:后排优先
		private getTargetOne(main:FightRole, mains:FightRole[], target:FightRole, targets:FightRole[]):FightRole[]{
			if(target && target.hp > 0) return [target];
			let roles:FightRole[] = [];
			let min:number = this.getRolesByPoss(roles, targets, this._oneBack[main.pos]);
			return min<FightMgr.MAX_ROLE?[roles[min]]:null;
		}
		//己方全体
		private getMainAll(main:FightRole, mains:FightRole[], target:FightRole, targets:FightRole[]):FightRole[]{
			let roles:FightRole[] = [];
			for(let i:number = 0; i < mains.length; i++){
				if(mains[i].hp <= 0) continue;
				if(mains[i] != main) roles.push(mains[i]);
				else roles.unshift(mains[i]);
			}
			return roles;
		}

		/*==============================技能释放相关================================*/
		//技能函数路由
		private initSpellHander():void {
			let temps:any = Template.data["tb_skills"];
			this._handler_cast = [];
			for(let i = 0; i < temps.length; i++){
				if(!temps[i]) continue;
				let castSpellName:string = "castSpell"+temps[i].id;
				if(this[castSpellName]) this._handler_cast[temps[i].id] = castSpellName;
				else this._handler_cast[temps[i].id] = "castNormal";//默认普通攻击
			}		
		}
		//纯伤害技能
		private castNormal(spell_info:any, main:FightRole, target:FightRole, mains:FightRole[], targets:FightRole[], is_pvp:boolean):any[]{
			let cast_info:any[] = [];
			let temp:any = Template.getSkillsTempById(spell_info.id);
			let roles:FightRole[] = this.getTargets(temp.target, main, mains, target, targets);
			if(!roles || !roles.length) return null;
			let hurts:number[] = temp.hurts;
			if(!hurts.length) hurts[0] = 100;
			let buff_info:number[] = temp.buff_target&&temp.buff_target.length?temp.buff_target:null;
			let info:any;
			let j:number, damage:number;
			for(let i:number = 0; i < roles.length; i++){
				info = {pos:roles[i].pos, hit_info:[], value:[], buffs:null};
				for(j = 0; j < hurts.length; j++){
					if(this.isHit(main, roles[i])){//命中
						damage = hurts[j]*this.calculDamage(main, roles[i], 1, is_pvp)/100;
						if(!this.isCrit(main, roles[i])){//暴击
							info.hit_info[j] = UnitField.HIT_NOMAL;
							info.value[j] = damage;
						}else{
							info.hit_info[j] = UnitField.HIT_CRIT;
							info.value[j] = (1.5+this.calculCritHurt(main, roles[i]))*damage;
						}
					}else{
						info.hit_info[j] = UnitField.HIT_MISS;
						info.value[j] = 0;
					}
				}
				if(buff_info && Math.random()*100 < buff_info[1]) this._buffMgr.addRoleBuff(roles[i], buff_info[0]);//目标触发buff
				cast_info.push(info);
			}
			buff_info = temp.buff_self&&temp.buff_self.length?temp.buff_self:null;
			if(buff_info && Math.random()*100 < buff_info[1]) this._buffMgr.addRoleBuff(main, buff_info[0]);//自身触发buff
			return cast_info;
		}
		/*==============================被动技能相关================================*/
		/**检测受伤被动技能*/
		public checkPassiveHurt(main:FightRole, cast:FightRole):void{
			if(main.entry == 4){//德川家康
				let passiveId:number = 14;
				let temp:any;
				let buff_info:number[];
				for(let i:number = 0; i < main.passives.length; i++){
					if(main.passives[i].id != passiveId) continue;
					if(Math.random() > main.passives[i].rate) return;//未触发
					temp = Template.getSkillsTempById(passiveId);
					buff_info = temp.buff_target&&temp.buff_target.length?temp.buff_target:null;
					if(buff_info && Math.random()*100 < buff_info[1]) this._buffMgr.addRoleBuff(cast, buff_info[0]);//目标触发buff
					buff_info = temp.buff_self&&temp.buff_self.length?temp.buff_self:null;
					if(buff_info && Math.random()*100 < buff_info[1]) this._buffMgr.addRoleBuff(main, buff_info[0]);//自身触发buff
				}
			}
		}
	}
}