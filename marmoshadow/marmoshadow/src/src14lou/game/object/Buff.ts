/**
* buff
*/
module game.object{
	export class Buff  extends Laya.EventDispatcher {
		static CHANGE_ID:string = 'CHANGE_ID';
		static CHANGE_LV:string = 'CHANGE_LV';
		static CHANGE_TIMER:string = 'CHANGE_TIMER';
		static CHANGE_GIVER:string = 'CHANGE_GIVER';
		static CHANGE_DATA:string = 'CHANGE_DATA';

		private _pos:number;
		get pos():number{
			return this._pos;
		}
		private _unit: Unit;
		private _id:number;
		get id():number{
			return this._id;
		}
		// 等级
		private _lv:number;			
		get lv():number{
			return this._lv;
		}
		// 持续时间
		private _timer:number;		
		get timer():number{
			return this._timer;
		}
		// BUFF释放者OID
		private _giver:number;		
		get giver():number{
			return this._giver;
		}
		// 预留值
		private _data:number;		
		get data():number{
			return this._data;
		}

		private _idIndex:number;
		private _lvIndex:number;
		private _tmIndex:number;
		private _giverIndex:number;
		private _dataIndex:number;

		constructor(unit: Unit, pos:number){
			super();
			this._unit = unit;
			this._pos = pos;
			let uint16Pos = Math.floor(this._pos / 2);
			this._idIndex = UnitField.UNIT_INT_BUFF_ID + uint16Pos;
			this._lvIndex = UnitField.UNIT_INT_BUFF_LV + uint16Pos;
			this._tmIndex = UnitField.UNIT_INT_BUFF_TM + pos;
			this._giverIndex = UnitField.UNIT_INT_BUFF_GIVER + pos;
			this._dataIndex = UnitField.UNIT_INT_BUFF_DATA + pos;
			
			this._id = this._unit.GetBuffId(this._pos);
			this._lv = this._unit.GetBuffLv(this._pos);
			this._timer = this._unit.GetBuffTm(this._pos);
			this._giver = this._unit.GetBuffGiver(this._pos);
			this._data = this._unit.GetBuffData(this._pos);
		}

		update(isNew:boolean, mask: UpdateMask):boolean{
			let idChange:boolean = false;
			let v:number;
			if(isNew || mask.GetBit(this._idIndex)){
				v = this._unit.GetBuffId(this._pos);
				if(this._id != v){
					this._id = v;
					idChange = true;
					this.event(Buff.CHANGE_ID, v);
				}
			}
			if(isNew || mask.GetBit(this._lvIndex)){
				v = this._unit.GetBuffLv(this._pos);
				if(this._lv != v){
					this._lv = v;
					this.event(Buff.CHANGE_LV, v);
				}
			}
			if(isNew || mask.GetBit(this._tmIndex)){
				v = this._unit.GetBuffTm(this._pos);
				if(this._timer != v){
					this._timer = v;
					this.event(Buff.CHANGE_TIMER, v);
				}
			}
			if(isNew || mask.GetBit(this._giverIndex)){
				v = this._unit.GetBuffGiver(this._pos);
				if(this._giver != v){
					this._giver = v;
					this.event(Buff.CHANGE_GIVER, v);
				}
			}
			if(isNew || mask.GetBit(this._dataIndex)){
				v = this._unit.GetBuffData(this._pos);
				if(this._data != v){
					this._data = v;
					this.event(Buff.CHANGE_DATA, v);
				}
			}
			return idChange;
		}
		// 释放函数
		dispose():void{
			this._unit = null;
		}
	}
}