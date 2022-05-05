import { IsString, IsEmail, Length } from "class-validator";

export class PutUserDto {
    @IsString({ message: 'Wrong format' })
    @IsEmail({}, { message: `It's not mail` })
    readonly email: string;

    @IsString({ message: 'Wrong format' })
    @Length(4, 16, {message:'Length from 4 to 16'})
    readonly password: string;

    @IsString({ message: 'Wrong format' })
    readonly firstName: string;

    @IsString({ message: 'Wrong format' })
    readonly lastName: string;
}