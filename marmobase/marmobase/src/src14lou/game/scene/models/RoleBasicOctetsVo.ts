/**
* 玩家信息 
*/
module game.scene.models{
	export class RoleBasicOctetsVo{
		/**玩家id*/
		public roleid:number;
		/**玩家名字*/
		public rolename:string;
		/**门派*/
		public dirandschool:number;
		/**造型*/
		public shape:number;
		/**等级*/
		public level:number;
		/**工会*/
		public camp:number;		
		public components:Laya.Dictionary;
		/**队伍等其他信息*/
		public datas:Laya.Dictionary;
		constructor(){
		}
		public fromByteArray(bytes:ByteArray):void {
			this.roleid = bytes.readLong();
			this.rolename = ByteArrayUtils.readUtf16String(bytes);
			this.dirandschool = bytes.readByte();
			this.shape = bytes.readInt32();
			this.level = bytes.readInt32();
			this.camp = bytes.readByte();	
			let componentssize:number = ByteArrayUtils.uncompact_uint32(bytes);
			this.components = new Laya.Dictionary(); 
			for (var index = 0; index < componentssize; index++) {
				this.components.set(bytes.readByte(),bytes.readInt32());	
			}	
			
			let datassize:number = ByteArrayUtils.uncompact_uint32(bytes);
			this.datas= new Laya.Dictionary(); 	
			for (var index = 0; index < datassize; index++) {			
				let key = bytes.readByte();
				let head:number = ByteArrayUtils.uncompact_uint32(bytes);
				switch (key) {
					case DataType.SHOW_PET:
						let showpet:PeocTestsVo = new PeocTestsVo();
						showpet.fromByteArray(bytes);
						this.datas.set(key,showpet);
						break;
					case DataType.TEAM_INFO:
						let team:TeamOctetsVo = new TeamOctetsVo();
						team.fromByteArray(bytes);
						this.datas.set(key,team);
						break;
					case DataType.TITLE_ID:
						this.datas.set(key,bytes.readInt32());
						break;
					case DataType.TITLE_NAME:
						this.datas.set(key,ByteArrayUtils.readUtf16String(bytes));
						break;
					case DataType.STALL_NAME:
						this.datas.set(key,ByteArrayUtils.readUtf16String(bytes));
						break;
					case DataType.MODEL_TEMPLATE:
						this.datas.set(key,bytes.readInt32());
						break;
					case DataType.HEADRESS_SHAPE:
						this.datas.set(key,bytes.readInt32());
						break;
					case DataType.SCENE_STATE:
						this.datas.set(key,bytes.readInt32());
						break;				
					case DataType.ROLE_ACTUALLY_SHAPE:
						this.datas.set(key,bytes.readInt32());
						break;
					case DataType.PLAYING_ACTION:
						this.datas.set(key,bytes.readByte());
						break;
					case DataType.STALL_BOARD:
						this.datas.set(key,bytes.readByte());
						break;
					case DataType.FOOT_LOGO_ID:
						this.datas.set(key,bytes.readInt32());
						break;
					case DataType.AWAKE_STATE:
						this.datas.set(key,bytes.readInt32());
						break;
					case DataType.CRUISE:
						this.datas.set(key,bytes.readInt32());
						break;
					case DataType.EFFECT_EQUIP:
						this.datas.set(key,bytes.readInt32());
						break;
					case DataType.CRUISE2:
						this.datas.set(key,bytes.readInt32());
						break;
					case DataType.CRUISE3:
						this.datas.set(key,bytes.readInt32());
						break;
					default:
						break;
				}
			}				
			
		}
	}
}