const jwt = require("jsonwebtoken")

const verify = async (token) =>{
 try {
    if (!token) {
        throw new Error("Authentication error");
        return;
      }else{
       const decodectoken = await jwt.verify(token, "secret")
       const email = decodectoken.email
       return email
      }
 } catch (error) {
    console.log(error.message);
    if (error.name === "TokenExpiredError") {
        throw new Error("Token expired");
    } else {
        throw new Error("Invalid token");
    }
 }
}

module.exports = {verify}