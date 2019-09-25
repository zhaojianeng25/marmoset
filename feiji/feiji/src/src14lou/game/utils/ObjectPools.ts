/**
* 对象池
*/
module game.utils{
	export class ObjectPools{
		// 调试时的严格模式
		static MOLD_DEBUG_STRICT:number = 0;
		// 发布时的防错模式
		static MOLD_RELEASE_FAIL_SAFE:number = 1;
		// 模式
		static mold:number = ObjectPools.MOLD_RELEASE_FAIL_SAFE;

		/** 对象池*/
		private static _pools:Object = {};

		/**
		 * 申请
		 * @param def				对象类名
		 * @param params			新对象构造函数的参数（最多支持10个）
		 * @param arg				outPool初始化的参数
		 * @return 
		 */
        static malloc(def: any, params: Array<any> = null, ...arg): IPoolsObject{
			let obj:IPoolsObject;
			let pool:Pool= this._pools[def.name];
			if(pool){
				obj = pool.pull();
			}
			if(!obj){
				// logd(def.name, " _pool.length", 0);
				if(!params){
					obj = new def();
				}else{
					let len:number = params.length
					switch(len){
						case 0:
							obj = new def();
							break;
						case 1:
							obj = new def(params[0]);
							break;
						case 2:
							obj = new def(params[0], params[1]);
							break;
						case 3:
							obj = new def(params[0], params[1], params[2]);
							break;
						case 4:
							obj = new def(params[0], params[1], params[2], params[3]);
							break;
						case 5:
							obj = new def(params[0], params[1], params[2], params[3], params[4]);
							break;
						case 6:
							obj = new def(params[0], params[1], params[2], params[3], params[4], params[5]);
							break;
						case 7:
							obj = new def(params[0], params[1], params[2], params[3], params[4], params[5], params[6]);
							break;
						case 8:
							obj = new def(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7]);
							break;
						case 9:
							obj = new def(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8]);
							break;
						case 10:
							obj = new def(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8], params[9]);
							break;
					}
				}
			}
			obj.outPool.apply(obj, arg);
			return obj;
		}

		/**
		 * 释放
		 * @param obj	对象
		 */
		static free(obj:IPoolsObject):void{
			let className = obj.poolName;
			let pool = this._pools[className];
			if(!pool){
				pool = new Pool(className);
				this._pools[className] = pool;
			}
			obj.intoPool();
			pool.push(obj);
		}

		/**距离下次检查的时间*/
		private static _nextUpdateTime:number = 0;
		/**心跳驱动*/
		static update(diff:number):void{
			if(this._nextUpdateTime > 0){
				this._nextUpdateTime -= diff;
				return;
			}
			this._nextUpdateTime = 20000; //20秒检查一下池
			for (let key in this._pools){
				this._pools[key].adaptSize();
			}
		}
	}

	/**
	 * 池
	 * @author wy
	 */
	class Pool{
		/**标识 （类名）*/
		private _key:String;
		/**池*/
		private _list:Array<IPoolsObject> = [];
		/**过去一段时间池内最小对象数 （用来清理池内暂不使用的对象）*/
		private _minSize:number = 0;
		private _maxSize:number = 0;
		// 检查标识
		private _mask:number = 0; 
		constructor(key:string){
			this._key = key;
		}
		
		/**进池*/
		push(obj:IPoolsObject):void{
			let len:number = this._list.length;
			let idx:number = this._list.indexOf(obj);
			if(idx != -1){
				if(ObjectPools.mold == ObjectPools.MOLD_DEBUG_STRICT){
					loge("error: free IPoolsObject in pool " + this._key);
				}
				else if(ObjectPools.mold == ObjectPools.MOLD_RELEASE_FAIL_SAFE){
				}
				return;
			}
			this._list[len] = obj;
			// logd(this._key, " _pool.length", len + 1);
		}
		
		/**出池*/
		pull():IPoolsObject{
			let obj:IPoolsObject;
			let idx:number = this._list.length - 1;
			if(idx >= 0){
				obj = this._list[idx];
				this._list.length = idx;
				this._minSize = Math.min(this._minSize, idx);
				this._maxSize = Math.max(this._maxSize, idx);
				this._mask = 0;
			}
			return obj;
		}
		
		/**池大小根据使用情况适应*/
		adaptSize():void{
			this._mask ++;
			//评估的使用池大小
			let useSize:number = this._maxSize - this._minSize;
			if(this._mask < 3){
				useSize += 2;
			}
			if(this._list.length > useSize)
				this._list.length = useSize;
			this._minSize = this._maxSize = 0;
		}
	}
}