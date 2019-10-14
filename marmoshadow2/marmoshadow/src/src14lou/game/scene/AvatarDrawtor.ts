/**
* name 
*/
module game.scene {
	export class AvatarDrawtor extends Laya.Sprite {
		public avatarInited: boolean = false;
		private _scene: SceneRoot;
		get scene3d(): PanScene{
			return this._panSceneSprite ? this._panSceneSprite.scene as PanScene : null;
		}
		private _updateRunTime: number = 0;

		private _bottomG: Graphics;
		private _nameG: Graphics;
		private _maskG: Graphics;
		private _gossipG: Graphics;

		protected _avatars: Array<AvatarBase>;
		get avatars(): Array<AvatarBase> {
			return this._avatars;
		}
		protected _panSceneSprite: PanSceneSprite;
		get panSceneSprite(): PanSceneSprite{
			return this._panSceneSprite;
		}

		constructor(pScene: SceneRoot, bottomG: Graphics, nameG: Graphics, maskG: Graphics, gossipG:Graphics) {
			super();

			//场景赋值
			this._scene = pScene;
			this._bottomG = bottomG;
			this._nameG = nameG;
			this._maskG = maskG;
			this._gossipG = gossipG;
			//avatar集合
			this._avatars = new Array<AvatarBase>();

			//avatar数据加载
			let url = Path.scene_avatar + "avatar.data";
			let refAsset = RefAsset.Get(url);
			refAsset.retain();
			if (!refAsset.parseComplete) {
				refAsset.once(LEvent.COMPLETE, this, () => {
					let data = Laya.loader.getRes(url);
					refAsset.release(true);
					this.onAvatarDataComplete(data);
				});
			}
			else {
				let data = Laya.loader.getRes(url);
				refAsset.release(true);
				this.onAvatarDataComplete(data);
			}
			
			this._panSceneSprite = new PanSceneSprite();
			let scene3d = this._panSceneSprite.scene;
			this.addChild(this._panSceneSprite);
		}

		/**
		 * 鼠标碰撞检测
		 */
		public hitTest(xMouse: number, yMouse: number, hit3DPos:Pan3d.Vector3D): AvatarBase {
			for (let i: number = 0; i < this._avatars.length; i++) {
				let hitAvatar: AvatarBase = this._avatars[i];
				if (hitAvatar.hitTest(xMouse, yMouse, this._scene, hit3DPos)) {
					return hitAvatar;
				}
			}
			return null;
		}

		onResComplete(): void {
			AvatarBase.initRes();
		}

		//avata数据加载完成
		private onAvatarDataComplete(data: any): void {
			SpriteItem.path = Path.scene_avatar;
			//转换成ByteArray
			data = new ByteArray(data);
			data.uncompress();
			data.endian = Endian.BIG_ENDIAN;
			//初始化AvatarData对象
			AvatarData.init(data);
			this.avatarInited = true;
		}

		/**
		 * 查找avatar
		 */
		public FindAvatar(pUnit: Unit): AvatarBase {
			return pUnit.userData;
		}

		/**
		 * 心跳
		 */
		public update(diff: number): void {
			this._updateRunTime += diff;
			if (this._updateRunTime < 100) return;
			this._updateRunTime = 0;

			let objMgr: SceneObjectMgr = this._scene.app.sceneObjectMgr;
			objMgr.ForEachObject((obj: GuidObject): void => {
				let look = false;
				if (obj instanceof Unit) {
					this.checkLook(obj);

				}
			});

			this.updateInLookQueue();
		}

		private checkLook(obj: IAvatarObj): void {
			let sceneStoryMgr = this._scene.app.sceneObjectMgr.sceneStoryMgr;
			let look = !obj.hiding;
			if (look) {
				if (sceneStoryMgr && sceneStoryMgr.haveSelfLookRule) {
					look = sceneStoryMgr.lookIn(obj);
				}
				else {
					look = this._scene.camera.lookIn(obj.pos);
				}
			}

			//判断位置
			if (look) {
				//视线范围内，没有关联数据，则添加
				this.inLook(obj);
			} else {
				//视线范围外，有关联数据，则移除
				this.outLook(obj, false);
			}
		}

		// 进入视野队列
		private _inLookQueue: Array<IAvatarObj> = [];
		/**
		 * 对象在视野内
		 */
		private inLook(obj: IAvatarObj): void {
			let followUnit = this._scene.app.sceneObjectMgr.followUnit;
			if (followUnit == obj) {
				// 主玩家直接初始化
				this.__inLook(obj, this._scene.camera.isFollow);
			}
			else {
				// 其他形象进入队列
				let idx = this._inLookQueue.indexOf(obj)
				if (idx == -1) {
					this._inLookQueue.push(obj);
				}
			}
		}

