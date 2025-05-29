import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { EventController } from './controller';

export class EventRoutes {


  static get routes(): Router {

    const router = Router();
    //const gameService = new GameService();
    //const controller = new GameController(gameService);
    const controller = new EventController();
    
    // Define routes
    router.get('/', controller.getEvents);
    router.post('/', [ AuthMiddleware.validateJWT ], controller.createEvent);



    return router;
  }


}