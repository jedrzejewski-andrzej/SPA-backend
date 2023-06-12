import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthGuard],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
