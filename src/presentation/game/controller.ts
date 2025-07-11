import e, { Request, Response } from "express";
import { CreateGameDto, CustomError, PaginationDto } from "../../domain";
import { GameService } from "../services/game.service";

export class GameController {
    constructor(
        private readonly gameService: GameService,
    ){}

    private handleError = ( error: unknown, res: Response ) => {
        console.log('Handle error');
        if ( error instanceof CustomError ){
            return void res.status(error.statusCode).json({
                data: [],
                message: `${error}`,
            });
        }

        console.log(`${error}`);
        return void res.status(500).json({
            data: [],
            message: `Internal server error`,
        });
    }

    createGame = (req: Request, res: Response) => {
        const [error, createGameDto] = CreateGameDto.create( req.body);
        if (error) {
            return void res.status(400).json({
                data: [],
                message: `${error}`,
            });
        }

        this.gameService.createGame(createGameDto!, req.body.user)
            .then( (game) => void res.status(201).json(game))
            .catch( error => this.handleError(error, res));
    }

    getGames = (req: Request, res: Response) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = PaginationDto.create (+page, +limit);

        if (error) return void res.status(400).json({data: [], message: error});

        this.gameService.getGames(paginationDto!)
            .then( (games) => void res.json(games))
            .catch( error => this.handleError(error, res));
    }
}
