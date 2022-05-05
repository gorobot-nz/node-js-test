import { Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { SignUpDto } from "./dto/signup.dto";
import { UserService } from "./user.service";

@Controller('/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/signup')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 }
    ]))
    signUp(@Body() dto: SignUpDto, @UploadedFiles() files) {
        const { image } = files
        return this.userService.signUp(dto, image[0])
    }

    signIn() {

    }

    getUser() {

    }

    putUser() {

    }

    deleteUser() {

    }
}