const bcrypt = require("bcryptjs")
const usermodel = require("../Model/usermodel")

const Signup = async (req, res) =>{
     console.log(req.body)
     const {firstname, lastname, email, password} = req.body
     if(!firstname || !lastname || !email || !password){
        res.status(400).send({message:"Input field cannot be empty", status:false})
     }
  try {
      const existuser = await usermodel.findOne({email})
      if (existuser) {
        res.status(402).send({message:"User already exist", status:false})
      }else{
        //  let hashedpassword = await bcrypt.hash(password, 10)
        //  console.log(hashedpassword);
        const newuser = await usermodel.create({firstname, lastname, email, password})
        if (newuser) {
            res.status(200).send({message:"signup successful", status:true})
        }
      }

   } catch (error) {
       res.status(500).send({message:error.message, status:false})
  }
}


const Login = async (req, res) =>{
   console.log(req.body);
   const {email, password} = req.body
   if (!email, !password) {
    res.status(400).send({message:"Input field cannot be empty", status:false})
   }
   try {
      const verifyuser =  await usermodel.findOne({email})
      console.log(verifyuser, "line 111");
      if (!verifyuser) {
        res.status(402).send({message:"not a signedup user : please register", status:false})
      }
      else{
       let comparepassword = await bcrypt.compare(password, verifyuser.password)
       console.log(comparepassword);
        if (!comparepassword) {
            res.status(405).send({message:"password is not correct", status:false})
        }else{
            res.status(200).send({message:"login successful", status: true, username:verifyuser.firstname})
        }
      }
   } catch (error) {
    res.status(500).send({message:error.message, status:false})
   }

}






module.exports = {Signup, Login}