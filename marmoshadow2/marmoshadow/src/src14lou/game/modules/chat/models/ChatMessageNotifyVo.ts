/**
* 聊天通用消息数据结构
*/
module game.modules.chat.models{
	export class ChatMessageNotifyVo{
		public messageid:number;  					 // 提示id
		public npcbaseid:number 					 // npc id
		public parameters:Array<any>; 				 // 参数
		constructor()
		{

		}
	public fromByteArray(bytes:ByteArray):void {
			this.messageid = bytes.readUint32();
			this.npcbaseid = bytes.readUint32();
			this.parameters = [];	
			let parametersSize:number = bytes.readUint8();
			//对于红包某条消息进行特殊处理
			if(this.messageid == 172012 || this.messageid == 172015 || this.messageid == 172016){
				for (var index = 0; index < parametersSize; index++) 
				{
					if(index != 2){
						this.parameters.push(ByteArrayUtils.readUtf16String(bytes));
					}
					else{
						//若没读长度，则无法读取红包id
						bytes.readUint8();
						this.parameters.push(ByteArrayUtils.readUtf16String(bytes));
					}					
				}
			}
			else{
				for (var index = 0; index < parametersSize; index++) 
				{
					this.parameters.push(ByteArrayUtils.readUtf16String(bytes));
				}
			}
}
	}
}