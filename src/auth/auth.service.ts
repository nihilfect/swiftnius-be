import { Injectable } from '@nestjs/common';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { handleHttpError } from 'src/shared/error.handler';
import { LoginRequest } from 'src/auth/models/login-request.model';
import { AuthRepository } from './auth.repository';

import { getAuth } from 'firebase/auth';

import * as adminAuth from 'firebase-admin/auth';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) { }

  authInstance: Auth = getAuth();

  async signup(signupDto: LoginRequest) {
    return createUserWithEmailAndPassword(this.authInstance, signupDto.email, signupDto.password)
      .then(async (userCreds: UserCredential) => {
        let accessToken = await userCreds.user.getIdToken();
        let user = await this.authRepository.createUser({ uid: userCreds.user.uid, email: signupDto.email });
        return {
          ...user,
          accessToken
        }
      })
      .catch(handleHttpError);

  }

  async login(loginDto: LoginRequest) {
    return signInWithEmailAndPassword(this.authInstance, loginDto.email, loginDto.password)
      .then(async (userCreds: UserCredential) => {
        let accessToken = await userCreds.user.getIdToken();
        let user = await this.authRepository.getUser(userCreds.user.uid);
        return {
          ...user,
          accessToken
        }
      })
      .catch(handleHttpError);
  }

  async generateCustomToken(uid: string) {
    return adminAuth.getAuth()
      .createCustomToken(uid)
      .then((customToken) => customToken);
  }

}
