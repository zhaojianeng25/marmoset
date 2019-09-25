/**
* 对象池对象的接口
*/
module game.utils{
	export interface IPoolsObject {
		// 池名称 
		poolName:string;
		/**
		 * 进池 （相当于对象dispose函数）
		 */
		intoPool(...arg):void;
		/**
		 * 出池 （相当于对象初始化函数）
		 */		
		outPool(...arg):void;
	}

	// export class TestObject{
	// 	static Test():void{
	// 		let obj =  ObjectPools.malloc(game.utils.TestObject,["5555"]);
	// 		ObjectPools.free(obj);
	// 	}
		
	// 	private _key:string;
	// 	constructor(key:string){
	// 		this._key = key;
	// 	}
	// 	intoPool(...arg):void{
	// 		logd(arg);
	// 	}
	// 	outPool(...arg):void{
	// 		logd(arg);
	// 	}
	// }
}