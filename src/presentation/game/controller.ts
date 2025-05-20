import { Request, Response } from "express";
import { CustomError } from "../../domain";

export class GameController {
    // DI
    constructor() {}

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

    createGame = async(req: Request, res: Response) => {
        console.log('Ola?');
        return void res.json('Create Game');
    }

    getGames = async(req: Request, res: Response) => {
        return void res.json('Get Games');
    }
}