module game.modules.guaji.models {
    /** 挂机战斗相关数据Vo */
    export class HookBattleDataVo {
        /** 是否自动战斗 */
        public isautobattle:number;//byte类型
        /** 人物操作类型 */
        public charoptype:number;//short类型
        /** 人物操作id */
        public charopid:number;//int类型
        /** 宠物操作类型 */
        public petoptype:number;//short类型
        /** 宠物操作id */
        public petopid:number;//int类型

        /** 挂机战斗相关数据Vo */
        constructor() {

        }

        public fromByteArray(bytes: ByteArray): void {
            this.isautobattle = bytes.readByte();
			this.charoptype = bytes.readShort();
			this.charopid = bytes.readInt32();
			this.petoptype = bytes.readShort();
			this.petopid = bytes.readInt32();
        }
    }
}