module battle {
	export type BattleRoleSkill = { id: number, lv: number, round?: number };
	export type BattleRolePassive = { id: number, rate: number };

	export class FightModel {
		/** 模型 */
		fakeUnit: FakeUnit;
		/** 战斗单元类型 */
		fighterType: number;
		/** 战斗单元的标记 人物为人物的roleid 宠物和怪物则为表中的baseID */
		dataID: number;
		/** 战斗单元名称 */
		fighterName: string;
		/** 战斗单元称谓 */
		title: string;
		/** 战斗单元称谓ID */
		titleId: number;
		/** 觉醒状态 00000 5个bit位，从低位到高位分别标识95至99状态，0-未觉醒，1-觉醒（具体值是int数值） */
		awakeState: number;
		/** 战斗单元在战斗中的相对位置, >=31 观战者, 1-14 己方, 15-28 敌方 */
		index: number;
		/** 是否是GM,0:否 1：是 */
		bGM: number;
		/** 最大血量 */
		maxhp: number;
		/** 血量上限 */
		uplimithp: number;
		/** 当前血量 */
		hp: number;
		/** 当前效果点 */
		ep: number;
		/** 去掉 */
		mp: number;
		/** 造型	造型为short值 */
		shape: number;
		/** 原始造型 用于变身后返回造型*/
		baseShape: number;
		/**门派 */
		school: number;
		/** 子类型，宠物为资质，怪物为宝宝野宠等 */
		subtype: number;
		/** 角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装 */
		components: Laya.Dictionary;
		/** 添加的战斗者拥有的在战斗内显示的buff，value为回合数（为0则没有回合限制） */
		buffs: Laya.Dictionary = new Laya.Dictionary;
		/** 足印id */
		footLogoId: number;
		/** 已经出战的宠物 */
		petkeys: number[];

		////////////////////////////
		/** 客户端站位 */
		pos: number;
		level: number = 0;
		is_self_role: boolean;
		/** 是否是宠物 */
		is_pet: boolean;

		constructor(private _app: AppBase, _data: game.scene.models.FighterInfoVo) {
			this.fighterType = _data.fighterType;
			this.dataID = _data.dataID;
			this.fighterName = _data.fighterName;
			this.title = _data.title;
			this.titleId = _data.titleId;
			this.awakeState = _data.awakeState;
			this.index = _data.index;
			this.bGM = _data.bGM;
			this.maxhp = _data.maxhp;
			this.uplimithp = _data.uplimithp;
			this.hp = _data.hp;
			this.ep = _data.ep;
			this.shape = _data.shape;
			this.baseShape = _data.shape;
			this.subtype = _data.subtype;
			this.petkeys = _data.petkeys.slice();
			this.components = _data.components;
			this.is_self_role = this.fighterType === FighterType.FIGHTER_ROLE && game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid === _data.dataID;
			this.is_pet = this.fighterType === FighterType.FIGHTER_PET;
			if( this.is_self_role ) 
			{
				this.mp = HudModel.getInstance().mpNum;
			}else if( this.is_pet )
			{
				let petinfo: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(_LoginModel.getInstance().roleDetail.petIndex);
				if( petinfo ) this.mp = petinfo.mp;
			}
			console.log("战斗单位:", this.index, this.fighterType, this.dataID, this.fighterName, this.petkeys)
			console.log("是否玩家自身角色", this.is_self_role, this.fighterType, game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid, _data.dataID);
			console.log("血量", this.hp, this.maxhp, this.uplimithp);

			if (this.index > BattleConst.MAX_POS) {
				this.pos = this.index - BattleConst.MAX_POS;
			} else {
				this.pos = this.index;
			}
		}

		get isBottom(): boolean {
			return this.index <= BattleConst.MAX_POS;
		}

		/**
		 * 添加buffer
		 * @param buffid buffer id
		 * @param round -1为删除该buff，0为没有回合数的buff，>0为回合数
		 */
		addBuffer(buffid: number, round: number): void {
			// -1代表移除
			if (buffid == -1)
				this.buffs.remove(buffid);
			else
				this.buffs.set(buffid, round);
		}

		// flag对应的飘字颜色
		colorType: any = { 1: "red", 2: "red", 3: "green", 4: "blue", 5: "yellow" };
		/**
		 * 改变血量，飘伤害
		 * @param num 
		 */
		changeHp(num: number, color: number = 1): boolean {
			console.log("-----------changeHp ", num, this.fakeUnit.name, this.hp, "站位:",this.index);
			if (num == 0) {
				return;
			}
			var data: any = [];
			data.color = this.colorType[color];
			data.num = num;
			this._app.sceneRoot.createdFightxt(this.fakeUnit, FlyTextType.NUM_TAB, data, false, this.index);
			this.hp += num;
			//如果大于上限 则为上限
			// if (this.hp > this.uplimithp)
			// 	this.hp = this.uplimithp
			this.fakeUnit.hp = this.hp;
			this.fakeUnit.setLiveFlag(this.hp <= 0);
			console.log("-----------changeHp end ", num, this.fakeUnit.name, this.hp, "站位:",this.index);
			return this.hp <= 0;
		}

		/**改变魔法 */
		changeMp(num: number): void {
			if (num == 0) {
				return;
			}
			this.mp += num;
		}

		/** 效果点变化 */
		changEp(num: number): void {
			if (num == 0) return;
			this.ep += num;
		}

		/** 受击者怒气变化，为正是加怒气，为负是扣怒气 */
		changeSp(num: number): void {
			if (num === 0) {
				return;
			}
			// this.pos += num;
		}
		/** 受击者当前血上限变化，为正是加，为负是减 */
		changeUpLimitHp(num: number): void {
			if (num === 0) {
				return;
			}
			this.uplimithp += num;
		}
	}
}