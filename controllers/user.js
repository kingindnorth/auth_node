const bcrypt = require("bcryptjs")

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

const postLogin = async(req,res)=>{
    const errors = []
    try{
        const user = await User.findOne({email})
        if(!user){
            errors.push({msg:"email does not exists, please register!"})
            return res.status(404).render("login")
        }
        res.status(200).json("ok")
    }catch(err){
        console.log(err);
        res.status(500).json("internal server error")
    }

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
        console.log(success_msg);
        req.flash('success_msg','you are now registered')
        res.status(200).render('login')
    }catch(err){
        res.status(500).json("internal server error")
    }
}

const getDashboard = async(req,res)=>{
    res.render("dashboard")
}

module.exports = {
    getLogin,
    getRegister,
    getDashboard,
    postLogin,
    postRegister,
    getHome
}