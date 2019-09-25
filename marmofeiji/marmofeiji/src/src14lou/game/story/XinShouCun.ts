/**
* 新手村 测试 
*/
import SceneModel = game.scene.models.SceneModel;
module game.story {//场景NPC创建
	export class XinShouCun extends Base {
		private _scene: SceneRoot;					//场景
		private _objMgr: SceneObjectMgr;				//场景对象管理器
		private _showRect: Rectangle;				//显示区域
		/**人物角色*/
		private _roles: FakeUnit[] = [];
		/**NPC存储信息*/
		private _npc: FakeUnit[] = [];
		/**人物上个坐标*/
		public lastpos: Vector2
		//相机逻辑范围
		/**当前相机左边所在位置*/
		public logicLeft: number;
		/**右边所在位置*/
		public logicRight: number;
		/**上边所在位置*/
		public logicTop: number;
		/**下边所在位置*/
		public logicBottom: number;
		/**当前场景可见人数 */
		public countnum: number
		/**队伍成员的信息*/
		public teamwalk: Array<any> = []
		/**队伍移动的坐标*/
		public teammoves: Array<Vector2> = []
		/**队伍移动的角色IS*/
		public teamroleid: Array<number> = []
		/**队伍移动的坐标*/
		public teamtarget: Array<Vector2> = []
		/**判断是否已经到了目的地*/
		public teamweizhi: Array<number> = []
		constructor(app: AppBase) {
			super(app);
			this.lastpos = new Vector2();
			this._npc = []
		}
		//退出
		exit(): void {
			this.clear();
		}
		// 清理
		clear(): void {
			super.clear();
			if (this._roles) {
				for (let i: number = 0; i < this._roles.length; i++) {
					if (!this._roles[i]) continue;
					this._objMgr.ReleaseObject(this._roles[i]);
					this._roles[i] = null;
				}
				this._roles = null;
				this._objMgr.kuileiArr = [];
			}
			if (this._npc) {
				for (let i: number = 0; i < this._npc.length; i++) {
					if (!this._npc[i]) continue;
					this._objMgr.ReleaseObject(this._npc[i]);
					this._npc[i] = null;
				}
				this._npc = null;
			}
			if (this._scene) {
				this._scene.mouseLock = false;
				this._scene.camera.mode = Camera.MODE_FOLLOW;
				this._scene = null;
			}
			this.needJieChiCamer = false;
			this._objMgr = null;
			this._showRect = null;
		}
		rolelist() {
			return this._roles;
		}
		//初始化
		init(): void {
			super.init();
			this._objMgr = this._app.sceneObjectMgr;
			this._scene = this._app.sceneRoot;
			let info: game.data.MapAssetInfo = this._objMgr.mapAssetInfo;
			this._showRect = new Rectangle(8, 17, info.logicWidth - 16, info.logicHeight - 20);

			game.scene.models.SceneProxy.getInstance().on(game.scene.models.MODEL_CREATE, this, this.modelcreate);//模型创建
			game.scene.models.SceneProxy.getInstance().on(game.scene.models.MODEL_CELAR, this, this.clearmodel);//清除模型
			game.scene.models.SceneProxy.getInstance().on(game.scene.models.OTHERROLE_MOVE, this, this.othermove);//其他玩家移动
			game.scene.models.SceneProxy.getInstance().on(game.scene.models.TEAM_MOVE, this, this.teammove)//队伍移动
			game.scene.models.SceneProxy.getInstance().on(game.scene.models.TEAM_STATE, this, this.refreshstate)//刷新队伍状态
			game.scene.models.SceneProxy.getInstance().on(game.scene.models.NPC_SELECT, this, this.refrenpc)//刷新NPC选中特效
			game.scene.models.SceneProxy.getInstance().on(game.scene.models.ROLE_SELECT, this, this.refreshrole)//刷新人物选中特效
			game.scene.models.SceneProxy.getInstance().on(game.scene.models.TASK_TIPS, this, this.refreshnpcbody)//刷新NPC头顶任务特效
		}
		//剧情3D场景加载完成
		public onCompleteScene3D(): void {
			if (this._objMgr.mainUnit) this.onMainUnitUpdate();
			else this._objMgr.on(SceneObjectMgr.MAINUNIT_UPDATE, this, this.onMainUnitUpdate);
		}
		//主玩家unit对象有更新  重复创建模型	
		private onMainUnitUpdate(): void {
			this._scene.mouseLock = true;
			//  this._scene.camera.mode = Camera.MODE_FOLLOW;
			//  this.needJieChiCamer = true;//劫持摄像头

			let mainUnit = this._app.sceneObjectMgr.mainUnit;

			mainUnit && this._app.sceneRoot.camera.follow(mainUnit.pos);
			// mainUnit.SetName("hello",true)
			this._roles = [];
			this._objMgr.kuileiArr = [];
			this._npc = [];
			let entrys: number[] = [2, 3, 4, 5, 6];

			let x: number, y: number;
			let fakeUnit: FakeUnit

			for (let key in game.scene.models.SceneModel.getInstance().rolelist.keys) {//创建人物模型
				let role: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.scene.models.SceneModel.getInstance().rolelist.keys[key]);
				if (role.rolebasicOctets.roleid == game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) {
					continue;
				}
				let roles: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[role.rolebasicOctets.shape]
				fakeUnit = this.createFakeUnit(role.rolebasicOctets.rolename, UnitField.TYPE_ID_PLAYER, parseInt(roles.shape), 0, role.pos.x, role.pos.y, 120, 1, true, false);
				this.setComponent(role,fakeUnit);
				this.addKuiLeiModel(role);
				let teams: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2);
				if (teams && teams.teamindexstate > 0) {//在队伍中 暂离的话值为负数
					if ((teams.teamindexstate >> 4) == 1) {//141216
						fakeUnit.captain = 1
					}
					else {
						fakeUnit.captain = 0
					}
				}
				else {
					fakeUnit.captain = -1
				}
				fakeUnit.npcFlag = 2
				this._roles.push(fakeUnit);
				this._updateNpcTitle(role,fakeUnit);
			}
			//添加傀儡
			let _school = LoginModel.getInstance().roleDetail.school;
			if (_school == zhiye.tianlei || _school == zhiye.xuanming) {
				let fake = this.createFakeUnit("傀儡", UnitField.TYPE_ID_PLAYER, 1010101, 0, this._objMgr.mainUnit.pos.x, this._objMgr.mainUnit.pos.y, 120, 1, true, false);
				fake.masterOid = LoginModel.getInstance().roleDetail.roleid;
				this._objMgr.kuileiUnit = fake;
				this._roles.push(fake);
			}

