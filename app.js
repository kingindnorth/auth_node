const express = require("express")
const dotenv = require("dotenv")
const expressLayouts = require("express-ejs-layouts")
const flash = require("connect-flash")
const session = require("express-session")

const userRoutes =require("./routes/user")
const connect = require("./utils/service")

const app = express()

dotenv.config()

app.use(expressLayouts)
app.set("view engine","ejs")
app.set("views","views")

//middlewares
app.use(express.urlencoded({ extended: true })) //body parser (important)
app.use(session({
    secret: 'keyboardcat',
    resave: true,
    saveUninitialized: true
  }))
app.use(flash())
//global variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})
app.use("/",userRoutes)

app.listen(process.env.PORT||9090,()=>{
    connect()
    console.log(`server started at port:${process.env.PORT}`)
})