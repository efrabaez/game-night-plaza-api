import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { EventController } from './controller';
import { EventService } from '../services';

export class EventRoutes {


  static get routes(): Router {

    const router = Router();
    const eventService = new EventService();
    const controller = new EventController(eventService);
    
    // Define routes
    router.get('/', controller.getEvents);
    router.post('/', [ AuthMiddleware.validateJWT ], controller.createEvent);



    return router;
  }


}