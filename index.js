const express =  require("express")
const app = express()
 require("dotenv").config()
const mongoose = require("mongoose")
const ejs = require("ejs")
const router = require("./Route/userrouter")
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use("/user", router)






const uri = process.env.URI
const connect = () =>{
    try {
      const connection =  mongoose.connect(uri)
      if (connection) {
        console.log("connected to database");
      }
    } catch (error) {
        console.log(error);
    }
}

connect()
  

const port = process.env.PORT

app.listen(port, ()=>{
   console.log(`app started at port ${port}`);
})