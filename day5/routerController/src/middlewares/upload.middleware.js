import multer from 'multer';

const uploadToLocal = multer.diskStorage({
    // destination batounga fir filename kya karkha hai vo btaunga

    destination : function(req, file , callback){
        callback(null , "./public.temp");
    },
    filename : function(req, file , callback){
        callback(null , file.originalname);
    }

})

export const upload =  multer({uploadToLocal})