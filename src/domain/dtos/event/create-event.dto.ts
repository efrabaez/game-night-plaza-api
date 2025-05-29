

export class CreateEventDto {
    private constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly location: string,
        public readonly date: Date,
        public readonly guests: number,
        public readonly user: string, // ID user
        public readonly games: string[], // ID Games
        public readonly guests_ids?: string[], // ID guests

    ){}

    static create(object: {[key: string]: any}): [string?, CreateEventDto?]{
        const {name, description, location, date, guests, user, games, guest_ids = []} = object;
        if(!name) return ['Missing game event name'];
        if(!description) return ['Missing game event description'];
        if(!location) return ['Missing game event location'];
        if(!date) return ['Missing game event date'];
        if(!guests) return ['Missing game event guests'];
        if(!user) return ['Missing game event user'];
        if(!games) return ['Missing games to play'];

        const event = new CreateEventDto(name, description, location, date, guests, user, games, guest_ids);

        return [undefined, event];

    }
}