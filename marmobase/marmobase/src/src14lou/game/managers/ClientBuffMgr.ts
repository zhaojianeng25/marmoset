/**
* 客户端buff管理器
*/
module game.managers{
	export class ClientBuffMgr extends Laya.EventDispatcher {
		// 限制移动
		private _lockMoveCount:number = 0;
		get lockMove():boolean{
			return this._lockMoveCount > 0;
		}
		
		// 限制攻击
		private _lockAttackCount:number = 0;
		get lockAttack():boolean{
			return this._lockAttackCount > 0;
		}

		// 隐身计数
		private _hidingCount:number = 0;
		private _hidingOutCount:number = 0;//外部调用的隐身计数
		get hiding():boolean{
			return this._hidingCount > 0 || this._hidingOutCount > 0;
		}
		// 增加隐身计数
		addHidingCount():void{
			this._hidingOutCount ++;
		}
		// 减少隐身计数
		subHidingCount():void{
			this._hidingOutCount --;
		}

		// 限制上御剑
		private _lockMountUp:number = 0;
		get lockMountUp():boolean{
			return this._lockMountUp > 0;
		}

		//限制选中
		private _lockSelect:number = 0;
		get lockSelect():boolean{
			return this._lockSelect > 0;
		}

		//透明计数
		private _alphaCount:number = 0;
		get inAlpha():boolean{
			return this._alphaCount > 0;
		}

		// 关联的生物对象
		private _unit: Unit;
		buffs:Array<Buff> = [];
		isSelf:boolean = false;
		constructor(unit: Unit){
			super();
			this._unit = unit;
			for(let i = 0; i < UnitField.MAX_BUFF; i++){
				let buff = new Buff(unit, i);
				this.buffs.push(buff);
			}
		}

		onUpdate(isNew:boolean, mask: UpdateMask):void{
			let idChange:boolean = false;
			for(let i = 0; i < this.buffs.length; i++){
				let __idChange = this.buffs[i].update(isNew, mask);
				if(__idChange){
					idChange = true;
				}
			}
			if(idChange){
				this._lockMoveCount = 0;
				this._lockAttackCount = 0;
				this._lockMountUp = 0;
				this._lockSelect = 0;
				this._hidingCount = 0;
				this._alphaCount = 0;
				for(let i = 0; i < this.buffs.length; i++){
					let buff = this.buffs[i];
					if(!buff)
						continue;
					
				}
				this.event(LEvent.CHANGED);
			}	
		}

		//是否有buff
		haveBuff(buffid: number): boolean {
			for (let i = 0; i < this.buffs.length; i ++) {
				if(this.buffs[i].id == buffid){
					return true;
				}	
			}
			return false;
		}

		//获取buff等级
		getBuffLevel(buffid: number): number {
			for (let i = 0; i < this.buffs.length; i ++) {
				let buff = this.buffs[i];
				if(buff.id == buffid){
					return buff.lv;
				}	
			}
			return 0;
		}

		//获取buffdata
		getBuffData(buffid: number): number {
			for (let i = 0; i < this.buffs.length; i ++) {
				let buff = this.buffs[i];
				if(buff.id == buffid){
					return buff.data;
				}	
			}
			return 0;
		}

		get buffIds():number[]{
			let ids:number[] = [];
			for (let i = 0; i < this.buffs.length; i++) {
				if(this.buffs[i].id <= 0) continue;
				ids.push(this.buffs[i].id);
			}
			return ids;
		}

		// 释放函数
		dispose():void{
			for(let i = 0; i < this.buffs.length; i++){
				let buff = this.buffs[i];
				buff.dispose();
			}
			this.buffs = null;
			this.isSelf = false;
			this._unit = null;
			this.offAll();
		}
	}
}