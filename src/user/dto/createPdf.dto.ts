import { IsString, IsEmail } from "class-validator";

export class CreatePdfDto {
    @IsString({ message: 'Wrong format' })
    @IsEmail({}, { message: `It's not mail` })
    readonly email: string;
}