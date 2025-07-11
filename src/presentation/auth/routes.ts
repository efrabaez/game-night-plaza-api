import { Router } from 'express';
import { AuthController } from './controller';
import { EmailService, AuthService } from '../services';
import { envs } from '../../config';

export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY
    );

    const authService = new AuthService(emailService);
    const controller = new AuthController(authService);
    
    // Define routes
    router.post('/login', controller.loginUser );
    router.post('/register', controller.registerUser );

    router.get('/validate-email/:token', controller.validateEmail );



    return router;
  }


}