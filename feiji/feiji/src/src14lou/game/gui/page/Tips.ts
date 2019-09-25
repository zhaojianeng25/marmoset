module game.gui.page {
    /**
     * 飘字提示
     */
    export class Tips extends game.gui.base.Page {
        constructor(app: AppBase, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._asset = [
            ];
        }

        // 页面初始化函数
        protected init(): void {
            // this._view = new ui.common.Tips_1UI();
            this.addChild(this._view);
        }

        private _tween:Laya.Tween;
        //提示的信息
        public setText(message: string): void {
            // TextFieldU.setHtmlEmName(this._view.txt_desc,message);
            // this._view.txt_desc.text = message;
            if(!this._tween)this._tween = new Laya.Tween();
            this._tween.clear();
            // this._view.alpha = 1;
            // this._tween.to(this._view,{alpha:0},2000,null,Handler.create(this,this.close));
        }

        // 页面打开时执行函数
        protected onOpen(): void {
            super.onOpen();
        }
        public close():void{
            this._tween.clear();
            this._tween = null;
            // if(this._view)
            //   TextFieldU.setHtmlEmName(this._view.txt_desc,null);
            super.close();
        }
    }
}