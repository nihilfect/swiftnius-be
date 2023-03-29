import { Inject, Injectable } from "@nestjs/common";
import { CollectionReference } from "firebase-admin/firestore";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestoreInstance } from "src/main";
import { User } from "src/models/user.model";

@Injectable()
export class AuthRepository {
    constructor( @Inject(User.collectionName)
    private userCollection: CollectionReference<User>) {}

    async createUser(user: User) {
        const docRef = this.userCollection.doc();
        await docRef.set(user);
        return (await docRef.get()).data();
    }

    async getUser(user: User) {
        const q = query(collection(firestoreInstance, User.collectionName), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if(!querySnapshot.empty) return querySnapshot.docs[0].data();
        return {};
    }
}