import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './src/app.module';
import { ServiceAccount, credential } from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';
import { initializeApp } from 'firebase-admin/app';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';


const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  ); 
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
};
export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});

// Initialize Firebase Admin

const app = initializeApp({
  credential: credential.cert(serviceAccount as ServiceAccount),
  databaseURL: 'https://swiftnius.firebaseio.com'
});

export { app } 