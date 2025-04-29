import { Request, Response } from "express";

export class AuthController {
    // DI
    constructor() {}

    registerUser = (req: Request, res: Response) => {

        const response = {
            status: 'success',
            data: [],
            mesage: 'Register user endpoint'
        }

        res.json(response);
    }

    loginUser = (req: Request, res: Response) => {

        const response = {
            status: 'success',
            data: [],
            mesage: 'Login user endpoint'
        }

        res.json(response);
    }

    validateEmail = (req: Request, res: Response) => {

        const response = {
            status: 'success',
            data: [],
            mesage: 'Validate email endpoint'
        }

        res.json(response);
    }
}