			for (let key in game.scene.models.SceneModel.getInstance().npclist.keys) {//创建NPC模型
				let npc: game.scene.models.NpcBasicVo = game.scene.models.SceneModel.getInstance().npclist.get(game.scene.models.SceneModel.getInstance().npclist.keys[key]);
				let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[npc.id] as CNPCConfigBaseVo;
				let shape: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[npcinfo.modelID]
				// fakeUnit = this.createFakeUnit(npc.name, UnitField.TYPE_ID_CREATURE, parseInt(shape.shape), 0, npc.pos.x, npc.pos.y, 120, npcinfo.ndir * 16, true, false);
				fakeUnit = this.createFakeUnit(npc.name, UnitField.TYPE_ID_CREATURE, npcinfo.modelID, 0, npc.pos.x, npc.pos.y, 120, npcinfo.ndir * 16, true, false);
				fakeUnit.npcFlag = 2// NPC选择颜色				
				fakeUnit.npckey = npc.npckey
				fakeUnit.npcid = npc.id
				if(npcinfo.foottitle && npcinfo.foottitle != "")
				fakeUnit.appellation = "[00ffff]"+ npcinfo.foottitle;
				this._npc.push(fakeUnit);
			}
			game.scene.models.SceneProxy.getInstance().event(game.scene.models.AUTO_MOVE);
			game.modules.mainhud.models.HudModel.getInstance().isrefreshall++
		}
		/** 设置造型数据 */
		setComponent(role:game.scene.models.RoleBasicVo,fakeUnit:Unit):void
		{
			    if( !role || !fakeUnit ) return ;
				fakeUnit.School = 10 + (role.rolebasicOctets.dirandschool & 0x0F);
				fakeUnit.Shape = role.rolebasicOctets.shape;
				if( !role.rolebasicOctets.components ) return;
				for (var _index = 0;_index <  role.rolebasicOctets.components.keys.length; _index++) 
				{
					if( role.rolebasicOctets.components.keys[_index] == SpriteComponents.SPRITE_WEAPON)
					{
						let weaponId = role.rolebasicOctets.components.get(role.rolebasicOctets.components.keys[_index]);
						let equip = StrengTheningModel.getInstance().equipEffectData[weaponId];
						if (equip) {
							fakeUnit.Weapon = equip.weaponid;
							return;
						} 
					}
				}
		}
		/**NPC头顶特殊图标 */
		showtoptips(fakeUnit: FakeUnit, npcid, state: number) {
			if (fakeUnit) {
				fakeUnit.zhuxian = 2
				switch (npcid) {
					case 19000:
						fakeUnit.chief = state
						break;
					case 19001:
						fakeUnit.chief = state
						break;
					case 19002:
						fakeUnit.chief = state
						break;
					case 19003:
						fakeUnit.chief = state
						break;
					case 19004:
						fakeUnit.chief = state
						break;
					case 19005:
						fakeUnit.chief = state
						break;
					case 19006:
						fakeUnit.chief = state
						break;
					case 19007:
						fakeUnit.chief = state
						break;
					case 19008:
						fakeUnit.chief = state
						break;
					case 19034:
						fakeUnit.familyfuben = state
						break;
					case 19036:
						fakeUnit.welfare = state
						break;
					case 19040:
						fakeUnit.petshop = state
						break;
					case 19041:
						fakeUnit.shop = state
						break;
					case 19044:
						fakeUnit.baotu = state
						break;
					case 19045:
						fakeUnit.carbon = state
						break;
					case 19047:
						fakeUnit.demon = state
						break;
					case 19048:
						fakeUnit.tumo = state
						break;
					case 19049:
						fakeUnit.ranse = state
						break;
					case 19058:
						fakeUnit.xuanshang = state
						break;
					case 19062:
						fakeUnit.biwu = state
						break;
					default:
						break;
				}
			}
		}
		/**NPC头顶任务图标*/
		showtasktips(fakeUnit: FakeUnit, npcid) {
			if (fakeUnit) {//是否有该NPC
				let showtype: number = 0
				for (let key in Taskmodels.getInstance().accepttask.keys) {
					let accepttasks: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[Taskmodels.getInstance().accepttask.keys[key]];
					let accept: game.modules.task.models.MissionInfoVo = Taskmodels.getInstance().accepttask.get(Taskmodels.getInstance().accepttask.keys[key])
					if (accepttasks.ActiveInfoNpcID == npcid) {/**已完成 */
						showtype = accept.missionstatus
						break;
					}
				}
				for (var key = 0; key < Taskmodels.getInstance().acceptableTask.length; key++) {
					let accepttable: AcceptableTaskBaseVo = Taskmodels.getInstance().acceptableTaskData[Taskmodels.getInstance().acceptableTask[key]]
					if (accepttable.destnpcid == npcid && showtype != 3) {//该NPC是否有任务
						showtype = -1
						break;
					}
				}
				for (let key in game.modules.task.models.TaskModel.getInstance().schooltask.keys) {
					let questid = game.modules.task.models.TaskModel.getInstance().schooltask.keys[key]
					let specialQuest: game.modules.task.models.SRefreshSpecialQuestVo = game.modules.task.models.TaskModel.getInstance().schooltask.get(questid);
					if (specialQuest.dstnpcid == npcid && showtype != 3) {
						showtype = specialQuest.queststate;
						break;
					}
				}
				fakeUnit.accpet = showtype
				for (let key in Taskmodels.getInstance().maintask.keys) {
					let maintasks: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[Taskmodels.getInstance().maintask.keys[key]];
					if (maintasks.ActiveInfoNpcID == npcid) {//该NPC是否有任务
						if (maintasks.MissionType == 40) {
							fakeUnit.zhuxian = 6
							fakeUnit.count = fakeUnit.count + 1
						}
						else {
							fakeUnit.zhuxian = 1
							fakeUnit.count = fakeUnit.count + 1
						}
						break;
					}
					else if (fakeUnit.zhuxian != -1) {//关闭任务特效
						fakeUnit.zhuxian = 2
					}
				}
			}
		}
		/**实时更新数据*/
		update(diff: number): void {
			// 战斗中
			if (this._app.battleProxy.battle) return;


			if (this._objMgr.mainUnit) {
				//  logd("=====玩具位置",this._objMgr.mainUnit.pos.x,this._objMgr.mainUnit.pos.y)
				game.modules.mainhud.models.HudModel.getInstance().pos = this._objMgr.mainUnit.pos;
				game.scene.models.SceneProxy.getInstance().event(game.scene.models.SMALL_MOVE, [this._objMgr.mainUnit.pos]);
				game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.SETPOST_EVENT);
				if (this.teamtarget.length != 0 && this.teamroleid.length != 0 && this.teamweizhi.length != 0) {//队伍坐标是否放生变化
					for (var index = 0; index < this.teamtarget.length; index++) {
						let roles: game.scene.models.RoleBasicVo = scene.models.SceneModel.getInstance().rolelist.get(this.teamroleid[index]);
						for (let i: number = 0; i < this._roles.length; i++) {
							if (!this._roles[index])//是否有信息
								continue;
							if (this._roles[index].GetName() == roles.rolebasicOctets.rolename && this.teamweizhi[index] == 0) {
								roles.pos = this._objMgr.mainUnit.pos
								if (this.teamtarget[index].x == this._objMgr.mainUnit.pos.x && this.teamtarget[index].y == this._objMgr.mainUnit.pos.y) {//是否到达分配的位置
									this.teamweizhi[index] = 1
								}
								break;
							}
						}
					}
				}
				let cam: Camera = this._app.sceneRoot.camera
				//相机是否发生移动
				if (this.lastpos.x != 0 && this.lastpos.y != 0 && (this.lastpos.x != this._objMgr.mainUnit.pos.x || this.lastpos.y != this._objMgr.mainUnit.pos.y)) {
					if (cam.logicLeft != this.logicLeft && cam.logicRight != this.logicRight) {//相机位置是否变化
						if (this._objMgr.mainUnit.pos.x > this.lastpos.x) {//位移变化时特效按相反位置移动
							for (var index = 0; index < this._app.sceneRoot.allwalk.length; index++) {
								this._app.sceneRoot.allwalk[index].x -= (this._objMgr.mainUnit.pos.x - this.lastpos.x) * 24
							}
							this.lastpos.x += (this._objMgr.mainUnit.pos.x - this.lastpos.x)
						}
						else if (this._objMgr.mainUnit.pos.x < this.lastpos.x) {//位移变化时特效按相反位置移动
							for (var index = 0; index < this._app.sceneRoot.allwalk.length; index++) {
								this._app.sceneRoot.allwalk[index].x += (this.lastpos.x - this._objMgr.mainUnit.pos.x) * 24
							}
							this.lastpos.x -= (this.lastpos.x - this._objMgr.mainUnit.pos.x)
						}
						this.logicLeft = cam.logicLeft
						this.logicRight = cam.logicRight
					}
					if (cam.logicTop != this.logicTop && cam.logicBottom != this.logicBottom) {//相机位置是否变化
						if (this._objMgr.mainUnit.pos.y > this.lastpos.y) {//位移变化时特效按相反位置移动
							for (var index = 0; index < this._app.sceneRoot.allwalk.length; index++) {
								this._app.sceneRoot.allwalk[index].y -= (this._objMgr.mainUnit.pos.y - this.lastpos.y) * 16
							}
							this.lastpos.y += (this._objMgr.mainUnit.pos.y - this.lastpos.y)
						}
						else if (this._objMgr.mainUnit.pos.y < this.lastpos.y) {//位移变化时特效按相反位置移动
							for (var index = 0; index < this._app.sceneRoot.allwalk.length; index++) {
								this._app.sceneRoot.allwalk[index].y += (this.lastpos.y - this._objMgr.mainUnit.pos.y) * 16
							}
							this.lastpos.y -= (this.lastpos.y - this._objMgr.mainUnit.pos.y)
						}
						this.logicBottom = cam.logicBottom
						this.logicTop = cam.logicTop
					}
				}
				else if (this.lastpos.x == 0 && this.lastpos.y == 0) {//刚进来游戏的赋值当前人物所在坐标
					let role: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
					this.lastpos = role.pos
				}
				if (this.logicLeft == null) {//赋予相机初始坐标
					this.logicLeft = cam.logicLeft
					this.logicRight = cam.logicRight
					this.logicTop = cam.bufferTop
					this.logicBottom = cam.logicBottom
					this.countnum = -1
				}
				for (var index = 0; index < this._app.sceneRoot.allwalk.length; index++) {//清除行走特效
					if (!this._app.sceneRoot.allwalk[index].isPlaying) {//是否在移动
						this._app.sceneRoot.allwalk[index].clear()
					}
				}
				this.refreshalltexiao()//刷新所有特效
				this.moveUnit(this._objMgr.mainUnit);
				if (game.modules.mainhud.models.HudModel.getInstance().isrefreshall == 2) {//是否已经所有都加载完毕
					game.modules.mainhud.models.HudModel.getInstance().joingame = 1
				}
			}
		}
		//移动场景
		public get isSceneMove(): boolean {
			return false;
		}
		//模拟移动
		private moveUnit(target: Unit): void {//挂机地图随机坐标 自动行走
			if (target.isMoving || this._app.sceneRoot.hangup == 0) return;
			let [x, y] = this.getRandomPos();
			if (target instanceof FakeUnit) target.goto(x, y);
			else this._app.aCotrller.moveToDst(x, y);
		}
		//获取随机位置
		private getRandomPos(): [number, number] {
			return [Math.random() * this._showRect.width *0.2+ this._showRect.x, Math.random() * this._showRect.height*0.6 + this._showRect.y];
		}
		/**
		 * 创建假的Unit对象
		 * @param oname 名称
		 * @param typeid id类型
		 * @param cid 模板id
		 * @param lv 等级
		 * @param px 坐标x
		 * @param py 坐标y
		 * @param speed 速度
		 * @param toward 朝向
		 * @param needShowName 是否显示名字
		 * @param needShowAnger 是否显示怒气条
		 */
		private createFakeUnit(oname: string, typeid: number, cid: number, lv: number, px: number, py: number, speed: number, toward: number, needShowName: boolean = false, needShowAnger: boolean = false): FakeUnit {
			let fakeUnit: FakeUnit = this._objMgr.CreateFakeObject() as FakeUnit;
			fakeUnit.SetTypeId(typeid);
			fakeUnit.SetEntry(cid);
			if (oname && oname.length) {
				fakeUnit.SetName(oname);
			} else if (cid) {
				let temp: any = Template.getCreatureTempById(cid);
				temp && fakeUnit.SetName(temp.name);
			}
			fakeUnit.needShowName = needShowName;
			fakeUnit.needShowAnger = needShowAnger;
			fakeUnit.scale = 1;
			fakeUnit.SetLevel(lv);
			fakeUnit.SetPos(px, py);
			fakeUnit.SetSpeed(speed);
			fakeUnit.toward = toward;
			fakeUnit.fristUpdate()
			return fakeUnit;
		}
		/**模型创建*/
		modelcreate(): void {		//当有新的NPC或者玩家添加时会调用该方法
			if (!this._npc && !this._roles) {
				this.init();
				return;
			}
			//判断是否有新的NPC或者人物进来，有就添加没有就不刷新
			this._scene.mouseLock = true;
			for (let key in game.scene.models.SceneModel.getInstance().newrolelist.keys) {
				let role: game.scene.models.RoleBasicVo
				role = game.scene.models.SceneModel.getInstance().newrolelist.get(game.scene.models.SceneModel.getInstance().newrolelist.keys[key]);
				if (role.rolebasicOctets.roleid == game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) {//是否是自己
					continue;
				}
				if (this._roles && this._roles.length != 0) {//是否有其他角色
					let isdel: number = 0
					for (let i: number = 0; i < this._roles.length; i++) {
						if (!this._roles[i]) continue;
						if (role.rolebasicOctets.rolename == this._roles[i].name) {//名字是否相同
							isdel = 1
							break;
						}
					}
					if (isdel == 0) {
						let roles: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[role.rolebasicOctets.shape]
						let fakeUnit: FakeUnit
						fakeUnit = this.createFakeUnit(role.rolebasicOctets.rolename, UnitField.TYPE_ID_PLAYER, parseInt(roles.shape), 0, role.pos.x, role.pos.y, 120, 1, true, false);
						this.setComponent(role,fakeUnit);
						this.addKuiLeiModel(role)
						let teams: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2);
						if (teams && teams.teamindexstate > 0) {//在队伍中 暂离的话值为负数
							if ((teams.teamindexstate >> 4) == 1) {//141216
								fakeUnit.captain = 1
							}
							else {
								fakeUnit.captain = 0
							}
						}
						else {
							fakeUnit.captain = -1
						}
						this._roles.push(fakeUnit);
						this._updateNpcTitle(role,fakeUnit);
					}
					
				}
				else {
					if (this._roles == null)//是否为第一个其他角色进入
						this._roles = []
					let roles: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[role.rolebasicOctets.shape]
					let fakeUnit: FakeUnit
					fakeUnit = this.createFakeUnit(role.rolebasicOctets.rolename, UnitField.TYPE_ID_PLAYER, parseInt(roles.shape), 0, role.pos.x, role.pos.y, 120, 1, true, false);
					this.addKuiLeiModel(role);
					let teams: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2);
					if (teams && teams.teamindexstate > 0) {//在队伍中 暂离的话值为负数
						if ((teams.teamindexstate >> 4) == 1) {//141216
							fakeUnit.captain = 1
						}
						else {
							fakeUnit.captain = 0
						}
					}
					else {
						fakeUnit.captain = -1
					}
					this._roles.push(fakeUnit);
					this._updateNpcTitle(role,fakeUnit);
				}

			}//主玩家判断职业
			let _school = LoginModel.getInstance().roleDetail.school ;
			if (scene.models.SceneModel.getInstance().kuileiOccupation.indexOf(_school) != -1) {
				let fake = this.createFakeUnit("傀儡", UnitField.TYPE_ID_CREATURE, 1010101, 0, this._objMgr.mainUnit.pos.x, this._objMgr.mainUnit.pos.y, 120, 1, true, false);
				fake.masterOid = LoginModel.getInstance().roleDetail.roleid;
				this._objMgr.kuileiUnit = fake;
				this._roles.push(fake);
			}
			for (let key in game.scene.models.SceneModel.getInstance().newnpclist.keys) {
				let isdel: number = 0
				let npc: game.scene.models.NpcBasicVo
				npc = game.scene.models.SceneModel.getInstance().newnpclist.get(game.scene.models.SceneModel.getInstance().newnpclist.keys[key]);
				if (this._npc && this._npc.length != 0) {
					for (let i: number = 0; i < this._npc.length; i++) {
						if (!this._npc[i]) continue;//是否有NPC信息
						if (this._npc[i].GetPosX() == npc.pos.x && this._npc[i].GetPosY() == npc.pos.y && npc.npckey == this._npc[i].npckey) {//是否该有NPC信息
							isdel = 1
							break;
						}
					}
					if (isdel == 0) {//没有NPC数据
						let fakeUnit: FakeUnit
						let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[npc.id] as CNPCConfigBaseVo;
						let shape: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[npcinfo.modelID];
						// fakeUnit = this.createFakeUnit(npc.name, UnitField.TYPE_ID_CREATURE, parseInt(shape.shape), 0, npc.pos.x, npc.pos.y, 120, npcinfo.ndir * 16, true, false);
						fakeUnit = this.createFakeUnit(npc.name, UnitField.TYPE_ID_CREATURE, npcinfo.modelID, 0, npc.pos.x, npc.pos.y, 120, npcinfo.ndir * 16, true, false);
						fakeUnit.npcFlag = 2// NPC选择颜色
						fakeUnit.npckey = npc.npckey
						fakeUnit.npcid = npc.id
						if(npcinfo.foottitle && npcinfo.foottitle != "")
						fakeUnit.appellation = "[00ffff]"+ npcinfo.foottitle;
						this._npc.push(fakeUnit);
					}
				}
				else {
					if (this._npc == null)//第一个NPC进入
						this._npc = []
					let fakeUnit: FakeUnit
					let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[npc.id] as CNPCConfigBaseVo;
					let shape: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[npcinfo.modelID]
					// fakeUnit = this.createFakeUnit(npc.name, UnitField.TYPE_ID_CREATURE, parseInt(shape.shape), 0, npc.pos.x, npc.pos.y, 120, npcinfo.ndir * 16, true, false);
					fakeUnit = this.createFakeUnit(npc.name, UnitField.TYPE_ID_CREATURE, npcinfo.modelID, 0, npc.pos.x, npc.pos.y, 120, npcinfo.ndir * 16, true, false);
					fakeUnit.npcFlag = 2// NPC选择颜色	
					fakeUnit.npckey = npc.npckey
					fakeUnit.npcid = npc.id
					if (npcinfo.foottitle && npcinfo.foottitle != "")
					fakeUnit.appellation = "[00ffff]"+ npcinfo.foottitle;
					this._npc.push(fakeUnit);
				}
			}
		}
		/** 创建附加傀儡模型
		 * @param _school 职业
		 * @param unit Unit
		 */
		private addKuiLeiModel( role:game.scene.models.RoleBasicVo):void
		{
			let _school =  10 + (role.rolebasicOctets.dirandschool & 0x0F);
			if( scene.models.SceneModel.getInstance().kuileiOccupation.indexOf( _school ) != -1 )
			{
				let fake = this.createFakeUnit("傀儡", UnitField.TYPE_ID_CREATURE, 5003002, 0, role.pos.x, role.pos.y, 120, 1, true, false);
				fake.masterOid = role.rolebasicOctets.roleid;
				this._objMgr.kuileiArr.push(fake);
			}
		}
		/**模型清除*/
		clearmodel(roleinfo: Laya.Dictionary, npclist: Laya.Dictionary): void {//当有玩家离开当前地图时调用 所有玩家信息，所有NPC信息
			if (this._roles) {

				for (let k in roleinfo.keys) {
					for (let i: number = 0; i < this._roles.length; i++) {
						if (!this._roles[i]) continue;//是否有信息
						let role: game.scene.models.RoleBasicVo = roleinfo.get(roleinfo.keys[k]);
						if (role && this._roles[i].GetName() == role.rolebasicOctets.rolename) {//是否是要清除的人物
							this._objMgr.ReleaseObject(this._roles[i]);
							this._roles[i] = null;
							break;
						}
					}
				}
			}
			if (this._npc) {
				for (let k in npclist.keys) {
					for (let i: number = 0; i < this._npc.length; i++) {
						if (!this._npc[i]) continue;//是否有信息
						if (npclist.keys[k] == this._npc[i].npckey) {//是否是要清除的NPC
							this._objMgr.ReleaseObject(this._npc[i]);//释放模型
							this._npc[i] = null;
							break;
						}
					}
				}
			}
		}
		/**非本人玩家移动时 */
		othermove(roleid: number, rolepos: Vector2): void {//移动玩家的ID以及坐标
			if (this._roles) {
				this.teamwalk = []
				this.teammoves = []
				this.teamtarget = []
				this.teamweizhi = []
				let otherrole: game.scene.models.RoleBasicVo
				for (let i: number = 0; i < this._roles.length; i++) {
					if (!this._roles[i]) continue;
					let role: game.scene.models.RoleBasicVo = scene.models.SceneModel.getInstance().rolelist.get(roleid);
					let teams: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2);
					for (let p in scene.models.SceneModel.getInstance().rolelist.keys) {
						let otherrole1: game.scene.models.RoleBasicVo = scene.models.SceneModel.getInstance().rolelist.get(scene.models.SceneModel.getInstance().rolelist.keys[p]);
						if (otherrole1.rolebasicOctets.rolename == this._roles[i].GetName()) {//是否是同一个玩家
							let otherteam: game.scene.models.TeamOctetsVo = otherrole1.rolebasicOctets.datas.get(2);
							otherrole = role
							if (otherteam != null && teams != null && otherteam.teamindexstate > 0) {//有队伍的判断 有队伍且在队伍里则全部收集起来后再判断
								if ((otherteam.teamid == teams.teamid && (teams.teamindexstate & 1) == 1 && (otherteam.teamindexstate & 1) == 1)) {//是否是队长
									this.teamwalk.push(this._roles[i])
									this.teammoves.push(rolepos)
									this.teamroleid.push(roleid)
								}
								break;
							}
							else {
								if (this._roles[i].GetName() == role.rolebasicOctets.rolename) {
									let roles: game.scene.models.RoleBasicVo = scene.models.SceneModel.getInstance().rolelist.get(roleid);
									let path :Array<number> = [];
									if( this._app.sceneObjectMgr.mapAssetInfo.trukPath )
									path = this._app.sceneObjectMgr.mapAssetInfo.trukPath.find(roles.pos.x, roles.pos.y,rolepos.x, rolepos.y, 0);
									if (!AStar.isInvalidPath(path)) {//是否有效路径
										let _schoo = 10 + (role.rolebasicOctets.dirandschool & 0x0F);
										let _include = game.scene.models.SceneModel.getInstance().kuileiOccupation.indexOf(_schoo);
										this._roles[i].goto(Math.floor(rolepos.x),Math.floor(rolepos.y));
										if (_include == -1 || !this._objMgr.kuileiArr) continue;
										for (var _index = 0; _index < this._objMgr.kuileiArr.length; _index++) {
											if (this._objMgr.kuileiArr[_index].masterOid == role.rolebasicOctets.roleid)
												this._objMgr.kuileiArr[_index].goto(rolepos.x, rolepos.y);
										}
										break;
									}
									else if (path.length == 0) {//无效路径
										break
									}

						
								}
							}
						}
					}
				}
				//判断该移动的玩家是不是同一个队伍,
				let playrole: game.scene.models.RoleBasicVo = scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
				let team: game.scene.models.TeamOctetsVo = playrole.rolebasicOctets.datas.get(2);
				let team1: game.scene.models.TeamOctetsVo = otherrole.rolebasicOctets.datas.get(2);
				if (team != null && team1 != null) {//是否在队伍
					//是否在同一个队伍中且不暂离
					if (team.teamid == team1.teamid && (team.teamindexstate - ((team.teamindexstate >> 4) << 4)) == 1 && (team1.teamindexstate & 1) == 1 && team1.teamindexstate > 0) {
						this.teamwalk.push(this._app.sceneObjectMgr.mainUnit)
						this.teammoves.push(rolepos)
						this.teamroleid.push(playrole.rolebasicOctets.roleid)
					}
				}
				Laya.timer.once(100, this, this.teamwalkmove, [this.teamwalk[0], this.teammoves[0], 0, this.teamroleid[0]], false)
			}
		}
		/**队伍移动*/
		teamwalkmove(role: any, pos: Vector2, count, roleid: number) {
			if (count >= this.teamwalk.length) {//是否都移动完了
				return;
			}
			let path: Array<number> = [];
			let counts: number = 0
			let poss: Vector2 = new Vector2()
			let roles: game.scene.models.RoleBasicVo = scene.models.SceneModel.getInstance().rolelist.get(roleid);
			let teams: game.scene.models.TeamOctetsVo = roles.rolebasicOctets.datas.get(2);
			let s = (teams.teamindexstate >> 4) & 15//1为队长
			poss = pos
			while (1) {
				let test: Vector2 = new Vector2()
				test = poss
				if (counts == 0) {//横坐标加减后判断
					if (role.pos.x > poss.x) {
						test.x += 2 * (s - 1)
					}
					else if (role.pos.x < poss.x) {
						test.x -= 2 * (s - 1)
					}
					counts++
				}
				else if (counts == 1) {//纵坐标变化判断
					if (role.pos.y > test.y) {
						test.y += 2 * (s - 1)
					}
					else if (role.pos.y < test.y) {
						test.y -= 2 * (s - 1)
					}
					counts++
				}
				else {
					if (role.pos.x > poss.x) {
						test.x += 2 * (s - 1)
					}
					else if (role.pos.x < poss.x) {
						test.x -= 2 * (s - 1)
					}
					if (role.pos.y > test.y) {
						test.y += 2 * (s - 1)
					}
					else if (role.pos.y < test.y) {
						test.y -= 2 * (s - 1)
					}
				}
				if( this._app.sceneObjectMgr.mapAssetInfo.trukPath )
				path = this._app.sceneObjectMgr.mapAssetInfo.trukPath.find(role.pos.x, role.pos.y, test.x, test.y, 0);
				if (!AStar.isInvalidPath(path)) {//是否有效路径
					poss = test
					break;
				}
				else if (path.length == 0) {//无效路径
					break
				}
			}
			if (path.length != 0) {//是否有效路径
				role.goto(Math.floor(poss.x), Math.floor(poss.y))
				this.teamtarget.push(poss)
				this.teamweizhi.push(0)
				let _schoo = 10 + (roles.rolebasicOctets.dirandschool & 0x0F);
				let _include = game.scene.models.SceneModel.getInstance().kuileiOccupation.indexOf(_schoo);
				if ( _include != -1 && this._objMgr) {
					for (var _index = 0; _index < this._objMgr.kuileiArr.length; _index++) {
						let aa = this._objMgr.kuileiArr[_index].masterOid;
						let bb = roles.rolebasicOctets.roleid;
						let cc = aa == bb?true:false;
						if (this._objMgr.kuileiArr[_index].masterOid == roles.rolebasicOctets.roleid)
							this._objMgr.kuileiArr[_index].goto(Math.floor(poss.x), Math.floor(poss.y));
					}
				}

			}
			count++
			Laya.timer.once(100, this, this.teamwalkmove, [this.teamwalk[count], this.teammoves[count], count, this.teamroleid[count]], false)
		}
		/**队伍移动*/
		teammove(name: string, pos: Vector2, roleid): void {
			if (this._roles) {
				this.teamwalk = []
				this.teammoves = []
				this.teamtarget = []
				this.teamweizhi = []
				for (let i: number = 0; i < this._roles.length; i++) {
					if (!this._roles[i]) continue;
					if (this._roles[i].GetName() == name) {
						let path: Array<number> = [];
						let poss: Vector2 = new Vector2()
						this._roles[i].oid
						poss = pos
						let count: number = 0
						let role: game.scene.models.RoleBasicVo = scene.models.SceneModel.getInstance().rolelist.get(roleid);
						let teams: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2);
						let s = (teams.teamindexstate >> 4) & 15
						while (1) {//寻找有效路径
							let test: Vector2 = new Vector2()
							test = poss
							if (count == 0) {//横坐标变化判断
								if (this._roles[i].pos.x > poss.x) {
									test.x += 2 * (s - 1)
								}
								else if (this._roles[i].pos.x < poss.x) {
									test.x -= 2 * (s - 1)
								}
								count++
							}
							else if (count == 1) {//纵坐标变化判断
								if (role.pos.y > test.y) {
									test.y += 2 * (s - 1)
								}
								else if (role.pos.y < test.y) {
									test.y -= 2 * (s - 1)
								}
								count++
							}
							else {
								if (role.pos.x > poss.x) {
									test.x += 2 * (s - 1)
								}
								else if (role.pos.x < poss.x) {
									test.x -= 2 * (s - 1)
								}
								if (role.pos.y > test.y) {
									test.y += 2 * (s - 1)
								}
								else if (role.pos.y < test.y) {
									test.y -= 2 * (s - 1)
								}
							}
							if( this._app.sceneObjectMgr.mapAssetInfo.trukPath )
							path = this._app.sceneObjectMgr.mapAssetInfo.trukPath.find(this._roles[i].pos.x, this._roles[i].pos.y, test.x, test.y, 0);
							if (!AStar.isInvalidPath(path)) {//有效路径
								poss = test
								break;
							}
							else if (path.length == 0) {//无效路径
								break;
							}
						}
						if (path.length != 0) {//有效路径
							this._roles[i].goto(Math.floor(poss.x), Math.floor(poss.y));
							this.teamroleid.push(roleid)
							this.teamtarget.push(poss)
							this.teamweizhi.push(0)
							let _schoo = 10 + (role.rolebasicOctets.dirandschool & 0x0F);
							let _include = game.scene.models.SceneModel.getInstance().kuileiOccupation.indexOf(_schoo);
							if (_include != -1 && this._objMgr.kuileiArr) {
								for (var _index = 0; _index < this._objMgr.kuileiArr.length; _index++) {
									if (this._objMgr.kuileiArr[_index].masterOid == role.rolebasicOctets.roleid)
										this._objMgr.kuileiArr[_index].goto(Math.floor(poss.x), Math.floor(poss.y));
								}
							}
						}
					}
				}
			}
		}
		/**刷新当前状态 */
		refreshstate(parame = new Laya.Dictionary) {
			for (let key in game.scene.models.SceneModel.getInstance().rolelist.keys) {
				let role: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.scene.models.SceneModel.getInstance().rolelist.keys[key]);
				
				if (role.rolebasicOctets.roleid == game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) 
				{//相同角色
					this._updateRoleTitle(role,parame,this._app.sceneObjectMgr.mainUnit);
					let team: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2)
					if (team) {//是否有队伍
						if (team.teamindexstate > 0) {//在队伍中 暂离的话值为负数
							if ((team.teamindexstate >> 4) == 1) {//141216
								this._app.sceneObjectMgr.mainUnit.captain = 1
							}
							else {
								this._app.sceneObjectMgr.mainUnit.captain = 0
							}
						}
					}
					else {
						this._app.sceneObjectMgr.mainUnit.captain = -1
					}
				}
				else {//是否有其他人物
					if (this._roles) {
						for (let i: number = 0; i < this._roles.length; i++) {
							if (!this._roles[i]) continue;
							if (this._roles[i].GetName() == role.rolebasicOctets.rolename) {
								if(parame && parame.get("sceneState"))
								{
									this._updateRoleState(role,parame.get("sceneState"),this._roles[i]);
								}
								this._updateRoleTitle(role,parame,this._roles[i]);
								let team: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2)
								if (team) {
									if (team.teamindexstate > 0) {//在队伍中 暂离的话值为负数
										if ((team.teamindexstate >> 4) == 1) {//141216
											this._roles[i].captain = 1
										}
										else {
											this._roles[i].captain = 0
										}
									}
								}
								else {
									this._roles[i].captain = -1
								}
								break;
							}
						}
					}
				}
			}
		}
		
		/** 刷新场景中角色状态 */
		private _updateRoleState(role:scene.models.RoleBasicVo,parame:Laya.Dictionary,fakeUnit:FakeUnit):void
		{
			for(let _indx in parame.keys)
			{
				let roleid = parame.keys[_indx];
				let state = parame.get(parame.keys[_indx]);
				if(roleid == role.rolebasicOctets.roleid)
				{
					fakeUnit.roleState = state;
				}
			}
		}
		/** 刷新角色称谓
		 * @param role role
		 * @param parame key 人物id value:称谓ID
		 * @param unit 模型
		 */
		private _updateRoleTitle(role:scene.models.RoleBasicVo,parame:Laya.Dictionary,unit:any):void
		{
			if (parame && parame.get("OnTitle")) { //更新称谓
				let OnTitle: Laya.Dictionary = parame.get("OnTitle");
				let roleid: number = OnTitle.keys[0];
				let titleid = OnTitle.get(OnTitle.keys[0]);
				if (roleid == role.rolebasicOctets.roleid) {
					if( titleid == -1) unit.appellation = null;
					else
					{
						let titleinfo: CTitleConfigBaseVo = RoleInfoModel.getInstance().CRoleTitleBinDic[titleid];
						if( titleinfo )
						{
							let clo = titleinfo.fontcolor;
							let arr = clo.split("#");
							unit.appellation = "["+arr[1]+"]"+titleinfo.titlename;
						}
					}
					
				}
			}
		}
		/** 刷新场景称谓 */
		private _updateNpcTitle(role:scene.models.RoleBasicVo,unit:any):void
		{
			let roleid = role.rolebasicOctets.roleid;
			let titleid = role.rolebasicOctets.datas.get(DataType.TITLE_ID);
			if(titleid && titleid > 0 ) 
			{
				let roleTitle = new Laya.Dictionary();
				let OnTitle = new Laya.Dictionary();
				roleTitle.set(roleid,titleid);
				OnTitle.set("OnTitle",roleTitle);
				this._updateRoleTitle(role,OnTitle,unit);
			}
		}
		/**刷新NPC选中特效 */
		refrenpc(npckey: number, num: number) {
			if (this._npc) {
				if (num == 0) {
					for (let i: number = 0; i < this._npc.length; i++) {
						if (!this._npc[i]) continue;
						if (this._npc[i].npcselect == 3) {//3为已选中特效
							this._npc[i].npcselect = num
						}
					}
					return;
				}

				for (var index = 0; index < this._npc.length; index++) {
					if (!this._npc[index]) continue;
					if (this._npc[index].npckey == npckey) {//添加选中的NPC特效
						this._npc[index].npcselect = num
						break;
					}
				}
			}
		}
		/**刷新玩家选中特效*/
		refreshrole(roleid: number, num: number) {
			if (this._roles) {
				for (let i: number = 0; i < this._roles.length; i++) {
					if (!this._roles[i]) continue;
					if (num == 0) {
						if (this._roles[i].npcselect == 3) {//3为已选中特效
							this._roles[i].npcselect = num
						}
					}
					else {
						let role: game.scene.models.RoleBasicVo = scene.models.SceneModel.getInstance().rolelist.get(roleid);
						if (this._roles[i].GetName() == role.rolebasicOctets.rolename) {//添加选中的NPC特效
							this._roles[i].npcselect = num
							break;
						}
					}

				}
			}
		}
		/**刷新NPC身上的任务特效 */
		refreshnpcbody() {
			if (this._npc) {
				for (let key in game.scene.models.SceneModel.getInstance().npclist.keys) {
					let npc: game.scene.models.NpcBasicVo
					npc = game.scene.models.SceneModel.getInstance().npclist.get(game.scene.models.SceneModel.getInstance().npclist.keys[key]);
					for (var index = 0; index < this._npc.length; index++) {
						if (!this._npc[index])
							continue;
						if (this._npc[index].npckey == npc.npckey) {//添加选中的NPC特效
							this.showtasktips(this._npc[key], npc.id)
							break;
						}
					}
				}
			}
		}
		/**更新人物以及NPC特效 */
		refreshalltexiao() {
			if (this._scene.avatarLayer.avatars.length != this.countnum) {
				this.countnum = this._scene.avatarLayer.avatars.length
				if (this._scene.avatarLayer.avatars.length == 0) {//是否人物进入相机范围
					return;
				}
				/**更新特效状态*/
				if (this._npc) {
					for (var num = 0; num < this._npc.length; num++) {
						if (!this._npc[num])//是否有NPC数据
							continue;
						this._npc[num].look = 0
						this._npc[num].zhuxian = 2
					}
				}
				if (this._roles) {
					for (var num = 0; num < this._roles.length; num++) {
						if (!this._roles[num])//是否有人物数据
							continue;
						this._roles[num].look = 0
					}
				}
				for (var index = 0; index < this._scene.avatarLayer.avatars.length; index++) {
					if (this._roles) {
						for (var num = 0; num < this._roles.length; num++) {
							if (!this._roles[num])//是否有人物数据
								continue;
							if (this._roles[num].look == 1)//是否可见
								continue;
							if (this._scene.avatarLayer.avatars[index].guid == this._roles[num].guid) {//是否是相同角色
								this._roles[num].look = 1
								let role: game.scene.models.RoleBasicVo
								for (let key in game.scene.models.SceneModel.getInstance().rolelist.keys) {
									let roles: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.scene.models.SceneModel.getInstance().rolelist.keys[key]);
									if (roles.rolebasicOctets.rolename == this._roles[num].GetName()) {//是否是相同角色
										role = roles
										break;
									}
								}
								if (role) {
									let teams: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2);
									if (teams && teams.teamindexstate > 0) {//在队伍中 暂离的话值为负数
										if ((teams.teamindexstate >> 4) == 1) {//队长
											if(this._roles[num].captain == 1 && this._roles[num].isaddeffect == 1 ) continue;
											this._roles[num].captain = 1
											this._roles[num].isaddeffect = 0
										}
										else {
											this._roles[num].captain = 0
											this._roles[num].isaddeffect = 1
										}
									}
									else {
										this._roles[num].captain = -1
									}
								}
							}
						}
					}
					if (this._npc) {
						for (var num = 0; num < this._npc.length; num++) {
							if (!this._npc[num])//是否有NPC数据
								continue;
							if (this._npc[num].look == 1)//是否可见
								continue;
							if (this._scene.avatarLayer.avatars[index].guid == this._npc[num].guid) {
								this._npc[num].look = 1
								let npc: game.scene.models.NpcBasicVo
								for (let key in game.scene.models.SceneModel.getInstance().npclist.keys) {
									let npcs: game.scene.models.NpcBasicVo = game.scene.models.SceneModel.getInstance().npclist.get(game.scene.models.SceneModel.getInstance().npclist.keys[key]);
									if (npcs.npckey == this._npc[num].npckey) {//是否为相同的NPC
										npc = npcs
										break;
									}
								}
								if (npc) {//是否有NPC
									this.showtoptips(this._npc[num], npc.id, 1)
									this.showtasktips(this._npc[num], npc.id)
									break;
								}
							}
						}
					}
				}
			}
		}
	}
}