/**
* name  Y颜色转换表
*/
module game.data.template{
	export class CchatColorConfigBaseVo{
		public id:number;//ID
		public color:string;//表里颜色
		public notifylist:Array<string> = [];//频道1,频道2,频道3,频道4,频道5,频道6,频道7,频道8,频道9,频道10,频道11,频道12,频道13,频道14,频道15,频道16,频道17,频道18
		public chatlist:Array<string> = [];//频道19,频道20,频道21,频道22,频道23,频道24,频道25,频道26,频道27,频道28,频道29,频道30,频道31,频道32
		public headpop:string;//频道33

		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.color = data.getUTFBytes(data.getUint32());
			let listCount:number = data.getUint32();
			for (var index = 0; index < listCount; index++) {	
				this.notifylist.push(data.getUTFBytes(data.getUint32()))			
				// console.log(data.getUTFBytes(data.getUint32()));				
			}
			let listCount2:number = data.getUint32();
			for (var index = 0; index < listCount2; index++) {		
				this.chatlist.push(data.getUTFBytes(data.getUint32()))		
				// console.log(data.getUTFBytes(data.getUint32()));				
			}
			this.headpop = data.getUTFBytes(data.getUint32());
		}
	}
}