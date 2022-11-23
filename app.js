const express = require("express")
const dotenv = require("dotenv")
const expressLayouts = require("express-ejs-layouts")
const flash = require("connect-flash")
const session = require("express-session")
const passport = require("passport")

const userRoutes =require("./routes/user")
const connect = require("./utils/service")
require("./config/passport")(passport)

const app = express()

dotenv.config()

app.use(expressLayouts)
app.set("view engine","ejs")
app.set("views","views")

//middlewares

//body parser (important)
app.use(express.urlencoded({ extended: true }))

//session
app.use(session({
    secret: 'keyboardcat',
    resave: true,
    saveUninitialized: true
  }))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//flash  
app.use(flash())

//global variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error = req.flash("error")
    next()
})

//routes
app.use("/",userRoutes)

app.listen(process.env.PORT||9090,()=>{
    connect()
    console.log(`server started at port:${process.env.PORT}`)
})