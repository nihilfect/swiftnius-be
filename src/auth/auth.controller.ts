import { Body, Controller, Post } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import { LoginRequest } from 'src/auth/models/login-request.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('signup')
  signup(@Body() body: LoginRequest) {
    return this.authService.signup(body)
      .then(async (res) => res)
  }

  @Post('login')
  login(@Body() body: LoginRequest) {
    return this.authService.login(body)
      .then(async (res) => res);
/*         if(res) {
        let valid = await getAuth().verifyIdToken(res.accessToken);
        return {
          ...res,
          isTokenValid: Object.keys(valid).length != 0
        }
      }
      }); */
  }
}
