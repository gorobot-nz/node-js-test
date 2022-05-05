import { Body, Controller, Delete, Get, Post, Put, Param, UseGuards } from "@nestjs/common";
import { PutUserDto } from "./dto/putuser.dto";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreatePdfDto } from "./dto/createPdf.dto";

@Controller('/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/pdf')
    createUserPdf(@Body() dto: CreatePdfDto) {
        return this.userService.createPdf(dto.email)
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    getUser(@Param('id') id: number) {
        return this.userService.getUser(id)
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    putUser(@Body() dto: PutUserDto, @Param('id') id: number) {
        return this.userService.putUser(dto, id)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id)
    }
}