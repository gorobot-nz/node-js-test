import { Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { SignUpDto } from 'src/user/dto/signup.dto';
import { SignInDto } from 'src/user/dto/signin.dto';
import { AuthService } from "./auth.service";

@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    @UseInterceptors(FileInterceptor('image'))
    signUp(@Body() dto: SignUpDto, @UploadedFiles() image) {
        return this.authService.signUp(dto, image)
    }

    @Post('/signin')
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto)
    }

}
