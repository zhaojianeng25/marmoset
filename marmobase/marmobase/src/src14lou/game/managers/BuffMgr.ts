module game.managers{
	/**
	 * buff管理器
	 * name 王谦
	 */
	//this.buff_id = buff_id;
	//this.buff_lv = buff_lv;
	//this.buff_round = buff_round;
	//this.buff_data[] = buff_data[];
	export class BuffMgr{
		private _buff_limit:number[];		//限制出手的buff
		private _buff_wudi:number[];		//无敌buff
		private _buff_mianyi:number[];		//免疫debuff
		private _buff_gain:number[];		//增益buff
		private _buff_debuff:number[];		//减益buff

		private _handler_trigger:string[];	//处理buff函数名

		constructor(){
			this._buff_limit = [1];
			this._buff_wudi = [];
			this._buff_mianyi = [];
			this._buff_gain = [];
			this._buff_debuff = [];
			let temps:any = Template.data["tb_buffs"];
			for(let i:number = 0; i < temps.length; i++){
				if(!temps[i]) continue;
				if(temps[i].type == 1) this._buff_gain.push(temps[i].id);
				else if(temps[i].type == 2) this._buff_debuff.push(temps[i].id);
			}
			this._handler_trigger = [];
			// this._handler_trigger[1] = "bleeding"; //灼烧
			// this._handler_trigger[2] = "bleeding"; //中毒
			// this._handler_trigger[4] = "bleeding"; //回血
		}
		//给角色添加buff
		public addRoleBuff(target:FightRole, buff_id:number):void{
			if(!target || !buff_id) return;
			let temp:any = Template.getBuffsTempById(buff_id);
			if(!temp) return;
			target.buffs = this.addBuff(target.buffs, temp.id, temp.round, 1, temp.values);
		}
		//新增buff
		public addBuff(buffs:any[],buff_id:number,buff_round:number,buff_lv:number,buff_data:number[]):any[]{
			let temp:any = Template.getBuffsTempById(buff_id);
			if(!temp || (temp.type == 2 && this.isMianyi(buffs))) return buffs;
			if(!buffs) buffs = [];
			let count:number = 0;//数量
			let buff:any;//回合最少buff(替换)
			for(let i:number = 0; i < buffs.length; i++){
				if (buffs[i].buff_id != buff_id) continue;
				if(!buff || buffs[i].buff_round < buff.buff_round) buff = buffs[i];
				count++;
			}
			if(!buff || count < temp.max_count){
				buff = {buff_id:buff_id};
				buffs.push(buff);
			}
			buff.buff_round = buff_round;
			buff.buff_lv = buff_lv;
			buff.buff_data = buff_data;
			return buffs;
		}
		/**
		 * 
		 * @param wujiang 武将
		 * @param isGain 是否增益
		 */
		public removeBuff(buffs:any[],isGain:boolean);
		/**
		 * 
		 * @param wujiang 武将
		 * @param ids buff id 集合
		 */
		public removeBuff(buffs:any[],ids:number[]);
		/**
		 * 
		 * @param wujiang 武将
		 * @param id buff id
		 */
		public removeBuff(buffs:any[],id:number);
		public removeBuff(buffs:any[],data:any):void{
			if(!buffs || !buffs.length) return;
			let ids:number[];
			if(typeof(data) == "number"){
				ids = [data];
			}else if(typeof(data) == "boolean"){
				ids = data?this._buff_gain:this._buff_debuff;
			}else{
				ids = data;
			}
			let index:number;
			for(let i:number = 0; i < buffs.length; i++){
				index = ids.indexOf(buffs[i].buff_id);
				if(index == -1) continue;
				buffs.splice(i, 1);
				i--;
			}
		}
		/**是否限制出手*/
		public isLimit(buffs:any[]):boolean{
			if(!buffs || !buffs.length) return false;
			for(let i:number = 0; i < buffs.length; i++){
				if(this._buff_limit.indexOf(buffs[i].buff_id) != -1) return true;
			}
			return false;
		}
		/**是否普攻*/
		public hasChaofeng(buffs:any[]):boolean{
			if(!buffs || !buffs.length) return false;
			for(let i:number = 0; i < buffs.length; i++){
				if(buffs[i].buff_id == 4) return true;
			}
			return false;
		}
		/**是否无敌*/
		public isWudi(buffs:any[]):boolean{
			if(!buffs || !buffs.length) return false;
			for(let i:number = 0; i < buffs.length; i++){
				if(this._buff_wudi.indexOf(buffs[i].buff_id) != -1) return true;
			}
			return false;
		}
		/**是否免疫debuff*/
		public isMianyi(buffs:any[]):boolean{
			if(!buffs || !buffs.length) return false;
			for(let i:number = 0; i < buffs.length; i++){
				if(this._buff_mianyi.indexOf(buffs[i].buff_id) != -1) return true;
			}
			return false;
		}
		/**清理所有嘲讽buff*/
		public clearChaofeng(buffs:any[]):void{
			if(!buffs || !buffs.length) return;
			for(let i:number = 0; i < buffs.length; i++){
				if(buffs[i].buff_id != 4) continue;
				buffs.splice(i, 1);
				i--;
			}
		}
		/**获取德川家康回血数值*/
		public getDHuixue(buffs:any[]):number{
			if(!buffs || !buffs.length) return 0;
			for(let i:number = 0; i < buffs.length; i++){
				if(buffs[i].buff_id == 5) return buffs[i].buff_data[1];
			}
			return 0;
		}
		/**处理buff回合*/
		public updateBuff(buffs:any[]):void{
			if(!buffs || !buffs.length) return;
			for(let i:number = 0; i < buffs.length; i++){
				if(buffs[i].buff_round > 0) buffs[i].buff_round--;
				if(buffs[i].buff_round <= 0){
					buffs.splice(i, 1);
					i--;
				}
			}
		}

		/*===============处理buff相关函数===================*/
		/**处理指定buff*/
		public buffTrigger(buff:any, role:FightRole):any{
			if(!buff || !role) return null;
			let funName:string = this._handler_trigger[buff.buff_id];
			if(!funName || !this[funName]) return null;
			return this[funName](buff,role);
		}
		//持续去血或者回血
		private bleeding(buff:any, role:FightRole):any{
			let nuqi = 0;
			let info:any = {};
			info.buff_id = buff.buff_id;
			info.value = this.getBuffValueByType(buff.buff_data, 1);
			return info;
		}
		//通过类型获取buff效果数值
		private getBuffValueByType(buff_data:number[], type:number):number{
			if(type <= 0) return;
			let len:number = Math.floor(buff_data.length/2);
			let value:number = 0;
			let base:number;
			for(let i:number = 0; i < len; i++){
				base = 2*i;
				if(buff_data[base] != type) continue;
				value += buff_data[base+1];
			}
			return value;
		}

		/*===============获取指定buff数值===================*/
		/**获取指定效果buff数值*/
		private getSomeBonus(buffs:any[], buffIds:number[], indexs:number[] = [0]):number{
			if(!buffs || !buffs.length || !buffIds || !buffIds.length) return 0;
			let num:number = 0;
			let index:number;
			for(let i:number = 0; i < buffs.length; i++){
				index = buffIds.indexOf(buffs[i].buff_id);
				if(index == -1) continue;
				index = 2*indexs[index]+1;
				if(this._buff_gain.indexOf(buffs[i].buff_id) != -1){//增益
					num += buffs[i].buff_data[index];
				}else{
					num -= buffs[i].buff_data[index];
				}
			}
			return num;
		}
		/**获取速度的数值*/
		public getBonusSpeed(buffs:any[]):number{//速度提高,速度降低
			return this.getSomeBonus(buffs, []);
		}
		/**获取伤害的数值*/
		public getBonusDamge(buffs:any[]):number{//攻击提高,攻击降低
			return this.getSomeBonus(buffs, []);
		}
		/**获取防御的数值*/
		public getBonusDef(buffs:any[]):number{//防御提高,防御降低
			return this.getSomeBonus(buffs, [2,3,6], [0,0,0]);
		}
		/**获取命中数值*/
		public getBonusHit(buffs:any[]):number{//命中提高
			return this.getSomeBonus(buffs, []);
		}
		/**闪避加成*/
		public getBonusEva(buffs:any[]):number{//闪避
			return this.getSomeBonus(buffs, []);
		}
		/**获取暴击的数值*/
		public getBonusCrit(buffs:any[]):number{//暴击提高
			return this.getSomeBonus(buffs, []);
		}
		/**获取暴击伤害的数值*/
		public getBonusCritHurt(buffs:any[]):number{//暴击伤害提高
			return this.getSomeBonus(buffs, []);
		}
		/**获取敏捷的数值*/
		public getBonusAgile(buffs:any[]):number{//敏捷提高
			return this.getSomeBonus(buffs, []);
		}
		/**获取抵抗的数值*/
		public getBonusResist(buffs:any[]):number{//抵抗提高
			return this.getSomeBonus(buffs, []);
		}
		/**获取效果命中的数值*/
		public getBonusHitBuff(buffs:any[]):number{//效果命中提高
			return this.getSomeBonus(buffs, []);
		}
		/**获取暴击防御的数值*/
		// public getBonusCritDef(buffs:any[]):number{//抗暴提高
		// 	return this.getSomeBonus(buffs, []);
		// }
		/**获取打击增伤害*/
		// public getBonusAddDamge(buffs:any[]):number{//加伤提高
		// 	return this.getSomeBonus(buffs, []);
		// }
		/**获取减伤加成*/
		// public getBonusDamgeReduce(buffs:any[]):number{//伤害提高,伤害降低
		// 	return this.getSomeBonus(buffs, []);
		// }
		/**获取受伤数值*/
		// public getBonusHurt(buffs:any[]):number{//受伤提高,受伤降低
		// 	return this.getSomeBonus(buffs, []);
		// }
	}
}