import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, AuthError } from "firebase/auth";
import { handleHttpError } from 'src/shared/error.handler';
import { authInstance } from 'src/main';
import { LoginRequest } from 'src/auth/models/login-request.model';
import { User } from 'src/auth/models/user.model';
import { AuthRepository } from './auth.repository';

import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) { }

  async signup(signupDto: LoginRequest) {
    return createUserWithEmailAndPassword(authInstance, signupDto.email, signupDto.password)
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
    return signInWithEmailAndPassword(authInstance, loginDto.email, loginDto.password)
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
    return getAuth()
      .createCustomToken(uid)
      .then((customToken) => customToken);
  }

}
