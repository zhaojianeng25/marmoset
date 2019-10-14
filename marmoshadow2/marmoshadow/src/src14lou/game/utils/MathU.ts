/**
* name 
*/
module game.utils {
	export class MathU {

		//最大朝向
		public static kTowardCount: number = 8;

		constructor() {

		}

		/**
		 * 随机指定范围的值
		 * @param	min 最小值
		 * @param	max 最大值
		 */
		public static randomRange(min: number, max: number): number {
			var range: number = Math.floor((max - min + 1) * Math.random());
			return range + min;
		}

		/**
		 * 在一个圆的范围内随机坐标点
		 * @param  centerPoint 圆心点
		 * @param  radiusMin   随机半径最小值
		 * @param  radiusMax   随机半径最大值
		 */
		public static randomPointInCicle(centerPoint: Point, radiusMin: number, radiusMax: number): Point {
			//获得随机半径
			let randomRad = MathU.randomRange(radiusMin, radiusMax);
			//获得随机角度
			let randomAngle = Math.random() * 360;
			let resultPoint = new Point();
			resultPoint.x = centerPoint.x + Math.sin(randomAngle * Math.PI / 180) * randomRad;
			resultPoint.y = centerPoint.y + Math.cos(randomAngle * Math.PI / 180) * randomRad;
			return resultPoint;
		}

		//整型转换
		public static parseInt(v: number): number {
			if (v >= 0) {
				return Math.floor(v);
			} else {
				return Math.ceil(v);
			}
		}

		private static _byteArray;
		// Number转int
		static toInt(v: number): number {
			if (!this._byteArray) {
				this._byteArray = new ByteArray();
			}
			this._byteArray.position = 0;
			this._byteArray.writeInt(v);
			this._byteArray.position = 0;
			return this._byteArray.readInt();
		}

		/**
		 * 获得两点之间的距离 
		 * @param srcX 来源x
		 * @param srcY 来源y
		 * @param dstX 目标x
		 * @param dstY 目标y
		 * @return 
		 * 
		 */
		public static getDistance(srcX: number, srcY: number, dstX: number, dstY: number): number {
			var x: number = srcX - dstX;
			var y: number = srcY - dstY;
			return Math.sqrt(x * x + y * y);
		}

		/**
		 * 通过制定的时长毫秒长度，获得旋转的圈角度 
		 * @param duration 时长 多少毫秒转一圈
		 * @return 
		 * 
		 */
		public static getAngleTimeT(duration: number): number {
			return Number((Laya.timer.currTimer % duration) / duration) * Math.PI;
		}

		/**
		 * 通过旋转角度获得2PI的弧度 
		 * @param rotation
		 * @return 
		 * 
		 */
		public static getAngleByRotaion(rotation: number): number {
			rotation %= rotation;
			return Math.PI * Number(rotation / 180);
		}

		/**
		 * 获得两点之间的弧度 
		 * @param srcX
		 * @param srcY
		 * @param dstX
		 * @param dstY
		 * @return 
		 * 
		 */
		public static getAngle(srcX: number, srcY: number, dstX: number, dstY: number): number {
			dstX -= srcX;
			dstY -= srcY;

			var ang: number = Math.atan2(dstY, dstX);
			ang = (ang >= 0) ? ang : 2 * Math.PI + ang;
			return ang;
		}

		/**
		 * 通过弧度方向获得旋转角度0-360 
		 * @param angle 弧度
		 * @return 
		 * 
		 */
		public static getRotation(angle: number): number {
			return Math.round(Number(angle / Math.PI) * 180);
		}

		/**
		 * 返回一个随机布尔值
		 * @return
		 */
		public static randomBoolen(): Boolean {
			return Math.round(Math.random()) == 0;
		}

		/**
		 * 颜色滤镜之对比度调整
		 */
		public static colorMatrix_adjust(contrast: number, brightness: number): Array<number> {
			let s: number = contrast + 1;
			let o: number = 128 * (1 - s);

			let aMatrix: Array<number> =
				[s, 0, 0, 0, o,
					0, s, 0, 0, o,
					0, 0, s, 0, o,
					0, 0, 0, 1, 0];

			brightness *= 255;
			let bMatrix: Array<number> =
				[1, 0, 0, 0, brightness,
					0, 1, 0, 0, brightness,
					0, 0, 1, 0, brightness,
					0, 0, 0, 1, 0];
			return MathU.colorMatrix_concat(aMatrix, bMatrix);
		}

		public static colorMatrix_concat(matrixa: Array<number>, matrixb: Array<number>): Array<number> {
			let sMatrix: Array<number> = new Array<number>(20);
			var i: number = 0;
			for (var y: number = 0; y < 4; ++y) {
				for (var x: number = 0; x < 5; ++x) {
					sMatrix[i + x] = matrixa[i] * matrixb[x] +
						matrixa[i + 1] * matrixb[x + 5] +
						matrixa[i + 2] * matrixb[x + 10] +
						matrixa[i + 3] * matrixb[x + 15] +
						(x == 4 ? matrixa[i + 4] : 0);
				}

				i += 5;
			}
			return sMatrix;
		}

		// 10进制转16进制
		static toHex(num:number):String{
			let rs = "";
			let temp;
		　　while(num/16 > 0){
		　　　　temp = num%16;
		　　　　rs = (temp+"").replace("10","a").replace("11","b").replace("12","c").replace("13","d").replace("14","e").replace("15","f") + rs;
		　　　　num = Math.floor(num/16);
		　　}
		　　return rs;
		}
	}
}