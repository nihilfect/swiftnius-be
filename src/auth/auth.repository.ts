import { Inject, Injectable } from "@nestjs/common";
import { CollectionReference } from "firebase-admin/firestore";
import { User } from "src/auth/models/user.model";
import { firestore } from "src/main";

@Injectable()
export class AuthRepository {
    constructor(@Inject(User.collectionName)
    private userCollection: CollectionReference<User>) { }

    async createUser(user: User) {
        const docRef = this.userCollection.doc();
        await docRef.set(user);
        return (await docRef.get()).data();
    }

    async getUser(email: string): Promise<User> {
        const querySnapshot = await firestore.collection(User.collectionName).where("email", "==", email).get();
        if (querySnapshot.docs.length > 0) {
            return querySnapshot.docs[0].data() as User;
        } else throw Error(`User not found with email ${email}`);
    }
}