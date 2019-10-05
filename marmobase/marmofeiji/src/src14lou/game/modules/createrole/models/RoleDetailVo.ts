/**
* name 
*/
module game.modules.createrole.models{
	export class RoleDetailVo{
		public roleid:number;//ID	
		public rolename:string;//名称
		public level:number;//等级
		public school:number;// 职业
		public shape:number;// 角色:玩家所属的系统角色的id
		public title:number;// 当前称谓
		public lastlogin:number;//上次登录时间
		public hp:number;// 气血
		public uplimithp:number;//当前气血上限
		public maxhp:number;// 最大气血
		public mp:number;// 法力
		public magicattack:number;//法术攻击
		public maxmp:number;// 最大法力
		public magicdef:number;//法术防御
		public sp:number;// 怒气
		public seal:number;// 加强封印
		public maxsp:number;// 最大怒气
		public hit:number;// 命中
		public damage:number;// 伤害
		public heal_critc_level:number;//疗暴等级
		public defend:number;// 防御
		public phy_critc_level:number;//外功暴击等级
		public speed:number;// 速度
		public magic_critc_level:number;//内功暴击等级
		public dodge:number;//  躲避
		public anti_phy_critc_level:number;//外功抗性等级
		public medical:number;//治疗强度
		public unseal:number;// 封印抗性
		public anti_critc_level:number;//暴击抗性等级
		public phy_critc_pct:number;//外功暴击程度
		public magic_critc_pct:number;//内功暴击程度
		public heal_critc_pct:number;//疗暴程度
		public anti_magic_critc_level:number;// 内功抗性等级
		public energy:number;//活力
		public enlimit:number;//活力上限
		//RoleBasicFightProperties bfp = 36;//  
		// public bfp;//  
		//map<int32,int32> point = 37;//潜能
		public point:Laya.Dictionary = new Laya.Dictionary();//潜能
		public pointscheme:number//当前加点方案
		public schemechanges:number//方案切换次数
		public schoolvalue:number//职业贡献值
		public reputation:number//声望值
		public exp:number//经验
		public nexp:number//升级 需要经验
		public showpet:number//当前展示的宠物
		public petmaxnum:number//可携带的最大宠物数量
		//repeated Pet pets = 46;//
		public pets:Array<game.modules.pet.models.PetInfoVo>;//
		/*map<int32,int32> sysconfigmap = 47;//
		map<int32,int32> lineconfigmap = 48;//
		map<int32,TitleInfo> titles = 49;//称谓信息
		map<int32,FormBean> learnedFormsMap = 50;//
		map<uint32,int32> components = 51;//角色装备信息 0脱下	*/
		public sysconfigmap:Laya.Dictionary = new Laya.Dictionary();//
		public lineconfigmap:Laya.Dictionary = new Laya.Dictionary();//
		/**称谓信息字典key:称谓id,value:称谓名 */
		public titles:Laya.Dictionary = new Laya.Dictionary();
		public learnedFormsMap:Laya.Dictionary = new Laya.Dictionary();//
		public components:Laya.Dictionary = new Laya.Dictionary();//角色装备信息 0脱下
		public activenesst:number;//活跃度值
		public factionvalue:number;//公会贡献度
		public masterid:number;//
		public isprotected:number;//是否处于财产保护状态，1 = 是 ； 0 = 否
		public wrongpwdtimes:number;//24小时内输错密码的次数
		/** 当前战斗宠物的索引 */
		public petIndex:number;
		public kongzhijiacheng:number;//控制加成
		public kongzhimianyi:number;//控制免疫
		public zhiliaojiashen:number;//治疗加深
		public wulidikang:number;//物理抵抗
		public fashudikang:number;//法术抵抗
		public fashuchuantou:number;//法术穿透
		public wulichuantou:number;//物理穿透//
		//public map<int32,Bag> bagInfo = 65;//key是bagid,value是背包的详细信息
		public bagInfo:Object = {};//key是bagid,value是背包的详细信息
		public rolecreatetime:number;//角色创建时间
		//public map<int32,string> depotNameInfo = 67;//key是depotid,value是depot名(如果是默认的就不存了)
		public depotNameInfo:Object = {};//key是depotid,value是depot名(如果是默认的就不存了)

