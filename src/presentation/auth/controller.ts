import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthController {
    // DI
    constructor(
        public readonly authService: AuthService,
    ) {}

    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ){
            return res.status(error.statusCode).json({
                data: [],
                message: `${error}`,
            });
        }

        console.log(`${error}`);
        return res.status(500).json({
            data: [],
            message: `Internal server error`,
        });
    }

    registerUser = (req: Request, res: Response) => {

        const [error, registerDto] = RegisterUserDto.create(req.body);

        if (error) {
            return void res.status(400).json({
                data: [],
                message: `${error}`,
            });
        }

        this.authService.registerUser(registerDto!)
            .then( (user) => res.json(user))
            .catch( error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if (error) {
            return void res.status(400).json({
                data: [],
                message: `${error}`,
            });
        }

        this.authService.loginUser(loginUserDto!)
            .then( (user) => res.json(user))
            .catch( error => this.handleError(error, res));
    }

    validateEmail = (req: Request, res: Response) => {
        const { token } = req.params;
        this.authService.validateEmail(token)
            .then ( (validateMessage) => res.json(validateMessage))
            .catch( error => this.handleError(error, res));
    }
}