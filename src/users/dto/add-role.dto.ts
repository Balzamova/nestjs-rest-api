import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    @IsString({message: 'Role have to be a string'})
    readonly value: string;

    @IsNumber({}, {message: 'Id have to be a number'})
    readonly userId: number;
}