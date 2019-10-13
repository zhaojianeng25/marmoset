module battle {
    export class ClipNum extends Laya.Sprite {
        private _clip_stack:Laya.Clip[];
        private clip_w:number;
        private clip_h:number;
        private num:number;
        constructor(private url:string, private w:number, private h:number, private clipX:number=10){
            super();
            this.clip_w = w / clipX;
            this.clip_h = h;
            this._clip_stack = [];
        }

        private getClip(index:number=0):Laya.Clip {
            let clip:Laya.Clip;
            if (this._clip_stack && this._clip_stack.length > 0) {
                clip = this._clip_stack.pop();
            } else {
                clip = new Laya.Clip(this.url, this.clipX);
                clip.size(this.clip_w, this.clip_h);
            }
            clip.index = Math.min(Math.max(0, index), this.clipX-1);
            return clip;
        }

        private recoverClip(clip:Laya.Clip):void {
            if (!clip) {
                return;
            }
            clip.removeSelf();
            this._clip_stack.push(clip);
        }

        setNum(num:number):void {
            if (this.num === num) {
                return;
            }
            this.num = num;
            if(num < 0) {
                return;
            }
            const str = num.toString();
            let len = this.numChildren;
            let new_len = str.length;
            if (len > new_len) {
                for (let i = len-1; i >= new_len; i--) {
                    const clip = this.getChildAt(i) as Laya.Clip;
                    if (clip) {
                        this.recoverClip(clip);
                    }
                }
                len = new_len;
            } else if (len < new_len) {
                for (let i = len; i < new_len; i++) {
                    const clip = this.getClip(0);
                    this.addChild(clip);
                }
            }
            let w = 0;
            for (let i = 0; i < new_len; i++) {
                const n = Number(str.charAt(i));
                const clip = this.getChildAt(i) as Laya.Clip;
                clip.index = n;
                clip.x = w;
                w+=clip.width;
            }
            this.size(w, this.h);
            if (this.parent && this.parent instanceof Laya.Sprite) {
                const root = this.parent as Laya.Sprite;
                this.pos((root.width-this.width)>>1, (root.height-this.height)>>1);
            }
        }
    }
}