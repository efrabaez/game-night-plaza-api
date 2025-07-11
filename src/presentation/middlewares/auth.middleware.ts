import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { UserEntity } from '../../domain';


export class AuthMiddleware {


  static async validateJWT( req: Request, res: Response, next: NextFunction ) {
    /**
     * req.body
     * The req.body property returns undefined when the body has not been parsed. In Express 4, it returns {} by default.
     * Making a validation on the middleware to send new message if there is no body
     */
    if (req.body === undefined) {
      return void res.status(401).json({ data: [], message: 'Body payload was not sent' });
    }

    const authorization = req.header('Authorization');
    if( !authorization ) return void res.status(401).json({ data: [], message: 'No token provided' });
    if ( !authorization.startsWith('Bearer ') ) return void res.status(401).json({ message: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';

    try {

      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if ( !payload ) return void res.status(401).json({ data: [], message: 'Invalid token' })
      
      const user = await UserModel.findById( payload.id );
      if ( !user ) return void res.status(401).json({ data: [], message: 'Invalid token - user' });
      // todo: is mail validate?
      req.body.user = UserEntity.fromObject(user);
      

      next();

    } catch (error) {
      
      console.log(error);
      res.status(500).json({ data: [], message: 'Internal server error' });

    }
    
  }




}