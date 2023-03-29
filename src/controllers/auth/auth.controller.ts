import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginRequestDto } from 'src/models/login-request.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

    @Post('login') 
    login(@Body() body: LoginRequestDto) {
        this.authService
      }
}
