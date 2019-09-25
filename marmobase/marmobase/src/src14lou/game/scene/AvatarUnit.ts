/**
* name 
*/
module game.scene {
	export class AvatarUnit extends AvatarSprite {
		/**小宠物飞行高度 */
		static LITTLE_PET_HEIGHT: number = 80;
		/*装备显示失效 */
		private _invalidItems: boolean = false;
		/*法宝显示失效 */
		private _invalidFaBao: boolean = false;
		/*aura布局失效*/
		private _invalidAuraLayout: boolean = false;
		/*是否检查装备下载情况*/
		private _ischecking: boolean = false;

		private _unitType: number;
		private _npcFlag: number;
		private _unitLevel: number = 0;
		//表情包
		private _biaoQingAniList: EffectFrame[];
		//称号
		private _titleAniList: EffectFrame[];
		// buff特效
		private _avatarBuffs: Array<AvatarBuff> = [];
		//记录当前御剑状态
		private _oldYuJianId: number = 0;
		//是否播放上御剑特效
		private _isChangYuJianStatus: boolean = false;
		//是否播放卧底变换皮肤特效
		private _isChangeWuDiStatus: boolean = false;
		//旧动作
		private _oldAtnStatus: number = -1;
		private _showWingTime: number = 0;
		//npc 头顶标志
		private _npcBlueAni: EffectFrame;
		private _npcYellowAni: EffectFrame;

		private _guankaEffect: EffectAvatar;
		private _oldWodiSkinId: number = 0;//存储就得卧底皮肤id
		private _redWaring: boolean;
		private _circleData: game.data.Circle;

		private _char3d: SceneChar;

		public get char3d(): SceneChar {
			return this._char3d;
		}



		constructor(scene3d: PanScene, pUnit: Unit) {
			super(scene3d, pUnit);
			this._drawAHeight = 100; // 默认高度
			pUnit.userData = this;
			//装备or坐骑显示发生变化
			this.unit.onAvatarChange = () => {

				this._invalidItems = true;
				this._invalidFaBao = true;
				//是否播放上御剑特效
				let curYujianId: number = this.unit.mountid;
				if (this._oldYuJianId != curYujianId && curYujianId > 0) {
					this._isChangYuJianStatus = true;
				}
				this._oldYuJianId = curYujianId;

			}
			this.unit.onRedWaring = (flag: boolean) => {
				this._redWaring = flag;
			}
			//初始化视图
			this.initView();
			// buff显示控制
			let buffs: Array<Buff> = pUnit.buffMgr.buffs;
			for (let i = 0; i < buffs.length; i++) {
				this._avatarBuffs.push(new AvatarBuff(this, pUnit, buffs[i]));
			}
			pUnit.buffMgr.on(LEvent.CHANGED, this, this.updateBuffIcons);
			this.updateBuffIcons();
		}



		get guid(): string {
			return this.unit ? this.unit.guid : "";
		}

		get name(): string {
			return this.unit.name;
		}

		//根据部位获取机器人装备id
		private getRobotEquipIdByPos(equip_pos: number): string {
			if (!this.unit) return null;
			let robot_lv: number = this.unit.level;
			let robot_sex: number = this.unit.sex;
			let item_temp_arr: any[] = Template.data["tb_item"];
			if (!item_temp_arr) return null;
			let len: number = item_temp_arr.length;
			for (let i: number = 0; i < len; i++) {
				let itemTemp: any = item_temp_arr[i];
				if (!itemTemp || itemTemp.pos != equip_pos || itemTemp.level > robot_lv || itemTemp.sex != robot_sex) continue;
				return itemTemp.avatar;
			}
			return null;
		}

		//获取衣服
		private getCoatAvatar(): string {
			//如果是机器人
			// if (this.unit.isRobot) {
			// 	return this.getRobotEquipIdByPos(ItemField.EQUIPMENT_TYPE_COAT);
			// }
			return null;
		}

		//获取武器
		private getWeaponAvatar(): string {
			//如果是机器人
			// if (this.unit.isRobot) {
			// 	return this.getRobotEquipIdByPos(ItemField.EQUIPMENT_TYPE_WEAPON);
			// }
			return null;
		}

		//获取翅膀
		private getWingAvatar(): string {
			return null;
			// let wing_lv: number = this.unit.showWings;
			// if (wing_lv < 1) return null;
			// let temp: any = Template.getYuyiTempById(wing_lv);
			// if (!temp) return null;
			// let show_id = temp.show_id;
			// let show_temp: any = Template.getYuyi_showTempById(show_id);
			// return show_temp ? show_temp.avatar : null;
		}
		private getWingEffect(oldAtnStus: number): string {
			// let wing_lv: number = this.unit.showWings;
			// if (wing_lv < 1) return null;
			// let temp: any = Template.getYuyiTempById(wing_lv);
			// if (!temp) return null;
			// let show_id = temp.show_id;
			// let show_temp: any = Template.getYuyi_showTempById(show_id);
			// if (!show_temp) return null;
			// if (oldAtnStus == AvatarData.STATE_STAND) {
			// 	return show_temp.avatar_stand;
			// }
			// else if (oldAtnStus == AvatarData.STATE_RUNNING) {
			// 	return show_temp.avatar_run;
			// }

			return null;
		}

		//获取坐骑
		private getMountAvatar(): string {
			return null;
			// let yujian_id: number = this.unit.mountid;
			// if (yujian_id < 1) return null;
			// let show_temp: any = Template.getYujian_showTempById(yujian_id);
			// return show_temp ? show_temp.avatar : null;
		}

		get headHeight(): number {
			return this._drawAHeight * this._scale + this._rideHeight;
		}

