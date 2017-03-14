import mongoose = require("mongoose")
import crypto = require("crypto")
import config = require("../config")

export default function(): mongoose.Model<mongoose.Document>{
    const schema = new mongoose.Schema({
        screenName: String,
        name: String,
        description: String,
        password: String,
    })
    function hashPassword(password){
        return crypto.createHash("sha512").update("ayano"+config["secret_key"]+"_"+password).digest("base64")
    }
    schema.methods.setPassword = function(password){
        this.password = hashPassword(password)
    }
    schema.methods.checkPassword = function(password){
        return this.password === hashPassword(password)
    }
    return mongoose.model("users",schema)
}