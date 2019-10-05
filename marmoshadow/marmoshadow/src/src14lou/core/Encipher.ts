module core{
    export class Encipher{
        private PROTO_TEA_C2S:string = "2f651cbf85539c977da645a90cbd6b62";
        private PROTO_MD5_KEY:string = "40f09aa5ff525e8cc3a9d16bf1abc3c1";

        private xor_key_c2s:number;
        constructor (){            
            this.encipher_init(this.PROTO_TEA_C2S);
        }

        private encipher_init(c2s:string):void{
            let tmp:string = MD5.hash(c2s);
            let bys:ByteArray = new ByteArray();
            bys.writeString(tmp);
            bys.position = 2;
            this.xor_key_c2s = bys.readInt();;
        }

        public encipher_reset(pkt:ByteArray):void{
            let tmp:string = MD5.hashBinary(pkt);
            tmp = tmp + this.PROTO_MD5_KEY;

            this.encipher_init(tmp);
        }
       
        //发包前加密一下
        public encipher_encode(pkt:ByteArray):number{
            //没有内容就不加密了
            if(pkt.length == 2){
                return 0;
            }

            let i:number;
            let tea_v_size:number;
            tea_v_size = (pkt.length) >> 2;
            
            for (i = 0; i < tea_v_size; i++){
                let o = pkt.getInt32(i);
                pkt.setInt32(i, pkt.getInt32(i) ^ this.xor_key_c2s);
            }

            this.xor_key_c2s = MathU.toInt(this.xor_key_c2s + 286331153);
            return 0;
        }
    }
}