		private updateInLookQueue(): void {
			const inLookBatchCount = 1;
			let count = 0
			while (count < inLookBatchCount && this._inLookQueue.length) {
				let obj = this._inLookQueue.shift();
				this.__inLook(obj);
			}
		}

		private __inLook(obj: IAvatarObj, isFollow: boolean = false): void {
			let avatar: AvatarBase = obj.userData;
			if (!avatar) {
				if (obj instanceof Unit) {
					avatar = new AvatarUnit(this._panSceneSprite.scene as PanScene, obj);
					if (obj instanceof FakeUnit) {
						avatar.isNeedDrawView = obj.isNeedDrawView;
					}
				}
			}
			if (avatar) {
				this.join(avatar);
				if(isFollow){
					this._scene.camera.follow(avatar.pos);
				}
				else{
					avatar.hitTestEnabled = true;
				}
			}
		}

		/**
		 * 对象不在视野内
		 */
		outLook(obj: IAvatarObj, checkNow: boolean): void {
			let idx = this._inLookQueue.indexOf(obj)
			if (idx != -1) {
				this._inLookQueue.splice(idx, 1);
			}
			let avatar: AvatarBase = obj.userData;
			if (avatar) {
				this.leave(avatar, checkNow);
				this._scene.camera.unFollow(avatar.pos);
			}
		}
		/**
		 * 形象加入
		 */
		private join(avatar: AvatarBase): void {
			// logd("game.scene.AvatarDrawtor.join[", avatar.name, ",", avatar.guid, "]");
			if(this._avatars.indexOf(avatar) == -1){
				this._avatars.push(avatar);
			}
		}

		/**
		 * 形象离开
		 */
		private leave(avatar: AvatarBase, checkNow:boolean): void {
			// logd("game.scene.AvatarDrawtor.leave[", avatar.name, ",", avatar.guid, "]");
			avatar.clear(checkNow);
			//Avatar从列表中删除
			let idx: number = this._avatars.indexOf(avatar);
			if (idx >= 0) {
				this._avatars.splice(idx, 1);
			}
		}

		private layerIndex: number = 0;
		private nextGraphics(filters: Array<any> = null): Graphics {
			let sp: Sprite;
			if (this.numChildren > this.layerIndex) {
				sp = this.getChildAt(this.layerIndex) as Sprite;
				sp.graphics.clear();
			} else {
				sp = new Sprite();
				sp.mouseEnabled = false;
				this.addChild(sp);
			}
			this.layerIndex++;
			sp.filters = filters;
			return sp.graphics;
		}


		public onDraw(diff: number): void {
			let aG: Graphics = this.graphics;
			let bG: Graphics = this._bottomG;
			let nG: Graphics = this._nameG;
			let mG: Graphics = this._maskG;
			let gG: Graphics = this._gossipG;
		
			//清理画布
			aG.clear();
			nG.clear();
			mG.clear();
			gG.clear();
			//深度排序,绘制
			this.layerIndex = 0;
			this._avatars.sort(this.worldObjectDeepCmp);
			for (let i: number = 0; i < this._avatars.length; i++) {
				//运算位置
				let avatar: AvatarBase = this._avatars[i];
				if (!avatar.visible) continue;
				// 绘制之前
				avatar.onDrawBefore(diff, this._scene);
				// 绘制
				// avatar.onDraw(diff, aG, this._scene);
				if(this.scene3d.is2D){
					// 绘制底下部分
					avatar.onDrawBottom(bG, this._scene);
					// // 绘制头顶
					let offsetY = avatar.headHeight + 20; // TODO 这里是否是让策划填好一点
					// //绘制怒气
					// offsetY = avatar.onDrawAnger(nG, this._scene, offsetY);
					// // 绘制名字部分
					// offsetY = avatar.onDrawName(nG, this._scene, offsetY);
					// //绘制闲聊
					// offsetY = avatar.onDrawGossip(gG,this._scene,offsetY);
					// //绘制头顶标识
					// avatar.onDrawMask(mG, this._scene, offsetY);
				}
				//绘制怒气
				avatar.onDrawAnger(nG, this._scene, 0);
				// 绘制名字部分
				avatar.onDrawName(nG, this._scene, 0);
			}

			//清理残留Sprite
			// this.removeChildren(this.layerIndex);
		}

		/*深度比较排序*/
		protected worldObjectDeepCmp(a: AvatarSprite, b: AvatarSprite): number {
			if (b.sortScore != a.sortScore) {
				return b.sortScore - a.sortScore;
			}
			return b.oid - a.oid;
		}

		//清理
		public clear(): void {
			for (let i: number = 0; i < this._avatars.length; i++) {
				this._avatars[i].clear(true);
			}
			this._avatars.length = 0;
			this._inLookQueue.length = 0;
		}
	}
}