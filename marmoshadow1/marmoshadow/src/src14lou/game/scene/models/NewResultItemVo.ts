/**
* name 
*/
module game.scene.models{
	export class NewResultItemVo{
		//public actionSeq:number;
		public demoExecuteVo:DemoExecuteVo;
		public subresultlist:Array<NewSubResultItemVo>;
		public newfighter:Array<FighterInfoVo>;
		public roleChangedAttrs:Laya.Dictionary;		//战斗脚本接收者，此动作后属性的变化（战斗中属性实时变化）
		public petChangedAttrs:Laya.Dictionary;			//战斗脚本接收者的宠物，此动作后属性的变化
		public fromByteArray(bytes:ByteArray):void {

			this.demoExecuteVo = new DemoExecuteVo();
			this.demoExecuteVo.fromByteArray(bytes);//DemoExecute
			
			this.subresultlist = [];	
			let subresultlistSize:number = bytes.readUint8();
			let newSubResultItem:NewSubResultItemVo;
			for (var index = 0; index < subresultlistSize; index++) {
				newSubResultItem = new NewSubResultItemVo();
				newSubResultItem.fromByteArray(bytes);
				this.subresultlist.push(newSubResultItem);
			}//NewSubResultItem
				
			this.newfighter = [];	
			let newfighterSize:number = bytes.readUint8();
			let fighterInfo:FighterInfoVo;
			for (var index = 0; index < newfighterSize; index++) {
				fighterInfo = new FighterInfoVo();
				fighterInfo.fromByteArray(bytes);
				this.newfighter.push(fighterInfo);
			}//FighterInfo
			
			let mapSize:number = bytes.readUint8();
			this.roleChangedAttrs = new Laya.Dictionary(); 		
			for (var index = 0; index < mapSize; index++) {
				this.roleChangedAttrs.set(bytes.readUint32(),bytes.readFloat());
			}
			mapSize = bytes.readUint8();
			this.petChangedAttrs = new Laya.Dictionary(); 			
			for (var index = 0; index < mapSize; index++) {
				this.petChangedAttrs.set(bytes.readUint32(),bytes.readFloat());
			}
		}
	}
}