/**
* name 
*/
module game.utils{
	//32朝向
	const kTowardCount = 360;
	//极小值
	const EPSINON = 0.000001;

	export class Vector2{
		public static zero:Vector2 = new Vector2(0,0);

		static temp:Vector2 = new Vector2(0,0);
		x:number;
		y:number;

		constructor(x?:number, y?:number){
			this.x = x ? x : 0;
			this.y = y ? y : 0;
		}

		/**
		 * len 设置向量长量
		 */
		public set len(newl:number) {
			this.normalize();
			this.mul(newl);
		}

		/**
		 * len 取得向量长量
		 */
		public get len():number {
			let x:number = this.x, y:number = this.y;
			return Math.sqrt(x * x + y * y);
		}

		/**
		 * normalizeInplace 向量单位化
		 */
		public normalize() {			
			let l:number = this.len;
			if (l > 0){
				this.x = this.x / l, this.y = this.y / l;
			}
			return this;
		}

		/**
		 * equal 两个向量是否相等
		 */
		public equal(b:Vector2):boolean{
			let diff_x:number = (this.x > b.x) ? (this.x - b.x) : (b.x - this.x);
			let diff_y:number = (this.y > b.y) ? (this.y - b.y) : (b.y - this.y);
			return diff_y < EPSINON && diff_x < EPSINON;
		}

		/**
		 * dist 取得两个向量距离
		 */
		public dist(other:Vector2) {
			let x:number = this.x - other.x;
			let y:number = this.y - other.y;
			return Math.sqrt((x * x) + (y * y));
		}

		/**
		 * add 向量相加
		 */
		public add(other:Vector2) {
			let x:number = this.x + other.x;
			let y:number = this.y + other.y;
			this.x = x, this.y = y;
			return this;
		}

		/**
		 * sub 向量相减
		 */
		public sub(other:Vector2) {
			let x:number = this.x - other.x;
			let y:number = this.y - other.y;
			this.x = x, this.y = y;
			return this;
		}

		private static vec2:Vector2 = new Vector2();

		public static sub(r:Vector2, a:Vector2, b:Vector2){
			let x:number = a.x - b.x;
			let y:number = a.y - b.y;
			if(!r)
				r = Vector2.vec2;
			
			r.x = x, r.y = y;
			return r;
		}

		/**
		 * mul 向量乘以标量
		 */
		public mul(l:number) {
			this.x = this.x * l;
			this.y = this.y * l;
			return this;			
		}

		public set(other:Vector2) {
			this.x = other.x;
			this.y = other.y;
		}

		/**
		 * lerp 计算插值
		 */
		public lerp(P1:Vector2, t:number) {
			let _t = 1 - t
			this.x = this.x * _t + P1.x * t
			this.y = this.y * _t + P1.y * t
			return this;
		}
		
		public fromToward(toward:number, towardCount?:number){
			if(!towardCount) {
				towardCount = kTowardCount;
			}
			
			let radian:number = 2 * Math.PI * toward / towardCount;
			let x:number = Math.cos(radian);
			let y:number =  Math.sin(radian);
			this.x = x, this.y = y;
			this.normalize();
			return this;
		}

		public getToward( towardCount?:number):number {
			if(!towardCount) {
				towardCount = kTowardCount;
			}
			var x:number = this.x, y:number = this.y;
			let o:number = Math.atan2(y, x);
			if (o < 0){
				o = o + (Math.PI * 2);
			}
			let num:number = o / (2 * Math.PI / towardCount);
			// --4舍5入
			let toward = Math.floor(num + 0.5);
			// --当他等于32的时候应该要转成0
			return toward == towardCount ? 0 : toward;
		}

		/**
		 * 复制
		 */
		public clone():Vector2{
			return new Vector2(this.x, this.y);
		}
	}
}
