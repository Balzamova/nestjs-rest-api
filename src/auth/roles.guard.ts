import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export default class RolesGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Observable<boolean> | Promise<boolean> {
        try {
            //methods for Reflector: get / getAllAndMerge / getAllAndOverride
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if(!requiredRoles) {
                return true; //если ролей нет, т.е вернулся null
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User has not autorized' });
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            return user.role.some(role => requiredRoles.includes(role.value));
        } catch(e) {
            console.log(e)
            throw new HttpException('User don`t have permissions', HttpStatus.FORBIDDEN);
        }
    }
}