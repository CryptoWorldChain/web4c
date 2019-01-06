


import {Buffer} from 'buffer';

import KeyPair  from "./cwv/keypair.js";
import Protos	from "./cwv/protos.js"
import keystore	from "./cwv/keystore.js"
import config	from "./cwv/config.js"
import utils	from "./cwv/utils.js"
import rpc 	from  './cwv/rpc'
// import bocha 	from  './bocha/bocha'

const VERSION = "v1.0.0";

export default {
	version:VERSION,
   	KeyPair:KeyPair,
   	protos:Protos,
   	keystore:keystore,
   	utils:utils,
   	config:config,
   	Buffer:Buffer,
   	rpc:rpc,
   	getBalance:rpc.getBalance
   	// bocha:bocha
};

