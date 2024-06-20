const validate = (schema) => async (req,res, next) =>{
     try {
          const body = req.body
         const valid = await schema.validate(body)
         if (valid) {
            console.log("validation successful");
            next()
         }
     } catch (error) {
        console.log(error);
        res.status(407).send({message:error.message, status: false})
     }
}


module.exports = validate