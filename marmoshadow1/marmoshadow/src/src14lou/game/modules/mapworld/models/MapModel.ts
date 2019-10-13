/**
* 世界地图 
*/
module game.modules.mapworld.models {
	export class MapModel {
		/**世界地图*/
		public WorldMapConfigData: Object = {};
		/**地图配置*/
		public MapConfigData: Object = {};
		constructor() {
			MapModel._instance = this;
		}
		private static _instance: MapModel;
		public static getInstance(): MapModel {
			if (!this._instance) {
				this._instance = new MapModel();
			}
			return this._instance;
		}
	}
}