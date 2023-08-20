import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
        ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto): Promise<Object> {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if(candidate) {
            throw new HttpException('User with this email exists', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.create(userDto);
        return this.generateToken(user);
    }

    private async generateToken(user: User): Promise<Object> {
        const payload = {
            email: user.email,
            id: user.id,
            role: user.role
        };

        return {
            token: this.jwtService.sign(payload)
        };
    }

    private async validateUser(userDto: CreateUserDto): Promise<User> {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passEquals = await bcrypt.compare(userDto.password, user.password);
        if(user && passEquals) {
            return user;
        }
        
        throw new HttpException('Email or password is not correct', HttpStatus.BAD_REQUEST);
    }
}
