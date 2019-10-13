/**
* 物品的tips 
*/
module game.modules.strengThening.models{
	export class TipsVo{
       public packid:number;
	   public keyinpack:number; 
	   /**基础属性 */
       public baseAttr:Laya.Dictionary;   
	   /**附加属性 */
       public addAttr:Laya.Dictionary;  
	   /**技能 */
       public skill:number;   
	   /**特效 */
       public effect:number;  
	   /**宝石 */
       public diamondID:Array<any>;   
	   /**耐久度 */
       public endure:number;  
	   /**最大耐久度 */
       public maxendure:number;  
	   /**修理失败的次数 */
       public repairtimes:number;  
	   /**装备评分 */
       public equipscore:number;   
       public utf16String;
	   /**附魔属性 */
       public enhancement:Array<any>; 
	   /**是否找回过 */
       public isRecover:Boolean;  


		constructor(){

		}
		public fromByteArray(bytes:ByteArray):void {
			let head:number = ByteArrayUtils.uncompact_uint32(bytes);
			let mapSize:number = bytes.readUint32();
			this.baseAttr = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
               this.baseAttr.set(bytes.readUint32(),bytes.readUint32());
           	}
			mapSize = bytes.readUint32();
			this.addAttr = new Laya.Dictionary();
            if(mapSize > 0){
               for (var index = 0; index < mapSize; index++) {
                   this.addAttr.set(bytes.readUint32(),bytes.readInt32());
           	   }
            }
			this.skill = bytes.readUint32();
			this.effect = bytes.readUint32();
			let arraySize:number = bytes.readUint32();
			this.diamondID = new Array();
            if(arraySize > 0){
			   for (var index = 0; index < arraySize; index++) {
                   this.diamondID.push(bytes.readUint32());
             	}
            }
			this.endure = bytes.readUint32();
			this.maxendure = bytes.readUint32();
			this.repairtimes = bytes.readUint32();
			this.equipscore = bytes.readUint32();
			var utf16StringLength:number = ByteArrayUtils.uncompact_uint32(bytes);
			var arrayBuffer:ArrayBuffer = bytes.buffer.slice(bytes.position, bytes.position + utf16StringLength);
			this.utf16String = ByteArrayUtils.utf16ToUtf8FromByte(arrayBuffer);
			bytes.position = bytes.position + utf16StringLength;

			arraySize = bytes.readUint32();
			this.enhancement = new Array();
			let subSize:number;
			for (var index = 0; index < arraySize; index++) {
				subSize = bytes.readUint32();
				var enhancementAttr:Laya.Dictionary = new Laya.Dictionary();
				for (var index = 0; index < arraySize; index++) {
               		enhancementAttr.set(bytes.readUint32(), bytes.readUint32());
           		}
				let enhancementtime = bytes.readLong();
               this.enhancement.push({enhancementAttr: enhancementAttr, enhancementtime: enhancementtime});
           	}			   
			this.isRecover = bytes.readBoolean();
		}
	}
}