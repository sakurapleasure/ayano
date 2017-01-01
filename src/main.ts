import express = require("express")
import bodyParser = require("body-parser")
import multer = require("multer")
import config = require("./config")
import models = require("./models")
import session = require("express-session")
import setup_controller from "./controllers/setup"

const app = express()
app.set("view engine","jade")
app.set("views",__dirname+"/views")
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    cookie: {
        httpOnly: true
    },
    name:"ayano.sid",
    resave: false,
    saveUninitialized: false,
    secret: "ayano_session_"+config["secret_key"]
}))

app.locals.config = {
    blog_name: "Default Blog Name",
    style_type:"bootstrap3",
    site_lang:"jp",
    is_config_load_end: false,
    is_setup_end: false,
}
models.configs.find().then(function(configs){
    app.locals.config.is_config_load_end = true
    configs.forEach(function(config){
        app.locals.config[config.name] = config.content
    })
})
app.use(function(req,res,next){
    if(!app.locals.config.is_config_load_end){
        res.status(500).render("launch_wait")
        return
    }
    next()
})
app.get("/",async function(req,res) {
    if(!app.locals.config.is_setup_end)
        return res.redirect("/setup")
    const posts = await models.posts.find().sort("-createdAt")
    res.render("top",{
        posts
    })
})
app.get("/category/:category",async function(req,res,next){
    const category = await models.categories.findOne({slug:req.params.category})
    if(!category) return next()
    const posts = await models.posts.find().sort("-createdAt")
    res.render("category",{
        posts
    })
})

// load controllers

setup_controller(app)


app.use(function(req,res){ // 404
    res.status(404).render("notfound")
})
app.listen(process.env.PORT || 3000)