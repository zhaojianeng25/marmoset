/**
* name 
*/
module game.data.template {
    export class ActivityNewBaseVo {
        public id: number; //序号
        public type: number; //页签类型
        public level: number; //需求等级
        public name: string; //活动名
        public leveltext: string; //等级文本
        public unleveltext: string; //未达等级到文本
        public maxlevel: number; //上限等级
        public text: string; //活动详情
        public times: string; //活动周期
        public isshowmaxnum: number; //是否显示最大次数
        public maxnum: number; //最大次数
        public maxact: number; //最大活跃度 double
        public link: number; //参加类型
        public linkid1: number; //对应1
        public linkid2: number; //对应2
        public sort: number; //排序
        public timetext: string; //开启时间
        public activitylv: string; //活动要求
        public markid: string; //标签图标
        public imgid: number; //图片id
        public getfoodid1: number; //物品id
        public getfoodid2: number; //物品id2
        public getfoodid3: number; //物品id3
        public getfoodid4: number; //物品id4
        public getfoodid5: number; //物品id5
        public protext: string; //进行中提示
        public actid: string; //限时活动对应id
        public starttuijian: number; //推荐度
        public actvalue: number; //每次获得活跃 double
        public serversend: number; //服务器发
        public infinitenum: number; //无限制计次
        public isopen: number; //活动开关
        public linkredpackdis: number; //参加一次红点即消失
        public serverid: string; //服务器id
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.type = data.getUint32(); 
			this.level = data.getUint32(); 
			this.name = data.getUTFBytes(data.getUint32()); 
			this.leveltext = data.getUTFBytes(data.getUint32()); 
			this.unleveltext = data.getUTFBytes(data.getUint32()); 
			this.maxlevel = data.getUint32(); 
			this.text = data.getUTFBytes(data.getUint32()); 
			this.times = data.getUTFBytes(data.getUint32()); 
			this.isshowmaxnum = data.getUint32(); 
			this.maxnum = data.getInt32();
			this.maxact = data.getFloat64(); 
			this.link = data.getUint32(); 
			this.linkid1 = data.getUint32(); 
			this.linkid2 = data.getUint32(); 
			this.sort = data.getUint32(); 
			this.timetext = data.getUTFBytes(data.getUint32()); 
			this.activitylv = data.getUTFBytes(data.getUint32()); 
			this.markid = data.getUTFBytes(data.getUint32()); 
			this.imgid = data.getUint32();
			this.getfoodid1 = data.getUint32();
			this.getfoodid2 = data.getUint32(); 
			this.getfoodid3 = data.getUint32(); 
			this.getfoodid4 = data.getUint32(); 
			this.getfoodid5 = data.getUint32(); 
			this.protext = data.getUTFBytes(data.getUint32()); 
			this.actid = data.getUTFBytes(data.getUint32()); 
			this.starttuijian = data.getUint32(); 
			this.actvalue = data.getFloat64(); 
			this.serversend = data.getUint32();
			this.infinitenum = data.getUint32(); 
			this.isopen = data.getUint32(); 
			this.linkredpackdis = data.getUint32();
			this.serverid = data.getUTFBytes(data.getUint32());
        }
    }
}