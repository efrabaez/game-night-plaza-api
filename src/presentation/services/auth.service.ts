import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, LoginUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
    
    //DI
    constructor(
        // DI - EmailService
        private readonly emailService: EmailService,
    ){}

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
            
            await this.sendValidationMailLink(user.email);

            const { password, ...rest } = UserEntity.fromObject(user);
            
            response = {
                data: [rest],
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

        const token = await JwtAdapter.generateToken({id: user.id, email: user.email});
        if (!token) throw CustomError.internalServer('Can not create JWT');

        response = {
            data: [rest],
            token: token,
            mesage: 'Success',
        }

        return response;
    }

    private sendValidationMailLink = async (email:string) => {
        const token = await JwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServer('Error getting token');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

        const html = `
            <h1>Validate youir email</h1>
            <p>Click on the link to validate mail</p>
            <a href="${link}">Validate email: ${email}</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        }

        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw CustomError.internalServer('Error sending email');

        return true;
    }

    public validateEmail = async (token: string) => {
        let response = {};
        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');
        
        const {  email } = payload as {email: string}
        if (!email) throw CustomError.internalServer('Token does not contain email');

        const user = await UserModel.findOne({email});
        if(!user) throw CustomError.internalServer('Email does not exist');

        user.isEmailValidated = true;
        await user.save();

        response = {
            data: [],
            mesage: 'Success',
        }

        return response;
    }
}