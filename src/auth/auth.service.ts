import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/user/dto/signup.dto';
import { SignInDto } from 'src/user/dto/signin.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/user/user.model'
import { debugPort } from 'process';

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
        private jwtService: JwtService) { }

    async signUp(dto: SignUpDto, image) {
        const candidate = await this.userService.findByUsername(dto.email);
        if (candidate) {
            throw new HttpException('Exists', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(dto.password, 5)

        const user = await this.userService.createUser({ ...dto, password: hashPassword }, image)
        return this.generateToken(user)
    }

    async signIn() {

    }

    generateToken(user) {
        console.log(user)
        const payload = { id: user.id, email: user.email, image: user.image }
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
