import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { FileService } from "src/file/file.service";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";

@Module({
    controllers: [UserController],
    providers: [UserService, FileService, AuthService],
    imports: [
        SequelizeModule.forFeature([User]),
        forwardRef(() => AuthModule),
    ],
    exports: [
        UserService,
    ]
})
export class UserModule {

}