/**
* 场景剧情管理器
*/
module game.managers{
	export class SceneStoryMgr{
		private _app:AppBase;
		private _story:game.story.Base;
		private _storyClasss: { [key: number]: Object };
		constructor(app:AppBase){
			this._app = app;
			this._storyClasss = {};
			this._storyClasss[MapInfo.MAP_XINSHOUCUN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TIANLEIYU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_YUNXIAODIAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WULIANGGONG] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_CANGYUGONG] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_HUOYUNZONG] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_FEIXUEYA] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIXINGGUAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_YOUMINGDIAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_DANYANGGUAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_XIANGSIGU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BAISHAXIAOZHU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TAOHUAXI] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_HUANGYANLING] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_CHENGNINGDAO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_PANLONGSHAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TIANZHOUYIZHAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WANGFENGTING] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_LIULINTAOHAI] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_LIANHUAGU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_XUANMINGJIAO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_CHUNQIULIN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JISHIZHEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TIANJIANSHANZHUANG] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_YOUMINGGUIJING] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_SHIZHIJIADAO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_DUNHUOERDE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_DXJINGJICHANG] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JIUZHOUCITYTEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_CHANGWUMENGJING] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_HUANGSHIYA] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TIANJIANSHANZHUANGMISHI] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_PENGLAIZHOU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QINGLONGTAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JIULONGGONGZONGTAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_LONGDONG] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_HEITIESHENYUAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_ZUZHUOZHICUN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_LIUFENGDAO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BAICHENG] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIXIASHAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TIANYUANGU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TIANDAOSHENGDIAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_MISHI] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JIUGONGSHANZONGTAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_YOUMOBAO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QINGLIANGU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_LANHUAMIJING] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JIUZHOUCHENGNOW] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_LIUGUANGCITY] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TIANGUANGZHEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JINSHIGU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_LANTIANZHEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JIUHUASHAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TUMOLING] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_CHANGSHENGDIAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_CHENSHUISENLIN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JINGDIZHILAO] = game.story.XinShouCun;

			this._storyClasss[MapInfo.MAP_FEINIAOLIN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_HEIFENGGU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_LIULIDAO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_DIGONGMENKOU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_YUANGUYIJI] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_DIXIAGONGDIAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WANFADIANYIJI] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_HUANMOJING] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANFENGSHAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_HEITIESHENYUANTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_MIZONGSHAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_CHUNQIUSHAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WANYAOGU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANLONGGU] = game.story.XinShouCun;

			this._storyClasss[MapInfo.MAP_QIANLONGKU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANLONGZAIYUAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_CHUSHENRUHUA] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QUNXIANZHIDIAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANLONGZAIYUANTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_CHUSHENRUHUATWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QUNXIANZHIDIANTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_KUNLUNONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_PEGNLAIONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_KUNLUNTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_PEGNLAITWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_KUNLUNTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_PEGNLAITHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_KUNLUNYOUSHENGONE] = game.story.XinShouCun;

			this._storyClasss[MapInfo.MAP_PENGLAIYOUSHENGONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_KUNLUNYOUSHENGTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_PENGLAIYOUSHENGTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_KUNLUNYOUSHENGTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_PENGLAIYOUSHENGTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BANGPAIZHAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QINGHEDAOONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QINGHEDAOTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QINGHEDAOTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TAOLIULINONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TAOLIULINTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TAOLIULINTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_XUANANYIZHANONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_XUANANYIZHANTWO] = game.story.XinShouCun;

			this._storyClasss[MapInfo.MAP_XUANANYIZHANTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_SHUIXIANGXIONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_SHUIXIANGXITWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_SHUIXIANGXITHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_LINHAIBAISHAONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_LINHAIBAISHATWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_LINHAIBAISHATHREe] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_NEILONGLINONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_NEILONGLINTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_NEILONGLINTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_SHENGULINONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_SHENGULINTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_SHENGULINTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_HEHUAGUONE] = game.story.XinShouCun;

			this._storyClasss[MapInfo.MAP_HEHUAGUTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_HEHUAGUTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_CHUNFENGGUONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_CHUNFENGGUTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_CHUNFENGGUTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_FENGQINGTINGONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_FENGQINGTINGTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JUMOZHIDUONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JUMOZHIDUTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_ZUZHUOZHITAONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_ZUZHUOZHITATWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_ZUDUIFUBENYULIUONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_ZUDUIFUBENYULIUTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_ZUDUIFUBENYULIUTHREE] = game.story.XinShouCun;

			this._storyClasss[MapInfo.MAP_ZUDUIFUBENYULIUFOUR] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_ZUDUIFUBENYULIUFIVE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_ZUDUIFUBENYULIUSIX] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_ZUDUIFUBENYULIUSEVEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_ZUDUIFUBENYULIUEIGHT] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_FENGQINGTINGTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOFOUR] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOFIVE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOSIX] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOSEVEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOEIGHT] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUONINE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOTEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOEL] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOTF] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOTH] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOFORTH] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOFIVETH] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOSIXTH] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOSEVENTH] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUOEIGHTTH] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BINGFENGWANGZUONINTTH] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANLONGKUONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANLONGKUTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANLONGKUTHREE] = game.story.XinShouCun;

			this._storyClasss[MapInfo.MAP_QIANLONGKUFOUR] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANLONGKUFIVE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANLONGKUSIX] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANLONGKUSEVEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANLONGKUEIGHT] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANLONGKUNINE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_QIANLONGKUTEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WULONGKUONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WULONGKUTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WULONGKUTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WULONGKUFOUR] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WULONGKUFIVE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WULONGKUSIX] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WULONGKUSEVEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WULONGKUEIGHT] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WULONGKUNINE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WULONGKUTEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WOLONGPOONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WOLONGPOTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WOLONGPOTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WOLONGPOFOUR] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WOLONGPOFIVE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WOLONGPOSIX] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WOLONGPOSEVEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WOLONGPOEIGHT] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WOLONGPONINE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WOLONGPOTEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JUEXIANZHENONE] = game.story.XinShouCun;

			this._storyClasss[MapInfo.MAP_JUEXIANZHENTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JUEXIANZHENTHREE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JUEXIANZHENFOUR] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JUEXIANZHENFIVE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JUEXIANZHENSIX] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JUEXIANZHENSEVEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JUEXIANZHENEIGHT] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JUEXIANZHENNINE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JUEXIANZHENTEN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_RONGDONG] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JINGSHITAOLIULIN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_YAOHUASHANZHAI] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_HUANGANYOULIN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_MODAOJIUDIAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_WUXINGMIJING] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_YINYANGXIANYA] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_JITAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_SHENYUAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BAICHENGTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_YIDUXUEYUAN] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_XIESHOUBAOLEI] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BEIPANZHISHOU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_NAJIAZHIMOU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_BEISHANGMUDI] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_NALUHICHENG] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_SIWANGZHIGE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_FENSUIYINMOU] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_SHIKONGZHILU] = game.story.XinShouCun;

			this._storyClasss[MapInfo.MAP_YINGXIONGPINGTAI] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TESTONE] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TESTTWO] = game.story.XinShouCun;
			this._storyClasss[MapInfo.MAP_TESTTHREE] = game.story.XinShouCun;

