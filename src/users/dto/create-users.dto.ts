import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString({message: 'Email have to be a string'})
    @IsEmail({}, {message: 'Not email format'})
    readonly email: string;

    @ApiProperty()
    @IsString({message: 'Password have to be a string'})
    @Length(4, 16, {message: 'Min count is 4 and max is 16'})
    readonly password: string;
}