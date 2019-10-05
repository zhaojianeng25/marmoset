/**
* name 
*/
module game.modules.team.models{
	export class SGetRoleEquipVo
	{
	    public rolename: string;     	//  
		public totalscore: number;		//  
		public equipinfo: any;			// 
		public tips: any;				// 
		public components: any;			// 
		public profession: number;		// 职业
		public rolelevel: number;		// 玩家等级
		public roleid: number;			//
		public shape: number;			// 
		constructor()
		{

		}
		public fromByteArray(bytes:ByteArray):void 
		{
			this.rolename = ByteArrayUtils.readUtf16String(bytes);
			this.totalscore = bytes.readUint32();
			this.equipinfo = new game.modules.bag.models.BagVo;
			this.equipinfo.fromByteArray(bytes);
			let  tipsSize = ByteArrayUtils.uncompact_uint32(bytes);
			let tipsVo : game.modules.strengThening.models.TipsVo;
			this.tips = new Laya.Dictionary();
			 for (let tipsIndex = 0; tipsIndex < tipsSize; tipsIndex++) 
			 {
				 tipsVo  = new game.modules.strengThening.models.TipsVo();
				 let key =  bytes.readUint32();
				 tipsVo.fromByteArray(bytes);
				 this.tips.set(key, tipsVo);
			 }
			let componentsSize: number = ByteArrayUtils.uncompact_uint32(bytes);
			this.components = new Laya.Dictionary();
			for (var index = 0; index < componentsSize; index++)
			{

				this.components.set(bytes.readByte(), bytes.readInt32());
			}
			this.profession = bytes.readUint32();
			this.rolelevel  = bytes.readUint32();
			this.roleid     = ByteArrayUtils.readLong(bytes);
			this.shape      = bytes.readUint32();
			
		}
	}
}