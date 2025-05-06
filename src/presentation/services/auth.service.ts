import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, LoginUserDto, UserEntity } from "../../domain";

export class AuthService {
    
    //DI
    constructor(){}

    public async registerUser(registerUserDto: RegisterUserDto){
        let response = {};
        const { email } = registerUserDto;
        const isUserExist = await UserModel.findOne({email: email});

        if (isUserExist) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel(registerUserDto);
            // Password encrypt
            user.password = bcryptAdapter.hash(registerUserDto.password);
            await user.save();
            // JWT <----- to keep user auth
            // Confirmation email

            const { password, ...rest } = UserEntity.fromObject(user);
            
            response = {
                data: rest,
                mesage: 'Success',
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

        return response;

    }

    public async loginUser( loginUserDto: LoginUserDto) {
        // Verify if user exist
        let response = {};
   
        const user = await UserModel.findOne({email: loginUserDto.email});
        if (!user) throw CustomError.badRequest('Email does not exist');

        // isMatch... bcryp...compare(123456, $2b$10$kEWYMs48sM0PvYmD9rNE6uqpfGXRBNIfXxCMUKjFQDkrofVVXj73S)
        const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);
        if(!isMatching) throw CustomError.badRequest('Password is not valid');

        const { password, ...rest } = UserEntity.fromObject(user);

        response = {
            data: rest,
            token: 'ABC',
            mesage: 'Success',
        }

        return response;
    }
}