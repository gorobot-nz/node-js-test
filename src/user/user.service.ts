import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { SignUpDto } from "./dto/signup.dto";
import { FileService } from "src/file/file.service";
import { PutUserDto } from "./dto/putUser.dto";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private fileService: FileService) { }

    async createUser(dto: SignUpDto, image) {
        const imageName = this.fileService.createFile(image)
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
        console.log(id)
        const user = await this.userRepository.update({ ...dto }, { where: { id }, returning: true })
        return user
    }

    async deleteUser(id: number) {
        const userId = await this.userRepository.destroy({ where: { id } })
        return { id: userId }
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        return user
    }
}