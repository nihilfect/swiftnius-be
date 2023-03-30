import { NestFactory } from '@nestjs/core';
import { initializeApp } from "firebase/app";
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase/auth';
import { AppModule } from './app.module';
import { credential, ServiceAccount } from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';
import { getFirestore } from 'firebase/firestore';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.DEVELOP_PORT);
}

bootstrap();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "swiftnius.firebaseapp.com",
  projectId: "swiftnius",
  storageBucket: "swiftnius.appspot.com",
  messagingSenderId: "806431389932",
  appId: process.env.APP_ID,
  measurementId: "G-EK0L81VJ6Z",
  databaseURL: 'https://swiftnius.firebaseio.com',
  credential: credential.cert(serviceAccount as ServiceAccount),
};

// Initialize Firebase

    const app = initializeApp(firebaseConfig);
    admin.initializeApp({
      credential: credential.cert(serviceAccount as ServiceAccount),
    });
    const authInstance = getAuth(app);
   const firestoreInstance = getFirestore(app);

export { app, authInstance, firestoreInstance }


