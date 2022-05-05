import { Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { SignUpDto } from 'src/user/dto/signup.dto';
import { SignInDto } from 'src/user/dto/signin.dto';
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { AuthResponce } from "./responces/auth.responce";

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'SignUp of user' })
    @ApiResponse({ status: 201, type: AuthResponce })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post('/signup')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
    ]))
    signUp(@Body() dto: SignUpDto, @UploadedFiles() files) {
        const { image } = files
        return this.authService.signUp(dto, image[0])
    }

    @ApiOperation({ summary: 'SignIn of user' })
    @ApiResponse({ status: 201, type: AuthResponce })
    @Post('/signin')
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto)
    }

}
