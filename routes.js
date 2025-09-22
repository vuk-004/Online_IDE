const express = require("express")
const path = require("path")
const router = express.Router()

const {Send_ans} = require(path.join(__dirname,"Controllers","Compiler.js"))
const{
    Register_user,
    Login_user,
    Get_user
} = require(path.join(__dirname,"Controllers","RegisterAndLogin.js"))
const{Save_code,
      Load_code,List_files
} = require(path.join(__dirname,"Controllers","Code.js"))



router.route("/compile").post(Send_ans)
router.route("/signup").post(Register_user)
router.route("/login").post(Login_user)
router.route("/save").post(Save_code)
router.route("/load").post(Load_code)
router.route("/list-files").get(List_files);
router.route("/getuser").get(Get_user);



module.exports = router