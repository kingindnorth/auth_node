const bcrypt = require("bcryptjs")
const passport = require("passport")

const User = require("../models/User")

const getHome = async(req,res)=>{
    res.render("home")
}

const getLogin = async(req,res)=>{
    res.render("login")
}

const getRegister = async(req,res)=>{
    res.render("register")
}

const postLogin = (req,res,next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
}

const postRegister = async(req,res)=>{
    const errors = []
    try{
        const {
            name,
            email,
            password,
            password2
        } = req.body
        if(!name || !email || !password || !password2){
            errors.push({msg:"please enter all fields"})
            return res.status(400).render('register',{
                errors,
                name,
                email
            })
        }
        const user = await User.findOne({email})
        if(user) {
            errors.push({msg:"email already exists"})
            return res.status(400).render("register",{
                errors,
                name,
                email
            })
        }
        if(password!==password2){
            errors.push({msg:"password do not match"})
            return res.status(400).render("register",{
                errors,
                name,
                email
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({
            name,
            email,
            password:hashPassword
        })
        await newUser.save()
        req.flash('success_msg','you are now registered')
        res.redirect('/login')
    }catch(err){
        res.status(500).json("internal server error")
    }
}

const getDashboard = async(req,res)=>{
    res.render("dashboard")
}

const logout = (req,res)=>{
    // req.logout()
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
}

module.exports = {
    getLogin,
    getRegister,
    getDashboard,
    postLogin,
    postRegister,
    getHome,
    logout
}