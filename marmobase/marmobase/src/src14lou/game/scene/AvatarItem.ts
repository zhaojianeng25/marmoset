/**
* name 
*/
module game.scene{
	export class AvatarItem extends SpriteItem{

		private static MAX_FREE_TIME = 2000;							// 超时释放时间
		private static _refMap:{ [key: string]: AvatarItem } = {};		// 列表

		static Get(itemName:string, isPreload:boolean = false, priorityLevel:number = 0,resPacketIdxs:Array<number> = null, create:boolean = true):AvatarItem{
			let item:AvatarItem = this._refMap[itemName];
			if(create && !item){
				// logd("AvatarRes.GetAvatarItem new AvatarItem(" + itemName + ")");
				item = new AvatarItem(itemName);
				item.addTimeOut = this.MAX_FREE_TIME;
				this.Set(itemName, item);
			}
			item.download(isPreload,resPacketIdxs);
			return item;
		}

		static Set(key:string, asset:AvatarItem):void{
			this._refMap[key] = asset;
		}

		private static _nextTimer:number = 0;

		static update(diff):void{
			let currTimer = Laya.timer.currTimer;
			if(diff != -1 && currTimer < this._nextTimer){
				return;
			}
			this._nextTimer = currTimer + 1000; // 检查频率1秒
			let map = this._refMap;
			for(let key in map){
				let obj = map[key];
				// logd("RefAsset.update", "url", key, "refCount", obj._refCount, "timeOut", obj._timeOut);
				if(obj.update(currTimer)){
					delete map[key];
				}
			}
		}

		// 清理素材 	
		static clear():void{
			// logd("AvatarRes.clear()");
			let map = this._refMap;
			for(let key in map){
				let obj = map[key];
				obj._atOnceRelease = true;
				obj.clear();
				delete map[key];
			}
		}

		/*数据源，[动作][方向][帧列表]*/
		//private var _data:Array<Array<Array<AvatarFrame>>>;
		
		////////////////////// 内容部分 ////////////////////////////
		/*
		最大：动作31    方向7     帧数15		帧信息7
		位：  11111     111         1111		111
		偏移：<<10    <<7        <<3			+
		与操：&0x1F   &0x07    &0x0F		0x07
		4095长度,32767长度,255长度
		*/
		private static FRAME_TEXTURE_LEN:number = 4095;
		private static FRAME_DATA_LEN:number = 32767;
		private static FRAMEDATA_ELEM_LEN:number = 7;
		private static FRAME_LENGTH_LEN:number = 255;
		
		
		/**
		 * 获得指定动作编号和方向编号的内存地址
		 * @param action 动作
		 * @param direct 方向
		 * @param frameIndex 帧索引
		 * @return 
		 * 
		 */	
		
		public static get_AD_Address(actionIdx:number, directIdx:number):number{
			return (actionIdx << 10) + (directIdx << 7);
		}
		
		/**
		 * 通过索引位置换算出动作索引 
		 * @param pos
		 * @return 
		 * 
		 */	
		
		public static getActionIdx(fd_address:number):number{
			return (fd_address >> 10) & 0x1F;
		}
		
		/**
		 * 通过索引位置换算出方向索引 
		 * @param pos
		 * @return 
		 */	
		public static getDirectIdx(fd_address:number):number{
			return (fd_address >> 7) & 0x07;
		}
		
		/**
		 * 通过索引位置换算出帧索引 
		 * @param pos
		 * @return 
		 */		
		public static getFrameIdx(fd_address:number):number{
			return (fd_address >> 3) & 0x0F;
		}

		/**
		 * 获得帧数量的位置 
		 * @param action 动作
		 * @param direct 方向
		 * @return 
		 */		
		protected static getFrameLengthPos(action:number, direct:number):number{
			return (action << 3) + direct;
		}

		public static getFrameDataAddress(action:number, direct:number, idx:number):number{
			return (action << 10) + (direct << 7) + (idx << 3);
		}
		
		//////////////////////////////////////////////////////////////////////////////////////////
		// 引用计数
		private _refCount:number = 0;
		// 超时时间
		private _timeOut:number = 0;
		// 延长的超时时间
		private _addTimeOut:number = 0;
		set addTimeOut(v:number){
			this._addTimeOut = v;
		}

