import express = require("express")
import bodyParser = require("body-parser")
import multer = require("multer")
import config = require("./config")
import models = require("./models")

const app = express()
app.set("view engine","jade")
app.set("views",__dirname+"/views")
app.locals.config = {
    blog_name: "Default Blog Name",
    style_type:"bootstrap3",
    site_lang:"jp"
}
app.get("/",async function(req,res) {   
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
app.use(function(req,res){ // 404
    res.status(404).render("notfound")
})
app.listen(process.env.PORT || 3000)