		private initView(): void {
			if (!this.unit) return;
			this._unitLevel = 0;
			this._unitType = this.unit.typeid;
			this._npcFlag = this.unit.npcFlag;
			let uEntry: number = this.unit.entryid;
			if (this.unit.entryid == 180607 || this.unit.entryid == 180606) {
				console.log("----精英副本npc");
			}
			switch (this._unitType) {
				//////////////////// 生物类 /////////////////////////
				case UnitField.TYPE_ID_CREATURE:
				case UnitField.TYPE_ID_GAMEOBJ:
					// this._invalidItems = false;
					//判断下是否机器人
					if (Unit.ROBOT_TEMP_ID_LIST.indexOf(uEntry) >= 0) {//机器人特殊处理
						this._unitType = UnitField.TYPE_ID_PLAYER;
						this._invalidItems = true;
					} else {
						if (this.unit.isMonster)
							this._unitLevel = this.unit.level;
						let creatureT: any = Template.getCreatureTempById(uEntry);
						// this._npcFlag = creatureT.npc_flag;
						if (creatureT) {
							this._drawAHeight = creatureT.avatar_high;
							this._linkage.kind = AvatarLinkage.KIND_CREATURE;
							this._linkage.shortName = creatureT.avatar || "npc_0001";
							this.loadItem(this._linkage.getName());
							console.log("AvatarUnit initView this._linkage.getName()", this._linkage, this._linkage.getName());
						} else {
							//loge("AvatarWujiang:AvatarWujiang cant find template:[name=" + this.unit.GetName() + ",id=" + uEntry + "]");

							this._drawAHeight = 100;
							this._linkage.kind = 2;
							this._linkage.shortName = "npc_0001";
							this.loadItem("npc_0001");
						}
					}
					break;
				///////////////// 游戏玩家类的 //////////////////////
				case UnitField.TYPE_ID_PLAYER:
					this._oldYuJianId = this.unit.mountid;
					//装备失效
					this._invalidItems = true;
					this._invalidFaBao = true;
					break;
				default:
					logd("AvatarUnit.initView:(未知的Unit.TypeID),值" + this._unitType);
					break;
			}

			// 名字颜色
			this._nameColor = "FFFFFF"; // 默认白色
			if (this._unitType == UnitField.TYPE_ID_CREATURE) {
				switch (this._npcFlag) {
					case Unit.CREATURE_TYPE_NPC:
						this._nameColor = "FFFF00";	// 黄色
						break;
					case Unit.CREATURE_TYPE_ELITE:
						this._nameColor = "e84bff";	// 紫色
						break;
					case Unit.CREATURE_TYPE_BOSS:
					case Unit.CREATURE_TYPE_SMALL_BOSS:
						this._nameColor = "FF0000";	//红色
						break;
					default:
						if (this.unit instanceof FakeUnit && this.unit.isSelfRole)
							this._nameColor = "FFFF00";
						break;
				}
			}

			this._char3d = new SceneChar();
			this._char3d.tittleHeight = 0
			// this._char3d.shadow = !this._scene3d.is2D;
			this._char3d.isCamera2D = this._scene3d.is2D;

			let charid = this.unit.entryid || 1;
			// if (this.unit.isPlayer || this.unit.isRobot) {
			// 	charid = 1;
			// }
			// else {
			// const ids = [1,2, 3, 4,5, 6,7,8,9];
			// charid = ids[this.unit.entryid % ids.length];
			// charid = this.unit.entryid;
			// }
			let creatureT: any = Template.getCreatureTempById(charid);
			// charid = 5;
			//console.log("AvatarUnit initView this.unit.entryid", this.unit.entryid);
			//console.log("AvatarUnit initView creatureT.avatar", creatureT["avatar"]);
			//console.log("AvatarUnit initView getRoleUrl(creatureT.avatar)", getRoleUrl(creatureT?(creatureT["avatar"]||"npc_0001"):""));
			//this._char3d.setRoleUrl(getRoleUrl(creatureT?(creatureT["avatar"]||"npc_0001"):""));
			// this._char3d.setRoleUrl(getRoleUrl('50001'));


			////////////////////根据新表格加载模型////////////////////////////
			if (this.unit.entryid == 0) {
				this.unit.entryid = 1;
			}
			var cNpcShapeBaseVo: game.data.template.CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[this.unit.entryid + ""];
			console.log("AvatarUnit initView cNpcShapeBaseVo", cNpcShapeBaseVo);
			if (cNpcShapeBaseVo) {
				var url = getRoleUrl(cNpcShapeBaseVo.shape);
				this._char3d.setRoleUrl(url);
				//this._char3d.setRoleUrl(getRoleUrl("role_000" + this.unit.entryid));
				//this._char3d.setRoleUrl(getRoleUrl("4012"));
				// console.log("AvatarUnit initView entryid, url;", this.unit.entryid, url);
				console.log("AvatarUnit initView getRoleUrl(cNpcShapeBaseVo.shape)", getRoleUrl(cNpcShapeBaseVo.shape));
			}
			///////////////////////////////////////////////////////////////


			if (this.unit.isPlayer || this.unit.isRobot) {
				// // this._char3d.setWeapon(1);
				// this.unit.SetName(creatureT.name, true);
				// let mount = Template.getCreatureTempById(10);
				// this._char3d.setMount(mount["avatar"]);
				// this._char3d.setWing('ms_0008');
			}
			if (this.unit instanceof FakeUnit && this.unit.isBattleRole) {
				if (this.unit.hp <= 0) {
					this.actionStatus = !this.unit.isDieSpecial ? AvatarData.STATE_DIING : AvatarData.STATE_DIING1;
					this._char3d.showActionEnd(CharAction.ConvertAction(this.actionStatus, this._isRiding));
				}
			}
			// this._char3d.charName = this.unit.name;
			// this._char3d.hpRatio = 100;
			// this._char3d.showBlood();
			// this._char3d.angerRatio = 100;
			// this._char3d.showAnger();
			// Laya.timer.loop(3000, this, ()=>{
			// 	this._scene3d.flyText('3625', 1, this._char3d.x, this._char3d.y, this._char3d.z);
			// });
		}

		// 更新缩放
		protected updateScale(scene: SceneRoot, imitateMoveRate: number): void {
			if (!this.unit) return;
			super.updateScale(scene, imitateMoveRate);
			if (this._unitType == UnitField.TYPE_ID_CREATURE) {
				switch (this._npcFlag) {
					case Unit.CREATURE_TYPE_ELITE:
						this._scale *= 1.3;		// 精英怪放大1.5倍
						break;
					case Unit.CREATURE_TYPE_BOSS:
					case Unit.CREATURE_TYPE_SMALL_BOSS:
						this._scale *= 1.5;			// BOSS放大2倍
						break;
				}
			}
			else if (this._unitType == UnitField.TYPE_ID_GAMEOBJ) {
				let uEntry: number = this.unit.entryid;

			}
			else if (this._unitType == UnitField.TYPE_ID_PLAYER) {

			}

			// if (this._isRiding) {
			// 	this._scale *= scene.app.avatarFloatingScale;
			// }
		}

		/**
		 * 变身
		 * @param skinName 皮肤 有值则变身 空值则还原变身
		 */
		shapeShift(skinName: string): void {
			if (this._skinName == skinName) return;
			this._skinName = skinName;
			this.loadItem(skinName);
			if (!skinName || !skinName.length) {
				this.invaliDrawInfo();
			}
			else {
				// this.isRiding = false;//一般变身都没上坐骑资源
			}
		}

		/**
		 * 鼠标碰撞检测
		 */
		hitTest(xMouse: number, yMouse: number, scene: SceneRoot, hit3DPos: Pan3d.Vector3D): boolean {
			//如果是主玩家自己
			if (!this._hitTestEnabled) {
				return false;
			}
			// if (this._char3d) {
			// 	return this._char3d.mouseClik(null, hit3DPos);
			// }
			return super.hitTest(xMouse, yMouse, scene, hit3DPos);
		}

		setMount(v: string): void {
			if (this._char3d) {
				this.isRiding = this._char3d.setMount(v);
			}
			else {
				this.isRiding = false;
			}
		}

		//更新生成状态
		protected updateLiveStatus(liveStatus: number = null): void {
			if (this.unit.isDied) {
				if (this._char3d) this._char3d.shadow = false;
			}
			super.updateLiveStatus(liveStatus);
		}

		setVisible(v: boolean): void {
			super.setVisible(v);
			if (this._char3d) {
				this._char3d.visible = this.visible;
			}
		}

		//播放技能
		playSkill(fileName: string, effectName: string, hitPosLis?: Array<Vector3D>): void {
			this._scene3d.playSkillByChar(this._char3d, fileName, effectName, null, hitPosLis);
		}

		//播放弹道技能
		playTrajectory(target: SceneChar, fileName: string, effectName: string): void {
			this._scene3d.playTrajectoryByChar(this._char3d, target, fileName, effectName);
		}

		//旋转
		spin(offset: number, time: number): void {
			if (!this._char3d) return;
			Laya.Tween.to(this._char3d, { pRotationY: this._char3d.pRotationY + offset }, time);
		}

		/*是否播放进行中*/
		protected isActionPlaying(): Boolean {
			return this._char3d && !this._char3d.isMount && this._char3d.isPlaying();
		}

