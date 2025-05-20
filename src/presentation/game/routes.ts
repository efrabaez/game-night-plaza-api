import { Router } from 'express';
import { GameController } from './controller';

export class GameRoutes {


  static get routes(): Router {

    const router = Router();
    const controller = new GameController();
    
    // Define routes
    router.get('/', controller.getGames);
    router.post('/', controller.createGame);



    return router;
  }


}