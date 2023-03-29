import { Inject, Injectable } from "@nestjs/common";
import { CollectionReference } from "firebase-admin/firestore";
import { User } from "src/models/user.model";

@Injectable()
export class AuthRepository {
    constructor( @Inject(User.collectionName)
    private userCollection: CollectionReference<User>) {}

    async createUser(user: User) {
        const docRef = this.userCollection.doc();
        await docRef.set({
            uid: user.uid,
            email: user.email
        });
        return (await docRef.get()).data();
    }

    async getUser(user: User) {
        return "getUser()"
    }
}