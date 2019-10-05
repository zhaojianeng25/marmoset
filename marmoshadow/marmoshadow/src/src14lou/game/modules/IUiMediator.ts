/**
* name 
*/
module game.modules{
	export interface IUiMediator{
		show():void;
		hide():void;
		swap():void;
		flushData():void;
		getView():Sprite;
		isShow():Boolean;
	}
}