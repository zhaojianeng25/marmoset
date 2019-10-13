/**
* name 
*/
module game.data.template {
    export class GuideCourseBaseVo {
        public id: number; //id
        public group: number; //组id
        public style: number; //是否为人物头像
        public image: string; //显示图标
        public name: string; //名字
        public sort: number; //排序
        public info: string; //描述
        public enterlevel: number; //前往等级
        public enter: number; //前往逻辑
        public enterlink: number; //前往逻辑对应
        public finish: number; //完成逻辑
        public ref1: string; //完成逻辑参数1
        public ref2: string; //完成逻辑参数2
        public item: number; //道具1
        public itemnum: number; //道具数量1
        public itemicons: Array<number>; //道具1图标,宠物1图标,职业贡献奖励图标,节日积分奖励图标,公会贡献奖励图标,公会任务贡献资金图标,公会任务个人分红图标,经验奖励图标,宠物经验奖励图标,游戏币奖励图标,金币奖励图标,声望图标
        public itemtexts: Array<string>; //道具1名称,宠物1名称,职业贡献奖励文本,节日积分奖励文本,公会贡献奖励文本,公会任务贡献资金文本,公会任务个人分红文本,经验奖励文本,宠物经验奖励文本,游戏币奖励文本,金币奖励文本,声望文本
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.group = data.getUint32(); 
			this.style = data.getUint32(); 
			this.image = data.getUTFBytes(data.getUint32()); 
			this.name = data.getUTFBytes(data.getUint32()); 
			this.sort = data.getUint32(); 
			this.info = data.getUTFBytes(data.getUint32()); 
			this.enterlevel = data.getUint32();
			this.enter = data.getUint32(); 
			this.enterlink = data.getUint32(); 
			this.finish = data.getUint32();
			this.ref1 = data.getUTFBytes(data.getUint32()); 
			this.ref2 = data.getUTFBytes(data.getUint32()); 
			this.item = data.getUint32(); 
			this.itemnum = data.getUint32(); 
            let itemiconsLength: number = data.getUint32();
			this.itemicons = [];
            for (var index = 0; index < itemiconsLength; index++) {
                this.itemicons.push(data.getUint32());
            } 
			let itemtextsLength: number = data.getUint32();
            this.itemtexts = [];
            for (var index = 0; index < itemtextsLength; index++) {
                this.itemtexts.push(data.getUTFBytes(data.getUint32()));
            }
        }
    }
}