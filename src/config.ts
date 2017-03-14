import readline = require("readline-sync")
import fs = require("fs")
import rndstr from "rndstr"
import crypto = require("crypto")

const schemas = [
    {
        name: "mongo_url",
        type: "string",
        question_text: "MongoDBの接続情報を入力してください(例: mongodb://localhost:27017/ayano)"
    },
    {
        name: "secret_key",
        type: "random",
        question_text: false
    },
    {
        name: "init_password",
        type: "secure_password",
        question_text: "初期設定用パスワードを入力してください（他のサービスなどのパスワードは利用しないでください）",
    }
]

const config_filename = __dirname+"/../config.json"

var config
try{
    config = JSON.parse(fs.readFileSync(config_filename).toString())
} catch(e) {}
config = config || {}
var updateFlag = false
schemas.forEach(function(schema){
    if(config[schema.name]) return
    if(schema.type === "random"){
        config[schema.name] = rndstr({
            length:64,
            chars:"0-9a-zA-Z"
        })
        updateFlag = true
        return
    }
    console.log(schema.name)
    var answer
    var answer = readline.question(schema.question_text+" > ",{
        hideEchoBack: schema.type === "secure_password"
    })
    config[schema.name] = answer
    if(schema.type === "secure_password") {
        config[schema.name] = crypto.createHash("sha512").update(config["secret_key"]+answer).digest("hex")
    }
    updateFlag = true
})
if(updateFlag) { // 変更したなら
    // 保存
    fs.writeFileSync(config_filename, JSON.stringify(config))
}

module.exports = config