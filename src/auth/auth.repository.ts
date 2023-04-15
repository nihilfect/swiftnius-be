import { Inject, Injectable } from "@nestjs/common";
import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { app } from "index";
import { User } from "src/auth/models/user.model";

@Injectable()
export class AuthRepository {
    constructor(@Inject(User.collectionName)
    private userCollection: CollectionReference<User>) { }

    firestore = getFirestore(app);

    async createUser(user: User) {
        const docRef = this.userCollection.doc();
        await docRef.set(user);
        return (await docRef.get()).data();
    }

    async getUser(email: string): Promise<User> {
        const querySnapshot = await this.firestore.collection(User.collectionName).where("email", "==", email).get();
        if (querySnapshot.docs.length > 0) {
            return querySnapshot.docs[0].data() as User;
        } else throw Error(`User not found with email ${email}`);
    }
}