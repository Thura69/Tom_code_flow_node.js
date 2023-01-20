import {Request,Response} from 'express'
import { createSession, findSession, updateSession } from '../service/session.service';
import { validatePassword } from '../service/user.service'
import { jwtSign } from '../utils/jwt';
import jwt from 'jsonwebtoken'
import config from 'config';
import SessionModel from '../models/session.model';





export async function sessionHandleController(req:Request,res:Response) {
    
    //validate user
    const user = await validatePassword(req.body);

    if (!user) {
     return   res.status(401).send("Email or Password is something wrong");
    }

    //save user and user agent
   const session = await createSession(user._id,req.get('user-agent')|| " ")
   
    
   


   
    //token
   const accessToken = jwtSign({
        ...user, session: session._id
    },
        {expiresIn:config.get<string>('accessTokenTtl')}//5 secound
   )
  
    const refreshToken = jwtSign({
        ...user, session: session._id
    },
        {expiresIn:config.get<string>('refreshTokenTtl')}//1 year
    )

    return res.send({accessToken:accessToken,refreshToken:refreshToken})

}


export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user._id || res.locals.user._doc._id;
    

    
    const sessions = await findSession({ user: userId, valid: true });

    return res.send(sessions);
}


export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

   await updateSession({_id:sessionId},{valid:false})

    return res.send({
        accessToken: null,
        refreshToken:null
    })

}