		private _particleInfos: any[];
		//显示特效
		public showEffect(name: string, x: number = 0, y: number = 0, z: number = 0): void {

			let index: number = this.searchEffect(name);
			if (index != -1) {//已存在
				this._particleInfos[index].x = x;
				this._particleInfos[index].y = y;
				this._particleInfos[index].z = z;
				return;
			}
			if (!this._particleInfos) this._particleInfos = [];
			let url: string = 'model/' + name + '.txt';
			index = this._particleInfos.length;
			let data: any = this._particleInfos[index] = { name: name, x: x, y: y, z: z, particle: null };
			this._scene3d.addParticle(url, this._char3d.pScale/0.73, (v) => { //对特效位置产生影响 需要在/0.73
				data.particle = v;
			});

		}
		private _frameEffects: any[];
		// 图集特效
		public showFrameEffect(name: string, info: any = [], x: number = 0, y: number = 0, z: number = 0): void {

			let index: number = this.searchFrameEffect(name);
			if (index != -1) {//已存在
				// this._frameEffects[index].x = x;
				// this._frameEffects[index].y = y;
				// this._frameEffects[index].z = z;
				return;
			}
			if (!this._frameEffects) this._frameEffects = [];

			info.loop = info.loop == null ? false : info.loop //是否循环;
			info.frameScale = (info.frameScale == null ? 0.2 : info.frameScale) //整体缩放比例;
			info.isShow = info.isShow == null ? true : info.isShow //是否为最上层显示;
			info.x = info.x == null ? 0 : info.x
			info.y = info.y == null ? 0 : info.y
			info.z = info.z == null ? 0 : info.z
			//10601/10601_zhuangtaishifa
			let names: Array<string> = name.split("/");

			var url: string;
			var baseName: string;
			if (!info.isbuff) {
				url = "common/res_3d/frameskill/" + names[0] + "/";
				baseName = names[1];
			} else {
				url = "common/res_3d/frameskill/buff/" + name + "/";
				baseName = name;
				info.frameScale = info.frameScale == null ? 0.3 : info.frameScale;
			}
			
			var combineParticle: Pan3d.CombineParticle = layapan.Frame3DAtlasParticle.getFrameParticle(url, baseName, info);
			combineParticle.x = this._char3d.x + info.x;
			combineParticle.y = this._char3d.y + info.y;
			combineParticle.z = this.char3d.z;

			index = this._frameEffects.length;
			this._frameEffects[index] = { name: name, combineParticle: combineParticle , x :info.x, y : info.y, z : info.z};
			this._scene3d.particleManager.addParticle(combineParticle);
		}

		// 移除图集特效
		public clearFrameEffect(name: string): void {
			let index: number = this.searchFrameEffect(name);
			if (index == -1) return;// 不存在
			if (this._frameEffects[index].combineParticle) this._scene3d.particleManager.removeParticle(this._frameEffects[index].combineParticle);
			this._frameEffects.splice(index, 1);
		}
	    //清理玩家的所有特效用于死亡，清理战场等
		public clearAllFrameEffect():void{
			this._scene3d.particleManager.removeAllParticle();
		}

		//清理特效
		public clearEffect(name: string): void {
			let index: number = this.searchEffect(name);
			if (index == -1) return;//不存在
			if (this._particleInfos[index].particle) this._scene3d.removeParticle(this._particleInfos[index].particle);
			this._particleInfos.splice(index, 1);
		}
		//搜索特效
		protected searchEffect(value: string): number {
			if (!this._particleInfos) return -1;
			for (let i: number = 0; i < this._particleInfos.length; i++) {
				if (this._particleInfos[i].name == value) return i;
			}
			return -1;
		}
		//搜索图集特效
		protected searchFrameEffect(value: string): number {
			if (!this._frameEffects) return -1;
			for (let i: number = 0; i < this._frameEffects.length; i++) {
				if (this._frameEffects[i].name == value) return i;
			}
			return -1;
		}


		//绘制3d特效
		protected onDrawEffect(): void {
			if (!this._particleInfos) return;
			for (let i: number = 0; i < this._particleInfos.length; i++) {
				if (!this._particleInfos[i].particle) continue;
				this._particleInfos[i].particle.x = this._char3d.x + this._particleInfos[i].x;
				this._particleInfos[i].particle.z = this._char3d.z + this._particleInfos[i].z;
				this._particleInfos[i].particle.y = this._char3d.y + this._particleInfos[i].y;
			}
		}

