import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';

import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-users.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepo: typeof User,
                private roleService: RolesService
    ) {}

    async create(dto: CreateUserDto): Promise<User> {
        const hashPassword = await bcrypt.hash(dto.password, 5); // 5 = salt
        const user = await this.userRepo.create({ ...dto, password: hashPassword }); // встроенная ф-ция из sequilize
        const role = await this.roleService.getRoleByValue('user');
        await user.$set('role', [role.id]); // обновляет поле в бд
        user.role = [role];
        return user;
    }

    async getAll(): Promise<User[]> {
        const users = await this.userRepo.findAll({ include: { all: true } }); // встроенная ф-ция из sequilize
        // include: { all: true } -> показывать все поля, с которыми связан пользователь
        return users;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepo.findOne({ where: { email }, include: { all: true } });
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepo.findByPk(dto.userId); // find by Primary Key
        const role = await this.roleService.getRoleByValue(dto.value);
        if(user && role) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepo.findByPk(dto.userId); // find by Primary Key
        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
