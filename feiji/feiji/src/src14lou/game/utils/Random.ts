/**
* 随机类
*/
module game.utils{
	export class Random{
		private static _instance:Random;
		private static get instance():Random{
			if(!this._instance){
				this._instance = new Random(0);
			}
			return this._instance;
		}

		// 重置随机种子
		static scand(v:number):void{
			this.instance.scand(v);
		}

		// 随机1个整数
		static rand():number{
			return this.instance.rand();
		}

		// 随机一个0-1之间的浮点数
		static randFloat():number{
			return this.instance.randFloat();
		}

		// 随机给定范围[a,b]的整数
		static randInt(a:number, b:number):number{
			return this.instance.randInt(a, b);
		}		

		// 随机因子
		private seed = 0;
		private m = Math.pow(2,32);
		private a = 1664525;
		private c = 1013904223;

		constructor(seed){
			this.seed = seed;
		}

		// 重置随机种子
		scand(v:number):void{
			this.seed =  MathU.parseInt(v);
		}

		// 随机1个整数
		rand():number{
			this.seed = (this.seed * this.a + this.c)%this.m;
			return this.seed;
		}

		// 随机一个0-1之间的浮点数
		randFloat():number{
			return this.rand()/(this.m+1)
		}
	
		// 随机给定范围[a,b]的整数
		randInt(a:number, b:number):number{
			a = MathU.parseInt(a);
			b = MathU.parseInt(b);
			return Math.min(a, b) + MathU.parseInt((Math.abs(a - b) + 1) * this.randFloat());
		}		
	}
}