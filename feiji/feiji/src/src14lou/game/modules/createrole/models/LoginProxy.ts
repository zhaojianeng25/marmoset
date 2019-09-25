
module game.modules.createrole.models {
	/**  */
	export const LOGIN_EVENT2: string = "loginEvent2";
	/** 进入创建角色事件 */
	export const LOGIN_EVENT: string = "loginEvent";
	/** 显示主界面后-活动推送弹窗 */
	export const SHOW_MAIN: string = "showMain";
	/** 刷新人物个人信息事件 */
	export const SRefreshRoleCurrency_EVENT: string = "SRefreshRoleCurrency";
	/** 刷新人物货币事件 */
	export const SRefreshCurrency_EVENT: string = "SRefreshCurrency";
	/** 服务器：刷新所有等级事件 */
	export const SSendInborns_EVENT: string = "SSendInborns";
	/** 刷新GetItemTips事件 */
	export const GetItemTips_EVENT: string = "GetItemTips";
	/** 进入场景返回事件 */
	export const ENTER_SCENE_EVENT: string = "enterScene";
	/** 得到角色随机的名字 */
	export const GET_RANDOM_NAME: string = "getRandomName";
	/** 创建角色有错误 */
	export const CREATE_ROLE_ERROE: string = "createRoleError";
	/** 登陆错误信息返回 */
	export const ERROR_INFO: string = "errorInfo";
	/** 预加载数据处理完毕 */
	export const PRELOAD_END: string = "preLoadEnd";
	// /** 玩家主动请求返回到登陆界面,界面加载完毕 */
	// export const RETURN_LOGIN_VIEW:string = "returnLoginView";
	// /** 进入游戏场景成功 */
	// export const ENTER_WORLD_SUCCESS:string = "enterWorldSuccess";
	/** 处于连接上服务器的状态 */
	export const BE_IN_CONNECTION_STATE: string = "beInConnectionState";
	/** 处于没连接上服务器状态 */
	export const BE_IN_NOT_CONNECTION_STATE: string = "beInNotConnectionState";

