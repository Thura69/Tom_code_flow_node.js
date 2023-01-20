import { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } from './../src/schema/product.schema';
import { Validate } from './../src/middlewares/validateResource';
import {Express} from 'express'
import requiredUser from '../src/middlewares/requiredUser'
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from '../src/controller/product.controller';


let moduleee = {
    id:''
}




export async function productRoutes(app:Express) {
    

    app.post('/api/products', [requiredUser, Validate(createProductSchema)], createProductHandler);

    app.put('/api/products/:productId', [requiredUser, Validate(updateProductSchema)], updateProductHandler);

    app.get('/api/products/:productId', Validate(getProductSchema), getProductHandler);

    app.delete('/api/products/:productId', requiredUser, Validate(deleteProductSchema), deleteProductHandler);
}