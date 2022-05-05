import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import { SignUpDto } from "./dto/signup.dto";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User){}

    async signUp(dto: SignUpDto, image) {

    }

    async signIn() {

    }

    async getUser(){

    }

    async putUser(){
        
    }

    async deleteUser(){
        
    }
}