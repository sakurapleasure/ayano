import mongoose = require("mongoose")

export default function(): mongoose.Model<mongoose.Document>{
    const schema = new mongoose.Schema({
        name: String,
        slug: String,
        parent_cagetory: {type:mongoose.Schema.Types.ObjectId,ref:"categories"},
    }, {
        timestamps: true,
    })
    return mongoose.model("categories",schema)
}