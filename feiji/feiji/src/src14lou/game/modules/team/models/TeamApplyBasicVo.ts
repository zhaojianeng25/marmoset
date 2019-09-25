/**
* name 
*/
module game.modules.team.models{
	export class TeamApplyBasicVo
	{
	    public roleid:   	number;      // 
		public rolename:	string;		//  
		public level: 	 	number;		// 
		public school:  	number;		// 
		public title:    	string;		// 
		public shape:    	number;		// 增加外形
		public components:  any;		// 角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装

		// <variable name="roleid" type="long"/>
		// <variable name="rolename" type="string"/>
		// <variable name="level" type="int"/>
		// <variable name="school" type="int"/>
		// <variable name="title" type="string"/>
		// <variable name="shape" type="int"/> 增加外形 by changhao
		// <variable name="components" type="map" key="byte" value="int"/>	角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装
		constructor()
		{

		}
		public fromByteArray(bytes:ByteArray):void {
			this.roleid = ByteArrayUtils.readLong(bytes);
			this.rolename = ByteArrayUtils.readUtf16String(bytes);
			this.level = bytes.readUint32();
			this.school = bytes.readUint32();
			this.title = ByteArrayUtils.readUtf16String(bytes);
			this.shape = bytes.readUint32();
			let componentsSize = ByteArrayUtils.uncompact_uint32(bytes);
			this.components =  new Laya.Dictionary();
			for (var componentsIndex = 0; componentsIndex < componentsSize; componentsIndex++) 
			{
				this.components.set(bytes.readByte(), bytes.readUint32());
				
			}
			
		}
	}
}