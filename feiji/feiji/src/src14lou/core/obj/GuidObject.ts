module core.obj {

	export class GuidObject extends SyncEvent {
		/**
		 * 用于监听下标变化 
		 */
		private _events_value: NetEventDispatcher;
		private _int_binlog_array: Array<BinLogStru> = new Array;
		/**
		 * 用于监听字符下标变化
		 */
		private _events_str_values: NetEventDispatcher;
		private _str_binlog_array: Array<BinLogStru> = new Array;
		/**
		 * 用于触发多下标单回调的情况 
		 */
		private _events_mask: NetEventDispatcher;
		/**
		 * 用于事件回调
		 */
		private _events_callback: NetEventDispatcher;
		/*整形下标长度*/
		protected _uint32_values_len: number = 0;
		//将所有
		//protected _uint32_values:Array<number> = new Array;
		protected _uint32_values_buffer: DataView;
		/*字符串下标长度*/
		protected _str_values_len: number = 0;
		//字符串下标值
		protected _str_values: Array<string> = new Array;

		//对象的唯一ID
		protected _guid: string = "";
		protected _u_guid: number = 0;
		/**
		 * 从模式下更新事件触发后产生
		 * 回调格式  this._after_update(obj:GuidObject,flags:number,intMask:UpdateMask,strMask:UpdateMask):void
		 */
		protected _after_update: Function;

		private static addListens_mask: UpdateMask = new UpdateMask;
		private static tmpIntMask: UpdateMask = new UpdateMask;
		private static tmpStrMask: UpdateMask = new UpdateMask;

		//临时变量,每次读取需要使用的临时变量
		private _tmpBinlog: BinLogStru = new BinLogStru();

		//记录下标更新变化次数
		public fieldChangeData:any;

		public get guid(): string {
			return this._guid;
		}

		public set guid(s: string) {
			this._guid = s;
		}

		public get oid(): number {
			return this._u_guid;
		}

		public set oid(g: number) {
			this._u_guid = g;
		}
		public constructor() {
			super();
			this._events_value = new NetEventDispatcher();
			this._events_str_values = new NetEventDispatcher();
			this._events_mask = new NetEventDispatcher(NetEventDispatcher.KEY_TYPE_INT_MASK);
			this._events_callback = new NetEventDispatcher();

			this._uint32_values_buffer = new DataView(new ArrayBuffer(0));


		}

		//开启下标计数
		set fieldCountOpen(v:boolean){
			if(v){
				this.fieldChangeData = new Object()
			}
			else{
				this.fieldChangeData = null;
			}
		}

		/**
		 * 重置整个对象,下标清零 
		 */
		public Reset(): void {
			this._events_value.Clear();
			this._events_str_values.Clear();
			this._events_callback.Clear();
			this.clearValues();
		}


		/*清理下标*/

		private clearValues(): void {
			this._uint32_values_len = 0;
			//this._uint32_values.length = this._uint32_values_len;	
			this._uint32_values_buffer = new DataView(new ArrayBuffer(0));
			this._str_values_len = 0;
			this._str_values.length = this._str_values_len;
		}


		protected checkIntSize(index: number): void {
			var flag: boolean = false;
			while (index >= this._uint32_values_len) {
				//以8的倍数扩张
				this._uint32_values_len += 8;
				flag = true;
				//this._uint32_values.length = this._uint32_values_len;
			}
			if (flag) {
				//this._uint32_values_buffer = new DataView(new ArrayBuffer(this._uint32_values_len << 2));

				var tmp: Uint8Array = new Uint8Array(new ArrayBuffer(this._uint32_values_len << 2));
				tmp.set(new Uint8Array(this._uint32_values_buffer.buffer, 0, this._uint32_values_buffer.buffer.byteLength));
				this._uint32_values_buffer = new DataView(tmp.buffer);
			}

		}


		protected checkStrSize(index: number): void {
			while (index >= this._str_values_len) {
				//以8的倍数扩张
				this._str_values_len += 8;
				this._str_values.length = this._str_values_len;
			}
		}

		private OnEventSyncBinLog(binlog: BinLogStru): void {
			if (this._after_update) {
				if (binlog.typ == SyncEvent.TYPE_STRING) {
					GuidObject.tmpStrMask.SetBit(binlog.index);
				} else {
					GuidObject.tmpIntMask.SetBit(binlog.index);
				}
			}


			//如果是从模式的原子操作则触发回调
			if (binlog.atomic_opt) {
				this._events_callback.DispatchInt(binlog.callback_idx, binlog);
			} else if (binlog.typ == SyncEvent.TYPE_STRING) {
				this._events_str_values.DispatchInt(binlog.index, binlog);
			} else {
				this._events_value.DispatchInt(binlog.index, binlog);
			}
		}

		/**
		 * 监听对象在下标变化
		 * @param index 下标值
		 * @param callback 回调格式function(binlog:BinLogStru):void
		 */
		public AddListen(index: number, caller: any, callback: Function): void {

			this._events_value.AddListenInt(index, caller, callback);
		}

		/**
		 *  监听对象在下标变化
		 * @param baseIndex 下标基础
		 * @param callback 回调指针
		 * @param arg 下标基础之后的列表
		 */
		public AddListens(baseIndex: number, caller: any, callback: Function, ...arg): void {
			GuidObject.addListens_mask.Clear();
			for (var i: number = 0; i < arg.length; i++)
				GuidObject.addListens_mask.SetBit(baseIndex + arg[i]);

			this._events_mask.AddListenIntMask(GuidObject.addListens_mask, caller, callback);
		}

		/**
		 *  监听对象在下标变化(一段下标)
		 * @param baseIndex 下标基础
		 * @param callback 回调指针
		 * @param arg 下标基础之后的列表
		 */
		public AddListensSeq(beginIndex: number, endIndex: number, caller: any, callback: Function): void {
			GuidObject.addListens_mask.Clear();
			for (var i: number = beginIndex; i <= endIndex; i++)
				GuidObject.addListens_mask.SetBit(i);

			this._events_mask.AddListenIntMask(GuidObject.addListens_mask, caller, callback);
		}

		/**
		 * 移除监听对象在下标变化
		 * @param index 下标值
		 * @param callback 回调格式function(binlog:BinLogStru):void
		 */
		public removeListene(index: number, caller: any, callback: Function = null): void {
			this._events_value.removeListenerInt(index, caller, callback);
		}

		/**
		 *  移除监听对象在下标变化，列表集合
		 * @param baseIndex 下标基础
		 * @param callback 回调指针
		 * @param arg 下标基础之后的列表
		 */
		public removeListenes(baseIndex: number, caller: any, callback: Function = null, ...arg): void {
			GuidObject.addListens_mask.Clear();
			for (var i: number = 0; i < arg.length; i++)
				GuidObject.addListens_mask.SetBit(baseIndex + arg[i]);

			this._events_mask.removeListenerUpdateMask(GuidObject.addListens_mask, caller, callback);
		}

		/**
		 *  移除监听对象在下标变化(一段下标)
		 * @param baseIndex 下标基础
		 * @param callback 回调指针
		 * @param arg 下标基础之后的列表
		 */
		public removeListenesSeq(beginIndex: number, endIndex: number, caller: any = null, callback: Function = null): void {
			GuidObject.addListens_mask.Clear();
			for (var i: number = beginIndex; i <= endIndex; i++)
				GuidObject.addListens_mask.SetBit(i);

			this._events_mask.removeListenerUpdateMask(GuidObject.addListens_mask, caller, callback);
		}

		/**
		 * 监听对象在下标变化
		 * @param index 下标值
		 * @param callback 回调格式function(binlog:BinLogStru):void
		 */
		public AddListenString(index: number, caller: any, callback: Function): void {
			this._events_str_values.AddListenInt(index, caller, callback);
		}

		/**
		 * 移除监听对象在下标变化
		 * @param index 下标值
		 * @param callback 回调格式function(binlog:BinLogStru):void
		 */
		public removeListeneString(index: number, caller: any = null, callback: Function = null): void {
			this._events_str_values.removeListenerInt(index, caller, callback);
		}


		public GetDouble(index: number): number {
			if (index + 1 < this._uint32_values_len)
				return this._uint32_values_buffer.getFloat64(index << 2, true);
			//return SyncEvent.GetDoubleValue(this._uint32_values,index);
			return 0;
		}


		public GetUInt32(index: number): number {
			if (index < this._uint32_values_len)
				return this._uint32_values_buffer.getUint32(index << 2, true);
			//return this._uint32_values[index];
			return 0;
		}


		public GetInt32(index: number): number {
			if (index < this._uint32_values_len)
				return this._uint32_values_buffer.getInt32(index << 2, true);
			//return (this._uint32_values[index] - 0xFFFFFFFF) - 1;
			return 0;
		}


		public GetUInt16(index: number, offset: number): number {
			if (index < this._uint32_values_len)
				return this._uint32_values_buffer.getUint16((index << 2) + (offset << 1), true);
			//return SyncEvent.GetUInt16Value(this._uint32_values[index], offset);
			return 0;
		}


		public GetInt16(index: number, offset: number): number {
			if (index < this._uint32_values_len)
				return this._uint32_values_buffer.getInt16((index << 2) + (offset << 1), true);
			//return SyncEvent.GetInt16Value(this._uint32_values[index],offset);
			return 0;
		}


		public GetFloat(index: number): number {
			if (index < this._uint32_values_len)
				return this._uint32_values_buffer.getFloat32(index << 2, true);
			//return SyncEvent.GetFloatValue(this._uint32_values[index]);
			return 0;
		}


		public GetByte(index: number, offset: number): number {
			if (index < this._uint32_values_len)
				return this._uint32_values_buffer.getUint8((index << 2) + offset);
			//return SyncEvent.GetByteValue(this._uint32_values[index], offset);
			return 0;
		}

		public GetUInt8(index: number, offset: number): number {
			if (index < this._uint32_values_len)
				return this._uint32_values_buffer.getUint8((index << 2) + offset);
			//return SyncEvent.GetByteValue(this._uint32_values[index], offset);
			return 0;
		}

		public GetBit(index: number, offset: number): boolean {
			index = index + (offset >> 5);
			if (index < this._uint32_values_len)
				return (Boolean)((this._uint32_values_buffer.getUint32(index << 2, true) >> (offset & 31)) & 1);
			//return (Boolean)(this._uint32_values[index] >> (offset&31) & 1);
			return false;
		}

		public SetBit(index: number, offset: number, flag: boolean): void {
			var old: number = this._uint32_values_buffer.getUint32(index << 2, true);
			old = old & (0xFFFFFFFF ^ (0x1 << offset)) | ((flag ? 1 : 0) << offset);
			this._uint32_values_buffer.setUint32(index << 2, old, true);
		}


		public GetStr(index: number): string {
			if (index < this._str_values_len)
				return this._str_values[index];
			return "";
		}

		/////////////////////////////////////////////////////////////////////
		//以下为下标操作相关		
		/////////////////////////////////////////////////////////////////////
		public SetDouble(index: number, value: number): void {
			//如果空间不够就自动增长
			this.checkIntSize(index + 1);
			//SyncEvent.SetDoubleValue(this._uint32_values, index, value);
			this._uint32_values_buffer.setFloat64(index << 2, value, true);
		}

		public AddDouble(index: number, value: number): void {
			//如果空间不够就自动增长
			this.checkIntSize(index + 1);
			//var d: number = SyncEvent.GetDoubleValue(this._uint32_values, index);
			//var d: number = this.GetDouble(index);
			//d += value;
			//SyncEvent.SetDoubleValue(this._uint32_values, index, d);
			this.SetDouble(index, this.GetDouble(index) + value);
		}

		public SubDouble(index: number, value: number): void {
			//如果空间不够就自动增长
			this.checkIntSize(index + 1);
			//var d: number = SyncEvent.GetDoubleValue(this._uint32_values, index);
			//d -= value;
			//SyncEvent.SetDoubleValue(this._uint32_values, index, d);
			this.SetDouble(index, this.GetDouble(index) - value);
		}

		public SetUInt32(index: number, value: number): void {
			//如果空间不够就自动增长
			this.checkIntSize(index);
			//this._uint32_values[index] = value;
			this._uint32_values_buffer.setUint32(index << 2, value, true);

			//计数
			// if(this.fieldChangeData){
			// 	let key:string = "int_"+index;
			// 	this.fieldChangeData[key] = this.fieldChangeData[key]? this.fieldChangeData[key] + 1 : 1;
			// }
		}

		public AddUInt32(index: number, value: number): void {
			//取出数据 并执行加法运算
			//this._uint32_values[index] += value;
			this.SetUInt32(index, this.GetUInt32(index) + value);
		}

		public SubUInt32(index: number, value: number): void {
			//取出数据 并执行减法运算
			//this._uint32_values[index] -= value;
			this.SetUInt32(index, this.GetUInt32(index) - value);
		}

		public SetInt32(index: number, value: number): void {
			//如果空间不够就自动增长
			this.checkIntSize(index);
			//this._uint32_values[index] = SyncEvent.SetInt32Value(value);
			this._uint32_values_buffer.setInt32(index << 2, value, true);
		}

		public AddInt32(index: number, value: number): void {
			//取出数据 并执行加法运算
			//var v: number = this.GetInt32(index);
			//v += value;
			//this._uint32_values[index] = SyncEvent.SetInt32Value(v);
			this.SetInt32(index, this.GetInt32(index) + value);
		}

		public SubInt32(index: number, value: number): void {
			//取出数据 并执行减法运算
			//var v: number = this.GetInt32(index);
			//v -= value;
			//this._uint32_values[index] = SyncEvent.SetInt32Value(v);
			this.SetInt32(index, this.GetInt32(index) - value);
		}

		public SetUInt16(index: number, offset: number, value: number): void {
			//如果空间不够就自动增长
			this.checkIntSize(index);
			//this._uint32_values[index] = SyncEvent.SetUInt16Value(this._uint32_values[index], value, offset);
			this._uint32_values_buffer.setUint16((index << 2) + (offset << 1), value, true);
		}

		public AddUInt16(index: number, offset: number, value: number): void {
			//取出数据 并执行加法运算
			this.checkIntSize(index);
			//this._uint32_values[index] = SyncEvent.SetUInt16Value(this._uint32_values[index], this.GetUInt16(index, offset) + value, offset);
			this.SetUInt16(index, offset, this.GetUInt16(index, offset) + value);
		}

		public SubUInt16(index: number, offset: number, value: number): void {
			this.checkIntSize(index);
			//取出数据 并执行加法运算			
			//this._uint32_values[index] = SyncEvent.SetUInt16Value(this._uint32_values[index], this.GetUInt16(index, offset) - value, offset);
			this.SetUInt16(index, offset, this.GetUInt16(index, offset) - value);
		}

		public SetInt16(index: number, offset: number, value: number): void {
			//如果空间不够就自动增长
			this.checkIntSize(index);
			// this._uint32_values[index] = SyncEvent.SetInt16Value(this._uint32_values[index], value, offset);
			this._uint32_values_buffer.setInt16((index << 2) + (offset << 1), value, true);
		}

		public AddInt16(index: number, offset: number, value: number): void {
			//取出数据 并执行加法运算
			//this.checkIntSize(index);
			//var v: number = SyncEvent.GetInt16Value(this._uint32_values[index], offset);
			//v += value;
			//this._uint32_values[index] = SyncEvent.SetInt16Value(this._uint32_values[index], v, offset);
			this.SetInt16(index, offset, this.GetInt16(index, offset) + value);
		}

		public SubInt16(index: number, offset: number, value: number): void {
			//取出数据 并执行加法运算
			//var v: number = SyncEvent.GetInt16Value(this._uint32_values[index], offset);
			//v -= value;
			//this._uint32_values[index] = SyncEvent.SetInt16Value(this._uint32_values[index], v, offset);
			this.SetInt16(index, offset, this.GetInt16(index, offset) - value);
		}

		public SetFloat(index: number, v: number): void {
			//如果空间不够就自动增长			
			this.checkIntSize(index);
			//this._uint32_values[index] = SyncEvent.SetFloatValue(v);
			this._uint32_values_buffer.setFloat32(index << 2, v, true);
		}

		public SetByte(index: number, offset: number, value: number): void {
			//如果空间不够就自动增长
			this.checkIntSize(index);
			//this._uint32_values[index] = SyncEvent.SetByteValue(this._uint32_values[index], value, offset);
			this._uint32_values_buffer.setInt8((index << 2) + offset, value);
		}

		public AddByte(index: number, offset: number, value: number): void {
			//this.checkIntSize(index);
			//var v: number = SyncEvent.GetByteValue(this._uint32_values[index], offset);
			//v += value;
			//this._uint32_values[index] = SyncEvent.SetByteValue(this._uint32_values[index], v, offset);
			this.SetByte(index, offset, this.GetByte(index, offset) + value);
		}

		public SubByte(index: number, offset: number, value: number): void {
			//this.checkIntSize(index);
			//var v: number = SyncEvent.GetByteValue(this._uint32_values[index], offset);
			//v -= value;
			//this._uint32_values[index] = SyncEvent.SetByteValue(this._uint32_values[index], v, offset);
			this.SetByte(index, offset, this.GetByte(index, offset) - value);
		}

		public SetStr(index: number, val: string): void {
			this.checkStrSize(index);
			this._str_values[index] = val;

			//计数
			// if(this.fieldChangeData){
			// 	let key:string = "string_"+index;
			// 	this.fieldChangeData[key] = this.fieldChangeData[key]? this.fieldChangeData[key] + 1 : 1;
			// }
		}


		///////////////////////////////////////////////////////////////////////////////////////////
		//以下为对象传输相关
		///////////////////////////////////////////////////////////////////////////////////////////	
		private ReadValues(mask: UpdateMask, bytes: ByteArray, isNew: Boolean): Boolean {
			var length: number = mask.GetCount();
			for (var i: number = 0; i < length; i++) {
				if (mask.GetBit(i)) {
					this.checkIntSize(i);
					//从模式需要抛出事件
					var binlog: BinLogStru = !isNew ? BinLogStru.malloc() : null;
					if (binlog) {
						binlog.typ = SyncEvent.TYPE_UINT32;
						binlog.index = i;
						binlog.old_value = this.GetUInt32(i);
						//binlog.old_value = this._uint32_values[i];
					}
					var __i: number = bytes.readUnsignedInt();
					this.SetUInt32(i, __i);
					//this._uint32_values[i] = bytes.readUnsignedInt();

					if (binlog) {
						binlog.value = this.GetUInt32(i);

						// this._events_value.DispatchInt(binlog.index, binlog);
						// BinLogStru.free(binlog);
						this.AddBinlogStru(this._int_binlog_array, binlog);

					}
				}
			}
			return true;
		}

		private ReadStringValues(mask: UpdateMask, bytes: ByteArray, isNew: Boolean): Boolean {
			var length: number = mask.GetCount();
			for (var i: number = 0; i < length; i++) {
				if (mask.GetBit(i)) {
					//这样的性能并不好，但是可以节约内存，而且字符下标的用途比较少
					this.checkStrSize(i);
					//从模式需要抛出事件
					var binlog: BinLogStru = !isNew ? BinLogStru.malloc() : null;
					if (binlog) {
						binlog.index = i;
						binlog.typ = SyncEvent.TYPE_STRING;
						binlog.old_str = this._str_values[i];
					}

					this._str_values[i] = bytes.readUTF();

					if (binlog) {
						binlog.str = this._str_values[i];
						// this._events_str_values.DispatchInt(binlog.index, binlog);
						// BinLogStru.free(binlog);					
						this.AddBinlogStru(this._str_binlog_array, binlog);
					}
				}
			}
			return true;
		}

		/**
		 * 数字下标创建包掩码
		 * @param mask
		 */
		private GetCreateMask(mask: UpdateMask): void {
			mask.Clear();
			for (var i: number = 0; i < this._uint32_values_len; i++) {
				//如果该下标不等于0则需要下发								
				//if(this._uint32_values[i]) 
				if (this.GetUInt32(i))
					mask.SetBit(i);
			}
		}

		/**
		 * 字符串创建包掩码 
		 * @param mask
		 */
		private GetCreateStringMask(mask: UpdateMask): void {
			mask.Clear();
			for (var i: number = 0; i < this._str_values_len; i++) {
				if (this._str_values[i] && this._str_values[i].length > 0)
					mask.SetBit(i);
			}
		}

		private ApplyAtomicBinLog(binlog: BinLogStru): void {
			//如果原子操作类型等于成功或者失败则执行回调
			if (binlog.atomic_opt == SyncEvent.ATOMIC_OPT_RESULT_FAILED || binlog.atomic_opt == SyncEvent.ATOMIC_OPT_RESULT_OK) {
				this._events_callback.DispatchInt(binlog.callback_idx, binlog);
				return;
			}

			//字符串分支
			if (binlog._typ == SyncEvent.TYPE_STRING) {
				//如果越界了就扩张
				this.checkStrSize(binlog._index);
				//如果不等就操作失败
				if (binlog._old_value_str != this._str_values[binlog._index]) {
					binlog._old_value_str = binlog._value_str;
					binlog._value_str = this._str_values[binlog._index];
					binlog._atomic_opt = SyncEvent.ATOMIC_OPT_RESULT_FAILED;
				} else {
					binlog._atomic_opt = SyncEvent.ATOMIC_OPT_RESULT_OK;

					//应用完后记录一下准备回去了
					this.ApplyBinLog(binlog);
				}
				return;
			}

			//其他类型,目前仅仅支持uint32/int32类型
			//校验长度越界就扩张
			this.checkIntSize(binlog._index);

			//读取u32进行比较			
			//var cur_val:number = this._uint32_values[binlog.index];
			var cur_val: number = this.GetUInt32(binlog.index);
			if (binlog.old_value != cur_val) {
				binlog.old_value = binlog.value;
				binlog.value = cur_val;
				binlog._atomic_opt = SyncEvent.ATOMIC_OPT_RESULT_FAILED;
			} else {
				binlog._atomic_opt = SyncEvent.ATOMIC_OPT_RESULT_OK;

				//应用完后记录一下准备回去了
				this.ApplyBinLog(binlog);
			}
		}

		/**
		 * 将binlog的操作实施到对象，并且如果就主模式，转换binlog得到 
		 * 这个函数会把转
		 * @param binlog
		 */
		private ApplyBinLog(binlog: BinLogStru): void {
			var index: number = binlog.index;
			//字符串直接处理掉了
			if (binlog._typ == SyncEvent.TYPE_STRING) {

				this.checkStrSize(index);

				binlog.old_str = this._str_values[index] ? this._str_values[index] : "";		//保存旧值 
				this._str_values[index] = binlog._value_str;

				this.AddBinlogStru(this._str_binlog_array, binlog.clone());
				GuidObject.tmpStrMask.SetBit(binlog.index);
				return;
			}

			this.AddBinlogStru(this._int_binlog_array, binlog.clone());
			GuidObject.tmpIntMask.SetBit(binlog.index);

			//记录一下旧值
			if (binlog.typ == SyncEvent.TYPE_DOUBLE) {
				if (this._uint32_values_len > index + 1) {
					//binlog._old_value_dbe = SyncEvent.GetDoubleValue(this._uint32_values, index);
					binlog._old_value_dbe = this.GetDouble(index);
				}
				this.checkIntSize(index + 1);
			}
			else {
				if (binlog.typ != SyncEvent.TYPE_BIT && this._uint32_values_len > index /*&& binlog.opt != OPT_SET*/) {
					//binlog.old_value = this._uint32_values[index];
					binlog.old_value = this.GetUInt32(index);
				}
				this.checkIntSize(index);
			}

			//因为uint32不需要偏移，所以单独写
			if (binlog.typ == SyncEvent.TYPE_UINT32 || binlog.typ == SyncEvent.TYPE_INT32 || binlog.typ == SyncEvent.TYPE_FLOAT) {
				switch (binlog.opt) {
					case SyncEvent.OPT_SET:
						//this._uint32_values[index] = binlog.uint32;
						this.SetUInt32(index, binlog.uint32);
						break;
					case SyncEvent.OPT_ADD:
						//this._uint32_values[index] = this._uint32_values[index] + binlog.uint32;
						this.AddUInt32(index, binlog.uint32);
						break;
					case SyncEvent.OPT_SUB:
						//this._uint32_values[index] = this._uint32_values[index] - binlog.uint32;
						this.SubUInt32(index, binlog.uint32);
						break;
				}
			}
			else if (binlog.typ == SyncEvent.TYPE_DOUBLE) {
				switch (binlog.opt) {
					case SyncEvent.OPT_SET:
						//SyncEvent.SetDoubleValue(this._uint32_values, index, binlog.double);
						this.SetDouble(index, binlog.double);
						break;
					case SyncEvent.OPT_ADD:
						//var d: number = SyncEvent.GetDoubleValue(this._uint32_values, index);
						//d += binlog.double;
						//SyncEvent.SetDoubleValue(this._uint32_values, index, d);
						this.AddDouble(index, binlog.double);
						break;
					case SyncEvent.OPT_SUB:
						//var dd: number = SyncEvent.GetDoubleValue(this._uint32_values, index);
						//dd -= binlog.double;
						//SyncEvent.SetDoubleValue(this._uint32_values, index, dd);
						this.SubDouble(index, binlog.double);
						break;
				}
			}
			else if (binlog.typ == SyncEvent.TYPE_BIT) {//FIXME			
				switch (binlog.opt) {
					case SyncEvent.OPT_SET:
						//this._uint32_values[index] = SyncEvent.SetBitValue(this._uint32_values[index], 1, binlog.uint32);
						this.SetBit(index, binlog.uint32, true);
						break;
					case SyncEvent.OPT_UNSET:
						//this._uint32_values[index] = SyncEvent.SetBitValue(this._uint32_values[index], 0, binlog.uint32);
						this.SetBit(index, binlog.uint32, false);
						break;
					default:
						throw Error("BinLogObject_BIT:op type is error.");
				}
			}
			else {
				var value: number = 0;
				switch (binlog.typ) {
					case SyncEvent.TYPE_UINT16:
						switch (binlog.opt) {
							case SyncEvent.OPT_SET:
								//value = binlog.uint16;
								//this._uint32_values[index] = SyncEvent.SetUInt16Value(this._uint32_values[index], value, binlog.offset);
								this.SetUInt16(index, binlog.offset, binlog.uint16);
								break;
							case SyncEvent.OPT_ADD:
								//value = this.GetUInt16(index,binlog.offset) + binlog.uint16;
								//this._uint32_values[index] = SyncEvent.SetUInt16Value(this._uint32_values[index], value, binlog.offset);
								this.AddUInt16(index, binlog.offset, binlog.uint16);
								break;
							case SyncEvent.OPT_SUB:
								//value = this.GetUInt16(index,binlog.offset) - binlog.uint16;
								//this._uint32_values[index] = SyncEvent.SetUInt16Value(this._uint32_values[index], value, binlog.offset);
								this.SubUInt16(index, binlog.offset, binlog.uint16);
								break;
							default:
								throw Error("BinLogObject_UINT16:unknow OP type");
						}
						break;
					case SyncEvent.TYPE_INT16:
						switch (binlog.opt) {
							case SyncEvent.OPT_SET:
								//value = binlog.int16;
								//this._uint32_values[index] = SyncEvent.SetInt16Value(this._uint32_values[index], value, binlog.offset);
								this.SetInt16(index, binlog.offset, binlog.int16);
								break;
							case SyncEvent.OPT_ADD:
								//value = this.GetInt16(index,binlog.offset) + binlog.int16;
								//this._uint32_values[index] = SyncEvent.SetInt16Value(this._uint32_values[index], value, binlog.offset);
								this.AddInt16(index, binlog.offset, binlog.int16);
								break;
							case SyncEvent.OPT_SUB:
								//value = this.GetInt16(index,binlog.offset) - binlog.int16;
								//this._uint32_values[index] = SyncEvent.SetInt16Value(this._uint32_values[index], value, binlog.offset);
								this.SubInt16(index, binlog.offset, binlog.int16);
								break;
							default:
								throw Error("BinLogObject_UINT16:unknow OP type");
						}
						break;
					case SyncEvent.TYPE_UINT8:
						value = 0;
						//var old: number = SyncEvent.GetByteValue(this._uint32_values[index], binlog.offset);
						switch (binlog.opt) {
							case SyncEvent.OPT_SET:
								//this._uint32_values[index] = SyncEvent.SetByteValue(this._uint32_values[index], binlog.byte, binlog.offset);
								this.SetByte(index, binlog.offset, binlog.byte);
								break;
							case SyncEvent.OPT_ADD:
								//value = old + value;
								//this._uint32_values[index] = SyncEvent.SetByteValue(this._uint32_values[index], value, binlog.offset);
								this.AddByte(index, binlog.offset, binlog.byte);
								break;
							case SyncEvent.OPT_SUB:
								//value = old - value;
								//this._uint32_values[index] = SyncEvent.SetByteValue(this._uint32_values[index], value, binlog.offset);
								this.SubByte(index, binlog.offset, binlog.byte);
								break;
							default:
								throw Error("BinLogObject_UINT8:op type is error.");
						}
						break;
					default:
						throw Error("BinLogObject:op type is error.");
				}
			}
		}

		private AddBinlogStru(array: Array<BinLogStru>, binlog: BinLogStru): void {
			for (var index = 0; index < array.length; index ++) {
				var element = array[index];
				if (element.index == binlog.index) {
					array[index] = binlog;
					BinLogStru.free(element);
					return;
				}
			}
			array.push(binlog);
		}

		private DispatchIndex(dis: NetEventDispatcher, array: Array<BinLogStru>) {
			for (var index = 0; index < array.length; index++) {
				var element = array[index];
				dis.DispatchInt(element.index, element);
				BinLogStru.free(element);
			}
			array.length = 0;
		}

		public ReadFrom(flags: number, bytes: ByteArray): boolean {
			var isNew: Boolean = Boolean(flags & SyncEvent.OBJ_OPT_NEW);
			//创建包需要将所有的值清空
			if (isNew) {
				this.clearValues();
			}

			//创建包或更新包
			if (isNew || flags & SyncEvent.OBJ_OPT_UPDATE) {

				//用于更新时使用的掩码				
				GuidObject.tmpIntMask.ReadFrom(bytes);
				GuidObject.tmpStrMask.ReadFrom(bytes);

				//logd("对象更新：" + this.guid);	 
				//读取整数
				this.ReadValues(GuidObject.tmpIntMask, bytes, isNew);
				this.ReadStringValues(GuidObject.tmpStrMask, bytes, isNew);

				//应用更新后也触发一下事件
				if (this._after_update != null) {
					this._after_update(flags, GuidObject.tmpIntMask, GuidObject.tmpStrMask);
				}

				//触发下标监听
				this.DispatchIndex(this._events_value, this._int_binlog_array);
				this.DispatchIndex(this._events_str_values, this._str_binlog_array);
				this._events_mask.DispatchIntMask(GuidObject.tmpIntMask, this);
			}

			//如果更新的话可能还带原子操作
			//binlog更新
			if (flags & SyncEvent.OBJ_OPT_BINLOG) {
				GuidObject.tmpIntMask.Clear();
				GuidObject.tmpStrMask.Clear();

				var len: number = bytes.readUnsignedShort();
				//logd("同步GUID：" + this.guid + "长度：" + len);	
				for (var i: number = 0; i < len; i ++) {

					this._tmpBinlog.ReadFrom(bytes);
					if (this._tmpBinlog._atomic_opt) {
						this.ApplyAtomicBinLog(this._tmpBinlog);	//原子操作
					} else {
						this.ApplyBinLog(this._tmpBinlog);
					}
					//this.OnEventSyncBinLog(this._tmpBinlog);
				}

				//应用更新后也触发一下事件
				if (this._after_update != null) {
					this._after_update(flags, GuidObject.tmpIntMask, GuidObject.tmpStrMask);
				}
				//触发下标监听
				this.DispatchIndex(this._events_value, this._int_binlog_array);
				this.DispatchIndex(this._events_str_values, this._str_binlog_array);
				this._events_mask.DispatchIntMask(GuidObject.tmpIntMask, this);
			}

			if (isNew) {
				this.onBaseCreated();
			}

			return true;
		}

		public onBaseCreated(): void {

		}

		//写入创建块  
		WriteCreateBlock(bytes: ByteArray, int_mask: UpdateMask, str_mask: UpdateMask): void {
			//写入标志
			//如果有整形id则把整形id也写入
			let flag = OBJ_OPT_NEW;
			if (this._u_guid)
				flag |= OBJ_OPT_U_GUID;

			bytes.writeByte(flag);
			if (flag & OBJ_OPT_U_GUID)
				bytes.writeUnsignedInt(this._u_guid);
			bytes.writeUTF(this._guid);

			let mask = (int_mask || new UpdateMask());
			let mask_str = (str_mask || new UpdateMask());

			//先写入整形下标
			this.GetCreateMask(mask);
			mask.WriteTo(bytes);
			//写入字符下标
			this.GetCreateStringMask(mask_str);
			mask_str.WriteTo(bytes);

			this.WriteValues(mask, bytes);
			this.WriteStringValues(mask_str, bytes);
		}

		//根据掩码写入整数下标的值
		WriteValues(mask: UpdateMask, bytes: ByteArray): void {
			let len = mask.GetCount();
			for (let i = 0; i < len; i++) {
				if (mask.GetBit(i))
					bytes.writeInt(this._uint32_values_buffer.getInt32(i << 2, true));
			}
		}

		WriteStringValues(mask: UpdateMask, bytes: ByteArray): void {
			let len = mask.GetCount();
			for (let i = 0; i < len; i++) {
				if (mask.GetBit(i))
					bytes.writeUTF(this._str_values[i]);
			}
		}

		public GetHashCode(): number {

			const FNV_offset_basis: number = 2166136261;
			const FNV_prime: number = 16777619;

			var h1: number = FNV_offset_basis;
			//for (var v in this._uint32_values){	
			for (var i: number = 0; i < this._uint32_values_len; i++) {
				var v: number = this.GetUInt32(i);
				h1 ^= v;
				h1 *= FNV_prime;
			}

			var bytes: ByteArray = new ByteArray;
			bytes.endian = Endian.LITTLE_ENDIAN;

			var h2: number = FNV_offset_basis;
			bytes.writeUTFBytes(this._guid);//need
			for (var i: number = 0; i < bytes.length; i++) {
				h2 ^= (bytes.getByte(i));
				h2 *= FNV_prime;
			}

			for (var s in this._str_values) {
				bytes.clear();
				bytes.writeUTFBytes(s ? s : "");
				for (i = 0; i < bytes.length; i++) {
					h2 ^= (bytes[i]);
					h2 *= FNV_prime;
				}
			}

			return h1 ^ (h2 << 1);
		}

		public Equals(o: GuidObject): Boolean {
			//对所有的length处理一下成最长
			if (this._uint32_values_len > o._uint32_values_len) {
				o.checkIntSize(this._uint32_values_len);
			}
			else if (this._uint32_values_len < o._uint32_values_len) {
				this.checkIntSize(o._uint32_values_len);
			}

			if (this._str_values_len > o._str_values_len) {
				o.checkStrSize(this._str_values_len);
			}
			else if (this._str_values_len > o._str_values_len) {
				this.checkStrSize(o._str_values_len);
			}
			return this.GetHashCode() == o.GetHashCode();
		}

		public tostring():Array<string>
        {
            let int_info = "";
			for (let i = 0; i < this._uint32_values_len; i ++)	
			{
				int_info = int_info +  this.GetUInt32(i) + ' ';
			}
	
			//////////////////////////////////////////////////////////////////////////
			//保存字符串
			let str_info = "";
			for (let i = 0; i < this._str_values_len; i ++)	
			{
				str_info = str_info +  this.GetStr(i) + ' ';
			}
			return [this.guid, int_info, str_info]
        }


		/*public DeleteThis(): void {
			delete this;
		}*/

		public dispose(): void {
			this.clearValues();
			this._events_value.Clear();
			this._events_str_values.Clear();
			this._events_mask.Clear();
			this._events_callback.Clear();
			this._after_update = null;
		}
	}

}