		protected _subTextures:Array<Texture> = new Array<Texture>(AvatarItem.FRAME_TEXTURE_LEN); 
		/*
		第一组帧数据
		精灵表编号(uint8)
		精灵表x坐标(uint16)
		精灵表y坐标(uint16)
		帧图片宽度(uint16)
		针图片高度(uint16)
		帧图片注册点x(int16) 
		帧图片注册点y(int16)
		*/
		protected _frameData:Array<number> = new Array<number>(AvatarItem.FRAME_DATA_LEN);
		/*是否存在动作的标志位*/
		protected _actionExtisFlag:Array<Boolean> = new Array<Boolean>(AvatarData.MAX_ACTION);
		/*
		名称：动作21 方向5
		位：  11111  111
		最大：31     7
		偏移：<<3    +
		与操：&0x1F  &0x07
		255长度
		*/
		protected _frameLength:Array<number> = new Array<number>(AvatarItem.FRAME_LENGTH_LEN);
		
		constructor(itemName:string){
			super(itemName);
		}	

		// 引用
		retain():void{
			this._refCount ++;
			this._timeOut = 0;
		}

		private _atOnceRelease:boolean = false;

		// 释放引用
		release(checkNow:boolean = false):void{
			this._atOnceRelease = checkNow;
			if(this._refCount <= 0){
				loge("release error this._reCount <= 0");
				return;
			}
			this._refCount --;
			if(checkNow){
				this.checkNow();
			}
			else{
				if(this._refCount == 0){
					this._timeOut = Laya.timer.currTimer + this._addTimeOut;
				}	
			}
		}

		// 立即检查超时
		checkNow():void{
			if(this._refCount == 0){
				// 标记过期
				this._timeOut = Laya.timer.currTimer - 1;
			}
		}

		/**
		 * 获得帧数量 
		 * @param action
		 * @param direct
		 * @return 
		 */	
		getFrameLength(action:number, direct:number):number{
			let pos:number = AvatarItem.getFrameLengthPos(action, direct);
			return this._frameLength[pos];
		}
		
		/**
		 * 获得位图 
		 * @param pos 位置
		 * @return 
		 */	
		getBitmapData(fd_address:number):Texture{
			//判断位图是否存在
			let ad_address:number = fd_address>>3;
			let subTexture:Texture = this._subTextures[ad_address]; 
			
			if(subTexture && this._sheetLoaders.length) return subTexture;
			//通过动作得到所在的分租
			let sheetid:number = this.getSheetID(fd_address);
			//找不到没有素材包
			if(!sheetid){
				return null;
			}
			//得到png资源包
			let atfLoader:AvatarPacketLoader = this.loadPacket(sheetid);
			
			//如果加载未成功，则返回null
			if(!atfLoader.isSuccessful)	return null;
			
			subTexture = Texture.createFromTexture(
				this._sheetLoaders[sheetid].texture,
				this.getFrameAtSheetX(fd_address),
				this.getFrameAtSheetY(fd_address),
				this.getFrameWidth(fd_address),
				this.getFrameHeight(fd_address));
			subTexture["__ROOT_ID"] = atfLoader.rootID;
			this._subTextures[ad_address] = subTexture;
	
			return subTexture;
		}

		/**
		 * 获得精灵表id 
		 * @param pos
		 * @return 
		 */		
		getSheetID(fd_address:number):number{
			return this._frameData[fd_address];
		}
		
		/**
		 * 获得位于精灵表的X
		 * @param pos
		 * @return 
		 */		
		getFrameAtSheetX(fd_address:number):number{
			return this._frameData[fd_address+1];
		}
		
		/**
		 * 获得位于精灵表的Y
		 * @param pos
		 * @return 
		 */		
		getFrameAtSheetY(fd_address:number):number{
			return this._frameData[fd_address+2];
		}
		
		/**
		 * 获得帧宽度 
		 * @param pos
		 * @return
		 */		
		getFrameWidth(fd_address:number):number{
			return this._frameData[fd_address+3];
		}
		
		/**
		 * 获得帧高度
		 * @param pos
		 * @return 
		 */		
		getFrameHeight(fd_address:number):number{
			return this._frameData[fd_address+4];
		}
		
		/**
		 * 获得帧动画播放注册点X
		 * @param pos
		 * @return 
		 */	
		getFrameRegX(fd_address:number):number{
			return this._frameData[fd_address+5];
		}
		
		/**
		 * 获得帧动画播放注册点Y
		 * @param pos
		 * @return 
		 */	
		getFrameRegY(fd_address:number):number{
			return this._frameData[fd_address+6];
		}
			
