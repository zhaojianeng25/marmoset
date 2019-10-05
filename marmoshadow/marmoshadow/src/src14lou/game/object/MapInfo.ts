/**
* name 
*/
module game.object {
	export class MapInfo extends MapField {
		//普通副本地图状态枚举
		public static MAP_STATE_NOMAL: number = 0;//
		public static MAP_STATE_BEGIN: number = 1;// 开始小怪
		public static MAP_STATE_BOSS: number = 2;//刷出BOSS
		public static MAP_STATE_END: number = 3;//副本结束
		public static MAP_STATE_SUCCESS_END: number = 4;//成功结束

		//新手村
		static MAP_XINSHOUCUN: number = 1;
		static MAP_XINSHOUCUN_POSX: number = 18.75;
		static MAP_XINSHOUCUN_POSY: number = 33.33333;
		//战斗场景
		static MAP_BATTLE: number = 1001;
		static MAP_BATTLE_POSX: number = 22.34375;
		static MAP_BATTLE_POSY: number = 38.625;
		//出生位置
		static MAP_XSC_BORN_POSX: number = 60;
		static MAP_XSC_BORN_POSY: number = 33;

		//济世镇
		static MAP_JISHIZHEN:number = 1651;
		//天雷狱
		static MAP_TIANLEIYU: number = 1601;
		//云霄殿
		static MAP_YUNXIAODIAN: number = 1602;
		//无量宫
		static MAP_WULIANGGONG: number = 1603;
		//苍羽宫
		static MAP_CANGYUGONG: number = 1604;
		//火云宗
		static MAP_HUOYUNZONG: number = 1605;
		//飞雪崖
		static MAP_FEIXUEYA: number = 1606;
		//七星观
		static MAP_QIXINGGUAN: number = 1607;
		//幽冥殿
		static MAP_YOUMINGDIAN: number = 1608;
		//丹阳观
		static MAP_DANYANGGUAN: number = 1609;
		//玄明教
		static MAP_XUANMINGJIAO:number = 1310;
		//新婚殿堂
		static MAP_XINHUNDIANTANG:number = 1311;
		//相思谷
		static MAP_XIANGSIGU:number = 1709;
		//白沙小筑
		static MAP_BAISHAXIAOZHU:number = 1705;
		//春秋林
		static MAP_CHUNQIULIN:number = 1707;
		//桃花溪
		static MAP_TAOHUAXI:number =1704;
		//黄岩陵
		static MAP_HUANGYANLING:number =1706;
		//城宁道
		static MAP_CHENGNINGDAO:number = 1701;
		//盘龙山
		static MAP_PANLONGSHAN:number = 1711;
		//天州驿站
		static MAP_TIANZHOUYIZHAN:number = 1703;
		//望峰亭
		static MAP_WANGFENGTING:number = 1710;
		//柳林桃海
		static MAP_LIULINTAOHAI:number =1702;
		//莲花谷
		static MAP_LIANHUAGU:number = 1708;
		//
		static MAP_TIANJIANSHANZHUANG:number = 1719;
		//主城
		static MAP_MAIN_CITY_ID: number = 3;
		static MAP_MAIN_CITY_POSX: number = 119;
		static MAP_MAIN_CITY_POSY: number = 49;
		

