import { Body, Controller, Delete, Get, Post, Put, Param, UseGuards } from "@nestjs/common";
import { PutUserDto } from "./dto/putuser.dto";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreatePdfDto } from "./dto/createPdf.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.model";

@ApiTags('Users')
@Controller('/user')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Creating of pdf bytecode' })
    @ApiResponse({ status: 200, type: Buffer })
    @Post('/pdf')
    createUserPdf(@Body() dto: CreatePdfDto) {
        return this.userService.createPdf(dto.email)
    }

    @ApiOperation({ summary: 'Getting info about user' })
    @ApiResponse({ status: 200, type: User })
    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    getUser(@Param('id') id: number) {
        return this.userService.getUser(id)
    }

    @ApiOperation({ summary: 'Changing info about user' })
    @ApiResponse({ status: 200, type: User })
    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    putUser(@Body() dto: PutUserDto, @Param('id') id: number) {
        return this.userService.putUser(dto, id)
    }

    @ApiOperation({ summary: 'Deleting user' })
    @ApiResponse({ status: 200, type: Object })
    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id)
    }
}