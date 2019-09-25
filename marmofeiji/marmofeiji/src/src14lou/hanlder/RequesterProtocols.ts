/**
* name 
*/
module hanlder {
	export class RequesterProtocols {
		constructor() {
			//super();
			RequesterProtocols._instance = this;
		}

		public static _instance: RequesterProtocols;
		protected sendMsg(optcode: number, msg: any): void {
			//throw Error("send msg not implementation.");
			Network._instance.sendMsg(optcode, msg);
		}

		public c2s_login(username: string, password: string,logintype:number = 1,gameid:number = 115,gamekey:string = "",serverid:string = "",selfchannel:string ="",childchannel:string = "",deviceid:string = "",mid:string = "**",reserved1:number = 116,reserved2:string = ""): void {
			let byteArray: ByteArray = new ByteArray();
			ByteArrayUtils.writeUtf16String(username, byteArray);
			ByteArrayUtils.writeUtf16String(password, byteArray);
			byteArray.writeUint32(logintype); //登录类型(sdk类型) 1:locojoy platform sdk
			byteArray.writeUint32(gameid);// 
			ByteArrayUtils.writeUtf16String(gamekey, byteArray); //appsecrert
			ByteArrayUtils.writeUtf16String(serverid, byteArray);
			ByteArrayUtils.writeUtf16String(selfchannel, byteArray); //渠道号 //appid
			ByteArrayUtils.writeUtf16String(childchannel, byteArray); //子渠道号 code
			ByteArrayUtils.writeUtf16String(deviceid, byteArray); //设备唯一标识
			ByteArrayUtils.writeUtf16String(mid, byteArray);
			byteArray.writeUint32(reserved1);
			ByteArrayUtils.writeUtf16String(reserved2, byteArray);
			this.sendMsg(ProtocolsEnum.CLogin, byteArray);
		}
		//txx
		//获取角色列表
		public c2s_CRoleList(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CRoleList, byteArray);
		}

