import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { GameRoutes } from './game/routes';

export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Define routes
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/games', GameRoutes.routes);



    return router;
  }


}