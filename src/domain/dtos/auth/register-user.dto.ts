import e from 'express';
import { regularExps } from '../../../config/index';

export class RegisterUserDto {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create( object: {[key: string]:any} ): [string?, RegisterUserDto?] {
        const { name, email, password } = object;
        if(!name) return ['Missing name', undefined];
        if(!email) return ['Missing email', undefined];
        if(!regularExps.email.test( email ) ) return ['Email is not valid', undefined];
        if(!password) return ['Missing password', undefined];
        if(password < 6) return ['Password too short', undefined];

        const user = new RegisterUserDto(name, email, password);
        
        return [undefined, user];

    }
}