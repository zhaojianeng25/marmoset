/*
* name;
*/
module game.data{
   export class MapCreature{
       /**
		 * 模板id 
		 */		
		public id:number;
		
		/**
		 * 坐标x
		 */		
		public x:number;
		
		/**
		 * 坐标y 
		 */		
		public y:number;
		
		/**
		 * 数量
		 */	
		public count:number;
		
		/**
		 * 死亡刷新时间
		 */		
		public respawnTime:number;
		
		/**
		 *刷新类型 
		 */		
		public spawnType:number;
		
		/**
		 *定时刷新时间1 
		 */		
		public spawnTime1:number;
		
		/**
		 *定时刷新时间2 
		 */		
		public spawnTime2:number;
		
		/**
		 *定时刷新时间3 
		 */		
		public spawnTime3:number;
		
		/**
		 *脚本 
		 */		
		public scriptName:String="";
		
		/**
		 *走动类型 
		 */		
		public around:number;
		
		/**
		 *线路 
		 */		
		public lineId:number=0;
		
		/**
		 *npc标识 
		 */		
		public flag:number;
		
		/**
		 *npc朝向 
		 */		
		public toward:number;
		
		/**
		 * 别名 
		 */		
		public aliasName:String="";

        constructor(){

        }

        /**
		 * 是否同一群生物
		 * @param data
		 * @return 
		 */		
		public isSimilar(data:MapCreature):Boolean{
			if(!data) return false;
			if(data.id != this.id) return false;
			if(data.count != this.count) return false;
			if(data.respawnTime != this.respawnTime) return false;
			if(data.spawnType != this.spawnType) return false;
			if(data.spawnTime1 != this.spawnTime1) return false;
			if(data.spawnTime2 != this.spawnTime2) return false;
			if(data.spawnTime3 != this.spawnTime3) return false;
			if(data.scriptName != this.scriptName) return false;
			if(data.around != this.around) return false;
			if(data.lineId != this.lineId) return false;
			if(data.flag != this.flag) return false;
			if(data.toward != this.toward) return false;
			if(data.aliasName != this.aliasName) return false;
			return true;
		}
		/**
		 * 复制
		 * @param data
		 * @return 
		 */		
		public copy(data:MapCreature):void{
			if(!data) return;
			data.id = this.id;
			data.count = this.count;
			data.respawnTime = this.respawnTime;
			data.spawnType = this.spawnType;
			data.spawnTime1 = this.spawnTime1;
			data.spawnTime2 = this.spawnTime2;
			data.spawnTime3 = this.spawnTime3;
			data.scriptName = this.scriptName;
			data.around = this.around;
			data.lineId = this.lineId;
			data.flag = this.flag;
			data.toward = this.toward;
			data.aliasName = this.aliasName;
		}
    }
}