//			this._storyClasss[MapInfo.MAP_BATTLE] = battle.BattleScene;

		}

		// 初始化 //SceneObjectMgr.update()会调用此函数
		init():void{
			this.clear();
			let storyClass:any = this._storyClasss[this._app.sceneObjectMgr.mapAssetInfo.id];
			if(storyClass){
				this._story = new storyClass(this._app);
				this._story.init();
			}
		}
		//剧情3D场景加载完成
		public onCompleteScene3D():void{
			this._story && this._story.onCompleteScene3D();
		}

		//移动场景
		public get isSceneMove(): boolean {
			return this._story && this._story.isSceneMove;
		}

		//需要劫持摄像头
		get needJieChiCamer():boolean{
			return this._story? this._story.needJieChiCamer : false;
		}
		//获取跟随对象
		get followUnit():Unit{
			return this._story? this._story.followUnit : null;
		}

		//有自己的视野显示规则
		get haveSelfLookRule():boolean{
			return this._story? this._story.haveSelfLookRule : false;
		}
		//是否在视野里
		lookIn(obj:IAvatarObj):boolean{
			return this._story? this._story.lookIn(obj) : false;
		}

		//点击地面
		onSceneTouch(cellx:number, celly:number, hitObject:any):boolean{
			if(this._story)
				return this._story.onSceneTouch(cellx, celly, hitObject);
			return false;
		}

		// 心跳
		update(diff:number):void{
			this._story && this._story.update(diff);
		}
		// 清理
		clear():void{
			if(this._story){
				this._story.clear();
				this._story = null;
			}
			// 清理剧情对象
			this._app.sceneObjectMgr.clearFakeObject();
		}
		//获取_storyClasss
		get_storyClasss():any{
			return this._storyClasss;
		}
	
	}
}