		static MAP_YOUMINGGUIJING = 1712
		static MAP_SHIZHIJIADAO = 1713 
		static MAP_DUNHUOERDE = 1714 
		static MAP_DXJINGJICHANG = 1715
		static MAP_JIUZHOUCITYTEN = 1716
		static MAP_CHANGWUMENGJING = 1717
		static MAP_HUANGSHIYA = 1718
		static MAP_TIANJIANSHANZHUANGMISHI = 1720
		static MAP_PENGLAIZHOU = 1721
		static MAP_QINGLONGTAN = 1722
		static MAP_JIULONGGONGZONGTAN =1723
		static MAP_LONGDONG = 1724
		static MAP_HEITIESHENYUAN = 1725
		static MAP_ZUZHUOZHICUN = 1726
		static MAP_LIUFENGDAO = 1727
		static MAP_BAICHENG = 1728
		static MAP_QIXIASHAN = 1729
		static MAP_TIANYUANGU = 1730
		static MAP_TIANDAOSHENGDIAN =1731
		static MAP_MISHI = 1732
		static MAP_JIUGONGSHANZONGTAN = 1733
		static MAP_YOUMOBAO = 1734
		static MAP_QINGLIANGU = 1735
		static MAP_LANHUAMIJING = 1736
		static MAP_JIUZHOUCHENGNOW = 1737 
		static MAP_LIUGUANGCITY = 1738
		static MAP_TIANGUANGZHEN = 1739
		static MAP_JINSHIGU = 1740
		static MAP_LANTIANZHEN = 1741 
		static MAP_JIUHUASHAN = 1742
		static MAP_TUMOLING = 1743
		static MAP_CHANGSHENGDIAN = 1744
		static MAP_CHENSHUISENLIN = 1745
		static MAP_JINGDIZHILAO = 1746
		static MAP_FEINIAOLIN = 1747
		static MAP_HEIFENGGU = 1748
		static MAP_LIULIDAO = 1749
		static MAP_DIGONGMENKOU = 1750
		static MAP_YUANGUYIJI = 1751
		static MAP_DIXIAGONGDIAN = 1752
		static MAP_WANFADIANYIJI = 1753
		static MAP_HUANMOJING = 1754
		static MAP_QIANFENGSHAN = 1755
		static MAP_HEITIESHENYUANTWO = 1756
		static MAP_MIZONGSHAN = 1757
		static MAP_CHUNQIUSHAN = 1758
		static MAP_WANYAOGU = 1759
		static MAP_QIANLONGGU = 1760
		static MAP_QIANLONGKU = 1761
		static MAP_QIANLONGZAIYUAN = 1781
		static MAP_CHUSHENRUHUA = 1782
		static MAP_QUNXIANZHIDIAN = 1783
		static MAP_QIANLONGZAIYUANTWO = 1784
		static MAP_CHUSHENRUHUATWO = 1785
		static MAP_QUNXIANZHIDIANTWO = 1786
		static MAP_KUNLUNONE = 1787
		static MAP_PEGNLAIONE = 1788
		static MAP_KUNLUNTWO = 1789
		static MAP_PEGNLAITWO = 1790
		static MAP_KUNLUNTHREE = 1791
		static MAP_PEGNLAITHREE = 1792
		static MAP_KUNLUNYOUSHENGONE = 1793
		static MAP_PENGLAIYOUSHENGONE = 1794
		static MAP_KUNLUNYOUSHENGTWO = 1795
		static MAP_PENGLAIYOUSHENGTWO = 1796
		static MAP_KUNLUNYOUSHENGTHREE = 1797
		static MAP_PENGLAIYOUSHENGTHREE = 1798
		static MAP_BANGPAIZHAN = 1799
		static MAP_QINGHEDAOONE = 1801
		static MAP_QINGHEDAOTWO = 1802
		static MAP_QINGHEDAOTHREE = 1803
		static MAP_TAOLIULINONE = 1804
		static MAP_TAOLIULINTWO = 1805
		static MAP_TAOLIULINTHREE = 1806
		static MAP_XUANANYIZHANONE = 1807
		static MAP_XUANANYIZHANTWO = 1808
		static MAP_XUANANYIZHANTHREE = 1809
		static MAP_SHUIXIANGXIONE = 1810
		static MAP_SHUIXIANGXITWO = 1811
		static MAP_SHUIXIANGXITHREE = 1812
		static MAP_LINHAIBAISHAONE = 1813
		static MAP_LINHAIBAISHATWO = 1814
		static MAP_LINHAIBAISHATHREe = 1815
		static MAP_NEILONGLINONE = 1816
		static MAP_NEILONGLINTWO = 1817
		static MAP_NEILONGLINTHREE = 1818
		static MAP_SHENGULINONE = 1819
		static MAP_SHENGULINTWO = 1820
		static MAP_SHENGULINTHREE = 1821
		static MAP_HEHUAGUONE = 1822
		static MAP_HEHUAGUTWO  = 1823
		static MAP_HEHUAGUTHREE = 1824
		static MAP_CHUNFENGGUONE = 1825
		static MAP_CHUNFENGGUTWO = 1826
		static MAP_CHUNFENGGUTHREE = 1827
		static MAP_FENGQINGTINGONE = 1828
		static MAP_FENGQINGTINGTHREE = 1829
		static MAP_JUMOZHIDUONE = 1901
		static MAP_JUMOZHIDUTWO  = 1902
		static MAP_ZUZHUOZHITAONE = 1903
		static MAP_ZUZHUOZHITATWO = 1904
		static MAP_ZUDUIFUBENYULIUONE = 1905
		static MAP_ZUDUIFUBENYULIUTWO = 1906
		static MAP_ZUDUIFUBENYULIUTHREE = 1907
		static MAP_ZUDUIFUBENYULIUFOUR = 1908
		static MAP_ZUDUIFUBENYULIUFIVE = 1909
		static MAP_ZUDUIFUBENYULIUSIX = 1910
		static MAP_ZUDUIFUBENYULIUSEVEN = 1911
		static MAP_ZUDUIFUBENYULIUEIGHT = 1912
		static MAP_BINGFENGWANGZUOONE = 1913
		static MAP_BINGFENGWANGZUOTWO = 1914
		static MAP_BINGFENGWANGZUOTHREE = 1915
		static MAP_BINGFENGWANGZUOFOUR = 1916
		static MAP_BINGFENGWANGZUOFIVE = 1917
		static MAP_BINGFENGWANGZUOSIX = 1918
		static MAP_BINGFENGWANGZUOSEVEN = 1919
		static MAP_BINGFENGWANGZUOEIGHT = 1920
		static MAP_BINGFENGWANGZUONINE = 1921
		static MAP_BINGFENGWANGZUOTEN = 1922
		static MAP_BINGFENGWANGZUOEL = 1923
		static MAP_BINGFENGWANGZUOTF = 1924
		static MAP_BINGFENGWANGZUOTH = 1925
		static MAP_BINGFENGWANGZUOFORTH = 1926
		static MAP_BINGFENGWANGZUOFIVETH = 1927
		static MAP_BINGFENGWANGZUOSIXTH = 1928
		static MAP_BINGFENGWANGZUOSEVENTH = 1929
		static MAP_BINGFENGWANGZUOEIGHTTH = 1930
		static MAP_BINGFENGWANGZUONINTTH = 1931
		static MAP_QIANLONGKUONE = 1932
		static MAP_QIANLONGKUTWO = 1933
		static MAP_QIANLONGKUTHREE = 1934
		static MAP_QIANLONGKUFOUR = 1935
		static MAP_QIANLONGKUFIVE = 1936
		static MAP_QIANLONGKUSIX = 1937
		static MAP_QIANLONGKUSEVEN = 1938
		static MAP_QIANLONGKUEIGHT = 1939
		static MAP_QIANLONGKUNINE = 1940
		static MAP_QIANLONGKUTEN = 1941
		static MAP_WULONGKUONE = 1942
		static MAP_WULONGKUTWO = 1943
		static MAP_WULONGKUTHREE = 1944
		static MAP_WULONGKUFOUR = 1945
		static MAP_WULONGKUFIVE = 1946
		static MAP_WULONGKUSIX = 1947
		static MAP_WULONGKUSEVEN = 1948
		static MAP_WULONGKUEIGHT = 1949
		static MAP_WULONGKUNINE = 1950
		static MAP_WULONGKUTEN = 1951
		static MAP_WOLONGPOONE = 1952
		static MAP_WOLONGPOTWO = 1953
		static MAP_WOLONGPOTHREE = 1954
		static MAP_WOLONGPOFOUR = 1955
		static MAP_WOLONGPOFIVE = 1956
		static MAP_WOLONGPOSIX = 1957
		static MAP_WOLONGPOSEVEN = 1958
		static MAP_WOLONGPOEIGHT = 1959
		static MAP_WOLONGPONINE = 1960
		static MAP_WOLONGPOTEN = 1961
		
