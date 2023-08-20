import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: CreateUserDto): Promise<Object>;
    registration(userDto: CreateUserDto): Promise<Object>;
    private generateToken;
    private validateUser;
}
