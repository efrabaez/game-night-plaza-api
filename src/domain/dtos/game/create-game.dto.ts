

export class CreateGameDto {
    private constructor(
        public readonly name: string,
        public readonly category: string,
        public readonly players: string,
        public readonly duration: number,
    ){}

    static create(object: {[key: string]: any}): [string?, CreateGameDto?]{
        const {name, category, players, duration = 0} = object;
        if(!name) return ['Missing board game name'];
        if(!category) return ['Missing board game category'];
        if(!players) return ['Missing board game players number'];
        if(!duration) return ['Missing board game match duration'];

        const game = new CreateGameDto(name, category, players, Number(duration));

        return [undefined, game];

    }
}