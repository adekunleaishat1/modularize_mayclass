const bcrypt = require("bcryptjs")
const usermodel = require("../Model/usermodel")
const jwt = require("jsonwebtoken")
 const cloundinary = require("../utils/cloudinary")
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
         let token = await jwt.sign({email}, "secret", {expiresIn:"1day"})
         console.log(token);
            res.status(200).send({message:"login successful", status: true, username:verifyuser.firstname, token})
        }
      }
   } catch (error) {
    res.status(500).send({message:error.message, status:false})
   }

}

const verifyuser = async (req, res) =>{
  try { 
    let token = req.headers.authorization.split(" ")[1]
    if (!token) {
      res.status(400).send({message:"invalid token", status:false})
    }
    const verify = await jwt.verify(token, "secret")
    console.log(verify);
    if (verify) {
      res.status(200).send({message:"verification successful", status:true})
    }
  } catch (error) {
    res.status(500).send({message:error.message, status:false})
    console.log(error);
  }
}


const upload = async (req, res) =>{
  try {
    let token = req.headers.authorization.split(" ")[1] 
    let verifyuser =jwt.verify(token, "secret")
    if (!verifyuser) {
      res.status(400).send({message:"error verifing token", status: false})
    }
    console.log(verifyuser);
    const email = verifyuser.email
    const {imagefile} = req.body
    const newimage = await cloundinary.uploader.upload(imagefile)
    if (!newimage) {
      res.status(400).send({message:"error uploading image", status: false})
    }
    const update =  await usermodel.findOneAndUpdate(
      {email},
      {profile:newimage.secure_url},
      {new: true}
    )
    console.log(update);
    let image = update.profile
    if (!update) {
      res.status(403).send({message:"user not found", status: false})
    }

    return res.status(200).send({message:"image upload successful", status:true, image})

  } catch (error) {
    res.status(500).send({message:error.message, status:false})
  }
}





module.exports = {Signup, Login, verifyuser,upload}