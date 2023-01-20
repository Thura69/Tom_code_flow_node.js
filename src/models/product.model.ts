import { Mongoose, Schema } from 'mongoose';
import {customAlphabet} from 'nanoid'
import mongoose from 'mongoose';
import { UserDocument } from './user.model';


import {v4 as uuidv4} from 'uuid';






export interface UserInputProducts {
    user:UserDocument["_id" ],
    title: string,
    description: string,
    price: number,
    image:string
}

export interface ProductDocument extends UserInputProducts, mongoose.Document{
    createdAt: Date,
    updatedAt: Date,
    
}


export const ProductSchema = new Schema({
    productId: { type: String, required: true, uniqued: true, default: () => `product_${uuidv4()}` },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required:true},
    image:{type:String,required:true},
    
}, {
    timestamps:true
})

const ProductModel = mongoose.model<ProductDocument>("Product", ProductSchema);

export default ProductModel;