		// 绘制之前数据更新 
		onDrawBefore(diff: number, scene: SceneRoot): void {
			super.onDrawBefore(diff, scene);
			if( this.unit.isDied ) this.clearAllFrameEffect();
			if (this._char3d) {
				//console.log("@@@@@@@@@@@绘制 ", this.unit.name, " isbattle", this.unit.battle, " isVisible", this.unit.getVisible());
				//隐藏非战斗模型
				if (scene.app.sceneObjectMgr.mapInfo.inBattle &&  ! this.unit.battle){
					scene.showBack(true);
					this._char3d.visible = false;
					this._char3d.stopMove;
				}
				else
					this._char3d.visible = this.unit.isVisible();

				this.setVisible(this._char3d.visible);

				// 特效跟随	
				for (var key in this._frameEffects) {
					this._frameEffects[key].combineParticle.x = this._char3d.x + this._frameEffects[key].x;
					this._frameEffects[key].combineParticle.y = this._char3d.y + this._frameEffects[key].y;
					this._frameEffects[key].combineParticle.z = this._char3d.z + + this._frameEffects[key].z;
				}


				// 刷新一下3d形象位置						
				if (this._scene3d.is2D) {
					let x = (this._pos.x - scene.camera.logicLeft) * SceneRes.CELL_WIDTH * scene.scaleX;
					let y = (this._pos.y - scene.camera.logicTop) * SceneRes.CELL_HEIGHT * scene.scaleY;
					// this._char3d.px = x / (PanEngine.htmlScale * 4) * scene.scaleX;
					// this._char3d.pz = y / (PanEngine.htmlScale * 4) * scene.scaleY / (Math.sin(45 * Math.PI / 180));
					// this._char3d.py = 0;
					this._char3d.set2dPos(x, y);
				}
				else {
					// this._char3d.px = this._pos.x;
					// this._char3d.pz = this._pos.y;
					//形象所处高度
					// this._char3d.py = this.unit.high+1;
				}
				// 缩放
				this._char3d.pScale = this._scale = this.unit.scale;
				// 方向
				this._char3d.pRotationY = this.faceto + 90;
				if (!this._char3d.onStage) {
					// 添加到场景
					this._scene3d.addMovieDisplay(this._char3d);
				}
				this.unit.count = 0
				if (this.unit.captain == 1 && this.unit.isaddeffect == 0) {
					this.unit.isaddeffect = 1
					this._char3d.removePart("duizhang")
					this._char3d.addPart("duizhang", Pan3d.SceneChar.NONE_SLOT, getModelUrl("buff_lyf"));
				}
				else if ((this.unit.captain == -1 || this.unit.captain == 0 || !this._char3d.visible) && this.unit.isaddeffect == 1) {
					this._char3d.removePart("duizhang")
					this.unit.isaddeffect = 0
				}
				//战斗标志特效
				if(this.unit.roleState == 1 && this._char3d.visible)
				{
					this.unit.roleState = -1;
					this._char3d.removePart("InBattle")
					this._char3d.addPart("InBattle", Pan3d.SceneChar.NONE_SLOT, getModelUrl("watchbattle_lyf"));
					
				}else if( this.unit.roleState == 0 || !this._char3d.visible)
				{
					this._char3d.removePart("InBattle");
					this.unit.roleState = -1;
				}
				/**副本*/
				if (this.unit.carbon == 1) {
					this.unit.carbon = 0
					this._char3d.removePart("fuben")
					this.unit.count = this.unit.count + 1
					this._char3d.addPart("fuben", Pan3d.SceneChar.NONE_SLOT, getModelUrl("fuben_lyf"));
				}
				/**帮派副本*/
				if (this.unit.familyfuben == 1) {
					this.unit.familyfuben = 0
					this._char3d.removePart("familyfuben")
					this._char3d.addPart("familyfuben", Pan3d.SceneChar.NONE_SLOT, getModelUrl("bangpaifuben_lyf"));
					this.unit.count = this.unit.count + 1
				}
				/**商店NPC */
				if (this.unit.shop == 1) {
					this.unit.shop = 0
					this._char3d.removePart("shop")
					this._char3d.addPart("shop", Pan3d.SceneChar.NONE_SLOT, getModelUrl("shop_lyf"));
					this.unit.count = this.unit.count + 1
				}
				//自动寻路
				if (this.unit.autowalk == 1) {
					this.unit.autowalk = 3
					this._char3d.removePart("autowalk")
					this._char3d.addPart("autowalk", Pan3d.SceneChar.NONE_SLOT, getModelUrl("autowalk_lyf"));
					this.unit.count = this.unit.count + 1
				}
				//自动巡逻
				if (this.unit.xunluo == 1) {
					this.unit.xunluo = 3
					this._char3d.removePart("xunluo")
					this._char3d.addPart("xunluo", Pan3d.SceneChar.NONE_SLOT, getModelUrl("autorun_lyf"));
					this.unit.count = this.unit.count + 1
				}
				else if (this.unit.xunluo == 2) {
					this.unit.xunluo = -1
					this._char3d.removePart("xunluo")
				}
				/**宠物商店 */
				if (this.unit.petshop == 1) {
					this.unit.petshop = 0
					this._char3d.removePart("petshop")
					this._char3d.addPart("petshop", Pan3d.SceneChar.NONE_SLOT, getModelUrl("petshop_lyf"));
					this.unit.count = this.unit.count + 1
				}

				/**掌门*/
				if (this.unit.chief == 1) {
					this.unit.chief = 3
					this._char3d.removePart("zhangmen")
					this._char3d.addPart("zhangmen", Pan3d.SceneChar.NONE_SLOT, getModelUrl("zhangmen_lyf"));
					this.unit.count = this.unit.count + 1
				}
				/**屠魔试炼*/
				if (this.unit.tumo == 1) {
					this.unit.tumo = 0
					this._char3d.removePart("tumo")
					this._char3d.addPart("tumo", Pan3d.SceneChar.NONE_SLOT, getModelUrl("tumoshilian_lyf"));
					this.unit.count = this.unit.count + 1
				}
				/**比武场*/
				if (this.unit.biwu == 1) {
					this.unit.biwu = 0
					this._char3d.removePart("biwu")
					this._char3d.addPart("biwu", Pan3d.SceneChar.NONE_SLOT, getModelUrl("biwuchang_lyf"));
					this.unit.count = this.unit.count + 1
				}
				/**悬赏*/
				if (this.unit.xuanshang == 1) {
					this.unit.xuanshang = 0
					this._char3d.removePart("xuanshang")
					this._char3d.addPart("xuanshang", Pan3d.SceneChar.NONE_SLOT, getModelUrl("xuanshang_lyf"));
					this.unit.count = this.unit.count + 1
				}
				/**乱世降妖*/
				if (this.unit.welfare == 1) {
					this.unit.welfare = 0
					this._char3d.removePart("welfare")
					this._char3d.addPart("welfare", Pan3d.SceneChar.NONE_SLOT, getModelUrl("luanshixianyao_lyf"));
					this.unit.count = this.unit.count + 1
				}
				/**藏宝图*/
				if (this.unit.baotu == 1) {
					this.unit.baotu = 0
					this._char3d.removePart("cangbaotu")
					this._char3d.addPart("cangbaotu", Pan3d.SceneChar.NONE_SLOT, getModelUrl("cangbaotu_lyf"));
					this.unit.count = this.unit.count + 1
				}
				/** 福利*/
				if (this.unit.demon == 1) {
					this.unit.demon = 0
					this._char3d.removePart("fuli")
					this._char3d.addPart("fuli", Pan3d.SceneChar.NONE_SLOT, getModelUrl("fuli_lyf"));
					this.unit.count = this.unit.count + 1
				}
				/**升级特效*/
				if (this.unit.levelup == 1) {
					this.unit.levelup = 0
					this._char3d.removePart("leveup")
					this._char3d.addPart("leveup", Pan3d.SceneChar.NONE_SLOT, getModelUrl("levelup_lyf"));
				}
				/**关闭特效 */
				if (this.unit.levelup == 2) {
					this.unit.levelup = 0
					this._char3d.removePart("leveup")
				}
				// /**染色*/
				// if (this.unit.ranse == 1) {
				// 	this.unit.ranse = 0
				// 	this._char3d.removePart("ranse")
				// 	this._char3d.addPart("ranse", Pan3d.SceneChar.NONE_SLOT, getModelUrl("ranse_lyf"));
				// 	this.unit.count = this.unit.count + 1
				// }
				/**NPC选择特效 */
				if (this.unit.npcselect == 1) {
					this.unit.npcselect = 3
					this._char3d.removePart("npc")
					this._char3d.addPart("npc", Pan3d.SceneChar.NONE_SLOT, getModelUrl("npcxuanzhon_lyf"));

				}
				else if (this.unit.npcselect == 0) {
					this.unit.npcselect = -1
					this._char3d.removePart("npc")
				}

				/**主线*/
				if (this.unit.zhuxian == 1) {
					this.unit.zhuxian = 3
					this._char3d.removePart("zhuxian")
					this._char3d.addPartToPos("zhuxian", getModelUrl("zhuxian_lyf"), new Pan3d.Vector3D(0, 20 * this.unit.count, 0))
					this.unit.count = this.unit.count + 1
				}
				else if (this.unit.zhuxian == 2) {
					this.unit.zhuxian = -1
					this._char3d.removePart("zhuxian")
				}
				else if (this.unit.zhuxian == 6) {/**战斗主线 */
					this.unit.zhuxian = 3
					this._char3d.removePart("zhuxian")
					this._char3d.addPartToPos("zhuxian", getModelUrl("zhandou_lyf"), new Pan3d.Vector3D(0, 20 * this.unit.count, 0))
					this.unit.count = this.unit.count + 1
				}
				/**任务状态 */
				if (this.unit.accpet == -1) {
					this.unit.accpet = 5
					this._char3d.removePart("accpet")
					this._char3d.addPartToPos("accpet", getModelUrl("maohao_lyf"), new Pan3d.Vector3D(0, 20 * this.unit.count, 0))
				}
				else if (this.unit.accpet == 2 || this.unit.accpet == 0) {
					this.unit.accpet = 5
					this._char3d.removePart("accpet")
				}
				else if (this.unit.accpet == 3) {/**已完成图标 */
					this.unit.accpet = 5
					this._char3d.removePart("accpet")
					this._char3d.addPartToPos("accpet", getModelUrl("wenhao_lyf"), new Pan3d.Vector3D(0, 20 * this.unit.count, 0))
				}
				else if (this.unit.accpet == 4) {/**未完成图标*/
					this.unit.accpet = 5
					this._char3d.removePart("accpet")
					this._char3d.addPartToPos("accpet", getModelUrl("wenhao_hui_lyf"), new Pan3d.Vector3D(0, 20 * this.unit.count, 0))
				}
				/**停止移动 */
				if (this.unit.stopwalk == 1 || !this.visible) {
					this.unit.stopwalk = 0
					this.unit.xunluo = 0
					this.unit.autowalk = 0
					this._char3d.removePart("autowalk")
					this._char3d.removePart("xunluo")
					this._char3d.removePart("npc")
					this._char3d.removePart("zhuxian");
				}
				if( this.unit.appellation && this.unit.appellation != "")
				{
					this._char3d.tittleHeight = -22
				}else this._char3d.tittleHeight = -10
				// this._char3d.tittleHeight = -10
				//绘制3d特效
				this.onDrawEffect();
				if (this._buffIcons) {
					this._buffIcons.pos.x = this._char3d.x + this._buffPos.x;
					this._buffIcons.pos.y = this._char3d.y + this._buffPos.y;
					this._buffIcons.pos.z = this._char3d.z + this._buffPos.z;
				}

				if (!this._char3d.isSinging) {
					// 动作	
					let completeState = 0; // 循环播放
					switch (this.actionStatus) {
						case AvatarData.STATE_DIING:		//死亡ing
						case AvatarData.STATE_DIING1:		//死亡ing
						case AvatarData.STATE_ATTACKGO:		//攻击出击
						case AvatarData.STATE_ATTACKGO2:	//攻击出击
						case AvatarData.STATE_ATTACKGO3:	//攻击出击
						case AvatarData.STATE_BEATEN:		//受击
						case AvatarData.STATE_LEISURE:		//休闲
							completeState = 1; // 只播放一次
							break;
					}
					if (!scene.app.sceneObjectMgr.mapInfo.inBattle)
						this._char3d.play(CharAction.ConvertAction(this.actionStatus, this._isRiding), completeState);
				}

				this._char3d._isBattle = scene.app.sceneObjectMgr.mapInfo.inBattle ? true : false;
			}
		}

