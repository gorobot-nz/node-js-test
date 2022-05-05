import { Body, Controller, Delete, Get, Post, Put, Param, UseGuards } from "@nestjs/common";
import { PutUserDto } from "./dto/putUser.dto";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('/user')
export class UserController {
    constructor(private userService: UserService) { }

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