	export class LoginProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			LoginProxy._instance = this;
			this.init();
		}
		private static _instance: LoginProxy;
		public static getInstance(): LoginProxy {
			if (!this._instance) {
				this._instance = new LoginProxy();
			}
			return this._instance;
		}

		public init(): void {
			LoginModel.getInstance();
			this.addNetworkListener();

			//加载角色创建配置表
			Laya.loader.load("common/data/temp/role.createroleconfig.bin", Handler.create(this, this.onloadedCreateRoleConfigComplete), null, Loader.BUFFER);
			//职业配置表
			Laya.loader.load("common/data/temp/role.schoolinfo.bin", Handler.create(this, this.onloadedSchoolInfoComplete), null, Loader.BUFFER);
			//加载NPC配置表
			Laya.loader.load("common/data/temp/npc.cnpcshape.bin", Handler.create(this, this.onloadedNpcShapeComplete), null, Loader.BUFFER);
			//加载Json文件
			Laya.loader.load("common/data/serverconfig.json", Laya.Handler.create(this, this.onJsonLoaded), null, Laya.Loader.JSON);
		}
		/**
		 * Json文件加载
		 */
		private onJsonLoaded(): void {
			console.log("服务器Json加载完毕------ completed");
			var _json: JSON = Laya.loader.getRes("common/data/serverconfig.json");
			models.LoginModel.getInstance().ServerConfig = _json;
		}
		/** 
		 * 角色创建配置表加载
		 */
		private onloadedCreateRoleConfigComplete(): void {
			console.log("CreateRoleConfig表格加载完毕------ completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/role.createroleconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, LoginModel.getInstance().createRoleConfigBinDic, game.data.template.CreateRoleConfigBaseVo, "id");
			console.log("onloadedCreateRoleConfigComplete:", LoginModel.getInstance().createRoleConfigBinDic);
		}
		private onloadedSchoolInfoComplete(): void {
			//console.log("schoolinfo表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/role.schoolinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, LoginModel.getInstance().schoolInfo, game.data.template.SchoolInfoBaseVo, "id");
			console.log("onloadedSchoolInfoComplete:", LoginModel.getInstance().schoolInfo);
		}
		private onloadedNpcShapeComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcshape.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, LoginModel.getInstance().cnpcShapeInfo, game.data.template.CNpcShapeBaseVo, "id");
			console.log("onloadedNpcShapeComplete:", LoginModel.getInstance().cnpcShapeInfo);
		}

		// 添加监听
		private addNetworkListener(): void {
			Network._instance.addHanlder(ProtocolsEnum.SOnlineAnnounce, this, this.onlineAnnounce);
			Network._instance.addHanlder(ProtocolsEnum.SCreateRole, this, this.onCreateRole);
			Network._instance.addHanlder(ProtocolsEnum.SEnterWorld, this, this.onEnterWorld);
			Network._instance.addHanlder(ProtocolsEnum.SRoleList, this, this.onRoleList);
			Network._instance.addHanlder(ProtocolsEnum.SGetItemTips, this, this.onLoginGetItemTips);
			Network._instance.addHanlder(ProtocolsEnum.SSendInborns, this, this.onSendInborns);
			Network._instance.addHanlder(ProtocolsEnum.SGiveName, this, this.onSGiveName);
			//Network._instance.addHanlder(ProtocolsEnum.SRecommendsNames, this, this.onSRecommendsNames);
			Network._instance.addHanlder(ProtocolsEnum.SCreateRoleError, this, this.onSCreateRoleError);
			Network._instance.addHanlder(ProtocolsEnum.ErrorInfo, this, this.onErrorInfo);
			Network._instance.on(LEvent.OPEN,this,this.linkOpen);			
			Network._instance.on(LEvent.CLOSE,this,this.linkClose);
			Network._instance.on(LEvent.ERROR,this,this.linkError);
		}
		/** 连接服务端正常 */
		private linkOpen():void{
			LoginModel.getInstance().linkServerState = LinkState.OPEN;
			this.event(models.BE_IN_CONNECTION_STATE);
		}
		/** 连接服务端关闭 */
		private linkClose():void{
			LoginModel.getInstance().linkServerState = LinkState.CLOSE;			
			this.event(models.BE_IN_NOT_CONNECTION_STATE);
		}
		/** 连接服务端错误 */
		private linkError():void{
			LoginModel.getInstance().linkServerState = LinkState.ERROR;
			this.event(models.BE_IN_NOT_CONNECTION_STATE);
		}
		/**
		 * 返回登陆失败的信息
		 */
		private onErrorInfo(optcode: number, msg: hanlder.S2C_error_info): void {
			LoginProxy.getInstance().event(models.ERROR_INFO, msg.errorCode);
			if (this.linkState == 1) {
				Network._instance.event(game.modules.setBasics.models.TYPE_LINK_BROKEN_EVENT);
			}
		}
		/**
		 * 返回服务器对应创建角色时是否符合规定的判断
		 */
		private onSCreateRoleError(optcode: number, msg: hanlder.S2C_SCreateRoleError): void {
			LoginProxy.getInstance().event(models.CREATE_ROLE_ERROE, msg.errCode);
		}
		// /**
		//  * 重名时，返回服务器下发的推荐角色名字
		//  */
		// private onSRecommendsNames(optcode: number, msg: hanlder.S2C_SRecommendsNames):void{
		// 	console.log("-----------------------------------------------------msg.recommendNames的内容为：",msg.recommendNames);
		// }
		/**
		 * 返回服务器新下发的随机角色名字
		 */
		private onSGiveName(optcode: number, msg: hanlder.S2C_SGiveName): void {
			LoginModel.getInstance().sGiveName = msg.rolename;
			LoginProxy.getInstance().event(models.GET_RANDOM_NAME, msg.rolename);
		}

		// 移除监听
		private removeNetworkListener(): void {
			//Network._instance.removeHanlder(ProtocolsEnum.SCreateRole, this, this.onCreateRole);
			//Network._instance.removeHanlder(ProtocolsEnum.SEnterWorld, this, this.onEnterWorld);
			Network._instance.removeHanlder(ProtocolsEnum.SRoleList, this, this.onRoleList);
		}
		/** 判断是否是登陆后断线重连的状态 1-是，0-否 */
		public linkState: number;
		private onlineAnnounce(optcode: number, msg: hanlder.S2C_Online_Announce): void {
			if (this.linkState == 1) {
				RequesterProtocols._instance.c2s_CEnterWorld(models.LoginModel.getInstance().roleInfo.roleId, 2);
			} else {
				RequesterProtocols._instance.c2s_CRoleList();
				this.linkState = 1;
			}
			// RequesterProtocols._instance.c2s_CReturnRoleList();
		}
		/**获取拍卖行过期毫秒  */
		private getisAuctionTime() {
			let currRoleId: number = LoginModel.getInstance().roleDetail.roleid;            //角色id
			let currAccount: string = LoginModel.getInstance().userLoginAccount;            //账号
			let timestring = LocalStorage.getItem(currAccount + currRoleId.toString() + "timeStr");
			if (timestring) { LoginModel.getInstance().isAuctionTime = timestring; }
		}
		// 角色列表返回
		private onRoleList(optcode: number, msg: hanlder.S2C_SRoleList): void {
			this.linkState = 1;
			if (msg.roles.length > 0) {
				var roleInfo = msg.roles[0];
				let rolesNum: number = 2;
				models.LoginModel.getInstance().roleInfo = msg.roles[0];
				RequesterProtocols._instance.c2s_CEnterWorld(roleInfo.roleId, rolesNum);
			} else {
				models.LoginProxy.getInstance().event(models.LOGIN_EVENT);
			}

			console.log("onRoleList", optcode, msg);
			//console.log("onRoleList", msg.prevLoginRoleid);
			//console.log("onRoleList", msg.prevRoleInBattle);
			//console.log("onRoleList", msg.roles);
			//console.log("onRoleList", msg.gacdon);
		}

		// 创角返回
		private onCreateRole(optcode: number, msg: hanlder.S2C_create_role): void {
			//logl("onCreateRole", msg.newRoleInfo);
			console.log("onCreateRole", msg.newRoleInfo);
			let rolesNum: number = 2;//msg.newRoleInfo.length;
			//发送进入游戏请求
			models.LoginModel.getInstance().roleInfo = msg.newRoleInfo;
			RequesterProtocols._instance.c2s_CEnterWorld(msg.newRoleInfo.roleId, rolesNum);
			LocalStorage.setItem("daowang_userRoleId" + LoginModel.getInstance().userLoginAccount, msg.newRoleInfo.roleId + "");
		}
		// 进入场景返回
		private onEnterWorld(optcode: number, msg: hanlder.S2C_SEnterWorld): void {
			//console.log("onEnterWorld", msg.mydata);
			//let roleDetail:RoleDetailVo = new RoleDetailVo();
			//roleDetail.roleid = msg.mydata.roleid;
			//roleDetail.pets = msg.mydata.pets;
			LoginModel.getInstance().roleDetail = msg.roleDetail;
			var _roleDetail: any;
			_roleDetail = LoginModel.getInstance().roleDetail;
			/** 仓库名称统一管理 */
			let _depotName = msg.roleDetail.depotNameInfo;
			for (var _index in _depotName) {
				BagModel.getInstance().depotName.set( Number(_index)-1 , _depotName[_index]);
			}
			console.log("---------baginfo:", msg.roleDetail.bagInfo)
			//初始化金币和银币
			bag.models.BagModel.getInstance().bagMap = msg.roleDetail.bagInfo;
			let bags = msg.roleDetail.bagInfo[BagTypes.BAG];
			/** 实例化背包的实际格子 */
			bagModel.getInstance().actBagNum = bags.capacity;
			if (bags.currency[MoneyTypes.MoneyType_GoldCoin]) {
				bag.models.BagModel.getInstance().globalIcon = bags.currency[MoneyTypes.MoneyType_GoldCoin];
				HudModel.getInstance().goldNum = bags.currency[MoneyTypes.MoneyType_GoldCoin];
			}
			if (bags.currency[MoneyTypes.MoneyType_SilverCoin]) {
				bag.models.BagModel.getInstance().sliverIcon = bags.currency[MoneyTypes.MoneyType_SilverCoin];
				HudModel.getInstance().sliverNum = bags.currency[MoneyTypes.MoneyType_SilverCoin];
			}
			if (bags.currency[MoneyTypes.MoneyType_RongYu])
				bag.models.BagModel.getInstance().honnorIcon = bags.currency[MoneyTypes.MoneyType_RongYu];
			if (bags.currency[MoneyTypes.MoneyType_HearthStone])
				bag.models.BagModel.getInstance().yuanbaoIcon = bags.currency[MoneyTypes.MoneyType_HearthStone];

			for (let p in msg.roleDetail.pets) {
				console.log("宠物数据");

				console.log(msg.roleDetail.pets[p])
				game.modules.pet.models.PetModel.getInstance().pets.set(msg.roleDetail.pets[p].key, msg.roleDetail.pets[p]);

				console.log(p);

			}
			this.initSkillArr();
			this.initShuxing();
			this.getisAuctionTime();
		}
		/**初始化一些公用属性 */
		private initShuxing(): void {
			HudModel.getInstance().levelNum = LoginModel.getInstance().roleDetail.level;//等级
			HudModel.getInstance().expNum = LoginModel.getInstance().roleDetail.exp;//经验
			HudModel.getInstance().hpNum = LoginModel.getInstance().roleDetail.hp;//当前生命值
			HudModel.getInstance().maxHpNum = LoginModel.getInstance().roleDetail.maxhp;//生命值
			HudModel.getInstance().mpNum = LoginModel.getInstance().roleDetail.mp;//当前法力值
			HudModel.getInstance().maxMpNum = LoginModel.getInstance().roleDetail.maxmp;//最大法力值
			HudModel.getInstance().spNum = LoginModel.getInstance().roleDetail.sp;//当前愤怒值//
			HudModel.getInstance().maxSpNum = LoginModel.getInstance().roleDetail.maxsp;//最大愤怒值
			HudModel.getInstance().energyNum = LoginModel.getInstance().roleDetail.energy;//活力
			HudModel.getInstance().enlimitNum = LoginModel.getInstance().roleDetail.enlimit//活力上限
			HudModel.getInstance().attackNum = LoginModel.getInstance().roleDetail.damage;//物理攻击
			HudModel.getInstance().magicAttackNum = LoginModel.getInstance().roleDetail.magicattack;//法术攻击
			HudModel.getInstance().speedNum = LoginModel.getInstance().roleDetail.speed;//速度
			HudModel.getInstance().defendNum = LoginModel.getInstance().roleDetail.defend;//物理防御
			HudModel.getInstance().magicDefNum = LoginModel.getInstance().roleDetail.magicdef;//法术防御
			HudModel.getInstance().medicalNum = LoginModel.getInstance().roleDetail.medical;//治疗强度
			HudModel.getInstance().phyCritcLevelNum = LoginModel.getInstance().roleDetail.phy_critc_level;//物理暴击
			HudModel.getInstance().antiPhyCritcLevelNum = LoginModel.getInstance().roleDetail.anti_phy_critc_level;//物理抗暴
			HudModel.getInstance().magicCritcLevelNum = LoginModel.getInstance().roleDetail.magic_critc_level;//法术暴击
			HudModel.getInstance().antiMagicCritcLevelNum = LoginModel.getInstance().roleDetail.anti_magic_critc_level;//法术抗暴
			HudModel.getInstance().healCritLevelNum = LoginModel.getInstance().roleDetail.heal_critc_level;//治疗暴击
			HudModel.getInstance().zhiliaojiashenNum = LoginModel.getInstance().roleDetail.zhiliaojiashen;//治疗加深
			HudModel.getInstance().wulichuantouNum = LoginModel.getInstance().roleDetail.wulichuantou;//物理穿透
			HudModel.getInstance().wulidikangNum = LoginModel.getInstance().roleDetail.wulidikang;//物理抵抗
			HudModel.getInstance().fashuchuantouNum = LoginModel.getInstance().roleDetail.fashuchuantou;//法术穿透
			HudModel.getInstance().fashudikangNum = LoginModel.getInstance().roleDetail.fashudikang;//法术抵抗
			HudModel.getInstance().kongzhiJiachengNum = LoginModel.getInstance().roleDetail.kongzhijiacheng;//控制加成
			HudModel.getInstance().kongzhiMianyiNum = LoginModel.getInstance().roleDetail.kongzhimianyi;//控制免疫
			HudModel.getInstance().sealNum = LoginModel.getInstance().roleDetail.seal;//控制命中
			HudModel.getInstance().unSealNum = LoginModel.getInstance().roleDetail.unseal;//控制抗性
			HudModel.getInstance().gonghuiNum = LoginModel.getInstance().roleDetail.factionvalue;//公会贡献度
		}
		private onLoginGetItemTips(optcode: number, msg: hanlder.S2C_SGetItem_Tips): void {
			var equipTips = StrengTheningModel.getInstance().equipTips;
			if (equipTips.length > 0) {
				var packId = -1;
				var key = -1;
				var m_i = -1;
				for (var i = 0; i < equipTips.length; i++) {
					var packid = equipTips[i].packid;   //背包id
					var keyinpack = equipTips[i].keyinpack; //key
					if (packid == msg.packid && keyinpack == msg.keyinpack) {
						packId = packid;
						key = keyinpack;
						m_i = i;
					}
				}
				if (packId != -1 && key != -1 && m_i != -1) {
					if (packId == msg.packid && key == msg.keyinpack) {
						StrengTheningModel.getInstance().equipTips[m_i].tips.baseAttr = msg.tips.baseAttr;
						StrengTheningModel.getInstance().equipTips[m_i].tips.addAttr = msg.tips.addAttr;
						StrengTheningModel.getInstance().equipTips[m_i].tips.skill = msg.tips.skill;
						StrengTheningModel.getInstance().equipTips[m_i].tips.effect = msg.tips.effect;
						StrengTheningModel.getInstance().equipTips[m_i].tips.diamondID = msg.tips.diamondID;
						StrengTheningModel.getInstance().equipTips[m_i].tips.enhancement = msg.tips.enhancement;
						StrengTheningModel.getInstance().equipTips[m_i].tips.endure = msg.tips.endure;
						StrengTheningModel.getInstance().equipTips[m_i].tips.equipscore = msg.tips.equipscore;
						StrengTheningModel.getInstance().equipTips[m_i].tips.isRecover = msg.tips.isRecover;
						StrengTheningModel.getInstance().equipTips[m_i].tips.maxendure = msg.tips.maxendure;
						StrengTheningModel.getInstance().equipTips[m_i].tips.repairtimes = msg.tips.repairtimes;
					}
				} else {
					StrengTheningModel.getInstance().equipTips.push({ packid: msg.packid, keyinpack: msg.keyinpack, tips: msg.tips });
				}
			} else {
				StrengTheningModel.getInstance().equipTips.push({ packid: msg.packid, keyinpack: msg.keyinpack, tips: msg.tips });
			}
			LoginProxy.getInstance().event(models.GetItemTips_EVENT);
		}

		//服务器：刷新所有等级
		public onSendInborns(optcode: number, msg: hanlder.S2C_send_inborns): void {
			models.LoginModel.getInstance().SSendInbornsData.set("data", msg);
			//初始化附魔技能的等级
			var fumo = [FUMO.YUNXIAO_SKILLID, FUMO.DAHUANG_SKILLID, FUMO.CANGYU_SKILLID, FUMO.FEIXUE_SKILLID, FUMO.TIANLEI_SKILLID, FUMO.WULIANG_SKILLID, FUMO.XUANMING_SKILLID, FUMO.QIXING_SKILLID, FUMO.DANYANG_SKILLID];
			for (var i: number = 0; i < 9; i++) {
				if (msg.inborns.get(fumo[i]) != undefined) {
					game.modules.skill.models.SkillModel.getInstance().makeEnhancementLevel = msg.inborns.get(fumo[i]);
					game.modules.skill.models.SkillModel.getInstance().EnhancementSkillId = fumo[i];
				}
			}
			this.initLevel();
			models.LoginProxy.getInstance().event(models.SSendInborns_EVENT);
		}
		/**初始化战斗技能相关数组 */
		public initSkillArr(): void {
			var myData = createrole.models.LoginModel.getInstance().roleDetail;
			var skillObj = skill.models.SkillModel.getInstance().CSchoolSkillitemBinDic;
			var costObj = skill.models.SkillModel.getInstance().AcupointLevelUpBinDic;
			var skillGridObj = skill.models.SkillModel.getInstance().AcupointInfoBinDic;
			skill.models.SkillModel.getInstance().skillArr.length = 0;
			skill.models.SkillModel.getInstance().skillGridArr.length = 0;
			skill.models.SkillModel.getInstance().skillImgArr.length = 0;
			switch (myData["school"]) {
				case zhiye.yunxiao:
					for (var i: number = 110000; i < 110008; i++) {
						skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
						skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = 1111; i < 1119; i++) {
						skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
					}
					break;
				case zhiye.dahuang:
					for (var i: number = 120000; i < 120008; i++) {
						skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
						skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = 1211; i < 1219; i++) {
						skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
					}
					break;
				case zhiye.cangyu:
					for (var i: number = 130000; i < 130008; i++) {
						skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
						skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = 1311; i < 1319; i++) {
						skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
					}
					break;
				case zhiye.feixue:
					for (var i: number = 140000; i < 140008; i++) {
						skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
						skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = 1411; i < 1419; i++) {
						skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
					}
					break;
				case zhiye.tianlei:
					for (var i: number = 150000; i < 150008; i++) {
						skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
						skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = 1511; i < 1519; i++) {
						skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
					}
					break;
				case zhiye.wuliang:
					for (var i: number = 160000; i < 160008; i++) {
						skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
						skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = 1611; i < 1619; i++) {
						skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
					}
					break;
				case zhiye.xuanming:
					for (var i: number = 161000; i < 161008; i++) {
						skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
						skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = 1711; i < 1719; i++) {
						skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
					}
					break;
				case zhiye.qixing:
					for (var i: number = 162000; i < 162008; i++) {
						skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
						skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = 1811; i < 1819; i++) {
						skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
					}
					break;
				case zhiye.danyang:
					for (var i: number = 163000; i < 163008; i++) {
						skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
						skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
					}
					for (var i: number = 1911; i < 1919; i++) {
						skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
					}
					break;
			}
		}

		/**初始化战斗技能等级 */
		public initLevel(): void {
			var data: hanlder.S2C_send_inborns = createrole.models.LoginModel.getInstance().SSendInbornsData.get("data");//接受技能等级信息
			for (var j: number = 0; j < skill.models.SkillModel.getInstance().skillArr.length; j++) {
				for (var i: number = 0; i < data.inborns.keys.length; i++) {
					if (skill.models.SkillModel.getInstance().skillGridArr[j]["id"] == data.inborns.keys[i]) {
						skill.models.SkillModel.getInstance().skillLevelDic.set(skill.models.SkillModel.getInstance().skillArr[j]["id"], data.inborns.values[i]);
					}
				}
			}
		}
	}
}