		onDraw(diff: number, g: Graphics, scene: SceneRoot): void {
			super.onDraw(diff, g, scene);
			//不显示
			if (!this.isNeedDrawView) return;

			// buff
			for (let i = 0; i < this._avatarBuffs.length; i++) {
				this._avatarBuffs[i].onDraw(diff, scene);
			}
			//检查是否要求换装
			if (this._invalidItems) {
				this._invalidItems = false;
				this.updateAvatarItemData();

				//是否播放御剑特效
				if (this._isChangYuJianStatus) {
					this._isChangYuJianStatus = false;
					this.playYuJianUpEffect(scene);
				}
				//是否播放卧底特效
				if (this._isChangeWuDiStatus) {
					this._isChangeWuDiStatus = false;
					this.playYuJianUpEffect(scene);
				}
			}

			//检查装备
			if (this._ischecking && this._multi_items) {
				this.checkItems();
			}

			var thisTime: number = Laya.timer.currTimer;
			//帧索引
			var frameIdx: number = this.getCurrentIdx();
			//帧位置
			var fd_address: number = AvatarItem.getFrameDataAddress(this._action, this._direct, frameIdx);

			if (!this.isImageType && !this._singleItem) {
				////////////// 多层 ////////////////////
				let unloadBoyd: boolean = false;
				if (!this._multi_items) {
					unloadBoyd = true;
				}
				if (!unloadBoyd) {
					let item: AvatarItem = this._multi_items[AvatarData.IDX_CLOTHES];
					if (!item || !item.isLoaded || item.isError) {
						unloadBoyd = true;
					}
				}

				if (unloadBoyd) {
					let texture = AvatarBase._unloadTexture;
					this.drawTextureRegX = -texture.sourceWidth / 2;
					this.drawTextureRegY = -(texture.height - 5);
					this._curRenderMatrix = this._singleItem_mix;
					this.renderTexture(g, texture, true, scene);
					return;
				}

				//针起始地址
				let a_stuas: number = AvatarData.ConvertActionSort(this.actionStatus, this.isRiding);
				let frameSortPos: number = AvatarData.getSortStartPos(this.unit.sex, a_stuas,
					this._direct, frameIdx);

				//查找所有
				for (let i: number = 0; i < AvatarData.MAX_ITEMS; i++) {
					let itemID: number;
					itemID = AvatarData.Get(frameSortPos + i);

					if (itemID < 0) break;
					//获得装备项对象
					let item: AvatarItem = this._multi_items[itemID];
					//还未下载好
					if (!item) continue;

					//如果是翅膀 判断是否到显示时间了
					if (itemID == AvatarData.IDX_WINGS && this._showWingTime > thisTime) {
						continue;
					}
					// logd("装备",i,itemID)

					//查找素材内存地址
					//贴图变量
					let texture: Texture = item.getBitmapData(fd_address);
					//贴图未准备好
					if (!texture)
						continue;
					this.drawTextureRegX = item.getFrameRegX(fd_address);
					this.drawTextureRegY = item.getFrameRegY(fd_address) - this._rideHeight;
					let mix: Matrix = this._multi_items_mix[itemID];
					if (!mix)
						this._multi_items_mix[itemID] = mix = new Matrix(-1);
					this._curRenderMatrix = mix;
					//衣服类型需要特殊处理，鼠标碰撞专用
					this.renderTexture(g, texture, itemID == AvatarData.IDX_CLOTHES, scene);

				}

				//是否需要播放翅膀消失特效
				if (this._oldAtnStatus >= 0) {
					let flyDisapperEffectName: string = this.getWingEffect(this._oldAtnStatus);
					if (flyDisapperEffectName) {
						let wingEffect = ObjectPools.malloc(EffectAvatar) as EffectAvatar;
						wingEffect.setData("0000" + flyDisapperEffectName);
						wingEffect.anchorObject = this.unit;
						wingEffect.toward = this.unit.toward;
						wingEffect.atBottom = false;
						if (this.rideHeight > 0)
							wingEffect.setOffset(0, -this.rideHeight);
						scene.addEffect(wingEffect);
						this._oldAtnStatus = -1;
					}
				}

			}
			this.updateRedWaring(scene);
		}

		// 更新透明度
		protected updateAlpha(): boolean {
			let dispearIng: boolean = super.updateAlpha();

			if (!dispearIng && this.unit.isBuffAlpha) {
				//如果有buff 需要透明的
				this._drawAlpha = this._char3d.alpha;
				this._char3d.isBuff = true;
				this.unit.isBuffAlpha = false;
			}

			this._char3d && (this._char3d.alpha = this._drawAlpha);
			return dispearIng;
		}

		// 绘制底下部分
		onDrawBottom(g: Graphics, scene: SceneRoot): void {
			if (!this.unit || this.unit.isDied || !this.isNeedDrawView) return;
			//游戏对象 处于水层 不需要影子
			if (this.unit.isGameObject && this._atWaterLayer) return;
			//影子
			let texture = AvatarBase._shadowTexture;
			let dw = texture.width;
			let dh = texture.height;
			let dx = this._drawX - AvatarBase._shadow_offsetX;
			let dy = this._drawY - AvatarBase._shadow_offsetY;
			let avatarScale = this._scale;
			if (avatarScale != 1) {
				dw = dw * avatarScale;
				dh = dh * avatarScale;
				dx = dx - (dw - texture.width) / 2;
				dy = dy - (dh - texture.height) / 2;
			}
			g.drawTexture(texture, dx, dy, dw, dh);
		}
		// 绘制怒气部分
		onDrawAnger(g: Graphics, scene: SceneRoot, offsetY: number): number {
			let unit = this.unit;
			if (!unit || !unit.needShowAnger || unit.isDied || !this.isNeedDrawView) {
				this._char3d.angerEnable = false;
				return offsetY;
			}
			let anger_pi: number = this.GetAngerViewPI();
			if (anger_pi >= 0) {
				this._char3d.angerEnable = true;
				this._char3d.angerRatio = 100 * anger_pi;
			}
			else {
				this._char3d.angerEnable = false;
			}
			return offsetY;
		}

