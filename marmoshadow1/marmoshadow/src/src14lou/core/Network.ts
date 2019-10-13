module core {
    export const EV_CONNECT: number = -100;         //连接事件
    export const EV_CLOSED: number = -200;
    export const EV_ERROR: number = -300;
    export const LOADED_PROTO: number = -400; //加载完成proto
    // 流量信息
    export class FlowInfo {
        codes: Array<number> = [];   // 协议流量信息
        total: number = 0;           // 总流量
        add(optcode: number, msg: any): void {
            if (msg instanceof ArrayBuffer) {
                let len = msg.byteLength;
                this.total += len;
                this.codes[optcode] |= 0;
                this.codes[optcode] += len;
            }
        }
    }

    export class Network extends Laya.Socket {
        static SEND_MSG_NOT_CONNECTED: string = 'SEND_MSG_NOT_CONNECTED';
        private _name: string;
        get name(): string {
            return this._name;
        }
        set name(v: string) {
            this._name = v;
        }

        private _address: string;                 //远程IP:远程端口
        private _port: number;
        private _hanlders: HanlderStruct[][] = [];

        private _sendFlowInfo: FlowInfo;
        private _sendRecordData: any[];
        private _receiveFlowInfo: FlowInfo;
        get sendFlowInfo(): FlowInfo {
            return this._sendFlowInfo;
        }
        get receiveFlowInfo(): FlowInfo {
            return this._receiveFlowInfo;
        }
        get sendRecordData(): number[] {
            return this._sendRecordData;
        }
        private encipher: Encipher;
        // 发包过滤
        private _cmdFilter: Array<number>;
        addCmdFilter(cmd: number): void {
            !this._cmdFilter && (this._cmdFilter = []);
            this._cmdFilter.indexOf(cmd) == -1 && this._cmdFilter.push(cmd);
        }

        removeCmdFilter(cmd: number): void {
            if (!this._cmdFilter) {
                return;
            }
            let idx = this._cmdFilter.indexOf(cmd);
            if (idx != -1) {
                this._cmdFilter.splice(idx, 1);
            }
            !this._cmdFilter.length && (this._cmdFilter = null);
        }

        public static _instance: Network;
        constructor(v: string = "") {
            super();
            Network._instance = this;
            this._name = v;
            //不使用laya.socket提供的解包服务
            this.disableInput = true;
            this.on(LEvent.OPEN, this, this.disptchHanlder, [EV_CONNECT]);
            this.on(LEvent.CLOSE, this, this.duanxian, [EV_CLOSED]);
            this.on(LEvent.ERROR, this, this.disptchHanlder, [EV_ERROR]);
            //this.on(LEvent.MESSAGE, this, this.onMessageReveived);

            this.addHanlder(EV_CONNECT, this, this.sc_conn);
            this.on(LEvent.MESSAGE, this, this.sc_message);
            //this.addHanlder(EV_CONNECT, this, this.sc_message);
            this.ProtoBuf.load("common/proto/ActionCodeProtoc.proto", this.onActionCodeProtoLoaded);
        }
        duanxian(): void {
            this.event(game.modules.setBasics.models.TYPE_LINK_BROKEN_EVENT);
        }
        //开始连接
        connect(): void {
            if (!this.connected) {
                // if (!this._address || !this._port) {
                //     loge("请先设置IP及端口");
                //     return;
                // }
                this.encipher = new Encipher();
                /*let httpsHead = 'https:';
                if (location.href.split('//')[0] == httpsHead) {
                    let url = "wss://" + this._address + ":" + this._port;
                    this.connectByUrl(url);
                }
                else {
                    super.connect(this._address,this._port);
                } */
                this.connectByUrl('ws://localhost:10000/test');
                // this.connectByUrl('ws://192.168.229.2:10000/test');
                
            }
        }
        private ProtoBuf: any = Browser.window.protobuf;
        private sc_conn(): void {
            console.log("socket 连接成功！");
            //game.modules.createrole.models.LoginModel.getInstance().isLinkSuccess = true;
            //this.ProtoBuf.load("res/awesome.proto", this.onAssetsLoaded);
            //this.ProtoBuf.load("common/proto/ActionCodeProtoc.proto", this.onActionCodeProtoLoaded);
            //console.log("sc_conn this", this);

        }
        private onActionCodeProtoLoaded(err: any, root: any): void {
            if (err) {
                throw err;
            }

            //console.log("onActionCodeProtoLoaded this", this);
            //console.log("onActionCodeProtoLoaded root", root);
            Network._instance.protoTypePool.ActionCode = root.lookup("grace.proto.msg.ActionCode");
            Network._instance.protoTypePool.PBMessage = root.lookup("grace.proto.msg.PBMessage");
            console.log("onActionCodeProtoLoaded ActionCode", root.lookup("grace.proto.msg.ActionCode"));
            // Network._instance.connectByUrl(Browser.window.server);
        }
        public protoTypePool: any = {};

        /*private sc_message(data: any): void {
            console.log("\n收到网络消息 socket sc_message:", data);
            if (data instanceof ArrayBuffer) {

                var byte: Byte = new Byte(data);
                //console.log("sc_message byte",byte);
                var uint8Array: Uint8Array = byte.getUint8Array(0, byte.length);
                var pbm = Network._instance.protoTypePool.PBMessage.decode(uint8Array);
                console.log("pbm.actionCode:", pbm.actionCode);
                var actionCode = pbm.actionCode - 786432;
                //console.log("socket pbm:", pbm);
			    let byteArray:ByteArray = new ByteArray();
			    byteArray._writeUint8Array(pbm.data);
                byteArray.position = 0;
			    byteArray.endian = Byte.BIG_ENDIAN;
                //var obj: any = this.readPacket(actionCode, pbm.data);
                var obj: any = this.readPacket(actionCode, byteArray);
                if (obj == null) {
                    //this.disptchHanlder(actionCode, pbm.data)
                    this.disptchHanlder(actionCode, byteArray)
                }
                else {
                    //RspdTempLateClass.read(obj,pbm.data);
                    this.disptchHanlder(actionCode, obj)
                }
            } else if (typeof data == "string") {
                logd("Network:onMessageReveived " + data);
            } else {
                logd("Network:onMessageReveived msg type unknow")
            }
            this.input.clear();

        }*/

        /*public sendMsg(actionCode: any, buffer: any): void {
            console.log("\n发送网络消息 socket sendMsg:", buffer);
            var base = Network._instance.protoTypePool.PBMessage.create(
                {
                    //actionCode: 786432 + actionCode,
                    actionCode: actionCode,
                    sequence: this.sequence,
                    data: buffer
                });

            var buffer1: any = Network._instance.protoTypePool.PBMessage.encode(base).finish();
            console.log("sendTo actionCode content buffer:", actionCode, buffer.length, buffer);
            this.send(buffer1);
            console.log("sendTo actionCode,base,buffer1", actionCode, base, buffer1);
            this.sequence++;
        }*/

        // 是否开启流量统计
        set flowStatistics(v: boolean) {
            if (v) {
                this._sendFlowInfo = new FlowInfo();
                this._receiveFlowInfo = new FlowInfo();
            }
            else {
                this._sendFlowInfo = null;
                this._receiveFlowInfo = null;
            }
        }

        get url(): string {
            return this._socket ? this._socket.url : "";
        }

        //设置远程
        setRemotePoint(addr: string, p: number): void {
            this._address = addr;
            this._port = p;
        }
        private rspdTemplateMap: any = {};
        addRspdTemplate(optcode: number, rspdTemplate: any) {
            this.rspdTemplateMap[optcode] = rspdTemplate;
        }

        // 增加网络包处理器
        addHanlder(optcode: number, caller: any, method: Function, args?: Array<any>) {
            let list: HanlderStruct[] = this._hanlders[optcode];
            if (list == null) {
                list = [];
                this._hanlders[optcode] = list;
            }
            for (let struct of list) {
                if (struct.caller == caller && struct.method == method) {
                    // 有可能同一帧里先删除了后添加
                    struct.dispose = false;
                    return;
                }
            }
            let struct = ObjectPools.malloc(HanlderStruct) as HanlderStruct;
            struct.caller = caller;
            struct.method = method;
            struct.args = args;
            list.push(struct);
        }

        private disptchHanlder(optcode: number, pkt: any) {
            let list: HanlderStruct[] = this._hanlders[optcode];
            if (list == null) {
                return;
            }
            for (let i = 0; i < list.length; i++) {
                let struct = list[i];
                let dispose = struct.dispose;
                if (!dispose) {
                    let position;
                    if (pkt instanceof ByteArray) {
                        position = pkt.position;
                    }
                    dispose = struct.method.apply(struct.caller, [optcode, pkt].concat(struct.args));
                    position && (pkt.position = position);
                }
                if (dispose) {
                    list.splice(i, 1);
                    ObjectPools.free(struct);
                    i--;
                }
            }
        }
        // 移除网络包处理器
        removeHanlder(optcode: number, caller: any, method: Function) {
            let list: HanlderStruct[] = this._hanlders[optcode];
            if (list == null) {
                return;
            }
            let len = list.length;
            for (let i = 0; i < len; i++) {
                let struct = list[i];
                if (struct.caller == caller && struct.method == method) {
                    // 标记为释放
                    struct.dispose = true;
                }
            }
        }

        private sequence = 0;
        public sendMsg(actionCode: any, buffer: any): void {
            console.log("\n发送网络消息 socket sendMsg:", actionCode, buffer.length);
            /*var base = Network._instance.protoTypePool.PBMessage.create(
                {
                    //actionCode: 786432 + actionCode,
                    actionCode: actionCode,
                    sequence: this.sequence,
                    data: buffer
                });
            //console.log("sendTo buffer", buffer);

            var buffer1: any = Network._instance.protoTypePool.PBMessage.encode(base).finish();
            console.log("sendTo actionCode content buffer:", actionCode, buffer.length, buffer);
            this.send(buffer1);
            console.log("sendTo actionCode,base,buffer1", actionCode, base, buffer1);*/
            var actionCodeUint8Array: Uint8Array = ByteArrayUtils.compact_uint32(actionCode);
            var sizeUint8Array: Uint8Array = ByteArrayUtils.compact_uint32(buffer.length);
            let byteArray: ByteArray = new ByteArray();
            byteArray.position = 0;

            //byteArray.writeInt32(actionCode);
            //byteArray.writeInt32(buffer.length);
            byteArray.writeUint8Array(actionCodeUint8Array);
            byteArray.writeUint8Array(sizeUint8Array);
            byteArray.writeBytes(buffer);
            this.send(byteArray.buffer);
            console.log("sendTo actionCode content byteArray:", actionCode, byteArray.length);
            this.sequence++;
        }
        private sc_message(data: any): void {
            console.log("\n收到网络消息 socket sc_message");
            if (data instanceof ArrayBuffer) {

                var byte: Byte = new Byte(data);
                //byte.writeArrayBuffer
                //console.log("sc_message byte",byte);
                var uint8Array: Uint8Array = byte.getUint8Array(0, byte.length);
                var pbm = Network._instance.protoTypePool.PBMessage.decode(uint8Array);
                console.log("pbm.actionCode:", pbm.actionCode);
                var actionCode: number = pbm.actionCode;
                console.log("socket pbm:", actionCode);
                let byteArray: ByteArray = new ByteArray();
                byteArray.writeUint8Array(pbm.data);
                byteArray.position = 0;
                byteArray.endian = Byte.BIG_ENDIAN;

                //var obj: any = this.readPacket(actionCode, pbm.data);
                var obj: any = hanlder.ResponderProtocols.getInstance().readPacket(actionCode, byteArray);
                if (obj == null) {
                    //this.disptchHanlder(actionCode, pbm.data)
                    this.disptchHanlder(actionCode, byteArray)
                }
                else {
                    //RspdTempLateClass.read(obj,pbm.data);
                    this.disptchHanlder(actionCode, obj)
                }
            } else if (typeof data == "string") {
                logd("Network:onMessageReveived " + data);
            } else {
                logd("Network:onMessageReveived msg type unknow")
            }
            this.input.clear();

        }
    }
}
