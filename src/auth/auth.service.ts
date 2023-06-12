import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.usersService.findOneByEmail(data.email);
    if (user?.password !== data.password) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
    };
  }
}
