/**
* 螢火蟲 
*/
module game.scene{
	export class WeatherBeetle extends WeatherBase {

		///////运动配置成员枚举////////
		private static MS_MOVETYPE						:number=0;	//运动方式,圆形,曲线
		private static MS_SPEEDTYPE						:number=1; //加速度方式[各种缓动函数,0:为匀速]
		private static MS_TOTAL_RADION					:number=2; //总弧度,三角函数的曲线主要通过弧度来计算
		private static MS_ALAPH_RADION					:number=3; 	//透明度缓动系数
		private static MS_ALAPH_CYCLETIME				:number=4; //透明度效果播放时间
		private static MS_SCALE_RADION					:number=5; 	//缩放度缓动系数
		private static MS_SCALE_CYCLETIME				:number=6; //缩放度效果播放时间
		private static MS_YPEAK							:number=7; //三角函数中的峰值倍率(在圆形运动方式里代表半径)
		private static MS_XPEAK							:number=8; //三角函数中的峰值倍率(在圆形运动方式里代表半径)
		private static MS_TOTALTIME						:number=9; //运动总时间
		private static MS_PASUETIME						:number=10; //运动结束后需要停止移动的时间
		private static MS_DIRECTION						:number=11; //运动方向 1:正向 -1:方向 
		private static MS_GRAVITYX						:number=12; //偏振x量(每帧递增的量) 
		private static MS_GRAVITYY						:number=13; //偏振Y量(每帧递增的量) 
		private static MS_SPEEDACCELERATION				:number=14; //径向加速度百分比[每帧递增的量]
		private static MS_ROATEANGEL					:number=15; //选中角度[无效参数]
		private static MS_MINALAPH_RADION				:number=16; //最小透明系数
		private static MS_MAXALAPH_RADION				:number=17; //最大透明系数
		private static MS_MINSCALE_RADION				:number=18; //最小缩放系数
		private static MS_MAXSCALE_RADION				:number=19; //最大缩放系数
		private static MS_ISLOOPALAPH					:number=20; //是否循环播放透明度效果
		private static MAX_MS_FILEDNUM					:number=21;
		
		
		///////粒子属性成员枚举////////
		private static FS_MSIDX							:number=0;	//当前设置的运动配置索引
		private static FS_ORIPOSX						:number=1;//原始x坐标
		private static FS_ORIPOSY						:number=2;//原始y坐标
		private static FS_POSX							:number=3;//x坐标
		private static FS_POSY							:number=4;//y坐标
		private static FS_RAIDON						:number=5;//弧度
		private static FS_PASUETIME						:number=6;//剩余暂停时间
		private static FS_ALPHA							:number=7;//透明度
		private static FS_ALPHA_ADD						:number=8;//透明度增量
		private static FS_SCALE							:number=9;//缩放度
		private static FS_SCALE_ADD						:number=10;//缩放度增量
		private static FS_ISINT							:number=11;//是否已初始化
		private static FS_RUNTIME						:number=12;//运行时长
		private static FS_GRAVITYX						:number=13;//偏振x量
		private static FS_GRAVITYY						:number=14;//偏振y
		private static FS_SEPPED  						:number=15;//速度
		private static FS_SPEEDACCELERATION  			:number=16;//加速度
		private static FS_WIDTH  						:number=17;//贴图原始宽度
		private static FS_HEIGHT  						:number=18;//贴图原始高度
		private static FS_ROATEANGEL  					:number=19;//路线角度
		private static MAX_FS_FILEDNUM					:number=20;
		
		
		
		/**运动类型-圆形 */	
		private static MOVETYPE_CIRCLE:number=0;
		/**运动类型-曲线 */
		private static MOVETYPE_FLEXIBLE :number=1;
		
		/**粒子运动参数配置 */		
		protected MOVEDATAS:Array<Array<number>>;
		/**粒子配置 */		
		protected FIREDATAS:Array<number>;
		
		private _lastTime:number = 0;
		
		/**1弧度 */		
		private static  _1Radian:number=Math.PI/180;
		/***Math.Pi */
		private static  PI:number=Math.PI;
		
