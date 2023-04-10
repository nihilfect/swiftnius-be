import { Injectable } from '@nestjs/common';
import { handleHttpError } from 'src/shared/error.handler';
import { LoginRequest } from 'src/auth/models/login-request.model';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) { }

  /* async oldSignup(signupDto: LoginRequest) {
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

  } */

  async signup(signupDto: LoginRequest) {
    return this.authRepository.createUser({ username: signupDto.email.substring(0, signupDto.email.indexOf("@")), email: signupDto.email, creation_timestamp: new Date().getTime() })
    .then((r) => r)
    .catch(handleHttpError);
  }

  /* async oldLogin(loginDto: LoginRequest) {
    return signInWit hEmailAndPassword(this.authInstance, loginDto.email, loginDto.password)
      .then(async (userCreds: UserCredential) => {
        let accessToken = await userCreds.user.getIdToken();
        let user = await this.authRepository.getUser(userCreds.user.uid);
        return {
          ...user,
          accessToken
        }
      })
      .catch(handleHttpError);
  } */

  async login(loginDto: LoginRequest) {
    return this.authRepository.getUser(loginDto.email)
    .then((r) => r)
    .catch(handleHttpError);;
  }

}