		static MAP_JUEXIANZHENONE = 1962
		static MAP_JUEXIANZHENTWO = 1963
		static MAP_JUEXIANZHENTHREE = 1964
		static MAP_JUEXIANZHENFOUR = 1965
		static MAP_JUEXIANZHENFIVE = 1966
		static MAP_JUEXIANZHENSIX = 1967
		static MAP_JUEXIANZHENSEVEN = 1968
		static MAP_JUEXIANZHENEIGHT = 1969
		static MAP_JUEXIANZHENNINE = 1970
		static MAP_JUEXIANZHENTEN = 1971
		static MAP_RONGDONG = 1972
		static MAP_JINGSHITAOLIULIN = 1973
		static MAP_YAOHUASHANZHAI = 1974
		static MAP_HUANGANYOULIN = 1975
		static MAP_MODAOJIUDIAN = 1976
		static MAP_WUXINGMIJING = 1977
		static MAP_YINYANGXIANYA = 1978
		static MAP_JITAN = 1979
		static MAP_SHENYUAN = 1980
		static MAP_BAICHENGTWO = 1981
		static MAP_YIDUXUEYUAN = 1982
		static MAP_XIESHOUBAOLEI = 1983
		static MAP_BEIPANZHISHOU = 1984
		static MAP_NAJIAZHIMOU = 1985
		static MAP_BEISHANGMUDI = 1986
		static MAP_NALUHICHENG = 1987
		static MAP_SIWANGZHIGE = 1988
		static MAP_FENSUIYINMOU = 1989
		static MAP_SHIKONGZHILU = 1990
		static MAP_YINGXIONGPINGTAI = 1991
		static MAP_TESTONE = 1992
		static MAP_TESTTWO = 1993
		static MAP_TESTTHREE = 199



