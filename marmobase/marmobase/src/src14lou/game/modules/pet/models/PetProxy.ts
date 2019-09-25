
module game.modules.pet.models {
	/**修改名字*/
	export const CHANGEUI_EVENT: string = "changeui_event";
	/**刷新宠物列表*/
	export const REFRESH_EVENT: string = "refresh_event";
	/**刷新宠物状态*/
	export const REFRESHSTATE_EVENT: string = "refreshstate_event";
	/**放生宠物*/
	export const RELEASEPET_EVENT: string = "release_event";
	/**宠物学习技能*/
	export const STUDYPETSELECT_EVENT: string = "studypetselect_event";
	/**刷新选中的宠物信息*/
	export const REFRESHSELECT_EVNT: string = "refreshselect_event";
	/**合宠信息*/
	export const HECHONG_EVENT: string = "hechong_event";
	/**刷新资质界面*/
	export const REFRESHZIZHI_EVENT: string = "refreshzizhi_event";
	/**寿命增加*/
	export const REFRESHSHOUMING_EVENT: string = "refreshshouming_event";
	/**商品价格*/
	export const SHOPPRICE_EVENT: string = "shopprice_event";
	/**人物身上增加宠物*/
	export const ADD_EVENT: string = "add_event";
	/**人物身上删除宠物*/
	export const DEL_PET: string = "del_pet"
	/**获得宠物信息*/
	export const GETPETINFO: string = "getpetinfo"
	/** 获得珍宠找回列表数据 */
	export const GET_PETRECOVERDATA: string = "getPetRecoverData";
	/** 找回珍宠成功 */
	export const RECOVER_PET_SUCCESS: string = "recoverPetSuccess";
	/** 获得所要查看需找回珍宠的信息数据 */
	export const GET_PETRECOVER_INFODATA: string = "getPetRecoverInfoData";
	/**取消*/
	export const CANCEL = "cancel"
	/**确定*/
	export const QUEDING = "queding"
	/** 装备精铸 */
	export const JINZHURESULT = "jingzhuresult"
	/** 请求仓库数据返回 */
	export const GET_PET_DEPOT_DATA = "getPetDepotData";
	/** 宠物相关操作出错 */
	export const GET_PetError = "getPetError";
	/** 宠物仓库增加了宠物 */
	export const DEPOT_ADD_PET = "depotGetPet";
	/** 宠物仓库减少了宠物 */
	export const DEPOT_REMOVE_PET = "depotRemovePet";
	/** 刷新宠物仓库最大容量 */
	export const NewPetDepotMaxNum = "newPetDepotMaxNum";
	/**宠物成功洗练飘窗 */
	export const XILIAN_PET_BAY = "xilianpetbay";
	/** 神兽提升成功 */
	export const SHENSHOU_INC_SUCCESS = "shenShouIncSuccess";

