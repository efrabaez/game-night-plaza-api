import { regularExps } from '../../../config/index';

export class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create( object: {[key: string]:any} ): [string?, LoginUserDto?] {

        const { email, password } = object || {};

        if(!email) return ['Missing email', undefined];
        if(!regularExps.email.test( email ) ) return ['Email is not valid', undefined];
        if(!password) return ['Missing password', undefined];
        if(password < 6) return ['Password too short', undefined];

        const user = new LoginUserDto(email, password);
        
        return [undefined, user];

    }
}