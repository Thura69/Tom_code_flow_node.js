import { Mongoose, Schema } from 'mongoose';
import mongoose from 'mongoose';


export interface SessionDocument extends mongoose.Document{
    user: string,
    valid: boolean,
    userAgent: string,
    createdAt: Date,
    updatedAt: Date,
    
}


export const SessionSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean,default:true},
    userAgent:{type:String}
}, {
    timestamps:true
})

const SessionModel = mongoose.model<SessionDocument>("Session", SessionSchema);

export default SessionModel;