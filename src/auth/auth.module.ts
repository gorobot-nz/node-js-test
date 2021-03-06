import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt'

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'Bruh',
            signOptions: {
                expiresIn: '24h'
            }
        }),
        forwardRef(() => UserModule),
    ],
    exports: [
        JwtModule,
        AuthService,
    ]
})
export class AuthModule { }
