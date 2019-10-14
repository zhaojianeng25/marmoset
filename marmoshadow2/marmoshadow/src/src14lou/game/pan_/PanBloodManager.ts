module pan {
    import ArtFont = Pan3d.ArtFont;

    import UIRectangle = Pan3d.UIRectangle;
    import UIManager = Pan3d.UIManager;
    import UiDraw = Pan3d.UiDraw;
    import UIData = Pan3d.UIData;
    import AlphaUiContianer = Pan3d.AlphaUiContianer;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;

    import Rectangle = Pan3d.Rectangle;
    import TextureManager = Pan3d.TextureManager;
	import BloodManager = Pan3d.BloodManager;

    export class PanBloodManager extends BloodManager {
        public static getInstance(): PanBloodManager {
            if (!BloodManager._instance) BloodManager._instance = new PanBloodManager();
            return <PanBloodManager>BloodManager._instance;
        }
        private _jumpText256_256: AlphaUiContianer;
        constructor() {
            super()
            //飘字层级调整
            let count:number = 0;
            let item:any;
            for (var i: number = 0; i < this.uiContianerItem.length-count; i++) {
                if(this.uiContianerItem[i] instanceof AlphaUiContianer){
                    item = this.uiContianerItem[i];
                    this.uiContianerItem.splice(i,1);
                    this.uiContianerItem.push(item);
                    count++;
                    i--;
                }
            }
            //添加大飘字
            this._jumpText256_256 = new AlphaUiContianer(TextJumpUiDrawAndRefreash256, new Rectangle(0, 0, 256, 256), 2);
            this.uiContianerItem.push(this._jumpText256_256);
        }
        public setExpJump256_256Num($textJumpUiVo: Pan3d.TextJumpUiVo): void {
            this._jumpText256_256.showTemp($textJumpUiVo);
        }
    }

    export class TextJumpUiDrawAndRefreash256 extends Pan3d.TextJumpUiDrawAndRefreash {
        protected drawTxtBydigitalAndtext($vo: Pan3d.TextJumpUiVo): number {
            var rec: Pan3d.UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 92;
            var $height = 50;
            var $offsetX = 0;
            var $offsetY = 0;
            var txtcolor: string;
            if ($vo.type == Pan3d.TextJumpType.ATTACKREDUCE) {
                picid = Pan3d.TextJumpType.ATTACKADD;
                txtcolor = Pan3d.ArtFont.num53;
            } else if ($vo.type == Pan3d.TextJumpType.ATTACKADD) {
                txtcolor = Pan3d.ArtFont.num54;
            } else if ($vo.type == Pan3d.TextJumpType.EXPERIENCE) {
                txtcolor = Pan3d.ArtFont.num54;
            // } else if ($vo.type == Pan3d.TextJumpType.CRIT) {
            //     txtcolor = Pan3d.ArtFont.num55;
            //     $width = 215;
            //     $height = 128;
            //     $offsetX = -95;
            //     $offsetY = 50;
            // } else if ($vo.type == Pan3d.TextJumpType.CRITUP) {
            //     picid -= 10;
            //     txtcolor = Pan3d.ArtFont.num55;
            //     $width = 215;
            //     $height = 128;
            //     $offsetX = -95;
            //     $offsetY = 50;
            // }
            var distion = Pan3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            distion += $width;
            Pan3d.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new Pan3d.Rectangle(rec.pixelWitdh - distion - $offsetX, rec.pixelHeight - $height, $width, $height), Pan3d.UIData.publicUi);
            Pan3d.ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, rec.pixelWitdh - distion + $width + 2, rec.pixelHeight - $height + $offsetY, BloodMgrDef.TEXT_INTERVAL);
            Pan3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            return distion;
        }
    }
    }

    /**3D场景贴图配置：血条、飘字*/
    export class BloodMgrDef{
        /**飘字数字间隔*/
        public static TEXT_INTERVAL:number = 5;
        /**飘字动画更新*/
        public static changeRules(textJump:Disp2DBaseText, vo:Pan3d.TextJumpUiVo, time:number):void{
            var v2d = textJump.Vector3DToVector2D(new Pan3d.Vector3D(vo.pos.x, vo.pos.y, vo.pos.z));
            var info:number[] = [1,130,-115,256,50];//scale、x、y、width、height
            // if(vo.type == Pan3d.TextJumpType.CRIT || vo.type == Pan3d.TextJumpType.CRIT){
            //     info = [1,130,256-115,256,256];
            // }
            let rules:number[] = this.getCenterRules(60*(time - vo.starttime)/1000);
            if(rules){
                let ui:Pan3d.AlphaUICompenent = textJump.ui as Pan3d.AlphaUICompenent;
                ui.x = v2d.x+info[0]*(info[1]-info[3]/2);
                ui.y = v2d.y+info[0]*(info[2]-info[4]);
                ui.width = info[0]*info[3];
                ui.height = info[0]*info[4];
                ui.width *= rules[1];
                ui.height *= rules[1];
                ui.alpha = rules[2];
            }
        }
        //获取中点动画数据[上移位置，缩放，透明度]
        private static getCenterRules(frame:number):number[]{
            if(frame < 10){
                return [0,0.1*frame,1];
            }
            if(frame < 35){
                return [0,1,1];
            }
            let offset:number = frame-35;
            let alpha:number = 1-offset*0.1;
            if(alpha < 0) alpha = 0;
            return [0,1,alpha];
        }
    }
}