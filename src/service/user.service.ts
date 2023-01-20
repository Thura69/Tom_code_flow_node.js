import { UserDocument } from './../models/user.model';
import { FilterQuery } from 'mongoose';
import UserModel, { UserInput } from "../models/user.model";


export async function createUser(input:UserInput) {
    try {
        const user = await UserModel.create(input)
        
        return user;

    }catch(e:any){
        throw new Error(e);
    }
}

export async function validatePassword({ email: email, password: password }: { email: string, password: string }) {
    
    const user = await UserModel.findOne({ email: email });

    if (!user) {
        return false
    }

    const isValid = user.comparePassword(user.password);

    if (!isValid) {
        return false
    }

    return user.toJSON();
}


export async function findUser(id: UserDocument['_id']){
    return UserModel.findById(id);
}