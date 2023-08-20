import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: CreateUserDto): Promise<Object>;
    registration(userDto: CreateUserDto): Promise<Object>;
}
