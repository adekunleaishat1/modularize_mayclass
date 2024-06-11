const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const userschma = mongoose.Schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    profile:{type:String,}
},{timestamps:true})

let saltround = 10
userschma.pre("save", function(next){
    console.log(this, "bnnn")
    bcrypt.hash(this.password, saltround).then((hash)=>{
        console.log(hash);
        this.password = hash
        next()
    }).catch((err)=>{
        console.log(err);
    })
})



const usermodel = mongoose.model("user_collection", userschma)


module.exports = usermodel