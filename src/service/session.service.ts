import { SessionDocument } from './../models/session.model';
import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel from "../models/session.model";
import { jwtSign, verifyJwt } from '../utils/jwt';
import {get} from 'lodash';
import { findUser } from './user.service';
import config from 'config';


export async function createSession(userId: string, userAgent: string) {
    
    const session = await SessionModel.create({ user: userId, userAgent: userAgent })
    
    return session.toJSON();
}


export async function findSession(query: FilterQuery<SessionDocument>) {  
    return await SessionModel.find(query).lean();

}

export async function updateSession(query: FilterQuery<SessionDocument>,update:UpdateQuery<SessionDocument>) {
  return SessionModel.updateOne(query,update)
}

export async function reIssueAccessToken({refreshToken}:{
    refreshToken: string
  }){
   

  const { decoded } = verifyJwt(refreshToken);

    if (!decoded || !get(decoded, 'session')) return false;
    

    const session = await SessionModel.findById(get(decoded, 'session'));
    


    if(!session || !session.valid) return false;

  const user = await findUser(session.user);
  


    if(!user) return false;

    const accessToken = jwtSign({
      ...user, session: session._id,},
      {expiresIn: config.get("accessTokenTtl") });

      return accessToken;
  }