		// 名字颜色
		private _nameColor: string;
		// 绘制名字部分
		onDrawName(g: Graphics, scene: SceneRoot, offsetY: number): number {
			let unit = this.unit;
			if (!unit || unit.isDied || !this.isNeedDrawView || !unit.needShowName || (unit instanceof FakeUnit && unit.isBattleRole && unit.hp <= 0)) {
				this._char3d.nameEnable = false;
				this._char3d.bloodEnable = false;
				this._char3d.titleEnable = false;
				return offsetY;
			}

			let h_pi: number = this.GetHealthViewPI();
			if (h_pi >= 0) {
				this._char3d.bloodEnable = true;
				this._char3d.hpRatio = 100 * h_pi;
				if (!(unit instanceof FakeUnit) || unit.isSelfRole) this._char3d.bloodColor = layapan.LayaSceneChar.BLOOD_COLOR_HP;
				else this._char3d.bloodColor = layapan.LayaSceneChar.BLOOD_COLOR_ANGER;
			}
			else if (this._unitType == UnitField.TYPE_ID_CREATURE && this._npcFlag == Unit.CREATURE_TYPE_MONSTER) {
				// 普通怪物在没受到攻击时不显示名字
				this._char3d.bloodEnable = false;
				return offsetY;
			}

			let name = unit.name;
			// name += "," + this.unit.guid + "[" + Math.floor(this.unit.pos.x * 10) / 10 + "," + Math.floor(this.unit.pos.y * 10) / 10 + "]"
			// + "[" + Math.floor(this.unit.GetTargetPosX() * 10) / 10 + "," + Math.floor(this.unit.GetTargetPosY() * 10) / 10 + "]"
			// + "[" + Math.floor(this.unit.target.x * 10) / 10 + "," + Math.floor(this.unit.target.y * 10) / 10 + "] (" + this.unit.moveStatus + ")" + this.unit.movePath;
			if (name) {
				this._char3d.nameEnable = true;
				//如果是玩家
				if (unit.isPlayer) {
					//pk模式
					this._nameColor = this.getPlayerNameColor(scene);
				}
				this._char3d.charName = "[" + this._nameColor + "]" + name;
			}
			else {
				this._char3d.nameEnable = false;
			}
			//刷新称谓
			let appellation = unit.appellation;
			if( appellation )
			{
				this._char3d.titleEnable =  true;
				this._char3d.charTitle =  appellation;
				// this._char3d.setWeaponSlotByAvatar(5001010,"weapon_dao"); 
			}else
			{
				this._char3d.titleEnable =  false;
			}
			//刷新模型武器
			if( unit.Weapon > 0 && unit.School != -1 && unit.School != -1 )
			{
				let school = unit.School;
				let shape = unit.Shape;
				let sex = shape % 2 == 0 ? Sex.woman : Sex.man;
				let weaponName = LoginModel.getweaponBySchool(school,sex);
				this._char3d.setWeaponSlotByAvatar(unit.Weapon,weaponName);
				unit.Weapon = 0;
			}else if( unit.Weapon == -1 )
			{
				this._char3d.setWeapon(-1);
				unit.Weapon = 0;
			}
			
			return offsetY;
		}

		/** 获取玩家名字颜色
		 * 1、玩家看到自身为黄色
		 * 2、正常情况下，玩家看到其他人为白色
		 * 3、灰名状态下，名字显示灰色
		 * 4、善恶值超过10点后，名字显示红色
		 * 5、特殊，在仙道大会、斗仙台中，己方所有成员显示蓝色，敌方所有成员显示红色
		 */
		private getPlayerNameColor(scene: SceneRoot): string {
			let unit = this.unit;
			if (!unit) return "FFFFFF";

			// 自己黄色
			if (unit == scene.app.sceneObjectMgr.mainUnit || (this.unit instanceof FakeUnit && this.unit.isSelfRole)) {
				return "40ea02";//00FF00
			}
			//其他人默认白色
			return "00FF00";
		}

		// 临时的文本框
		private static _tempText: laya.display.Text;
		// 闲聊文本
		private _gossipText: string = "";
		private _gossipTexts: Array<string> = [];
		private _gossipTextFontSize: number = 0;
		private _gossipTextWidth: number = 0;
		private _gossipTextHeight: number = 0;
		// 闲聊结束时间
		private _gossipEndTime: number = 0;

		// 下次随机判断是否显示时间
		private _gossipNextTime: number = 0;

		private _isNeedRandomGossip: boolean = true;
		setGossipMess(value: string, fontSize: number, delay: number = 0): void {
			let cur_time: number = Laya.timer.currTimer;
			if (this._gossipText == value) {
				return;
			}
			this._gossipText = value;
			this._gossipTexts.length = 0;
			if (!this._gossipText || this._gossipText == "") {
				this._gossipEndTime = cur_time - 1;
				return;
			}

			this._gossipTextFontSize = fontSize;

			let tempText = AvatarUnit._tempText;
			if (!tempText) {
				tempText = new laya.display.Text();
				AvatarUnit._tempText = tempText;
				tempText.fontSize = this._gossipTextFontSize;
				tempText.font = "SimHei";
				tempText.color = "#FFFFFf";
				tempText.width = 160 / 14 * this._gossipTextFontSize;
				tempText.wordWrap = true;
				tempText.leading = 2;
				tempText.bold = true;
			}
			tempText.text = this._gossipText;
			this._gossipTextWidth = tempText.textWidth;
			this._gossipTextHeight = tempText.textHeight;
			this._gossipTexts = tempText.lines.concat();
			this._gossipEndTime = cur_time + (delay > 0 ? delay : 5000);
		}

		onDrawGossip(g: Graphics, scene: SceneRoot, offsetY: number): number {
			if (!this.isNeedDrawView
				|| !this._isNeedRandomGossip
				|| !this.unit
				|| this.unit.isDied
			) {
				return offsetY;
			}
			let cur_time: number = Laya.timer.currTimer;
			if (cur_time > this._gossipNextTime) {
				this._gossipNextTime = cur_time + 7000 + Math.floor(Math.random() * 3000);
				if (Math.random() < 0.1) {
					// this.setGossipMess(GossipData.randGossip(this.unit.entryid), scene.sceneFontSize);
				}
			}

			if (cur_time > this._gossipEndTime) {
				this._gossipTexts.length = 0;
				return offsetY;
			}

			let textHeight = this._gossipTextHeight;
			let dh = textHeight + 10;
			offsetY += dh;
			let lineHeight = this._gossipTextFontSize + 2;
			let textsCount = this._gossipTexts.length;
			let dx = Math.floor(this._drawX - 76);
			let dy = Math.floor(this._drawY - offsetY - 1);
			g.drawTexture(AvatarBase._gossTexture, dx - 6, dy - 6, this._gossipTextWidth + 10, dh);
			for (let i = 0; i < textsCount; i++) {
				g.fillBorderText(this._gossipTexts[i], dx, dy + i * lineHeight, this._gossipTextFontSize + "px SimHei", '#FFFFFf', "#000000", 2, "left");
			}

			return offsetY;
		}

