import mongoose = require("mongoose")

export default function(): mongoose.Model<mongoose.Document>{
    const schema = new mongoose.Schema({
        screenName: String,
        name: String,
        description: String,
        password: String,
    })
    return mongoose.model("users",schema)
}