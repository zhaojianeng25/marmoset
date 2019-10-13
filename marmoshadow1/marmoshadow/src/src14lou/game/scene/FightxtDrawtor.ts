/**
* name 
*/
module game.scene {

	interface TextureMap {
		[index: number]: Texture;
	}

	export class FightxtDrawtor {
		// 其他
		static TYPE_OTHER = 1;
		// 自己
		static TYPE_SELF = 2;
		// 贴图数据
		static TEXTURES:TextureMap = {};
		// 贴图存储索引
		static getTextureIndex(atk_type:number, o_type:number, idx:number){
			return atk_type * 1000 + o_type * 100 + idx;
		}

		private _g: Graphics;
		
		private _data:Array<Fightxt> = [];

		constructor(g: Graphics) {
			this._g = g;
		}

		onResComplete(): void {
			for (let i: number = 0; i < 12; i++) {
				// 普通
				let texture = Laya.loader.getRes("scene/common/Attack_" + i + ".png");
				let key = FightxtDrawtor.getTextureIndex(UnitField.HIT_NOMAL, FightxtDrawtor.TYPE_OTHER, i); //其他
				FightxtDrawtor.TEXTURES[key] = texture;
				texture = Laya.loader.getRes("scene/common/Attack1_" + i + ".png");		
				key = FightxtDrawtor.getTextureIndex(UnitField.HIT_NOMAL, FightxtDrawtor.TYPE_SELF, i); //自己
				FightxtDrawtor.TEXTURES[key] = texture;

				// 暴击
				texture = Laya.loader.getRes("scene/common/Crit_" + i + ".png");
				key = FightxtDrawtor.getTextureIndex(UnitField.HIT_CRIT, FightxtDrawtor.TYPE_OTHER, i); //其他
				FightxtDrawtor.TEXTURES[key] = texture;
				texture = Laya.loader.getRes("scene/common/Attack3_" + i + ".png");
				key = FightxtDrawtor.getTextureIndex(UnitField.HIT_CRIT, FightxtDrawtor.TYPE_SELF, i); //自己
				FightxtDrawtor.TEXTURES[key] = texture;

				// 加血
				texture = Laya.loader.getRes("scene/common/Attack2_" + i + ".png");
				key = FightxtDrawtor.getTextureIndex(UnitField.HIT_ZHILIAO, FightxtDrawtor.TYPE_OTHER, i);//其他
				FightxtDrawtor.TEXTURES[key] = texture;
				key = FightxtDrawtor.getTextureIndex(UnitField.HIT_ZHILIAO, FightxtDrawtor.TYPE_SELF, i);//自己
				FightxtDrawtor.TEXTURES[key] = texture;
				
				// 闪避	
				texture = Laya.loader.getRes("scene/common/miss1_" + i + ".png");
				key = FightxtDrawtor.getTextureIndex(UnitField.HIT_MISS, FightxtDrawtor.TYPE_OTHER, i);//其他
				FightxtDrawtor.TEXTURES[key] = texture;
				texture = Laya.loader.getRes("scene/common/miss2_" + i + ".png");
				key = FightxtDrawtor.getTextureIndex(UnitField.HIT_MISS, FightxtDrawtor.TYPE_SELF, i);//自己
				FightxtDrawtor.TEXTURES[key] = texture;
			}
		}

		// 绘制
		onDraw(diff: number, camera: game.scene.Camera): void {
			for(let key in this._data){
				let fightxt = this._data[key];
				if(fightxt.isEnd){
					ObjectPools.free(fightxt);
					delete this._data[key];
					continue;
				}
				fightxt.onDraw(diff, camera, this._g);
			}
			
		}

		// 显示战斗信息
		show(atk_type: number, values: number, toward:number, target: AvatarUnit, isSelf:boolean): void {
			if (atk_type != UnitField.HIT_MISS && values == 0){
				return;
			} 
			let fightxt = Fightxt.create(atk_type, values, toward, target, isSelf);
			this._data.push(fightxt);
		}
	}

	class Fightxt implements IPoolsObject{
		poolName:string = 'Fightxt';
		// 地图位置
		private _mapX:number;
		private _mapY:number;
		// 创建时位置偏移
		private _offsetX:number;
		private _offsetY:number;
		// 运动时的位置偏移
		private __offsetX:number;
		private __offsetY:number;
		private _scale:number = 1;

		
		private _width: number = 0;
		private _textures:Array<Texture> = [];
		private _runtime: number = 0;
		// 延迟时间
		private _delayTimer:number = 350;
		// 移除时间
		private _delTimer:number = 0;
		// 是否结束
		get isEnd():boolean{
			return this._runtime > this._delTimer;
		}

