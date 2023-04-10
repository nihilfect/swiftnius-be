import { NestFactory } from '@nestjs/core';
import { initializeApp } from "firebase-admin/app";
import { AppModule } from './app.module';
import { credential, ServiceAccount } from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';
import { getFirestore } from 'firebase-admin/firestore';
import { ValidationPipe } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin

const app = initializeApp({
  credential: credential.cert(serviceAccount as ServiceAccount),
  databaseURL: 'https://swiftnius.firebaseio.com'
});

const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, auth, firestore } 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.DEVELOP_PORT);
}

setTimeout(() => {
  bootstrap();
}, 3000);




