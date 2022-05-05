import { Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { SignUpDto } from 'src/user/dto/signup.dto';
import { SignInDto } from 'src/user/dto/signin.dto';
import { AuthService } from "./auth.service";

@Controller('/auth')
export class AuthController {
    
    constructor(private authService: AuthService){}

    @Post('/signup')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 }
    ]))
    signUp(@Body() dto: SignUpDto, @UploadedFiles() files) {
        const { image } = files
        return this.authService.signUp(dto, image[0])
    }

    signIn() {

    }

}
