import { CustomError } from '../errors/custom.error';

export class GameEntity {
    constructor(
        public id: string,
        public name: string,
        public category: string,
        public players: string,
        public duration: number,
        public user: string,
    ){}

    static fromObject(object: {[key: string]: any}) {
        const {id, _id, name, category, players, duration, user} = object;
        
        if ( !id && !_id ) throw CustomError.badRequest('Missing id');
        if ( !name ) throw CustomError.badRequest('Missing name');
        if ( !category ) throw CustomError.badRequest('Missing category');
        if ( !players ) throw CustomError.badRequest('Missing players');
        if ( !duration ) throw CustomError.badRequest('Missing duration');
        if ( !user ) throw CustomError.badRequest('Missing user');


        return new GameEntity(_id || id, name, category, players, duration, user);
    }
}