module battle {
	export class BattleProxy {
		private _battle: Battle;
		get battle(): Battle {
			return this._battle;
		}

		private static _instance:BattleProxy;
		static get instance():BattleProxy {
			return BattleProxy._instance;
		}

		static get inBattle():boolean {
			if (BattleProxy.instance && BattleProxy.instance.battle) {
				return true;
			}
			return false;
		}

		constructor(private _app: AppBase) {
			BattleProxy._instance = this;
			NotifyMgr.register(NotifyType.BattleEnd, this, this.onBattleEnd);
			NotifyMgr.register(NotifyType.BattleDrugInUse, this, this.onSelectTarget);
		}

		init(): void {
			// 加载数据表
			Laya.loader.load("common/data/temp/battle.cstageinfo.bin", Handler.create(this, this.onloadedStageInfoBaseVoComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/battle.cstageinfo2.bin", Handler.create(this, this.onloadedStageInfo2BaseVoComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/battle.cskillinfo.bin", Handler.create(this, this.onloadedSkillInfoBaseVoComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/battle.cbattlebackground.bin", Handler.create(this, this.onloadedBattleBackGroundBaseVoComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/battle.cbattlebackmusic.bin",Handler.create(this,this.onloadedBattleBackMusicBaseVoComplete),null,Loader.BUFFER);
			Laya.loader.load("common/data/temp/battle.cbattleaiconfig.bin", Handler.create(this, this.onloadedBattleAIConfigBaseVoComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/skill.cskilltypeconfig.bin", Handler.create(this, this.onloadedSkillTypeConfigComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/SysConfig.resolution.bin", Handler.create(this, this.onloadedResolutionComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/buff.cbuffconfig.bin", Handler.create(this, this.onloadedBuffConfigComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/EffectPath.ceffectpath.bin",Handler.create(this,this.onloadedCEffectPathConfigComplete),null,Loader.BUFFER);
			// 监听战斗开始和结束协议
			Network._instance.addHanlder(ProtocolsEnum.SSendBattleStart, this, this.onSSendBattleStart);
			// 监听战斗开始和结束协议(观战)
			Network._instance.addHanlder(ProtocolsEnum.SSendWatchBattleStart, this, this.onSSendWatchBattleStart);
		}

		public StageInfoData: { [key: number]: StageInfoBaseVo } = {};
		/** 技能相关表/j技能阶段表 */
		private onloadedStageInfoBaseVoComplete(): void {
			console.log("cstageinfo 表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cstageinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.StageInfoData, StageInfoBaseVo, "id");
			console.log("cstageinfo.configData:", this.StageInfoData);
		}

		public StageInfoData2: { [key: number]: StageInfoBaseVo } = {};
		/** 技能相关表/j技能阶段表_远程 */
		private onloadedStageInfo2BaseVoComplete(): void {
			console.log("cstageinfo2 表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cstageinfo2.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.StageInfoData2, StageInfoBaseVo, "id");
			console.log("cstageinfo2.configData:", this.StageInfoData2);
		}
		/** 技能相关表/j技能阶段串联表 */
		public SkillInfoData: { [key: number]: SkillInfoBaseVo } = {};
		//技能相关表/j技能阶段串联表
		private onloadedSkillInfoBaseVoComplete(): void {
			console.log("cskillinfo 表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cskillinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.SkillInfoData, SkillInfoBaseVo, "id");
			console.log("cskillinfo.configData:", this.SkillInfoData);
		}

		/** 战斗底图表 */
		public BattleBackGroundData: { [key: number]: BattleBackGroundBaseVo } = {};
		private onloadedBattleBackGroundBaseVoComplete(): void {
			console.log("cbattlebackground 表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cbattlebackground.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.BattleBackGroundData, BattleBackGroundBaseVo, "id");
			console.log("cbattlebackground.configData:", this.BattleBackGroundData);
		}
		/** 战斗背景音乐表 */
		public BattleBackGroundMusicData: { [key: number]: BattleBackGroundBaseVo } = {};
		private onloadedBattleBackMusicBaseVoComplete(): void {
			console.log("cbattlebackmusic 表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cbattlebackmusic.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.BattleBackGroundMusicData, BattleBackGroundBaseVo, "id");
			console.log("cbattlebackmusic.configData:", this.BattleBackGroundMusicData);
		}

		/** 战斗AI/AI动作表 */
		public BattleAIConfigData: { [key: number]: BattleAIConfigBaseVo } = {};
		private onloadedBattleAIConfigBaseVoComplete(): void {
			console.log("cbattleaiconfig 表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cbattleaiconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.BattleAIConfigData, BattleAIConfigBaseVo, "id");
			console.log("cbattleaiconfig.configData:", this.BattleAIConfigData);
		}


		public SkillTypeData: { [key: number]: SkillTypeConfigBaseVo } = {};
		/** 技能类型*/
		private onloadedSkillTypeConfigComplete(): void {
			console.log("SkillTypeConfigData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cskilltypeconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.SkillTypeData, SkillTypeConfigBaseVo, "id");
			//	console.log("SkillTypeConfigData:", this.skillTypeConfigData);
		}

		public resolutiondata: { [key: number]: ResolutionBaseVo } = {};
		/**f分辨率配置 */
		private onloadedResolutionComplete(): void {
			console.log("Resolution表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.resolution.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.resolutiondata, ResolutionBaseVo, "id");
			console.log("Resolution表格加载完毕 Resolution.configData:", this.resolutiondata);

			var resolutionBaseVo: ResolutionBaseVo = this.resolutiondata["7"];
			SceneBattleRes.BOTTOM_POSX = [];
			SceneBattleRes.BOTTOM_POSX = [];
			SceneBattleRes.BOTTOM_POSY = [];
			SceneBattleRes.TOP_POSX = [];
			SceneBattleRes.TOP_POSY = [];
			var elementArr: string[];
			var posX: number;
			var posY: number;
			/** 战斗站位 */
			for (var index = 0; index < resolutionBaseVo.positionsByresolution.length; index++) {
				elementArr = (resolutionBaseVo.positionsByresolution[index]).split(";");
				posX = parseInt(elementArr[0]);
				posY = parseInt(elementArr[1]);
				if (index < SceneBattleRes.MAX_POS) {
					SceneBattleRes.BOTTOM_POSX.push(posX);
					SceneBattleRes.BOTTOM_POSY.push(posY);
				} else {
					SceneBattleRes.TOP_POSX.push(posX);
					SceneBattleRes.TOP_POSY.push(posY);
				}
			}
			/** 观战阵位加载 */
			for (let _index = 0; _index < resolutionBaseVo.positionsBywatch.length; _index++) {
				elementArr = (resolutionBaseVo.positionsBywatch[_index]).split(";");
				posX = parseInt(elementArr[0]);
				posY = parseInt(elementArr[1]);
				SceneBattleRes.MIDDLE_POX.push(posX);
				SceneBattleRes.MIDDLE_POY.push(posY);
			}
			console.log("-----init pos  index = ", index, "  x = ", posX, "  y = ", posY);
			console.log("Resolution解析完毕Bottom:", SceneBattleRes.BOTTOM_POSX.length, SceneBattleRes.BOTTOM_POSY.length);
			console.log("Resolution解析完毕Top:", SceneBattleRes.TOP_POSX.length, SceneBattleRes.TOP_POSY.length);

		}

		public BuffConfigData: { [key: number]: BuffConfigBaseVo } = {};
		//c持续性buff表
		private onloadedBuffConfigComplete(): void {
			console.log("BuffConfig表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/buff.cbuffconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.BuffConfigData, BuffConfigBaseVo, "id");
			//	console.log("BuffConfig.configData:",this.BuffConfigData);
		}
		// 特效配置表
		public EffectPathConfigData: { [key: number]: CEffectPathBaseVo } = {};
		private onloadedCEffectPathConfigComplete():void {
			console.log("CEffectPath表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/EffectPath.ceffectpath.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.EffectPathConfigData,CEffectPathBaseVo,"id");
			//console.log("RoleRColorModel.configData:",this.ceffectPathConfigData);
		}
		// 非剧情特效
		public EffectPathNoneDramaConfigData: { [key: number]: CEffectPathNoneDramaBaseVo } = {};
		private onloadedCEffectPathNoneDramaConfigComplete():void {
			console.log("CEffectPathNoneDrama表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/EffectPath.ceffectpathnonedrama.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.EffectPathNoneDramaConfigData,CEffectPathNoneDramaBaseVo,"id");
		//	console.log("RoleRColorModel.configData:",this.ceffectPathNoneDramaConfigData);
		}

		/**
		 * 战斗开始
		 * @param optcode 
		 * @param msg 
		 */
		private onSSendBattleStart(optcode: number, msg: hanlder.s2c_SSendBattleStart): void {
			console.log(">> BattleMgr.onSSendBattleStart");
			this._app.aCotrller.stop();
			if (this._battle) {
				console.warn("------ 已经在战场中");
				return;
			}
			// 切换战斗背景音乐
			var backMusic: game.data.template.BattleBackGroundBaseVo = this.BattleBackGroundMusicData[msg.backmusic];
			Laya.SoundManager.playMusic(backMusic.path);
			/** 进入战斗 关闭自动寻路状态 */
			var _isstar = LocalStorage.getItem("isstarAutoGuaJi" + game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
			this._app.sceneRoot.hangup = 0
			AutoHangUpModels.getInstance().isstar = parseInt(_isstar)
			this._app.sceneObjectMgr.mainUnit.xunluo = 0
			this._app.sceneObjectMgr.mainUnit.stopwalk = 1  
			let allpost = [];
			//战斗开始请求停止移动
			// RequesterProtocols._instance.c2s_role_stop(allpost,this._app.sceneObjectMgr.mainUnit.target,game.modules.mainhud.models.HudModel.getInstance().movesceneid);
			RequesterProtocols._instance.c2s_role_move(this._app.sceneObjectMgr.mainUnit.target,this._app.sceneObjectMgr.mainUnit.target,game.modules.mainhud.models.HudModel.getInstance().movesceneid);
			for (var index = 0; index < this._app.sceneRoot.allwalk.length; index++) 
			{//清除行走特效
				this._app.sceneRoot.allwalk[index].clear();
			} 		
			this._battle = new Battle(this._app, msg);
		}
		private onSSendWatchBattleStart( optcode: number, msg:hanlder.s2c_SSendWatchBattleStart ):void
		{//待实现
			this._app.aCotrller.stop();
			if (this._battle) {
				console.warn("------ 已经在战场中");
				return;
			}
			var backMusic: game.data.template.BattleBackGroundBaseVo = this.BattleBackGroundMusicData[msg.backmusic];
			Laya.SoundManager.playMusic(backMusic.path);
			/** 进入战斗 关闭自动寻路状态 */
			var _isstar = LocalStorage.getItem("isstarAutoGuaJi" + game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
			this._app.sceneRoot.hangup = 0
			AutoHangUpModels.getInstance().isstar = parseInt(_isstar)
			this._app.sceneObjectMgr.mainUnit.xunluo = 0
			this._app.sceneObjectMgr.mainUnit.stopwalk = 1  
			let allpost = [];
			for (var index = 0; index < this._app.sceneRoot.allwalk.length; index++) 
			{//清除行走特效
				this._app.sceneRoot.allwalk[index].clear();
			} 		
			this._battle = new Battle(this._app, msg);
		}

		private onBattleEnd(): void {
			this._battle = null;
		}

		/** 战斗药品使用选择*/
		private onSelectTarget(detail:Array<number>):void
		{
			/** 使用对象 */
			let userto =  detail[0];
			/** 物品key */
			let itemkey =  detail[1];
			/** 物品名称 */
			let itemName = detail[2];
			if(this.battle)
			{
				 this.battle.drugOnSelectTarget(userto,itemkey,itemName);
			}
		}
	}
}