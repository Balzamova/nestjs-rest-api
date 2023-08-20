import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    create(body: CreateRoleDto): Promise<Role>;
    getByValue(value: string): Promise<Role>;
}
