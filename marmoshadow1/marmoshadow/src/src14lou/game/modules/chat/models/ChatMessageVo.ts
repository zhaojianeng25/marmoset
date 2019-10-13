/**
* 聊天通用消息数据结构by LJM
*/
module game.modules.chat.models
{
	export class ChatMessageVo
	{
		public roleid: any;  					 // 发言角色ID
		public rolename: string 					 // 名字
		public shapeid: number; 					 // 头像
		public titleid: number; 					 // 称谓
		public messagetype: number;                  // 频道
		public message:string; 					 	 // 内容
		public displayinfos:Array<DisplayInfoVo>;	 // 显示道具、宠物、技能

		constructor()
		{

		}
	//    public fromByteArray(bytes:ByteArray):void 
	//    {
	// 		this.roleid = bytes.readLong();
	// 		this.rolename = bytes.readUTFBytes(bytes.readUint8());
	// 		this.shapeid = bytes.readUint32();
	// 		this.titleid = bytes.readUint32();
	// 		this.messagetype = bytes.readUint32();
	// 		this.message = bytes.readUTFBytes(bytes.readUint8());
			
	// 		this.displayinfos = [];
	// 		let displayInfo :DisplayInfoVo;
	// 		let displayinfosSize:number = bytes.readUint8();
	// 		for (var index = 0; index < displayinfosSize; index++) 
	// 		{
	// 			displayInfo = displayInfo[index];
	// 			this.displayinfos.push(displayInfo);
	// 		}
    //     }
	}
}