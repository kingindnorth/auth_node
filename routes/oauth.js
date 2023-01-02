const passport = require("passport")
const router = require("express").Router()
const {ensureLogin} = require("../config/auth")

router.get("/google",ensureLogin,passport.authenticate('google', { scope: ['profile'] }))

router.get("/callback",ensureLogin,  passport.authenticate('google', { failureRedirect: '/' }),
(req,res)=>{
    res.redirect("/dashboard")
})

router.get("/logout",(req,res,next)=>{
    req.logout(err=>{
        if(err) return next(err)
        res.redirect("/")
    })
})

module.exports = router