/**
* name 
*/
module game.data.template {
    export class JingyingrenwuTaskBaseVo {
        public id: number; //任务ID
        public ntasktypeid: number; //活动ID
        public nfubenid: number; //副本ID
        public taskname: string; //任务名
        public tasklevel: string; //适应等级
        public tasktext: string; //任务文本
        public taskready: number; //是否开放
        public nleveltype: number; //等级段
        public minlevel: number; //进入最低等级
        public maxlevel: number; //进入最高等级
        public ndifficult: number; //难度
        public strkaiqitime: string; //开启时间
        public strkaishitime: string; //开始时间
        public strjieshutime: string; //结束时间
        public nlunhuantype: number; //轮换类型
        public turngroup: number; //轮换组
        public turnid: number; //轮换顺序ID
        public awardtype: number; //奖励次数类型
        public awardtime: number; //奖励次数
        public nshowtype: number; //显示方式
        public strbgname: string; //主题图名称
        public nbossid: number; //BOSS造型
        public strdes: string; //副本说明
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
			this.ntasktypeid = data.getUint32(); 
			this.nfubenid = data.getUint32(); 
			this.taskname = data.getUTFBytes(data.getUint32()); 
			this.tasklevel = data.getUTFBytes(data.getUint32()); 
			this.tasktext = data.getUTFBytes(data.getUint32()); 
			this.taskready = data.getUint32(); 
			this.nleveltype = data.getUint32(); 
			this.minlevel = data.getUint32(); 
			this.maxlevel = data.getUint32(); 
			this.ndifficult = data.getUint32(); 
			this.strkaiqitime = data.getUTFBytes(data.getUint32());
			this.strkaishitime = data.getUTFBytes(data.getUint32()); 
			this.strjieshutime = data.getUTFBytes(data.getUint32()); 
			this.nlunhuantype = data.getUint32(); 
			this.turngroup = data.getUint32();
			this.turnid = data.getUint32(); 
			this.awardtype = data.getUint32();
			this.awardtime = data.getUint32(); 
			this.nshowtype = data.getUint32();
			this.strbgname = data.getUTFBytes(data.getUint32()); 
			this.nbossid = data.getUint32(); 
			this.strdes = data.getUTFBytes(data.getUint32());
        }
    }
}