	/** 宠物相关协议 PetProxy */
	export class PetProxy extends hanlder.ProxyBase {
		xiliankey: number = 0;/**洗练完后宠物保存的KEY*/
		constructor() {
			super();
			PetProxy._instance = this;
			this.addNetworkListener();
			Laya.loader.load("common/data/temp/pet.cpetattr.bin", Handler.create(this, this.onloadedPetCPetAttrComplete), null, Loader.BUFFER);//宠物数据表
			Laya.loader.load("common/data/temp/pet.cshenshouinc.bin", Handler.create(this, this.onloadedPetCShenShouIncComplete), null, Loader.BUFFER);//神兽提升表	
			Laya.loader.load("common/data/temp/pet.cpetfeeditemlist.bin", Handler.create(this, this.onloadedPetCPetFeedItemListComplete), null, Loader.BUFFER);//培养道具
			Laya.loader.load("common/data/temp/pet.cpetnextexp.bin", Handler.create(this, this.onloadedPetCPetNextExpComplete), null, Loader.BUFFER);//宠物升级所需经验
			Laya.loader.load("common/data/temp/pet.cpetresetpointconfig.bin", Handler.create(this, this.onloadedPetCPetResetPointConfigComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/pet.cpetdepotprice.bin", Handler.create(this, this.onloadedPetCPetDepotPriceComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/pet.cpetattrmoddata.bin", Handler.create(this, this.onloadedPetCPetDepotPriceComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/item.cpetequipsuitbuff.bin", Handler.create(this, this.onloadedPetEquipSuitBuffComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/item.cpetequiphecheng.bin", Handler.create(this, this.onloadedPetEquipHeChengComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/skill.cpetskillconfig.bin", Handler.create(this, this.onloadedPetSkillConfigComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/skill.cpetskillupgrade.bin", Handler.create(this, this.onloadedPetSkillupgradeComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/pet.cpetfeeditemattr.bin", Handler.create(this, this.onloadedPetCPetFeedItemAttrComplete), null, Loader.BUFFER);//宠物食品
			Laya.loader.load("common/data/temp/shop.cquickbuy.bin", Handler.create(this, this.onloadedCQuickBuyComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/shop.cpetshop.bin", Handler.create(this, this.onloadedCPetShopComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/item.cpetequipsuitbuff.bin", Handler.create(this, this.onloadedCPetEquipSuitBuffComplete), null, Loader.BUFFER);//宠物套装buff配置表
		}
		/** 加载宠物套装buff配置表 */
		private onloadedCPetEquipSuitBuffComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetequipsuitbuff.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petSuitBuffData, game.data.template.PetEquipSuitBuffBaseVo, "id");
		}
		private addNetworkListener() {
			/**合宠	*/
			Network._instance.addHanlder(ProtocolsEnum.SPetSynthesize, this, this.PetSynthesize);
			/**刷新宠物信息*/
			Network._instance.addHanlder(ProtocolsEnum.SRefreshPetInfo, this, this.petinfo);
			/**增加宠物栏*/
			Network._instance.addHanlder(ProtocolsEnum.SAddPetToColumn, this, this.addpetcolumn);
			/**移除宠物*/
			Network._instance.addHanlder(ProtocolsEnum.SRemovePetFromCol, this, this.removepetcol);
			/**刷新宠物经验*/
			Network._instance.addHanlder(ProtocolsEnum.SRefreshPetExp, this, this.currentpetexp);
			/**刷新出战宠物*/
			Network._instance.addHanlder(ProtocolsEnum.SSetFightPet, this, this.currentfightpet);
			/**刷新重置宠物*/
			Network._instance.addHanlder(ProtocolsEnum.SSetFightPetRest, this, this.restpet);
			/**获取仓库宠物信息*/
			Network._instance.addHanlder(ProtocolsEnum.SGetPetcolumnInfo, this, this.getpetcolumninfo);
			/**宠物提示信息*/
			Network._instance.addHanlder(ProtocolsEnum.SPetError, this, this.peterr);
			/**宠物更改名字*/
			Network._instance.addHanlder(ProtocolsEnum.SModPetName, this, this.modpetname);
			/**宠物战斗位置*/
			Network._instance.addHanlder(ProtocolsEnum.SPetGossip, this, this.petGossip);
			/**刷新宠物技能*/
			Network._instance.addHanlder(ProtocolsEnum.SRefreshPetSkill, this, this.RefreshPetSkill);
			/**展示宠物信息	*/
			Network._instance.addHanlder(ProtocolsEnum.SShowPetInfo, this, this.ShowPetInfo);
			/**刷新仓库宠物信息*/
			Network._instance.addHanlder(ProtocolsEnum.SRefreshPetColumnCapacity, this, this.RefreshPetColumnCapacity);
			/**刷新宠物评分*/
			Network._instance.addHanlder(ProtocolsEnum.SRefreshPetScore, this, this.RefreshPetScore);
			/**设置宠物自动加点*/
			Network._instance.addHanlder(ProtocolsEnum.SPetSetAutoAddPoint, this, this.PetSetAutoAddPoint);
			/**洗宠	*/
			Network._instance.addHanlder(ProtocolsEnum.SPetWash, this, this.PetWash);
			/**技能认证*/
			Network._instance.addHanlder(ProtocolsEnum.SPetSkillCertification, this, this.PetSkillCertification);
			/**资质培养*/
			Network._instance.addHanlder(ProtocolsEnum.SPetAptitudeCultivate, this, this.PetAptitudeCultivate);
			/**宠物信息*/
			Network._instance.addHanlder(ProtocolsEnum.SGetPetInfo, this, this.GetPetInfo);
			/**找回宠物列表*/
			Network._instance.addHanlder(ProtocolsEnum.SPetRecoverList, this, this.PetRecoverList);
			/**找回宠物*/
			Network._instance.addHanlder(ProtocolsEnum.SPetRecover, this, this.PetRecover);
			/**找回宠物信息	*/
			Network._instance.addHanlder(ProtocolsEnum.SRecoverPetInfo, this, this.RecoverPetInfo);
			/**刷新宠物数据*/
			Network._instance.addHanlder(ProtocolsEnum.SRefreshPetData, this, this.RefreshPetData);
			/**商店价格*/
			Network._instance.addHanlder(ProtocolsEnum.SResponseShopPrice, this, this.ShopPrice);
			/**宠物装备合成*/
			Network._instance.addHanlder(ProtocolsEnum.SHeChengPetEquip, this, this.jingzhuzhuangbei);
		}
		/**商店价格*/
		public ShopPrice(optcode: number, msg: hanlder.S2C_response_shopprice): void {
			PetModel._instance.shopinfo = msg.goodsList;
			for (var GoodsIndex = 0; GoodsIndex < msg.goodsList.length; GoodsIndex++) {/** 数据存放在model,方便取用 */
				bagModel.getInstance().getGoods.set(msg.goodsList[GoodsIndex].goodsid, msg.goodsList[GoodsIndex]);
			}
			models.PetProxy.getInstance().event(models.SHOPPRICE_EVENT);
		}
		/**移除宠物*/
		public removepetcol(optcode: number, msg: hanlder.S2C_remove_petfromcol): void {
			console.log("删除宠物");
			if (msg.columnid == PetColumnTypes.PET) {
				let bag: Laya.Dictionary = game.modules.bag.models.BagModel.getInstance().bagMap[9]
				let baginfo: game.modules.bag.models.BagVo = bag.get(msg.petkey)
				if (baginfo) {
					bag.remove(msg.petkey)
				}
				PetModel.getInstance().pets.remove(msg.petkey);
				models.PetProxy.getInstance().event(models.DEL_PET);
			}
			else if (msg.columnid == PetColumnTypes.DEPOT) {
				this.event(models.DEPOT_REMOVE_PET, msg.petkey);
			}
		}
		/**增加宠物栏*/
		public addpetcolumn(optcode: number, msg: hanlder.S2C_add_pettocolumn): void {
			//增加宠物
			console.log("增加宠物" + msg);
			if (msg.columnid == PetColumnTypes.PET) {//增加宠物 
				let petinfo: game.modules.pet.models.PetInfoVo = msg.petdata;
				PetModel.getInstance().pets.set(petinfo.key, petinfo);
				models.PetProxy.getInstance().event(models.ADD_EVENT);
				if (petinfo.key == models.PetModel.getInstance().resultkey) {
					models.PetModel.getInstance().resultkey = -1
					models.PetProxy.getInstance().event(models.HECHONG_EVENT, petinfo.key);
				}
			}
			else if (msg.columnid == PetColumnTypes.DEPOT) {
				this.event(models.DEPOT_ADD_PET, msg.petdata);
			}
		}
		public PetSynthesize(optcode: number, msg: hanlder.S2C_pet_synthesize): void {
			console.log("合成宠物");
			let pet: game.modules.pet.models.PetInfoVo = game.modules.pet.models.PetModel.getInstance().pets.get(msg.petkey)
			if (pet) {
				models.PetModel.getInstance().resultkey = -1
				models.PetProxy.getInstance().event(models.HECHONG_EVENT, msg.petkey);
			}
			else {
				models.PetModel.getInstance().resultkey = msg.petkey
			}
		}
		/**刷新宠物信息*/
		public petinfo(optcode: number, msg: hanlder.S2C_refresh_petinfo): void {
			console.log("刷新宠物数据" + this.xiliankey);
			this.xiliankey = msg.petinfo.key;
			let petinfo: game.modules.pet.models.PetInfoVo = msg.petinfo;
			PetModel.getInstance().pets.set(this.xiliankey, msg.petinfo);
			PetModel.getInstance().petbasedata = msg.petinfo;
			PetModel.getInstance().petbasicfight = PetModel.getInstance().petbasedata.bfp;
			console.log(msg.petinfo);
			models.PetProxy.getInstance().event(models.REFRESH_EVENT);
			if (petinfo.shenshouinccount > 0) {
				models.PetProxy.getInstance().event(models.SHENSHOU_INC_SUCCESS);
			}
		}
		/**刷新宠物经验*/
		public currentpetexp(optcode: number, msg: hanlder.S2C_refresh_petexp): void {
			let petinfo: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(msg.petkey);
			petinfo.exp = msg.curexp;
			PetModel.getInstance().pets.set(msg.petkey, petinfo);
		}
		/**刷新出战宠物*/
		public currentfightpet(optcode: number, msg: hanlder.S2C_set_fightpet): void {
			LoginModel.getInstance().roleDetail.petIndex = msg.petkey;
			//检查身上是否持有该要被设为出战的宠物
			this.reCheckIsHavePet(msg.petkey);
		}
		/** 检查玩家身上的宠物栏是否有该要被设为出战的宠物 */
		private reCheckIsHavePet(petKey: number): void {
			let _pets = PetModel.getInstance().pets;
			let _petsKeys = _pets.keys;
			let _isHavePet = false;
			for (let i = 0; i < _petsKeys.length; i++) {
				if (petKey == _petsKeys[i]) {
					this.dispatchSetFightPetMsg();
					_isHavePet = true;
					break;
				}
			}
			if (!_isHavePet) {
				//若没有持有该宠物，等待直到增加了该要被设为出战的宠物
				this.once(models.ADD_EVENT, this, this.reCheckIsHavePet, [petKey]);
			}
		}
		/** 派发设置出战宠物的消息 */
		private dispatchSetFightPetMsg(): void {
			models.PetProxy.getInstance().event(models.REFRESHSTATE_EVENT);
		}
		/**获取仓库宠物信息*/
		public getpetcolumninfo(optcode: number, msg: hanlder.S2C_get_petcolumninfo): void {
			switch (msg.columnid) {
				case PetColumnTypes.DEPOT:
					this.event(models.GET_PET_DEPOT_DATA, [msg.pets, msg.colunmSize]);
					break;
			}
			console.log("刷新宠物数据4");
		}
		/**宠物提示信息*/
		public peterr(optcode: number, msg: hanlder.S2C_pet_error): void {
			this.event(models.GET_PetError, msg.peterror);
			console.log("错误信息：" + msg.peterror);
		}
		/**宠物更改名字*/
		public modpetname(optcode: number, msg: hanlder.S2C_mod_petname): void {
			console.log("修改宠物名字");
			let petinfo: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(msg.petkey);
			petinfo.name = msg.petname;
			PetModel.getInstance().pets.set(msg.petkey, petinfo);
			models.PetProxy.getInstance().event(models.REFRESH_EVENT);
		}
		/**宠物战斗位置*/
		public petGossip(optcode: number, msg: hanlder.S2C_pet_gossip): void {
			console.log("刷新宠物数据5");
		}
		/**刷新宠物技能*/
		public RefreshPetSkill(optcode: number, msg: hanlder.S2C_refresh_petskill): void {
			let petinfo: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(msg.petkey);
			petinfo.skills = msg.skills;
			PetModel.getInstance().petbasedata = petinfo;
			PetModel.getInstance().pets.set(msg.petkey, petinfo);
			PetModel.getInstance().petskill = msg.skills;
			models.PetProxy.getInstance().event(models.REFRESH_EVENT);
		}
		/**展示宠物信息	*/
		public ShowPetInfo(optcode: number, msg: hanlder.S2C_show_petinfo): void {
			console.log("刷新宠物数据7");
			console.log(msg.petdata);
		}
		/**服务器向客户端刷新宠物栏的最大容量 */
		public RefreshPetColumnCapacity(optcode: number, msg: hanlder.S2C_refresh_petcolumncapacity): void {
			switch (msg.columnid) {
				case PetColumnTypes.DEPOT:
					this.event(models.NewPetDepotMaxNum, msg.capacity);
					break;
			}
			console.log("刷新宠物数据8");
		}
		/**刷新宠物评分*/
		public RefreshPetScore(optcode: number, msg: hanlder.S2C_refresh_petscore): void {
			console.log("宠物评分刷新");
			let petinfo: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(msg.petkey);
			if (petinfo != null) {//宠物信息是否为空
				petinfo.petscore = msg.petscore;
				petinfo.petbasescore = msg.petbasescore;
				PetModel.getInstance().petbasedata = petinfo;
				PetModel.getInstance().pets.set(msg.petkey, petinfo);
				models.PetProxy.getInstance().event(models.REFRESH_EVENT);
			}
		}
		/**设置宠物自动加点*/
		public PetSetAutoAddPoint(optcode: number, msg: hanlder.S2C_pet_setautoaddpoint): void {
			console.log("宠物自动加点方案");
			let petinfo: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(msg.petkey);
			petinfo.autoaddcons = msg.cons;
			petinfo.autoaddiq = msg.iq;
			petinfo.autoaddstr = msg.str;
			petinfo.autoaddendu = msg.endu;
			petinfo.autoaddagi = msg.agi;
			PetModel.getInstance().pets.set(msg.petkey, petinfo);
			models.PetProxy.getInstance().event(models.REFRESH_EVENT);//刷新宠物
		}
		/**洗练宠物*/
		public PetWash(optcode: number, msg: hanlder.S2C_pet_wash): void {
			console.log("洗练宠物:" + msg.petkey);
			this.xiliankey = msg.petkey;
			models.PetProxy.getInstance().event(models.XILIAN_PET_BAY);//宠物洗练成功
		}
		/**宠物技能认证*/
		public PetSkillCertification(optcode: number, msg: hanlder.S2C_pet_skillcertification): void {
			console.log("宠物技能认证");
			let petinfo: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(msg.petkey);
			for (let p in PetModel._instance.petskill) {
				if (PetModel._instance.petskill[p].skillId == msg.skillId) {//是否有该技能
					PetModel._instance.petskill[p].certification = msg.isconfirm;
				}
			}
			petinfo.skills = PetModel._instance.petskill;
			PetModel._instance.pets.set(msg.petkey, petinfo);
			models.PetProxy.getInstance().event(models.REFRESH_EVENT);//刷新宠物
		}
		/**刷新资质界面*/
		public PetAptitudeCultivate(optcode: number, msg: hanlder.S2C_pet_aptitudecultivate): void {
			let data: Array<any> = [];
			let zizhiid: Array<number> = [1460, 1480, 1440, 1470, 1450];
			let num: number;
			let petinfo: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(msg.petkey);
			for (var index = 0; index < 5; index++) {
				if (zizhiid[index] == msg.aptid) {//是否有响应的资质
					num = index;
					break;
				}
			}
			switch (num) {//0为体质 1 速度 2攻击 3法术 4防御
				case 0:
					petinfo.phyforceapt = msg.aptvalue;
					break;
				case 1:
					petinfo.speedapt = msg.aptvalue;
					break;
				case 2:
					petinfo.attackapt = msg.aptvalue;
					break;
				case 3:
					petinfo.magicapt = msg.aptvalue;
					break;
				case 4:
					petinfo.defendapt = msg.aptvalue;
					break;
				default:
					break;
			}
			PetModel.getInstance().pets.set(msg.petkey, petinfo);
			models.PetProxy.getInstance().event(models.REFRESHZIZHI_EVENT, [num, msg.aptvalue]);//刷新资质界面
		}
		/**宠物信息*/
		public GetPetInfo(optcode: number, msg: hanlder.S2C_get_petinfo): void {
			models.PetProxy.getInstance().event(models.GETPETINFO, [msg.petinfo])
		}
		/** 获得找回珍宠的列表 */
		public PetRecoverList(optcode: number, msg: hanlder.S2C_pet_recoverlist): void {
			PetModel.getInstance().recoverPets = [];
			PetModel.getInstance().recoverPets = msg.pets;
			this.event(models.GET_PETRECOVERDATA, [msg.pets]);
		}
		/** 找回宠物 */
		public PetRecover(optcode: number, msg: hanlder.S2C_pet_recover): void {
			this.event(models.RECOVER_PET_SUCCESS, [msg.petId, msg.uniqId]);
		}
		/** 查看所要找回宠物的信息	*/
		public RecoverPetInfo(optcode: number, msg: hanlder.S2C_recover_petinfo): void {
			this.event(models.GET_PETRECOVER_INFODATA, [msg.petInfo]);
		}
		/**重置属性*/
		public restpet(optcode: number, msg: hanlder.S2C_set_fightpet): void {
			LoginModel.getInstance().roleDetail.petIndex = -1;
			models.PetProxy.getInstance().event(models.REFRESHSTATE_EVENT);
		}
		/**刷新宠物数据data*/
		public RefreshPetData(optcode: number, msg: hanlder.s2c_SRefreshPetData): void {
			console.log("刷新宠物数据data");
			let petinfo: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(msg.petkey);
			if (msg.datas.get(1360) != null) {//生命数据
				petinfo.life = msg.datas.get(1360);
			}
			else {
				let bft: game.modules.pet.models.BasicFightPropertiesVo = new game.modules.pet.models.BasicFightPropertiesVo();
				let jy: PetCPetNextExpBaseVo = PetModel.getInstance().petCPetNextExpData[msg.datas.get(1230)] as PetCPetNextExpBaseVo;
				for (let p in msg.datas.keys) {
					switch (msg.datas.keys[p]) {
						case 10:
							petinfo.bfp.cons = msg.datas.get(10);//体质
							break;
						case 20:
							petinfo.bfp.iq = msg.datas.get(20);//智力
							break;
						case 30:
							petinfo.bfp.str = msg.datas.get(30);//力量
							break;
						case 40:
							petinfo.bfp.endu = msg.datas.get(40);//耐力
							break;
						case 50:
							petinfo.bfp.agi = msg.datas.get(50);//敏捷
							break;
						case 70:
							petinfo.maxhp = msg.datas.get(70)//最大生命值
							break;
						case 80:
							petinfo.hp = msg.datas.get(80);//当前生命值
							break;
						case 90:
							petinfo.maxmp = msg.datas.get(90);//最大MP
							petinfo.maxmp = parseInt(petinfo.maxmp.toFixed(0));
							break;
						case 100:
							petinfo.mp = msg.datas.get(100);//当前MP
							break;
						case 130:
							petinfo.attack = msg.datas.get(130);//攻击
							break;
						case 140:
							petinfo.defend = msg.datas.get(140);//防御
							break;
						case 150:
							petinfo.magicattack = msg.datas.get(150);//法术攻击
							break;
						case 160:
							petinfo.magicdef = msg.datas.get(160);//法术防御
							break;
						case 200:
							petinfo.speed = msg.datas.get(200);//速度
							break;
						case 1400:
							petinfo.point = msg.datas.get(1400);//剩余潜力点
							break;
						case 1230:
							petinfo.level = msg.datas.get(1230);//等级
							break;
						default:
							break;
					}
				}
				if (jy != null) {//经验是否为空
					petinfo.nexp = jy.exp;
				}
			}
			PetModel.getInstance().pets.set(msg.petkey, petinfo);
			PetModel.getInstance().petbasedata = petinfo;
			PetModel.getInstance().petbasicfight = petinfo.bfp;
			models.PetProxy.getInstance().event(models.REFRESHSHOUMING_EVENT);
		}
		/**精铸结果返回*/
		private jingzhuzhuangbei(optcode: number, msg: hanlder.S2C_SHeChengPet_Equip): void {
			if (msg.getitemid == 0) {//精铸失败
				models.PetProxy.getInstance().event(models.JINZHURESULT, [0]);
			}
			else {
				models.PetProxy.getInstance().event(models.JINZHURESULT, [1]);
			}
		}
		/**宠物商店数据*/
		onloadedCPetShopComplete(): void {
			console.log("CPetShop表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cpetshop.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().cPetShopData, game.data.template.CPetShopBaseVo, "id");
			// console.log("RoleRColorModel.configData:",this.cPetShopData);
		}
		//c宠物物品表
		onloadedPetCPetFeedItemAttrComplete(): void {
			console.log("PetCPetFeedItemAttr表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetfeeditemattr.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petCPetFeedItemAttrData, game.data.template.PetCPetFeedItemAttrBaseVo, "id");
			//	console.log("petCPetFeedItemAttrData:",this.petCPetFeedItemAttrData);
		}
		onloadedPetSkillupgradeComplete(): void {
			console.log("PetSkillupgradeData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpetskillupgrade.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petSkillupgradeData, game.data.template.PetSkillupgradeBaseVo, "id");
			//	console.log("PetSkillupgradeData:", this.petSkillupgradeData);
		}
		onloadedPetSkillConfigComplete(): void {
			console.log("PetSkillConfigData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpetskillconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petSkillConfigData, game.data.template.PetSkillConfigBaseVo, "id");
			//	console.log("PetSkillConfigData:", this.petSkillConfigData);
		}
		onloadedPetEquipHeChengComplete(): void {
			console.log("PetEquipHeChengData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetequiphecheng.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petEquipHeChengData, game.data.template.PetEquipHeChengBaseVo, "id");
			//console.log("PetEquipHeChengData:", this.petEquipHeChengData);
		}
		onloadedPetEquipSuitBuffComplete(): void {
			console.log("PetEquipSuitBuffData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetequipsuitbuff.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petEquipSuitBuffData, game.data.template.PetEquipSuitBuffBaseVo, "id");
			//	console.log("PetEquipSuitBuffData:", this.petEquipSuitBuffData);
		}
		//c宠物一级属性转换表
		onloadedPetCPetAttrModDataComplete(): void {
			console.log("PetCPetAttrModData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetattrmoddata.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petCPetAttrModDataData, game.data.template.PetCPetAttrModDataBaseVo, "id");
			//console.log("petCPetAttrModDataData:",this.petCPetAttrModDataData);
		}
		//c宠物仓库扩充价格
		onloadedPetCPetDepotPriceComplete(): void {
			console.log("PetCPetDepotPrice表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetdepotprice.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petCPetDepotPriceData, game.data.template.PetCPetDepotPriceBaseVo, "id");
			//	console.log("petCPetDepotPriceData:",this.petCPetDepotPriceData);
		}
		//c宠物属性重置消耗
		onloadedPetCPetResetPointConfigComplete(): void {
			console.log("PetCPetResetPointConfig表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetresetpointconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petCPetResetPointConfigData, game.data.template.PetCPetResetPointConfigBaseVo, "id");
		}
		//c宠物基本数据
		onloadedPetCPetAttrComplete(): void {
			console.log("PetCPetAttr表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetattr.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petCPetAttrData, game.data.template.PetCPetAttrBaseVo, "id");
			console.log("petCPetAttrData:", PetModel.getInstance().petCPetAttrData);
		}
		//c宠物灵兽提升
		onloadedPetCShenShouIncComplete(): void {
			console.log("PetCShenShouInc表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cshenshouinc.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petCPetShenShouIncdata, game.data.template.PetCShenShouIncBaseVo, "id");
			console.log("PetCShenShouIncData:", PetModel.getInstance().petCPetShenShouIncdata);
		}
		//c宠物培养显示表
		onloadedPetCPetFeedItemListComplete(): void {
			console.log("PetCPetFeedItemList表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetfeeditemlist.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petCPetFeedItemListData, game.data.template.PetCPetFeedItemListBaseVo, "id");
			console.log("petCPetFeedItemListData:", PetModel.getInstance().petCPetFeedItemListData);
		}
		//c宠物升级经验表
		onloadedPetCPetNextExpComplete(): void {
			console.log("PetCPetNextExp表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetnextexp.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().petCPetNextExpData, game.data.template.PetCPetNextExpBaseVo, "id");
			//console.log("petCPetNextExpData:",this.petCPetNextExpData);
		}
		onloadedCQuickBuyComplete(): void {
			console.log("CQuickBuy表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cquickbuy.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, PetModel.getInstance().cQuickBuyData, game.data.template.CQuickBuyBaseVo, "id");
			// console.log("RoleRColorModel.configData:",this.cQuickBuyData);
		}
		private static _instance: PetProxy;
		public static getInstance(): PetProxy {
			if (!this._instance) {
				this._instance = new PetProxy();
			}
			return this._instance;
		}
	}

}