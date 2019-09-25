/**
* 3d ui形象展示 
*/
module game.gui.component {
    export class AvatarUISprite extends pan.PanSceneSprite {
        private _charList: Dictionary;

        constructor() {
            super();
            let scene:PanScene = this.scene as PanScene;
            scene.cameraMode = PanScene.MODE_2D;
            scene.prependTranslation = -.5;
            this._charList = new Dictionary();
        }

        /**
         * 显示3d形象 
         * [{"guid":"caocao","url":"wujiang_0001","ry":180,"y":0,"x":0,"scale":2},{"guid":"guanyu","url":"wujiang_0002","ry":180,"y":100,"x":-140,"scale":2}]
        */
        public add(jsonStr: string): void {
            let data: any = JSON.parse(jsonStr);
            for (let i = 0; i < data.length; i++) {
                let d = data[i];
                if (!d.url || !d.guid || this._charList.get(d.guid)) continue;
                let char3d: SceneChar = new SceneChar();
                char3d.px = d.x ? d.x : 0;  //x轴坐标
                char3d.py = d.y ? d.y : 0;  //y轴坐标
                char3d.pScale = d.scale ? d.scale : 1; //缩放
                char3d.pRotationY = d.ry ? d.ry : 180;  //水平旋转
                char3d.setRoleUrl(getRoleUrl(d.url));   //素材命名
                if (d.wp) char3d.setWeapon(d.wp); // 武器，如果将来有的话
                this.scene.addMovieDisplay(char3d);
                this._charList.set(d.guid, char3d);
            }
        }

        public set(jsonStr: string): void {
            let data: any = JSON.parse(jsonStr);
            for (let i = 0; i < data.length; i++) {
                let d = data[i];
                if (!d.url || !d.guid) continue;
                let char3d = this._charList.get(d.guid);
                char3d.setRoleUrl(getRoleUrl(d.url));   //素材命名
                if (d.wp) char3d.setWeapon(d.wp); // 武器，如果将来有的话
            }
        }

        /**获取形象对象 */
        public getAvatar(guid: string): SceneChar {
            return this._charList.get(guid);
        }

        /**移除3d形象 
         * [{"guid":"caocao"},{"guid":"guanyu"}]
        */
        public remove(jsonStr: string): void {
            let data: any = JSON.parse(jsonStr);
            for (let i = 0; i < data.length; i++) {
                let d = data[i];
                if (!d.guid) continue;
                let char3d: SceneChar = this._charList.get(d.guid);
                if (!char3d) continue;
                this.scene.removeMovieDisplay(char3d);
                char3d.destory();
                this._charList.remove(d.guid);
            }
        }

        /**
         * 移除全部形象
         */
        public removeAll(): void {
            let data = this._charList.keys;
            for (let i = 0; i < data.length; i++) {
                let guid = data[i];
                if (!guid) continue;
                let char3d: SceneChar = this._charList.get(guid);
                if (!char3d) continue;
                this.scene.removeMovieDisplay(char3d);
                char3d.destory();
                this._charList.remove(guid);
            }
        }

        /**
         * 旋转
         * @param guid 唯一识别id
         * @param value 旋转角度
         */
        public rotate(guid: string, value: number): void {
            if (!guid) return;
            let char3d: SceneChar = this._charList.get(guid);
            if (!char3d) return;
            char3d.pRotationY = value;
        }

        /**坐标 */
        public position(guid: string, x?: number, y?: number, z?: number): void {
            if (!guid) return;
            let char3d: SceneChar = this._charList.get(guid);
            if (!char3d) return;
            if (x != null)
                char3d.px = x;
            if (y != null)
                char3d.py = y;
            if (z != null)
                char3d.pz = z;
        }

        /**缩放 */
        public pscale(guid: string, value: number): void {
            if (!guid) return;
            let char3d: SceneChar = this._charList.get(guid);
            if (!char3d) return;
            char3d.pScale = value;
        }

        //以下为2D的换算

        public static math3dto2Darpg($p: Vector3D): Vector2D {

            var $point: Vector3D = Scene_data.vpMatrix.transformVector($p)

            var fovw: number = Scene_data.stageWidth / 4 / PanEngine.htmlScale;
            var fovh: number = Scene_data.stageHeight / 4 / PanEngine.htmlScale;
            var tx: number = fovw + $point.x * fovw;
            var ty: number = fovh - $point.y * fovh;
            return new Vector2D(tx, ty)
        }
        //通过3D坐标计算出2D场景中的坐标
        public static getScene2DBy3Dpostion($v3d: Vector3D): Vector2D {
            // var $v2: Vector2D = this.math3dto2Darpg($v3d)
            // $v2.x -= AppDataArpg.sceneStagePos.x;
            // $v2.y -= AppDataArpg.sceneStagePos.y;
            return this.math3dto2Darpg($v3d);
        }

        private static triItem: Array<Vector3D>
        public static math2Dto3DGroundarpg($p: Vector2D): Vector3D {
            // this._vpMatrixInver = Scene_data.vpMatrix.clone();
            // this._vpMatrixInver.invert()

            var $k0: Vector3D = this.math2dto3Darpg($p, 100);
            var $k1: Vector3D = this.math2dto3Darpg($p, 200);
            if (!this.triItem) {
                this.triItem = new Array
                this.triItem.push(new Vector3D(0, 0, 0))
                this.triItem.push(new Vector3D(-100, 0, 100))
                this.triItem.push(new Vector3D(+100, 0, 100))
            }
            return MathUtil.getLinePlaneInterectPointByTri($k0, $k1, this.triItem)
        }


        private static math2dto3Darpg($p: Vector2D, $deph: number = 100): Vector3D {
            var fovw: number = Scene_data.stageWidth / 4;
            var fovh: number = Scene_data.stageHeight / 4;
            var tx: number = $p.x;
            var ty: number = $p.y;
            var $point: Vector3D = new Vector3D();
            $point.y = (fovh - ty) / fovh;
            $point.x = (tx - fovw) / fovw;
            $point.z = $deph;
            //$point = this._viewMatrixInver.transformVector($point);
            //$point = this._camMatrixInver.transformVector($point);
            // $point = this._vpMatrixInver.transformVector($point);
            return $point
        }


        /**销毁本对象 */
        destroy(destroyChild?: boolean): void {
            if (this._charList) {
                for (let guid in this._charList) {
                    let isChar: boolean = this._charList.get(guid) instanceof SceneChar;
                    if (!isChar) continue;
                    let char3d: SceneChar = this._charList.get(guid);
                    if (!char3d) continue;
                    this.scene.removeMovieDisplay(char3d);
                    char3d.destory();
                    //delete this._charList.get(guid);
                    this._charList.remove(guid);
                }
                this._charList.clear();
                this._charList = null;
            }
            super.destroy(destroyChild);
        }
    }
}