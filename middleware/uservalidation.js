const yup = require("yup")

const emailregex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const uservalidation = yup.object().shape({
    firstname:yup.string().min(4,"firstname must be more than 4 characters").required("firstname is required"),
    lastname:yup.string().min(4,"lastname must be more than 4 characters").required("lastname is required"),
    email:yup.string().matches(emailregex, "must be a valid email").required("email is required"),
    password:yup.string().min(5,"password cannot be lessthan five characters").required("password is required")
})

module.exports = uservalidation