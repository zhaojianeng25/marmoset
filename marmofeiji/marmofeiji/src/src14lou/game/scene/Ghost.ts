/**
* name 
*/
module game.scene{
	export class Ghost{	
		// 采集频率，单位/ms 采集一次 
		private _copyRate:number;
		// 残影的数量 	
		private _copyCount:number;
		// 最低的透明度
		private _alphaMAX:number;
		// 最高透明度 
		private _alphaMIN:number;
		// 透明度步伐 	
		private _alphaStep:number;

		/**
		 * 调色板 
		 */		
		// protected static CTF:ColorTransform = new ColorTransform();	
		
		private cacheBitmap:Texture[] = [];
		private cacheMix:Matrix[] = [];
		private cacheX:number[] = [];
		private cacheY:number[] = [];
		private cacheAlpha:number[] = [];
		/*启动时间*/
		private _lastCpyTime:number;
		
		private _camera:Camera;

		constructor(camera:Camera){
			this._camera = camera;
		}

		/**
		 * 默认设置残影 
		 * @param copyRate 采集频率
		 * @param copyCount 残影数量
		 * @param alphaMAX 最高透明度
		 * @param alphaMIN 最低透明度
		 * 
		 */			
		setting(copyRate:number = 50, copyCount:number = 10, alphaMAX:number = 0.6, alphaMIN:number = 0.2):void{
			this._copyRate = copyRate;
			this._copyCount = copyCount;
			this._alphaMAX = alphaMAX;
			this._alphaMIN = alphaMIN;
			this._alphaStep = (this._alphaMAX - this._alphaMIN) / this._copyCount;
		}
	
		// 输入 
		input(dx:number,dy:number, inBitmapData:Texture, matrix:Matrix, drawAlpha:number):void{
			let cur_time:number = Laya.timer.currTimer;
			if((cur_time - this._lastCpyTime) < this._copyRate)
				return;
			// if(dx == this.cacheX[this.cacheX.length - 1] && dy == this.cacheY[this.cacheY.length - 1]){
			// 	return;
			// }
			//记录一下最有一次复制时间
			this._lastCpyTime = cur_time;
			this.cacheBitmap.push(inBitmapData);
			this.cacheMix.push(matrix);
			this.cacheX.push(dx);
			this.cacheY.push(dy);
			this.cacheAlpha.push(drawAlpha);
			//如果大于残影数量，则移除末尾
			if(this.cacheBitmap.length > this._copyCount){
				//释放
				this.cacheBitmap.shift();
				this.cacheMix.shift();
				this.cacheX.shift();
				this.cacheY.shift();
			}
		}
		
		// 输出 
		output(g:Graphics):void{
			let len:number = this.cacheBitmap.length;
			for(let i = 0; i < len; i ++){
				let dx:number = this._camera.getScenePxByCellX(this.cacheX[i]);
				let dy:number = this._camera.getScenePxByCellY(this.cacheY[i]);
				let tt:Texture = this.cacheBitmap[i];
				let mix:Matrix
				if(this.cacheMix[i]){
				 	mix = this.cacheMix[i].clone();
					mix.tx += dx * 2;
				}
				let alpla = (this._alphaMIN + this._alphaStep * (this._copyCount-i)) * this.cacheAlpha[i];
				g.drawTexture(tt, dx, dy, tt.width, tt.height, mix, alpla);
			}
		}
		
		// 释放
		free():void{
			this.cacheBitmap.length = 0;
			this._lastCpyTime = 0;
			this.cacheBitmap.length = 0;
			this.cacheMix.length = 0;
			this.cacheX.length = 0;
			this.cacheY.length = 0;
			this._camera = null;
		}
	}
}