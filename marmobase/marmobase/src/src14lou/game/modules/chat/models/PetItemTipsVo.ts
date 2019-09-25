/**
* 
*/
module game.modules.chat.models{
	export class PetItemTipsVo{
	public id:number; // 宠物ID
	public key:number; // key
	public name:string; // 名称
	public level:number; // 等级
	public useLevel:number; // 参战等级
	public xuemai:number; //  宠物当前资质浓度值
	public gengu:number; //   root-bone
	public colour:number; //  颜色值
	public hp:number; // 当前生命
	public maxhp:number; // 最大生命
	public mp:number; // 当前法力
	public maxmp:number; //  最大法力
	public attack:number; //   攻击
	public defend:number; // 防御
	public speed:number; // 速度
	public magicattack:number; // 法术攻击
	public magicdef:number; // 法术防御
	public scale:number; // 1,2,3,4分别代表4个size
	public initbfp:game.modules.pet.models.BasicFightPropertiesVo; // 初始的基础战斗属性
	public bfp:game.modules.pet.models.BasicFightPropertiesVo; // 基础战斗属性
	public point:number; // 潜能。未分配点数
	public autoaddcons:number; //  加点方案-升级自动加体质
	public autoaddiq:number; // 加点方案-升级自动加智力
	public autoaddstr:number; // 加点方案-升级自动加力量
	public autoaddendu:number; // 加点方案-升级自动加耐力
	public autoaddagi:number; // 加点方案-升级自动加敏捷
	public pointresetcount:number; //  宠物加点的重置次数
	public exp:number; // 当前经验
	public nexp:number; // 升级需要经验
	public attackapt:number; // 攻击资质
	public defendapt:number; // 防御资质
	public phyforceapt:number; // 体力资质
	public magicapt:number; // 法力资质
	public speedapt:number; // 速度资质
	public dodgeapt:number; // 躲闪资质
	public growrate:number; // 成长率
	public life:number; // 寿命
	public kind:number; // 宠物类型 野生、宝宝
		constructor()
		{

		}
		public fromByteArray(bytes:ByteArray):void 
		{
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
			this.initbfp = new game.modules.pet.models.BasicFightPropertiesVo();
			this.initbfp.fromByteArray(bytes);			
			this.bfp = new game.modules.pet.models.BasicFightPropertiesVo();
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
	
		}
	}
}