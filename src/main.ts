import express = require("express")
import bodyParser = require("body-parser")
import multer = require("multer")

const app = express()
app.set("view engine","jade")
app.set("views",__dirname+"/views")
app.locals.config = {
    blog_name: "Default Blog Name",
    style_type:"bootstrap3"
}
app.get("/",function(req,res) {
    res.render("main")
})
app.listen(process.env.PORT || 3000)