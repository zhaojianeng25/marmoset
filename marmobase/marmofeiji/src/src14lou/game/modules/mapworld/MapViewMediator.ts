/**
* name 
*/
import MapModel = game.modules.mapworld.models.MapModel;
module game.modules.mapworld {
	export class MapViewMediator extends game.modules.UiMediator {
		//private _viewUI:ui.common.MapWorldUI;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.isCenter = true;
		}
		public show(): void {
			super.show();
		}
		public hide(): void {
			super.hide();
		}
	}
}