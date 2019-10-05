/**
* name 
*/
module game.data.template {
    export class EquipCombinBaseVo {
        public id: number; //id
        public itemname: string; //道具名称 
        public bangyin: number; //合成消耗绑定银币 
        public yinliang: number; //合成消耗银币 
        public equipnum: number; //合成消耗道具数 
        public nextequipid: number; //合成产物
        public characterlevel: number; //等级要求			
        public colorname: string; //道具名颜色
        public hechengrate: number; //道具合成几率
        public hechengfailreturn: number; //合成失败返还道具ID
        public failreturnnum: number; //合成失败返还道具数量
        public listid: number; //排序id 排序id		
        public hammerid: number; //强化道具1
        public hammernum: number; //强化道具1数量
        public hammerrate: number; //强化后成功率
        public colorafterqianghua: string; //强化文字变色
        public lastequipid: number; //需要合成的
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.itemname = data.getUTFBytes(data.getUint32());
            this.bangyin = data.getUint32();
            this.yinliang = data.getUint32();
            this.equipnum = data.getUint32();
            this.nextequipid = data.getUint32();
            this.characterlevel = data.getUint32();
            this.colorname = data.getUTFBytes(data.getUint32());
            this.hechengrate = data.getUint32();
            this.hechengfailreturn = data.getUint32();
            this.failreturnnum = data.getUint32();
            this.listid = data.getUint32();
            this.hammerid = data.getUint32();
            this.hammernum = data.getUint32();
            this.hammerrate = data.getUint32();
            this.colorafterqianghua = data.getUTFBytes(data.getUint32());
            this.lastequipid = data.getUint32();
        }
    }
}