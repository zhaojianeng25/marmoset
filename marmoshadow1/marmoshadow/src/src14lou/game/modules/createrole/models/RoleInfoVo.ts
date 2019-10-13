/**
* name 
*/
module game.modules.createrole.models{
	export class RoleInfoVo{
		public roleId:number // ID
		public roleName:string; // 名称
		public school:number; // 人物职业
		public shape:number; // 造型id
		public level:number; // 等级
		//map<int32, int32> components = 6; // 角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装
		public components:Laya.Dictionary; // 角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装
		public roleCreateTime:number; // 角色创建时间
		public forbidTime:number; // 封停截止时间
		public forbidReason:number; // 封停原因

		constructor(){

		}
		public fromByteArray(bytes:ByteArray):void {
			this.roleId = bytes.readLong();
			//this.roleName = bytes.readString();
			//this.roleName = bytes.readUTFBytes(bytes.readUint8());

			/*var utf16StringLength:number = ByteArrayUtils.uncompact_uint32(bytes);
			var arrayBuffer:ArrayBuffer = bytes.buffer.slice(bytes.position, bytes.position + utf16StringLength);
			this.roleName = ByteArrayUtils.utf16ToUtf8FromByte(arrayBuffer);
			console.log("RoleInfoVo utfx.UTF16toUTF8:", this.roleName);
			bytes.position = bytes.position + utf16StringLength;*/
			this.roleName = ByteArrayUtils.readUtf16String(bytes);

			this.school = bytes.readUint32();
			this.shape = bytes.readUint32();
			this.level = bytes.readUint32();
			this.components = new Laya.Dictionary();
			let componentSize:number = bytes.readUint8();
			for (var index = 0; index < componentSize; index++) {
               this.components.set(bytes.readUint8(),bytes.readUint32());
           	}
			this.roleCreateTime = bytes.readLong();
			this.forbidTime = bytes.readLong();
			this.forbidReason = bytes.readUint32();
			console.log("RoleInfoVo fromByteArray", this);
		}
	}
}