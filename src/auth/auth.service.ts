import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from 'src/user/dto/signup.dto';
import { SignInDto } from 'src/user/dto/signin.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
        private jwtService: JwtService) { }

    async signUp(dto: SignUpDto, image) {
        const candidate = await this.userService.findByEmail(dto.email);
        if (candidate) {
            throw new HttpException('Exists', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await this.encryptPassword(dto.password)

        const user = await this.userService.createUser({ ...dto, password: hashPassword }, image)
        return this.generateToken(user)
    }

    async encryptPassword(password) {
        return await bcrypt.hash(password, 5)
    }

    async signIn(dto: SignInDto) {
        const user = await this.validateUser(dto)
        return this.generateToken(user)
    }

    private async generateToken(user) {
        const payload = { id: user.id, email: user.email, image: user.image }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(dto: SignInDto) {
        const user = await this.userService.findByEmail(dto.email)
        if (!user) {
            throw new UnauthorizedException({ message: "Wrong email" })
        }
        const arePasswordsEqual = await bcrypt.compare(dto.password, user?.password)
        if (arePasswordsEqual) {
            return user
        }
        throw new UnauthorizedException({ message: "Wrong password" })
    }
}
