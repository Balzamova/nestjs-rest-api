import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import RolesGuard from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

import { CreateUserDto } from './dto/create-users.dto';
import { User } from './users.model';
import { UsersService } from './users.service';


@ApiTags('Users api') // tag for swagger doc - подпись к эндпоинту
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Create new user' })
    @ApiResponse({ status: 201, type: User })
    // @UsePipes(ValidationPipe)
    @Post()
    create(@Body() body: CreateUserDto) {
        return this.usersService.create(body);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    // @UseGuards(JwtAuthGuard)
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAll();
    }

    @ApiOperation({ summary: 'Get role to user' })
    @ApiResponse({ status: 200})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: 'Add user to ban list' })
    @ApiResponse({ status: 200})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
