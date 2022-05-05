import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { SignUpDto } from "./dto/signup.dto";
import { FileService } from "src/file/file.service";
import { PutUserDto } from "./dto/putuser.dto";
import * as bcrypt from 'bcryptjs'
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private fileService: FileService) { }

    async createUser(dto: SignUpDto, image) {
        const imageName = this.fileService.createImageFile(image)
        const user = await this.userRepository.create({ ...dto, image: imageName })
        return user
    }

    async getUser(id: number) {
        const user = await this.userRepository.findByPk(id)
        if (!user) {
            throw new HttpException('Something goes wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return user
    }

    async putUser(dto: PutUserDto, id: number) {
        const hashedPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.userRepository.update({ ...dto, password: hashedPassword }, { where: { id } })
        return user
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.findByPk(id)
        user.destroy()
        this.fileService.deleteFile(user.image)
        await user.save()
        return { id: user.id }
    }

    async createPdf(email: string) {
        const user = await this.findByEmail(email)
        if (!user) {
            throw new HttpException('No such user', HttpStatus.BAD_REQUEST)
        }
        const buf = await this.fileService.createPdfFile(user.firstName, user.lastName, user.image)
        user.set({
            pdf: buf
        })
        await user.save()
        return buf
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        return user
    }
}