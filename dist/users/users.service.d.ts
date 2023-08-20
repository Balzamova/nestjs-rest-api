import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-users.dto';
import { User } from './users.model';
export declare class UsersService {
    private userRepo;
    private roleService;
    constructor(userRepo: typeof User, roleService: RolesService);
    create(dto: CreateUserDto): Promise<User>;
    getAll(): Promise<User[]>;
    getUserByEmail(email: string): Promise<User>;
    addRole(dto: AddRoleDto): Promise<AddRoleDto>;
    ban(dto: BanUserDto): Promise<User>;
}
