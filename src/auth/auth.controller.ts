import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Req() req, @Body() login: LoginDto, @Res() res) {
    console.log('[req]:', req);
    console.log('[Login]:', login);
    console.log('[res]:', res);
    res.send(await this.authService.login(req.user));
  }
}
