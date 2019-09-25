/**
* name 
*/
module game.modules.mapworld.models {
	export const LOGIN_EVENT: string = "loginEvent";
	export class MapProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			MapProxy._instance = this;
			this.init();
		}
		private static _instance: MapProxy;
		public static getInstance(): MapProxy {
			if (!this._instance) {
				this._instance = new MapProxy();
			}
			return this._instance;
		}

		public init(): void {
			LoginModel.getInstance();
			this.addNetworkListener();
			
			Laya.loader.load("common/data/temp/map.cworldmapconfig.bin", Handler.create(this, this.onloadedWorldMapConfigBaseVoComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/map.cmapconfig.bin", Handler.create(this, this.onloadedMapConfigBaseVoComplete), null, Loader.BUFFER);
		}
		private onloadedMapConfigBaseVoComplete(): void {
			console.log("cmapconfig 表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/map.cmapconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, MapModel.getInstance().MapConfigData, game.data.template.MapConfigBaseVo, "id");
			// console.log("cmapconfig.configData:",this.MapConfigData);
		}

		onloadedWorldMapConfigBaseVoComplete(): void {
			console.log("cworldmapconfig 表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/map.cworldmapconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, MapModel.getInstance().WorldMapConfigData, game.data.template.WorldMapConfigBaseVo, "id");
			// console.log("cworldmapconfig.configData:",this.WorldMapConfigData);
		}
		// 添加监听
		private addNetworkListener(): void {
			Network._instance.addHanlder(ProtocolsEnum.SRoleList, this, this.onRoleList);
		}

		// 移除监听
		private removeNetworkListener(): void {
			Network._instance.removeHanlder(ProtocolsEnum.SRoleList, this, this.onRoleList);
		}
		// 角色列表返回
		private onRoleList(optcode: number, msg: hanlder.S2C_SRoleList): void {
			console.log("onRoleList", optcode, msg);
			console.log("onRoleList", msg.prevLoginRoleid);
			console.log("onRoleList", msg.prevRoleInBattle);
			console.log("onRoleList", msg.roles);
			console.log("onRoleList", msg.gacdon);
		}



	}
}