import mongoose = require("mongoose")

export default function(): mongoose.Model<mongoose.Document>{
    const schema = new mongoose.Schema({
        name: String,
        content: mongoose.Schema.Types.Mixed
    }, {
        timestamps: true,
    })
    return mongoose.model("configs",schema)
}