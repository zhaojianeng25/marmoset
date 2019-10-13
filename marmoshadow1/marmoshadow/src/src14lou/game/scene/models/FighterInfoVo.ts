/**
* name 
*/
module game.scene.models{
	export class FighterInfoVo{		
		public fighterType:number;  		//战斗单元类型
		public dataID:number;				//战斗单元的标记 人物为人物的roleid 宠物和怪物则为表中的baseID
		public fighterName:string;			//战斗单元名称
		public title:string;				//战斗单元称谓
		public titleId:number;				//战斗单元称谓ID
		public awakeState:number;			//觉醒状态 00000 5个bit位，从低位到高位分别标识95至99状态，0-未觉醒，1-觉醒（具体值是int数值）
		public index:number;				//战斗单元在战斗中的相对位置 1-14是我方  15及以上是敌方
		public bGM:number;					//是否是GM,0:否 1：是
		public maxhp:number;				//最大血量
		public uplimithp:number;			//血量上限
		public hp:number;					//当前血量
		public ep:number;					//当前效果点
		public shape:number;				//造型	造型为short值
		public subtype:number;				//子类型，宠物为资质，怪物为宝宝野宠等
		public components:Laya.Dictionary;	//角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装
		public buffs:Laya.Dictionary;		//添加的战斗者拥有的在战斗内显示的buff，value为回合数（为0则没有回合限制）
		public footLogoId:number;			//足印id
		public petkeys:Array<number>;		//已经出战的宠物

		/////fighterType 战斗单元类型
		/*FIGHTER_ROLE = 1; 		// 角色
		FIGHTER_PET = 2; 			// 宠物
		FIGHTER_PARTNER = 3; 		// 伙伴（玩家自带助战）
		FIGHTER_MONSTER_HIDE = 4; 	// 暗雷野怪（20000~23999）
		FIGHTER_MONSTER_NPC = 5; 	// 战斗npc（24000以上）
		FIGHTER_SYSTEM_PARTNER = 6; // 系统安排的助战*/
		
		public fromByteArray(bytes:ByteArray):void {
			this.fighterType = bytes.readInt32();
			this.dataID = bytes.readLong();
			this.fighterName = ByteArrayUtils.readUtf16String(bytes);
			this.title = ByteArrayUtils.readUtf16String(bytes);
			this.titleId = bytes.readInt32();
			this.awakeState = bytes.readInt32();
			this.index = bytes.readInt32();
			this.bGM = bytes.readByte();
			this.maxhp = bytes.readInt32();
			this.uplimithp = bytes.readInt32();
			this.hp = bytes.readInt32();
			this.ep = bytes.readInt32();
			this.shape = bytes.readInt32();
			this.subtype = bytes.readInt32();
			
			let mapSize:number = bytes.readUint8();
			this.components = new Laya.Dictionary(); 		
			for (var index = 0; index < mapSize; index++) {
				this.components.set(bytes.readByte(), bytes.readUint32());
			}
			
			mapSize = bytes.readUint8();
			this.buffs = new Laya.Dictionary(); 			
			for (var index = 0; index < mapSize; index++) {
				this.buffs.set(bytes.readUint32(), bytes.readUint32());
			}			
			this.footLogoId = bytes.readInt32();
			
			this.petkeys = [];	
			let petkeysSize:number = bytes.readUint8();
			for (var index = 0; index < petkeysSize; index++) {
				this.petkeys.push(bytes.readInt32());
			}
		}
	}
}