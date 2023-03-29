import { NestFactory } from '@nestjs/core';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  
}

bootstrap();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLcJUJPElsMR51X400cgecbK7e0Law8fY",
  authDomain: "swiftnius.firebaseapp.com",
  projectId: "swiftnius",
  storageBucket: "swiftnius.appspot.com",
  messagingSenderId: "806431389932",
  appId: "1:806431389932:web:486c2d7c48f570cfdc0dc9",
  measurementId: "G-EK0L81VJ6Z"
};

// Initialize Firebase

    const app = initializeApp(firebaseConfig);
    const authInstance = getAuth(app);
   // const firestoreInstance = getFirestore(app);

export { app, authInstance, /* firestoreInstance */ }


