import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { ProductsService } from '../../products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
  ) {}

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
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);

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

  getOrderByUser(id: number): Order {
    const user = this.findById(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
