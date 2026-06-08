import mongoose from "mongoose";
import aggregtePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new mongoose.Schema(
    {
        videoFile : {
            type : String, // cloudinary url ayega
            required : true,

        },
        thumbnail : {
            type : string ,// coudinary url 
            required : true
        },
        title : {
            type :  string ,
            required : true,

        },
        description : {
            type : string,
            required : true,
        },
        duration : {
            type : Number,
            required : true
        },
        views : {
            type : Number,
            required : true,
        },
        isPublished : {
            type : Boolean,
            required : true,

        },
        owner : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
            }
        ]

    }
    ,{timestamps : true});


videoSchema.plugin(aggregtePaginate)
export const Video = mongoose.model("Video", videoSchema);