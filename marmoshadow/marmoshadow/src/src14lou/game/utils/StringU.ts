/**
* name 
*/
module game.utils {

	export class StringU {

		public static substitute(str: string, ...rest): string {
			if (str == null) return '';

			// Replace all of the parameters in the msg string.
			var len: number = rest.length;
			var args: Array<string>;
			if (len == 1 &&   rest ) {
				args = rest[0];
				len = args.length;
			}
			else {
				args = rest;
			}

			for (var i: number = 0; i < len; i++) {
				str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
			}

			return str;
		}

        public static substitute1(str: string, ...rest): string {
            if(!str) return "";
            var args: string[];
            if (rest.length == 1 &&   rest[0] == "array") args = rest[0];
            else args = rest;
            if(!args.length) return str;
            let reg:RegExp = /\{\d+\}/;
            let value:string, indexStr:string;
            let index:number, right:number;
            value = str;
            str = "";
            while(value.length){
                index = value.search(reg);
                if(index == -1) break;
                //左
                str += value.substr(0,index);
                //匹配
                right = value.indexOf("}",index);
                indexStr = value.slice(index, right+1);
                index = Number(indexStr.slice(1, -1));
                if(index < args.length) str += args[index];
                else str += indexStr;
                //余
                value = value.substr(right+1);
            }
			str += value;
            return str;
        }

		/**
		 * 字符串是否为空 
		 * @param str 字符串
		 * @return 
		 * 
		 */
		public static isEmpty(str: string): boolean {
			return str == null || str.length == 0;
		}

		//去左右空格;  
		public static trim(char: string): string {
			if (char == null) {
				return null;
			}
			return this.rtrim(this.ltrim(char));
		}

		//去左空格;   
		public static ltrim(char: string): string {
			if (char == null) {
				return null;
			}
			var pattern: RegExp = /^\s*/;
			return char.replace(pattern, "");
		}

		//去右空格;  
		public static rtrim(char: string): string {
			if (char == null) {
				return null;
			}
			var pattern: RegExp = /\s*$/;
			return char.replace(pattern, "");
		}

		//是否为前缀字符串;  
		public static beginsWith(char: string, prefix: string): boolean {
			return (prefix == char.substring(0, prefix.length));
		}

		//是否为后缀字符串;  
		public static endsWith(char: string, suffix: string): boolean {
			return (suffix == char.substring(char.length - suffix.length));
		}


		//获得查询参数
		static getParameter(url: string, paras: string) {
			if (!url || url.length == 0) return "";
			let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
			let paraObj = {}
			for (let i = 0; i < paraString.length; i++) {
				let j = paraString[i];
				paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
			}
			var returnValue = paraObj[paras.toLowerCase()];
			if (!returnValue || typeof (returnValue) == "undefined") {
				return "";
			} else {
				return returnValue;
			}
		}

		static parameterToObj(url: string) {
			let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
			let paraObj = {}
			for (let i = 0; i < paraString.length; i++) {
				let j = paraString[i];
				paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
			}
			return paraObj
		}

		/**
		 * 字符串补位，补充左边 
		 * @param	str 需要补充的字符串
		 * @param   char 需要补充的字符串
		 * @param	len 最终长度
		 * @return
		 */
		public static paddingLeft(str: string, char: string, len: number): string {
			var l: number = len - str.length;
			if (l <= 0) {
				return str;
			}

			str = String(str);
			//循环填充
			for (var i: number = 0; i < l; i++) {
				str = char + str;
			}
			return str;
		}

		private static _tempBytesArray: ByteArray;
		// 读取压缩文本
		static readZlibData(data: ByteArray): string {
			let length: number = data.readUnsignedInt();
			if (!this._tempBytesArray) {
				this._tempBytesArray = new ByteArray();
			}
			let byteArray: ByteArray = this._tempBytesArray;
			byteArray.length = length;
			data.readBytes(byteArray, 0, length);
			byteArray.uncompress();
			let str = byteArray.readUTFBytes(byteArray.length);
			byteArray.clear();
			return str;
		}

		/**
		 * 通过时间戳的差值获取时间格式
		 * @param diff 2个时间戳的差值
		 * @param format 获得结果的格式 （例如：yyyy-MM-dd hh:mm:ss）
		 */
		static formatDiff(diff: number, format: string): string {
			if (!diff) return null;
			let time = diff / 1000;
			let year = Math.floor(time / 86400 / 365);
			time = time % (86400 * 365);
			let month = Math.floor(time / 86400 / 30);
			time = time % (86400 * 30);
			let day = Math.floor(time / 86400);
			time = time % 86400;
			let hour = Math.floor(time / 3600);
			time = time % 3600;
			let minute = Math.floor(time / 60);
			time = time % 60;
			let second = Math.floor(time);
			let o = {
				"y+": year,
				"M+": month,
				"d+": day,
				"h+": hour,
				"m+": minute,
				"s+": second
			};

			return this.format(o, format);
		}

		/**
		 * 将日期格式化
		 * @param date 日期对象
		 * @param format 获得结果的格式 （例如：yyyy-MM-dd hh:mm:ss）
		 */
		static formatDate(date: Date, format: string): string {
			if (!date) return null;
			let o = {
				"y+": date.getFullYear(),
				"M+": date.getMonth() + 1,
				"d+": date.getDate(),
				"h+": date.getHours(),
				"m+": date.getMinutes(),
				"s+": date.getSeconds(),
				"q+": Math.floor((date.getMonth() + 3) / 3),
				"S+": date.getMilliseconds()
			};
			return this.format(o, format);
		}

		static format(o: any, format: string): string {
			if (format == "") {
				if (o["d+"] >= 1) {
					format = "dd天hh小时";
				} else if (o["d+"] < 1 && o["h+"] > 1) {
					format = "hh:mm分";
				} else {
					format = "mm:ss秒";
				}
			}
			for (let k in o)
				if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return format;
		}

		constructor() {

		}
	}
}