import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Entity({ name: 'users' })
export class User {
  constructor(user: CreateUserDto) {
    this.firstName = user.firstname;
    this.lastName = user.lastname;
    this.email = user.email;
    this.password = user.password;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
