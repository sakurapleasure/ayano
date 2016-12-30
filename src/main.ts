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
app.get("/",function(req,res) {
    models.posts.find()
    res.render("top")
})
app.listen(process.env.PORT || 3000)