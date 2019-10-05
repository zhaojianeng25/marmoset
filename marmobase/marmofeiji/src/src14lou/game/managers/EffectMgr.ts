/**
* UI效果
*/
module game.managers {
    export class EffectMgr {
        //------------动画配置--------------
        /**物品品质特效,品质：1 */
        static EFFECT_ITEM_1;
        /**物品品质特效,品质：2 */
        static EFFECT_ITEM_2;
        /**物品品质特效,品质：3红色 */
        static EFFECT_ITEM_3;
        /**NPC头顶动画黄色 */
        static EFFECT_NPC_YELLOW;
        /**NPC头顶动画蓝色 */
        static EFFECT_NPC_BLUE;

        static init(): void {
            //特效配置示例
            // this.effect_sample = {
            //     source: "pinzhi",// 对应资源文件名
            //     fileName: "dj_",//资源图片前缀
            //     frameCount: 10,//资源图片个数
            //     interval: 12,//帧率
            //     start:10000,//图片起始索引
            // };

            /**物品品质特效,品质：1 */
            this.EFFECT_ITEM_1 = {
                source: "pinzhi",
                fileName: "dj_",
                frameCount: 10,
                interval: 12,
                start: 10000,
                cacheName: "effect_item_1"
            };

            /**物品品质特效,品质：2 */
            this.EFFECT_ITEM_2 = {
                source: "pinzhi",
                fileName: "dj_",
                frameCount: 10,
                interval: 12,
                start: 20000,
                cacheName: "effect_item_2"
            };
            /**物品品质特效,品质：3 */
            this.EFFECT_ITEM_3 = {
                source: "pinzhi",
                fileName: "dj_",
                frameCount: 10,
                interval: 12,
                start: 30000,
                cacheName: "effect_item_3"
            };

            /**NPC头顶动画黄色 */
            this.EFFECT_NPC_YELLOW = {
                source: "mask",
                sourcePath: "scene/",
                fileName: "rw_1_",
                frameCount: 6,
                interval: 12,
                cacheName: "npchead_yellow"
            }

            /**NPC头顶动画蓝色 */
            this.EFFECT_NPC_BLUE = {
                source: "mask",
                sourcePath: "scene/",
                fileName: "rw_2_",
                frameCount: 6,
                interval: 12,
                cacheName: "npchead_blue"
            }

         
            
        }

        //按钮特效注册器
        static addBtnEffect(btn: Sprite): void {
            btn.on(LEvent.MOUSE_DOWN, this, this.scaleSmall, [btn]);
            btn.on(LEvent.MOUSE_UP, this, this.scaleBig, [btn]);
            btn.on(LEvent.MOUSE_OUT, this, this.scaleBig, [btn]);
        }

        //按钮特效移除
        static removeBtnEffect(btn: Sprite): void {
            if (!btn) return;
            btn.off(LEvent.MOUSE_DOWN, this, this.scaleSmall);
            btn.off(LEvent.MOUSE_UP, this, this.scaleBig);
            btn.off(LEvent.MOUSE_OUT, this, this.scaleBig);
        }

        //变小
        private static scaleSmall(btn: Sprite): void {
            Laya.Tween.to(btn, { scaleX: 0.8, scaleY: 0.8 }, 100);
        }

        //变大
        private static scaleBig(btn: Sprite): void {
            Laya.Tween.to(btn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        }

        /**
         * 外面统一不能调用，要调用后果自负
         * @param config 配置集合
         */
        private static __cacheAnimation(config: any): void {
            let cache = Animation.framesMap[config.cacheName];
            if (cache) {
                return;
            }
            //logd("添加特效缓存");
            if (this.cacheConfig.indexOf(config) == -1) {
                this.cacheConfig.push(config);
                //资源绑定下
                if (config.source) {
                    let refTexture = RefAsset.Get(config.source);
                    refTexture.retain();
                }
            }

            let images = PathConst.getSeqFrames(config.filePath + config.fileName, config.frameCount, config.start, config.reverse);
            Animation.createFrames(images, config.cacheName);
        }

        /**
        * 外面统一不能调用，要调用后果自负
        * @param config 配置集合
        */
        private static __clearAnimation(config: any): void {
            //清理缓存
            Animation.clearCache(config.cacheName);
            let index = this.cacheConfig.indexOf(config);
            if (index >= 0) {
                this.cacheConfig.splice(index, 1);
                if (config.source) {
                    let refTexture = RefAsset.Get(config.source);
                    refTexture.release()
                    logd("清理特效了" + config.source)
                }
            }
            //logd("清理特效缓存");
        }

        static playerAnmaition(animation: Animation, config: any, isloop: boolean, isScene: boolean = false): void {
            if (animation == null) return;
            if (!config.source) {
                logw("source no exit")
                return;
            }
            let refTexture = RefAsset.Get(config.source);
            //存粹是重置资源回收时间
            //refTexture.retain();
            //refTexture.release()
            if (!refTexture.parseComplete) {
                refTexture.once(LEvent.COMPLETE, this, (animation: Animation, config: any, isloop: boolean, isScene: boolean = false) => {
                    this.onAssetParseComplete(animation, config, isloop, isScene);
                }, [animation, config, isloop, isScene]);
            }
            else {
                this.onAssetParseComplete(animation, config, isloop, isScene);
            }
        }
        //当前需要播放的动画
        private static animationList: Array<Animation> = [];
        //和animation对应的配置
        private static configList: Array<any> = [];
        //当前已经缓存的配置
        private static cacheConfig: Array<any> = [];
        private static onAssetParseComplete(animation: Animation, config: any, isloop: boolean, isScene: boolean = false): void {
            if (animation.parent || isScene) {
                this.__cacheAnimation(config);
                let index = this.animationList.indexOf(animation)
                if (index == -1) {
                    this.animationList.push(animation);
                    this.configList.push(config);
                }
                else {
                    if (this.configList[index] != config) {
                        this.configList[index].useCount--;
                        this.configList[index] = config;
                    }
                }
                if (config.interval)
                    animation.interval = config.interval;
                if (config.useCount == undefined)
                    config.useCount = 0;
                config.useCount++;
                config.lastUseTime = 0;
                animation.on(LEvent.UNDISPLAY, this, this.unDisplay, [animation, config]);
                animation.play(0, isloop, config.cacheName);
            }
        }

        public static unDisplay(animation: Animation, config: any): void {
            if (!animation) return;
            animation.off(LEvent.UNDISPLAY, this, this.unDisplay);
            let index = this.animationList.indexOf(animation);
            if (index != -1) {
                this.configList[index].useCount--;
                this.animationList.splice(index, 1);
                this.configList.splice(index, 1);
            }
        }

        private static _nextTimer: number = 0;
        private static MAX_FREE_TIME = 3000;	// 素材超时释放时间

        static update(diff): void {
            let currTimer = Laya.timer.currTimer;
            if (currTimer < this._nextTimer) {
                return;
            }
            this._nextTimer = currTimer + 1000; // 检查频率1秒

            for (let key in this.cacheConfig) {
                let config = this.cacheConfig[key];
                if (config.useCount <= 0) {
                    if (config.lastUseTime == 0)
                        config.lastUseTime = currTimer + this.MAX_FREE_TIME;
                    if (config.lastUseTime < currTimer)
                        this.__clearAnimation(config)
                }
            }
            //logd("当前缓存数量" + this.cacheConfig.length.toString());
        }
    }
}