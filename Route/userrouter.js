const express = require("express")
const router = express.Router()
const usermodel = require("../Model/usermodel")
const {Signup, Login, verifyuser, upload} = require("../controllers/Usercontroller")


  router.post("/register", Signup)
  router.post("/login", Login)
  router.get("/verif", verifyuser)
  router.post("/upload", upload)



// router.get("/",(req, res)=>{
//    res.render("index")
// })
// router.get("/signup",(req, res)=>{
//     res.render("signup",{message:""})
//  })
//  router.post("/register", async(req, res)=>{
//     console.log(req.body);
//     try {
//       const {firstname, lastname, email, password} = req.body
//       if (firstname == ""|| lastname == "" || email == "" || password == "") {
//         let message = "input field cannot be empty"
//         res.render("signup",{message})
//       }
//        const user = await usermodel.create(req.body)
//        if (user) {
//         let message = "signup successful"
//         res.render("signup",{message})
//        }
//     } catch (error) {
//         console.log(error.message);
//     }
   
//  })


module.exports = router