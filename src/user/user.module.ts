import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { AuthModule } from "src/auth/auth.module";
import { FileModule } from "src/file/file.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        forwardRef(() => AuthModule),
        SequelizeModule.forFeature([User]),
        FileModule,
    ],
    exports: [
        UserService,
    ]
})
export class UserModule { }