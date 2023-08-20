import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({
            description: "user's id",
            minimum: 1,
            default: 1,
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
        description: "user's email",
        example: 'email@email.com'
    })
    @Column({ 
        type: DataType.STRING, 
        unique: true, 
        allowNull: false, 
    })
    email: string;

    @ApiProperty()
    @Column({ 
        type: DataType.STRING, 
        allowNull: false, 
    })
    password: string;

    @ApiProperty()
    @Column({ 
        type: DataType.BOOLEAN, 
        defaultValue: false,
    })
    banned: boolean;

    @ApiProperty()
    @Column({ 
        type: DataType.STRING, 
        allowNull: true, 
    })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles) // с какой сущностью = Role связываем и через какую таблицу = UserRoles
    role: Role[];

    //создаем зависимость "один ко многим" постам
    @HasMany(() => Post) //указываем какого типа зависимость=типа Пост
    posts: Post[]
}