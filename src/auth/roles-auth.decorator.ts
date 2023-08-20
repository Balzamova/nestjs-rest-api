import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles'; // по этому ключу будем получать метаданные внутри гварда

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);