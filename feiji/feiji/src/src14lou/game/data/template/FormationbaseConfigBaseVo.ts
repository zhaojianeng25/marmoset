/**
* name 
*/
module game.data.template{
	export class FormationbaseConfigBaseVo{
		public id:number;//编号
		public name:string;//名称
		public imagepath:string;//图片路径
		public icon:number;//光环图标
		public describe:string;//效果
		public formation:Array<number> = [];//己方一,己方二,己方三,己方四,己方五,己方六,己方七,己方八,己方九,己方十,己方十一,己方十二,己方十三,己方十四,敌方十五,敌方十六,敌方十七,敌方十八,敌方十九,敌方二十,敌方二十一,敌方二十二,敌方二十三,敌方二十四,敌方二十五,敌方二十六,敌方二十七,敌方二十八
		public des:string;//描述
		public fear1:string;//被克一
		public fear2:string;//被克二
		public path:string;//光环背景
		public bookid:number;//匹配光环卷轴Id
		public bookaddexp:number;//匹配光环卷轴增加值
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.imagepath = data.getUTFBytes(data.getUint32());
			this.icon = data.getUint32();
			this.describe = data.getUTFBytes(data.getUint32());
			let listCount:number = data.getUint32();
			for (var index = 0; index < listCount; index++) {				
				this.formation.push(data.getUint32());				
			}
			this.des =data.getUTFBytes(data.getUint32());
			this.fear1 =data.getUTFBytes(data.getUint32());
			this.fear2 =data.getUTFBytes(data.getUint32());
			this.path =data.getUTFBytes(data.getUint32());
			this.bookid = data.getUint32();
			this.bookaddexp = data.getUint32();
			
		}
	}
}