import { Request,Response } from "express";
import { createUser } from "../service/user.service";

export async function userHandleController(req:Request, res:Response) {
    try {
        const user = await createUser(req.body);

        res.status(200).send(user);
    } catch (error:any) {
        
        res.status(403).send(error.message)
    }
}