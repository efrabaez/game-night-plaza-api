import { Router } from 'express';

export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Define routes
    // router.use('/api/todos', /*TodoRoutes.routes */ );



    return router;
  }


}