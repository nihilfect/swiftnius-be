import { User } from "src/auth/models/user.model";

export class NiusModel {
    uid: string;
    content: string;
    author: User;
    creation_timestamp: Date;
}