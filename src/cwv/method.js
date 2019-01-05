

import utils from './utils';


export default class Method {

	constructor(args) {
		// code
		if(args.constructor.name=="Array"){
			this.opts = args;
		}else if(args.constructor.name=="String")
		{
			this.opts = [args];
		}else{
			this.opts = args;
		}
	}

	// methods
	toJSONPayload(){

	}

	formatOutput(err,response,body){
		if(!err){
			return body;
		}else
		{
			return {"ret":-1,"error":""+err,"respCode":response.statusCode}
		}
	}

}
