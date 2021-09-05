import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findById(id: number) {
    const user = this.users.filter((user) => user.id === id);
    if (user.length === 0) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = { id: this.counterId, ...payload };
    this.users.push(newUser);

    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) return { ...user, ...payload };
      else return user;
    });

    return this.findById(id);
  }

  delete(id: number) {
    const userFinded = this.findById(id);
    if (userFinded)
      this.users = this.users.filter((user: User) => user.id !== id);

    return userFinded;
  }
}
