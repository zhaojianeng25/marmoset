/**
* npc数据
*/
module game.scene.models{
	export class NpcBasicVo{
		/**npckey*/
		public npckey:number;
		/**npcid*/
		public id:number;
		/**名字*/
		public name:string;
		/**坐标*/
		public pos:Vector2 ;
		/**z坐标*/
		public posz:number;
		/**坐标*/
		public destPos:Vector2 = new Vector2();
		/**速度*/
		public speed:number;
		/**朝向*/
		public dir:number;
		/**造型*/
		public shape:number;
		/**是否隐藏*/
		public scenestate:number;
		public components:Laya.Dictionary;
		constructor(){
		}
		public fromByteArray(bytes:ByteArray):void {
			this.npckey = bytes.readLong();
			this.id = bytes.readInt32();
			this.name = ByteArrayUtils.readUtf16String(bytes);
				
			this.pos =  new Vector2();
			this.pos.x = bytes.readInt16()/16;
			this.pos.y = bytes.readInt16()/16;
			
			this.posz = bytes.readByte();
			
			this.destPos =new Vector2();
			this.destPos.x = bytes.readInt16()/16;
			this.destPos.y = bytes.readInt16()/16;
			
			this.speed = bytes.readInt32();
			this.dir = bytes.readInt32();
			this.shape = bytes.readInt32();
			this.scenestate = bytes.readInt32();
			
			let mapSize:number =ByteArrayUtils.uncompact_uint32(bytes);
			this. components = new Laya.Dictionary(); 		
			for (var index = 0; index < mapSize; index++) {
				this. components.set(bytes.readByte(),bytes.readInt32());
			}
		}
	}
}