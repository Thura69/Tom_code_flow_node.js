import { createSessionSchema } from './../src/schema/session.schema';
import { createUserSchema } from './../src/schema/user.schema';
import {Express,Request,Response} from 'express';
import { userHandleController } from '../src/controller/user.controller';
import { Validate } from '../src/middlewares/validateResource';
import { deleteSessionHandler, getUserSessionHandler, sessionHandleController } from '../src/controller/session.controller';
import requiredUser from '../src/middlewares/requiredUser';




export async function userRoutes(app:Express) {
      
    app.get('/healthCheck',(req:Request,res:Response)=>res.sendStatus(200))
    app.post('/api/users',Validate(createUserSchema),userHandleController)
    app.post('/api/sessions',Validate(createSessionSchema),sessionHandleController)
    app.get('/api/sessions', requiredUser, getUserSessionHandler)
    app.delete('/api/sessions',requiredUser,deleteSessionHandler)
    
}