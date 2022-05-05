import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";

export class SignUpDto {
    @ApiProperty({ example: 'JohnDoe@gmail.com', description: 'Email' })
    @IsString({ message: 'Wrong format' })
    @IsEmail({}, { message: `It's not mail` })
    readonly email: string;

    @ApiProperty({ example: '123456', description: 'Password' })
    @IsString({ message: 'Wrong format' })
    @Length(4, 16, { message: 'Length from 4 to 16' })
    readonly password: string;

    @ApiProperty({ example: 'John', description: 'Name' })
    @IsString({ message: 'Wrong format' })
    readonly firstName: string;

    @ApiProperty({ example: 'Surname', description: 'Surname' })
    @IsString({ message: 'Wrong format' })
    readonly lastName: string;
}