/**
* name 
*/
module game.modules.team.models {
	export class RoleRollInfoVo {
		public roleid: number;
		public rolename: string;
		public roll: number;
		constructor() {

		}
		public fromByteArray(bytes: ByteArray): void {
			this.roleid = bytes.readLong();
			this.rolename = bytes.readUTFBytes(bytes.readUint8());
			this.roll = bytes.readInt32();
		}
	}
}