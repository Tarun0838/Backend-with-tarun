const asyncHandler = (requestHandler)=> async (req, res , next)=>{
    try {
        return await requestHandler(req, res , next);   
    } catch (error) {
        console.log("eror : ", error);
    }
}

export default asyncHandler;