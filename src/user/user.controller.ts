import { Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { SignUpDto } from "./dto/signup.dto";
import { UserService } from "./user.service";

@Controller('/user')
export class UserController {
    constructor(private userService: UserService) { }

    getUser() {

    }

    putUser() {

    }

    deleteUser() {

    }
}