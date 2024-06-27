const mongoose = require('mongoose')



const chatschema = new mongoose.Schema({
    Sender:{type:mongoose.Schema.Types.ObjectId, ref:"user_collection", required:true},
    message:{type:String, required:true}
},{timestamps:true})

const chatmodel = mongoose.model("chat_collection", chatschema)

module.exports = chatmodel