		// 绘制头顶标识部分
		onDrawMask(g: Graphics, scene: SceneRoot, offsetY: number): number {
			if (!this.unit || this.unit.isDied || !this.isNeedDrawView) return offsetY;
			let avatarScale = this._scale;
			avatarScale = 1; // 不放大
			let texture: Texture;
			//如果是任务npc
			if (this.unit.isNpc) {
				let npcHeadMask: number = 0;
				let dw: number, dh: number;
				let config: any;
				let effectMask: EffectFrame;
				if (npcHeadMask == 2) {
					if (this._npcYellowAni) {
						this._npcYellowAni.isPlayEnd = true;
						ObjectPools.free(this._npcYellowAni);
						this._npcYellowAni = null;
					}
					config = EffectMgr.EFFECT_NPC_BLUE;
					if (!this._npcBlueAni) {
						this._npcBlueAni = ObjectPools.malloc(EffectFrame, null, config.frameCount, config.interval) as EffectFrame;
						this._npcBlueAni.setAssetPath(config.sourcePath);
						this._npcBlueAni.anchorObject = this.unit;
						this._npcBlueAni.setLoop(true);
						this._npcBlueAni.setData(config.source, config.interval, config.fileName, 10000);
					}
					effectMask = this._npcBlueAni;
				}
				else if (npcHeadMask == 1) {
					if (this._npcBlueAni) {
						this._npcBlueAni.isPlayEnd = true;
						ObjectPools.free(this._npcBlueAni);
						this._npcBlueAni = null;
					}
					config = EffectMgr.EFFECT_NPC_YELLOW;
					if (!this._npcYellowAni) {
						this._npcYellowAni = ObjectPools.malloc(EffectFrame, null, config.frameCount, config.interval) as EffectFrame;
						this._npcYellowAni.setAssetPath(config.sourcePath);
						this._npcYellowAni.anchorObject = this.unit;
						this._npcYellowAni.setLoop(true);
						this._npcYellowAni.setData(config.source, config.interval, config.fileName, 10000);
					}
					effectMask = this._npcYellowAni;
				}
				else {
					this.clearNpcMask();
				}
				if (effectMask && !effectMask.isPlayEnd) {
					offsetY -= 30;
					dw = effectMask.width;
					dh = effectMask.height;
					let dx: number, dy: number;
					dw = dw * avatarScale;
					dh = dh * avatarScale;
					offsetY += dh / 2;
					// logd("npc mask",dx,dy,dw,dh,avatarScale,this._drawX,this._drawY,AvatarBase.npcBuleAni.index,AvatarBase.npcYellowAni.index);
					effectMask.setOffset(0, -offsetY);
					effectMask.updateTexture();
					effectMask.onDraw(g, scene.camera);
				}

			}
			else if (this._unitType == UnitField.TYPE_ID_CREATURE) {
				switch (this._npcFlag) {
					case Unit.CREATURE_TYPE_BOSS:
						texture = AvatarBase.HEAD_MASK_BOSS;
						break;
					case Unit.CREATURE_TYPE_SMALL_BOSS:
						texture = AvatarBase.HEAD_MASK_BOSS_WORLD;
						break;
					case Unit.CREATURE_TYPE_ELITE:
						//texture = AvatarBase.HEAD_MASK_JINGYING;
						break;
				}

			}
			else if (this._unitType == UnitField.TYPE_ID_PLAYER) {

			}

			if (texture) {
				offsetY += AvatarBase.HEAD_NODE_INTERVAL;
				let dx: number, dy: number, dw: number, dh: number;
				dw = texture.width * avatarScale;
				dh = texture.height * avatarScale;
				offsetY += dh;
				dx = this._drawX - dw / 2;
				dy = this._drawY - offsetY;
				g.drawTexture(texture, dx, dy, dw, dh);
			}

			return offsetY;
		}

		//清理npc标志
		private clearNpcMask(): void {
			if (this._npcBlueAni) {
				this._npcBlueAni.isPlayEnd = true;
				ObjectPools.free(this._npcBlueAni);
				this._npcBlueAni = null;
			}
			if (this._npcYellowAni) {
				this._npcYellowAni.isPlayEnd = true;
				ObjectPools.free(this._npcYellowAni);
				this._npcYellowAni = null;
			}
		}

		private updateRedWaring(scene: SceneRoot): void {
			if (this._redWaring && !this._circleData && !this.unit.isDied) {
				this._circleData = new game.data.Circle(this.unit.pos.x, this.unit.pos.y, 15);
				scene.UnSafeArea = this._circleData;
			}
			else if (!this._redWaring && this._circleData) {
				this._circleData = null;
				scene.UnSafeArea = null;
			}
			else if (this._circleData && this.unit.isDied) {
				this._circleData = null;
				scene.UnSafeArea = null;
			}
		}

		//检查装备更新
		private checkItems(): void {
			//检查是否avatarItems下载好了
			var isComplete: Boolean = true;
			for (var i: number = 0; i < this._multi_items.length; i++) {
				var item: AvatarItem = this._multi_items[i];
				if (item && !(item.isError || item.isLoaded)) {
					isComplete = false;
				}
			}

			if (isComplete) {
				if (this._multi_items[AvatarData.IDX_RIDE]) {
					this._multi_items[AvatarData.IDX_RIDE].setActionCopy(AvatarData.ACTION_STAND, AvatarData.ACTION_RUNNING);
					this._multi_items[AvatarData.IDX_RIDE].setActionCopy(AvatarData.ACTION_STAND, AvatarData.ACTION_BEATEN);
					this._multi_items[AvatarData.IDX_RIDE].setActionCopy(AvatarData.ACTION_STAND, AvatarData.ACTION_ATTACKGO);
				}
				this._ischecking = false;
				//视图失效
				this.invaliDrawInfo();
			}
		}

		// 追加动作状态 
		attachActionStatus(atnStus: number): void {
			let oldAtnStus: number = this.actionStatus;
			super.attachActionStatus(atnStus);
			this._oldAtnStatus = -1;
			//转为攻击动作
			if (this.actionStatus == AvatarData.STATE_ATTACKGO
				|| this.actionStatus == AvatarData.STATE_ATTACKGO2
				|| this.actionStatus == AvatarData.STATE_ATTACKGO3) {
				//加技能消失特效
				let cur_time: number = Laya.timer.currTimer;
				if (oldAtnStus == AvatarData.STATE_STAND || oldAtnStus == AvatarData.STATE_RUNNING) {
					if (this._showWingTime < cur_time)
						this._oldAtnStatus = oldAtnStus;
					this._showWingTime = cur_time + 2500;
				}
			}
		}

			/**
		 * 战斗场景动作
		 * @param atnStus 动作枚举
		 * @param completeState 动作完成状态:0 循环,1 最后一幀,2 默认动作
		 * @param func 回调
		 */
		public battleAction(atnStus: number, completeState: number = 2, func:Function): void {
			this.actionStatus = atnStus;
			// console.log("----------------unit = ",this.name, "  战斗场景动作 ", atnStus, "  动作完成状态 ",completeState);
			this._char3d.playBfun(CharAction.ConvertAction(this.actionStatus, this._isRiding), completeState, func);
		}

