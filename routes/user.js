const router = require("express").Router()

const {ensureAuthenticated,ensureLogin} = require("../config/auth")

const {
    getLogin,
    getRegister,
    postLogin,
    postRegister,
    getDashboard,
    getHome,
} = require("../controllers/user")

router.get("/",ensureLogin,getHome)
router.get("/login",ensureLogin,getLogin)
router.get("/register",ensureLogin,getRegister)
router.post("/login",ensureLogin,postLogin)
router.post("/register",ensureLogin,postRegister)
router.get("/dashboard",ensureAuthenticated,getDashboard)

module.exports = router