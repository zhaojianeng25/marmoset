/**
* 水层数据
*/
module game.data{
	export class MapWater{

		public name:string;
		
		public x:number;
		public y:number;
		public width:number = 512;
		public height:number=  512;
		
		/**
		 * 位于底层 
		 */		
		public atBottom:Boolean = true;
		
		//浪高,默认200，可选(0-255)
		public waveHeight:number = 200;
		//波长,默认256，可选(64,128,256,512,1024)
		public waveLength:number = 64;
		//震幅，默认6，可选(0-10)
		public waveBreadth:number = 5;
		//水流方向，默认由上至下，可选(4个方向)
		public streamDirect:number = 0;//WaterWavesFilter.DIRECT_UP_TO_DOWN;
		//流水速度 1原速度，1以下减速，1以上加速
		public streamSpeed:number = 1;
		
		constructor(){

		}
	}
}