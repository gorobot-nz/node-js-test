import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { SignUpDto } from "./dto/signup.dto";
import { FileService } from "src/file/file.service";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private fileService: FileService) { }

    async createUser(dto: SignUpDto, image) {
        const imageName = this.fileService.createFile(image)
        const user = await this.userRepository.create({ ...dto, image: imageName })
        return user
    }

    async getUser() {

    }

    async putUser() {

    }

    async deleteUser() {

    }

    async findByUsername(email: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        return user
    }
}