/**
* 自适应黑底
*/
module game {
    export class BlackBorder extends game.gui.base.Container {
        // private 
        constructor(app: GameApp) {
            super(app);
        }

        update(diff: number): void {

        }

        resize(w: number, h: number): void {
            super.resize(w, h);
            if (!main) return;
     
            const cl = ColorU.COLOR_BLACK;

            let borderWidth = (w - main.widthDesginPixelw) / 2;
            let borderHeight = (h - main.heightDesginPixelw) / 2;
            this.graphics.clear();
            if(borderWidth){
                this.graphics.drawRect(0, 0, borderWidth, main.heightDesginPixelw, cl);
                this.graphics.drawRect(w - borderWidth, 0, w, h, cl);
            }
            if(borderHeight){
                this.graphics.drawRect(0, 0, w, borderHeight, cl);
                this.graphics.drawRect(0, h - borderHeight, w, h, cl);
            }
        }
    }
}