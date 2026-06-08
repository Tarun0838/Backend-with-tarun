class apiResponse{
    constructor(statusCode, data ,message = "success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

// export default apiResponse;
export {apiResponse};

/* Through this function we can more optimize our response 
when ever response send this send 
* statusCode , message , data , success */ 