module game.object {
    export class ChatItem {
        /**
		* guid
		*/
        private _guid: string;
        /**
         * 名字
         */
        private _name: string;
		/**
		* 类型
		*/
        private _type: number;
        /**
         * 性别
         */
        private _sex: number;
		/**
		* 头像
		*/
        private _head: number;
        /**
         * 头像框
         */
        private _frame: number;
		/**
		* vip等级
		*/
        private _vip: number;
        /**
         * 是否有月卡
         */
        private _isYueKa: boolean;
		/**
		* 内容
		*/
        private _content: string;
        /**
         * 时间
         */
        private _time: number;

        constructor(guid: string, name: string, type: number, sex: number, head: number, frame: number, vip: number, isYueKa: boolean, content: string, time: number) {
            this._guid = guid;
            this._name = name;
            this._type = type;
            this._sex = sex;
            this._head = head;
            this._frame = frame;
            this._vip = vip;
            this._isYueKa = isYueKa;

            //把尖括号过滤掉 且不是弹窗
            if (content && type != GlobalDef.CHAT_TYPE_POPUP && type != GlobalDef.CHAT_TYPE_SYSTEM) {
                content = content.replace(new RegExp(">", "gm"), "");
                content = content.replace(new RegExp("<", "gm"), "");
            }

            this._content = content;
            this._time = time;
        }

        //得到时间字符串
        getTimeStr(time: number): string {
            let date = new Date(time * 1000);
            return this.checkTime(date.getHours()) + ":" + this.checkTime(date.getMinutes());
        }

        //格式化时间
        private checkTime(num: number): string {
            if (num < 0) return "0";
            if (num < 10) {
                return "0" + num;
            } else {
                return num.toString();
            }
        }

        get guid(): string {
            return this._guid;
        }

        get name(): string {
            return this._name;
        }

        get type(): number {
            return this._type;
        }

        set type(value: number) {
            this._type = value;
        }

        get sex(): number {
            return this._sex;
        }

        get head(): number {
            return this._head;
        }

        get frame(): number {
            return this._frame;
        }

        get vip(): number {
            return this._vip;
        }

        get isYueKa(): boolean {
            return this._isYueKa;
        }

        get content(): string {
            return this._content;
        }
        set content(value: string) {
            this._content = value;
        }

        get time(): number {
            return this._time;
        }
    }
}