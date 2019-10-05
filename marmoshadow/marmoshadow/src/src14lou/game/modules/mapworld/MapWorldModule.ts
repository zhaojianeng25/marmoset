/**
* name 
*/

module game.modules.mapworld {
	export class MapWorldModule extends game.modules.ModuleMediator {
		private _viewUI: ui.common.MapWorldUI;
		private _smallmapUI: game.modules.mapworld.SmallMapMediator;/**小地图*/
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;/**信息提示*/
		public mapjump: number
		constructor(app: AppBase) {
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.MapWorldUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.mapjump = 0
			//世界地图按钮点击事件
			this._viewUI.mapHuoYunZong_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_HUOYUNZONG]);
			this._viewUI.mapJiShiZhen_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_JISHIZHEN]);
			this._viewUI.mapTianLeiYu_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_TIANLEIYU]);
			this._viewUI.mapYunXiaoDian_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_YUNXIAODIAN]);
			this._viewUI.mapWuLiangGong_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_WULIANGGONG]);
			this._viewUI.mapCangYuGong_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_CANGYUGONG]);
			this._viewUI.mapFeiXueYa_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_FEIXUEYA]);
			this._viewUI.mapDanYangGuan_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_DANYANGGUAN]);
			this._viewUI.mapYouMingDian_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_YOUMINGDIAN]);
			this._viewUI.mapBaiShaXiaoZhu_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_BAISHAXIAOZHU]);
			this._viewUI.mapXiangSiGu_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_XIANGSIGU]);
			this._viewUI.mapChunQiuLin_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_CHUNQIULIN]);
			this._viewUI.mapTaoHuaXi_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_TAOHUAXI]);
			this._viewUI.mapHuangYanLing_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_HUANGYANLING]);
			this._viewUI.mapChengNingDao_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_CHENGNINGDAO]);
			this._viewUI.mapPanLongShan_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_PANLONGSHAN]);
			this._viewUI.mapTianZhouYiZhan_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_TIANZHOUYIZHAN]);
			this._viewUI.mapWangFengTing_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_WANGFENGTING]);
			this._viewUI.mapLiuLinTaoHai_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_LIULINTAOHAI]);
			this._viewUI.mapQiXingGuan_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_QIXINGGUAN]);
			this._viewUI.mapLianHuaGu_btn.on(LEvent.MOUSE_DOWN, this, this.mapChange, [MapInfo.MAP_LIANHUAGU]);
			this._viewUI.mapCloseView_btn.on(LEvent.MOUSE_DOWN, this, this.closeView);
			this._viewUI.mapQieHuan_btn.on(LEvent.MOUSE_DOWN, this, this.changesmallmap);
			this._viewUI.mapGuaJiDiTu_btn.on(LEvent.MOUSE_DOWN, this, this.openGuaJi);
			this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(app)
		}
		/** 打开挂机界面 */
		private openGuaJi():void{
			this.closeView();
			ModuleManager.show(ModuleNames.GUA_JI,this._app);
		}
		/**小地图*/
		public changesmallmap(): void {
			this._smallmapUI = new game.modules.mapworld.SmallMapMediator(this._app);
			this._smallmapUI.show();
			this.hide();
		}
		/**初始化可用按钮*/
		public initbtn(): void {
			game.modules.mainhud.models.HudProxy.getInstance().once(game.modules.mainhud.models.GETPOST_EVENT, this, this.changepost);
			this._viewUI.mapHuoYunZong_btn.mouseEnabled = true;
			this._viewUI.mapJiShiZhen_btn.mouseEnabled = true;
			this._viewUI.mapTianLeiYu_btn.mouseEnabled = true;
			this._viewUI.mapYunXiaoDian_btn.mouseEnabled = true;
			this._viewUI.mapWuLiangGong_btn.mouseEnabled = true;
			this._viewUI.mapCangYuGong_btn.mouseEnabled = true;
			this._viewUI.mapFeiXueYa_btn.mouseEnabled = true;
			this._viewUI.mapDanYangGuan_btn.mouseEnabled = true;
			this._viewUI.mapYouMingDian_btn.mouseEnabled = true;
			this._viewUI.mapBaiShaXiaoZhu_btn.mouseEnabled = true;
			this._viewUI.mapXiangSiGu_btn.mouseEnabled = true;
			this._viewUI.mapChunQiuLin_btn.mouseEnabled = true;
			this._viewUI.mapTaoHuaXi_btn.mouseEnabled = true;
			this._viewUI.mapHuangYanLing_btn.mouseEnabled = true;
			this._viewUI.mapChengNingDao_btn.mouseEnabled = true;
			this._viewUI.mapPanLongShan_btn.mouseEnabled = true;
			this._viewUI.mapTianZhouYiZhan_btn.mouseEnabled = true;
			this._viewUI.mapWangFengTing_btn.mouseEnabled = true;
			this._viewUI.mapLiuLinTaoHai_btn.mouseEnabled = true;
			this._viewUI.mapQiXingGuan_btn.mouseEnabled = true;
			this._viewUI.mapLianHuaGu_btn.mouseEnabled = true;
		}
		/**初始化地图图片*/
		public initicon(): void {
			this._viewUI.cangyugongicon_img.skin = "";
			this._viewUI.feixueyaicon_img.skin = "";
			this._viewUI.tianzhouyizhanicon_img.skin = "";
			this._viewUI.tianleiyuicon_img.skin = "";
			this._viewUI.chengningdaoicon_img.skin = "";
			this._viewUI.wangfengtingicon_img.skin = "";
			this._viewUI.liulintaohaiicon_img.skin = "";
			this._viewUI.yunxiaodianicon_img.skin = "";
			this._viewUI.jishizhenicon_img.skin = "";
			this._viewUI.baishaxiaozhuicon_img.skin = "";
			this._viewUI.youmingdianicon_img.skin = "";
			this._viewUI.chunqiulinicon_img.skin = "";
			this._viewUI.guajiicon_img.skin = "";
			this._viewUI.xiangsiguicon_img.skin = "";
			this._viewUI.taohuaxiicon_img.skin = "";
			this._viewUI.huangyanlingicon_img.skin = "";
			this._viewUI.huoyunzongicon_img.skin = "";
			this._viewUI.wulianggongicon_img.skin = "";
			this._viewUI.danyangguanicon_img.skin = "";
			this._viewUI.lianhuaguicon_img.skin = "";
			this._viewUI.qixingguanicon_img.skin = "";
			this._viewUI.panlongshanicon_img.skin = ""
		}
		/**选择要跳转的地图*/
		public minishow(sceneid: number): void {
			this.initbtn();
			this.initicon();
			switch (sceneid) {//选择跳转的场景按钮
				case MapInfo.MAP_HUOYUNZONG://火云宗
					this._viewUI.mapHuoYunZong_btn.mouseEnabled = false;
					this._viewUI.huoyunzongicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_JISHIZHEN://济世镇
					this._viewUI.mapJiShiZhen_btn.mouseEnabled = false;
					this._viewUI.jishizhenicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_TIANLEIYU://天雷狱
					this._viewUI.mapTianLeiYu_btn.mouseEnabled = false;
					this._viewUI.tianleiyuicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_YUNXIAODIAN://云霄殿
					this._viewUI.mapYunXiaoDian_btn.mouseEnabled = false;
					this._viewUI.yunxiaodianicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_WULIANGGONG://无量宫
					this._viewUI.mapWuLiangGong_btn.mouseEnabled = false;
					this._viewUI.wulianggongicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_CANGYUGONG://苍羽宫
					this._viewUI.mapCangYuGong_btn.mouseEnabled = false;
					this._viewUI.cangyugongicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_FEIXUEYA://飞雪涯
					this._viewUI.mapFeiXueYa_btn.mouseEnabled = false;
					this._viewUI.feixueyaicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_DANYANGGUAN://丹阳
					this._viewUI.mapDanYangGuan_btn.mouseEnabled = false;
					this._viewUI.danyangguanicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_YOUMINGDIAN://幽冥殿
					this._viewUI.mapYouMingDian_btn.mouseEnabled = false;
					this._viewUI.youmingdianicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_BAISHAXIAOZHU://白沙小筑
					this._viewUI.mapBaiShaXiaoZhu_btn.mouseEnabled = false;
					this._viewUI.baishaxiaozhuicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_XIANGSIGU://相思谷
					this._viewUI.mapXiangSiGu_btn.mouseEnabled = false;
					this._viewUI.xiangsiguicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_CHUNQIULIN://春秋林
					this._viewUI.mapChunQiuLin_btn.mouseEnabled = false;
					this._viewUI.chunqiulinicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_TAOHUAXI://桃花溪
					this._viewUI.mapTaoHuaXi_btn.mouseEnabled = false;
					this._viewUI.taohuaxiicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_HUANGYANLING://黄岩岭
					this._viewUI.mapHuangYanLing_btn.mouseEnabled = false;
					this._viewUI.huangyanlingicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_CHENGNINGDAO://城林道
					this._viewUI.mapChengNingDao_btn.mouseEnabled = false;
					this._viewUI.chengningdaoicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_PANLONGSHAN://盘龙山
					this._viewUI.mapPanLongShan_btn.mouseEnabled = false;
					this._viewUI.panlongshanicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_TIANZHOUYIZHAN://天洲驿站
					this._viewUI.mapTianZhouYiZhan_btn.mouseEnabled = false;
					this._viewUI.tianzhouyizhanicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_WANGFENGTING://望峰亭
					this._viewUI.mapWangFengTing_btn.mouseEnabled = false;
					this._viewUI.wangfengtingicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_LIULINTAOHAI://柳林桃海
					this._viewUI.mapLiuLinTaoHai_btn.mouseEnabled = false;
					this._viewUI.liulintaohaiicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_QIXINGGUAN://七星观
					this._viewUI.mapQiXingGuan_btn.mouseEnabled = false;
					this._viewUI.qixingguanicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				case MapInfo.MAP_LIANHUAGU://莲花谷
					this._viewUI.mapLianHuaGu_btn.mouseEnabled = false;
					this._viewUI.lianhuaguicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
					break;
				default:
					break;
			}
		}
		/**关闭*/
		private closeView(): void {
			//关闭世界地图按钮
			this.hide();
		}
		/**跳转地图*/
		public mapChange(mapid: number): void {
			//如果有队伍切不是队长切未暂离则不可跳图
			this.mapjump = 1
			let role: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
			let team: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2);
			if (team) {//是否有队伍
				if (team.teamindexstate > 0) {//在队伍中 暂离的话值为负数
					if ((team.teamindexstate >> 4) != 1) {//141216
						let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[141216];
						this.tips.onShow(chattext.msg);
						return;
					}
				}
			}
			this.getpost(mapid);
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			RequesterProtocols._instance.c2s_req_goto(mapid, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
			game.modules.autohangup.models.AutoHangUpModel.getInstance().notaketimer = 0
		}
		/**跳转地图*/
		public changepost(e: any): void {
			AutoHangUpModels.getInstance().notaketimer = 0
			HudModel.getInstance().taskxl = 0
			this._app.sceneObjectMgr.mainUnit.xunluo = 2
			this._app.sceneRoot.hangup = 0
			game.modules.mainhud.models.HudModel.getInstance().autobatt.stop()
			if (this.mapjump == 1) {//是否挂机地图
				game.modules.mainhud.models.HudModel.getInstance().autobatt.init()
				this.mapjump = 0
			}
			this.hide();
		}
		/**获取坐标*/
		public getpost(mapid: number) {
			let MapData: WorldMapConfigBaseVo = MapModel.getInstance().WorldMapConfigData[mapid]
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			let x, y: number;
			x = (Math.random() * (MapData.bottomx - MapData.topx) + MapData.topx)
			y = (Math.random() * (MapData.bottomy - MapData.topy) + MapData.topy)
			mainUnit.SetPosX(x);
			mainUnit.SetPosY(y);
			mainUnit.SetPos(x, y);
		}
		public show(): void {
			super.show();
			this.minishow(game.modules.mainhud.models.HudModel.getInstance().sceneid);
			this._app.uiRoot.closeLoadProgress();
		}
		public hide(): void {
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}