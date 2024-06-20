const nodemailer = require("nodemailer")


const Forgotpasswordmail = async (Otp, email, username) =>{
  
    const messageTemplate = `
    <div>
        <h2>Welcome message</h2>
        <ul>
            <li>Name: ${username}</li>
            <li>Email: ${email}</li>
        </ul>
        <div>
            <p>Dear ${username}, </p>
            <p>Kindly use this code ${Otp} to reset your password</p>
        </div>
    </div>
`;

   const transporter = await nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.USER_EMAIL,
            pass:process.env.USER_PASS
        }
    })
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Reset Password",
        text: "Test App",
        html: messageTemplate,
      };

    try {
       const mail = await transporter.sendMail(mailOptions)
       if (mail) {
         console.log("message sent");
       }
    } catch (error) {
         res.status(500).send({message:error.message, status: false})
    }
}


module.exports = {Forgotpasswordmail}