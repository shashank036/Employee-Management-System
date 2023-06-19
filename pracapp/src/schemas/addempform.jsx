import * as Yup from "yup"

export const addemployee = Yup.object({
    firstname:Yup.string().min(2).max(25).required("Please Enter your First Name"),
    lastname:Yup.string().min(2).max(25).required("Please Enter your Last Name"),
    email:Yup.string().email("invalid email Format").required("Please Enter your Email"),
    password:Yup.string().min(6).required("Please Enter your password"),
    passwordagain:Yup.string().oneOf([Yup.ref('password'), ""]).required("Password Must Match"),
    role:Yup.string().required("Please Enter The Role"),
    dateOfJoining:Yup.date().required("Please Enter The Joining Date")
})