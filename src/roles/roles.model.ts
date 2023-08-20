import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    value: string; // user admin manager
    description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({
            description: "user's id",
            example: 1,
        }
    )
    @Column({ 
        type: DataType.INTEGER, 
        unique: true, 
        autoIncrement: true, 
        primaryKey: true 
    })
    id: number;

    @ApiProperty({
        description: "user's role",
        example: 'admin'
    })
    @Column({ 
        type: DataType.STRING, 
        unique: true, 
        allowNull: false, 
    })
    value: string;

    @ApiProperty({
        description: "user's role description",
        example: 'administrator'
    })
    @Column({ 
        type: DataType.STRING, 
        allowNull: false, 
    })
    description: string;

    @BelongsToMany(() => User, () => UserRoles) // с какой сущностью = User связываем и через какую таблицу = UserRoles
    users: User[];
}