/**
* name 
*/
module game.modules.team.models{
	export class TeamMemberBasicVo
	{
	    public roleid: number;     	    //  
		public rolename: string;		//  
		public level: number;			// 
		public sceneid: number;			// 
		public pos: PosVo;				// 
		public school: number;			// 
		public hp: number;				// 
		public maxhp: number;			// 
		public mp: number;				// 
		public maxmp: number;			// 
		public title: string;			// 
		public state: number;			// 
		public shape: number;			//
		public hugindex: number;		//[1,5]拥抱对象的index
		public components: any;			//角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装
		public camp: number;			//0中立  1部落 2联盟
		constructor()
		{
			
		}
		public fromByteArray(bytes:ByteArray):void {
			this.roleid = bytes.readLong();
			this.rolename = ByteArrayUtils.readUtf16String(bytes) ;
			this.level = bytes.readInt32();
			this.sceneid = bytes.readLong();
			this.pos = new PosVo();
			this.pos.fromByteArray(bytes);
			this.school = bytes.readInt32();
			this.hp = bytes.readInt32();
			this.maxhp = bytes.readInt32();
			this.mp = bytes.readInt32();
			this.maxmp = bytes.readInt32();
			let title = ByteArrayUtils.readUtf16String(bytes);
			this.title = typeof(title) == "undefined" ? "":title;
			this.state = bytes.readInt32();
			this.shape = bytes.readInt32();
			this.hugindex = bytes.readByte();
			let mapSize: number = ByteArrayUtils.uncompact_uint32(bytes);
			this.components = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++)
			{
				this.components.set(bytes.readByte(), bytes.readInt32());
			}
			this.camp = bytes.readByte();
			
		}
	}
}