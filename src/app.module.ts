import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config'
import { User } from "./user/user.model";
import { FileModule } from './file/file.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from './auth/auth.module';
import * as path from "path";

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.PG_HOST,
            port: Number(process.env.PG_PORT),
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DB,
            models: [User],
            autoLoadModels: true
        }),
        UserModule,
        FileModule,
        AuthModule,
    ]
})
export class AppModule {

}