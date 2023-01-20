import { Document } from 'mongoose';
import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config'


export interface UserInput {
    name: string,
    email: string,
    password:string
}

export interface UserDocument extends UserInput, mongoose.Document{
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePassword:string):Promise<boolean>
}


export const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});


UserSchema.pre('save', async function (next) {
    let user = this as UserDocument;


    if (!user.isModified('password')) {
        return next()
    }


    const salt = await bcrypt.genSalt(config.get<number>('saltRounds'));
    const hash =   bcrypt.hashSync(user.password, salt);
    


    user.password = hash;
    next();
})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean>{
    let user = this as UserDocument;
    
    return await bcrypt.compareSync(candidatePassword, user.password);
}

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;