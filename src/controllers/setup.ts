import models = require("../models")
import config = require("../config")
import crypto = require("crypto")
import setConfig from "../utils/setConfig"
export default function (app) {
    app.get("/setup",function(req,res){
        if(config["is_setup_end"])
            return res.render("admin/setup/already")
        if(req.session["setup_auth"])
            res.render("admin/setup/index")
        else
            res.render("admin/setup/auth")
    })
    app.post("/setup",function(req,res){
        if(config["is_setup_end"])
            return res.render("admin/setup/already")
        const inputPasswordHash = crypto.createHash("sha512").update(config["secret_key"]+req.body.password).digest("hex")
        if(config["init_password"] != inputPasswordHash){
            res.render("admin/setup/auth",{error:true})
            return
        }
        req.session["setup_auth"] = true
        res.redirect("/setup")
    })
    app.post("/setup/register",async function(req,res){
        if(app.locals.config["is_setup_end"])
            return res.render("admin/setup/already")
        if(!req.session["setup_auth"])
            res.redirect("/setup")
        const config_names = [
            "blog_name",
            "https",
            "style_type",
        ]
        for(let config_name of config_names){
            await setConfig(config_name, req.body[config_name])
            app.locals.config[config_name] = req.body[config_name]
        }
        var user = new models.users()
        user.name = req.body.user_name
        user.screenName = req.body.user_screen_name
        user.setPassword(req.body.password)
        await user.save()
        await setConfig("is_setup_end",true)
        app.locals.config["is_setup_end"] = true
        res.render("admin/setup/end")
    })
}