		/**每一帧间隔的时间(毫秒)  */		
		private _diffMs:number = 0;
		/**运行至现在间隔的时间(毫秒) */		
		private _durationMS:number = 0;
		
		private _fms:Array<number>;
		private _vals:Array<any>;
		
		private _xSin:number=0;
		private _ySin:number=0;
		
		private _turnAngel:number = 0;
		
		constructor(app: AppBase) {
			super(app);
			this._assetsLoader = new AssetsLoader();
			this._assetsLoader.load([Path.atlas_scene + "weather/fireflies.atlas"], Handler.create(this, this.onResComplete));
		}
	
		protected onResComplete():void{
			//贴图集
			//螢火蟲素材
			this.TEXTURES_SETTING = new Array<Texture>(4);
			this.TEXTURES_SETTING[0] = Laya.loader.getRes("scene/weather/fireflies/fireflies_s_y.png");	//远
			this.TEXTURES_SETTING[1] = Laya.loader.getRes("scene/weather/fireflies/fireflies_s_g.png");	//远2
			this.TEXTURES_SETTING[2] = Laya.loader.getRes("scene/weather/fireflies/fireflies_b_y.png");	//中
			this.TEXTURES_SETTING[3] = Laya.loader.getRes("scene/weather/fireflies/fireflies_b_g.png"); //近
			
			//远景，中景，近景数量定义
			this.LEN_SETTING = new Array<number>(this.TEXTURES_SETTING.length*2);
			this.LEN_SETTING[0] = 25;
			this.LEN_SETTING[1] = 35;
			this.LEN_SETTING[2] = 4;
			this.LEN_SETTING[3] = 4;
			
			
			this.FIREDATAS =new Array<number>();
			this.MOVEDATAS=new Array<Array<number>>(this.TEXTURES_SETTING.length);
			
			////////////////////////////////////远景0//////////////////////////////////////////////////////
			
			//运动方式
			this.MOVEDATAS[0]=new Array<number>();
			this.MOVEDATAS[0].push(
				//第一次弧形运动
				//运动方式 加速类型  总弧度 透明系数 透明循环时间 放大系数 放大循环时间
				WeatherBeetle.MOVETYPE_FLEXIBLE,0,180 * WeatherBeetle._1Radian,180 * WeatherBeetle._1Radian,1000,180 * WeatherBeetle._1Radian,2000,
				//y轴峰值 x峰值  总时间  暂停时间   方向  重力x  重力y  加速度  角度 最小透明系数 最大透明系数 最小缩放系数 最大缩放系数 是否循环透明效果
				30,1.5,2000,1,-1,0,0,0.01,330,0,0,40 * WeatherBeetle._1Radian,140 * WeatherBeetle._1Radian,0,
				
				//第二次弧形,淡入
				WeatherBeetle.MOVETYPE_FLEXIBLE,0,360 * WeatherBeetle._1Radian, 180 * WeatherBeetle._1Radian,500,180 * WeatherBeetle._1Radian,2000,
				3,0.58,1000,1,-1,0,0,0,125,90 * WeatherBeetle._1Radian,179.9 * WeatherBeetle._1Radian,40 * WeatherBeetle._1Radian,140 * WeatherBeetle._1Radian,0,
				
				//第三次弧形，淡出
				WeatherBeetle.MOVETYPE_FLEXIBLE,0,180 * WeatherBeetle._1Radian,180 * WeatherBeetle._1Radian,1000,180 * WeatherBeetle._1Radian,2000,
				10,0.5,2000,1,-1,0,0,0.01,120,0 * WeatherBeetle._1Radian,90 *WeatherBeetle._1Radian,40 * WeatherBeetle._1Radian,140 * WeatherBeetle._1Radian,0,
				
				//第四次弧形
				WeatherBeetle.MOVETYPE_FLEXIBLE,0,180 * WeatherBeetle._1Radian,180 * WeatherBeetle._1Radian,1000,180 * WeatherBeetle._1Radian,2000,
				30,0.7,2000,1,-1,0,0,0.008,210,0,0,40 * WeatherBeetle._1Radian,140 * WeatherBeetle._1Radian,0,
				
				//第五次弧形
				WeatherBeetle.MOVETYPE_FLEXIBLE,0,180 * WeatherBeetle._1Radian,180 * WeatherBeetle._1Radian,1000,180 * WeatherBeetle._1Radian,2000,
				30,0.3,2000,1000,-1,0,0,0,300,0,0,40 * WeatherBeetle._1Radian,140 * WeatherBeetle._1Radian,0,
				
				//淡出，呼吸2秒
				WeatherBeetle.MOVETYPE_CIRCLE,0,220 * WeatherBeetle._1Radian,180 * WeatherBeetle._1Radian,1000,180 * WeatherBeetle._1Radian,2000,
				0,0,2500,1,0,0,0,0,0,0,0,40 * WeatherBeetle._1Radian,140 * WeatherBeetle._1Radian,0
			);
			
			////////////////////////////////////远景1//////////////////////////////////////////////////////
			
			
			//配置运动方式
			this.MOVEDATAS[1]=new Array<number>();
			this.MOVEDATAS[1].push(
				//旋转动作,淡出
				//运动方式 加速类型  总弧度 透明系数 透明循环时间 放大系数 放大循环时间
				WeatherBeetle.MOVETYPE_CIRCLE,0,360 * WeatherBeetle._1Radian,180 * WeatherBeetle._1Radian,3000,180 * WeatherBeetle._1Radian,1000,
				//y轴峰值 x峰值  总时间  暂停时间   方向  重力x  重力y  加速度  角度 最小透明系数 最大透明系数 最小缩放系数 最大缩放系数 是否循环透明效果
				20,12,6000,1,1,0,0,0,0,90 * WeatherBeetle._1Radian,270 * WeatherBeetle._1Radian,40 * WeatherBeetle._1Radian,140 * WeatherBeetle._1Radian,1
			);
			
			
			////////////////////////////////////远景2//////////////////////////////////////////////////////

			
			//配置运动方式
			this.MOVEDATAS[2]=new Array<number>();
			this.MOVEDATAS[2].push(
				//第一次弧形运动
				//运动方式 加速类型  总弧度 透明系数 透明循环时间 放大系数 放大循环时间
				WeatherBeetle.MOVETYPE_FLEXIBLE,0,	180 * WeatherBeetle._1Radian,180*WeatherBeetle._1Radian,1000,180*WeatherBeetle._1Radian,2000,
				//y轴峰值 x峰值  总时间  暂停时间   方向  重力x  重力y  加速度  角度 最小透明系数 最大透明系数 最小缩放系数 最大缩放系数 是否循环透明效果
				30,1.5,2000,1,-1,0,0,0.003,330,0,0,40*WeatherBeetle._1Radian,140*WeatherBeetle._1Radian,0,
				
				//第二次弧形,淡入
				WeatherBeetle.MOVETYPE_FLEXIBLE,0,360*WeatherBeetle._1Radian,180*WeatherBeetle._1Radian,500,180*WeatherBeetle._1Radian,2000,
				3,0.58,2000,1,-1,0,0,0.003,125,90*WeatherBeetle._1Radian,179.9*WeatherBeetle._1Radian,40*WeatherBeetle._1Radian,140*WeatherBeetle._1Radian,0,
				
				//第三次弧形,淡出
				WeatherBeetle.MOVETYPE_FLEXIBLE,0,180*WeatherBeetle._1Radian,180*WeatherBeetle._1Radian,1000,180*WeatherBeetle._1Radian,2000,
				10,0.5,2000,1,-1,0,0,0.005,120,0*WeatherBeetle._1Radian,90*WeatherBeetle._1Radian,40*WeatherBeetle._1Radian,140*WeatherBeetle._1Radian,0,
				
				//第四次弧形
				WeatherBeetle.MOVETYPE_FLEXIBLE,0,180*WeatherBeetle._1Radian,180*WeatherBeetle._1Radian,1000,180*WeatherBeetle._1Radian,2000,
				30,0.7,2000,1,-1,0,0,0,210,0,0,40*WeatherBeetle._1Radian,140*WeatherBeetle._1Radian,0,
				
				//第五次弧形
				WeatherBeetle.MOVETYPE_FLEXIBLE,0,	180*WeatherBeetle._1Radian,180*WeatherBeetle._1Radian,1000,180*WeatherBeetle._1Radian,2000,
				30,0.3,2000,1000,-1,0,0,0,300,0,0,40*WeatherBeetle._1Radian,140*WeatherBeetle._1Radian,0,
				
				//淡出，呼吸2秒
				WeatherBeetle.MOVETYPE_CIRCLE,0,	220*WeatherBeetle._1Radian,180*WeatherBeetle._1Radian,1000,180*WeatherBeetle._1Radian,2000,
				0,0,2500,1,0,0,0,0,0,0,0,40*WeatherBeetle._1Radian,140*WeatherBeetle._1Radian,0
			);
			
			
			////////////////////////////////////远景3//////////////////////////////////////////////////////
			
			
			//配置运动方式
			this.MOVEDATAS[3]=new Array<number>();
			this.MOVEDATAS[3].push(
				////旋转动作
				//运动方式 加速类型  总弧度 透明系数 透明循环时间 放大系数 放大循环时间
				WeatherBeetle.MOVETYPE_CIRCLE,0,	360*WeatherBeetle._1Radian,180*WeatherBeetle._1Radian,1000,180*WeatherBeetle._1Radian,2000,
				//y轴峰值 x峰值  总时间  暂停时间   方向  重力x  重力y  加速度  角度 最小透明系数 最大透明系数 最小缩放系数 最大缩放系数 是否循环透明效果
				80,85,6000,1,1,0,0,0,0,0,90*WeatherBeetle._1Radian,40*WeatherBeetle._1Radian,140*WeatherBeetle._1Radian,0,
				
				//停下来，呼吸2.5秒
				WeatherBeetle.MOVETYPE_CIRCLE,0,360*WeatherBeetle._1Radian,180*WeatherBeetle._1Radian,2000,180*WeatherBeetle._1Radian,2000,
				0,0,2500,1,0,0,0,0,0,0,0,40*WeatherBeetle._1Radian,140*WeatherBeetle._1Radian,0
			);
			
			
			//设置
			this._lens = this.LEN_SETTING.concat();
			super.enable();
		}
		
		
		protected onReset(camera: game.scene.Camera):boolean{
			
			//如果地图不存在，则退出初始化
			if(!this.TEXTURES_SETTING || !this.TEXTURES_SETTING[0]) 
				return false;
			
			//可以重置咯
			this._snowResetFlag = false;
			
			//设置起始时间
			this._startTime = Laya.timer.currTimer;
			
			//根据屏幕面积来设定比率
			this._density =  (camera.bufferWidth * camera.bufferHeight) / (1920*1080);
			
			//总数
			let makeCount:number = 0;
			for (let j:number = 0; j < this.LEN_SETTING.length; j++) {
				if(!this.LEN_SETTING[j]) continue;
				//根据屏幕面积密度新设置数量
				this._lens[j] =Math.max(MathU.parseInt(this.LEN_SETTING[j] *this. _density),1);
				//累计数量
				makeCount += this._lens[j];
			}

			//先释放掉之前，再申请
			let capacity:number = 1;
			//防一下makeCount=0的情况，capacity=0会崩
			capacity = makeCount<=0?1:makeCount;
			//位置数组
			this._startPosVector = new Array<number>(makeCount*4);
			//位置起点
			let quadID:number=0,newX:number,newY:number;
			
			//初始化
			this.FIREDATAS.length=0;
			for (let imgId:number = 0; imgId < this.TEXTURES_SETTING.length; imgId++) 
			{
				// //选择贴图
				// _weatherImg.texture = TEXTURES_SETTING[imgId];
				// _weatherImg.readjustSize();
				
				//数量
				let count:number = this._lens[imgId];				
				for (let i:number = 0; i < count; i++) 
				{
					//随机活动x和y
					newX = MathU.randomRange(camera.bufferLeft, camera.bufferRight);
					newY = MathU.randomRange(camera.bufferTop, camera.bufferBottom);
					//保存起始位置
					this.setQuadStartPos(quadID, newX, newY, Math.random());
					// newX -= camera.bufferLeft;
					// newY -= camera.bufferTop;
					
					// newX %=  camera.bufferWidth;
					// newY %= camera.bufferHeight;
					
					// _weatherImg.x = newX;
					// _weatherImg.y = newY;
					// _weatherImg.alpha = 0.999;
					// addImage(_weatherImg, 1, null, BlendMode.NORMAL);
					
					this._turnAngel= Math.random()*360;
					this.FIREDATAS.push(
						//配置索引 源xpos 源ypos  x坐标 y坐标   弧度  暂停时间  透明度  透明度增量  缩放率  缩放率增量   初始化
						0,newX,newY,0,0,Math.random()*this.MOVEDATAS[imgId][WeatherBeetle.MS_TOTAL_RADION],0,0,0,0,0,0,
						//运行时长  重力x  重力y   速度  加速度  宽   高  角度
						0,0,0,0,0,this.TEXTURES_SETTING[imgId].width,this.TEXTURES_SETTING[imgId].height,this._turnAngel
					);
					
					quadID++;
				}
			}
		
			
			return true;
		}
		
		
		protected onUpdate(scene:SceneRoot, g: Graphics): void
		{
			let camera = scene.camera;
			//得出持续时间
			this._durationMS =Laya.timer.currTimer - this._startTime;
			let breadthTime:number = this._durationMS / 1000;
			
			//与上一帧经过的时间
			if(this._lastTime <= 0)
				this._lastTime = Laya.timer.currTimer;
			
			this._diffMs = Laya.timer.currTimer - this._lastTime ;
			if(this._diffMs < 0) this._diffMs=0;
			this._lastTime = Laya.timer.currTimer;
			
			let quadID:number=0,newX:number,newY:number;
			
			for (let imgId:number = 0; imgId < this.TEXTURES_SETTING.length; imgId++) 
			{
				//选择贴图
				let texture: Texture = this.TEXTURES_SETTING[imgId];
				
				//数量
				let count:number = this._lens[imgId];				
				for (let i:number = 0; i < count; i++) 
				{
					this._vals = this.updateFireSetting(imgId,i,quadID);
					if(!this._vals)
						continue;
					
					newX =this._vals[0]- camera.bufferLeft;
					newY =this._vals[1]- camera.bufferTop;
					//循环的作用
					newX %= camera.bufferWidth;
					newY %= camera.bufferHeight;
					
					if(newX <0) newX += camera.bufferWidth;
					if(newY <0) newY += camera.bufferHeight;
					
					//设置新位置
					newX = newX-this._vals[2]*this._vals[4]/2;
					newY = newY-this._vals[3]*this._vals[4]/2;
					let w = texture.width * this._vals[4];
					//缩放
					let h = texture.height * this._vals[4];
					
					//设置新位置,绘制点
					g.drawTexture(texture, newX, newY, w, h, null,this._vals[5]);

					quadID++;
				}
			}
		}
		
