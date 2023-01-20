import { get } from 'lodash';
import {Request,Response,NextFunction} from 'express'
import { verifyJwt } from '../utils/jwt';
import jwt from 'jsonwebtoken';
import { reIssueAccessToken } from '../service/session.service';
import config from 'config';


const publicKey = config.get<string>("publicKey");



const Deserializer = async (req: Request, res: Response, next: NextFunction) => {

      let accessToken = req.headers.authorization;
    const kdkdk = get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");
    let refreshToken = req.headers.cookie;


    

    
    
    if (!refreshToken) {
        return next();
    }
   
    refreshToken = refreshToken.split('=')[1];
   
    if (accessToken) {
        accessToken = accessToken.split(' ')[1];
    }
    if (!accessToken) {

        return next();
    }

   
    const { decoded, expired } = verifyJwt(accessToken);

    
   

     
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
     
    if (expired && refreshToken) {

        
     
        
       
        const newAccessToken = await reIssueAccessToken({refreshToken});//error
        
        

        if (!newAccessToken) {
            return next();
        }

        res.setHeader('x-access-token',newAccessToken )

        const result = verifyJwt(newAccessToken);
 


        res.locals.user = result.decoded;
        return next();
    }
     
   
     return next();
}

export default Deserializer;