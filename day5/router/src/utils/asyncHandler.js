
const asyncHandler =  (requestHandler)=> async (req,res, next)=>{
    try {
        return await requestHandler(req, res, next);
    } catch (error) {
        res.status(error.code || 500).json({
            message : "server error ",
        })
    }
}

export default asyncHandler;