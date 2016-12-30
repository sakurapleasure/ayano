import mongoose = require("mongoose")

export default function(): mongoose.Model<mongoose.Document>{
    const schema = new mongoose.Schema({
        name: String,
        slug: String,
        content: String,
        // readmore
        content_before: String,
        content_after: String,
        user: {type:mongoose.Schema.Types.ObjectId,ref:"users"},
        categories: [{type:mongoose.Schema.Types.ObjectId,ref:"categories"}],
    }, {
        timestamps: true,
    })
    return mongoose.model("posts",schema)
}