import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { LoginRequest } from 'src/models/login-request.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

    @Post('signup') 
    signup(@Body() body: LoginRequest) {
      return this.authService.signup(body)
      .then((res) => res);
    }

    @Post('login') 
    login(@Body() body: LoginRequest) {
      return this.authService.login(body)
      .then((res) => res);
    }
}
