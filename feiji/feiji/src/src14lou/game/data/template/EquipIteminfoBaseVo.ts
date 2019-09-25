/**
* name 
*/
module game.data.template {
	export class EquipIteminfoBaseVo {
		public id: number //装备属性编号 id              
		public shuxing1id: number //属性1ID 
		public shuxing1bodongduanmin: Array<number> //属性1波动段1min,属性1波动段2min,属性1波动段3min,属性1波动段4min,属性1波动段5min
		public shuxing1bodongduanmax: Array<number> //属性1波动段1max,属性1波动段2max,属性1波动段3max,属性1波动段4max,属性1波动段5max
		public shuxing1bodongquanzhong: Array<number> //属性1波动段1权重,属性1波动段2权重,属性1波动段3权重,属性1波动段4权重,属性1波动段5权重			
		public shuxing2id: number //属性2ID
		public shuxing2bodongduanmin: Array<number> //属性2波动段1min,属性2波动段2min,属性2波动段3min,属性2波动段4min,属性2波动段5min
		public shuxing2bodongduanmax: Array<number> //属性2波动段1max,属性2波动段2max,属性2波动段3max,属性2波动段4max,属性2波动段5max
		public shuxing2bodongquanzhong: Array<number> //属性2波动段1权重,属性2波动段2权重,属性2波动段3权重,属性2波动段4权重,属性2波动段5权重
		public shuxing3id: number //属性3ID
		public shuxing3bodongduanmin: Array<number> //属性3波动段1min,属性3波动段2min,属性3波动段3min,属性3波动段4min,属性3波动段5min
		public shuxing3bodongduanmax: Array<number> //属性3波动段1max,属性3波动段2max,属性3波动段3max,属性3波动段4max,属性3波动段5max
		public shuxing3bodongquanzhong: Array<number> //属性3波动段1权重,属性3波动段2权重,属性3波动段3权重,属性3波动段4权重,属性3波动段5权重
		constructor() {

		}
		public parse(data: Byte) {
			this.id = data.getUint32(); //装备属性编号 id              
			this.shuxing1id = data.getUint32(); //属性1ID 
			let shuxing1bodongduanminLength = data.getUint32();
			this.shuxing1bodongduanmin = []; //属性1波动段1min,属性1波动段2min,属性1波动段3min,属性1波动段4min,属性1波动段5min
			for (var index = 0; index < shuxing1bodongduanminLength; index++) {
				this.shuxing1bodongduanmin.push(data.getUint32());
			}
			let shuxing1bodongduanmaxLength = data.getUint32();
			this.shuxing1bodongduanmax = []; //属性1波动段1max,属性1波动段2max,属性1波动段3max,属性1波动段4max,属性1波动段5max
			for (var index = 0; index < shuxing1bodongduanmaxLength; index++) {
				this.shuxing1bodongduanmax.push(data.getUint32());
			}
			let shuxing1bodongquanzhongLength = data.getUint32();
			this.shuxing1bodongquanzhong = []; //属性1波动段1权重,属性1波动段2权重,属性1波动段3权重,属性1波动段4权重,属性1波动段5权重	
			for (var index = 0; index < shuxing1bodongquanzhongLength; index++) {
				this.shuxing1bodongquanzhong.push(data.getUint32());
			}
			this.shuxing2id = data.getUint32(); //属性2ID
			let shuxing2bodongduanminLength = data.getUint32();
			this.shuxing2bodongduanmin = []; //属性2波动段1min,属性2波动段2min,属性2波动段3min,属性2波动段4min,属性2波动段5min
			for (var index = 0; index < shuxing2bodongduanminLength; index++) {
				this.shuxing2bodongduanmin.push(data.getUint32());
			}
			let shuxing2bodongduanmaxLength = data.getUint32();
			this.shuxing2bodongduanmax = []; //属性2波动段1max,属性2波动段2max,属性2波动段3max,属性2波动段4max,属性2波动段5max
			for (var index = 0; index < shuxing2bodongduanmaxLength; index++) {
				this.shuxing2bodongduanmax.push(data.getUint32());
			}
			let shuxing2bodongquanzhongLength = data.getUint32();
			this.shuxing2bodongquanzhong = []; //属性2波动段1权重,属性2波动段2权重,属性2波动段3权重,属性2波动段4权重,属性2波动段5权重
			for (var index = 0; index < shuxing2bodongquanzhongLength; index++) {
				this.shuxing2bodongquanzhong.push(data.getUint32());
			}
			this.shuxing3id = data.getUint32(); //属性3ID
			let shuxing3bodongduanminLength = data.getUint32();
			this.shuxing3bodongduanmin = []; //属性3波动段1min,属性3波动段2min,属性3波动段3min,属性3波动段4min,属性3波动段5min
			for (var index = 0; index < shuxing3bodongduanminLength; index++) {
				this.shuxing3bodongduanmin.push(data.getUint32());
			}
			let shuxing3bodongduanmaxLength = data.getUint32();
			this.shuxing3bodongduanmax = []; //属性3波动段1max,属性3波动段2max,属性3波动段3max,属性3波动段4max,属性3波动段5max
			for (var index = 0; index < shuxing3bodongduanmaxLength; index++) {
				this.shuxing3bodongduanmax.push(data.getUint32());
			}
			let shuxing3bodongquanzhongLength = data.getUint32();
			this.shuxing3bodongquanzhong = []; //属性3波动段1权重,属性3波动段2权重,属性3波动段3权重,属性3波动段4权重,属性3波动段5权重
			for (var index = 0; index < shuxing3bodongquanzhongLength; index++) {
				this.shuxing3bodongquanzhong.push(data.getUint32());
			}
		}
	}
}