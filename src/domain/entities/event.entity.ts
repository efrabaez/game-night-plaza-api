import { CustomError } from '../errors/custom.error';

export class EventEntity {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public location: string,
        public date: Date,
        public guests: number,
        public user: string[],
        public games: string[],
        public guest_ids: string[],

    ){}

    static fromObject(object: {[key: string]: any}) {
        const {id, _id, name, description, location, date, guests, user, games, guest_ids = []} = object;

        
        if ( !id && !_id ) throw CustomError.badRequest('Missing id');
        if(!name) throw CustomError.badRequest('Missing game event name');
        if(!description) throw CustomError.badRequest('Missing game event description');
        if(!location) throw CustomError.badRequest('Missing game event location');
        if(!date) throw CustomError.badRequest('Missing game event date');
        if(!guests) throw CustomError.badRequest('Missing game event guests');
        if(!user) throw CustomError.badRequest('Missing game event user');
        if(!games) throw CustomError.badRequest('Missing games to play');

        return new EventEntity(_id || id, name, description, location, date, guests, user, games, guest_ids);
    }
}