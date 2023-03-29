import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential, AuthError } from "firebase/auth";
import { handleHttpError } from 'src/error.handler';
import { authInstance } from 'src/main';
import { LoginRequest } from 'src/models/login-request.model';
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {
    async signup(signupDto: LoginRequest) {
       return createUserWithEmailAndPassword(authInstance, signupDto.email, signupDto.password)
       .then(async (userCreds: UserCredential) => { 
         return await this.createUser({uid: userCreds.user.uid, email: signupDto.email});
       })
       .catch(handleHttpError);
       
    }

    async login(loginDto: LoginRequest) {
        return signInWithEmailAndPassword(authInstance, loginDto.email, loginDto.password)
       .then(async (userCreds: UserCredential) => { 
         return await this.getUser({uid: userCreds.user.uid, email: loginDto.email});
       })
       .catch(handleHttpError);
    }

    async createUser(user: User) {
        return "createUser()";
    }

    async getUser(user: User) {
        return "getUser()"
    }
}
