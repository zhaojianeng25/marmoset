/**
* 聊天信息插入附加属性(道具、宠物、技能) 
*/
module game.modules.chat.models{
	export class DisplayInfoVo{
		public displaytype:number;			//类型	
		public roleid:number;				//角色id
		public shopid:number;				//商店id,成就类型的时候是完成时间(1主线任务 2循环任务)
		public counterid:number;			//柜台id,成就类型的时候是成就进度
		public uniqid:number;				//唯一id,成就类型的时候是是成就id
		public teamid:number;				//队长ID by changhao
		public crosstt:number;				//没有房间(0)或有房间(1)
		public serverid:number;				//服务器id
		constructor(){

		}
  public fromByteArray(bytes:ByteArray):void 
  {
		this.displaytype = bytes.readInt32();
		this.roleid = ByteArrayUtils.readLong(bytes);
		this.shopid = ByteArrayUtils.readLong(bytes);
		this.counterid = bytes.readInt32();
		this.uniqid = bytes.readInt32();
		this.teamid = ByteArrayUtils.readLong(bytes);
		this.crosstt = ByteArrayUtils.readLong(bytes);
		this.serverid = ByteArrayUtils.readLong(bytes);
}

	}
}