		//客户端请求返回角色选择界面
		public c2s_CReturnRoleList(): void {
			/*let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CReturnRoleList.fromObject(messageObj);
			console.log("CReturnRoleList proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReturnRoleList.encode(proto).finish();*/
			//this.sendMsg(ProtocolsEnum.CReturnRoleList, buffer);

			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CReturnRoleList, byteArray);
		}

		public c2s_create_role(nickname: string, school: number, shape: number): void {
			//////////////////////////////////////////////
			/*let messageObj: any = {};
			messageObj.name = nickname;
			messageObj.school = school;
			messageObj.shape = shape;
			messageObj.code = "0";
			var proto = Network._instance.protoTypePool.CCreateRole.fromObject(messageObj);			
			console.log("CCreateRole proto", proto);
			var buffer: any = Network._instance.protoTypePool.CCreateRole.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CCreateRole, buffer);*/

			//let byteArray:Laya.Byte = new Laya.Byte();	
			let byteArray: ByteArray = new ByteArray();
			//byteArray.endian = Endian.BIG_ENDIAN;
			ByteArrayUtils.writeUtf16String(nickname, byteArray);
			byteArray.writeUint32(school);
			byteArray.writeUint32(shape);

	        /*var valueUint8Array:Uint8Array = ByteArrayUtils.compact_uint32(school); 
			byteArray._writeUint8Array(valueUint8Array);
			valueUint8Array = ByteArrayUtils.compact_uint32(shape); 
			byteArray._writeUint8Array(valueUint8Array);*/

			ByteArrayUtils.writeUtf16String("x0y", byteArray);
			this.sendMsg(ProtocolsEnum.CCreateRole, byteArray);
		}
		//进入游戏
		public c2s_CEnterWorld(roleid: number, rolesnum: number): void {
			/*let messageObj: any = {};
			messageObj.roleid = roleid;//角色ID
			messageObj.rolesnum = rolesnum;//同屏数量
			var proto = Network._instance.protoTypePool.CEnterWorld.fromObject(messageObj);
			console.log("c2s_CEnterWorld CEnterWorld proto", proto);
			var buffer: any = Network._instance.protoTypePool.CEnterWorld.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CEnterWorld, buffer);*/

			let byteArray: ByteArray = new ByteArray();
			console.log("c2s_CEnterWorld roleId:", roleid);
			//byteArray.writeLong(roleid);
			ByteArrayUtils.writeLong(roleid, byteArray);
			byteArray.writeInt32(rolesnum);
			//byteArray.writeInt32(888);
			this.sendMsg(ProtocolsEnum.CEnterWorld, byteArray);
		}
		// 客户端向服务器发送 剧本播放结束消息
		public c2s_CSendRoundPlayEnd(actionTimes: Array<number>): void {
			/*let messageObj: any = {};
			messageObj.action = action;
			var proto = Network._instance.protoTypePool.CSendRoundPlayEnd.fromObject(messageObj);
			console.log("CSendRoundPlayEnd proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSendRoundPlayEnd.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSendRoundPlayEnd, buffer);*/

			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeByte(actionTimes.length);
			var index: number;
			for (index = 0; index < actionTimes.length; index++) {
				byteArray.writeInt32(actionTimes[index]);
			}
			this.sendMsg(ProtocolsEnum.CSendRoundPlayEnd, byteArray);

		}
		//客户端向服务器发送操作选择消息
		public c2s_CSendAction(action: { operationType: number, aim: number, operationID: number }, isrole: number, autooperate: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(action.operationType);
			byteArray.writeInt32(action.aim);
			byteArray.writeInt32(action.operationID);
			byteArray.writeByte(isrole);
			byteArray.writeByte(autooperate);
			this.sendMsg(ProtocolsEnum.CSendAction, byteArray);

			/*let messageObj: any = {};
			messageObj.action = action;
			messageObj.isrole = isrole;
			messageObj.autooperate = autooperate;
			var proto = Network._instance.protoTypePool.CSendAction.fromObject(messageObj);
			console.log("CSendAction proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSendAction.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSendAction, buffer);*/
		}
		public c2s_attention_goods(attentype: number, id: number, attentiontype: number, itemtype: number): void {
			// let messageObj: any = {};
			// messageObj.attentype = attentype;
			// messageObj.id = id;
			// messageObj.attentiontype = attentiontype;
			// messageObj.itemtype = itemtype;
			// var proto = Network._instance.protoTypePool.CAttentionGoods.fromObject(messageObj);

			// console.log("CAttentionGoods proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CAttentionGoods.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CAttentionGoods, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(attentype);
			ByteArrayUtils.writeLong(id, byteArray);
			byteArray.writeInt32(attentiontype);
			byteArray.writeInt32(itemtype);
			this.sendMsg(ProtocolsEnum.CAttentionGoods, byteArray);
		}
		public c2s_re_marketup(itemtype: number, id: number, money: number): void {
			// let messageObj: any = {};
			// messageObj.itemtype = itemtype;
			// messageObj.id = id;
			// messageObj.money = money;
			// var proto = Network._instance.protoTypePool.CReMarketUp.fromObject(messageObj);

			// console.log("CReMarketUp proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CReMarketUp.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CReMarketUp, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(itemtype);
			ByteArrayUtils.writeLong(id, byteArray);
			byteArray.writeInt32(money);
			this.sendMsg(ProtocolsEnum.CReMarketUp, byteArray);
		}
		public c2s_exchange_shop(shopid: number, goodsid: number, num: number, buytype: number): void {
			// let messageObj: any = {};
			// messageObj.shopid = shopid;
			// messageObj.goodsid = goodsid;
			// messageObj.num = num;
			// messageObj.buytype = buytype;
			// var proto = Network._instance.protoTypePool.CExchangeShop.fromObject(messageObj);

			// console.log("CExchangeShop proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CExchangeShop.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CExchangeShop, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(shopid);
			byteArray.writeInt32(goodsid);
			byteArray.writeInt32(num);
			byteArray.writeInt32(buytype);
			this.sendMsg(ProtocolsEnum.CExchangeShop, byteArray);

		}
		public c2s_exchange_currency(srcmoneytype: number, dstmoneytype: number, money: number): void {
			let bytearray = new ByteArray();
			bytearray.endian = Laya.Byte.BIG_ENDIAN;
			bytearray.writeUint32(srcmoneytype);
			bytearray.writeUint32(dstmoneytype);
			bytearray.writeUint32(money);
			this.sendMsg(ProtocolsEnum.CExchangeCurrency, bytearray);
		}
		public c2s_get_marketupprice(containertype: number, key: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(containertype);
			byteArray.writeInt32(key);
			this.sendMsg(ProtocolsEnum.CGetMarketUpPrice, byteArray);
		}
		public c2s_market_pettips(roleid: number, key: number, tipstype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleid, byteArray);
			byteArray.writeInt32(key);
			byteArray.writeInt32(tipstype);
			this.sendMsg(ProtocolsEnum.CMarketPetTips, byteArray);
		}
		public c2s_market_containerbrowse(): void {		//此客户端消息属性为空
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CMarketContainerBrowse, byteArray);
		}
		public c2s_market_tradelog(): void {
			// let messageObj: any = {};
			// var proto = Network._instance.protoTypePool.CMarketTradeLog.fromObject(messageObj);

			// console.log("CMarketTradeLog proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CMarketTradeLog.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CMarketTradeLog, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CMarketTradeLog, byteArray);

		}
		public c2s_market_down(downtype: number, key: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(downtype);
			byteArray.writeInt32(key);
			this.sendMsg(ProtocolsEnum.CMarketDown, byteArray);
		}
		public c2s_market_up(containertype: number, key: number, num: number, price: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(containertype);
			byteArray.writeInt32(key);
			byteArray.writeInt32(num);
			byteArray.writeInt32(price);
			this.sendMsg(ProtocolsEnum.CMarketUp, byteArray);
		}
		public c2s_market_buy(id: number, saleRoleid: number, itemid: number, num: number): void {
			// let messageObj: any = {};
			// messageObj.id = id;
			// messageObj.saleRoleid = saleRoleid;
			// messageObj.itemid = itemid;
			// messageObj.num = num;
			// var proto = Network._instance.protoTypePool.CMarketBuy.fromObject(messageObj);

			// console.log("CMarketBuy proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CMarketBuy.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CMarketBuy, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			ByteArrayUtils.writeLong(id, byteArray);
			ByteArrayUtils.writeLong(saleRoleid, byteArray);
			byteArray.writeInt32(itemid);
			byteArray.writeInt32(num);
			this.sendMsg(ProtocolsEnum.CMarketBuy, byteArray);

		}
		public c2s_market_browse(browsetype: number, firstno: number, twono: number,
			threeno: Array<number>, itemtype: number, limitmin: number, limitmax: number,
			currpage: number, priceSort: number, issearch: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(browsetype);
			byteArray.writeInt32(firstno);
			byteArray.writeInt32(twono);
			let arrSize = threeno.length;
			byteArray.writeByte(arrSize);
			for (var i = 0; i < arrSize; i++) {
				byteArray.writeInt32(threeno[i]);
			}
			byteArray.writeInt32(itemtype);
			byteArray.writeInt32(limitmin);
			byteArray.writeInt32(limitmax);
			byteArray.writeInt32(currpage);
			byteArray.writeInt32(priceSort);
			byteArray.writeInt32(issearch);
			this.sendMsg(ProtocolsEnum.CMarketBrowse, byteArray);
		}
		public c2s_query_limit(querytype: number, goodsids: Array<number>): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(querytype);
			let arrSize = goodsids.length;
			let sizeUint8Array: Uint8Array = ByteArrayUtils.compact_uint32(arrSize);
			byteArray.writeUint8Array(sizeUint8Array);
			for (var i = 0; i < arrSize; i++) {
				byteArray.writeInt32(goodsids[i]);
			}
			this.sendMsg(ProtocolsEnum.CQueryLimit, byteArray);
		}
		public c2s_requst_shopprice(shopid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(shopid);
			this.sendMsg(ProtocolsEnum.CRequstShopPrice, byteArray);
		}
		public c2s_chamber_ofcommerceshop(shopid: number, itemkey: number, goodsid: number, num: number, buytype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(shopid);
			byteArray.writeInt32(itemkey);
			byteArray.writeInt32(goodsid);
			byteArray.writeInt32(num);
			byteArray.writeInt32(buytype);
			this.sendMsg(ProtocolsEnum.CChamberOfCommerceShop, byteArray);

		}
		public c2s_buy_npcshop(shopid: number, goodsid: number, num: number, buytype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(shopid);
			byteArray.writeInt32(goodsid);
			byteArray.writeInt32(num);
			byteArray.writeInt32(buytype);
			this.sendMsg(ProtocolsEnum.CBuyNpcShop, byteArray);
		}
		public c2s_buy_mallshop(shopid: number, taskid: number, goodsid: number, num: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(shopid);
			byteArray.writeInt32(taskid);
			byteArray.writeInt32(goodsid);
			byteArray.writeInt32(num);
			this.sendMsg(ProtocolsEnum.CBuyMallShop, byteArray);
		}
		public c2s_change_gem(gemKey: number, newGemItemId: number): void {
			let messageObj: any = {};
			messageObj.gemKey = gemKey;
			messageObj.newGemItemId = newGemItemId;
			var proto = Network._instance.protoTypePool.CChangeGem.fromObject(messageObj);

			console.log("CChangeGem proto", proto);
			var buffer: any = Network._instance.protoTypePool.CChangeGem.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CChangeGem, buffer);
		}
		public c2s_change_weapon(srcWeaponKey: number, newWeaponTypeId: number): void {
			let messageObj: any = {};
			messageObj.srcWeaponKey = srcWeaponKey;
			messageObj.newWeaponTypeId = newWeaponTypeId;
			var proto = Network._instance.protoTypePool.CChangeWeapon.fromObject(messageObj);

			console.log("CChangeWeapon proto", proto);
			var buffer: any = Network._instance.protoTypePool.CChangeWeapon.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CChangeWeapon, buffer);
		}
		public c2s_change_schoolextinfo(): void {		//此客户端消息属性为空
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CChangeSchoolExtInfo.fromObject(messageObj);

			console.log("CChangeSchoolExtInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CChangeSchoolExtInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CChangeSchoolExtInfo, buffer);
		}
		public c2s_change_school(newShape: number, newSchool: number): void {
			let messageObj: any = {};
			messageObj.newShape = newShape;
			messageObj.newSchool = newSchool;
			var proto = Network._instance.protoTypePool.CChangeSchool.fromObject(messageObj);

			console.log("CChangeSchool proto", proto);
			var buffer: any = Network._instance.protoTypePool.CChangeSchool.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CChangeSchool, buffer);
		}
		public c2s_old_schoollist(): void {		//此客户端消息属性为空
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.COldSchoolList.fromObject(messageObj);

			console.log("COldSchoolList proto", proto);
			var buffer: any = Network._instance.protoTypePool.COldSchoolList.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.COldSchoolList, buffer);
		}
		public c2s_shouxi_shape(shouxikey: number): void {
			let messageObj: any = {};
			messageObj.shouxikey = shouxikey;
			var proto = Network._instance.protoTypePool.CShouxiShape.fromObject(messageObj);

			console.log("CShouxiShape proto", proto);
			var buffer: any = Network._instance.protoTypePool.CShouxiShape.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CShouxiShape, buffer);
		}
		public c2s_vote_candidate(candidateid: number, shouxikey: number): void {
			let messageObj: any = {};
			messageObj.candidateid = candidateid;
			messageObj.shouxikey = shouxikey;
			var proto = Network._instance.protoTypePool.CVoteCandidate.fromObject(messageObj);

			console.log("CVoteCandidate proto", proto);
			var buffer: any = Network._instance.protoTypePool.CVoteCandidate.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CVoteCandidate, buffer);
		}
		public c2s_send_electorwords(electorwords: string): void {
			let messageObj: any = {};
			messageObj.electorwords = electorwords;
			var proto = Network._instance.protoTypePool.CSendElectorWords.fromObject(messageObj);

			console.log("CSendElectorWords proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSendElectorWords.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSendElectorWords, buffer);
		}
		//在排行榜界面，请求某信息，服务器会返回并抛出SRankRoleInfo2消息
		public c2s_rank_getpetinfo(roleid: number, infotype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(roleid);
			byteArray.writeInt32(infotype);
			this.sendMsg(ProtocolsEnum.CRankGetPetInfo, byteArray);
		}
		//请求排行榜上玩家、宠物、帮派信息查看
		public c2s_rank_getinfo(ranktype: number, rank: number, id: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(ranktype);
			byteArray.writeInt32(rank);
			ByteArrayUtils.writeLong(id, byteArray);
			this.sendMsg(ProtocolsEnum.CRankGetInfo, byteArray);
		}
		//请求榜单上宠物的详细信息常看
		public c2s_request_rankpetdata(uniquePetId: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(uniquePetId, byteArray);
			this.sendMsg(ProtocolsEnum.CRequestRankPetData, byteArray);
		}
		//请求榜单的详细信息
		public c2s_request_ranklist(ranktype: number, page: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(ranktype);
			byteArray.writeInt32(page);
			this.sendMsg(ProtocolsEnum.CRequestRankList, byteArray);

		}
		public c2s_resolve_gem(itemkey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(itemkey);
			this.sendMsg(ProtocolsEnum.CResolveGem, byteArray);
		}
		public c2s_resolve_equip(itemkey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(itemkey);
			this.sendMsg(ProtocolsEnum.CResolveEquip, byteArray);
		}
		public c2s_make_equip(equipID: number, makeType: number): void {
			// let messageObj: any = {};
			// messageObj.equipID = equipID;
			// messageObj.makeType = makeType;
			// var proto = Network._instance.protoTypePool.CMakeEquip.fromObject(messageObj);

			// console.log("CMakeEquip proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CMakeEquip.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CMakeEquip, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(equipID);
			byteArray.writeInt16(makeType);

			this.sendMsg(ProtocolsEnum.CMakeEquip, byteArray);
		}
		public c2s_add_blackrole(roleId: number): void {
			// let messageObj: any = {};
			// messageObj.roleId = roleId;
			// var proto = Network._instance.protoTypePool.CAddBlackRole.fromObject(messageObj);

			// console.log("CAddBlackRole proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CAddBlackRole.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CAddBlackRole, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeLong(roleId, byteArray);

			this.sendMsg(ProtocolsEnum.CAddBlackRole, byteArray);
		}
		public c2s_remove_blackrole(roleId: number): void {
			// let messageObj: any = {};
			// messageObj.roleId = roleId;
			// var proto = Network._instance.protoTypePool.CRemoveBlackRole.fromObject(messageObj);

			// console.log("CRemoveBlackRole proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CRemoveBlackRole.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CRemoveBlackRole, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeLong(roleId, byteArray);

			this.sendMsg(ProtocolsEnum.CRemoveBlackRole, byteArray);
		}
		public c2s_search_blackrole(roleId: number): void {
			// let messageObj: any = {};
			// messageObj.roleId = roleId;
			// var proto = Network._instance.protoTypePool.CSearchBlackRole.fromObject(messageObj);

			// console.log("CSearchBlackRole proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CSearchBlackRole.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CSearchBlackRole, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeLong(roleId, byteArray);

			this.sendMsg(ProtocolsEnum.CSearchBlackRole, byteArray);
		}
		public c2s_req_blackroles(): void {		//此客户端消息属性为空
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CReqBlackRoles.fromObject(messageObj);

			console.log("CReqBlackRoles proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqBlackRoles.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqBlackRoles, buffer);
		}
		public c2s_recover_petinfo(uniqId: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeLong(uniqId, byteArray);

			this.sendMsg(ProtocolsEnum.CRecoverPetInfo, byteArray);
		}
		public c2s_pet_recover(uniqId: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeLong(uniqId, byteArray);

			this.sendMsg(ProtocolsEnum.CPetRecover, byteArray);
		}
		public c2s_pet_recoverlist(): void {	  //此客户端消息属性为空
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CPetRecoverList, byteArray);
		}
		public c2s_pet_levelreset(petkey: number, itemkey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(petkey);
			byteArray.writeInt32(itemkey);

			this.sendMsg(ProtocolsEnum.CPetLevelReset, byteArray);
		}
		public c2s_shen_shouyangcheng(petkey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(petkey);
			this.sendMsg(ProtocolsEnum.CShenShouYangCheng, byteArray);
		}
		public c2s_shen_shouchongzhi(petkey: number, needpetid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(petkey);
			byteArray.writeInt32(needpetid);
			this.sendMsg(ProtocolsEnum.CShenShouChongZhi, byteArray);
		}
		public c2s_shen_shouduihuan(): void {		//此客户端消息属性为空
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CShenShouDuiHuan, byteArray);
		}
		public c2s_pet_sell(petkey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(petkey);

			this.sendMsg(ProtocolsEnum.CPetSell, byteArray);
		}
		public c2s_get_petinfo(roleid: number, petkey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeLong(roleid, byteArray);
			byteArray.writeInt32(petkey);

			this.sendMsg(ProtocolsEnum.CGetPetInfo, byteArray);
		}
		public c2s_pet_depotcolumnaddcapacity(): void {		//此客户端消息属性为空
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CPetDepotColumnAddCapacity, byteArray);
		}
		public c2s_pet_expcultivate(petkey: number, itemid: number, itemnum: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(petkey);
			byteArray.writeInt32(itemid);
			byteArray.writeByte(itemnum);

			this.sendMsg(ProtocolsEnum.CPetExpCultivate, byteArray);
		}
		public c2s_pet_aptitudecultivate(petkey: number, aptid: number, itemkey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(petkey);
			byteArray.writeInt32(aptid);
			byteArray.writeInt32(itemkey);

			this.sendMsg(ProtocolsEnum.CPetAptitudeCultivate, byteArray);
		}
		public c2s_pet_skillcertification(petkey: number, skillId: number, isconfirm: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(petkey);
			byteArray.writeInt32(skillId);
			byteArray.writeInt32(isconfirm);

			this.sendMsg(ProtocolsEnum.CPetSkillCertification, byteArray);
		}
		public c2s_pet_synthesize(petkey1: number, petkey2: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(petkey1);
			byteArray.writeInt32(petkey2);

			this.sendMsg(ProtocolsEnum.CPetSynthesize, byteArray);
		}
		public c2s_pet_wash(petkey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(petkey);

			this.sendMsg(ProtocolsEnum.CPetWash, byteArray);
		}
		public c2s_pet_resetpoint(petkey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(petkey);

			this.sendMsg(ProtocolsEnum.CPetResetPoint, byteArray);
		}
		public c2s_pet_setautoaddpoint(petkey: number, str: number, iq: number, cons: number, endu: number, agi: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(petkey);
			byteArray.writeInt32(str);
			byteArray.writeInt32(iq);
			byteArray.writeInt32(cons);
			byteArray.writeInt32(endu);
			byteArray.writeInt32(agi);
			this.sendMsg(ProtocolsEnum.CPetSetAutoAddPoint, byteArray);
		}
		public c2s_free_pet1(petkeys: Array<number>): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeByte(petkeys.length);
			var index: number;
			var intInfo;
			for (index = 0; index < petkeys.length; index++) {
				intInfo = petkeys[index];
				byteArray.writeInt32(intInfo);
			}
			this.sendMsg(ProtocolsEnum.CFreePet1, byteArray);
		}
		public c2s_pet_learnskillbybook(petkey: number, bookkey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(petkey);
			byteArray.writeInt32(bookkey);

			this.sendMsg(ProtocolsEnum.CPetLearnSkillByBook, byteArray);
		}
		public c2s_show_petinfo(masterid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeLong(masterid, byteArray);

			this.sendMsg(ProtocolsEnum.CShowPetInfo, byteArray);
		}
		public c2s_mod_petname(petkey: number, petname: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(petkey);
			ByteArrayUtils.writeUtf16String(petname, byteArray);
			this.sendMsg(ProtocolsEnum.CModPetName, byteArray);
		}
		/** 宠物仓库存取宠物
		 * @param srccolumnid 源宠物栏
		 * @param petkey 存或取的宠物key
		 * @param dstcolumnid 目的宠物栏
		 * @param npckey 仓库npckey
		 */
		public c2s_move_petcolumn(srccolumnid: number, petkey: number, dstcolumnid: number, npckey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(srccolumnid);
			byteArray.writeInt32(petkey);
			byteArray.writeInt32(dstcolumnid);
			ByteArrayUtils.writeLong(npckey, byteArray);

			this.sendMsg(ProtocolsEnum.CMovePetColumn, byteArray);
		}
		/** 客户端请求宠物栏信息
		 * @param columnid 宠物栏id
		 * @param npckey 仓库老板的npckey
		 */
		public c2s_get_petcolumninfo(columnid: number, npckey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(columnid);
			ByteArrayUtils.writeLong(npckey, byteArray);

			this.sendMsg(ProtocolsEnum.CGetPetcolumnInfo, byteArray);
		}
		public c2s_set_fightpetrest(): void {		//此客户端消息属性为空
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CSetFightPetRest, byteArray);
		}
		public c2s_set_fightpet(petkey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(petkey);

			this.sendMsg(ProtocolsEnum.CSetFightPet, byteArray);
		}
		public c2s_pet_addpoint(petkey: number, str: number, iq: number, cons: number, endu: number, agi: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(petkey);
			byteArray.writeInt32(str);
			byteArray.writeInt32(iq);
			byteArray.writeInt32(cons);
			byteArray.writeInt32(endu);
			byteArray.writeInt32(agi);

			this.sendMsg(ProtocolsEnum.CPetAddPoint, byteArray);
		}
		public c2s_show_petoff(): void {	 //此客户端消息属性为空
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CShowPetOff.fromObject(messageObj);

			console.log("CShowPetOff proto", proto);
			var buffer: any = Network._instance.protoTypePool.CShowPetOff.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CShowPetOff, buffer);
		}
		public c2s_show_pet(petkey: number): void {
			let messageObj: any = {};
			messageObj.petkey = petkey;
			var proto = Network._instance.protoTypePool.CShowPet.fromObject(messageObj);

			console.log("CShowPet proto", proto);
			var buffer: any = Network._instance.protoTypePool.CShowPet.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CShowPet, buffer);
		}
		public c2s_abandon_macth(npckey: number): void {
			let messageObj: any = {};
			messageObj.npckey = npckey;
			var proto = Network._instance.protoTypePool.CAbandonMacth.fromObject(messageObj);

			console.log("CAbandonMacth proto", proto);
			var buffer: any = Network._instance.protoTypePool.CAbandonMacth.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CAbandonMacth, buffer);
		}
		public c2s_exit_copy(gotoType: number): void {
			let messageObj: any = {};
			messageObj.gotoType = gotoType;
			var proto = Network._instance.protoTypePool.CExitCopy.fromObject(messageObj);

			console.log("CExitCopy proto", proto);
			var buffer: any = Network._instance.protoTypePool.CExitCopy.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CExitCopy, buffer);
		}
		public c2s_request_activityanswerquestion(): void {		//此客户端消息属性为空
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CRequestActivityAnswerQuestion.fromObject(messageObj);

			console.log("CRequestActivityAnswerQuestion proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestActivityAnswerQuestion.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestActivityAnswerQuestion, buffer);
		}
		public c2s_open_chest(chestnpckey: number): void {
			let messageObj: any = {};
			messageObj.chestnpckey = chestnpckey;
			var proto = Network._instance.protoTypePool.COpenChest.fromObject(messageObj);

			console.log("COpenChest proto", proto);
			var buffer: any = Network._instance.protoTypePool.COpenChest.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.COpenChest, buffer);
		}
		public c2s_answer_activityquestion(questionid: number, answerid: number, xiangguanid: number): void {
			let messageObj: any = {};
			messageObj.questionid = questionid;
			messageObj.answerid = answerid;
			messageObj.xiangguanid = xiangguanid;
			var proto = Network._instance.protoTypePool.CAnswerActivityQuestion.fromObject(messageObj);

			console.log("CAnswerActivityQuestion proto", proto);
			var buffer: any = Network._instance.protoTypePool.CAnswerActivityQuestion.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CAnswerActivityQuestion, buffer);
		}
		public c2s_activity_answerquestionhelp(questionid: number): void {
			let messageObj: any = {};
			messageObj.questionid = questionid;
			var proto = Network._instance.protoTypePool.CActivityAnswerQuestionHelp.fromObject(messageObj);

			console.log("CActivityAnswerQuestionHelp proto", proto);
			var buffer: any = Network._instance.protoTypePool.CActivityAnswerQuestionHelp.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CActivityAnswerQuestionHelp, buffer);
		}
		public c2s_grab_activityreward(): void {	//此客户端消息属性为空
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CGrabActivityReward.fromObject(messageObj);

			console.log("CGrabActivityReward proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGrabActivityReward.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGrabActivityReward, buffer);
		}
		public c2s_give_upquestion(questiontype: number, npckey: number): void {
			let messageObj: any = {};
			messageObj.questiontype = questiontype;
			messageObj.npckey = npckey;
			var proto = Network._instance.protoTypePool.CGiveUpQuestion.fromObject(messageObj);

			console.log("CGiveUpQuestion proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGiveUpQuestion.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGiveUpQuestion, buffer);
		}
		public c2s_general_summoncommand(summontype: number, npckey: number, agree: number): void {
			let messageObj: any = {};
			messageObj.summontype = summontype;
			messageObj.npckey = npckey;
			messageObj.agree = agree;
			var proto = Network._instance.protoTypePool.CGeneralSummonCommand.fromObject(messageObj);

			console.log("CGeneralSummonCommand proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGeneralSummonCommand.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGeneralSummonCommand, buffer);
		}
		public c2s_has_fortunewheel(npckey: number): void {
			let messageObj: any = {};
			messageObj.npckey = npckey;
			var proto = Network._instance.protoTypePool.CHasFortuneWheel.fromObject(messageObj);

			console.log("CHasFortuneWheel proto", proto);
			var buffer: any = Network._instance.protoTypePool.CHasFortuneWheel.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CHasFortuneWheel, buffer);
		}
		public c2s_start_fortunewheel(npckey: number): void {
			let messageObj: any = {};
			messageObj.npckey = npckey;
			var proto = Network._instance.protoTypePool.CStartFortuneWheel.fromObject(messageObj);

			console.log("CStartFortuneWheel proto", proto);
			var buffer: any = Network._instance.protoTypePool.CStartFortuneWheel.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CStartFortuneWheel, buffer);
		}
		public c2s_winner_changetask(acceptflag: number): void {	//此客户端消息属性为空
			let messageObj: any = {};
			messageObj.acceptflag = acceptflag;
			var proto = Network._instance.protoTypePool.CWinnerChangeTask.fromObject(messageObj);

			console.log("CWinnerChangeTask proto", proto);
			var buffer: any = Network._instance.protoTypePool.CWinnerChangeTask.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CWinnerChangeTask, buffer);
		}
		public c2s_query_impexamstate(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CQueryImpExamState.fromObject(messageObj);

			console.log("CQueryImpExamState proto", proto);
			var buffer: any = Network._instance.protoTypePool.CQueryImpExamState.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CQueryImpExamState, buffer);
		}
		public c2s_imp_examhelp(impexamtype: number): void {
			let bytearray: ByteArray = new ByteArray();
			bytearray.endian = Laya.Byte.BIG_ENDIAN;
			bytearray.writeByte(impexamtype);
			this.sendMsg(ProtocolsEnum.CImpExamHelp, bytearray);
		}
		public c2s_send_impexamanswer(impexamtype: number, answerid: number, assisttype: number): void {
			let bytearray: ByteArray = new ByteArray();
			bytearray.endian = Laya.Byte.BIG_ENDIAN;
			bytearray.writeByte(impexamtype);
			bytearray.writeInt32(answerid);
			bytearray.writeByte(assisttype);
			this.sendMsg(ProtocolsEnum.CSendImpExamAnswer, bytearray);
		}
		public c2s_apply_impexam(impexamtype: number, operate: number): void {
			let byteArray = new ByteArray;
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeByte(impexamtype);
			byteArray.writeByte(operate);
			this.sendMsg(ProtocolsEnum.CApplyImpExam, byteArray);
		}
		public c2s_confirm_impexam(impexamtype: number, operate: number): void {
			let messageObj: any = {};
			messageObj.impexamtype = impexamtype;
			messageObj.operate = operate;
			var proto = Network._instance.protoTypePool.CConfirmImpExam.fromObject(messageObj);

			console.log("CConfirmImpExam proto", proto);
			var buffer: any = Network._instance.protoTypePool.CConfirmImpExam.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CConfirmImpExam, buffer);
		}
		//发布公会群消息
		public c2s_CClanMessage(message: string): void {
			let byteArray: ByteArray = new ByteArray();
			ByteArrayUtils.writeUtf16String(message, byteArray)
			this.sendMsg(ProtocolsEnum.CClanMessage, byteArray);
		}
		//驱逐成员
		public c2s_CFireMember(memberroleid: number, reasontype: number): void {
			let byteArray: ByteArray = new ByteArray();
			ByteArrayUtils.writeLong(memberroleid, byteArray)
			byteArray.writeInt32(reasontype);
			this.sendMsg(ProtocolsEnum.CFireMember, byteArray);
		}
		//更改职务
		public c2s_CChangePosition(memberroleid: number, position: number): void {
			let byteArray: ByteArray = new ByteArray();
			ByteArrayUtils.writeLong(memberroleid, byteArray)
			byteArray.writeInt32(position);
			this.sendMsg(ProtocolsEnum.CChangePosition, byteArray);

		}
		//公会邀请
		public c2s_CClanInvitation(guestroleid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(guestroleid, byteArray);
			this.sendMsg(ProtocolsEnum.CClanInvitation, byteArray);
		}
		//更改宗旨
		public c2s_CChangeClanAim(newaim: string): void {
			// let messageObj: any = {};
			// messageObj.newaim = newaim;
			// var proto = Network._instance.protoTypePool.CChangeClanAim.fromObject(messageObj);
			// console.log("CChangeClanAim proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CChangeClanAim.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CChangeClanAim, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeUtf16String(newaim, byteArray);
			this.sendMsg(ProtocolsEnum.CChangeClanAim, byteArray);
		}
		//
		public c2s_CAcceptOrRefuseApply(applyroleid: number, accept: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(applyroleid, byteArray);
			byteArray.writeByte(accept);
			this.sendMsg(ProtocolsEnum.CAcceptOrRefuseApply, byteArray);
		}
		//清除申请者列表
		public c2s_CClearApplyList(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CClearApplyList, byteArray);
		}
		//客户端请求申请加入公会的人员列表
		public c2s_CRequestApplyList(): void {
			/*let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CRequestApplyList.fromObject(messageObj);
			console.log("CRequestApplyList proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestApplyList.encode(proto).finish();*/

			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CRequestApplyList, byteArray);
		}
		//申请入会
		public c2s_CApplyClan(clanid: number): void {
			// let messageObj: any = {};
			// messageObj.clanid = clanid;
			// var proto = Network._instance.protoTypePool.CApplyClan.fromObject(messageObj);
			// console.log("CApplyClan proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CApplyClan.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CApplyClan, buffer);
			let byteArray: ByteArray = new ByteArray();
			ByteArrayUtils.writeLong(clanid, byteArray)
			this.sendMsg(ProtocolsEnum.CApplyClan, byteArray);
		}
		//主动脱离公会
		public c2s_CLeaveClan(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CLeaveClan, byteArray);
		}
		//客户端请求创建公会
		public c2s_CCreateClan(clanname: string, clanaim: string): void {
			// let messageObj: any = {};
			// messageObj.clanname = clanname;
			// messageObj.clanaim = clanaim;
			// var proto = Network._instance.protoTypePool.CCreateClan.fromObject(messageObj);
			// console.log("CCreateClan proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CCreateClan.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CCreateClan, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeUtf16String(clanname, byteArray);
			ByteArrayUtils.writeUtf16String(clanaim, byteArray);
			this.sendMsg(ProtocolsEnum.CCreateClan, byteArray);
		}
		//客户端请求公会列表：没有公会
		public c2s_COpenClanList(currpage: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(currpage);
			this.sendMsg(ProtocolsEnum.COpenClanList, byteArray);
		}
		//客户端请求公会界面：有公会
		public c2s_COpenClan(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.COpenClan, byteArray);

		}
		//购买药房的药品
		public c2s_CBuyMedic(itemid: number, itemnum: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(itemid);
			byteArray.writeInt32(itemnum);
			this.sendMsg(ProtocolsEnum.CBuyMedic, byteArray);
		}
		//请求药房信息
		public c2s_COpenClanMedic(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.COpenClanMedic, byteArray);
		}
		/** 放弃当前正在探索的天机仙令任务
		 * @param questid 要放弃的任务id(活动类型)
		 */
		public c2s_CAbandonAnYe(questid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(questid);
			this.sendMsg(ProtocolsEnum.CAbandonAnYe, byteArray);
		}
		/** 开启天机仙令中探索模式
		 * @param taskpos 任务栏位
		 */
		public c2s_CLengendAnYetask(taskpos: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(taskpos);
			this.sendMsg(ProtocolsEnum.CLengendAnYetask, byteArray);
		}
		/** 首次参加天机仙令的时间 
		 * @param jointime 当前时间戳
		*/
		public c2s_CSetAnYeJoinTime(jointime: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(jointime, byteArray);
			this.sendMsg(ProtocolsEnum.CSetAnYeJoinTime, byteArray);
		}
		/** 在天机仙令界面任性一下（即申请用金币或声望完成任务） 
		 * @param taskpos 任务栏位
		 * @param moneytype 此处只分金币与声望类型的货币
		*/
		public c2s_CRenXingAnYeTask(taskpos: number, moneytype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(taskpos);
			byteArray.writeInt32(moneytype);
			this.sendMsg(ProtocolsEnum.CRenXingAnYeTask, byteArray);
		}
		/** 在天机仙令界面上交目标对象 
		 * @param taskpos 任务栏位
		 * @param taskid 任务id
		 * @param taskrole 完成任务的角色id（可本人角色，也可他人角色）
		 * @param submittype 上交类型（宠物、道具）
		 * @param things 目标对象的key与value
		*/
		public c2s_CSubmitThings(taskpos: number, taskid: number, taskrole: number, submittype: number, things: Array<game.modules.task.models.SubmitUnitVo>): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(taskpos);
			byteArray.writeInt32(taskid);
			ByteArrayUtils.writeLong(taskrole, byteArray);
			byteArray.writeInt32(submittype);
			let sizeUint8Array: Uint8Array = ByteArrayUtils.compact_uint32(things.length);
			byteArray.writeUint8Array(sizeUint8Array);
			for (let i = 0; i < things.length; i++) {
				byteArray.writeInt32(things[i].key);
				byteArray.writeInt32(things[i].num);
			}
			this.sendMsg(ProtocolsEnum.CSubmitThings, byteArray);
		}
		//客户端请求查询任务状态
		public c2s_CQueryCircleTaskState(questid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.writeUint32(questid);
			this.sendMsg(ProtocolsEnum.CQueryCircleTaskState, byteArray);
		}
		//客户端选择货币类型任性任务
		public c2s_CRenXingCircleTask(serviceid: number, moneytype: number): void {
			let messageObj: any = {};
			messageObj.serviceid = serviceid;
			messageObj.moneytype = moneytype;
			var proto = Network._instance.protoTypePool.CRenXingCircleTask.fromObject(messageObj);
			console.log("CRenXingCircleTask proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRenXingCircleTask.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRenXingCircleTask, buffer);
		}
		//请求跳转到职业巡逻地图
		public c2s_CReqGotoPatrol(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CReqGotoPatrol.fromObject(messageObj);
			console.log("CReqGotoPatrol proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqGotoPatrol.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqGotoPatrol, buffer);
		}
		//问卷调查答案
		public c2s_CQuestionnaireResult(questid: number, step: number, result: Array<number>): void {
			let messageObj: any = {};
			messageObj.questid = questid;
			messageObj.step = step;
			messageObj.result = result;
			var proto = Network._instance.protoTypePool.CQuestionnaireResult.fromObject(messageObj);
			console.log("CQuestionnaireResult proto", proto);
			var buffer: any = Network._instance.protoTypePool.CQuestionnaireResult.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CQuestionnaireResult, buffer);
		}
		//放弃的任务id
		public c2s_CAbandonQuest(questid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(questid);
			this.sendMsg(ProtocolsEnum.CAbandonQuest, byteArray);
		}
		public c2s_CSetBattleFlag(opttype: number, index: number, flag: string): void {
			let messageObj: any = {};
			messageObj.opttype = opttype;
			messageObj.index = index;
			messageObj.flag = flag;
			var proto = Network._instance.protoTypePool.CSetBattleFlag.fromObject(messageObj);
			console.log("CSetBattleFlag proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSetBattleFlag.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSetBattleFlag, buffer);
		}
		public c2s_CSetCommander(opttype: number, roleid: number): void {
			let byte: ByteArray = new ByteArray();// 0 set, 1 reset
			byte.endian = Laya.Byte.BIG_ENDIAN;
			byte.writeByte(opttype);
			ByteArrayUtils.writeLong(roleid, byte);
			this.sendMsg(ProtocolsEnum.CSetCommander, byte);
		}
		// 
		public c2s_CModifyBattleFlag(opttype: number, index: number, flag: string): void {
			let messageObj: any = {};
			messageObj.opttype = opttype;
			messageObj.index = index;
			messageObj.flag = flag;
			var proto = Network._instance.protoTypePool.CModifyBattleFlag.fromObject(messageObj);
			console.log("CModifyBattleFlag proto", proto);
			var buffer: any = Network._instance.protoTypePool.CModifyBattleFlag.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CModifyBattleFlag, buffer);
		}
		// 
		public c2s_CReqBattleFlag(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CReqBattleFlag.fromObject(messageObj);
			console.log("CReqBattleFlag proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqBattleFlag.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqBattleFlag, buffer);
		}
		// 玩家来应战(第一个确认按钮)
		public c2s_CAcceptLiveDieBattleFirst(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CAcceptLiveDieBattleFirst, byteArray);
		}
		// 观看战斗
		public c2s_CLiveDieBattleWatchFight(battleid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(battleid, byteArray);
			this.sendMsg(ProtocolsEnum.CLiveDieBattleWatchFight, byteArray);
		}
		// 观看录像
		public c2s_CLiveDieBattleWatchVideo(vedioid: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeUtf16String(vedioid, byteArray);
			this.sendMsg(ProtocolsEnum.CLiveDieBattleWatchVideo, byteArray);
		}
		// 点赞
		public c2s_CLiveDieBattleGiveRose(vedioid: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeUtf16String(vedioid, byteArray);
			this.sendMsg(ProtocolsEnum.CLiveDieBattleGiveRose, byteArray);
		}
		// 请求生死战排行界面
		public c2s_CLiveDieBattleRankView(modeltype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(modeltype);
			this.sendMsg(ProtocolsEnum.CLiveDieBattleRankView, byteArray);
		}
		// 请求生死战观战界面
		public c2s_CLiveDieBattleWatchView(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CLiveDieBattleWatchView, byteArray);
		}
		// npc处应战开战
		public c2s_CAcceptLiveDieBattle(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CAcceptLiveDieBattle, byteArray);
		}
		// 确定是否接受战书
		public c2s_CAcceptInvitationLiveDieBattle(sourceid: number, acceptresult: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(sourceid, byteArray);
			byteArray.writeInt32(acceptresult);
			this.sendMsg(ProtocolsEnum.CAcceptInvitationLiveDieBattle, byteArray);
		}
		// 确定是否下战书
		public c2s_CInvitationLiveDieBattleOK(objectid: number, selecttype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(objectid, byteArray);
			byteArray.writeInt32(selecttype);
			this.sendMsg(ProtocolsEnum.CInvitationLiveDieBattleOK, byteArray);
		}
		// 下战书
		public c2s_CInvitationLiveDieBattle(idorname: string, selecttype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeUtf16String(idorname, byteArray);
			byteArray.writeInt32(selecttype);
			this.sendMsg(ProtocolsEnum.CInvitationLiveDieBattle, byteArray);
		}
		// 停止播放
		public c2s_CStopRePlay(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CStopRePlay.fromObject(messageObj);
			console.log("CStopRePlay proto", proto);
			var buffer: any = Network._instance.protoTypePool.CStopRePlay.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CStopRePlay, buffer);
		}
		// 请求播放录像
		public c2s_CReqRePlay(battleCameraUrl: number): void {
			let messageObj: any = {};
			messageObj.battleCameraUrl = battleCameraUrl;
			var proto = Network._instance.protoTypePool.CReqRePlay.fromObject(messageObj);
			console.log("CReqRePlay proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqRePlay.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqRePlay, buffer);
		}
		// 请求录像url
		public c2s_CReqCameraUrl(battleid: number): void {
			let messageObj: any = {};
			messageObj.battleid = battleid;
			var proto = Network._instance.protoTypePool.CReqCameraUrl.fromObject(messageObj);
			console.log("CReqCameraUrl proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqCameraUrl.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqCameraUrl, buffer);
		}
		// 是拒绝还是接受切磋
		public c2s_CInvitationPlayPKResult(sourceid: number, acceptresult: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(sourceid, byteArray);
			byteArray.writeInt32(acceptresult);
			this.sendMsg(ProtocolsEnum.CInvitationPlayPKResult, byteArray);
		}
		// 发送切磋邀请
		public c2s_CInvitationPlayPK(objectid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(objectid, byteArray);
			this.sendMsg(ProtocolsEnum.CInvitationPlayPK, byteArray);
		}
		// 寻找对手界面
		public c2s_CPlayPKFightView(modeltype: number, school: number, levelindex: number): void {
			let messageObj: any = {};
			messageObj.modeltype = modeltype;
			messageObj.school = school;
			messageObj.levelindex = levelindex;
			var proto = Network._instance.protoTypePool.CPlayPKFightView.fromObject(messageObj);
			console.log("CPlayPKFightView proto", proto);
			var buffer: any = Network._instance.protoTypePool.CPlayPKFightView.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CPlayPKFightView, buffer);
		}
		// 客户端请求打开箱子
		public c2s_CPvP5OpenBox(boxtype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeByte(boxtype);
			this.sendMsg(ProtocolsEnum.CPvP5OpenBox, byteArray);
		}
		// 客户端请求准备完毕
		// public c2s_CPvP5ReadyFight(ready: number): void {
		// 	let byteArray: ByteArray = new ByteArray();
		// 	byteArray.endian = Laya.Byte.BIG_ENDIAN;

		// 	byteArray.writeByte(ready);
		// 	this.sendMsg(ProtocolsEnum.CPvP5ReadyFight, byteArray);
		// }
		// 客户端请求排行榜
		public c2s_CPvP5RankingList(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CPvP5RankingList, byteArray);
		}
		// 客户端请求自己的信息
		public c2s_CPvP5MyInfo(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CPvP5MyInfo, byteArray);
		}
		// 客户端请求打开箱子
		public c2s_CPvP3OpenBox(boxtype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeByte(boxtype);
			this.sendMsg(ProtocolsEnum.CPvP3OpenBox, byteArray);
		}
		// 客户端请求准备完毕
		public c2s_CPvP3ReadyFight(ready: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeByte(ready);
			this.sendMsg(ProtocolsEnum.CPvP3ReadyFight, byteArray);
		}
		// 客户端请求排行榜
		public c2s_CPvP3RankingList(history: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeByte(history);
			this.sendMsg(ProtocolsEnum.CPvP3RankingList, byteArray);
		}
		// 客户端请求自己的信息
		public c2s_CPvP3MyInfo(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CPvP3MyInfo, byteArray);
		}
		// 客户端请求打开箱子
		public c2s_CPvP1OpenBox(boxtype: number): void {
			let messageObj: any = {};
			messageObj.boxtype = boxtype;
			var proto = Network._instance.protoTypePool.CPvP1OpenBox.fromObject(messageObj);
			console.log("CPvP1OpenBox proto", proto);
			var buffer: any = Network._instance.protoTypePool.CPvP1OpenBox.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CPvP1OpenBox, buffer);
		}
		// 客户端请求准备完毕
		public c2s_CPvP1ReadyFight(ready: number): void {
			let messageObj: any = {};
			messageObj.ready = ready;
			var proto = Network._instance.protoTypePool.CPvP1ReadyFight.fromObject(messageObj);
			console.log("CPvP1ReadyFight proto", proto);
			var buffer: any = Network._instance.protoTypePool.CPvP1ReadyFight.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CPvP1ReadyFight, buffer);
		}
		// 客户端请求排行榜
		public c2s_CPvP1RankingList(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CPvP1RankingList.fromObject(messageObj);
			console.log("CPvP1RankingList proto", proto);
			var buffer: any = Network._instance.protoTypePool.CPvP1RankingList.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CPvP1RankingList, buffer);
		}
		// 客户端请求自己的信息
		public c2s_CPvP1MyInfo(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CPvP1MyInfo.fromObject(messageObj);
			console.log("CPvP1MyInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CPvP1MyInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CPvP1MyInfo, buffer);
		}
		// 客户端请求新手战斗
		public c2s_CReqNewHandBattle(): void {
			/*let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CReqNewHandBattle.fromObject(messageObj);
			console.log("CReqNewHandBattle proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqNewHandBattle.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqNewHandBattle, buffer);*/

			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CReqNewHandBattle, byteArray);
			console.log("ProtocolsEnum.CReqNewHandBattle c2s_CReqNewHandBattle:");

		}
		// 邀请某角色进行PK
		public c2s_CSendInvitePlayPK(guestRoleid: number): void {
			let messageObj: any = {};
			messageObj.guestRoleid = guestRoleid;
			var proto = Network._instance.protoTypePool.CSendInvitePlayPK.fromObject(messageObj);
			console.log("CSendInvitePlayPK proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSendInvitePlayPK.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSendInvitePlayPK, buffer);
		}
		// 请求退出观战
		public c2s_CEndWatchBattle(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CEndWatchBattle, byteArray);
		}
		// 请求观战
		public c2s_CSendWatchBattle(roleid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleid, byteArray);
			this.sendMsg(ProtocolsEnum.CSendWatchBattle, byteArray);
		}
		//客户端申请角色盈福经验
		public c2s_CApplyYingFuExprience(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CApplyYingFuExprience, byteArray);
		}
		//观看战斗
		public c2s_CXMRWatchFight(battleid: string): void {
			let messageObj: any = {};
			messageObj.battleid = battleid;
			var proto = Network._instance.protoTypePool.CXMRWatchFight.fromObject(messageObj);
			console.log("CXMRWatchFight proto", proto);
			var buffer: any = Network._instance.protoTypePool.CXMRWatchFight.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CXMRWatchFight, buffer);
		}
		//观看录像
		public c2s_CXMRWatchVideo(videoid: string, viewtype: number): void {
			let messageObj: any = {};
			messageObj.videoid = videoid;
			messageObj.viewtype = viewtype;
			var proto = Network._instance.protoTypePool.CXMRWatchVideo.fromObject(messageObj);
			console.log("CXMRWatchVideo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CXMRWatchVideo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CXMRWatchVideo, buffer);
		}
		//点赞
		public c2s_CXMRGiveRose(videoid: string, viewtype: number): void {
			let messageObj: any = {};
			messageObj.videoid = videoid;
			messageObj.viewtype = viewtype;
			var proto = Network._instance.protoTypePool.CXMRGiveRose.fromObject(messageObj);
			console.log("CXMRGiveRose proto", proto);
			var buffer: any = Network._instance.protoTypePool.CXMRGiveRose.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CXMRGiveRose, buffer);
		}
		//请求熊猫人boss界面
		public c2s_CXMRBossNPCView(viewtype: number, npccode: number): void {
			let messageObj: any = {};
			messageObj.viewtype = viewtype;
			messageObj.npccode = npccode;

			var proto = Network._instance.protoTypePool.CXMRBossNPCView.fromObject(messageObj);
			console.log("CXMRBossNPCView proto", proto);
			var buffer: any = Network._instance.protoTypePool.CXMRBossNPCView.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CXMRBossNPCView, buffer);
		}
		//请求熊猫人界面
		public c2s_CXMRNPCView(npccode: number): void {
			let messageObj: any = {};
			messageObj.npccode = npccode;

			var proto = Network._instance.protoTypePool.CXMRNPCView.fromObject(messageObj);
			console.log("CXMRNPCView proto", proto);
			var buffer: any = Network._instance.protoTypePool.CXMRNPCView.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CXMRNPCView, buffer);
		}
		public c2s_CExchangeCode(exchangeCode: string, npckey: number): void {
			let messageObj: any = {};
			messageObj.exchangeCode = exchangeCode;
			messageObj.npckey = npckey;
			var proto = Network._instance.protoTypePool.CExchangeCode.fromObject(messageObj);
			console.log("CExchangeCode proto", proto);
			var buffer: any = Network._instance.protoTypePool.CExchangeCode.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CExchangeCode, buffer);
		}
		//客户端请求QQ会员兑换码状态
		public c2s_CQQExchangeCodeStatus(): void {
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CQQExchangeCodeStatus.fromObject(messageObj);
			console.log("CQQExchangeCodeStatus proto", proto);
			var buffer: any = Network._instance.protoTypePool.CQQExchangeCodeStatus.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CQQExchangeCodeStatus, buffer);
		}
		public c2s_CGetHydScoreAward(rewardindex: number): void {
			let messageObj: any = {};
			messageObj.rewardindex = rewardindex;
			var proto = Network._instance.protoTypePool.CGetHydScoreAward.fromObject(messageObj);
			console.log("CGetHydScoreAward proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetHydScoreAward.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetHydScoreAward, buffer);
		}
		//请求节日积分奖励表数据
		public c2s_CQueryHydScoreData(): void {
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CQueryHydScoreData.fromObject(messageObj);
			console.log("CQueryHydScoreData proto", proto);
			var buffer: any = Network._instance.protoTypePool.CQueryHydScoreData.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CQueryHydScoreData, buffer);
		}
		public c2s_CGetChargeAwardCount(rewardindex: number): void {
			let messageObj: any = {};
			messageObj.rewardindex = rewardindex;
			var proto = Network._instance.protoTypePool.CGetChargeAwardCount.fromObject(messageObj);
			console.log("CGetChargeAwardCount proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetChargeAwardCount.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetChargeAwardCount, buffer);
		}
		//请求累计充值奖励表数据
		public c2s_CQueryChargeAwardCountData(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CQueryChargeAwardCountData.fromObject(messageObj);
			console.log("CQueryChargeAwardCountData proto", proto);
			var buffer: any = Network._instance.protoTypePool.CQueryChargeAwardCountData.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CQueryChargeAwardCountData, buffer);
		}
		public c2s_GetChargeAward(rewardindex: number): void {
			let messageObj: any = {};
			messageObj.rewardindex = rewardindex;
			var proto = Network._instance.protoTypePool.CGetChargeAward.fromObject(messageObj);
			console.log("GetChargeAward proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetChargeAward.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetChargeAward, buffer);
		}
		public c2s_GetHydAward(rewardindex: number): void {
			let messageObj: any = {};
			messageObj.rewardindex = rewardindex;
			var proto = Network._instance.protoTypePool.CGetHydAward.fromObject(messageObj);
			console.log("GetHydAward proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetHydAward.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetHydAward, buffer);
		}
		//请求节日活跃度奖励表数据
		public c2s_QueryJRAwardData(): void {
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CQueryJRAwardData.fromObject(messageObj);
			console.log("QueryJRAwardData proto", proto);
			var buffer: any = Network._instance.protoTypePool.CQueryJRAwardData.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CQueryJRAwardData, buffer);
		}
		//活动奖励ID
		public c2s_GetFestivalReward(id: number): void {
			let messageObj: any = {};
			messageObj.rewardid = id;
			var proto = Network._instance.protoTypePool.CGetFestivalReward.fromObject(messageObj);
			console.log("GetFestivalReward proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetFestivalReward.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetFestivalReward, buffer);
		}
		//节日签到数据请求
		public c2s_Cfestival(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.festival.fromObject(messageObj);
			console.log("Cfestival proto", proto);
			var buffer: any = Network._instance.protoTypePool.festival.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.festival, buffer);
		}
		public c2s_CReg(month: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeUint32(month);
			this.sendMsg(ProtocolsEnum.CReg, byteArray);
		}
		//签到开始
		public c2s_queryregdata(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CQueryRegData, byteArray);
		}

		/*加入地图结果*/
		public static SMSG_JOIN_MAP_RESULT: number = 14;	//join_map_result	
		/**
		 * by lqw
		 * c2s
		 */
		//  CDissolveRelation
		public c2s_dissolve_relation(relation: number, playerid: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.relation = relation;	//关系,师傅or徒弟
			messageObj.playerid = playerid;	//是否主动 0为被动,1为主动,2为自动

			var proto = Network._instance.protoTypePool.CDissolveRelation.fromObject(messageObj);
			console.log("CDissolveRelation proto", proto);
			var buffer: any = Network._instance.protoTypePool.CDissolveRelation.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CDissolveRelation, buffer);
		}
		// CSelectedMasterAward
		public c2s_selected_master_award(awardkey: number, npckey: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.awardkey = awardkey;	//玩家id
			messageObj.npckey = npckey;	//交互的npc key

			var proto = Network._instance.protoTypePool.CSelectedMasterAward.fromObject(messageObj);
			console.log("CSelectedMasterAward proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSelectedMasterAward.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSelectedMasterAward, buffer);
		}
		// CSelectedPrenticePassBook
		public c2s_selected_prentice_pass_book(prenticeid: number, itemkey: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.prenticeid = prenticeid;	//徒弟id
			messageObj.itemkey = itemkey;	//物品的bagkey

			var proto = Network._instance.protoTypePool.CSelectedPrenticePassBook.fromObject(messageObj);
			console.log("CSelectedPrenticePassBook proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSelectedPrenticePassBook.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSelectedPrenticePassBook, buffer);
		}
		// CEvaluateMasterResult
		public c2s_evaluate_master_result(result: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.result = result;	//选项id，1、2、3、4中的一项

			var proto = Network._instance.protoTypePool.CEvaluateMasterResult.fromObject(messageObj);
			console.log("CEvaluateMasterResult proto", proto);
			var buffer: any = Network._instance.protoTypePool.CEvaluateMasterResult.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CEvaluateMasterResult, buffer);
		}
		// SReceiveNewPrentice
		public c2s_receive_new_prentice(prenticeid: number, prenticename: string): void {
			let messageObj: any = {};
			//结构类型
			messageObj.prenticeid = prenticeid;	//徒弟id
			messageObj.prenticename = prenticename;	//徒弟名字

			var proto = Network._instance.protoTypePool.SReceiveNewPrentice.fromObject(messageObj);
			console.log("SReceiveNewPrentice proto", proto);
			var buffer: any = Network._instance.protoTypePool.SReceiveNewPrentice.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.SReceiveNewPrentice, buffer);
		}
		// CRequestAsMaster
		public c2s_request_as_master(prenticeid: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.prenticeid = prenticeid
			var proto = Network._instance.protoTypePool.CRequestAsMaster.fromObject(messageObj);
			console.log("CRequestAsMaster proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestAsMaster.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestAsMaster, buffer);
		}
		// CMasterRequestResult
		public c2s_master_request_result(masterid: number, result: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.masterid = masterid;
			messageObj.result = result;

			var proto = Network._instance.protoTypePool.CMasterRequestResult.fromObject(messageObj);
			console.log("CMasterRequestResult proto", proto);
			var buffer: any = Network._instance.protoTypePool.CMasterRequestResult.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CMasterRequestResult, buffer);
		}
		// CSendRequestWordToMaster
		public c2s_send_request_world_to_master(roleid: number, rolename: string): void {
			let messageObj: any = {};
			//结构类型
			messageObj.roleid = roleid;
			messageObj.rolename = rolename;

			var proto = Network._instance.protoTypePool.CSendRequestWordToMaster.fromObject(messageObj);
			console.log(" proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSendRequestWordToMaster.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSendRequestWordToMaster, buffer);
		}
		// CSendRequestWordToPrentice
		public c2s_send_request_world_to_prentice(roleid: number, requestword: string): void {
			let messageObj: any = {};
			//结构类型
			messageObj.roleid = roleid;
			messageObj.requestword = requestword;

			var proto = Network._instance.protoTypePool.CSendRequestWordToPrentice.fromObject(messageObj);
			console.log("CSendRequestWordToPrentice proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSendRequestWordToPrentice.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSendRequestWordToPrentice, buffer);
		}
		// CRequestMasterPrenticeList
		public c2s_request_master_prentice_list(): void {
			let messageObj: any = {};
			//结构类型

			var proto = Network._instance.protoTypePool.CRequestMasterPrenticeList.fromObject(messageObj);
			console.log("CRequestMasterPrenticeList proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestMasterPrenticeList.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestMasterPrenticeList, buffer);
		}
		// CRequestPrenticeOnLineState
		public c2s_request_prentice_on_line_state(roleid: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.roleid = roleid;

			var proto = Network._instance.protoTypePool.CRequestPrenticeOnLineState.fromObject(messageObj);
			console.log("CRequestPrenticeOnLineState proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestPrenticeOnLineState.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestPrenticeOnLineState, buffer);
		}
		// CRequestGiveMasterPrenticeTips
		public c2s_request_give_master_prentice_tips(): void {
			let messageObj: any = {};
			//结构类型

			var proto = Network._instance.protoTypePool.CRequestGiveMasterPrenticeTips.fromObject(messageObj);
			console.log("CRequestGiveMasterPrenticeTips proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestGiveMasterPrenticeTips.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestGiveMasterPrenticeTips, buffer);
		}
		// CEvaluate
		public c2s_evaluate(flag: number, roleId: number, result: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.flag = flag;	//1=对师傅评价 2=对徒弟的评价
			messageObj.roleId = roleId;	//要评价的人
			messageObj.result = result;	//评价

			var proto = Network._instance.protoTypePool.CEvaluate.fromObject(messageObj);
			console.log("CEvaluate proto", proto);
			var buffer: any = Network._instance.protoTypePool.CEvaluate.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CEvaluate, buffer);
		}
		// CDismissApprentce
		public c2s_dismiss_apprentce(roleid: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.roleid = roleid;

			var proto = Network._instance.protoTypePool.CDismissApprentce.fromObject(messageObj);
			console.log("CDismissApprentce proto", proto);
			var buffer: any = Network._instance.protoTypePool.CDismissApprentce.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CDismissApprentce, buffer);
		}
		// CDismissMaster
		public c2s_dismiss_master(): void {
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CDismissMaster.fromObject(messageObj);
			console.log("CDismissMaster proto", proto);
			var buffer: any = Network._instance.protoTypePool.CDismissMaster.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CDismissMaster, buffer);
		}
		// CReqApprences
		public c2s_req_apprences(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CReqApprences.fromObject(messageObj);
			console.log("CReqApprences proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqApprences.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqApprences, buffer);
		}
		// CTakeAchiveAward
		public c2s_task_achive_award(roleid: number, key: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.roleid = roleid;
			messageObj.key = key;

			var proto = Network._instance.protoTypePool.CTakeAchiveAward.fromObject(messageObj);
			console.log("CTakeAchiveAward proto", proto);
			var buffer: any = Network._instance.protoTypePool.CTakeAchiveAward.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CTakeAchiveAward, buffer);
		}
		// CAppMaster
		public c2s_app_master(flag: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.flag = flag;

			var proto = Network._instance.protoTypePool.CAppMaster.fromObject(messageObj);
			console.log("CAppMaster proto", proto);
			var buffer: any = Network._instance.protoTypePool.CAppMaster.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CAppMaster, buffer);
		}
		// CCommitMission
		public c2s_commit_mission(missionid: number, npckey: number, option: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(missionid);
			ByteArrayUtils.writeLong(npckey, byteArray);
			byteArray.writeInt32(option);
			this.sendMsg(ProtocolsEnum.CCommitMission, byteArray);
		}
		// CAnswerQuestion
		public c2s_answer_question(missionid: number, npckey: number, answerid: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.missionid = missionid;
			messageObj.npckey = npckey;
			messageObj.answerid = answerid;
			var proto = Network._instance.protoTypePool.CAnswerQuestion.fromObject(messageObj);
			console.log("CAnswerQuestion proto", proto);
			var buffer: any = Network._instance.protoTypePool.CAnswerQuestion.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CAnswerQuestion, buffer);
		}
		// CTrackMission
		public c2s_track_mission(missionid: number, track: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.missionid = missionid;
			messageObj.track = track;

			var proto = Network._instance.protoTypePool.CTrackMission.fromObject(messageObj);
			console.log("CTrackMission proto", proto);
			var buffer: any = Network._instance.protoTypePool.CTrackMission.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CTrackMission, buffer);
		}
		// CActiveMissionAIBattle
		// 激活任务AI战斗服务
		public c2s_active_mission_ai_battle(missionid: number, npckey: number, activetype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(missionid);
			ByteArrayUtils.writeLong(npckey, byteArray);
			byteArray.writeInt32(activetype);
			this.sendMsg(ProtocolsEnum.CActiveMissionAIBattle, byteArray);
		}
		// CAbsentFairyland
		public c2s_(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CAbsentFairyland.fromObject(messageObj);
			console.log("CAbsentFairyland proto", proto);
			var buffer: any = Network._instance.protoTypePool.CAbsentFairyland.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CAbsentFairyland, buffer);
		}
		// CReturnFairyland
		public c2s_return_fairyland(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CReturnFairyland.fromObject(messageObj);
			console.log("CReturnFairyland proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReturnFairyland.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReturnFairyland, buffer);
		}
		// CReqMissionCanAccept
		public c2s_req_mission_can_accept(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CReqMissionCanAccept.fromObject(messageObj);
			console.log("CReqMissionCanAccept proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqMissionCanAccept.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqMissionCanAccept, buffer);
		}
		// CMissionDialogEnd
		public c2s_mission_dialog_end(missionid: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.missionid = missionid;

			var proto = Network._instance.protoTypePool.CMissionDialogEnd.fromObject(messageObj);
			console.log("CMissionDialogEnd proto", proto);
			var buffer: any = Network._instance.protoTypePool.CMissionDialogEnd.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CMissionDialogEnd, buffer);
		}
		// CMissionReachScene
		public c2s_mission_reach_scene(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CMissionReachScene.fromObject(messageObj);
			console.log("CMissionReachScene proto", proto);
			var buffer: any = Network._instance.protoTypePool.CMissionReachScene.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CMissionReachScene, buffer);
		}
		// CReqLandTask
		public c2s_req_land_task(taskId: number, taskType: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.taskId = taskId;
			messageObj.taskType = taskType;

			var proto = Network._instance.protoTypePool.CReqLandTask.fromObject(messageObj);
			console.log("CReqLandTask proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqLandTask.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqLandTask, buffer);
		}
		// CAskLandTimes
		public c2s_ask_land_times(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CAskLandTimes.fromObject(messageObj);
			console.log("CAskLandTimes proto", proto);
			var buffer: any = Network._instance.protoTypePool.CAskLandTimes.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CAskLandTimes, buffer);
		}
		// CGetInstanceState
		public c2s_get_instance_state(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CGetInstanceState.fromObject(messageObj);
			console.log("CGetInstanceState proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetInstanceState.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetInstanceState, buffer);
		}
		// CGetLineState
		public c2s_get_line_state(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CGetLineState, byteArray);
		}
		// CReqLineTask
		public c2s_req_line_task(taskId: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(taskId);
			this.sendMsg(ProtocolsEnum.CReqLineTask, byteArray);
		}
		// CNotifyTeamMemeberSubmitItem
		public c2s_notify_team_memeber_submit_item(questid: number, npckey: number, submittype: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.questid = questid;
			messageObj.npckey = npckey;
			messageObj.submittype = submittype;
			var proto = Network._instance.protoTypePool.CNotifyTeamMemeberSubmitItem.fromObject(messageObj);
			console.log("CNotifyTeamMemeberSubmitItem proto", proto);
			var buffer: any = Network._instance.protoTypePool.CNotifyTeamMemeberSubmitItem.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CNotifyTeamMemeberSubmitItem, buffer);
		}
		// CRefreshActivityListFinishTimes
		public c2s_sRefresh_activity_list_finish_times(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CRefreshActivityListFinishTimes, byteArray);
		}
		// CDrawGiftBox
		public c2s_draw_gift_box(id: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeUint32(id);
			this.sendMsg(ProtocolsEnum.CDrawGiftBox, byteArray);
		}
		// CShareActivity
		public c2s_share_activity(activityId: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.activityId = activityId;

			var proto = Network._instance.protoTypePool.CShareActivity.fromObject(messageObj);
			console.log("CShareActivity proto", proto);
			var buffer: any = Network._instance.protoTypePool.CShareActivity.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CShareActivity, buffer);
		}
		// CReqGoto
		public c2s_req_goto(mapid: number, xpos: number, ypos: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(mapid);
			byteArray.writeInt32(xpos);
			byteArray.writeInt32(ypos);
			this.sendMsg(ProtocolsEnum.CReqGoto, byteArray);
		}
		// CReqJionActivity
		public c2s_req_jion_activity(activityType: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.activityType = activityType;

			var proto = Network._instance.protoTypePool.CReqJionActivity.fromObject(messageObj);
			console.log("CReqJionActivity proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqJionActivity.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqJionActivity, buffer);
		}
		// CAnsQuestion
		public c2s_ans_question(npckey: number, questionid: number, answer: number, flag: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.npckey = npckey;	//1=对师傅评价 2=对徒弟的评价
			messageObj.questionid = questionid;	//要评价的人
			messageObj.answer = answer;	//评价
			messageObj.flag = flag;

			var proto = Network._instance.protoTypePool.CAnsQuestion.fromObject(messageObj);
			console.log("CAnsQuestion proto", proto);
			var buffer: any = Network._instance.protoTypePool.CAnsQuestion.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CAnsQuestion, buffer);
		}
		// CUseTreasureMap
		public c2s_use_treasure_map(itemkey: number, maptype: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.itemkey = itemkey;
			messageObj.maptype = maptype;

			var proto = Network._instance.protoTypePool.CUseTreasureMap.fromObject(messageObj);
			console.log("CUseTreasureMap proto", proto);
			var buffer: any = Network._instance.protoTypePool.CUseTreasureMap.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CUseTreasureMap, buffer);
		}
		// CUseTreasureMapEnd
		public c2s_use_treasure_map_end(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CUseTreasureMapEnd.fromObject(messageObj);
			console.log("CUseTreasureMapEnd proto", proto);
			var buffer: any = Network._instance.protoTypePool.CUseTreasureMapEnd.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CUseTreasureMapEnd, buffer);
		}
		// CGetActivityInfo
		public c2s_sGet_activity_info(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CGetActivityInfo, byteArray);
		}
		// CAskIntoInstance
		public c2s_ask_into_instance(answer: number, insttype: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.answer = answer;
			messageObj.insttype = insttype;

			var proto = Network._instance.protoTypePool.CAskIntoInstance.fromObject(messageObj);
			console.log("CAskIntoInstance proto", proto);
			var buffer: any = Network._instance.protoTypePool.CAskIntoInstance.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CAskIntoInstance, buffer);
		}
		//CGetArchiveInfo
		public c2s_get_archive_info(): void {
			// let messageObj: any = {};
			// var proto = Network._instance.protoTypePool.CGetArchiveInfo.fromObject(messageObj);
			// console.log("CGetArchiveInfo proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CGetArchiveInfo.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CGetArchiveInfo, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CGetArchiveInfo, byteArray);
		}
		// CGetArchiveAward
		public c2s_get_archive_award(archiveId: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(archiveId);
			this.sendMsg(ProtocolsEnum.CGetArchiveAward, byteArray);
		}
		// CDropInstance
		public c2s_drop_instance(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CDropInstance, byteArray);
		}
		// <!--前尘旧梦章节战斗-->
		// CRequestChapterInfo
		public c2s_request_chapter_info(roleid: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.roleid = roleid;

			var proto = Network._instance.protoTypePool.CRequestChapterInfo.fromObject(messageObj);
			console.log("CRequestChapterInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestChapterInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestChapterInfo, buffer);
		}
		// CRequestChapterChallenge
		public c2s_request_chapter_challenge(chapterid: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.chapterid = chapterid;

			var proto = Network._instance.protoTypePool.CRequestChapterChallenge.fromObject(messageObj);
			console.log("CRequestChapterChallenge proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestChapterChallenge.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestChapterChallenge, buffer);
		}
		// CRespondChapterChallenge
		public c2s_respond_chapter_challenge(result: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.result = result;

			var proto = Network._instance.protoTypePool.CRespondChapterChallenge.fromObject(messageObj);
			console.log("CRespondChapterChallenge proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRespondChapterChallenge.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRespondChapterChallenge, buffer);
		}

		//move.xml
		// CRoleMove
		public c2s_role_move(srcPos: any, destPos: any, sceneID: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt16(srcPos.x * 16);
			byteArray.writeInt16(srcPos.y * 16.15);

			byteArray.writeInt16(destPos.x * 16);
			byteArray.writeInt16(destPos.y * 16.15);

			ByteArrayUtils.writeLong(sceneID, byteArray);
			// console.error('当前坐标-------------',srcPos.x  * 16,srcPos.y  * 16.15);
			// console.error('目标坐标-------------',destPos.x * 16,destPos.y * 16.15);
			let date = new Date();
			// console.error('当前时间==='+date.valueOf());
			this.sendMsg(ProtocolsEnum.CRoleMove, byteArray);
		}
		// CCheckMove
		public c2s_check_move(curPos: any, poslist: Array<any>, sceneID: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt16(curPos.x * 16);
			byteArray.writeInt16(curPos.y * 16.15);
			byteArray.writeByte(poslist.length);
			var index: number;
			var pos;
			for (index = 0; index < poslist.length; index++) {
				pos = poslist[index];
				byteArray.writeInt16(pos.x * 16);
				byteArray.writeInt16(pos.y * 16.15);
			}
			ByteArrayUtils.writeLong(sceneID, byteArray);
			this.sendMsg(ProtocolsEnum.CCheckMove, byteArray);
		}
		// CSendAutoMovePathID
		public c2s_send_auto_move_path_id(pathid: number, pathid2: number, pathid3: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.pathid = pathid;
			messageObj.pathid2 = pathid2;
			messageObj.pathid3 = pathid3;
			var proto = Network._instance.protoTypePool.CSendAutoMovePathID.fromObject(messageObj);
			console.log("CSendAutoMovePathID proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSendAutoMovePathID.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSendAutoMovePathID, buffer);
		}
		// CRoleTurn
		public c2s_role_turn(direction: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.direction = direction;

			var proto = Network._instance.protoTypePool.CRoleTurn.fromObject(messageObj);
			console.log("CRoleTurn proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRoleTurn.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRoleTurn, buffer);
		}
		// CRoleStop
		public c2s_role_stop(Poslist: Array<any>, pos: any, sceneid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeByte(Poslist.length);
			var index: number;
			var pos;
			for (index = 0; index < Poslist.length; index++) {
				pos = Poslist[index];
				byteArray.writeInt32(pos.x);
				byteArray.writeInt32(pos.y);
			}
			byteArray.writeInt16(pos.x * 16);
			byteArray.writeInt16(pos.y * 16);
			ByteArrayUtils.writeLong(sceneid, byteArray);
			this.sendMsg(ProtocolsEnum.CRoleStop, byteArray);
		}
		// CRelocateRolePos
		public c2s_relocate_role_pos(sceneId: number, curPos: any, locz: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.sceneId = sceneId;
			messageObj.curPos = curPos;
			messageObj.locz = locz;
			var proto = Network._instance.protoTypePool.CRelocateRolePos.fromObject(messageObj);
			console.log("CRelocateRolePos proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRelocateRolePos.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRelocateRolePos, buffer);
		}
		// CEnterDangerConfirm
		public c2s_enter_danger_confirm(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CEnterDangerConfirm.fromObject(messageObj);
			console.log("CEnterDangerConfirm proto", proto);
			var buffer: any = Network._instance.protoTypePool.CEnterDangerConfirm.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CEnterDangerConfirm, buffer);
		}
		// CGMGetAroundRoles
		public c2s_gm_get_around_roles(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CGMGetAroundRoles.fromObject(messageObj);
			console.log("CGMGetAroundRoles proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGMGetAroundRoles.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGMGetAroundRoles, buffer);
		}
		// CRoleJump
		public c2s_role_jump(Poslist: Array<any>, srcPos: any, destPos: any, jumptype: number, sceneID: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.Poslist = Poslist;	//1=对师傅评价 2=对徒弟的评价
			messageObj.srcPos = srcPos;	//要评价的人
			messageObj.destPos = destPos;	//评价
			messageObj.jumptype = jumptype;
			messageObj.sceneID = sceneID;

			var proto = Network._instance.protoTypePool.CRoleJump.fromObject(messageObj);
			console.log("CRoleJump proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRoleJump.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRoleJump, buffer);
		}
		// CRoleJumpStop
		public c2s_role_jump_stop(destPos: any, destz: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.destPos = destPos;
			messageObj.destz = destz;

			var proto = Network._instance.protoTypePool.CRoleJumpStop.fromObject(messageObj);
			console.log("CRoleJumpStop proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRoleJumpStop.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRoleJumpStop, buffer);
		}
		// CReqSeeEachOther
		public c2s_req_see_each_other(roleId: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.roleId = roleId;

			var proto = Network._instance.protoTypePool.CReqSeeEachOther.fromObject(messageObj);
			console.log("CReqSeeEachOther proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqSeeEachOther.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqSeeEachOther, buffer);
		}
		//npc.xml
		// CVisitNpc
		public c2s_visit_npc(npckey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(npckey, byteArray);
			this.sendMsg(ProtocolsEnum.CVisitNpc, byteArray);
		}
		// CNpcService
		public c2s_npc_service(npckey: any, serviceid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(npckey, byteArray);
			byteArray.writeInt32(serviceid);
			this.sendMsg(ProtocolsEnum.CNpcService, byteArray);
		}
		// CReqQuestion
		public c2s_req_question(npckey: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.npckey = npckey;

			var proto = Network._instance.protoTypePool.CReqQuestion.fromObject(messageObj);
			console.log("CReqQuestion proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqQuestion.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqQuestion, buffer);
		}
		// CFinishFortuneWheel
		public c2s_finish_fortune_wheel(npckey: number, serviceid: number): void {
			let messageObj: any = {};
			//结构类型
			messageObj.npckey = npckey;
			messageObj.serviceid = serviceid;

			var proto = Network._instance.protoTypePool.CFinishFortuneWheel.fromObject(messageObj);
			console.log("CFinishFortuneWheel proto", proto);
			var buffer: any = Network._instance.protoTypePool.CFinishFortuneWheel.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CFinishFortuneWheel, buffer);
		}
		// CSubmit2Npc
		public c2s_submit_2npc(questid: number, npckey: any, submittype: any, things: Array<game.modules.task.models.SubmitUnitVo>): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(questid);
			ByteArrayUtils.writeLong(npckey, byteArray);
			byteArray.writeInt32(submittype);
			byteArray.writeByte(things.length);
			var index: number;
			var SubmitUnitInfo;
			for (index = 0; index < things.length; index++) {
				SubmitUnitInfo = things[index];
				byteArray.writeInt32(SubmitUnitInfo.key);
				byteArray.writeInt32(SubmitUnitInfo.num);
			}
			this.sendMsg(ProtocolsEnum.CSubmit2Npc, byteArray);
		}
		// CDoneFortuneWheel
		public c2s_done_fortune_wheel(npckey: number, taskid: any, succ: any, flag: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeLong(npckey, byteArray);
			byteArray.writeInt32(taskid);
			byteArray.writeInt32(succ);
			byteArray.writeByte(flag);

			this.sendMsg(ProtocolsEnum.CDoneFortuneWheel, byteArray);
		}

		//客户端请求属性加点
		public c2s_CAddPointToAttr(cons: number, iq: number, str: number, agi: number, endu: number): void {
			// let messageObj: any = {};
			// messageObj.cons = cons;//体质
			// messageObj.iq = iq;//智力
			// messageObj.str = str;//力量
			// messageObj.agi = agi;//敏捷
			// messageObj.endu = endu;//耐力
			// var proto = Network._instance.protoTypePool.CAddPointToAttr.fromObject(messageObj);
			// console.log("CAddPointToAttr proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CAddPointToAttr.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CAddPointToAttr, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(cons);
			byteArray.writeInt32(iq);
			byteArray.writeInt32(str);
			byteArray.writeInt32(agi);
			byteArray.writeInt32(endu);
			this.sendMsg(ProtocolsEnum.CAddPointToAttr, byteArray);
		}

		//客户端请求属性加点
		public c2s_CResetSysConfig(sysconfigmap: any): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeByte(sysconfigmap.keys.length);
			// let sizeUint8Array: Uint8Array = ByteArrayUtils.compact_uint32(sysconfigmap.keys.length);
			// byteArray.writeUint8Array(sizeUint8Array);
			let keyArray: Array<any> = sysconfigmap.keys;
			for (let i = 0; i < sysconfigmap.keys.length; i++) {
				byteArray.writeInt32(keyArray[i]);
				byteArray.writeInt32(sysconfigmap.get(keyArray[i]));
			}

			this.sendMsg(ProtocolsEnum.CResetSysConfig, byteArray);

		}

		//客户端下线
		public c2s_CRoleOffline(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CRoleOffline, byteArray);
		}

		//客户端请求其他玩家的某个属性信息
		public c2s_CReqRoleProp(roleid: number, proptype: number): void {
			let messageObj: any = {};
			messageObj.roleid = roleid;
			messageObj.proptype = proptype;
			var proto = Network._instance.protoTypePool.CReqRoleProp.fromObject(messageObj);
			console.log("CReqRoleProp proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqRoleProp.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqRoleProp, buffer);
		}

		//
		public c2s_CEndPlayCG(id: number): void {
			let messageObj: any = {};
			messageObj.id = id;//动画的id
			var proto = Network._instance.protoTypePool.CEndPlayCG.fromObject(messageObj);
			console.log("CEndPlayCG proto", proto);
			var buffer: any = Network._instance.protoTypePool.CEndPlayCG.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CEndPlayCG, buffer);
		}

		//
		public c2s_CBeginnerTip(tipid: number): void {
			let messageObj: any = {};
			messageObj.tipid = tipid;// id为BeginnerTipType
			var proto = Network._instance.protoTypePool.CBeginnerTip.fromObject(messageObj);
			console.log("CBeginnerTip proto", proto);
			var buffer: any = Network._instance.protoTypePool.CBeginnerTip.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CBeginnerTip, buffer);
		}

		//
		public c2s_CBeginnerTipShowed(tipid: number): void {
			let messageObj: any = {};
			messageObj.tipid = tipid;// id为BeginnerTipType
			var proto = Network._instance.protoTypePool.CBeginnerTipShowed.fromObject(messageObj);
			console.log("CBeginnerTipShowed proto", proto);
			var buffer: any = Network._instance.protoTypePool.CBeginnerTipShowed.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CBeginnerTipShowed, buffer);
		}

		//客户端请求其他玩家的组队情况
		public c2s_CReqRoleTeamState(roleid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleid, byteArray);
			this.sendMsg(ProtocolsEnum.CReqRoleTeamState, byteArray);
		}

		//返回请求生成随机名字
		public c2s_CRequestName(sex: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeShort(sex);
			this.sendMsg(ProtocolsEnum.CRequestName, byteArray);
		}

		//客户端，人物选择界面："退出游戏"，"返回登录界面"，"返回服务器选择"；在排队中："取消排队
		public c2s_CUserOffline(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CUserOffline.fromObject(messageObj);
			console.log("CUserOffline proto", proto);
			var buffer: any = Network._instance.protoTypePool.CUserOffline.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CUserOffline, buffer);
		}

		//客户端请求返回登录界面
		public c2s_CReturnToLogin(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CReturnToLogin, byteArray);
		}

		//客户端使用千里寻踪蝶请求玩家坐标
		public c2s_CRequestRolePos(roleid: number, rolename: string, searchtype: number): void {
			let messageObj: any = {};
			messageObj.roleid = roleid; //玩家id
			messageObj.rolename = rolename; //玩家名
			messageObj.searchtype = searchtype;//查找类型
			var proto = Network._instance.protoTypePool.CRequestRolePos.fromObject(messageObj);
			console.log("CRequestRolePos proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestRolePos.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestRolePos, buffer);
		}

		//客户端通告服务器10分钟内ping值 1分钟一个PingStatEntry
		public c2s_CPingStat(beginstamp: number, pingstats: any, losspercent: number): void {
			let messageObj: any = {};
			messageObj.beginstamp = beginstamp;// 开始时间戳
			messageObj.pingstats = pingstats;// 10分钟内统计数据
			messageObj.losspercent = losspercent;// 丢包率（losspercent%100）
			var proto = Network._instance.protoTypePool.CPingStat.fromObject(messageObj);
			console.log("CPingStat proto", proto);
			var buffer: any = Network._instance.protoTypePool.CPingStat.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CPingStat, buffer);
		}

		//客户端进入场景完毕
		public c2s_CAfterEnterWorld(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CAfterEnterWorld, byteArray);
		}

		//客户端自动更改同屏显示人数
		public c2s_CSetMaxScreenShowNum(maxscreenshownum: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt16(maxscreenshownum);//同屏最大人数

			this.sendMsg(ProtocolsEnum.CSetMaxScreenShowNum, byteArray);
		}

		//客户端请求更改名字
		public c2s_CModifyRoleName(newName: string, itemkey: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeUtf16String(newName, byteArray);
			byteArray.writeInt32(itemkey);
			this.sendMsg(ProtocolsEnum.CModifyRoleName, byteArray);
		}

		//请求人物信息界面（主要是 几个积分以及大红大蓝的剩余量）
		public c2s_CReqRoleInfo(reqkey: number): void {
			// let messageObj: any = {};
			// messageObj.reqkey = reqkey;
			// var proto = Network._instance.protoTypePool.CReqRoleInfo.fromObject(messageObj);
			// console.log("CReqRoleInfo proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CReqRoleInfo.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CReqRoleInfo, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(reqkey);
			this.sendMsg(ProtocolsEnum.CReqRoleInfo, byteArray);
		}

		//客户端发送激活码给服务器
		public c2s_CSendSn(snStr: string): void {
			let messageObj: any = {};
			messageObj.snStr = snStr;
			var proto = Network._instance.protoTypePool.CSendSn.fromObject(messageObj);
			console.log("CSendSn proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSendSn.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSendSn, buffer);
		}

		//客户端发送充值请求给服务器
		public c2s_CReqChargeMoney(num: number, orderSnPlatform: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(num);
			ByteArrayUtils.writeUtf16String(orderSnPlatform, byteArray);

			this.sendMsg(ProtocolsEnum.CReqChargeMoney, byteArray);
		}

		//
		public c2s_CNotifyDeviceInfo(info: any): void {
			let messageObj: any = {};
			messageObj.info = info;
			var proto = Network._instance.protoTypePool.CNotifyDeviceInfo.fromObject(messageObj);
			console.log("CNotifyDeviceInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CNotifyDeviceInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CNotifyDeviceInfo, buffer);
		}

		//请求角色曾用名
		public c2s_CReqOldName(roleId: number): void {
			let messageObj: any = {};
			messageObj.roleId = roleId;//角色id
			var proto = Network._instance.protoTypePool.CReqOldName.fromObject(messageObj);
			console.log("CReqOldName proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqOldName.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqOldName, buffer);
		}

		//
		public c2s_CTeamVoteAgree(result: number): void {
			let messageObj: any = {};
			messageObj.result = result;//0=同意 1= 拒绝
			var proto = Network._instance.protoTypePool.CTeamVoteAgree.fromObject(messageObj);
			console.log("CTeamVoteAgree proto", proto);
			var buffer: any = Network._instance.protoTypePool.CTeamVoteAgree.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CTeamVoteAgree, buffer);
		}
		public c2s_CDefineTeam(answer: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt16(answer);
			this.sendMsg(ProtocolsEnum.CDefineTeam, byteArray);
		}

		//客户端请求修改系统设置
		public c2s_CGetSysConfig(sysconfigmap?: any): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			if (sysconfigmap == undefined || sysconfigmap == null) {
				sysconfigmap = new Laya.Dictionary();
				sysconfigmap.set(null, null);
			}
			console.log("---------c2s_CGetSysConfig size = ", sysconfigmap.keys.length);
			byteArray.writeByte(sysconfigmap.keys.length);
			let keyArray: Array<any> = sysconfigmap.keys;
			for (var i = 0; i < sysconfigmap.keys.length; i++) {
				byteArray.writeInt32(keyArray[i]);
				byteArray.writeInt32(sysconfigmap.get(keyArray[i]));
			}

			this.sendMsg(ProtocolsEnum.CGetSysConfig, byteArray);
		}

		//客户端请求切换加点方案
		public c2s_CChangePointScheme(schemeid: number): void {
			// let messageObj: any = {};
			// messageObj.schemeid = schemeid;//客户端请求切换加点方案
			// var proto = Network._instance.protoTypePool.CChangePointScheme.fromObject(messageObj);
			// console.log("CChangePointScheme proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CChangePointScheme.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CChangePointScheme, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(schemeid);
			this.sendMsg(ProtocolsEnum.CChangePointScheme, byteArray);
		}

		//客户端请求援助统计面板
		public c2s_CReqHelpCountView(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CReqHelpCountView, byteArray);
		}

		//请求人物染色衣橱信息
		public c2s_CReqColorRoomView(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CReqColorRoomView.fromObject(messageObj);
			console.log("CReqColorRoomView proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqColorRoomView.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqColorRoomView, buffer);
		}

		//删除衣柜配色方案
		public c2s_CReqDelColor(removeindex: number): void {
			let messageObj: any = {};
			messageObj.removeindex = removeindex;//删除索引
			var proto = Network._instance.protoTypePool.CReqDelColor.fromObject(messageObj);
			console.log("CReqDelColor proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqDelColor.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqDelColor, buffer);
		}

		//使用染色
		public c2s_CReqUseColor(rolecolorinfo: any): void {
			let messageObj: any = {};
			messageObj.rolecolorinfo = rolecolorinfo;//染色信息
			var proto = Network._instance.protoTypePool.CReqUseColor.fromObject(messageObj);
			console.log("CReqUseColor proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqUseColor.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqUseColor, buffer);
		}

		//请求人物切换加点方案次数
		public c2s_CReqPointSchemeTime(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CReqPointSchemeTime, byteArray);
		}

		//
		public c2s_CReqUsePetColor(petkey: number, colorpos1: number, colorpos2: number): void {
			let messageObj: any = {};
			messageObj.petkey = petkey;//宠物ID
			messageObj.colorpos1 = colorpos1;//部位1
			messageObj.colorpos2 = colorpos2;//部位2
			var proto = Network._instance.protoTypePool.CReqUsePetColor.fromObject(messageObj);
			console.log("CReqUsePetColor proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqUsePetColor.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqUsePetColor, buffer);
		}

		//设置适配引导类型
		public c2s_CSetPilotType(pilotType: number): void {
			let messageObj: any = {};
			messageObj.pilotType = pilotType;//适配引导类型  0新手 1老手
			var proto = Network._instance.protoTypePool.CSetPilotType.fromObject(messageObj);
			console.log("CSetPilotType proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSetPilotType.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSetPilotType, buffer);
		}

		//援助声望当前值
		public c2s_CSendHelpSW(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CSendHelpSW, byteArray);
		}

		//取服务器时间
		public c2s_CGameTime(): void {
			// let messageObj: any = {};
			// var proto = Network._instance.protoTypePool.CGameTime.fromObject(messageObj);
			// console.log("CGameTime proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CGameTime.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CGameTime, buffer);

			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CGameTime, byteArray);
		}

		//踢人
		public c2s_CKick(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CKick.fromObject(messageObj);
			console.log("CKick proto", proto);
			var buffer: any = Network._instance.protoTypePool.CKick.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CKick, buffer);
		}

		//
		public c2s_CSetLineConfig(configmap: any): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			var sizeUint8Array = ByteArrayUtils.compact_uint32(configmap.keys.length);
			byteArray.writeUint8Array(sizeUint8Array);
			let dic = new Laya.Dictionary();
			dic = configmap;
			let keyArray: Array<any> = dic.keys;
			for (let i = 0; i < keyArray.length; i++) {
				byteArray.writeInt32(keyArray[i]);
				byteArray.writeInt32(dic.get(keyArray[i]));
			}

			this.sendMsg(ProtocolsEnum.CSetLineConfig, byteArray);
		}

		//得到验证码
		public c2s_CGetCheckCode(tel: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(tel, byteArray);
			this.sendMsg(ProtocolsEnum.CGetCheckCode, byteArray);
		}

		//确认关联手机
		public c2s_CBindTel(tel: number, code: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(tel, byteArray);
			ByteArrayUtils.writeUtf16String(code, byteArray);
			this.sendMsg(ProtocolsEnum.CBindTel, byteArray);
		}

		//解除关联手机
		public c2s_CUnBindTel(tel: number, code: string): void {
			let messageObj: any = {};
			messageObj.tel = tel;
			messageObj.code = code;
			var proto = Network._instance.protoTypePool.CUnBindTel.fromObject(messageObj);
			console.log("CUnBindTel proto", proto);
			var buffer: any = Network._instance.protoTypePool.CUnBindTel.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CUnBindTel, buffer);
		}
		//得到关联手机信息
		public c2s_CGetBindTel(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CGetBindTel, byteArray);
		}
		//领取绑定手机奖励
		public c2s_CGetBindTelAward(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CGetBindTelAward, byteArray);
		}

		//<!-- 道具安全锁 -->设置密码
		public c2s_CSetPassword(initPd: string, repeatPd: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeUtf16String(initPd, byteArray);//初始密码
			ByteArrayUtils.writeUtf16String(repeatPd, byteArray);//重复密码

			this.sendMsg(ProtocolsEnum.CSetPassword, byteArray);
		}

		//重新设置密码
		public c2s_CResetPassword(initPd: string, newtPd: string, repeatPd: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeUtf16String(initPd, byteArray);//初始密码
			ByteArrayUtils.writeUtf16String(newtPd, byteArray);//新密码
			ByteArrayUtils.writeUtf16String(repeatPd, byteArray);//重复密码

			this.sendMsg(ProtocolsEnum.CResetPassword, byteArray);
		}

		//解除安全锁
		public c2s_CDelPassword(initPd: string, repeatPd: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeUtf16String(initPd, byteArray);//初始密码
			ByteArrayUtils.writeUtf16String(repeatPd, byteArray);//重复密码

			this.sendMsg(ProtocolsEnum.CDelPassword, byteArray);
		}

		//强制解除安全锁
		public c2s_CForceDelPassword(code: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeUtf16String(code, byteArray);//验证码

			this.sendMsg(ProtocolsEnum.CForceDelPassword, byteArray);
		}

		//取消强制解除安全锁
		public c2s_CCancelForceDelPassword(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CCancelForceDelPassword, byteArray);
		}

		//开启安全锁状态
		public c2s_COpenGoodLocks(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.COpenGoodLocks, byteArray);
		}

		//关闭安全锁状态
		public c2s_CCloseGoodLocks(password: string, closeType: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeUtf16String(password, byteArray);//道具安全锁密码
			byteArray.writeInt32(closeType);//关闭类型

			this.sendMsg(ProtocolsEnum.CCloseGoodLocks, byteArray);
		}

		//得到道具安全锁信息
		public c2s_CGetGoodLocksInfo(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CGetGoodLocksInfo, byteArray);
		}

		//道具输入密码解锁
		public c2s_CGoodUnLock(password: string): void {
			let messageObj: any = {};
			messageObj.password = password;//安全锁密码
			var proto = Network._instance.protoTypePool.CGoodUnLock.fromObject(messageObj);
			console.log("CGoodUnLock proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGoodUnLock.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGoodUnLock, buffer);
		}

		//通知强制解锁到期
		public c2s_CForceUnlockTimeExpire(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CForceUnlockTimeExpire.fromObject(messageObj);
			console.log("CForceUnlockTimeExpire proto", proto);
			var buffer: any = Network._instance.protoTypePool.CForceUnlockTimeExpire.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CForceUnlockTimeExpire, buffer);
		}

		//<!-- 发送短信验证 -->得到验证码
		public c2s_CReceiveCheckCode(checkCodeType: number): void {
			let messageObj: any = {};
			messageObj.checkCodeType = checkCodeType;//2 道具安全锁 3藏宝阁
			var proto = Network._instance.protoTypePool.CReceiveCheckCode.fromObject(messageObj);
			console.log("CReceiveCheckCode proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReceiveCheckCode.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReceiveCheckCode, buffer);
		}

		//<!-- 藏宝阁上架短信验证 -->藏宝阁发送验证码
		public c2s_CSendCBGCheckCode(code: string): void {
			let messageObj: any = {};
			messageObj.code = code;//验证码
			var proto = Network._instance.protoTypePool.CSendCBGCheckCode.fromObject(messageObj);
			console.log("CSendCBGCheckCode proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSendCBGCheckCode.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSendCBGCheckCode, buffer);
		}

		//
		public c2s_CGetPetEquipInfo(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CGetPetEquipInfo, byteArray);
		}


		//ljmm
		public c2s_CCheck_GM(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CCheckGM.fromObject(messageObj);
			var buffer: any = Network._instance.protoTypePool.CCheckGM.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CCheckGM, buffer);
		}
		//我的伙伴的key
		public c2s_CGetHuoban_DetailInfo(huobanId: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(huobanId);
			this.sendMsg(ProtocolsEnum.CGetHuobanDetailInfo, byteArray);
		}
		//c2s_CSwitch_Zhenrong
		public c2s_CSwitch_Zhenrong(zhenrongid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(zhenrongid);
			this.sendMsg(ProtocolsEnum.CSwitchZhenrong, byteArray);
		}
		//CZhenrongMember
		public c2s_CZhenrong_Member(zhenrongid: number, members: any): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(zhenrongid);
			byteArray.writeByte(members.length);
			var index: number;
			for (index = 0; index < members.length; index++) {
				byteArray.writeInt32(members[index]);
			}
			this.sendMsg(ProtocolsEnum.CZhenrongMember, byteArray);
		}
		//<!--解锁伙伴请求-->
		public c2s_CActive_HuoBan(huobanId: number, activeType: number, activeTime: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(huobanId);
			byteArray.writeInt32(activeType);
			byteArray.writeInt32(activeTime);
			this.sendMsg(ProtocolsEnum.CActiveHuoBan, byteArray);
		}
		//<!-- 改变阵容的光环-->
		public c2s_CSwitch_Zhenfa(zhenrongid: number, zhenfaid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(zhenrongid);
			byteArray.writeInt32(zhenfaid);

			this.sendMsg(ProtocolsEnum.CSwitchZhenfa, byteArray);
		}
		//<!-- 获取伙伴信息列表-->
		public c2s_CGet_HuoBanList(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CGetHuoBanList, byteArray);
		}
		//<!-- 请求进入冰封王座副本-->
		public c2s_CEnter_BingFengLand(landId: number, stage: number): void {
			let messageObj: any = {};
			messageObj.landId = landId; //根据配置表里的数据,比如40级冰封王座是1,50级冰封王座是2
			messageObj.stage = stage;//第几步
			var proto = Network._instance.protoTypePool.CEnterBingFengLand.fromObject(messageObj);
			console.log("CEnterBingFengLand proto", proto);
			var buffer: any = Network._instance.protoTypePool.CEnterBingFengLand.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CEnterBingFengLand, buffer);
		}
		//<!-- 请求离开冰封王座副本-->
		public c2s_CLeave_BingFengLand(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CLeaveBingFengLand.fromObject(messageObj);
			console.log("CLeaveBingFengLand proto", proto);
			var buffer: any = Network._instance.protoTypePool.CLeaveBingFengLand.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CLeaveBingFengLand, buffer);
		}
		//<!-- 客户端请求打开冰封王座的界面-->
		public c2s_CReqBingFeng_Rank(npckey: number, landId: number): void {
			let messageObj: any = {};
			messageObj.npckey = npckey; //
			messageObj.landId = landId;//根据配置表里的数据,比如40级冰封王座是1,50级冰封王座是2
			var proto = Network._instance.protoTypePool.CReqBingFengRank.fromObject(messageObj);
			console.log("CReqBingFengRank proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqBingFengRank.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqBingFengRank, buffer);
		}
		//客户端请求打开冰封王座的界面
		public c2s_CCanEnter_BingFeng(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CCanEnterBingFeng, byteArray);
		}
		//<!-- 获取该关卡最快通关信息-->
		public c2s_CGetBingFeng_Detail(npckey: number, stage: number): void {
			let messageObj: any = {};
			messageObj.npckey = npckey; //
			messageObj.stage = stage;//根据配置表里的数据,比如40级冰封王座是1,50级冰封王座是2
			var proto = Network._instance.protoTypePool.CGetBingFengDetail.fromObject(messageObj);
			console.log("CGetBingFengDetail proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetBingFengDetail.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetBingFengDetail, buffer);
		}
		//<!-- 机器人发送战斗信息-->
		public c2s_CBattleto_BingFeng(roleid: number, npcid: number): void {
			let messageObj: any = {};
			messageObj.roleid = roleid; //
			messageObj.npcid = npcid;//根据配置表里的数据,比如40级冰封王座是1,50级冰封王座是2
			var proto = Network._instance.protoTypePool.CBattletoBingFeng.fromObject(messageObj);
			console.log("CBattletoBingFeng proto", proto);
			var buffer: any = Network._instance.protoTypePool.CBattletoBingFeng.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CBattletoBingFeng, buffer);
		}

		//<!-- 物品失效 -->
		public c2s_CItemLose_Effect(packid: number, itemkey: number): void {
			let messageObj: any = {};
			messageObj.packid = packid; //
			messageObj.itemkey = itemkey;//
			var proto = Network._instance.protoTypePool.CItemLoseEffect.fromObject(messageObj);
			console.log("CItemLoseEffect proto", proto);
			var buffer: any = Network._instance.protoTypePool.CItemLoseEffect.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CItemLoseEffect, buffer);
		}
		//<!-- CGetPackInfo -->
		public c2s_CGetPack_Info(packid: number, npcid: number): void {
			let messageObj: any = {};
			messageObj.packid = packid; //
			messageObj.npcid = npcid;//
			var proto = Network._instance.protoTypePool.CGetPackInfo.fromObject(messageObj);
			console.log("CGetPackInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetPackInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetPackInfo, buffer);
		}
		//<!-- CListPack -->
		public c2s_CList_Pack(packid: number, npcid: number): void {
			// let messageObj:any = {};
			// messageObj.packid = packid; //
			// messageObj.npcid = npcid;//
			// var proto = Network._instance.protoTypePool.CListPack.fromObject(messageObj);
			// console.log("CListPack proto",proto);
			// var buffer:any = Network._instance.protoTypePool.CListPack.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CListPack, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(packid);
			ByteArrayUtils.writeLong(npcid, byteArray);
			this.sendMsg(ProtocolsEnum.CListPack, byteArray);

		}
		//<!-- CPutOnEquip -->
		public c2s_CPutOn_Equip(packkey: number, dstPos: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(packkey);
			byteArray.writeInt32(dstPos);
			this.sendMsg(ProtocolsEnum.CPutOnEquip, byteArray);
		}

		//<!-- CTakeOffEquip -->
		public c2s_CTakeOff_Equip(equipkey: number, posinpack: number): void {

			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(equipkey);
			byteArray.writeInt32(posinpack);
			this.sendMsg(ProtocolsEnum.CTakeOffEquip, byteArray);


		}
		//<!-- CTransItem -->
		public c2s_CTrans_Item(srcpackid: number, srckey: number, number: number, dstpackid: number, dstpos: number, page: number, npcid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(srcpackid); //背包id
			byteArray.writeInt32(srckey); //物品的Key
			byteArray.writeInt32(number); //数量
			byteArray.writeInt32(dstpackid); // 1为放入背包，2为放入仓库
			byteArray.writeInt32(dstpos);   //仓库的位置 -1
			byteArray.writeInt32(page);     //仓库的id
			ByteArrayUtils.writeLong(npcid, byteArray); // -1
			this.sendMsg(ProtocolsEnum.CTransItem, byteArray);
		}
		//<!-- CDropItem -->
		public c2s_CDrop_Item(packid: number, keyinpack: number, npcid: number): void {
			let bytearray: ByteArray = new ByteArray();
			bytearray.endian = Laya.Byte.BIG_ENDIAN;
			bytearray.writeInt32(packid);
			bytearray.writeInt32(keyinpack);
			bytearray.writeInt32(npcid);
			this.sendMsg(ProtocolsEnum.CDropItem, bytearray);
		}
		//<!-- CPutOnPetEquip -->
		public c2s_CPutOnPet_Equip(packkey: number, petkey: number, dstPos: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(packkey);
			byteArray.writeInt32(petkey);
			byteArray.writeInt32(dstPos);
			this.sendMsg(ProtocolsEnum.CPutOnPetEquip, byteArray);
		}
		//<!-- CTakeOffPetEquip -->
		public c2s_CTakeOffPet_Equip(equipkey: number, petkey: number, posinpack: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(equipkey);
			byteArray.writeInt32(petkey);
			byteArray.writeInt32(posinpack);
			this.sendMsg(ProtocolsEnum.CTakeOffPetEquip, byteArray);
		}
		//<!-- CGetItemTips -->
		public c2s_CGetItem_Tips(packid: number, keyinpack: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(packid);
			byteArray.writeInt32(keyinpack);
			this.sendMsg(ProtocolsEnum.CGetItemTips, byteArray);
		}
		//<!-- CAppendItem -->
		public c2s_CAppend_Item(keyinpack: number, idtype: number, id: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(keyinpack);
			byteArray.writeInt32(idtype);
			ByteArrayUtils.writeLong(id, byteArray);
			this.sendMsg(ProtocolsEnum.CAppendItem, byteArray);
		}
		//<!-- CGetPetEquipTips -->
		public c2s_CGetPetEquip_Tips(petkey: number, keyinpack: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(petkey);
			byteArray.writeInt32(keyinpack);
			this.sendMsg(ProtocolsEnum.CGetPetEquipTips, byteArray);
			// this.sendMsg(ProtocolsEnum.CGetPetEquipTips, byteArray);
		}
		//<!-- CCleanTempPack -->
		public c2s_CCleanTemp_Pack(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CCleanTempPack.fromObject(messageObj);
			console.log("CCleanTempPack proto", proto);
			var buffer: any = Network._instance.protoTypePool.CCleanTempPack.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CCleanTempPack, buffer);
		}

		//<!-- CXiuLiEquipItem -->
		public c2s_CXiuLiEquip_Item(repairtype: number, packid: number, keyinpack: number): void {
			// let messageObj:any = {};
			// messageObj.repairtype = repairtype; //
			// messageObj.packid = packid;//
			// messageObj.keyinpack = keyinpack;//
			// var proto = Network._instance.protoTypePool.CXiuLiEquipItem.fromObject(messageObj);
			// console.log("CXiuLiEquipItem proto",proto);
			// var buffer:any = Network._instance.protoTypePool.CXiuLiEquipItem.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CXiuLiEquipItem, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(repairtype);
			byteArray.writeInt32(packid);
			byteArray.writeInt32(keyinpack);
			this.sendMsg(ProtocolsEnum.CXiuLiEquipItem, byteArray);
		}
		//<!-- CGetRoleEquip -->
		public c2s_CGetRole_Equip(roleid: number, sendmsg: number): void {
			let messageObj: any = {};
			messageObj.roleid = roleid; //
			messageObj.sendmsg = sendmsg;//
			var proto = Network._instance.protoTypePool.CGetRoleEquip.fromObject(messageObj);
			console.log("CGetRoleEquip proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetRoleEquip.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetRoleEquip, buffer);
		}
		//<!-- CGetRolePetInfo -->
		public c2s_CGetRolePet_Info(roleid: number): void {
			let byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleid, byte);
			this.sendMsg(ProtocolsEnum.CGetRolePetInfo, byte);
		}
		//<!-- CGetRoleEquip -->
		public c2s_CGetRoleEquip(roleid: number, sendmsg: number): void {
			let byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleid, byte);
			byte.writeByte(sendmsg);
			this.sendMsg(ProtocolsEnum.CGetRoleEquip, byte);
		}
		//<!-- CAttachGem -->
		public c2s_CAttach_Gem(keyinpack: number, packid: number, gemkey: number): void {
			// let messageObj:any = {};
			// messageObj.keyinpack = keyinpack; //
			// messageObj.packid = packid; //
			// messageObj.gemkey = gemkey; //
			// var proto = Network._instance.protoTypePool.CAttachGem.fromObject(messageObj);
			// console.log("CAttachGem proto",proto);
			// var buffer:any = Network._instance.protoTypePool.CAttachGem.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CAttachGem, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(keyinpack);
			byteArray.writeByte(packid);
			byteArray.writeInt32(gemkey);
			this.sendMsg(ProtocolsEnum.CAttachGem, byteArray);
		}
		public c2s_CGetTime_Award(awardid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeUint32(awardid);
			this.sendMsg(ProtocolsEnum.CGetTimeAward, byteArray);
		}
		//<!-- CGetEquipTips -->
		public c2s_CGetEquip_Tips(packid: number, keyinpack: number, key2inpack: number): void {
			let messageObj: any = {};
			messageObj.packid = packid; //
			messageObj.keyinpack = keyinpack; //
			messageObj.key2inpack = key2inpack; //
			var proto = Network._instance.protoTypePool.CGetEquipTips.fromObject(messageObj);
			console.log("CGetEquipTips proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetEquipTips.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetEquipTips, buffer);
		}
		//<!-- CReqAllNaiJiu -->
		public c2s_CReqAll_NaiJiu(packid: number): void {
			let messageObj: any = {};
			messageObj.packid = packid; //
			var proto = Network._instance.protoTypePool.CReqAllNaiJiu.fromObject(messageObj);
			console.log("CReqAllNaiJiu proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqAllNaiJiu.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqAllNaiJiu, buffer);
		}
		//<!--打开道具背包 COpenItemBag -->
		public c2s_COpenItem_Bag(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.COpenItemBag.fromObject(messageObj);
			console.log("COpenItemBag proto", proto);
			var buffer: any = Network._instance.protoTypePool.COpenItemBag.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.COpenItemBag, buffer);
		}
		//<!-- CHeChengItem -->
		public c2s_CHeCheng_Item(money: number, isall: number, hammer: number, keyinpack: number): void {
			let messageObj: any = {};
			messageObj.money = money; //
			messageObj.isall = isall; //
			messageObj.hammer = hammer; //
			messageObj.keyinpack = keyinpack; //
			var proto = Network._instance.protoTypePool.CHeChengItem.fromObject(messageObj);
			console.log("CHeChengItem proto", proto);
			var buffer: any = Network._instance.protoTypePool.CHeChengItem.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CHeChengItem, buffer);
		}
		//<!-- CHeChengPetEquip -->
		public c2s_CHeChengPet_Equip(keyinpack1: number, keyinpack2: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(keyinpack1);
			byteArray.writeInt32(keyinpack2);
			this.sendMsg(ProtocolsEnum.CHeChengPetEquip, byteArray);
		}
		//<!-- CMailRead -->
		public c2s_CMailRead(kind: number, id: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeByte(kind);
			ByteArrayUtils.writeLong(id, byteArray);
			this.sendMsg(ProtocolsEnum.CMailRead, byteArray);
		}
		//<!-- CMailGetAward -->
		public c2s_CMailGet_Award(kind: number, id: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeByte(kind);
			ByteArrayUtils.writeLong(id, byteArray);
			this.sendMsg(ProtocolsEnum.CMailGetAward, byteArray);
		}
		//<!-- CDelGem -->
		public c2s_CDel_Gem(keyinpack: number, isequip: number, gempos: number): void {
			// let messageObj:any = {};
			// messageObj.keyinpack = keyinpack; //类型 0=定时邮件 1=GM邮件
			// messageObj.isequip = isequip; //id
			// messageObj.gempos =gempos; //id
			// var proto = Network._instance.protoTypePool.CDelGem.fromObject(messageObj);
			// console.log("CDelGem proto",proto);
			// var buffer:any = Network._instance.protoTypePool.CDelGem.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CDelGem, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(keyinpack);
			byteArray.writeByte(isequip);
			byteArray.writeInt32(gempos);
			this.sendMsg(ProtocolsEnum.CDelGem, byteArray);
		}
		//<!-- CGetRoleInfo -->
		public c2s_CGetRole_Info(roleid: number): void {
			let messageObj: any = {};
			messageObj.roleid = roleid; //
			var proto = Network._instance.protoTypePool.CGetRoleInfo.fromObject(messageObj);
			console.log("CGetRoleInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetRoleInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetRoleInfo, buffer);
		}
		public c2s_CGetMulDayLogin_Gift(rewardid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeByte(rewardid);
			this.sendMsg(ProtocolsEnum.CGetMulDayLoginGift, byteArray);
		}

		// CExtPackSize
		public c2s_CExtpack_Size(packid: number): void {
			// let messageObj:any = {};
			// messageObj.packid = packid; //
			// var proto = Network._instance.protoTypePool.CExtPackSize.fromObject(messageObj);
			// console.log("CExtPackSize proto",proto);
			// var buffer:any = Network._instance.protoTypePool.CExtPackSize.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CExtPackSize, buffer);

			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(packid);
			this.sendMsg(ProtocolsEnum.CExtPackSize, byteArray);
		}
		//<!-- COpenPack -->
		public c2s_COpen_Pack(packid: number): void {
			let messageObj: any = {};
			messageObj.packid = packid; //
			var proto = Network._instance.protoTypePool.COpenPack.fromObject(messageObj);
			console.log("COpenPack proto", proto);
			var buffer: any = Network._instance.protoTypePool.COpenPack.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.COpenPack, buffer);
		}
		//<!-- CBuyPackMoney -->
		public c2s_CBuyPack_Money(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CBuyPackMoney.fromObject(messageObj);
			console.log("CBuyPackMoney proto", proto);
			var buffer: any = Network._instance.protoTypePool.CBuyPackMoney.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CBuyPackMoney, buffer);
		}

		//<!--客户端申请替换宝石 CReplaceGemFromEquip -->
		public c2s_CReplaceGemFrom_Equip(equipItemkey: number, equipBag: number, gemIndex: number, gemItemkey: number): void {
			// let messageObj: any = {};
			// messageObj.equipItemkey = equipItemkey; //装备的keyinpack
			// messageObj.equipBag = equipBag; //为0为背包栏，为1为装备栏
			// messageObj.gemIndex = gemIndex; //宝石槽索引
			// messageObj.gemItemkey = gemItemkey; //宝石的keyinpack,成功后扣除指定的这颗宝石
			// var proto = Network._instance.protoTypePool.CReplaceGemFromEquip.fromObject(messageObj);
			// console.log("CReplaceGemFromEquip proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CReplaceGemFromEquip.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CReplaceGemFromEquip, buffer);
			let byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			byte.writeInt32(equipItemkey);
			byte.writeByte(equipBag);
			byte.writeInt32(gemIndex);
			byte.writeInt32(gemItemkey);
			this.sendMsg(ProtocolsEnum.CReplaceGemFromEquip, byte);
		}
		//<!--一键把物品从临时背包移动到背包 COneKeyMoveTempToBag -->
		public c2s_COneKeyMoveTempTo_Bag(srckey: number, number: number, dstpos: number, npcid: number): void {
			let byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			byte.writeInt32(srckey);
			byte.writeInt32(number);
			byte.writeInt32(dstpos);
			ByteArrayUtils.writeLong(npcid, byte);
			this.sendMsg(ProtocolsEnum.COneKeyMoveTempToBag, byte);
		}
		//<!-- CListDepot -->
		public c2s_CList_Depot(pageid: number): void {
			// let messageObj:any = {};
			// messageObj.pageid = pageid; //仓库的页数
			// var proto = Network._instance.protoTypePool.CListDepot.fromObject(messageObj);
			// console.log("CListDepot proto",proto);
			// var buffer:any = Network._instance.protoTypePool.CListDepot.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CListDepot, buffer);

			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(pageid);
			this.sendMsg(ProtocolsEnum.CListDepot, byteArray);
		}

		//<!--宝石替换 CReplaceGem -->
		public c2s_CReplace_Gem(ret: number, srckey: number, deskey: number): void {
			let messageObj: any = {};
			messageObj.ret = ret; //0 表示不替换;1 表示替换
			messageObj.srckey = srckey; //在背包栏里源装备的key
			messageObj.deskey = deskey; //在装备栏里目标装备的key
			var proto = Network._instance.protoTypePool.CReplaceGem.fromObject(messageObj);
			console.log("CReplaceGem proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReplaceGem.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReplaceGem, buffer);
		}

		//<!--摆摊Tip请求 COtherItemTips -->
		public c2s_COtherItem_Tips(roleid: number, packid: number, keyinpack: number): void {
			// let messageObj: any = {};
			// messageObj.roleid = roleid; //目标玩家的id
			// messageObj.packid = packid; //
			// messageObj.keyinpack = keyinpack; //
			// var proto = Network._instance.protoTypePool.COtherItemTips.fromObject(messageObj);
			// console.log("COtherItemTips proto", proto);
			// var buffer: any = Network._instance.protoTypePool.COtherItemTips.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.COtherItemTips, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeLong(roleid, byteArray);
			byteArray.writeInt32(packid);
			byteArray.writeInt32(keyinpack);
			this.sendMsg(ProtocolsEnum.COtherItemTips, byteArray);
		}
		//<!-- CGetDepotInfo -->
		public c2s_CGetDepot_Info(pageid: number): void {
			// let messageObj:any = {};
			// messageObj.pageid = pageid; //从1开始
			// var proto = Network._instance.protoTypePool.CGetDepotInfo.fromObject(messageObj);
			// console.log("CGetDepotInfo proto",proto);
			// var buffer:any = Network._instance.protoTypePool.CGetDepotInfo.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CGetDepotInfo, buffer);

			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(pageid);
			this.sendMsg(ProtocolsEnum.CGetDepotInfo, byteArray);
		}

		//<!--修改仓库名称 CModifyDepotName -->
		public c2s_CModifyDepot_Name(depotIndex: number, depotName: string): void {
			// let messageObj:any = {};
			// messageObj.depotIndex = depotIndex; //目标玩家的id
			// messageObj.depotName = depotName; //
			// var proto = Network._instance.protoTypePool.CModifyDepotName.fromObject(messageObj);
			// console.log("CModifyDepotName proto",proto);
			// var buffer:any = Network._instance.protoTypePool.CModifyDepotName.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CModifyDepotName, buffer);

			// CModifyDepot
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Endian.BIG_ENDIAN;
			byteArray.writeInt32(depotIndex);
			ByteArrayUtils.writeUtf16String(depotName, byteArray);
			this.sendMsg(ProtocolsEnum.CModifyDepotName, byteArray);
		}
		//<!--合成宝石 CComposeGem -->
		public c2s_CCompose_Gem(bUseRongHeJi: number, targetGemItemId: number, bagGems: any, shopGems: any): void {
			// let messageObj:any = {};
			// messageObj.bUseRongHeJi = bUseRongHeJi; //是否使用融合剂 0:不使用 1:使用
			// messageObj.targetGemItemId = targetGemItemId; //合成宝石的ID
			// messageObj.bagGems = bagGems; //使用的背包宝石
			// messageObj.shopGems = shopGems; //使用的商店宝石
			// var proto = Network._instance.protoTypePool.CComposeGem.fromObject(messageObj);
			// console.log("CComposeGem proto",proto);
			// var buffer:any = Network._instance.protoTypePool.CComposeGem.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CComposeGem, buffer);

			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeByte(bUseRongHeJi);
			byteArray.writeInt32(targetGemItemId);
			byteArray.writeByte(bagGems.length);
			var index: number;
			var composeGemInfoBean;
			for (index = 0; index < bagGems.length; index++) {
				composeGemInfoBean = bagGems[index];
				byteArray.writeInt32(composeGemInfoBean.itemIdOrGoodId);
				byteArray.writeInt32(composeGemInfoBean.num);
			}
			byteArray.writeByte(shopGems.length);
			for (index = 0; index < shopGems.length; index++) {
				composeGemInfoBean = shopGems[index];
				byteArray.writeInt32(composeGemInfoBean.itemIdOrGoodId);
				byteArray.writeInt32(composeGemInfoBean.num);
			}
			this.sendMsg(ProtocolsEnum.CComposeGem, byteArray);

		}
		//<!--客户端请求道具找回列表 CItemRecoverList -->
		public c2s_CItemRecover_List(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CItemRecoverList, byteArray);
		}
		//<!--客户端请求道具找回 CItemRecover -->
		public c2s_CItem_Recover(uniqId: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(uniqId, byteArray);
			this.sendMsg(ProtocolsEnum.CItemRecover, byteArray);
		}
		//<!--客户端请求查看一个找回道具的信息 CRecoverItemInfo -->
		public c2s_CRecoverItem_Info(uniqId: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(uniqId, byteArray);
			this.sendMsg(ProtocolsEnum.CRecoverItemInfo, byteArray);
		}
		//<!--洗基础属性 CRefineEquipBase -->
		public c2s_CRefineEquip_Base(packid: number, keyinpack: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(packid);
			byteArray.writeInt32(keyinpack);
			this.sendMsg(ProtocolsEnum.CRefineEquipBase, byteArray);
		}
		//<!--保存基础属性 CSaveRefineData -->
		public c2s_CSaveRefine_Data(packid: number, keyinpack: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(packid);
			byteArray.writeInt32(keyinpack);
			this.sendMsg(ProtocolsEnum.CSaveRefineData, byteArray);
		}
		//<!--洗特技 CRefineEquipSkill -->
		public c2s_CRefineEquip_Skill(packid: number, keyinpack: number): void {
			// let messageObj: any = {};
			// messageObj.packid = packid; //背包id
			// messageObj.keyinpack = keyinpack; //key
			// var proto = Network._instance.protoTypePool.CRefineEquipSkill.fromObject(messageObj);
			// console.log("CRefineEquipSkill proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CRefineEquipSkill.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CRefineEquipSkill, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(packid);
			byteArray.writeInt32(keyinpack);
			this.sendMsg(ProtocolsEnum.CRefineEquipSkill, byteArray);
		}
		//<!--洗所有属性 CRefineEquipAll -->
		public c2s_CRefineEquip_All(packid: number, keyinpack: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(packid);
			byteArray.writeInt32(keyinpack);
			this.sendMsg(ProtocolsEnum.CRefineEquipAll, byteArray);
		}
		//<!--客户端请求角色安全锁信息 CReqLockInfo -->
		public c2s_CReqLock_Info(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CReqLockInfo.fromObject(messageObj);
			console.log("CReqLockInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqLockInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqLockInfo, buffer);
		}

		//<!--客户端请求设置安全锁 CReqAddLock -->
		public c2s_CReqAdd_Lock(password: string): void {
			let messageObj: any = {};
			messageObj.password = password; //密码
			var proto = Network._instance.protoTypePool.CReqAddLock.fromObject(messageObj);
			console.log("CReqAddLock proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqAddLock.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqAddLock, buffer);
		}

		//<!--客户端请求解锁 CReqUnlock -->
		public c2s_CReqUn_lock(password: number): void {
			let messageObj: any = {};
			messageObj.password = password; //密码
			var proto = Network._instance.protoTypePool.CReqUnlock.fromObject(messageObj);
			console.log("CReqUnlock proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqUnlock.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqUnlock, buffer);
		}
		//<!--客户端请求强行解锁 CReqForceUnlock -->
		public c2s_CReqForceUn_lock(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CReqForceUnlock.fromObject(messageObj);
			console.log("CReqForceUnlock proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqForceUnlock.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqForceUnlock, buffer);
		}


		//<!--洗所有属性 CReqChangePassword -->
		public c2s_CReqChange_Password(oldPassword: string, newPassword: string): void {
			let messageObj: any = {};
			messageObj.oldPassword = oldPassword; //旧密码
			messageObj.newPassword = newPassword; //新密码
			var proto = Network._instance.protoTypePool.CReqChangePassword.fromObject(messageObj);
			console.log("CReqChangePassword proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqChangePassword.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqChangePassword, buffer);
		}
		//<!--客户端请求取消安全锁 CReqCancelLock -->
		public c2s_CReqCancel_Lock(password: string): void {
			let messageObj: any = {};
			messageObj.password = password; //密码
			var proto = Network._instance.protoTypePool.CReqCancelLock.fromObject(messageObj);
			console.log("CReqCancelLock proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqCancelLock.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqCancelLock, buffer);
		}
		//<!--注册为师傅 CRegMaster -->
		public c2s_CReg_Master(declaration: string): void {
			let messageObj: any = {};
			messageObj.declaration = declaration; //宣言
			var proto = Network._instance.protoTypePool.CRegMaster.fromObject(messageObj);
			console.log("CRegMaster proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRegMaster.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRegMaster, buffer);
		}
		//<!--查找师傅 CSearchMaster -->
		public c2s_CSearch_Master(pageid: number): void {
			let messageObj: any = {};
			messageObj.pageid = pageid; //页数
			var proto = Network._instance.protoTypePool.CSearchMaster.fromObject(messageObj);
			console.log("CSearchMaster proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSearchMaster.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSearchMaster, buffer);
		}
		//<!--查找师傅 CRequestAsApprentice -->
		public c2s_CRequestAs_Apprentice(masterid: number): void {
			let messageObj: any = {};
			messageObj.masterid = masterid; //请求师傅的id
			var proto = Network._instance.protoTypePool.CRequestAsApprentice.fromObject(messageObj);
			console.log("CRequestAsApprentice proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestAsApprentice.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestAsApprentice, buffer);
		}
		//<!--查找师傅 CPrenticeRequestResult -->
		public c2s_CPrenticeRequest_Result(prenticeid: number, result: number): void {
			let messageObj: any = {};
			messageObj.prenticeid = prenticeid; //请求师傅的id
			messageObj.result = result; //结果
			var proto = Network._instance.protoTypePool.CPrenticeRequestResult.fromObject(messageObj);
			console.log("CPrenticeRequestResult proto", proto);
			var buffer: any = Network._instance.protoTypePool.CPrenticeRequestResult.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CPrenticeRequestResult, buffer);
		}
		//<!--查找师傅 CCanAcceptPrentice -->
		public c2s_CCanAccept_Prentice(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CCanAcceptPrentice.fromObject(messageObj);
			console.log("CCanAcceptPrentice proto", proto);
			var buffer: any = Network._instance.protoTypePool.CCanAcceptPrentice.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CCanAcceptPrentice, buffer);
		}
		//<!--查找师傅 CConfirmRegMaster -->
		public c2s_CConfirmReg_Master(): void {
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CConfirmRegMaster.fromObject(messageObj);
			console.log("CConfirmRegMaster proto", proto);
			var buffer: any = Network._instance.protoTypePool.CConfirmRegMaster.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CConfirmRegMaster, buffer);
		}


		//<!--查找师傅 CSearchPrentice -->
		public c2s_CSearch_Prentice(pageid: number): void {
			let messageObj: any = {};
			messageObj.pageid = pageid; //页数
			var proto = Network._instance.protoTypePool.CSearchPrentice.fromObject(messageObj);
			console.log("CSearchPrentice proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSearchPrentice.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSearchPrentice, buffer);
		}

		//wangf\
		public c2s_CAcceptOrRefuseInvitation(hostroleid: number, accept: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(hostroleid, byteArray)
			byteArray.writeByte(accept);
			this.sendMsg(ProtocolsEnum.CAcceptOrRefuseInvitation, byteArray);
		}

        /**
		 * 升级公会大厅，金库，药店，旅馆
		 */
		public c2s_CRequestClanLevelup(id: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(id);
			this.sendMsg(ProtocolsEnum.CRequestClanLevelup, byteArray);
		}
        /**
		 * 领取分红
		 */
		public c2s_CGrabBonus(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CGrabBonus, byteArray);
		}
        /**
		 * 查询分红
		 */
		public c2s_CBonusQuery(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CBonusQuery, byteArray);
		}

        /**
		 * 客户端请求公会宗旨
		 */
		public c2s_CRequestClanAim(clanid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(clanid, byteArray);
			this.sendMsg(ProtocolsEnum.CRequestClanAim, byteArray);
		}

        /**
		 * 更改公会名字
		 */
		public c2s_CChangeClanName(newname: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeUtf16String(newname, byteArray);
			this.sendMsg(ProtocolsEnum.CChangeClanName, byteArray);
		}

        /**
		 * 请求搜索公会
		 */
		public c2s_CSearchClan(clanid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(clanid, byteArray);
			this.sendMsg(ProtocolsEnum.CSearchClan, byteArray);
		}

        /**
		 * 一键申请
		 */
		public c2s_COneKeyApplyClan(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			// messageObj.clanid = clanid;
			var proto = Network._instance.protoTypePool.COneKeyApplyClan.fromObject(messageObj);

			console.log("c2s_COneKeyApplyClan proto", proto);
			var buffer: any = Network._instance.protoTypePool.COneKeyApplyClan.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.COneKeyApplyClan, buffer);
		}

        /**
		 * 禁言
		 */
		public c2s_CBannedtalk(memberid: number, flag: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(memberid, byteArray);
			byteArray.writeInt32(flag);
			this.sendMsg(ProtocolsEnum.CBannedtalk, byteArray);
		}

        /**
		 * 进入公会地图
		 */
		public c2s_CEnterClanMap(): void {
			//////////////////////////////////////////////
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CEnterClanMap, byteArray);
		}

		/**
		 * 请求刷新成员列表
		 */
		public c2s_CRefreshMemberList(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CRefreshMemberList, byteArray);
		}

		/**
		 * 取消申请公会
		 */
		public c2s_CCancelApplyClan(clanid: number): void {
			//////////////////////////////////////////////
			// let messageObj: any = {};
			// messageObj.clanid = clanid;
			// var proto = Network._instance.protoTypePool.CCancelApplyClan.fromObject(messageObj);

			// console.log("c2s_CCancelApplyClan proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CCancelApplyClan.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CCancelApplyClan, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(clanid, byteArray);
			this.sendMsg(ProtocolsEnum.CCancelApplyClan, byteArray);

		}

		/**
		 * 是否开启自动接收入会
		 */
		public c2s_COpenAutoJoinClan(autostate: number, requestlevel: number, applylevel: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(autostate);
			byteArray.writeInt16(requestlevel);
			byteArray.writeInt16(applylevel);
			this.sendMsg(ProtocolsEnum.COpenAutoJoinClan, byteArray);
		}

		/**
		 * 请求公会事件信息
		 */
		public c2s_CRequestEventInfo(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CRequestEventInfo, byteArray);
		}

		/**
		 * 请求公会事件详情信息
		 */
		public c2s_CRequestRoleInfo(roleid: number, moduletype: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleid = roleid;   //角色id 
			messageObj.moduletype = moduletype;   //模块类型
			var proto = Network._instance.protoTypePool.CRequestRoleInfo.fromObject(messageObj);

			console.log("c2s_CRequestRoleInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestRoleInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestRoleInfo, buffer);
		}

		/**
		 * 请求修改产药倍数
		 */
		public c2s_CRequestSelectType(selecttype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(selecttype);
			this.sendMsg(ProtocolsEnum.CRequestSelectType, byteArray);
		}

		/**
		 * 请求符文请求信息
		 */
		public c2s_CRequestRuneInfo(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CRequestRuneInfo, byteArray);
		}
		/**
		 * 捐献符文
		 */
		public c2s_CRuneGive(roleid: number, givetype: number, givevalue: number, itemkey: number, bagtype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeLong(roleid, byteArray);
			byteArray.writeInt32(givetype);		//捐赠类型  0活力  1道具
			byteArray.writeInt32(givevalue);	//物品code
			byteArray.writeInt32(itemkey);		//物品key
			byteArray.writeInt32(bagtype);		//背包类型
			this.sendMsg(ProtocolsEnum.CRuneGive, byteArray);
		}

		/**
		 * 请求符文
		 */
		public c2s_CRuneRequest(runerequestinfolist: any): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			let size = runerequestinfolist.length;
			byteArray.writeInt8(size);
			for (var i = 0; i < size; i++) {
				byteArray.writeInt32(runerequestinfolist[i]);
			}
			this.sendMsg(ProtocolsEnum.CRuneRequest, byteArray);
		}

		/**
		 * 请求符文统计
		 */
		public c2s_CRequestRuneCount(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CRequestRuneCount, byteArray);
		}

		/**
		 * 请求符文界面
		 */
		public c2s_CRuneRequestView(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CRuneRequestView, byteArray);
		}

		/**
		 * 客户端请求服务器该玩家是否有公会
		 */
		public c2s_CRefreshRoleClan(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CRefreshRoleClan, byteArray);
		}

		/**
		 * 客户端请求邀请界面
		 */
		public c2s_CClanInvitationView(type_level: number, type_school: number, type_sex: number): void {
			// //////////////////////////////////////////////
			// let messageObj: any = {};
			// messageObj.type_level = type_level;  //等级删选  -1表示所有
			// messageObj.type_school = type_school;  //职业删选  -1表示所有
			// messageObj.type_sex = type_sex;   //性别删选  1男  2女  -1表示所有
			// var proto = Network._instance.protoTypePool.CClanInvitationView.fromObject(messageObj);

			// console.log("c2s_CClanInvitationView proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CClanInvitationView.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CClanInvitationView, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(type_level);
			byteArray.writeInt32(type_school);
			byteArray.writeInt32(type_sex);
			this.sendMsg(ProtocolsEnum.CClanInvitationView, byteArray);
		}

		/**
		 * 搜索
		 */
		public c2s_CRequestSearchRole(roleId: string): void {
			//////////////////////////////////////////////
			// let messageObj: any = {};
			// messageObj.roleId = roleId;
			// var proto = Network._instance.protoTypePool.CRequestSearchRole.fromObject(messageObj);

			// console.log("c2s_CRequestSearchRole proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CRequestSearchRole.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CRequestSearchRole, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeUtf16String(roleId, byteArray);
			this.sendMsg(ProtocolsEnum.CRequestSearchRole, byteArray);
		}

		/**
		 * 改变公会副本
		 */
		public c2s_CChangeClanInst(claninstservice: number): void {
			// //////////////////////////////////////////////
			// let messageObj: any = {};
			// messageObj.claninstservice = claninstservice;  //进入副本服务编号
			// var proto = Network._instance.protoTypePool.CChangeClanInst.fromObject(messageObj);

			// console.log("c2s_CChangeClanInst proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CChangeClanInst.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CChangeClanInst, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(claninstservice);
			this.sendMsg(ProtocolsEnum.CChangeClanInst, byteArray);
		}

		/**
		 * 请求弹劾界面
		 */
		public c2s_CRequestImpeachMentView(cmdtype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeByte(cmdtype);
			this.sendMsg(ProtocolsEnum.CRequestImpeachMentView, byteArray);
		}

		/**
		 * 得到对战列表
		 */
		public c2s_CGetClanFightList(whichweek: number, which: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(whichweek);
			byteArray.writeInt32(which);
			this.sendMsg(ProtocolsEnum.CGetClanFightList, byteArray);
		}

		/**
		 * 点击进入pk
		 */
		public c2s_CStartClanFightBattle(targetid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.targetid = targetid;  //目标id
			var proto = Network._instance.protoTypePool.CStartClanFightBattle.fromObject(messageObj);

			console.log("c2s_CStartClanFightBattle proto", proto);
			var buffer: any = Network._instance.protoTypePool.CStartClanFightBattle.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CStartClanFightBattle, buffer);
		}

		/**
		 * 公会战时统计
		 */
		public c2s_CBattleFieldScore(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CBattleFieldScore.fromObject(messageObj);

			console.log("c2s_CBattleFieldScore proto", proto);
			var buffer: any = Network._instance.protoTypePool.CBattleFieldScore.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CBattleFieldScore, buffer);
		}

		/**
		 * 公会战时统计
		 */
		public c2s_CBattleFieldRankList(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CBattleFieldRankList.fromObject(messageObj);

			console.log("c2s_CBattleFieldRankList proto", proto);
			var buffer: any = Network._instance.protoTypePool.CBattleFieldRankList.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CBattleFieldRankList, buffer);
		}

		/**
		 * 请求是否是敌对
		 */
		public c2s_CRequestRoleIsEnemy(roleidlist: Array<number>): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleidlist = roleidlist;//角色list
			var proto = Network._instance.protoTypePool.CRequestRoleIsEnemy.fromObject(messageObj);

			console.log("c2s_CRequestRoleIsEnemy proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestRoleIsEnemy.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestRoleIsEnemy, buffer);
		}

		/**
		 * 得到下次清零时间
		 */
		public c2s_CGetClearTime(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CGetClearTime, byteArray);
		}

		/**
		 * 
		 */
		public c2s_CSSendCrosserInfo(season: number, week: number, seasonendtime: number, crosserinfo: any): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.season = season;
			messageObj.week = week;
			messageObj.seasonendtime = seasonendtime;
			messageObj.crosserinfo = crosserinfo;

			var proto = Network._instance.protoTypePool.CSSendCrosserInfo.fromObject(messageObj);

			console.log("c2s_CSSendCrosserInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSSendCrosserInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSSendCrosserInfo, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSSendRoomInfos(roleId: number, roomInfos: Array<any>): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.roomInfos = roomInfos;

			var proto = Network._instance.protoTypePool.CSSendRoomInfos.fromObject(messageObj);

			console.log("c2s_CSSendCrosserInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSSendRoomInfos.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSSendRoomInfos, buffer);
		}
		/**
		 * 
		 */
		public c2s_CSUpdataRoomInfo(roleId: number, roomInfos: any): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.roomInfos = roomInfos;

			var proto = Network._instance.protoTypePool.CSUpdataRoomInfo.fromObject(messageObj);

			console.log("c2s_CSUpdataRoomInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSUpdataRoomInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSUpdataRoomInfo, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSLeaveRoom(roleId: number, LeaveroleId: number, bSend2Client: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.LeaveroleId = LeaveroleId;
			messageObj.bSend2Client = bSend2Client;

			var proto = Network._instance.protoTypePool.CSLeaveRoom.fromObject(messageObj);

			console.log("c2s_CSLeaveRoom proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSLeaveRoom.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSLeaveRoom, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSStandCross(roleId: number, standroleId: number, flag: number, roomid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.standroleId = standroleId;
			messageObj.flag = flag;  //1准备，2取消
			messageObj.roomid = roomid;

			var proto = Network._instance.protoTypePool.CSStandCross.fromObject(messageObj);

			console.log("c2s_CSStandCross proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSStandCross.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSStandCross, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSNotifyMsg(roleId: number, errorType: number, msgID: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.errorType = errorType;
			messageObj.msgID = msgID;

			var proto = Network._instance.protoTypePool.CSNotifyMsg.fromObject(messageObj);

			console.log("c2s_CSNotifyMsg proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSNotifyMsg.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSNotifyMsg, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSRoomStand(roleId: number, flag: number, roomid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.flag = flag;
			messageObj.roomid = roomid;

			var proto = Network._instance.protoTypePool.CSRoomStand.fromObject(messageObj);

			console.log("c2s_CSRoomStand proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSRoomStand.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSRoomStand, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSCrossBattleInfo(roleId: number, Room1members: Array<any>, Room2members: Array<any>): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.Room1members = Room1members;
			messageObj.Room2members = Room2members;

			var proto = Network._instance.protoTypePool.CSRoomStand.fromObject(messageObj);

			console.log("c2s_CSRoomStand proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSRoomStand.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSRoomStand, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSCrossBattleMemberState(roleId: number, stateChangeroleId: number, state: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.stateChangeroleId = stateChangeroleId;
			messageObj.state = state;

			var proto = Network._instance.protoTypePool.CSCrossBattleMemberState.fromObject(messageObj);

			console.log("c2s_CSCrossBattleMemberState proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSCrossBattleMemberState.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSCrossBattleMemberState, buffer);
		}
		/**
		 * 
		 */
		public c2s_CSCrossBattleResult(roleId: number, resultType: number, heroIntegral: number, heroMaxIntegral: number, herolistFightTime: number, herolistWinTime: number, herolistRunawayTime: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.resultType = resultType; //-1 失败 1 胜利 0平局
			messageObj.heroIntegral = heroIntegral;
			messageObj.heroMaxIntegral = heroMaxIntegral;
			messageObj.herolistFightTime = herolistFightTime;  // 战斗次数
			messageObj.herolistWinTime = herolistWinTime;  //胜利次数
			messageObj.herolistRunawayTime = herolistRunawayTime;  //逃跑次数

			var proto = Network._instance.protoTypePool.CSCrossBattleResult.fromObject(messageObj);

			console.log("c2s_CSCrossBattleResult proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSCrossBattleResult.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSCrossBattleResult, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSChangeCrosserForm(roleId: number, changeroleId: number, formId: number, formlv: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.changeroleId = changeroleId;
			messageObj.formId = formId;
			messageObj.formlv = formlv;

			var proto = Network._instance.protoTypePool.CSChangeCrosserForm.fromObject(messageObj);

			console.log("c2s_CSChangeCrosserForm proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSChangeCrosserForm.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSChangeCrosserForm, buffer);
		}
		/**
		 * 
		 */
		public c2s_CSCrossMoneyBonus(roleId: number, crossMoney: number, useditems: any): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.crossMoney = crossMoney;
			messageObj.useditems = useditems;

			var proto = Network._instance.protoTypePool.CSCrossMoneyBonus.fromObject(messageObj);

			console.log("c2s_CSCrossMoneyBonus proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSCrossMoneyBonus.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSCrossMoneyBonus, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSEndCross(roleId: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;

			var proto = Network._instance.protoTypePool.CSEndCross.fromObject(messageObj);

			console.log("c2s_CSEndCross proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSEndCross.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSEndCross, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSResultTTBonus(roleId: number, ttBonusid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.ttBonusid = ttBonusid;

			var proto = Network._instance.protoTypePool.CSResultTTBonus.fromObject(messageObj);

			console.log("c2s_CSResultTTBonus proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSResultTTBonus.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSResultTTBonus, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSInvitJoinRoom(beInvitroleId: number, Invitername: string, Invitroomid: number, Invitroomname: string, pwd: string): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.beInvitroleId = beInvitroleId;
			messageObj.Invitername = Invitername;
			messageObj.Invitroomid = Invitroomid;
			messageObj.Invitroomname = Invitroomname;
			messageObj.pwd = pwd;

			var proto = Network._instance.protoTypePool.CSInvitJoinRoom.fromObject(messageObj);

			console.log("c2sCSInvitJoinRoom proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSInvitJoinRoom.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSInvitJoinRoom, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSReqCrossRankList(roleId: number, ranklevel: string, ranktype: number, rankindex: string, RankLists: Array<any>): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.ranklevel = ranklevel;
			messageObj.ranktype = ranktype;
			messageObj.rankindex = rankindex;
			messageObj.RankLists = RankLists;

			var proto = Network._instance.protoTypePool.CSReqCrossRankList.fromObject(messageObj);

			console.log("c2s_CSReqCrossRankList proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSReqCrossRankList.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSReqCrossRankList, buffer);
		}
		/**
		 * 
		 */
		public c2s_CSKickoffRoom(roleId: number, bekickoffroleId: string): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.bekickoffroleId = bekickoffroleId;

			var proto = Network._instance.protoTypePool.CSKickoffRoom.fromObject(messageObj);

			console.log("c2s_CSKickoffRoom proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSKickoffRoom.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSKickoffRoom, buffer);
		}
		/**
		 * 
		 */
		public c2s_CSSwapRoomMember(roleId: number, index1: string, index2: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;
			messageObj.index1 = index1;  //index是队员的序号，5人队伍的话，就是0~4
			messageObj.index2 = index2;  //index是队员的序号，5人队伍的话，就是0~4

			var proto = Network._instance.protoTypePool.CSSwapRoomMember.fromObject(messageObj);

			console.log("c2s_CSSwapRoomMember proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSSwapRoomMember.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSSwapRoomMember, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSendAllServerMsg(worldMsg: string, flag: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.worldMsg = worldMsg;
			messageObj.flag = flag;  //1=跨服战队赛消息 2=普通世界消息

			var proto = Network._instance.protoTypePool.CSendAllServerMsg.fromObject(messageObj);

			console.log("c2s_CSendAllServerMsg proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSendAllServerMsg.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSendAllServerMsg, buffer);
		}
		/**
		 * 
		 */
		public c2s_CReqCrosserInfo(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			// messageObj.worldMsg = worldMsg;
			// messageObj.flag = flag;  //1=跨服战队赛消息 2=普通世界消息

			var proto = Network._instance.protoTypePool.CReqCrosserInfo.fromObject(messageObj);

			console.log("c2s_CReqCrosserInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqCrosserInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqCrosserInfo, buffer);
		}

		/**
		 * 
		 */
		public c2s_CReqRoomInfos(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			// messageObj.worldMsg = worldMsg;
			// messageObj.flag = flag;  //1=跨服战队赛消息 2=普通世界消息

			var proto = Network._instance.protoTypePool.CReqRoomInfos.fromObject(messageObj);

			console.log("c2s_CReqRoomInfos proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqRoomInfos.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqRoomInfos, buffer);
		}

		/**
		 * 
		 */
		public c2s_CLeaveRoom(roomid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roomid = roomid;
			// messageObj.flag = flag;  //1=跨服战队赛消息 2=普通世界消息

			var proto = Network._instance.protoTypePool.CLeaveRoom.fromObject(messageObj);

			console.log("c2s_CLeaveRoom proto", proto);
			var buffer: any = Network._instance.protoTypePool.CLeaveRoom.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CLeaveRoom, buffer);
		}

		/**
		 * 
		 */
		public c2s_CStandCross(flag: number, roomid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.flag = flag;
			messageObj.roomid = roomid;

			var proto = Network._instance.protoTypePool.CStandCross.fromObject(messageObj);

			console.log("c2s_CStandCross proto", proto);
			var buffer: any = Network._instance.protoTypePool.CStandCross.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CStandCross, buffer);
		}
		/**
		 * 
		 */
		public c2s_CCreateRoom(roomName: string, pwd: string): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roomName = roomName;
			messageObj.pwd = pwd;

			var proto = Network._instance.protoTypePool.CCreateRoom.fromObject(messageObj);

			console.log("c2s_CCreateRoom proto", proto);
			var buffer: any = Network._instance.protoTypePool.CCreateRoom.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CCreateRoom, buffer);
		}
		/**
		 * 
		 */
		public c2s_CEnterRoom(roomid: number, pwd: string): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roomid = roomid;
			messageObj.pwd = pwd;

			var proto = Network._instance.protoTypePool.CEnterRoom.fromObject(messageObj);

			console.log("c2s_CEnterRoom proto", proto);
			var buffer: any = Network._instance.protoTypePool.CEnterRoom.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CEnterRoom, buffer);
		}
		/**
		 * 
		 */
		public c2s_CRoomStand(flag: number, roomid: string): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.flag = flag;
			messageObj.roomid = roomid;

			var proto = Network._instance.protoTypePool.CRoomStand.fromObject(messageObj);

			console.log("c2s_CRoomStand proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRoomStand.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRoomStand, buffer);
		}
		/**
		 * 
		 */
		public c2s_CChangeCrosserForm(formId: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.formId = formId;

			var proto = Network._instance.protoTypePool.CChangeCrosserForm.fromObject(messageObj);

			console.log("c2s_CChangeCrosserForm proto", proto);
			var buffer: any = Network._instance.protoTypePool.CChangeCrosserForm.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CChangeCrosserForm, buffer);
		}

		/**
		 * 
		 */
		public c2s_CChangeRoomPwd(roompwd: string): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roompwd = roompwd;

			var proto = Network._instance.protoTypePool.CChangeRoomPwd.fromObject(messageObj);

			console.log("c2s_CChangeRoomPwd proto", proto);
			var buffer: any = Network._instance.protoTypePool.CChangeRoomPwd.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CChangeRoomPwd, buffer);
		}

		/**
		 * 
		 */
		public c2s_CEndCross(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			// messageObj.roompwd = roompwd;

			var proto = Network._instance.protoTypePool.CEndCross.fromObject(messageObj);

			console.log("c2s_CEndCross proto", proto);
			var buffer: any = Network._instance.protoTypePool.CEndCross.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CEndCross, buffer);
		}
		/**
		 * 
		 */
		public c2s_CReqTTBonus(ttBonusid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.ttBonusid = ttBonusid;

			var proto = Network._instance.protoTypePool.CReqTTBonus.fromObject(messageObj);

			console.log("c2s_CReqTTBonus proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqTTBonus.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqTTBonus, buffer);
		}
		/**
		 * 
		 */
		public c2s_CInvitJoinRoom(beInvitroleId: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.beInvitroleId = beInvitroleId;

			var proto = Network._instance.protoTypePool.CInvitJoinRoom.fromObject(messageObj);

			console.log("c2s_CReqTTBonus proto", proto);
			var buffer: any = Network._instance.protoTypePool.CInvitJoinRoom.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CInvitJoinRoom, buffer);
		}
		/**
		 * 
		 */
		public c2s_CReqCrossRankList(ranklevel: number, ranktype: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.ranklevel = ranklevel;
			messageObj.ranktype = ranktype;

			var proto = Network._instance.protoTypePool.CReqCrossRankList.fromObject(messageObj);

			console.log("c2s_CReqCrossRankList proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqCrossRankList.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqCrossRankList, buffer);
		}

		/**
		 * 
		 */
		public c2s_CKickoffRoom(bekickoffroleId: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.bekickoffroleId = bekickoffroleId;

			var proto = Network._instance.protoTypePool.CKickoffRoom.fromObject(messageObj);

			console.log("c2s_CKickoffRoom proto", proto);
			var buffer: any = Network._instance.protoTypePool.CKickoffRoom.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CKickoffRoom, buffer);
		}

		/**
		 * 
		 */
		public c2s_CEnterLeaveHell(enterleave: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.enterleave = enterleave;

			var proto = Network._instance.protoTypePool.CEnterLeaveHell.fromObject(messageObj);

			console.log("c2s_CEnterLeaveHell proto", proto);
			var buffer: any = Network._instance.protoTypePool.CEnterLeaveHell.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CEnterLeaveHell, buffer);
		}
		/**
		 * 
		 */
		public c2s_CSetRoomOwner(roleId: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;

			var proto = Network._instance.protoTypePool.CSetRoomOwner.fromObject(messageObj);

			console.log("c2s_CSetRoomOwner proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSetRoomOwner.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSetRoomOwner, buffer);
		}

		/**
		 * 
		 */
		public c2s_CSwapRoomMember(index1: number, index2: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.index1 = index1;
			messageObj.index2 = index2;

			var proto = Network._instance.protoTypePool.CSwapRoomMember.fromObject(messageObj);

			console.log("c2s_CSwapRoomMember proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSwapRoomMember.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSwapRoomMember, buffer);
		}

		/**
		 * 聊天C-->S
		 */
		public c2s_CSendMessageToRole(roleid: number, content: string, checkShiedMsg: string, displayinfo: any): void {
			//////////////////////////////////////////////
			// let messageObj: any = {};
			// messageObj.roleid = roleid;
			// messageObj.content = content;
			// messageObj.checkShiedMsg = checkShiedMsg;
			// messageObj.displayinfo = displayinfo;

			// var proto = Network._instance.protoTypePool.CSendMessageToRole.fromObject(messageObj);

			// console.log("c2s_CSendMessageToRole proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CSendMessageToRole.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CSendMessageToRole, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeLong(roleid, byteArray);
			ByteArrayUtils.writeUtf16String(content, byteArray);
			ByteArrayUtils.writeUtf16String(checkShiedMsg, byteArray);

			byteArray.writeByte(displayinfo.length);
			// var index: number;
			// var displayInfo;
			for (let index = 0; index < displayinfo.length; index++) {
				byteArray.writeInt32(displayinfo[index].displaytype);
				ByteArrayUtils.writeLong(displayinfo[index].roleid, byteArray);
				ByteArrayUtils.writeLong(displayinfo[index].shopid, byteArray);
				byteArray.writeInt32(displayinfo[index].counterid);
				byteArray.writeInt32(displayinfo[index].uniqid);
				ByteArrayUtils.writeLong(displayinfo[index].teamid, byteArray);
				ByteArrayUtils.writeLong(displayinfo[index].crosstt, byteArray);
				ByteArrayUtils.writeLong(displayinfo[index].serverid, byteArray);
			}
			this.sendMsg(ProtocolsEnum.CSendMessageToRole, byteArray);

		}

		/**
		 * 聊天C-->S
		 */
		public c2s_CBreakOffRelation(roleid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleid, byteArray);
			this.sendMsg(ProtocolsEnum.CBreakOffRelation, byteArray);
		}

		/**
		 *加好友C-->S
		 */
		public c2s_CRequestAddFriend(roleId: number): void {
			//////////////////////////////////////////////
			// let messageObj: any = {};
			// messageObj.roleId = roleId;

			// var proto = Network._instance.protoTypePool.CRequestAddFriend.fromObject(messageObj);

			// console.log("c2s_CRequestAddFriend proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CRequestAddFriend.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CRequestAddFriend, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleId, byteArray);
			this.sendMsg(ProtocolsEnum.CRequestAddFriend, byteArray);

		}

		/**
		 *
		 */
		public c2s_CChangeBaseConfig(refuseStrangerMsg: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.refuseStrangerMsg = refuseStrangerMsg;

			var proto = Network._instance.protoTypePool.CChangeBaseConfig.fromObject(messageObj);

			console.log("c2s_CChangeBaseConfig proto", proto);
			var buffer: any = Network._instance.protoTypePool.CChangeBaseConfig.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CChangeBaseConfig, buffer);
		}
		/**
		 *
		 */
		public c2s_CRequestUpdateRoleInfo(roleid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleid, byteArray);
			this.sendMsg(ProtocolsEnum.CRequestUpdateRoleInfo, byteArray);
		}
		/**
		 *
		 */
		public c2s_CRequestSpaceRoleInfo(roleid: number, reqtype: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleid = roleid;
			messageObj.reqtype = reqtype;

			var proto = Network._instance.protoTypePool.CRequestSpaceRoleInfo.fromObject(messageObj);

			console.log("c2s_CRequestSpaceRoleInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestSpaceRoleInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestSpaceRoleInfo, buffer);
		}

		/**
		 *
		 */
		public c2s_CReqJionCamp(campType: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.campType = campType;

			var proto = Network._instance.protoTypePool.CReqJionCamp.fromObject(messageObj);

			console.log("c2s_CReqJionCamp proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqJionCamp.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqJionCamp, buffer);
		}
		/**
		 *
		 */
		public c2s_CCampPK(roleId: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;

			var proto = Network._instance.protoTypePool.CCampPK.fromObject(messageObj);

			console.log("c2s_CCampPK proto", proto);
			var buffer: any = Network._instance.protoTypePool.CCampPK.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CCampPK, buffer);
		}
		/**
		 *搜索好友C-->S
		 */
		public c2s_CRequestSearchFriend(roleId: string): void {
			//////////////////////////////////////////////
			// let messageObj: any = {};
			// messageObj.roleId = roleId;

			// var proto = Network._instance.protoTypePool.CRequestSearchFriend.fromObject(messageObj);

			// console.log("c2s_CRequestSearchFriend proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CRequestSearchFriend.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CRequestSearchFriend, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeUtf16String(roleId, byteArray);
			this.sendMsg(ProtocolsEnum.CRequestSearchFriend, byteArray);

		}
		/**
		 *客户端请求推荐好友
		 */
		public c2s_CRecommendFriend(): void {
			//////////////////////////////////////////////
			// let messageObj: any = {};

			// var proto = Network._instance.protoTypePool.CRecommendFriend.fromObject(messageObj);

			// console.log("c2s_CRecommendFriend proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CRecommendFriend.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CRecommendFriend, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CRecommendFriend, byteArray);
		}

		//sugq 客户端1
		//CGiveInfoList 客户端请求好友赠送信息列表
		public c2s_give_infolist(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CGiveInfoList.fromObject(messageObj);
			console.log("CGiveInfoList proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGiveInfoList.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGiveInfoList, buffer);
		}
		//CGiveItem   <!-- 赠送道具 -->
		public c2s_give_item(roleId: number, itemMap: any): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleId, byteArray);
			byteArray.writeByte(itemMap.keys.length);
			for (var index = 0; index < itemMap.keys.length; index++) {
				byteArray.writeInt32(itemMap.keys[index]);
				byteArray.writeInt32(itemMap.values[index]);
			}
			this.sendMsg(ProtocolsEnum.CGiveItem, byteArray);
		}
		//CGiveGift   <!-- 赠送礼物 -->
		public c2s_give_gift(roleId: number, itemId: number, itemNum: number, content: string, force: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleId, byteArray);
			byteArray.writeInt(itemId);
			byteArray.writeByte(itemNum);
			ByteArrayUtils.writeUtf16String(content, byteArray);
			byteArray.writeByte(force);
			this.sendMsg(ProtocolsEnum.CGiveGift, byteArray);
		}
		//CGetSpaceInfo   <!-- 获取某角色空间数据 -->
		public c2s_get_spaceinfo(roleId: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleId = roleId;

			var proto = Network._instance.protoTypePool.CGetSpaceInfo.fromObject(messageObj);
			console.log("CGetSpaceInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetSpaceInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetSpaceInfo, buffer);
		}
		//CSetSpaceGift   <!-- 放置角色空间礼物 -->
		public c2s_set_spacegift(giftnum: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.giftnum = giftnum;

			var proto = Network._instance.protoTypePool.CSetSpaceGift.fromObject(messageObj);
			console.log("CSetSpaceGift proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSetSpaceGift.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSetSpaceGift, buffer);
		}
		//CStepSpace   <!-- 踩某个角色空间 -->
		public c2s_step_space(spaceroleid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.spaceroleid = spaceroleid;

			var proto = Network._instance.protoTypePool.CStepSpace.fromObject(messageObj);
			console.log("CStepSpace proto", proto);
			var buffer: any = Network._instance.protoTypePool.CStepSpace.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CStepSpace, buffer);
		}
		//CGetRolesLevel   <!-- 踩某个角色空间 -->
		public c2s_get_roleslevel(roles: Array<number>, gettype: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roles = roles;
			messageObj.gettype = gettype;

			var proto = Network._instance.protoTypePool.CGetRolesLevel.fromObject(messageObj);
			console.log("CGetRolesLevel proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetRolesLevel.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetRolesLevel, buffer);
		}
		//CXshSpace   <!-- 踩说不得大师空间 -->
		public c2s_xsh_space(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CXshSpace.fromObject(messageObj);
			console.log("CXshSpace proto", proto);
			var buffer: any = Network._instance.protoTypePool.CXshSpace.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CXshSpace, buffer);
		}
		//CXshGiveGift   <!-- 赠送说不得大师礼物 -->
		public c2s_xsh_givegift(itemId: number, itemNum: number, content: string, force: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.itemId = itemId;
			messageObj.itemNum = itemNum;
			messageObj.content = content;
			messageObj.force = force;

			var proto = Network._instance.protoTypePool.CXshGiveGift.fromObject(messageObj);
			console.log("CXshGiveGift proto", proto);
			var buffer: any = Network._instance.protoTypePool.CXshGiveGift.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CXshGiveGift, buffer);
		}
		//CGetXshSpaceInfo   <!-- 获取说不得大师空间数据 -->
		public c2s_get_xshspaceinfo(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CGetXshSpaceInfo.fromObject(messageObj);
			console.log("CGetXshSpaceInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetXshSpaceInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetXshSpaceInfo, buffer);
		}
		//CGetRecruitAward   <!-- 招募 -->
		public c2s_get_recruitaward(awardtype: number, awardid: number, recruitrole: number, recruitserver: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(awardtype);
			byteArray.writeInt32(awardid);
			ByteArrayUtils.writeLong(recruitrole, byteArray);
			ByteArrayUtils.writeUtf16String(recruitserver, byteArray);
			this.sendMsg(ProtocolsEnum.CGetRecruitAward, byteArray);
		}
		//CReqRecruitWheel   <!-- 请求招募大转盘信息 -->
		public c2s_req_recruitwheel(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CReqRecruitWheel, byteArray);
		}
		//CBeginRecruitWheel   <!-- 开始转招募大转盘 -->
		public c2s_begin_recruitwheel(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CBeginRecruitWheel, byteArray);
		}
		//CSetSign   <!-- 设置签名 -->
		public c2s_setsign(signContent: string): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.signContent = signContent;

			var proto = Network._instance.protoTypePool.CSetSign.fromObject(messageObj);
			console.log("CSetSign proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSetSign.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSetSign, buffer);
		}
		//CRequestMarry   <!-- 申请结婚(队长) -->
		public c2s_request_marry(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CRequestMarry.fromObject(messageObj);
			console.log("CRequestMarry proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestMarry.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestMarry, buffer);
		}
		//CRespondMarry   <!-- 响应结婚申请(队员) -->
		public c2s_respond_marry(result: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.result = result;

			var proto = Network._instance.protoTypePool.CRespondMarry.fromObject(messageObj);
			console.log("CRespondMarry proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRespondMarry.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRespondMarry, buffer);
		}
		//CGetMarriageInfo   <!-- 请求玩家婚姻信息 -->
		public c2s_get_marriageinfo(roleid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleid = roleid;

			var proto = Network._instance.protoTypePool.CGetMarriageInfo.fromObject(messageObj);
			console.log("CGetMarriageInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetMarriageInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetMarriageInfo, buffer);
		}
		//CGetMarriageAnniversaryAward   <!-- 领取结婚周年礼盒 -->
		public c2s_get_marriageAnniversary_award(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CGetMarriageAnniversaryAward.fromObject(messageObj);
			console.log("CGetMarriageAnniversaryAward proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetMarriageAnniversaryAward.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetMarriageAnniversaryAward, buffer);
		}
		//CRequestWedding   <!-- 婚宴协议 20271-20290-->
		public c2s_request_wedding(weddingtype: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.weddingtype = weddingtype;

			var proto = Network._instance.protoTypePool.CRequestWedding.fromObject(messageObj);
			console.log("CRequestWedding proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestWedding.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestWedding, buffer);
		}
		//CInviteFriends   <!-- 邀请好友来婚宴-->
		public c2s_CInviteFriends(roles: Array<number>): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roles = roles;

			var proto = Network._instance.protoTypePool.CInviteFriends.fromObject(messageObj);
			console.log("CInviteFriends proto", proto);
			var buffer: any = Network._instance.protoTypePool.CInviteFriends.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CInviteFriends, buffer);
		}
		//CRespondWeddingInvite   <!-- 好友响应邀请-->
		public c2s_CRespondWeddingInvite(result: number, weddingid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.result = result;
			messageObj.weddingid = weddingid;

			var proto = Network._instance.protoTypePool.CRespondWeddingInvite.fromObject(messageObj);
			console.log("CRespondWeddingInvite proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRespondWeddingInvite.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRespondWeddingInvite, buffer);
		}

		//CGiveAsPresent   <!-- 好友响应邀请-->
		public c2s_CGiveAsPresent(target: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.target = target;

			var proto = Network._instance.protoTypePool.CGiveAsPresent.fromObject(messageObj);
			console.log("CGiveAsPresent proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGiveAsPresent.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGiveAsPresent, buffer);
		}
		//CBeginWeddingRoll   <!-- 请求婚礼roll点开始-->
		public c2s_CBeginWeddingRoll(rolltype: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.rolltype = rolltype;

			var proto = Network._instance.protoTypePool.CBeginWeddingRoll.fromObject(messageObj);
			console.log("CBeginWeddingRoll proto", proto);
			var buffer: any = Network._instance.protoTypePool.CBeginWeddingRoll.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CBeginWeddingRoll, buffer);
		}
		//CWeddingRoll   <!-- 玩家点击roll点-->
		public c2s_CWeddingRoll(rolltype: number, isjoin: number, rollid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.rolltype = rolltype;
			messageObj.isjoin = isjoin;
			messageObj.rollid = rollid;

			var proto = Network._instance.protoTypePool.CWeddingRoll.fromObject(messageObj);
			console.log("CWeddingRoll proto", proto);
			var buffer: any = Network._instance.protoTypePool.CWeddingRoll.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CWeddingRoll, buffer);
		}
		//CRequestForcibleDivorce   <!-- 申请强制离婚<!-- 离婚协议 20291-20310---->
		public c2s_CRequestForcibleDivorce(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CRequestForcibleDivorce.fromObject(messageObj);
			console.log("CRequestForcibleDivorce proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestForcibleDivorce.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestForcibleDivorce, buffer);
		}
		//CRefuseForcibleDivorce   <!-- 拒绝强制离婚---->
		public c2s_CRefuseForcibleDivorce(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CRefuseForcibleDivorce.fromObject(messageObj);
			console.log("CRefuseForcibleDivorce proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRefuseForcibleDivorce.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRefuseForcibleDivorce, buffer);
		}
		//CCancelForcibleDivorce   <!-- 取消强制离婚---->
		public c2s_CCancelForcibleDivorce(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CCancelForcibleDivorce.fromObject(messageObj);
			console.log("CCancelForcibleDivorce proto", proto);
			var buffer: any = Network._instance.protoTypePool.CCancelForcibleDivorce.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CCancelForcibleDivorce, buffer);
		}
		//CConfirmForcibleDivorce   <!-- 确认强制离婚---->
		public c2s_CConfirmForcibleDivorce(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CConfirmForcibleDivorce.fromObject(messageObj);
			console.log("CConfirmForcibleDivorce proto", proto);
			var buffer: any = Network._instance.protoTypePool.CConfirmForcibleDivorce.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CConfirmForcibleDivorce, buffer);
		}
		//CRequestPeacefulDivorce   <!-- 申请协议离婚---->
		public c2s_CRequestPeacefulDivorce(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CConfirmForcibleDivorce.fromObject(messageObj);
			console.log("CConfirmForcibleDivorce proto", proto);
			var buffer: any = Network._instance.protoTypePool.CConfirmForcibleDivorce.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CConfirmForcibleDivorce, buffer);
		}
		//CRespondPeacefulDivorce   <!-- 响应协议离婚申请---->
		public c2s_CRespondPeacefulDivorce(result: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.result = result;

			var proto = Network._instance.protoTypePool.CRespondPeacefulDivorce.fromObject(messageObj);
			console.log("CRespondPeacefulDivorce proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRespondPeacefulDivorce.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRespondPeacefulDivorce, buffer);
		}
		//CGetMarriageSkillInfo   <!-- 请求婚姻技能信息---->
		public c2s_CGetMarriageSkillInfo(rollid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.rollid = rollid;

			var proto = Network._instance.protoTypePool.CGetMarriageSkillInfo.fromObject(messageObj);
			console.log("CGetMarriageSkillInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetMarriageSkillInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetMarriageSkillInfo, buffer);
		}
		//CStudyMarriageSkill   <!-- 请求学习婚姻技能---->
		public c2s_CStudyMarriageSkill(skillid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.skillid = skillid;

			var proto = Network._instance.protoTypePool.CStudyMarriageSkill.fromObject(messageObj);
			console.log("CStudyMarriageSkill proto", proto);
			var buffer: any = Network._instance.protoTypePool.CStudyMarriageSkill.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CStudyMarriageSkill, buffer);
		}
		//客户端要充值,服务器返回SReqCharge
		public c2s_CReqCharge(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CReqCharge, byteArray);
		}
		//客户端点购买按钮确认充值
		public c2s_CConfirmCharge(goodid: number, goodnum: number, extra: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(goodid);
			byteArray.writeInt32(goodnum);
			ByteArrayUtils.writeUtf16String(extra, byteArray);

			this.sendMsg(ProtocolsEnum.CConfirmCharge, byteArray);
		}
		//领取首充奖励
		public c2s_CGetFirstPayReward(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			this.sendMsg(ProtocolsEnum.CGetFirstPayReward, byteArray);
		}
		//CReqServerId   <!-- 请求服务器id---->
		public c2s_CReqServerId(flag: number): void {
			//////////////////////////////////////////////
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(flag);

			this.sendMsg(ProtocolsEnum.CReqServerId, byteArray);
		}
		//CRequestChargeReturnProfit   <!-- ---->
		public c2s_CRequestChargeReturnProfit(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CRequestChargeReturnProfit.fromObject(messageObj);
			console.log("CRequestChargeReturnProfit proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestChargeReturnProfit.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestChargeReturnProfit, buffer);
		}
		//CGrabChargeReturnProfitReward   <!-- 领取充值返利奖励---->
		public c2s_CGrabChargeReturnProfitReward(id: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.id = id;

			var proto = Network._instance.protoTypePool.CGrabChargeReturnProfitReward.fromObject(messageObj);
			console.log("CGrabChargeReturnProfitReward proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGrabChargeReturnProfitReward.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGrabChargeReturnProfitReward, buffer);
		}
		//CReqChargeRefundsInfo   <!-- 请求封测充值返还数据---->
		public c2s_CReqChargeRefundsInfo(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CReqChargeRefundsInfo.fromObject(messageObj);
			console.log("CReqChargeRefundsInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqChargeRefundsInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqChargeRefundsInfo, buffer);
		}
		//CGetChargeRefunds   <!-- 领取封测充值返还数据---->
		public c2s_CGetChargeRefunds(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CGetChargeRefunds.fromObject(messageObj);
			console.log("CGetChargeRefunds proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGetChargeRefunds.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGetChargeRefunds, buffer);
		}
		public c2s_CRequestVipInfo(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CRequestVipInfo, byteArray);
		}
		//CRequestVipJiangli
		public c2s_CRequestVipJiangli(bounusIndex: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(bounusIndex);
			this.sendMsg(ProtocolsEnum.CRequestVipJiangli, byteArray);
		}
		//CReqFushiInfo   <!-- ---->
		public c2s_CReqFushiInfo(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CReqFushiInfo.fromObject(messageObj);
			console.log("CReqFushiInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CReqFushiInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CReqFushiInfo, buffer);
		}
		//CUpYingYongBaoInfo   <!-- ---->
		public c2s_CUpYingYongBaoInfo(openid: string, openkey: string, paytoken: string, pf: string, pfkey: string, zoneid: string, platformname: string): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.openid = openid;
			messageObj.openkey = openkey;
			messageObj.paytoken = paytoken;
			messageObj.pf = pf;
			messageObj.pfkey = pfkey;
			messageObj.zoneid = zoneid;
			messageObj.platformname = platformname;

			var proto = Network._instance.protoTypePool.CUpYingYongBaoInfo.fromObject(messageObj);
			console.log("CUpYingYongBaoInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CUpYingYongBaoInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CUpYingYongBaoInfo, buffer);
		}
		//CSendRedPackView   <!-- 红包界面---->
		public c2s_CSendRedPackView(modeltype: number, redpackid: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(modeltype);
			ByteArrayUtils.writeUtf16String(redpackid, byteArray);
			this.sendMsg(ProtocolsEnum.CSendRedPackView, byteArray);
		}
		//CSendRedPack   <!-- 发送红包---->
		public c2s_CSendRedPack(modeltype: number, fushinum: number, redpacknum: number, redpackdes: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(modeltype);
			byteArray.writeInt32(fushinum);
			byteArray.writeInt32(redpacknum);
			ByteArrayUtils.writeUtf16String(redpackdes, byteArray);
			this.sendMsg(ProtocolsEnum.CSendRedPack, byteArray);
		}
		//CGetRedPack   <!-- 领取红包---->
		public c2s_CGetRedPack(modeltype: number, redpackid: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(modeltype);
			ByteArrayUtils.writeUtf16String(redpackid, byteArray);
			this.sendMsg(ProtocolsEnum.CGetRedPack, byteArray);
		}

		//CSendRedPackHisView   <!-- 查看红包历史---->
		public c2s_CSendRedPackHisView(modeltype: number, redpackid: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(modeltype);
			ByteArrayUtils.writeUtf16String(redpackid, byteArray);
			this.sendMsg(ProtocolsEnum.CSendRedPackHisView, byteArray);
		}
		//CSendRedPackRoleRecordView   <!-- 查看玩家个人红包记录---->
		public c2s_CSendRedPackRoleRecordView(modeltype: number, redpackid: string): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(modeltype);
			ByteArrayUtils.writeUtf16String(redpackid, byteArray);
			this.sendMsg(ProtocolsEnum.CSendRedPackRoleRecordView, byteArray);
		}
		//CQueryConsumeDayPay   <!-- 是否消耗点卡 ---->
		public c2s_CQueryConsumeDayPay(yesorno: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.yesorno = yesorno;

			var proto = Network._instance.protoTypePool.CQueryConsumeDayPay.fromObject(messageObj);
			console.log("CQueryConsumeDayPay proto", proto);
			var buffer: any = Network._instance.protoTypePool.CQueryConsumeDayPay.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CQueryConsumeDayPay, buffer);
		}
		//CQuerySubscribeInfo   <!-- 查询订阅信息 ---->
		public c2s_CQuerySubscribeInfo(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CQuerySubscribeInfo.fromObject(messageObj);
			console.log("CQuerySubscribeInfo proto", proto);
			var buffer: any = Network._instance.protoTypePool.CQuerySubscribeInfo.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CQuerySubscribeInfo, buffer);
		}
		//CBuySpotCard   <!-- 求购符石 ---->
		public c2s_CBuySpotCard(buynum: number, buyprice: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.buynum = buynum;
			messageObj.buyprice = buyprice;

			var proto = Network._instance.protoTypePool.CBuySpotCard.fromObject(messageObj);
			console.log("CBuySpotCard proto", proto);
			var buffer: any = Network._instance.protoTypePool.CBuySpotCard.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CBuySpotCard, buffer);
		}
		//CSellSpotCard   <!-- 寄售符石 ---->
		public c2s_CSellSpotCard(sellnum: number, sellprice: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.sellnum = sellnum;
			messageObj.sellprice = sellprice;

			var proto = Network._instance.protoTypePool.CSellSpotCard.fromObject(messageObj);
			console.log("CSellSpotCard proto", proto);
			var buffer: any = Network._instance.protoTypePool.CSellSpotCard.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CSellSpotCard, buffer);
		}
		//CTradingSpotCardView   <!-- 交易区界面 ---->
		public c2s_CTradingSpotCardView(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CTradingSpotCardView.fromObject(messageObj);
			console.log("CTradingSpotCardView proto", proto);
			var buffer: any = Network._instance.protoTypePool.CTradingSpotCardView.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CTradingSpotCardView, buffer);
		}
		//CRoleTradingView   <!-- 个人买卖界面 ---->
		public c2s_CRoleTradingView(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CRoleTradingView.fromObject(messageObj);
			console.log("CRoleTradingView proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRoleTradingView.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRoleTradingView, buffer);
		}
		//CRoleTradingRecordView   <!-- 个人买卖记录界面 ---->
		public c2s_CRoleTradingRecordView(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CRoleTradingRecordView.fromObject(messageObj);
			console.log("CRoleTradingRecordView proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRoleTradingRecordView.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRoleTradingRecordView, buffer);
		}
		//CCancelTrading   <!-- 撤销订单 ---->
		public c2s_CCancelTrading(tradingid: string): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.tradingid = tradingid;

			var proto = Network._instance.protoTypePool.CCancelTrading.fromObject(messageObj);
			console.log("CCancelTrading proto", proto);
			var buffer: any = Network._instance.protoTypePool.CCancelTrading.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CCancelTrading, buffer);
		}
		//CTradingOpenState   <!-- 交易所功能是否开启 ---->
		public c2s_CTradingOpenState(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CTradingOpenState.fromObject(messageObj);
			console.log("CTradingOpenState proto", proto);
			var buffer: any = Network._instance.protoTypePool.CTradingOpenState.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CTradingOpenState, buffer);
		}
		//购买月卡
		public c2s_CBuyMonthCard(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CBuyMonthCard, byteArray);
		}
		//CGrabMonthCardReward   <!-- 领取月卡单独道具奖励 ---->
		public c2s_CGrabMonthCardReward(itemid: number, rewarddistribution: any): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.itemid = itemid;
			messageObj.rewarddistribution = itemid;

			var proto = Network._instance.protoTypePool.CGrabMonthCardReward.fromObject(messageObj);
			console.log("CGrabMonthCardReward proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGrabMonthCardReward.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGrabMonthCardReward, buffer);
		}
		//领取月卡奖励
		public c2s_CGrabMonthCardRewardAll(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CGrabMonthCardRewardAll, byteArray);
		}
		public c2s_CRequestMonthCard(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CRequestMonthCard, byteArray);
		}
		//CBeginSchoolWheel   <!--  ---->
		public c2s_CBeginSchoolWheeld(): void {
			//////////////////////////////////////////////
			// let messageObj:any = {};

			// var proto = Network._instance.protoTypePool.CBeginSchoolWheel.fromObject(messageObj);
			// console.log("CBeginSchoolWheel proto",proto);
			// var buffer:any = Network._instance.protoTypePool.CBeginSchoolWheel.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CBeginSchoolWheel, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CBeginSchoolWheel, byteArray);
		}
		//CEndSchoolWheel   <!--  ---->
		public c2s_CEndSchoolWheel(): void {
			//////////////////////////////////////////////
			// let messageObj:any = {};

			// var proto = Network._instance.protoTypePool.CEndSchoolWheel.fromObject(messageObj);
			// console.log("CEndSchoolWheel proto",proto);
			// var buffer:any = Network._instance.protoTypePool.CEndSchoolWheel.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CEndSchoolWheel, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CEndSchoolWheel, byteArray);
		}
		//CBeginXueYueWheel   <!--  血月商人---->
		public c2s_CBeginXueYueWheel(npckey: number, boxtype: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.npckey = npckey;
			messageObj.boxtype = boxtype;

			var proto = Network._instance.protoTypePool.CBeginXueYueWheel.fromObject(messageObj);
			console.log("CBeginXueYueWheel proto", proto);
			var buffer: any = Network._instance.protoTypePool.CBeginXueYueWheel.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CBeginXueYueWheel, buffer);
		}
		//CEndXueYueWheel   <!--  ---->
		public c2s_CEndXueYueWheel(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CEndXueYueWheel.fromObject(messageObj);
			console.log("CEndXueYueWheel proto", proto);
			var buffer: any = Network._instance.protoTypePool.CEndXueYueWheel.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CEndXueYueWheel, buffer);
		}
		//CUseXueYueKey   <!--  ---->
		public c2s_CUseXueYueKey(npckid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.npckid = npckid;

			var proto = Network._instance.protoTypePool.CUseXueYueKey.fromObject(messageObj);
			console.log("CUseXueYueKey proto", proto);
			var buffer: any = Network._instance.protoTypePool.CUseXueYueKey.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CUseXueYueKey, buffer);
		}
		//CRoleAccusationCheck   <!--  举报时候客户端给服务器发消息,用于扣费---->
		public c2s_CRoleAccusationCheck(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CRoleAccusationCheck, byteArray);
		}
		//CLogPushToken   <!--  推送Token日志---->
		public c2s_CLogPushToken(token: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.token = token;

			var proto = Network._instance.protoTypePool.CLogPushToken.fromObject(messageObj);
			console.log("CLogPushToken proto", proto);
			var buffer: any = Network._instance.protoTypePool.CLogPushToken.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CLogPushToken, buffer);
		}
		//CNoOperationKick   <!--  踢掉长时间不操作的玩家---->
		public c2s_CNoOperationKick(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CNoOperationKick.fromObject(messageObj);
			console.log("CNoOperationKick proto", proto);
			var buffer: any = Network._instance.protoTypePool.CNoOperationKick.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CNoOperationKick, buffer);
		}
		//CClientTime   <!--  踢掉长时间不操作的玩家---->
		public c2s_CClientTime(time: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.time = time;

			var proto = Network._instance.protoTypePool.CClientTime.fromObject(messageObj);
			console.log("CClientTime proto", proto);
			var buffer: any = Network._instance.protoTypePool.CClientTime.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CClientTime, buffer);
		}
		//CSetAutoBattle   <!--  ---->
		public c2s_CSetAutoBattle(isautobattle: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeByte(isautobattle);
			this.sendMsg(ProtocolsEnum.CSetAutoBattle, byteArray);

		}
		//CSetCharOpt   <!--  ---->
		public c2s_CSetCharOpt(charoptype: number, charopid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt16(charoptype);
			byteArray.writeInt32(charopid);
			this.sendMsg(ProtocolsEnum.CSetCharOpt, byteArray);

		}
		//CSetPetOpt   <!--  ---->
		public c2s_CSetPetOpt(petoptype: number, petopid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt16(petoptype);
			byteArray.writeInt32(petopid);
			this.sendMsg(ProtocolsEnum.CSetPetOpt, byteArray);
		}
		//获取双倍点数
		public c2s_CGetDPoint(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CGetDPoint, byteArray);
		}
		//冻结双倍点数
		public c2s_CFreezeDPoint(): void {
			let byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CFreezeDPoint, byteArray);
		}
		//设置人物战斗ai
		public c2s_CSetRoleFightAI(fightaiids: Array<number>): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			var sizeUint8Array = ByteArrayUtils.compact_uint32(fightaiids.length);
			byteArray.writeUint8Array(sizeUint8Array);
			for (let i = 0; i < fightaiids.length; i++) {
				byteArray.writeInt32(fightaiids[i]);
			}
			this.sendMsg(ProtocolsEnum.CSetRoleFightAI, byteArray);
		}
		//CGetRoleFightAI   <!--  获取人物战斗ai---->
		public c2s_CGetRoleFightAI(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CGetRoleFightAI, byteArray);
		}
		//CClientLockScreen   <!--  机器锁屏通知服务器---->
		public c2s_CClientLockScreen(lock: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.lock = lock;

			var proto = Network._instance.protoTypePool.CClientLockScreen.fromObject(messageObj);
			console.log("CClientLockScreen proto", proto);
			var buffer: any = Network._instance.protoTypePool.CClientLockScreen.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CClientLockScreen, buffer);
		}
		//CBuyDPoint   <!--  购买双倍点数---->
		public c2s_CBuyDPoint(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CBuyDPoint.fromObject(messageObj);
			console.log("CBuyDPoint proto", proto);
			var buffer: any = Network._instance.protoTypePool.CBuyDPoint.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CBuyDPoint, buffer);
		}
		//CSendCommand   <!--  5001 开始---->
		public c2s_CSendCommand(cmd: string): void {
			//////////////////////////////////////////////
			// let messageObj:any = {};
			// messageObj.cmd = cmd;

			// var proto = Network._instance.protoTypePool.CSendCommand.fromObject(messageObj);
			// console.log("CSendCommand proto",proto);
			// var buffer:any = Network._instance.protoTypePool.CSendCommand.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CSendCommand, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeUtf16String(cmd, byteArray);
			this.sendMsg(ProtocolsEnum.CSendCommand, byteArray);



		}
		//CGMCheckRoleID   <!--  请求角色ID检测---->
		public c2s_CGMCheckRoleID(roleid: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.roleid = roleid;

			var proto = Network._instance.protoTypePool.CGMCheckRoleID.fromObject(messageObj);
			console.log("CGMCheckRoleID proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGMCheckRoleID.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGMCheckRoleID, buffer);
		}
		//sugq 客户端2
		public c2s_CMarketAttentionBrowse(attentype: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(attentype);
			this.sendMsg(ProtocolsEnum.CMarketAttentionBrowse, byteArray);
		}

		//c2s_CMarketSearchEquip   c2s_market_searchequip
		public c2s_CMarketSearchEquip(euqiptype: number, level: number, pricemin: number, pricemax: number, effect: number, skill: number, color: Array<number>, basicattr: Array<any>, additionalattr: Array<number>,
			totalattr: number, score: number, sellstate: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(euqiptype);
			byteArray.writeInt32(level);
			byteArray.writeInt32(pricemin);
			byteArray.writeInt32(pricemax);
			byteArray.writeInt32(effect);
			byteArray.writeInt32(skill);
			let size = color.length;
			byteArray.writeInt8(size);
			for (var i = 0; i < size; i++) {
				var cc = color[i];
				byteArray.writeInt32(cc);
			}
			let basicattrSize = basicattr.length;
			byteArray.writeInt8(basicattrSize);
			for (var i = 0; i < basicattrSize; i++) {
				var m_basicattr = basicattr[i];
				byteArray.writeInt32(m_basicattr.attrid)
				byteArray.writeInt32(m_basicattr.attrval)
			}
			let additionalattrSize = additionalattr.length;
			byteArray.writeInt8(additionalattrSize);
			for (var i = 0; i < additionalattrSize; i++) {
				byteArray.writeInt32(additionalattr[i]);
			}
			byteArray.writeInt32(totalattr);
			byteArray.writeInt32(score);
			byteArray.writeInt32(sellstate);
			this.sendMsg(ProtocolsEnum.CMarketSearchEquip, byteArray);
		}
		//CMarketSearchPet
		public c2s_CMarketSearchPet(pettype: number, levelmin: number, levelmax: number, pricemin: number, pricemax: number, zizhi: Array<any>, skills: Array<any>, totalskillnum: number, attr: Array<any>,
			score: number, sellstate: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(pettype);
			byteArray.writeInt32(levelmin);
			byteArray.writeInt32(levelmax);
			byteArray.writeInt32(pricemin);
			byteArray.writeInt32(pricemax);
			let zizhiSize = zizhi.length;
			byteArray.writeInt8(zizhiSize);
			for (var i = 0; i < zizhiSize; i++) {
				var m_zizhi = zizhi[i];
				byteArray.writeInt32(m_zizhi.attrid);
				byteArray.writeInt32(m_zizhi.attrval);
			}
			let skillsSize = skills.length;
			byteArray.writeInt8(skillsSize);
			for (var i = 0; i < skillsSize; i++) {
				byteArray.writeInt32(skills[i].id);
			}
			byteArray.writeInt32(totalskillnum);
			let attrSize = attr.length;
			byteArray.writeInt8(attrSize);
			for (var i = 0; i < attrSize; i++) {
				var m_attr = attr[i];
				byteArray.writeInt32(m_attr.attrid);
				byteArray.writeInt32(m_attr.attrval);
			}
			byteArray.writeInt32(score);
			byteArray.writeInt32(sellstate);
			this.sendMsg(ProtocolsEnum.CMarketSearchPet, byteArray);
		}

		//CMarketCleanTradeLog
		public c2s_CMarketCleanTradeLog(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CMarketCleanTradeLog.fromObject(messageObj);
			console.log("CMarketCleanTradeLog proto", proto);
			var buffer: any = Network._instance.protoTypePool.CMarketCleanTradeLog.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CMarketCleanTradeLog, buffer);
		}

		//CMarketItemChatShow
		public c2s_CMarketItemChatShow(id: number, itemtype: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.id = id;  //数据库唯一id
			messageObj.itemtype = itemtype; //物品类型:  1普通、2宠物、3装备 4范围

			var proto = Network._instance.protoTypePool.CMarketItemChatShow.fromObject(messageObj);
			console.log("CMarketItemChatShow proto", proto);
			var buffer: any = Network._instance.protoTypePool.CMarketItemChatShow.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CMarketItemChatShow, buffer);
		}
		//CTakeBackTempMarketContainerItem  拍卖临时背包,合服后取出道具请求
		public c2s_CTakeBackTempMarketContainerItem(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			var proto = Network._instance.protoTypePool.CTakeBackTempMarketContainerItem.fromObject(messageObj);
			console.log("CTakeBackTempMarketContainerItem proto", proto);
			var buffer: any = Network._instance.protoTypePool.CTakeBackTempMarketContainerItem.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CTakeBackTempMarketContainerItem, buffer);
		}
		//CGoldOrderUpBlackMarket
		public c2s_CGoldOrderUpBlackMarket(goldnumber: Array<number>, rmb: Array<number>): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.goldnumber = goldnumber;  //金币数量, 整数
			messageObj.rmb = rmb; //出售价格, 整数, 单位人民币分

			var proto = Network._instance.protoTypePool.CGoldOrderUpBlackMarket.fromObject(messageObj);
			console.log("CGoldOrderUpBlackMarket proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGoldOrderUpBlackMarket.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGoldOrderUpBlackMarket, buffer);
		}
		//CGoldOrderDownBlackMarket
		public c2s_CGoldOrderDownBlackMarket(pid: Array<number>): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.pid = pid;  //订单编号

			var proto = Network._instance.protoTypePool.CGoldOrderDownBlackMarket.fromObject(messageObj);
			console.log("CGoldOrderDownBlackMarket proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGoldOrderDownBlackMarket.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGoldOrderDownBlackMarket, buffer);
		}

		//CGoldOrderTakeOutBlackMarket
		public c2s_CGoldOrderTakeOutBlackMarket(pid: Array<number>): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.pid = pid;  //订单编号

			var proto = Network._instance.protoTypePool.CGoldOrderTakeOutBlackMarket.fromObject(messageObj);
			console.log("CGoldOrderTakeOutBlackMarket proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGoldOrderTakeOutBlackMarket.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGoldOrderTakeOutBlackMarket, buffer);
		}
		//CGoldOrderBrowseBlackMarket
		public c2s_CGoldOrderBrowseBlackMarket(): void {
			//////////////////////////////////////////////
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CGoldOrderBrowseBlackMarket.fromObject(messageObj);
			console.log("CGoldOrderBrowseBlackMarket proto", proto);
			var buffer: any = Network._instance.protoTypePool.CGoldOrderBrowseBlackMarket.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CGoldOrderBrowseBlackMarket, buffer);
		}
		//CTransTianTiShop
		public c2s_CTransTianTiShop(shopid: number, itemkey: number, goodsid: Array<number>, num: Array<number>,
			buytype: Array<number>, bagtype: number): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.shopid = shopid;  //商店序号
			messageObj.itemkey = itemkey; // 是物品在背包中的位置,在卖背包中物品时用到。叫itemkey是为了和系统统一称呼。
			messageObj.goodsid = goodsid;  //商品id
			messageObj.num = num;  //买卖数量
			messageObj.buytype = buytype;  //购买类型
			messageObj.bagtype = bagtype;  //背包类型 1,角色背包 10,天梯背包

			var proto = Network._instance.protoTypePool.CTransTianTiShop.fromObject(messageObj);
			console.log("CTransTianTiShop proto", proto);
			var buffer: any = Network._instance.protoTypePool.CTransTianTiShop.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CTransTianTiShop, buffer);
		}
		//CItemOrderUpBlackMarket
		public c2s_CItemOrderUpBlackMarket(itemtype: Array<number>, number: number, key: Array<number>,
			rmb: Array<number>): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.itemtype = itemtype;  //2装备 3宠物
			messageObj.number = number; //数量
			messageObj.key = key;  //背包或宠物栏中的key
			messageObj.rmb = rmb;  //出售价格, 整数, 单位人民币分

			var proto = Network._instance.protoTypePool.CItemOrderUpBlackMarket.fromObject(messageObj);
			console.log("CItemOrderUpBlackMarket proto", proto);
			var buffer: any = Network._instance.protoTypePool.CItemOrderUpBlackMarket.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CItemOrderUpBlackMarket, buffer);
		}
		//CItemOrderDownBlackMarket
		public c2s_CItemOrderDownBlackMarket(itemtype: Array<number>, pid: Array<number>, ): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.itemtype = itemtype;  //2装备 3宠物
			messageObj.pid = pid; //订单编号

			var proto = Network._instance.protoTypePool.CItemOrderDownBlackMarket.fromObject(messageObj);
			console.log("CItemOrderDownBlackMarket proto", proto);
			var buffer: any = Network._instance.protoTypePool.CItemOrderDownBlackMarket.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CItemOrderDownBlackMarket, buffer);
		}
		//CItemOrderTakeOutBlackMarket
		public c2s_CItemOrderTakeOutBlackMarket(itemtype: Array<number>, pid: Array<number>, ): void {
			//////////////////////////////////////////////
			let messageObj: any = {};
			messageObj.itemtype = itemtype;  //2装备 3宠物
			messageObj.pid = pid; //订单编号

			var proto = Network._instance.protoTypePool.CItemOrderTakeOutBlackMarket.fromObject(messageObj);
			console.log("CItemOrderTakeOutBlackMarket proto", proto);
			var buffer: any = Network._instance.protoTypePool.CItemOrderTakeOutBlackMarket.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CItemOrderTakeOutBlackMarket, buffer);
		}
		//CItemOrderBrowseBlackMarket
		public c2s_CItemOrderBrowseBlackMarket(itemtype: Array<number>): void {
			let messageObj: any = {};
			messageObj.itemtype = itemtype;  //2装备 3宠物

			var proto = Network._instance.protoTypePool.CItemOrderBrowseBlackMarket.fromObject(messageObj);
			console.log("CItemOrderBrowseBlackMarket proto", proto);
			var buffer: any = Network._instance.protoTypePool.CItemOrderBrowseBlackMarket.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CItemOrderBrowseBlackMarket, buffer);
		}
		//CUpdaetAssistSkillLevel
		public c2s_CUpdaetAssistSkillLevel(npckey: number, id: number): void {
			let messageObj: any = {};

			messageObj.npckey = npckey;
			messageObj.id = id;
			var proto = Network._instance.protoTypePool.CUpdaetAssistSkillLevel.fromObject(messageObj);
			console.log("CUpdaetAssistSkillLevel proto", proto);
			var buffer: any = Network._instance.protoTypePool.CUpdaetAssistSkillLevel.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CUpdaetAssistSkillLevel, buffer);
		}
		//CUpdateInborn
		public c2s_CUpdateInborn(id: number, flag: number): void {
			// let messageObj: any = {};

			// messageObj.id = id;
			// messageObj.flag = flag;
			// var proto = Network._instance.protoTypePool.CUpdateInborn.fromObject(messageObj);
			// console.log("CUpdateInborn proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CUpdateInborn.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CUpdateInborn, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(id);
			byteArray.writeByte(flag);
			this.sendMsg(ProtocolsEnum.CUpdateInborn, byteArray);

		}
		//CUseSceneSkill
		public c2s_CUseSceneSkill(skillId: number, aimtype: number, aimId: number): void {
			let messageObj: any = {};

			messageObj.skillId = skillId;	//技能ID
			messageObj.aimtype = aimtype;	//技能使用目标类型 对自己角色使用==1，对自己战斗宠物使用==2，对正常队友角色使用==3
			messageObj.aimId = aimId;		//技能使用目标ID，为队友角色ID

			var proto = Network._instance.protoTypePool.CUseSceneSkill.fromObject(messageObj);
			console.log("CUseSceneSkill proto", proto);
			var buffer: any = Network._instance.protoTypePool.CUseSceneSkill.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CUseSceneSkill, buffer);
		}
		//CPractiseSkill
		public c2s_CPractiseSkill(npckey: number, skillId: number, kind: number): void {
			let messageObj: any = {};

			messageObj.npckey = npckey;
			messageObj.skillId = skillId;
			messageObj.kind = kind;

			var proto = Network._instance.protoTypePool.CPractiseSkill.fromObject(messageObj);
			console.log("CPractiseSkill proto", proto);
			var buffer: any = Network._instance.protoTypePool.CPractiseSkill.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CPractiseSkill, buffer);
		}

		//CRequestParticleSkillList
		public c2s_CRequestParticleSkillList(): void {
			// let messageObj: any = {};

			// var proto = Network._instance.protoTypePool.CRequestParticleSkillList.fromObject(messageObj);
			// console.log("CRequestParticleSkillList proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CRequestParticleSkillList.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CRequestParticleSkillList, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CRequestParticleSkillList, byteArray);
		}
		//CRequestLearnParticleSkill
		public c2s_CRequestLearnParticleSkill(id: number, times: number, itemid: number): void {
			// let messageObj: any = {};

			// messageObj.id = id;	  	//技能ID by changhao
			// messageObj.times = times;	//学习次数 by changhao
			// messageObj.itemid = itemid;		//使用的道具 by changhao	

			// var proto = Network._instance.protoTypePool.CRequestLearnParticleSkill.fromObject(messageObj);
			// console.log("CRequestLearnParticleSkill proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CRequestLearnParticleSkill.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CRequestLearnParticleSkill, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(id);
			byteArray.writeInt32(times);
			byteArray.writeInt32(itemid);
			this.sendMsg(ProtocolsEnum.CRequestLearnParticleSkill, byteArray);
		}
		//CRequestLiveSkillList
		public c2s_CRequestLiveSkillList(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CRequestLiveSkillList, byteArray);
		}
		//CRequestLearnLiveSkill
		public c2s_CRequestLearnLiveSkill(id: number): void {
			// let messageObj: any = {};

			// var proto = Network._instance.protoTypePool.CRequestLearnLiveSkill.fromObject(messageObj);
			// console.log("CRequestLiveSkillList proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CRequestLearnLiveSkill.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CRequestLearnLiveSkill, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(id);
			this.sendMsg(ProtocolsEnum.CRequestLearnLiveSkill, byteArray);
		}
		//CLiveSkillMakeStuff
		public c2s_CLiveSkillMakeStuff(itemid: number, itemnum: number): void {
			// let messageObj: any = {};

			// messageObj.itemid = itemid;	  	//物品的ID by changhao
			// messageObj.itemnum = itemnum;	// 物品数量 by changhao

			// var proto = Network._instance.protoTypePool.CLiveSkillMakeStuff.fromObject(messageObj);
			// console.log("CLiveSkillMakeStuff proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CLiveSkillMakeStuff.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CLiveSkillMakeStuff, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(itemid);
			byteArray.writeInt32(itemnum);
			this.sendMsg(ProtocolsEnum.CLiveSkillMakeStuff, byteArray);
		}
		//CLiveSkillMakeDrug
		public c2s_CLiveSkillMakeDrug(makingslist: Array<number>): void {
			// let messageObj: any = {};

			// messageObj.makingslist = makingslist;	  	//物品的ID by changhao

			// var proto = Network._instance.protoTypePool.CLiveSkillMakeDrug.fromObject(messageObj);
			// console.log("CLiveSkillMakeDrug proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CLiveSkillMakeDrug.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CLiveSkillMakeDrug, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeByte(makingslist.length);
			var index: number;
			for (index = 0; index < makingslist.length; index++) {
				byteArray.writeInt32(makingslist[index]);
			}

			this.sendMsg(ProtocolsEnum.CLiveSkillMakeDrug, byteArray);

		}
		//CLiveSkillMakeFood
		public c2s_CLiveSkillMakeFood(): void {
			// let messageObj: any = {};

			// var proto = Network._instance.protoTypePool.CLiveSkillMakeFood.fromObject(messageObj);
			// console.log("CLiveSkillMakeFood proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CLiveSkillMakeFood.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CLiveSkillMakeFood, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CLiveSkillMakeFood, byteArray);
		}
		//CLiveSkillMakeFriendGift
		public c2s_CLiveSkillMakeFriendGift(): void {
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CLiveSkillMakeFriendGift.fromObject(messageObj);
			console.log("CLiveSkillMakeFriendGift proto", proto);
			var buffer: any = Network._instance.protoTypePool.CLiveSkillMakeFriendGift.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CLiveSkillMakeFriendGift, buffer);
		}
		//CLiveSkillMakeEnhancement
		public c2s_CLiveSkillMakeEnhancement(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CLiveSkillMakeEnhancement, byteArray);
		}
		//CLiveSkillMakeFarm
		public c2s_CLiveSkillMakeFarm(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CLiveSkillMakeFarm, byteArray);
		}
		//CRequestAttr
		public c2s_CRequestAttr(attrid: Array<number>): void {
			// let messageObj: any = {};
			// messageObj.attrid = attrid
			// var proto = Network._instance.protoTypePool.CRequestAttr.fromObject(messageObj);
			// console.log("CRequestAttr proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CRequestAttr.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CRequestAttr, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeByte(attrid.length);
			var index: number;
			for (index = 0; index < attrid.length; index++) {
				byteArray.writeInt32(attrid[index]);
			}
			this.sendMsg(ProtocolsEnum.CRequestAttr, byteArray);
		}
		//CLiveSkillMakeCard
		public c2s_CLiveSkillMakeCard(level: number): void {
			// let messageObj: any = {};
			// messageObj.level = level //选择的等级

			// var proto = Network._instance.protoTypePool.CLiveSkillMakeCard.fromObject(messageObj);
			// console.log("CLiveSkillMakeCard proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CLiveSkillMakeCard.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CLiveSkillMakeCard, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(level);
			this.sendMsg(ProtocolsEnum.CLiveSkillMakeCard, byteArray);
		}
		//CShapeCardInfoList
		public c2s_CShapeCardInfoList(): void {

			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CShapeCardInfoList.fromObject(messageObj);
			console.log("CShapeCardInfoList proto", proto);
			var buffer: any = Network._instance.protoTypePool.CShapeCardInfoList.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CShapeCardInfoList, buffer);
		}
		//CAddShapeCardPoint
		public c2s_CAddShapeCardPoint(shapecard: number): void {
			let messageObj: any = {};
			messageObj.shapecard = shapecard // 变身卡

			var proto = Network._instance.protoTypePool.CAddShapeCardPoint.fromObject(messageObj);
			console.log("CAddShapeCardPoint proto", proto);
			var buffer: any = Network._instance.protoTypePool.CLiveSkiCAddShapeCardPointllMakeCard.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CAddShapeCardPoint, buffer);
		}
		//CUseShapeCard
		public c2s_CUseShapeCard(shapecard: number): void {
			let messageObj: any = {};
			messageObj.shapecard = shapecard // 使用变身卡,=0时取消变身

			var proto = Network._instance.protoTypePool.CUseShapeCard.fromObject(messageObj);
			console.log("CUseShapeCard proto", proto);
			var buffer: any = Network._instance.protoTypePool.CUseShapeCard.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CUseShapeCard, buffer);
		}
		//CUseRoleShape
		public c2s_CUseRoleShape(useroleshape: number): void {
			let messageObj: any = {};
			messageObj.useroleshape = useroleshape // 变身后仍显示原造型 1:是 0:不是

			var proto = Network._instance.protoTypePool.CUseRoleShape.fromObject(messageObj);
			console.log("CUseRoleShape proto", proto);
			var buffer: any = Network._instance.protoTypePool.CUseRoleShape.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CUseRoleShape, buffer);
		}
		//CTransChatMessage2Serv
		public c2s_CTransChatMessage2Serv(messagetype: number, message: string, checkshiedmessage: string, displayinfo: any,
			funtype: number, taskid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(messagetype);
			ByteArrayUtils.writeUtf16String(message, byteArray);
			ByteArrayUtils.writeUtf16String(checkshiedmessage, byteArray);
			byteArray.writeByte(displayinfo.length);
			//  var displayinfo;
			for (let index = 0; index < displayinfo.length; index++) {
				byteArray.writeInt32(displayinfo[index].displaytype);
				ByteArrayUtils.writeLong(displayinfo[index].roleid, byteArray);
				ByteArrayUtils.writeLong(displayinfo[index].shopid, byteArray);
				byteArray.writeInt32(displayinfo[index].counterid);
				byteArray.writeInt32(displayinfo[index].uniqid);
				ByteArrayUtils.writeLong(displayinfo[index].teamid, byteArray);
				ByteArrayUtils.writeLong(displayinfo[index].crosstt, byteArray);
				ByteArrayUtils.writeLong(displayinfo[index].serverid, byteArray);
			}
			byteArray.writeInt32(funtype);
			byteArray.writeInt32(taskid);
			this.sendMsg(ProtocolsEnum.CTransChatMessage2Serv, byteArray);
		}
		//CChatItemTips
		public c2s_CChatItemTips(displayInfo: any): void {
			let byteArray: ByteArray = new ByteArray();
			// byteArray.writeByte(displayinfos.length);
			// var index:number;
			// var displayInfo: game.modules.chat.models.DisplayInfoVo;
			// for (index = 0; index < displayinfos.length; index++) {
			// displayInfo = displayinfos[index];
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(displayInfo.displaytype);
			ByteArrayUtils.writeLong(displayInfo.roleid, byteArray);
			ByteArrayUtils.writeLong(displayInfo.shopid, byteArray);
			byteArray.writeInt32(displayInfo.counterid);
			byteArray.writeInt32(displayInfo.uniqid);
			ByteArrayUtils.writeLong(displayInfo.teamid, byteArray);
			ByteArrayUtils.writeLong(displayInfo.crosstt, byteArray);
			ByteArrayUtils.writeLong(displayInfo.serverid, byteArray);
			// }
			this.sendMsg(ProtocolsEnum.CChatItemTips, byteArray);

		}
		//CCreateTeam
		public c2s_CCreateTeam(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.CCreateTeam, byteArray);
		}
		//CAcceptToTeam
		public c2s_CAcceptToTeam(roleid: number, accept: number): void {
			let bytearray: ByteArray = new ByteArray();
			bytearray.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleid, bytearray);
			bytearray.writeInt32(accept);
			this.sendMsg(ProtocolsEnum.CAcceptToTeam, bytearray);
		}
		//CQuitTeam
		public c2s_CQuitTeam(): void {
			var byteArray: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CQuitTeam, byteArray);
		}

		//CAbsentReturnTeam
		public c2s_CAbsentReturnTeam(absent: number): void {
			let bytearray: ByteArray = new ByteArray();
			bytearray.endian = Laya.Byte.BIG_ENDIAN;
			bytearray.writeByte(absent);
			this.sendMsg(ProtocolsEnum.CAbsentReturnTeam, bytearray);
		}
		//CExpelMember
		public c2s_CExpelMember(roleid: number): void {
			let byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleid, byte);
			this.sendMsg(ProtocolsEnum.CExpelMember, byte);
		}
		//CCallbackMember
		public c2s_CCallbackMember(memberid: number): void {
			let byte: ByteArray = new ByteArray();
			ByteArrayUtils.writeLong(memberid, byte);
			this.sendMsg(ProtocolsEnum.CCallbackMember, byte);
		}
		//CSetTeamLeader
		public c2s_CSetTeamLeader(roleid: number): void {
			let byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleid, byte);
			this.sendMsg(ProtocolsEnum.CSetTeamLeader, byte);
		}
		//CInviteJoinTeam
		public c2s_CInviteJoinTeam(roleid: number, force: number): void {
			var byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleid, byte);
			byte.writeInt32(force);
			this.sendMsg(ProtocolsEnum.CInviteJoinTeam, byte);
		}
		//CRespondInvite
		public c2s_CRespondInvite(agree: number): void {
			var byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			byte.writeByte(agree);
			console.log('agree-----------' + agree);
			this.sendMsg(ProtocolsEnum.CRespondInvite, byte);
		}
		//CRequestJoinTeam
		public c2s_CRequestJoinTeam(roleid: number): void {
			let byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(roleid, byte);
			this.sendMsg(ProtocolsEnum.CRequestJoinTeam, byte);
		}
		//CSwapMember
		public c2s_CSwapMember(index1: number, index2: number): void {
			let byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			byte.writeInt32(index1);
			byte.writeInt32(index2);
			this.sendMsg(ProtocolsEnum.CSwapMember, byte);
		}
		//CAnswerforSetLeader
		public c2s_CAnswerforSetLeader(agree: number): void {
			let byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			byte.writeByte(agree);
			this.sendMsg(ProtocolsEnum.CAnswerforSetLeader, byte);
		}
		//CAnswerforCallBack
		public c2s_CAnswerforCallBack(agree: number): void {
			let byte: ByteArray = new ByteArray();
			byte.writeByte(agree);
			this.sendMsg(ProtocolsEnum.CAnswerforCallBack, byte);
		}
		//CRequestSetTeamLevel
		public c2s_CRequestSetTeamLevel(minlevel: number, maxlevel: number): void {
			let messageObj: any = {};
			messageObj.minlevel = minlevel
			messageObj.maxlevel = maxlevel

			var proto = Network._instance.protoTypePool.CRequestSetTeamLevel.fromObject(messageObj);
			console.log("CRequestSetTeamLevel proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestSetTeamLevel.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestSetTeamLevel, buffer);
		}
		//CDismissTeam
		public c2s_CDismissTeam(): void {
			let messageObj: any = {};


			var proto = Network._instance.protoTypePool.CDismissTeam.fromObject(messageObj);
			console.log("CDismissTeam proto", proto);
			var buffer: any = Network._instance.protoTypePool.CDismissTeam.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CDismissTeam, buffer);
		}
		//CFInviteJoinTeam
		public c2s_CFInviteJoinTeam(roleid: number): void {
			let messageObj: any = {};
			messageObj.roleid = roleid

			var proto = Network._instance.protoTypePool.CFInviteJoinTeam.fromObject(messageObj);
			console.log("CFInviteJoinTeam proto", proto);
			var buffer: any = Network._instance.protoTypePool.CFInviteJoinTeam.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CFInviteJoinTeam, buffer);
		}
		//CRequestTeamMatch
		public c2s_CRequestTeamMatch(typematch: number, targetid: number, levelmin: number, levelmax: number): void {
			var byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			byte.writeInt32(typematch);
			byte.writeInt32(targetid);
			byte.writeInt32(levelmin);
			byte.writeInt32(levelmax);
			this.sendMsg(ProtocolsEnum.CRequestTeamMatch, byte);
		}
		//CRequestStopTeamMatch
		public c2s_CRequestStopTeamMatch(): void {
			let byte: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CRequestStopTeamMatch, byte);
		}
		//COneKeyTeamMatch
		public c2s_COneKeyTeamMatch(channeltype: number, text: string): void {
			let byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			byte.writeInt32(channeltype);
			ByteArrayUtils.writeUtf16String(text, byte);
			this.sendMsg(ProtocolsEnum.COneKeyTeamMatch, byte);
		}
		//CRequestSetTeamMatchInfo
		public c2s_CRequestSetTeamMatchInfo(targetid: number, levelmin: number, levelmax: number): void {
			var byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			byte.writeInt32(targetid);
			byte.writeInt32(levelmin);
			byte.writeInt32(levelmax);
			this.sendMsg(ProtocolsEnum.CRequestSetTeamMatchInfo, byte);
		}
		//CRequestTeamMatchList
		public c2s_CRequestTeamMatchList(targetid: number, startteamid: number, num: number): void {
			var byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			byteArray.writeInt32(targetid);  							//目标ID
			ByteArrayUtils.writeLong(startteamid, byteArray);			//起始队伍ID
			byteArray.writeInt32(num);									//取起始队伍id后面的num个数据
			this.sendMsg(ProtocolsEnum.CRequestTeamMatchList, byteArray);
		}
		public c2s_CRequestMatchInfo(): void {
			var byte: ByteArray = new ByteArray();
			this.sendMsg(ProtocolsEnum.CRequestMatchInfo, byte);
		}
		//CRequestHaveTeam
		public c2s_CRequestHaveTeam(roleid: number): void {
			let messageObj: any = {};
			messageObj.roleid = roleid   		//某个人是否有队 by changhao

			var proto = Network._instance.protoTypePool.CRequestHaveTeam.fromObject(messageObj);
			console.log("CRequestHaveTeam proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestHaveTeam.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestHaveTeam, buffer);
		}
		//COneKeyApplyTeamInfo
		public c2s_COneKeyApplyTeamInfo(teamid: number): void {
			let byte: ByteArray = new ByteArray();
			byte.endian = Laya.Byte.BIG_ENDIAN;
			ByteArrayUtils.writeLong(teamid, byte);
			this.sendMsg(ProtocolsEnum.COneKeyApplyTeamInfo, byte);
		}
		//CTeamRollMelon
		public c2s_CTeamRollMelon(melonid: number, status: number): void {
			// let messageObj: any = {};
			// messageObj.melonid = melonid   		//分赃id by changhao
			// messageObj.status = status   		//1是ROLL 0是放弃 by changhao

			// var proto = Network._instance.protoTypePool.CTeamRollMelon.fromObject(messageObj);
			// console.log("CTeamRollMelon proto", proto);
			// var buffer: any = Network._instance.protoTypePool.CTeamRollMelon.encode(proto).finish();
			// this.sendMsg(ProtocolsEnum.CTeamRollMelon, buffer);
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			ByteArrayUtils.writeLong(melonid, byteArray);
			byteArray.writeInt32(status);
			this.sendMsg(ProtocolsEnum.CTeamRollMelon, byteArray);
		}
		//CRequestRollItemTips
		public c2s_CRequestRollItemTips(melonid: number): void {
			let messageObj: any = {};
			messageObj.melonid = melonid

			var proto = Network._instance.protoTypePool.CRequestRollItemTips.fromObject(messageObj);
			console.log("CRequestRollItemTips proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestRollItemTips.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestRollItemTips, buffer);
		}
		//CRequestSetFormation
		public c2s_CRequestSetFormation(formation: number): void {
			let messageObj: any = {};
			messageObj.formation = formation

			var proto = Network._instance.protoTypePool.CRequestSetFormation.fromObject(messageObj);
			console.log("CRequestSetFormation proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestSetFormation.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestSetFormation, buffer);
		}
		//CFormationMakeBook
		public c2s_CFormationMakeBook(): void {
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CFormationMakeBook.fromObject(messageObj);
			console.log("CFormationMakeBook proto", proto);
			var buffer: any = Network._instance.protoTypePool.CFormationMakeBook.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CFormationMakeBook, buffer);
		}
		//CUseFormBook
		public c2s_CUseFormBook(formationid: number, listbook: Array<game.modules.huoban.models.UseFormBookVo>): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(formationid);

			byteArray.writeByte(listbook.length);
			var index: number;
			var useFormBook;
			for (index = 0; index < listbook.length; index++) {
				useFormBook = listbook[index];
				byteArray.writeInt32(useFormBook.bookid);
				byteArray.writeInt32(useFormBook.num);
			}
			this.sendMsg(ProtocolsEnum.CUseFormBook, byteArray);
		}
		//CRequestClanFightTeamList
		public c2s_CRequestClanFightTeamList(isfresh: number, start: number, num: number): void {
			let messageObj: any = {};
			messageObj.isfresh = isfresh   		//客户端用 0刷新 1不刷新  by qyl 	
			messageObj.start = start   		//起始teamid by changhao	
			messageObj.num = num   		//请求的数量 by changhao

			var proto = Network._instance.protoTypePool.CRequestClanFightTeamList.fromObject(messageObj);
			console.log("CRequestClanFightTeamList proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestClanFightTeamList.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestClanFightTeamList, buffer);
		}
		//CRequestClanFightRoleList
		public c2s_CRequestClanFightRoleList(isfresh: number, start: number, num: number): void {
			let messageObj: any = {};
			messageObj.isfresh = isfresh   		//客户端用 0刷新 1不刷新  by qyl 	
			messageObj.start = start   		//起始teamid by changhao	
			messageObj.num = num   		//请求的数量 by changhao

			var proto = Network._instance.protoTypePool.CRequestClanFightRoleList.fromObject(messageObj);
			console.log("CRequestClanFightRoleList proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestClanFightRoleList.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestClanFightRoleList, buffer);
		}
		//CRequestClanFightTeamRoleNum
		public c2s_CRequestClanFightTeamRoleNum(): void {
			let messageObj: any = {};

			var proto = Network._instance.protoTypePool.CRequestClanFightTeamRoleNum.fromObject(messageObj);
			console.log("CRequestClanFightTeamRoleNum proto", proto);
			var buffer: any = Network._instance.protoTypePool.CRequestClanFightTeamRoleNum.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CRequestClanFightTeamRoleNum, buffer);
		}
		//COnTitle
		public c2s_COnTitle(titleid: number): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;

			byteArray.writeInt32(titleid);

			this.sendMsg(ProtocolsEnum.COnTitle, byteArray);
		}
		//COffTitle
		public c2s_COffTitle(): void {
			let byteArray: ByteArray = new ByteArray();
			byteArray.endian = Laya.Byte.BIG_ENDIAN;
			this.sendMsg(ProtocolsEnum.COffTitle, byteArray);
		}
		//CNpcToTrigger
		public c2s_CNpcToTrigger(triggerid: number, npckey: number): void {
			let messageObj: any = {};
			messageObj.triggerid = triggerid
			messageObj.npckey = npckey


			var proto = Network._instance.protoTypePool.CNpcToTrigger.fromObject(messageObj);
			console.log("CNpcToTrigger proto", proto);
			var buffer: any = Network._instance.protoTypePool.CNpcToTrigger.encode(proto).finish();
			this.sendMsg(ProtocolsEnum.CNpcToTrigger, buffer);
		}
	}
}