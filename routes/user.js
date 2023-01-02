const router = require("express").Router()

const ensureAuthenticated = require("../config/auth")

const {
    getLogin,
    getRegister,
    postLogin,
    postRegister,
    getDashboard,
    getHome,
} = require("../controllers/user")

router.get("/",getHome)
router.get("/login",getLogin)
router.get("/register",getRegister)
router.post("/login",postLogin)
router.post("/register",postRegister)
router.get("/dashboard",ensureAuthenticated,getDashboard)

module.exports = router