		/**
		 * @param tIdx 贴图层级所以
		 * @param imgIdx	图层内的贴图索引
		 * @return [x坐标,y坐标,贴图原始宽度,贴图原始高度,缩放百分比,透明度]
		 */		
		private updateFireSetting(tIdx:number,imgIdx:number,quadID:number):Array<any>{
			
			this._fms = this.MOVEDATAS[tIdx];
			
			//粒子数据开始位置
			let fsIdx:number =WeatherBeetle.MAX_FS_FILEDNUM*quadID;
			//粒子运动数据开始位置
			let fmsIdx:number =WeatherBeetle.MAX_MS_FILEDNUM*this.FIREDATAS[fsIdx+WeatherBeetle.FS_MSIDX];
			
			if(!this.FIREDATAS[fsIdx+WeatherBeetle.FS_ISINT]){
				this.FIREDATAS[fsIdx+WeatherBeetle.FS_SEPPED] =(this._fms[fmsIdx+WeatherBeetle.MS_TOTAL_RADION]/this._fms[fmsIdx+WeatherBeetle.MS_TOTALTIME]);
				this.FIREDATAS[fsIdx+WeatherBeetle.FS_ISINT]=1;
			}
			
			if(this.FIREDATAS[fsIdx+WeatherBeetle.FS_PASUETIME]>0){
				this.FIREDATAS[fsIdx+WeatherBeetle.FS_PASUETIME] -= this._diffMs;
				
				//暂停结束了,判断是不是有下一个运动配置，如果有的话，切换过去
				if(this.FIREDATAS[fsIdx+WeatherBeetle.FS_PASUETIME]<=0){
					
					//按顺序选择运动方式
					if(this.FIREDATAS[fsIdx+WeatherBeetle.FS_MSIDX]+1<(this.MOVEDATAS[tIdx].length/WeatherBeetle.MAX_MS_FILEDNUM)){
						this.FIREDATAS[fsIdx+WeatherBeetle.FS_MSIDX]++;
					}
					else{
						this.FIREDATAS[fsIdx+WeatherBeetle.FS_MSIDX]=0;
					}
					
					fmsIdx=WeatherBeetle.MAX_MS_FILEDNUM*this.FIREDATAS[fsIdx+WeatherBeetle.FS_MSIDX];
					
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_GRAVITYX]=0;
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_GRAVITYY]=0;
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_SEPPED]=0;
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_SPEEDACCELERATION]=0;
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_RAIDON]=0;
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_SCALE_ADD]=0;
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_ALPHA_ADD]=0;
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_ORIPOSX] =this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSX];
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_ORIPOSY]=this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSY];
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_SEPPED] =(this._fms[fmsIdx+WeatherBeetle.MS_TOTAL_RADION]/this._fms[fmsIdx+WeatherBeetle.MS_TOTALTIME]);
				}
			}
			
			
			if(this.FIREDATAS[fsIdx+WeatherBeetle.FS_PASUETIME]<=0){
				
				if(this.FIREDATAS[fsIdx+WeatherBeetle.FS_RAIDON]>=this._fms[fmsIdx+WeatherBeetle.MS_TOTAL_RADION]){
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_PASUETIME]=this._fms[fmsIdx+WeatherBeetle.MS_PASUETIME];
				}
				
				//计算速度
				this.FIREDATAS[fsIdx+WeatherBeetle.FS_SEPPED]+= this.FIREDATAS[fsIdx+WeatherBeetle.FS_SEPPED]*this._fms[fmsIdx+WeatherBeetle.MS_SPEEDACCELERATION];
				
				//先计算变化弧度
				switch(this._fms[fmsIdx+WeatherBeetle.MS_MOVETYPE]){
					
					case WeatherBeetle.MOVETYPE_CIRCLE:
						//圆周运动
						
						this.FIREDATAS[fsIdx+WeatherBeetle.FS_RAIDON]+=this.FIREDATAS[fsIdx+WeatherBeetle.FS_SEPPED]*this._diffMs;
						if(this.FIREDATAS[fsIdx+WeatherBeetle.FS_RAIDON]>this._fms[fmsIdx+WeatherBeetle.MS_TOTAL_RADION])
							this.FIREDATAS[fsIdx+WeatherBeetle.FS_RAIDON]=this._fms[fmsIdx+WeatherBeetle.MS_TOTAL_RADION];
						
						this._xSin=Math.sin(this.FIREDATAS[fsIdx+WeatherBeetle.FS_RAIDON]%(360*WeatherBeetle._1Radian));
						this._ySin=Math.cos(this.FIREDATAS[fsIdx+WeatherBeetle.FS_RAIDON]%(360*WeatherBeetle._1Radian));
						
						this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSX] =this.FIREDATAS[fsIdx+WeatherBeetle.FS_ORIPOSX]+ this._xSin*this._fms[fmsIdx+WeatherBeetle.MS_XPEAK]*this._fms[fmsIdx+WeatherBeetle.MS_DIRECTION];
						this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSY]=this.FIREDATAS[fsIdx+WeatherBeetle.FS_ORIPOSY]+(this._ySin*this._fms[fmsIdx+WeatherBeetle.MS_YPEAK]-this._fms[fmsIdx+WeatherBeetle.MS_YPEAK])*this._fms[fmsIdx+WeatherBeetle.MS_DIRECTION];
						break;
					
					case WeatherBeetle.MOVETYPE_FLEXIBLE:
						
						this.FIREDATAS[fsIdx+WeatherBeetle.FS_RAIDON]+=this.FIREDATAS[fsIdx+WeatherBeetle.FS_SEPPED]*this._diffMs;
						if(this.FIREDATAS[fsIdx+WeatherBeetle.FS_RAIDON]>this._fms[fmsIdx+WeatherBeetle.MS_TOTAL_RADION])
							this.FIREDATAS[fsIdx+WeatherBeetle.FS_RAIDON]=this._fms[fmsIdx+WeatherBeetle.MS_TOTAL_RADION];
						
						this._xSin=Math.sin(this.FIREDATAS[fsIdx+WeatherBeetle.FS_RAIDON]%this._fms[fmsIdx+WeatherBeetle.MS_TOTAL_RADION]);
						let x:number =90/WeatherBeetle.PI*this.FIREDATAS[fsIdx+WeatherBeetle.FS_RAIDON];
						
						this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSX] =this.FIREDATAS[fsIdx+WeatherBeetle.FS_ORIPOSX]+ x * this._fms[fmsIdx+WeatherBeetle.MS_DIRECTION]*this._fms[fmsIdx+WeatherBeetle.MS_XPEAK];
						this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSY]=this.FIREDATAS[fsIdx+WeatherBeetle.FS_ORIPOSY]+ this._xSin*this._fms[fmsIdx+WeatherBeetle.MS_YPEAK];
						
						break;
				}
				
				//X轴加速度
				if(this._fms[fmsIdx+WeatherBeetle.MS_GRAVITYX]!=0){
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_GRAVITYX]+=this._fms[fmsIdx+WeatherBeetle.MS_GRAVITYX];
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSX]+=this.FIREDATAS[fsIdx+WeatherBeetle.FS_GRAVITYX];
				}
				
				//Y轴加速度
				if(this._fms[fmsIdx+WeatherBeetle.MS_GRAVITYY]!=0){
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_GRAVITYY]+=this._fms[fmsIdx+WeatherBeetle.MS_GRAVITYY];
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSY]+=this.FIREDATAS[fsIdx+WeatherBeetle.FS_GRAVITYY];
				}
				
				//旋转角度
				let routeAngel:number = this.FIREDATAS[fsIdx+WeatherBeetle.FS_ROATEANGEL]+this._fms[fmsIdx+WeatherBeetle.MS_ROATEANGEL];
				if(routeAngel!=0){
					let r:number =routeAngel*WeatherBeetle._1Radian;
					let sinR:number = Math.sin(r);
					let cosR:number =Math.cos(r);
					let x1:number=this.FIREDATAS[fsIdx+WeatherBeetle.FS_ORIPOSX]+cosR*(this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSX]-this.FIREDATAS[fsIdx+WeatherBeetle.FS_ORIPOSX])-sinR*(this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSY]-this.FIREDATAS[fsIdx+WeatherBeetle.FS_ORIPOSY]);
					let y1:number=this.FIREDATAS[fsIdx+WeatherBeetle.FS_ORIPOSY]+(this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSX]-this.FIREDATAS[fsIdx+WeatherBeetle.FS_ORIPOSX])*sinR+(this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSY]-this.FIREDATAS[fsIdx+WeatherBeetle.FS_ORIPOSY])*cosR;
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSX] =x1;
					this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSY]=y1;
				}
				
				//缩放
				this.FIREDATAS[fsIdx+WeatherBeetle.FS_SCALE]=1;
				if(this._fms[fmsIdx+WeatherBeetle.MS_MINSCALE_RADION]!=this._fms[fmsIdx+WeatherBeetle.MS_MAXSCALE_RADION]){
					if(this._fms[fmsIdx+WeatherBeetle.MS_MAXSCALE_RADION]!=0||this._fms[fmsIdx+WeatherBeetle.MS_MINSCALE_RADION]!=0){
						this.FIREDATAS[fsIdx+WeatherBeetle.FS_SCALE_ADD]+=(this._fms[fmsIdx+WeatherBeetle.MS_MAXSCALE_RADION]-this._fms[fmsIdx+WeatherBeetle.MS_MINSCALE_RADION])/this._fms[fmsIdx+WeatherBeetle.MS_SCALE_CYCLETIME]*this._diffMs;
						if(this.FIREDATAS[fsIdx+WeatherBeetle.FS_SCALE_ADD]<this._fms[fmsIdx+WeatherBeetle.MS_MINSCALE_RADION]||this.FIREDATAS[fsIdx+WeatherBeetle.FS_SCALE_ADD]>this._fms[fmsIdx+WeatherBeetle.MS_MAXSCALE_RADION]){
							this.FIREDATAS[fsIdx+WeatherBeetle.FS_SCALE_ADD]=this._fms[fmsIdx+WeatherBeetle.MS_MINSCALE_RADION];
						}
						this.FIREDATAS[fsIdx+WeatherBeetle.FS_SCALE]=Math.abs(Math.sin(this.FIREDATAS[fsIdx+WeatherBeetle.FS_SCALE_ADD]));
					}
				}
				
				//透明度
				this.FIREDATAS[fsIdx+WeatherBeetle.FS_ALPHA]=1;
				if(this._fms[fmsIdx+WeatherBeetle.MS_MINALAPH_RADION]!=this._fms[fmsIdx+WeatherBeetle.MS_MAXALAPH_RADION]){
					if(this._fms[fmsIdx+WeatherBeetle.MS_MINALAPH_RADION]!=0||this._fms[fmsIdx+WeatherBeetle.MS_MAXALAPH_RADION]!=0){
						this.FIREDATAS[fsIdx+WeatherBeetle.FS_ALPHA_ADD]+=(this._fms[fmsIdx+WeatherBeetle.MS_MAXALAPH_RADION]-this._fms[fmsIdx+WeatherBeetle.MS_MINALAPH_RADION])/this._fms[fmsIdx+WeatherBeetle.MS_ALAPH_CYCLETIME]*this._diffMs;
						
						if(this.FIREDATAS[fsIdx+WeatherBeetle.FS_ALPHA_ADD]<this._fms[fmsIdx+WeatherBeetle.MS_MINALAPH_RADION]){
							this.FIREDATAS[fsIdx+WeatherBeetle.FS_ALPHA_ADD]=this._fms[fmsIdx+WeatherBeetle.MS_MINALAPH_RADION];
						}
						
						if(this.FIREDATAS[fsIdx+WeatherBeetle.FS_ALPHA_ADD]>this._fms[fmsIdx+WeatherBeetle.MS_MAXALAPH_RADION]){
							this.FIREDATAS[fsIdx+WeatherBeetle.FS_ALPHA_ADD]=
								this._fms[fmsIdx+WeatherBeetle.MS_MAXSCALE_RADION]?
								this._fms[fmsIdx+WeatherBeetle.MS_MAXALAPH_RADION]:this._fms[fmsIdx+WeatherBeetle.MS_MINALAPH_RADION];
						}
						
						this.FIREDATAS[fsIdx+WeatherBeetle.FS_ALPHA]=Math.abs(Math.sin(this.FIREDATAS[fsIdx+WeatherBeetle.FS_ALPHA_ADD]));
					}
				}
			}
			
			return [
				this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSX],
				this.FIREDATAS[fsIdx+WeatherBeetle.FS_POSY],
				this.FIREDATAS[fsIdx+WeatherBeetle.FS_WIDTH],
				this.FIREDATAS[fsIdx+WeatherBeetle.FS_HEIGHT],
				this.FIREDATAS[fsIdx+WeatherBeetle.FS_SCALE],
				this.FIREDATAS[fsIdx+WeatherBeetle.FS_ALPHA]
			];
		}
	}
}