import { ApiProduces, ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType } from 'sequelize-typescript'

interface UserCreationAttributes {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    image: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes>{
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'JohnDoe@gmail.com', description: 'Email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: '123456', description: 'Password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'John', description: 'Name' })
    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string;

    @ApiProperty({ example: 'Surname', description: 'Surname' })
    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string;

    @ApiProperty({ example: 'testimg.jpg', description: `User's image` })
    @Column({ type: DataType.STRING, allowNull: false })
    image: string;

    @ApiProperty({ description: 'Users PDF with firstName, lastName, image' })
    @Column({ type: DataType.BLOB, allowNull: true })
    pdf: Buffer;
}