		//读取索引文件
		//之前已经读取了一个ubyte的png数量
		protected readIdxFile(stream:ByteArray):void{
			//读取当前的动作数
			var actionCount:number = stream.readUnsignedByte();
			for(var a:number=0;a < actionCount;a++){
				//动作编号
				var actionIdx:number = stream.readUnsignedByte();				
				//获取方向数
				var directCount:number = stream.readUnsignedByte();				
				//标识动作存在
				this._actionExtisFlag[actionIdx] = directCount>0;
				
				for(var d:number=0;d < directCount;d++){
					//方向编号
					var directIdx:number = stream.readUnsignedByte();			
					//读取帧数
					var frameCount:number = stream.readUnsignedByte();
					//设置帧数量
					this._frameLength[AvatarItem.getFrameLengthPos(actionIdx, directIdx)] = frameCount;
					
					for(var i:number=0;i < frameCount;i++){
						//帧具体地址
						var fd_address:number = AvatarItem.getFrameDataAddress(actionIdx, directIdx, i);
						//精灵表编号
						this._frameData[fd_address] = stream.readUnsignedByte();
						//精灵表y坐标(uint16)
						this._frameData[fd_address+ 1] = stream.readUnsignedShort();
						//精灵表x坐标(uint16) 
						this._frameData[fd_address +2] = stream.readUnsignedShort();
						//帧图片宽度(uint16)
						this._frameData[fd_address +3] = stream.readUnsignedShort();	
						//帧图片高度(uint16)
						this._frameData[fd_address +4] = stream.readUnsignedShort();						
						//帧图片注册点x(int16)
						this._frameData[fd_address +5] =  stream.readShort();
						//帧图片注册点y(int16)
						this._frameData[fd_address +6] =  stream.readShort();	
					}
				}
				
			}
		}		
		
		/**
		 *  动作不存在
		 * @param action 动作编号枚举
		 * @return 
		 */		
		isNonentityAction(action:number):Boolean{
			return !this._actionExtisFlag[action];
		}
		
		/**
		 * 设置动作拷贝 
		 * @param srcAction 源动作
		 * @param dstAction 目标动作
		 */		
		setActionCopy(srcAction:number, dstAction:number):void{
			//都不存在，拷个P
			if(!this._actionExtisFlag[dstAction] && !this._actionExtisFlag[srcAction]){
				return;
			}
			
			//以前拷贝过了
			if(this._actionExtisFlag[dstAction] == this._actionExtisFlag[srcAction]){
				return;
			}
			
			//标识动作存在
			this._actionExtisFlag[dstAction] = this._actionExtisFlag[srcAction];
			
			for(var directIdx:number=0; directIdx<AvatarData.MAX_DIRECT; directIdx++){
				//读取帧数
				var sFrameCount:number = this.getFrameLength(srcAction, directIdx);
				//设置帧数量
				this._frameLength[AvatarItem.getFrameLengthPos(dstAction, directIdx)] = sFrameCount;

				for(var i:number=0;i<sFrameCount;i++){					
					var s_fd_address:number = AvatarItem.getFrameDataAddress(srcAction, directIdx, i);
					var d_fd_address:number = AvatarItem.getFrameDataAddress(dstAction, directIdx, i);

					//帧信息复制
					this._frameData[d_fd_address] 		=	 this._frameData[s_fd_address];
					this._frameData[d_fd_address+1] 	=	 this._frameData[s_fd_address+1];
					this._frameData[d_fd_address+2] 	=	 this._frameData[s_fd_address+2];
					this._frameData[d_fd_address+3] 	=	 this._frameData[s_fd_address+3];
					this._frameData[d_fd_address+4] 	=	 this._frameData[s_fd_address+4];
					this._frameData[d_fd_address+5] 	=	 this._frameData[s_fd_address+5];
					this._frameData[d_fd_address+6] 	=	 this._frameData[s_fd_address+6];
				}
			}
		}

		update(currTimer:number):boolean{
			let timeOut = this._timeOut && (currTimer > this._timeOut);
			if(timeOut){
				this.clear();
			}
			return timeOut;
		}
		
		clear():void{
			for(var i:number = 0; i < this._subTextures.length; i++){
				this._subTextures[i] = null;
			}
			// logd("AvatarItem.clear", this._itemName);
			super.clear(this._atOnceRelease);
		}
	}
}