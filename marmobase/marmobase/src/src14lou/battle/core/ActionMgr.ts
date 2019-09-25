module battle {
    export class BaseAction {
        private _base_delay:number;
        constructor(protected battle:Battle, ...args:any[]){
            this._base_delay = 0;
            this.onInit(...args);
        }
        isEnd():boolean {return this.is_start;}
        protected is_start:boolean = false;
        logic(delay:number):void {
            if (this._base_delay > 0) {
                this._base_delay -= delay;
                return;
            }
            if (!this.is_start) {
                this.is_start = true;
                this.onStart();
            }
            if (this._base_delay > 0) {
                this._base_delay -= delay;
                return;
            }
            this.onLogic(delay);
        }
        onDestroy():void {}

        protected onInit(...args:any[]):void {}
        protected onStart():void {}
        protected onLogic(delay:number):void {}
        public setDelayTicks(delay:number):void{
            this._base_delay += delay;
        }
    }

    export class ActionMgr extends BaseAction {
        /** 按队列执行, 只有前面任务执行完毕才会启动下一任务 */
        private _queue:BaseAction[][];
        /** 同时执行 */
        private _actions:BaseAction[];
        protected onInit(...args:any[]):void {
            this._actions = [];
            this._queue = [];
        }

        public add(...actions:BaseAction[]):void {
            this._actions.push(...actions);
        }
        public addQueue(...actions:BaseAction[]):void {
            this._queue.push(actions);
        }
        public remove(action:BaseAction):void {
            let exist = false;
            for (let i = 0; i < this._actions.length; i++) {
                const tem = this._actions[i];
                if (tem === action) {
                    exist = true;
                    tem.onDestroy();
                    this._actions.splice(i, 1);
                    break;
                }
            }
            if (exist) {
                return;
            }
            for (let index = 0; index < this._queue.length; index++) {
                const actions = this._queue[index];
                exist = false;
                for (let i = 0; i < actions.length; i++) {
                    const tem = actions[i];
                    if (tem === action) {
                        exist = true;
                        tem.onDestroy();
                        actions.splice(i, 1);
                        break;
                    }
                }
                if (actions.length === 0) {
                    this._queue.splice(index, 1);
                }
                if (exist) {
                    break;
                }
            }
        }
        public cleanAll():void {
            this._queue.splice(0, this._queue.length);
        }

        isEnd():boolean {
            return this._actions.length === 0 && this._queue.length === 0;
        }

        protected onLogic(delay:number):void {
            this._runActions(this._actions, delay);

            if (this._queue.length === 0) {
                return;
            }
            const actions = this._queue[0];
            this._runActions(actions, delay);
            if (actions.length === 0) {
                this._queue.shift();
            }
        }
        private _runActions(actions:BaseAction[], delay:number):void {
            const remove_list:number[] = [];
            for (let i = 0; i < actions.length; i++) {
                const element = actions[i];
                element.logic(delay);
                if (element.isEnd()) {
                    element.onDestroy();
                    remove_list.push(i);
                }
            }
            for (let i = remove_list.length-1; i >= 0; i--) {
                const index = remove_list[i];
                actions.splice(index, 1);
            }
        }
    }
}