import { IsString, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePdfDto {
    @ApiProperty({ example: 'JohnDoe@gmail.com', description: 'Email' })
    @IsString({ message: 'Wrong format' })
    @IsEmail({}, { message: `It's not mail` })
    readonly email: string;
}