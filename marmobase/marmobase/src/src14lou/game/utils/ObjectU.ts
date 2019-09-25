/**对象工具
* name 王谦
*/
module game.utils{
	export class ObjectU{
		/**为UI创建存储对象*/
		public static createObjectUI(view:any, index:number, args:string[]):Object{
			if(!args || !args.length){
				logd("this args is empty");
				return null;
			}
			let obj:Object = {};
			for(let i:number = 0; i < args.length; i++){
				obj[args[i]] = view[args[i]+index]
			}
			return obj;
		}
		/**复制合并对象*/
		public static cloneObject(base:Object, clone:Object = null):Object{
			if(!base){
				logd("this base is null");
				return clone;
			}
			if(!clone) clone = {};
			let key:string;
			for (key in base) {
				clone[key] = base[key];
			}
			return clone;
		}
		/**复制合并对象*/
		public static cloneObjectList(bases:Object[], clones:Object[] = null):Object[]{
			if(!bases){
				logd("this bases is null");
				return null;
			}
			if(!clones) clones = [];
			if(clones.length < bases.length) clones.length = bases.length;
			for(let i:number = 0; i < bases.length; i++){
				if(!bases[i]) continue;
				clones[i] = ObjectU.cloneObject(bases[i], clones[i]);
			}
			return clones;
		}
	}
}