		private _easeObjs:Array<EaseObj> = [];

		/**
		 * 进池 （相当于对象dispose函数）
		 */
		intoPool(...arg):void{
			this.reset();
		}
		/**
		 * 出池 （相当于对象初始化函数）
		 */		
		outPool(...arg):void{};

		static create(atk_type: number, values: number, toward:number, target: AvatarUnit, isSelf:boolean):Fightxt{
			let obj = ObjectPools.malloc(Fightxt) as Fightxt;
			obj.create(atk_type, values, toward, target, isSelf)
			return obj;
		}

		create(atk_type: number, values: number, toward:number, target: AvatarUnit, isSelf:boolean){
			if(values < 0){
				// 加血
				atk_type = UnitField.HIT_ZHILIAO;
			}
			if(atk_type == 0){
				atk_type = UnitField.HIT_NOMAL;
			}
			// atk_type = UnitField.HIT_CRIT
			this._mapX = target.unit.pos.x;
			this._mapY = target.unit.pos.y;
			
			this._offsetX = 0;
			this._offsetY = - target.headHeight;
			this.__offsetX = this.__offsetY = 0;
			this._scale = 1;
			this._width = 0;
			let o_type = isSelf ? FightxtDrawtor.TYPE_SELF : FightxtDrawtor.TYPE_OTHER;
			// 汉字前缀
			let key = FightxtDrawtor.getTextureIndex(atk_type, o_type, 11);	
			let tex = FightxtDrawtor.TEXTURES[key];
			if (tex){
				this._textures.push(FightxtDrawtor.TEXTURES[key]);
				this._width += tex.width;
			}
			// 符号前缀
			key = FightxtDrawtor.getTextureIndex(atk_type, o_type, 10);	
			tex = FightxtDrawtor.TEXTURES[key];
			if (tex){
				this._textures.push(FightxtDrawtor.TEXTURES[key]);
				this._width += tex.width;
			}
			// 数值
			let strArr: Array<any>;
			if(atk_type == UnitField.HIT_MISS){
				strArr = [];
			}
			else{
				strArr = values.toString(10).split("");
			}

			for (let i: number = 0; i < strArr.length; i++) {
				let idx: number = parseInt(strArr[i]);
				let key = FightxtDrawtor.getTextureIndex(atk_type, o_type, idx);	
				let tex: Texture = FightxtDrawtor.TEXTURES[key];
				if (tex){
					this._textures.push(FightxtDrawtor.TEXTURES[key]);
					this._width += tex.width;
				}
			}
			// 方向
			let direct = Direct.GetDirect(toward);
			// 总时长
			let duration:number;
			let lastTimer:number = 0;
			let frameTimer:number = 1000 / 30;
			if(atk_type == UnitField.HIT_ZHILIAO){
				this._offsetY = - target.headHeight;
				let t = 20 * frameTimer;
				this.createEase(0, t, 0, -60, laya.utils.Ease.circIn, this.easeY);
				duration = t + lastTimer;
			}
			// else if(isSelf){
			// 	let isLeft = direct > Direct.BOTTOM_RIGHT && direct < Direct.UP;
			// 	let sx, sy, ss;
			// 	let ex, ey, es;
			// 	let st, et;
			// 	this._offsetY = - target.headHeight/2 ;
			// 	this._offsetX = isLeft ? -20 : 20;

			// 	st = 0, et = 4 * frameTimer; // 时间
			// 	ss = 2.5;
			// 	es = 1;
			// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
			// 	// 第二阶段 (4帧)
			// 	st = et, et = 14 * frameTimer; // 时间
			// 	ss = 1;
			// 	es = 1;
			// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
			// 	// 第三阶段 (7帧无向上)
			// 	st = et, et = 24 * frameTimer; // 时间
			// 	sy = 0;
			// 	ey = 60;
			// 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
			// 	// 持续时间
			// 	duration = et + lastTimer;
			// }
			else{
				let sx, sy, ss;
				let ex, ey, es;
				let st, et;
				// direct = Direct.BOTTOM;
				//没有方向了 1帧 放大200   缩小 4帧 100  再停4帧 向上飘30
				st = 0, et = 3 * frameTimer; // 时间
				ss = 3;
				es = 1;
				this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
				// 第二阶段 (4帧)
				st = et, et = 15 * frameTimer; // 时间
				ss = 1;
				es = 1;
				this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
				// 第三阶段 (7帧无向上)
				st = et, et = 25 * frameTimer; // 时间
				sy = 0;
				ey = -60;
				this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
				duration = 25 * frameTimer;
				// switch(direct){

					// case Direct.LEFT:
					// case Direct.RIGHT:
					// 	// 第一阶段
					// 	st = 0, et = 3 * frameTimer; // 时间
					// 	sx = direct == Direct.RIGHT ? 40 : -40, ss = 1.5;
					// 	ex = direct == Direct.RIGHT ? 80 : -80, es = 1;
					// 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第二阶段 (1帧)
					// 	st = et, et = 4 * frameTimer; // 时间
					// 	ss = 1.1;
					// 	es = 1.1;
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第三阶段 (10帧无动画)
					// 	st = et, et = 5 * frameTimer; // 时间
					// 	ss = 1;
					// 	es = 1;
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第四阶段 (10帧)
					// 	st = 14 * frameTimer;
					// 	et = 24 * frameTimer;
					// 	sx = ex;
					// 	ex = direct == Direct.RIGHT ? 170 : -170;
					// 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
					// 	duration = 30 * frameTimer;
					// 	break;
					// case Direct.UPPER_LEFT:
					// case Direct.UPPER_RIGHT:
					// 	// 第一阶段
					// 	st = 0, et = 3 * frameTimer; // 时间
					// 	sx = direct == Direct.UPPER_RIGHT ? 40 : -40, sy = -40, ss = 1.5;
					// 	ex = direct == Direct.UPPER_RIGHT ? 80 : -80, ey = -75, es = 1;
					// 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
					// 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第二阶段 (1帧)
					// 	st = et, et = 4 * frameTimer; // 时间
					// 	ss = 1.1;
					// 	es = 1.1;
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第三阶段 (10帧无动画)
					// 	st = et, et = 5 * frameTimer; // 时间
					// 	ss = 1;
					// 	es = 1;
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第四阶段 (10帧)
					// 	st = 14 * frameTimer;
					// 	et = 24 * frameTimer;
					// 	sx = ex, sy = ey;
					// 	ex = direct == Direct.UPPER_RIGHT ? 170 : -170;
					// 	ey = -115;
					// 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
					// 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
					// 	duration = 30 * frameTimer;
					// 	break;
					// case Direct.BOTTOM_LEFT:
					// case Direct.BOTTOM_RIGHT:
					// 	// 第一阶段
					// 	st = 0, et = 3 * frameTimer; // 时间
					// 	sx = direct == Direct.BOTTOM_RIGHT ? 40 : -40, sy = 40, ss = 1.5;
					// 	ex = direct == Direct.BOTTOM_RIGHT ? 80 : -80, ey = 75, es = 1;
					// 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
					// 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第二阶段 (1帧)
					// 	st = et, et = 4 * frameTimer; // 时间
					// 	ss = 1.1;
					// 	es = 1.1;
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第三阶段 (10帧无动画)
					// 	st = et, et = 5 * frameTimer; // 时间
					// 	ss = 1;
					// 	es = 1;
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第四阶段 (10帧)
					// 	st = 14 * frameTimer;
					// 	et = 24 * frameTimer;
					// 	sx = ex, sy = ey;
					// 	ex = direct == Direct.BOTTOM_RIGHT ? 170 : -170;
					// 	ey = 115;
					// 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
					// 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
					// 	duration = 30 * frameTimer;
					// 	break; 
					// case Direct.UP:
					// 	// 第一阶段
					// 	st = 0, et = 3 * frameTimer; // 时间
					// 	sx = 0, sy = -40, ss = 1.5;
					// 	ex = 20, ey = -75, es = 1;
					// 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
					// 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第二阶段 (1帧)
					// 	st = et, et = 4 * frameTimer; // 时间
					// 	ss = 1.1;
					// 	es = 1.1;
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第三阶段 (10帧无动画)
					// 	st = et, et = 5 * frameTimer; // 时间
					// 	ss = 1;
					// 	es = 1;
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第四阶段 (10帧)
					// 	st = 14 * frameTimer;
					// 	et = 24 * frameTimer;
					// 	sx = ex, sy = ey;
					// 	ex = 50;
					// 	ey = -145;
					// 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
					// 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
					// 	duration = 30 * frameTimer;
					// 	break;
					// case Direct.BOTTOM:
					// 	// 第一阶段
					// 	st = 0, et = 3 * frameTimer; // 时间
					// 	sx = 0, sy = 40, ss = 1.5;
					// 	ex = -20, ey = 70, es = 1;
					// 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
					// 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第二阶段 (1帧)
					// 	st = et, et = 4 * frameTimer; // 时间
					// 	ss = 1.1;
					// 	es = 1.1;
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第三阶段 (10帧无动画)
					// 	st = et, et = 5 * frameTimer; // 时间
					// 	ss = 1;
					// 	es = 1;
					// 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
					// 	// 第四阶段 (10帧)
					// 	st = 14 * frameTimer;
					// 	et = 24 * frameTimer;
					// 	sx = ex, sy = ey;
					// 	ex = -40;
					// 	ey = 120;
					// 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
					// 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
					// 	duration = 30 * frameTimer;
					// 	break;
				// }
			}
			this._delTimer = this._delayTimer + duration;
		}

