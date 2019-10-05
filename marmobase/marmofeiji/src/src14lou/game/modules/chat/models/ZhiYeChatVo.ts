/**
* name 
*/
module game.modules.chat.models{
	export class ZhiYeChatVo{
		public channer:string = "门派";
		public roleId:number // ID
		public roleName:string; // 角色名称
		public chatContent:string; // 聊天内容
		public roleIcon:number; // 角色icon
		
		/*map<int32, int32> components = 6; // 角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装
		uint64 rolecreateTime = 7; // 角色创建时间
		uint64 forbidTime = 8; // 封停截止时间
		uint32 forbidReason = 9; // 封停原因*/

		constructor(){

		}
	}
}