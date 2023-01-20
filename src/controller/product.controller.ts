import { CreateProductInput, UpdateProductInput } from './../schema/product.schema';
import {Request,Response} from 'express';
import { CreateProduct, DeleteProduct, FindAndUpdateProduct, FindProduct } from '../service/product.service';

export async function createProductHandler(req:Request, res:Response) {
    const userId = res.locals.user._id || res.locals.user._doc._id;

    const body = req.body;

    const product = await CreateProduct({ ...body, user: userId })

    return res.send(product);
}

export async function updateProductHandler(req:Request, res:Response) { 
    const userId = res.locals.user._id || res.locals.user._doc._id;
    const productId = req.params.productId;
    const update = req.body;

    const product = await FindProduct({ productId });

    if (!product) {
        return res.sendStatus(404);
    }

    if (String (product.user) !== userId) {
        return res.sendStatus(403);
    }

    const updateProduct = await FindAndUpdateProduct({ productId }, update, { new: true });

    return res.send(updateProduct); 
}

export async function getProductHandler(req: Request, res: Response) {
    
    console.log(req.params.productId)
    const productId = req.params.productId;
    const product = await FindProduct({ productId });

     if (!product) {
        return res.sendStatus(404);
    } 

   return  res.send(product); 

}

export async function deleteProductHandler(req: Request, res: Response) {
    const userId = res.locals.user._id || res.locals.user._doc._id;
    const productId = req.params.productId;

    const product = await FindProduct({ productId });

    if (!product) {
        return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
        return res.sendStatus(403);
    }

     await DeleteProduct({ productId });

    return res.sendStatus(200);
}