		private createEase(startTimer:number, duration: number, startValue: number, endValue: number, easeFunc:Function, callbackFunc:Function):void{
			this._easeObjs.push(EaseObj.create(startTimer, duration, startValue, endValue, easeFunc, Handler.create(this, callbackFunc, null, false)));
		}

		private easeX(v:number):void{
			this.__offsetX = v;
		}

		private easeY(v:number):void{
			this.__offsetY = v;
		}

		private easeScale(v:number):void{
			this._scale = v;
		}

		onDraw(diff: number, camera: Camera, g: Graphics): void {
			if (!this._textures) return;
			if(this._runtime < this._delayTimer){
				// 还没开始
				this._runtime += diff;
				return;
			}
			if(this.isEnd){
				return;
			}
			let __runtime = this._runtime - this._delayTimer;
			for(let obj of this._easeObjs){
				obj.update(__runtime);
			}
			//起始点x
			let rowX: number = camera.getScenePxByCellX(this._mapX);
			//起始点Y
			let rowY: number = camera.getScenePxByCellY(this._mapY);
			//贴图集合
			let x_offset: number = - this._width * this._scale / 2;

			for (let i: number = 0; i < this._textures.length; i++) {
				let tex: Texture =  this._textures[i];
				g.drawTexture(tex,
					rowX + this._offsetX + this.__offsetX + x_offset,
					rowY + this._offsetY + this.__offsetY - tex.sourceHeight * this._scale/ 2,
					 tex.sourceWidth * this._scale, tex.sourceHeight * this._scale);
				//从左到右排列
				x_offset += tex.sourceWidth * this._scale;
			}
			this._runtime += diff;
		}

