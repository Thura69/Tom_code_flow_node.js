import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { UserInputProducts, ProductDocument } from './../models/product.model';
import ProductModel from "../models/product.model";


export async function CreateProduct(input:UserInputProducts) {
    return await ProductModel.create(input);
}

export async function FindProduct(query:FilterQuery<ProductDocument>,options:QueryOptions = {lean:true}) {
    return await ProductModel.findOne(query, {}, options);
}

export async function FindAndUpdateProduct(query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions) {
    return await ProductModel.findOneAndUpdate(query,update,options )
}

export async function DeleteProduct(query:FilterQuery<ProductDocument>) {
    return await ProductModel.deleteOne(query);
}