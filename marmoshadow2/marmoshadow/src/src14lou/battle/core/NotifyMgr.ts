module battle {
    /**
    * 通知管理类
    */
    export class NotifyMgr {
        private static readonly _notify_map:{[key:number]:laya.utils.Handler[]} = {};

        static register(type: NotifyType, caller?: any, method?: Function, args?: Array<any>, once: boolean=false):void {
            const handler = laya.utils.Handler.create(caller, method, args, once);
            if (!handler) {
                return;
            }
            const handlers = NotifyMgr._notify_map[type];
            if (handlers) {
                handlers.push(handler);
            } else {
                NotifyMgr._notify_map[type] = [handler];
            }
        }
        static remove(type: NotifyType, caller?: any, method?: Function):void {
            const handlers = NotifyMgr._notify_map[type];
            if (!handlers) {
                return;
            }
            for (let index = handlers.length-1; index >= 0; index--) {
                const handler = handlers[index];
                if (!handler
                    || (method && caller && handler.caller === caller && handler.method === method)
                    || (caller && handler.caller === caller)
                    || (method && handler.method === method)) {
                    handlers.splice(index, 1);
                }
            }
            if (handlers.length === 0) {
                delete NotifyMgr._notify_map[type];
            }
        }

        static clean(caller:any):void {
            const notify_map = NotifyMgr._notify_map;
            for (const key in notify_map) {
                if (notify_map.hasOwnProperty(key)) {
                    const handlers = notify_map[key];
                    for (let index = handlers.length-1; index >= 0; index--) {
                        const handler = handlers[index];
                        if (handler && handler.caller === caller) {
                            handler.recover();
                            handlers.splice(index, 1);
                        }
                    }
                    if (handlers.length === 0) {
                        delete notify_map[key];
                    }
                }
            }
        }

        static notify(type: NotifyType, ...args:any[]): void {
            const handlers = NotifyMgr._notify_map[type];
            if (!handlers) {
                return;
            }
            for (let index = handlers.length-1; index >= 0; index--) {
                const handler = handlers[index];
                if (!handler) {
                    handlers.splice(index, 1);
                    continue;
                }
                handler.runWith(args);
                if (handler.once) {
                    handlers.splice(index, 1);
                    handler.recover();
                }
            }
            if (handlers.length === 0) {
                delete NotifyMgr._notify_map[type];
            }
        }
    }
}