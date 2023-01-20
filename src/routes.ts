import {Express,Request,Response} from 'express'
import { productRoutes } from '../routes/product.routes';
import { userRoutes } from '../routes/user.routes';
function routes(app: Express) {
    
    //User Routes
    userRoutes(app);

    //Product Routes
    productRoutes(app);
   
    
}

export default routes;