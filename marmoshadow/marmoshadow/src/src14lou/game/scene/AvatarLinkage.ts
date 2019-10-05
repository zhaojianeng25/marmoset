/**
* name 
*/
module game.scene{
	export class AvatarLinkage{
		constructor(){

		}

		//////////////////////////////////////////////////////////////
		//////////////////////// 种类枚举 ////////////////////////////
		//////////////////////////////////////////////////////////////		
		public static KIND_NONE		:number = 0;		//未定义种类
		public static KIND_PLAYER	:number = 1;		//玩家种类
		public static KIND_CREATURE	:number = 2;		//怪物种类
		public static KIND_MOUNT	:number = 4;		//坐骑
		
		/***********************************************************************************/
		//职业
		/***********************************************************************************/
		public static OCC_NONE		:number = 0;	//无
		public static OCC_STRONG	:number = 1;	//壮男
		public static OCC_HANDSOME :number = 2;		//俊男 
		public static OCC_LAURIE	:number = 3;	//萝莉
		public static OCC_BEAUTY	:number = 4;	//美人
				
		//////////////////////////////////////////////////////////////
		//////////////////////// 装备分类枚举 ////////////////////////
		//////////////////////////////////////////////////////////////
		
		public static EQUIP_BODY		:number = 0;		//身体
//		public static EQUIP_CLOTHES	:number = 1;			//衣服
		public static EQUIP_CLOAK		:number = 2;		//披风
		public static EQUIP_ARMS		:number = 3;		//武器
		public static EQUIP_MOUNTHAIR	:number = 4;		//坐骑头
		public static EQUIP_HAND		:number = 5;		//手掌
		public static EQUIP_WINGS		:number = 6;		//翅膀
		
		//////////////////////////////////////////////////////////////
		//////////////////////// 方向枚举 ////////////////////////////
		//////////////////////////////////////////////////////////////
		public static DIRECT_NONE	:number = 0;
		public static DIRECT_VICE	:number = 1;
		public static DIRECT_MAIN	:number = 2;
		
		
		private _kind:number;		
		private _occ:number;
		private _equip:number;
		public direct:number;
		public shortName:string;
		
		/**
		 * 清理 
		 * 
		 */		
		public clear():void{
			this._kind = 0;
			this._occ = 0;
			this._equip = 0;
			this.direct = 0;
			this.shortName = null;
		}
		
		public get kind():number{
			return this._kind;	
		}
		public set kind(value:number){
			if(this._kind == value) return;
			this._kind = value;
			//只有玩家才分模型,装备
			if(this._kind != AvatarLinkage.KIND_PLAYER){
				this.occ = AvatarLinkage.OCC_NONE;
				this.equip = AvatarLinkage.EQUIP_BODY;
			}
		}
		
		public get occ():number{
			return this._occ;
		}
		public set occ(value:number){
			if(this._occ == value) return;
			this._occ = value;
			//模型0的，只有身体
			if(this._occ == AvatarLinkage.OCC_NONE){
				this.equip = AvatarLinkage.EQUIP_BODY;
			}
		}
		
		public get equip():number{
			return this._equip;
		}
		public set equip(value:number){
			if(this._equip == value) return;
			this._equip = value;
			//只有手和武器才分主副
			if(this._equip != AvatarLinkage.EQUIP_HAND && this._equip != AvatarLinkage.EQUIP_ARMS){
				this.direct = AvatarLinkage.DIRECT_NONE;
			}
		}
		
		
		/**
		 * 获得avatar全名 
		 * @return 
		 * 
		 */		
		public getName():string
		{
			if(StringU.isEmpty(this.shortName))	return null;
			
			return this._kind.toString() + this._occ.toString() +
				this._equip.toString() + this.direct.toString() +
				this.shortName;
		}
		
		/**
		 * 通过短名获得全名
		 * @param __shortName
		 * @return 
		 * 
		 */		
		public getName1(__shortName:string):string{
			this.shortName = __shortName;
			return this.getName();
		}
		
		/**
		 * 通过短名和装备类型获得全名 
		 * @param __equip
		 * @param __shorName
		 * @return 
		 * 
		 */		
		public getName2(__equip:number, __shorName:string):string{
			this.equip = __equip;
			this.shortName = __shorName;
			return this.getName();
		}
	}
}