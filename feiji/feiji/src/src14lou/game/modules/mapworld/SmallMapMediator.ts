/**
* name 
*/
module game.modules.mapworld {
	export class SmallMapMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.MapSmallUI;
		public smallnpclist: Laya.Dictionary;/**npc列表 key为npckey*/
		public npcui: game.modules.commonUI.NpcDialogMediator;/**npc对话*/
		public pathnumber: Array<number> = [];
		private baoxiang: game.modules.commonUI.XinYunZhuanPanMediator/**幸运转盘*/
		//组队移动
		public teamwalks: Array<any> = []
		public teammoves: Array<Vector2> = []
		public teamroleid: Array<number> = []
		public pos: Vector2
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.MapSmallUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._viewUI.smallmap_img.mouseEnabled = true;
			this._viewUI.smallmap_img.mouseThrough = false;
			this._viewUI.smallmap_img.on(LEvent.MOUSE_DOWN, this, this.click);
			this._viewUI.MapWorld_btn.on(LEvent.MOUSE_DOWN, this, this.changemapworld);
			this._viewUI.NPClook_btn.on(LEvent.CLICK, this, this.NpcFind)
			this._viewUI.mapsmall_img.mouseThrough = false;
			this._viewUI.mapsmall_img.on(LEvent.MOUSE_DOWN, this, this.selectpos);
			this.pos = new Vector2()
			this._app = app;
			game.scene.models.SceneProxy.getInstance().on(game.scene.models.SMALL_MOVE, this, this.smallrolemove)
		}
		/**初始化数据*/
		public init(): void {
			this._viewUI.NPClist_img.visible = false;
			this._viewUI.npc_list.visible = false;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide)
			let mapid: number = game.modules.mainhud.models.HudModel.getInstance().sceneid;
			let mapinfo: WorldMapConfigBaseVo = models.MapModel.getInstance().WorldMapConfigData[mapid];
			let smallinfo: MapConfigBaseVo = models.MapModel.getInstance().MapConfigData[mapid]
			this._viewUI.mapsmall_img.skin = "common/scene/maps/" + parseInt(smallinfo.resdir) + "/" + parseInt(smallinfo.resdir) + ".jpg";
			let pos: Array<string> = [];
			pos = mapinfo.smallmapSize.split(";")
			this._viewUI.mapsmall_img.width = parseInt(pos[0]);
			this._viewUI.mapsmall_img.height = parseInt(pos[1]);
			this._viewUI.smallmap_box.x = (750 - this._viewUI.mapsmall_img.width) / 2
			this._viewUI.smallmap_box.y = (1334 - 100 - this._viewUI.mapsmall_img.height) / 2
			this._viewUI.mapdiban_img.width = this._viewUI.mapsmall_img.width + 20;
			this._viewUI.mapdiban_img.height = this._viewUI.mapsmall_img.height + 20;
			this._viewUI.smallmap_box.width = this._viewUI.mapsmall_img.width + 20;
			this._viewUI.smallmap_box.height = this._viewUI.mapsmall_img.height + 20;
			this._viewUI.close_btn.x = this._viewUI.mapdiban_img.width - 93
			this._viewUI.close_btn.y = this._viewUI.mapdiban_img.height
			this.smallnpclist = new Laya.Dictionary();
			this.drawmain();
			this.initnpclist();
		}
		/**坐标转化*/
		public initmapinfo(npcname: string, npcpos: Vector2, npccolor: string): void {
			//坐标乘以16在作百分比比较
			let x: number, y: number;
			x = npcpos.x;
			y = npcpos.y;
			let mapinfo: MapConfigBaseVo = models.MapModel.getInstance().MapConfigData[game.modules.mainhud.models.HudModel.getInstance().sceneid];
			let npc: Laya.Label = new Laya.Label;
			npc.text = npcname;
			npc.pos(this._viewUI.mapsmall_img.width * (x * 24 / mapinfo.width) - npc.width, this._viewUI.mapsmall_img.height * (y * 16 / mapinfo.height) - npc.height);
			npc.fontSize = 18;
			npc.color = "#" + npccolor.substring(2, npccolor.length);
			this._viewUI.mapsmall_img.addChild(npc);
		}
		/**小地图点击寻路*/
		public selectpos(e: LEvent): void {	
			let x: number, y: number;
			x = e.target.mouseX
			y = e.target.mouseY
			this.teamwalks = []
			this.teammoves = []
			this.teamroleid = []
			game.modules.mainhud.models.HudModel.getInstance().autobatt.stop()
			this._app.sceneRoot.isnpc = 0
			let mapinfo: MapConfigBaseVo = models.MapModel.getInstance().MapConfigData[game.modules.mainhud.models.HudModel.getInstance().sceneid];
			//小地图点击转化为大地图坐标
			let pos: Vector2 = new Vector2();
			pos.x = x / this._viewUI.mapsmall_img.width * mapinfo.width / 24;
			pos.y = y / this._viewUI.mapsmall_img.height * mapinfo.height / 16;			
			this.pos = pos
			if (!this.isteam()) {//是否在队伍里
				return;
			}
			else {
				let playrole: game.scene.models.RoleBasicVo = scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
				let team: game.scene.models.TeamOctetsVo = playrole.rolebasicOctets.datas.get(2);
				if (team) {//是否有队伍
					this.teammove()
				}
			}
			for (let k in this.smallnpclist.keys) {
				//判断是点击到了哪个NPC
				let npc: scene.models.NpcBasicVo = this.smallnpclist.get(this.smallnpclist.keys[k]);
				if (npc.pos.dist(pos) < 2) {//点击NPC
					game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.movestop, [npc.id, npc.npckey]);
					game.scene.models.SceneProxy.getInstance().event(game.scene.models.NPC_SELECT, [npc.npckey, 1])
					this.hide();
					break;
				}
			}
			//是否为当前坐标
			if (pos.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && pos.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) {
				return;
			}
			game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_PATH, this, this.drawpath);
			this._app.sceneObjectMgr.mainUnit.goto(Math.floor(pos.x), Math.floor(pos.y));
			this._app.sceneObjectMgr.mainUnit.autowalk = 1
		}
		/**判断是否在队伍中*/
		public isteam() {
			//判断是否在队伍中
			let playrole: game.scene.models.RoleBasicVo = scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
			let team: game.scene.models.TeamOctetsVo = playrole.rolebasicOctets.datas.get(2);
			if (team) {
				if ((team.teamindexstate >> 4) != 1 && (team.teamindexstate - ((team.teamindexstate >> 4) << 4)) == 1) {
					this._app.sceneObjectMgr.mainUnit.SetMoveStatus(0)
					return false;
				}
			}
			return true;
		}
		/**队伍移动*/
		public teammove() {
			let playrole: game.scene.models.RoleBasicVo = scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
			let team: game.scene.models.TeamOctetsVo = playrole.rolebasicOctets.datas.get(2);
			for (var k in scene.models.SceneModel.getInstance().rolelist.keys) {
				let menber: game.scene.models.RoleBasicVo = scene.models.SceneModel.getInstance().rolelist.get(scene.models.SceneModel.getInstance().rolelist.keys[k]);
				let menberteam: game.scene.models.TeamOctetsVo = menber.rolebasicOctets.datas.get(2);
				if (menberteam) {	//有队伍，检测是不是同一个队伍的，是则一起走
					if (menberteam.teamid == team.teamid && menber.rolebasicOctets.roleid != playrole.rolebasicOctets.roleid && (team.teamindexstate - ((team.teamindexstate >> 4) << 4)) == 1 && (menberteam.teamindexstate & 1) == 1) {
						this.teamwalks.push(menber.rolebasicOctets.rolename)
						this.teammoves.push(this.pos)
						this.teamroleid.push(menber.rolebasicOctets.roleid)
					}
				}
			}
			Laya.timer.once(300, this, this.teamwalk, [this.teamwalks[0], this.teammoves[0], 0, this.teamroleid[0]], false)
		}
		/**队伍其他角色延迟移动 自己是队长时*/
		teamwalk(rolename: string, pos: Vector2, count) {
			if (count >= this.teamwalks.length) {
				this.teamwalks = []
				this.teammoves = []
				this.teamroleid = []
				return;
			}
			game.scene.models.SceneProxy.getInstance().event(game.scene.models.TEAM_MOVE, [this.teamwalks[count], this.teammoves[count], this.teamroleid[count]]);
			count++
			Laya.timer.once(100, this, this.teamwalk, [this.teamwalks[count], this.teammoves[count], count, this.teamroleid[count]], false)
		}
		/**小地图上人物移动*/
		public smallrolemove(pos: Vector2): void {
			let roleimg: Laya.Image = this._viewUI.mapsmall_img.getChildByName("role") as Laya.Image;
			let mapinfo: MapConfigBaseVo = models.MapModel.getInstance().MapConfigData[game.modules.mainhud.models.HudModel.getInstance().sceneid];
			roleimg.x = this._viewUI.mapsmall_img.width * (pos.x * 24 / mapinfo.width) - 20;
			roleimg.y = this._viewUI.mapsmall_img.height * (pos.y * 16 / mapinfo.height) - 20;
			for (var index = 2; index < this.pathnumber.length; index += 2) {
				let post: Vector2 = new Vector2();
				post.x = this.pathnumber[index]
				post.y = this.pathnumber[index + 1];
				if (post.dist(pos) < 0.5) {
					this._viewUI.mapsmall_img.removeChildByName("path" + index);
					if (index == this.pathnumber.length - 2) {
						this._viewUI.mapsmall_img.removeChildByName("destpoint");
					}
				}
			}

		}
		/**描绘移动路径*/
		public drawpath(path: Array<number>): void {
			console.log("描绘路径：" + path);
			for (var index = 2; index < this.pathnumber.length; index += 2) {
				this._viewUI.mapsmall_img.removeChildByName("path" + index);
			}
			this._viewUI.mapsmall_img.removeChildByName("destpoint");
			let mapinfo: MapConfigBaseVo = models.MapModel.getInstance().MapConfigData[game.modules.mainhud.models.HudModel.getInstance().sceneid];
			for (var index = 2; index < path.length; index += 2) {
				let pathpoint: Laya.Image = new Laya.Image();
				pathpoint.skin = "common/ui/tongyong/yuanquan.png";
				pathpoint.width = 20;
				pathpoint.height = 20;
				pathpoint.name = "path" + index;
				let pos: Vector2 = new Vector2();
				pos.x = this._viewUI.mapsmall_img.width * (path[index] * 24 / mapinfo.width);
				pos.y = this._viewUI.mapsmall_img.height * (path[index + 1] * 16 / mapinfo.height);
				pathpoint.x = pos.x;
				pathpoint.y = pos.y;
				this._viewUI.mapsmall_img.addChild(pathpoint);
			}
			let dest: Laya.Image = new Laya.Image();
			dest.skin = "common/ui/tongyong/biao.png";
			dest.width = 25;
			dest.height = 40;
			dest.name = "destpoint";
			dest.x = this._viewUI.mapsmall_img.width * (path[path.length - 2] * 24 / mapinfo.width) - 5;
			dest.y = this._viewUI.mapsmall_img.height * (path[path.length - 1] * 16 / mapinfo.height) - 37;
			this._viewUI.mapsmall_img.addChild(dest);
			this.pathnumber = path;
		}
		/**将主角绘画到小地图上*/
		public drawmain(): void {
			let role: game.modules.createrole.models.RoleDetailVo = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
			let roleicon: Laya.Image = new Laya.Image();
			roleicon.name = "role";
			roleicon.skin = "common/icon/avatarrole/" + (role.shape + 30000) + ".png";
			let rolepos: Vector2 = game.modules.mainhud.models.HudModel.getInstance().pos;
			let mapinfo: MapConfigBaseVo = models.MapModel.getInstance().MapConfigData[game.modules.mainhud.models.HudModel.getInstance().sceneid];
			roleicon.pos(this._viewUI.mapsmall_img.width * (rolepos.x * 24 / mapinfo.width) - 20, this._viewUI.mapsmall_img.height * (rolepos.y * 16 / mapinfo.height) - 20);
			roleicon.width = 40;
			roleicon.height = 40;
			this._viewUI.mapsmall_img.addChild(roleicon);

		}
		/**从列表中选择NPC*/
		public click(e: LEvent): void {
			if (this._viewUI.NPClist_img.visible = true) {
				this._viewUI.NPClist_img.visible = false;
				this._viewUI.npc_list.visible = false;
			}
		}
		/**打开地图中显示的NPC列表*/
		public NpcFind(): void {
			if (this._viewUI.NPClist_img.visible == true) {//是否打开
				this._viewUI.NPClist_img.visible = false;
				this._viewUI.npc_list.visible = false;
			}
			else {
				this._viewUI.NPClist_img.visible = true;
				this._viewUI.npc_list.visible = true;

			}
		}
		/**隐藏NPC列表*/
		yincang(): void {
			this._viewUI.NPClist_img.visible = false;
			this._viewUI.npc_list.visible = false;
		}
		/**切换世界大地图*/
		public changemapworld(): void {
			this.hide();
			ModuleManager.show(ModuleNames.MAP_WORLD, this._app);
		}
		/**初始化小地图中的NPC*/
		public initnpclist(): void {
			var data: Array<any> = [];
			let index: number = 0;
			let allnpc: Laya.Dictionary = game.scene.models.SceneModel.getInstance().smallallnpc;
			for (let k in allnpc.keys) {
				let npc: scene.models.NpcBasicVo = allnpc.get(allnpc.keys[k]);
				let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[npc.id] as CNPCConfigBaseVo;
				if (npcinfo.minimapshow == "1") {//是否在小地图中显示
					this.smallnpclist.set(index, npc);
					index += 1;
					let npcshape: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[npcinfo.modelID];
					let npcinfobase: CNPCInfoBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCInfoData[npc.id];
					data.push({ npcName_lab: npcinfo.name, npcicon_img: "common/icon/avatarrole/" + npcshape.littleheadID + ".png" });
					this.initmapinfo(npcinfo.name, npc.pos, npcinfobase.namecolour);
				}
			}
			this._viewUI.npc_list.array = data
			this._viewUI.npc_list.vScrollBarSkin = "";
			this._viewUI.npc_list.repeatY = data.length;
			this._viewUI.npc_list.scrollBar.elasticBackTime = 200;
			this._viewUI.npc_list.scrollBar.elasticDistance = 50;
			this._viewUI.npc_list.renderHandler = new Handler(this, this.npchandler);
		}
		//**初始化响应事件 */
		public npchandler(cell: Box, index: number): void {
			let btn: Button = cell.getChildByName("selectnpc_btn") as Button;
			btn.on(LEvent.CLICK, this, this.selectnpc, [cell, index]);
		}
		/**小地图选择NPC*/
		public selectnpc(cell: Box, index: number): void {
			this._app.sceneObjectMgr.mainUnit.autowalk = 1
			game.modules.mainhud.models.HudModel.getInstance().autobatt.stop()
			let npc: scene.models.NpcBasicVo = this.smallnpclist.get(index);
			game.scene.models.SceneProxy.getInstance().event(game.scene.models.NPC_SELECT, [npc.npckey, 1])
			game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.movestop, [npc.id, npc.npckey]);
			this._app.sceneObjectMgr.mainUnit.goto(Math.floor(npc.pos.x), Math.floor(npc.pos.y));
			this.hide();
		}
		/**角色停止后与NPC交流*/
		public movestop(npcid: number, npckey: number): void {
			this._viewUI.smallmap_img.removeChildByName("path" + (this.pathnumber.length - 2));
			RequesterProtocols._instance.c2s_visit_npc(npckey);
			game.scene.models.SceneProxy.getInstance().once(game.scene.models.NPC_DIALOG, this, this.initnpc);
			 console.log("-------------------move 9");
			RequesterProtocols._instance.c2s_role_move(this._app.sceneObjectMgr.mainUnit.target, this._app.sceneObjectMgr.mainUnit.target, game.modules.mainhud.models.HudModel.getInstance().sceneid);
		}
		/**NPC数据*/
		initnpc(npckey: number, services: Array<number>, scenarioquests: Array<number>): void {
			let npc: game.scene.models.NpcBasicVo = game.scene.models.SceneModel.getInstance().npclist.get(npckey);
			let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[npc.id];
			if (npcinfo.npctype == 29) {//宝箱
				this.baoxiang = new game.modules.commonUI.XinYunZhuanPanMediator(this._app)
				this.baoxiang.show()
			}
			else {
				this.npcui = new game.modules.commonUI.NpcDialogMediator(this._app);
				this.npcui.init(npckey, services, scenarioquests);
			}

		}
		public show(): void {
			this.init();
			super.show();
		}
		public hide(): void {
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}