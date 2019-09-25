/**
* 位图切片生成工具
*/
module game.gui.component {
    export class ClipUtil extends Laya.Box {
        //战斗力字体
        public static FORCE_FONT: any;
        //VIP字体
        public static VIP_FONT: any;

        //当前选中的字体
        private _curFont: any;
        //clip组件集合
        private _clipArray: Laya.Clip[];
        //滚数字停止集合
        private _stopArray: boolean[];
        //前置图片
        public _preImage: LImage;
        //后置图片
        public _postImage: LImage;

        static init(): void {

            this.FORCE_FONT = {
                source: Path.atlas_ui + "tongyong.atlas",
                url: Path.ui + 'tongyong/clip_1.png',
                clipWidth: null,
                clipX: 10,
                space: -18
            };

            this.VIP_FONT = {
                source: Path.atlas_ui + "hud.atlas",
                url: Path.ui + 'hud/clip_2.png',
                clipWidth: null,
                clipX: 10,
                space: -9
            };

        }

        constructor(font: any) {
            super();
            this.setFont(font);
            this._stopArray = [];
            this._clipArray = [];
        }

        public setFont(font: any): void {
            if (this._curFont == font) return;
            this._curFont = font;
            if (font.source) {
                let refTexture = RefAsset.Get(font.source);
                refTexture.retain();
            }
            if (this._clipArray) {
                for (let clip of this._clipArray) {
                    clip.destroy(true);
                }
                this._clipArray = [];
            }
        }

        //设置
        public setText(str: string, needZero: boolean = false, isTween: boolean = false, preSkin: string = null, postSkin: string = null): void {
            if (!this._curFont) {
                loge("Font not found!");
            }

            let refTexture = RefAsset.Get(this._curFont.source);
            if (!refTexture.parseComplete) {
                refTexture.once(LEvent.COMPLETE, this, (str: string, needZero: boolean = false, isTween: boolean = false, preSkin: string = null, postSkin: string = null) => {
                    this.onAssetParseComplete(str, needZero, isTween, preSkin, postSkin);
                }, [str, needZero, isTween, preSkin, postSkin]);
            }
            else {
                this.onAssetParseComplete(str, needZero, isTween, preSkin, postSkin);
            }
        }

        private onAssetParseComplete(str: string, needZero: boolean = false, isTween: boolean = false, preSkin: string = null, postSkin: string = null): void {
            let posX = 0;
            //前置图片
            if (preSkin) {
                if (!this._preImage) {
                    this._preImage = new LImage();
                    this.addChild(this._preImage);
                }
                this._preImage.skin = preSkin;
                this._preImage.pos(posX, 0);
                posX += this._preImage.width + this._curFont.space;
            } else {
                if (this._preImage) {
                    this._preImage.destroy();
                    this._preImage = null;
                }
            }
            //清理
            for (let clip of this._clipArray) {
                clip.removeSelf();
            }
            if (str && (((!needZero && str > "0") || needZero))) {
                this.visible = true;
                for (let i = 0; i < str.length; i++) {
                    if (!this._clipArray[i]) {
                        let index = parseInt(str.charAt(i));
                        let clip = this.createClip(index);
                        this.addChild(clip);
                        clip.x = posX;
                        clip.y = 0;
                        this._clipArray.push(clip);
                    } else {
                        this._clipArray[i].index = parseInt(str.charAt(i));
                        if (!this._clipArray[i].parent)
                            this.addChild(this._clipArray[i]);
                        this._clipArray[i].x = posX;
                        this._clipArray[i].y = 0;
                    }
                    posX += this._clipArray[i].width + this._curFont.space;
                }
            } else {
                this.visible = false;
            }

            //后置图片
            if (postSkin) {
                if (!this._postImage) {
                    this._postImage = new LImage();
                    this.addChild(this._postImage);
                }
                this._postImage.skin = postSkin;
                this._postImage.pos(posX, 0);
            } else {
                if (this._postImage) {
                    this._postImage.destroy();
                    this._postImage = null;
                }
            }

            //需要播放滚动特效
            if (isTween) {
                this.playTween(str);
            }
        }

        //滚数字表现
        public playTween(numStr: string): void {
            Laya.timer.frameLoop(1, this, this.showTween, [parseInt(numStr)]);
            for (let i = 0; i < numStr.length; i++) {
                if (this._stopArray[i]) {
                    this._stopArray[i] = false;
                } else {
                    this._stopArray.push(false);
                }
                Laya.timer.once(500 + 500 * i, this, () => {
                    this.stopTween(i);
                });
            }
        }

        //停止滚数字
        private stopTween(index: number): void {
            this._stopArray[index] = true;
        }

        private showTween(num: number): void {
            let numStr = num.toString();
            for (let i = 0; i < numStr.length; i++) {
                let child = this.getChildAt(i) as laya.ui.Clip;
                let index = child.index;
                index++;
                if (child) {
                    if (this._stopArray[i]) {
                        child.index = parseInt(numStr[i]);
                        if (i >= numStr.length - 1)
                            Laya.timer.clearAll(this);
                    } else {
                        child.index = index % 10;
                    }
                }
            }
        }

        //创建位图切片
        private createClip(index: number): laya.ui.Clip {
            let clip = new laya.ui.Clip(this._curFont.url);
            clip.clipWidth = this._curFont.clipWidth;
            clip.clipX = this._curFont.clipX;
            clip.index = index;
            this.addChild(clip);
            return clip;
        }

        //释放
        destroy(destroyChild?: boolean): void {
            Laya.timer.clearAll(this);
            if (this._curFont.source) {
                let refTexture = RefAsset.Get(this._curFont.source);
                refTexture.release();
                this._curFont = null
            }
            if (this._clipArray) {
                for (let clip of this._clipArray) {
                    clip.destroy(true);
                }
                this._clipArray = null;
            }
            if (this._preImage) {
                this._preImage.destroy(true);
                this._preImage = null;
            }
            if (this._postImage) {
                this._postImage.destroy(true);
                this._postImage = null;
            }
            super.destroy(destroyChild);
        }

    }
}