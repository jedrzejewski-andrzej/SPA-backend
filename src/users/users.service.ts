import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      return 1;
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    return await this.usersRepository.save(user);
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const relationExist = await this.usersRepository.exist({
      where: { id: userId },
    });
    if (!relationExist) {
      return 1;
    }
    return await this.usersRepository.update(userId, updateUserDto);
  }

  async remove(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      return 1;
    }
    return await this.usersRepository.remove(user);
  }
}
