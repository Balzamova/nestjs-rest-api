import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: 'Create new role' })
    @ApiResponse({ status: 200, type: Role })
    @Post()
    create(@Body() body: CreateRoleDto) {
        return this.rolesService.createRole(body);
    }

    @ApiOperation({ summary: 'Get role by value' })
    @ApiResponse({ status: 201, type: [Role] })
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value);
    }
}
