/**
 * yah hmm basically custom error ko generate karnge 
 * so that jab bhi hume error ko throw ya show karna ho hm iss class ko call kardenge 
 * 
 * and return mai hume normal error se jyda information milegi 
 * 
 * like statusCode, message , type , timestamp
 * 
 * 
 */

class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong ",
        error = [],
        statck = ""
    ){
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.error= error;

        if(statck){
            this.statck = statck;

        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


export default ApiError;