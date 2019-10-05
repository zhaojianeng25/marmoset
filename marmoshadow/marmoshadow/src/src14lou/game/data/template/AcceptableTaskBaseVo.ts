/**
* name 
*/
module game.data.template {
    export class AcceptableTaskBaseVo {
        public id: number; //任务ID
        public minilevel: number; //任务等级 min
        public destnpcid: number; //目的NPC 领取任务的npc
        public miniicon: string; //前置小图标 
        public name: string; //任务名称  
        public aim: string; //任务追踪  
        public discribe: string; //任务描述 
        public rewardtext: string; //奖励文字 
        public expreward: number; //经验奖励
        public moneyreward: number; //金钱奖励
        public rmoneyreward: number; //备用奖励
        public itemsreward: Array<number>; //物品奖励1,物品奖励2,物品奖励3
        public reputationreward: number; //声望奖励
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
			this.minilevel = data.getUint32(); 
			this.destnpcid = data.getUint32(); 
			this.miniicon = data.getUTFBytes(data.getUint32());  
			this.name = data.getUTFBytes(data.getUint32());  
			this.aim = data.getUTFBytes(data.getUint32()); 
			this.discribe = data.getUTFBytes(data.getUint32()); 
			this.rewardtext = data.getUTFBytes(data.getUint32()); 
			this.expreward = data.getUint32();
			this.moneyreward = data.getUint32(); 
			this.rmoneyreward = data.getUint32();
            let itemsrewardLength: number = data.getUint32(); 
			this.itemsreward = []; 
            for (var index = 0; index < itemsrewardLength; index++) {
                this.itemsreward.push(data.getUint32());
            }
			this.reputationreward = data.getUint32();
        }
    }
}