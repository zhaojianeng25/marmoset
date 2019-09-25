/**
* 人物信息 
*/
module game.scene.models{
	export class RoleBasicVo{
		/**玩家信息*/
		public rolebasicOctets:RoleBasicOctetsVo;
		/**坐标*/
		public pos:Vector2;
		/**坐标*/
		public posz:number;
		/**坐标*/
		public poses:Array<Vector2>;
		constructor(){
		}
		public fromByteArray(bytes:ByteArray):void {		
			this.rolebasicOctets = new RoleBasicOctetsVo();
			let rolebyte:ByteArray = bytes;
			let head:number = ByteArrayUtils.uncompact_uint32(rolebyte);
			this.rolebasicOctets.fromByteArray(rolebyte);					
			this.pos = new Vector2();
			this.pos.x = rolebyte.readInt16()/16;
			this.pos.y = rolebyte.readInt16()/16;
			this.posz = rolebyte.readByte();			
			this.poses = new Array<Vector2>();
			let posesSize:number =ByteArrayUtils.uncompact_uint32(rolebyte);
			let pos: Vector2;
			for (var index = 0; index < posesSize; index++) {
				pos = new Vector2 ();
				pos.x = rolebyte.readInt16()/16;
				pos.y = rolebyte.readInt16()/16;
				this.poses.push(pos);
			}

		}
	}
}