		reset():void{
			this._textures.length = 0;
			this._runtime = 0;
			this._delayTimer = 0;
			this._delTimer = 0;
			for(let obj of this._easeObjs){
				ObjectPools.free(obj);
			}
			this._easeObjs.length = 0;
			this._scale = 1;
		}
	}

	class EaseObj implements IPoolsObject{
		poolName:string = 'EaseObj';
		// 开始的时间
		private _startTimer:number;
		// 持续时间
		private _duration: number;
		// 初始值
		private _startValue: number;
		// 更改总计
		private _changeValue: number;
		// 缓动函数
		private _easeFunc:Function;
		// 回调函数
		private _hander:Handler;
		/**
		 * 进池 （相当于对象dispose函数）
		 */
		intoPool(...arg):void{
			this.reset();
		}
		/**
		 * 出池 （相当于对象初始化函数）
		 */		
		outPool(...arg):void{};

		static create(startTimer:number, duration: number, startValue: number, endValue: number, easeFunc:Function, hander:Handler):EaseObj{
			let obj = ObjectPools.malloc(EaseObj) as EaseObj;
			obj.create(startTimer, duration, startValue, endValue, easeFunc, hander);
			return obj;
		}

		create(startTimer:number, duration: number, startValue: number, endValue: number, easeFunc:Function, hander:Handler):void{
			this._startTimer = startTimer;
			this._duration = duration;
			this._startValue = startValue;
			this._changeValue = endValue - startValue;
			this._easeFunc = easeFunc;
			this._hander = hander;
		}

		update(runtime:number):void{
			if(runtime < this._startTimer){
				// 还没开始
				return;
			}
			if(runtime > this._startTimer + this._duration){
				// 结束了
				return;
			}
			let v = this._easeFunc(runtime - this._startTimer, this._startValue, this._changeValue, this._duration);
			this._hander.runWith(v);
		}

		reset():void{
			this._easeFunc = null;
			if(this._hander){
				this._hander.recover();
				this._hander = null;
			}
		}
	}
}