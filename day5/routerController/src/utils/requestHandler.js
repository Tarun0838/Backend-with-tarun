const requestHandler = (func) => async (req, res , next)=> {
    try {
        await func(req, res, next)
        
    } catch (error) {
        res.status(error.code || 500).json({
            sucess : false,
            message: error.message
        })
    }
}

export {requestHandler};

// const asyncHandler = (func)=> {
//     (req, res , next ) => {
//         Promise.resolve(func(req, res , next)).catch((error) => next(error))
//     }
// }