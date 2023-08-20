import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    image: string;
    userId: number;
}

@Table({ tableName: 'post' })
export class Post extends Model<Post, PostCreationAttrs> {
    @ApiProperty({
            description: "post's id",
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
        description: "post's title",
        example: 'Title'
    })
    @Column({ 
        type: DataType.STRING, 
        allowNull: false, 
        unique: true
    })
    title: string;

    @ApiProperty()
    @Column({ 
        type: DataType.STRING, 
        allowNull: false, 
    })
    content: string;

    @Column({ 
        type: DataType.STRING, 
    })
    image: string;

    @ApiProperty()
    @ForeignKey(() => User)
    @Column({ 
        type: DataType.INTEGER, 
        allowNull: false, 
    })
    userId: number;

    @BelongsTo(() => User)
    author: User
}