import jwt from 'jsonwebtoken';
import { envs } from './envs';
// Adapter

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {

    static async  generateToken( payload: any, duration: any = '2h') {
        return new Promise ( (resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration}, (err, token) => {
                if (err) return void resolve(null);
                resolve(token);
            });
        });
    }

    static async  validateToken( token: string) {
        return new Promise ( (resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return void resolve(null);
                resolve(decoded);
            });
        });
    }
}