		//世界地图
		static MAP_WORLDS: number[] = [1, 0];
		static MAP_WORLD_LEVELS: number[] = [1, 999];

		//pk地图
		static MAP_PKS: number[] = [];
		//全模式pk地图
		static MAP_PK_ALL_MODES: number[] = [];

		constructor() {
			super();
			//更新完毕之后
			this._after_update = this.onUpdate;
		}

		//当对象更新发生时
		private onUpdate(flags: number, mask: UpdateMask, strmask: UpdateMask): void {
			let isNew = flags & core.obj.OBJ_OPT_NEW;
			if (isNew) {
				this.firstUpdate();
			}
			// logd("map info:",this.GetMapID(),this.GetMapState());
		}

		public firstUpdate(): void {
			this._id = this.GetMapID();
		}

		private _id: number = 0;
		get id(): number {
			return this._id;
		}

		//是否在pk地图
		inPkMap(): boolean {
			return MapInfo.MAP_PKS.indexOf(this._id) >= 0;
		}

		//是否在世界地图
		inWorldMap(): boolean {
			return MapInfo.MAP_WORLDS.indexOf(this._id) >= 0;
		}

		//是否在新手村
		inXinShouCun(): boolean {
			return this._id == MapInfo.MAP_XINSHOUCUN;
		}

		//是否在天雷狱
		inTianLeiYu(): boolean {
			return this._id == MapInfo.MAP_TIANLEIYU;
		}

		//是否在云霄殿
		inYunXiaoDian(): boolean {
			return this._id == MapInfo.MAP_YUNXIAODIAN;
		}
		//是否在无量宫
		inWuLiangGong(): boolean {
			return this._id == MapInfo.MAP_WULIANGGONG;
		}
		//是否在苍羽宫
		inCangYuGong(): boolean {
			return this._id == MapInfo.MAP_CANGYUGONG;
		}
		//是否在火云宗
		inHuoYunZong(): boolean {
			return this._id == MapInfo.MAP_HUOYUNZONG;
		}
		//是否在飞雪崖
		inFeiXueYa(): boolean {
			return this._id == MapInfo.MAP_FEIXUEYA;
		}
		//是否在七星观
		inQiXingGuan(): boolean {
			return this._id == MapInfo.MAP_QIXINGGUAN;
		}
		//是否在幽冥殿
		inXiangMoZhai(): boolean {
			return this._id == MapInfo.MAP_YOUMINGDIAN;
		}
		//是否在丹阳观
		inDanYangGuan(): boolean {
			return this._id == MapInfo.MAP_DANYANGGUAN;
		}
		

		//是否在战斗界面
		get inBattle(): boolean {
			return battle.BattleProxy.inBattle;
		}


		//是否在主城 苍玄界
		public inMainCity(): boolean {
			let mapid: number = this.GetMapID();
			return mapid == MapInfo.MAP_MAIN_CITY_ID;
		}
	}
}