/*
 * @Author: camulos 
 * @Date: 2019-01-11 16:12:01 
 * @Last Modified by: camulos
 * @Last Modified time: 2019-01-11 17:58:18
 */
import enums from "./enums.js"
import Method from './method'
import BN from 'bn.js';

class CRC20 extends Method {
    constructor(args) {
		super(args);
        this.args = args;
        this.multiTransaction = proto.load('MultiTransaction');
		this.multiTransactionBody = proto.load('MultiTransactionBody');
        this.inputs = proto.load('MultiTransactionInput');
        if(Object.is(this.args.txtype,enums.TYPE_TokenTransaction)){
            this.outputs=proto.load('MultiTransactionOutput');
        }
    }
    /**
     * signatures
     * @param {*} txbody 
     */
    signatures(txbody){
        let  ecdata = Buffer.from(txbody)
		return this.args.keypair.ecHexSign(ecdata.toString('hex'));
    }
    /**
     * create crc token
     */
    create(){
		let timestamp = new Date().getTime();
        let txbody = this.multiTransactionBody.create({
            timestamp:timestamp,
            type:Number.parseInt(enums.TYPE_CreateToken)
        })
		let jsonBody = {
			timestamp:timestamp,
			type:enums.TYPE_CreateToken
		};
		jsonBody.inputs=[];
		txbody.inputs.push(this.inputs.create({
            address:Buffer.from(this.removePrefix(this.args.from),'hex'),
            amount: new BN(this.args.amount).toArrayLike(Buffer),
            token:this.args.token
        }))			

		jsonBody.signatures=[];
		jsonBody.signatures.push({
            signature:this.signatures(this.multiTransactionBody.encode(txbody).finish())
        });

        console.log("create crc txbody====>",JSON.stringify(jsonBody));
        return {
            transaction:{txBody:jsonBody}
        };
    }

    call(){
        let timestamp = new Date().getTime();
        let txbody = this.multiTransactionBody.create({
            timestamp:timestamp,
            type:Number.parseInt(enums.TYPE_CreateToken)
        })
		let jsonBody = {
			timestamp:timestamp,
			type:enums.TYPE_CreateToken
		};
		jsonBody.inputs=[];
		txbody.inputs.push(inputs.create({
            address:Buffer.from(this.removePrefix(this.args.from),'hex'),
            amount: new BN(this.args.amount).toArrayLike(Buffer),
            token:this.args.token,
            nonce:Number.parseFloat(this.args.keypair.nonce)
        }))		
        if(Array.isArray(this.args.to)){
            this.args.to.map(addr=>{
                txbody.outputs.push(this.outputs.create({
                    address:Buffer.from(this.removePrefix(addr),'hex'),
			        amount: new BN(this.args.amount).toArrayLike(Buffer)
                }))
            })
        }else{
            txbody.outputs.push(this.outputs.create({
                address:Buffer.from(this.removePrefix(this.args.to),'hex'),
                amount: new BN(this.args.amount).toArrayLike(Buffer)
            }))	
        }

		jsonBody.signatures=[];
		jsonBody.signatures.push({
            signature:this.signatures(this.multiTransactionBody.encode(txbody).finish())
        });
        console.log("call crc txbody====>",JSON.stringify(jsonBody));
        return {
            transaction:{txBody:jsonBody}
        };
    }
}