import { Inject, Injectable } from "@nestjs/common";
import { CollectionReference } from "firebase-admin/firestore";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestoreInstance } from "src/main";
import { User } from "src/auth/models/user.model";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";

@Injectable()
export class AuthRepository {
    constructor( @Inject(User.collectionName)
    private userCollection: CollectionReference<User>) {}

    async createUser(user: User) {
        const docRef = this.userCollection.doc();
        await docRef.set(user);
        return (await docRef.get()).data();
    }

    async getUser(userId: string): Promise<User> {
        const q = query(collection(firestoreInstance, User.collectionName), where("uid", "==", userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs[0].data() as User;
    }
}