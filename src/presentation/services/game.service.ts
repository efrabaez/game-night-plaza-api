import { GameModel } from "../../data";
import { CreateGameDto, CustomError, PaginationDto, UserEntity } from "../../domain";
import { GameEntity } from "../../domain/entities/game.entity";

//Route calls controller, then controller calls service
export class GameService {
    
    //DI
    constructor(){}

    public async createGame(createGameDto: CreateGameDto, user:UserEntity) {
        let response = {};
        
        const gameExist = await GameModel.findOne({name: createGameDto.name});
        
        if (gameExist) {
            throw CustomError.badRequest('Game already exist')};

        try {
            const game =  new GameModel({
                ...createGameDto,
                user: user.id,
            });
            await game.save();
            const {category, ...rest} = GameEntity.fromObject(game);
            response = {
                data: [rest],
                mesage: 'Success',
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

        return response;
    }   

    public async getGames(paginationDto: PaginationDto) {
        //const total = await GameModel.countDocuments();
        const {page, limit} = paginationDto;

        try {
            /*const games = await GameModel.find()
                .skip((page - 1 ) * limit) // Page 2
                .limit(limit);*/
            const [total, games] = await Promise.all([
                GameModel.countDocuments(),
                GameModel.find().skip((page - 1 ) * limit).limit(limit),
            ]);
            return {
                data: games.map( (game) => ({
                    id: game.id,
                    game: game.name,
                    category: game.category,
                    players: game.players,
                    duration: game.duration,
                })),
                page: page,
                limit: limit,
                total: total,
                next: `/api/games/?page=${page+1}&limit=${limit}`,
                prev: (page -1 > 0)? `/api/games/?page=${page-1}&limit=${limit}` : null,
                mesage: 'Success',
            }
        } catch (error) {
            throw CustomError.internalServer('Internal Server Eror');
        }
    }
}