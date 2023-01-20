import {object,string} from 'zod'

export const createUserSchema = object({
    body: object({
        name: string({ required_error: "Name is required" }),
        email: string({ required_error: "Email is required" }).email("Email is not a valid email"),
        password: string({ required_error: "Password is required" }).min(6, "password should be min 6"),
        passwordComfirmation:string({required_error:"PasswordComfirmation is required"})
    }).refine((data) => data.password === data.passwordComfirmation, {
        message: "Password is not match",
        path:['passwordComfirmation']
    })
})