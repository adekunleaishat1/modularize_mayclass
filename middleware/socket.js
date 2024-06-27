
const {io} = require('../index')
const {verify} = require("./sessionservice")
const chatmodel = require("../Model/chatmodel")
const usermodel = require("../Model/usermodel")


io.on("connection",(socket)=>{
    console.log("A user has connected");
    let email = ""
    socket.on("authenticate",async (token)=>{
       email = await verify(token)
      const allchat = await chatmodel.find().populate('Sender', 'firstname')
      socket.emit("allmessage", allchat)
    })
  
    socket.on("newmessage", async(chat)=>{
        try {
         const user = await usermodel.findOne({email})
         if (!user) {
            console.log("user not found");
         }
            
          const savechat =  new chatmodel({
               Sender:user._id,
               message:chat
            })
            const newchat =  await savechat.save()
            console.log(newchat);

          const allchat = await chatmodel.find().populate('Sender', 'firstname')
              console.log(allchat);
            socket.emit("receivemessage", allchat)
        
        } catch (error) {
            
        }
        console.log(chat);
  
      
    })
  })

module.exports ={io}