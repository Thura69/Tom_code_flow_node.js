import jwt from 'jsonwebtoken';
import config from 'config';

const publicKey = config.get<string>('publicKey');
const privateKey = config.get<string>('privateKey');



export function jwtSign(
    object: object,
    options?: jwt.SignOptions | undefined
){
    try{
        return jwt.sign(object, privateKey,{
            ...(options && options),
            algorithm: 'RS256'
        });
    }
    catch(e: any){
        return e;
    }
}


export function verifyJwt(token: string) {
    try{
        const decoded = jwt.verify(token, publicKey);        
        return {
            valid: false,
            expired: false,
            decoded:decoded
        }
    } catch (e: any) {
        
        return {
            valid: false,
            expired: true,
            decoded: null
        }
    }
}