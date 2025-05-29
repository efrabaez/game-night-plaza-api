import { Router } from 'express';
import { GameController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { GameService } from '../services/game.service';

export class GameRoutes {


  static get routes(): Router {

    const router = Router();
    const gameService = new GameService();
    const controller = new GameController(gameService);
    
    // Define routes
    router.get('/', controller.getGames);
    router.post('/', [ AuthMiddleware.validateJWT ], controller.createGame);



    return router;
  }


}