import { Settings } from "firebase-admin/firestore";
import { User } from "src/models/user.model";

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProviders: string[] = [
    User.collectionName
];