import * as Yup from "yup"

export const Login = Yup.object({
    email:Yup.string().email("invalid email Format").required("Please Enter your Email"),
    password:Yup.string().min(6).required("Please Enter your password")
})