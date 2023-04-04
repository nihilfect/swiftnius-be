import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest } from 'src/auth/models/login-request.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('signup')
  async signup(@Body() body: LoginRequest) {
    return await this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: LoginRequest) {
    return await this.authService.login(body);
  }
}
