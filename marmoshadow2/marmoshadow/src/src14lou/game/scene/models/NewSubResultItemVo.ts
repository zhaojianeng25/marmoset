/**
* name 
*/
module game.scene.models{
	export class NewSubResultItemVo{		
		public subskillid:number;//子技能表技能ID，去阶段串联表取阶段id，然后去阶段表取特效
		public subskillstarttime:number;
		public resultlist:Array<NewDemoResultVo>;
		public fromByteArray(bytes:ByteArray):void {
			this.subskillid = bytes.readInt32();
			this.subskillstarttime = bytes.readInt32();
			
			this.resultlist = [];	
			let resultlistSize:number = bytes.readUint8();
			let newDemoResult:NewDemoResultVo;
			for (var index = 0; index < resultlistSize; index++) {
				newDemoResult = new NewDemoResultVo();
				newDemoResult.fromByteArray(bytes);
				this.resultlist.push(newDemoResult);
			}//NewDemoResult
		}
	}
}