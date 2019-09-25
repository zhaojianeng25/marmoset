/**
* 自动挂机
*/
import AutoHangUpModels = game.modules.autohangup.models.AutoHangUpModel
module game.modules.autohangup {
	export class AutoHangUpModuls extends game.modules.ModuleMediator {
		private _aCotrller: ACotrller;
		constructor(app: AppBase) {
			super();
			this._app = app;
		}
		/**开启挂机一进入游戏就开启挂机倒计时，若要关闭则将之屏蔽就行*/
		public init() {
			// 暂时关闭在线挂机
			//Laya.timer.loop(1000, this, this.counttimer)
		}
		/**挂机开始*/
		public counttimer() {
			if (AutoHangUpModels.getInstance().isstar == 0) {//0为关闭挂机状态
				this.stop()
				return;
			}
			// 战斗中关闭挂机状态
			if (this._app.sceneObjectMgr.mapInfo.inBattle){
				this.stop()
				return;
			}
			if (this._app.sceneRoot.hangup == 1) {//已经在挂机巡逻不需要判断了
				this.stop()
				return;
			}
			let role: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
			let team: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2);
			if (team) {//有队伍且不是暂离状态的取消挂机状态
				if (team.teamindexstate > 0) {//在队伍中 暂离的话值为负数	若为正数则停止挂机状态			
					this.stop()
					return;
				}
			}
			if (AutoHangUpModels.getInstance().notaketimer < 30) {//挂机倒计时
				AutoHangUpModels.getInstance().notaketimer++
				console.log(AutoHangUpModels.getInstance().notaketimer)
				return;
			}
			this._app.sceneRoot.isnpc = 1
			/**每次开始自动任务时会先将定时器关闭，然后再完成任务接到新的任务时开启定时器 */
			if (AutoHangUpModels.getInstance().istaskwalk == 0) {//自动主线任务
				for (let key in Taskmodels._instance.maintask.keys) {
					let taskinfo: game.modules.task.models.MissionInfoVo = Taskmodels._instance.maintask.get(Taskmodels._instance.maintask.keys[key])
					let maininfo: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[taskinfo.missionid]
					if (taskinfo.missionid >= 180000 && taskinfo.missionid <= 190000) {//有任务判断是否有主线，有主线就进行主线任务
						if (maininfo.MinLevel <= HudModel._instance.levelNum) {//是否满足任务条件
							this._app.sceneRoot.istask = 2
							mainhud.models.HudModel._instance.useapp = this._app
							mainhud.models.HudModel._instance.taskid = taskinfo.missionid
							mainhud.models.HudModel._instance.eventid = maininfo.id;
							mainhud.models.HudModel._instance.tasktype = maininfo.MissionType
							mainhud.models.HudModel._instance.desnpc.x = maininfo.ActiveInfoLeftPos
							mainhud.models.HudModel._instance.desnpc.y = maininfo.ActiveInfoTopPos
							mainhud.models.HudModel._instance.npcid = maininfo.ActiveInfoNpcID
							mainhud.models.HudModel._instance.jumpmapid = maininfo.ActiveInfoMapID;
							AutoHangUpModels._instance.autotask = 1
							AutoHangUpModels._instance.istaskwalk = 0//处于自动任务行走
							mainhud.models.HudModel._instance.taskstart();
							this.stop()
						}
						else {//前往挂机地图
							for (var index = 1801; index <= 1830; index++) {
								let mapinfo: MapConfigBaseVo = game.modules.mapworld.models.MapModel.getInstance().MapConfigData[index];
								let role: game.modules.createrole.models.RoleDetailVo = game.modules.createrole.models.LoginModel.getInstance().roleDetail
								if (mapinfo.LevelLimitMin <= role.level && mapinfo.LevelLimitMax >= role.level) {//找到适合的挂机地图
									this.mapChange(mapinfo.id)
									this._app.sceneObjectMgr.mainUnit.SetMoveStatus(0)
									this._app.sceneRoot.hangup = 1
									break;
								}
							}
							this.stop()
						}
						break;
					}
				}
			}
			else if (AutoHangUpModels._instance.istaskwalk == 2) {//循环任务 自动
				for (let key in Taskmodels._instance.schooltask.keys) {
					if (AutoHangUpModels.getInstance().tasktype == Taskmodels.getInstance().schooltask.keys[key]) {//是否是同个类型的任务
						this._app.sceneRoot.istask = 2
						let schooltaskinfo: game.modules.task.models.SRefreshSpecialQuestVo = game.modules.task.models.TaskModel.getInstance().schooltask.get(AutoHangUpModels.getInstance().tasktype);
						let info: CRepeatTaskBaseVo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskData[schooltaskinfo.questtype]
						mainhud.models.HudModel._instance.eventid = schooltaskinfo.questtype;
						mainhud.models.HudModel._instance.tasktype = info.etasktype
						mainhud.models.HudModel._instance.desnpc.x = schooltaskinfo.dstx
						mainhud.models.HudModel._instance.desnpc.y = schooltaskinfo.dsty
						mainhud.models.HudModel._instance.npcid = schooltaskinfo.dstnpcid
						mainhud.models.HudModel._instance.jumpmapid = schooltaskinfo.dstmapid;
						AutoHangUpModels._instance.autotask = 1
						AutoHangUpModels._instance.istaskwalk = 2//处于自动任务行走
						mainhud.models.HudModel._instance.taskstart();
						this.stop()
						break;
					}
				}
			}
		}
		/**停止挂机*/
		public stop() {//需要停止时，调用该方法即可
			Laya.timer.clear(this, this.counttimer)
		}
		/**跳转地图*/
		public mapChange(mapid: number): void {//挂机跳转地图
			this.getpost(mapid);
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			RequesterProtocols._instance.c2s_req_goto(mapid, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
		}
		/**获得随机位置 mapid为地图id*/
		public getpost(mapid: number) {//获取挂机地图的跳转坐标
			let MapData: WorldMapConfigBaseVo = MapModel.getInstance().WorldMapConfigData[mapid]
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			let x, y: number;
			x = (Math.random() * (MapData.bottomx - MapData.topx) + MapData.topx)
			y = (Math.random() * (MapData.bottomy - MapData.topy) + MapData.topy)
			mainUnit.SetPosX(x);
			mainUnit.SetPosY(y);
			mainUnit.SetPos(x, y);
		}
	}
}