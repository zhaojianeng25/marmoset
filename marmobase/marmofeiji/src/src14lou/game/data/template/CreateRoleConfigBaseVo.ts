/**
* @Author: LinQiuWen
* @description:j角色创建配置
*/

module game.data.template{
    export class CreateRoleConfigBaseVo{
       /*字段*/
       public id: number; // 角色id
       public sex: number; // 性别
       public name: string; // 种族
       public englishname: string; //英文名称
       public describe: string;    // 描述
       public schools: Array<number> = [];  // 职业1ID,职业2ID,职业3ID
       public weapons: Array<number> = [];  //默认武器1ID,默认武器2ID,默认武器3ID
       public model: number;   //人物模型
       public roleimage: string;   //创建角色界面角色图
       public schoolimg1: string;  // 职业按钮图片1
       public schoolimg2: string;  // 职业按钮图片2
       public schoolimg3: string;  // 职业按钮图片3
       public diwenimg1: string;   //职业底图1
       public diwenimg2: string;   //职业底图2
       public diwenimg3: string;   //职业底图3
       public headimg: string;     //职业大头像
       public surebtnimg: string;  // 开始游戏按钮
       public returnimg: string;   //返回按钮
       public leftbtnimg: string;  // 左翻页按钮
       public rightbtnimg: string; //右翻页按钮
       public bgimg: string ;  // 背景图
       public bgbandimg: string;   //背景横框
       public effectOnTop: string; //图片上层
       public effectOnBottom: string;  //图片下层
       public xuanzezhiyeimg: string;  //请选择职业文字
       public pagedotimg: string;  //人物选择页签
       public smallflag: string;   //旗子图标
       public flageffect: string;  //旗子特效
       public spine: string;   //人物创建骨骼动画
       public topflag: string; //底框旗子
       public halficon: string;    //人物半身像

       constructor(){
       }

       public parse(data:Byte){
           this.id = data.getUint32();
           this.sex = data.getUint32();
           this.name = data.getUTFBytes(data.getUint32());
           this.englishname = data.getUTFBytes(data.getUint32());
           this.describe = data.getUTFBytes(data.getUint32());
           let schoolsLength = data.getUint32();
           for (var index = 0; index < schoolsLength;index++) {
               this.schools.push(data.getUint32());
           }
           let weaponsLength = data.getUint32();
           for (var index = 0; index < weaponsLength;index++) {
               this.weapons.push(data.getUint32());
           }
           this.model = data.getUint32();
           this.roleimage = data.getUTFBytes(data.getUint32());
           this.schoolimg1 = data.getUTFBytes(data.getUint32());
           this.schoolimg2 = data.getUTFBytes(data.getUint32());
           this.schoolimg3 = data.getUTFBytes(data.getUint32());
           this.diwenimg1 = data.getUTFBytes(data.getUint32());
           this.diwenimg2 = data.getUTFBytes(data.getUint32());
           this.diwenimg3 = data.getUTFBytes(data.getUint32());
           this.headimg = data.getUTFBytes(data.getUint32());
           this.surebtnimg = data.getUTFBytes(data.getUint32());
           this.returnimg = data.getUTFBytes(data.getUint32());
           this.leftbtnimg = data.getUTFBytes(data.getUint32());
           this.rightbtnimg = data.getUTFBytes(data.getUint32());
           this.bgimg = data.getUTFBytes(data.getUint32());
           this.bgbandimg = data.getUTFBytes(data.getUint32());
           this.effectOnTop = data.getUTFBytes(data.getUint32());
           this.effectOnBottom = data.getUTFBytes(data.getUint32());
           this.xuanzezhiyeimg = data.getUTFBytes(data.getUint32());
           this.pagedotimg = data.getUTFBytes(data.getUint32());
           this.smallflag = data.getUTFBytes(data.getUint32());
           this.flageffect = data.getUTFBytes(data.getUint32());
           this.spine = data.getUTFBytes(data.getUint32());
           this.topflag = data.getUTFBytes(data.getUint32());
           this.halficon = data.getUTFBytes(data.getUint32());
       }
    }
}