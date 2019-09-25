/**
* name 
*/
module layapan {
    import CharTitleMeshVo = Pan3d.CharTitleMeshVo
    export class LayaSceneChar extends layapan_me.LayaSceneChar {
        // =====================以下是称谓===================
        // 称谓
        protected _charTitleVo: CharTitleMeshVo;
        protected _charTitle: string;
        set charTitle(v: string) {
            if (this._charTitle == v) return;
            this._charTitle = v;
            this._charTitleVo && (this._charTitleVo.num = this._charTitle);
        }
 
        setWeapon(num: number): void {
            if (this._weaponNum == num) {
                return;
            }
            this._weaponNum = num;
            if (num <= 0) {//移除武器
                this.removePart(LayaSceneChar.WEAPON_PART);
            } else {
                this.setWeaponByAvatar(this._weaponNum);
            }
        }
        public setWeaponSlotByAvatar(avatar: number, slot: string, $suffix: string = ""): void {
            this._weaponNum = avatar;
            this.addPart(LayaSceneChar.WEAPON_PART, slot, this.getSceneCharWeaponUrl(avatar, $suffix));
        }

        private chuangeActionFun: Function
        playBfun($action: string, completeState: number, $bfun: Function): void {
            this.curentAction = null;
            this.chuangeActionFun = $bfun
            this.play($action, completeState)
        }

        protected changeAction($action: string): void {
            super.changeAction($action)
            if (this.chuangeActionFun) {
                this.chuangeActionFun()
                this.chuangeActionFun = null
            }
        }

        get charTitle(): string {
            return this._charTitle || "";
        }
        // 是否显示称谓
        protected _titleEnable: boolean = false;
        set titleEnable(v: boolean) {
            this._titleEnable = v;

            if (!this._charTitleVo) {
                this._charTitleVo = (<LayaOverride2dSceneManager>this._scene).bloodManager.getCharTitleMeshVo("潘佳治" + random(99))
            } else {
                this._charTitleVo.num = "潘佳治" + random(99);
            }
            this.visible
        }
        public _isBattle: boolean = false;
        public get isBattle(): boolean {
            return this._isBattle;
        }
        public set isBattle(value: boolean) {
            this._isBattle = value;
            //console.log(" this._isSinging",this._isSinging)
        }
        public isBuff: boolean = false;

    }
   
}