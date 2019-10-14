/**
* name 
*/
module game.modules{
	export class ModuleEvent extends Laya.Event{
		constructor(type:string,data:any = null){
			super();
			super.setTo(type,null,null);
			this.data = data;
			
		}
		public static SHOW:string = "SHOW";
		public static HIDE:string = "HIDE";
		public static SWAP:string = "SWAP";
		public static FLUSH_DATA:string = "FLUSH_DATA";
		public static JUMP:string = "JUMP";
		public static IS_OPEN:string = "ISOPEN";
		public data:Object;
		/*public ModuleEvent(type:String,data:Object=null)
		{
			
		}*/
	}
}