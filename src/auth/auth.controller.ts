import { Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { SignUpDto } from 'src/user/dto/signup.dto';
import { SignInDto } from 'src/user/dto/signin.dto';
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'SignUp of user' })
    @ApiResponse({ status: 200, type: Object })
    @Post('/signup')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
    ]))
    signUp(@Body() dto: SignUpDto, @UploadedFiles() files) {
        const { image } = files
        return this.authService.signUp(dto, image[0])
    }

    @ApiOperation({ summary: 'SignIn of user' })
    @ApiResponse({ status: 200, type: Object })
    @Post('/signin')
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto)
    }

}
