import { GameModel } from "../../data";
import { CreateGameDto, CustomError, UserEntity } from "../../domain";

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
            response = {
                data: [
                    {
                    id: game.id,
                    name: game.name,
                    players: game.players,
                    duration: game.duration,
                    },
                ],
                mesage: 'Success',
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

        return response;
    }   

}