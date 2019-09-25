
module game.modules.pet.models {
	/** 宠物详情数据 */
	export class PetInfoVo {
		 /** 宠物ID*/
		public id: number;
		 /** key*/
		public key: number;
		/** 名称*/
		public name: string; 
		/**等级*/
		public level: number; 
		 /**参战等级*/
		public useLevel: number;
		 /**  宠物当前资质浓度值*/
		public xuemai: number;
		/**   root-bone*/
		public gengu: number; 
		/** 颜色值*/
		public colour: number; 
		/**当前生命*/
		public hp: number; 
		/** 最大生命*/
		public maxhp: number; 
		 /** 当前法力*/
		public mp: number;
		/** 最大法力*/
		public maxmp: number; 
		/**   攻击*/
		public attack: number; 
		/** 防御*/
		public defend: number; 
		/** 速度*/
		public speed: number; 
		/** 法术攻击*/
		public magicattack: number; 
		/** 法术防御*/
		public magicdef: number; 
		/** 1,2,3,4分别代表4个size*/
		public scale: number; 
		/** 初始的基础战斗属性*/
		public initbfp: BasicFightPropertiesVo; 
		/** 基础战斗属性*/
		public bfp: BasicFightPropertiesVo; 
		 /** 潜能。未分配点数*/
		public point: number;
		/**  加点方案-升级自动加体质*/
		public autoaddcons: number; 
		/** 加点方案-升级自动加智力*/
		public autoaddiq: number; 
		 /** 加点方案-升级自动加力量*/
		public autoaddstr: number;
		 /** 加点方案-升级自动加耐力*/
		public autoaddendu: number;
		 /** 加点方案-升级自动加敏捷*/
		public autoaddagi: number;
		 /**  宠物加点的重置次数*/
		public pointresetcount: number;
		 /** 当前经验*/
		public exp: number;
		/** 升级需要经验*/
		public nexp: number; 
		/** 攻击资质*/
		public attackapt: number; 
		/** 防御资质*/
		public defendapt: number; 
		 /** 体力资质*/
		public phyforceapt: number;
		 /** 法力资质*/
		public magicapt: number;
		/** 速度资质*/
		public speedapt: number; 
		/** 躲闪资质*/
		public dodgeapt: number; 
		 /** 成长率*/
		public growrate: number;
		 /** 寿命*/
		public life: number;
		/** 宠物类型 野生、宝宝*/
		public kind: number; 
		/**  宠物技能*/
		public skills: Array<PetSkillVo>; 
		/** 有时限的宠物技能的到期时间。key=技能id，value=到期时间*/
		public skillexpires: Laya.Dictionary; 
		 /** 宠物标志 1= 锁定，2 = 绑定*/
		public flag: number;
		 /** 如果是时间锁，到期时间（毫秒）*/
		public timeout: number;
		/** 主人id*/
		public ownerid: number; 
		/** 主人名*/
		public ownername: string; 
		/** 排行榜排名*/
		public rank: number; 
		/** 当前星星等级Id*/
		public starId: number; 
		/** 当前剩余的训练次数*/
		public practiseTimes: number; 
		 /** 训练后得到的未分配的资质*/
		public zizhi: Laya.Dictionary;
		 /** 训练后得到的root-bone变化值*/
		public changeGengu: number;
		/** 宠物技能格子数*/
		public skill_grids: number; 
		/** 资质培养次数*/
		public aptaddcount: number; 
		/** 成长率培养次数*/
		public growrateaddcount: number; 
		 /** 洗练次数*/
		public washcount: number;
		/** 宠物评分*/
		public petscore: number; 
		 /** 宠物一级属性评分*/
		public petbasescore: number;
		 /** 宠物染色部位1*/
		public petdye1: number;
		/** 宠物染色部位2*/
		public petdye2: number; 
		/** 神兽养成次数*/
		public shenshouinccount: number; 
		/** 摆摊冻结截止时间,默认0不冻结*/
		public marketfreezeexpire: number; 
		/**宠物是否稀有*/
		public unusualid: number;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			this.id = bytes.readInt32();
			this.key = bytes.readInt32();
			this.name = ByteArrayUtils.readUtf16String(bytes);
			this.level = bytes.readInt32();
			this.useLevel = bytes.readInt32();
			this.xuemai = bytes.readInt32();
			this.gengu = bytes.readInt32();
			this.colour = bytes.readInt32();
			this.hp = bytes.readInt32();
			this.maxhp = bytes.readInt32();
			this.mp = bytes.readInt32();
			this.maxmp = bytes.readInt32();
			this.attack = bytes.readInt32();
			this.defend = bytes.readInt32();
			this.speed = bytes.readInt32();
			this.magicattack = bytes.readInt32();
			this.magicdef = bytes.readInt32();
			this.scale = bytes.readByte();
			this.initbfp = new BasicFightPropertiesVo();
			this.initbfp.fromByteArray(bytes);
			this.bfp = new BasicFightPropertiesVo();
			this.bfp.fromByteArray(bytes);
			this.point = bytes.readInt16();
			this.autoaddcons = bytes.readByte();
			this.autoaddiq = bytes.readByte();
			this.autoaddstr = bytes.readByte();
			this.autoaddendu = bytes.readByte();
			this.autoaddagi = bytes.readByte();
			this.pointresetcount = bytes.readInt16();
			this.exp = bytes.readLong();
			this.nexp = bytes.readLong();
			this.attackapt = bytes.readInt32();
			this.defendapt = bytes.readInt32();
			this.phyforceapt = bytes.readInt32();
			this.magicapt = bytes.readInt32();
			this.speedapt = bytes.readInt32();
			this.dodgeapt = bytes.readInt32();
			this.growrate = bytes.readFloat();
			this.life = bytes.readInt32();
			this.kind = bytes.readInt32();
			this.skills = [];
			let skillsSize: number = bytes.readUint8();
			let petskill: PetSkillVo;
			for (var index = 0; index < skillsSize; index++) {
				petskill = new PetSkillVo();
				petskill.fromByteArray(bytes);
				this.skills.push(petskill);
			}
			let mapSize: number = bytes.readUint8();
			this.skillexpires = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				this.skillexpires.set(bytes.readInt32(), bytes.readLong());
			}
			this.flag = bytes.readByte();
			this.timeout = bytes.readLong();
			this.ownerid = bytes.readLong();
			this.ownername = ByteArrayUtils.readUtf16String(bytes);
			this.rank = bytes.readInt32();
			this.starId = bytes.readInt16();
			this.practiseTimes = bytes.readInt16();
			let mapSize1: number = bytes.readUint8();
			this.zizhi = new Laya.Dictionary();
			for (var index = 0; index < mapSize1; index++) {
				this.zizhi.set(bytes.readInt32(), bytes.readInt32());
			}
			this.changeGengu = bytes.readInt32();
			this.skill_grids = bytes.readInt32();
			this.aptaddcount = bytes.readByte();
			this.growrateaddcount = bytes.readByte();
			this.washcount = bytes.readInt16();
			this.petscore = bytes.readInt32();
			this.petbasescore = bytes.readInt32();
			this.petdye1 = bytes.readInt32();
			this.petdye2 = bytes.readInt32();
			this.shenshouinccount = bytes.readInt32();
			this.marketfreezeexpire = bytes.readLong();
		}
	}
}