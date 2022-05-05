import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        UserModule,
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
            models: [],
            autoLoadModels: true
        }),
    ]
})
export class AppModule {

}