		//检查是否要求换装
		private updateAvatarItemData(): void {

			//不存在才构建
			if (!this._multi_items) this._multi_items = new Array<AvatarItem>(AvatarData.MAX_ITEMS);

			var aItem: AvatarItem;
			var newItemName: string = null;

			///////////////// 初始化一下 //////////////
			this._linkage.kind = AvatarLinkage.KIND_PLAYER;
			this._linkage.occ = this.unit.sex;

			///////////////////////// 人物衣服 ///////////////////
			//装备类型：身体
			aItem = this._multi_items[AvatarData.IDX_CLOTHES];
			//装备类型：身体
			this._linkage.equip = AvatarLinkage.EQUIP_BODY;
			this._linkage.direct = AvatarLinkage.DIRECT_NONE;
			newItemName = this.getCoatAvatar();
			//不穿衣服送身体
			if (!newItemName) {
				newItemName = "body00";
			}
			this._linkage.shortName = newItemName;
			newItemName = this._linkage.getName();

			if (aItem) {
				if (newItemName != aItem.itemName) {
					aItem.release();
					this._multi_items[AvatarData.IDX_CLOTHES] = null;
					this._ischecking = true;
				}
				else {
					newItemName = null;
				}
			}
			if (newItemName) {
				let item = AvatarItem.Get(newItemName);
				item.retain();
				this._multi_items[AvatarData.IDX_CLOTHES] = item;
				this._ischecking = true;
			}

			///////////////////////// 翅膀 ///////////////////
			aItem = this._multi_items[AvatarData.IDX_WINGS];
			this._linkage.equip = AvatarLinkage.EQUIP_WINGS;
			this._linkage.direct = AvatarLinkage.DIRECT_NONE;
			newItemName = this.getWingAvatar();
			this._linkage.shortName = newItemName;
			newItemName = this._linkage.getName();

			if (aItem) {
				if (newItemName != aItem.itemName) {
					aItem.release();
					this._multi_items[AvatarData.IDX_WINGS] = null;
					this._ischecking = true;
				}
				else {
					newItemName = null;
				}
			}
			if (newItemName) {
				let item = AvatarItem.Get(newItemName);
				item.retain();
				this._multi_items[AvatarData.IDX_WINGS] = item;
				this._ischecking = true;
			}

			////////////////////// 坐骑 ///////////////////////
			aItem = this._multi_items[AvatarData.IDX_RIDE];
			this._linkage.kind = AvatarLinkage.KIND_MOUNT;

			newItemName = this.getMountAvatar();
			this._linkage.shortName = newItemName;
			newItemName = this._linkage.getName1(newItemName);


			if (aItem) {
				if (newItemName != aItem.itemName) {
					aItem.release();
					this._multi_items[AvatarData.IDX_RIDE] = null;
					this._ischecking = true;
					this.isRiding = false;
				}
				else {
					newItemName = null;
					this.isRiding = true;
				}
			}
			if (newItemName) {
				let item = AvatarItem.Get(newItemName);
				item.retain();
				this._multi_items[AvatarData.IDX_RIDE] = item;
				this.isRiding = true;
				this._ischecking = true;
			}
		}
		// 受击
		onBeaten(scene: SceneRoot, toward: number, type: number, data: any, isbottom: boolean = false): void {

			super.onBeaten(scene, toward, type, data, isbottom);

			if (this.unit instanceof FakeUnit) return;//假的不需要飘血
			// if (this._unitType == UnitField.TYPE_ID_CREATURE)
			// 	this._whiteTime = 200;
			//飘战斗信息
			scene.createdFightxt(this.unit, type, data, isbottom);
		}
		// 击飞
		beatBackFly(index: number) {
			super.beatBackFly(index);
		}

		//飘战斗信息
		onDrawFightxt(scene: SceneRoot, type: number, data: any, isbottom: boolean = false): void {
			let scene3d: PanScene = scene.avatarLayer.scene3d;
			scene3d.flyText(type, data, isbottom);
		}


		protected _buffIcons: pan.BuffTitleMesh;
		protected _buffPos: Vector3D;
		//buff图标
		updateBuffIcons(): void {
			if (this._buffIcons) {
				this._scene3d.removeBuff(this._buffIcons);
				this._buffIcons = null;
				this._buffPos = null;
			}
			let buffIds: number[] = this.unit.buffMgr.buffIds;
			if (!buffIds || !buffIds.length) return;
			let types: number[] = [];
			for (let i: number = 0; i < buffIds.length; i++) {
				switch (buffIds[i]) {
					case 1: types.push(pan.PanBuffManager.TYPE_TRAP); break;
					case 2: types.push(pan.PanBuffManager.TYPE_BREAK); break;
					case 3: types.push(pan.PanBuffManager.TYPE_ARMOR); break;
					case 4: types.push(pan.PanBuffManager.TYPE_MOCKERY); break;
					// case 5: types.push(pan.PanBuffManager.TYPE_MOCKERY_HP); break;
				}
			}
			this._buffIcons = this._scene3d.showBuff(types);
			this._buffPos = new Vector3D(66, 175, 0);
		}

		// 坠地
		protected dropGround(scene: SceneRoot): void {
			// let effect = ObjectPools.malloc(EffectFrame, null, 8, 24) as EffectFrame;
			// effect.setData('smoke');
			// effect.anchorObject = this.unit;
			// effect.atBottom = true;
			// if (this.rideHeight > 0) {
			// 	effect.setOffset(0, -this.rideHeight);
			// }
			// scene.addEffect(effect);
		}

		//播放上御剑特效
		private playYuJianUpEffect(scene: SceneRoot): void {
			let effect = ObjectPools.malloc(EffectSkeleton) as EffectSkeleton;
			effect.setData('yujian');
			effect.anchorObject = this.unit;
			effect.atBottom = false;
			// effect.setOffset(0,-this._rideHeight);
			scene.addEffect(effect);
		}

		//播放卧底特效
		private playWoDiEffect(scene: SceneRoot): void {
			var effect = ObjectPools.malloc(EffectAvatar) as EffectAvatar;
			effect.setData("0000upgrade");
			effect.toward = Direct.BOTTOM;
			effect.anchorObject = this.unit;
			scene.addEffect(effect);
		}

		// 跑动水花的创建时间
		private _lastWaterEffectTime: number;
		// 站立时的水花特效
		private _waterStandEffect: EffectAvatar;
		//处于水层控制
		protected updateAtWater(scene: SceneRoot): void {
			if (this._isRiding || !this._atWaterLayer || this.unit.isDied || !this.isNeedDrawView) {
				this.clearWaterStandEffect();
				return;
			}
			//处于水层，并且是站立
			if (!this.unit.isMoving) {
				this.createWaterStandEffect(scene);
			} else {
				this.clearWaterStandEffect();
				//根据移动速度来定义触发的水花次数
				let currTimer = Laya.timer.currTimer;
				let interval = 1 / this.unit.speed * 1400;
				if ((currTimer - this._lastWaterEffectTime) < interval) return;
				this._lastWaterEffectTime = currTimer;
				this.createWaterRunEffect(scene);
			}
		}

		// 创建水上站立特效
		private createWaterStandEffect(scene: SceneRoot): void {
			if (this._waterStandEffect) {
				return;
			}
			this._waterStandEffect = ObjectPools.malloc(EffectAvatar) as EffectAvatar;
			this._waterStandEffect.setData("0000water_flower");
			this._waterStandEffect.anchorPostion = this._pos;
			this._waterStandEffect.atBottom = true;
			this._waterStandEffect.setLoop(true);
			scene.addEffect(this._waterStandEffect);
		}

		// 清理水上站立特效
		private clearWaterStandEffect(): void {
			if (!this._waterStandEffect) {
				return;
			}
			this._waterStandEffect.isPlayEnd = true;
			this._waterStandEffect = null;
		}

		// 创建水上跑动特效
		private createWaterRunEffect(scene: SceneRoot): void {
			let waterEffect = ObjectPools.malloc(EffectAvatar) as EffectAvatar;
			waterEffect.setData("0000water_run");
			waterEffect.scale = 0.6;
			waterEffect.anchorPostion = this._pos.clone();
			waterEffect.atBottom = true;
			scene.addEffect(waterEffect);
		}


		clear(checkNow: boolean): void {
			this.clearWaterStandEffect();
			this._oldWodiSkinId = 0;
			this.unit.buffMgr.off(LEvent.CHANGED, this, this.updateBuffIcons);
			this.unit.userData = null;
			//装备or坐骑显示发生变化
			this.unit.onAvatarChange = null;
			this.unit.onRedWaring = null;
			// buff
			for (let i = 0; i < this._avatarBuffs.length; i++) {
				this._avatarBuffs[i].dispose();
			}

			this._skinName = null;
			this._avatarBuffs = null;
			this.clearNpcMask();
			this._gossipTexts.length = 0;
			if (this._char3d) {
				this._char3d.shadow = false;
				this._char3d.destory();
				this._char3d = null;
			}
			if (this._particleInfos) {
				for (let i: number = 0; i < this._particleInfos.length; i++) {
					if (!this._particleInfos[i].particle) continue;
					this._scene3d.removeParticle(this._particleInfos[i].particle);
				}
				this._particleInfos = null;
			}
			if (this._buffIcons) {
				this._scene3d.removeBuff(this._buffIcons);
				this._buffIcons = null;
				this._buffPos = null;
			}
			super.clear(checkNow);
		}
	}
}