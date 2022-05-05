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
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    image: string;

    @Column({ type: DataType.BLOB, allowNull: true })
    pdf: Buffer;
}