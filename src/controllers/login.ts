import models = require("../models")
export default function (app) {
    app.get("/ayano/login",function(req,res){
        res.render("admin/login")
    })
}
