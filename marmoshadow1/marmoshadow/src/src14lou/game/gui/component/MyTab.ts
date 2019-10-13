module game.gui.component {
    export class MyTab extends Laya.Box {
        /**水平标签 */
        static TYPE_HORIZONTAL: number = 0;
        /**竖直标签 */
        static TYPE_VERTIVAL: number = 1;

        /**标签类型 */
        private _type: number;
        /**标签间隔 */
        private _space: number;
        /**标签显示对象 */
        private _tabShowList: CheckBox[];
        /**滑动面板 */
        private _panel: Panel;

        /**选中回调 */
        private _selectHandler: Handler;
        set selectHandler(handler: Handler) {
            this._selectHandler = handler;
        }

        /**选中的索引 */
        private _selectIndex: number = -1;
        get selectIndex(): number {
            return this._selectIndex;
        }

        set selectIndex(index: number) {
            this._selectIndex = index;
            this.onUpdateSelect();
        }

        /**
         * 构造函数
         * @param width 标签面板宽度
         * @param height 标签面板高度
         * @param type 标签类型
         * @param space 标签间隔
         * @param scrollBarSkin 滚动条皮肤
         */
        constructor(width: number, height: number, type: number = MyTab.TYPE_HORIZONTAL, space: number = 0, scrollBarSkin: string = "") {
            super();
            this.size(width, height);
            this._type = type;
            this._space = space;
            this._tabShowList = [];
            this._panel = new Panel();
            this._panel.size(width, height);
            this.addChild(this._panel);
            if (type == MyTab.TYPE_HORIZONTAL) {
                this._panel.hScrollBarSkin = scrollBarSkin;
            } else {
                this._panel.vScrollBarSkin = scrollBarSkin;
            }
        }


        /**
         * 初始化标签
         * @param skins 标签皮肤集合
         */
        initTab(configs: any[]): void {
            if (!configs || configs.length <= 0) return;
            if (this._panel.numChildren > 0)
                this._panel.destroyChildren();
            this._tabShowList.length = 0;
            for (let i = 0; i < configs.length; i++) {
                let config = configs[i];
                let skin = "";
                if (config.hasOwnProperty('skin'))
                    skin = config.skin;
                else
                    skin = config;
                let checkBox = this.addTab(skin);
                if (config.hasOwnProperty('gray'))
                    checkBox.gray = config.gray;
            }
            this.updateTabPos();
        }

        /**
         * 校验标签位置，做视野校对
         */
        private checkSign(): void {
            if (!this._panel || this._tabShowList.length <= 0 || this._selectIndex < 0) return;
            let isHorizontal = this._type == MyTab.TYPE_HORIZONTAL;
            //滚动条对象
            let scrollBar = isHorizontal ? this._panel.hScrollBar : this._panel.vScrollBar;
            //从0位置到显示区域结束的距离
            let dis = scrollBar.value + (isHorizontal ? this._panel.width : this._panel.height);
            //从0位置到当前位置一共的距离
            let totalDis = 0;
            for (let i = 0; i <= this._selectIndex; i++) {
                let item = this._tabShowList[i];
                totalDis += (isHorizontal ? item.width : item.height);
            }
            let slideDis: number = 0;
            //右/下边界校对
            let diff = dis - totalDis;
            if (diff < 0) {
                slideDis = scrollBar.value + Math.abs(diff) + 50;
            }
            //左/上边界校对
            let item = this._tabShowList[this._selectIndex];
            let itemDis = isHorizontal ? item.width : item.height;
            diff = Math.abs(scrollBar.value - totalDis);
            if (diff < itemDis) {
                diff = itemDis - diff;
                slideDis = scrollBar.value - (diff + 50);
            }
            if (slideDis != 0)
                Laya.Tween.to(scrollBar, { value: slideDis }, 150);
        }

        /**
         * 添加标签项
         * @param skin 皮肤
         * @param label 文字
         */
        private addTab(skin: string): CheckBox {
            let checkBox = new CheckBox();
            checkBox.skin = skin;
            checkBox.stateNum = 2;
            this._tabShowList.push(checkBox);
            //添加事件
            DisplayU.setMouseListener(checkBox, true, this, this.onTabClick);
            this._panel.addChild(checkBox);
            return checkBox;
        }

        /**
         * 更新位置信息
         */
        private updateTabPos(): void {
            let pos = 0;
            for (let i = 0; i < this._tabShowList.length; i++) {
                let checkBox = this._tabShowList[i];
                if (this._type == MyTab.TYPE_HORIZONTAL) {
                    checkBox.x = pos;
                    checkBox.y = 0;
                    pos += checkBox.width + this._space;
                } else {
                    checkBox.x = 0;
                    checkBox.y = pos;
                    pos += checkBox.height + this._space;
                }
            }
            if (this._type == MyTab.TYPE_HORIZONTAL) {
                this._panel.hScrollBar.max = pos - this._panel.width;
            } else {
                this._panel.vScrollBar.max = pos - this._panel.height;
            }
        }

        /**
         * 标签点击事件
         * @param e 事件对象
         */
        private onTabClick(e: LEvent): void {
            let target = e.currentTarget as CheckBox;
            // TweenBtnEff.BtnTween(target);
            let index = this._tabShowList.indexOf(target);
            //如果点击已经打开的标签 那就不做任何事情吧！
            if (index != -1 && this._selectIndex != index) {
                this._selectIndex = index;
                //更新标签组的状态
                this.onUpdateSelect();
            } else {
                target.selected = true;
            }
        }

        /**更新标签状态 */
        private onUpdateSelect(): void {
            //视野校对
            this.checkSign();
            //选中状态更新
            for (let i = 0; i < this._tabShowList.length; i++) {
                let tab = this._tabShowList[i];
                tab.selected = (i == this._selectIndex);
            }
            //选中回调
            if (this._selectHandler) {
                this._selectHandler.runWith(this._selectIndex);
            }
        }

        /**
         * 销毁组件
         */
        destroy(): void {
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this._panel);
            //清理显示列表
            if (this._tabShowList && this._tabShowList.length > 0) {
                for (let i = 0; i < this._tabShowList.length; i++) {
                    let tab = this._tabShowList[i];
                    //移除事件
                    DisplayU.setMouseListener(tab, false, this, this.onTabClick);
                    tab.destroy(true);
                }
                this._tabShowList = null;
            }
            this._selectHandler = null;
            this._selectIndex = -1;
            super.destroy();
        }
    }
}