		constructor(){

		}		
		public fromByteArray(bytes:ByteArray):void {
			this.roleid = bytes.readLong();
			//this.rolename = bytes.readUTFBytes(bytes.readUint8());
			this.rolename = ByteArrayUtils.readUtf16String(bytes);
			this.level = bytes.readUint32();
			this.school = bytes.readUint32();
			this.shape = bytes.readUint32();
			this.title = bytes.readInt32();
			this.lastlogin = bytes.readLong();
			this.hp = bytes.readUint32();
			this.uplimithp = bytes.readUint32();
			this.maxhp = bytes.readUint32();
			this.mp = bytes.readUint32();
			this.magicattack = bytes.readUint32();
			this.maxmp = bytes.readUint32();
			this.magicdef = bytes.readUint32();
			this.sp = bytes.readUint32();
			this.seal = bytes.readUint32();
			this.maxsp = bytes.readUint32();
			this.hit = bytes.readUint32();
			this.damage = bytes.readUint32();
			this.heal_critc_level = bytes.readUint32();
			this.defend = bytes.readUint32();
			this.phy_critc_level = bytes.readUint32();
			this.speed = bytes.readUint32();
			this.magic_critc_level = bytes.readUint32();
			this.dodge = bytes.readUint32();
			this.anti_phy_critc_level = bytes.readUint32();
			this.medical = bytes.readUint32();
			this.unseal = bytes.readUint32();
			this.anti_critc_level = bytes.readUint32();
			this.phy_critc_pct = bytes.readFloat();
			this.magic_critc_pct = bytes.readFloat();
			this.heal_critc_pct = bytes.readFloat();
			this.anti_magic_critc_level = bytes.readUint32();
			this.energy = bytes.readUint32();
			this.enlimit = bytes.readUint32();

			//this.bfpSize = bytes.readUint16();
			this.bfp.cons = bytes.readUint16();	//体质
			this.bfp.iq = bytes.readUint16();	//智力
			this.bfp.str = bytes.readUint16();	//力量
			this.bfp.endu = bytes.readUint16();	//耐力
			this.bfp.agi = bytes.readUint16();	//敏捷

			let mapSize:number = bytes.readUint8();
			this.bfp.cons_save = new Laya.Dictionary(); 		//已分配体质
			for (var index = 0; index < mapSize; index++) {
               this.bfp.cons_save.set(bytes.readUint32(),bytes.readUint32());
           	}
			mapSize = bytes.readUint8();
			this.bfp.iq_save = new Laya.Dictionary(); 			//已分配智力
			for (var index = 0; index < mapSize; index++) {
               this.bfp.iq_save.set(bytes.readUint32(),bytes.readUint32());
           	}
			mapSize = bytes.readUint8();
			this.bfp.str_save = new Laya.Dictionary(); 			//已分配力量
			for (var index = 0; index < mapSize; index++) {
               this.bfp.str_save.set(bytes.readUint32(),bytes.readUint32());
           	}
			mapSize = bytes.readUint8();
			this.bfp.endu_save = new Laya.Dictionary(); 		//已分配耐力
			for (var index = 0; index < mapSize; index++) {
               this.bfp.endu_save.set(bytes.readUint32(),bytes.readUint32());
           	}
			mapSize = bytes.readUint8();
			this.bfp.agi_save = new Laya.Dictionary(); 			//已分配敏捷
			for (var index = 0; index < mapSize; index++) {
               this.bfp.agi_save.set(bytes.readUint32(),bytes.readUint32());
           	}
			


			//by:lqw
			mapSize = bytes.readUint8();
			for(var index = 0; index < mapSize; index ++) {
				this.point.set(bytes.readUint32(),bytes.readUint32());
			}
			this.pointscheme = bytes.readUint32();
			this.schemechanges = bytes.readUint32();
			this.schoolvalue = bytes.readUint32();
			this.reputation = bytes.readUint32();
			this.exp = bytes.readLong();
			this.nexp = bytes.readLong();
			this.showpet = bytes.readUint32();
			this.petmaxnum = bytes.readUint32();
			
			this.pets = [];	
			mapSize = bytes.readUint8();
			let pet: game.modules.pet.models.PetInfoVo;
			for (var index = 0; index < mapSize; index++) {
				pet = new game.modules.pet.models.PetInfoVo();
				pet.fromByteArray(bytes);
				this.pets.push(pet);
			}
			mapSize = bytes.readUint8();		
			for (var index = 0; index < mapSize; index++) {
			   this.sysconfigmap.set(bytes.readUint32(),bytes.readUint32());
			}
			mapSize = bytes.readUint8();		
			for (var index = 0; index < mapSize; index++) {
			   this.lineconfigmap.set(bytes.readUint32(),bytes.readUint32());
			}
			
			mapSize = bytes.readUint8();
			let titleInfo: TitleInfoVo;
			for (var index = 0; index < mapSize; index++) {
				titleInfo = new TitleInfoVo();
				this.titles.set(bytes.readInt32(),titleInfo);
				titleInfo.fromByteArray(bytes);
			}//titleInfo
			mapSize = bytes.readUint8();
			let formbean: FormBeanVo;
			for (var index = 0; index < mapSize; index++) {
				formbean = new FormBeanVo();
				this.learnedFormsMap.set(bytes.readUint32(),formbean);
				formbean.fromByteArray(bytes);
			}//FormBean
			
			mapSize = bytes.readUint8();
			for (var index = 0; index < mapSize; index++) {
			   this.components.set(bytes.readUint8(),bytes.readInt32());
			}
			
			
			this.activenesst = bytes.readUint32();
			this.factionvalue = bytes.readUint32();
			this.masterid = bytes.readLong();
			this.isprotected = bytes.readUint8();
			this.wrongpwdtimes = bytes.readUint8();

			this.petIndex = bytes.readInt32();
			this.kongzhijiacheng = bytes.readInt32();
			this.kongzhimianyi = bytes.readInt32();
			this.zhiliaojiashen = bytes.readInt32();
			this.wulidikang = bytes.readInt32();
			this.fashudikang = bytes.readInt32();
			this.fashuchuantou = bytes.readInt32();
			this.wulichuantou = bytes.readInt32();
			
			mapSize = bytes.readUint8();
			let bag:game.modules.bag.models.BagVo;
			for (var index = 0; index < mapSize; index++) {
				bag = new game.modules.bag.models.BagVo();
				// this.bagInfoSize.set(bytes.readUint32(),bag);
				this.bagInfo[bytes.readInt32()] = bag;
				bag.fromByteArray(bytes);
			} //bag
			this.rolecreatetime = bytes.readLong();
			
			mapSize = bytes.readUint8();		
			for (var index = 0; index < mapSize; index++) {
				this.depotNameInfo[bytes.readUint32()] = ByteArrayUtils.readUtf16String(bytes);
			}
		}
		public bfpSize:number;
		public bfp:any = {};
	}
}