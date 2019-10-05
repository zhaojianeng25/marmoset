/**
* name 
*/
module game.data.template {
    export class ShiGuangZhiXueConfigBaseVo {
        public id: number; //ID
        public fubenId: number; //副本ID	
        public name: string; //副本名称
        public explain: string; //副本介绍
        public playerNum: number; //队伍人数下限
        public enterLevel: number; //进入最低等级
        public image: string; //主题图名称
        public icon: number; //半身像ID
        public award1: number; //通关奖励显示ID1
        public award2: number; //通关奖励显示ID2
        public award3: number; //通关奖励显示ID3
        public award4: number; //通关奖励显示ID4
        public award5: number; //通关奖励显示ID5
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.fubenId = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.explain = data.getUTFBytes(data.getUint32());
            this.playerNum = data.getUint32();
            this.enterLevel = data.getUint32();
            this.image = data.getUTFBytes(data.getUint32());
            this.icon = data.getUint32();
            this.award1 = data.getUint32();
            this.award2 = data.getUint32();
            this.award3 = data.getUint32();
            this.award4 = data.getUint32();
            this.award5 = data.getUint32();
        }
    }
}