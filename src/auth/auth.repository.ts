import { Injectable } from "@nestjs/common";
import { User } from "src/models/user.model";

@Injectable()
export class AuthRepository {
    async createUser(user: User) {
        return "createUser()";
    }

    async getUser(user: User) {
        return "getUser()"
    }
}